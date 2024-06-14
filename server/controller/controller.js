var Userdb = require('../model/model'); // importing the User model

// create and save new user

exports.create = (req,res)=>{
    // validate request to ensure the body is not empty
    if(!req.body){
        res.status(400).send({ message : "Content can not be emtpy!"});
        return;
    }

    // create a new user instance with the req. data

    const user = new Userdb({
        name : req.body.name,
        email : req.body.email,
        gender: req.body.gender,
        status : req.body.status
    })

    // save user in the database
    user
        .save(user)
        .then(data => {
            //res.send(data)
            res.redirect('/'); // redirect to add_user page after successful creation
        })
        .catch(err =>{
            // handle errors during the save operation
            res.status(500).send({
                message : err.message || "Some error occurred while creating a create operation"
            });
        });

}

// Retrieve and return all users or a single user by ID

exports.find = (req, res)=>{
    // If a query ID is provided, retrieve a single user
    if(req.query.id){
        const id = req.query.id;

        Userdb.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Not found user with id "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Erro retrieving user with id " + id})
            })
            // If no query ID, retrieve all users
    }else{
        Userdb.find()
            .then(user => {
                res.send(user)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving user information" })
            })
    }

    
}

// Update a new idetified user by user id

exports.update = (req, res)=>{

    // Validate request to ensure the body is not empty

    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }

    const id = req.params.id;

    // Find the user by ID and update with the request data

    Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update user with ${id}. Maybe user not found!`})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Update user information"})
        })
}

// Delete a user with specified user id in the request

exports.delete = (req, res)=>{
    const id = req.params.id;

    // Find the user by ID and delete

    Userdb.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }else{
                res.send({
                    message : "User was deleted successfully!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
}