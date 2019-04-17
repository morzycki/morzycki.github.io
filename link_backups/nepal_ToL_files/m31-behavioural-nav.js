<!--
// -----------------------
// FUNCTION: fGenerateBehaviouralLinks
// DESCRIPTION: A function that generates the mark up for the behavioural category links.
// ARGUMENTS: None
// RETURN: None
// -----------------------
function fGenerateBehaviouralLinks() {
	var sHTML = '';
	for(var i=0;i<aBehaviouralCategories.length;i++){
		sHTML += '<div id="behavioural-' + (i+1) + '" class="tools-06c dark-tab" onmouseover="javascript:fSimulateBehaviouralTab(this.id);" onfocus="javascript:fSimulateBehaviouralTab(this.id);" onmouseout="javascript:fClearBehaviouralTab(this.id);" onblur="javascript:fClearBehaviouralTab(this.id);" onclick="javascript:fShowHideBehaviouralCategory(this.id);fSelectBehaviouralTab(this.id);" onkeypress="javascript:fShowHideBehaviouralCategory(this.id);fSelectBehaviouralTab(this.id);">' + aBehaviouralCategories[i] + '</div>';
	}
	document.getElementById('behavioural-links').innerHTML = sHTML;
}
// -----------------------
// FUNCTION: fShowHideBehaviouralCategory
// DESCRIPTION: A function that shows or hides the behavioural categories.
// ARGUMENTS: sElementId
// RETURN: None
// -----------------------
function fShowHideBehaviouralCategory(sElementId) {
	var sClassName = document.getElementById(sElementId).className;
	if(sClassName.match('selected')){
		return;
	} else {
		if(sElementId != sSelectedBehavioural){
			fShowHideElement(sSelectedBehavioural + '-content');
		}
		fShowHideElement(sElementId + '-content');
		sSelectedBehavioural = sElementId;
		fSelectBehaviouralTab(sElementId);
	}
}
// -----------------------
// FUNCTION: fSimulateBehaviouralTab
// DESCRIPTION: A function that simulates a tab on effect for behavioural categories tabs.
// ARGUMENTS: sElementId
// RETURN: None
// -----------------------
function fSimulateBehaviouralTab(sElementId){
	if(sSelectedBehaviouralTab != sElementId){
		document.getElementById(sElementId).className = 'tools-06c dark-tab-simulated';
	}
}
// -----------------------
// FUNCTION: fClearBehaviouralTab
// DESCRIPTION: A function that simulates a tab off effect for behavioural categories tabs.
// ARGUMENTS: sElementId
// RETURN: None
// -----------------------
function fClearBehaviouralTab(sElementId){
	if(sSelectedBehaviouralTab != sElementId){
		document.getElementById(sElementId).className = 'tools-06c dark-tab';
	}
}
// -----------------------
// FUNCTION: fSelectBehaviouralTab
// DESCRIPTION: A function that simulates a tab selected effect for behavioural categories tabs.
// ARGUMENTS: sElementId
// RETURN: None
// -----------------------
function fSelectBehaviouralTab(sElementId){
	if(sSelectedBehaviouralTab != ''){
		document.getElementById(sSelectedBehaviouralTab).className = 'tools-06c dark-tab';
	}
	document.getElementById(sElementId).className = 'tools-no-color dark-tab-selected';
	// assign selected tab to gloabal variable
	sSelectedBehaviouralTab = sElementId;
}
//-->