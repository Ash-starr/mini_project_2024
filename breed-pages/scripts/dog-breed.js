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
