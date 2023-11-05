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
    const [anime] = await conn.query('SELECT * FROM anime WHERE Rank = ?', [id]);

    if (!anime) {
      res.status(404).json({ msg: `Anime with Rank ${id} not found` });
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

