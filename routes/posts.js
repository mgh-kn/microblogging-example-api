var express  = require('express');
var mongoose = require('mongoose');
var router = express.Router();

// Modelos
var Post = require('../models/Post.js');
var User = require('../models/User.js');

var db = mongoose.connection;

// GET del listado de posts ordenados por fecha de publicación
router.get('/', function(req, res, next)
{
    Post.find().sort('-publicationdate').populate('user').exec(function(err, posts)
    {
        if(err) res.status(500).send(err);
        else res.status(200).json(posts);
    });
});

// GET de todos los posts de un usuario dado (identificado por su id)
router.get('/all/:id', function(req, res, next)
{
    Post.find({ 'user' : req.params.id }).sort('-publicationdate').populate('user').exec(function(err, posts)
    {
        if(err) res.status(500).send(err);
        else res.status(200).json(posts);
    });
});

// POST de un nuevo post o entrada
router.post('/', function(req, res, next)
{
    User.findById(req.body.iduser, function(err, userinfo)
    {
        if(err) res.status(500).send(err);
        else
        {
            // Crear la instacia Post
            var postInstance = new Post(
            {
                user        : req.body.iduser,
                title       : req.body.title,
                description : req.body.description
            });

            // Añadir postIntance al array de posts del Usuario
            userinfo.posts.push(postInstance);

            // Salvar el post en las colecciones users y Posts
            userinfo.save(function(err)
            {
                if(err) res.status(500).send(err);
                else
                {
                    postInstance.save(function(err)
                    {
                        if(err) res.status(500).send(err);
                        res.sendStatus(200);
                    });
                }
            });
        }
    });
});

// PUT de un post existente (identificado por su id)
router.put('/:id', function(req, res, next)
{
    Post.findByIdAndUpdate(req.params.id, req.body, function(err, postinfo)
    {
        if(err) res.status(500).send(err);
        else res.sendStatus(200);
    });
});

// DELETE de un post existente (identificado por su id)
router.delete('/:id', function(req, res, next)
{
    if(err) res.status(500).send(err);
    else
    {
        User.findByIdAndUpdate(postinfo.user, { $pull : { posts : postinfo._id }}, function(err, userinfo)
        {
            if(err) res.status(500).send(err);
            else { res.sendStatus(200); }
        });
    }
});

module.exports = router;
