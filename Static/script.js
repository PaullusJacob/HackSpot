var hackList = [];
var hack = {};

var json = new Array();
json = '{"result":true, "count":42}, {"result":false, "count":22}';
obj = JSON.parse(json[1]);

console.log(obj.count);
// expected output: 42

console.log(obj.result);
// expected output: true
