// ------------------------ 10util.js starts here -----------------------------
/*              Utility functions                    */

var isIE6 = false;
var isIE7 = false;
/*@cc_on @*/

/*@if (@_jscript_version <= 5.6)
 // The above conditional compilation for IE is equivalent to
 // a conditional comment in HTML of 'if lte IE 6'
 isIE6 = true;
 /*@end @*/

/*@if (@_jscript_version > 5.6)
 // The above conditional compilation for IE is equivalent to
 // a conditional comment in HTML of 'if lte IE 6'
 isIE7 = true;
 /*@end @*/

var loadEventList = [];
function addEvent(obj, eventType, fn){

	if (typeof obj === "string") {
		obj = document.getElementById(obj);
	}

    /* adds an eventListener for browsers which support it
     Written by Scott Andrew: nice one, Scott */
    if (eventType === "load") {
        //hack me
        loadEventList.addLoadEvent(fn);
        return true;
    }
	if (!obj) {
		return null;
	}
    
    if (obj.addEventListener) {
        obj.addEventListener(eventType, fn, false);
        return true;
    }
    else 
        if (obj.attachEvent) {
            var r = obj.attachEvent("on" + eventType, fn);
            return r;
        }
        else {
            return false;
        }
}


var loadEventList = [];
loadEventList.addLoadEvent = function(fn){
    loadEventList[loadEventList.length] = fn;
};

loadEventList.hasFired = false;
loadEventList.fireLoadEvents = function(){
    for (var i = 0; i < loadEventList.length; i++) {
        loadEventList[i]();
    }
    loadEventList.hasFired = true;
};

/* the following is a hack to replicate DOMContentLoaded in browsers
 other than Firefox.  It is basically copied from
 http://dean.edwards.name/weblog/2006/06/again/
 */
if (/WebKit/i.test(navigator.userAgent)) { // Safari
    var _timer = setInterval(function(){
        if (/loaded|complete/.test(document.readyState)) {
            clearInterval(_timer);
            loadEventList.fireLoadEvents(); // call the onload handler
        }
    }, 100);
}
else 
    if (document.addEventListener) {
        document.addEventListener("DOMContentLoaded", loadEventList.fireLoadEvents, false);
    }
    else {
    // IE HACK
    /*@cc_on @*/
    /*@if (@_win32)
     document.write("<script id='__ie_onload' defer='defer' src='//:'><\/script>");
     var script = document.getElementById("__ie_onload");
     script.onreadystatechange = function() {
	     if (this.readyState == "complete") {
		     loadEventList.fireLoadEvents(); // call the onload handler
	     }
     };
     /*@end @*/
    }

var safeLoadEventList = [];
function addSafeLoadEvent(fn) {
	if (!(isIE6 || isIE7)) {
		addEvent(document, 'load', fn);
		return true;
	} else {
		// This is IE6 or 7 and therefore can't have document.body.appendChilds or innerHTMLs until the whole page has loaded.
		// See http://support.microsoft.com/kb/927917 for more information
		safeLoadEventList.push(fn);
		return true;
	}
}

safeLoadEventList.hasFired = false;
safeLoadEventList.fireLoadEvents = function() {
    for (var i = 0; i < safeLoadEventList.length; i++) {
        safeLoadEventList[i]();
    }
    safeLoadEventList.hasFired = true;
};

if ((isIE6 || isIE7)) {
	window.attachEvent("onload", safeLoadEventList.fireLoadEvents);
}

function importScript(src, onloadCallback){
	var scriptElem = document.createElement('script');
	scriptElem.setAttribute('src',src);
	scriptElem.setAttribute('type','text/javascript');
	
	if (onloadCallback) {
		scriptElem.onreadystatechange = function () {
			if (scriptElem.readyState === 'loaded') {
				onloadCallback();
			}
		};
		scriptElem.onload = onloadCallback;
	}

	document.getElementsByTagName('head')[0].appendChild(scriptElem);
}


function openGalleryPopup(url, height){
    var galleryWidth = 830;
    var leftPos = 0;
    if (screen.availWidth > galleryWidth) {
        leftPos = Math.round((screen.availWidth - galleryWidth) / 2);
     }
    var newWindow = window.open(url, '_blank', 'resizable=yes,scrollbars=yes,location=yes,toolbar=yes,status=no,top=0,screenY=0,left=' + leftPos + ',screenX=' + leftPos + ',height=' + height + ',width=' + galleryWidth);
    return false;
}

function openScorePopup(url){
 	var height= 335;
	var width = 420;
    var leftPos = 0;
    window.open(url, '_blank', 'resizable=yes,scrollbars=yes,location=no,toolbar=no,status=no,top=0,screenY=0,left=' + leftPos + ',screenX=' + leftPos + ',height=' + height + ',width=' + width);
    return false;
}

function popUpNewWindow(url,width,height) {
	newwindow=window.open(url,'sponsor','height=' + height + ',width=' + width + ',scrollbars=yes,location=yes,toolbar=yes,status=yes,resizable=yes');
	if (window.focus) {newwindow.focus()}
	return false;
}

function forEachElementOf(list, doThis){
    var listLength = list.length;
    for (var i = 0; i < listLength; i++) {
        doThis(list[i], i);
    }
}

function readCookie(name) {
    var nameEQ = name + "=";
    var cookieArray = document.cookie.split(';');
	
    for (var i = 0; i < cookieArray.length; i++) {
        var cookie = cookieArray[i];
		
        while (cookie.charAt(0) == ' ') {
			cookie = cookie.substring(1, cookie.length);
		}
			
        if (cookie.indexOf(nameEQ) === 0) {
			return cookie.substring(nameEQ.length, cookie.length);
		}
    }
	
    return null;
}

function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function isExternalSystemOn(system){

    var extSystems = readCookie("GU_EXT_SYS");
    if (extSystems !== null) {
        return extSystems.match(system) === null;
    }
    return true;
}

function isUserLoggedIntoRegPss() {
	return readCookie("GU_ME") != null;
}

function generateScriptTag(src){
    document.write('<script type="text/javascript" src="' + src + '"></scr' + 'ipt>');
    document.close();
}

function getScrollPosition(){
    var scrollX, scrollY;
    if (self.pageYOffset) {
        scrollX = self.pageXOffset;
        scrollY = self.pageYOffset;
    }
    else 
        if (document.documentElement && document.documentElement.scrollTop) {
            scrollX = document.documentElement.scrollLeft;
            scrollY = document.documentElement.scrollTop;
        }
        else 
            if (document.body) {
                scrollX = document.body.scrollLeft;
                scrollY = document.body.scrollTop;
            }
    return {
        x: scrollX,
        y: scrollY
    };
}

function getCenterPosition(){
    var centerX, centerY;
    if (self.innerHeight) {
        centerX = self.innerWidth;
        centerY = self.innerHeight;
    }
    else 
        if (document.documentElement && document.documentElement.clientHeight) {
            centerX = document.documentElement.clientWidth;
            centerY = document.documentElement.clientHeight;
        }
        else 
            if (document.body) {
                centerX = document.body.clientWidth;
                centerY = document.body.clientHeight;
            }
    return {
        x: centerX,
        y: centerY
    };
}

function getScrollAndCenterPosition(){
    var scroll = getScrollPosition();
    var center = getCenterPosition();
    return {
        scrollX: scroll.x,
        scrollY: scroll.y,
        centerX: center.x,
        centerY: center.y
    };
}

function fixFirefoxIncrementalReflowBug() {
	if (window.getComputedStyle) {
		// This is only required for Firefox 2, where the incremental rendering sometimes gets messed
		// up. Call this to force a document reflow. This bug is (apparently) fixed in FF3.
		var body = document.getElementsByTagName('body')[0];
		var bodyHeight = window.getComputedStyle(body,'').getPropertyValue('height');
		body.style.height = bodyHeight;
		window.setTimeout(function () {body.style.height = 'auto'},100);
	}
}

function GUopenParent(target) {
	if (window.opener) {
		window.opener.location=target;
	} else {
		location=target;
	}
}

function classNameRegex(cl) {
	return new RegExp("( |^)" + cl + "( |$)")
}

function removeClassName(el, className) {
	return el.className.replace(classNameRegex(className), " ");
}

function elementHasClassName(el, className) {
	if (el.hasClassName) {
		return el.hasClassName(className);
	}
	return classNameRegex(className).test(el.className);
}

function getElementsByClassNameAndTagName(className, node, tagName) {
	if (!className) {
		return [];
	}
	var nodeRoot = node ? node : document;
	var tag = tagName ? tagName : '*';
	var elementsToTest = nodeRoot.getElementsByTagName(tag);
	var matchingElements = [];
	for (var i = 0; i < elementsToTest.length; i++) {
		if (elementHasClassName(elementsToTest[i], className)) {
			matchingElements.push(elementsToTest[i]);
		}		
	}
	return matchingElements;
}

function getAncestorOfType(object, tagType) {
	return (object.tagName.toLowerCase() === tagType) ? object : getAncestorOfType(object.parentNode, tagType);
}

// ------------------------- 10util.js ends here ------------------------------
// -------------------- 11image-utils.js starts here ----------------------------

var applyImageMaskImmediate;
var applyFullScreenImageMask;
var removeFullScreenImageMask;
var updateVisibilityOfElementsThatRuinIE6Filters;
var ensureElementHasLayoutInIE6;

(function() {
    var root = commonStaticRoot + 'styles/wide/images/';
    
    function getMaskDef(maskName, width, height) {
        var lowerCaseMaskName = maskName.toLowerCase();
        
        function defaultMaskDef(url) {
        	return {url : url, width : width, height : height};
        }
        
        switch (lowerCaseMaskName) {
        case "roundedcorners":
            switch (width)  {
            case 460:
                return defaultMaskDef(root + '460x276-mask.png');
            case 300:
                return defaultMaskDef(root + '300x180-mask.png');
            case 140:
                switch (height) {
                case 84:
                    return defaultMaskDef(root + '140x84-mask.png');
                case 89:
                    return defaultMaskDef(root + '140x84-mask.png');
                case 180:
                    return defaultMaskDef(root + '140x180-mask.png');
                case 120:
                    return defaultMaskDef(root + '140x120-mask.png');
                }
                break;
            case 280:
                return defaultMaskDef(root + '280x168-mask.png');
            case 130:
                switch (height) {
                case 78:
                    return defaultMaskDef(root + '130x78-mask.png');
                case 111:
                    return defaultMaskDef(root + '130x111-mask.png');
                }
                break;
            case 220:
                return defaultMaskDef(root + '220x132-mask.png');
            }
            break;
            
        case "article" :
        case "cartoon" :
        case "poll" :
        case "trailblock" :
		case "contributor" :
        	// no mask
            break;
        	
        default:
            if (width >= 140 && height >= 84) {
                return {url : root + lowerCaseMaskName + '_140.png', width : 140, height : 84};
            }
        }
        return null;
    }
    
    function createIE6BackgroundDiv(maskDef) {
        var newImageDiv = document.createElement("div");
        newImageDiv.style.width = maskDef.width + "px";
        newImageDiv.style.height = maskDef.height + "px";
        newImageDiv.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + maskDef.url + "',sizingMethod='scale')";
        newImageDiv.style.position = "absolute";
        newImageDiv.style.left = String( - maskDef.leftOffset);
        newImageDiv.style.top = String( - maskDef.topOffset);
        newImageDiv.style.zIndex = "100";
    
    	return newImageDiv;
    }
    
    var applyMaskInIE6 = function (parentNode, maskDef) {
    	maskDef.leftOffset = maskDef.topOffset = 0;
        var newImageDiv = createIE6BackgroundDiv(maskDef);
        newImageDiv.className = 'mask';
        parentNode.style.position = 'relative';
        parentNode.style.display = 'block';
        ensureElementHasLayoutInIE6(parentNode);
        parentNode.appendChild(newImageDiv);
        if (document.getElementById('content')) {
        	// Force IE6 to redraw.
        	document.getElementById('content').style.display = 'none';
        	document.getElementById('content').style.display = 'block';
        }
        
        return newImageDiv;
    };
    
    var applyMask = function (originalElement, parentNode, maskDef) {
        parentNode.style.display = 'block';
        parentNode.style.position = 'relative';
		
        
        var newImage = originalElement.cloneNode(false);
		newImage.style.width = maskDef.width + 'px';
        newImage.style.height = maskDef.height + 'px';
        newImage.setAttribute('src', maskDef.url);
        newImage.className = 'mask';
        newImage.setAttribute('alt', ' ');
		parentNode.appendChild(newImage);
        
        return newImage;
    };

	getNumberPropertyValue = function (originalElement, propertyName) {
        var propVal = Number(originalElement.getAttribute(propertyName));
        if (propVal === 0) {
        	if (document.defaultView && document.defaultView.getComputedStyle) {
	        	propVal = document.defaultView.getComputedStyle(originalElement,'').getPropertyValue(propertyName);        	
        	} else if (originalElement.currentStyle){
	        	propVal = originalElement.currentStyle[propertyName];
	        }
	        
	 		if (propVal !== null) {
				propVal = parseInt(propVal.replace('px', ''), 10);
			}
        }
		if (!isNaN(propVal) && propVal !== null) {
			return propVal;
		}
		else {
			return 0;
		}
 	}

    applyImageMaskImmediate = function (originalElement, maskName) {
        var parentNode = originalElement.parentNode;
        var width = getNumberPropertyValue(originalElement, 'width');
        var height = getNumberPropertyValue(originalElement, 'height');
        var maskDef = getMaskDef(maskName, width, height);
        if (maskDef) {
            if (isIE6) {
                return applyMaskInIE6(parentNode, maskDef);
            } else {
                return applyMask(originalElement, parentNode, maskDef);
            }
        }
    };
    
    var applyFullScreenMaskInIE6 = function (parentNode, maskDef) {
        var newImageDiv = createIE6BackgroundDiv(maskDef);
        ensureElementHasLayoutInIE6(parentNode);
		parentNode.insertBefore(newImageDiv, parentNode.firstChild);
		
        return newImageDiv;
    };
    
     updateVisibilityOfElementsThatRuinIE6Filters = function (visibility, elementThatContainsThingToNOTHide) {
    	
    	var elementsToIgnore = elementThatContainsThingToNOTHide ? elementThatContainsThingToNOTHide.getElementsByTagName('select') : [];
    	
    	forEachElementOf(elementsToIgnore, function(element) {
    		element.dontHideThisElement = true;
    	});
    	
    	var badElements = $$('select','embed','object');    	
    	
		forEachElementOf(badElements, function(element) {
			if (!element.dontHideThisElement) {
				element.style.visibility = visibility;
			}
		});
		
    	forEachElementOf(elementsToIgnore, function(element) {
			if (element.dontHideThisElement) {
	    		element.dontHideThisElement = false;
	    	}
    	});

    }
    
    applyFullScreenImageMask = function (elementThatContainsThingToNOTHide) {
    	if (isIE6) {
			document.body.parentNode.style.overflow = 'hidden';

    		var element = document.getElementById(elementThatContainsThingToNOTHide);
			updateVisibilityOfElementsThatRuinIE6Filters('hidden', element);
			
			var leftOffset = element.offsetParent.offsetLeft;
			
    		var body = document.body;
    		return applyFullScreenMaskInIE6(
    			element,
    			{
    				url : root + 'white-bg.png',
    				width : body.clientWidth,
    				height : body.clientHeight,
    				leftOffset : leftOffset,
    				topOffset : 0
    			});
    	}
    };
    
    removeFullScreenImageMask = function () {
    	updateVisibilityOfElementsThatRuinIE6Filters('visible');
		document.body.parentNode.style.overflow = '';
    };
    
    ensureElementHasLayoutInIE6 = function (element) {
        if (!element.currentStyle.hasLayout) {
	        element.style.zoom = '1';
	    }    	
    }
    
})();

