window.addEventListener("load", ()=> {
  const preloader = document.getElementById("preloader"); //big bg
  const mainContent = document.getElementById("main-content");

  setTimeout(()=> {
    preloader.classList.add("hidden"); //so it will disappeare
  }, 2500);
})
// end of preloader

//active the nav

const sections = document.querySelectorAll("section[id]"); // get all sections that have an id
const navButs = document.querySelectorAll(".nav-but"); // get all nav buttons

const observer = new IntersectionObserver(function (e) { // create a watcher, runs when screen changes

  e.forEach(function (f) { // loop through each watched section

    if (f.isIntersecting) { // if this section is visible on screen

      navButs.forEach(function (but) {
        but.classList.remove("active"); // remove active from all buttons
      });

      const id = f.target.getAttribute("id"); // get the id of the visible section

      const activeBtn = document.querySelector(`.nav-but[href="#${id}"]`); // find the matching button

      if (activeBtn) activeBtn.classList.add("active"); // add active only to that button
    }

  });

}, { threshold: 0.3 }); // trigger when 30% of the section is visible

sections.forEach(function (section) {
  observer.observe(section); // tell the watcher to watch each section
});
//end of nav










//todys's pick
const picksGrid = document.getElementById("picks-grid"); // gets the grid div from HTML

function getRandomDesserts() {
  const requests = []; // empty array before starting

  for (let i = 0; i < 3; i++) { // loop 3 times
    requests.push( 
      fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert") 
        .then(response => { 
          if (!response.ok) { // if something went wrong
            alert('Could not load desserts') 
            return
          }
          return response.json() // if ok, convert the reply to JSON
        })
        .then(data => { 
          const meals = data.meals; // get the list of all desserts
          const random = meals[Math.floor(Math.random() * meals.length)]; // pick a random one
          return random; // return the random meal
        })
    );
  }

  Promise.all(requests) // wait for all 3 fetch requests to finish
    .then(recipes => { // when all 3 are ready, store them in recipes
      picksGrid.innerHTML = ""; // clear the grid before adding new cards

      recipes.forEach(recipe => { // loop through each of the 3 recipes
        const card = document.createElement("div"); // create a new div for the card
        card.classList.add("picks-card"); // add the picks-card class for styling
        card.innerHTML = `
          <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}" /> 
          <div class="picks-card-body">
            <p class="picks-card-title">${recipe.strMeal}</p> 
            <a href="https://www.themealdb.com/meal/${recipe.idMeal}" target="_blank" class="picks-card-btn">View Recipe</a> 
          </div>
        `; // fill the card with the meal image, name, and a link button
        picksGrid.appendChild(card); // add the finished card to the grid
      });

    })
    .catch(() => { // if anything goes wrong in the whole process
      picksGrid.innerHTML = "<p style='color:var(--olive);font-family:Lato,sans-serif;'>Could not load picks. Try refreshing.</p>"; // show error message in the grid
    });
}

getRandomDesserts(); // call the function so it runs when the page loads



//dropdown
function toggleMenu() {
  const navLinks = document.querySelector('.nav-links');
  navLinks.classList.toggle('open'); // adds or removes the open class
}