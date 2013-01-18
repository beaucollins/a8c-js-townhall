// technically these are "primitives"
var a_number = 1,
	a_string = "hello",
	a_nothing = null,
	a_undefined;

// however when you interact with them, they are coerced into their
// respective 'non-primitive' counter parts
//
// String objects have a replace method, so when you call replace on
// a string "primitive" it's coerced into a String whose "replace" method
// is then called
console.log( a_string, a_string.replace(/[aeiou]/g,'x') );
// > "hello", "hxllx"

// In most consoles, when logged, primitives show as the primitive value
console.log(
	a_number,
	a_string,
	a_nothing,
	a_undefined
);
// > 1, "hello", null, undefined

// Object equivalents show up as Objects, notice how equality still works
// due to coercion
console.log( a_number, new Number(1), a_number == new Number(1)); 
// > 1, Number, true

console.log( a_string, new String("hello"), a_string == new String("hello") );
// > "hello", String, true

// you can create your own objects as object literals
var an_object = { name:'Beau' };
console.log( an_object );
// > Object

// you can set object properties using dot "." syntax or hash/dictionary syntax:
an_object.age = 30;
an_object['hair-color'] = 'brown';

// properties set with dots, can be accessed with hash syntax and vice versa
try {
	console.log( an_object['age'], an_object.hair-color );	
} catch(e) {
	// OOPS! Dot syntax doesn't let you use hyphens in property names!
	console.error(e.message);
}
// > Can't find variable: color

// You interact with an object by calling its methods
// let's create an array:
var my_array = [1,2,3];

// let's pop the last element off the array
var popped_value = my_array.pop();
console.log( my_array, popped_value );
// > [1, 2], 3

var other_array = [3,4,5];
// let's combine the arrays and make a new array
console.log( my_array.concat( other_array ) );
// > [1, 2, 3, 4, 5];
// notice that the other two arrays still happily exist
console.log( my_array, other_array );
// > [1, 2], [3,4,5]

// What else can you do with an Array?
// https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array

// MDN is a good reference
// https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects