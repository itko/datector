// Modify Number object to allow padding
Number.prototype.pad = function(numDigits) {
    var s = String(this);
    while (s.length < (numDigits || 2)) {s = "0" + s;}
    return s;
}

// Event class to store info related to events
var Event = function(day,month,year,hour,minute) {
	this.day = day
	this.month = month
	this.year = year
	this.hour = hour
	this.minute = minute
}

// Public method to convert to a url
Event.prototype.createGoogleCalendarUrl = function() {
	// Start with base url
	var url = 'https://www.google.com/calendar/event?action=TEMPLATE'
	// Add start datetime
	var start = this.year.pad(4) + this.month.pad(2) + this.day.pad(2) + 'T' + this.hour.pad(2) + this.minute.pad(2) + '00Z'
	console.log(start)
	// No length
	dates=start+'/'+start
	url = url + '&' + 'dates=' + dates
	return url
}

// Get the innermost element that contains a given string
function getElementsContainingText(textString) {
	selector = ':contains(' + textString + '):not(:has(:contains(' + textString + ')))'
	elements = $(selector)
	return elements
}

// Takes a jquery object and returns all text inside
// (excluding scripts and styles text)
function get_text(object) {
	// Clone
	objectClone = object.clone();
	// Remove scripts
	var noScripts = objectClone.first().find('script').remove().end();
	var noStyles = noScripts.first().find('style').remove().end();
	var text = noStyles.first().text();
	return text
}

// Replaces a given string in an object with a url
// (with the string as the link text)
function insert_link(object, string, url) {
	// Convert string to a regular expression
	var regex = new RegExp(string,"ig")
	// Create a link element out of the url
	var link = '<a href="' + url + '">' + string + '</a>'
	// Replace string with the link element
	newhtml = object.html().replace(regex,link);
	object.html(newhtml);
}




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
	
	var dateParse = {string: new Array(), index: new Array(), allStrings: new Array(), date: new Array()}
	for (var i = 0; i <= strToLinks.index.length-1; i++){
		
		dateParse.string[i] = strToLinks.string[i]
		dateParse.index[i] = strToLinks.index[i]
		dateParse.allStrings[i] = strToLinks.allStrings[i]
		dateParse.date[i] = new Sugar.Date(strToLinks.allStrings[i])
		
		
		
	}
	//alert(dateParse.date[2])
	return dateParse
}


jQuery(document).ready(function() {
	results = chrono.parse("Hey Paul, can we meet tomorrow from 4pm to 10pm");
	console.log(results[0])
	allElements = jQuery('*');
	text = get_text(allElements);
	var match = parseDatesFromString(text)
	var strToLinks = getStringsToLinks(match)
	var dateParse = keywordsToDate(strToLinks)
	for (var i = 0; i <= dateParse.index.length-1; i++){
		dateElements = getElementsContainingText(dateParse.string[i])
		var day = parseInt(dateParse.date[i].raw == "Invalid Date" ? "Invalid Date" : Sugar.Date.format(dateParse.date[i], '%d'))
		//alert (day)
		var month = parseInt(dateParse.date[i].raw == "Invalid Date" ? "Invalid Date" : Sugar.Date.format(dateParse.date[i], '%m'))
		var year = parseInt(dateParse.date[i].raw == "Invalid Date" ? "Invalid Date" : Sugar.Date.format(dateParse.date[i], '%Y'))
		var hour = parseInt(dateParse.date[i].raw == "Invalid Date" ? "Invalid Date" : Sugar.Date.format(dateParse.date[i], '%H'))
		var minute = parseInt(dateParse.date[i].raw == "Invalid Date" ? "Invalid Date" : Sugar.Date.format(dateParse.date[i], '%M'))
		// Check if there are any elements
		if (dateElements.length) {
			// Get the url
			//dummyEvent = new Event(6,5,2017,20,35);
			dummyEvent = new Event(day, month, year, hour, minute);
			url = dummyEvent.createGoogleCalendarUrl();
			// Insert link in with the given text
			insert_link(dateElements, dateParse.string[i], url)
		}
	}
});












