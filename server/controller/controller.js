
var Userdb = require('../model/model') ; 

// Create and Save new user 

exports.create = (req, res)=>{
    
    // validate the request 

    if(!req.body){
        res.status(400).send({message: 'Content can not be empty'}) ; 
        return ; 
    }

    // new user 

    const user = new Userdb({
        name: req.body.name , 
        email: req.bod.email , 
        gender: req.body.gender , 
        status: req.body.status
    }) ; 

    // save user in the database 

    user
    .save(user)
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occured while creating a create operation"
        }) ; 
    }) ; 

}

// retrieve and return all users / retrieve and return a single user 

exports.find = (req, res) => {
    Userdb.find()
    .then(user => {
        res.send(user)
    })
    .catch(err => {
        res.status(500).send({message: err.message || "Error occured while retrieviing user information" })
    })
}

// Update a new identified user by user id 

exports.update = (req, res) => {
    if(!res.body){
        return res.status(400).send({message: "Data to be updated cannot be empty"})
    }

    const id = req.params.id ; 

    Userdb.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
    .then(data =>{
        if(!data){
            res.status(404).send({message: `Cannot update user with ${id}. Maybe user not found!`})
        } else {
            res.send(data)
        }
    })
    .catch(err =>{
        res.status(500).send({message: "Error in updating the user information"})
    } )
}

// Delete a user with specified user id in the request 

exports.delete = (req, res) => {
    const id = req.params.id ; 

    Userdb.findByIdAndDelete(id)
    .then(data => {
        if(!data){
            res.status(404).send({message: `Cannot delete with ${id}. Maybe id is wrong`})
        } else {
            res.send({
                message: "User was deleted successfully"
            })
        }
    })
    .catch(err => {
        res.status(500).send({message: `Couldn't delete User with id = ${id}`})
    })
}