let express = require('express')
let db = require('../models')
let Student = db.Student

let router = express.Router()

router.get('/students', function(req, res, next){
    Student.findAll( {order: ['present', 'name']} ).then( students => {
        return res.json(students)
    }).catch( err => next(err) )
})

router.post('/students', function(req, res, next){
    Student.create(req.body).then( (data) => {
        return res.status(201).send('ok')
    }).catch( err => {
        // handle user errors, missing input
        if (err instanceof db.Sequelize.ValidationError) {
            // respond with 400 Bad resquest error code, includ error messages
            let messages = err.errors.map( e => e.message )
            return res.status(400).json(messages)
        }

        // otherwise something has gone wrong pass to server.js
        return next(err)
    })
})

router.patch('/students/:id', function(req, res, next){
    // if request is to /students/100
    // req.params will be 100 and studentID will be 100
    let studentID = req.params.id
    let updatedStudent = req.body
    Student.update( updatedStudent, {where: {id: studentID } } )
    .then( (rowsModified) => {
        
        let numberOfRowsModified = rowsModified[0] // num of rows changed

        if (numberOfRowsModified == 1){
            return res.send('ok')
        }

        else {
            return res.status(404).json(['Student with that id not found'])
        }
    })
    .catch(err => {
        // if validation error, bad request - modify student to not have name
        if (err instanceof db.Sequelize.ValidationError) {
            let messages = err.errors.map( e => e.message)
            return res.status(400).json(messages)
        }
        else {
            // unexpected error
            return next(err)
        }
            
        
    })

    router.delete('/students/:id', function(req, res, next) {
        Student.destroy({where: {id: req.params.id}})
        .then( rowsModified => {
            return res.send('ok')
        })
    })
})

module.exports = router