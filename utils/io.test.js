import { beforeEach, describe, it, expect, vitest } from 'vitest';
import { inputSanitiser, errorHandler, printManifest, formatIngredient } from './io';

const log = vitest.spyOn(console, "log").mockImplementation(function() {});
const error = vitest.spyOn(console, "error").mockImplementation(function() {});

beforeEach(function() {
  log.mockReset();
  error.mockReset();
});

describe('inputSanitiser()', function() {
  it('should return an object with an array and string', function() {
    const result = inputSanitiser([1,2,3]);
    expect(result).toBeTypeOf('object');
    expect(result.out).toHaveLength(3);
    expect(result.err).toBeUndefined();
  });

  it('should noInput error if passed an empty array', function() {
    const result = inputSanitiser([]);
    expect(result.out).toEqual([]);
    expect(result.err).toBe('noInput');
  });
  
  it('should invalidInput error if input has non numbers', function() {
    const result = inputSanitiser(['a']);
    expect(result.out).toEqual([]);
    expect(result.err).toBe('invalidInput');
  });
  
  it('should invalidInput error if input has non numbers and numbers', function() {
    const result = inputSanitiser(['a',1,2]);
    expect(result.out).toEqual([1,2]);
    expect(result.err).toBe('invalidInput');
  });
});

describe('errorHandler()', function() {
  it('should return an exit code', function() {
    const result = errorHandler('test');
    expect(result).toBeTypeOf('number');
  });
  
  it('should return exit code 1 if err is noInput', function() {
    const result = errorHandler('noInput');
    expect(result).toBe(1);
  });
  
  it('should return exit code 2 if err is invalidInput', function() {
    const result = errorHandler('invalidInput');
    expect(result).toBe(2);
  });

  it('should print output to terminal on error', function() {
    const result = errorHandler('test');
    expect(result).toBeDefined();
    expect(error).toBeCalled();
    expect(log).toBeCalled();
  })
});

describe('printManifest()', function() {
  it('should print a message to the terminal', function() {
    const manifest = {
      nameList: [ 'string' ],
      prep: { 
        serves: 'string', 
        prep: 'string', 
        cook: 'string'
      },
      ingredientList: [
        { 
          name: 'string', 
          quantity: 1, 
          unit: 'string' 
        }
      ]
    }
    const result = printManifest(manifest);
    expect(result).toBe(0);
    expect(log).toBeCalled();
  });
  
  it('should error on no input', function() {
    const result = printManifest();
    expect(result).not.toBe(0);
    expect(error).toBeCalled();
    expect(log).toBeCalled();
  });
});

describe('formatIngredient()', function() {
  it('should return a string', function() {
    const input =  { 
      name: 'string', 
      quantity: 1, 
      unit: 'string'
    };
    const result = formatIngredient(input);
    expect(result).toBeTypeOf('string');
  })
});