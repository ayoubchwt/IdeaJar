export class Idea {
  title; // for the sake of my ocd
  body; // for the sake of my ocd
  isFavorite; // for the sake of my ocd
  id = Date.now().toString();
  createdAt = new Date().toISOString();
  updatedAt = this.createdAt;
  constructor(title, body, isFavorite = false) {
    this.title = title;
    this.body = body;
    this.isFavorite = isFavorite;
  }
}
