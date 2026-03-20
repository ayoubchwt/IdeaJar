import * as ideaService from "../service/IdeaService.js";
import { Idea } from "../model/Idea.js";

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "save-to-idea-jar",
    title: "Save to Idea Jar",
    contexts: ["selection"],
  });
});
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === "save-to-idea-jar") {
    const selectedText = info.selectionText;
    let title = selectedText.slice(0, 50);
    if (selectedText.length > 50) {
      title += "...";
    }
    const idea = new Idea(title, selectedText, false);
    await ideaService.add(idea);
  }
});
