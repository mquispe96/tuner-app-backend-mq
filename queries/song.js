const db = require('../db/dbConfig.js');

const getAllSongs = async () => {
  try {
    const allSongs = await db.any('SELECT * FROM songs');
    return allSongs;
  } catch (error) {
    return error;
  }
};

const getSongById = async id => {
  try {
    const song = await db.one('SELECT * FROM songs WHERE id = $1', id);
    return song;
  } catch (error) {
    return error;
  }
};

const createSong = async song => {
  const keys = Object.keys(song);
  const dbKeys = keys.filter(key => song[key]);
  const dbValues = dbKeys.map(key => '${' + key + '}').join(', ');
  try {
    const newSong = await db.one(
      `INSERT INTO songs (${dbKeys.join(', ')}) VALUES (${dbValues}) RETURNING *`,
      song
    );
    return newSong;
  } catch (error) {
    return error;
  }
};

const updateSong = async (id, song) => {
  const keys = Object.keys(song);
  const dbKeys = keys.filter(key => song[key]);
  const dbValues = dbKeys.map((key, idx) => `${key} = $${idx + 2}`).join(', ');
  try {
    const updatedSong = await db.one(
      `UPDATE songs SET ${dbValues} WHERE id = $1 RETURNING *`,
      [id, ...dbKeys.map(key => song[key])]);
    return updatedSong;
  } catch (error) {
    return error;
  }
}

const deleteSong = async id => {
  try {
    const deletedSong = await db.one('DELETE FROM songs WHERE id = $1 RETURNING *', id);
    return deletedSong;
  } catch (error) {
    return error;
  }
}

module.exports = {getAllSongs, getSongById, createSong, updateSong, deleteSong};
