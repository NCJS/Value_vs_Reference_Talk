# Value vs Reference

The first part is pretty much a summary of [https://codeburst.io/explaining-value-vs-reference-in-javascript-647a975e12a0](https://codeburst.io/explaining-value-vs-reference-in-javascript-647a975e12a0)

## Primitive type vs reference type

A primitive (primitive value, primitive data type) is data that is not an object and has no methods. In JavaScript, there are 6 primitive data types: `string, number, boolean, null, undefined, symbol` (new in ECMAScript 2015).

They behave different from `objects` which is a reference type.

**Arrays & functions are also `objects` ! They are also of the reference type**

```JavaScript
let arr = [1,2,3]

console.log('typeof arr',typeof arr) > typeof arr object
```

## Primitives:

If a primitive type is assigned to a variable, we can think of that variable as containing the primitive value.

When we assign these variables to other variables using =, we copy the value to the new variable. They are copied by value.

```JavaScript
var x = 10;
var y = 'abc';
var a = x;
var b = y;
console.log(x, y, a, b); // -> 10, 'abc', 10, 'abc'
```

Both a and x now contain 10. Both b and y now contain 'abc'. They’re separate, as the values themselves were copied.
Changing one does not change the other. Think of the variables as having no relationship to each other.

```JavaScript
a = 5;
b = 'def';
console.log(x, y, a, b); // -> 10, 'abc', 5, 'def'
```

## Objects:

Variables that are assigned a non-primitive value are given a reference to that value. That reference points to the object’s location in memory. The variables don’t actually contain the value.

Objects are created at some location in your computer’s memory. When we write arr = [], we’ve created an array in memory. What the variable arr receives is the address, the location, of that array.

When a reference type value, an object, is copied to another variable using =, the address of that value is what’s actually copied over as if it were a primitive. Objects are copied by reference instead of by value.

```JavaScript
var reference = [1];
var refCopy = reference;

reference.push(2);
console.log(reference, refCopy); // -> [1, 2], [1, 2]
```

We’ve pushed 2 into the array in memory. When we use reference and refCopy, we’re pointing to that same array.

## == and ===

When the equality operators, == and ===, are used on reference-type variables, they check the reference. If the variables contain a reference to the same item, the comparison will result in `true`.

```JavaScript
var arrRef = [’Hi!’];
var arrRef2 = arrRef;
console.log(arrRef === arrRef2); // -> true
```

If they’re distinct objects, even if they contain identical properties, the comparison will result in `false`.

```JavaScript
var arr1 = ['Hi!'];
var arr2 = ['Hi!'];
console.log(arr1 === arr2); // -> false
```

But:

```JavaScript
var arr1str = JSON.stringify(arr1);
var arr2str = JSON.stringify(arr2);
console.log(arr1str === arr2str); // true
```

## Pure vs impure functions

We refer to functions that don’t affect anything in the outside scope as pure functions. As long as a function only takes primitive values as parameters and doesn’t use any variables in its surrounding scope, it is automatically pure, as it can’t affect anything in the outside scope. All variables created inside are garbage-collected as soon as the function returns.

A function that takes in an Object, however, can mutate the state of its surrounding scope. If a function takes in an array reference and alters the array that it points to, perhaps by pushing to it, variables in the surrounding scope that reference that array see that change. After the function returns, the changes it makes persist in the outer scope. This can cause undesired side effects that can be difficult to track down.

Many native array functions, including Array.map and Array.filter, are therefore written as pure functions. They take in an array reference and internally, they copy the array and work with the copy instead of the original.

### Example of impure function

```JavaScript
function changeAgeImpure(person) {
    person.age = 25;
    return person;
}
var alex = {
    name: 'Alex',
    age: 30
};
var changedAlex = changeAgeImpure(alex);
console.log(alex); // -> { name: 'Alex', age: 25 }
console.log(changedAlex); // -> { name: 'Alex', age: 25 }
```

### Example of of pure function:

```JavaScript
function changeAgePure(person) {
    var newPersonObj = JSON.parse(JSON.stringify(person));  // poor man's clone !
    newPersonObj.age = 25;
    return newPersonObj;
}
var alex = {
    name: 'Alex',
    age: 30
};
var alexChanged = changeAgePure(alex);
console.log(alex); // -> { name: 'Alex', age: 30 }
console.log(alexChanged); // -> { name: 'Alex', age: 25 }
```

### What happens here?

```JavaScript
function changeAgeAndReference(person) {
    person.age = 25;
    person = {
        name: 'John',
        age: 50
    };  // get's assigned to a new reference by object literal {}

    return person;
}
var personObj1 = {
    name: 'Alex',
    age: 30
};
var personObj2 = changeAgeAndReference(personObj1);
console.log(personObj1); // -> { name: 'Alex', age: 25 }
console.log(personObj2); // -> { name: 'John', age: 50 }
```

Remember that assignment through function parameters is essentially the same as assignment with =. The variable person in the function contains a reference to the personObj1 object, so initially it acts directly on that object. Once we reassign person to a new object, it stops affecting the original.

## Cloning strategies:

1.) `Object.assign`

The Object.assign() method is used to copy the values of all enumerable own properties from one or more source objects to a target object.

```JavaScript
let obj = {
  a: 1,
  b: 2,
  hi: function() {
      console.log('hi')
  }
};
let objClone = Object.assign({}, obj);

console.log(objClone); // result - { a: 1, b: 2 }
objClone.b = 89;
console.log(objClone); // result - { a: 1, b: 89 }
console.log(obj); // result - { a: 1, b: 2 }
objClone.hi(); //result 'hi'
```

Works for methods but does not solve the problem of nested Objects.

2.) `JSON.parse(JSON.stringify(...))`

Works for nested objects because it turns everything into a string and back.
Does not clone the `hi()` method!

3.) ES6 spread operators

````JavaScript
let es6Clone = {...obj]

Works like `Object.assign` but is cleaner, no deep cloning again

4.) External libraries like `lodash`

```JavaScript
var objects = [{ 'a': 1 }, { 'b': 2 }];

var deep = _.cloneDeep(objects);
console.log(deep[0] === objects[0]);
// => false
````

Works for methods and clones deep. Lodash is also build very modular so you bloat is limited.

`import clonedeep from 'lodash/clonedeep'`
