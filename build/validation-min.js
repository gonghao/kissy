/*
Copyright 2011, KISSY UI Library v1.20dev
MIT Licensed
build time: Aug 9 18:11
*/
KISSY.add("validation/base",function(f,k,p,e,h,b,a,c){function j(g,l){if(f.isString(g))g=f.get(g);g?this._init(g,l||{}):e.log("\u8bf7\u914d\u7f6e\u6b63\u786e\u7684form ID.")}f.augment(j,f.EventTarget,{_init:function(g,l){this.config=f.merge(h.Config,l);this.form=g;this.fields=new e.storage;this._initfields()},_initfields:function(){var g=this,l=g.config;f.each(g.form.elements,function(d){var m=k.attr(d,l.attrname);m&&g.add(d,e.toJSON(m))})},add:function(g,l){var d=this.fields,m=f.merge(this.config,l);if(f.isObject(g)&&g instanceof
b){d.add(g.id,g);return this}if(f.isString(g)&&g.substr(0,1)!="#")g="#"+g;var n=k.get(g),o=k.attr(n,"id");if(!n||n.form!=this.form)e.log("\u5b57\u6bb5"+g+"\u4e0d\u5b58\u5728\u6216\u4e0d\u5c5e\u4e8e\u8be5form");else{if(!o){o=m.prefix+f.guid();k.attr(n,"id",o)}d.add(o,new b(n,m));return this}},remove:function(g){this.fields.remove(g)},get:function(g){return this.fields.get(g)},isValid:function(g){var l=this.fields;if(g&&l.get(g))return l.get(g).isValid();var d=true;l.each(function(m,n){if(!n.isValid()){d=false;if(n.single)return false}});return d},
submit:function(){this.fire("submit",this.fields)&&this.isValid()&&this.form.submit()}});f.mix(j,{Util:e,Define:h,Field:b,Warn:a,Rule:c});return j},{requires:["dom","event","./utils","./define","./field","./warn","./rule"]});KISSY.add("validation/define",function(){var f={};f.Config={attrname:"data-valid",prefix:"auth-f",defaultwarn:"alert"};f.Const={enumvalidsign:{error:0,ok:1,hint:2,ignore:3}};return f});
KISSY.add("validation/field",function(f,k,p,e,h,b,a,c){function j(d,m){if(d=f.get(d)){this.el=d;this.rule=new e.storage;this._init(m)}else e.log("\u5b57\u6bb5\u4e0d\u5b58\u5728\u3002")}var g=h.Const.enumvalidsign,l=document;j.Config={required:[true,"\u6b64\u9879\u4e3a\u5fc5\u586b\u9879\u3002"],initerror:"data-showerror"};f.augment(j,{_init:function(d){d=f.merge(j.Config,d||{});f.mix(this,d,"label");this._initfield();this._initVType(d);this._initWarn(d);k.attr(this.el,d.initerror)&&this.showMessage(false,k.attr(this.el,d.initerror))},_initfield:function(){var d=
this.el,m=d.form,n=k.attr(d,"name");if(!("checkbox,radio".indexOf(k.attr(d,"type"))<0)){var o=[];f.each(l.getElementsByName(n),function(q){d.form==m&&o.push(q)});this.el=o}},_initVType:function(d){var m=this,n=m.el,o;for(o in d)m.addRule(o,d[o]);if(d.remote){d=f.isArray(d.remote)?{url:d.remote[0]}:d.remote;var q=new a(n,d,function(r,s){m.showMessage(r,s)});m.addRule("ajax",function(r){return q.check(r)})}},_initWarn:function(d){var m=this,n,o={};if(d.warn){n=f.isFunction(d.warn)?d.warn:c.get(d.warn);
o=f.merge(d,{})}if(d.style&&c.getStyle(d.style)){o=c.getStyle(d.style);n=c.get(o.core);o=f.merge(d,o)}if(n){d=new n(m.el,o);d.on("valid",function(q){return m._validateValue(q.event)});f.mix(m,{warn:d,single:d.single})}else e.log("\u63d0\u793a\u4fe1\u606f\u7c7b\u914d\u7f6e\u9519\u8bef.")},_validateValue:function(){var d=this.rule,m=this._getValue(),n=d.getAll();make=function(r,s){return[s,r]};exec=function(r){r=d.get(r);if(!r)return true;f.isArray(r)||(r=[r]);for(var s=0;s<r.length;s++){var t=r[s].call(this,m);if(!e.isEmpty(t))return t}return true};
if(k.attr(this.el,"disabled")||k.hasClass(this.el,"disabled"))return make(g.ignore,undefined);if(n.depend&&n.depend.call(this,m)!==true)return make(g.ignore,undefined);for(var o in n){if(o=="required"){var q=n.required.call(this,m);if(q)return this.label?make(g.hint,this.label):make(g.error,q);else if(e.isEmpty(m))return make(g.ignore,"")}if(!("depend".indexOf(o)>-1)){if("ajax".indexOf(o)>-1)break;q=n[o].call(this,m);if(!e.isEmpty(q)){this._ajaxtimer&&this._ajaxtimer.cancel();return make(g.error,
q)}}}if(n.ajax)return n.ajax.call(this,m);return make(g.ok,this.okMsg||"OK")},_getValue:function(){var d=this.el,m=[];switch(k.attr(d,"type")){case "select-one":m=d[d.selectedIndex].value;break;case "select-multiple":f.each(d,function(n){n.selected&&m.push(n.value)});break;case "radio":case "checkbox":f.each(d,function(n){n.checked&&m.push(n.value)});break;case "file":case "text":case "hidden":case "textarea":case "password":m=d.value}return m},addRule:function(d,m){var n=this.rule;if(f.isFunction(d)){n.add(f.guid(),
d);return this}var o=b.get(d,m);if(o){n.add(d,o);return this}},removeRule:function(d){this.rule.remove(d)},showMessage:function(d,m,n){this.warn.showMessage(d,m,n)},isValid:function(){var d=this._validateValue("submit");this.showMessage(d[1],d[0],"submit");return d[1]!=0}});return j},{requires:["dom","event","./utils","./define","./rule","./rule/remote","./warn"]});KISSY.add("validation/rule",function(f,k,p){return p},{requires:["./utils","./rule/base","./rule/normal"]});
KISSY.add("validation/rule/base",function(f,k,p,e){return new function(){var h=new e.storage;this.add=function(b,a,c){f.isFunction(c)&&h.add(b,{name:b,fun:c,text:a})};this.get=function(b,a){var c=h.get(b);if(!c)return null;var j=c.fun;c=c.text;var g=j.length-1,l=[];if(a)if(f.isArray(a))if(a.length>=g){l.push(a[a.length-1]);l=l.concat(a.slice(0,-1))}else{l.push(c);l=l.concat(a)}else if(g>0){l.push(c);l.push(a)}else l.push(c);else l=[c];return function(d){return j.apply(this,[d].concat(l))}};this.toString=
function(b,a){var c=h.get(b);a=a||"\u3010\u89c4\u5219\u540d\u3011\n {0}\n\n\u3010\u9ed8\u8ba4\u63d0\u793a\u4fe1\u606f\u3011\n {1}\n\n\u3010\u51fd\u6570\u4f53\u3011\n {2}";return c?e.format(a,c.name,c.text,c.fun.toString()):e.format("\u89c4\u5219[{0}]\u4e0d\u5b58\u5728",b)}}},{requires:["dom","event","../utils"]});
KISSY.add("validation/rule/normal",function(f,k,p,e,h){h.add("func","\u6821\u9a8c\u5931\u8d25\u3002",function(b,a,c){b=c.call(this,b);if(b===false)return a;if(!e.isEmpty(b))return b});h.add("regex","\u6821\u9a8c\u5931\u8d25\u3002",function(b,a,c){if(!RegExp(c).test(b))return a});h.add("depend","\u8be5\u5b57\u6bb5\u65e0\u9700\u6821\u9a8c",function(b,a,c){return c.call(this,b)});h.add("ajax","\u6821\u9a8c\u5931\u8d25\u3002",function(b,a,c){return c.call(this,b)});h.add("required","\u6b64\u9879\u4e3a\u5fc5\u586b\u9879\u3002",function(b,a,c){if(f.isArray(b)&&b.length==0)return a;if(e.isEmpty(b)&&c)return a});h.add("equalTo","\u4e24\u6b21\u8f93\u5165\u4e0d\u4e00\u81f4\u3002",function(b,
a,c){if(b!==k.val(f.get(c)))return a});h.add("length","\u5b57\u7b26\u957f\u5ea6\u4e0d\u80fd\u5c0f\u4e8e{0},\u4e14\u4e0d\u80fd\u5927\u4e8e{1}",function(b,a,c,j,g){b=e.getStrLen(b,g);c=e.toNumber(c);j=e.toNumber(j);if(!(b>=c&&b<=j))return e.format(a,c,j)});h.add("minLength","\u4e0d\u80fd\u5c0f\u4e8e{0}\u4e2a\u5b57\u7b26\u3002",function(b,a,c,j){b=e.getStrLen(b,j);c=e.toNumber(c);if(b<c)return e.format(a,c)});h.add("maxLength","\u4e0d\u80fd\u5927\u4e8e{0}\u4e2a\u5b57\u7b26\u3002",function(b,a,c,j){b=e.getStrLen(b,j);c=e.toNumber(c);if(b>c)return e.format(a,c)});h.add("fiter","\u5141\u8bb8\u7684\u683c\u5f0f{0}\u3002",function(b,a,c){if(!RegExp("^.+.(?=EXT)(EXT)$".replace(/EXT/g,
c.split(/\s*,\s*/).join("|")),"gi").test(b))return e.format(a,c)});h.add("range","\u53ea\u80fd\u5728{0}\u81f3{1}\u4e4b\u95f4\u3002",function(b,a,c,j){c=e.toNumber(c);j=e.toNumber(j);if(b<c||b>j)return e.format(a,c,j)});h.add("group","\u53ea\u80fd\u5728{0}\u81f3{1}\u4e4b\u95f4\u3002",function(b,a,c,j){if(f.isArray(b)){b=b.length;if(!(b>=c&&b<=j))return e.format(a,c,j)}});h.add("trim","\u4e24\u7aef\u4e0d\u80fd\u542b\u6709\u7a7a\u683c\u3002",function(b,a){if(/(^\s+)|(\s+$)/g.test(b))return a});h.add("ltrim","\u5b57\u7b26\u4e32\u6700\u524d\u9762\u4e0d\u80fd\u5305\u542b\u7a7a\u683c",function(b,a){if(/^\s+/g.test(b))return a});h.add("rtrim","\u5b57\u7b26\u4e32\u672b\u5c3e\u4e0d\u80fd\u5305\u542b\u7a7a\u683c",function(b,a){if(/\s+$/g.test(b))return a});
h.add("card","\u8eab\u4efd\u8bc1\u53f7\u7801\u4e0d\u6b63\u786e",function(b,a){var c=[7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2,1],j=0;for(i=0;i<17;i++)j+=parseInt(b.charAt(i))*c[i];c=(12-j%11)%11;if(c==10)c="x";if(b.charAt(17).toLowerCase()!=c)return a});f.each([["chinese",/^[\u0391-\uFFE5]+$/,"\u53ea\u80fd\u8f93\u5165\u4e2d\u6587"],["english",/^[A-Za-z]+$/,"\u53ea\u80fd\u8f93\u5165\u82f1\u6587\u5b57\u6bcd"],["currency",/^\d+(\.\d+)?$/,"\u91d1\u989d\u683c\u5f0f\u4e0d\u6b63\u786e\u3002"],["phone",/^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/,"\u7535\u8bdd\u53f7\u7801\u683c\u5f0f\u4e0d\u6b63\u786e\u3002"],["mobile",/^((\(\d{2,3}\))|(\d{3}\-))?13\d{9}$/,"\u624b\u673a\u53f7\u7801\u683c\u5f0f\u4e0d\u6b63\u786e\u3002"],
["url",/^http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]':+!]*([^<>""])*$/,"url\u683c\u5f0f\u4e0d\u6b63\u786e\u3002"],["email",/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,"\u8bf7\u8f93\u5165\u6b63\u786e\u7684email\u683c\u5f0f"]],function(b){h.add(b[0],b[2],function(a,c){if(!RegExp(b[1]).test(a))return c})})},{requires:["dom","event","../utils","./base"]});
KISSY.add("validation/rule/remote",function(f,k,p,e){return function(h,b,a){function c(o){return function(q,r,s){if(o==l)if(!q&&!q.state){e.log('\u8fd4\u56de\u6570\u636e\u683c\u5f0f\u9519\u8bef\uff0c\u6b63\u786e\u7684\u683c\u5f0f\u5982\uff1a\n\n {"state": false,"message": "\u63d0\u793a\u4fe1\u606f"}');self.showMessage(0,"\u6821\u9a8c\u5931\u8d25")}else{q.state?a(1,q.message):a(0,q.message);f.isFunction(b.success)&&b.success.call(self,q,r,s)}}}function j(o,q){var r=k.attr(h,"name"),s={type:"POST",dataType:"json",data:{}};f.mix(s,b);s.error=function(t,u,v){f.isFunction(b.error)&&b.success.call(this,t,u,v)};b.data&&f.isFunction(b.data)&&
f.mix(s.data,b.data);s.data[r]=q;s.success=function(t,u,v){d.add(q,{est:t.state,msg:t.message});c(o).call(this,t,u,v)};f.io(s)}var g=null,l=null,d=new e.storage,m=k.attr(h,"name"),n={type:"POST",dataType:"json",data:{}};n.data[m]=null;f.mix(n,b);n.data[m]=null;this.check=function(o){var q=d.get(o);if(q)return[q.msg,q.est];g&&g.cancel();g=f.later(function(){l=f.guid();j(l,o)},500);return["loading",0]}}},{requires:["dom","event","../utils"]});
KISSY.add("validation/utils",function(f,k){var p={toJSON:function(e){try{eval("var result="+e)}catch(h){return null}return result},isEmpty:function(e){return e===null||e===k||e===""},format:function(e){var h=Array.prototype.slice.call(arguments,1);return e.replace(/\{(\d+)\}/g,function(b,a){return h[a]})},toNumber:function(e){e=new String(e);e=e.indexOf(".")>-1?parseFloat(e):parseInt(e);return isNaN(e)?0:e},getStrLen:function(e,h){return h?e.replace(/[^\x00-\xFF]/g,"**").length:e.length},log:f.log,
getValue:function(e){var h=function(j){var g=[];f.each(j,function(l){l.checked&&g.push(l.value)})},b=function(j){f.each(j,function(g){if(g.checked)return false});return null},a,c=function(j){var g=[];f.each(j.options,function(l){l.selected&&g.push(l.value)});return g};switch(f.DOM.attr(e,"type").toLowerCase()){case "text":case "hidden":case "textarea":case "password":a=e.value;break;case "select-one":a=e[e.selectedIndex].value;break;case "radio":a=b(f.isArray(e)?e:[e]);break;case "checkbox":a=h(f.isArray(e)?
e:[e]);break;case "select-multiple":a=c(e)}return a},storage:function(){this.cache={}}};f.augment(p.storage,{add:function(e,h,b){var a=this.cache;if(!a[e]||a[e]&&(b==null||b))a[e]=h},remove:function(e){var h=this.cache;h[e]&&delete h[e]},get:function(e){var h=this.cache;return h[e]?h[e]:null},getAll:function(){return this.cache},each:function(e){var h=this.cache,b;for(b in h)if(e.call(this,b,h[b])===false)break}});return p});
KISSY.add("validation/warn",function(f,k,p,e,h,b,a,c){p.extend("Alert",h);p.extend("Static",b);p.extend("Float",a);p.extend("Fixed",c);p.BaseClass=e;return p},{requires:["./utils","./warn/base","./warn/baseclass","./warn/alert","./warn/static","./warn/float","./warn/fixed"]});
KISSY.add("validation/warn/alert",function(f,k,p,e,h){var b=h.Const.enumvalidsign;return function(){return{init:function(){this.single=true},showMessage:function(a,c){if(a==b.error){this.invalidClass&&k.addClass(this.target,this.invalidClass);alert(c);this.target.focus();return false}else this.invalidClass&&k.removeClass(this.target,this.invalidClass)},style:{alert:{invalidClass:"vailInvalid"}}}}},{requires:["dom","event","../utils","../define"]});
KISSY.add("validation/warn/base",function(f,k,p,e,h){var b=new e.storage,a=new e.storage;return{extend:function(c,j){var g=function(m,n){g.superclass.constructor.call(this,m,n)},l=f.isFunction(j)?j():j;if(l.style){for(var d in l.style)this.addStyle(d,f.merge(l.style[d],{core:c}));delete l.style}f.extend(g,h,l);b.add(c,g);return g},addStyle:function(c,j){a.add(c,j)},getStyle:function(c){return a.get(c)},get:function(c){return b.get(c)}}},{requires:["dom","event","../utils","./baseclass"]});
KISSY.add("validation/warn/baseclass",function(f,k,p){function e(h,b){this.target=f.isArray(h)?h[h.length-1]:h;this.el=h;this.single=false;f.mix(this,b||{});this.init()}f.augment(e,f.EventTarget,{init:function(){},_bindEvent:function(h,b,a){switch((k.attr(h,"type")||"input").toLowerCase()){case "radio":case "checkbox":p.on(h,"click",a);break;case "select":case "select-multi":case "file":p.on(h,"change",a);break;default:p.on(h,b,a)}},showMessage:function(){}});return e},{requires:["dom","event"]});
KISSY.add("validation/warn/fixed",function(f,k,p,e,h){var b=h.Const.enumvalidsign;return function(){return{init:function(){var a=this,c,j,g;c=k.attr(a.target,"data=for");g=k.get(".estate",c);j=k.get(".label",c);f.mix(a,{panel:c,estate:g,label:j});a._bindEvent(a.el,a.event,function(l){var d=a.fire("valid",{event:l.type});f.isArray(d)&&d.length==2&&a.showMessage(d[1],d[0],l.type)})},showMessage:function(a,c){var j=this.panel,g=this.estate,l=this.label;if(this.invalidClass)a==b.ignore&&a==b.ok?k.removeClass(this.el,
this.invalidClass):k.addClass(this.el,this.invalidClass);if(a==b.ignore)k.hide(j);else{var d="error";if(a==b.error)d="error";else if(a==b.ok)d="ok";else if(a==b.hint)d="tip";k.removeClass(g,"ok tip error");k.addClass(g,d);k.html(l,c);k.show(j)}},style:{text1:{template:'<label class="valid-text"><span class="estate"><em class="label"></em></span></label>',event:"focus blur keyup"}}}}},{requires:["dom","event","../utils","../define"]});
KISSY.add("validation/warn/float",function(f,k,p,e,h){var b=h.Const.enumvalidsign;return function(){return{invalidCls:"J_Invalid",init:function(){var a=this,c=a.target,j=k.create(a.template),g=k.get("div.msg",j);f.ready(function(){document.body.appendChild(j)});f.mix(a,{panel:f.one(j),msg:f.one(g)});a._bindEvent(a.el,"focus keyup",function(l){var d=a.fire("valid",{event:l.type});f.isArray(d)&&d.length==2&&a.showMessage(d[1],d[0],l.type,l.target)});p.on(a.el,"focus",function(l){k.hasClass(c,a.invalidCls)&&
a._toggleError(true,l.target)});p.on(a.el,"blur",function(){a._toggleError(false)})},showMessage:function(a,c,j,g){var l=this.target,d=this.msg;if(b.ok==a){k.removeClass(l,this.invalidClass);d.html("OK")}else{j!="submit"&&this._toggleError(true,g);k.addClass(l,this.invalidClass);d.html(c)}},_pos:function(a){a=k.offset(a||this.target);var c=this.panel.height();c=a.top-c-20;this.panel.css("left",a.left-10).css("top",c)},_toggleError:function(a,c){var j=this.panel;if(a){k.show(j);this._pos(c)}else k.hide(j)},
style:{"float":{template:'<div class="valid-float" style="display:none;"><div class="msg">&nbsp;</div><s>\u25e5\u25e4</s></div>',event:"focus blur",invalidClass:"vailInvalid"}}}}},{requires:["dom","event","../utils","../define"]});
KISSY.add("validation/warn/static",function(f,k,p,e,h){var b=h.Const.enumvalidsign;return function(){return{init:function(){var a=this,c=a.target,j,g,l;j=k.create(a.template);l=k.get(".estate",j);g=k.get(".label",j);c.parentNode.appendChild(j);k.hide(j);f.mix(a,{panel:j,estate:l,label:g});a._bindEvent(a.el,a.event,function(d){var m=a.fire("valid",{event:d.type});f.isArray(m)&&m.length==2&&a.showMessage(m[1],m[0],d.type)})},showMessage:function(a,c){var j=this.panel,g=this.estate,l=this.label;if(this.invalidClass)a==
b.ignore&&a==b.ok?k.removeClass(this.el,this.invalidClass):k.addClass(this.el,this.invalidClass);if(a==b.ignore)k.hide(j);else{var d="error";if(a==b.error)d="error";else if(a==b.ok)d="ok";else if(a==b.hint)d="tip";k.removeClass(g,"ok tip error");k.addClass(g,d);k.html(l,c);k.show(j)}},style:{text:{template:'<label class="valid-text"><span class="estate"><em class="label"></em></span></label>',event:"focus blur keyup"},siderr:{template:'<div class="valid-siderr"><p class="estate"><s></s><span class="label"></span></p></div>',
event:"focus blur keyup"},under:{template:'<div class="valid-under"><p class="estate"><span class="label"></span></p></div>',event:"focus blur keyup"},sidebd:{template:'<div class="valid-sidebd"><p class="estate"><span class="label"></span></p></div>',event:"focus blur"}}}}},{requires:["dom","event","../utils","../define"]});KISSY.add("validation",function(f,k){return f.Validation=k},{requires:["validation/base","validation/assets/base.css"]});
