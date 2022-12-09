// ^STEP ONE
const express = require('express');
//* because it is installed using npm install express@4.17.1 we dont need to give it a file path

//^STEP TWO : same as HTTP we need to set the host name
const hostname = 'localhost';
const port = 3000;


//^STEP THREE : create a new Const app and assign it an express function 
//* this will return an express server application
const app = express();

//^STEP FOUR : set up the server - that will return a response for any request
//* the use takes a callback fucntion called the middleware function. This takes three parameters req and res and next
//* the req and res are objects  , the next is a function
app.use((req, res) => {
    console.log(req.headers); // * the headers are part of the request
    res.statusCode =200; //* the statusCode is part of the response
    res.setHeader('Content-Type' , 'text/html');
    res.end('<html><body><h1>This is an express server</h1></body></html>')
});

//^STEP FIVE: Create a server and start listening to it 
//* this code will create an instance of the http server class
//* the third argument which is the callback function is called when the server starts up
app.listen(port, hostname, () => {
    console.log(`Server runnign at ${hostname} : ${port}/`)
})