// -------------------- 11image-utils.js ends here ----------------------------
// ------------------------ 12other-utils.js starts here -----------------------------
function ensurePackage(packageName, packageBlock){
    var package_parts = packageName.split(".");
    var package_so_far = this;
    for (var i = 0; i < package_parts.length; i += 1) {
        var package_part = package_parts[i];
        if (!package_so_far[package_part]) {
            package_so_far[package_part] = {};
        }
        package_so_far = package_so_far[package_part];
    }
    if (packageBlock) {
        packageBlock(package_so_far);
    }
    return package_so_far;
}

function trim(str) {
	return ltrim(rtrim(str));
}

function ltrim(str) {
	return str.replace(/^\s+/, '');
}

function leftTrim(str){
    return str.replace(new RegExp(/^\s*/g), "");
}

function rtrim(str) {
	return str.replace(/\s+$/, '');
}

function stripParamFromUrl(param, urlToStrip) {
	var url = urlToStrip.replace(new RegExp("\\?" + param + "=\\w*$"), ""); // first and only param
	url = url.replace(new RegExp("\\?" + param + "=\\w*&"), "?"); // first of many params
	url = url.replace(new RegExp("&" + param + "=\\w*"), ""); // not first param
	return url;	
}

function isNumber(value) {
	return typeof value === 'number';
}

function delegateErrorHandler(to, from) {
	to.errorHandler = from.errorHandler;
}

