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
	searchString = '/'+string+'/ig'
	alert(searchString)
	alert(url)
	var html = object.html().replace(searchString,url);
	console.log(html);
	// object.html(html);

}

jQuery(document).ready(function() {
	allElements = jQuery('*');
	text = get_text(allElements);
	console.log(text);
	insert_link(allElements.find('body'), 'February', 'Google')
});
