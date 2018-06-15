let arr = [1, 2, 3];

console.log("typeof arr", typeof arr);

function changeAgePure(person) {
  var newPersonObj = { ...person };
  newPersonObj.age = 25;
  return newPersonObj;
}
var alex = {
  name: "Alex",
  age: 30
};
var alexChanged = changeAgePure(alex);
console.log(alex);
console.log(alexChanged);
