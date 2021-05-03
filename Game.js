class Game {
  constructor() {
    this.players = [];
    this.playersNumber = null;
    this.activePlayer = 0;
  }

  getActivePlayer() {
    const players = document.querySelectorAll(".playersBoard");
    for (let i = 0; i < players.length; i++) {
      players[i].style.boxShadow = "0 0 0 0 transparent";
    }
    players[this.activePlayer].style.boxShadow = "0 0 4px 4px brown";
  }

  choosePlayers(e, number) {
    const buttons = document.querySelectorAll(".players");

    this.playersNumber = number;

    buttons.forEach((button) => button.classList.remove("highlight"));
    e.target.classList.add("highlight");
  }

  startGame = () => {
    // creates new players
    ViewManager.createModal(".root", false, "mainBoard");
    if (this.playersNumber) {
      for (let i = 0; i < this.playersNumber; i++) {
        // console.log(this.playersNumber);
        ViewManager.createElement(
          ".mainBoard",
          "div",
          "playersBoard",
          `player${i}`
        );
      }

      // SETACTIVEPLAYER

      this.getActivePlayer();

      // EXCHANGES BUTTON

      ViewManager.createElement(".mainBoard", "div", "dicesPanel");
      const exchangeButton = ViewManager.createElement(
        ".mainBoard",
        "button",
        "playerExchanges"
      );

      // DICES PANEL

      exchangeButton.addEventListener("click", this.playerExchange);
      const rollBones = ViewManager.createElement(
        ".dicesPanel",
        "div",
        "roll",
        "diceStyle"
      );
      for (let i = 0; i < 2; i++) {
        const dice = ViewManager.createElement(
          ".dicesPanel",
          "div",
          "displayResult"
        );
        dice.style.order = i * 2;
        dice.dataset.key = i;
        dice.textContent = "🎲";
      }
      exchangeButton.textContent = "exchanges";
    }
  };

  playerExchange() {
    const modal = ViewManager.createModal(".mainBoard", true, "exchangePanel");
    for (let i = 0; i < 6; i++) {
      ViewManager.createElement(".exchangePanel", "div", "exchangesField");
      const button = ViewManager.createElement(
        ".exchangePanel",
        "button",
        "exchangesButton"
      );

      button.textContent = "Exchange";
    }
  }
}
const game = new Game();

document.querySelectorAll(".players").forEach((player) => {
  player.addEventListener("click", (e) => {
    game.choosePlayers(e, e.target.textContent * 1);
  });
});

const start = document.querySelector(".gameStart");
start.addEventListener("click", game.startGame);
