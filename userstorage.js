/*
Uses local storage to store a list of x,y positions.
*/

var exports = module.exports = {};

	var dataname = "se.svt.bolibompa.stuff";

	exports.testModule = function() {
		console.log("Testing module UserStorage");
		this.store(1,1);
		var data = this.retrive();
		console.log("Got data: " + data[0].x + " " + data[0].y);
	};

	exports.store = function(x, y) {

		var listOfstuff = [];
		
		//First, are there any old stuff?
		var oldies = this.retrive();
		
		if (oldies!=null) {
			listOfstuff = oldies;
		}
		//Add new stuff 
		var stuffobj = {"x":x,"y":y};
	
		listOfstuff.push(stuffobj);
 		
 		try {
			localStorage.setItem(dataname, JSON.stringify(listOfstuff) );
 		}
 		catch(e) {
 			console.log("Failed in attempt to store stuff for bolibompa" +e);
		}
 	};

	exports.retrive = function() {
		try {
			if(localStorage.getItem(dataname) === null) {
				console.log("No stuff in this device")
				//First time, we have no stuff yet,  just return 
				return;
			}
			else {
				var stuff = localStorage.getItem(dataname);
				console.log("Found stuff!");
				return JSON.parse(stuff);
			}
		}
		catch(e) {
 			console.log("Failed in attempt to read stuff for bolibompa" +e);
		}
		
	};

	exports.removeOne = function(x,y) {
		try {
			if(localStorage.getItem(dataname) === null) {
				console.log("No stuff in this device and hence no one to remove...")
				return;
			}
			else {
				var listOfstuff = localStorage.getItem(dataname);
				console.log("Found stuff!");
				var jsonlist = JSON.parse(listOfstuff);
				for (i=0;i<jsonlist.length;i++){
					if (jsonlist[i].x == x && jsonlist[i].y == y ) {
						jsonlist.splice(i,1);
						console.log("Removed object from x: " + x + " y:" +y);
						localStorage.setItem(dataname, JSON.stringify(jsonlist) );	
					}
				}
			}
		}
		catch(e) {
 			console.log("Failed in attempt to read stuff for bolibompa" +e);
		}
	}