/*
    Lectures about varialbe and datatypes
*/

/*
var firstName = 'John';
var lastName = 'Smith';
var age = 28;
var fullAge = true;
var job;
console.log(job);
job = 'Teacher';
console.log(job);
console.log(firstName + ' ' + lastName + ' age:' + age + ' Full Age:' + fullAge);
*/

/***************************
*   Varable Mutation and type coercion

var firstName = 'John';
var age = 28;
console.log(firstName + ' age:' + age);

var job, iMarried;
job = 'Teacher';
isMarried = false;


// Mutation

age = 'twenty eight';

console.log(age);

var lastName = prompt('What is his last name');
console.log(lastName)
*/


/********************************

Coding Challenge 1


var massJohn, massMark, heightJohn, heightMark
massJohn = 95.25;
massMark = 97;
heightJohn = 1.8;
heightMark = 1.75;

var compBMI = (massJohn/(heightJohn^2)) < (massMark/(heightMark^2));
console.log("Is Mark's BMI greater that John's?" + ' ' + compBMI);





// If / Else Statements

var firstName = 'John';
var civilStatus = 'single';

if (civilStatus === 'married') {
    console.log(firstName + ' is married.');
} else {
    console.log(firstName + ' is not married.');
}

*/





/* Functions

function calcAge(birthYear) {
    return 2018 - birthYear;
}


console.log(calcAge(1990));

*/

/* Challenge 3

var bills, tips;

bills = [124, 48, 268];
tips = [];

for (i = 0; i < bills.length; i++) {
    console.log(bills[i]);
    switch (true) {
        case bills[i] < 50:
            tip = bills[i] * .2;
            break;
        case bills[i] >= 50 && bills[i] < 200:
            tip = bills[i] * .15;
            break;
        case bills[i] > 200:
            tip = bills[i] * .1;
            break;
    }
    tips.push(tip);
    bills[i] = bills[i] + tip;
}


console.log(tips);
console.log(bills);


console
*/
























