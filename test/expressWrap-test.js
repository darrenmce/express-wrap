var expressWrap = require('../expressWrap');

var testModule = {
  funcA: function (str1, str2) {
    return str1 + '=' + str2;
  },
  funcB: ['param1', 'param2', function (a, b) {
    return a + '=' + b;
  }]
};

var wrapped = expressWrap(testModule);

var req1 = {
  body: {
    str1: 'foo',
    str2: 'bar'
  }
};
var testResult1 = "fail";

var res1 = {
  send: function (data) {
    console.log('Response: '+data);
    testResult1 = data;
  }
};


wrapped.funcA(req1, res1);


if (testResult1 != 'foo=bar') {
  console.log('FAILED');
} else {
  console.log('PASSED')
}

var req2 = {
  body: {
    param1: 'foo',
    param2: 'bar'
  }
};
var testResult2 = "fail";

var res2 = {
  send: function (data) {
    console.log('Response: '+data);
    testResult2 = data;
  }
};

wrapped.funcB(req2, res2);


if (testResult2 != 'foo=bar') {
  console.log('FAILED');
} else {
  console.log('PASSED')
}