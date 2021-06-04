const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');

// create ninja Schema & model
const UserSchema = new Schema({
    Nombre: {
        type: String,
        required: [true, 'El Nombre es requerido'],
        minLength: [3, 'El nombre tiene que tener mínimo 3 caracteres'],
        validate: {
            validator: function(v) {
              return /^[a-zA-Z\ áéíóúÁÉÍÓÚñÑ\s]*$/.test(v);
            },
            message: props => `${props.value} El nombre no puede tener números`
          },
        unique: false
    },
    Apellidos: {
        type: String,
        required: [true, 'El apellido es requerido'],
        unique: false
    },
    Edad: {
        type: Number,
        required: [true, 'La edad es requerida'],
        min: [0, 'La edad tiene que ser mayor de 0, valor introducido: {VALUE}'],
        max: [125, 'La edad no puedes ser mayor de 125, valor introducido: {VALUE}'],
        unique: false
    },
    Dni: {
        type: String,
        required: [true, 'El DNI es requerido'],
        minLength: [9, 'El DNI no puede tener menos de 9 caracteres, valor introducido: {VALUE}'],
        maxLength: [9, 'El DNI no puede tener más de 9 caracteres, valor introducido: {VALUE}'],
        unique: true
    },
    Cumpleanos: {
        type: String,
        required: [true, 'El cumpleaños es requerido'],
        validate: {
            validator: function(v) {
              return /[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])/.test(v);
            },
            message: props => `${props.value} Formato de fecha inválido. Se requiere formato de fecha AAAA-MM-DD`
          },
        unique: false
    },
    ColorFav: {
        type: String,
        required: [true, 'El color es requerido'],
        min: [3, 'El color tiene que ser mayor de 3, valor introducido: {VALUE}'],
        validate: {
            validator: function(v) {
              return /^[a-zA-Z\ áéíóúÁÉÍÓÚñÑ\s]*$/.test(v);
            },
            message: props => `${props.value} El color no puede tener números`
          },
        unique: false
    },
    Sexo: {
        type: String,
        required: [true, 'El sexo es requerido'],
        enum: ['Hombre', 'Mujer', 'Otro', 'No especificado'],
        enum: {
            values: ['Hombre', 'Mujer', 'Otro', 'No especificado'],
            message: 'El sexo indicado debe ser uno de los siguientes: Hombre, Mujer, Otro, No especificado'
          },
        unique: false
    }
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
