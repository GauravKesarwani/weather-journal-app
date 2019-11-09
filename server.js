// Setup empty JS object to act as endpoint for all routes
const projectData = [];
// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));
const port = 8080;
const listener = () => {
    console.log(`Server running on port ${port}`);
}
// Setup Server
const server = app.listen(port, listener);

app.get('/weather', (req, res) => {
    res.send(projectData.pop())
});

app.post('/weather', (req, res) => {
    const zipCode = req.body.zipCode;
    temperature = req.body.temperature;
    date = req.body.date;
    userResponse = req.body.feelings;

    const entry = {};
    entry[zipCode] = {
        temperature,
        date,
        userResponse
    };
    projectData.push(entry);
    
    res.status(201);
    res.json();
});