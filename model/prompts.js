export class Prompt {
  title; // for the sake of my ocd
  body; // for the sake of my ocd
  isFavourite; // for the sake of my ocd
  id = Date.now().toString();
  createdAt = new Date().toISOString();
  constructor(title, body, isFavourite = false) {
    this.title = title;
    this.body = body;
    this.isFavourite = isFavourite;
  }
}
