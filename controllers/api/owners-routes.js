const router = require('express').Router();
const { Owner, Appointment, Pet } = require('../../models');

// GET /api/owner
router.get('/', (req, res) => {
  Owner.findAll({
    attributes: {exclude: ['password'] }
  })
    .then(dbOwnerData => res.json(dbOwnerData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// GET /api/owner/1
router.get('/:id', (req, res) => {
  Owner.findOne({
    attributes: {exclude: ['password']},
    where: {
      id: req.params.id
    },
    include: [  {
      model: Pet,
      attributes: ['id', 'name', 'type', 'breed', 'age', 'owner_name']
    },
    {
      model: Pet,
      attributes: ['title'],
      through: Appointment,
      as: 'Pet_appointments'
    }
  ]
  })
    .then(dbOwnerData => {
      if (!dbOwnerData) {
        res.status(404).json({ message: 'No owner found with this id' });
        return;
      }
      res.json(dbOwnerData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// POST /api/owner
router.post('/', (req, res) => {
  // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}
  Owner.create({
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    password: req.body.password
  })
    .then(dbOwnerData => res.json(dbOwnerData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

//POST /api/owner/login
router.post('/login', (req, res) => {
  // expects {email: 'lernantino@gmail.com', password: 'password1234'}
    Owner.findOne({
      where: {
        email: req.body.email
      }
    }).then(dbOwnerData => {
      if (!dbOwnerData) {
        res.status(400).json({ message: 'No owners with that email address!' });
        return;
      }
      // Verify user
      const validPassword = dbOwnerData.checkPassword(req.body.password);
      if (!validPassword) {
        res.status(400).json({ message: 'Incorrect password!' });
        return;
      }
      
      res.json({ user: dbOwnerData, message: 'You are now logged in!' });
    });  
  });

// PUT /api/owner/1
router.put('/:id', (req, res) => {
 // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}

  // if req.body has exact key/value pairs to match the model, you can just use `req.body` instead
  Owner.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id
    }
  })
    .then(dbOwnerData => {
      if (!dbOwnerData[0]) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(dbOwnerData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// DELETE /api/owner/1
router.delete('/:id', (req, res) => {
  Owner.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbOwnerData => {
      if (!dbOwnerData) {
        res.status(404).json({ message: 'No owner found with this id' });
        return;
      }
      res.json(dbOwnerData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;