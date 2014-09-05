express-wrap
============

A node.js module to wrap a standard node module's functions into express functions.

###Install

```
npm install express-wrap
```

###Usage

```
var yourModule = require('your-module-here');
var wrappedModule = require('express-wrap')(yourModule);
```