const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/User'); 
const jwt = require('jsonwebtoken');
const config = require('./config')
const postRoutes = require('./routes/post.routes');
const vocabularyRoutes = require('./routes/vocabulary.routes')
const vocabularyDayRoutes = require('./routes/vocabulary.day.routes');

const app = express();

// Enable CORS (Cross-Origin Resource Sharing)
app.use(express.json());


app.use(cors());

app.use('/posts', postRoutes);
app.use('/vocabulary_day', vocabularyDayRoutes)
app.use('/vocabulary', vocabularyRoutes)
// This middleware will check if token is provided, legal or not.
//app.use(expressJwt({ secret: 'YOUR_SECRET_KEY', algorithms: ['HS256']}).unless({path: ['/api/login', '/api/register']}));


// Connect to MongoDB (replace "your_database_url" with your actual MongoDB URL)
mongoose.connect('mongodb://localhost:27017/my-blog', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));



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
                var token = jwt.sign({ _id: user._id }, config.secret, {
                    expiresIn: 604800 // 1 week
                });
                return res.json({ success: true, token: 'JWT ' + token, msg: "successfully logged in"});
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
    const {email, password} = req.body; 

    try {
        let user = await User.findOne({ email } );
        if (user) {
            return res.status(400).json({ msg: "User already exists"});
        }
        user = new User({ email, password});
        await user.save();
        res.status(200).json({msg: "User created successfully!"});
    } catch(err) {
        console.error(err);
        res.status(500).json({ error:'server error' })
    }

 
})


const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
