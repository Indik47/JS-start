'use strict';

var gradesSum = function (grades) {
  return grades.reduce( (sum, grade) => sum += grade, 0);
};

var sortByAverage = function (a, b) {
  return ( b.gradesAverage - a.gradesAverage );
};

var allStudentsSorted = function (allStudents) {
  return allStudents.map(student => {
    return {
      name: student.name,
      surname: student.surname,
      grades: student.grades,
      gradesAverage: student.gradesAverage()
    }
  }).sort(sortByAverage);
};

// constructor
var Student = function(name, surname, grades) {
  this.name = name;
  this.surname = surname;
  this.grades = grades;
  this.fullName = function () {
    return `${this.name} ${this.surname}`;
  };

  this.gradesAverage = function () {
    return Number( (gradesSum( this.grades) / this.grades.length ).toFixed(2) );
  };

  if (!Student.group) { Student.group = []; }
  Student.group.push(this);
  Student.bestStudent = allStudentsSorted(Student.group)[0];
};

Student.showBestStudent = function () {
  return `${Student.bestStudent.name} ${Student.bestStudent.surname} - кращий студент курсу. Середній бал = ${Student.bestStudent.gradesAverage}.`;
};

Student.showAllStudents = function () {
  return allStudentsSorted(Student.group)
    .map((student, key) =>
      `${key}: ${student.name} ${student.surname}. Середній бал = ${student.gradesAverage}\n`)
        .join("");
 };

//students creation
var student1 = new Student('Ivan', 'Ivanov', [4,5,5]);
var student2 = new Student('Semen', 'Semenov', [3,5,5]);
var student3 = new Student('Petr', 'Petrov', [4,3,5]);
var student4 = new Student('Irina', 'Morozova', [4,3,3]);
var student5 = new Student('Katerina', 'Kolobkova', [5,5,5]);

//function binding and logging
var stud1Name = student1.fullName.bind(student1);
var stud1Grades = student1.gradesAverage.bind(student1);
console.log(stud1Name());
console.log(stud1Grades());

console.log (Student.group);
console.log (Student.showAllStudents());
console.log (Student.showBestStudent());
console.log (Student.bestStudent);



