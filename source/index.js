'use-strict'
const recipeData = require('./lib/recipes.json');
const fs = require('fs');
const userInput = process.argv.slice(2);
const recipes = recipeData.Recipes;

init(userInput);

function init(input) {
  if (!input.length) {
    console.log('Use the -h or --help option for helpful info!');
  } else {
    switch (input[0]) {
      case '-h':
        printHelpMessage();
        break;
      case '--help':
        printHelpMessage();
        break;
      case '-l':
        listRecipes();
        break;
      case '--list':
        listRecipes();
        break;
      case '-i':
        printRecipeInfo(input[1]);
        break;
      case '--info':
        printRecipeInfo(input[1]);
        break;
      case '-n':
        if (input[1] == 'random') {
          if (!Number(input[2])) {
            console.error('You have not entered a number. Please try again.');
            process.exit();
          };
          const choices = generateRandArray(input[2]);
          printShoppingList(choices);
        } else {
          printShoppingList(input.slice(1));
        };
        break;
      case '--new':
        if (input[1] == 'random') {
          if (!Number(input[2])) {
            console.error('You have not entered a number. Please try again.');
            process.exit();
          };
          const choices = generateRandArray(input[2]);
          printShoppingList(choices);
        } else {
          printShoppingList(input.slice(1));
        };
        break;
    };
  };
  process.exit();
};

function printHelpMessage() {
  const help = fs.readFileSync('lib/help.txt', 'utf8');
  console.log(help.toString());
  return;
};

function printRecipeInfo(index) {
  let ingredients;
  if (!recipes[index - 1]) {
    console.error('No recipe found with selected index. Please try again.');
  } else {
    console.log(getRecipe(recipes[index - 1], index));
    console.log('Ingredients:');
    ingredients = formatIngredients(recipes[index - 1].ingredients);
    for (let i = 0; i < ingredients.length; i++) {
      console.log(ingredients[i]);
    };
  };
  return;
};

function printShoppingList(selections) {
  let index;
  console.log('You have selected the following recipes:\n');
  for (let i = 0; i < selections.length; i++) {
    index = selections[i] - 1;
    console.log(getRecipe(recipes[index],selections[i]));
  };
  console.log('\nYou will need the following ingredients:\n');
  const ingredientsArray = collateIngredients(selections);
  const formattedIngredients = formatIngredients(ingredientsArray);
  for (let j = 0; j < formattedIngredients.length; j++) {
    console.log(formattedIngredients[j]);
  };
  return;
};

function collateIngredients(array) {
  const collatedIngredients = [];
  let index, ingredientArr, arrElement, elementExists;
  for (let i = 0; i < array.length; i++) {
    index = array[i] - 1;
    ingredientArr = recipes[index].ingredients;
    for (let j = 0; j < ingredientArr.length; j++) {
      arrElement = ingredientArr[j];
      elementExists = false;
      for (let k = 0; k < collatedIngredients.length; k++) {
        if (arrElement.name == collatedIngredients[k].name) {
          collatedIngredients[k].quantity = collatedIngredients[k].quantity + arrElement.quantity;
          elementExists = true;
        };
      };
      if (!elementExists) {
        collatedIngredients.push(arrElement);
      };
    };

  };
  return collatedIngredients;
};

function listRecipes() {
  console.log('Available recipes:');
  for (let i = 0; i < recipes.length; i++) {
    console.log(getRecipe(recipes[i], i + 1));
  };
  return;
}

function getRecipe(recipe,id) {
  const recipeIdentifier = id;
  const recipeName = recipe.name;
  return `(${recipeIdentifier}) - ${recipeName}`;
};

function checkIsVowel(x) {
  let result;
  if (x == 'a' || x == 'i' || x == 'o' || x == 'u') {
    result = true;
  } else {
    result = false;
  };
  return result;
};

function processName(name,qty,unit) {
  let pluralSuffix, quantifiedName;
  if (unit == null && qty > 1) {
    if (checkIsVowel(name.slice(-1))) {
      pluralSuffix = 'es';
    } else {
      pluralSuffix = 's';
    };
  } else {
    pluralSuffix = '';
  };
  quantifiedName = `${name}${pluralSuffix}`;
  return quantifiedName;
}

function generateRandArray(int) {
  const randArray = [];
  let randInt;
  for (let i = 0; i < int; i++) {
    let pushed = false;
    while (!pushed) {
      let found = false
      randInt = Math.ceil(Math.random() * (recipes.length));
      for (let j = 0; j < randArray.length; j++) {
        if (randArray[j] == randInt) {
          found = true;
          break;
        };
      };
      if (!found) {
        randArray.push(randInt);
        pushed = true;
        break;
      };
    };
  };
  return randArray;
}

function formatIngredients(recipe) {
  const formattedArr = [];
  for(let i = 0; i < recipe.length; i++) {
    let processedUnit, processedName, formattedItem;
    let itemName = recipe[i].name;
    let itemQty = recipe[i].quantity;
    let itemUnit = recipe[i].unit;
    if (!itemUnit) {
      processedUnit = "";
    } else {
      processedUnit = itemUnit;
    };
    processedName = processName(itemName,itemQty,itemUnit);
    formattedItem = `${processedName} - ${itemQty}${processedUnit}`;
    formattedArr.push(formattedItem);
  };
  return formattedArr;
};