/*
Copyright 2011, KISSY UI Library v1.20dev
MIT Licensed
build time: Aug 22 15:38
*/
KISSY.add("flash/base",function(){return{swfs:{},length:0,version:"1.3"}});
KISSY.add("flash/ua",function(h,k){function m(i){var j=h.isString(i)?i.match(/(\d)+/g).splice(0,3):i;i=i;if(h.isArray(j))i=parseFloat(j[0]+"."+e(j[1],3)+e(j[2],5));return i||0}function e(i,j){for(var q=(i+"").length;q++<j;)i="0"+i;return i}var p,l,o=true;k.fpv=function(i){if(i||o){o=false;var j;if(navigator.plugins&&navigator.mimeTypes.length)j=(navigator.plugins["Shockwave Flash"]||0).description;else if(window.ActiveXObject)try{j=(new ActiveXObject("ShockwaveFlash.ShockwaveFlash")).GetVariable("$version")}catch(q){}p=
j?j.match(/(\d)+/g).splice(0,3):void 0;l=m(p)}return p};k.fpvGEQ=function(i,j){o&&k.fpv(j);return!!l&&l>=m(i)}},{requires:["ua"]});
KISSY.add("flash/embed",function(h,k,m,e,p){function l(a,b){return j+a+q+r+b+r}function o(a,b){return'<param name="'+a+'" value="'+b+'" />'}var i=/^(?:object|embed)/i,j=" ",q="=",r='"',s=Object.prototype,t=encodeURIComponent,u={wmode:"",allowscriptaccess:"",allownetworking:"",allowfullscreen:"",play:"false",loop:"",menu:"",quality:"",scale:"",salign:"",bgcolor:"",devicefont:"",hasPriority:"",base:"",swliveconnect:"",seamlesstabbing:""},v={params:{},attrs:{width:215,height:138},version:9};h.mix(e,
{fpv:k.fpv,fpvGEQ:k.fpvGEQ,add:function(a,b,c){var f,g,d,n;b=e._normalize(b);b=h.merge(v,b);b.attrs=h.merge(v.attrs,b.attrs);g=h.isString(a)?a.replace("#",""):a;if(!(a=m.get(a))){a=m.create("<div id="+g+"/>");m.prepend(a,document.body)}n=a.nodeName.toLowerCase();d=!i.test(n);if(!a.id)a.id=h.guid("ks-flash-container-");g=a.id;if(!b.id)b.id=h.guid("ks-flash-");b.attrs.id=b.id;if(k.fpv()){if(!k.fpvGEQ(b.version)){e._callback(c,0,g,a,d);if(!((f=b.xi)&&h.isString(f)))return;b.src=f}if(d)b.src?e._embed(a,
b,c):e._callback(c,-3,g,a,d);else{if(n=="object")if(k.gecko||k.opera||k.chrome>7)a=m.query("object",a)[0]||a;b.attrs.id=g;e._register(a,b,c,d)}}else e._callback(c,-1,g,a,d)},get:function(a){a=h.isString(a)?a.replace("#",""):a;return e.swfs[a]},remove:function(a){if(a=e.get(a)){m.remove(a);delete e.swfs[a.id];e.length-=1}},contains:function(a){var b=e.swfs,c,f=false;if(h.isString(a))f=a in b;else for(c in b)if(b[c]===a){f=true;break}return f},_register:function(a,b,c,f){b=b.attrs.id;e._addSWF(b,a);
e._callback(c,1,b,a,f)},_embed:function(a,b,c){a.innerHTML=e._stringSWF(b);a=m.get("#"+b.id);e._register(a,b,c,true)},_callback:function(a,b,c,f,g){b&&h.isFunction(a)&&a({status:b,id:c,swf:f,dynamic:!!g})},_addSWF:function(a,b){if(a&&b){e.swfs[a]=b;e.length+=1}},_stringSWF:function(a){var b;var c=b="",f=a.src,g=a.attrs;a=a.params;var d,n;if(k.ie){n="object";for(d in g)if(g[d]!=s[d])if(d!="classid"&&d!="data")b+=l(d,g[d]);b+=l("classid","clsid:d27cdb6e-ae6d-11cf-96b8-444553540000");for(d in a)if(d in
u)c+=o(d,a[d]);c+=o("movie",f);if(a.flashvars)c+=o("flashvars",e.toFlashVars(a.flashvars));b="<"+n+b+">"+c+"</"+n+">"}else{n="embed";b+=l("src",f);for(d in g)if(g[d]!=s[d])if(d!="classid"&&d!="data")b+=l(d,g[d]);b+=l("type","application/x-shockwave-flash");for(d in a)if(d in u)c+=l(d,a[d]);if(a.flashvars)c+=l("flashvars",e.toFlashVars(a.flashvars));b="<"+n+b+c+"/>"}return b},_normalize:function(a){var b,c,f,g=a||{};if(h.isPlainObject(a)){g={};for(f in a){b=f.toLowerCase();c=a[f];if(b!=="flashvars")c=
e._normalize(c);g[b]=c}}return g},toFlashVars:function(a){if(!h.isPlainObject(a))return"";var b,c,f=[];for(b in a){c=a[b];if(h.isString(c))c=t(c);else{c=p.stringify(c);if(!c)continue;c=c.replace(/:"([^"]+)/g,function(g,d){return':"'+t(d)})}f.push(b+"="+c)}return f.join("&").replace(/"/g,"'")}});return e},{requires:["ua","dom","flash/base","json","flash/ua"]});KISSY.add("flash",function(h,k){return h.Flash=k},{requires:["flash/base","flash/embed"]});
