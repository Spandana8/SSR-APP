const express = require('express');
const app = express();
const axios = require('axios');

const port = 3000;
//Loads the handlebars module
const handlebars = require('express-handlebars');

// handlebars configurations 
app.engine('hbs', handlebars({
    defaultLayout: 'main',
    extname: '.hbs'
}));

//Sets our app to use the handlebars engine
app.set('view engine', 'hbs');

app.use(express.static('public'))
app.get('/', async (req, res) => {
    console.log("coming")
    let data = await getPosts();
    res.render('home', {
        posts: JSON.parse(data)
    });
});

app.get('/first', async (req, res) => {
    res.render('first');
})

app.get('/second', async (req, res) => {
    res.render('second');
})

const getPosts = async () => {
   const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
   return JSON.stringify(response.data);
}

app.listen(port, () => console.log(`App listening to port ${port}`));