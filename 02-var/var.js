// var declares that these variables are owned by the current
// context.
var outside = 'outside', leaked, inside;

function leaky(){
	// inside is now only available inside the leaky function
	var inside = "secret";
	// we didn't declare a var here so it's going to be available outside
	// of this function
	leaked = "leaked";
	console.log("Inside leaky", inside, leaked);
}

leaky();
// > Inside leaky secret leaked

// our "inside" wasn't changed but "leaked" was
console.log("Outside leaky", inside, leaked);
// > Outside leaky, undefined, leaked

// you can effectively use functions as private namespaces
var myNameSpace = (function(){
	var myObject = {};
	console.log( "I know about myObject", myObject );
	return myObject;
})();
// > I know about myObject Object

// out here we don't know abot myObject
try {
	console.log( myObject );
} catch(e) {
	console.error(e.message);
}
// > Can't find variable: myObject

// functions can be nested and var will make sure a variable remains
// in it's context

var scope1 = function(){
	var one = 'a', two = 'b', three = 'c';
	var scope2 = function(){
		var two = '2', three = '3';
		// override one which is defined in scope1
		var scope3 = function(){
			var three = "LOL";
			// override one, which is originally defined in scope1
			one = 'LOL';
			// override two, which is defined in scope2, but two in scope1 is
			// not changed here
			two = 'LOL';
			console.log( one, two, three );
			// > LOL LOL LOL
		}
		scope3();
		console.log( one, two, three );
		// > LOL LOL 3
	}
	scope2();
	// one was overridden in scope3, but two and three were redeclared in
	// scope2 and scope3 so they weren't modified
	console.log(one, two, three)
	// > LOL b c
}
scope1();

