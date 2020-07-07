const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const Schema = mongoose.Schema;

const voucherSchema = new Schema({

    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (value) {
                return validator.isEmail(value);
            },
            message: function () {
                return "invalid email";
            }
        }
    },
    pin: {
        type: String,
    },
    code: {
        type: String,
        unique: true
    },

    status: {
        type: String
    },

    createdAt: {
        type: Date,
        default: Date.now
    }

});

// static method [collection of objects where we're seaching one object]
voucherSchema.statics.findByToken = function (token) {
    const User = this;
    let tokenData; //block scope
    try {
        //run time errors are
        tokenData = jwt.verify(token, "jwt@123");
    } catch (err) {
        return Promise.reject(err);
    }

    return User.findOne({
        _id: tokenData._id,
        "tokens.token": token
    });
};


// instance method {specifies an object}
voucherSchema.methods.generateToken = function () {
    const user = this;
    const tokenData = {
        _id: user._id,
        username: user.username,
        createdAt: Number(new Date()) //storing in milliseconds
    };

    const token = jwt.sign(tokenData, "jwt@123");
    user.tokens.push({
        token
    });

    return user
        .save()
        .then(function (user) {
            return Promise.resolve(token);
        })
        .catch(function (err) {
            return Promise.reject(err);
        });
};

const Voucher = mongoose.model("Voucher", voucherSchema);
module.exports = {
    Voucher
};