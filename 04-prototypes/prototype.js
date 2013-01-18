// so now we get to play with the Prototype object model

// let's make an array
var myArray = new Array(1,2,3);
console.log( myArray );
// > [1, 2, 3]

// a this point you could say tha myArray is an instance
// of the Array class. However, in Javascript there are no
// classes, only Objects. So how then does every instance of
// the Array prototype know how to .pop or .push ? Because
// of the prototype chain. Each function has a "prototype"
// property and objects created with it are assigned that
// functions prototype:

// an array instance's prototype is an array: "[]"
// an that object's prototype is an Object

// let's see how far it goes
var logPrototypeChain = function( obj ){
	var proto;
	while( proto = Object.getPrototypeOf(obj) ){
		console.log("Prototype of", obj, "is", proto);
		obj = proto;
	}	
}
logPrototypeChain( myArray );
// >

// so when you call an array's .pop() this is what happens, the
// prototype chain is traversed until pop is found and then it
// calls the pop method

var newArray = [1,2,3];
// myArray's prototype (which is Array.prototype) does have a
// a property named pop, so that's the one that is used:
newArray.pop(); // equivalent to Array.prototype.pop.call(myArray)
console.log( newArray.join( ', ' ) );
// > 1,2


// so what happens if we give myArray a different pop method?
newArray.pop = function(){
	this.push( "LOL!" );
}

newArray.pop();
console.log( newArray.join(', ') );
// > 1, 2, LOL!

// if we delete the pop property from the newArray instance,
// Array.prototype.pop will be used again
delete newArray['pop'];
newArray.pop();
console.log( newArray.join(", "));
// > 1, 2

// so let's create our own custom type
var Thing = function( name ){
	// set the newly created instance's name if provided
	if( name ) this.name = name;
}

// let's provide a default name
Thing.prototype.name = "not named";

var t = new Thing(), beau = new Thing( "beau" );
console.log( "t:", t.name, "beau:", beau.name );
// > t: not named beau: beau

// if we remove the name property from the beau instance, it
// get's the prototype's name
delete beau.name
console.log( beau.name );
// > not named

// Here's something different, a prototype is still just a regular
// object and can still be changed, so if we change:
Thing.prototype.name = "Randy Beaman";
// then our instances names access the prototype's changed name
console.log( beau.name, t.name );
// > Randy Beaman Randy Beaman
// Beau likes his name though so let's put it back
beau.name = 'Beau';

// So wait, that means we can change the behaviour of every single array
// by modifying the Array prototype?
// Yes, we can:
Array.prototype.popTwice = function(){
	this.pop();
	this.pop();
}
// now all arrays, past and present have a popTwice method
newArray.popTwice();
console.log( newArray.join(", "));
// > 
// there's nothing there anymore

// ok, so we can modify a prototype, but what if we wanted to subclass
// so we can specialize without modifying the superclass's behaviour?
// We take advantage of the prototype chain

var SpecialThing = function(){
	// we want to call Thing so the name is setup properly
	Thing.apply( this, arguments ); 
};

// Object.create is a "static" method that given a prototype object
// and a set of properties, it will create a new object with the 
// supplied properties and whose prototype is the first object
SpecialThing.prototype = Object.create( Thing.prototype );
SpecialThing.prototype.speak = function(){
	console.log( "My name is: ", this.name );
}

var thing = new SpecialThing( 'Special' );
// our name is "Special" because the Thing constructor sets the name
// property if one is provided
thing.speak();
// > My name is: Special
delete thing.name;

// we deleted the instance's name so now it will traverse the prototype chain
// until it can find one that has a name property. In this case SpecialThing.prototype
// doesn't define a name, but it's prototype Thing.prototype does, so we're going to
// use it's name
thing.speak();
// > My name is: Randy Beaman

// here's thing's prototypes:
logPrototypeChain( thing );
// > Prototype of Object is Object  <<< SpecialThing
// > Prototype of Object is Object  <<< Thing
// > Prototype of Object is Object  <<< Object


// but beau want's to be special too! We can let him borrow SpecialThing's speak
// method
beau.speak = SpecialThing.prototype.speak;
beau.speak();
// > My name is: Beau

// beau knows how to speak, but he's still not a SpecialThing
logPrototypeChain( beau );
// > Prototype of Object is Object  <<< Thing
// > Prototype of Object is Object  <<< Object

