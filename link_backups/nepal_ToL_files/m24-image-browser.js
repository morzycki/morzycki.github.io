<!--
// -----------------------
// FUNCTION: fCreateImageBrowser
// DESCRIPTION: A function to create the image pagination for the article.
// ARGUMENTS: nImage is the image to display. sImgBrowserType is the style of browser to create i.e. landscape, panorama or portrait.
// RETURN: False.
// -----------------------
function fCreateImageBrowser(nImage,sImgBrowserType,path){
	
	var sHTML = '';
	// Update the displayed image
	if(document.getElementById('dynamic-image-holder')){
		document.getElementById('dynamic-image-holder').getElementsByTagName('img')[0].src = sImageBrowserImagePath + aArticleImages[nImage];
		document.getElementById('dynamic-image-holder').getElementsByTagName('img')[0].alt = aImageAltText[nImage];
		document.getElementById('dynamic-image-holder').getElementsByTagName('img')[0].title = aImageAltText[nImage];
	}
	// Update the image photographer
	if(document.getElementById('dynamic-image-photographer') && aImagePhotographer[nImage] != "undefined"){
			if(aImagePhotographer[nImage] == "")
				document.getElementById('dynamic-image-photographer').getElementsByTagName('p')[0].innerHTML = '';
			else
				document.getElementById('dynamic-image-photographer').getElementsByTagName('p')[0].innerHTML = '(' + aImagePhotographer[nImage] + ')';
	}
	// Update image description
	if(document.getElementById('dynamic-image-description')){
		document.getElementById('dynamic-image-description').getElementsByTagName('p')[0].innerHTML = aImageDescriptions[nImage];
	}
	// Update enlarge link
	if(document.getElementById('dynamic-image-enlarge')){
		document.getElementById('dynamic-image-enlarge').getElementsByTagName('p')[0].innerHTML = '<a class="tools icon-enlarge link-666" target="_blank" href="' + aImageEnlargeLink[nImage] + '" onclick="javascript:return ! fPopUp(' + aImageEnlargePopupWidth + ', ' + aImageEnlargePopupHeight + ', \'' + aImageEnlargeLink[nImage] + '\');" onkeypress="javascript:return ! fPopUp(' + aImageEnlargePopupWidth + ', ' + aImageEnlargePopupHeight + ', \'' + aImageEnlargeLink[nImage] + '\');">Enlarge</a>';
	}
	
	if(aArticleImages.length > 1){
		sHTML += '<div id="dynamic-image-navigation" class="image-navigation">';
		sHTML += '<span class="browser-left-and-right"><a href="xxx" onclick="javascript:return fCreateImageBrowser(';
		if(nImage-1 < 0){
			sHTML += aArticleImages.length-1;
		} else {
			sHTML += nImage-1;
		} 
		sHTML += ',\'' + sImgBrowserType + '\',\''+path+'\');"><img src=\"'+path+'img/global/button/button-left.gif" width="14" height="14" border="0" alt="" /></a></span>';
		
		sHTML += '<span class="tools">Image :</span>';
		sHTML += '<span class="x-of-y">';
		sHTML += nImage+1 + ' of ' + aArticleImages.length;
		sHTML += '</span>';
		sHTML += '<span class="browser-left-and-right"><a href="xxx" onclick="javascript:return fCreateImageBrowser(';
		if(nImage+1 >= aArticleImages.length){
			sHTML += 0;
		} else {
			sHTML += nImage+1;
		}
		sHTML += ',\'' + sImgBrowserType + '\',\''+path+'\');"><img src=\"'+path+'img/global/button/button-right.gif" width="14" height="14" border="0" alt="" /></a></span>';
		sHTML += '<div class="padding-top-5"></div>';
		sHTML += '</div>';
		sHTML += '<div class="clear"></div>';
		document.getElementById('pagination-container').innerHTML = sHTML;
	}
	return false;
}
//-->
