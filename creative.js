/* ===== TASK 5: Creativity and Engagement (Build page) ===== */

// ---------- Data (objects, arrays) ----------
const BASE_PRICES = { samyang: 4, buldak: 5, shin: 4 };

const TOPPINGS = {
    "cheese":      { emoji: "🧀", price: 1 },
    "egg":         { emoji: "🥚", price: 1 },
    "green-onion": { emoji: "🌿", price: 0.5 },
    "mushrooms":   { emoji: "🍄", price: 1 }
};

const SPICE_LEVELS = ["mild", "medium", "hot", "extra-hot"];

// ---------- Elements ----------
const form = document.querySelector("main form");
const stage = document.getElementById("bowlStage");
const toppingsBox = document.getElementById("bowlToppings");
const spiceMeter = document.getElementById("spiceMeter");
const spiceLabel = document.getElementById("spiceLabel");
const priceTag = document.getElementById("priceTag");
const orderResult = document.getElementById("orderResult");
const soundToggle = document.getElementById("soundToggle");

// ---------- Sound (one shared AudioContext, no overlapping) ----------
let audioCtx;
let soundOn = true;
let lastSoundTime = 0;

function playTone(freq, duration = 0.15, type = "sine") {
    const now = performance.now();
    if (!soundOn || now - lastSoundTime < 70) return; // skip if too close to previous sound
    lastSoundTime = now;

    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;
    if (!audioCtx) audioCtx = new Ctx();

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(1, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
}

// Spice level -> sound pitch (switch)
function playSpiceSound(level) {
    switch (level) {
        case "mild":      playTone(440); break;
        case "medium":    playTone(520); break;
        case "hot":       playTone(620, 0.2, "triangle"); break;
        case "extra-hot": playTone(780, 0.3, "sawtooth"); break;
        default:          playTone(400);
    }
}

soundToggle.addEventListener("click", () => {
    soundOn = !soundOn;
    soundToggle.textContent = soundOn ? "🔊 Sound on" : "🔇 Sound off";
});

// ---------- Spice info (switch) ----------
function getSpiceInfo(level) {
    switch (level) {
        case "mild":      return { peppers: 1, text: "Mild – friendly start 🙂", shake: "" };
        case "medium":    return { peppers: 2, text: "Medium – getting warm 😋", shake: "" };
        case "hot":       return { peppers: 3, text: "Hot – brave choice 🥵", shake: "shake-2" };
        case "extra-hot": return { peppers: 5, text: "EXTRA HOT – Fire Noodle Challenge! 🔥", shake: "shake-3" };
        default:          return { peppers: 0, text: "Choose your spice level", shake: "" };
    }
}

// ---------- Read current form state ----------
function getBowlState() {
    const spiceInput = form.querySelector('input[name="spice"]:checked');
    const toppingNames = Array.from(form.querySelectorAll('input[name="topping"]:checked'))
        .map(input => input.value);

    return {
        base: form.querySelector("#base").value,
        spice: spiceInput ? spiceInput.value : "",
        toppings: toppingNames,
        color: form.querySelector("#bowl-color").value
    };
}

// Higher-order functions: map + reduce over toppings
function calculatePrice(state) {
    const toppingsTotal = state.toppings
        .map(name => TOPPINGS[name].price)
        .reduce((sum, price) => sum + price, 0);
    return BASE_PRICES[state.base] + toppingsTotal;
}

// ---------- Update the live preview ----------
function updatePreview() {
    const state = getBowlState();
    const info = getSpiceInfo(state.spice);

    stage.style.backgroundColor = state.color;
    toppingsBox.textContent = state.toppings.map(name => TOPPINGS[name].emoji).join(" ");

    spiceMeter.textContent = "🌶".repeat(info.peppers);
    spiceLabel.textContent = info.text;

    stage.classList.remove("shake-2", "shake-3");
    if (info.shake) stage.classList.add(info.shake);

    priceTag.textContent = "Total: $" + calculatePrice(state).toFixed(2);

    // small "pop" animation on every change
    stage.classList.add("pop");
    setTimeout(() => stage.classList.remove("pop"), 200);
}

// Update on any change in the form
form.addEventListener("change", (event) => {
    if (event.target.name === "spice") playSpiceSound(event.target.value);
    else playTone(500, 0.1);
    updatePreview();
});

// ---------- Ramen rain ----------
function ramenRain() {
    const emojis = ["🍜", "🌶", "🥚", "🍥", "🧀"];
    for (let i = 0; i < 25; i++) {
        const drop = document.createElement("span");
        drop.className = "rain-drop";
        drop.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        drop.style.left = Math.random() * 100 + "vw";
        drop.style.animationDelay = Math.random() * 0.8 + "s";
        drop.addEventListener("animationend", () => drop.remove());
        document.body.appendChild(drop);
    }
}

// ---------- Submit: show order summary (callback-style, no reload) ----------
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const state = getBowlState();
    const name = form.querySelector("#name").value.trim() || "Guest";

    orderResult.textContent =
        `Thanks, ${name}! ${state.base.toUpperCase()} bowl with ` +
        `${state.toppings.length} topping(s), spice: ${state.spice || "not chosen"}. ` +
        `Total: $${calculatePrice(state).toFixed(2)} 🍜`;

    [523, 659, 784].forEach((freq, i) => {          // little fanfare
        setTimeout(() => { lastSoundTime = 0; playTone(freq, 0.2, "triangle"); }, i * 150);
    });
    ramenRain();
});

