var _ = require('lodash');


/* FROM ANGULAR (stripped) */
var FN_ARGS = /^function\s*[^\(]*\(\s*([^\)]*)\)/m;
var FN_ARG_SPLIT = /,/;
var FN_ARG = /^\s*(_?)(.+?)\1\s*$/;
var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
function getParams(fn) {
  var $inject,
    fnText,
    argDecl,
    last;

  if (typeof fn == 'function') {
    params = [];
    fnText = fn.toString().replace(STRIP_COMMENTS, '');
    argDecl = fnText.match(FN_ARGS);
    _.forEach(argDecl[1].split(FN_ARG_SPLIT), function (arg) {
      arg.replace(FN_ARG, function (all, underscore, name) {
        params.push(name);
      });
    });
  }
  return params;
}


var ERR_NEED_BODY = 404;


module.exports = function (moduleToWrap) {

  var wrapped = {};
  _.forEach(moduleToWrap, function (func, funcName) {

    var params = getParams(func);

    wrapped[funcName] = function (req, res) {
      console.log(params);
      console.log(func.toString());

      if (params.length > 0) {
        if (!req.body) {
          res.send(ERR_NEED_BODY);
          return;
        }
      }

      var filledParams = params.map(function (param) {
        return req.body[param];
      });

      res.send(func.apply(moduleToWrap, filledParams));
    };
  });

  return wrapped;
};