import * as fs from 'fs';

export const loadAll = function(path) {
  let body;
  try {
    const content = fs.readFileSync(`${path}/lib/recipes.json`, 'utf8');
    body = JSON.parse(content);
  } catch (err) {
    body = err;
  };
  return body;
};

export const generateList = function(array) {
  const output = [];
  for(const item of array) {
    output.push(item.name);
  };
  return output;
};

export const generateManifest = function(array, mode) {
  const names = [];
  const ingredients = [];
  const ingredientNameList = [];
  const info = {};
  if (mode == 'info') {
    info.serves = array[0].serves;
    info.prep = array[0].prepTime;
    info.cook = array[0].cookTime;
  };
  for (const entry of array) {
    names.push(entry.name);
    for (const ingredient of entry.ingredients) {
      if(ingredientNameList.includes(ingredient.name)) {
        const targetIndex = ingredientNameList.indexOf(ingredient.name);
        ingredients[targetIndex].quantity += ingredient.quantity;
      } else {
        ingredientNameList.push(ingredient.name);
        ingredients.push(ingredient);
      };
    };
  };
  return {
    nameList: names,
    prep: info,
    ingredientList: ingredients
  };
};

export const genRandArr = function(availableIndex, desiredLength) {
  const randArr = [];
  while(randArr.length < desiredLength) {
    const newIndex = Math.floor(Math.random() * availableIndex);
    if(randArr.indexOf(newIndex) === -1) {
      randArr.push(newIndex);
    };
  };
  return randArr;
}