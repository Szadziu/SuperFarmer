class ViewManager {
  static createModal(parentElementCssSelector, ...classesName) {
    const modal = document.createElement("div");
    document.querySelector(parentElementCssSelector).appendChild(modal);
    // add multiple classes names to created HTML element
    for (let i = 0; i < classesName.length; i++) {
      modal.classList.add(classesName[i]);
    }

    modal.style.transform = "scale(0)";
    modal.style.transition = "1s";
    setTimeout(() => (modal.style.transform = "scale(1)"));
  }
}
