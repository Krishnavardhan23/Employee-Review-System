const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const connectMongoDb = require('./init/mongodb'); 
const emproute = require("./routes/routes");
const port = 8000;
const app = express();

// View engine
// app.set('view engine', 'ejs');
// app.use(express.static(path.join(__dirname, 'public')));
// app.use('/css', express.static(__dirname + '/public/css'));
// app.use('/js', express.static(__dirname + '/public/js'));

app.set('view engine','ejs');
app.use(express.static("public"));

// Parse URL-encoded bodies (sent by HTML forms)
app.use(bodyParser.urlencoded({ extended: true }));

// Parse JSON bodies (sent by API clients)
app.use(bodyParser.json());

// Initialize MongoDB connection
connectMongoDb(); 

// Create a new MongoDBStore instance
const store = new MongoDBStore({
  uri: 'mongodb://localhost:27017/ERS',
  collection: 'sessions'
});

// Catch errors
store.on('error', function(error) {
  console.log(error);
});

// Configure express-session middleware
app.use(session({
  secret: 'Viratkohli', 
  resave: false,
  saveUninitialized: true,
  store: store
}));

// Use routes
app.use(emproute);

// Start the server
app.listen(port, function (err) 
{
  if (err) {
    console.log('Error in running the app:', err);
    return;
  }
  console.log('Server is up and running at port', port);
});
