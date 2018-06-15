let obj = {
  a: 1,
  b: 2,
  hi: function() {
    console.log("hi");
  },
  nested: { c: 3, d: 4 }
};

let shallowClone = { ...obj };
let stringifyClone = JSON.parse(JSON.stringify(obj));

obj;
shallowClone;
stringifyClone;

obj.nested.c = "what's happening?";

obj;
shallowClone;
stringifyClone;
