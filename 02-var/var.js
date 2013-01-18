var outside = 'outside', leaked, inside;

function leaky(){
	var inside = "secret";
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
