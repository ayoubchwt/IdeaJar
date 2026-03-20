//console.log("am inside content.js");
let lastFocusedElement = null;
document.addEventListener("focusin", (e) => {
  const element = e.target;
  if (
    element.tagName === "INPUT" ||
    element.tagName === "TEXTAREA" ||
    element.isContentEditable
  ) {
    lastFocusedElement = element;
  }
});
chrome.runtime.onMessage.addListener((data, sender) => {
  if (data.action === "inject-idea") {
    if (!lastFocusedElement) {
      //console.log("just select an input man ");
      return;
    }
    //console.log("focused element :", lastFocusedElement);
    lastFocusedElement.focus();
    const success = document.execCommand("insertText", false, data.text);
    if (!success) {
      if (lastFocusedElement.isContentEditable) {
        lastFocusedElement.innerText = data.text;
      } else {
        lastFocusedElement.value = data.text;
      }
      // Force the input event for standard HTML elements
      lastFocusedElement.dispatchEvent(new Event("input", { bubbles: true }));
    }
  }
});
