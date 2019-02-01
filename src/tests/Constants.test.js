import React from 'react';
import * as constantsAPI from '../data/constants';


console.log(constantsAPI);

Object.keys(constantsAPI).forEach(componentName => {

  describe(`Constants: ${componentName}`, () => {

    const Constants = constantsAPI[componentName];

    test(`${componentName} has any string value`, () => {
      expect(Constants).toMatch(componentName);
    });
  });

});