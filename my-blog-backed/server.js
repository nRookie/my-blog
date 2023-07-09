const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/User'); 
const jwt = require('jsonwebtoken');
const config = require('./config')
const postRoutes = require('./routes/post.routes');
const vocabularyRoutes = require('./routes/vocabulary.routes')
const vocabularyDayRoutes = require('./routes/vocabulary.day.routes');
const nodemailer = require('nodemailer');


const app = express();

// Enable CORS (Cross-Origin Resource Sharing)
app.use(express.json());


app.use(cors());

app.use('/posts', postRoutes);
app.use('/vocabulary_day', vocabularyDayRoutes)
app.use('/vocabulary', vocabularyRoutes)

// Connect to MongoDB (replace "your_database_url" with your actual MongoDB URL)
mongoose.connect('mongodb://localhost:27017/my-blog', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));



// Create transporter object for nodemailer using SMTP 
let transporter = nodemailer.createTransport({
    service : 'gmail',
    auth: {
        user: 'learningjapaneseblog2023@gmail.com',
        pass: 'learningjapaneseqna01',
    }
})


app.post('/activate_admin', async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];  // Extract token from Bearer
    
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, config.secret);  // replace with your JWT secret
    
        res.json(decoded);
      } catch (err) {
        res.status(400).json({ message: 'Token is not valid' });
    }

    const { email, password } = req.body;

    if (email !== decoded.email) {
        return res.status(401).json({ message: 'Token does not match user' });
    }

    // check if user already exists
    let user = await User.findOne({ email });
    
    if (!user) {
      return res.status(400).json({ message: 'User does not exist' });
    }

    if (user.password) {
      return res.status(400).json({ message: 'User is already registered' });
    }

    // encrypt password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // save the hashed password to the user record
    user.password = hashedPassword;
    user.role = 'admin'
    await user.save();

    res.json({ message: 'Registration completed successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});


app.put('/api/users/role', async (req, res) => {
    console.log("in role")
    const { email, role } = req.body;

    // validation
    if (!email || !role) {
        return res.status(400).json({ error: 'Email and role are required' });
    }

    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }

        user.role = role;
        await user.save();

        return res.json({ message: 'User role updated successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});




app.post('/api/users/invite', (req, res) => {
    const { email } = req.body;

    // Check if the user already exists, etc...

    // Generate an invitation token
    const invitationToken = jwt.sign({ email, date: Date.now() }, 'your-secret-key', { expiresIn: '1d' });

    // Construct invitation link
    const invitationLink = `http://yourfrontend.com/complete-registration?token=${invitationToken}`;

    // Send email with invitation link
    let mailOptions = {
        from: 'learningjapaneseblog2023@gmail.com',
        to: email,
        subject: 'Admin Invitation',
        text: `You have been invited to become an admin. Please click on the following link to complete your registration: ${invitationLink}`
    };
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            console.log(`Email sent: ${info.response}`);
            res.status(200).send(`Invitation sent to ${email}`);
        }
    });
});

  

app.post('/api/login', async (req,res) => {
    const {email, password} = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user)
            return res.status(400).json( {msg: "User not exists"});

        console.log(user)
        user.comparePassword(password, (err, isMatch) => {
            if (!isMatch) return res.status(400).json({msg: "Invalid credentials"});

            if (isMatch && !err) {
                var token = jwt.sign({ _id: user._id, role: user.role }, config.secret, {
                    expiresIn: 604800 // 1 week
                });
                return res.json({ success: true, token: token, msg: "successfully logged in"});
            } else {
                res.status(401).json({ message: 'Authentication failed. Wrong password.' });
            }
        });


    } catch (err) {
        console.error(err)
        res.status(500).json( {error: 'Server error'})
    }
});


app.post('/api/register', async(req, res) => {
    const {email, password, role} = req.body; 

    try {

        const validRoles = ['user'];
        if (!validRoles.includes(role)) {
            return res.status(400).json({ msg: "Invalid role"});
        }
    
        let user = await User.findOne({ email } );
        if (user) {
            return res.status(400).json({ msg: "User already exists"});
        }
        user = new User({ email, password, role});
        await user.save();
        res.status(200).json({msg: "User created successfully!"});
    } catch(err) {
        console.error(err);
        res.status(500).json({ error:'server error' })
    }

 
})


const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
