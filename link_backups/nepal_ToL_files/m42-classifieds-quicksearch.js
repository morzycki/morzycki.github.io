<!--
// -----------------------
// FUNCTION: fGenerateScaleableClassifiedsMarkup
// DESCRIPTION: A function that generates the mark up for the scaleable classifieds module
// ARGUMENTS: None
// RETURN: sClassifiedsSkyHtml
// -----------------------
function fGenerateScaleableClassifiedsMarkup() {
	sClassifiedsSkyHtml += '		<div class="classifieds-long-sides padding-top-5 padding-left-right-9">';
	sClassifiedsSkyHtml += '			<h3 class="section-heading"><a href="' + sClassifiedsUrl + '" class="link-333 padding-right-10">Classifieds</a><span class="double-chevron-right">&nbsp;</span></h3>';
	sClassifiedsSkyHtml += '		</div>';
	sClassifiedsSkyHtml += '		<div class="classifieds-long-sides">';
	sClassifiedsSkyHtml += '			<div class="padding-top-5"></div>';
	sClassifiedsSkyHtml += '			<div id="classifieds-long-links">';
	sClassifiedsSkyHtml += '			</div>';
	sClassifiedsSkyHtml += '			<div class="clear-simple"></div>';
	sClassifiedsSkyHtml += '			<div class="padding-top-5"></div>';
	sClassifiedsSkyHtml += '		</div>';
	sClassifiedsSkyHtml += '		<div class="classifieds-long-sides padding-left-right-9">';

	// Begin Cars section
	sClassifiedsSkyHtml += '			<div id="classifieds-long-1-content" class="access-text">';
	// 1st one
	sClassifiedsSkyHtml += '			<h3 class="section-heading">Cars of the Week</h3>';
	sClassifiedsSkyHtml += '			<div class="padding-top-5"></div>';
	sClassifiedsSkyHtml += '			<div class="float-left padding-right-7"><a href="' + aCars[0] + '"><img src="' + aCars[1] + '" alt="' + aCars[2] + '" width="70" height="50" border="0" /></a></div>';
	sClassifiedsSkyHtml += '			<div class="classifieds-long float-left">';
	sClassifiedsSkyHtml += '				<a href="' + aCars[0] + '" class="reg-bold">' + aCars[2] + '</a>';
	sClassifiedsSkyHtml += '				<p class="small">';
	sClassifiedsSkyHtml += '					&pound;' + aCars[3] + '<br />';
	sClassifiedsSkyHtml += '					' + aCars[4] + '<br />';
	sClassifiedsSkyHtml += '				</p>';
	sClassifiedsSkyHtml += '			</div>';
	sClassifiedsSkyHtml += '			<div class="clear"></div>';
	sClassifiedsSkyHtml += '			<div class="padding-top-10"></div>';
	// 2nd .. n
	for (var x = 1; x < nCars; x++) {
		var nLinkIndex = (x * 5); // link
		var nImageIndex = (x * 5) + 1; // image
		var nTitleIndex = (x * 5) + 2; // title
		var nPriceIndex = (x * 5) + 3; // price
		var nLocationIndex = (x * 5) + 4; // location

		sClassifiedsSkyHtml += '			<div class="puff-top clear"></div>';
		sClassifiedsSkyHtml += '			<div class="padding-top-10"></div>';
		sClassifiedsSkyHtml += '			<div class="float-left padding-right-7"><a href="' + aCars[nLinkIndex] + '"><img src="' + aCars[nImageIndex] + '" alt="' + aCars[nTitleIndex] + '" width="70" height="50" border="0" /></a></div>';
		sClassifiedsSkyHtml += '			<div class="classifieds-long float-left">';
		sClassifiedsSkyHtml += '				<a href="' + aCars[nLinkIndex] + '" class="reg-bold">' + aCars[nTitleIndex] + '</a>';
		sClassifiedsSkyHtml += '				<p class="small">';
		sClassifiedsSkyHtml += '					&pound;' + aCars[nPriceIndex] + '<br />';
		sClassifiedsSkyHtml += '					' + aCars[nLocationIndex] + '<br />';
		sClassifiedsSkyHtml += '				</p>';
		sClassifiedsSkyHtml += '			</div>';
		sClassifiedsSkyHtml += '			<div class="clear"></div>';
		sClassifiedsSkyHtml += '			<div class="padding-top-10"></div>';
	}
	sClassifiedsSkyHtml += '			<ul class="chevron-list chevron-blue">';
	sClassifiedsSkyHtml += '				<li><a href="' + sCarsSearchOtherLink + '" class="link-666">Search other new and used cars and bikes</a></li>';
	sClassifiedsSkyHtml += '			</ul>';
	sClassifiedsSkyHtml += '			<div class="padding-top-10"></div>';
	sClassifiedsSkyHtml += '			</div>';
	// End Cars section

	// Begin Jobs section
	sClassifiedsSkyHtml += '			<div id="classifieds-long-2-content" class="access-text">';
	// 1st one
	sClassifiedsSkyHtml += '			<h3 class="section-heading">Jobs of the Week</h3>';
	sClassifiedsSkyHtml += '			<div class="padding-top-5"></div>';
	sClassifiedsSkyHtml += '			<div>';
	sClassifiedsSkyHtml += '				<a class="reg-bold" href="' + aJobs[0] + '">' + aJobs[1] + '</a>';
	sClassifiedsSkyHtml += '				<p class="small">';
	sClassifiedsSkyHtml += '					&pound;' + aJobs[2] + '<br />';
	sClassifiedsSkyHtml += '					' + aJobs[3];
	sClassifiedsSkyHtml += '				</p>';
	sClassifiedsSkyHtml += '			</div>';
	sClassifiedsSkyHtml += '			<div class="padding-top-10"></div>';
	// 2nd .. n
	for (var x = 1; x < nCars; x++) {
		var nLinkIndex = (x * 4); // link
		var nTitleIndex = (x * 4) + 1; // title
		var nSalaryIndex = (x * 4) + 2; // price
		var nLocationIndex = (x * 4) + 3; // location

		sClassifiedsSkyHtml += '			<div>';
		sClassifiedsSkyHtml += '				<a class="reg-bold" href="' + aJobs[nLinkIndex] + '">' + aJobs[nTitleIndex] + '</a>';
		sClassifiedsSkyHtml += '				<p class="small">';
		sClassifiedsSkyHtml += '					&pound;' + aJobs[nSalaryIndex] + '<br />';
		sClassifiedsSkyHtml += '					' + aJobs[nLocationIndex];
		sClassifiedsSkyHtml += '				</p>';
		sClassifiedsSkyHtml += '			</div>';
		sClassifiedsSkyHtml += '			<div class="padding-top-10"></div>';
	}
	sClassifiedsSkyHtml += '			<ul class="chevron-list chevron-blue">';
	sClassifiedsSkyHtml += '				<li><a href="' + sJobsSearchOtherLink + '" class="link-666">Search other Jobs</a></li>';
	sClassifiedsSkyHtml += '			</ul>';
	sClassifiedsSkyHtml += '			<div class="padding-top-10"></div>';
	sClassifiedsSkyHtml += '			</div>';
	// End Jobs section

	// Begin Property section
	sClassifiedsSkyHtml += '			<div id="classifieds-long-3-content" class="access-text">';
	// 1st one
	sClassifiedsSkyHtml += '			<h3 class="section-heading">Property of the Week</h3>';
	sClassifiedsSkyHtml += '			<div class="padding-top-5"></div>';
	sClassifiedsSkyHtml += '			<div>';
	sClassifiedsSkyHtml += '				<a class="reg-bold" href="' + aProperty[0] + '">' + aProperty[1] + '</a>';
	sClassifiedsSkyHtml += '				<p class="small">';
	sClassifiedsSkyHtml += '					&pound;' + aProperty[2] + '<br />';
	sClassifiedsSkyHtml += '					' + aProperty[3];
	sClassifiedsSkyHtml += '				</p>';
	sClassifiedsSkyHtml += '			</div>';
	sClassifiedsSkyHtml += '			<div class="padding-top-10"></div>';
	// 2nd .. n
	for (var x = 1; x < nProperty; x++) {
		var nLinkIndex = (x * 4); // link
		var nTitleIndex = (x * 4) + 1; // title
		var nSalaryIndex = (x * 4) + 2; // price
		var nLocationIndex = (x * 4) + 3; // location

		sClassifiedsSkyHtml += '			<div>';
		sClassifiedsSkyHtml += '				<a class="reg-bold" href="' + aProperty[nLinkIndex] + '">' + aProperty[nTitleIndex] + '</a>';
		sClassifiedsSkyHtml += '				<p class="small">';
		sClassifiedsSkyHtml += '					&pound;' + aProperty[nSalaryIndex] + '<br />';
		sClassifiedsSkyHtml += '					' + aProperty[nLocationIndex];
		sClassifiedsSkyHtml += '				</p>';
		sClassifiedsSkyHtml += '			</div>';
		sClassifiedsSkyHtml += '			<div class="padding-top-10"></div>';
	}
	sClassifiedsSkyHtml += '			<ul class="chevron-list chevron-blue">';
	sClassifiedsSkyHtml += '				<li><a href="' + sPropertySearchOtherLink + '" class="link-666">Search for other Property</a></li>';
	sClassifiedsSkyHtml += '			</ul>';
	sClassifiedsSkyHtml += '			<div class="padding-top-10"></div>';
	sClassifiedsSkyHtml += '			</div>';
	sClassifiedsSkyHtml += '			<script>var adRefs = 1;</script>';
	// End Property section

	// Begin Travel section
	sClassifiedsSkyHtml += '			<div id="classifieds-long-4-content" class="access-text">';
	// 1st one
	sClassifiedsSkyHtml += '			<h3 class="section-heading">Holidays of the Week</h3>';
	sClassifiedsSkyHtml += '			<div class="padding-top-5"></div>';
	sClassifiedsSkyHtml += '			<div>';
	sClassifiedsSkyHtml += '				<a class="reg-bold" href="' + aTravel[0] + '">' + aTravel[1] + '</a>';
	sClassifiedsSkyHtml += '				<p class="small">';
	sClassifiedsSkyHtml += '					&pound;' + aTravel[2] + '<br />';
	sClassifiedsSkyHtml += '					' + aTravel[3];
	sClassifiedsSkyHtml += '				</p>';
	sClassifiedsSkyHtml += '			</div>';
	sClassifiedsSkyHtml += '			<div class="padding-top-10"></div>';
	// 2nd .. n
	for (var x = 1; x < nTravel; x++) {
		var nLinkIndex = (x * 4); // link
		var nTitleIndex = (x * 4) + 1; // title
		var nSalaryIndex = (x * 4) + 2; // price
		var nLocationIndex = (x * 4) + 3; // location

		sClassifiedsSkyHtml += '			<div>';
		sClassifiedsSkyHtml += '				<a class="reg-bold" href="' + aTravel[nLinkIndex] + '">' + aTravel[nTitleIndex] + '</a>';
		sClassifiedsSkyHtml += '				<p class="small">';
		sClassifiedsSkyHtml += '					&pound;' + aTravel[nSalaryIndex] + '<br />';
		sClassifiedsSkyHtml += '					' + aTravel[nLocationIndex];
		sClassifiedsSkyHtml += '				</p>';
		sClassifiedsSkyHtml += '			</div>';
		sClassifiedsSkyHtml += '			<div class="padding-top-10"></div>';
	}
	sClassifiedsSkyHtml += '			<ul class="chevron-list chevron-blue">';
	sClassifiedsSkyHtml += '				<li><a href="' + sTravelSearchOtherLink + '" class="link-666">Search for other Holidays</a></li>';
	sClassifiedsSkyHtml += '			</ul>';
	sClassifiedsSkyHtml += '			<div class="padding-top-10"></div>';

	sClassifiedsSkyHtml += '			</div>';
	// End Travel section

	// Start of classifieds long footer
	sClassifiedsSkyHtml += '			<div class="puff-top clear"></div>';
	sClassifiedsSkyHtml += '			<div class="padding-top-10"></div>';
	sClassifiedsSkyHtml += '			<a href="' + sPlaceYouAdUrl + '" class="reg-bold">Place your free <br /> advert now</a>';
	sClassifiedsSkyHtml += '			<div class="padding-top-10"></div>';
	sClassifiedsSkyHtml += '			<div id="dynamic-ad-reference" class=" ">';
	sClassifiedsSkyHtml += '			<div class="puff-top clear"></div>';
	sClassifiedsSkyHtml += '			<div class="padding-top-10"></div>';
	sClassifiedsSkyHtml += '			<form id="ad-search-tall" onsubmit="return fValidateNoneRequired(this.id);" method="post" action="' + sSearchAdRefUrl + '">';
	sClassifiedsSkyHtml += '				<p class="small"><label for="ad_reference">Search Ad Reference:</label></p>';
	sClassifiedsSkyHtml += '				<div class="float-left padding-top-5 padding-right-7">';
	sClassifiedsSkyHtml += '					<input id="ad_reference" name="ad_reference" type="text" size="8" class="width-input-72" value="" />';
	sClassifiedsSkyHtml += '				</div>';
	sClassifiedsSkyHtml += '				<div class="float-right padding-top-6">';
	sClassifiedsSkyHtml += '					<input type="image" src="img/global/button/button-search.gif" />';
	sClassifiedsSkyHtml += '				</div>';
	sClassifiedsSkyHtml += '			</form>';
	sClassifiedsSkyHtml += '			</div>';
	sClassifiedsSkyHtml += '			<div class="clear"></div>';
	sClassifiedsSkyHtml += '			<div class="padding-top-10"></div>';
	sClassifiedsSkyHtml += '		</div>';
	sClassifiedsSkyHtml += '		<div class="clear-simple"></div>';
	sClassifiedsSkyHtml += '		<div class="classifieds-long-bottom"><div class="padding-top-5"></div></div>';

	return sClassifiedsSkyHtml;
}
// -----------------------
// FUNCTION: fGenerateClassifiedsLinks
// DESCRIPTION: A function that generates the mark up for the classifieds category links.
// ARGUMENTS: None
// RETURN: None
// -----------------------
function fGenerateClassifiedsLinks() {
	var sHTML = '';
	for(var i=0;i<aClassifiedsCategories.length;i++){
		sHTML += '<div id="classifieds-' + (i+1) + '" class="tools-no-color light-tab" onmouseover="javascript:fSimulateClassifiedsTab(this.id,\'default\');" onfocus="javascript:fSimulateClassifiedsTab(this.id,\'default\');" onmouseout="javascript:fClearClassifiedsTab(this.id,\'default\');" onblur="javascript:fClearClassifiedsTab(this.id,\'default\');" onclick="javascript:fShowHideClassifiedsCategory(this.id,\'default\');fSelectClassifiedsTab(this.id,\'default\');" onkeypress="javascript:fShowHideClassifiedsCategory(this.id,\'default\');fSelectClassifiedsTab(this.id,\'default\');">' + aClassifiedsCategories[i] + '</div>';
	}
	document.getElementById('classifieds-links').innerHTML = sHTML;
}
// -----------------------
// FUNCTION: fShowHideClassifiedsCategory
// DESCRIPTION: A function that shows or hides the classifieds categories.
// ARGUMENTS: sElementId
// RETURN: None
// -----------------------
function fShowHideClassifiedsCategory(sElementId) {
	var sClassName = document.getElementById(sElementId).className;
	if(sClassName.match('selected')){
		return;
	} else {
		if(sElementId != sSelectedClassifieds){
			fShowHideElement(sSelectedClassifieds + '-content');
				if(sElementId == 'classifieds-1') {
					fShowHideElement('dynamic-ad-reference');
		} else {
			document.getElementById('dynamic-ad-reference').className = 'access-text';
			}
		}
		fShowHideElement(sElementId + '-content');
		sSelectedClassifieds = sElementId;
		fSelectClassifiedsTab(sElementId,'default');
	}
}
// -----------------------
// FUNCTION: fGenerateClassifiedsLongLinks
// DESCRIPTION: A function that generates the mark up for the classifieds long category links.
// ARGUMENTS: None
// RETURN: None
// -----------------------
function fGenerateClassifiedsLongLinks() {
	var sHTML = '';
	for(var i=0;i<aClassifiedsLongCategories.length;i++){
		sHTML += '<div id="classifieds-long-' + (i+1) + '" class="tools-no-color white-tab" onmouseover="javascript:fSimulateClassifiedsTab(this.id,\'long\');" onfocus="javascript:fSimulateClassifiedsTab(this.id,\'long\');" onmouseout="javascript:fClearClassifiedsTab(this.id,\'long\');" onblur="javascript:fClearClassifiedsTab(this.id,\'long\');" onclick="javascript:fShowHideClassifiedsLongCategory(this.id);fSelectClassifiedsTab(this.id,\'long\');" onkeypress="javascript:fShowHideClassifiedsLongCategory(this.id);fSelectClassifiedsTab(this.id,\'long\');">' + aClassifiedsLongCategories[i] + '</div>';
	}
	document.getElementById('classifieds-long-links').innerHTML = sHTML;
}
// -----------------------
// FUNCTION: fShowHideClassifiedsLongCategory
// DESCRIPTION: A function that shows or hides the classifieds long categories - showing ad reference form only for Cars.
// ARGUMENTS: sElementId
// RETURN: None
// -----------------------
function fShowHideClassifiedsLongCategory(sElementId) {
	var sClassName = document.getElementById(sElementId).className;
	if(sClassName.match('selected')){
		return;
	} else {
		if(sElementId != sSelectedClassifiedsLong){
			fShowHideElement(sSelectedClassifiedsLong + '-content');
				if(sElementId == 'classifieds-long-1') {
					fShowHideElement('dynamic-ad-reference');
			} else {
				document.getElementById('dynamic-ad-reference').className = 'access-text';
			}
		}
		fShowHideElement(sElementId + '-content');
		sSelectedClassifiedsLong = sElementId;
		fSelectClassifiedsTab(sElementId,'long');
	}
}
// -----------------------
// FUNCTION: fSimulateClassifiedsTab
// DESCRIPTION: A function that simulates a tab on effect for classifieds and classifieds long categories tabs.
// ARGUMENTS: sElementId
// RETURN: None
// -----------------------
function fSimulateClassifiedsTab(sElementId,sType){
	switch(sType){
		case 'default':
			if(sSelectedClassifiedsTab != sElementId){
				document.getElementById(sElementId).className = 'tools-no-color light-tab-simulated';
			}
		break;
		case 'long':
			if(sSelectedClassifiedsLongTab != sElementId){
				document.getElementById(sElementId).className = 'tools-no-color white-tab-simulated';
			}
		break;
		default:
	}
}
// -----------------------
// FUNCTION: fClearClassifiedsTab
// DESCRIPTION: A function that simulates a tab off effect for classifieds and classifieds long categories tabs.
// ARGUMENTS: sElementId
// RETURN: None
// -----------------------
function fClearClassifiedsTab(sElementId,sType){
	switch(sType){
		case 'default':
			if(sSelectedClassifiedsTab != sElementId){
				document.getElementById(sElementId).className = 'tools-no-color light-tab';
			}
		break;
		case 'long':
			if(sSelectedClassifiedsLongTab != sElementId){
				document.getElementById(sElementId).className = 'tools-no-color white-tab';
			}
		break;
		default:
	}
}
// -----------------------
// FUNCTION: fSelectClassifiedsTab
// DESCRIPTION: A function that simulates a tab selected effect for classifieds and classifieds long categories tabs.
// ARGUMENTS: sElementId
// RETURN: None
// -----------------------
function fSelectClassifiedsTab(sElementId,sType){
	switch(sType){
		case 'default':
			if(sSelectedClassifiedsTab != ''){
				document.getElementById(sSelectedClassifiedsTab).className = 'tools-no-color light-tab';
			}
			document.getElementById(sElementId).className = 'tools-no-color light-tab-selected';
			// assign selected tab to global variable
			sSelectedClassifiedsTab = sElementId;
		break;
		case 'long':
			if(sSelectedClassifiedsLongTab != ''){
				document.getElementById(sSelectedClassifiedsLongTab).className = 'tools-no-color white-tab';
			}
			document.getElementById(sElementId).className = 'tools-no-color white-tab-selected';
			// assign selected tab to global variable
			sSelectedClassifiedsLongTab = sElementId;
		break;
		default:
	}
}
//-->