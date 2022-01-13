"use strict"

const mongoose = require("mongoose")
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')

const UsersSchema = Schema({
    documento: String,
    password: {type: String, select: false},
    nombre: String,
    apellido: String,
    avatarUrl: String,
    signupDate: {type: Date, default: Date.now()},
    lastLogin: Date,
})

UsersSchema.pre('save', function(next) {
    let user = this
    if (!user.isModified("password")) return next()

    bcrypt.genSalt(10, (err, salt) => {
        if(err) return next(err)

        bcrypt.hash(user.password, salt, null, (err, hash) => {
            if(err) return next(err)

            user.password = hash 
            next()
        })
    })
})

UsersSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        cb(err, isMatch)
    });
}
 
module.exports = mongoose.model("user", UsersSchema)