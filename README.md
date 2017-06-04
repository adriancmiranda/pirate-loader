# pirate-loader
Webpack loader for vanillaJS components

## Installation

```diff
- ☠ This loader is under construction. There's nothing for you here yet. ☠ -
```

## Options

```javascript
{
  loader: 'pirate-loader',
  test: /\.pirate$/,
  options: {
    scss: [
      { loader: 'style-loader' },
      { loader: 'css-loader' },
      { loader: 'sass-loader' },
    ],
    sass: [
      { loader: 'style-loader' },
      { loader: 'css-loader' },
      { loader: 'sass-loader' },
    ],
    stylus: [
      { loader: 'style-loader' },
      { loader: 'css-loader' },
      { loader: 'stylus-loader' },
    ],
    styl: [
      { loader: 'style-loader' },
      { loader: 'css-loader' },
      { loader: 'stylus-loader' }
    ],
    less: [
      { loader: 'style-loader' },
      { loader: 'css-loader' },
      { loader: 'less-loader' },
    ],
    css: [
      { loader: 'style-loader' },
      { loader: 'css-loader' },
    ],
    postcss: [
      { loader: 'style-loader' },
      { loader: 'css-loader' },
    ],
  },
  query: {
    script: {
      tagName: 'script',
      optional: true,
      lang: 'commonjs',
    },
    style: {
      tagName: 'styles',
      optional: true,
      lang: 'scss',
    },
    view: {
      tagName: 'template',
      optional: true,
      lang: 'html',
    },
  },
}
```
