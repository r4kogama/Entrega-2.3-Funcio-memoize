/** @jest-environment jsdom */
import { expect, jest, test, describe, beforeEach, it } from '@jest/globals';
import { memoize } from '../src/index';
import { afterEach } from 'node:test';


describe('Testing Memoize: ', () => {
  let fnCallback: (...args: unknown[]) => void;
  let resultMemoiza: (...args : unknown[]) => void;

  beforeEach( ()=>{
    fnCallback = jest.fn();
    resultMemoiza = memoize(fnCallback);
  })

  it('',()=>{

  });

})
