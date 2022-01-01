var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next)
{
    res.json(
    {
        'users' :
        [
            {
                'id'     : 123,
                'name'   : 'Eladio Guardiola',
                'phones' :
                {
                    'home'   : '800-123-4567',
                    'mobile' : '877-123-1234'
                },
                'email':
                [
                    'jd@example.com',
                    'jd@example.org'
                ],
                'dateOfBirth' : '1980-01-02T00:00:00.000Z',
                'registered'  : true
            },

            {
                'id'   : 456,
                'name' : 'Nemesio Tornero',
                'phones' :
                {
                    'home'   : '800-123-3498',
                    'mobile' : '877-432-1278'
                },
                'email':
                [
                    'jd@example.com',
                    'jd@example.org',
                ],
                'dateOfBirth' : '1980-01-02T00:00:00.000Z',
                'registered'  : true
            }
        ]
    });
});

route.get('/:id', function(req, res)
{
        if(req.params.id == '123')
        {
            res.json({
                'id'     : 123,
                'name'   : 'Eladio Guardiola',
                'phones' :
                {
                    'home'   : '800-123-4567',
                    'mobile' : '877-123-1234'
                },
                'email':
                [
                    'jd@example.com',
                    'jd@example.org'
                ],
                'dateOfBirth' : '1980-01-02T00:00:00.000Z',
                'registered'  : true
            });
        }
        else
        {
            res.status(404).send('¡Lo siento, el ítem no se ha encontrado!')
        }
});

route.post('/', function(req, res)
{
    var new_user = req.body;
    // @TODO: Hacer algo con el nuevo usuario
    res.status(200).send('Usuario ' + req.body.name + ' ha sido añadido satisfactoriamente');
});

route.put('/:id', function(req, res)
{
    var updated_user = req.body;
    //@TODO: Hacer algo con el Usuario
    res.status(200).send('Usuario ' + req.body.name + ' ha sido actualizado satisfactoriamente');
});

route.delete('/:id', function(req, res)
{
    //@Todo: hacer algo con el Usuario
    res.status(200).send('Usuario con id ' + req.params.id + 'ha sido borrado satisfactoriamente');
});

module.exports = router;
