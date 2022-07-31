const express               = require('express'),
      app                   = express(),
      bodyParser            = require('body-parser'),
      dotEnv                = require('dotenv'),
      cors                  = require('cors'),
      connectDB             = require('./db');
    //   errorMiddleware       = require('./middleware/error');
;


const user                  = require('./routes/userRoute');
const blog                  = require("./routes/blogRoute");

dotEnv.config();

connectDB()

app.use(cors());
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }))


// API ROUTES
app.use('/api/v1', user);
app.use("/api/v1", blog);


if(process.env.NODE_ENV === 'development')
{

    app.get('/', (req, res) => {
        res.send('Welcome to GraphQL Movie-App Backend side');
    }); 

}

// Error Handling middlewares
app.use(errorMiddleware);

app.all('*', (req, res) => {
    res.status(404).send('<h1>404! requested URL not found</h1>');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Movie-App server running on port ${PORT}`);
});