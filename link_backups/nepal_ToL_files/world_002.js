document.write('<!-- Template Id = 1 Template Name = Banner Creative (Flash) -->\n<!-- Copyright 2002 DoubleClick Inc., All rights reserved. --><script src=\"http://m.uk.2mdn.net/879366/flashwrite_1_2.js\"><\/script>');document.write('\n');
 
var dcswf = "http://m.uk.2mdn.net/720796/offers_SupSky.swf"; 
var dcgif = "http://m.uk.2mdn.net/720796/offers_SupSky.gif"; 
var advurl = "http://ad.uk.doubleclick.net/click%3Bh=v8/360c/3/0/%2a/j%3B116463337%3B0-0%3B0%3B12707968%3B2321-160/600%3B21669730/21687620/1%3B%3B%7Eaopt%3D2/1/b8/0%3B%7Esscs%3D%3fhttp://www.timesonline.co.uk/tol/tools_and_services/offers_and_promotions/";
var dcadvurl = escape(advurl);
var dcminversion = 6;
var dcmaxversion = 9;
var plugin = false;
var dccreativewidth = "160";
var dccreativeheight = "600";
var dcwmode = "opaque";
var dcbgcolor = "";

if (((navigator.appName == "Netscape") && (navigator.userAgent.indexOf("Mozilla") != -1) && (parseFloat(navigator.appVersion) >= 4) && (navigator.javaEnabled()) && navigator.mimeTypes && navigator.mimeTypes["application/x-shockwave-flash"] && navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin)) {
var plugname=navigator.plugins['Shockwave Flash'].description;var plugsub=plugname.substring(plugname.indexOf("."),-1); var plugsubstr=plugsub.substr(-1)
if( plugsubstr >= dcminversion) { plugin = true;}
}
else if (navigator.userAgent && navigator.userAgent.indexOf("MSIE")>=0 && (navigator.userAgent.indexOf("Opera")<0) && (navigator.userAgent.indexOf("Windows 95")>=0 || navigator.userAgent.indexOf("Windows 98")>=0 || navigator.userAgent.indexOf("Windows NT")>=0) && document.all) 
{
document.write('<script language=VBScript>' + '\n' +
   'dcmaxversion = '+dcmaxversion + '\n' +
   'dcminversion = '+dcminversion + '\n' +
   'Do' + '\n' +
    'On Error Resume Next' + '\n' +
    'plugin = (IsObject(CreateObject(\"ShockwaveFlash.ShockwaveFlash.\" & dcmaxversion & \"\")))' + '\n' +
    'If plugin = true Then Exit Do' + '\n' +
    'dcmaxversion = dcmaxversion - 1' + '\n' +
    'Loop While dcmaxversion >= dcminversion' + '\n' +
  '<\/script>');
}
if ( plugin )  {
 adcode = '<OBJECT classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+
  ' ID=FLASH_AD WIDTH="'+ dccreativewidth +'" HEIGHT="'+ dccreativeheight +'">'+
  '<PARAM NAME=movie VALUE="' + dcswf + '?clickTag='+ dcadvurl +'"><PARAM NAME=quality VALUE=high><PARAM NAME=bgcolor VALUE=#'+ dcbgcolor +'><PARAM NAME=wmode VALUE='+ dcwmode +'><PARAM NAME="AllowScriptAccess" VALUE="always">'+
  '<EMBED src="' + dcswf + '?clickTag='+ dcadvurl +'" quality=high wmode='+dcwmode+
  ' swLiveConnect=TRUE WIDTH="'+ dccreativewidth +'" HEIGHT="'+ dccreativeheight +'" bgcolor=#'+ dcbgcolor+
  ' TYPE="application/x-shockwave-flash" AllowScriptAccess="always"></EMBED></OBJECT>';
if(('j'!="j")&&(typeof dclkFlashWrite!="undefined")){dclkFlashWrite(adcode);}else{document.write(adcode);}
} else {
 document.write('<A TARGET="_blank" HREF="http://ad.uk.doubleclick.net/click%3Bh=v8/360c/3/0/%2a/j%3B116463337%3B0-0%3B0%3B12707968%3B2321-160/600%3B21669730/21687620/1%3B%3B%7Eaopt%3D2/1/b8/0%3B%7Esscs%3D%3fhttp://www.timesonline.co.uk/tol/tools_and_services/offers_and_promotions/"><IMG SRC="' + dcgif + '" BORDER=0></A>');
}
//-->

document.write('<NOSCRIPT><A TARGET=\"_blank\" HREF=\"http://ad.uk.doubleclick.net/click%3Bh=v8/360c/3/0/%2a/j%3B116463337%3B0-0%3B0%3B12707968%3B2321-160/600%3B21669730/21687620/1%3B%3B%7Eaopt%3D2/1/b8/0%3B%7Esscs%3D%3fhttp://www.timesonline.co.uk/tol/tools_and_services/offers_and_promotions/\"><IMG SRC=\"http://m.uk.2mdn.net/720796/offers_SupSky.gif\" BORDER=0></A></NOSCRIPT>');
