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
