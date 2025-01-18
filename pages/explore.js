const recipeImageURL = "./../assets/images/recipe-images";
const recipeDataURL = "./../assets/recipes.json";

// const loadDataFromJson = () => {
//   fetch(recipeDataURL)
//     .then((response) => response.json())
//     .then((data) => {
//       generate_recipe_cards(data.recipes);
//     })
//     .catch((error) => console.log(error));
// };

const loadDataFromJson = async () => {
  try {
    const response = await fetch(recipeDataURL);
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }
    const data = await response.json();
    return data.recipes; // Return the recipes directly
  } catch (error) {
    console.error(error);
    return []; // Return an empty array in case of an error
  }
};

const generate_recipe_cards = (recipes) => {
  const recipeContainer = document.getElementById("container-recipe");

  recipes.forEach((recipe) => {
    const card = document.createElement("div");
    card.classList.add("recipe-card");

    card.innerHTML = `
      <img src="${recipe.img}" alt="recipe image"></img>
      <h3>${recipe.name}</h3>
      <p>${recipe.description}</p>
      <button class="btn btn-view-more" data-img="${recipe.img}" data-name="${recipe.name}" data-description="${recipe.description}" data-ingredients="${recipe.ingredients}"
          data-prepTime="${recipe.prepTime}" data-cookingTime="${recipe.cookingTime}" data-serves="${recipe.serves}">View More</button>
    `;

    recipeContainer.appendChild(card);

    const btnOpenModal = card.querySelector(".btn-view-more");
    btnOpenModal.addEventListener("click", (event) => {
      const recipeData = {
        img: event.target.getAttribute("data-img"),
        name: event.target.getAttribute("data-name"),
        description: event.target.getAttribute("data-description"),
        ingredients: event.target.getAttribute("data-ingredients"),
        cookingTime: event.target.getAttribute("data-cookingtime"),
        prepTime: event.target.getAttribute("data-preptime"),
        serves: event.target.getAttribute("data-serves"),
      };
      openModal(recipeData);
    });
  });
};

const openModal = (recipeData) => {
  const modal = document.getElementsByClassName("myModal")[0];

  const modalContent = modal.querySelector(".modal-content");
  modalContent.innerHTML = `
  <button class="btn btn-close-modal"><i class="fa-solid fa-xmark fa-2xl"></i></button>
   <img src="${recipeData.img}" alt="recipe image"></img>
   <h3>${recipeData.name}</h3>
    <p>${recipeData.description}</p>
    <ul>
      <li><strong>Ingredients:</strong> ${recipeData.ingredients}</li>
      <li><strong>Prep Time:</strong> ${recipeData.prepTime}</li>
      <li><strong>Cooking Time:</strong> ${recipeData.cookingTime}</li>
      <li><strong>Serves:</strong> ${recipeData.serves}</li>
    </ul>
    <button class="btn btn-view-recipe">View full recipe</button>
  `;

  modal.classList.remove("hidden");
  modal.classList.add("center-ele");

  const btnCloseModal = modalContent.querySelector(".btn-close-modal");
  btnCloseModal.addEventListener("click", (event) => {
    modal.classList.remove("center-ele");
    modal.classList.add("hidden");
  });
};

// Search for recipes
const searchRecipes = async () => {
  const query = document.getElementById("input-search").value.toLowerCase();
  console.log("qury : " + query);
  try {
    const recipes = await loadDataFromJson();
    console.log(recipes);
    const filteredRecipes = recipes.filter((recipe) =>
      recipe.name.toLowerCase().includes(query)
    );

    console.log(filteredRecipes);
    renderRecipes(filteredRecipes);
  } catch (error) {
    console.error("Error in searching recipes:", error);
  }
};

// Render recipes based on search value
const renderRecipes = (recipes) => {
  const container = document.getElementById("container-recipe");
  container.innerHTML = "";

  if (recipes.length === 0) {
    container.innerHTML = "<p class='text-lg'>No recipes found</p>";
    return;
  }

  generate_recipe_cards(recipes);
};

// Event listener for search button
document
  .getElementById("input-search")
  .addEventListener("input", searchRecipes);

// window.onload = () => {
//   loadDataFromJson();
// };

const recipes = loadDataFromJson()
  .then((recipes) => {
    generate_recipe_cards(recipes);
  })
  .catch((error) => {
    console.error("Failed to load recipes:", error);
  });
