$(document).ready(function() {
	allElements = $('*').clone();
	// Remove scripts
	var noScripts = allElements.first().find('script').remove().end()
	var noStyles = noScripts.find('style').remove().end()
	var text = noStyles.text()
	// Get text
	console.log(text);
});
