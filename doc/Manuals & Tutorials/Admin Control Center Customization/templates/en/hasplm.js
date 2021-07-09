/*
----------------------------------------------------------------------------------

(c) 2009 SafeNet, Inc., and/or Aladdin Knowledge Systems Ltd. All rights reserved.

$Id: hasplm.js,v 1.43 2010-07-16 11:55:30 axel Exp $

HASP LM - Admin Control Center

Use a whitespace character (blank, linefeed) after an opening {
to avoid misinterpretation as a tag.

----------------------------------------------------------------------------------
*/

var currline="#E0E0E0";
var normline="#F0F0F0";

var popWait=1000; /*msec*/

var counter=0;
var counter10th=0;
var countdown=-1;

var dataBusy    = false;
var dataUrl     = "";
var childWindow = 0;
var popTimer    = 0;
var connLost    = 0;
var cntBlink    = 0;
var colorBlink  = "#000000";

var glbLpp = 20;
var glbCnt = 0;
var glbFrom = 0;
var glbTo = 0;

var glbFilterHasp="0";
var glbFilterHaspName="";
var glbFilterFeature=-1;
var glbVendorId=0;
var glbProductId=0;
var glbPageRefresh=5;
var glbServerName="";
var confMenu="";

var emptyMD5 = "d41d8cd98f00b204e9800998ecf8427e";

/******************************************************************************/

if (document.layers) { navigator.family="nn4";}
if (document.all) { navigator.family="ie4";}
if (window.navigator.userAgent.toLowerCase().match("gecko")) { navigator.family="gecko";}

function popHide()
{
  if (popTimer) {
    clearTimeout(popTimer);
    popTimer=0;
  }
  if (navigator.family=="nn4") {
    eval(document.popup1.top="-500");
  }
  else if (navigator.family=="ie4") {
    popup1.innerHTML="";
  }
  else if (navigator.family=="gecko") {
    document.getElementById("popup1").innerHTML='';
    document.getElementById("popup1").style.top="-500";
  }
}

var popupX, popupY;


function popDly(txt)
{
  var bord,pad,desc;

  if (navigator.family == "gecko") {
   pad="0";
   bord="1 bordercolor=black";
  } else {
   pad="1";
   bord="0";
  }

  desc=
    '<table cellspacing=0 cellpadding='+pad+' border='+bord+' bgcolor="#000000">'+
    '<tr><td><table cellspacing=0 cellpadding=3 border=0 width="100%">'+
    '<tr><td bgcolor="#FCFA8B"><center><font size="-1">'+
    txt.replace(/%22/g, '"')+
    '</td></tr></table></td></tr></table>';
  desc=desc.replace(/%27/g, "'");

  if (navigator.family=="nn4") {
    document.popup1.document.write(desc);
    document.popup1.document.close();
    document.popup1.left=popupX+15;
    document.popup1.top=popupY+4;
  }
  else if (navigator.family=="ie4") {
    popup1.innerHTML=desc;
    popup1.style.pixelLeft=popupX+15;
    popup1.style.pixelTop=popupY+4;
  }
  else if (navigator.family=="gecko") {
    document.getElementById("popup1").innerHTML=desc;
    document.getElementById("popup1").style.left=popupX+15;
    document.getElementById("popup1").style.top=popupY+4;
  }
  
  bord=null;
  pad=null;
  desc=null;
}

function popText (txt)
{
  if (popTimer) { return;}

  if (!txt) {
    popHide();
    return;
  }

  if (!txt.length) {
    popHide();
    return;
  }

  popTimer=setTimeout("popDly(\"" + txt + "\")",popWait);
}

function popNum (ndx)
{
 switch (ndx) {
  case  0: popHide(); break;
  case  3: popText("Open the Admin Control Center on remote machine in new window <img src='newwin1.gif'>"); break;
  case  4: popText("Open the Admin Control Center on remote machine in new window and show the feature of this HASP&nbsp;key <img src='newwin1.gif'>"); break;
  case 10: popText("Display sessions related to this HASP&nbsp;key"); break;
  case 11: popText("Display all features of this HASP&nbsp;key"); break;
  case 12: popText("Stop the LED of this HASP&nbsp;key blinking"); break;
  case 13: popText("Blink the LED of this HASP&nbsp;key"); break;
  case 14: popText("Display the features of remote HASP&nbsp;key accessible by this License&nbsp;Manager"); break;
  case 15: popText("Display the features of this HASP&nbsp;key only"); return;
  case 16: popText("Display sessions logged onto this&nbsp;feature"); break;
  case 17: popText("Open SafeNet Inc. homepage<br>in new window <img src='newwin1.gif'>"); break;

  case 18: popText(
'<table cellpadding=2 border=0>'+
'<tr bgcolor=\'#DCDA7B\'><td colspan=2><b>Access is allowed from:</b></td></tr>'+
'<tr><td><b>Loc</b></td><td>Local Machine</td></tr>'+
'<tr><td><b>Net</b></td><td>Network Clients</td></tr>'+
'<tr><td><b>Disp</b></td><td>Terminal Server Display</td></tr>'+
'</table>'); break;

  case 19: popText(
'<table cellpadding=2 border=0>'+
'<tr bgcolor=\'#DCDA7B\'><td colspan=2><b>Count concurrent logins by:</b></td></tr>'+
'<tr><td><b>Process</b></td><td>Process</td></tr>'+
'<tr><td><b>Station</b></td><td>Station</td></tr>'+
'<tr><td><b>Login</b></td><td>Every login call is counted</td></tr>'+
'</table>'); break;

  case 20: popText("Go to top of this page"); break;
  case 21: popText("Activate and save changes"); break;
  case 22: popText("Reset changes to currently active settings"); break;
  case 23: popText("Reset to factory default settings.<br>You must then click <b>Submit</b><br>to activate and save those settings"); break;
  case 24: popText("Create/change password for modifying specified pages and deleting sessions"); break;
  case 25: popText("The firmware of this Sentinel HASP&nbsp;key is outdated. Only keys with firmware version 3.14 and above are supported by HASP License Manager."); break;
  case 26: popText("Display the Help for this page"); break;
  case 27: popText("Allowed&nbsp;number of concurrent&nbsp;uses"); break;
  case 28: popText("Disconnect session"); break;

  case 30: popText('Allow access from this&nbsp;IP&nbsp;address'); break;
  case 31: popText('Deny access from this&nbsp;IP&nbsp;address'); break;
  case 32: popText('Allow access from this machine&nbsp;name'); break;
  case 33: popText('Deny access from this machine&nbsp;name'); break;

  case 34: popText('Location of the HASP key'); break;
  case 35: popText('Client address'); break;

  case 36: popText('Allow access by this user'); break;
  case 37: popText('Deny access by this user'); break;
  case 38: popText('Allow access from this computer'); break;
  case 39: popText('Deny access from this computer'); break;
  case 40: popText('Allow access by this user from this computer'); break;
  case 41: popText('Deny access by this user from this computer'); break;
  case 42: popText('Feature is locked to hardware'); break;
  case 43: popText('Additional license restrictions, such as expiration date, execution count limit or trial'); break;
  case 44: popText("Generate a single-file HTML report<br>that can be viewed, saved, and mailed,<br>in a new window&nbsp;&nbsp;<img src='newwin1.gif'>"); break;

  case 45: popText('Select a date from calendar'); break;
  case 46: popText('Detach license with the parameters you entered'); break;
  case 47: popText("Don&#39;t detach license<br>Go back to products list"); break;
  case 48: popText('Upload a Recipient ID file. This ID is needed to detach a license.'); break;
  case 49: popText('Download H2R file containing the detached license.'); break;
  case 50: popText('Mail H2R file containing the detached license using your default mail client.'); break;

  case 51: popText('set date to tomorrow'); break;
  case 52: popText('set date to next sunday'); break;
  case 53: popText('Number of currently detached licenses'); break;
  case 54: popText('set date to next monday'); break;
  case 55: popText('Change reserved seats and maximum detach duration for this product'); break;
  case 56: popText('Create ID file for License Manager on this machine. ID file might be required to generate a detached license.'); break;

  case 57: popText('Detaching license impossible with current parameters'); break;
  case 58: popText('Reserved non-detachable licenses'); break;
  case 59: popText(
'Maximum number of days for which user can detach license. '+
'License is automatically restored to network after duration expiry.');
break;

  case 60: popText('Maximum number of days for which license can be detached'); break;
  case 61: popText('ID of HASP key from which license is being detached'); break;

  case 63: popText('Detach a license for this product. If a license is already detached for the selected recipient, that license will be extended.'); break;
  case 64: popText('Extend an existing Detached License.'); break;
  case 65: popText('Click here for a list of Detached Licenses for this Product.'); break;
  case 66: popText('Detached License count is not available for remote products.'); break;

  case 67: popText('Name of recipient computer'); break;
  case 68: popText('Machine Name of recipient computer defined in the Configuration page of Admin Control Center'); break;
  case 69: popText('Date of last Detach/Extend action'); break;
  case 70: popText('Date on which detached license expires and license is restored to the network pool on the host machine'); break;

  case 71: popText('Download C2V file containing acknowledge certificate'); break;

  case 72: popText('Feature is locked to HASP HL Key'); break;
  case 73: popText('Feature is locked to machine hardware'); break;
  case 74: popText('Downloads a file (C2V) confirming your update has been applied')  ; break;
  
  case 75: popText("Display all products of this HASP&nbsp;key"); break;


  default: popText(sprintf("Text %1 not defined.", ndx));
 }
}

/******************************************************************************/

var isNav;

function handlerMM(e)
{
  var maxx;

  if (navigator.family=="nn4") {
    maxx=window.innerWidth;
  } else if (navigator.family=="ie4") {
    maxx=document.body.offsetWidth;
  } else if (navigator.family=="gecko") {
    maxx=window.innerWidth;
  }

  /* beneath mouse ptr */
  if (isNav) {
    popupX=e.pageX;
    popupY=e.pageY;
  } else {
    popupX=event.clientX+document.body.scrollLeft;
    popupY=event.clientY+document.body.scrollTop;
  }

  if (maxx>150) { if (popupX>(maxx-150)) { popupX=maxx-150;}}
}

isNav = (navigator.appName.indexOf("Netscape") !=-1);
if (isNav) {
  if (navigator.family=="nn4") {
    document.captureEvents(Event.MOUSEMOVE);
  }
}

document.onmousemove=handlerMM;

/******************************************************************************/

function sprintf(s,a1,a2,a3,a4,a5,a6,a7,a8,a9)
{
  if (s==undefined) { return '';}

  if (a1!=undefined) { s=s.replace(/\%1/g, a1)}
  if (a2!=undefined) { s=s.replace(/\%2/g, a2)}
  if (a3!=undefined) { s=s.replace(/\%3/g, a3)}
  if (a4!=undefined) { s=s.replace(/\%4/g, a4)}
  if (a5!=undefined) { s=s.replace(/\%5/g, a5)}
  if (a6!=undefined) { s=s.replace(/\%6/g, a6)}
  if (a7!=undefined) { s=s.replace(/\%7/g, a7)}
  if (a8!=undefined) { s=s.replace(/\%8/g, a8)}
  if (a9!=undefined) { s=s.replace(/\%9/g, a9)}

  return s;
}


/******************************************************************************/

function getCookieByName(cn)
{
  var c_start,c_end;

  if (document.cookie.length>0) {
    c_start=document.cookie.indexOf(cn+'=');
    if (c_start!=-1) {
      c_start=c_start+1+cn.length;
      c_end=document.cookie.indexOf(";",c_start);
      if (c_end==-1) { c_end=document.cookie.length;}
      return unescape(document.cookie.substring(c_start,c_end));
    }
  }
  return null;
}


function setCookieByName(cn,val,expdays) /* expdays==0: end of session */
{
  if (!expdays) {
    document.cookie=cn+'='+escape(val)+"; path=/;";
  } else {
    var exdate=new Date();
    exdate.setDate(exdate.getDate()+expdays);
    document.cookie=cn+'='+escape(val)+"; path=/; expires="+exdate.toGMTString();
  }
}

/******************************************************************************/

function getLanguageCookie()
{
  return getCookieByName('hasplmlang');
}


function setLanguageCookie(val)
{
  setCookieByName('hasplmlang',val,365);
}

/******************************************************************************/

function clearPWCookie()
{
  document.cookie="hasplm=; path=/; expires=Thu, 01-Jan-70 00:00:01 GMT";
  glbAuth=0;
}

function getPWCookie()
{
  var s = getCookieByName('hasplm');
  if (!s) { return ""; }
  if (s.length!=32) { clearPWCookie(); return ""; }
  if (s==emptyMD5) { clearPWCookie(); return ""; }
  return s;
}

function setPWCookie(val)
{
  if (!val) { clearPWCookie(); return; }
  if (val.length!=32) { clearPWCookie(); return; }
  if (val==emptyMD5) { clearPWCookie(); return; }

  setCookieByName('hasplm',val,0); /* expires at end of session */
}



function clearAllCookies()
{
  clearPWCookie();
  document.cookie="hasplmlang=; path=/; expires=Thu, 01-Jan-70 00:00:01 GMT";
}

function doSetPW()
{
  var x;

  if ((x=document.getElementById('enteradminpass'))) {
    if (x.value) {
      setPWCookie(MD5(x.value));
      location.reload();
    } else {
      clearPWCookie();
    }
  }
}

/******************************************************************************/
/*@cc_on @if (@_win32 && @_jscript_version >= 5) if (!window.XMLHttpRequest)
function XMLHttpRequest() { return new ActiveXObject('Microsoft.XMLHTTP') }
@end @*/

function MyHttpObj()
{
  var http, ok = false;

  http = new XMLHttpRequest();
  if (!http) { return null;}

  this.connect = function(url,getpost,data,callback)
  {
    if (!http) { return false;}
    if (!url.length) { return false;}
    ok=false;
    getpost=getpost.toUpperCase();

    try {
      if (getpost=="GET") {
      http.open(getpost, url+"?"+data,true);
      data="";
    } else {
      http.open(getpost,url,true);
      http.setRequestHeader("Content-Type","text/plain");
    }
    http.setRequestHeader("If-Modified-Since","Sat, 1 Jan 2000 00:00:00 GMT");
    http.onreadystatechange=function() {
      if ((http.readyState==4) && (!ok)) {
        ok=true;
        callback(http);
      }
    };
    http.send(data);
    } catch(z) {
      return false;
    }
    return true;
  };

  return this;
}

