/*
Copyright 2010, KISSY UI Library v1.1.5
MIT Licensed
build time: Nov 17 22:48
*/
(function(o,h,q){if(o[h]===q)o[h]={};h=o[h];var s=o.document,y=location,p=function(a,c,d,e){if(!c||!a)return a;if(d===q)d=true;var f,g,l;if(e&&(l=e.length))for(f=0;f<l;f++){g=e[f];if(g in c)if(d||!(g in a))a[g]=c[g]}else for(g in c)if(d||!(g in a))a[g]=c[g];return a},z=false,u=[],w=false,A=/^#?([\w-]+)$/,B=0;p(h,{version:"1.1.5",__init:function(){this.Env={mods:{},_loadQueue:{}};var a=s.getElementsByTagName("script");this.Config={debug:"",base:a[a.length-1].src.replace(/^(.*)(seed|kissy).*$/i,
"$1"),timeout:10}},ready:function(a){w||this._bindReady();z?a.call(o,this):u.push(a);return this},_bindReady:function(){var a=this,c=s.documentElement.doScroll,d=c?"onreadystatechange":"DOMContentLoaded",e=function(){a._fireReady()};w=true;if(s.readyState==="complete")return e();if(s.addEventListener){var f=function(){s.removeEventListener(d,f,false);e()};s.addEventListener(d,f,false);o.addEventListener("load",e,false)}else{var g=function(){if(s.readyState==="complete"){s.detachEvent(d,g);e()}};s.attachEvent(d,
g);o.attachEvent("onload",e);var l=false;try{l=o.frameElement==null}catch(t){}if(c&&l){var n=function(){try{c("left");e()}catch(b){setTimeout(n,1)}};n()}}},_fireReady:function(){if(!z){z=true;if(u){for(var a,c=0;a=u[c++];)a.call(o,this);u=null}}},available:function(a,c){if((a=(a+"").match(A)[1])&&h.isFunction(c))var d=1,e=h.later(function(){if(s.getElementById(a)&&(c()||1)||++d>500)e.cancel()},40,true)},mix:p,merge:function(){var a={},c,d=arguments.length;for(c=0;c<d;++c)p(a,arguments[c]);return a},
augment:function(){var a=arguments,c=a.length-2,d=a[0],e=a[c],f=a[c+1],g=1;if(!h.isArray(f)){e=f;f=q;c++}if(!h.isBoolean(e)){e=q;c++}for(;g<c;g++)p(d.prototype,a[g].prototype||a[g],e,f);return d},extend:function(a,c,d,e){if(!c||!a)return a;var f=Object.prototype,g=c.prototype,l=function(t){function n(){}n.prototype=t;return new n}(g);a.prototype=l;l.constructor=a;a.superclass=g;if(c!==Object&&g.constructor===f.constructor)g.constructor=c;d&&p(l,d);e&&p(a,e);return a},namespace:function(){var a=arguments,
c=a.length,d=null,e,f,g,l=a[c-1]===true&&c--;for(e=0;e<c;++e){g=(""+a[e]).split(".");d=l?o:this;for(f=o[g[0]]===d?1:0;f<g.length;++f)d=d[g[f]]=d[g[f]]||{}}return d},app:function(a,c){var d=h.isString(a),e=d?o[a]||{}:a;p(e,this,true,h.__APP_MEMBERS);e.__init();p(e,h.isFunction(c)?c():c);d&&(o[a]=e);return e},log:function(a,c,d){if(h.Config.debug){if(d)a=d+": "+a;if(o.console!==q&&console.log)console[c&&console[c]?c:"log"](a)}},error:function(a){if(h.Config.debug)throw a;},guid:function(a){var c=B++ +
"";return a?a+c:c}});h.__init();h.__APP_MEMBERS=["__init","namespace"];if(y&&(y.search||"").indexOf("ks-debug")!==-1)h.Config.debug=true})(window,"KISSY");
(function(o,h,q){function s(b){var i=typeof b;return b===null||i!=="object"&&i!=="function"}function y(b){return u.slice.call(b)}var p=document,z=p.documentElement,u=Array.prototype,w=u.indexOf,A=u.lastIndexOf,B=u.filter,a=String.prototype.trim,c=Object.prototype.toString,d=encodeURIComponent,e=decodeURIComponent,f=d("[]"),g=/^\s+|\s+$/g,l=/^(\w+)\[\]$/,t=/\S/;h.mix(h,{isUndefined:function(b){return b===q},isBoolean:function(b){return c.call(b)==="[object Boolean]"},isString:function(b){return c.call(b)===
"[object String]"},isNumber:function(b){return c.call(b)==="[object Number]"&&isFinite(b)},isPlainObject:function(b){return b&&c.call(b)==="[object Object]"&&!b.nodeType&&!b.setInterval},isEmptyObject:function(b){for(var i in b)return false;return true},isFunction:function(b){return c.call(b)==="[object Function]"},isArray:function(b){return c.call(b)==="[object Array]"},trim:a?function(b){return b==q?"":a.call(b)}:function(b){return b==q?"":b.toString().replace(g,"")},substitute:function(b,i,j){if(!h.isString(b)||
!h.isPlainObject(i))return b;return b.replace(j||/\\?\{([^{}]+)\}/g,function(k,m){if(k.charAt(0)==="\\")return k.slice(1);return i[m]!==q?i[m]:""})},each:function(b,i,j){var k,m=0,r=b.length,v=r===q||h.isFunction(b);j=j||o;if(v)for(k in b){if(i.call(j,b[k],k,b)===false)break}else for(k=b[0];m<r&&i.call(j,k,m,b)!==false;k=b[++m]);return b},indexOf:w?function(b,i){return w.call(i,b)}:function(b,i){for(var j=0,k=i.length;j<k;++j)if(i[j]===b)return j;return-1},lastIndexOf:A?function(b,i){return A.call(i,
b)}:function(b,i){for(var j=i.length-1;j>=0;j--)if(i[j]===b)break;return j},unique:function(b,i){i&&b.reverse();for(var j=b.slice(),k=0,m,r;k<j.length;){for(r=j[k];(m=h.lastIndexOf(r,j))!==k;)j.splice(m,1);k+=1}i&&j.reverse();return j},inArray:function(b,i){return h.indexOf(b,i)>-1},makeArray:function(b){if(b===null||b===q)return[];if(h.isArray(b))return b;if(typeof b.length!=="number"||h.isString(b)||h.isFunction(b))return[b];return y(b)},filter:B?function(b,i,j){return B.call(b,i,j)}:function(b,
i,j){var k=[];h.each(b,function(m,r,v){i.call(j,m,r,v)&&k.push(m)});return k},param:function(b,i){if(!h.isPlainObject(b))return"";i=i||"&";var j=[],k,m;for(k in b){m=b[k];k=d(k);if(s(m))j.push(k,"=",d(m+""),i);else if(h.isArray(m)&&m.length)for(var r=0,v=m.length;r<v;++r)s(m[r])&&j.push(k,f+"=",d(m[r]+""),i)}j.pop();return j.join("")},unparam:function(b,i){if(typeof b!=="string"||(b=h.trim(b)).length===0)return{};for(var j={},k=b.split(i||"&"),m,r,v,x,C=0,D=k.length;C<D;++C){m=k[C].split("=");r=e(m[0]);
try{v=e(m[1]||"")}catch(E){v=m[1]||""}if((x=r.match(l))&&x[1]){j[x[1]]=j[x[1]]||[];j[x[1]].push(v)}else j[r]=v}return j},later:function(b,i,j,k,m){i=i||0;k=k||{};var r=b,v=h.makeArray(m),x;if(h.isString(b))r=k[b];r||h.error("method undefined");b=function(){r.apply(k,v)};x=j?setInterval(b,i):setTimeout(b,i);return{id:x,interval:j,cancel:function(){this.interval?clearInterval(x):clearTimeout(x)}}},clone:function(b){var i=b,j,k;if(b&&((j=h.isArray(b))||h.isPlainObject(b))){i=j?[]:{};for(k in b)if(b.hasOwnProperty(k))i[k]=
h.clone(b[k])}return i},now:function(){return(new Date).getTime()},globalEval:function(b){if(b&&t.test(b)){var i=p.getElementsByTagName("head")[0]||z,j=p.createElement("script");j.text=b;i.insertBefore(j,i.firstChild);i.removeChild(j)}}});try{y(z.childNodes)}catch(n){y=function(b){for(var i=[],j=b.length-1;j>=0;j--)i[j]=b[j];return i}}})(window,KISSY);
(function(o,h,q){var s=o.document,y=s.getElementsByTagName("head")[0]||s.documentElement,p=2,z=3,u=4,w=h.mix,A=s.createElement("script").readyState?function(a,c){var d=a.onreadystatechange;a.onreadystatechange=function(){var e=a.readyState;if(e==="loaded"||e==="complete"){a.onreadystatechange=null;d&&d();c.call(this)}}}:function(a,c){a.addEventListener("load",c,false)},B=/\.css(?:\?|$)/i;o={add:function(a,c,d){var e=this.Env.mods,f;if(h.isString(a)&&!d&&h.isPlainObject(c)){f={};f[a]=c;a=f}if(h.isPlainObject(a)){h.each(a,
function(g,l){g.name=l;e[l]&&w(g,e[l],false)});w(e,a)}else{d=d||{};f=e[a]||{};a=d.host||f.host||a;f=e[a]||{};w(f,{name:a,status:p});if(!f.fns)f.fns=[];c&&f.fns.push(c);w(e[a]=f,d);f.attach!==false&&this.__isAttached(f.requires)&&this.__attachMod(f)}return this},use:function(a,c,d){a=a.replace(/\s+/g,"").split(",");d=d||{};var e=this,f=e.Env.mods,g=(d||0).global,l,t=a.length,n,b,i;g&&e.__mixMods(g);if(e.__isAttached(a))c&&c(e);else{for(l=0;l<t&&(n=f[a[l]]);l++)if(n.status!==u){if(d.order&&l>0){if(!n.requires)n.requires=
[];n._requires=n.requires.concat();b=a[l-1];if(!h.inArray(b,n.requires)&&!h.inArray(n.name,f[b].requires||[]))n.requires.push(b)}e.__attach(n,function(){if(n._requires){n.requires=n._requires;delete n._requires}if(!i&&e.__isAttached(a)){i=true;c&&c(e)}},g)}return e}},__attach:function(a,c,d){function e(){if(f.__isAttached(g)){a.status===p&&f.__attachMod(a);a.status===u&&c()}}for(var f=this,g=a.requires||[],l=0,t=g.length;l<t;l++)f.__attach(f.Env.mods[g[l]],e,d);f.__buildPath(a);f.__load(a,e,d)},__mixMods:function(a){var c=
this.Env.mods,d=a.Env.mods,e;for(e in d)this.__mixMod(c,d,e,a)},__mixMod:function(a,c,d,e){var f=a[d]||{},g=f.status;h.mix(f,h.clone(c[d]));if(g)f.status=g;e&&this.__buildPath(f,e.Config.base);a[d]=f},__attachMod:function(a){var c=this;if(a.fns){h.each(a.fns,function(d){d&&d(c)});a.fns=q}a.status=u},__isAttached:function(a){for(var c=this.Env.mods,d,e=(a=h.makeArray(a)).length-1;e>=0&&(d=c[a[e]]);e--)if(d.status!==u)return false;return true},__load:function(a,c,d){function e(){l[g]=p;if(a.status!==
z){d&&f.__mixMod(f.Env.mods,d.Env.mods,a.name,d);if(a.status!==u)a.status=p;c()}}var f=this,g=a.fullpath,l=h.Env._loadQueue,t=l[g];a.status=a.status||0;if(a.status<1&&t)a.status=t.nodeName?1:p;if(h.isString(a.cssfullpath)){f.getScript(a.cssfullpath);a.cssfullpath=p}if(a.status<1&&g){a.status=1;t=f.getScript(g,{success:function(){KISSY.log(a.name+" is loaded.","info");e()},error:function(){a.status=z;l[g]=p},charset:a.charset});B.test(g)||(l[g]=t)}else a.status===1?A(t,e):c()},__buildPath:function(a,
c){function d(f,g){if(!a[g]&&a[f])a[g]=(c||e.base)+a[f];if(a[g]&&e.debug)a[g]=a[g].replace(/-min/g,"")}var e=this.Config;d("path","fullpath");a.cssfullpath!==p&&d("csspath","cssfullpath")},getScript:function(a,c,d){var e=B.test(a),f=s.createElement(e?"link":"script"),g=c,l,t,n;if(h.isPlainObject(g)){c=g.success;l=g.error;t=g.timeout;d=g.charset}if(e){f.href=a;f.rel="stylesheet"}else{f.src=a;f.async=true}if(d)f.charset=d;if(h.isFunction(c))e?c.call(f):A(f,function(){if(n){n.cancel();n=q}c.call(f)});
if(h.isFunction(l))n=h.later(function(){n=q;l()},(t||this.Config.timeout)*1E3);y.insertBefore(f,y.firstChild);return f}};w(h,o);h.each(o,function(a,c){h.__APP_MEMBERS.push(c)})})(window,KISSY);(function(o){var h={core:{path:"packages/core-min.js",charset:"utf-8"}};o.each(["sizzle","datalazyload","flash","switchable","suggest","overlay","imagezoom","calendar"],function(q){h[q]={path:q+"/"+q+"-pkg-min.js",requires:["core"],charset:"utf-8"}});h.calendar.csspath="calendar/default-min.css";o.add(h)})(KISSY);
