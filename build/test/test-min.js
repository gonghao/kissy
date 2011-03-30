/*
Copyright 2011, KISSY UI Library v1.1.8dev
MIT Licensed
build time: ${build.time}
*/
var KISSY=window.KISSY||{};
(function(e,l,o){function p(){q||l.Test.init()}var i=e.document,g=function(a){return typeof a==="string"?i.getElementById(a):a},r=function(){return(new Date).getTime()},m=function(a){return a<10?"0"+a:a},u=function(){var a=new Date;return m(a.getHours())+":"+m(a.getMinutes())+":"+m(a.getSeconds())},c=[],j,s,k,h,n,f={init:function(){j=g("log");s=g("hidepasses").checked;k=g("times").value;h=g("wl").value},time:function(a){a.startTime=r()},timeEnd:function(a){a.tookTime=r()-a.startTime},echo:function(a,
b,d){if(b===o)b="<br />";if(d===o)d=u()+" ";j.innerHTML+=d+a+b;f.scrollToEnd()},scrollToEnd:function(){n||(n=setTimeout(function(){j.scrollTop=j.scrollHeight;n=null},5))},log:function(a){var b="";b+='<span class="'+a.status+'">';b+="["+a.status.toUpperCase()+"] ";b+=a.name+": ";b+=a.tookTime+"ms ";if(a.extraMsg)b+=a.extraMsg;b+="</span>";a.status==="sep"?this.echo("","<hr />",""):this.echo(b)}};c.add=function(a,b){c.push({name:a,fn:function(){b.call(e,this)},fail:function(d){this.status="failed";
if(d)this.extraMsg=d},status:"passed",extraMsg:"",echo:f.echo})};c.reset=function(){for(var a=0,b=c.length;a<b;a++){c[a].status="passed";c[a].extraMsg=""}};l.Test={Config:{},init:function(){var a=this.Config;if(a.times)g("times").value=a.times;if(a.hidepasses)g("hidepasses").checked=a.hidepasses;if(a.wl)g("wl").value=a.wl;f.init();a=e.RuntimeObject?e.RuntimeObject("test_*"):e;for(var b in a)b.indexOf("test_")===0&&typeof e[b]==="function"&&c.add(b,e[b]);navigator.userAgent.indexOf("Firefox")!==-1&&
c.reverse();q=true},render:function(){var a=i.getElementsByTagName("script");a='<link rel="stylesheet" href="'+a[a.length-1].src.replace(".js",".css")+'" /><form onsubmit="return false" action="" class="ks-test-form"><button type="button" onclick="KISSY.Test.start()">Start</button><div id="konsole"><div id="log"></div></div><div class="settings">Settings:<br/><input type="checkbox" id="hidepasses" name="hidepasses"/><label for="hidepasses">Hide passes</label><br/><input type="text" value="1" id="times" size="4"/><label for="times">Iteration times for each test function</label><br/><input type="text" value="" id="wl" size="12"/><label for="wl">The whitelist of test names</label></div></form>';
i.body.className+=" ks-test";i.write(a)},start:function(){f.init();c.reset();var a=c.length,b,d,t;k=k||1;h=h||"";f.echo("[START]");for(d=0;d<a;d++){b=c[d];if(!(h&&h.indexOf(b.name)===-1)){t=k;for(f.time(b);t--;)b.fn();f.timeEnd(b);s&&b.status==="passed"||f.log(b)}}f.echo("[DONE]","<hr />")},echo:f.echo};l.Test.render();var q=false;e.attachEvent?e.attachEvent("onload",p):e.addEventListener("load",p,false)})(window,KISSY);
