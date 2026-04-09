const express = require('express');
const path = require('path');
const ejsMate = require('ejs-mate'); // Add this
const app = express();

app.engine('ejs', ejsMate); // Set engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index'); // Renders index.ejs using the boilerplate
});

app.listen(3000, () => {
    console.log('Lodwal Construction site running on port 3000');
});