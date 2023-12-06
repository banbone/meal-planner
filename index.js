'use-strict'
import * as io from './utils/io.js';
import * as query from './utils/query.js'
import _ from 'lodash';
const recipes = query.loadAll().Recipes;
const userInput = io.userInput(process.argv.slice(2));

function main(userInput) {
  let manifest, exitCode, targetList;
  switch(userInput.mode) {
    case 'help':
      io.printHelpMessage();
      break

    case 'list':
      const list = query.generateList(recipes);
      io.printIndexedArray(list);
      exitCode = 0;
      break

    case 'info':
      const index = userInput.input[0] - 1;
      const target = recipes[index];
      manifest = query.generateManifest([target], 'info');
      exitCode = io.printManifest(manifest, 'info');
      break
      
    case 'new':
      targetList = _.at(recipes, userInput.input);
      manifest = query.generateManifest(targetList);
      exitCode = io.printManifest(manifest);
      break
      
    case 'random':
      const targetIndexes = query.genRandArr(recipes.length, userInput.input);
      targetList = _.at(recipes, targetIndexes);
      manifest = query.generateManifest(targetList);
      exitCode = io.printManifest(manifest);
      break

    case 'error':
      exitCode = io.errorHandler(userInput.err);
      break
  };
  return exitCode;
};

const exitCode = main(userInput);
process.exit(exitCode);
