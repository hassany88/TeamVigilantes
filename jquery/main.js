//Variables for drop downs
var locations;
var catagories;



$(document).ready(function() {
	init();
});

function init(){

	//set location and catagories
	$.getJSON("https://api.trademe.co.nz/v1/TmAreas.json", function(data){
		locations = data;
		addLocations();
	});

	$.getJSON("http://api.trademe.co.nz/v1/Categories.json", function(data){
		catagories = data;
		addCatagories();
	});

	addDropdownCallbacks();

	addButtonListener();
	if($("#loaded").length > 0) {
		setTimeout( function() {
			$("#loading").hide();
			$("#loaded").show();
		},3000);
	}

}

function addLocations(){
	var ld = $("#location-drop");
	for(pos in locations) {
		 	var value = locations[pos].Name;
		 	var option = "<option value="+pos+">"+value+"</option>";
	    ld.append(option);
	}
}

function addCatagories(){
	var c1d = $("#category1-drop");
	var c1d2 = $("#category1-drop2");
	//put in dummy selections
	c1d.append("<option>Select category...</option>");
	c1d2.append("<option>Select category...</option>");

	catagories.Subcategories.forEach(function(value, key){
		var valueName = value.Name;
	 	var option = "<option>"+valueName+"</option>";
    c1d.append(option);
    c1d2.append(option);
	});
}

function addDropdownCallbacks(){
	locationCallback();
	catagory1Callback();
}

function locationCallback(){
	$('#location-drop').change(updateDistricts);
}

function updateDistricts(){

	dd = $('#district-drop');
	//empty whats there
	dd.empty();

	//add new locations
	var currentLocation = $('#location-drop').val();
	var districts = locations[currentLocation].Districts;
	for(pos in districts) {
		 	var value = districts[pos].Name;
		 	var id = districts[pos].DistrictId;
		 	var option = "<option value="+id+">"+value+"</option>";
	    dd.append(option);
	}
}

function catagory1Callback(){
	$('#category1-drop').change(function(){updateCat2();});//update drop2 from 1
	$('#category2-drop').change(function(){updateCat3();});//update drop3 from 2
	$('#category3-drop').change(function(){updateCat4();});//update drop4 from 3
	$('#category1-drop2').change(function(){updateCat22();});//update drop2 from 1
	$('#category2-drop2').change(function(){updateCat32();});//update drop3 from 2
	$('#category3-drop2').change(function(){updateCat42();});//update drop4 from 3
}

function updateCat2(){
	//get the dropdown object to update
	c2 = $('#category2-drop');
		//empty whats already there
	c2.empty();
	//put in dummy selection
	c2.append("<option>Select category...</option>");

	//add new catagories
	var currentCat = $('#category1-drop').val();
	catagories.Subcategories.forEach(function(value, key){ //first layer
		if (value.Name === currentCat){
			value.Subcategories.forEach(function(value2, key){ //second layer
				var name = value2.Name;
				var option = "<option>"+name+"</option>";
				c2.append(option);
			});
		}
	});
}

function updateCat3(){
	//get the dropdown object to update
	c3 = $('#category3-drop');
		//empty whats already there
	c3.empty();
	//put in dummy selection
	c3.append("<option>Select category...</option>");

	//add new catagories
	var currentCat1 = $('#category1-drop').val();
	var currentCat2 = $('#category2-drop').val();
	catagories.Subcategories.forEach(function(value, key){ //first layer
		if (value.Name === currentCat1){
			value.Subcategories.forEach(function(value2, key){ //second layer
				if (value2.Name === currentCat2){
					value2.Subcategories.forEach(function(value3, key){ //third layer
						var name = value3.Name;
						var option = "<option>"+name+"</option>";
						c3.append(option);
					})
				}
			});
		}
	});
}

