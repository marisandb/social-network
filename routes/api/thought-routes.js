const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtById,
    addThought,
    updateThought,
    addReaction,
    removeReaction,
    removeThought
  } = require('../../controllers/thought-controller');

router.route("/").get(getAllThoughts);
router.route("/:thoughtId").get(getThoughtById);
router.route("/").post(addThought);
router.route("/:thoughtId").put(updateThought).delete(removeThought);
router.route("/:thoughtId/reactions/").post(addReaction);
router.route("/:thoughtId/reactions/:userReactionId").delete(removeReaction);

module.exports = router;