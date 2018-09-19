/////////////////////////////////
// CODING CHALLENGE

/*

Suppose that you're working in a small town administration, and you're in charge of two town elements:
1. Parks
2. Streets

It's a very small town, so right now there are only 3 parks and 4 streets. All parks and streets have a name and a build year.

At an end-of-year meeting, your boss wants a final report with the following:
1. Tree density of each park in the town (forumla: number of trees/park area)
2. Average age of each town's park (forumla: sum of all ages/number of parks)
3. The name of the park that has more than 1000 trees
4. Total and average length of the town's streets
5. Size classification of all streets: tiny/small/normal/big/huge. If the size is unknown, the default is normal

All the report data should be printed to the console.

HINT: Use some of the ES6 features: classes, subclasses, template strings, default parameters, maps, arrow functions, destructuring, etc.

*/

/*  Things we need
    Park class
        area
        number of trees
        age of park
        
    Street Class
        length
        size 
        

Park
    tree density of each park
    average age of parks
    name of park with more than 1000 trees
    
Street
    Total length of streets
    Average length of street
    Size of each street

*/

//Park base class

class Park {

    constructor (name, size, numTrees, yearBuilt) {
        this.name = name;
        this.size = size;
        this.numTrees= numTrees;
        this.yearBuilt = yearBuilt;
    }
    
    //return the number of trees
    getNumberOfTrees () { return this.numTrees; }
    
    //calculate and get tree density
    getTreeDenisty() { return this.numTrees/this.size; }
    
    getName() { return this.name; }
    
    getSize() { return this.size; }
    
    getAge() { return new Date().getFullYear() - this.yearBuilt; }
    
}

class Street {
    
    constructor (length, name, size='Normal') {
        this.length = length;
        this.name = name;
        this.size = size; //tiny/small/normal/big/huge
    }
 
    getName() { return this.name; }
    
    getLength() { return this.length; }
    
    getSize() { return this.size; }
    
}

let parks = [
    new Park ('Bridge', 50, 750, 1972),
    new Park ('Grand', 250, 950, 1935),
    new Park ('Jelly', 150, 350, 1965),
    new Park ('Glacier', 500, 1750, 1989)
];

let streets = [
    new Street (20, 'First'),
    new Street (30, 'Second', 'Tiny'),
    new Street (40, 'Third', 'Small'),
    new Street (50, 'Fourth', 'Big'),
    new Street (60, 'Fifth', 'Huge')
];


function getParkTreeDensity() {
    
    parks.forEach(function(cur) {
        console.log(`${cur.getName()}'s tree density is ${cur.getTreeDenisty().toFixed(2)} trees/acre.`);
    });
};

function getParkAverageAge() {
    let age = 0;
    let average = 0;
    parks.forEach(cur => {
        age += cur.getAge();
    });
    average = (age / parks.length.toFixed(2));
    console.log(`The average age of each park is ${average} years.`);
}

function getParksWith1000Trees() {
    
    parks.forEach(cur => {
        if (cur.getNumberOfTrees() > 1000) {
            console.log(`${cur.getName()} park, which has ${cur.getNumberOfTrees()} trees, has more than 1000.`);
        }
    })
}

function getStreetLengths() {
    streets.forEach(cur => {
        console.log(`${cur.getName()} street is ${cur.getLength()} miles long.`);
    })
}

function getStreetAverageLength() {
    let totalLength = 0;
    let average = 0;
    streets.forEach(cur => {
        totalLength += cur.getLength();
    });
    average = (totalLength / streets.length.toFixed(2));
    console.log(`The average length of each street is ${average} miles.`);
}


function getStreetSize() {
    streets.forEach(cur => {
        console.log(`${cur.getName()} street is ${cur.getSize()}.`);
    })
}


//Delivarables
console.log('Parks');
getParkTreeDensity();
getParkAverageAge();
getParksWith1000Trees();
console.log('--------');
console.log('Streets');
getStreetLengths();
getStreetAverageLength();
getStreetSize();







































