var express  = require('express');
var router   = express.Router();

var mongoose = require('mongoose');
var User     = require('../models/User.js');
var db       = mongoose.connection;

/* GET users listing. */
router.get('/', function(req, res, next)
{
    User.find().sort('-creationdate').exec(function(err, users)
    {
        if(err) res.status(500).send(err);
        else res.status(200).json(users);
    });

    // res.json(
    // {
    //     'users' :
    //     [
    //         {
    //             'id'     : 123,
    //             'name'   : 'Eladio Guardiola',
    //             'phones' :
    //             {
    //                 'home'   : '800-123-4567',
    //                 'mobile' : '877-123-1234'
    //             },
    //             'email':
    //             [
    //                 'jd@example.com',
    //                 'jd@example.org'
    //             ],
    //             'dateOfBirth' : '1980-01-02T00:00:00.000Z',
    //             'registered'  : true
    //         },
    //
    //         {
    //             'id'   : 456,
    //             'name' : 'Nemesio Tornero',
    //             'phones' :
    //             {
    //                 'home'   : '800-123-3498',
    //                 'mobile' : '877-432-1278'
    //             },
    //             'email':
    //             [
    //                 'jd@example.com',
    //                 'jd@example.org',
    //             ],
    //             'dateOfBirth' : '1980-01-02T00:00:00.000Z',
    //             'registered'  : true
    //         }
    //     ]
    // });
});

router.get('/:id', function(req, res)
{
    User.findById(req.params.id, function(err, userinfo)
    {
        if(err) res.status(500).send(err);
        else res.status(200).json(userinfo);
    });

        // if(req.params.id == '123')
        // {
        //     res.json({
        //         'id'     : 123,
        //         'name'   : 'Eladio Guardiola',
        //         'phones' :
        //         {
        //             'home'   : '800-123-4567',
        //             'mobile' : '877-123-1234'
        //         },
        //         'email':
        //         [
        //             'jd@example.com',
        //             'jd@example.org'
        //         ],
        //         'dateOfBirth' : '1980-01-02T00:00:00.000Z',
        //         'registered'  : true
        //     });
        // }
        // else
        // {
        //     res.status(404).send('¡Lo siento, el ítem no se ha encontrado!');
        // }
});

router.post('/', function(req, res, next)
{
    User.create(req.body, function(err, userinfo)
    {
        if(err) res.status(500).send(err);
        else res.sendStatus(200);
    });

    // var new_user = req.body;
    // // @TODO: Hacer algo con el nuevo usuario
    // res.status(200).send('Usuario ' + req.body.name + ' ha sido añadido satisfactoriamente');
});

router.put('/:id', function(req, res)
{
    User.findByIdAndUpdate(req.params.id, req.body, function(err, userinfo)
    {
        if(err) res.status(500).send(err);
        else res.sendStatus(200);
    });

    // var updated_user = req.body;
    // //@TODO: Hacer algo con el Usuario
    // res.status(200).send('Usuario ' + req.body.name + ' ha sido actualizado satisfactoriamente');
});

router.delete('/:id', function(req, res)
{
    User.findByIdAndDelete(req.params.id, function(err, userinfo)
    {
        if(err) res.status(500).send(err);
        else res.sendStatus(200);
    });

    //@Todo: hacer algo con el Usuario
    // res.status(200).send('Usuario con id ' + req.params.id + 'ha sido borrado satisfactoriamente');
});

router.post('/signin', function(req, res, next)
{
    User.findOne({ username: req.body.username }, function(err, user)
    {
        if(err) res.status(500).send('¡Error comprobando el usuario!');
        // Si el usuario existe
        if(user != null)
        {
            user.comparePassword(req.body.password, function(err, isMatch)
            {
                if(err) return next(err);

                if(isMatch)
                    res.status(200).send({ message : 'ok', role : user.role, id : user._id });
                else
                    res.status(200).send({ message : 'ko' });
            });
        }
        else
        {
            res.status(200).send({ message : 'ko' });
        }
    });
});

module.exports = router;
