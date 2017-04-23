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
 * Event class. Takes a string and parses it into the day month, etc. An index
 * is given for cases where there is more than one date. For now it doesn't
 * support end dates, but that can easily be done. If the input string cannot be
 * parsed into a date, today's date is used.
 */
var Event = function(string, index) {
	// Use the datetime that's right now (in case the string doesn't contain a
	// date)
	var now = new Date();
	this.fullDate = now;
	this.day = now.getDate();
	this.month = now.getMonth() + 1; // month starts at 0. ex. April = 3
	this.year = now.getFullYear();
	this.hour = now.getHours();
	this.minute = now.getMinutes();
	// Now parse the string (get the desired date if there are multiple)
	chrono.parse("02/29/17")
	var parsed = chrono.parse(string)[index]
	// Check if a date was found in the string
	if (parsed) {
		// Check if there's a start date
		if (parsed.start) {
			// Use the parsed values
			var start = parsed.start.date()
			this.fullDate = new Date (start);
			
			this.day = start.getDate();
			this.month = start.getMonth() + 1; // month starts at 0. ex. April
												// = 3
			this.year = start.getFullYear();
			this.hour = start.getHours();
			this.minute = start.getMinutes();


		}
		// TODO add something for this
		if (parsed.end) {
			var end = parsed.end.date()
		}
	}
	this.text = parsed.text;
}

/*
 * Public method. Returns a url that adds the event info to google calendar
 */
Event.prototype.createGoogleCalendarUrl = function() {
	
	var d = this.fullDate
	var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
	var utcDate = new Date(utc)
	// Start with base url
	var url = 'https://www.google.com/calendar/event?action=TEMPLATE'
	// Add start datetime
	
	var day = utcDate.getDate();
	var month = utcDate.getMonth() + 1; // month starts at 0. ex. April = 3
	var year = utcDate.getFullYear();
	var hour = utcDate.getHours();
	var minute = utcDate.getMinutes();
	
	var start = year.pad(4) + month.pad(2) + day.pad(2) + 'T'
			+ hour.pad(2) + minute.pad(2) + '00Z'
	// TODO No end for now
	dates = start + '/' + start
	url = url + '&' + 'dates=' + dates
	return url
}

function getEventsFromString(string) {
	var events = [];
	results = chrono.parse(string);
	for (i = 0; i < results.length; i++) {
		events.push(new Event(string, i));
	}
	return events
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

function getMatches(x) {
	var regExList = new Array()
	regExList[0] = /[0-9][0-9][/-][0-9][0-9][/-][0-9][0-9]/g
	regExList[1] = /(monday|tuesday|wednesday|thursday|friday|saturday|sunday)/gi
	regExList[2] = /(today|tomorrow|tonight|afternoon)/gi

	var mIndex = 0
	// var match = new dateMatch()
	var match = new Array()
	for (var i = 0; i <= regExList.length - 1; i++) {
		var tmpString = x
		var tmpMatch = new Array()
		var k = 0
		while (tmpMatch[k] = regExList[i].exec(tmpString)) {

			match[mIndex] = tmpMatch[k][0]

			// console.log(tmpMatch[k])
			mIndex++
			k++
		}

	}

	// remove duplicates from match
	var uniqueMatches = [];
	$.each(match, function(i, el) {
		if ($.inArray(el, uniqueMatches) === -1)
			uniqueMatches.push(el);
	});

	return uniqueMatches
}

jQuery(document).ready(function() {
	allElements = jQuery('*');
	text = get_text(allElements);
	// get all unique "keywords" on the page
	var match = getMatches(text)

	// loop through all unique keywords
	for (var i = 0; i < match.length; i++) {
		// Get all elements that contain the unique keyword
		dateElements = getElementsContainingText(match[i])

		// creating an array only to determine the number of elements for the
		// next loop
		var dateElementArray = jQuery.makeArray(dateElements)
		// loop through all found elements
		for (var j = 0; j < dateElementArray.length; j++) {

			// get text of each element
			var elemText = get_text(dateElements.eq(j))
			// Create events from the text
			events = getEventsFromString(elemText);
			for (k = 0; k < events.length; k++) {
				// Get the google url
				url = events[k].createGoogleCalendarUrl();
				// Insert link into the keyword
				insert_link(dateElements.eq(j), events[k].text, url)
			}

		}

	}
});
