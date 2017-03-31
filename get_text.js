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
	insert_link(dateElements, 'April', 'http://google.com')
});
