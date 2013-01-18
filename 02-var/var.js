var outside = 'outside', leaked, inside;

function leaky(){
	var inside = "secret";
	leaked = "leaked";
	console.log("Inside leaky", inside, leaked);
}

leaky();

// our "inside" wasn't changed but "leaked" was
console.log("Outside leaky", inside, leaked);

// you can effectively use functions as private namespaces
var myNameSpace = (function(){
	var myObject = {};
	console.log( "I know about myObject", myObject );
	return myObject;
})();

// out here we don't know abot myObject
try {
	console.log( myObject );
} catch(e) {
	console.error(e.message);
}

