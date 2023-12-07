import * as fs from 'fs';

// retrieves and prints the help message stored in a
// text file (lib/help.txt)
export const printHelpMessage = function (path) {
  let message;
  try {
    message = fs.readFileSync(`${path}/lib/help.txt`, 'utf8');
    console.log(message.toString());
  } catch (err) {
    console.error(err);
  };
  return;
};

// prints a list of all available recipes and their
// respective index numbers
export const printIndexedArray = function(arr) {
  let index = 0;
  let wsMod;
  for (const item of arr) {
    index += 1;
    if (index <= 9) {
      wsMod = 0;
    } else if (index >= 10 && index < 99) {
      wsMod = 1;
    } else if (index >= 100 && index < 999) {
      wsMod = 2;
    } else {
      wsMod = 3;
    };
    console.log(Array(4 - wsMod).join(" "), index, item);
  };
  return;
};

// reads array of arguments received on cmd line and 
// returns an object with all inputs and any errors
export const userInput = function(args) {
  let modeSelector, sanitisedInput, errorMsg;
  const inputArr = [];
  if(args.length == 0) {
    modeSelector = 'error';
    errorMsg = 'noInput'
  };
  switch (args[0]) {
    case '-h':
    case '--help':
      modeSelector = 'help';
      break;
    case '-l':
    case '--list':
      modeSelector = 'list';
      break;
    case '-i':
    case '--info':
      modeSelector = 'info';
      const argArr = [args[1]]
      sanitisedInput = inputSanitiser(argArr);
      inputArr.push(sanitisedInput.out[0]);
      if (!inputArr[0]) {
        modeSelector = 'error';
        errorMsg = 'noInput';
      };
      break;
    case '-n':
    case '--new':
      if (args[1] == 'random') {
        modeSelector = 'random';
        const argArr = [args[2]];
        sanitisedInput = inputSanitiser(argArr);
        inputArr.push(sanitisedInput.out[0]);
        if (!inputArr[0]) {
          modeSelector = 'error';
          errorMsg = sanitisedInput.err ? sanitisedInput.err : 'noInput';
        };
      } else {
        modeSelector = 'new';
        sanitisedInput = inputSanitiser(args.slice(1));
        sanitisedInput.out.forEach(function(element) {
          inputArr.push(element);
        });
        if (!inputArr[0]) {
          modeSelector = 'error';
          errorMsg = sanitisedInput.err ? sanitisedInput.err : 'noInput';
        };
      };
      break;
  };
  return { 
    mode: modeSelector, 
    input: inputArr,
    err: errorMsg
  };
};

// removes any unwanted input from user input by filtering
// out any values that aren't numbers
// add err message to return value if invalid input or no
// input detected
export const inputSanitiser = function(input) {
  const outputArray = [];
  let error;
  if(input[0] == undefined) {
    error = 'noInput';
  } else {
    for(const element of input) {
      if(isNaN(element)) {
        error = 'invalidInput';
      } else {
        outputArray.push(Number(element));
      };
    };
  };
  return {
    out: outputArray,
    err: error
  };
};

// receives an error code and prints an appropriate message
// to the terminal. returns a numeric exit code based on
// the specific error. this can then be used by process.exit()
export const errorHandler = function(err) {
  const errArray = [
    'noInput',
    'invalidInput',
    'internalException'
  ];
  const errorMsg = `Warning: ${err} detected ...exiting...`;
  console.error(errorMsg);
  console.log('Use --help for more info!');
  let exitCode = 1;
  if(errArray.includes(err)){
    exitCode += errArray.indexOf(err);
  } else {
    exitCode += errArray.length;
  };
  return exitCode;
};

// formats and prints the manifest of all selected recipes
export const printManifest = function(manifest, mode) {
  let exitCode = 0;
  if (!manifest) {
    exitCode = errorHandler('internalException');
    return exitCode;
  };
  const suffix = manifest.nameList.length > 1 ? 's' : '';
  console.log(`You have selected the following recipe${suffix}:\n`);
  for (const name of manifest.nameList) {
    console.log(name);
  };
  if (mode === 'info') {
    console.log('\nInfo:');
    console.log('- Servings:', manifest.prep.serves);
    console.log('- Prep-time:', manifest.prep.prep);
    console.log('- Cook-time:', manifest.prep.cook);
  };
  console.log('\nYou will need the following ingredients:\n');
  for (const ingredient of manifest.ingredientList) {
    const formatted = formatIngredient(ingredient);
    console.log(formatted);
  };
  return exitCode;
};

export const formatIngredient = function(ingredient) {
  let suffix = '', unit;
  if (ingredient.unit == null) {    
    unit = '';
    if (ingredient.quantity > 1) {
      switch(ingredient.name.slice(-1)) {
        case 'a':
        case 'i':
        case 'o':
        case 'u': 
          suffix = 'es';
          break;
        default:
          suffix = 's';
          break;
      };
    } else {
      suffix = '';
    };
  } else {
    unit = ingredient.unit;
  };
  return `${ingredient.name}${suffix} - ${ingredient.quantity}${unit}`
}