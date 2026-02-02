const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const card = document.querySelector(".card");
const background = document.querySelector(".background");
const bgMusic = document.getElementById("bgMusic");
const yesMusic = document.getElementById("yesMusic");
const danceGif = document.getElementById("danceGif");
const celebrationText = document.getElementById("celebrationText");
const marqueeContainer = document.getElementById("marqueeContainer");

yesMusic.loop = true;
yesMusic.volume = 0.3;

let musicStarted = false;
let yesScale = 1;
let scaleCount = 0;
const maxScales = 10;
const scaleStep = 0.15;

noBtn.style.width = "70px";
noBtn.style.height = "36px";
noBtn.style.position = "absolute";

/* NO button random movement */
function moveNoButton() {
    const cardRect = card.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();
    const padding = 15;
    const maxX = cardRect.width - btnRect.width - padding;
    const maxY = cardRect.height - btnRect.height - padding;
    noBtn.style.left = `${Math.random() * maxX}px`;
    noBtn.style.top = `${Math.random() * maxY}px`;
}

/* YES button grow */
function growYes() {
    if (scaleCount < maxScales) {
        yesScale += scaleStep;
        scaleCount++;
        yesBtn.style.transform = `scale(${yesScale})`;
    }
}

/* NO button avoidance */
document.addEventListener("mousemove", (e) => {
    const btnRect = noBtn.getBoundingClientRect();
    const distance = 60;
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const btnX = btnRect.left + btnRect.width / 2;
    const btnY = btnRect.top + btnRect.height / 2;
    const dx = mouseX - btnX;
    const dy = mouseY - btnY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < distance) {
        moveNoButton();
        growYes();
    }
});

/* Start background music on first click */
document.addEventListener("click", () => {
    if (!musicStarted) {
        bgMusic.play().catch(() => { });
        musicStarted = true;
    }
});

/* Create rose petals */
function createRose() {
    const rose = document.createElement("div");
    rose.classList.add("rose");
    rose.style.left = Math.random() * 100 + "vw";
    rose.style.animationDuration = 4 + Math.random() * 5 + "s";
    rose.style.transform = `rotate(${Math.random() * 360}deg)`;
    background.appendChild(rose); // append to background
    setTimeout(() => rose.remove(), 9000);
}

/* Create confetti */
function createConfetti() {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");
    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.animationDuration = 3 + Math.random() * 3 + "s";
    confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
    background.appendChild(confetti); // append to background
    setTimeout(() => confetti.remove(), 6000);
}

/* Start rose petals immediately */
setInterval(createRose, 300);

/* YES button click */
yesBtn.addEventListener("click", () => {
    alert("TARA NA SA MT. MEGATONG!! ME NA IMONG PERSONAL PORTER!^__^");

    // hide buttons and show celebration
    yesBtn.style.display = "none";
    noBtn.style.display = "none";
    document.querySelector(".buttons").style.display = "none";
    danceGif.style.display = "block";
    celebrationText.style.display = "block";
    marqueeContainer.style.display = "block";

    // stop background music and play YES music
    bgMusic.pause();
    bgMusic.currentTime = 0;
    yesMusic.play().catch(() => { });

    // start confetti after YES click
    setInterval(createConfetti, 200);
});

