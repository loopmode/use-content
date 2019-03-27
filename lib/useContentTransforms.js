"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useContentTransforms;

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Optionally prepends or appends blocks of content to a given initial content.
 *
 * The `redact` option can replace or modify the content itself.
 * If provided, it is invoked with the current value, and its return value replaces the main content.
 *
 * The `prepend` and `append` options can display additional content before or after the main content.
 * Their value may be of type `String`, `Function` or `Array`:
 *
 * - If the value is an array, it is iterated recursively
 * - If the value is a function, it is invoked with the current values and its result is used
 * - If the type is a string (or any other types..), it is used as-is
 *
 * @param {String} content The initial content
 * @param {Object} options The options object
 * @param {Function} options.redact Optional `currentValue => nextValue` function for replacing the value
 * @param {String|Function|Array} options.prepend Additional content to add before the content
 * @param {String|Function|Array} options.append Additional content to add after the content
 */
function useContentTransforms(content, options) {
  var args = _objectSpread({}, options, {
    content: content
  });

  var resolveValue = function resolveValue(str) {
    return getStringValue(str, args);
  };

  var result = "".concat(content);

  if (typeof options.redact === 'function') {
    result = options.redact(result, args);
  }

  if (options.prepend) {
    result = mergeLines(resolveValue(options.prepend), result);
  }

  if (options.append) {
    result = mergeLines(result, resolveValue(options.append));
  }

  return result;
}
/**
 * Reduces a given array, function or string to a string.
 *
 * @param {String|Function|Array} value
 * @param {Object} args
 * @return {String} the resolved string
 */


function getStringValue(value, args) {
  if (Array.isArray(value)) {
    // recursively reduce arrays to a string
    return value.reduce(function (result, v) {
      return mergeLines(result, getStringValue(v, args));
    }, '');
  } else if (typeof value === 'function') {
    // invoke functions
    return "".concat(value(args) || '');
  } else {
    // return other types - assuming they are strings
    return "".concat(value || '');
  }
}
/**
 * Merges two strings, inserting a newline if both strings have a value.
 *
 * @param {String} a
 * @param {String} b
 * @return {String} A string that contains both a and b, separated by a newline
 */


function mergeLines() {
  var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var b = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  return "".concat(a).concat(a && b && '\n' || '').concat(b);
}