"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useContent;

var _useExternalContent = _interopRequireDefault(require("./useExternalContent"));

var _useContentTransforms = _interopRequireDefault(require("./useContentTransforms"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Effect hook for using local or external string content.
 *
 * @param {*} content The initial content. Ignored if `options.src` is specified.
 * @param {*} options
 * @param {String} [options.src] URL to load content from, see `useExternalContent()`
 * @param {String} [options.loadExternal] Function to load content from an URL, see `useExternalContent()`
 * @param {Function} [options.redact] Function to replace content, see `useContentTransforms()`
 * @param {String|Function|Array} [options.prepend] Function to prepend content, see `useContentTransforms()`
 * @param {String|Function|Array} [options.append] Function to append content, see  `useContentTransforms()`
 */
function useContent() {
  var content = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (options.src) {
    content = (0, _useExternalContent.default)(options.src, options.loadExternal);
  }

  content = (0, _useContentTransforms.default)(content, options);
  return content;
}