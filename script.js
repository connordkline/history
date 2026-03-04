let stats = {
    money: 10,
    food: 5,
    health: 5,
    hope: 5,
    turn: 1
};

const events = [
    { text: "Bank Failure! Lose $3.", effect: () => stats.money -= 3 },
    { text: "Dust Storm! Lose 2 Food.", effect: () => stats.food -= 2 },
    { text: "Job Lost! Lose $2 and 1 Hope.", effect: () => { stats.money -= 2; stats.hope -= 1; }},
    { text: "Food Prices Rise! Lose $1 per Food.", effect: () => stats.money -= stats.food }
];

const actions = [
    { text: "Odd Jobs (+$3)", effect: () => stats.money += 3 },
    { text: "Breadline (+2 Food, -1 Hope)", effect: () => { stats.food += 2; stats.hope -= 1; }},
    { text: "Sell Belongings (+$4, -1 Hope)", effect: () => { stats.money += 4; stats.hope -= 1; }},
    { text: "Community Support (+2 Hope)", effect: () => stats.hope += 2 },
    { text: "Public Works Job (+$2, +1 Hope)", effect: () => { stats.money += 2; stats.hope += 1; }}
];

function updateStats() {
    document.getElementById("stats").innerHTML =
        `Turn: ${stats.turn} | 💵 ${stats.money} | 🍞 ${stats.food} | ❤️ ${stats.health} | ⭐ ${stats.hope}`;
}

function drawEvent() {
    let event = events[Math.floor(Math.random() * events.length)];
    document.getElementById("eventCard").innerText = event.text;
    event.effect();
}

function createActionButtons() {
    let actionsDiv = document.getElementById("actions");
    actionsDiv.innerHTML = "";

    actions.forEach(action => {
        let btn = document.createElement("button");
        btn.innerText = action.text;
        btn.onclick = () => {
            action.effect();
            updateStats();
        };
        actionsDiv.appendChild(btn);
    });
}

function nextTurn() {
    stats.turn++;
    drawEvent();
    updateStats();
    checkGameOver();
}

function checkGameOver() {
    if (stats.health <= 0 || stats.hope <= 0 || stats.money < -10) {
        alert("Game Over!");
        location.reload();
    }

    if (stats.turn > 20) {
        alert("You survived the Great Depression!");
        location.reload();
    }
}

updateStats();
createActionButtons();
drawEvent();
