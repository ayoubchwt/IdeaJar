import * as ideaService from "../service/IdeaService.js";
import { Idea } from "../model/Idea.js";

chrome.runtime.onInstalled.addListener(async (details) => {
  chrome.contextMenus.create({
    id: "save-to-idea-jar",
    title: "Save to Idea Jar",
    contexts: ["selection"],
  });
  if (details.reason === "install") {
    const firstIdea = new Idea("Welcome to IdeaJar!", "Hello! I'm your very first saved idea. Think of me as a handy little placeholder for your best text snippets, AI prompts, and email templates.\n\nTry clicking 'Use' to inject my text directly into a webpage, or copy me to your clipboard for later. Feel free to delete me once you start saving your own actual ideas!", true );
    await ideaService.add(firstIdea);
  }
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
