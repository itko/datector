$(document).ready(function() {
	allElements = $('*').not('script').not('style');
	// Remove scripts
	allElements.find('script').remove().end();
	// Get text
	var text = allElements.text();
	console.log(text);
});
