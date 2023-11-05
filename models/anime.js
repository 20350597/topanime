const animeModel = {
    getAll: `
      SELECT 
        *
      FROM
        anime
    `,
    getByRank: `
      SELECT
        *
      FROM
        anime
      WHERE
        Rank = ?
    `,
    
    addAnime: `
      INSERT INTO
        anime (Rank, Title, Score)
      VALUES (?, ?, ?)
    `,
    updateAnime: `
      UPDATE
        anime
      SET
        Title = ?,
        Score = ?
      WHERE
        Rank = ?
    `,
    deleteAnime: `
      DELETE FROM anime
      WHERE
        Rank = ?
    `
}
    module.exports = animeModel;
