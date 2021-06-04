const User = require('../model/user');
const { users } = require('../services/render');

// Listar usuarios
exports.find = (req,res) => {
    User.find().then(data=>{
        res.send(data)
    }).catch(err=>{
        res.status(500).send({
            message: err.message || "Error al listar los usuarios "
        });
    })
}

// Listar un usuario
exports.findOne = (req,res) => {
    const id = req.params.id;
    User.findById(id)
    .then(data =>{
        if(!data){
            res.status(404).send({ message : "No se ha encontrado el usuario con el id "+ id})
        }else{
            res.send(data)
        }
    })
    .catch(err =>{
        res.status(500).send({ message: "Error al encontrar el usuario con id " + id})
    })
}

// Crear un nuevo usuario
exports.create = (req,res) => {
    if(!req.body) {
        res.status(400).send({message: "La petición no puede ir vacía"});
        return;
    } else {

        // Creamos nuevo usuario a partir de los datos del formulario
        const user = new User({
            Nombre: req.body.Nombre,
            Apellidos: req.body.Apellidos,
            Edad: req.body.Edad,
            Dni: req.body.Dni,
            Cumpleanos: req.body.Cumpleanos,
            ColorFav: req.body.ColorFav,
            Sexo: req.body.Sexo
        });

        // Enviamos el usuario a MongoDB
        user.save(user).then(data=> {
            res.redirect('/')
        }).catch(err=>{
            res.status(500).send({
                message: err.message || "Error al crear el usuario"
            });
        });
    }
}

// Actualizar un usuario
exports.update = (req, res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }

    const id = req.params.id;
    User.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `No se puede actualizar el usuario con el id ${id}!`})
            }else{
           /*      User.findOne(id).then(function(data){
                    res.send("Actualizado usuario como: " + data)
                }) */
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error al actualizar la información del usuario"})
        })
}


// Borrar un usuario
exports.delete = (req, res)=>{
    const id = req.params.id;

    User.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `No se puede borrar el usuario con id ${id}`})
            }else{
                res.send({
                    message : "Usuario borrado correctamente!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "No se puede encontrar el usuario con id" + id
            });
        });
}

