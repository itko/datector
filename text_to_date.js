/*************************************************************
	Name: Anatoly Makarov
	Date: 
*************************************************************/



$(document).ready(function(){
    $(":button").click(function(){
		//alert("G")
        var x = $("#inTXT").val();
		//alert(x);
		
		var match1 = output(x);
	
		var outString = "";
		for (var i = 0; i <= match1.index.length-1; i++){
			outString = outString + "Index: " + match1.index[i] + " Match: " + match1.value[i] + " RegEx: " + match1.regExType[i] + "\n";
		}
        $("#outTXT").val(outString);
    });
});


function output(x){
	var regExList = new Array()
	regExList[0] = /[0-9][0-9][/-][0-9][0-9][/-][0-9][0-9]/g
	regExList[1] = /(monday|tuesday|wednesday|thursday|friday|saturday|sunday)/gi
	regExList[2] = /(today|tomorrow|tonight|afternoon)/gi
	
	
	var mIndex = 0
	//var match = new dateMatch()
	var match = {value: new Array(), index: new Array(), regExType: new Array()}
	for (var i = 0; i <= regExList.length-1; i++){
		var tmpString = x
		var tmpMatch = new Array()
		var k = 0
		while(tmpMatch[k] = regExList[i].exec(tmpString)){
		
			match.value[mIndex] = tmpMatch[k][0]
			match.index[mIndex] = tmpMatch[k].index
			match.regExType[mIndex] = i
			
			//console.log(tmpMatch[k])
			mIndex++
			k++
		}
		
		
	}
	return match
	//alert("S")
}