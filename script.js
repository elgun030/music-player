const audioPlayer = document.getElementById('audio-player');
const playPauseBtn = document.getElementById('play-pause-btn');
const playIcon = document.getElementById('play-icon');
const pauseIcon = document.getElementById('pause-icon');
const progressBar = document.getElementById('progress-bar');
const progressContainer = document.getElementById('progress-container');
const volumeBar = document.getElementById('volume-bar');
const albumArt = document.getElementById('album-art');
const songTitle = document.getElementById('song-title');
const songArtist = document.getElementById('song-artist');
const currentTimeElem = document.getElementById('current-time');
const totalDurationElem = document.getElementById('total-duration');

const songs = [
    {
        title: "Elini Ver",
        artist: "Amo988",
        src: "/music/Amo988 - Elini Ver.mp3",
        img: "/images/amo98.jpg"
    },
    {
        title: "NİMET",
        artist: "DİDOMİDO feat. EGLO G",
        src: "/music/DİDOMİDO feat. EGLO G - NIMET 1.mp3",
        img: "/images/didem.jpg"
    },
    {
        title: "Mockingbird",
        artist: "Eminem",
        src: "/music/Eminem - Mockingbird [Official Music Video].mp3",
        img: "/images/eminem.jpg"
    },
    {
        title: "Morphiniya 7",
        artist: "L'morphine",
        src: "/music/L'morphine - Morphiniya 7.mp3",
        img: "/images/morphie.jpg"
    },
    {
        title: "CAN'T HOLD US",
        artist: "MACKLEMORE & RYAN LEWIS",
        src: "/music/MACKLEMORE & RYAN LEWIS - CAN'T HOLD US FEAT. RAY DALTON (OFFICIAL MUSIC VIDEO).mp3",
        img: "/images/macklemore.jpg"
    }
];

let currentSongIndex = 2; // Eminem - Mockingbird mahnısıyla başlat

function loadSong(index) {
    const song = songs[index];
    audioPlayer.src = song.src;
    albumArt.src = song.img;
    songTitle.textContent = song.title;
    songArtist.textContent = song.artist;
    audioPlayer.addEventListener('loadedmetadata', () => {
        totalDurationElem.textContent = formatTime(audioPlayer.duration);
    });
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

function updateProgress() {
    const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progressBar.style.width = `${progress}%`;
    currentTimeElem.textContent = formatTime(audioPlayer.currentTime);
}

loadSong(currentSongIndex);

playPauseBtn.addEventListener('click', togglePlayPause);

function togglePlayPause() {
    if (audioPlayer.paused) {
        playSong();
    } else {
        pauseSong();
    }
}

function playSong() {
    audioPlayer.play();
    playIcon.classList.add('hidden');
    pauseIcon.classList.remove('hidden');
}

function pauseSong() {
    audioPlayer.pause();
    playIcon.classList.remove('hidden');
    pauseIcon.classList.add('hidden');
}

audioPlayer.addEventListener('timeupdate', updateProgress);

progressContainer.addEventListener('click', (e) => {
    const rect = progressContainer.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const width = rect.width;
    const newTime = (offsetX / width) * audioPlayer.duration;
    audioPlayer.currentTime = newTime;
});

volumeBar.addEventListener('input', () => {
    audioPlayer.volume = volumeBar.value;
});

document.getElementById('prev-btn').addEventListener('click', () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    playSong();
});

document.getElementById('next-btn').addEventListener('click', () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    playSong();
});
