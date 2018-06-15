let obj = {
  a: 1,
  b: 2,
  hi: function() {
    console.log("hi");
  }
};
let objClone = Object.assign({}, obj);

console.log(objClone);
objClone.b = 89;
console.log(objClone);
console.log(obj);
objClone.hi();

let stringClone = JSON.parse(JSON.stringify(obj));
stringClone;
stringClone.a = 100;
stringClone;
obj;

let es6Clone = { ...obj };
es6Clone;
es6Clone.a = 120;
es6Clone;
obj;
