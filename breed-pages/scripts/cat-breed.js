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
        <a href="../specificBreedInfo/cat-info.html?id=${breed.id}">
          <p>${breed.name}</p>
        </a>
      </div>
    </div>
      `;
    });

    // Set the innerHTML of the container to the cardsHtml
    container.innerHTML = cardsHtml;
  });
}
const modal = document.getElementById("modal");
const openModalBtn = document.getElementById("openModalBtn");
const closeModalBtn = document.getElementById("closeModalBtn");

// Open the modal when button is clicked
openModalBtn.addEventListener("click", () => {
  modal.style.display = "block";
});

// Close the modal when the close button (X) is clicked
closeModalBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

// Close the modal when clicking outside the modal content
window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});
