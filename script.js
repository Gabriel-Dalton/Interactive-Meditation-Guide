// Display the first step and hide the others
function goToStep(stepNumber) {
    const steps = document.querySelectorAll('.step');
    steps.forEach(step => step.classList.add('hidden'));
    document.getElementById(`step-${stepNumber}`).classList.remove('hidden');
}

document.addEventListener('DOMContentLoaded', function() {
    goToStep(1); // Start with the first step visible
});

document.getElementById('start-meditation').addEventListener('click', function () {
    const sessionLength = parseInt(document.getElementById('session-length').value, 10);
    const meditationType = document.getElementById('meditation-type').value;
    const backgroundSound = document.getElementById('background-sound').value;

    startMeditation(sessionLength, meditationType, backgroundSound);
});

const meditationSteps = [
    "Close your eyes and take a deep breath.",
    "Focus on the sound around you.",
    "Let go of any tension in your body.",
    "Visualize a calm, peaceful place.",
    "Stay present in this moment.",
    "When you're ready, slowly open your eyes."
];

function startMeditation(duration, type, sound) {
    const progressBar = document.getElementById('progress');
    const stepsContainer = document.getElementById('meditation-steps');
    let progress = 0;
    let stepIndex = 0;
    const interval = (duration * 60000) / meditationSteps.length; // Convert minutes to milliseconds divided by steps

    // Start the background sound and check if it's playing
    const audio = playBackgroundSound(sound);

    // If sound is not playing (muted or volume too low)
    setTimeout(() => {
        if (audio.paused || audio.muted || audio.volume === 0) {
            alert("It seems like the sound is not playing. Please check your volume or sound settings.");
        } else {
            alert("Sound is playing.");
        }
    }, 1000); // Check after 1 second

    // Start the meditation session
    const meditationInterval = setInterval(function() {
        if (stepIndex < meditationSteps.length) {
            stepsContainer.innerText = meditationSteps[stepIndex];
            progress += 100 / meditationSteps.length;
            progressBar.style.width = progress + '%';
            stepIndex++;
        } else {
            clearInterval(meditationInterval);
            stepsContainer.innerText = "Meditation Complete! Take your time to open your eyes.";
            progressBar.style.width = '100%';
        }
    }, interval);
}

function playBackgroundSound(sound) {
    let audioSrc;
    switch (sound) {
        case 'forest':
            audioSrc = 'https://github.com/Gabriel-Dalton/Interactive-Meditation-Guide/raw/main/forest.mp3';
            break;
        case 'ocean':
            audioSrc = 'https://github.com/Gabriel-Dalton/Interactive-Meditation-Guide/raw/main/ocean.mp3';
            break;
        case 'rain':
            audioSrc = 'https://github.com/Gabriel-Dalton/Interactive-Meditation-Guide/raw/main/rain.mp3';
            break;
        default:
            audioSrc = '';
    }

    if (audioSrc) {
        const audio = new Audio(audioSrc);
        audio.loop = true;
        audio.play();
        return audio;
    }
}
