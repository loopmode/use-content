# @loopmode/use-content

A react effect hook for displaying local or remote string-based content.

## Usage

```jsx

import React from 'react';
import useContent from '@loopmode/use-content';

const Content = ({ children, src }) => {
    const content = useContent(children, { src });
    return (
        <div>{content}</div>
    );
}

const Demo = () => {
    return (
        <div>
            <Content>Hello text!</Content>
            <Content src="https://raw.githubusercontent.com/git/git/master/README.md" />
        </div>
    );
}

```

If a `src` is provided, the content is loaded from that URL.
The default setup uses `window.fetch` for loading and aborts pending requests when the component gets unmounted.

If a `redact` function is provided, it is invoked with the current content and its return value becomes the new value.

If an `append` or `prepend` value is provided, it will be resolved to a string value.

```jsx
import React from 'react';
import useContent from '@loopmode/use-content';


const addSrc = ({ src }) => `// src: ${src}`;
const addMeta = props => `/*\n${JSON.stringify(props, replacer, 4)}\n*/`;

const Content = ({ children, src }) => {
    const content = useContent(children, {
        src,
        prepend: [addSrc, `// Copyright foo`, props => !!props.content && 'Loading...'],
        append: addMeta
    });
    return (
        <div>{content}</div>
    );
}
const Demo = () => {
    return (
        <Content src="https://raw.githubusercontent.com/git/git/master/README.md" />
    );
}

```
