const video = document.getElementById('timelapse');
const playPauseBtn = document.getElementById('playPauseBtn');
const progressBar = document.getElementById('progressBar');
const currentTimeSpan = document.getElementById('currentTime');
const durationSpan = document.getElementById('duration');
const speedSlider = document.getElementById('speedSlider');
const currentSpeedSpan = document.getElementById('currentSpeed');

function changePlaybackSpeed(speed) {
	if (video) {
		video.playbackRate = speed/15;
	}
}

speedSlider.addEventListener('input', function() {
	const newSpeed = parseInt(this.value);
	changePlaybackSpeed(newSpeed);
	if (newSpeed == 1) {
		currentSpeedSpan.textContent = '1x (Realtime)';
	} else {
		currentSpeedSpan.textContent = newSpeed + 'x';
	}
});

video.playbackRate = 0.0666666 //lmfao
if (speedSlider.value == 1) {
	currentSpeedSpan.textContent = '1x (Realtime)';
} else {
	currentSpeedSpan.textContent = speedSlider.value + 'x';
}

playPauseBtn.addEventListener('click', function() {
	if (video.paused || video.ended) {
		video.play();
		playPauseBtn.textContent = 'Pause';
	} else {
		video.pause();
		playPauseBtn.textContent = 'Play';
	}
});

video.addEventListener('timeupdate', function() {
	const progress = (video.currentTime / video.duration) * 100;
	progressBar.value = progress;

	currentTimeSpan.textContent = formatTime(video.currentTime);
});

video.addEventListener('loadedmetadata', function() {
	durationSpan.textContent = formatTime(video.duration);
	progressBar.max = 100;
});

progressBar.addEventListener('input', function() {
	const seekTime = (parseFloat(this.value) / 100) * video.duration;
	video.currentTime = seekTime;
});

function formatTime(seconds) {
	const totalSeconds = seconds * 15;
	const hours = Math.floor(totalSeconds / 3600);
	const minutes = Math.floor((totalSeconds % 3600) / 60);
	const remainingSeconds = Math.floor(totalSeconds % 60);
	const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
	const formattedSeconds = remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds;
	return hours > 0 ? `${hours}:${formattedMinutes}:${formattedSeconds}` : `${formattedMinutes}:${formattedSeconds}`;
}