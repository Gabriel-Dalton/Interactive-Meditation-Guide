document.addEventListener("DOMContentLoaded", function () {
    let progressBar = document.getElementById("progress");
    let progressText = document.getElementById("progressText");
    let footerText = document.getElementById("footerText");
    let meditationScript = document.getElementById("meditationScript");

    let progress = 0;
    let meditationDuration = 300000; // 5 minutes
    let scriptMessages = [
        "Close your eyes and take a deep breath...",
        "Feel the tension in your body slowly release...",
        "Inhale deeply... and exhale slowly...",
        "Let go of any worries or stress...",
        "Feel your body becoming lighter...",
        "Inhale peace... exhale relaxation...",
        "You are calm, you are at peace...",
        "Slowly open your eyes whenever you're ready..."
    ];

    let scriptIndex = 0;
    let messageInterval = meditationDuration / scriptMessages.length;

    let meditationInterval = setInterval(() => {
        if (progress < 100) {
            progress += 100 / scriptMessages.length;
            progressBar.style.width = progress + "%";
            progressText.textContent = Math.floor(progress) + "%";

            if (scriptIndex < scriptMessages.length) {
                meditationScript.textContent = scriptMessages[scriptIndex];
                scriptIndex++;
            }

            if (progress === 50) {
                footerText.textContent = "You're halfway there!";
            }
        } else {
            clearInterval(meditationInterval);
            meditationScript.innerHTML = `<strong>Meditation Complete</strong><br>Thank you for meditating with us.`;
        }
    }, messageInterval);
});
