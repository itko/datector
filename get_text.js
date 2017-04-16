/*
 * Modify Number object to allow adding leading zeros to numbers. Returns a string!
 */
Number.prototype.pad = function(numDigits) {
	var s = String(this);
	while (s.length < (numDigits || 2)) {
		s = "0" + s;
	}
	return s;
}

/*
 * Event class. Takes a string and parses it into the day month, etc. For now it
 * doesn't support end dates, but that can easily be done. If the input string
 * cannot be parsed into a date, today's date is used.
 */
var Event = function(string) {
	// Use the datetime that's right now (in case the string doesn't contain a
	// date)
	var now = new Date();
	this.day = now.getDate();
	this.month = now.getMonth();
	this.year = now.getFullYear();
	this.hour = now.getHours();
	this.minute = now.getMinutes();
	// Now parse the string
	var parsed = chrono.parse(string)[0]
	// Check if a date was found in the string
	if (parsed) {
		// Check if there's a start date
		if (parsed.start) {
			// Use the parsed values
			var start = parsed.start.date()
			this.day = start.getDate();
			this.month = start.getMonth();
			this.year = start.getFullYear();
			this.hour = start.getHours();
			this.minute = start.getMinutes();
		}
		// TODO add something for this
		if (parsed.end) {
			var end = parsed.end.date()
		}
	}
}

/*
 * Public method. Returns a url that adds the event info to google calendar
 */
Event.prototype.createGoogleCalendarUrl = function() {
	// Start with base url
	var url = 'https://www.google.com/calendar/event?action=TEMPLATE'
	// Add start datetime
	var start = this.year.pad(4) + this.month.pad(2) + this.day.pad(2) + 'T'
			+ this.hour.pad(2) + this.minute.pad(2) + '00Z'
	// TODO No end for now
	dates = start + '/' + start
	url = url + '&' + 'dates=' + dates
	return url
}

/*
 * Get the innermost element that contains a given string. Takes in a string and
 * returns an array of jquery elements that contain it. TODO if the outer
 * element also contains the string, it is disregarded. This needs to be fixed.
 */
function getElementsContainingText(textString) {
	selector = ':contains(' + textString + '):not(:has(:contains(' + textString
			+ ')))'
	elements = $(selector)
	return elements
}

/*
 * Takes a jquery object and returns all text inside. This is better than using
 * the text() featur eof jQuery because it removes repeated text and
 * script/styles text
 */
function get_text(object) {
	// Clone
	objectClone = object.clone();
	// Remove scripts
	var noScripts = objectClone.first().find('script').remove().end();
	var noStyles = noScripts.first().find('style').remove().end();
	var text = noStyles.first().text();
	return text
}

/*
 * Takes a jquery object, string, and url and replaces thhe string in the text
 * of that object with a link to the url (with the string as the link text)
 */
function insert_link(object, string, url) {
	// Convert string to a regular expression
	var regex = new RegExp(string, "ig")
	// Create a link element out of the url
	var link = '<a href="' + url + '">' + string + '</a>'
	// Replace string with the link element
	newhtml = object.html().replace(regex, link);
	object.html(newhtml);
}

function parseDatesFromString(x) {
	var regExList = new Array()
	regExList[0] = /[0-9][0-9][/-][0-9][0-9][/-][0-9][0-9]/g
	regExList[1] = /(monday|tuesday|wednesday|thursday|friday|saturday|sunday)/gi
	regExList[2] = /(today|tomorrow|tonight|afternoon)/gi

	var mIndex = 0
	// var match = new dateMatch()
	var match = {
		value : new Array(),
		index : new Array(),
		regExType : new Array()
	}
	for (var i = 0; i <= regExList.length - 1; i++) {
		var tmpString = x
		var tmpMatch = new Array()
		var k = 0
		while (tmpMatch[k] = regExList[i].exec(tmpString)) {

			match.value[mIndex] = tmpMatch[k][0]
			match.index[mIndex] = tmpMatch[k].index
			match.regExType[mIndex] = i

			// console.log(tmpMatch[k])
			mIndex++
			k++
		}

	}
	return match
	// alert("S")
}

function getStringsToLinks(match) {

	var strToLinks = {
		string : new Array(),
		index : new Array(),
		allStrings : new Array()
	}

	for (var i = 0; i <= match.index.length - 1; i++) {
		strToLinks.string[i] = match.value[i]
		strToLinks.index[i] = match.index[i]
		strToLinks.allStrings[i] = match.value[i] // need to modify in future.
		// Values separated by "|".
		// ex.
		// "saturday|tomorrow|3pm"
	}

	return strToLinks

}

function keywordsToDate(strToLinks) {

	// look into JodaTime

	var dateParse = {
		string : new Array(),
		index : new Array(),
		allStrings : new Array(),
		date : new Array()
	}
	for (var i = 0; i <= strToLinks.index.length - 1; i++) {

		dateParse.string[i] = strToLinks.string[i]
		dateParse.index[i] = strToLinks.index[i]
		dateParse.allStrings[i] = strToLinks.allStrings[i]
		dateParse.date[i] = new Sugar.Date(strToLinks.allStrings[i])

	}
	// alert(dateParse.date[2])
	return dateParse
}

jQuery(document).ready(function() {
	allElements = jQuery('*');
	text = get_text(allElements);
	var match = parseDatesFromString(text)
	var strToLinks = getStringsToLinks(match)
	var dateParse = keywordsToDate(strToLinks)
	for (var i = 0; i < dateParse.index.length; i++) {
		// Get all elements that contain the string
		dateElements = getElementsContainingText(dateParse.string[i])
		// Check if there are any elements
		if (dateElements.length) {
			// Create an event with the given string
			event = new Event(dateParse.string[i]);
			// Get the google url
			url = event.createGoogleCalendarUrl();
			// Insert link
			insert_link(dateElements, dateParse.string[i], url)
		}
	}
});
