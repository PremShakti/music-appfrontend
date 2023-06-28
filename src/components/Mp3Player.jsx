import React, { useState, useEffect } from 'react';

const Mp3Player = ({ songs }) => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const currentSong = songs[currentSongIndex];

  useEffect(() => {
    const audioPlayer = document.getElementById('audioPlayer');
    if (isPlaying) {
      audioPlayer.play();
    } else {
      audioPlayer.pause();
    }
  }, [isPlaying]);

  const playPauseSong = () => {
    setIsPlaying(!isPlaying);
  };

  const changeSong = (index) => {
    setCurrentSongIndex(index);
    setIsPlaying(true);
  };

  const renderSongs = () => {
    return songs.map((song, index) => (
      <div
        key={index}
        className={`song ${index === currentSongIndex ? 'active' : ''}`}
        onClick={() => changeSong(index)}
      >
        {song.title}
      </div>
    ));
  };

  return (
    <div className="mp3Player">
      <audio id="audioPlayer" src={currentSong.url} />
      <div className="player">
        <div className="songTitle">{currentSong.title}</div>
        <div className="controls">
          <button className="playPauseButton" onClick={playPauseSong}>
            {isPlaying ? 'Pause' : 'Play'}
          </button>
        </div>
      </div>
      <div className="songList">{renderSongs()}</div>
    </div>
  );
};

export default Mp3Player;
