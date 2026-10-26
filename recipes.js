
 // TASK 2.1 - Event Listeners on Buttons

const tipButton = document.getElementById("tipBtn");
const tipText = document.getElementById("tipText");

tipButton.addEventListener("click", function() {
    if (tipText.hidden) {
        tipText.hidden = false;
        tipButton.textContent = "Hide Cooking Tip";
    } else {
        tipText.hidden = true;
        tipButton.textContent = "Show Cooking Tip";
    }
});


// TASK 2.2 - Keyboard Event Handling

const navLinks = document.querySelectorAll(
    "#mainNav .navbar-nav .nav-link"
);

navLinks.forEach(function(link, index) {
    link.addEventListener("keydown", function(event) {
        let nextIndex;

        if (event.key === "ArrowRight") {
            nextIndex = (index + 1) % navLinks.length;
        } else if (event.key === "ArrowLeft") {
            nextIndex = (index - 1 + navLinks.length) % navLinks.length;
        } else {
            return;
        }

        event.preventDefault();
        navLinks[nextIndex].focus();
    });
});


// TASK 2.3 - Callback Function

const step1 = document.getElementById("step1");
const step2 = document.getElementById("step2");

const nextBtn = document.getElementById("nextBtn");
const backBtn = document.getElementById("backBtn");
const finishBtn = document.getElementById("finishBtn");

const ramenResult = document.getElementById("ramenResult");

function showStep(step) {
    step1.hidden = step !== 1;
    step2.hidden = step !== 2;
}

function handleStep(callback, step) {
    callback(step);
}

nextBtn.addEventListener("click", function() {
    ramenResult.textContent = "";
    handleStep(showStep, 2);
});

backBtn.addEventListener("click", function() {
    handleStep(showStep, 1);
});


// TASK 3.1 - Objects and Methods

const ramenRecipes = {
    Spicy: {
        name: "Spicy Buldak Ramen",
        description: "Very spicy Korean noodles with bold flavor.",

        showInfo: function() {
            return this.name + " - " + this.description;
        }
    },

    Creamy: {
        name: "Creamy Cheese Ramen",
        description: "Delicious creamy ramen with cheese.",

        showInfo: function() {
            return this.name + " - " + this.description;
        }
    },

    Classic: {
        name: "Classic Shin Ramen",
        description: "Traditional Korean ramen with rich broth.",

        showInfo: function() {
            return this.name + " - " + this.description;
        }
    }
};


// TASK 2.4 - Switch Statement

finishBtn.addEventListener("click", function() {
    const name = document.getElementById("ramenName").value.trim();
    const flavor = document.getElementById("ramenFlavor").value;

    if (name === "") {
        ramenResult.textContent = "Please enter your name!";
        return;
    }

    let recommendation;

    switch (flavor) {
        case "Spicy":
            recommendation = "Spicy Buldak Ramen 🌶️";
            break;

        case "Creamy":
            recommendation = "Creamy Cheese Ramen 🧀";
            break;

        case "Classic":
            recommendation = "Classic Shin Ramen 🍜";
            break;

        default:
            recommendation = "Classic Ramen";
    }

    const selectedRecipe = ramenRecipes[flavor];

    ramenResult.textContent =
        "Hello, " + name +
        "! We recommend " + recommendation +
        " for you! " + selectedRecipe.showInfo();

    step1.hidden = true;
    step2.hidden = true;
});


// TASK 3.2 - Arrays and Loops
// TASK 3.3 - Higher-Order Functions

const ramenNames = [
    { name: "Spicy Buldak Ramen 🌶️", type: "Spicy" },
    { name: "Creamy Cheese Ramen 🧀", type: "Creamy" },
    { name: "Classic Shin Ramen 🍜", type: "Classic" }
];

const ramenList = document.getElementById("ramenList");
const filterButtons = document.querySelectorAll(".filter-btn");

// Display recipes
// TASK 3.5 - Animations

function displayRamen(recipes) {
    ramenList.innerHTML = "";

    for (let i = 0; i < recipes.length; i++) {
        const listItem = document.createElement("li");

        listItem.textContent = recipes[i].name;

        // Add animation
        listItem.classList.add("ramen-animate");

        ramenList.appendChild(listItem);
    }
}

// Handle filter buttons
filterButtons.forEach(function(button) {
    button.addEventListener("click", function() {

        playClickSound();

        const selectedType = button.dataset.type;

        const filteredRecipes = ramenNames.filter(function(recipe) {
            return selectedType === "All" ||
                   recipe.type === selectedType;
        });

        displayRamen(filteredRecipes);
    });
});

// Show all recipes when page loads
displayRamen(ramenNames);

// TASK 3.4 - Play Sounds

let audioContext;

function playClickSound() {
    const AudioContextClass =
        window.AudioContext || window.webkitAudioContext;

    if (!AudioContextClass) {
        return;
    }

    if (!audioContext) {
        audioContext = new AudioContextClass();
    }

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.type = "sine";
    oscillator.frequency.value = 600;

    gainNode.gain.setValueAtTime(
        0.08,
        audioContext.currentTime
    );

    gainNode.gain.exponentialRampToValueAtTime(
        0.001,
        audioContext.currentTime + 0.15
    );

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.15);
}