var myHttp=new MyHttpObj();

/******************************************************************************/

function setDataUrl (s)
{
  dataUrl=s;
  if (glbPageRefresh>0) {
   countdown=glbPageRefresh*10;
  } else {
   countdown=-1;
  }
}


function switchDataUrl (s)
{
  popHide();
  setDataUrl(s);
  fill();
}


function setHelpUrl (s)
{
  var x;
  if ((x=document.getElementById('HelpLink'))) { x.href=s;}
}


function switchDataHelpUrl (sd, sh)
{
  popHide();
  setDataUrl(sd);
  setHelpUrl(sh);
  fill();
}

/******************************************************************************/

/* translations for strings received from LLM */
function tr(s)
{
  if (s.length > 2) {
   s=s.replace(/Perpetual/g, 'Perpetual');
   s=s.replace(/Disabled in VM/g, 'Disabled in VM');
   s=s.replace(/Time Period/g, 'Time Period');
   s=s.replace(/Time&nbsp;Period/g, 'Time Period');
   
   s=s.replace(/Expiration Date/g, 'Expiration Date');
   s=s.replace(/Expiration&nbsp;Date/g, 'Expiration Date');
   s=s.replace(/Executions/g, 'Executions');
   s=s.replace(/left/g, 'available');
   s=s.replace(/available/g, 'available');
   s=s.replace(/Unknown/g, 'Unknown');
   s=s.replace(/None/g, 'None');


   s=s.replace(/Not started/g, 'Not started');
   s=s.replace(/Not&nbsp;started/g, 'Not started');
   s=s.replace(/Start:/g, 'Start:');
   s=s.replace(/End:/g, 'End:');
   s=s.replace(/Unusable/g, 'Unusable');
   s=s.replace(/Days/g, 'Days');
   s=s.replace(/Hrs/g, 'Hours');
   s=s.replace(/All rights reserved./g, 'All rights reserved.');

   s=s.replace(/Jan /, 'Jan ');
   s=s.replace(/Feb /, 'Feb ');
   s=s.replace(/Mar /, 'Mar ');
   s=s.replace(/Apr /, 'Apr ');
   s=s.replace(/May /, 'May ');
   s=s.replace(/Jun /, 'Jun ');
   s=s.replace(/Jul /, 'Jul ');
   s=s.replace(/Aug /, 'Aug ');
   s=s.replace(/Sep /, 'Sep ');
   s=s.replace(/Oct /, 'Oct ');
   s=s.replace(/Nov /, 'Nov ');
   s=s.replace(/Dec /, 'Dec ');

   s=s.replace(/Sun /, 'Sun ');
   s=s.replace(/Mon /, 'Mon ');
   s=s.replace(/Tue /, 'Tue ');
   s=s.replace(/Wed /, 'Wed ');
   s=s.replace(/Thu /, 'Thu ');
   s=s.replace(/Fri /, 'Fri ');
   s=s.replace(/Sat /, 'Sat ');

  }
  return s;
}

/******************************************************************************/

function trAccCnt(s)
{
  if (s.length > 2) {
   s=s.replace(/Loc/g, 'Loc');
   s=s.replace(/Net/g, 'Net');
   s=s.replace(/Disp/g, 'Display');
   s=s.replace(/Login/g, 'Login');
   s=s.replace(/Station/g, 'Station');
   s=s.replace(/Process/g, 'Process');
  }
  return s;
}

/******************************************************************************/

function trUptime(s)
{
  if (s.length > 2) {
   s=s.replace(/days/g, 'days');
   s=s.replace(/hours/g, 'hours');
   s=s.replace(/minutes/g, 'minutes');
   s=s.replace(/seconds/g, 'seconds');
  }
  return s;
}

/******************************************************************************/

function normalizeFromTo ()
{
  if (glbLpp<5) { glbLpp=5;}
  if (glbLpp>100) { glbLpp=100;}
  while (glbFrom>glbCnt) { glbFrom-=glbLpp;}
  if (glbFrom<1) { glbFrom=1;}
  glbTo=glbFrom+glbLpp-1;
}


function normalizeGlb()
{
  normalizeFromTo();

  if (!glbFilterHasp.length) { glbFilterHasp="0";}
  if (glbFilterHasp.substr(0,1)=="-") { glbFilterHasp="0";}

  if (isNaN(glbFilterFeature)) { glbFilterFeature=-1;}
  if (glbFilterFeature>=0xFFFFFFFF) { glbFilterFeature=-1;}
}


/******************************************************************************/
/* basic helper functions                                                     */
/******************************************************************************/

function two0 (x)
{
  if (x<10) { return '0'+x;}
  return x;
}

/* convert date to ISO string (IE has problems with this) */
/* example: "Thu Feb 28 2008 14:05:47 GMT+0100"           */

var myMonth3Names=['Jan','Feb','Mar','Apr','May','Jun',
                   'Jul','Aug','Sep','Oct','Nov','Dec'];

