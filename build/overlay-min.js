/*
Copyright 2011, KISSY UI Library v1.20dev
MIT Licensed
build time: Aug 9 18:29
*/
KISSY.add("overlay/overlayrender",function(e,f,g,b){function a(c){return e.require("uibase/"+c)}return g.create(b.Render,[a("contentboxrender"),a("positionrender"),a("loadingrender"),f.ie===6?a("shimrender"):null,a("closerender"),a("maskrender")],{renderUI:function(){this.get("el").addClass(this.get("prefixCls")+"overlay")}})},{requires:["ua","uibase","component"]});
KISSY.add("overlay/ariarender",function(e,f){function g(){}function b(d){var h=d.keyCode,i=this.get("el");if(h==c){h=a(d.target);var j=this.__ariaArchor;if(h.equals(i)&&d.shiftKey){j[0].focus();d.halt()}else if(h.equals(j)&&!d.shiftKey){i[0].focus();d.halt()}else if(h.equals(i)||i.contains(h))return;d.halt()}}var a=f.all,c=f.KeyCodes.TAB;g.prototype={__renderUI:function(){var d=this.get("el"),h=this.get("header");if(this.get("aria")){d.attr("role","dialog");d.attr("tabindex",0);h.attr("id")||h.attr("id",
e.guid("ks-dialog-header"));d.attr("aria-labelledby",h.attr("id"));this.__ariaArchor=a("<div tabindex='0'></div>").appendTo(d)}},__bindUI:function(){var d=this;if(d.get("aria")){var h=d.get("el"),i;d.on("afterVisibleChange",function(j){if(j.newVal){i=document.activeElement;h[0].focus();h.attr("aria-hidden","false");h.on("keydown",b,d)}else{h.attr("aria-hidden","true");h.detach("keydown",b,d);i&&i.focus()}})}}};return g},{requires:["node"]});
KISSY.add("overlay/aria",function(e,f){function g(){}g.ATTRS={aria:{view:true}};g.prototype={__bindUI:function(){var b=this,a=b.get("el");b.get("aria")&&a.on("keydown",function(c){if(c.keyCode===f.KeyCodes.ESC){b.hide();c.halt()}})}};return g},{requires:["event"]});
KISSY.add("overlay/effect",function(e){function f(){}var g={fade:["Out","In"],slide:["Up","Down"]};f.ATTRS={effect:{value:{effect:"none",duration:0.5,easing:"easeOut"},setter:function(b){var a=b.effect;if(e.isString(a)&&!g[a])b.effect="none"}}};f.prototype={__bindUI:function(){var b=this;b.on("afterVisibleChange",function(a){var c=b.get("effect").effect;if(c!="none"){var d=a.newVal,h=b.get("el");h.stop(true);h.css("visibility","visible");h[c+g[c][Number(d)]](b.get("effect").duration,function(){h.css("display",
"block");h.css("visibility",d?"visible":"hidden")},b.get("effect").easing,false)}})}};return f},{requires:["anim"]});
KISSY.add("overlay/overlay",function(e,f,g,b,a){function c(d){return e.require("uibase/"+d)}f=f.create(g.ModelControl,[c("contentbox"),c("position"),c("loading"),c("align"),c("close"),c("resize"),c("mask"),a],{},{ATTRS:{elBefore:{valueFn:function(){return e.all("body").first()}},focusable:{value:false},closable:{value:false},handleMouseEvents:{value:false},allowTextSelection_:{value:true},visibleMode:{value:"visibility"}}});f.DefaultRender=b;return f},{requires:["uibase","component","./overlayrender",
"./effect"]});KISSY.add("overlay/dialogrender",function(e,f,g,b){return f.create(g,[e.require("uibase/stdmodrender"),b])},{requires:["uibase","./overlayrender","./ariarender"]});
KISSY.add("overlay/dialog",function(e,f,g,b,a){e=g.create(f,[e.require("uibase/stdmod"),e.require("uibase/drag"),e.require("uibase/constrain"),a],{renderUI:function(){this.get("el").addClass(this.get("prefixCls")+"dialog");this.set("handlers",[this.get("header")])}},{ATTRS:{closable:{value:true}}});e.DefaultRender=b;return e},{requires:["overlay/overlay","uibase","overlay/dialogrender","./aria"]});
KISSY.add("overlay/popup",function(e,f,g){function b(a,c){if(e.isUndefined(c))c=a;else c.srcNode=a;b.superclass.constructor.call(this,c)}b.ATTRS={trigger:{setter:function(a){return e.one(a)}},triggerType:{value:"click"}};e.extend(b,f,{initializer:function(){var a=this;if(a.get("trigger"))if(a.get("triggerType")==="mouse"){a._bindTriggerMouse();a.on("bindUI",function(){a._bindContainerMouse()})}else a._bindTriggerClick()},_bindTriggerMouse:function(){var a=this,c=a.get("trigger"),d;a.__mouseEnterPopup=
function(){a._clearHiddenTimer();d=e.later(function(){a.show();d=g},100)};c.on("mouseenter",a.__mouseEnterPopup);a._mouseLeavePopup=function(){if(d){d.cancel();d=g}a._setHiddenTimer()};c.on("mouseleave",a._mouseLeavePopup)},_bindContainerMouse:function(){this.get("el").on("mouseleave",this._setHiddenTimer,this).on("mouseenter",this._clearHiddenTimer,this)},_setHiddenTimer:function(){var a=this;a._hiddenTimer=e.later(function(){a.hide()},100)},_clearHiddenTimer:function(){if(this._hiddenTimer){this._hiddenTimer.cancel();
this._hiddenTimer=g}},_bindTriggerClick:function(){var a=this;a.__clickPopup=function(c){c.halt();a.show()};a.get("trigger").on("click",a.__clickPopup)},destructor:function(){var a=this.get("trigger");if(a){this.__clickPopup&&a.detach("click",this.__clickPopup);this.__mouseEnterPopup&&a.detach("mouseenter",this.__mouseEnterPopup);this._mouseLeavePopup&&a.detach("mouseleave",this._mouseLeavePopup)}this.get("el")&&this.get("el").detach("mouseleave",this._setHiddenTimer,this).detach("mouseenter",this._clearHiddenTimer,
this)}});return b},{requires:["./overlay"]});KISSY.add("overlay",function(e,f,g,b,a,c){f.Render=g;b.Render=a;f.Dialog=b;e.Overlay=f;e.Dialog=b;f.Popup=e.Popup=c;return f},{requires:["overlay/overlay","overlay/overlayrender","overlay/dialog","overlay/dialogrender","overlay/popup"]});
