const express = require('express');
//^ STEP 1 : setting up the router
//* to use the express router methods
const campsiteRouter = express.Router();


//^ STEP 2 : adding the first route
//* in server.js we will set up the /campsite not here
campsiteRouter.route('/')



    //^ STEP 3: the change that will happen in the chaining 
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })
    .get((req, res) => {
        res.end(" We will send all the campsite to you")
    })
    .post((req, res) => {
        res.end(`Will add the campsite : ${req.body.name} with description ${req.body.description}`);
    })
    .put((req, res) => {
        res.statusCode = 403;
        res.end('PUT operations is not supported on /campsites');

    })
    .delete((req, res) => {
        res.end('Deleting all campsites');
    });


//^ STEP 4: adding routes to'/:campsiteId'
campsiteRouter.route('/campsites/:campsitesId')


    //^ STEP 5: Chaining all methods
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })
    .get((req, res) => {
        res.end(`We will send details of the campsite:${req.params.campsiteId} to you`);
    })
    .post((req, res) => {
        res.statusCode = 403;
        res.end(`POST operation is not supported on  /campsites/${req.params.campsiteId}`);
    })
    .put((req, res) => {
        res.write(`Updating the campsite : ${req.params.campsiteId}/n`)
        res.end(`we will update the campsite ${req.body.name} with description ${req.body.description}`);
    })
    .delete((req, res) => {
        res.end(`Deleting campsite :${req.params.campsiteId} `)
    });

/*
//^ STEP 3 adding support for REST API endpoints
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


//^ STEP 4 : setting an enpoint for the next routing method (GET) to the path mentioned
//* if we receive a get request ~ we will set up an endpoint and routing method
//*  --- why no next param ------so the get is the same as all it takes three parameter (req, res, and next) but because we dont want to make any more routing method we will not add the next
//* we will not add the ---setStatus.code  and set header as it is already set with the .all method
//* i am only going to use the res.end to send a message body as a response back to the client
//* this block just to check that the access to this endpoint is working
app.get('/campsites', (req, res) => {
    res.end(" We will send all the campsite to you")
})

//^ STEP 5: handling POST request for campsite path
//* after the express handles the call in .all method once it reaches to the next function it will go to the next relevant routing method that means if the request that came in was a post request then it will go from the app.all method to the app.post method.
//* when we are dealing with post , there is usually going to be some information in the body of the message and this data is going to be in JSON format
//* now what we write in step 10 will come into use  - it will take the properties from that JSON data  that is received  and automaticallly set them up as properties for the req Js obj. 
//* we will use postman to send request to this endpoint and the request body will have JSON data with porperties of name and description so we will be able to access that data here.
app.post('/campsites', (req, res) => {
    res.end(`Will add the campsite : ${req.body.name} with description ${req.body.description}`);
})


//^ STEP 6 : REJECTING PUT method
//* 403 is used when an operation is not supported
app.put('/campsites', (req, res) => {
    res.statusCode = 403;
    res.end('PUT operations is not supported on /campsites');

});


//^ STEP 7 : DELETE method
//* in this we will not allow ordinary users to use it  ~ this is goint to be used later with authentication with priveleged users
app.delete('/campsites', (req, res) => {
    res.end('Deleting all campsites');
})
*/

module.exports = campsiteRouter;
