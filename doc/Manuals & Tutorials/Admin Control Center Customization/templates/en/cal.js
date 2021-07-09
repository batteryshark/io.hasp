/*
----------------------------------------------------------------------------------

(c) 2009 SafeNet, Inc., and/or Aladdin Knowledge Systems Ltd. All rights reserved.

$Id: cal.js,v 1.5 2009-11-05 13:55:25 axel Exp $

HASP LM - Admin Control Center - Calendar

----------------------------------------------------------------------------------
*/

function MyCalendar() {

  var startWithMonday=1; /* 0 starts with sunday */

  var curYear=0;
  var curMonth=0;
  var curDay=0;
  var selYear=0;
  var selMonth=0;
  var selDay=0;

  var months=['January',
              'February',
              'March',
              'April',
              'May',
              'June',
              'July',
              'August',
              'September',
              'October',
              'November',
              'December'];

/******************************************************************************/

  function getDaysInMonth (y,m) {
    return [0,31,((!(y % 4 ) && ( (y % 100 ) || !( y % 400 ) ))?29:28),
            31,30,31,30,31,31,30,31,30,31][m];
  }

/******************************************************************************/

  this.setToday=function() {
    var d=new Date();
    selDay=curDay=d.getDate();
    selMonth=curMonth=d.getMonth()+1;
    selYear=curYear=d.getFullYear();
    wr('caldiv',this.calDraw());
  };

/******************************************************************************/

  this.returnDate=function(y,m,d) {
    coSetDate(y,m,d);
    this.hide();
    return;
  };

/******************************************************************************/

  this.changeMonth=function(x) {
    curMonth+=x;
    curDay=0;
    if(curMonth > 12) { curMonth=1; curYear++; }
    else if(curMonth < 1) { curMonth = 12; curYear--; }
    wr('caldiv',this.calDraw());
  };

/******************************************************************************/

  this.allowedDay=function(y,m,d) {
    var now=new Date();
    var x=new Date(y,m-1,d,23,59,59);

    if (x.getTime()<now.getTime()) { return false; }
    return true;
  };

/******************************************************************************/

  this.calDraw=function() {

    var dayOfMonth=1;
    var validDay=0;
    var d=new Date(curYear,curMonth-1,dayOfMonth);
    var startDayOfWeek=d.getDay();
    var daysInMonth=getDaysInMonth(curYear,curMonth);
    var cssc='';

    var s=
      "<table cellspacing='0' cellpadding='0' border='0'>"+
      "<tr class='header'>"+
        "<td colspan='2'>"+
          '<a class="button" href="javascript:cal.changeMonth(-1);">&nbsp;&lt;&nbsp;</a>'+
          '<a class="button" href="javascript:cal.changeMonth(1);">&nbsp;&gt;&nbsp;</a>'+
        "</th>"+
        "<td colspan='3' class='title'>"+months[curMonth-1]+"<br>"+curYear+"</td>"+
        "<td colspan='2'>"+
          '<a class="button" href="javascript:cal.setToday();">&nbsp;T&nbsp;</a>'+
          '<a class="button" href="javascript:cal.hide();">&nbsp;X&nbsp;</a>'+
        "</td>"+
      "</tr>";

    if (startWithMonday) {
      s+="<tr><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th><th>Sun</th></tr>";
    } else {
      s+="<tr><th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th></tr>";
    }

    for (var week=0; week<6; week++) {
      s+="<tr>";
      var dayOfWeek;
      for (var i=0; i<7; i++) {
        if (startWithMonday) {
          dayOfWeek=i+1;
          if (i==6) { dayOfWeek=0;}
        } else {
          dayOfWeek=i;
        }

        if (week===0 && startDayOfWeek==dayOfWeek) {
          validDay=1;
        } else if (validDay==1 && dayOfMonth>daysInMonth) {
          validDay=0;
        }

        if(validDay) {

          cssc='wday';
          if (dayOfWeek===0 || dayOfWeek==6) { cssc='wend';}
          if (dayOfMonth==selDay && curYear==selYear && curMonth==selMonth) { cssc='wcur';}

          if (this.allowedDay(curYear,curMonth,dayOfMonth)) {
            s+="<td><a class='"+cssc+
            "' href=\"javascript:cal.returnDate("+curYear+","+curMonth+","+dayOfMonth+")\">"+
            dayOfMonth+"</a>";
          } else {
            s+='<td><span class="nallow">'+dayOfMonth+'</span>';
          }

          s+="</td>";
          dayOfMonth++;
        } else {
          s+="<td class='empty'>&nbsp;</td>";
        }
      }
      s+="</tr>";
    }

    s+='</table>';
    return s;
  };

/******************************************************************************/

  this.show=function(id) {

    if (!(selYear && selMonth && selDay)) {
      var d=new Date();
      selYear=d.getFullYear();
      selMonth=d.getMonth()+1;
      selDay=d.getDate();
    }

    curMonth=selMonth;
    curDay=selDay;
    curYear=selYear;

    wr('caldiv', this.calDraw(curYear, curMonth));

    setProperty('display','block','caldiv');

    var x=getPosX(id)-1;
    var y=getPosY(id)-1;

    var e=document.getElementById('caldiv');
    var w=parseInt(e.offsetWidth);
    var h=parseInt(e.offsetHeight);

    setProperty('left',x+'px','caldiv');
    setProperty('top',y+'px','caldiv');

    if (document.all) {
      setProperty('display','block','calframe');
      setProperty('left',x+'px','calframe');
      setProperty('top',y+'px','calframe');
      setProperty('width',w+'px','calframe');
      setProperty('height',h+'px','calframe');
    }
  };

/******************************************************************************/

  this.hide=function() {
    setProperty('display','none','caldiv');
    setProperty('display','none','calframe');
  };

}

/******************************************************************************/

var cal = new MyCalendar();

/******************************************************************************/