function updateCat4(){
	//get the dropdown object to update
	c4 = $('#category4-drop');
		//empty whats already there
	c4.empty();
	//put in dummy selection
	c4.append("<option>Select category...</option>");

	//add new catagories
	var currentCat1 = $('#category1-drop').val();
	var currentCat2 = $('#category2-drop').val();
	var currentCat3 = $('#category3-drop').val();

	catagories.Subcategories.forEach(function(value, key){ //first layer
		if (value.Name === currentCat1){
			value.Subcategories.forEach(function(value2, key){ //second layer
				if (value2.Name === currentCat2){
					value2.Subcategories.forEach(function(value3, key){ //third layer
						if (value3.Name === currentCat3){
							//console.log(value3.Subcategories);
							if(value3.Subcategories !== undefined){//test that we aren't at the end!
								// console.log("hi");
								value3.Subcategories.forEach(function(value4, key){ //fourth layer
									var name = value4.Name;
									var catNum = value4.Number;
									// console.log(catNum);
									var option = "<option value="+catNum+">"+name+"</option>";
									c4.append(option);
								});
							}else{							
								c4.empty();
								c4.append("<option value="+value3.Number+"></option>");
							}
						}
					})
				}
			});
		}
	});
}

function updateCat22(){
	//get the dropdown object to update
	c2 = $('#category2-drop2');
		//empty whats already there
	c2.empty();
	//put in dummy selection
	c2.append("<option>Select category...</option>");

	//add new catagories
	var currentCat = $('#category1-drop2').val();
	catagories.Subcategories.forEach(function(value, key){ //first layer
		if (value.Name === currentCat){
			value.Subcategories.forEach(function(value2, key){ //second layer
				var name = value2.Name;
				var option = "<option>"+name+"</option>";
				c2.append(option);
			});
		}
	});
}

function updateCat32(){
	//get the dropdown object to update
	c3 = $('#category3-drop2');
		//empty whats already there
	c3.empty();
	//put in dummy selection
	c3.append("<option>Select category...</option>");

	//add new catagories
	var currentCat1 = $('#category1-drop2').val();
	var currentCat2 = $('#category2-drop2').val();
	catagories.Subcategories.forEach(function(value, key){ //first layer
		if (value.Name === currentCat1){
			value.Subcategories.forEach(function(value2, key){ //second layer
				if (value2.Name === currentCat2){
					value2.Subcategories.forEach(function(value3, key){ //third layer
						var name = value3.Name;
						var option = "<option>"+name+"</option>";
						c3.append(option);
					})
				}
			});
		}
	});
}

function updateCat42(){
	//get the dropdown object to update
	c4 = $('#category4-drop2');

	//empty whats already there
	c4.empty();

		//put in dummy selection
	c4.append("<option>Select category...</option>");
	//add new catagories
	var currentCat1 = $('#category1-drop2').val();
	var currentCat2 = $('#category2-drop2').val();
	var currentCat3 = $('#category3-drop2').val();

	catagories.Subcategories.forEach(function(value, key){ //first layer
		if (value.Name === currentCat1){
			value.Subcategories.forEach(function(value2, key){ //second layer
				if (value2.Name === currentCat2){
					value2.Subcategories.forEach(function(value3, key){ //third layer
						if (value3.Name === currentCat3){
							
							if(value3.Subcategories !== undefined){//test that we aren't at the end!
								value3.Subcategories.forEach(function(value4, key){ //fourth layer
									var name = value4.Name;
									var catNum = value4.Number;
									// console.log(catNum);
									var option = "<option value="+catNum+">"+name+"</option>";
									c4.append(option);
								});
							}else{
								c4.empty();
								c4.append("<option value="+value3.Number+"></option>");
								//DO SOMETHING HERE SO WE KNOW THAT IT IS THE END
							}
						}
					})
				}
			});
		}
	});
}

function addButtonListener(){
	$('#searchButton').click( function(){
		var loc = $('#location-drop').val();
		var item1 = $('#category4-drop').val();
		var item2 = $('#category4-drop2').val();
		var items = [item1, item2];
		var cal = $('#calander').val();
		var searchObject = {
			"region":loc,
			"categories": items,
			"date":cal
		}
		// console.log(searchObject);
	})
}