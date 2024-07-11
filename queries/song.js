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
  try {
    const newSong = await db.one(
      'INSERT INTO songs (name, artist, album, is_favorite, time) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [song.name, song.artist, song.album, song.is_favorite, song.time],
    );
    return newSong;
  } catch (error) {
    return error;
  }
};

const updateSong = async (id, song) => {
  try {
    const currentSongData = await getSongById(id);
    const updatedSongData = {
      name: song.name || currentSongData.name,
      artist: song.artist || currentSongData.artist,
      album: song.album || currentSongData.album,
      is_favorite: song.is_favorite || currentSongData.is_favorite,
      time: song.time || currentSongData.time,
    };
    const updatedSong = await db.one(
      'UPDATE songs SET name = $1, artist = $2, album = $3, is_favorite = $4, time = $5 WHERE id = $6 RETURNING *',
      [updatedSongData.name, updatedSongData.artist, updatedSongData.album, updatedSongData.is_favorite, updatedSongData.time, id],
    );
    return updatedSong;
  } catch (error) {
    return error;
  }
};

const deleteSong = async id => {
  try {
    const deletedSong = await db.one(
      'DELETE FROM songs WHERE id = $1 RETURNING *',
      id,
    );
    return deletedSong;
  } catch (error) {
    return error;
  }
};

module.exports = {getAllSongs, getSongById, createSong, updateSong, deleteSong};
