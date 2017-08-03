/**
 * Dependencies
 */

import lo from 'lodash';
import camelCase from 'camelcase';
import error from './error';
import { debug } from './logger';

/**
 * Errors
 */

const ValidationError = error.build('ValidationError');

/**
 * Public
 */

function validate(params, specs) {
  const validatedParams = {};

  specs.forEach(spec => {
    let paramValue = lo.get(params, spec.param);
    debug(`Value for param ${spec.param}`, paramValue);
    if (!!spec.required && (!paramValue || lo.trim(paramValue) === '')) {
      throw new ValidationError({ message: `Parameter "${spec.param}" is required` });
    }

    if (!!spec.regex && !spec.regex.test(paramValue)) {
      throw new ValidationError({ message: `Parameter "${spec.param}" is invalid` });
    }

    if (!!spec.transform) {
      paramValue = spec.transform(paramValue);
    }

    if (!!spec.trim) {
      paramValue = lo.trim(paramValue);
    }

    const paramName = spec.name || spec.param;
    validatedParams[camelCase(paramName)] = paramValue;
  });

  return validatedParams;
}

/**
 * Interface
 */

export default { validate };
