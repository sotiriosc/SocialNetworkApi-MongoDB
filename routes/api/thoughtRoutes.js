const router = require('express').Router();
const ThoughtController = require('../../controllers/thoughtController');

router
  .route('/')
  .get(ThoughtController.getAllThoughts)
  .post(ThoughtController.createThought);

router
  .route('/:id')
  .get(ThoughtController.getThoughtById)
  .put(ThoughtController.updateThought)
  .delete(ThoughtController.deleteThought);

router
  .route('/:thoughtId/reactions')
  .post(ThoughtController.createReaction);

router
  .route('/:thoughtId/reactions/:reactionId')
  .delete(ThoughtController.deleteReaction);

module.exports = router;
