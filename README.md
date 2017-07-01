# pirate-loader
> Webpack loader for vanillaJS components

[![npm][npm]][npm-url]
[![deps][deps]][deps-url]
[![depsci][depsci]][depsci-url]
[![travis][travis]][travis-url]
[![appveyor][appveyor]][appveyor-url]
[![codecov][codecov]][codecov-url]


## 🏴 installation

```diff
- ☠ This loader is under construction. There's nothing for you here yet. ☠ -
```


## 🏴 query

```javascript
?config='pirate'
```


## 🏴 options

```javascript
{
  context: process.cwd(),
  hashKey: '',
  extensionName: 'pirate',
  $preLoaders: {},
  $postLoaders: {},
  buble: {},
  excludedPreLoaders: /eslint-loader/,
  style: {
    required: false,
    extract: false,
    sourceMap: false,
    defaultLanguage: 'css',
    tagName: 'style',
    modules: {},
    loaders: {},
  },
  script: {
    required: false,
    esnext: false,
    buble: undefined,
    defaultLanguage: 'javascript',
    tagName: 'script',
    accept: 'accept',
    apply: 'apply',
    loaders: {},
  },
  view: {
    transformToRequire: false,
    preserveWhitespace: false,
    compilerModules: undefined,
    buble: undefined,
    defaultLanguage: 'html',
    tagName: 'view',
    loaders: {},
  },
  customTags: {},
}
```
> Note: All this options can be used as query too.


## 🏴 license

[MIT][license-url]


<!-- links -->

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

[codecov]: https://codecov.io/gh/adriancmiranda/pirate-loader/branch/master/graph/badge.svg
[codecov-url]: https://codecov.io/gh/adriancmiranda/pirate-loader

[license-url]: https://github.com/adriancmiranda/pirate-loader/blob/master/LICENSE
