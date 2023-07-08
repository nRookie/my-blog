const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/User'); 
const Vocabulary = require('./models/Vocabulary')
const VocabularyDay = require('./models/VocabularyDay')
const jwt = require('jsonwebtoken');
const config = require('./config')
const postRoutes = require('./routes/post.routes');


const app = express();

// Enable CORS (Cross-Origin Resource Sharing)
app.use(express.json());


app.use(cors());

app.use('/posts', postRoutes);

// This middleware will check if token is provided, legal or not.
//app.use(expressJwt({ secret: 'YOUR_SECRET_KEY', algorithms: ['HS256']}).unless({path: ['/api/login', '/api/register']}));


// Connect to MongoDB (replace "your_database_url" with your actual MongoDB URL)
mongoose.connect('mongodb://localhost:27017/my-blog', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));


app.put('/vocabulary/id/:id', async(req, res) => {
    try {
        const vocabulary = await Vocabulary.findById(req.params.id);
        if (!vocabulary) {
            return res.status(404).json({error: 'vocabulary not found'});
        }
        vocabulary.vocabulary = req.body.vocabulary || vocabulary.vocabulary;
        vocabulary.vocabularyExplaination = req.body.vocabularyExplaination || vocabulary.vocabularyExplaination;
        const updatedVocabulary = await vocabulary.save();
        res.json(updatedVocabulary);
    } catch (err) {
        res.status(500).json({error: 'Server error'})
    }
})

/** maybe should need to get the day Id from the path*/
app.get('/vocabulary/id/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const vocabulary = await Vocabulary.findById(id);

        if (!vocabulary) {
            return res.status(404).json({error: 'vocabulary not found'});
        }
        res.json(vocabulary);
    } catch (err) {
        console.error(err);
        res.status(500).json({error: 'Server error'});
    }
});


app.get('/vocabulary/day/:day', async (req, res) => {
    try {
        const day = parseInt(req.params.day)

        const vocabulary = await Vocabulary.find({day : day})

        if (!vocabulary) {
            return res.status(404).json({error: 'vocabulary not found'});
        }
        res.json(vocabulary);
    } catch (err) {
        res.status(500).json({error: 'Server error'});
    }
});

app.post('/vocabulary', async (req, res) => {
    const newVocabulary = new Vocabulary({
        day: req.body.day,
        vocabulary: req.body.vocabulary,
        vocabularyExplaination: req.body.vocabularyExplaination,
    });

    try {

        const savedVocabulary = await newVocabulary.save();
        res.status(200).json(savedVocabulary);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

app.delete('/vocabulary/id/:id', async (req, res) => {
    const {id} = req.params;

    try {
        await Vocabulary.findByIdAndDelete(id);
        res.status(200).json({message: 'Vocabulary deleted successfully'});
    } catch (error) {
        res.status(500).json({message: 'An error occurred while deleting the post', error});
    }
});



app.get('/vocabulary_day', async (req, res) => {
    const vocabList = await VocabularyDay.find();
    res.json(vocabList);
});


app.post('/vocabulary_day', async (req, res) => {
    console.log("received_vocabulary_day")
    try {
      const vocab = new VocabularyDay({
        day: req.body.day,
        description: req.body.description
      });
      console.log("after ")
      const savedVocab = await vocab.save();
      res.json(savedVocab);
    } catch (error) {
      if (error.code === 11000 && error.keyPattern && error.keyPattern.day) {
        // If the error is due to a duplicate key (day), handle it appropriately
        console.log(111)
        res.status(400).json({ error: 'Duplicate day value. Please choose a different day.' });
      } else {
        // Handle other errors
        console.log(200)
        res.status(500).json({ error: 'An error occurred while saving the vocabulary.' });
      }
    }
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
