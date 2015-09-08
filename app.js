var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');


// database
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/daylight2');


// models
var Project = require('./app/models/project');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// config
var port = process.env.PORT || 8080;


// router
var router = express.Router();

router.use(function(req, res, next) {
    console.log('Something is happening: %s %s %s', req.method, req.url, req.path);
    next();
});

router.get('/', function(req, res){
    res.json({
        message: 'Welcome to daylight2 API'
    });
});

router.route('/projects')
    .get(function(req, res){

        Project.find(function(err, projects) {
            if (err)
                res.send(err);
            res.send(projects);
        });
    })
    .post(function(req, res) {

        var project = new Project();
        project.name = req.body.name;
        project.goal = req.body.goal;

        project.save(function(err){
            if (err) {
                res.json({ message: err });
            }
            res.json({ message: 'Project created' });
        });
    });

router.route('/projects/:project_id')
    .get(function(req, res){
        Project.findById(req.params.project_id, function(err, project){
            if (err)
                res.send(err);
            res.json(project);
        });
    })
    .put(function(req, res) {
        Project.findById(req.params.project_id, function(err, project) {
            if (err)
                res.send(err);

            project.name = req.body.name;
            project.goal = req.body.goal;
            project.status = req.body.status;
            project.percentage = req.body.percentage;

            project.save(function(err){
                if (err)
                    res.send(err);

                res.json({ message: 'Project updated'});
            });
        });
    })
    .delete(function(req, res){
        Project.remove({
            _id: req.params.project_id
        }, function(err, project) {
            if (err)
                res.send(err);

            res.json({ message: 'Project deleted'});
        });
    });

app.use('/api', router);


// init
app.listen(port);
console.log('Magic happens at port ' + port);
