function Student(name, age, greatestFear) {
  this.name = name;
  this.age = age;
  this.greatestFear = greatestFear;
}

var students = [
  new Student('bob,' 20, 'cats'),
  new Student('Joe', 4, 'the tooth fairy'),
  new Student('Sarah', 99, 'pickles')
];

// if we age each student by 1 uear what is the total age of all students
// referential transparancy same output each time you do it

students.map(function(student) {
  return new Student(student.name,
                     student.age + 1,
                     student.greatestFear);
}).reduce(function(sum, student){
  return sum + student.age;
  }, 0);

  // ________________________
  var numbers = [10, 6, 8];
  // multiply each number by 10 then multiply each number together
  //array of names use "people in the room" and list the names in the array
numers.map(function())

  var students = ['James', 'Frank', 'Penny'];

  students.reduce(function(list, student){
    return output + student.name + "\n";

  }) "is in the room\n"
