var express = require('express');
var app = express();

// set up handlebars view engine
var handlebars = require('express-handlebars').create({defaultLayout: 'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.use(express.static("public"));
const fortune = require("./modules/fortune");

app.set('port', process.env.PORT || 3000);





app.get('/', function(req, res) {
  //-------------1. Moving from Node Server to Express Server-------------
  // res.type('text/plain');
  // res.send('Meadowlark Travel');

  //-------------2. providing views----------------------
  res.render("home");
});

app.get('/about', function(req, res) {
    //-------------1. Moving from Node Server to Express Server-------------
    // res.type('text/plain');
    // res.send('About Meadowlark Travel');

    //-------------2. providing views------------------------------
    // res.render("about");

    //-------------3. Providing Dynamic content in Views-------------
    var randomFortune = fortune.getFortune();
    res.render('about', { fortune: randomFortune });
});


// custom 404 page
app.use(function(req, res) {
  //-------------1. Moving from Node Server to Express Server-------------
  // res.type('text/plain');
  // res.status(404);
  // res.send('404 - Not Found');

  //-------------2. providing views----------------------
  res.status(404);
  res.render('404');
});


// custom 500 page
app.use(function(err, req, res, next) {
  //-------------1. Moving from Node Server to Express Server-------------
  // console.error(err.stack);
  // res.type('text/plain');
  // res.status(500);
  // res.send('500 - Server Error');

  //-------------2. providing views----------------------
  console.error(err.stack);
  res.status(500);
  res.render('500');
});


app.listen(app.get('port'), function() {
  console.log('Express started on http://localhost:' +
    app.get('port') + '; press Ctrl-C to terminate.');
});
