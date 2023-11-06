const { request, response } = require('express');
const pool = require('../db'); // Importa la conexión a la base de datos

const listAnime = async (req = request, res = response) => {
  let conn;

  try {
    conn = await pool.getConnection();
    const animeList = await conn.query('SELECT * FROM anime');
    res.json(animeList);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  } finally {
    if (conn) {
      conn.end();
    }
  }
}

const getAnimeByID = async (req = request, res = response) => {
  const { id } = req.params;
  if (isNaN(id)) {
    res.status(400).json({ msg: `The ID ${id} is invalid` });
    return;
  }

  let conn;

  try {
    conn = await pool.getConnection();
    const [anime] = await conn.query('SELECT * FROM anime WHERE id = ?', [id]);

    if (!anime) {
      res.status(404).json({ msg: `Anime with ID ${id} not found` });
      return;
    }

    res.json(anime);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  } finally {
    if (conn) {
      conn.end();
    }
  }
}

const addAnime = async (req = request, res = response) => {
  const { Rank, Title, Score } = req.body;

  if (isNaN(Rank) || !Title || isNaN(Score)) {
    res.status(400).json({ msg: 'Invalid input data' });
    return;
  }

  let conn;

  try {
    conn = await pool.getConnection();
    const animeAdded = await conn.query('INSERT INTO anime (Rank, Title, Score) VALUES (?, ?, ?)', [Rank, Title, Score]);

    if (animeAdded.affectedRows === 0) {
      throw new Error('Anime not added');
    }

    res.json('Anime successfully added');
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  } finally {
    if (conn) {
      conn.end();
    }
  }
}

const updateAnime = async (req = request, res = response) => {
  const { Rank, Title, Score } = req.body;
  const { id } = req.params;

  if (isNaN(id) || isNaN(Rank) || !Title || isNaN(Score)) {
    res.status(400).json({ msg: 'Invalid input data' });
    return;
  }

  let conn;

  try {
    conn = await pool.getConnection();
    const [animeExists] = await conn.query('SELECT * FROM anime WHERE Rank = ?', [id]);

    if (!animeExists) {
      res.status(404).json({ msg: `Anime with Rank ${id} not found` });
      return;
    }

    const animeUpdated = await conn.query('UPDATE anime SET Rank = ?, Title = ?, Score = ? WHERE Rank = ?', [Rank, Title, Score, id]);

    if (animeUpdated.affectedRows === 0) {
      throw new Error('Anime not updated');
    }

    res.json({ msg: 'Anime updated successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  } finally {
    if (conn) {
      conn.end();
    }
  }
}

const deleteAnime = async (req = request, res = response) => {
  const { id } = req.params;
  if (isNaN(id)) {
    res.status(400).json({ msg: `The Rank ${id} is invalid` });
    return;
  }

  let conn;

  try {
    conn = await pool.getConnection();
    const [animeExists] = await conn.query('SELECT * FROM anime WHERE Rank = ?', [id]);

    if (!animeExists) {
      res.status(404).json({ msg: `Anime with Rank ${id} not found` });
      return;
    }

    const animeDeleted = await conn.query('DELETE FROM anime WHERE Rank = ?', [id]);

    if (animeDeleted.affectedRows === 0) {
      throw new Error('Anime not deleted');
    }

    res.json({ msg: 'Anime deleted successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  } finally {
    if (conn) {
      conn.end();
    }
  }
}

module.exports = {
  listAnime,
  getAnimeByID,
  addAnime,
  updateAnime,
  deleteAnime
};

