// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express=require('express');
// Start up an instance of app
const app=express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors=require('cors');
app.use(cors);
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
app.use(express.static('website'));

const port = 3000;

const server=app.listen(port,working);

function working(){
  console.log('server running');
  console.log(`running on localhost: ${port}`);
}

app.get('/all',sendData)

function sendData(req,res){
  res.send(projectData);
}
app.post('/addWeatherData',addData)

function addData(req, res) {
  projectData.temperature = req.body.temperature;
  projectData.date = req.body.date;
  projectData.user_response = req.body.user_response;
  res.end();
  console.log(projectData)
}