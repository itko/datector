/*************************************************************
	Name: Anatoly Makarov
	Date: 
*************************************************************/



function dateMatch(){
	this.value = new Array()
	this.index = new Array()
}

$(document).ready(function(){
    $(":button").click(function(){
		//alert("G")
        var x = $("#inTXT").text();
		//alert(x);
		var match1 = new dateMatch();
		match1 = output(x);
	
		var outString = "";
		for (var i = 0; i < match1.index.length-1; i++){
			outString = outString + "Index: " + match1.index[i] + " Match: " + match1.value[i] + "\n";
		}
        $("#outTXT").text(outString);
    });
});


function output(x){
	var regExList = new Array()
	regExList[0] = /[0-9][0-9][/-][0-9][0-9][/-][0-9][0-9]/g
	regExList[1] = /(monday|tuesday|wednesday|thursday|friday|saturday|sunday)/gi
	regExList[2] = /(today|tomorrow|tonight|afternoon)/gi
	
	
	var mIndex = 0
	var match = new dateMatch()
	for (var i = 0; i < regExList.length-1; i++){
		var tmpString = x
		var tmpMatch = new Array()
		var k = 0
		while(tmpMatch[k] = regExList[i].exec(tmpString)){
		
			match.value[mIndex] = tmpMatch[k][0]
			match.index[mIndex] = tmpMatch[k].index
			
			//console.log(tmpMatch[k])
			mIndex++
			k++
		}
		
		
	}
	return match
	//alert("S")
}