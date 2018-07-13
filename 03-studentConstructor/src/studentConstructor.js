'use strict';

var student1 = new Student('Ivan', 'Ivanov', [4,5,5]);
var student2 = new Student('Semen', 'Semenov', [3,5,5]);
var student3 = new Student('Petr', 'Petrov', [4,3,5]);
var student4 = new Student('Irina', 'Morozova', [4,3,3]);
var student5 = new Student('Katerina', 'Kolobkova', [5,5,5]);

console.log(student1.fullName());
console.log(student2.gradesAverage());
console.log (Student.group());
console.log (Student.showAllStudents());
console.log (Student.showBestStudent());
console.log (Student.bestStudent);


function Student(name, surname, grades) {
  this.name = name;
  this.surname = surname;
  this.grades = grades;
  this.fullName = function () {
    return `${this.name} ${this.surname}`;
  }
  this.gradesAverage = function () {
    const gradesSum = this.grades.reduce( (sum, grade) => sum += grade, 0);

    return Number( (gradesSum/grades.length).toFixed(2) );
  };

  if (!Student.allStudents) {
    Student.allStudents = [];
  }

  Student.allStudents.push(this);
  // sort allStudents by grade
  (function sortStudents(array){
    array.sort(function(a,b) {return (a.gradesAverage() < b.gradesAverage()) ? 1 : ((b.gradesAverage() < a.gradesAverage()) ? -1 : 0);})
  })(Student.allStudents);
  // best student is 1st in the array
  Student.bestStudent = Student.allStudents[0];

  Student.group = function() {
    return Student.allStudents;
  };
  Student.showAllStudents = function () {
    let allStudents = '';

    Student.allStudents.forEach(student => {
      allStudents += `${student.fullName()}. Середній бал = ${student.gradesAverage()}.\n`;
    });

    return allStudents;
  };
  Student.showBestStudent = function () {
    return `${Student.bestStudent.fullName()} - кращий студент курсу. Середній бал = ${Student.bestStudent.gradesAverage()}.`;
  };
}

