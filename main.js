const audioPlayer = document.getElementById("audio-player");
const playBtn = document.getElementById("play-btn");
const pauseBtn = document.getElementById("pause-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const volumeControl = document.getElementById("volume-control");
const playlistItems = document.querySelectorAll("#playlist-items li");

let currentTrack = 0;

function loadTrack() {
  audioPlayer.src = playlistItems[currentTrack].getAttribute("data-src");
  audioPlayer.load();
}

function playTrack() {
  audioPlayer.play();
}

function pauseTrack() {
  audioPlayer.pause();
}

function nextTrack() {
  currentTrack++;
  if (currentTrack > playlistItems.length - 1) {
    currentTrack = 0;
  }
  loadTrack();
  playTrack();
  setActiveTrack();
}

function prevTrack() {
  currentTrack--;
  if (currentTrack < 0) {
    currentTrack = playlistItems.length - 1;
  }
  loadTrack();
  playTrack();
  setActiveTrack();
}

function setVolume() {
  audioPlayer.volume = volumeControl.value;
}

function setActiveTrack() {
  playlistItems.forEach((item) => {
    item.classList.remove("active");
  });
  playlistItems[currentTrack].classList.add("active");
}

function playNextTrack() {
  if (currentTrack < playlistItems.length - 1) {
    nextTrack();
  } else {
    currentTrack = 0;
    loadTrack();
    playTrack();
    setActiveTrack();
  }
}

audioPlayer.addEventListener("ended", playNextTrack);

loadTrack();

playBtn.addEventListener("click", playTrack);
pauseBtn.addEventListener("click", pauseTrack);
nextBtn.addEventListener("click", nextTrack);
prevBtn.addEventListener("click", prevTrack);
volumeControl.addEventListener("input", setVolume);

playlistItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    currentTrack = index;
    loadTrack();
    playTrack();
    setActiveTrack();
  });
});

const repeatBtn = document.getElementById("repeat-btn");
let isRepeat = false;

function toggleRepeat() {
  isRepeat = !isRepeat;
  repeatBtn.classList.toggle("active", isRepeat);
}

function playNextTrack() {
  if (isRepeat) {
    loadTrack();
    playTrack();
    setActiveTrack();
  } else if (currentTrack < playlistItems.length - 1) {
    nextTrack();
  } else {
    currentTrack = 0;
    loadTrack();
    playTrack();
    setActiveTrack();
  }
}

repeatBtn.addEventListener("click", toggleRepeat);
audioPlayer.addEventListener("ended", playNextTrack);
