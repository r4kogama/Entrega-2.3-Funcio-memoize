/** @jest-environment jsdom */
import { expect, jest, test, describe, beforeEach, it } from '@jest/globals';
import { memoize } from '../src/index';
import { Args } from '../src/index';

describe('Testing Memoize: ', () => {

  let fnCallback:  Args<number[] , number>;
  let resultMemoize: Args<number[], number>;
  beforeEach( ()=>{
    fnCallback = jest.fn( (x:number) => x + 5);
    resultMemoize = memoize(fnCallback);
  })

  it('Dos llamadas iguales al metodo memoize si el dato lo guarda en cache, memoize lo encuentra en cache dando como respuesta 1 ',()=>{
    expect(resultMemoize(5)).toBe(10);
    expect(resultMemoize(5)).toBe(10);
    expect(fnCallback).toBeCalledTimes(1);
  });

  it('Dos llamadas distintas al metodo memoize si el dato lo guarda en cache y memoize detecta que no son iguales, dando como respuesta 2',()=>{
    expect(resultMemoize(5)).toBe(10);
    expect(resultMemoize(8)).toBe(13);
    expect(fnCallback).toBeCalledTimes(2);
  });



})
