const fetchData = () => {
  fetch("assets/recipes.json")
    .then((response) => response.json())
    .then((data) => {
      generate_recipe_cards(data.recipes);
    })
    .catch((error) => console.log(error));
};

const generate_recipe_cards = (recipes) => {
  const recipeContainer = document.getElementById("recipe-container");

  recipes.forEach((recipe) => {
    const card = document.createElement("div");
    card.classList.add("recipe-card");

    card.innerHTML = `
      <img src="${recipe.img}" alt="recipe image"></img>
      <h3>${recipe.name}</h3>
      <p>${recipe.description}</p>
      <ul>
        <li><strong>Ingredients:</strong> ${recipe.ingredients}</li>
        <li><strong>Prep Time:</strong> ${recipe.prepTime}</li>
        <li><strong>Cooking Time:</strong> ${recipe.cookingTime}</li>
        <li><strong>Serves:</strong> ${recipe.serves}</li>
      </ul>
      <button class="btn btn-check-recipe" data-img="${recipe.img}" data-name="${recipe.name}" data-description="${recipe.description}" data-ingredients="${recipe.ingredients}"
          data-prepTime="${recipe.prepTime}" data-cookingTime="${recipe.cookingTime}" data-serves="${recipe.serves}">Check recipe</button>
    `;

    recipeContainer.appendChild(card);

    const btnOpenModal = card.querySelector(".btn-check-recipe");
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
   <img src="${recipeData.img}" alt="recipe image"></img>
   <h3>${recipeData.name}</h3>
    <p>${recipeData.description}</p>
    <ul>
      <li><strong>Ingredients:</strong> ${recipeData.ingredients}</li>
      <li><strong>Prep Time:</strong> ${recipeData.prepTime}</li>
      <li><strong>Cooking Time:</strong> ${recipeData.cookingTime}</li>
      <li><strong>Serves:</strong> ${recipeData.serves}</li>
    </ul>
    <button class="btn btn-close-modal">Close Modal</button>
  `;

  modal.classList.remove("hidden");
  modal.classList.add("center-ele");

  const btnCloseModal = modalContent.querySelector(".btn-close-modal");
  btnCloseModal.addEventListener("click", (event) => {
    modal.classList.remove("center-ele");
    modal.classList.add("hidden");
  });
};

// function calls
fetchData();
