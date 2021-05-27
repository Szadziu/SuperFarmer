/**
 * @enum
 * @readonly
 */
const ANIMALS_ENUM = {
  0: ["rabbit", "🐇"],
  1: ["sheep", "🐑"],
  2: ["pig", "🐖"],
  3: ["cow", "🐄"],
  4: ["horse", "🐎"],
  5: ["wolf", "🐺"],
};

class Game {
  constructor() {
    this.players = [];
    this.playersNumber = null;
    this.activePlayer = 0;
  }

  getActivePlayer = () => {
    const players = document.querySelectorAll(".playersBoard");
    for (let i = 0; i < players.length; i++) {
      players[i].style.boxShadow = "0 0 0 0 transparent";
    }
    players[this.activePlayer].style.boxShadow = "0 0 4px 4px brown";
  };

  endTurn = () => {
    this.activePlayer =
      this.activePlayer === this.playersNumber - 1 ? 0 : this.activePlayer + 1;
    this.getActivePlayer();
  };

  // initial menu buttons handling
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

      const exchangeButton = ViewManager.createElement(
        ".mainBoard",
        "button",
        "gameButtons",
        "exchangeArea"
      );
      exchangeButton.addEventListener("click", this.playerExchange);
      exchangeButton.textContent = "exchanges";

      // END TURN BUTTON

      const endTurnButton = ViewManager.createElement(
        ".mainBoard",
        "button",
        "gameButtons",
        "endTurnArea"
      );
      endTurnButton.addEventListener("click", this.endTurn);
      endTurnButton.textContent = "end turn";

      // DICES PANEL
      ViewManager.createElement(".mainBoard", "div", "dicesPanel");
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
          "displayResult",
          `dice${i}`
        );
        const diceOverlay = ViewManager.createElement(
          `.dice${i}`,
          "div",
          "diceOverlay"
        );

        const result = ViewManager.createElement(`.dice${i}`, "div", "result");

        dice.addEventListener("click", () =>
          this.rollDice(result, diceOverlay)
        );
        dice.style.order = i * 2;
        dice.dataset.key = i;
        result.textContent = "🎲";
      }
    }
  };

  rollDice(result, diceOverlay) {
    const animals = [0, 0, 0, 0, 1, 1, 1, 2, 2, 3, 4, 5];
    const randomIndex = Math.floor(Math.random() * animals.length);

    //overlay animation
    diceOverlay.style.transform = "translate(-50%, -50%) scale(1)";
    setTimeout(() => {
      diceOverlay.style.transform = "translate(-50%, -50%) scale(0)";
    }, 350);

    const randomAnimal = ANIMALS_ENUM[animals[randomIndex]][1];
    result.textContent = randomAnimal;
  }

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
