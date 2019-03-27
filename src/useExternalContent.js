import React from 'react';

/**
 * An effect hook that provides external content as a string.
 *
 * @param {String} url The URL of the content to load
 * @param {Function} loader  A `(url, callback) => abort` function for loading the content
 * @return {String} The external content
 */
export default function useExternalContent(url, loader) {
    const [content, setContent] = React.useState('');

    if (typeof loader === 'function') {
        React.useEffect(
            () =>
                loader(url, (error, result) => {
                    if (!error) {
                        setContent(result);
                    } else if (error.name !== 'AbortError') {
                        console.warn(
                            '[codeblock] useExternalContent failed',
                            url
                        );
                    }
                }),
            [url]
        );
    } else {
        console.error('[useExternalContent] Invalid or missing loader', {
            loader
        });
    }

    return content;
}