function isValidUrl(url) {
	var regexp = /(http:\/\/([\-\w]+\.)+\w{2,3}(\/[%\-\w]+(\.\w{2,})?)*(([\w\-\.\?\/+@&#;`~=%!]*)(\.\w{2,})?)*\/?)/i;
	return regexp.test(url);
}

function appendParameter(url, parameter) {
	if (url.indexOf('?') !== -1) {
		return url + '&' + parameter;
	} else {
		return url + '?' + parameter;
	}
}

function isArray(object) {
	return object != null && typeof object == "object" && 'splice' in object && 'join' in object;
}

// ------------------------ 12other-utils.js ends here -----------------------------
/* ---- DialogBox.js ---- */
ensurePackage("guardian.r2");

guardian.r2.DialogBox = function () {

	var appliedImageMask = false;
	var instance = this;

	this.showDialogBox = function (dialogBox, dialogBoxWrapper, scrollable) {
		if (isIE6) {
			document.body.parentNode.style.overflow = 'hidden';
		}
		scrollable = scrollable ? scrollable : false;
		instance.positionDialogBox(dialogBox, dialogBoxWrapper, scrollable);
		dialogBoxWrapper.style.display = "block";
		if (isIE6) {
			dialogBoxWrapper.style.background = "none";
			if (dialogBoxWrapperHasNotAlreadyHadImageMaskApplied(dialogBox, dialogBoxWrapper)) {
				applyFullScreenImageMask(dialogBoxWrapper.id);
				appliedImageMask = true;
			}
			else {
				dialogBoxWrapper.firstChild.style.width = document.body.clientWidth + "px";
				leftOffset = dialogBoxWrapper.offsetParent.offsetLeft;
				dialogBoxWrapper.firstChild.style.left = "-" + leftOffset + "px";
				updateVisibilityOfElementsThatRuinIE6Filters('hidden', dialogBoxWrapper);
			}
		} else {
			updateVisibilityOfElementsThatRuinIE6Filters('hidden', dialogBoxWrapper);
		}
	};

	this.hideDialogBox = function (dialogBoxWrapper) {
		if (isIE6) {
			removeFullScreenImageMask();
		} else {
			updateVisibilityOfElementsThatRuinIE6Filters('', dialogBoxWrapper);
		}
	};

	this.positionDialogBox = function (dialogBox, dialogBoxWrapper, scrollable) {
		var position = getCenterPosition();
		var scroll = getScrollPosition();
		var wrapperWidth = 0;
		var posX = position.x;
		if (isIE6) {
			dialogBoxWrapper.style.position = 'absolute';
			dialogBox.style.position = 'absolute';
		}
		dialogBoxWrapper.style.visibility = 'hidden';
		dialogBoxWrapper.style.display = 'block';
		dialogBox.style.visibility = 'hidden';
		dialogBox.style.display = 'block';
		var w = getAxisBoxModelTotalSize(dialogBox, "width");
		if (isIE6) {
			if (dialogBoxIsContainedByWrapper(dialogBox)) {
				wrapperWidth = getNumberPropertyValue(document.getElementById('wrapper'), "width");
				if (wrapperWidth < posX) {
					posX = wrapperWidth;
				}
			}
		}
		var centreX = posX / 2;
		var centreOffset = w / 2;
		var leftOffset = Math.round(centreX - centreOffset);
		dialogBoxWrapper.style.top = "0px";
		dialogBoxWrapper.style.left = "0px";
		dialogBox.style.left = leftOffset + "px";
		var boxHeight = getAxisBoxModelTotalSize(dialogBox, "height");
		var windowHeight = position.y;
		var scrollHeight = scroll.y;
		var topOffset = 5;
		if (boxHeight < windowHeight) {
			topOffset = (windowHeight - boxHeight) / 2;
		}
		if (isIE6 || scrollable) {
			topOffset += scrollHeight;
		}
		dialogBox.style.top = topOffset + "px";
		dialogBox.style.visibility = '';
		dialogBoxWrapper.style.visibility = '';
		dialogBoxWrapper.style.display = 'none';
	};
	
	this.createCloseLink = function(dialogBox, dialogBoxWrapper) {
		function closeDialogBox() {
			dialogBox.style.display = 'none';
			dialogBoxWrapper.style.display = 'none';
			instance.hideDialogBox(dialogBoxWrapper);
		}
		var closeLinkId = (dialogBox.id + '-close-link');
		if (!$(closeLinkId)) {
			var closeLink = document.createElement('a');
			closeLink.href = '#';
			closeLink.innerHTML = 'close';
			closeLink.id = (closeLinkId);
			closeLink.className='close';
			addEvent(closeLink, 'click', closeDialogBox);
			
			var toolBox= document.createElement('p');
			toolBox.className='toolbox';
			toolBox.appendChild(closeLink);
			
			dialogBox.insertBefore(toolBox, dialogBox.firstChild);

		}
	}
	
	function dialogBoxWrapperHasNotAlreadyHadImageMaskApplied(dialogBox, dialogBoxWrapper) {
		var isEmptyString = /^\s*$/;
		if (dialogBoxIsContainedByWrapper(dialogBox)) {
			return !appliedImageMask;
		}
		return !appliedImageMask && isEmptyString.test(dialogBoxWrapper.innerHTML)
	}

	function dialogBoxIsContainedByWrapper(dialogBox) {
		return !(dialogBox.parentNode === document.body);
	}

	function getAxisBoxModelTotalSize(el, axis) {
		var boxHeight, boxPadding, boxMargins, boxWidth;
		switch (axis) {
		case 'height':
			boxHeight = el.offsetHeight;
			boxMargins = getNumberPropertyValue(el, "marginTop") + getNumberPropertyValue(el, "marginBottom");
			return (boxHeight + boxMargins);
		case 'width':
			boxWidth = el.offsetWidth;
			boxPadding = getNumberPropertyValue(el, "paddingLeft") + getNumberPropertyValue(el, "paddingRight");
			boxMargins = getNumberPropertyValue(el, "marginLeft") + getNumberPropertyValue(el, "marginRight");
			return (boxWidth + boxPadding + boxMargins);
		}
	}
};
/* ---- HitboxLinkTrackedController.js ---- */
ensurePackage("guardian.r2");

guardian.r2.HitboxLinkTrackedController = function (view) {

	var instance = this;

	this.handleOnLoad = function () {
		view.regsiterLinkClickedEvent(instance.handleLinkClicked);
	};

	this.handleLinkClicked = function (elementName, url) {
		var matches = /&lid=(.*)&lpos=(.*)/.exec(elementName);
		
		if (matches !== null) {
			_hbLink(matches[1], matches[2]);
			view.updateDocumentLocationWithDelay(url);
			return false;
		}
		
		return true;
	};

	view.registerOnLoadEvent(instance.handleOnLoad);
};
 
/* ---- HitboxLinkTrackedView.js ---- */
ensurePackage("guardian.r2");

guardian.r2.HitboxLinkTrackedView = function () {
	function getParentAnchorTag(element) {
		var parentElement = element;
		
		while (parentElement) {
			if (parentElement.tagName === "A") {
				return parentElement;
			}
			
			parentElement = parentElement.parentNode;
		} 
		
		return null;
	}
	
	this.regsiterLinkClickedEvent = function (callback) {
		var viewCallback = function (event) {
			var anchorTag = getParentAnchorTag(event.target);
			if (!anchorTag) {
				return true;
			}
			
			return callback(anchorTag.name, anchorTag.href);
		};
		
		forEachElementOf($$('.js-hitbox-tracked'),
			function (trackingWrapper) {
				addEvent(trackingWrapper, "click", viewCallback);
			}
		);
	};
	
	this.registerOnLoadEvent = function (callback) {
		addEvent(document, "load", callback);
	};
	
	this.updateDocumentLocationWithDelay = function (url) {
		setTimeout(
			function () {
				document.location = url;
			}, 500);
	};
};
// ---------------------- ObfuscationService.js starts here -----------------------------

ensurePackage("guardian.r2");

guardian.r2.ObfuscationService = function(){
	var instance = this;
	
	this.encryptPassword = function(password, challenge2){
		return binl2hex(core_hmac_md5(challenge2, password));
	};
	
	
}
	
// ----------------------- ObfuscationService.js ends here ------------------------------
// ---------------------- ProfileLinkController.js starts here -----------------------------

ensurePackage("guardian.r2");

guardian.r2.ProfileLinkController = function (profileLinkView, userProfileUrl) {
	
	function setUserProfileLink() {
		var atCookie = profileLinkView.readATCookie();
		
		if (atCookie) {
			var userNameRegExp = /\&a=([\w]*)\&/;
			var userName = atCookie.match(userNameRegExp)[1];
			var completeUrl = userProfileUrl + userName;
			profileLinkView.setUserProfileLink(completeUrl);
		}
	}
	
	profileLinkView.addLoadEvent(setUserProfileLink);
}

// ----------------------- ProfileLinkController.js ends here ------------------------------
// ---------------------- ProfileLinkView.js starts here -----------------------------

ensurePackage("guardian.r2");

guardian.r2.ProfileLinkView = function (elementName) {

	this.readATCookie = function () {
		return readCookie('at');
	};
	
	this.addLoadEvent = function (callback) {
		addEvent(document, 'load', callback);
	};
	
	this.setUserProfileLink = function (url) {
		var anchor = document.getElementById('profile-link');
		anchor.href = url;
		var profileLinkHolder = document.getElementById('profile-link-holder');
		profileLinkHolder.style.display = '';
	};

}


// ----------------------- ProfileLinkView.js ends here ------------------------------

// ---------------------- SignInController.js starts here -----------------------------

ensurePackage("guardian.r2");

guardian.r2.SignInController = function (signInView, signInListeners, obfuscationService, popupUrl) {
	var instance = this;
	var savedDestinationUrl;
	
	this.submitSignInForm = function (event) {
		
		var formFields = signInView.getPasswordAndChallenge2FormFields();
		var obfuscated_tokens = obfuscationService.encryptPassword(formFields.password, formFields.challenge2);
		var hidden_password = signInView.hidePassword();

		urlStack.clearUrlStack();
		urlStack.pushUrlOntoStack(savedDestinationUrl);

		signInView.submitForm(obfuscated_tokens, hidden_password);	
		
		Event.stop(event)
		return false;
	};
	
	this.forwardToRegistrationPage = function (event) {
		urlStack.clearUrlStack();
		urlStack.pushUrlOntoStack(savedDestinationUrl);
	}
	
	this.openSignInBox = function (event, getTargetUrlCallback, getClassNameCallback) {
		savedDestinationUrl = getTargetUrlCallback(event);

		signInView.createScriptElements();
		signInView.createDivElements();
		
		var packageCode = signInView.getPackageCode(event, getClassNameCallback);
		var popupUrlWithPackageCode = popupUrl;
		
		if(packageCode){
			popupUrlWithPackageCode = popupUrl + "?package=" +packageCode;
		}
		
		showSignInBox(popupUrlWithPackageCode);
		
		Event.stop(event);
		return false;
	};
	
	this.closeSignInBox = function (event) {
		signInView.closeDialogBox();
		
		Event.stop(event);
		return false;
	};
	
	function showSignInBox(requestUrl) {
		var ajaxRequest = new Ajax.Request(requestUrl, {
			method: 'get',
			onSuccess: instance.showSignInBoxSuccess,
	 		onFailure: function (transport) {
				signInView.updateAndShowDialogBox(transport.responseText);
				signInView.addSignInFormListeners(
						instance.submitSignInForm, 
						instance.closeSignInBox,
						instance.forwardToRegistrationPage);
			}
		});
	};
	
	this.showSignInBoxSuccess = function (transport){
		signInView.updateAndShowDialogBox(transport.responseText);
		signInView.addSignInFormListeners(
			instance.submitSignInForm, 
			instance.closeSignInBox, 
			instance.forwardToRegistrationPage);	
		signInView.setFocus();
	};
	
	this.addListenersTo = function (element) {
		if(!element) {
			element = signInView.getDocumentBody();
		}
		
		signInListeners.addLoginListeners(element, instance.openSignInBox);
	};

	signInView.setOpenSignInBoxAction(instance.openSignInBox);	
	signInView.addLoadEvent(instance.addListenersTo);	
}

// ----------------------- SignInController.js ends here ------------------------------
// ---------------------- SignInListeners.js starts here -----------------------------

ensurePackage("guardian.r2");

guardian.r2.SignInListeners = function () {
	
	function addListenersTo(inElement, cssRule, getTargetUrlCallback, getClassNameCallback, openSignInBoxCallback) {
		
		var elementsToAddListenersTo = $(inElement).getElementsBySelector(cssRule);
		
		elementListenerFunction = function(event) {
				openSignInBoxCallback(event, getTargetUrlCallback, getClassNameCallback);	
		}
		
		for (var i = 0; i < elementsToAddListenersTo.length; i++) {
			addEvent(elementsToAddListenersTo[i], 'click', elementListenerFunction);	
		}
		
	};
	
	
	function getTargetUrlFromSamePageLoginAnchor(event) {
		return document.location;
	};
	
	function getClassNameFromSamePageLoginAnchor(event) {
		return getAncestorOfType(Event.element(event), 'a').className;
	};
	
	function getTargetUrlFromAnchorBasedLogin(event) {
		return getAncestorOfType(Event.element(event), 'a').href;
	};
	
	function getClassNameFromAnchorBasedLogin(event) {
		return getAncestorOfType(Event.element(event), 'a').className;
	};

	function getTargetUrlFromFormBasedLogin(event) {
		return getAncestorOfType(Event.element(event), 'form').action;
	};
	
	function getClassNameFromFormBasedLogin(event) {
		return Event.element(event).className;
	};
	
	this.addLoginListeners = function (inElement, openSignInBoxCallback) {
		addListenersTo(	inElement, 
						'a.same-page-login-required', 
						getTargetUrlFromSamePageLoginAnchor, 
						getClassNameFromSamePageLoginAnchor, 
						openSignInBoxCallback);
		
		addListenersTo(	inElement, 
						'a.anchor-based-login-required', 
						getTargetUrlFromAnchorBasedLogin, 
						getClassNameFromAnchorBasedLogin, 
						openSignInBoxCallback);
		
		addListenersTo(	inElement, 
						'form input.form-based-login-required', 
						getTargetUrlFromFormBasedLogin, 
						getClassNameFromFormBasedLogin, 
						openSignInBoxCallback);
	};
	
};
// ---------------------- SignInView.js starts here -----------------------------

ensurePackage("guardian.r2");

guardian.r2.SignInView = function (scriptLocation) {

	var instance = this;
	
	var dummy = '----------------------------------------';
	var dialogBoxDivId = "signin-div";
	var wrapperDivId = "signin-div-wrapper";
	var openSignInBoxCallback;
	
	var dialogBox = new guardian.r2.DialogBox();
	
	this.getDocumentBody = function () {
		return document.body;
	};
	
	this.setOpenSignInBoxAction = function (callback) {
		openSignInBoxCallback = callback;
	};
	
	this.addLoadEvent = function (callback) {
		addEvent(document, 'load', callback);
	};
	
	this.addSignInFormListeners = function(submitCallback, closeCallback, registerCallback) {
		addEvent($('popUpSignIn'), 'click', submitCallback);
		addEvent($('login-close-link'), "click", closeCallback);
		addEvent($('cancelSignIn'), "click", closeCallback);
		addEvent($('signin-popup-registration-link'), "click", registerCallback);
	};
		
	this.hidePassword = function (){
		return dummy.substr(0, $('inline-password').value.length);
	};
	
	this.getPasswordAndChallenge2FormFields = function () {
		return {challenge2 : $('AU_CHALLENGE2').value, password : $('inline-password').value};			
	};
	
	this.submitForm = function (obfuscated_tokens, hidden_password) {
	
		$('AU_PASSWORD_HASH').value = obfuscated_tokens;
		$('inline-password').value = hidden_password;
		
		$('regpss1').submit();
	};
	
	this.createScriptElements = function () {
		importScript(scriptLocation);
	};
	
	this.createDivElements = function () {
		createWrapperDiv();
		
		if(!$(dialogBoxDivId)) {
			var dialogBoxDivElement = document.createElement("div");
			dialogBoxDivElement.id = dialogBoxDivId;
			dialogBoxDivElement.className = "dialog-box";
			document.body.appendChild(dialogBoxDivElement);
		}	
	};
	
	this.updateAndShowDialogBox = function(text){
		$(dialogBoxDivId).update(text);		
		dialogBox.showDialogBox($(dialogBoxDivId), $(wrapperDivId), false);
	};
	
	this.closeDialogBox = function () {
		var signInBoxWrapper = $(wrapperDivId);
		var signInBox = $(dialogBoxDivId);
		
		signInBox.style.display = "none";
		signInBoxWrapper.style.display = "none";
		
		dialogBox.hideDialogBox(signInBoxWrapper);
	};
	
	function createWrapperDiv() {
		if (!$(wrapperDivId)) {
			var wrapperDivElement = document.createElement("div");
			wrapperDivElement.id = wrapperDivId;
			wrapperDivElement.className = "dialog-wrapper";
			document.body.appendChild(wrapperDivElement);
		}		
	};
	
	this.getDocumentLocation = function() {
		return document.location;
	};
	
	this.getPackageCode = function (event, getClassNameCallback){
		
		var className = getClassNameCallback(event);
		if(className) {
			var packageRequiredMatcher = /package-required-(\w+)/;
			var match = packageRequiredMatcher.exec(className);
			if (match) {
				return match[1];
			}	
		}
				
		return null;
	};
	
	this.setFocus = function (){
		$('inline-email').focus();
	}
	
	
}

// ----------------------- SignUpView.js ends here ------------------------------

// ---------------------- ad_support.js starts here ---------------------------
// Time out is in minutes
var hoursToCount = 0; // Set this to make the cookie _not_ be session based (that is, an expire field is set)
var timeOut = 720;
var maxAdCount = 100;
var showAdsOnNthVideo = 2;

function buildIntrusiveAd(adHost, geoCountry, geoRegion, geoCity, geoBandwidth, randString, commercialFolder, keywords, pageUrl, site, system, blockVideoAds) {
	var theseCookies = document.cookie;
	var pos = theseCookies.indexOf('GUDHTMLAds=');
	if 	(pos == -1) {
		var seconds = 180;
		var expireTime = new Date();
		var currenttimeinmills = expireTime.getTime();
		expireTime.setTime(currenttimeinmills + seconds * 1000 );
		document.cookie = 'GUDHTMLAds=Dummy; expires=' + expireTime.toGMTString() + ' ; path=/ ; domain=guardian.co.uk';
		
        var	intrusad = 
            '<' + 'script type="text/javascript" src="' + adHost + 
            '/js.ng/spacedesc=01&amp;comfolder=' + commercialFolder + 
            '&amp;keywords=' + keywords + 
            '&amp;country=' + geoCountry + 
            '&amp;region=' + geoRegion + 
            '&amp;city=' + geoCity + 
            '&amp;bandwidth=' + geoBandwidth + 
            '&amp;rand=' + randString + 
			'&amp;site=' + site +
            '&amp;url=' + pageUrl +  
			'&amp;system=' + system + 
			'&amp;blockVideoAds=' + blockVideoAds + '"></' + 'script>';
			
		document.write(intrusad);
		document.close();
	}
}

function AdCookieValue() {
	this.date = new Date();
	this.date.setTime(0);
	this.adsPlayed = 0;
	this.videosPlayed = 0;
	
	if (hoursToCount != 0) {
		var t = new Date().getTime();
		t += hoursToCount * 1000 * 60 * 60;
		this.expiryDate = new Date();
		this.expiryDate.setTime(t);
	}
}

AdCookieValue.prototype.adDisplayed = function() {
	this.adsPlayed++;
	this.date = new Date();
}

AdCookieValue.prototype.videoDisplayed = function() {
	this.videosPlayed++;
}

AdCookieValue.prototype.shouldDisplayAdvert = function() {
	return true;  
}

AdCookieValue.parseText = function(text) {
	var bits = text.split("|");
	var cookieValue = new AdCookieValue();
	cookieValue.adsPlayed = bits[0] - 0;
	cookieValue.videosPlayed = bits[1] - 0;
	cookieValue.date.setTime(Date.parse(bits[2]));
	if (hoursToCount != 0 && bits[3]) {
		cookieValue.expiryDate.setTime(Date.parse(bits[3]));
	}
	return cookieValue;
}

AdCookieValue.prototype.toString = function() {
	if (hoursToCount != 0) {
		return this.adsPlayed + "|" + this.videosPlayed + "|" + this.date + "|" + this.expiryDate;
	} 
	return this.adsPlayed + "|" + this.videosPlayed + "|" + this.date;
}

AdCookieValue.loadFromCookie = function() {
	var cookies = document.cookie.split(';');
	
	for (var i = 0; i < cookies.length; i++) {
		var nameValuePair = cookies[i].split('=');
		if (nameValuePair[0].charAt(0) == ' ') {
			nameValuePair[0] = nameValuePair[0].substring(1, nameValuePair[0].length);
		}
		
		if (nameValuePair[0] == "GUVidAd") {
			return AdCookieValue.parseText(nameValuePair[1]);
		}
	}
	
	return new AdCookieValue();
}

function isVideoAdDisplayed() {
	return AdCookieValue.loadFromCookie().shouldDisplayAdvert();
}

function videoAdPlayed(domain) {
	var cookieValue = AdCookieValue.loadFromCookie();
	cookieValue.adDisplayed();
	writeCookie(domain, cookieValue);
}

function videoPlayed(domain) {
	var cookieValue = AdCookieValue.loadFromCookie();
	cookieValue.videoDisplayed();
	writeCookie(domain, cookieValue);
}

function writeCookie(domain, cookieValue) {
	var cookieString;
	if (hoursToCount != 0) {
		cookieString = "GUVidAd=" + cookieValue.toString() + "; expires=" + cookieValue.expiryDate.toGMTString() + " ; path=/ ; domain=" + domain;
	} else {
		cookieString = "GUVidAd=" + cookieValue.toString() + "; path=/ ; domain=" + domain;
	}
	document.cookie = cookieString;
}

// ----------------------- ad_support.js ends here ----------------------------
// ------------------------ caption.js starts here ----------------------------

function Caption() {
	
	var instance = this;
	
	this.init = function () {
		var imageList = getElementsByClassNameAndTagName('pixie', document, 'li');
		for (var i = 0; i < imageList.length; i++) {
			imageList[i].onmouseover = function () {
				instance.changeState(this, 'over');
			};
			imageList[i].onmouseout =  function () {
				instance.changeState(this, 'off');
			};
			imageList[i].onfocus = function () {
				instance.changeState(this, 'over');
			};
			imageList[i].onblur =  function () {
				instance.changeState(this, 'off');
			};
		}
	};

	this.changeState = function (element, state)  {
		var existingClassName = instance.getOldClassName(element, 'static-state');
		var currentClassName = element.className;
		var startPosition, endPosition;
	
		var isMini = classNameRegex('mini');
		if (isMini.test(currentClassName)) {
			startPosition = -7;
			endPosition = 0;
		} else {
			startPosition = -4;
			endPosition = 1.4;
		}
		
		if (currentClassName.match(/c-[0-9]+-c/)) {
			var timeOutHide = currentClassName.match(/[0-9]+/);
			timeOutHide = parseInt(timeOutHide, 10);
			clearInterval(timeOutHide);
		}
		var trailText = element.getElementsByTagName('div')[1];
		if (trailText && classNameRegex('trail-text').test(trailText.className)) {
			var elementRef = element.getElementsByTagName('div')[1];
			var timeOutRef = setInterval(function () {
				instance.show(elementRef, state, startPosition, endPosition);
			}, 10);
			element.className = existingClassName + "c-" + timeOutRef + "-c";
		}
	};
	
	this.show = function (element, state, startPosition, endPosition)  {
	
		var rate = 1;
		
		var captionPosition = parseInt(element.style.marginTop, 10);
		if (isNaN(captionPosition)) {
			captionPosition = startPosition;
		} else if (state === 'over') {	
			captionPosition = captionPosition + rate;
		} else {
			captionPosition = captionPosition - rate;
		}
		
		if (captionPosition <= endPosition && state === 'over' || captionPosition >= startPosition && state === 'off') {
			element.style.marginTop = captionPosition + 'em';
		} else {
			var timeOut = element.parentNode.className.match(/[0-9]+/);
			var existingClassName = instance.getOldClassName(element.parentNode, 'static-state');
			element.parentNode.className = existingClassName + "static-state";
			timeOut = parseInt(timeOut, 10);		
			if (!isNaN(timeOut)) {
				clearInterval(timeOut);
			}
		}
	};
	
	this.getOldClassName = function (element, modificationClass)  {
		var oldClass = '';
		if (element.className) {
			oldClass = element.className;
		} else {
			return oldClass;
		}
		var modifiedMatch = classNameRegex('(' + modificationClass + ')|(c-[0-9]+-c)');
		var newClass;
		if (modifiedMatch.test(oldClass))  {
			newClass = oldClass.replace(modifiedMatch, " ");
		} else {
			newClass = oldClass + " ";
		}
		return newClass;
	};
}

var caption = new Caption();
addEvent(window, "load", caption.init); 

// ------------------------- caption.js ends here -----------------------------
// ------------------------ clear.js starts here ------------------------------
addEvent(window, "load", handleText); 
function handleText ()  {
	if (!document.getElementsByTagName) return;
	var inputFields=document.getElementsByTagName('input');
	for (var i=0; i<inputFields.length; i++)  {
		if (inputFields[i].className.match(/\bsearch-field\b/))  {
			inputFields[i].onfocus= function () {
		
				clearText(this);
			}
			
			inputFields[i].onblur= function () {
			
				setText(this);
			}
			
		}
	}
	
}


function clearText (e)  {
	var curentText=e.value;
	var defaultText=e.getAttribute('title');
	if (curentText==defaultText) e.value ='';
	
}

function setText (e)  {
	var curentText=e.value;
	var defaultText=e.getAttribute('title');	
	if (curentText=='') e.value =defaultText;
}
// ------------------------- clear.js ends here -------------------------------
// --------------------- convert-png.js starts here ---------------------------
/*@cc_on @*/
/*@if (@_jscript_version <= 5.6)
// The above conditional compilation for IE is equivalent to
// a conditional comment in HTML of 'if lte IE 6'

addEvent(window, "load", doPng); 

function doPng()  {

	var pngsList=document.getElementsByTagName('img');
	
	var pngs = []
	forEachElementOf(pngsList, function(element) {
		pngs.push(element);
		});
	

	if(pngs.length==0) return;
	for(var i=0; i<pngs.length; i++){
	var parent=pngs[i].parentNode;
		if(pngs[i].src.match(/\.png$/) && !pngs[i].src.match("/reuters/")){
			var newImage=document.createElement("div");
			newImage.style.width=pngs[i].width+'px';
			newImage.style.height=pngs[i].height+'px';
			newImage.id=pngs[i].id;
			newImage.className=pngs[i].className;
			var mask=pngs[i].src;
			newImage.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+mask+"',sizingMethod='scale')";			
			parent.replaceChild(newImage, pngs[i]);
		}
		
	}
	
}
/*@end @*/
// ---------------------- convert-png.js ends here ----------------------------
// --------------------- font-sizer.js starts here ----------------------------
/*
	this script adjusts the font-size of the document in 10% increments.
	it checks for the sizing-widget id and then attaches click events 
	it also sets a cookie to rember the font size for 1 year form the last visit

*/

/*
	if javascript is turned off the links goto larger.html and smaller.html
	these pages should explain about what the widget is for and how to adjust 
	the font-size in the browser...
*/

addEvent(window, "load", fontSizer);
addEvent(window, "load", fontSizerSidebar);
addEvent(window, "load", setFontSize);


function fontSizer()
{
	if (!document.getElementById) return false;
	
	
	
	if(document.getElementById('larger') && document.getElementById('smaller'))  {
		var increase=document.getElementById('larger');
		var decrease=document.getElementById('smaller');
		
		increase.style.display="inline";
		decrease.style.display="inline";
		
		var myDate= new Date();
		expires=myDate.getFullYear()+1
		myDate.setFullYear(expires);
		expires='; expires='+myDate.toGMTString();
		
		increase.onclick= function() {
			//get the calculated font-size
			if (document.getElementsByTagName('body')[0].style.fontSize)  {
				var currentSize=document.getElementsByTagName('body')[0].style.fontSize;
				
				currentSize=currentSize.match(/([0-9]+)/);
				currentSize=(Number(currentSize[0])+10)+'%';

			}else{//no calculated font size so we are just starting
				var currentSize='110%';
			}
			
			document.getElementsByTagName('body')[0].style.fontSize=currentSize;
			document.cookie="fontSize="+currentSize+expires;
			return false;
		}
		
		decrease.onclick= function() {
			//get the calculated font-size
			if (document.getElementsByTagName('body')[0].style.fontSize)  {
				var currentSize=document.getElementsByTagName('body')[0].style.fontSize;
				currentSize=currentSize.match(/([0-9]+)/);
				currentSize=(Number(currentSize[0])-10);
				if (currentSize<60) currentSize=60;
				currentSize=currentSize+'%';
			}else{//no calculated font size so we are just starting
				var currentSize='90%';
			}
			document.getElementsByTagName('body')[0].style.fontSize=currentSize;
			document.cookie="fontSize="+currentSize+expires;
			return false;
			

		}
		
	
	}
}

function fontSizerSidebar()
{
	if (!document.getElementById) return false;
	
	
	
	if(document.getElementById('larger-sidebar') && document.getElementById('smaller-sidebar'))  {
		var increase=document.getElementById('larger-sidebar');
		var decrease=document.getElementById('smaller-sidebar');
		
		increase.style.display="inline";
		decrease.style.display="inline";
		
		var myDate= new Date();
		expires=myDate.getFullYear()+1
		myDate.setFullYear(expires);
		expires='; expires='+myDate.toGMTString();
		
		increase.onclick= function() {
			//get the calculated font-size
			if (document.getElementsByTagName('body')[0].style.fontSize)  {
				var currentSize=document.getElementsByTagName('body')[0].style.fontSize;
				
				currentSize=currentSize.match(/([0-9]+)/);
				currentSize=(Number(currentSize[0])+10)+'%';

			}else{//no calculated font size so we are just starting
				var currentSize='110%';
			}
			
			document.getElementsByTagName('body')[0].style.fontSize=currentSize;
			document.cookie="fontSize="+currentSize+expires;
			return false;
		}
		
		decrease.onclick= function() {
			//get the calculated font-size
			if (document.getElementsByTagName('body')[0].style.fontSize)  {
				var currentSize=document.getElementsByTagName('body')[0].style.fontSize;
				currentSize=currentSize.match(/([0-9]+)/);
				currentSize=(Number(currentSize[0])-10);
				if (currentSize<60) currentSize=60;
				currentSize=currentSize+'%';
			}else{//no calculated font size so we are just starting
				var currentSize='90%';
			}
			document.getElementsByTagName('body')[0].style.fontSize=currentSize;
			document.cookie="fontSize="+currentSize+expires;
			return false;
			

		}
		
	
	}
}

/*
	Get the cookie and set the adjusted font-size
*/

function setFontSize ()  {
	var cookies=document.cookie;
	var cookieList=cookies.split(';');
	var fontSize='';

	for ( var i=0; i<cookieList.length; i++)  {
		if (cookieList[i].match('fontSize')) fontSize=cookieList[i];
	}
		if (fontSize)  {	
			fontSize=fontSize.match((/([0-9]+\%)/))[0];
			document.getElementsByTagName('body')[0].style.fontSize=fontSize;
		}
		
}
// ---------------------- font-sizer.js ends here -----------------------------
// -----------------------formChecker.js starts here ------------------------------

function formChecker(elem, limit) {
var warning = document.getElementById('warning');
var charsLeft = limit-elem.value.length;
	warning.innerHTML=charsLeft + ' characters left';
	warning.className = "";
	if(elem.value.length>limit) {
	elem.value=elem.value.substring(0,limit);
	warning.innerHTML = "Max 250 characters";
	warning.className = "warning";
	elem.scrollTop = elem.scrollHeight - elem.clientHeight;
	}
}

function formCheckerSide(elem, limit) {
var warning = document.getElementById('warning-side');
var charsLeft = limit-elem.value.length;
	warning.innerHTML=charsLeft + ' characters left';
	warning.className = "";
	if(elem.value.length>limit) {
	elem.value=elem.value.substring(0,limit);
	warning.innerHTML = "Max 250 characters";
	warning.className = "warning";
	elem.scrollTop = elem.scrollHeight - elem.clientHeight;
	}
}

addEvent(window, "load", setUpGallery); 

function setUpGallery() {
	if(!document.getElementById || !document.getElementById("shower") || !document.getElementById("overlay-wrapper")) {
		return;
	}
	var maxOpacity = 90;
	var fader = maxOpacity; 
	var fadeInterval; //The Interval set by setInterval
	var overlayWrap = document.getElementById("overlay-wrapper");
	var overlay = document.getElementById("overlay");
	var controller = document.getElementById("shower");
	
	var guGallery = {
		init : function () {
			var overlayWidth = guGallery.calculateWidth();
			overlayWrap.style.width = overlayWidth + 'px';
			overlayWrap.style.display = "block";
			if (overlayWrap.filters) {
				overlay.style.width = (overlayWidth - 20) + 'px';
			}
			controller.onclick = guGallery.switchDisplay;
			guGallery.displayIsAvailable = true; 
		},
		
		calculateWidth : function () {
			var mainPicture = document.getElementById('main-picture');
			var width = mainPicture.width;
			if(width < 500) {
				return 250;
			} else {
				return 300;
			}
		},

		switchDisplay : function () {
			try {
				clearInterval (fadeInterval);
			}
			catch(e){}
			var state = overlayWrap.className;
			if(guGallery.displayIsAvailable) {
				fadeInterval = setInterval(fadeOut, 15);
				state = state.replace("gallery-on","gallery-off");
			} else {
				fadeInterval = setInterval(fadeIn, 15);
				state = state.replace("gallery-off","gallery-on");
			}
			overlayWrap.className = state;
			return false;
		}
	};
		
	function fadeOut() {
		setOpacity(fader);
		fader = fader - 1;
		if (fader < 0) {
			clearInterval (fadeInterval);
			overlay.style.opacity = -2;
			guGallery.displayIsAvailable = false;
		}
	}
	
	function fadeIn() {
		setOpacity(fader);
		fader = fader + 1;
		if (fader > (maxOpacity - 1)) {
			clearInterval (fadeInterval);
			guGallery.displayIsAvailable = true;
		}
	}
	
	function setOpacity(fader) {
		if(overlay.filters) {
			overlay.style.filter="progid:DXImageTransform.Microsoft.Alpha(opacity=" + fader + ")";
		} else {
			overlay.style.opacity = fader/100;
		}
	}
	
	guGallery.init();
}
function genericTabbing() {
	
	var toggles = $$ ? $$("ul.tab-toggle") : []; //Basically, do nothing if we don't have prototype.
	for (var p = 0; p < toggles.length; p++) {
		var activePaneSet = false;
		var anchors = toggles[p].getElementsByTagName("a");
		// Cache?
		for (var q = 0; q < anchors.length; q++) {
			addEvent(anchors[q], 'click', switchPanes);
			if ((!activePaneSet) && (!elementHasClassName(anchors[q], 'inactive'))) {
				showSelectedPane(anchors[q]);
				activePaneSet = true;
			}
		}
	}
	
	function switchPanes(event) {
		var clickElement = Event.element(event);
		showSelectedPane(clickElement);
		showSubNavigation(clickElement);
		setTabClasses(clickElement);
		event.stop();
	}
	
	function showSelectedPane(clickElement) {
		var selectedPaneId = clickElement.href.split('#')[1];
		var selectedPane = document.getElementById(selectedPaneId);
		if (selectedPane) {
			hideAllPanes(getAncestorOfType(clickElement, 'div'));
			selectedPane.style.display = 'block';
		}
	}

	function hideAllPanes(containingElement) {
		var paneClass = containingElement.id + '-pane';
		var panesList = getElementsByClassNameAndTagName(paneClass, containingElement, 'div');
		for (var i = 0; i < panesList.length; i++) {
			panesList[i].style.display = 'none';
		}
	}

	function setTabClasses(clickElement) {
		var allLinks = getAncestorOfType(clickElement, 'ul').getElementsByTagName('a');
		var inactiveClassName = "inactive";
		var classRegExp = classNameRegex(inactiveClassName);
		for (var ii = 0; ii < allLinks.length; ii++) {
			if (!elementHasClassName(allLinks[ii], inactiveClassName)) {
				allLinks[ii].className += " " + inactiveClassName;
			}
		}
		clickElement.className = removeClassName(clickElement, inactiveClassName).strip();
	}
	
	function showSubNavigation(clickElement) {
		// See the weather viewer @ twentyFourHourForecastDisplay to see how this works.
		// Basically give your previous and next anchors a 'rel' of prev or next
		// And this will dynamically rewrite the href to link to the correct page and 
		// will hide the links if there are no more pages in that direction. 
		// TODO: maxPaneNumber is hardcoded below. If this is required somewhere else,
		// consider using a variable to be passed in instead.
		if (clickElement.hasAttribute('rel')) {
			var newPane = clickElement.href;
			var newPaneNumber = parseInt(newPane.substring(newPane.length - 1), 10);
			var allAnchors = getAncestorOfType(clickElement, 'div').getElementsByTagName('a');
			var previousPaneNumber = newPaneNumber - 1;
			var nextPaneNumber = newPaneNumber + 1;
			var maxPaneNumber = 2;
			for (var i = 0; i < allAnchors.length; i++) {
				var link = allAnchors[i];
				var linkType = link.getAttribute('rel');
				if (linkType) {
					linkHref = link.href.substring(0, link.href.length - 1);
					switch (linkType) {
					case 'prev':
						link.href = linkHref + previousPaneNumber;
						link.style.display = (previousPaneNumber >= 0) ? 'block' : 'none';
						break;
					case 'next':
						link.href = linkHref + nextPaneNumber;
						link.style.display = (nextPaneNumber <= maxPaneNumber) ? 'block' : 'none';
						break;
					}
					
				}
			}
		}
	}
}

if (document.getElementById && document.getElementsByTagName) {
	addEvent(window, "load", genericTabbing);
}
/*
Pull down navigation handler

*/
addEvent(window, "load", GUgetUrl);

function GUgetUrl()  {
	if (!document.getElementById('go-to')) return;
	
	var myUrl=document.getElementById('go-to');
	for(var i=0; i<myUrl.length;i++)  {

		myUrl.onchange=function ()  {
						
			window.location=this.value;
		}
	}
	
	

}
// ------------------------ more.js starts here -------------------------------
addEvent(window, "load", more); 

function more()  {
	if(!document.getElementById) return;
	var target, idValue;
	var n=0;
	var more= new Array();
	
	var showers=document.getElementsByTagName('a');
	for (var i=0;i<showers.length; i++)  {

		target=showers[i].href;
		if(target.match(/#.*/))  {
		
			if(showers[i].className.match('shower'))  {
				
				
				showers[i].onclick=function (e, n)  {
					target=this.href;
					idValue=target.match(/#.*/);
					idValue=idValue.toString();
					idValue=idValue.replace('#','');
					more=document.getElementById(idValue);
					if (!this.className.match('open'))  {
						if(this.className)
							{
								var oldClassName=this.className;
								this.className=this.className+' open';
							}else{
								this.className="open"
							}
						more.style.display='block';
						if (!e) var e = window.event;
						if (e.clientY>120)
							{
									window.scrollBy(0,100);
							}
					}else{
						var oldClassName=this.className
						oldClassName=oldClassName.replace(/ ?open/,'');
						this.className=oldClassName;
						
						more.style.display='none';
						//this.className="closed";
					}
	
					return false;
				}
			}
		}
	}	
}

//event.clientY ie
// ------------------------- more.js ends here --------------------------------


// ------------------------ openCurrent.js starts here -------------------------------


function openCurrent()  {
	if(!document.getElementById) return;
	
	var current=document.getElementById('current');
	var par = current;
	while (par) {
		par = par.parentNode;
		if (par.id == "book-index" ) {
			var currentArrow = current.parentNode.parentNode.parentNode.firstChild.nextSibling.firstChild.nextSibling;
			var currentList = current.parentNode.parentNode.id;
			currentArrow.className+=' open';
			var lists=document.getElementsByTagName('ul');
			for ( var i = 0; i<lists.length; i++ ) {
				if ( lists[i].id.match(/drop*/) && lists[i].id !== currentList) {
					lists[i].style.display='none';
				}	
			}
			break;
		}
	}
}

// ------------------------- openCurrent.js ends here --------------------------------
// -------------------- post-load-images.js starts here ----------------------------

var postLoadImage = function postLoadImageFactory() {
    var imagesToLoad = {};
    
    function postLoadImage(elementId, url) {
        imagesToLoad[elementId] = url;
    }
    
    function loadImages() {
        for (var elementId in imagesToLoad) {
            if (imagesToLoad.hasOwnProperty(elementId)) {
                document.getElementById(elementId).src = imagesToLoad[elementId];
            }
        }
    }
    addEvent(window, "load", loadImages); 
    
    return postLoadImage;
}();

var applyImageMask = function applyImageMaskFactory() {
    var imagesToMask = {};
    
    function applyImageMask(elementId, maskName) {
        imagesToMask[elementId] = maskName;
    }
    
    function applyImageMasks() {
        for (var elementId in imagesToMask) {
            if (imagesToMask.hasOwnProperty(elementId)) {
	            var originalElement = document.getElementById(elementId);
	            var parentNode = originalElement.parentNode;
	            var parentNodeName = parentNode.nodeName;
	            if (parentNodeName.match(/^a$|^div/i) && parentNode.lastChild.className !== 'mask') {
	                var maskName = imagesToMask[elementId];
	                applyImageMaskImmediate(originalElement, maskName);
	            }
	        }
        }
    }
    addEvent(window, "load", applyImageMasks); 
    
    return applyImageMask;
}();

// -------------------- post-load-images.js ends here ----------------------------
// ---------------------- search-bg.js starts here ----------------------------
addEvent(window, "load", guWebSearch); 

function guWebSearch() {

    if(!document.getElementById('search-web') || !document.getElementById('web-search-field')) return;
    var radioButton=document.getElementById('search-web');
    var searchField = document.getElementById('web-search-field');
    
    document.getElementById('search-web').onclick = function () { doSearchBg(this); }
    
    document.getElementById('search-guardian').onclick =  function () { doSearchBg(this); }
    
    if(document.getElementById('search-section')) {
        document.getElementById('search-section').onclick =  function () { doSearchBg(this); }
    }
    
    
    function doSearchBg(elementRef) {
    
       if (elementRef.id!="search-web") {
      
            searchField.className = searchField.className.replace(/\bweb-search\b/, '');
       }else if(!searchField.className.match(/\bweb-search\b/)) {
            searchField.className = searchField.className + ' web-search';
       }
    }   
    
}
// ----------------------- search-bg.js ends here -----------------------------
// ----------------------- search.js starts here ------------------------------
function SearchForm(browseHost, commentsSearchBaseUrl, webSearchBaseUrl) {

	if (document.getElementById("search-pluck-comments") && document.getElementById("search-pluck-comments").selected)  {
		window.location = commentsSearchBaseUrl +  '?search=' + escape(document.getElementById('web-search-field').value);
		return false;
	}

	var that = this;
	this.browseHost = browseHost;
	this.webSearchBaseUrl = webSearchBaseUrl;

	var searchForm = document.getElementById("search");
	if(searchForm) {
		addEvent(searchForm, 'submit', checkSubmit);
	}
	
	function checkSubmit(e) {
		
		var textField = document.getElementById('web-search-field');
		var form = document.getElementById('search');
 			
		if (document.getElementById("search-web").selected || document.getElementById("search-web").checked) {
			_hbLink ('{header}{search-google}','{header}');
			textField.name = 'q';
			form.action = that.webSearchBaseUrl;
		} else if (document.getElementById("search-section") && document.getElementById("search-section").selected) {
			_hbLink ('{header}{search-section}','{header}');
			textField.name = 'search';
			form.action = that.browseHost + '/search/' + document.getElementById("search-section").value;
		} else {
			_hbLink ('{header}{search-gu}','{header}');
			textField.name = 'search';
			form.action =  that.browseHost +  '/search';
		}
				
		return;
	}
	
}
// ------------------------- search.js ends here ------------------------------
// ------------------------ sendtoafriend.js starts here -------------------------------

addEvent(window, "load", sendAndHistoryByline); 
addEvent(window, "load", sendtoafriend); 

function sendtoafriend() {

	var linkToBlockMapping = {'sharelink' : 'send-share', 'sendlink' : 'send-email', 'historylink' : 'history', 'contactlink' : 'contact', 'sharelinkSidebar' : 'send-share-side', 'sendlinkSidebar' : 'send-email-side', 'contactlinkSidebar' : 'contact-side'};
	var linksToAddListenersTo = [];
	var blocksAvailable = [];
	for (var map in linkToBlockMapping) {
		blocksAvailable.push(linkToBlockMapping[map]);
		var link = document.getElementById(map);
		if (link) {
			linksToAddListenersTo.push(link);
		}
	}
	function hideAllElements() {
		hideElements(blocksAvailable);
	}
	for (var i=0; i < linksToAddListenersTo.length; i++)  {
		linksToAddListenersTo[i].onclick = function (e)  {
			var showBox = linkToBlockMapping[this.id];
			showOrHideCurrentElement(showBox);
			var hideBoxes = blocksAvailable.without(showBox);
			hideElements(hideBoxes);
			var closeButtons = $$('.send a.sendthis', '.send a.sendside');
			for (var j = 0; j < closeButtons.length; j++) {
				addEvent(closeButtons[j], 'click', hideAllElements);
			}
			if (!e) var e = window.event;
			if (e.clientY > 500) {
				window.scrollBy(0,200);
			}
			setWmodeOfMovies();
			return false;
		}
	}
}

function hideElements(ids) {
	for (var i=0; i < ids.length; i++) {
		var element = document.getElementById(ids[i]);
		if (element) {
			element.style.display = 'none';
		}
	}
}

function showOrHideCurrentElement(elementId) {
	var element = document.getElementById(elementId);
	if (!element) {
		return;
	}
	if (element.style.display === 'block') {
		element.style.display = 'none';
	} else {
		element.style.display = 'block';
	}
}

function setWmodeOfMovies() {
	var movies = document.getElementsByTagName('object');
	for (var i = 0; i < movies.length; i++) {
	    var object = movies[i];
 	    if (!isIE6 && !isIE7) {
	    	object.innerHTML = object.innerHTML.replace('<embed', '<param name="wmode" value="opaque" /><embed wmode="opaque"');
	    } else {
		   	object.outerHTML = object.outerHTML.replace('<PARAM', '<param name="wmode" value="opaque" /><param');
	    }
	}
}

function getElementsByClass (node, tag, cssClassName)
{
	var classElements = new Array();
	if (node == null) 
	{
		node = document;
	}
	if ( tag == null)
	{
		tag = '*';
	}
	
	var tempObj = node.getElementsByTagName(tag);
	var length = tempObj.length;
	
	var pattern = new RegExp("\\b" +cssClassName+ "\\b");
	for(var i = 0; i < length; i++)
	{
		if (pattern.test(tempObj[i].className))
		{
			classElements.push(tempObj[i]);
		}
	}
	return classElements;
}

function sendAndHistoryByline() {

if ( (!document.getElementById("history-byline") ) && (!document.getElementById("contact-byline") ) ) return;

	var els = document.getElementsByClassName('article-attributes');
	var list, listLink;
	if(!els){return;}
		for (var i = 0; i < els.length; i++) {
			
			//Check if there is a li with an id="contrib-shift"
			var hasContribShift = document.getElementById('contrib-shift');
			
			if (!hasContribShift) {
				list = document.createElement('li');
				list.className = 'history';
				
				listLink = document.createElement('a');
				listLink.className = 'sendbyline';
				listLink.setAttribute('id', 'historylink-byline');
				listLink.style.cursor = "pointer";
				listLink.appendChild(document.createTextNode('Article history'));
				list.appendChild(listLink);
				
				els[i].appendChild(list);
			}
			else {
				var childUls = els[i].getElementsByTagName('ul');
				for (var i = 0; i < childUls.length; i++) {
					list = document.createElement('li');
					list.className = 'history';
					
					listLink = document.createElement('a');
					listLink.className = 'sendbyline';
					listLink.setAttribute('id', 'historylink-byline');
					listLink.style.cursor = "pointer";
					listLink.appendChild(document.createTextNode('Article history'));
					list.appendChild(listLink);
					
					childUls[i].appendChild(list);
				}
			}
	}
	
	var shares=document.getElementsByTagName('a');
	for (var i=0;i<shares.length; i++)  {
	var shareclass=shares[i].className;
		if(shareclass.match('sendbyline'))  {
			shares[i].onclick=function (e)  {
			if (this.id=="historylink-byline") {
				var clicked = document.getElementById('history-byline');
				if (clicked.style.display == "block") {
					clicked.style.display = "none";
				}
				else {
					clicked.style.display = "block";
					//document.getElementById("contact-byline").style.display = "none";
					if (!e) var e = window.event;
						if (e.clientY>500)
							{
									window.scrollBy(0,0);
							}
				}
				return false;
			}
			
			else if (this.id=="contactlink-byline") {
				var clicked = document.getElementById('contact-byline');
				if (clicked.style.display == "block") {
					clicked.style.display = "none";
				}
				else {
					clicked.style.display = "block";
					//document.getElementById("history-byline").style.display = "none";
					if (!e) var e = window.event;
						if (e.clientY>500)
							{
									window.scrollBy(0,0);
							}
				}
				return false;
			}
			
			else {
				document.getElementById("history-byline").style.display = "none";
				//document.getElementById("contact-byline").style.display = "none";
			}
		return false;
		}
	}
}
}


// ------------------------ sendtoafriend.js ends here -------------------------------

/* The toggleQuizAnswers function is specifically for showing / hiding quiz answers.
Ideally, put all show / hide type functions in this file, or just have one to do everything.
SU 21/04/2008 */



if (document.getElementById && document.getElementsByTagName) {
	addEvent(window, "load", toggleQuizAnswers);
}
	
	
function toggleQuizAnswers() {				
	
	if(document.getElementById('show-answers-link')) {			    
    	var theLink = document.getElementById('show-answers-link');
		theLink.onclick = function() {
			var className = document.getElementById('quiz-answers').className;		
			if (className.indexOf('js-hider') > -1) {			
				document.getElementById('quiz-answers').className = className.replace('js-hider', 'shower');
				theLink.innerHTML='Hide answers';
			} else {					
				document.getElementById('quiz-answers').className = className.replace('shower', 'js-hider');
				theLink.innerHTML = 'Show answers';
			}
		}
	}
}
// ---------------------- signedin.js starts here -----------------------------


function UrlStack(cookieDomain) {
	this.escapePlus = function (value) {
		return escape(value).replace(/\+/, "%2B");
	};	
	
	this.cookieDomain = cookieDomain;
}

UrlStack.prototype.getCookieForUrlStack = function (name) {
	if (!document.cookie) {
		return '';
	}
	var dc = document.cookie;
	var prefix = name + "=";
	var begin = dc.indexOf("; " + prefix);
	
	if (begin == -1) {
		begin = dc.indexOf(prefix);
		if (begin != 0) return null;
	} else
		begin += 2;

	var end = document.cookie.indexOf(";", begin);
	if (end == -1)
	end = dc.length;
	return unescape(dc.substring(begin + prefix.length, end));
}

UrlStack.prototype.setCookieForUrlStack = function (name, value) {
  var curCookie = name + "=" + this.escapePlus(value) +
      "; domain="+this.cookieDomain+"; path=/"
  document.cookie = curCookie;
}

UrlStack.prototype.pushUrlOntoStack = function(url) {
	var cookie = this.getCookieForUrlStack('GU_ST');
	var stack = cookie ? cookie.split('|') : new Array();

	if(stack.length == 0 || (stack.length > 0 && stack[stack.length-1] != url)) {
		stack[stack.length] = url;
		this.setCookieForUrlStack('GU_ST',stack.join('|'));
	}
	return true;
}
UrlStack.prototype.URLStack_pop = function() {
	var cookie = '|' + this.getCookieForUrlStack('GU_ST');
	var x = cookie.lastIndexOf('|');
	var url = cookie.substring(x + 1);
	this.setCookieForUrlStack('GU_ST',cookie.substring(0, x));
	return url;
}

UrlStack.prototype.clearUrlStack = function() {
	if (this.getCookieForUrlStack('GU_ST') != '') {
		this.setCookieForUrlStack('GU_ST','');
	}
}

function signIn() {
	urlStack.pushUrlOntoStack(document.location);
	window.location="/Users/signin/0,,-1,00.html";
	return false;
}

function register() {
	urlStack.pushUrlOntoStack(document.location);
	window.location="/Users/register/1,,-1,00.html";
	return false;
}

function signOut() {
    urlStack.pushUrlOntoStack(document.location);
    window.location = "/Users/signout/tr/1,,,00.html";
    return false;
}

// ----------------------- signedin.js ends here ------------------------------


function sportsTabs() {
	
	function init() {
		var uls = document.getElementsByTagName("ul");
		for (i = 0; i < uls.length; i++) {
			if (uls[i].className === "tab-toggle") {
				uls[i].onclick = handleClick;
				var anchors = uls[i].getElementsByTagName("a");
				var cookie = readCookie("sportsPopupTab");
				if (cookie) {
					for (var j = 0; j < anchors.length; j++) {
						if (anchors[j].href.split("#")[1] === cookie) {
							renderTabs(anchors[j]);
						}
					}
				}
				else {
					renderTabs(anchors[0]);
				}
			}
		}
	}
	if(document.body.id === "sports-popup") {
		init();
	}
	
	function handleClick(e) {
		var target;
		if (!e) {
			e = window.event;
		}
		if (e.target) {
			target = e.target;
		}
		else if (e.srcElement) {
			target = e.srcElement;
		}
		if (target.nodeType && target.nodeType === 3) {
			target = target.parentNode;
		}
		if (target.href) {
			createCookie("sportsPopupTab", target.href.split("#")[1], 7);
			renderTabs(target);
		}
		
		return false;
	}
	
	function renderTabs(target) {
		showTabPane(target);
		
		var allLinks = target.parentNode.parentNode.getElementsByTagName('a');
		for (var j = 0; j < allLinks.length; j++) {
			allLinks[j].className = "inactive";
		}
		var body = document.getElementsByTagName("body")[0];
		if (target.id === "cricket-live-score") {
			target.className = "active";
			body.className = "cricket cricket-score";
		}
		else {
			target.className = "";
			if (body.className.match(/cricket/)) {
				body.className = "cricket";
			}
		}
		
	}
	
	function showTabPane(e) {
		hideTabPane(e);
		var id = e.href.match(/#(\w.+)/)[1];
		var element = document.getElementById(id);
		if (element) {
			element.style.display = 'block';
		}
	}
	
	function hideTabPane(e) {
		var togglenode = e.parentNode.parentNode.parentNode;
		var toggleid = togglenode.id + '-pane';
		var toggleable = togglenode.getElementsByTagName('div');
		for (var i = 0; i < toggleable.length; i++) {
			var divClass = toggleable[i].className;
			if (divClass.match(toggleid)) {
				toggleable[i].style.display = 'none';
			}
		}
	}
}

if (document.getElementById && document.getElementsByTagName) {
	addEvent(window, "load", sportsTabs);
}
// ----------------- textresizedetector.js starts here ------------------------
/** 
 *  @fileoverview TextResizeDetector
 * 
 *  Detects changes to font sizes when user changes browser settings
 *  <br>Fires a custom event with the following data:<br><br>
 * 	iBase  : base font size  	
 *	iDelta : difference in pixels from previous setting<br>
 *  	iSize  : size in pixel of text<br>
 *  
 *  * @author Lawrence Carvalho carvalho@uk.yahoo-inc.com
 * @version 1.0
 *
 *	REQUIRED BY: zones-navigation-rollover
 */

/**
 * @constructor
 */
TextResizeDetector = function() { 
    var el  = null;
	var iIntervalDelay  = 200;
	var iInterval = null;
	var iCurrSize = -1;
	var iBase = -1;
 	var aListeners = [];
 	var createControlElement = function() {
	 	el = document.createElement('span');
		el.id='textResizeControl';
		el.innerHTML='&nbsp;';
		el.style.position="absolute";
		el.style.left="-9999px";
		var elC = document.getElementById(TextResizeDetector.TARGET_ELEMENT_ID);
		// insert before firstChild
		if (elC)
			elC.insertBefore(el,elC.firstChild);
		iBase = iCurrSize = TextResizeDetector.getSize();
 	};

 	function _stopDetector() {
		window.clearInterval(iInterval);
		iInterval=null;
	};
	function _startDetector() {
		if (!iInterval) {
			iInterval = window.setInterval('TextResizeDetector.detect()',iIntervalDelay);
		}
	};
 	
 	 function _detect() {
 		var iNewSize = TextResizeDetector.getSize();
		
 		if(iNewSize!== iCurrSize) {
			for (var 	i=0;i <aListeners.length;i++) {
				aListnr = aListeners[i];
				var oArgs = {  iBase: iBase,iDelta:((iCurrSize!=-1) ? iNewSize - iCurrSize + 'px' : "0px"),iSize:iCurrSize = iNewSize};
				if (!aListnr.obj) {
					aListnr.fn('textSizeChanged',[oArgs]);
				}
				else  {
					aListnr.fn.apply(aListnr.obj,['textSizeChanged',[oArgs]]);
				}
			}

 		}
 		return iCurrSize;
 	};
	var onAvailable = function() {
		
		if (!TextResizeDetector.onAvailableCount_i ) {
			TextResizeDetector.onAvailableCount_i =0;
		}

		if (document.getElementById(TextResizeDetector.TARGET_ELEMENT_ID)) {
			TextResizeDetector.init();
			if (TextResizeDetector.USER_INIT_FUNC){
				TextResizeDetector.USER_INIT_FUNC();
			}
			TextResizeDetector.onAvailableCount_i = null;
		}
		else {
			if (TextResizeDetector.onAvailableCount_i<600) {
	  	 	    TextResizeDetector.onAvailableCount_i++;
				setTimeout(onAvailable,200)
			}
		}
	};
	setTimeout(onAvailable,500);

 	return {
		 	/*
		 	 * Initializes the detector
		 	 * 
		 	 * @param {String} sId The id of the element in which to create the control element
		 	 */
		 	init: function() {
		 		
		 		createControlElement();		
				_startDetector();
 			},
			/**
			 * Adds listeners to the ontextsizechange event. 
			 * Returns the base font size
			 * 
			 */
 			addEventListener:function(fn,obj,bScope) {
				aListeners[aListeners.length] = {
					fn: fn,
					obj: obj
				}
				return iBase;
			},
			/**
			 * performs the detection and fires textSizeChanged event
			 * @return the current font size
			 * @type {integer}
			 */
 			detect:function() {
 				return _detect();
 			},
 			/**
 			 * Returns the height of the control element
 			 * 
			 * @return the current height of control element
			 * @type {integer}
 			 */
 			getSize:function() {
	 				var iSize;
			 		return el.offsetHeight;
		 		
		 		
 			},
 			/**
 			 * Stops the detector
 			 */
 			stopDetector:function() {
				return _stopDetector();
			},
			/*
			 * Starts the detector
			 */
 			startDetector:function() {
				return _startDetector();
			}
 	}
 }();

TextResizeDetector.TARGET_ELEMENT_ID = 'doc';
TextResizeDetector.USER_INIT_FUNC = null;



// ------------------ textresizedetector.js ends here -------------------------
// ------------------- textresizeinit.js starts here --------------------------
/*
	detect the users font size and adjust the layout appropriately
	
	REQUIRED BY: zones-navigation-rollover
*/
 	function init()  {
	   var iBase = TextResizeDetector.addEventListener(onFontResize,null);
	   var bodyTag = document.getElementById('wrapper');
	   if(bodyTag)  {
		   if (iBase>27)  {
				bodyTag.className='large-type';
			}
		}
	}
	//id of element to check for and insert control
	TextResizeDetector.TARGET_ELEMENT_ID = 'wrapper';
	//function to call once TextResizeDetector has init'd
	TextResizeDetector.USER_INIT_FUNC = init;
		function onFontResize(e,args) {
			// to aid navigation roll-overs
			zone_navigation_rollover.simpleNavResizer();
			// end of aid to navigaiton roll-overs
			var bodyTag = document.getElementById('wrapper');
			if(bodyTag){
				//27 is the last font size for the standard layout
				if (args[0].iSize>27)  {
					bodyTag.className='large-type';
				}
				if (args[0].iSize<26)
				{
					bodyTag.className='';
				}
			}
		}
// -------------------- textresizeinit.js ends here ---------------------------
// -------------------- togglingTabs.js starts here ---------------------------
addEvent(window, "load", tabs); 

function tabs()
{
	if(!document.getElementById('blogging-section')) return;
	
	if(!document.getElementById('most-commented-entries')){
		return;
	}
	
	document.getElementById('most-commented-entries').className = "active";
	
	var buttons=document.getElementById('blogging-section').getElementsByTagName('span');
	var bloggies=document.getElementById('blogging-section');
	
	for(var i=0; i<buttons.length; i++) {
		buttons[i].onclick= function (){
			var parent= this.parentNode
			if(this.id=="recent-entries") {
			
				this.className = "active";
				document.getElementById('most-commented-entries').className = "inactive";
			
				if(parent.getElementsByTagName('ul')[0].className.match(/\bhidden\b/)){
					toggleClass(parent);
					toggleClass(document.getElementById('most-commented-entries').parentNode);
				}
			} else {
				
				this.className = "active";
				document.getElementById('recent-entries').className = "inactive";
			
				if(parent.getElementsByTagName('ul')[0].className.match(/\bhidden\b/)){
					toggleClass(parent);
					toggleClass(document.getElementById('recent-entries').parentNode);
				}
		}
			
			function toggleClass(element){
						
				var currentClass=element.getElementsByTagName('ul')[0].className;
				if(currentClass.match(/\bvisible\b/)) currentClass=currentClass.replace(/visible/ , 'hidden');
				else if(currentClass.match(/\hidden\b/)) currentClass=currentClass.replace(/hidden/ , 'visible');	
				element.getElementsByTagName('ul')[0].className=currentClass;
			}

			
			
		}
	}
}
// -------------------- togglingTabs.js ends here ----------------------------





// -------------------- generic togglingTabs.js starts here ----------------------------

addEvent(window, "load", generictabs); 

function generictabs(activetab)
{
	if(!document.getElementById('tab-section')) return;
	
	document.getElementById('tab-default').className = "active";
	
	var buttons=document.getElementById('tab-section').getElementsByTagName('span');
	var bloggies=document.getElementById('tab-section');
	
	for(var i=0; i<buttons.length; i++) {
		buttons[i].onclick= function (){
			var parent= this.parentNode
			if(this.id=="tab-default") {
			
				this.className = "active";
				document.getElementById('tab-other').className = "inactive";
			
				if(parent.getElementsByTagName('ul')[0].className.match(/\bhidden\b/)){
					toggleClass(parent);
					toggleClass(document.getElementById('tab-other').parentNode);
				}
			} else {
				
				this.className = "active";
				document.getElementById('tab-default').className = "inactive";
			
				if(parent.getElementsByTagName('ul')[0].className.match(/\bhidden\b/)){
					toggleClass(parent);
					toggleClass(document.getElementById('tab-default').parentNode);
				}
		}
			
			function toggleClass(element){
						
				var currentClass=element.getElementsByTagName('ul')[0].className;
				if(currentClass.match(/\bvisible\b/)) currentClass=currentClass.replace(/visible/ , 'hidden');
				else if(currentClass.match(/\hidden\b/)) currentClass=currentClass.replace(/hidden/ , 'visible');	
				element.getElementsByTagName('ul')[0].className=currentClass;
			}

			
			
		}
	}
}

// -------------------- generic togglingTabs.js ends here ----------------------------
// -------------------- travel-mask.js starts here ----------------------------
function maskImages()  {
	var images = []; 
	// we need to copy the images into an array because the object returned from
	// getElementsByTagName is kept up to date - so as we add images, they appear
	// in the 'array', leading to repeated insertions.
	if(document.getElementsByTagName('body')[0].className.match('commercial'))  {
		forEachElementOf(document.getElementsByTagName('img'), function(image) {
			images.push(image);
		});
	} else {
		var divs = document.getElementsByTagName('div');
		forEachElementOf(divs, function (div) {
			if(div.className.match(/\bcommercial\b/))  {
				forEachElementOf(div.getElementsByTagName('img'), function(image) {
					images.push(image);
				});
			}
		});
	}
	
	var mask = /\bmask\b/;
	function imageDoesntAlreadyHaveOverlay(image) {
		if (image.nextSibling && image.nextSibling.className) {
			return ! image.nextSibling.className.match(mask);
		}
		return true;
	}
	
	forEachElementOf(images, function (image) {
		if (imageDoesntAlreadyHaveOverlay(image)) {
			applyImageMaskImmediate(image, 'roundedcorners');
		}
	});
}

addEvent(window, "load", maskImages);
// --------------------- travel-mask.js ends here -----------------------------
// ------------------------ ufo.js starts here --------------------------------
/*	Unobtrusive Flash Objects (UFO) v3.21 <http://www.bobbyvandersluis.com/ufo/>
	Copyright 2005, 2006 Bobby van der Sluis
	This software is licensed under the CC-GNU LGPL <http://creativecommons.org/licenses/LGPL/2.1/>
*/

var UFO = {
	req: ["movie", "width", "height", "majorversion", "build"],
	opt: ["play", "loop", "menu", "quality", "scale", "salign", "wmode", "bgcolor", "base", "flashvars", "devicefont", "allowscriptaccess", "seamlesstabbing", "allowfullscreen"],
	optAtt: ["id", "name", "align"],
	optExc: ["swliveconnect"],
	ximovie: "ufo.swf",
	xiwidth: "215",
	xiheight: "138",
	ua: navigator.userAgent.toLowerCase(),
	pluginType: "",
	fv: [0,0],
	foList: [],
		
	create: function(FO, id) {
		if (!UFO.uaHas("w3cdom") || UFO.uaHas("ieMac")) return;
		UFO.getFlashVersion();
		UFO.foList[id] = UFO.updateFO(FO);
		UFO.createCSS("#" + id, "visibility:hidden;");
		UFO.domLoad(id);
	},

	updateFO: function(FO) {
		if (typeof FO.xi != "undefined" && FO.xi == "true") {
			if (typeof FO.ximovie == "undefined") FO.ximovie = UFO.ximovie;
			if (typeof FO.xiwidth == "undefined") FO.xiwidth = UFO.xiwidth;
			if (typeof FO.xiheight == "undefined") FO.xiheight = UFO.xiheight;
		}
		FO.mainCalled = false;
		return FO;
	},

	domLoad: function(id) {
		var _t = setInterval(function() {
			if ((document.getElementsByTagName("body")[0] != null || document.body != null) && document.getElementById(id) != null) {
				UFO.main(id);
				clearInterval(_t);
			}
		}, 250);
		if (typeof document.addEventListener != "undefined") {
			document.addEventListener("DOMContentLoaded", function() { UFO.main(id); clearInterval(_t); } , null); // Gecko, Opera 9+
		}
	},

	main: function(id) {
		var _fo = UFO.foList[id];
		if (_fo.mainCalled) return;
		UFO.foList[id].mainCalled = true;
		document.getElementById(id).style.visibility = "hidden";
		if (UFO.hasRequired(id)) {
			if (UFO.hasFlashVersion(parseInt(_fo.majorversion, 10), parseInt(_fo.build, 10))) {
				if (typeof _fo.setcontainercss != "undefined" && _fo.setcontainercss == "true") UFO.setContainerCSS(id);
				UFO.writeSWF(id);
			}
			else if (_fo.xi == "true" && UFO.hasFlashVersion(6, 65)) {
				UFO.createDialog(id);
			}
		}
		document.getElementById(id).style.visibility = "visible";
	},
	
	createCSS: function(selector, declaration) {
		var _h = document.getElementsByTagName("head")[0]; 
		var _s = UFO.createElement("style");
		if (!UFO.uaHas("ieWin")) _s.appendChild(document.createTextNode(selector + " {" + declaration + "}")); // bugs in IE/Win
		_s.setAttribute("type", "text/css");
		_s.setAttribute("media", "screen"); 
		_h.appendChild(_s);
		if (UFO.uaHas("ieWin") && document.styleSheets && document.styleSheets.length > 0) {
			var _ls = document.styleSheets[document.styleSheets.length - 1];
			if (typeof _ls.addRule == "object") _ls.addRule(selector, declaration);
		}
	},
	
	setContainerCSS: function(id) {
		var _fo = UFO.foList[id];
		var _w = /%/.test(_fo.width) ? "" : "px";
		var _h = /%/.test(_fo.height) ? "" : "px";
		UFO.createCSS("#" + id, "width:" + _fo.width + _w +"; height:" + _fo.height + _h +";");
		if (_fo.width == "100%") {
			UFO.createCSS("body", "margin-left:0; margin-right:0; padding-left:0; padding-right:0;");
		}
		if (_fo.height == "100%") {
			UFO.createCSS("html", "height:100%; overflow:hidden;");
			UFO.createCSS("body", "margin-top:0; margin-bottom:0; padding-top:0; padding-bottom:0; height:100%;");
		}
	},

	createElement: function(el) {
		return (UFO.uaHas("xml") && typeof document.createElementNS != "undefined") ?  document.createElementNS("http://www.w3.org/1999/xhtml", el) : document.createElement(el);
	},

	createObjParam: function(el, aName, aValue) {
		var _p = UFO.createElement("param");
		_p.setAttribute("name", aName);	
		_p.setAttribute("value", aValue);
		el.appendChild(_p);
	},

	uaHas: function(ft) {
		var _u = UFO.ua;
		switch(ft) {
			case "w3cdom":
				return (typeof document.getElementById != "undefined" && typeof document.getElementsByTagName != "undefined" && (typeof document.createElement != "undefined" || typeof document.createElementNS != "undefined"));
			case "xml":
				var _m = document.getElementsByTagName("meta");
				var _l = _m.length;
				for (var i = 0; i < _l; i++) {
					if (/content-type/i.test(_m[i].getAttribute("http-equiv")) && /xml/i.test(_m[i].getAttribute("content"))) return true;
				}
				return false;
			case "ieMac":
				return /msie/.test(_u) && !/opera/.test(_u) && /mac/.test(_u);
			case "ieWin":
				return /msie/.test(_u) && !/opera/.test(_u) && /win/.test(_u);
			case "gecko":
				return /gecko/.test(_u) && !/applewebkit/.test(_u);
			case "opera":
				return /opera/.test(_u);
			case "safari":
				return /applewebkit/.test(_u);
			default:
				return false;
		}
	},
	
	getFlashVersion: function() {
		if (UFO.fv[0] != 0) return;  
		if (navigator.plugins && typeof navigator.plugins["Shockwave Flash"] == "object") {
			UFO.pluginType = "npapi";
			var _d = navigator.plugins["Shockwave Flash"].description;
			if (typeof _d != "undefined") {
				_d = _d.replace(/^.*\s+(\S+\s+\S+$)/, "$1");
				var _m = parseInt(_d.replace(/^(.*)\..*$/, "$1"), 10);
				var _r = /r/.test(_d) ? parseInt(_d.replace(/^.*r(.*)$/, "$1"), 10) : 0;
				UFO.fv = [_m, _r];
			}
		}
		else if (window.ActiveXObject) {
			UFO.pluginType = "ax";
			try { // avoid fp 6 crashes
				var _a = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");
			}
			catch(e) {
				try { 
					var _a = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");
					UFO.fv = [6, 0];
					_a.AllowScriptAccess = "always"; // throws if fp < 6.47 
				}
				catch(e) {
					if (UFO.fv[0] == 6) return;
				}
				try {
					var _a = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
				}
				catch(e) {}
			}
			if (typeof _a == "object") {
				var _d = _a.GetVariable("$version"); // bugs in fp 6.21/6.23
				if (typeof _d != "undefined") {
					_d = _d.replace(/^\S+\s+(.*)$/, "$1").split(",");
					UFO.fv = [parseInt(_d[0], 10), parseInt(_d[2], 10)];
				}
			}
		}
	},

	hasRequired: function(id) {
		var _l = UFO.req.length;
		for (var i = 0; i < _l; i++) {
			if (typeof UFO.foList[id][UFO.req[i]] == "undefined") return false;
		}
		return true;
	},
	
	hasFlashVersion: function(major, release) {
		return (UFO.fv[0] > major || (UFO.fv[0] == major && UFO.fv[1] >= release)) ? true : false;
	},

	writeSWF: function(id) {
		var _fo = UFO.foList[id];
		var _e = document.getElementById(id);
		if (UFO.pluginType == "npapi") {
			if (UFO.uaHas("gecko") || UFO.uaHas("xml")) {
				while(_e.hasChildNodes()) {
					_e.removeChild(_e.firstChild);
				}
				var _obj = UFO.createElement("object");
				_obj.setAttribute("type", "application/x-shockwave-flash");
				_obj.setAttribute("data", _fo.movie);
				_obj.setAttribute("width", _fo.width);
				_obj.setAttribute("height", _fo.height);
				var _l = UFO.optAtt.length;
				for (var i = 0; i < _l; i++) {
					if (typeof _fo[UFO.optAtt[i]] != "undefined") _obj.setAttribute(UFO.optAtt[i], _fo[UFO.optAtt[i]]);
				}
				var _o = UFO.opt.concat(UFO.optExc);
				var _l = _o.length;
				for (var i = 0; i < _l; i++) {
					if (typeof _fo[_o[i]] != "undefined") UFO.createObjParam(_obj, _o[i], _fo[_o[i]]);
				}
				_e.appendChild(_obj);
			}
			else {
				var _emb = "";
				var _o = UFO.opt.concat(UFO.optAtt).concat(UFO.optExc);
				var _l = _o.length;
				for (var i = 0; i < _l; i++) {
					if (typeof _fo[_o[i]] != "undefined") _emb += ' ' + _o[i] + '="' + _fo[_o[i]] + '"';
				}
				_e.innerHTML = '<embed type="application/x-shockwave-flash" src="' + _fo.movie + '" width="' + _fo.width + '" height="' + _fo.height + '" pluginspage="http://www.macromedia.com/go/getflashplayer"' + _emb + '></embed>';
			}
		}
		else if (UFO.pluginType == "ax") {
			var _objAtt = "";
			var _l = UFO.optAtt.length;
			for (var i = 0; i < _l; i++) {
				if (typeof _fo[UFO.optAtt[i]] != "undefined") _objAtt += ' ' + UFO.optAtt[i] + '="' + _fo[UFO.optAtt[i]] + '"';
			}
			var _objPar = "";
			var _l = UFO.opt.length;
			for (var i = 0; i < _l; i++) {
				if (typeof _fo[UFO.opt[i]] != "undefined") _objPar += '<param name="' + UFO.opt[i] + '" value="' + _fo[UFO.opt[i]] + '" />';
			}
			var _p = window.location.protocol == "https:" ? "https:" : "http:";
			_e.innerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' + _objAtt + ' width="' + _fo.width + '" height="' + _fo.height + '" codebase="' + _p + '//download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=' + _fo.majorversion + ',0,' + _fo.build + ',0"><param name="movie" value="' + _fo.movie + '" />' + _objPar + '</object>';
		}
	},
		
	createDialog: function(id) {
		var _fo = UFO.foList[id];
		UFO.createCSS("html", "height:100%; overflow:hidden;");
		UFO.createCSS("body", "height:100%; overflow:hidden;");
		UFO.createCSS("#xi-con", "position:absolute; left:0; top:0; z-index:1000; width:100%; height:100%; background-color:#fff; filter:alpha(opacity:75); opacity:0.75;");
		UFO.createCSS("#xi-dia", "position:absolute; left:50%; top:50%; margin-left: -" + Math.round(parseInt(_fo.xiwidth, 10) / 2) + "px; margin-top: -" + Math.round(parseInt(_fo.xiheight, 10) / 2) + "px; width:" + _fo.xiwidth + "px; height:" + _fo.xiheight + "px;");
		var _b = document.getElementsByTagName("body")[0];
		var _c = UFO.createElement("div");
		_c.setAttribute("id", "xi-con");
		var _d = UFO.createElement("div");
		_d.setAttribute("id", "xi-dia");
		_c.appendChild(_d);
		_b.appendChild(_c);
		var _mmu = window.location;
		if (UFO.uaHas("xml") && UFO.uaHas("safari")) {
			var _mmd = document.getElementsByTagName("title")[0].firstChild.nodeValue = document.getElementsByTagName("title")[0].firstChild.nodeValue.slice(0, 47) + " - Flash Player Installation";
		}
		else {
			var _mmd = document.title = document.title.slice(0, 47) + " - Flash Player Installation";
		}
		var _mmp = UFO.pluginType == "ax" ? "ActiveX" : "PlugIn";
		var _uc = typeof _fo.xiurlcancel != "undefined" ? "&xiUrlCancel=" + _fo.xiurlcancel : "";
		var _uf = typeof _fo.xiurlfailed != "undefined" ? "&xiUrlFailed=" + _fo.xiurlfailed : "";
		UFO.foList["xi-dia"] = { movie:_fo.ximovie, width:_fo.xiwidth, height:_fo.xiheight, majorversion:"6", build:"65", flashvars:"MMredirectURL=" + _mmu + "&MMplayerType=" + _mmp + "&MMdoctitle=" + _mmd + _uc + _uf };
		UFO.writeSWF("xi-dia");
	},

	expressInstallCallback: function() {
		var _b = document.getElementsByTagName("body")[0];
		var _c = document.getElementById("xi-con");
		_b.removeChild(_c);
		UFO.createCSS("body", "height:auto; overflow:auto;");
		UFO.createCSS("html", "height:auto; overflow:auto;");
	},

	cleanupIELeaks: function() {
		var _o = document.getElementsByTagName("object");
		var _l = _o.length
		for (var i = 0; i < _l; i++) {
			_o[i].style.display = "none";
			for (var x in _o[i]) {
				if (typeof _o[i][x] == "function") {
					_o[i][x] = null;
				}
			}
		}
	}

};

if (typeof window.attachEvent != "undefined" && UFO.uaHas("ieWin")) {
	window.attachEvent("onunload", UFO.cleanupIELeaks);
}
// ------------------------- ufo.js ends here ---------------------------------
// -------------------- update-content-mask.js starts here ----------------------------

function maskMediaImages() {
	// must do this because 'images' is dynamically updated by DOM - see travel-mask.js
    var images = document.getElementsByTagName('img');
    var imagesToProcess = [];
    forEachElementOf(images, function (image) {
        imagesToProcess.push(image);
    });

    var maskClass = /([a-zA-Z]+)-mask/;
    var anchorOrDiv = /^a$|^div/i;
    forEachElementOf(imagesToProcess, function (image) {
        var matchMaskClass = maskClass.exec(image.className); 
        if (matchMaskClass && image.parentNode.nodeName.match(anchorOrDiv)) {
            var maskName = matchMaskClass[1];
            applyImageMaskImmediate(image, maskName);
        }
    });

}

addEvent(window, "load", maskMediaImages);

// --------------------- update-content-mask.js ends here -----------------------------
// ----------------------- viewer.js starts here ------------------------------
//addEvent(window, "load", viewer); 

function viewer ()  {
	if(document.getElementById('also-on'))  {
		var alsoOn=document.getElementById('also-on');
	}else{
		return;
	}
	
//collections links li's images so on	
		
		var links=alsoOn.getElementsByTagName('a');
		var lists=alsoOn.getElementsByTagName('ul');
		
		var timerLeft='';
		var timerRight='';
		var listItemWidth=159;
		var currentNumber=0;

		for (var i=0; i<lists.length;i++)  {
				if(lists[i].className.match('viewer')) var viewer=lists[i];
			}

		var listItems=viewer.getElementsByTagName('li');
			
		for (var i=0; i<links.length; i++)  {
				
				if(links[i].className.match('right'))  {
					links[i].onclick= function () {
						clearInterval(timerLeft);//don't do more than 1 animation otherwise things can become very fast
						changeHref(-1);//not working properly not an issue yet (maybe never?)
						moveLeft();
						requestItem(0, 'end') ;//where to put the replacement element
	
					return false;//don't follow the link
					}
						
				}	

				if(links[i].className.match('left'))  {
					links[i].onclick= function () {
						clearInterval(timerRight);//don't do more than 1 animation otherwise things can become very fast
						changeHref(1);//not working properly not an issue yet (maybe never?)
						moveRight();
						requestItem(listItems.length-1, 'start');//where to put the replacement element
						return false;	//don't follow the link
					}
					
				}
				
			}

//doesn't work not a problem for the demo, but later may be.
	function changeHref(direction)  {
		var maxNumber=7;
	
		for (var j=0; j<links.length; j++)  {
			if (links[j].className.match('left'))  {
				//fix an off by one error 
				listItems[listItems.length-1].style.marginRight='-1px';
				var oldHref=links[j].href;
				var currentNumber=oldHref.match(/[0-9]+/);
				currentNumber=currentNumber-direction;//no need to cast since - is always subtraction

				links[j].href='pic'+currentNumber+'.html';
				
			}
			
			 if (links[j].className.match('right'))  {
			 	
			 	var oldHref=links[j].href;
				var currentNumber=oldHref.match(/[0-9]+/);
				currentNumber= Number(currentNumber)+direction;//cast the value as a number otherwise + is the concatenation operator :(

				links[j].href='pic'+currentNumber+'.html';
				
			 }
			
		}
	}
	
	
		function moveLeft()  {
			
			
			viewer.removeChild(listItems[0]);//make space for the new item
			
			listItems[0].style.marginLeft=listItemWidth+'px';//fill the space with a margin
			timerLeft=setInterval(leftMargin,1);//reduce the margin repeatedly every 0.001 second
		
	
	}

		function moveRight()  {
			
			viewer.removeChild(listItems[listItems.length-1]);//make space for the item
			listItems[0].style.marginLeft=0;//don't need a left margin
			timerRight=setInterval(rightMargin,1);//slide in the new item
			
	}

function leftMargin ()  {
	if(timerRight) clearInterval(timerRight);//if we're already moving stop
	var currentMargin=listItems[0].style.marginLeft;//get the current left margin of the first li
	
	currentMargin=currentMargin.match(/[-0-9]+/);//get the numeric value
	
	if(currentMargin>=10)
		{
			var newMargin=currentMargin-8;//if we are far from the end position reduce the margin by 4px
		}else{
			var newMargin=currentMargin-1;//if we are close do so by 1px
		}
	listItems[0].style.marginLeft=newMargin+'px';//set the margin on the first li
	
	if(newMargin==-1) clearInterval(timerLeft);//if left margin==-1 stop moving
		
	
}

function rightMargin ()  {

	if(timerLeft) clearInterval(timerLeft);//if we are already moving stop
	var currentMargin=listItems[0].style.marginLeft;// get the current left margin of li one
	
	currentMargin=currentMargin.match(/[-0-9]+/);//capture the numeric value of the margin
	if (currentMargin<=-10)
	{
		var newMargin=Number(currentMargin)+8;//if we are far from the end position increase the margin by 4px
	}else{
		var newMargin=Number(currentMargin)+1;//if we are close do so by 1px
	}
	listItems[0].style.marginLeft=newMargin+'px';//set the margin on the first li
	
	if(newMargin==-1) clearInterval(timerRight);//if left margin==-1 stop moving
		
		
		
}


function requestItem(count, start)  {
	var newItem=listItems[count].cloneNode(true);//copy the appropriate list item count is a global and is set in click
	
	if (start=='end')  {
		var newLi=viewer.appendChild(newItem);//add the new li at the end of the list
		newLi.style.marginRight='-1px';//set the styling
		newLi.style.marginLeft='0';
	}else{
	
		newItem.style.marginLeft='-'+listItemWidth+'px';//set the new li's left margin to be minus the width of an li
		var newLi=viewer.insertBefore(newItem, listItems[0]);//add the new li at the start of the list
		listItems[0].style.marginLeft='-'+listItemWidth+'px';//set the left margin to an li's width
		newLi.style.marginRight='-1px';
		
	}
	
	
}
}
// ------------------------ viewer.js ends here -------------------------------
/*
	this script shows the roll-overs for the crumb navigation

	if javascript is turned off no rollovers appear
	
	REQUIRES: textresizedetector and textresizeinit to run before this
	
*/

( function () {
	var timeout;
	
	function pollForLoad () {
		var crumbNav = document.getElementById("crumb-nav");
		if (crumbNav) {
			zone_navigation_rollover.setupNavRolloverEvents(crumbNav);
			clearInterval (timeout);
		}
	}

	timeout = setInterval(pollForLoad, 500);
} ) ();


zone_navigation_rollover = ( function () {
	var zone_navigation_rollover = {};
	
	function checkClass(navItem,class1) {
	      var regExpString = '\\b'+class1+'\\b';
	      var regularExpression = new RegExp(regExpString);
	      return regularExpression.test(navItem.className);
	}
	
	var currentPositionNames = [/\bfirst-end\b/, 
					/\bfirst-hover-end\b/,
					/\bfirst-end-hover\b/,
					/\bfirst-second\b/,
					/\bfirst-hover-second\b/,
					/\bfirst-second-hover\b/];
	var localNavItemMatcher = /\bfirst-local-item\b/;
					
	// this is used instead of getting the current background position as it is not reliably implemented across browser.
	var currentYPositions = [-13,-114,-215,-316,-417,-518];
					
	function removeClass(classes, className) {
  		for(var i=0; i<classes.length; i++){
  			if(classes[i] === className) {
  				classes.splice(i, 1);
  				return;
  			}
  		}
	}
	
	function addClass(classes, className) {
   		classes.push( className );
	}
	
	function determineChangesToSwapClassesOn(navItem,class1,class2){
		var classes = navItem.className.split(' ');
    	removeClass(classes, class1);
    	addClass(classes, class2);
    	var classString = classes.join(' ');
		
		var updateInfo = zone_navigation_rollover.determineBackgroundPositionAndPadding(classString);
		
    	updateInfo.className = classString;
    	
    	return updateInfo;
	}
		
	function eventProvider(navItem, thisClass, thisClassHover, previousNavItem, previousClass, previousClassHover) {
		
		//check for focus already
		navItem.focused = false;
		
		//accommodate the resizing of text
		var navItemInfo = zone_navigation_rollover.determineBackgroundPositionAndPadding(navItem.className);
		zone_navigation_rollover.updateNavItems(navItem, navItemInfo);
		
		navItem.hasFocus = function () { 
			return this.focused; 
		};
		
		navItem.onmouseover = function () {
			var navItemInfo, previousNavItemInfo;
			
			navItemInfo = determineChangesToSwapClassesOn(this, thisClass, thisClassHover);
			if (previousNavItem) { 
				previousNavItemInfo = determineChangesToSwapClassesOn( previousNavItem, previousClass, previousClassHover); 
			}
			
			zone_navigation_rollover.updateNavItems( navItem, navItemInfo, previousNavItem, previousNavItemInfo);
		};
		
		navItem.onmouseout = function () {
			var navItemInfo, previousNavItemInfo;
				
			if (!this.focused) {		 
				navItemInfo = determineChangesToSwapClassesOn( this, thisClassHover, thisClass);
				if (previousNavItem) { 
					previousNavItemInfo = determineChangesToSwapClassesOn( previousNavItem, previousClassHover, previousClass); 
				}
			
				zone_navigation_rollover.updateNavItems( navItem, navItemInfo, previousNavItem, previousNavItemInfo);
			}
		};
		navItem.onfocus = function () {
			var navItemInfo, previousNavItemInfo;
				
			this.focused = true;
			if (!checkClass(this, thisClassHover)) {
				navItemInfo = determineChangesToSwapClassesOn( this, thisClass, thisClassHover);
				if (previousNavItem) { 
					previousNavItemInfo = determineChangesToSwapClassesOn( previousNavItem, previousClass, previousClassHover);
				}
				
				zone_navigation_rollover.updateNavItems( navItem, navItemInfo, previousNavItem, previousNavItemInfo);
			}
		};
		navItem.onblur = function () {
			var navItemInfo, previousNavItemInfo;
				
			this.focused = false;
			navItemInfo = determineChangesToSwapClassesOn( this, thisClassHover, thisClass);
			if (previousNavItem) { 
				previousNavItemInfo = determineChangesToSwapClassesOn( previousNavItem, previousClassHover, previousClass); 
			}
			
			zone_navigation_rollover.updateNavItems( navItem, navItemInfo, previousNavItem, previousNavItemInfo);
		};
	}
	
	/* if the text size is different from normal, center the arrow. */
	zone_navigation_rollover.determineBackgroundPositionAndPadding = function(classString) {
		var textSize = Number(TextResizeDetector.getSize());
		var result = {};
		
		if (classString && textSize) {
			if (textSize < 40) {
					
				// 16px specified in base.css for navigation
				var yPosition = ((textSize - 16) / 2);
				var currentPlacementY = 0;
				
				for (var i = 0; i < currentPositionNames.length; i++) {
					if (currentPositionNames[i].test(classString)) {
						currentPlacementY = currentYPositions[i];
					}
				}
				
				var newYPosition = yPosition + currentPlacementY;
				result.backgroundPosition = "100% " + newYPosition + "px";
				
				// add a bit of padding when text size goes up
				var isLocalNavItem = localNavItemMatcher.test(classString);
			
				if (!isLocalNavItem) {
					if (textSize > 20) {
						result.paddingRight = "20px";
					} else if (textSize <= 20) {
						result.paddingRight = "15px";
					}
				} else {
					result.paddingRight = "5px";
				}
			} else { 
				result.backgroundPosition = "-460px 0";
				result.paddingRight = "5px";
			}
		}
		return result;
	};
	
	zone_navigation_rollover.updateNavItems = function(navItem, navItemInfo, previousNavItem, previousNavItemInfo) {
		navItem.style.backgroundPosition = navItemInfo.backgroundPosition;
    	navItem.className = navItemInfo.className ? navItemInfo.className : navItem.className;
		navItem.style.paddingRight = navItemInfo.paddingRight;
		if(previousNavItemInfo) {
			previousNavItem.style.backgroundPosition = previousNavItemInfo.backgroundPosition;
	    	previousNavItem.className = previousNavItemInfo.className;
			previousNavItem.style.paddingRight = previousNavItemInfo.paddingRight;
		}
	};
	
	zone_navigation_rollover.setupNavRolloverEvents = function(crumbNav) {
	
		var numOfCrumbs = 0;
		var previous = null;
		var crumb;
		var crumbs = crumbNav.getElementsByTagName('li');
		numOfCrumbs = crumbs.length;
		
		if (numOfCrumbs === 1) {
			/* the only one */
			crumb = crumbs[0].getElementsByTagName('a')[0];
			eventProvider(crumb, 'first-end', 'first-hover-end');
		}
		else if (numOfCrumbs > 1) {
			for(var i=0;i<numOfCrumbs;i++){
				crumb = crumbs[i].getElementsByTagName('a')[0];
				/* first and not the only one */
				if (i === 0) {
					eventProvider(crumb, 'first-second', 'first-hover-second');
				}	
				/* the last one */	
				if (numOfCrumbs === (i + 1)) {
					previous = crumbs[i - 1].getElementsByTagName('a')[0];	
					eventProvider(crumb, 'first-end', 'first-hover-end', previous, 'first-second', 'first-second-hover');
				}
				/* the second one of many */
				if (numOfCrumbs > 2 && i === 1) { 
					previous = crumbs[i - 1].getElementsByTagName('a')[0];	
					eventProvider(crumb, 'first-second', 'first-hover-second', previous, 'first-second', 'first-second-hover');
				}
			}
		}
		
		/* roll-over effect with tags on last crumb */
		var localNav = document.getElementById('local-nav');
		if (localNav) {
			var localNavItems = localNav.getElementsByTagName('a');
			var lastCrumb = crumbs[numOfCrumbs-1].getElementsByTagName('a')[0];
			if(lastCrumb){
				eventProvider(localNavItems[0],'first-local-item','first-local-item',lastCrumb,'first-end','first-end-hover');
			}
		}
	};
	
	/* textresizedetector notifies us of a text change so that we can change the arrow */
	zone_navigation_rollover.simpleNavResizer = function(){
		if (!document.getElementById) {
			return false;
		}
			
		var crumbNavItems = document.getElementById("crumb-nav") ? document.getElementById("crumb-nav").getElementsByTagName('a') : false;
		
		var textSize = Number(TextResizeDetector.getSize());
		var updateInfo;
		if (crumbNavItems) {
			for (var i = 0; i < crumbNavItems.length; i++) {
				if (Number(textSize) < 40) {
					updateInfo = zone_navigation_rollover.determineBackgroundPositionAndPadding(crumbNavItems[i].className);
				} else { 
					updateInfo = {};
					updateInfo.backgroundPosition = "-460px 0";
					updateInfo.paddingRight = "5px";
				}
				zone_navigation_rollover.updateNavItems(crumbNavItems[i], updateInfo);
			}
		}
	}
	
	return zone_navigation_rollover;
} ) ();


// ---------------------- zone-navigation-rollover.js ends here -----------------------------
