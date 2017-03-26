function get_text(jquery_object) {
	// Remove scripts
	var noScripts = jquery_object.first().find('script').remove().end()
	var noStyles = noScripts.find('style').remove().end()
	var text = noStyles.text()
	return text
}



jQuery(document).ready(function() {
	allElements = jQuery('*').clone();
	text = get_text(allElements)
	console.log(text)
});
