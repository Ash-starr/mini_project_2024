document.addEventListener("DOMContentLoaded", () => {
  // Adjust the path based on where the JSON file is located
  fetch("./json_files/cat_breed_name.json") // Fetches the cat breeds JSON from the data folder
    .then((response) => {
      console.log("resopnse:", response);
      return response.json();
    })
    .then((data) => {
      renderCards(data); // Render cards using the JSON data
    })
    .catch((error) => console.error("Error fetching data:", error));
});

function renderCards(data) {
  data.categories.forEach((category) => {
    // Select the container for the current category using id
    const container = document.querySelector(
      `#${category.name.toLowerCase().replace(/ /g, "")} .cards-container`
    );

    // Create an HTML string for the cards
    let cardsHtml = "";

    category.breeds.forEach((breed) => {
      // Create HTML for a single card
      cardsHtml += `
        <div class="card">
      <img src="${breed.photo}" alt="${breed.name}" class="card-image">
      <div class="card-label">
        <p>${breed.name}</p>
      </div>
    </div>
      `;
    });

    // Set the innerHTML of the container to the cardsHtml
    container.innerHTML = cardsHtml;
  });
}
