
const fruits = ["cherries", "oranges", "plums", "bananas", "melons", "pineapples"];
const payouts = {
    "cherries": 100,
    "oranges": 25,
    "plums": 6,
    "bananas": 15,
    "melons": 8,
    "pineapples": 50
};

let totalBet = 0;
let totalWin = 0;

function spin() {
    const sound = document.getElementById('crankSound');
    sound.play();

    const bet = parseInt(document.getElementById('betAmount').value);
    totalBet += bet;

    const results = [getRandomFruit(), getRandomFruit(), getRandomFruit()];
    displaySlots(results);

    let payout = calculatePayout(results, bet);
    totalWin += payout;

    displayResult(payout);
}

function getRandomFruit() {
    return fruits[Math.floor(Math.random() * fruits.length)];
}

function displaySlots(results) {
    const slot1 = document.getElementById("slot1");
    const slot2 = document.getElementById("slot2");
    const slot3 = document.getElementById("slot3");

    // Remove previous animations
    slot1.classList.remove("spin-animation");
    slot2.classList.remove("spin-animation");
    slot3.classList.remove("spin-animation");

    // Trigger reflow to restart animation
    void slot1.offsetWidth;
    void slot2.offsetWidth;
    void slot3.offsetWidth;

    // Set images and apply animation
    slot1.src = "images/" + results[0] + ".png";
    slot2.src = "images/" + results[1] + ".png";
    slot3.src = "images/" + results[2] + ".png";

    slot1.classList.add("spin-animation");
    slot2.classList.add("spin-animation");
    slot3.classList.add("spin-animation");

    document.getElementById("slot1").src = "images/" + results[0] + ".png";
    document.getElementById("slot2").src = "images/" + results[1] + ".png";
    document.getElementById("slot3").src = "images/" + results[2] + ".png";
}

function calculatePayout(results, bet) {
    const [a, b, c] = results;
    if (a === b && b === c) {
        return bet * payouts[a];
    } else if (a === b || b === c || a === c) {
        return bet * 1;
    } else {
        return 0;
    }
}

function displayResult(payout) {
    const result = document.getElementById("resultMessage");
    const total = document.getElementById("totalAmount");
    const playAgain = document.getElementById("playAgain");

    if (payout === payouts["cherries"] * parseInt(document.getElementById('betAmount').value)) {
        const jackpotSound = document.getElementById("jackpotSound");
        jackpotSound.play();
    }
    
    if (payout === 0) {
        result.textContent = "No match. Try again!";
    } else {
        result.textContent = "You won $" + payout + "!";
    }

    let net = totalWin - totalBet;
    total.textContent = "Net: $" + net;

    if (net >= 0) {
        total.style.color = "lightgreen";
        result.textContent += " Congratulations!";
    } else {
        total.style.color = "red";
        result.textContent += " Better luck next time.";
    }

    playAgain.classList.remove("d-none");
}

function resetGame() {
    document.getElementById("resultMessage").textContent = "";
    document.getElementById("totalAmount").textContent = "";
    document.getElementById("playAgain").classList.add("d-none");
}
