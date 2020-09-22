// Section 1

// 1. DRY stands for "Don't Repeat Yourself".  Loops and functions help us keep our code DRY

// 2. 'var' is what was used in older versions of Javascript to declare variables.
//    'let' allows us to declare a variable but the value is mutable later in the program.
//    'const' is another variable declaration but the value cannot be changed after it is initialized

// Section 2

// a < b
// c > d
// 'Name' == 'Name'
// a < b > c
// a == a < d
// e != 'Kevin'
// 48 != '48'
// f != e
// let g = 0
// console.log(g)
// g = b + c
// console.log(g)

// I chose let because I wanted the variable to be mutable (able to change)
// I get no errors
// Uncaught SyntaxError: Invalid left-hand side in assignment

// Section 3
// The first block of code is an infinite loop because the condition always remains true
// The second block of code is not an infinite loop because the condition is false after the initial running of the code

// the following line sets the variable "letters" to the string "A"
// let letters = "A";
// the following line sets the iterator to 0
// let i = 0;
// the while loop will concatenate the letters 20 times
// while (i < 20) {
  // this concatenates the string
  // letters += "A";
  // this increments the iterator by one
// 	i++;
// }
// this console logs the varable after the loop has completed
// console.log(letters);

// Section 4
// The three sections of the control panel are the initialized variable, the condition, and the incrementer


// for (i = 0; i <= 100; i++) {
  // console.log(i);
// }

// for (i = 999; i >= 0; i--) {
  // console.log(i)
// }

// for (i = 0; i <= 10; i++) {
  // console.log('The value of i is: ' + i + ' of 10')
// }

// for (i = 0; i <= StarWars.length; i++) {
  // console.log(StarWars[i])
// }

// for (i = 0; i <= StarWars.length; i++) {
  // console.log(StarWars[i] + " " + i)
// }

// for (i = 0; i <= StarWars.length; i + 2) {
  // console.log(StarWars[i])
// }