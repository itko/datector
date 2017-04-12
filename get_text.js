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

jQuery(document).ready(function() {
	allElements = jQuery('*');
	text = get_text(allElements);
	dateElements = getElementsContainingText('April')
	// Check if there are any elements
	if (dateElements.length) {
		// Get the url
		dummyEvent = new Event(6,5,2017,20,35);
		url = dummyEvent.createGoogleCalendarUrl();
		// Insert link in with the given text
		insert_link(dateElements, 'April', url)
	}
});
