# react-callable-styled

> React callable components with CSS styling using `@emotion/css`.

## Install

```sh
npm install react-callable-styled
```

## Usage

The `react-callable-styled` library allows you to create styled components in React using a syntax similar to styled-components. Here's a basic usage example:

```ts
import { styled } from 'react-callable-styled';

const MyStyledComponent = styled.div`
  background-color: papayawhip;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

// Use MyStyledComponent like a regular React component
```

## API

### `styled`

A Proxy object allowing you to create styled components for each HTML element.

#### Usage:

```ts
const StyledTag = styled.tagName`...styles`;
```

- **tagName**: string - Any valid HTML tag name.
- **styles**: TemplateStringsArray - CSS styles.

### `StyledComponentArgs`

Type definition for the arguments accepted by a styled component. It can either be a TemplateStringsArray with any additional values, or an array of CSSInterpolation.

### `StyledProxy`

Defines a type mapping each key in `HTMLElementTagNameMap` to a function accepting `StyledComponentArgs`.

## Contributing

Contributions are always welcome! Feel free to open a pull request or an issue to propose changes or add new features.

## License

This project is licensed under the MIT License.

## Support

If you have any questions or issues, feel free to open an issue on the [GitHub repository](https://github.com/jackrobertscott/react-callable-styled).