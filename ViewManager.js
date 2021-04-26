class ViewManager {
  static createModal(parentElementCssSelector, isOverlay, ...classesName) {
    const modal = document.createElement("div");
    // parent HTML element
    const parent = document.querySelector(parentElementCssSelector);
    //if overlay is set to true
    if (isOverlay) {
      const overlay = document.createElement("div");
      overlay.classList.add("overlay");
      parent.append(overlay);
      overlay.addEventListener("click", () => {
        parent.removeChild(modal);
        parent.removeChild(overlay);
      });
    }
    parent.append(modal);
    // add multiple classes names to created HTML element
    for (let i = 0; i < classesName.length; i++) {
      modal.classList.add(classesName[i]);
    }

    modal.style.transform = "scale(0)";
    modal.style.transition = "1s";
    setTimeout(() => (modal.style.transform = "scale(1)"));
    return modal;
  }

  static createElement(parentElementCssSelector, element, ...classesName) {
    const htmlElement = document.createElement(element);

    if (!htmlElement) throw new Error("Incorrect html element");

    for (let i = 0; i < classesName.length; i++) {
      htmlElement.classList.add(classesName[i]);
    }
    document.querySelector(parentElementCssSelector).appendChild(htmlElement);
    return htmlElement;
  }
}
