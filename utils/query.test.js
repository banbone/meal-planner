import { it, expect, describe } from 'vitest';
import * as fs from 'fs';
import { generateList, get, loadAll, genRandArr } from './query';


describe('get()', function() {
  it('should do something, as yet unclear', function() {
    const input = true;
    const output = true;
    expect(input).toEqual(output);
  });
});

describe('loadAll()', function() {
  it('should return a js object', function() {
    const result = loadAll();
    expect(result).toBeTypeOf('object');
  });

  it('should return the full object', function() {
    const expectedLength = JSON.parse(fs.readFileSync('lib/recipes.json', 'utf8')).length;
    const result = loadAll();
    expect(result.length).toEqual(expectedLength);
  });
})

describe('generateList()', function() {
  const input = [
    {name: 'one'}, 
    {name:'two'}
  ];
  it('should return an array', function() {
    const result = generateList(input);
    expect(result).toHaveLength(2);
  });
  
  it('should return array of strings', function() {
    const result = generateList(input);
    expect(result[0]).toBeTypeOf('string');
    expect(result[1]).toBeTypeOf('string');
  });
});

describe('genRandArr()', function() {
  const input = 2;
  const max = 45;
  it('should generate an array of numbers', function() {
    const result = genRandArr(max, input);
    expect(result).toHaveLength(2);
    expect(result[0]).toBeTypeOf('number');
  });
  
  it('should generate an array of the correct length', function() {
    const result = genRandArr(max, input);
    expect(result).toHaveLength(input);
  });
  
  it('should not return any unavailable indexes', function() {
    const result = genRandArr(max, input);
    for (const element of result) {
      expect(element).toBeGreaterThanOrEqual(0);
      expect(element).toBeLessThanOrEqual(max);
    };
  });
})