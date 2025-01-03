document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const breedId = urlParams.get("id");

  if (breedId) {
    fetch("./cat-info.json") // Adjust the path as necessary
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // Access the 'cats' property directly from the data
        const breed = findBreedById(data[0].cats, breedId); // Adjusted to fetch from the first object in the array
        if (breed) {
          displayBreedInfo(breed);
        } else {
          displayStayTunedMessage(); // Call a function to display "Stay tuned" message
        }
      })
      .catch((error) => console.error("Error fetching breed info:", error));
  }
});

// Update this function to search through the 'cats' array
function findBreedById(cats, id) {
  return cats.find((cat) => cat.id == id); // Use find to return the matching cat directly
}

function displayStayTunedMessage() {
  const body = document.getElementById("body");

  const messageHtml = `
    <div class="modal-backdrop"></div>
    <div class="stay-tuned-container">
      <div class="icon">📢</div>
      <h1>Stay Tuned!</h1>
      <p>We're working hard to bring you more exciting breed details. Please check back soon.</p>
      <p>Thank you for your patience!</p>
    </div>`;

  body.innerHTML = messageHtml;
}

function displayBreedInfo(breed) {
  const body = document.getElementById("body");

  const infoHtml = `
     <div class="container">
       <div class="image-box" style="background-image: url(${breed.photo});">
          <div class="Heading_box">
             <h1>${breed.name}</h1>
          </div>
          <div class="right-box">
             <a href="../breed-pages/cat-breeds.html">X</a>
          </div>
       </div>
       <div class="white-box">
          <div class="content">
             <div class="about" id="about">
                <h2>About:</h2>
                <p>${breed.about}</p>
             </div>
             <div class="key_facts" id="key_facts">
                <h2>Key Facts:</h2>
                <ul>
                <li>Origin Country: ${breed.KeyFacts.originCountry}</li>
                <li>Coat: ${breed.KeyFacts.coat}</li>
                <li>Size Category: ${breed.KeyFacts.sizeCategory}</li>
                <li>Avg Life Expectancy: ${
                  breed.KeyFacts.avgLifeExpectancy
                }</li>
                <li>Height: ${breed.KeyFacts.height}</li>
                <li>Weight: ${breed.KeyFacts.weight}</li>
                </ul>
             </div>
             <div class="grooming" id="grooming">
                <h2>Grooming:</h2>
                <p>${breed.grooming}</p>
             </div>
             <div class="behaviour" id="behaviour">
                <h2>Behaviour:</h2>
                <p>${
                  Array.isArray(breed.behavior)
                    ? breed.behavior.join(", ")
                    : breed.behavior
                }</p>
             </div>
             <div class="training" id="training">
                <h2>Training:</h2>
                <p>${
                  Array.isArray(breed.training)
                    ? breed.training.join(", ")
                    : breed.training
                }</p>
             </div>
          </div>
       </div>
     </div>
     
     <!-- footer -->
   <footer class="footer-distributed">

      <div class="footer-left">

         <h3>PawPrint<span>Paradise</span></h3>

         <p class="footer-links">
            <a href="#" class="link-1">Home</a>

            <a href="../puppy-kitten/kitten.html">Kittens</a>

            <a href="#">Puppies</a>

            <a href="../breed-pages/dog-breeds.html">Dog Breed</a>

            <a href="../breed-pages/cat-breeds.html">Cat Breed</a>

            <a href="#">Blogs</a>
         </p>

         <p class="footer-company-name">PawPrintPradise © 2024</p>
      </div>

      <div class="footer-center">

         <div>
            <i class="fa fa-map-marker"></i>
            <p><span>PawPrintParadise- sector 35, </span> Nagpur, India-440026</p>
         </div>

         <div>
            <i class="fa fa-phone"></i>
            <p>+91 8080197328</p>
         </div>

         <div>
            <i class="fa fa-envelope"></i>
            <p><a href="mailto:support@company.com">pawprintparadise@company.com</a></p>
         </div>

      </div>

      <div class="footer-right">

         <p class="footer-company-about">
            <span>About the company</span>
            PawPrintParadise is your trusted source for all things pets. We provide expert tips, breed information, and
            pet
            care advice to help you give your furry friends the best life. Whether you're a new or experienced pet
            parent,
            we’re here to support you every step of the way!
         </p>

         <div class="footer-icons">

            <a href="#"><i class="fab fa-instagram"></i></a>
            <a href="#"><i class="fa-brands fa-google"></i></a>
            <a href="#"><i class="fa-brands fa-github"></i></a>
            <a href="#"><i class="fab fa-linkedin-in"></i></a>

         </div>

      </div>

   </footer>`;

  body.innerHTML = infoHtml;
}
