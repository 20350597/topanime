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

