/*
Copyright 2011, KISSY UI Library v1.20dev
MIT Licensed
build time: Aug 31 21:53
*/
KISSY.add("waterfall/async",function(f,l,o,m,q){function j(){j.superclass.constructor.apply(this,arguments)}function r(){if(!this.__loading){var a=this.get("container").offset().top,b=this.get("diff"),c=this.get("curColHeights");if(c.length)a+=Math.min.apply(Math,c);b+g(window).scrollTop()+g(window).height()>a&&p.call(this)}}function n(){this.__scrollTimer&&this.__scrollTimer.cancel();this.__scrollTimer=f.later(r,s,false,this)}function p(){var a=this;this.get("container");a.__loading=true;var b=a.get("remote");
if(f.isFunction(b))b=b();o(f.mix({success:function(c){c.end&&g(window).detach("scroll",n,a);a.__loading=false;c=c.data;var e=m(a.get("itemTpl")),d=[];f.each(c,function(h){h=e.render(h);d.push(g(h))});a.addItems(d)}},b))}var g=l.all,s=50;j.ATTRS={remote:{},diff:{getter:function(a){return a||0}},itemTpl:{}};f.extend(j,q,{_init:function(){j.superclass._init.apply(this,arguments);g(window).on("scroll",n,this);p.call(this)},destroy:function(){j.superclass.destroy.apply(this,arguments);g(window).detach("scroll",
n,this)}});return j},{requires:["node","ajax","template","./base"]});
KISSY.add("waterfall/base",function(f,l,o){function m(){m.superclass.constructor.apply(this,arguments);this._init()}function q(a,b,c,e){var d=f.makeArray(a),h={},i;if(d.length>0)i=setTimeout(function(){var k=+new Date;do{var t=d.shift();b.call(c,t)}while(d.length>0&&+new Date-k<50);if(d.length>0)i=setTimeout(arguments.callee,25);else e&&e.call(c,a)},25);else e&&e.call(c,a);h.stop=function(){if(i){clearTimeout(i);d=[]}};return h}function j(){var a=this;a.get("container");if(a._resizer){a._resizer.stop();
a._resizer=0}n.call(a);a._resizer=a.adjust(function(){a._resizer=0})}function r(){var a=this._containerRegion;if(this.get("container").width()!==a.width){this.__resizeTimer&&this.__resizeTimer.cancel();this.__resizeTimer=f.later(j,s,false,this)}}function n(){var a=this.get("container"),b=a.width(),c=this.get("curColHeights");c.length=Math.max(parseInt(b/this.get("colWidth")),this.get("minColCount"));this._containerRegion=f.mix({width:b},a.offset());f.each(c,function(e,d){c[d]=0})}function p(a){a=
g(a);for(var b=this.get("curColHeights"),c=this.get("container"),e=b.length,d=0,h=this._containerRegion,i=Number.MAX_VALUE,k=0;k<e;k++)if(b[k]<i){i=b[k];d=k}e||(i=0);e=(h.width-e*this.get("colWidth"))/2;a.css({position:"absolute",left:d*this.get("colWidth")+h.left+e,top:i+h.top});c.contains(a)||c.append(a);b[d]+=a.height();return a}var g=l.all,s=50;m.ATTRS={container:{setter:function(a){return g(a)}},curColHeights:{value:[]},minColCount:{value:1},effect:{value:{effect:"fadeIn",duration:1}},colWidth:{}};
f.extend(m,o,{_init:function(){n.call(this);g(window).on("resize",r,this)},adjust:function(a){var b=this.get("container").all(".ks-waterfall");return q(b,p,this,a)},addItems:function(a,b){if(!this._resizer)return q(a,this.addItem,this,b)},addItem:function(a){this.get("curColHeights");this.get("container");a=p.call(this,a);var b=this.get("effect");b.effect&&a[b.effect](b.duration,undefined,b.easing)},destroy:function(){g(window).detach("resize",r,this)}});return m},{requires:["node","base"]});
KISSY.add("waterfall",function(f,l,o){l.Async=o;return l},{requires:["waterfall/base","waterfall/async"]});
