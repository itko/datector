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
	object.html(object.html().replace(/February/ig,link));
	console.log(object.html());
	// object.html(html);

}

jQuery(document).ready(function() {
	allElements = jQuery('*');
	text = get_text(allElements);
	console.log(text);
	insert_link(allElements.find('body'), 'February', 'http://google.com')
});