var myDay3Names  =['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

function getDateISO(d)
{
  var ofs=d.getTimezoneOffset();
  var sign='+';
  if (ofs>0) { sign='-';} /* yes, >0 --> '-' */
  ofs=Math.abs(ofs);

  return myDay3Names[d.getDay()] + ' ' +
         myMonth3Names[d.getMonth()] + ' ' +
         two0(d.getDate()) + ' ' +
         d.getFullYear() + ' ' +
         two0(d.getHours()) + ':' +
         two0(d.getMinutes()) + ':' +
         two0(d.getSeconds()) +
         ' GMT' + sign + two0(Math.floor(ofs/60)) + two0(ofs%60);
}


function setProperty(prop,val,id) {
  var x=document.getElementById(id);
  if (x) {
    if (x.style) {
      x=x.style;
      x[prop]=val;
    }
  }
}


function getPosX(id) {
  var x=0;
  var e=document.getElementById(id);
  while (e) {
    x+=e.offsetLeft;
    e=e.offsetParent;
  }
  return x;
}



function getPosY(id) {
  var y=0;
  var e=document.getElementById(id);
  while (e) {
    y+=e.offsetTop;
    e=e.offsetParent;
  }
  return y;
}

/******************************************************************************/
/* write text to element "id" */
function wr (id, val)
{
  var x;
  if ((x=document.getElementById(id))) {
    x.innerHTML=val;
    return 1;
  }
  return 0;
}

/******************************************************************************/
/* show element "id" */
function show (id)
{
  var x;
  if ((x=document.getElementById(id))) {
    x.style.display='inline';
  }
}

/******************************************************************************/
/* hide element "id" */
function hide (id)
{
  var x;
  if ((x=document.getElementById(id))) {
    x.style.display='none';
  }
}

/******************************************************************************/
/* get value from an input field "id" */
function getValFromId (id)
{
  var x;
  if ((x=document.getElementById(id))) {
    return x.value;
  }
  return 0;
}

/******************************************************************************/
/* set browser title */
function setTitle (s)
{
 s="Sentinel HASP Admin Control Center: "+s.replace(/Help/g, 'Help');
 document.title=s.replace(/&#39;/g, "'");
}


/******************************************************************************/
/* set ACC page header */
function setHeader (s)
{
  if (s=='Help') { s='Admin Control Center Help'; };
/*  s=s.replace(/Help/g, 'Help');  */
  wr('myheader',
     '<font color="#FFFFFF">&nbsp;<big><b>'+s+'&nbsp;</b></big></font>');
}


/******************************************************************************/

function setInfo (s)
{
  wr('myinfo',s);
}

/******************************************************************************/

function setInfoTrLog(s)
{
  if (s.length > 2) {
    s=s.replace(/enabled/g, 'enabled');
    s=s.replace(/local/g, 'local');
    s=s.replace(/remote/g, 'remote');
    s=s.replace(/administrative/g, 'administrative');
    s=s.replace(/disabled/g, 'disabled');
  }
  wr('myinfo',s);
}


/******************************************************************************/
/* clear data area */
function clearData()
{
  setInfo('');
  wr('mydata','');
}

/******************************************************************************/
/* write 'please wait' message into data area */
function clearWait()
{
  setInfo("");
  wr('mydata','<br><br><b>Please wait ...</b>');
}

/******************************************************************************/
/* product admin functions */

function getOldVal (id)
{
  var x;
  if ((x=document.getElementById(id))) {
   x.innerHTML='<input type="text" id="i'+id+'" size="6" value="'+
               getValFromId('o'+id)+'">';
  }
}

function getProdStr (haspid,prid)
{
  return "productlist\n"+
    'haspid='+haspid+"\n"+
    'productid='+prid+"\n"+
    'detachmaxdays='+getValFromId('itime_acc'+haspid+'_'+prid)+"\n"+
    'reservedseats='+getValFromId('ireslic'+haspid+'_'+prid)+"\n"+
    'reservedpercent='+getValFromId('iresper'+haspid+'_'+prid)+"\n"+
    "/productlist\n";
}

function setProd (haspid,prid)
{
  var s=getProdStr(haspid,prid);
  doSubmitString(s);
  s=null;
}

function editProd (haspid,prid)
{
  var x;

  popHide();

  /* hide all prodadmin edit buttons */
  if ((x=document.getElementsByName('paedit'))) {
    var i;
    for (i=0;i<x.length;i++) {
      x[i].style.display='none';
    }
  }

  getOldVal('reslic'+haspid+'_'+prid);
  getOldVal('resper'+haspid+'_'+prid);
  getOldVal('time_acc'+haspid+'_'+prid);

  wr('act'+haspid+'_'+prid,
     '<a class="sbutton" href="javascript:setProd(\''+haspid+'\',\''+prid+'\')">&nbsp;Submit&nbsp;</a> '+
     '<a class="sbutton" href="javascript:switchDataUrl(\'tab_prodadm.html\')">&nbsp;Cancel&nbsp;</a>');

  wr('pa_debug','<pre>'+getProdStr(haspid,prid)+'</pre>');
}

/******************************************************************************/

function doBlink(onoff, haspid)
{
  doSubmitString('blink'+onoff+'='+haspid);
  clearData();
  setInfo('<br><br><br><br>');
  countdown=0;
}

function pageSet()
{
  if (glbFrom<1) { glbFrom=1;}
  glbTo=glbFrom+glbLpp-1;
  clearData();
  countdown=0;
}

function pageNext()
{
  glbFrom+=glbLpp;
  pageSet();
}

function pagePrev()
{
  glbFrom-=glbLpp;
  pageSet();
}

function pageTop()
{
  glbFrom=1;
  pageSet();
}

function pageEnd()
{
  glbFrom=glbCnt-glbLpp+1;
  pageSet();
}

function pageButtons ( itemname, colspan1, colspan2 )
{
  if ( (glbFrom>1) || (glbTo<glbCnt) || (!glbCnt) ) {

    var mx;
    var s='<tr height="25" valign="center">';

    if (glbCnt<1) {
      return s+'<td class="pad" colspan="'+(colspan1+colspan2)+
               '"><center>(table is empty)</center></td></tr>';
    }

    mx=glbTo;
    if (glbCnt<glbTo) { mx=glbCnt;}
    s+='<td class="pad" style="border-right:0px;" colspan="'+colspan1+'"><b>'+
       glbCnt+'</b> '+itemname+' '+
       sprintf('(%1 to %2 shown)',glbFrom,mx)+
       '</td>'+
       '<td class="padr" style="border-left:0px;" colspan="'+colspan2+'">';

    if (glbFrom > 1) {
      s+= '<a class="sbutton" href="javascript:pageTop()">'+
             '&nbsp;top of list&nbsp;</a>'+
          ' <a class="sbutton" href="javascript:pagePrev()">'+
             '&nbsp;&lt;&lt;&nbsp;prev page&nbsp;</a>';
    }

    if (glbTo < glbCnt) {
      s+=' <a class="sbutton" href="javascript:pageNext()">'+
             '&nbsp;next page&nbsp;&gt;&gt;&nbsp;</a> '+
         ' <a class="sbutton" href="javascript:pageEnd()">'+
             '&nbsp;end of list&nbsp;</a> ';
    }

    return s+"</td></tr>";

  } else {
    return "";
  }
}

/******************************************************************************/

function getNiceZero ( data )
{
  var v=parseInt(data);
  if (isNaN(v)) { return 'NaN';}
  if (v<1) { return "-";}
  return '<b>'+v+'</b>';
}


function askpwdel()
{
  glbPageRefresh=0;
  switchDataUrl('getpwdel.html');
}


/* wrap IPv6 in [], remove %n */
function makeLinkIP (s)
{
  var i, p;
  for (i=0;i<s.length;i++) {
    if (s.charAt(i) == '.') { return s;}
    if (s.charAt(i) == ':') {
      p=s.indexOf('%');
      if (p>0) { return '['+s.substr(0,p)+']';}
      return '['+s+']';
    }
  }
  return s;
}


/* format number in three-digit-groups, comma separated: 12345 -> 12,345 */
function sep3 ( s )
{
  var r='';
  var i,j=0;
  for (i=s.length;i>0;i--) {
    r=s.charAt(i-1)+r;
    if (i>1) {
      if (++j==3) {
        r=','+r;
        j=0;
      }
    }
  }
  return r;
}


function statLine (h,s)
{
  return '<tr><td valign="top" width="200">'+h+'</td><td><b>'+s+'</b></td></tr>';
}


function niceTime (unixtime)
{
  var d=new Date(0);
  d.setTime(unixtime*1000);
  return getDateISO(d);
}

/******************************************************************************/

function CheckoutObj()
{
  this.now=new Date();
  this.dtarget=new Date(0);
  this.dmax=new Date(0);
  this.online=true;         /* radio: online or offline */
  this.det=true;            /* radio: detach or extend */
  this.can_online=true;
  this.can_detach=true;
  this.can_extend=false;
  this.locations=[];
  this.prod=[];
  this.detached=[];
  this.guid='ERROR';
  this.firstYear=this.now.getFullYear();

  this.sortLocations=function(a,b)
  {
    if (a.fn.toLowerCase() < b.fn.toLowerCase()) { return -1;}
    if (a.fn == b.fn) { return 0;}
    return 1;
  };

  this.init=function()
  {
    var i,j,found;

    this.dtarget.setTime(
      this.now.getTime()+(1000*60*60*24));          /* tomorrow */

    /* calc max. time */
    this.dmax.setTime(
      parseInt(this.prod[0].time_acc)*1000*60*60*24 /* days --> msec */
      + this.now.getTime());                        /* +current time */

    if ( (parseInt(this.prod[0].isloc)) || (parseInt(this.prod[0].vdll)) ) {
      this.can_online=false;
      this.online=false;
      this.guid='ERROR';
    } else {
      this.can_online=true;
      this.online=true;
      this.guid='online';
    }

    /* remove { "0":"0"} */
    this.locations.splice(this.locations.length-1, 1);
    this.detached.splice(this.detached.length-1, 1);


    /* if no seats free, just display locations that can be extended */
    /* this is done by setting other locations guid to empty and let */
    /* them be cleared afterwards */
/* TD9088 @@@ */    if (0) {
/*    if (this.prod[0].seatsfree < 1) { */
      for (i=0;i<this.locations.length;i++) {
        found=false;
        for (j=0;j<this.detached.length;j++) {
          if (this.locations[i].guid == this.detached[j].guid) {
            found=true;
            break;
          }
        } /* for detached */
        if (!found) { this.locations[i].guid='';}
      } /* for locations */
    } /* if no seats free */

    /* remove locations with no or bad guid */
    found=true;
    while (found) {
      found=false;
      for (i=0;i<this.locations.length;i++) {
        if (this.locations[i].guid.length < 3) {
          this.locations.splice(i,1);
          found=true;
          break;
        }
      }
    }

    this.locations.sort(this.sortLocations);

    this.can_extend=((parseInt(this.prod[0].detc)>0) &&
                     (this.detached.length>0));

    this.can_detach=((parseInt(this.prod[0].seatsfree)>0) &&
                     (this.locations.length>0));
  }; /* init */


  this.getDetachedList=function()
  {
    var now=new Date();
    var utime;
    var i;

    utime = now.getTime() / 1000;

    var s='<br>'+
      '<table width="95%" border=1 rules="rows" frame="hsides" cellpadding="3" cellspacing="0">';

    s+='<tr><td width="120">Product</td><td><b>'+
         unescape(this.prod[0].prname)+
         '</b>&nbsp;(ID:'+this.prod[0].prid+')</td></tr>'+
       '<tr><td width="120">Vendor</td><td><b>'+
         unescape(this.prod[0].ven)+
         '</b>&nbsp;(ID:'+this.prod[0].vid+')</td></tr>'+

       '<tr onMouseOver="popNum(61)" onMouseOut="popHide()">'+
         '<td width="120">HASP&nbsp;Key</td><td><b>';

    if (this.prod[0].haspname != this.prod[0].haspid) {
      s+=unescape(this.prod[0].haspname)+
         '</b>&nbsp;(ID:'+this.prod[0].haspid+')</td></tr>';
    } else {
      s+=this.prod[0].haspid+'</b></td></tr>';
    }

    s+=
     '</table><br><b><font size="+1">'+
     'List of recipient machines to which detached licenses have been allocated:'+
     '</font></b><br>';

    if (!this.detached.length) {
      s+='<br><table><tr><td><font size="+1">'+
        '<b>No Detached Licenses for this Products found.</b>'+
        '</font></td></tr></table>';
    } else {
      s+='<br><table class="list">'+
        '<tr class="tableheader">'+
        '<td class="padr">#</td>'+
        '<td class="pad" onMouseOver="popNum(67)" onMouseOut="popHide()">Computer Name</td>'+
        '<td class="pad" onMouseOver="popNum(68)" onMouseOut="popHide()">Machine Name</td>'+
        '<td class="pad" onMouseOver="popNum(69)" onMouseOut="popHide()">Detach Date</td>'+
        '<td class="pad" onMouseOver="popNum(70)" onMouseOut="popHide()">Expiration Date</td>'+
        '</tr>';


    for (i=0; i<this.detached.length; i++) {
      s+= '<tr>'+
          '<td class="padr">'+(i+1)+'</td>'+
          '<td class="pad">'+this.detached[i].host + '</td>' +
          '<td class="pad">'+this.detached[i].fn + '</td>' +
          '<td class="pad">'+niceTime(this.detached[i].det) + '</td>' +
          '<td class="pad">';
          if (utime > this.detached[i].ex) {
            s+='<font color="#FF0000">('+
               niceTime(this.detached[i].ex) +
               ')</font>';
          } else {
            s+=niceTime(this.detached[i].ex);
          }
          s+='</td></tr>';
    }
    s+='</table>';
    }

    return s;
  }


  this.prodData=function(mode)   /* page head shows product data */
  {
    var s=
     '<tr><td width="120">Product</td><td><b>'+
        unescape(this.prod[0].prname)+
        '</b>&nbsp;(ID:'+this.prod[0].prid+')</td></tr>'+
     '<tr><td width="120">Vendor</td><td><b>'+
        unescape(this.prod[0].ven)+
        '</b>&nbsp;(ID:'+this.prod[0].vid+')</td></tr>';

   if (mode=='d') { /* show for detach only */
     s+='<tr><td width="120">Available&nbsp;Licenses&nbsp;&nbsp;</td><td><b>';

     if ( (this.prod[0].seatsfree >= 0) &&
          (this.prod[0].seatsfree < 0x0800000) ) {
       s+=this.prod[0].seatsfree+
          '</b> available for detaching';
     } else {
       s+='unlimited</b>';
     }

/*
     if (this.prod[0].seatsfree < 1) {
       s+=' (only License Extension is possible)';
     }
*/
     s+='</td></tr>'+
        '<tr onMouseOver="popNum(60)" onMouseOut="popHide()">'+
          '<td width="120">Max. Duration</td><td><b>'+
           this.prod[0].time_acc+'</b> days</td></tr>';
   }
         
   s+='<tr onMouseOver="popNum(61)" onMouseOut="popHide()">'+
        '<td width="120">HASP&nbsp;Key</td><td><b>';

   if (this.prod[0].haspname != this.prod[0].haspid) {
     s+=unescape(this.prod[0].haspname)+
        '</b>&nbsp;(ID:'+this.prod[0].haspid+')</td></tr>';
   } else {
     s+=this.prod[0].haspid+'</b></td></tr>';
   }

   if (mode=='c') {
     s+='<tr><td width="120">Expiration Date</td><td><b>'+
       niceTime(this.prod[0].exp)+
       '</b></td></tr>';

     s+='<tr><td width="120">Parent Key</td><td><b>';
     if (this.prod[0].parentname != this.prod[0].parentid) {
       s+=unescape(this.prod[0].parentname)+
          '</b>&nbsp;(ID:'+this.prod[0].parentid+')</td></tr>';
     } else {
       s+=this.prod[0].parentid+'</b></td></tr>';
     }
   }

   s+='<tr><td width="120">License Host</td><td>';

   if (mode=='c') {
      if (parseInt(this.prod[0].parentavail)) {
        if (parseInt(this.prod[0].parentisremote)) {
          s+='<b>'+this.prod[0].parenthostname+'</b>';
          if (this.prod[0].parentaddr.length > 0) {
            s+=' ('+this.prod[0].parentaddr+')';
          }
        } else {
          s+='<b>Local</b>';
        }
      } else {
        s+='No access to parent key. R2H file must be transferred manually&nbsp;';
      }
    }

   if (mode=='d') {
      if (parseInt(this.prod[0].isloc)) {
        s+='<b>Local</b> (only offline detach is possible)';
      } else {
        s+='<b>'+unescape(this.prod[0].loc)+'</b>&nbsp;';
      }
    }

    return s+'</td></tr>';
  }; /* prodData */


  this.setOnline = function(what)
  {
    this.online=what;
    this.draw();
  }

  this.onoffline = function()
  {
    var i,j,vdll,vdlltxt;
    var s=
     '<tr><td colspan=2><b><font size="+1">Detach Method:</font></b><br>'+
      '<center><table width="98%"><tr><td id="co_onl_text" colspan=3>'+
      '<input type="radio" id="co_onl" name="checkoutmethod" value="online" '+
             'onClick="coo.setOnline(true)"';
     if (this.online) { s+=' checked="checked"';}

     if (this.can_online) {
       s+='><b>Online</b>'+
          ' Detach license from '+unescape(this.prod[0].loc)+
          ' and automatically attach it to '+unescape(this.servername);
     } else {
       s+=' disabled><font color="#A0A0A0"><b>Online</b></font>';
     }

     if (!parseInt(this.prod[0].isloc)) {
       vdll=parseInt(this.prod[0].vdll);
       if (vdll==222) vdll=41; /* feature expired - TD#10531 */
       if (vdll) {
         s+='</td></tr><tr><td width="70">&nbsp;</td>'+
            '<td colspan=2><table><tr><td>'+
            '<font color="#FF0000">';
         switch (vdll) {
           case 48: s+='Online Detach is not possible because Vendor Library is missing';
                    break;
           default: s+='Online Detach is not possible because of Vendor Library error '+vdll+': '+
                    getHaspError(vdll).replace(/;/, ' - ');
         } /* switch vdll */
         s+=' ('+unescape(this.servername)+').</font></td></tr></table>';
       } /* if vdll */
     }

     s+='</td></tr>'+
        '<tr><td colspan=3>'+
        '<input type="radio" id="co_offl" name="checkoutmethod" value="offline" '+
               'onClick="coo.setOnline(false)"';
     if (!this.online) { s+=' checked="checked"';}
     s+='><b>Offline</b> '+
     'Detach license as an H2R file for use on the recipient machine selected below'+
     '</td></tr><tr><td width="70">&nbsp;</td>'+

     '<td colspan=2><table width="600"><tr>';

    if (this.online) {
      s+='<td valign="top"><font color="#A0A0A0">Select Recipient Machine:&nbsp;</font></td>'+
         '<td valign="top" width="400"><select id="co_seldet" onChange="coCalc()" disabled>';
    } else {
      s+='<td valign="top">Select Recipient Machine:&nbsp;</td>'+
         '<td valign="top" width="400"><select id="co_seldet" onChange="coCalc()">';
    }

     for (i=0; i<this.locations.length; i++) {
       s+='<option>'+this.locations[i].fn+'</option>';
     }
     s+='</select>&nbsp;</td></tr>'+
      '<tr><td valign="top"><span id="co_txtext">&nbsp;</span></td>'+
          '<td valign="top"><span id="co_infoext">&nbsp;</span></td>'+
      '</tr></table>'+

      '</tr></table></center><br></td></tr>';

    return s;
  }; /* onoffline */

  this.enterDate=function()
  {
    var i,j,bname;
    var s=
     '<tr><td colspan=2><b><font size="+1">'+
     'Specify Expiration Date for Detached License:</font></b><br><br>'+
     '<table cellpadding=3 cellspacing=0>'+
       '<tr id="co_tr_da" onClick="coCalc();">'+
        '<td>&nbsp;&nbsp;&nbsp;Day:</td>'+
        '<td width="60"><select id="co_dateday" onChange="coCalc();">';

    for (i=1; i<=31; i++) {
      if (i==this.dtarget.getDate()) {
        s+='<option selected>'+i+'</option>';
      } else {
        s+='<option>'+i+'</option>';
      }
    }

    s+='</select></td><td>Month:</td>'+
       '<td width="60"><select id="co_datemonth" onChange="coCalc();">';

    for (i=1; i<=12; i++) {
      if (i==this.dtarget.getMonth()+1) {
        s+='<option selected>'+i+'</option>';
      } else {
        s+='<option>'+i+'</option>';
      }
    }

    s+='</select></td><td>Year:</td>'+
       '<td width="80"><select id="co_dateyear" onChange="coCalc();">';

    j=this.firstYear;
    for (i=j; i<=j+26; i++) {
      if (i==this.firstYear) {
        s+='<option selected>'+i+'</option>';
      } else {
        s+='<option>'+i+'</option>';
      }
    }

    s+='</select></td>'+
        '<td>&nbsp;&nbsp;&nbsp;'+
         '<a id="calbtn" class="button" HREF="#" onClick="cal.show(\'calbtn\');">'+
         '&nbsp;<img src="calendar.gif" border="0">'+
         '&nbsp;Select from calendar&nbsp;</a>'+
         '<iframe id="calframe" src="javascript:false;" frameborder="0" scrolling="no"></iframe>'+
         '<div id="caldiv"></div>'+
        '</td></tr></table>';

    if (this.online) {
      bname='Detach&nbsp;&amp;&nbsp;Attach';
    } else {
      bname='Detach';
    }

    s+=
     '&nbsp;&nbsp;&nbsp;&nbsp;'+
     '<span id="co_abovelimit" class="bad">co_abovelimit&nbsp;</span>'+
     '</td></tr><tr><td colspan=2 align="center">'+

      '<span id="co_co_button">'+
        '<a class="button" id="buttondet" '+
           'onMouseOver="popNum(46)" onMouseOut="popHide()" '+
           'href="javascript:doCheckout(\''+
                         this.prod[0].haspid+'\',\''+
                         this.prod[0].vid+'\',\''+
                         this.prod[0].prid+'\')">&nbsp;'+bname+'&nbsp;</a></span>'+
      '<span id="co_co_buttondis">'+
        '<a class="buttondis" '+
           'onMouseOver="popNum(57)" onMouseOut="popHide()" '+
           'href="#">&nbsp;'+bname+'&nbsp;</a></span>'+
        '<a class="button" '+
           'onMouseOver="popNum(47)" onMouseOut="popHide()" '+
           'href="products.html">&nbsp;Cancel&nbsp;</a></td></tr>';

    if (axel) { s+='<tr><td id="co_debug" colspan=2>@@@ DEBUG: </td></tr>';}

    s+='</td></tr>';
    return s;
  }; /* enterDate */

  this.calc = function()
  {
  };


  this.sessions = function()
  {
    var s,sess;

    s='<tr><td valign="top" width="120">Current Sessions</td><td>';
    
    sess=parseInt(this.prod[0].sesc);

    if (sess>0) {
     s+='<table border="0" cellpadding="0" cellspacing="0" width="100%">'+
     '<tr><td><b>'+sess+'</b></td><td align="right">'+
      '<nobr><a class="button" '+
      'onMouseOver="popNum(57)" onMouseOut="popHide()" '+
      'href="sessions.html?haspid='+this.prod[0].haspid+
      '">&nbsp;Show Sessions&nbsp;</a></nobr>'+
     '</td></tr></table>'+
        '<font color="FF0000">Warning: Cancelling '+
        'the license will also cancel these sessions immediately!</font>';
    } else {
      s+='none';
    }
    s+='</td></tr>';

    return s;
  };

  this.cancelButtons = function()
  {
    var s='<tr><td colspan=2 align="center">'+
      '<nobr><a class="button" '+
      'onMouseOver="popNum(57)" onMouseOut="popHide()" '+

      'href="javascript:doCancel(\''+
                         this.prod[0].haspid+'\',\''+
                         this.prod[0].vid+'\',\''+
                         this.prod[0].prid+'\')">'+

      '&nbsp;Cancel License&nbsp;</a></span></nobr> '+
      '<nobr><a class="button" '+
      'onMouseOver="popNum(57)" onMouseOut="popHide()" '+
      'href="products.html">&nbsp;Keep License&nbsp;</a></span></nobr>'+
/* maybe add prod filter to products.html */
      '</td></tr>';
    return s;
  };


  this.getContent=function(mode)
  {
    this.calc();

    var myTable=
     '<table width="95%" border=1 rules="rows" frame="hsides" cellpadding="3" cellspacing="0">';

    if (mode=='c') {
      return '<br>'+myTable+
             this.prodData(mode)+
             '</table><br><br>'+
             myTable+
             this.sessions()+
             '</table><br><br>'+
             myTable+
             this.cancelButtons()+
/*             this.onoffline()+   */
/*             this.enterDate()+   */
             '</table>';
    }
    return '<br>'+myTable+
           this.prodData(mode)+
           '</table><br><br>'+
           myTable+
           this.onoffline()+
           this.enterDate()+
           '</table>';
  };

  this.draw=function()
  {
    var x;
    if ((x=document.getElementById('mydata'))) {
      x.innerHTML=this.getContent();
      coCalc();
    }
  };

}

var coo=new CheckoutObj();

/******************************************************************************/

function setSubLogColor(c,d)
{
  var target=document.getElementById("loglocalC");
  if (target) { target.style.color=c;}
  target=document.getElementById("loglocal");
  if (target) { target.disabled=d;}

  target=document.getElementById("logremoteC");
  if (target) { target.style.color=c;}
  target=document.getElementById("logremote");
  if (target) { target.disabled=d;}

  target=document.getElementById("logadminC");
  if (target) { target.style.color=c;}
  target=document.getElementById("logadmin");
  if (target) { target.disabled=d;}
}

/******************************************************************************/

function checkLogFile()
{
  var src=document.getElementById("dolog");

  if (src) {
    if (src.checked) {
      setSubLogColor("#000000",false);
    } else {
      setSubLogColor("#A0A0A0",true);
    }
 }
}

/******************************************************************************/

function addConfMenu (sel,wid,menu,page)
{
  if (sel) {
    return ' <td class="selectedtab" width="'+wid+'" align="center">&nbsp;'+
           menu+'&nbsp;</td>';
  } else {
    return '<td class="tab" width="'+wid+'" align="center" '+
           'onMouseOver="this.style.backgroundColor=\'#808080\','+
           'this.style.cursor=\'pointer\','+
           'this.style.color=\'#FFFFFF\'" '+
           'onMouseOut="this.style.backgroundColor=\'#D0D0D0\','+
           'this.style.color=\'#000\'" '+
           'onClick="document.location=\''+page+'\'">&nbsp;'+
            menu+'&nbsp;</td>';
  }
}

/******************************************************************************/

function makeConfMenu (sel)
{
  var s='<br><center><table width="96%" cellpadding="0" cellspacing="0"><tr>'+

    addConfMenu(sel==1,100,'Basic Settings', 'config.html')+
    addConfMenu(sel==2, 70,'Users',          'config_users.html')+

    addConfMenu(sel==3,250,'Access to Remote License&nbsp;Managers',
                                                              'config_to.html')+

    addConfMenu(sel==4,200,'Access from Remote&nbsp;Clients',
                                                            'config_from.html');
  if (parseInt(commuting)) {
    s+=addConfMenu(sel==5,150,'Detachable Licenses',  'config_detach.html');
  }

  glbPageRefresh=0;

  return s+'<td width="50" class="emptytab">&nbsp;</td></tr></table>';
}

/******************************************************************************/

var fillCallback = function (http)
{
  var x,parser,c,z,picname,logl,prid,haspid,id;
  var info,loc,i,j,k,flash,cse,vid,oldkey,flink,isBasic,isEC;
  var s='';
  var s1,s2,lnk,y1,y2,showData;

  showData=true;
  countdown=glbPageRefresh*10;

  if ((x=document.getElementById('mydata'))) {
    if (http.responseText.substr(0, 7) == "/*JSON:") {

      parser=http.responseText.substr(7,8);

/*----------------------------------------------------------------------------*/

if (parser == "devices*") {
/*
  var tmpFunc = new Function('var c=['+http.responseText.replace(/Code Name "Longhorn"/g, "Code Name &quot;Longhorn&quot;")+']; return c;');
  c=tmpFunc();
*/

  eval('c=[' + http.responseText.replace(/Code Name "Longhorn"/g, "Code Name &quot;Longhorn&quot;")+']');

  z=c.length-1;

  glbCnt=parseInt(c[z].cnt);
  normalizeGlb();
  s='';

  s+='<br><table class="list">'+
      '<tr class="tableheader">'+
      '<td class="padr">#</td>'+
      '<td class="pad">Location</td>'+
      '<td class="pad">Vendor</td>'+
      '<td class="pad">HASP&nbsp;Key&nbsp;ID</td>'+
      '<td class="pad">Key&nbsp;Type</td>'+
      '<td class="padr">Version</td>'+
      '<td class="padr">Sessions</td>'+
      '<td class="pad">Actions</td></tr>';

  for (i=0; i<z; i++) {

    loc=0;
    if (c[i].isloc=="1") { loc=1;}

    isBasic=0;
    if (c[i].typ == "HASP HL Basic") { isBasic=1;}

    flink='features.html?haspid='+c[i].haspid;
    if (!loc) { flink="net"+flink;}

    /* details show below table when hovering over keys */

    if (isBasic) {
      info=sprintf('<b>Details for %1 on %2</b><br>',
                   c[i].typ,
                   c[i].addrs);
    } else {
      info=sprintf('<b>Details for %1 (ID:%2) on %3</b><br>',
                   c[i].typ,
                   c[i].haspid,
                   c[i].addrs);
    }

    info+=
     '&nbsp;&nbsp;HASP License Manager Version: '+c[i].vmaj+'.'+c[i].vmin+
     ' Build '+c[i].vb1+'.'+c[i].vb2+'<br>'+
     '&nbsp;&nbsp;Uptime: '+trUptime(c[i].runtm)+
     '<br>&nbsp;&nbsp;Host: '+c[i].hostnam+' running '+
     c[i].osnam+' '+c[i].osver+' ('+c[i].arch+')';

    info=info.replace(/&#39;/g, '&amp;#39;');

    /* key row */
    s+='<tr height="25" valign="center" '+
           'onMouseOver="setInfo(\''+info+'\'); this.style.backgroundColor=\''+
              currline+'\';\" '+
           'onMouseOut="setInfo(\'<br><br><br><br>\'); this.style.backgroundColor=\''+
              normline+'\';\"><td class="padr">'+c[i].ndx+'</td>';

    if (loc) {
      s+='<td class="pad">Local</td>';
    } else {
      s+='<td class="pad"><a class="text" '+
             'href="http://'+makeLinkIP(c[i].ip)+':'+lmPort+'/devices.html" '+
             'target="_blank" '+
             'onMouseOver="popNum(3)" '+
             'onMouseOut="popHide()"><b>'+
          c[i].loc+'</b></a></td>';
    }

    s+='<td class="pad">'+c[i].ven+'</td>';

    if (c[i].alarm.length) {
      s1='<br><span onMouseOver="this.style.cursor=\'pointer\';popText(\''+
               c[i].alarm+'\')" '+
               'onMouseOut="popHide()">'+
           '<font color="#FF0000"><b>Alert</b></font></span>';
    } else {
      s1='';
    }

    /* HASP ID, HASP Name (if any) */
    if (c[i].haspname != c[i].haspid) {
      if (isBasic) {
        s+= '<td class="pad">'+c[i].haspname+'</td>';
      } else {
        s+= '<td class="pad">'+c[i].haspid+
             '<br><b>'+c[i].haspname+'</b>'+s1+'</td>';
      }
    } else {
      s+= '<td class="pad">'+c[i].haspid+s1+'</td>';
    }

    s+='<td class="pad">'+
        '<table width="100%" border="0" cellpadding="0" cellspacing="0">'+
          '<tr><td align="left">'+c[i].typ;

    cse=parseInt(c[i].cse);
    isEC = (cse==0xF6); /* is ExpressCard */
    vid=parseInt(c[i].vid);
    oldkey=parseInt(c[i].old);

    flash = parseInt(c[i].mass) & 0x0F;
    if (flash) {
      s+='<br>';
      switch (flash) {
        case  1: s+='128 MB'; break;
        case  2: s+='256 MB'; break;
        case  3: s+='512 MB'; break;
        case  4: s+='1 GB'; break;
        case  5: s+='2 GB'; break;
        case  6: s+='4 GB'; break;
        case  7: s+='8 GB'; break;
        case  8: s+='16 GB'; break;
        case  9: s+='32 GB'; break;
        case 10: s+='64 GB'; break;
        case 11: s+='128 GB'; break;
        case 12: s+='256 GB'; break;
        case 13: s+='512 GB'; break;
        case 14: s+='1 TB'; break;
        case 15: s+='2 TB'; break;
      } /* switch flash */
      s+=' Memory';
    } /* if flash */

    /* case picture calculation */
    picname="HASPHL";
    if      (c[i].typ.indexOf("Pro")     > -1) { picname="HASP54";}
    else if (c[i].typ.indexOf("Max")     > -1) { picname="HASP24";}
    else if (c[i].typ.indexOf("Net")     > -1) { picname="HASP04";}
    else if (c[i].typ.indexOf("NetTime") > -1) { cse=0x03;        }
    else if (c[i].typ.indexOf("Time")    > -1) { picname="HASP83";}

    switch (cse) {
      case   -1: picname="HASPSL";
                 if (parseInt(c[i].det)==1) { picname="HASPSLDET";} /* detachable */
                 if (parseInt(c[i].isc)==1) { picname="HASPSLATT";} /* detached */
                 break;
      case 0x23: picname="HASP24"; break;
      case 0x53: picname="HASP54"; break;
      case 0x83:
      case 0x03:
      case 0x13:
      case 0xA3:
      case 0xB3:
      case 0x15:
      case 0x54:
      case 0x24:
      case 0x25:
      case 0x14:
      case 0x04:
      case 0x84:
      case 0xF6: picname="HASP";
                 if (cse<16) { picname+='0';}
                 picname+=(cse.toString(16)).toUpperCase();
                 break;
    } /* switch cse */
    if ((cse & 0x0F)==5) { picname="HASP25";}
    if (c[i].typ.indexOf("Drive") > -1) { picname="HASP25";}
    s+='&nbsp;';

  if (isEC) {
    picname="HASPF6";    /* always show ExpressCard as such */
    s+='<br>ExpressCard&reg;';
  }

  if (parseInt(c[i].isc)==1) { s+='<br>Attached';}
  else if (parseInt(c[i].det)==1) { s+='<br>Detachable';}

  s+='</td><td align="right">';

  if (oldkey) {
    s+='&nbsp;';
  } else {
    s+='<img src="'+picname+'.GIF">';
  }

  s+='</td></tr></table><td class="padr">'+c[i].fw+'</td>';

  if (parseInt(c[i].dis)==1) {
   s+='<td colspan="3" align="center"><font color="#FF0000">'+
    'Fingerprint mismatch - HASP disabled</font>';
  } else {
   if (oldkey) {
    s+='<td colspan="2" align="center"><font color="#FF0000">'+
     'HASP version not supported</font>';
   } else {
    s+='<td class="padr">'+getNiceZero(c[i].sesc)+'</td>';

    s+='<td class="pad">';

    if (loc) {
     if (parseInt(c[i].hasprod)) {
       s+='<a class="sbutton" href="products.html?haspid='+c[i].haspid+'" '+
             'onMouseOver="popNum(75)" '+
             'onMouseOut="popHide()">&nbsp;Products&nbsp;</a> ';
     }

     s+='<a class="sbutton" href="features.html?haspid='+c[i].haspid+'" '+
           'onMouseOver="popNum(11)" '+
           'onMouseOut="popHide()">&nbsp;Features&nbsp;</a> ';

     s+='<a class="sbutton" href="sessions.html?haspid='+c[i].haspid+'" '+
           'onMouseOver="popNum(10)" '+
           'onMouseOut="popHide()">&nbsp;Sessions&nbsp;</a> ';

     if (!isEC) {  /* ExpressCard cannot blink */
       if (c[i].bli=="2") {
        s+="<a name=\"blink\" class=\"sbutton\" href=\"javascript:doBlink('off','"+
           c[i].haspid+
           "')\" onMouseOver=\"popNum(12)\" onMouseOut=\"popHide()\">"+
           "&nbsp;Blink off&nbsp;</a> ";
       }
       if (c[i].bli=="1") {
         s+="<a class=\"sbutton\" href=\"javascript:doBlink('on','"+
            c[i].haspid+
            "')\" onMouseOver=\"popNum(13)\" onMouseOut=\"popHide()\">"+
            "&nbsp;Blink on&nbsp;</a> ";
       }
     }

    } else { /* is remote */
     s+='<a class="sbutton"'+
      ' href="http://'+makeLinkIP(c[i].ip)+':'+lmPort+'/_int_/features.html?haspid='+c[i].haspid+'"'+
      ' target="_blank" onMouseOver="popNum(4)" onMouseOut="popHide()">'+
      '<nobr>&nbsp;<img src="newwin1.gif" border=0>&nbsp;Browse&nbsp;</nobr></a> '+
      '<a class="sbutton" '+
         'href="netfeatures.html?haspid='+c[i].haspid+'" '+
         'onMouseOver="popNum(14)" '+
         'onMouseOut="popHide()">&nbsp;Net Features&nbsp;</a> ';
    }
   } /* not old */
  } /* not disabled */
  s+='</td></tr>';
 } /* for i */

 s+=pageButtons("HASP Keys",5,5)+'</table>';

} /* parser=="devices*" */

/*----------------------------------------------------------------------------*/

if (parser == "sessions") {
  eval('c=[' + http.responseText + ']');
  z=c.length-1;

  glbCnt=parseInt(c[z].cnt);
  normalizeGlb();

  s="Sessions on "+glbServerName;
  if (glbFilterHasp!="0") {
    if (glbFilterHaspName.length>0) {
      s+=", HASP "+glbFilterHaspName;
    } else {
      s+=", HASP "+glbFilterHasp;
    }
  }
  if (glbFilterFeature>=0) { s+=", Feature "+glbFilterFeature;}
  setHeader(s);

  s='';

  /* session table header */
  s+='<br><table class="list">'+
      '<tr class="tableheader">'+
      '<td class="pad">ID</td>'+
      '<td class="pad">HASP&nbsp;Key&nbsp;ID</td>'+
      '<td class="pad" onMouseOver="popNum(34)" onMouseOut="popHide()">Location</td>'+
      '<td class="pad">Feature&nbsp;ID</td>'+
      '<td class="pad" onMouseOver="popNum(35)" onMouseOut="popHide()">Address</td>'+
      '<td class="pad">User</td>'+
      '<td class="pad">Machine</td>'+
      '<td class="pad">Login&nbsp;Time</td>'+
      '<td class="padr">Timeout</td>'+
      '<td class="pad">Actions</td>'+
      '</tr>';

  /* session table data rows */
  for (i=0; i<z; i++) {
    /* if not on console, get terminal ID */
    s1='';
    s2=c[i].scrn;
    if (s2.length) {
      if (s2!='console') {
        s1='('+s2+')';
      }
    }
    s+='<tr height="25" valign="center" '+
           'onMouseOver="this.style.backgroundColor=\''+currline+'\'" '+
           'onMouseOut="this.style.backgroundColor=\''+normline+'\'">'+
        '<td class="pad">'+c[i].acc+'</td>'+
        '<td class="pad">'+c[i].haspname+'</td>'+
        '<td class="pad">'+c[i].prv.replace(/Local/,'Local')+'</td>'+
        '<td class="pad">'+c[i].fid+'</td>'+
        '<td class="pad">'+c[i].cli.replace(/Local/,'Local')+'</td>'+
        '<td class="pad">'+c[i].usr+'</td>'+
        '<td class="pad">'+c[i].mch+s1+':'+c[i].pid+'</td>'+
        '<td class="pad">'+tr(c[i].lt)+'</td>'+
        '<td class="padr">'+c[i].rt+'</td>';

    if (glbAuth==1) {
      s+='<td class="pad"><a class="sbutton" '+
             'href="javascript:deleteLogin(\''+c[i].sid+'\')" '+
             'onMouseOver="popNum(28)" '+
             'onMouseOut="popHide()">&nbsp;Disconnect&nbsp;</a> </td>';
    } else {
      s+='<td class="pad"><a class="sbutton" '+
             'href="javascript:askpwdel()" '+
             'onMouseOver="popNum(28)" '+
             'onMouseOut="popHide()">&nbsp;Disconnect&nbsp;</a> </td>';
    }
    s+="</tr>";
  }
  s+=pageButtons("Sessions",5,5)+'</table>';
} /* parser == "sessions" */

/*----------------------------------------------------------------------------*/

if (parser=="features") {
  eval('c=[' + http.responseText + ']');
  z=c.length-1;
  glbCnt=parseInt(c[z].cnt);
  normalizeGlb();
  s='';

  if (parseInt(glbVendorId)) {
    if (parseInt(glbProductId)) {
      if (c[0].prname.length > 0) {
        setHeader('Features on '+glbServerName+
                  ': HASP '+c[0].haspname+
                  ' (Vendor: '+c[0].ven+
                  ')<br>Product: '+c[0].prname+
                  ' (ID:'+c[0].prid+')');
      }
    }
  }

  /* feature table header line */
  s+='<br><table class="list"><tr class="tableheader"><td class="padr">#</td>';

  if (glbFilterHasp=="0") {
    s+='<td class="pad">Vendor&nbsp;ID</td>'+
       '<td class="pad">HASP&nbsp;Key&nbsp;ID</td>';
  }

  s+='<td class="pad">Feature&nbsp;ID</td>';

  if (envdebug) { s+='<td class="pad">File&nbsp;ID</td>';}

  s+=
   '<td class="pad" onMouseOver="popNum(34)" onMouseOut="popHide()">Location</td>'+
   '<td class="pad" onMouseOver="popNum(18)" onMouseOut="popHide()">Access</td>'+
   '<td class="pad" onMouseOver="popNum(19)" onMouseOut="popHide()">Counting</td>'+
   '<td class="padr">Logins</td>'+
   '<td class="padr" onMouseOver="popNum(27)" onMouseOut="popHide()">Limit</td>';

  if (commuting) {
    s+='<td class="padr" onMouseOver="popNum(53)" onMouseOut="popHide()">Detached</td>';
  }

  s+='<td class="pad" onMouseOver="popNum(43)" onMouseOut="popHide()">Restrictions</td>'+
     '<td class="padr">Sessions</td>'+
     '<td class="pad">Actions</td>'+
     '</tr>';

  /* feature table data lines */
  for (i=0; i<z; i++) {
    loc=0;
    if (c[i].isloc=="1") { loc=1;}
    flink='features.html?haspid='+c[i].haspid;
    if (!loc) { flink="net"+flink;}

    s+= '<tr height="25" valign="center" '+
            'onMouseOver="this.style.backgroundColor=\''+currline+'\'" '+
            'onMouseOut="this.style.backgroundColor=\''+normline+'\'">'+
        '<td class="padr">'+c[i].ndx+'</td>';

    if (glbFilterHasp=="0") {
      s+='<td class="pad">'+c[i].ven+'</td>'+
         '<td class="pad" onClick="document.location=\''+flink+'\'">'+
          c[i].haspname+'</td>';
    }

    /* feature id and lock sign */
    s+='<td class="pad"><table border=0 width="100%"><tr><td>';
    if ( (c[i].fid == '4294967295') ||
         (c[i].fid == "-1") ||
         (c[i].fid.length < 1) ) {
      s+='n/a';
    } else {
      s+=c[i].fid;
      if (axel) { s+= '&nbsp;('+c[i].file+')'; }
    }

    if (c[i].fn.length) { s+='&nbsp;<br><b>'+c[i].fn+'</b>';}
    s+='&nbsp;</td>';

    j=72;
    if (c[i].typ=='HASP SL') { j=73;}

    if (parseInt(c[i].locked)) {
      s+='<td align="right" onMouseOver="popNum('+j+
         ')" onMouseOut="popHide()">'+
         '<img src="locked.gif"></td>';
    } else {
      s+='<td align="right">&nbsp;</td>';
    }

    s+='</tr></table></td>';

    /* debug: file id */
    if (envdebug) { s+='<td class="pad">'+c[i].file+'</td>';}

    /* location of feature */
    if (loc) {
      s+='<td class="pad">Local';
    } else {
      s+='<td class="pad"><a class="text" '+
             'href="http://'+makeLinkIP(c[i].ip)+':'+lmPort+'/devices.html" '+
             'target="_blank" onMouseOver="popNum(3)" onMouseOut="popHide()">'+
            '<b>'+c[i].loc+'</b></a>';
    }

    if (commuting) {
      if (parseInt(c[i].det)) {
        s+='<br>Detachable';
      }
    }

    s+='</td>';

    logl=c[i].logl;
    if ((logl == "0")||(logl=="-1")||(logl=="250+")) {
      if (c[i].acc.indexOf('Net') > -1) {
        logl='250+';
      } else {
        logl='&infin;';
      }
    }

    s+='<td class="pad">'+trAccCnt(c[i].acc)+'&nbsp;</td>'+
       '<td class="pad">'+trAccCnt(c[i].cnt)+'&nbsp;</td>'+
       '<td class="padr">'+getNiceZero(c[i].logc)+'</td>'+
       '<td class="padr">&nbsp;'+logl+'</td>';

    if (commuting) {
      s+='<td class="padr">'+getNiceZero(c[i].detc)+'</td>';
    }

    if (parseInt(c[i].dis)) {
      s+='<td class="pad"><font color="#FF0000">Disabled</font></td>';
    } else {
      if (parseInt(c[i].ex)) {
        s+='<td class="pad"><font color="#FF0000">Expired</font></td>';
      } else {
        if (parseInt(c[i].unusable)) {
          s+='<td class="pad"><font color="#FF0000">Unusable</font></td>';
        } else {
          s1= c[i].lic.replace(/Disabled in VM/,
              "<font color=\"#FF0000\">Disabled in VM</font>");
          s+='<td class="pad">'+tr(s1)+'</td>';
        }
      }
    }

    s+='<td class="padr">'+getNiceZero(c[i].sesc)+'</td>';

    if (loc) {
      s+='<td class="pad"><a class="sbutton" '+
             'onMouseOver="popNum(16)" onMouseOut="popHide()" '+
             'href="sessions.html?haspid='+c[i].haspid+'&featureid='+
                    c[i].fid+'">&nbsp;Sessions&nbsp;</a>&nbsp;</td>';
    } else {
      s+='<td class="pad"><a class="sbutton" '+
            'href="http://'+makeLinkIP(c[i].ip)+
                       ':'+lmPort+'/features.html?haspid='+c[i].haspid+'" '+
            'target="_blank" onMouseOver="popNum(4)" onMouseOut="popHide()">'+
            '<nobr>&nbsp;<img src="newwin1.gif" border=0>&nbsp;Browse&nbsp;</nobr></a></td>';
    }

    s+='</tr>';
  } /* for i */

  if (glbFilterHasp=="0") {
    s+=pageButtons("Features",7,7); /* prev/next buttons */
  } else {
    s+=pageButtons("Features",6,6);
  }

   s+='</table>';
 /* s+="<pre>"+http.responseText+"</pre>"; */
} /* parser=="features" */

/*----------------------------------------------------------------------------*/

if (parser=="products") {

  eval('c=[' + http.responseText + ']');
  z=c.length-1;
  glbCnt=parseInt(c[z].cnt);
  normalizeGlb();
  enabledetach=parseInt(c[z].enabledetach);
  s='';

  if (!z) {
    s+='<br><table><tr><td><font size="+1">'+
       '<b>No Products found.</b></font></td></tr></table>';
  } else {
    s+='<br><table class="list">'+
       '<tr class="tableheader">'+
       '<td class="padr">#</td>'+
       '<td class="pad">Product Name</td>'+
       '<td class="pad">Vendor</td>'+
       '<td class="pad">Location</td>';

    if (enabledetach) {
      s+='<td class="padr">Detached</td>'+
         '<td class="padr">Available</td>';
    }

    s+='<td class="pad">Actions</td></tr>';

    for (i=0; i<z; i++) {

/*
c.d ata[i].prname = 'Test Product Four';
c.d ata[i].ven = 'Test Vendor Name';
*/


      s+= '<tr height="25" valign="center" '+
              'onMouseOver="this.style.backgroundColor=\''+currline+'\'" '+
              'onMouseOut="this.style.backgroundColor=\''+normline+'\'">'+
          '<td class="padr">'+c[i].ndx+'</td>';

      /* mouseover details */
      s1=c[i].details.replace(/<table>/,
         "<table border=1 rules=%22rows%22 frame=%22hsides%22 cellpadding=3 cellspacing=0>");
      s1=s1.replace(/<td r>/g,"<td align=%22right%22>");

      s1=s1.replace(/Product Details/g,         "Product Details");
      s1=s1.replace(/Product ID:/g,             "Product ID:");
      s1=s1.replace(/Vendor ID:/g,              "Vendor ID:");
      s1=s1.replace(/Features:/g,               "Features:");
      s1=s1.replace(/Max. detach days/g,        "Max. detach days");
      s1=s1.replace(
      /License is automatically restored to network after duration expiry./g,
    "License is automatically restored to network after duration expiry.");
      s1=s1.replace(/Product is not detachable/g, "Product is not detachable");

/* todo =5>%d of %d features shown</td></tr>"  */

      s1=s1.replace(/use [Features] button for complete list/g,
                    "use [Features] button for complete list");

      s1=s1.replace(/&#39;/g, "%27"); /* MKS#89431 */



      /* product name */
      s+='<td class="pad" onMouseOver="popText(\''+s1+
         '\');this.style.cursor=\'pointer\'" '+
         'onMouseOut="popHide()">'+
         '<table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td>'+
         '<b>'+unescape(c[i].prname)+'</b>';
      if (parseInt(c[i].cloned)) {
        if (parseInt(c[i].cp)) {
          s+='<br><font color="#FF0000">&nbsp;&nbsp;Disabled due to cloning</font>';
        }
      }

      s+='</td><td align="right">&nbsp;';
if (parseInt(c[i].isc)>0) {
  s+='<img src="att.GIF">';
} else {
  if (parseInt(c[i].seats)+
      parseInt(c[i].seatsfree)+
      parseInt(c[i].detc)>0) {
    s+='<img src="det.GIF">';
  }
}
      s+='</td></tr></table>';


      s+='</td>';

      /* vendor name/id */
      s+='<td class="pad" onMouseOver="popText(\''+s1+
         '\');this.style.cursor=\'pointer\'" '+
         'onMouseOut="popHide()">';
      if (c[i].ven.length) {
        s+=unescape(c[i].ven);
      } else {
        s+='Vendor ID: '+c[i].vid;
      }

      s+='</td>';

      /* location */
      if (parseInt(c[i].isloc)) {
        s+='<td class="pad">Local</td>';
      } else {
        s+='<td class="pad"><b>'+c[i].loc+'</b></td>';
      }

      /* link to product detach page */
      lnk='.html?haspid='+c[i].haspid+
               '&vendorid='+c[i].vid+
               '&productid='+c[i].prid;

      if (enabledetach) {
        /* detach count */
        if (parseInt(c[i].isloc)) {
          if (parseInt(c[i].detc) > 0) {
            s+='<td class="padr" '+
                   'onMouseOver="popNum(65);this.style.cursor=\'pointer\'" '+
                   'onMouseOut="popHide()" '+
                   'onClick="document.location=\'detached'+lnk+'\'">'+
                '<a class="text" href="detached'+lnk+'">'+
                getNiceZero(c[i].detc)+'</a></td>';

          } else {
            s+='<td class="padr">'+getNiceZero(c[i].detc)+'</td>';
          }
        } else {
          s+='<td class="padr" onMouseOver="popNum(66)" onMouseOut="popHide()">n/a</td>';
        }

        /* free seats for detach */
        s+='<td class="padr">';
        if ( (parseInt(c[i].seatsfree) < 0) ||
             (parseInt(c[i].seatsfree) > 0x08000000) ) {
          s+='<b>&infin;</b>';
        } else {
          s+=getNiceZero(c[i].seatsfree);
        }
        s+='</td>';
      }

      /* calculate button: none, detach, extend, or detach/extend */
      s+='<td class="pad">';
      j=0;
      if (parseInt(c[i].seatsfree) > 0) { j+=1;} /* can detach */
/* TD9088 @@@ j@=1; */
      if (parseInt(c[i].detc) > 0) { j+=2;}      /* can extend */
      if ( (j>0) && (enabledetach) ) {
        s+='<a class="sbutton" onMouseOver="popNum(63)" '+
              'onMouseOut="popHide()" href="checkout'+lnk+'">&nbsp;';
        switch (j) {
          case 1: s+='Detach'; break;
          case 2: s+='Extend'; break;
          case 3: s+='Detach / Extend'; break;
        } /* case j */
        s+='&nbsp;</a> ';
      }

      if (parseInt(c[i].isc) > 0) { /* commuter - can cancel attachment */
        s+='<nobr><a class="sbutton" href="cancel'+lnk+'">&nbsp;'+
           'Cancel License&nbsp;</nobr></a></nobr> ';
      }

      s+='<a class="sbutton" href="features'+lnk+'">&nbsp;Features&nbsp;</a> ';
      s+='</td></tr>';

    } /* for i (loop through data) */

    if (enabledetach) {
      s+=pageButtons("Products",3,4);
    } else {
      s+=pageButtons("Products",2,3);
    }

    s+='</table>';
  } /* if data available */

/* s+="<br><pre>"+http.responseText+"</pre>"; */

} /* parser=="products" */

/*----------------------------------------------------------------------------*/

if (parser=='detach**') {

  eval(http.responseText);
  coo.init();
  s=coo.getContent('d');
}

/*----------------------------------------------------------------------------*/

if (parser=='cancel**') {

  eval(http.responseText);
  coo.init();
  s=coo.getContent('c');
}

/*----------------------------------------------------------------------------*/

if (parser=='detached') {

  eval(http.responseText);
  coo.init();
  s=coo.getDetachedList();
}

/*----------------------------------------------------------------------------*/

if (parser=="prodadm*") {

  eval('c=[' + http.responseText + ']');
  z=c.length-1;
  glbCnt=parseInt(c[z].cnt);
  normalizeGlb();
  s='';

  if (!z) {

    s+='<br><table><tr><td><font size="+1">'+
       '<b>No detachable local Products found.</b></font></td></tr></table>';

  } else {

    s+='<br><table class="list">'+
       '<tr class="tableheader">'+
       '<td class="padr">#</td>'+
       '<td class="pad">Product Name</td>'+
       '<td class="padr">Available</td>'+
       '<td class="padr">Detached</td>'+
       '<td class="padr" width="60">Reserved</td>'+
       '<td class="padr" width="60">Res. %</td>'+
       '<td class="padr" width="70" onMouseOver="popNum(59)" onMouseOut="popHide()">Max. Days</td>'+
       '<td class="pad" width="120">Actions</td></tr>';

    for (i=0; i<z; i++) {

      prid=c[i].prid;
      haspid=c[i].haspid;
      id=haspid+'_'+prid;

      s+='<tr height="25" valign="center" '+
             'onMouseOver="this.style.backgroundColor=\''+currline+'\'" '+
             'onMouseOut="this.style.backgroundColor=\''+normline+'\'">'+
         '<td class="padr">'+c[i].ndx+'</td>';

      s+='<td class="pad"><b>'+c[i].prname+'</b><br>&nbsp;&nbsp;';

      if (c[i].ven.length) {
        s+=c[i].ven;
      } else {
        s+='(Vendor ID: '+c[i].vid+')';
      }

      s+='<br><nobr>&nbsp;&nbsp;HASP ID '+haspid+', Product ID '+prid+'</nobr></td>'+
         '<td class="padr">&nbsp;'+getNiceZero(c[i].seats)+'</td>'+
         '<td class="padr">&nbsp;'+getNiceZero(c[i].detc)+'</td>'+
         '<td class="padr" id="reslic'+id+'">&nbsp;'+
         getNiceZero(c[i].reslic)+'</td>';

      s+='<td class="padr" id="resper'+id+'">&nbsp;';
      if (parseInt(c[i].resper) > 0) {
        s+= getNiceZero(c[i].resper)+'%</td>';
      } else {
        s+= '-</td>';
      }

      s+='<td class="padr" id="time_acc'+id+
         '" onMouseOver="popNum(59)" onMouseOut="popHide()">&nbsp;'+
         getNiceZero(c[i].time_acc)+'</td>';

      s+='<td class="pad" id="act'+id+'">'+
           '<a name="paedit" class="sbutton" onMouseOver="popNum(55)" onMouseOut="popHide()" '+
              'href="javascript:editProd(\''+haspid+'\','+prid+')">&nbsp;Edit&nbsp;</a> '+

         '<input type="text" style="display:none;" id="oreslic'+id+'" size="8" value="'+c[i].reslic+'">'+
         '<input type="text" style="display:none;" id="oresper'+id+'" size="8" value="'+c[i].resper+'">'+
         '<input type="text" style="display:none;" id="otime_acc'+id+'" size="8" value="'+c[i].time_acc+'">'+
         '</td></tr>';

     } /* for i - traverse items */

     s+='</table>';
   }
/* s+="<br><pre>"+http.responseText+"</pre>"; */
} /* parser=="prodadm*" */

/*----------------------------------------------------------------------------*/

if (parser=="diagnost") {

 eval('c=' + http.responseText.replace(/Code Name "Longhorn"/g, "Code Name &quot;Longhorn&quot;") + '');

 glbCnt=1;
 normalizeGlb();
 s='';

  /* "Create ID File" button */
  if (commuting) {
    s1= '<a class="button" onMouseOver="popNum(56)" onMouseOut="popHide()" '+
        'href="/_int_/download/my.id">&nbsp;Create ID File&nbsp;</a>';
  } else {
    s1='&nbsp;';
  }

 s+='<br><table border="1" cellpadding="3" cellspacing="0" '+
               'frame="hsides" rules="rows" width="95%">'+

   statLine('License Manager Version',
            c.vmaj+'.'+c.vmin+' Build '+c.vbuild)+

   statLine('Computer Name',
            '<table border="0" cellpadding="0" cellspacing="0" width="100%">'+
            '<tr><td>'+c.srvname+'</b>&nbsp;&nbsp;&nbsp;(PID:'+
            c.pid+' on '+c.srvos+')<b></td>'+
            '<td align="right">'+s1+
            '</td></tr></table>')+

   '<tr><td valign="top">Host Operating System</td><td><nobr><b>'+
   c.osname+' '+c.osver+'</b></nobr>';

 if (c.arch.length) { s+='<br><nobr>'+c.arch+'</nobr>';}
 if (c.vm.length) { s+='<br><nobr>'+c.vm+'</nobr>';}

 s+='<tr><td valign="top">LM Protocols</td><td>';
 i=0;
 if (parseInt(c.ip4)) { i+=1;}
 if (parseInt(c.ip6)) { i+=2;}
 switch (i) {
  case 1: s+='<b>IPv4</b>'; break;
  case 2: s+='<b>IPv6</b>'; break;
  case 3: s+='<b>IPv4</b>,&nbsp;<b>IPv6</b>'; break;
 }
 if (i) {
   s+=sprintf(' (TCP&nbsp;and&nbsp;UDP&nbsp;at&nbsp;port&nbsp;%1)', lmPort);
   if (c.localips.length) {
     s+='<br>'+unescape(c.localips);
   }
 }

 s1='2.0';
 if (s1=='Translation Version') { s1=''; }

 s2='Translation Date';
 if (s2=='Translation Date') {
   s2='';
 } else {
   s2=' ('+s2+')';
 }

 s+=statLine('Uptime',trUptime(c.uptime))+
    statLine('Template Sets',c.tmpl)+

    statLine('Current Template',
             'English (internal) '+s1+s2)+

    statLine('&nbsp;','&nbsp')+
    statLine('Current Usage', sep3(c.logincnt)+'</b> logins, <b>'+
             sep3(c.sessioncnt)+'</b> sessions')+
    statLine('Login Requests',sep3(c.loginreq)+'</b> ('+sep3(c.loginpeak)+
             ' peak simultaneous logins)<b>')+
    statLine('Requests',sep3(c.localreq)+
             '</b> local, <b>'+sep3(c.remotereq)+'</b> remote, <b>'+
             sep3(c.requests)+'</b> total<b>')+
    statLine('Data Volume',sep3(c.reads)+'</b> received, <b>'+
             sep3(c.writes)+'</b> transmitted<b>')+
    statLine('Errors',sep3(c.keyerr)+'</b> Key related, <b>'+
             sep3(c.neterr)+'</b> in Transport<b>')+

    statLine('Client Threads',c.thr+'</b> ('+c.peakthr+' peak)<b>')+
    statLine('&nbsp;','&nbsp')+
    '<tr><td valign="top">Run-time</td><td><table cellspacing=0><tr><td><b>';

  j=-9;  /* just show maj.min, not .build etc. */
  k=2;
  s1='';
  s2='';
  for (i=0;i<c.drivers.length; i++) {
    switch (c.drivers.charAt(i)) {
      case '|': s2+= '&nbsp;&nbsp;&nbsp;&nbsp;</b></td><td><b>';
                j=0;
                k=2;
                if (s1=='aksusbd') { k=3;}
                break;
      case '$': s2+= '&nbsp;</b></td></tr><tr><td><b>';
                j=-9;
                k=2;
                break;
      case '.': j++;
                if (j<k) { s2+='.';}
                break;
      case '(': j=999;
                break;
      default : if (j<k) {
                  s2+=c.drivers.charAt(i);
                  s1+=c.drivers.charAt(i);
                }
    } /* switch */
  } /* for i */

  s2=s2.replace(/Run-time Installer/g, "Run-time Installer");
  s2=s2.replace(/Run-time Package/g, "Run-time Package");

  s+=s2+'</td></tr></table>'+statLine('&nbsp;','&nbsp')+
     '<tr><td>&nbsp;</td><td><a class="button" onMouseOver="popNum(44)" '+
     'onMouseOut="popHide()" href="diagnostics.html" '+
     'target="_blank">&nbsp;Generate Report&nbsp;</a>&nbsp;</td></tr></table>';

} /* parser=="diagnost" */

/*----------------------------------------------------------------------------*/

if (parser=="cdata***") {
  showData=false;
  if ((y1=document.getElementById("nonethasp"))) {
    eval(http.responseText);
    if (parseInt(hasnethasp)) {
      y1.innerHTML='';
    } else {
      y1.innerHTML=
'<hr width="90%">'+
 '<table width="90%" border=0 cellpadding="3" cellspacing="0">'+
  '<tr><td colspan="2"><font color="#FF0000">'+
   'Currently, no network-enabled Sentinel HASP key is connected to this License Manager.'+
   '</font></td></tr>'+
  '<tr height=5><td></td></tr>'+
 '</table>';
    }
  }

  if ((y1=document.getElementById("hasnewini"))) {
    if ((y2=document.getElementById("ini_timestamp"))) {
      eval(http.responseText);

    if (parseInt(iniTimestamp)!=parseInt(y2.value)) {
      
      y1.innerHTML=

  
   '<table width="90%" border=0 cellpadding="3" cellspacing="0">'+
    '<tr><td colspan="2"><font color="#FF0000">Settings were changed from another place. Reload this page to see the actual values.</font></td></tr>'+
    '<tr height=5><td></td></tr>'+
   '</table>';
   } else {
     y1.innerHTML='';
   }
   }
   }


  
  
  
  
} /* parser=="cdata***" */

/*----------------------------------------------------------------------------*/

if (showData) {
  x.innerHTML=s;
}

   /* calculate coo parameters */
   if ((y1=document.getElementById("co_dateday"))) {
     coSetDate(0,0,0);
     coCalc();
     coCalc();
   }

  } else {

    /* data was not a JSON array: */
    s=http.responseText;

/* alert(s); */

    i=s.indexOf("<!--getlang");
    if (i>-1) {
      j=s.indexOf("getlang-->");
      if (j>i) {
        eval(s.substring(i+11,j));

        if (s.indexOf("=cannot_retrieve=")>2) {
          glbPageRefresh=0;
        } else {
          glbPageRefresh=3;
        }

        s=s.replace(/=cannot_retrieve=/g,
"Language packs data cannot be retrieved.<br>You may download ACC language packs manually by using the link below, then upload it manually.");

        s=s.replace(/=opens_in_new_window=/g,
                    "(Link opens in new window)");
        
        s=s.replace(/=IAlp=/g,"Installed ACC language packs:");
        s=s.replace(/=Name=/g,"Name");
        s=s.replace(/=Language=/g,"Language");
        s=s.replace(/=ID=/g,"ID");
        s=s.replace(/=Installed=/g,"Installed");
        s=s.replace(/=Installed Version=/g,"Installed Version");
        s=s.replace(/=Available=/g,"Available");
        s=s.replace(/=Available Version=/g,"Available Version");
        s=s.replace(/=Action=/g,"Action");

        s=s.replace(/=Install=/g,"Install");
        s=s.replace(/=Remove=/g,"Remove");
        s=s.replace(/=Update To=/g,"Update To");
        s=s.replace(/=Please wait ...=/g,"Please wait ...");
        s=s.replace(/=Downloading:=/g,
                   "Downloading:");
        s=s.replace(/=Retrieving language packs.=/g,
                   "Retrieving language packs.");

/******************************************************************************/

        s=s.replace(/=Uploadform=/,
         '<br>'+
         '<form action="getlang.html" method="post" enctype="multipart/form-data">'+
          'Upload ALP file:&nbsp;<br>'+
          '<input onfocus="glbPageRefresh=0" name="check_in_file" type="file" size="60" maxlength="100000" accept="text/*">'+
          '<br><br>'+
          '<input type="submit" value="Apply File">&nbsp;&nbsp;'+
          '<input type="reset" value="Cancel">'+
         '</form>'+
         '<br>');

/******************************************************************************/


        makeMenu();
      }
    }

    if (s.substr(0,3) == '<<<') {
      s=s.replace(/<<<confmenu1>>>/, makeConfMenu(1));
      s=s.replace(/<<<confmenu2>>>/, makeConfMenu(2));
      s=s.replace(/<<<confmenu3>>>/, makeConfMenu(3));
      s=s.replace(/<<<confmenu4>>>/, makeConfMenu(4));
      s=s.replace(/<<<confmenu5>>>/, makeConfMenu(5));
    }

    x.innerHTML=s;

    /* unescape some strings */
    if ((y1=document.getElementsByName('unesc'))) {
      for (i=0;i<y1.length;i++) {
        y1[i].innerHTML=unescape(y1[i].innerHTML);
      }
    }

    /* display error text for given code */
    if ((y1=document.getElementById("errorcode"))) {
      if ((y2=document.getElementById("errortext"))) {
        var err=parseInt(y1.innerHTML);
        s=getHaspError(err);
        y2.innerHTML=s.replace(/;/, '<br>');
      }
    }

    checkLogFile();

    /* check for "no net hasp" span */
    if ((y1=document.getElementById("nonethasp"))) {
      glbPageRefresh=3;
      setDataUrl('cdata.txt');
    }

    /* check for "hasnewini" span */
    if ((y1=document.getElementById("hasnewini"))) {
      glbPageRefresh=3;
      setDataUrl('cdata.txt');
    }


  } /* if not JSON */

} /* if mydata */

  if (http.responseText.length) {
    if (connLost) {
      setInfo("");
      connLost=0;
    }
  } else {
    if (!connLost) {
      popHide();
      setInfo("Connection to HASP License Manager lost.");
      connLost=1;
    }
  }
  counter=0;
  dataBusy=false;
  /* if (dataRefresh) setTimeout("fill()", dataRefresh); */

  s=null;
  c=null;

  x=null;
  parser=null;
  z=null;
  picname=null;
  logl=null;
  prid=null;
  haspid=null;
  id=null;
  info=null;
  loc=null;
  flash=null;
  cse=null;
  vid=null;
  oldkey=null;
  flink=null;
  isBasic=null;
  isEC=null;
  s1=null;
  s2=null;
  lnk=null;
  y1=null;
  y2=null;
  showData=null;

}; /* fillCallback */

/******************************************************************************/

function fill()
{
  if (!dataUrl) { return;}
  if (!dataUrl.length) { return;}
  if (dataBusy) {
    if (!glbPageRefresh) { setTimeout("fill()", 500);}
  } else {
    dataBusy=true;
    if (!myHttp) { alert("XMLHTTP not available. Please try a newer browser.");}
    normalizeGlb();
    if (dataUrl.indexOf("?") >= 0) {
      myHttp.connect(dataUrl,'GET','',fillCallback);
    } else {
      myHttp.connect(dataUrl+
                '?haspid='+glbFilterHasp+
                '&featureid='+glbFilterFeature+
                '&vendorid='+glbVendorId+
                '&productid='+glbProductId+
                '&filterfrom='+glbFrom+
                '&filterto='+glbTo,
                'GET','',fillCallback);
    }
  }
}

/******************************************************************************/

function fillUrl(url)
{
  dataUrl=url;
  fill();
}

/******************************************************************************/

function padl3 ( x )
{
  var s=String(x);
  while (s.length<3) { s=' '+s;}
  return s;
}


function setBlinkColor(c)
{
  var chk=document.getElementsByName("blink");
  var i;

  if (chk) {
    for (i=0;i<chk.length;i++) {
      chk[i].style.color=c;
    }
  }
}

/******************************************************************************/

function getLanguage()
{
  var s=document.URL;
  var l=s.length;
  var i,c;
  var fn='';

  /* http://server.com/lang/page.html */

  if (l>10) {
    if (s.charAt(0)=='h') {
      if (s.charAt(4)==':') {
        c=0;
        for (i=0;i<l;i++) {
          if (s.charAt(i)=='/') {
            c++;
            if (c>3) { break;}
          } else {
            if (c==3) { fn+=s.charAt(i);}
          }
        }
      }
    }
  }

  return fn;
}


function getPageFilename()
{
  var fn='';
  var s=document.URL;
  var l=s.length;
  var i;
  for (i=l; i>0; i--) {
    if (s.charAt(i)=='/') break;
    fn=s.charAt(i)+fn;
  }
  return fn;
}

function myLoop()
{
  if (glbPageRefresh>0) {
    if (countdown>0) {
      countdown--;
    } else
    if (!countdown) {
      countdown=glbPageRefresh*10;
      fill();
    }
  }

  if (cntBlink++ > 2) { cntBlink=0;}
  if (!cntBlink) {
    colorBlink=(colorBlink=="#FFFFFF") ? "#000000" : "#FFFFFF";
    setBlinkColor(colorBlink);
  }

  if (counter10th++ > 9) {
    counter10th=0;
    counter++;

    if (axel) {
      wr('refreshtime',
         '<pre class="debug">'+
         'age='+padl3(counter)+' sec.' +
         ', PageRefresh='+glbPageRefresh+
         ', countdown='+padl3(countdown)+
         ', LngCookie="'+getLanguageCookie()+'"'+
         ', PWCookie="'+getPWCookie()+'"'+
         '<br>currentHash="'+currentHash+'"'+
         '<br>glb...From='+glbFrom+', To='+glbTo+', Cnt='+glbCnt+', Lpp='+glbLpp+

         ', FilterHasp='+glbFilterHasp+
         ', FilterFeature='+glbFilterFeature+
         ', VendorId='+glbVendorId+
         ', ProductId='+glbProductId+

         '<br>enabledetach='+enabledetach+
         ', commuting='+commuting+
         ', axel='+axel+
         ', envdebug='+envdebug+
         ', auth='+glbAuth+
         ', passACC='+passACC+
         ', getLanguage()='+getLanguage()+
         '<br>URL="'+dataUrl+'" - "'+ getPageFilename() + '" - "'+document.URL+'"'+
'<br>'+sprintf("%1 bla %2 blubb %3 oef", 123, "test", 0, "hidden") +
         '</pre>');
    }
  }
  setTimeout("myLoop()", 100);

} /* myLoop */

/******************************************************************************/

function makeMenuEntry(txt, lnk, par)
{
  var plink=lnk;
  if (par) { plink+='?'+par;}

  var bk = "#E0E0E0";

  var url=document.URL;
  if (url.match("ACC_help")) {
    url="ACC_help_index.html";
  } else {
    if (url.match("checkout")) {
      url="products.html";
    } else {
      if (url.match("detached")) {
        url="products.html";
      } else {
        if (url.match("checkin")) {
          url="checkin.html";
        } else {
          if ((url.match("editlog")) ||
              (url.match("prodadm")) ||
              (url.match("chpw")) ||
              (url.match("config"))) {
            url="config.html";
          }
        }
      }
    }
  }

  if (url.match(lnk)) { bk="#FFFFFF";}

  return '<tr onClick="location=\''+plink+'\'">'+
    '<td class="menu" '+
        'onMouseOver="this.style.backgroundColor=\'#808080\', '+
                     'this.style.color=\'#FFFFFF\', '+
                     'this.style.cursor=\'pointer\'" '+
        'onMouseOut="this.style.backgroundColor=\'' + bk + '\', '+
                    'this.style.color=\'#000000\'" '+
        'bgcolor="' + bk + '">'+txt+
    '</td></tr>';
}

function reloadINI()
{
  doSubmitStringNoRefresh("reload_ini=1\n");
}


function makeMenu()
{
  var x;
  var se='<tr><td class="empty">&nbsp;</td></tr>';

  var s=
    '<table class="menu" cellpadding="0" cellspacing="0" width="116">'+
    '<tr><td class="menuheader" align="left" bgcolor="#808080" valign="top">'+
    '<b><font color="#FFFFFF">Administration Options</font><br></b></td></tr>';

  s+=se+
     makeMenuEntry("HASP Keys", "devices.html", "")+
     makeMenuEntry("Products", "products.html", "")+
     makeMenuEntry("Features", "features.html", "")+
     makeMenuEntry("Sessions", "sessions.html", "")+
     se;

  if (commuting) {
    s+=makeMenuEntry("Update/Attach", "checkin.html", "");
  } else {
    s+=makeMenuEntry("Update", "checkin.html", "");
  }

  s+=se+
     makeMenuEntry("Access Log", "log.html", "count=20")+
     makeMenuEntry("Configuration", "config.html", "")+
     makeMenuEntry("Diagnostics", "diag.html", "")+
     se+
     makeMenuEntry("Help", "ACC_help_index.html", "")+
     makeMenuEntry("About", "about.html", "");

  s+='<tr><td>&nbsp;</td></tr>';

  if (axel) {
    s+='<tr><td><center>'+
    
       '<a class="text" href="javascript:clearAllCookies()">'+
       '<font color="#FF0000">Clear Cookies</font></a><br>'+

       '<a class="text" href="javascript:reloadINI()">'+
       '<font color="#FF0000">Re-Load INI</font></a>'+

       '</center></td></tr>';
  }

  se='<tr><td>&nbsp;</td></tr>';

  s+=se+se+se+se+se+se;

  s+=myFlags();

  wr('mymenu',s+'</table>');
}

/******************************************************************************/

function myFlags()
{
  var n, s;

  s='<tr><td>';

  for (i=0; i<l10nData.length-1; i++) {
    n=l10nData[i].name;
    if (l10nData[i].path=='/_int_/') { n+=' (internal)';}
    s+= '<a class="flag" '+
        'onMouseOver="popText(\''+n+'\')" '+
        'onMouseOut="popHide()" '+
        'hr'+'ef="'+l10nData[i].path+getPageFilename()+'">'+
        '<img border=0 src="'+l10nData[i].icon+'" '+
        'width="20" height="13"></a> ';
  } /* for i */

  s+='<br><center><nobr><a class="text" href="getlang.html">'+
     'More Languages ...</a></nobr></center>'

  return s+'</td></tr>';
}

function myStart()
{
  var s1,s2;

  makeMenu();
  countdown=glbPageRefresh*10;
  fill();
  myLoop();

  if (currentHash) {
    if (currentHash.length==32) {
      setPWCookie(currentHash);
    }
  }

  s1=getLanguageCookie();
  s2=getLanguage();
  if (s1!=s2) {
    setLanguageCookie(s2);
  }
}


var submitCallback = function (http)
{
  popHide();
  if (glbPageRefresh>0) {
    countdown=0;
  } else {
   fill();
  }
};


function doSubmitString(data)
{
  if (!data) { return;}
  if (!data.length) { return;}
  popHide();
  var localHttp=new MyHttpObj();
  if (!localHttp) { alert("XMLHTTP not available. Please try a newer browser.");}
  localHttp.connect("action.html", "POST", data, submitCallback);
  data=null;
}

/******************************************************************************/

function coSetDate(y,m,d) /* if year==0, set to tomorrow morning */
{
 var x;
 var dt=new Date();

/* alert('coSetDate('+y+','+m+','+d+');'); */

 if (!y) {
   dt.setTime(dt.getTime()+(1000*60*60*24));
   d=dt.getDate();
   m=dt.getMonth()+1;
   y=dt.getFullYear();
 }

 if ((x=document.getElementById('co_dateday'))) { x.selectedIndex=d-1;}
 if ((x=document.getElementById('co_datemonth'))) { x.selectedIndex=m-1;}
 if ((x=document.getElementById('co_dateyear'))) { x.selectedIndex=y-coo.firstYear;}
 coCalc();
}


var coCnt = 0;

function coCalc() /* return BSD target time */
{
  var i,x,loc,dyear,dmonth,dday,ext1,ext2,ext3,isext;

  var now=new Date();
  coo.now.setTime(now.getTime());

  /* get current guid, detect extension and display info */
  ext1='&nbsp;';
  ext2='&nbsp;';
  if (coo.online) {
    coo.guid='online';
  } else {
    coo.guid='ERROR';

    if ((x=document.getElementById('co_seldet'))) {
      i=x.selectedIndex;
      if ((i>=0) && (i<coo.locations.length)) { coo.guid=coo.locations[i].guid;}
    }

    /* check detached list for known guid */
    isext=0;
     for (i=0; i<coo.detached.length; i++) {
       if (coo.detached[i].guid == coo.guid) {
         ext1='Existing license to be extended:';
         ext2='Created: '+niceTime(coo.detached[i].det)+
              '<br>Expires: '+niceTime(coo.detached[i].ex);
         isext=1;
         break;
       }
     }
  }

  wr('co_txtext',ext1);
  wr('co_infoext',ext2);

  /* get selected date from selection boxes */
  dyear=0;
  dmonth=0;
  dday=0;
  if ((x=document.getElementById('co_dateday'))) {
    dday=parseInt(x.options[x.selectedIndex].text);
  }
  if ((x=document.getElementById('co_datemonth'))) {
    dmonth=parseInt(x.options[x.selectedIndex].text);
  }
  if ((x=document.getElementById('co_dateyear'))) {
    dyear=parseInt(x.options[x.selectedIndex].text);
  }

  coo.dtarget.setTime(coo.now.getTime());
  coo.dtarget.setDate(1); /* avoid carry to next month on 31th, or Feb. 29th/30th */
  coo.dtarget.setHours(23);
  coo.dtarget.setMinutes(59);
  coo.dtarget.setSeconds(0);
  coo.dtarget.setFullYear(dyear);
  if (dmonth>0) { coo.dtarget.setMonth(dmonth-1);}
  coo.dtarget.setDate(dday);

  if (coo.dtarget > coo.dmax) {
    wr('co_abovelimit','Date is above detach limit');
    hide("co_co_button");
    show("co_co_buttondis");
  }
  else if (coo.dtarget < coo.now) {
    wr('co_abovelimit','Date is in the past');
    hide("co_co_button");
    show("co_co_buttondis");
  }
  else {
    wr('co_abovelimit','&nbsp;');
    show("co_co_button");
    hide("co_co_buttondis");
  }

  /* write debug kram */
  coCnt++;
  if (axel) {
    wr('co_debug',
     '<pre><font color="#FF0000">'+
     'DEBUG: '+coCnt +
     '<br>now      = '+getDateISO(coo.now)+'&nbsp;&nbsp;(Unix:'+Math.floor(coo.now.getTime()/1000)+')'+
     '<br>target   = '+getDateISO(coo.dtarget)+'&nbsp;&nbsp;(Unix:'+Math.floor(coo.dtarget.getTime()/1000)+')'+
     '<br>maxtime  = '+getDateISO(coo.dmax)+'&nbsp;&nbsp;(Unix:'+Math.floor(coo.dmax.getTime()/1000)+')'+
     '<br>online   = '+coo.online+', detach = '+coo.det+
     '<br>lms.guid = '+coo.guid+
     '<br>'+dyear+'  '+dmonth+'  '+dday+
     '</font></pre>');
  }

  return '&time='+Math.floor(coo.dtarget.getTime()/1000)+'&location='+coo.guid;
}


function coGoTomorrow() {
 coSetDate(0,0,0);
}


function coGoDay(wday) {
  var d=new Date();
  if (wday<0) { return;}
  if (wday>6) { return;}

  do {
    d.setTime(d.getTime()+(1000*60*60*24));
  } while (d.getDay()!=wday);

  coSetDate(d.getFullYear(),d.getMonth()+1,d.getDate());
}


function doCheckout(haspid,vendorid,productid)
{
  var x,i;
  var s,sm,sdd,sdm,sdy;

  popHide();

  sm='online';
  if ((x=document.getElementsByName('checkoutmethod'))) {
    for (i=0; i<x.length; i++) {
      if (x[i].checked) { sm=x[i].value;}
    }
  }

  if ((x=document.getElementById("co_dateday"))) {
    sdd=x.options[x.selectedIndex].text;
  }

  if ((x=document.getElementById("co_datemonth"))) {
    sdm=x.options[x.selectedIndex].text;
  }

  if ((x=document.getElementById("co_dateyear"))) {
    sdy=x.options[x.selectedIndex].text;
  }

  s='checkout2.html?haspid='+haspid+
    '&vendorid='+vendorid+
    '&productid='+productid+
    '&method='+sm+
    coCalc();

  switchDataUrl(s);
}

function doCancel(haspid,vendorid,productid)
{
  switchDataUrl('cancel2.html?haspid='+haspid+
                '&vendorid='+vendorid+
                '&productid='+productid);
}

/******************************************************************************/

var submitCallbackNoRefresh = function (http)
{
};


function doSubmitStringNoRefresh(data)
{
  if (!data) { return;}
  if (!data.length) { return;}
  popHide();
  var localHttp=new MyHttpObj();
  if (!localHttp) { alert("XMLHTTP not available. Please try a newer browser.");}
  localHttp.connect("action.html", "POST", data, submitCallbackNoRefresh);
  data=null;
}

/******************************************************************************/

function calcSubmit(name)
{
  var s='';
  var i;
  var x=document.getElementsByName(name);

  for (i=0; i<x.length; i++) {   /* don't use "for (i in x)" */
    if (x[i].type == "text") {
      s+=x[i].id + '="' + x[i].value + '"\n';
    } else if (x[i].type == "password") {
      s+=x[i].id + '=' + MD5(x[i].value) + '\n';
    } else if (x[i].type == "textarea") {
      s+=x[i].id + "\n" + x[i].value + "\n/" + x[i].id + "\n";
    } else if (x[i].type == "checkbox") {
      s+=x[i].id + "=";
      if (x[i].checked) { s+= "1\n";} else { s+= "0\n";}
    } else if (x[i].type == "radio") {
      s+=x[i].id + "=";
      if (x[i].checked) { s+= "1\n";} else { s+= "0\n";}
    } else {
      s+=x[i].id + '="ERROR unknown type: ' + x[i].type + '"\n';
    }
    x[i].style.backgroundColor="#FFFFFF";
  }
  return s;
}

/******************************************************************************/

/* special color handling for 2 config items in one line */
function checkConfigMulti(cid,item1,item2)
{
  var tgt,r1,r2,c;

  if ((tgt=document.getElementById(cid))) {

    c="#F0F0F0";

    if ((r1=document.getElementById(item1))) {
      if ((r2=document.getElementById(item1+'A'))) {
        if (r1.type=="checkbox") {
          if (r1.checked != r2.checked) {
            c="#FFD0D0";
          }
        } else {
          if (r1.value != r2.value) {
            c="#FFD0D0";
          }
        }
      }
    }

    if ((r1=document.getElementById(item2))) {
      if ((r2=document.getElementById(item2+'A'))) {
        if (r1.type=="checkbox") {
          if (r1.checked != r2.checked) {
            c="#FFD0D0";
          }
        } else {
          if (r1.value != r2.value) {
            c="#FFD0D0";
          }
        }
      }
    }

    tgt.style.backgroundColor=c;
  }
}

/******************************************************************************/

function checkConfigChange()
{
 var chk=document.getElementsByName("config");
 var i,tgt,cmp;

/* alert('checkConfigChange'); */

 checkLogFile();

 for (i=0;i<chk.length;i++) {
   if ((tgt=document.getElementById(chk[i].id+"C"))) {
     if ((cmp=document.getElementById(chk[i].id+"A"))) {
       if (chk[i].type=="checkbox") {
         if (chk[i].checked == cmp.checked) {
           tgt.style.backgroundColor="#F0F0F0";
         } else {
           tgt.style.backgroundColor="#FFD0D0";
         }
       }
     }
   }
 }

 chk=document.getElementsByName("configr");
 for (i=0;i<chk.length;i++) {
   if ((tgt=document.getElementById(chk[i].id+"C"))) {
     if ((cmp=document.getElementById(chk[i].id+"A"))) {
       if (chk[i].type=="radio") {
         if (chk[i].checked == cmp.checked) {
           tgt.style.backgroundColor="#F0F0F0";
         } else {
           tgt.style.backgroundColor="#FFD0D0";
         }
       }
     }
   }
 }

 chk=document.getElementsByName("configv");
 for (i=0;i<chk.length;i++) {
   if ((tgt=document.getElementById(chk[i].id+"C"))) {
     if ((cmp=document.getElementById(chk[i].id+"A"))) {
       if (chk[i].value == cmp.value) {
         tgt.style.backgroundColor="#F0F0F0";
       } else {
         tgt.style.backgroundColor="#FFD0D0";
       }
     }
   }
 }

 checkConfigMulti('reservedC','reservedseats','reservedpercent');
 checkConfigMulti('accesslogC', 'dolog', 'access_log_maxsize');
 checkConfigMulti('errorlogC', 'doerrorlog', 'error_log_maxsize');
/* checkConfigMulti('detachmaxC','detachmaxdays','detachmaxhours');*/

 setTimeout("checkConfigChange()", 1000);
}

/******************************************************************************/

function doShow (sname)
{
  wr('mydata',
     "<font color=\"#FF0000\">this is debug stuff and will vanish</font><br>"+
     "<pre>"+calcSubmit(sname)+
     "---------------------\n"+
     getPWCookie()+
     "\n---------------------\n"+
     "</pre>");
}

/******************************************************************************/

function doSubmit (sname)
{
  doSubmitString(sname + "\n" + calcSubmit(sname) + "/" + sname + "\n");
  sname=null;
}

/******************************************************************************/

function doSubmitConfig ()
{
  var s = calcSubmit('config') +
          calcSubmit('configr') +
          calcSubmit('configv');
  doSubmitString("config\n" + s + "/config\n");
  s=null;
}

/******************************************************************************/

function doSubmitConfigUrl (url)
{
  dataUrl=url;
  doSubmitConfig();
}

/******************************************************************************/

function pwError ( red, msg )
{
  if (red) {
    wr('pwmsg', "&nbsp;&nbsp;<font color=\"#FF0000\"><b>" + msg + "</b></font>");
  } else {
    wr('pwmsg', "&nbsp;&nbsp;<b>" + msg + "</b>");
  }
}

/******************************************************************************/

function doSubmitPW ()
{
  var x, pwo, pw1, pw2, cook;

  if ((x=document.getElementById('enteradminpass'))) {
    pwo=MD5(x.value);
  }
  if ((x=document.getElementById('adminpass1'))) {
    pw1=MD5(x.value);
  }
  if ((x=document.getElementById('adminpass2'))) {
    pw2=MD5(x.value);
  }

  cook=getPWCookie();
  if (!cook) {
    cook=emptyMD5;
  } else {
    if (!cook.length) { cook=emptyMD5;}
  }

  if (pwo!=cook) {
    pwError(1, "ERROR: Current password is incorrect");
    return;
  }
  if (pw1!=pw2) {
    pwError(1, "ERROR: New passwords do not match");
    return;
  }

  pwError(0, "OK");
  setPWCookie(pw1);

  doSubmitStringNoRefresh(
    "config\nenteradminpass="+pwo+
    "\nadminpass1="+pw1+
    "\nadminpass2="+pw2+
    "\n/config\n");

  if ("{access_log_maxsize}".match(/### illegal tag/)) {
    setDataUrl("conf_basic50.html");
  } else {
    setDataUrl("conf_basic.html");
  }

  countdown=10;
  glbPageRefresh=5;

}

/******************************************************************************/

function condSubmitPW ()
{
  var x;

  if ((x=document.getElementById('adminpass1'))) {
    if (x.value.length) {
      doSubmitPW();
      return;
    }
  }

 if ((x=document.getElementById('pwsubmit'))) {
   pwError(1,
     "The new password you specified is empty !<br>&nbsp;&nbsp;"+
     "Click &#39;Submit empty password&#39; if you are sure that you want to specify an empty password.");
   x.innerHTML =
     '<a class="button" href="javascript:doSubmitPW()">&nbsp;Submit&nbsp;empty&nbsp;password&nbsp;</a>'+
     '<a class="button" href="config.html">&nbsp;Cancel&nbsp;</a>';
  }
}

/******************************************************************************/

function resetSubmitPW ()
{
  var x;

  if ((x=document.getElementById('pwsubmit'))) {
    pwError(0, "");
    x.innerHTML =
      '<a class="button" href="javascript:condSubmitPW()">&nbsp;Submit&nbsp;</a>'+
      '<a class="button" href="config.html">&nbsp;Cancel&nbsp;</a>';
  }
}

/******************************************************************************/

function deleteLogin(sessionid)
{
  countdown=20;
  doSubmitStringNoRefresh("deletelogin=" + sessionid + "\n");
  clearWait();
  countdown=20;
}

/******************************************************************************/

function doAddRestr(s)
{
  var x = document.getElementById("restrictions");
  if (x) {
    x.value = x.value + s + "\n";
  }
}


function openRestr()
{
  window.open("restrict.html",
              "HaspLmRestrict",
              "width=600,height=450,left=0,resizable=yes,scrollbars=yes");
}


function openUsers()
{
  window.open("users.html",
              "HaspLmUsers",
              "width=850,height=450,left=0,resizable=yes,scrollbars=yes");
}


function openRecipients()
{
  window.open("recipients.html",
              "HaspLmRecipients",
              "width=850,height=450,left=0,resizable=yes,scrollbars=yes");
}

/******************************************************************************/

function setDefaults(pr, lpp)
{
  var x;

/*  if ((x=document.getElementById("accremote"))) { x.checked=0;} */

  if ((x=document.getElementById("pagerefresh"))) { x.value=pr;}
  if ((x=document.getElementById("linesperpage"))) { x.value=lpp;}
  if ((x=document.getElementById("dolog"))) { x.checked=0;}
  if ((x=document.getElementById("loglocal"))) { x.checked=0;}
  if ((x=document.getElementById("logremote"))) { x.checked=0;}
  if ((x=document.getElementById("logadmin"))) { x.checked=0;}
  if ((x=document.getElementById("doerrorlog"))) { x.checked=0;}
  if ((x=document.getElementById("dopidfile"))) { x.checked=0;}
  if ((x=document.getElementById("rotatelogs"))) { x.checked=0;}

  if ((x=document.getElementById("access_log_maxsize"))) { x.value=0;}
  if ((x=document.getElementById("error_log_maxsize"))) { x.value=0;}
  if ((x=document.getElementById("zip_logs_days"))) { x.value=0;}
  if ((x=document.getElementById("delete_logs_days"))) { x.value=0;}

  if ((x=document.getElementById("accessfromremote"))) { x.checked=1;}
  if ((x=document.getElementById("restrictions"))) { x.value="allow=all\n";}

  if ((x=document.getElementById("accesstoremote"))) { x.checked=1;}
  if ((x=document.getElementById("broadcastsearch"))) { x.checked=1;}
  if ((x=document.getElementById("aggressive"))) { x.checked=0;}
  if ((x=document.getElementById("serverlist"))) { x.value="";}
  if ((x=document.getElementById("users"))) { x.value="allow=all@all\n";}

  if ((x=document.getElementById("logtemplate"))) {
    x.value='{timestamp}'+
            ' {clientaddr}:{clientport} {clientid} {method} {url}'+
            ' {function}({functionparams}) result({statuscode}) {newline}';
  }

  if ((x=document.getElementById("enabledetach"))) { x.checked=0;}
  if ((x=document.getElementById("reservedseats"))) { x.value=0;}
  if ((x=document.getElementById("reservedpercent"))) { x.value=0;}
  if ((x=document.getElementById("reciprestrict"))) { x.value="";}
  if ((x=document.getElementById("detachmaxdays"))) { x.value=14;}
}

/******************************************************************************/

function doAddTag (target)
{
  var sel,x,y,s,t,i;
  if ((x=document.getElementById(target))) {
    if ((y=document.getElementById('logtags'))) {
      sel=y.selectedIndex;
      if (sel>=0) {
        s=y.options[sel].text;
        t='';
        for (i=0;i<s.length;i++) {
          if (s.charAt(i)==' ') {
            break;
          } else {
            t+=s.charAt(i);
          }
        }
        x.value+=' {' /*keep space*/+t.toLowerCase()+'}';
      }
    }
  }
}

/******************************************************************************/

function switchMenu()
{
  var x=document.getElementById('enabledetach');
  if (x) {
    if (x.checked) { enabledetach=1;} else { enabledetach=0;}
  }
}

/******************************************************************************/
/* eof */
