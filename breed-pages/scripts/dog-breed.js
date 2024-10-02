document.addEventListener("DOMContentLoaded", () => {
  fetch("./json_files/dog_breed_name.json")
    .then((response) => {
      console.log("response:", response);
      return response.json();
    })
    .then((data) => {
      renderCards(data);
    })
    .catch((error) => console.error("Error fetching data:", error));
});

function renderCards(data) {
  data.categories.forEach((category) => {
    // Adjusted container selection to match HTML structure
    const container = document.querySelector(
      `#${category.name.toLowerCase().replace(/ /g, "")}dog .cards-container`
    );

    if (!container) {
      console.error(`Container not found for category: ${category.name}`);
      return;
    }

    let cardsHtml = "";

    category.breeds.forEach((breed) => {
      cardsHtml += `
          <div class="card">
            <img src="${breed.photo}" alt="${breed.name}" class="card-image">
            <div class="card-label">
              <p>${breed.name}</p>
            </div>
          </div>
        `;
    });

    container.innerHTML = cardsHtml;
  });
}
