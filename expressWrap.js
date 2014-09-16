var _ = require('lodash');


/* FROM ANGULAR (stripped) */
var FN_ARGS = /^function\s*[^\(]*\(\s*([^\)]*)\)/m;
var FN_ARG_SPLIT = /,/;
var FN_ARG = /^\s*(_?)(.+?)\1\s*$/;
var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
function getParams(fn) {
  var fnText,
    argDecl,
    params;

  if (typeof fn == 'function') {
    params = [];
    fnText = fn.toString().replace(STRIP_COMMENTS, '');
    argDecl = fnText.match(FN_ARGS);
    _.forEach(argDecl[1].split(FN_ARG_SPLIT), function (arg) {
      arg.replace(FN_ARG, function (all, underscore, name) {
        params.push(name);
      });
    });
  } else if (_.isArray(fn)) {
    var last = fn.length - 1;
    params = fn.slice(0,last);
  }
  return params;
}

function getFunc(fn) {
  if (typeof fn == 'function') {
    return fn;
  } else if (_.isArray(fn)) {
    return fn[fn.length - 1];
  }
}

var ERR_NEED_BODY = 404;

module.exports = function (moduleToWrap) {

  var wrapped = {};
  _.forEach(moduleToWrap, function (func, funcName) {

    var params = getParams(func);

    wrapped[funcName] = function (req, res) {
      if (params.length > 0) {
        if (!req.body) {
          res.send(ERR_NEED_BODY);
          return;
        }
      }

      var filledParams = params.map(function (param) {
        return req.body[param];
      });

      res.send(getFunc(func).apply(moduleToWrap, filledParams));
    };
  });

  return wrapped;
};