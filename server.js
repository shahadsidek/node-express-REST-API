//^ STEP 1 
//* because it is installed using npm install express@4.17.1 we dont need to give it a file path
const express = require('express');

//^ STEP 6 : Morgan : HTTP Requests and errors
const morgan = require('morgan');

//^ STEP 20: Require the campsite router module  to use it in this code
const campsiteRouter = require('./routes/campsiteRouter');

//^ STEP 22: Require the promotion router module to be used in the code
const promotionRouter = require('./routes/promotionRouter');

//^ STEP 24: Require the partners router module
const partnerRouter = require('./routes/partnerRouter');

//^ STEP 2 : same as HTTP we need to set the host name
const hostname = 'localhost';
const port = 3000;

//^ STEP 3 : create a new Const app and assign it an express function 
//* this will return an express server application
const app = express();


//^ STEP 7 : 
//* we use the "app.use" method with morgan but instead of req res and next, morgan has its own middleware function 
//* this will make morgan log using the development version which will print some additional information 
app.use(morgan('dev'));

//^ STEP 10 - Adding Express server to parse JSON Object to JS Objects
//* when the server receive request with JSON formatted data in the body this middleware function will handle parsing that data into JS properties in the req object so that we can use that data in JS
app.use(express.json());


//^ STEP 21 : add the route and take all the methods app.all , app.get , app.post, app.put, app.delete to the camspiterouter.js page and we will delete the one with campsiteid
//* we added the campsite here thats why we do not need to specify in the camspiteRouter.js file
app.use('/campsites', campsiteRouter);
app.use('/campsites/:campsiteId', campsiteRouter);


//^ STEP 23 : adding routes for promotions
app.use('/promotions', promotionRouter);
app.use('/promotions/:promotionId', promotionRouter);


//^ STEP 24 : adding routes for partners
app.use('/partners', partnerRouter);
app.use('/partners/:partnerId', partnerRouter);



/*
//^ STEP 11 adding support for REST API endpoints
//* the routing method (app.all) to catch all http verbs, we will use this to set properties on the response object that we will use as the default for all routing methods for this path so that we dont have to set it up repeatedly on each one 
//* the ---routing method takes a path---- , and we are going to use this path for all method
//* this means any http request for this path will trigger this method.
//* this ----(.all)---- takes two parameter, one is the path and the other is the callback function that deals with the req res and next object.
//*---'text/plain'---- this is saying we are going to send a plain text in the response body 
//* the ----next---- function will pass control of the application routing to the next relevant routing method after this one otherwise it will stop here and not go any further
app.all('/campsites', (req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
});


//^ STEP 12 : setting an enpoint for the next routing method (GET) to the path mentioned
//* if we receive a get request ~ we will set up an endpoint and routing method
//*  --- why no next param ------so the get is the same as all it takes three parameter (req, res, and next) but because we dont want to make any more routing method we will not add the next
//* we will not add the ---setStatus.code  and set header as it is already set with the .all method
//* i am only going to use the res.end to send a message body as a response back to the client
//* this block just to check that the access to this endpoint is working
app.get('/campsites', (req, res) => {
    res.end(" We will send all the campsite to you")
})

//^ STEP 13: handling POST request for campsite path
//* after the express handles the call in .all method once it reaches to the next function it will go to the next relevant routing method that means if the request that came in was a post request then it will go from the app.all method to the app.post method.
//* when we are dealing with post , there is usually going to be some information in the body of the message and this data is going to be in JSON format
//* now what we write in step 10 will come into use  - it will take the properties from that JSON data  that is received  and automaticallly set them up as properties for the req Js obj. 
//* we will use postman to send request to this endpoint and the request body will have JSON data with porperties of name and description so we will be able to access that data here.
app.post('/campsites', (req, res) => {
    res.end(`Will add the campsite : ${req.body.name} with description ${req.body.description}`);
})


//^ STEP 14 REJECTING PUT method
//* 403 is used when an operation is not supported
app.put('/campsites', (req, res) => {
    res.statusCode = 403;
    res.end('PUT operations is not supported on /campsites');

});


//^ STEP 15 : DELETE method
//* in this we will not allow ordinary users to use it  ~ this is goint to be used later with authentication with priveleged users
app.delete('/campsites', (req, res) => {
    res.end('Deleting all campsites');
})


//^ STEP 16 : Adding another route  ~ same as step 12 
//* this will allow us to store whatever the clients sends at the end of the path as a route parameter names campsiteId
app.get('/campsites/:campsiteId', (req, res) => {
    res.end(`We will send details of the campsite:${req.params.campsiteId} to you`);
})


//^ STEP 17 : setting the POST method of /campsite/:campsite id
//* we will not allow this operation but we will respond to this request
app.post('/campsites/:campsiteId', (req, res) => {
    res.statusCode = 403;
    res.end(`POST operation is not supported on  /campsites/${req.params.campsiteId}`);
});



//^ STEP 18 : setting the PUT method of /campsite/:campsite id
//* we will  allow this operation on a specific campsite id 
app.put('/campsites/:campsiteId', (req, res) => {
    res.write(`Updating the campsite : ${req.params.campsiteId}\n`)
    res.end(`we will update the campsite ${req.body.name} with description ${req.body.description}`);
});

//^ STEP 19 : setting the DELETE method of /campsite/:campsite id
//* we will  allow this operation on a specific campsite id 
app.delete('/campsites/:campsiteId', (req, res) => {
    res.end(`Deleting campsite :${req.params.campsiteId} `)
});

*/


//^ STEP 9 : set up Express to serve files from the public folder that contains HTML files 
//* this is will be done with the help of middleware function called express.static
//* __dirname is a special variable in node whenever you use it will refer to the absolute path of the current directory of the file that it is in
app.use(express.static(__dirname + '/public'));


//^STEP 4 : set up the server - that will return a response for any request
//* the use takes a callback fucntion called the middleware function. This takes three parameters req and res and next
//* the req and res are objects  , the next is a function
app.use((req, res) => {

    //^ STEP 8 : we will remove the console log because morgan will handle it
    // console.log(req.headers); 
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>This is an express server</h1></body></html>')
});



//^STEP 5: Create a server and start listening to it 
//* this code will create an instance of the http server class
//*the third argument which is the callback function is called when the server starts up
app.listen(port, hostname, () => {
    console.log(`Server runnign at ${hostname} : ${port}/`)
})