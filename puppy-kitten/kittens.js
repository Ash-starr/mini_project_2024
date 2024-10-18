document.addEventListener("DOMContentLoaded", function () {
  const tabLinks = document.querySelectorAll(".tab-link");
  const tabContents = document.querySelectorAll(".tab-content");

  tabLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const tabId = this.getAttribute("data-tab");

      // Remove active class from all tabs
      tabLinks.forEach(function (link) {
        link.classList.remove("active");
      });

      // Hide all tab contents
      tabContents.forEach(function (content) {
        content.classList.remove("active");
      });

      // Add active class to clicked tab and show content
      this.classList.add("active");
      document.getElementById(tabId).classList.add("active");
    });
  });
});

const dropdownButtons = document.querySelectorAll(".dropdown-btn");

dropdownButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const content = this.nextElementSibling;
    const arrow = this.querySelector(".arrow");

    // Toggle the dropdown content display
    if (content.style.display === "block") {
      content.style.display = "none";
      arrow.classList.remove("rotate");
      this.classList.remove("active"); // Remove active class
    } else {
      content.style.display = "block";
      arrow.classList.add("rotate");
      this.classList.add("active"); // Add active class
    }
  });
});

let currentSlide = 0;
const slides = document.querySelectorAll(".slide");

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove("active");
    if (i === index) {
      slide.classList.add("active");
    }
  });
}

function moveSlide(direction) {
  currentSlide += direction;
  if (currentSlide >= slides.length) {
    currentSlide = 0; // Loop back to the first slide
  }
  if (currentSlide < 0) {
    currentSlide = slides.length - 1; // Loop back to the last slide
  }
  showSlide(currentSlide);
}

// Initial display of the first slide
showSlide(currentSlide);
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
