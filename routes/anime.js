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
router.get('/:Rank', getAnimeByID);
router.post('/', addAnime);
router.put('/:Rank', updateAnime);
router.delete('/:Rank', deleteAnime);

module.exports = router;
