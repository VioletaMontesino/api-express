const axios = require('axios');
const ejs = require('ejs');

exports.users = (req,res) => {
    axios.get('http://localhost:3000/users')
    .then(function(response){
        console.log(response.data)
        res.render('index', { users : response.data });
    })
    .catch(err =>{
        res.send(err);
    })
}

exports.add_user = (req,res) => {
    res.render('add_user');
}

exports.update_user = (req, res) =>{
    var id = req.query.id;
    console.log(id)
    axios.get(`http://localhost:3000/users/${id}`)
        .then(function(userdata){
            res.render("update_user", { user : userdata.data})
        })
        .catch(err =>{
            res.send(err);
        }) 
}