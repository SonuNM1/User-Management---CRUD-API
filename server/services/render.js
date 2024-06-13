const axios = require('axios');

exports.homeRoutes = (req, res) => {
    // Make a GET request to /api/users
    axios.get('http://localhost:8080/api/users')
        .then(function(response) {
            // console.log(response.data);
            res.render('index', { users: response.data });
        })
        .catch(function(error) {
            console.error('Error fetching users:', error);
            res.send(error);
        });
};

exports.addUser = (req, res) => {
    res.render('add_user');
};

exports.update_user = (req, res) => {
    res.render('update_user');
};
