# pirate-loader
> Webpack loader for vanillaJS components

[![npm][npm]][npm-url]
[![deps][deps]][deps-url]
[![depsci][depsci]][depsci-url]
[![travis][travis]][travis-url]
[![appveyor][appveyor]][appveyor-url]


## 🏴 Installation

```diff
- ☠ This loader is under construction. There's nothing for you here yet. ☠ -
```


## 🏴 Options

```javascript
{
  loader: 'pirate-loader?extensionName=component',
  test: /\.component$/,
  options: {
    style: {
      optional: true,
      defaultLanguage: 'scss',
      tagName: 'styles',
    },
    script: {
      optional: false,
      defaultLanguage: 'javascript',
      tagName: 'script',
      acceptMethodName: 'init',
      declineMethodName: 'decline',
      disposeMethodName: 'dispose',
    },
    view: {
      optional: true,
      defaultLanguage: 'html',
      tagName: 'template',
    },
  },
}
```


## 🏴 License

[MIT][license-url]


<!-- links -->

[npm]: https://badge.fury.io/js/pirate-loader.svg
[npm-url]: https://npmjs.com/package/pirate-loader

[xo]: https://img.shields.io/badge/code_style-XO-5ed9c7.svg
[xo-url]: https://github.com/sindresorhus/xo

[npm]: https://img.shields.io/npm/v/pirate-loader.svg
[npm-url]: https://npmjs.com/package/pirate-loader

[travis]: https://travis-ci.org/adriancmiranda/pirate-loader.svg?branch=master
[travis-url]: https://travis-ci.org/adriancmiranda/pirate-loader

[appveyor]: https://ci.appveyor.com/api/projects/status/hucvow1n0t3q3le3/branch/master?svg=true
[appveyor-url]: https://ci.appveyor.com/project/adriancmiranda/pirate-loader/branch/master

[deps]: https://david-dm.org/adriancmiranda/pirate-loader.svg
[deps-url]: https://david-dm.org/adriancmiranda/pirate-loader

[depsci]: https://dependencyci.com/github/adriancmiranda/pirate-loader/badge
[depsci-url]: https://dependencyci.com/github/adriancmiranda/pirate-loader

[stability]: http://badges.github.io/stability-badges/dist/experimental.svg
[stability-url]: https://cdn.meme.am/cache/instances/folder481/500x/9689481.jpg

[license-url]: https://github.com/adriancmiranda/pirate-loader/blob/master/LICENSE
