// ----------------------- styles.js starts here ------------------------------

function insertStyleSheet(href) {
	var styleObject = document.createElement('link');
	styleObject.setAttribute('href', commonStaticRoot + href);
	styleObject.setAttribute('type', 'text/css');
	styleObject.setAttribute('media', 'screen');
	styleObject.setAttribute('rel', 'stylesheet');
	var head = document.getElementsByTagName('head')[0];
	head.appendChild(styleObject);
}
insertStyleSheet('styles/wide/js-on.css');

// ------------------------ styles.js ends here -------------------------------
