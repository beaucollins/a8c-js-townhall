// there are a few different ways to make functions
// here's a way that may look familiar to PHP devs
function sayHello(){
	console.log(this, "Hello");
}

// here we're assigning an anonymous function to a variable
// you can do this in PHP too, but it's not done in WordPress
var saySomething = function(thing){
	console.log(this, "saying", thing);
};

// functions are really just objects whose prototype is Function
console.log( saySomething.constructor );
// also Function is just a function
console.log( typeof Function );
// > "function"

// here's a nother function
var sayYourName = function(){
	console.log("My name is", this.name);
};

// here's a "self-executing" function, it's not named and is not
// stored in a variable
(function(){
	console.log("Runs");
})();

// you can also create functions using the Function constructor
// effectively the same thing as eval'ing
var f = new Function("console.log(\"lol\")");
console.log(f);
// > function anonymous ...

// and then you can call it
f();
// > lol

// all functions have a "context" that they are bound to. By default
// it is the calling context. That context is stored in the magic "this"
// variable
console.log(this);
// > Window

var whoAmI = function (){
	// log out the current context
	console.log( "I am", this, "and my name is", this.name, "it is now", (new Date()).getTime() );
};
whoAmI();
// > I am Window and my name is

// that's fun, but did you know you can change a functions context?
// Functions have to useful methods called "call" and "apply". The first
// argument is the object that you want the function to have as the "this"
// variable.
var me = { name:'Beau' };
whoAmI.call( me );
// > I am Object and my name is Beau

// you can also change the context of a function assigning it to an object
me.saySomething = whoAmI;
me.saySomething();
// > I am Object and my name is Beau


// functions can be given any number of arguments
// you can access the arguments provided to a function by accessing
// the "magic" arguments variable within the function
//
// be careful, the arguments variable looks like an Array, but it is not
// an array. So it doesn't have an Array's methods
var logsArguments = function(){
	console.log( arguments, arguments.pop ); // sorry no pop method
};

logsArguments();
// > [], undefined
logsArguments(1, 'two' , 3, 'four');
// > [1, "two", 3, "four"], unedfined

// that's ok though, we can borrow Array's methods and use the .call method
// we just learned about since they're just functions
var argumentsAsArray = function(){
	// Array's slice method with no parameters will just give you a copy
	// of the calling array
	var args = Array.prototype.slice.call( arguments );
	// now we can play with it like an array
	args.unshift( "Start" );
	console.log( args );
}

argumentsAsArray( 1, 2, 3 );
// > ["Start", 1, 2, 3]


// here's something interesting, using function scopes, I can create a new
// function that creates functions that always uses the same scope
var bind = function(context, fn){
	return function(){
		// apply takes to arguments:
		// - the first being the context that the function will have when executed
		// - the second an Array (or "Array like" object) to use for the arguments
		return fn.apply( context, arguments );
	}
};

var alwaysBeau = bind(me, whoAmI);

alwaysBeau();
// > I am Object and my name is Beau ...

// even when I try to call it with a different context, the function is "locked"
// to the original context I gave to the bind function
alwaysBeau.call( window );
// > I am Object and my name is Beau ...
