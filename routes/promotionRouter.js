// STEP 1 : Require Express
const express = require('express');

// STEP 2: Set up the Router
const promotionRouter = express.Router();

// STEP 3 : adding routes to promotions and promotionsId
promotionRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })
    .get((req, res) => {
        res.end(" We will send all the promotions to you")
    })
    .post((req, res) => {
        res.end(`Will add the promotion : ${req.body.name} with description ${req.body.description}`);
    })
    .put((req, res) => {
        res.statusCode = 403;
        res.end('PUT operations is not supported on /promotions');

    })
    .delete((req, res) => {
        res.end('Deleting all Promotions');
    });


promotionRouter.route('/promotions/:promotionId')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })
    .get((req, res) => {
        res.end(`We will send details of the promotions:${req.params.promotionId} to you`);
    })
    .post((req, res) => {
        res.statusCode = 403;
        res.end(`POST operation is not supported on  /promotions/${req.params.promotionId}`);
    })
    .put((req, res) => {
        res.write(`Updating the campsite : ${req.params.promotionId}/n`)
        res.end(`we will update the promotion ${req.body.name} with description ${req.body.description}`);
    })
    .delete((req, res) => {
        res.end(`Deleting promotions :${req.params.promotionId} `)
    });


module.exports = promotionRouter;