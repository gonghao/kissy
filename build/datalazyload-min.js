/*
Copyright 2011, KISSY UI Library v1.20dev
MIT Licensed
build time: Aug 22 15:37
*/
KISSY.add("datalazyload/impl",function(f,d,k,m){function i(a,b){if(!(this instanceof i))return new i(a,b);if(b===m){b=a;a=[n]}f.isArray(a)||(a=[d.get(a)||n]);this.containers=a;this.config=f.merge(s,b);this.callbacks={els:[],fns:[]};this._init();return m}var l=window,t=0.1,n=document,o="scroll",p="resize",s={mod:"manual",diff:"default",placeholder:"none",execScript:true};f.augment(i,{_init:function(){this.threshold=this._getThreshold();this._filterItems();this._initLoadEvent()},_filterItems:function(){var a=
this.containers,b,e,c,h=[],g=[];b=0;for(e=a.length;b<e;++b){c=d.query("img",a[b]);h=h.concat(f.filter(c,this._filterImg,this));c=d.query("textarea",a[b]);g=g.concat(f.filter(c,this._filterArea,this))}this.images=h;this.areaes=g},_filterImg:function(a){var b=a.getAttribute("data-ks-lazyload"),e=this.threshold,c=this.config.placeholder;if(this.config.mod==="manual"){if(b){if(c!=="none")a.src=c;return true}}else if(d.offset(a).top>e&&!b){d.attr(a,"data-ks-lazyload",a.src);if(c!=="none")a.src=c;else a.removeAttribute("src");
return true}},_filterArea:function(a){return d.hasClass(a,"ks-datalazyload")},_initLoadEvent:function(){function a(){e||(e=f.later(function(){b();e=null},t))}function b(){c._loadItems();if(c._getItemsLength()===0){k.remove(l,o,a);k.remove(l,p,h)}}var e,c=this,h;k.on(l,o,a);k.on(l,p,function(){c.threshold=c._getThreshold();a()});c._getItemsLength()&&f.ready(function(){b()})},_loadItems:function(){this._loadImgs();this._loadAreas();this._fireCallbacks()},_loadImgs:function(){this.images=f.filter(this.images,
this._loadImg,this)},_loadImg:function(a){var b=this.threshold+d.scrollTop();if(d.offset(a).top<=b)this._loadImgSrc(a);else return true},_loadImgSrc:function(a,b){b=b||"data-ks-lazyload";var e=a.getAttribute(b);if(e&&a.src!=e){a.src=e;a.removeAttribute(b)}},_loadAreas:function(){this.areaes=f.filter(this.areaes,this._loadArea,this)},_loadArea:function(a){var b=d.css(a,"display")==="none";if(d.offset(b?a.parentNode:a).top<=this.threshold+d.scrollTop())this._loadAreaData(a.parentNode,a,this.config.execScript);
else return true},_loadAreaData:function(a,b,e){b.style.display="none";b.className="";var c=d.create("<div>");a.insertBefore(c,b);d.html(c,b.value,e===m?true:e)},_fireCallbacks:function(){var a=this.callbacks,b=a.els,e=a.fns,c=this.threshold+d.scrollTop(),h,g,j,q=[],r=[];for(h=0;(g=b[h])&&(j=e[h++]);)if(d.offset(g).top<=c)j.call(g);else{q.push(g);r.push(j)}a.els=q;a.fns=r},addCallback:function(a,b){var e=this.callbacks;if((a=d.get(a))&&f.isFunction(b)){e.els.push(a);e.fns.push(b)}},_getThreshold:function(){var a=
this.config.diff,b=d.viewportHeight();return a==="default"?2*b:b+ +a},_getItemsLength:function(){return this.images.length+this.areaes.length+this.callbacks.els.length},loadCustomLazyData:function(a,b){var e=this,c,h;if(b==="img-src")b="img";f.isArray(a)||(a=[d.get(a)]);f.each(a,function(g){switch(b){case "img":h=g.nodeName==="IMG"?[g]:d.query("img",g);f.each(h,function(j){e._loadImgSrc(j,"data-ks-lazyload-custom")});break;default:(c=d.get("textarea",g))&&d.hasClass(c,"ks-datalazyload-custom")&&e._loadAreaData(g,
c)}})}});f.mix(i,i.prototype,true,["loadCustomLazyData","_loadImgSrc","_loadAreaData"]);return i},{requires:["dom","event"]});KISSY.add("datalazyload",function(f,d){return f.DataLazyload=d},{requires:["datalazyload/impl"]});
