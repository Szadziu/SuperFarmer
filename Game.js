class Game {
  constructor() {
    this.players = [];
    this.playersNumber = null;
  }

  choosePlayers(e, number) {
    const buttons = document.querySelectorAll(".players");

    this.playersNumber = number;

    buttons.forEach((button) => button.classList.remove("highlight"));
    e.target.classList.add("highlight");
  }

  startGame = () => {
    // creates new players
    ViewManager.createModal(".root", "mainBoard");
    if (this.playersNumber) {
      for (let i = 0; i < this.playersNumber; i++) {
        console.log(this.playersNumber);
        ViewManager.createElement(
          ".mainBoard",
          "div",
          "playersBoard",
          `player${i}`
        );
      }
      ViewManager.createElement(".mainBoard", "div", "dicesPanel");
      const exchangeButton = ViewManager.createElement(
        ".mainBoard",
        "button",
        "playerExchanges"
      );
      exchangeButton.textContent = "EXCHANGE";
    }
  };
}
const game = new Game();

document.querySelectorAll(".players").forEach((player) => {
  player.addEventListener("click", (e) => {
    game.choosePlayers(e, e.target.textContent * 1);
  });
});

const start = document.querySelector(".gameStart");
start.addEventListener("click", game.startGame);
