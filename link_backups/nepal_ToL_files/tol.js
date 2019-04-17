<!--
/* Execute the function fWindowOnLoad on load. */
window.onload = fWindowOnLoad;

// -----------------------
// FUNCTION: fWindowOnLoad
// DESCRIPTION: A function that gets execute on load.
// ARGUMENTS: None
// RETURN: None
// -----------------------
function fWindowOnLoad() {
}
// -----------------------
// FUNCTION: fPopUp
// DESCRIPTION: A function that opens a pop up window.
// ARGUMENTS: Width, Height and URL
// RETURN: True
// -----------------------
function fPopUp(nWidth,nHeight,sUrl) {
	var nScrWidth = nWidth;
	var nScrHeight = nHeight;
	// Tip: This makes the window top right.
	// Tip: 11 pixels is for the vertical scrollbar on the right hand side of the window
	//var nXPos = (screen.availWidth - nScrWidth - 11);
	var nYPos = 0;
	var nXPos = 0;
	var sOptions = 'resizable=0,toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=1,top=' + nYPos + ',left=' + nXPos +',width=' + nScrWidth + ',height=' + nScrHeight;
	oNewWindow = window.open(sUrl,'popupWindow',sOptions);
	oNewWindow.focus();
	return true;
}
// -----------------------
// FUNCTION: fDetect
// DESCRIPTION: A function that detects which OS and browser the user has.
// ARGUMENTS: None
// RETURN: None
// -----------------------
function fDetect() {
	var sAgent = navigator.userAgent.toLowerCase();
	// Detect platform
	this.isMac = (sAgent.indexOf('mac') != -1);
	this.isWin = (sAgent.indexOf('win') != -1);
	this.isWin2k = (this.isWin && (sAgent.indexOf('nt 5') != -1));
	this.isWinSP2 = (this.isWin && (sAgent.indexOf('xp') != -1 || sAgent.indexOf('sv1') != -1));
	this.isUnix = (
			sAgent.indexOf('unix') != -1 || 
			sAgent.indexOf('sunos') != -1 || 
			sAgent.indexOf('bsd') != -1 ||
			sAgent.indexOf('x11') != -1 || 
			sAgent.indexOf('linux') != -1);	
	// Detect browser
	this.isSafari = (sAgent.indexOf('safari') != -1);
	this.isSafari2 = (this.isSafari && (parseFloat(sAgent.substring(sAgent.indexOf("applewebkit/")+"applewebkit/".length,sAgent.length).substring(0,sAgent.substring(sAgent.indexOf("applewebkit/")+"applewebkit/".length,sAgent.length).indexOf(' '))) >=  300));
	this.isOpera = (sAgent.indexOf('opera') != -1);
	this.isNN = (sAgent.indexOf('netscape') != -1);
	this.isIE = (sAgent.indexOf('msie') != -1);
}
// -----------------------
// FUNCTION: fShowHideElement
// DESCRIPTION: A function shows or hides an element.
// ARGUMENTS: sElemendId
// RETURN: None
// -----------------------
function fShowHideElement(sElemendId) {
	var eElement = document.getElementById(sElemendId);
	var sClassName = eElement.className;
	if (sClassName.match(' access-text') || sClassName.match('access-text')) {
		// Shows element
		eElement.className = eElement.className.replace(/access-text/, '');
	} else {
		// Hides element
		eElement.className = sClassName + ' access-text';
	}
}
// -----------------------
// FUNCTION: fCountCharacters
// DESCRIPTION: A function that compares the total allowed characters to the users input and returns the remainder.
// ARGUMENTS: sValue, sId
// RETURN: None
// -----------------------
function fCountCharacters(sValue,sId) {
	var nRemaining = nTotalCharacters - sValue.length;
	if(nRemaining < 0){
		document.getElementById(sId).value = sValue.slice(0,nTotalCharacters);
	} else {
		document.getElementById(sId + '-characters-left').innerHTML = nRemaining + ' characters left';
	}
}
// -----------------------
// FUNCTION: fReturnFriendlyName
// DESCRIPTION: A function that generates a friendly formatted name from an unformatted element id
// ARGUMENTS: sUnfriendlyName
// RETURN: sFriendlyName
// -----------------------
function fReturnFriendlyName(sUnfriendlyName){
	var sTempChar = sUnfriendlyName.charAt(0);
	var sFriendlyName = sUnfriendlyName.slice(1);
	sFriendlyName = sTempChar.toUpperCase() + sFriendlyName;
	var nTempChar = 0;
	for(j=1;j!=0;j++){
		nTempChar = sFriendlyName.indexOf('_');
		if(nTempChar != '-1'){
			sTempChar = sFriendlyName.charAt(nTempChar+1);
			sFriendlyName = sFriendlyName.replace('_' + sTempChar,' ' + sTempChar.toUpperCase());
		} else {
			j=-1;
		}
	}
	// Forward slash "/" detection
	if(sFriendlyName.indexOf('Fs') != '-1'){
		sFriendlyName = sFriendlyName.replace('Fs','/');
	} 
	return sFriendlyName;
}
// -----------------------
// FUNCTION: fClearOnClick
// DESCRIPTION: empties a form element of it's predefined text
// ARGUMENTS: oThis = The form field, sDefaultText - The text hardcoded tp the text field
// RETURN: None
// EXAMPLE:	onclick="fClearOnClick(this,'Keyword')"
// -----------------------
function fClearOnClick(oThis,sDefaultText) {
	if(oThis.value.toLowerCase() == sDefaultText.toLowerCase()) {
		oThis.value = "";
	}
}
// -----------------------
// FUNCTION: fOutputJsLink
// DESCRIPTION: A function that generates an action link such as Print and Close Window
// ARGUMENTS: sActionType
// RETURN: None
// -----------------------
function fOutputJsLink(sActionType, sImgUrl) {
	var sHTML = '';
	sHTML += '	<ul>';
	switch(sActionType){
		case 'close':
			sHTML += '		<li class="icon-on-left"><a class="link-666-no-underline" href="#" onclick="window.close(); return false;" onkeypress="window.close(); return false;"><img src="' +sImgUrl+ '" width="14" height="14" border="0" alt="Close Window" /><span>Close Window</span></a></li>';
		break;
		case 'print':
			sHTML += '		<li class="print-page"><a class="link-666" href="#" onclick="window.print(); return false;" onkeypress="window.print(); return false;">Print this page</a></li>';
		break;
		default:
	}
	sHTML += '	</ul>';
	document.write(sHTML);
}
// ----------------------
// FUNCTION: fGoURL
// DESCRIPTION: A function that redirects the browser to the received url
// ARGUMENTS: sUrl
// RETURN: None
// ----------------------
function fGoURL(sUrl) {
	window.location=sUrl;
}

//-->