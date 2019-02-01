import React from 'react';
import CustomError from '../utils/CustomError';

it('Can CustomError be initiated?', () => {
  const obj = new CustomError({code: 101, msg: 'My Custom Error', tag: 'MY_CUSTOM_ERROR'});
  expect(obj.code).toBe(101);
  expect(obj.message).toBe('My Custom Error');
  expect(obj.tag).toBe('MY_CUSTOM_ERROR');
});