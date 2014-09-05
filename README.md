express-wrap
============

A node.js module to wrap a standard node module's functions into express functions.

###Install

```
npm install express-wrapper
```

###Usage

```
var yourModule = require('your-module-here');
var wrappedModule = require('express-wrapper')(yourModule);
```