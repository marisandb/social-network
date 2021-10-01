const { User } = require('../models');

const userController = {
    // get all users
    getAllUsers(req, res) {
        User.find({})
          .populate({
            path: 'thoughts',
            select: '-__v'
          })
          .populate({
            path: 'friends',
            select: '-__v'
          })
          .select('-__v')
          .sort({ _id: -1 })
          .then(dbUserData => res.json(dbUserData))
          .catch(err => {
            console.log(err);
            res.status(400).json(err);
          });
      },
  
    // get one User by id
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
          .populate({
            path: 'thoughts',
            select: '-__v'
          })
          .select('-__v')
          .then(dbUserData => {
            if (!dbUserData) {
              res.status(404).json({ message: 'No User found with this id!' });
              return;
            }
            res.json(dbUserData);
          })
          .catch(err => {
            console.log(err);
            res.status(400).json(err);
          });
      },

    // createUser
    createUser({ body }, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err));
    },

    // update User by id
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
        .then(dbUserData => {
            if (!dbUserData) {
            res.status(404).json({ message: 'No User found with this id!' });
            return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },

    // delete User
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    },


    removeFriend({ params }, res) {
        User.findOneAndUpdate(      
        { _id: params.sourceId },
        { $pull: { friends: params.targetId } },
        { new: true })
        .then((removedFriend) => {
            if (!removedFriend) {
            return res
                .status(404)
                .json({ message: "No friend with this id!" });
            }
            return User.findOneAndUpdate(
            { _id: params.targetId },
            { $pull: { friends: params.sourceId } },
            { new: true }
            );
        })
        .then((dbUserData) => {
            if (!dbUserData) {
            res.status(404).json({ message: "No user found with this id!" });
            return;
            }
            res.json(dbUserData);
        })
        .catch((err) => res.json(err));
    }
};

module.exports = UserController;