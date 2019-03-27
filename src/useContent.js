import useExternalContent from './useExternalContent';
import transformContent from './transformContent';

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
export default function useContent(content = '', options = {}) {
    if (options.src) {
        content = useExternalContent(options.src, options.loadExternal);
    }

    content = transformContent(content, options);

    return content;
}
