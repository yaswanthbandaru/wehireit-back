const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new  Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        token: { type: String },
    },
    { timestamps: true }
);

const UserModel = mongoose.model('User', UserSchema);

module.exports = { UserModel };