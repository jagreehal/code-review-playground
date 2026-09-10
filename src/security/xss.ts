export function renderComment(comment: string): void {
  const container = document.getElementById("comments");
  if (container) {
    container.innerHTML += `<div class="comment">${comment}</div>`;
  }
}

export function renderProfile(name: string, bio: string): string {
  return `<h1>${name}</h1><p>${bio}</p>`;
}

export function renderSearchResults(query: string): void {
  const results = document.getElementById("results");
  if (results) {
    results.insertAdjacentHTML("beforeend", `<p>You searched for: ${query}</p>`);
  }
}
