<!--
// -----------------------
// FUNCTION: fFrmValidation
// DESCRIPTION: A function that loops through the specified form and checks each element and if required validates each element
// ARGUMENTS: sTargetForm, aFormValidation
// RETURN: True or False
// NOTES: In order for the validation to work correctly each form elements label should have an id the same as the element but preffix
// it with 'label_'. In addition each form should contain an error pane with the forms id and a suffix 'error-message'. Finally each form
// should have an array of elements which are required fields. This array and the form id get passed to the function when it is called.
// -----------------------
function fFrmValidation(sTargetForm,aFormValidation){
	var eForm = document.forms[sTargetForm];
	var nError = 0;
	var nInitialisePassCheck = 0; //initialise Password check so that we can track the number of passes of each password type
	var sErrorHTML = '<p><strong>The following errors have been found. Please address them and try again.</strong></p><p><strong>';
	for(i=0;i<aFormValidation.length;i++){
		eval('eForm.elements[\'' + aFormValidation[i] + '\'].required = true');
	}
	for(i=0;i<eForm.elements.length;i++){
		if(eForm.elements[i].required){
			//alert(eForm.elements[i].type);
			switch(eForm.elements[i].type){
				case 'text':
					var nErrorText = '';
					if(eForm.elements[i].value == ''){
						nErrorText++;
						sErrorHTML += '<label for="' + eForm.elements[i].id + '">' + fReturnFriendlyName(eForm.elements[i].id) + '</label> : can not be empty.<br />';
					} else if(eForm.elements[i].id == 'email') {
						if(!fValidateEmail(eForm.elements[i].value)){
							nErrorText++;
							sErrorHTML += '<label for="' + eForm.elements[i].id + '">' + fReturnFriendlyName(eForm.elements[i].id) + '</label> : is an invalid address.<br />';
						}
					}
					if(nErrorText > 0){
						nError++;
						document.getElementById('label_' + eForm.elements[i].id).className = 'color-bd0000';
						document.getElementById('label_' + eForm.elements[i].id).style.fontWeight = 'bold';
						
					} else {
						document.getElementById('label_' + eForm.elements[i].id).className = '';
						document.getElementById('label_' + eForm.elements[i].id).style.fontWeight = 'normal';
					}
				break;
				case 'textarea':
					if(eForm.elements[i].value == ''){
						nError++;
						sErrorHTML += '<label for="' + eForm.elements[i].id + '">The ' + fReturnFriendlyName(eForm.elements[i].id) + '</label> can not be empty.<br />';
						document.getElementById('label_' + eForm.elements[i].id).className = 'color-bd0000';
						document.getElementById('label_' + eForm.elements[i].id).style.fontWeight = 'bold';
					} else {
						document.getElementById('label_' + eForm.elements[i].id).className = '';
						document.getElementById('label_' + eForm.elements[i].id).style.fontWeight = 'normal';
					}
				break;
				//Password validation added by Edd Bignell 13-11-06
				case 'password':
					if(eForm.elements[i].value == ''){
						nError++;
						sErrorHTML += '<label for="' + eForm.elements[i].id + '">' + fReturnFriendlyName(eForm.elements[i].id) + '</label>: can not be empty.<br />';
						document.getElementById('label_' + eForm.elements[i].id).className = 'color-bd0000';
						document.getElementById('label_' + eForm.elements[i].id).style.fontWeight = 'bold';
					} else {
						document.getElementById('label_' + eForm.elements[i].id).className = '';
						document.getElementById('label_' + eForm.elements[i].id).style.fontWeight = 'normal';
					}
					//check password length - must be 6 characters or over
					if(parseFloat(eForm.elements[i].value.length) <= 5){
						nError++;
						sErrorHTML += '<label for="' + eForm.elements[i].id + '">' + fReturnFriendlyName(eForm.elements[i].id) + '</label>: must be at least 6 characters long.<br />';
						document.getElementById('label_' + eForm.elements[i].id).className = 'color-bd0000';
						document.getElementById('label_' + eForm.elements[i].id).style.fontWeight = 'bold';
						}
					
					if (document.getElementById('confirm_password')) {//if confirm_password exists...
						//check password and confirm_password are the same
						var sPassword = document.getElementById('password').value;
						var sConfirmPassword = document.getElementById('confirm_password').value;
						if(!fPasswordCheck(sPassword, sConfirmPassword)){
								nError++;
								document.getElementById('label_' + eForm.elements[i].id).className = 'color-bd0000';
								document.getElementById('label_' + eForm.elements[i].id).style.fontWeight = 'bold';
								if(!nInitialisePassCheck){ //Only do this once to avoid duplicating the message
									sErrorHTML += 'Password and Confirm Password must be the same.<br />';
									nInitialisePassCheck++;
								}
							}
						}	
				break;
				case 'select-one':
					if(eForm.elements[i].selectedIndex == 0){
						nError++;
						sErrorHTML += '<label for="' + eForm.elements[i].id + '">You must select an option for ' + fReturnFriendlyName(eForm.elements[i].id) + '.</label><br />';
						document.getElementById('label_' + eForm.elements[i].id).className = 'color-bd0000';
						document.getElementById('label_' + eForm.elements[i].id).style.fontWeight = 'bold';
						fDobCheck(eForm.elements[i].id, 1);
					} else {
						document.getElementById('label_' + eForm.elements[i].id).className = '';
						document.getElementById('label_' + eForm.elements[i].id).style.fontWeight = 'normal';
						fDobCheck(eForm.elements[i].id, 0);
					}
				break;
				case 'checkbox':
					if(!eForm.elements[i].checked){
						nError++;
						sErrorHTML += '<label for="' + eForm.elements[i].id + '">You must check the ' + fReturnFriendlyName(eForm.elements[i].id) + ' checkbox to continue.</label><br />';
						document.getElementById('label_' + eForm.elements[i].id).className = 'color-bd0000';
						document.getElementById('label_' + eForm.elements[i].id).style.fontWeight = 'bold';
					} else {
						document.getElementById('label_' + eForm.elements[i].id).className = '';
						document.getElementById('label_' + eForm.elements[i].id).style.fontWeight = 'normal';
					}
				break;
				case 'select-multiple':
					if(eForm.elements[i].selectedIndex == -1){ //changed from ==0 to ==-1 - 0 is he first option -1 is returneed if nothing is selected
						nError++;
						sErrorHTML += '<label for="' + eForm.elements[i].id + '">You must select at least one option for ' + fReturnFriendlyName(eForm.elements[i].id) + '.</label><br />';
						document.getElementById('label_' + eForm.elements[i].id).className = 'color-bd0000';
						document.getElementById('label_' + eForm.elements[i].id).style.fontWeight = 'bold';
					} else {
						document.getElementById('label_' + eForm.elements[i].id).className = '';
						document.getElementById('label_' + eForm.elements[i].id).style.fontWeight = 'normal';
					}
				break;
				case 'radio':
					// A radio selection should always start with an option checked so should not require validation
				break;
				default:
			}
		}
	}
	if(nError != 0){
		sErrorHTML += '</strong></p>';
		var eError = document.getElementById(sTargetForm + '-error-container');
		eError.innerHTML = sErrorHTML;
		window.scrollTo(0,eError.offsetTop);
		return false;
	} else {
		return true;
	}
}
// -----------------------
// FUNCTION: fValidateEmail
// DESCRIPTION: A function that checks an email address to make sure it is valid
// ARGUMENTS: sEmail
// RETURN: True or False
// -----------------------
function fValidateEmail(sEmail){
	if(sEmail.indexOf("@",1)==-1){
		return false;
	} else if(sEmail.indexOf(".",sEmail.indexOf("@",1))==-1){
		return false;
	} else {
		return true;
	}
}
// -----------------------
// FUNCTION: fRadioGroupValidation
// DESCRIPTION: A function that loops through the specified form and checks that at least one radio button is checked
// ARGUMENTS: sTargetForm
// RETURN: True or False
// NOTES: This is used when the form only contains radio buttons and must have one checked before submitting
// -----------------------
function fRadioGroupValidation(sTargetForm){
	var eForm = document.forms[sTargetForm];
	var nCount = 0;
	for(i=0;i<eForm.elements.length;i++){
		if(eForm.elements[i].checked){
			nCount++;
		}
	}
	if(nCount != 0){
		return true;
	} else {
		return false;
	}
}
// -----------------------
// FUNCTION: fValidateNoneRequired
// DESCRIPTION: A function that checks to make sure that at least one non-required element has a value
// ARGUMENTS: sTargetForm
// RETURN: True or False
// -----------------------
function fValidateNoneRequired(sTargetForm){
	var eForm = document.forms[sTargetForm];
	var nCount = 0;
	for(i=0;i<eForm.elements.length;i++){
		switch(eForm.elements[i].type){
			case 'text':
				if(eForm.elements[i].value != ''){
					nCount++;
				}
			break;
			case 'select-one':
				if(eForm.elements[i].selectedIndex != 0){
					nCount++;
				}
			break;
			default:
		}
	}
	if(nCount > 0){
		return true;
	} else {
		return false;
	}
}
// -----------------------
// FUNCTION: fSearchBoxClear
// DESCRIPTION: A function that checks if the search box contains the word search, if it does the element is cleared ready for user input
// ARGUMENTS: sTargetElement
// RETURN: None
// -----------------------
function fSearchBoxClear(sTargetElement){
	var eElement = document.getElementById(sTargetElement);
	var eValue = eElement.value;
	if(eValue.indexOf('SEARCH') != -1){
		eElement.value = '';
	}
}
//<<<<<<< .mine

