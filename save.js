const savedGrid = document.getElementById("saved-grid"); // the grid where saved cards will appear
const clearBtn = document.getElementById("clear-btn"); // the clear all button
const toast = document.getElementById("toast"); // the toast element

//show the toast div msg
function showToast(message) {
  toast.textContent = message; // empty so it takes from the argument the msg
  toast.classList.add("show"); // add it to a class "visible"
  setTimeout(() => {
    toast.classList.remove("show"); // remove the class after 3 sec
  }, 3000);
}

// get saved recipies from l.S
function loadSaved() {
  const saved = JSON.parse(localStorage.getItem("savedRecipes")) || []; // get saved list from local storage

  savedGrid.innerHTML = ""; // clear the grid so it dont display the same recipe multiple times

  if (saved.length === 0) { // if nothing is saved
    savedGrid.innerHTML = "<p class='empty-msg'>No saved recipes yet.</p>"; 
  }

  saved.forEach((recipe) => { // loop through each saved recipe
    const card = document.createElement("div"); // create a new card div
    card.classList.add("recipe-card"); // give it the card class
    card.innerHTML = `
      <img src="${recipe.image}" >
      <div class="recipe-card-body">
        <p class="recipe-card-title">${recipe.title}</p>
        <div class="card-actions">
          <a href="https://spoonacular.com/recipes/${recipe.title}-${recipe.id}" target="_blank" class="recipe-card-btn">View Recipe</a>
          <span class="save-btn saved" data-id="${recipe.id}">♥</span>
        </div>
      </div>
    `; // fill the dive with the recipe's info

    const removeBtn = card.querySelector(".save-btn"); //the heart button
    removeBtn.addEventListener("click", function () { // when heart is clicked
      let saved = JSON.parse(localStorage.getItem("savedRecipes")) || []; // get saved list
      saved = saved.filter((r) => r.id !== this.dataset.id); // remove this recipe from the list
      localStorage.setItem("savedRecipes", JSON.stringify(saved)); // update local storage
      showToast("Removed from saved."); // show toast
      loadSaved(); // reload the grid
    });

    savedGrid.appendChild(card); // add cards to the grid
  });
}


clearBtn.addEventListener("click", () => {
  localStorage.removeItem("savedRecipes"); // delete everything from local storage
  showToast("All recipes cleared."); // show toast
  loadSaved(); // reload the grid
});


loadSaved(); // load saved recipes when page opens