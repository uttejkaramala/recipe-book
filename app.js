const detailButtons = document.querySelectorAll(".recipe-card button");
const homepageContent = document.getElementById("homepage-content");
const recipeSheetContainer = document.getElementById("recipe-sheet-container");
const homeLink = document.getElementById("home-link");

let lastScrollY = 0; // Variable to store the last scroll position

function findRecipe(slug) {
  return allRecipes.find((recipe) => recipe.slug === slug);
}

function createRecipeSheet(recipe) {
  const ingredientsHtml = recipe.ingredients
    .map(
      (ingredient) => `
        <li class="ingredient-item">
            <input type="checkbox" id="ing-${ingredient.replace(
              /[^a-zA-Z0-9]/g,
              ""
            )}">
            <label for="ing-${ingredient.replace(
              /[^a-zA-Z0-9]/g,
              ""
            )}">${ingredient}</label>
        </li>
    `
    )
    .join("");

  const instructionsHtml = recipe.instructions
    .map(
      (instruction, index) => `
        <li class="directions-list-item">
            <span>${index + 1}.</span> ${instruction}
        </li>
    `
    )
    .join("");

  return `
        <div class="recipe-sheet" style="display: block;">
            <div class="text-center mb-6">
                <h2 class="category">${recipe.category}</h2>
                <h3 class="title">${recipe.title}</h3>
                <div class="recipe-meta">
                    <span>COOK TIME: ${recipe.cookTime}</span>
                    <span>PREP TIME: ${recipe.prepTime}</span>
                    <span>SERVINGS: ${recipe.servings}</span>
                </div>
            </div>

            <div class="recipe-content">
                <div>
                    <img src="${recipe.image}" alt="${recipe.title}" class="recipe-image">
                    <div class="ingredients-box">
                        <h4>INGREDIENTS</h4>
                        <ul class="ingredients-list">
                            ${ingredientsHtml}
                        </ul>
                    </div>
                </div>
                
                <div class="directions-section">
                    <h4 class="directions-heading">DIRECTIONS</h4>
                    <ol class="directions-list">
                        ${instructionsHtml}
                    </ol>
                </div>
            </div>
            <div style="text-align: center; margin-top: 2rem;">
                <button id="back-to-home-btn">
                    Back to Recipes
                </button>
            </div>
        </div>
    `;
}

function showHomepage() {
  homepageContent.style.display = "block";
  recipeSheetContainer.style.display = "none";
  window.scrollTo({ top: lastScrollY, behavior: "smooth" });
}

function showRecipe(slug) {
  const recipe = findRecipe(slug);
  if (recipe) {
    lastScrollY = window.scrollY; // Save the current scroll position
    const recipeHtml = createRecipeSheet(recipe);
    recipeSheetContainer.innerHTML = recipeHtml;
    homepageContent.style.display = "none";
    recipeSheetContainer.style.display = "block";
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to the top of the recipe sheet
    const backButton = document.getElementById("back-to-home-btn");
    if (backButton) {
      backButton.addEventListener("click", showHomepage);
    }
  } else {
    console.error("Recipe not found with slug:", slug);
  }
}

detailButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const slug = event.target.dataset.slug;
    showRecipe(slug);
  });
});

homeLink.addEventListener("click", (event) => {
  event.preventDefault();
  showHomepage();
});

showHomepage();
