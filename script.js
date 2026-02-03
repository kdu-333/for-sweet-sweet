const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const card = document.querySelector(".card");
const background = document.querySelector(".background");
const bgMusic = document.getElementById("bgMusic");
const yesMusic = document.getElementById("yesMusic");
const danceGif = document.getElementById("danceGif");
const celebrationText = document.getElementById("celebrationText");
const marqueeContainer = document.getElementById("marqueeContainer");
const petalHint = document.getElementById("petalHint");

yesMusic.loop = true;
yesMusic.volume = 0.8;

let musicStarted = false;
let yesScale = 1;
let scaleCount = 0;
const maxScales = 10;
const scaleStep = 0.15;

/* NO button size and position */
noBtn.style.width = "70px";
noBtn.style.height = "36px";
noBtn.style.position = "absolute";

/*background music*/
function startMusic() {
    if (!musicStarted) {
        bgMusic.play().catch(() => { });
        musicStarted = true;
    }
}

/* NO button random movement*/
function moveNoButton() {
    const cardRect = card.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();
    const padding = 20;

    const maxX = cardRect.width - btnRect.width - padding;
    const maxY = cardRect.height - btnRect.height - padding;

    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    noBtn.style.left = `${randomX}px`;
    noBtn.style.top = `${randomY}px`;
}

/* YES button grow*/
function growYes() {
    if (scaleCount < maxScales) {
        yesScale += scaleStep;
        scaleCount++;
        yesBtn.style.transform = `scale(${yesScale})`;
    }
}

/* NO button lihokan*/
document.addEventListener("mousemove", (e) => {
    const btnRect = noBtn.getBoundingClientRect();
    const distance = 80;

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

/* Start music on ANY click */
document.addEventListener("click", startMusic);

/* Create rose petals */
function createRose() {
    const rose = document.createElement("div");
    rose.classList.add("rose");

    rose.style.left = Math.random() * 100 + "vw";
    rose.style.animationDuration = 4 + Math.random() * 5 + "s";
    rose.style.transform = `rotate(${Math.random() * 360}deg)`;

    rose.addEventListener("click", startMusic);

    background.appendChild(rose);
    setTimeout(() => rose.remove(), 9000);
}

/* Create confetti */
function createConfetti() {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");

    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.animationDuration = 3 + Math.random() * 3 + "s";
    confetti.style.transform = `rotate(${Math.random() * 360}deg)`;

    background.appendChild(confetti);
    setTimeout(() => confetti.remove(), 6000);
}

setInterval(createRose, 300);

/* ALERT MESSSAGE BAI*/
yesBtn.addEventListener("click", () => {
    alert("TARA NA SA MATIGOL!! AKO IMONG PERSONAL PORTER HA!^__^");

    petalHint.style.display = "none";

    yesBtn.style.display = "none";
    noBtn.style.display = "none";
    document.querySelector(".buttons").style.display = "none";

    danceGif.style.display = "block";
    celebrationText.style.display = "block";
    marqueeContainer.style.display = "block";

    bgMusic.pause();
    bgMusic.currentTime = 0;
    yesMusic.play().catch(() => { });

    setInterval(createConfetti, 200);
});

