const { default: mongoose } = require('mongoose');
const { UserModel } = require("../models/userSchema");

// create User
const createUser = async (userdata) => {
    const user = await UserModel.create({name: userdata.name, email: userdata.email, password: userdata.password})
    const userData = await user.save();
    return userData;
}

// update User
const updateUser = async (newdata) => {
    const filter = { _id: mongoose.Types.ObjectId(newdata._id )};
    const update = { ...newdata };
    let doc = await UserModel.findOneAndUpdate(filter, update, {
        returnOriginal: false
    });

    return doc
}

// get User
const getUser = async (userId) => {
    const user = await UserModel.findById(userId);
    return user.toJSON();
};

// delete User
const deleteUser = async (userId) => {
    await UserModel.deleteOne(userId);
}

// export services
module.exports = { getUser };