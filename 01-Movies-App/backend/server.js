const express               = require('express'),
      app                   = express(),
      bodyParser            = require('body-parser'),
      dotEnv                = require('dotenv'),
      cors                  = require('cors'),
      connectDB             = require('./db'),
      { graphqlHTTP }       = require('express-graphql'),
      schema                = require('./schemas/movieSchema');

dotEnv.config();

connectDB()

app.use(cors());
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }))

app.use('/graphql', graphqlHTTP ({
    schema,
    graphiql: true
}))


if(process.env.NODE_ENV === 'development')
{

    app.get('/', (req, res) => {
        res.send('Welcome to GraphQL Movie-App Backend side');
    }); 

}


app.all('*', (req, res) => {
    res.status(404).send('<h1>404! requested URL not found</h1>');
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Movie-App server running on port ${PORT}`);
});