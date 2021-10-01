const router = require('express').Router();
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    removeFriend
  } = require('../../controllers/user-controller');

router
  .route('/')
  .get(getAllUsers)
  .post(createUser);


router
  .route('/:id')
  .get(getUserById)
  .put(updateUser)
  .put(removeFriend)
  .delete(deleteUser);

module.exports = router;