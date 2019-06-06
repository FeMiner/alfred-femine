# alfred-femine [![Build Status](https://travis-ci.org/FeMiner/alfred-femine.svg?branch=master)](https://travis-ci.org/FeMiner/alfred-femine)[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)[![npm-verison](https://img.shields.io/npm/v/alfred-femine.svg?style=flat-square)](https://www.npmjs.com/package/alfred-femine)[![npm](https://img.shields.io/npm/dt/alfred-femine.svg?style=flat-square)](https://www.npmjs.com/package/alfred-femine)[![npm](https://img.shields.io/npm/l/alfred-femine.svg?style=flat-square)](https://github.com/FeMiner/alfred-femine/blob/master/license)

> front end tools mine

## Install

```
$ npm install --global alfred-femine
```

_Requires [Node.js](https://nodejs.org) 8+ and the Alfred [Powerpack](https://www.alfredapp.com/powerpack/)._

## Usage

In Alfred, type `key`, <kbd>Enter</kbd>, and your query.

- rgbhex - rgba 颜色转 16 进制颜色

  ```js
  rgbhex 255,234,122
  rgbhex 255,234,122,0.5
  ```

- hexrgb - 16 进制颜色转 rgba 颜色

  ```js
  hexrgb #fff
  ```

- ip - 查询本机内网和外网 ip 地址

- caniuse - caniuse 搜索

  ```js
  caniuse flex
  ```

- enbase64 - base64 编码

  ```js
  enbase64 text

  ```

- debase64 - base64 解码

  ```js
  debase64 text
  ```

- ts - 翻译

```js
  ts text
```

- kcc - 短横线命名

```js
  kcc 新年快乐
  // happy-new-year
```

- lcc - 小驼峰式命名

```js
  lcc 新年快乐
  // happyNewYear
```

- ucc - 大驼峰式命名

```js
  ucc 新年快乐
  // HappyNewYear
```

- time - 时间戳

- mdn - mdn 文档查询

```js
  mdn text
```

- npm - npm package 查询

```js
  npm text
```

- qr - 生成二维码

```js
  qr text
```

or (select content ->option + command + Q) or (copy content -> option + command + R)

## TODO

vscode, curl

## Contribute

[alfy](https://github.com/sindresorhus/alfy)

## License

MIT © [zxing](https://www.zxing.top)
