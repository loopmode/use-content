"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useContent;

var _useExternalContent = _interopRequireDefault(require("./useExternalContent"));

var _transformContent = _interopRequireDefault(require("./transformContent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Effect hook for providing local or external string-based content.
 *
 * @param {*} content The initial content. Ignored if `options.src` is specified.
 * @param {*} options
 * @param {String} [options.src] URL to load content from, see `useExternalContent()`
 * @param {String} [options.loadExternal] Function to load content from an URL, see `useExternalContent()`
 * @param {Function} [options.redact] Function to replace content, see `transformContent()`
 * @param {String|Function|Array} [options.prepend] Function to prepend content, see `transformContent()`
 * @param {String|Function|Array} [options.append] Function to append content, see  `transformContent()`
 */
function useContent() {
  var content = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (options.src) {
    content = (0, _useExternalContent.default)(options.src, options.loadExternal);
  }

  content = (0, _transformContent.default)(content, options);
  return content;
}