// ---------- Keyboard: R = ramen rain, M = mute ----------
document.addEventListener("keydown", (event) => {
    const tag = event.target.tagName;
    if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return; // don't hijack typing

    switch (event.key.toLowerCase()) {
        case "r": ramenRain(); break;
        case "m": soundToggle.click(); break;
    }
});

updatePreview();

// ================= Mini game: Catch the Noodles =================
const arena = document.getElementById("gameArena");
const startBtn = document.getElementById("gameStart");
const scoreEl = document.getElementById("gameScore");
const timeEl = document.getElementById("gameTime");
const bestEl = document.getElementById("gameBest");

const GAME_ITEMS = [
    { emoji: "🍜", points: 1 },
    { emoji: "🍜", points: 1 },
    { emoji: "🍥", points: 2 },
    { emoji: "🌶", points: -2 }   // careful: too spicy!
];

let score = 0, timeLeft = 0, spawnTimer, countdownTimer;
let best = 0;
try { best = Number(localStorage.getItem("ramenBest")) || 0; } catch (e) { /* storage unavailable */ }
bestEl.textContent = best;

function spawnTarget() {
    const item = GAME_ITEMS[Math.floor(Math.random() * GAME_ITEMS.length)];
    const target = document.createElement("button");
    target.type = "button";
    target.className = "game-target";
    target.textContent = item.emoji;
    target.setAttribute("aria-label", `${item.emoji} ${item.points} points`);
    target.style.left = Math.random() * (arena.clientWidth - 50) + "px";
    target.style.top = Math.random() * (arena.clientHeight - 50) + "px";

    target.addEventListener("click", () => {
        score = Math.max(0, score + item.points);
        scoreEl.textContent = score;
        playTone(item.points > 0 ? 700 : 200, 0.12, item.points > 0 ? "sine" : "square");
        target.remove();
    });

    arena.appendChild(target);
    setTimeout(() => target.remove(), 1400);   // disappears if not caught
}

function endGame() {
    clearInterval(spawnTimer);
    clearInterval(countdownTimer);
    arena.innerHTML = "";
    startBtn.disabled = false;
    startBtn.textContent = "Play again";

    if (score > best) {
        best = score;
        bestEl.textContent = best;
        try { localStorage.setItem("ramenBest", best); } catch (e) { /* ignore */ }
        ramenRain();
    }
}

startBtn.addEventListener("click", () => {
    score = 0;
    timeLeft = 20;
    scoreEl.textContent = score;
    timeEl.textContent = timeLeft;
    startBtn.disabled = true;

    spawnTimer = setInterval(spawnTarget, 650);
    countdownTimer = setInterval(() => {
        timeLeft--;
        timeEl.textContent = timeLeft;
        if (timeLeft <= 0) endGame();
    }, 1000);
});
