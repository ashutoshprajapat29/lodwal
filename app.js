const express = require('express');
const path = require('path');
const ejsMate = require('ejs-mate');
const app = express();

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/terms',(req,res)=>{
    res.render('terms.ejs');
})

if (process.env.NODE_ENV !== 'production') {
    app.listen(3000, () => {
        console.log('Lodwal Construction site running on port 3000');
    });
}


module.exports = app;