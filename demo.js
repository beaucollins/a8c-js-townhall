// ../demo.js
// find all scripts that aren't demo.js and spit em out
document.addEventListener("DOMContentLoaded", function(){
	var scripts = document.querySelectorAll('script'),
		div = document.createElement('div');
	
	document.body.appendChild(div);
	
	[].forEach.call(scripts, function( script ){
		if(script.src.split('/').slice(-1)[0] != 'demo.js'){
			var xhr = new XMLHttpRequest();
			xhr.addEventListener('readystatechange', function(){
				if (xhr.readyState == XMLHttpRequest.DONE) {
					var pre = xhr.responseText.split("\n").reduce(function(pre, line, i){
						var el = document.createElement('span'),
							out = line,
							t,
							n = document.createElement('small');
							n.textContent = i+1;
							
						if (line.match(/^\/\/ >/)) {
							el.classList.add('output');
							out = line.replace(/^\/\/ /,'');
						} else if (line.match(/^\/\//)){
							el.classList.add('comment');
						} 
						t = document.createTextNode( out + "\n");
						el.appendChild(n);
						el.appendChild(t)
						pre.appendChild(el);
						return pre;
					}, document.createElement('pre'));
					var h1 = document.createElement('h1');
					h1.textContent = script.src.split("/").slice(-2).join('/');
					div.appendChild(h1);
					div.appendChild(pre);
				};
			});
			xhr.open( 'GET', script.src );
			xhr.send();
			
		}
	} );	
}, false)

