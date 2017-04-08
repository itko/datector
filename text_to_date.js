/*************************************************************
	Name: Anatoly Makarov
	Date: 
*************************************************************/



$(document).ready(function(){
    $(":button").click(function(){
		//alert("G")
        var x = $("#inTXT").val();
		//alert(x);
		
		var match1 = main(x);
	
		var outString = "";
		for (var i = 0; i <= match1.index.length-1; i++){
			//outString = outString + "Index: " + match1.index[i] + " Match: " + match1.value[i] + " RegEx: " + match1.regExType[i] + "\n";
			outString = outString + "Index: " + match1.index[i] + " Match: " + match1.string[i] + " All match: " + match1.allStrings[i] + "\n";
		}
        $("#outTXT").val(outString);
    });
});
function main(x){
	var match = parseDatesFromString(x)
	var strToLinks = getStringsToLinks(match)
	
	return strToLinks
}


//Input: (String) Text which contains dates
//Output: (Array) Date keywords and their index within the string
function parseDatesFromString(x){
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

function getStringsToLinks(match){
	
	var strToLinks = {string: new Array(), index: new Array(), allStrings: new Array()}
	
	for (var i = 0; i <= match.index.length-1; i++){
		strToLinks.string[i] = match.value[i]
		strToLinks.index[i] = match.index[i]
		strToLinks.allStrings[i] = match.value[i] //need to modify in future. Values separated by "|". ex. "saturday|tomorrow|3pm"
	}
	
	
	return strToLinks
	
}

function keywordsToDate(strToLinks){
	
	//look into JodaTime
	for (var i = 0; i <= strToLinks.index.length-1; i++){
		
		
		
		
	}
}














