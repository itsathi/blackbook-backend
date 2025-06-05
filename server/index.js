const express= require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRouter = require('./Routes/Authrouter');
const app = express();
const port = process.env.PORT || 4000;
const connectDB = require('./db/connect');

// Connect to MongoDB



connectDB()
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/auth',authRouter);

app.get('/about', (req, res) => {
  res.send('about page');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