// -----------------------
// FUNCTION: fPasswordCheck
// DESCRIPTION: A function that checks if two password strings are the same
// ARGUMENTS: sPassword, sConfirmPassword
// RETURN: True or False
// -----------------------
function fPasswordCheck(sPassword, sConfirmPassword){
	if (sPassword == sConfirmPassword){
		return true;
	}else{
		return false;	
	}
}

// -----------------------
// FUNCTION: fDobCheck
// DESCRIPTION: A function that checks if error is for a day, month or year select-one input
//				then updates a the "Date of Birth" label to show an error.
// ARGUMENTS: sSelectId
// RETURN: True or False
// -----------------------
function fDobCheck(sSelectId, nError) {
	if (sSelectId == 'day' | 'month' | 'year'){//EB addded function to check for date of birth label
		if (document.getElementById('label_dob')){
			if (nError == 1){
				document.getElementById('label_dob').className = 'color-bd0000';
				document.getElementById('label_dob').style.fontWeight = 'bold';
			}else{
				document.getElementById('label_dob').className = '';
				document.getElementById('label_dob').style.fontWeight = '';			
			}
		return true;
		}	
	}else{
		return false;
	}
}


//=======
// -----------------------
// FUNCTION: fSearchBoxSubmit
// DESCRIPTION: A function that checks if the search box contains the word SEARCH or is blank, if so do not submit
// ARGUMENTS: sTargetElement
// RETURN: true or false
// -----------------------
function fSearchBoxSubmit(sTargetElement){

	var eElement = document.getElementById(sTargetElement);
	var eValue = eElement.elements[0].value;
	if(eValue.indexOf('SEARCH') != -1){
		return false;
	}
	if(eValue == ''){
		return false;
	}
	return true;
}
// -----------------------
// FUNCTION: fCheckMinMax
// DESCRIPTION: A function that checks that the from value of a form element is lower than the to value & then switches them if necessary
// ARGUMENTS: None
// RETURN: None
// -----------------------
function fCheckMinMax(sMin,sMax){
	var sMinHolder = sMin;
	var sMaxHolder = sMax;
	var iMin = document.getElementById(sMinHolder);
	var iMax = document.getElementById(sMaxHolder);
	var iMinValue = parseInt(iMin.value);
	var iMaxValue = parseInt(iMax.value);
	if(iMinValue > iMaxValue){
		iHolder = iMinValue;
		iMinValue = iMaxValue;
		iMaxValue = iHolder;
		iMin.value = iMinValue;
		iMax.value = iMaxValue;
	}
	else {
		return false;
	}
}
//-->
