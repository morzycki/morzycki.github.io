//  Copyright (c) 2000-2004 ZEDO Inc. All Rights Reserved.
function F1(){
if(!q0){
var v0=(screen.height-300)/2;var y0=(screen.width-720)/2;
window.showModelessDialog("javascript:function B1(){return true;}var n1=window.open('"+r0+"','_blank','toolbar=no,resizable=yes,scrollbars=no,channelmode=no,directories=no,width=720,height=300,left="+y0+",top="+v0+",menubar=no,location=no');self.close();","","dialogtop:3000px;dialogleft:3000px;dialogheight:0px;dialogWidth:0px;status:no;help:no");
}
self.focus();
setTimeout('self.focus()',500);
setTimeout('self.focus()',1000);
setTimeout('self.focus()',1500);
}
function B0(){
var o0=navigator.userAgent.toLowerCase();var n0=(o0.indexOf('aol')!=-1);var w0=(o0.indexOf('netscape6/6.')!=-1);var c0=(o0.indexOf('netscape/7')!=-1);var d0=",width=720,height=300";
if(!n0&&!c0){
d0+=",left=3000,top=3000";
}
if(!w0){
d0+=",menubar=no,location=no";
}
else{
d0+=",menubar=no,location=yes";
}
var z0=window.open("about:blank","_blank","toolbar=no,resizable=yes,scrollbars=no,channelmode=no,directories=no"+d0);
if((z0!=null)&&(!z0.closed)){
if(!z0.closed&&!n0&&!c0){
z0.moveTo(Math.ceil((screen.availWidth-720)/ 2),Math.ceil((screen.availHeight-300)/ 2));
}
if(!z0.closed){z0.blur();}
self.focus();
if(z0){
z0.document.open();
z0.document.write('<scr'+'ipt language="javascript">');
z0.document.write('function U0(){window.opener.q0=1;location.href="'+r0+'";}');
z0.document.write('if(window.opener){setTimeout(\'U0()\',500);}');
z0.document.write('</scr'+'ipt>');
z0.document.close();
}}
if(z1){
setTimeout('F1()',2000);
}}
var q0=0;var r0="";var e1=((document.all)&&(navigator.appVersion.indexOf("MSIE 5.")!=-1))?true:false;var x0=((document.all)&&(navigator.appVersion.indexOf("MSIE 6.")!=-1))?true:false;var z1=e1||x0;
r0="http://c1.zedo.com/jsc/c1/ff2.html?n=162;c=1302/1;s=631;d=16;w=720;h=300;t=UndertoneNetworks.com-Advertisement";
B0();
