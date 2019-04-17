<!--
// -----------------------
// FUNCTION: fShowHideQuicklinksCategory
// DESCRIPTION: A function that shows or hides the quicklinks categories.
// ARGUMENTS: sElementId
// RETURN: True
// -----------------------
function fShowHideQuicklinksCategory(sElementId) {
	var sClassName = document.getElementById(sElementId).className;
	if(sClassName.match('selected')){
		return true;
	} else {
		if(sElementId != sSelectedQuicklink){
			fShowHideElement(sSelectedQuicklink + '-content');
		}
		fShowHideElement(sElementId + '-content');
		sSelectedQuicklink = sElementId;
		fSelectQuicklinksTab(sElementId);
	}
	return true;
}
// -----------------------
// FUNCTION: fClearQuicklinksTab
// DESCRIPTION: A function that simulates a tab off effect for quicklinks categories tabs.
// ARGUMENTS: sElementId
// RETURN: True
// -----------------------
function fClearQuicklinksTab(sElementId){
	if(sSelectedQuicklinkTab != sElementId){
		document.getElementById(sElementId).className = 'lowercase-white-tab';
	}
	return true;
}
// -----------------------
// FUNCTION: fSelectQuicklinksTab
// DESCRIPTION: A function that simulates a tab selected effect for quicklinks categories tabs.
// ARGUMENTS: sElementId
// RETURN: True
// -----------------------
function fSelectQuicklinksTab(sElementId,sType){
	if(sSelectedQuicklinkTab != ''){
		document.getElementById(sSelectedQuicklinkTab).className = 'lowercase-white-tab';
	}
	document.getElementById(sElementId).className = 'lowercase-white-tab-selected';
	// assign selected tab to gloabal variable
	sSelectedQuicklinkTab = sElementId;
	return true;
}
//-->