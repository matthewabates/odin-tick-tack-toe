var scores = {
    player: 0,
    computer: 0
}
var rules = {
    rock: { beats: 'scissors' },
    paper: { beats: 'rock' },
    scissors: { beats: 'paper' }
}
var choices = Object.keys(rules)
var listener = function(event) {
    playRound(event.target.id)
}
document.querySelectorAll(".selection").forEach((button) => {
    button.addEventListener("click", listener)
})

function playGame() {
    displayResult("Game over")
    let outcome = `You tied; ${scores.player} to ${scores.computer}`
    if (scores.player > scores.computer) {
        outcome = `You won; ${scores.player} to ${scores.computer}`
    } else if (scores.computer > scores.player) {
        outcome = `You lose; ${scores.player} to ${scores.computer}`
    }
    displayResult(outcome)
}

function playRound(playerChoice) {
    let computerChoice = getComputerChoice()
    
    //TODO display playerchoice and computer choice?

    if (doesBeat(computerChoice, playerChoice)) {
        displayResult(`You lose; ${computerChoice} beats ${playerChoice}`)
        scores.computer++
    } else if (doesBeat(playerChoice, computerChoice)) {
        displayResult(`You win; ${playerChoice} beats ${computerChoice}`)
        scores.player++
    } else {
        displayResult(`You tied; ${playerChoice} vs ${computerChoice}`)
    }

    document.querySelector("#player").textContent = scores.player
    document.querySelector("#computer").textContent = scores.computer

    if (isGameOver()) {
        if (scores.player > scores.computer) {
            outcome = `You win`
        } else if (scores.computer > scores.player) {
            outcome = `You lose`
        }
        displayResult(outcome)
        document.querySelectorAll(".selection").forEach((button) => {
            button.removeEventListener("click", listener)
        })
    }
}

function isGameOver() {
    return Math.max(scores.player, scores.computer) >= 5
}

function doesBeat(first, second) {
    return (rules[first].beats == second)
}

function getComputerChoice() {
    return choices[random(0,2)]
}

function random(min, max) {
    return Math.floor((min + Math.random() * (max - min + 1)))
}

function displayResult(message) {
    let resultContainer = document.querySelector("#results")
    resultContainer.textContent = message
}
