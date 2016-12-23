var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs("mongodb://dexter:123456@ds135818.mlab.com:35818/ucproject", ['root']);

//Get All
router.get('/find/:collectionName', function(req, res, next) {
    db[req.params.collectionName].find(function(err, objs) {
        if (err) {
            res.send(err);
        }
        res.json(objs);
    })
})

//Get Single
router.get('/findOne/:collectionName', function(req, res, next) {
    db[req.params.collectionName].findOne({
            _id: mongojs.ObjectId(req.params.name)
        },

        function(err, tasks) {
            if (err) {
                res.send(err);
            }
            res.json(tasks);
        })
})

//Save task
router.post('/save/:collectionName', function(req, res, next) {
    var obj = req.body;
    if (!(obj)) {
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    } else {
        db[req.params.collectionName].save(obj, function(err, obj) {
            if (err) {
                res.send(err);
            }
            res.json(obj);
        })
    }
})

//Remove obj
router.delete('/remove/:collectionName/:id', function(req, res, next) {
    db[req.params.collectionName].remove({
            _id: mongojs.ObjectId(req.params.id)
        },

        function(err, obj) {
            if (err) {
                res.send(err);
            }
            res.json(obj);
        })
})

//Update tasks
router.put('/update/:collectionName/:id', function(req, res, next) {
    var obj = req.body;
    var newObj = JSON.parse(JSON.stringify(obj));
    delete obk.id;

    if (!newObj) {
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    } else {
        db[req.params.collectionName].update({
                _id: mongojs.ObjectId(req.params.id)
            },
            newObj, {},
            function(err, o) {
                if (err) {
                    res.send(err);
                }
                res.json(o);
            })
    }
})
module.exports = router;
