const express = require('express');
const router = express.Router();
const {
  listAnime,
  getAnimeByID,
  addAnime,
  updateAnime,
  deleteAnime
} = require('../controllers/anime');

router.get('/', listAnime);
router.get('/:id', getAnimeByID);
router.post('/', addAnime);
router.put('/:id', updateAnime);
router.delete('/:id', deleteAnime);

module.exports = router;
