
var exports = module.exports = {};

	var dataname = "se.svt.bolibompa.flowers";

	exports.testModule = function() {
		console.log("Testing module UserStorage");
		this.store(1,1);
		var data = this.retrive();
		console.log("Got data: " + data[0].x + " " + data[0].y);
	};

	exports.store = function(x, y) {

		var listOfFlowers = [];
		
		//First, are there any old flowers?
		var oldies = this.retrive();
		
		if (oldies!=null) {
			listOfFlowers = oldies;
		}
		//Add new flowers 
		var flowerobj = {"x":x,"y":y};
	
		listOfFlowers.push(flowerobj);
 		
 		try {
			localStorage.setItem(dataname, JSON.stringify(listOfFlowers) );
 		}
 		catch(e) {
 			console.log("Failed in attempt to store flowers for bolibompa" +e);
		}
 	};

	exports.retrive = function() {
		try {
			if(localStorage.getItem(dataname) === null) {
				console.log("No flowers grown in this device")
				//First time, we have no flowers yet,  just return 
				return;
			}
			else {
				var flowers = localStorage.getItem(dataname);
				console.log("Found flowers!");
				return JSON.parse(flowers);
			}
		}
		catch(e) {
 			console.log("Failed in attempt to read flowers for bolibompa" +e);
		}
		
	};