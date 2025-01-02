document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const breedId = urlParams.get("id");

  if (breedId) {
    fetch("./dog-info.json") // Adjust the path as necessary
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // Access the 'cats' property directly from the data
        const breed = findBreedById(data[0].dogs, breedId); // Adjusted to fetch from the first object in the array
        if (breed) {
          displayBreedInfo(breed);
        } else {
          console.error("Breed not found");
        }
      })
      .catch((error) => console.error("Error fetching breed info:", error));
  }
});

// Update this function to search through the 'cats' array
function findBreedById(dogs, id) {
  return dogs.find((dog) => dog.id == id); // Use find to return the matching cat directly
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
              <p>X</p>
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
      </div>`;

  body.innerHTML = infoHtml;
}
