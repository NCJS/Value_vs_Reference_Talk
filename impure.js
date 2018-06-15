function changeAgeImpure(person) {
  person.age = 25;
  return person;
}
var alex = {
  name: "Alex",
  age: 30
};
var changedAlex = changeAgeImpure(alex);
console.log(alex);
console.log(changedAlex);
