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
