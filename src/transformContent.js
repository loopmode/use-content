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
export default function tranformContent(content, options) {
    const args = { ...options, content };
    const resolveValue = str => getStringValue(str, args);

    let result = `${content}`;

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
        return value.reduce(
            (result, v) => mergeLines(result, getStringValue(v, args)),
            ''
        );
    } else if (typeof value === 'function') {
        // invoke functions
        return `${value(args) || ''}`;
    } else {
        // return other types - assuming they are strings
        return `${value || ''}`;
    }
}

/**
 * Merges two strings, inserting a newline if both strings have a value.
 *
 * @param {String} a
 * @param {String} b
 * @return {String} A string that contains both a and b, separated by a newline
 */
function mergeLines(a = '', b = '') {
    return `${a}${(a && b && '\n') || ''}${b}`;
}
