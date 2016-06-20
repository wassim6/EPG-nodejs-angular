 

document.getElementById("futer").innerHTML =
"Copyright<sup>&copy;</sup> & design: Studenti poslovne informatike  -" + new Date().getFullYear() + " god.";


/*------POČETAK CLOCKBOX-----------*/
tday=new Array("Nedelja","Ponedeljak","Utorak","Srijeda","Četvrtak","Petak","Subota");
tmonth=new Array("januar","februar","mart","april","maj","jun","jul","avgust","septembar","oktobar","novembar","decembar");

function GetClock(){
var d=new Date();
var nday=d.getDay(),nmonth=d.getMonth(),ndate=d.getDate(),nyear=d.getYear(),nhour=d.getHours(),nmin=d.getMinutes(),nsec=d.getSeconds(),ap;

     if(nhour==0){ap=" AM";nhour=12;}
else if(nhour<12){ap=" AM";}
else if(nhour==12){ap=" PM";}
else if(nhour>12){ap=" PM";nhour-=12;}

if(nyear<1000) nyear+=1900;
if(nmin<=9) nmin="0"+nmin;
if(nsec<=9) nsec="0"+nsec;

document.getElementById('clockbox').innerHTML = "" + tday[nday] + ",  " + ndate + ". " + tmonth[nmonth] + ". " + nyear + ". " + nhour + ":" + nmin + ":" + nsec + ap + "";
document.getElementById('trenutnidatum').innerHTML = " " + ndate + ". " + tmonth[nmonth] + ". " + nyear + ".";
}


window.onload=function(){
GetClock();
setInterval(GetClock,1000);
}

/*----------KRAJ CLOCKBOX----------*/
