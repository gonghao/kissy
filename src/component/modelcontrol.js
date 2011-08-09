/**
 * model and control base class for kissy
 * @author yiminghe@gmail.com
 * @refer http://martinfowler.com/eaaDev/uiArchs.html
 */
KISSY.add("component/modelcontrol", function(S, Event, UIBase, UIStore, Render) {

    function wrapperViewSetter(attrName) {
        return function(ev) {
            var value = ev.newVal;
            this.get("view") && this.get("view").set(attrName, value);
        };
    }

    function wrapperViewGetter(attrName) {
        return function(v) {
            return v === undefined ? this.get("view") && this.get("view").get(attrName) : v;
        };
    }


    /**
     * 不使用 valueFn
     * 只有 render 时需要找到默认，其他时候不需要，防止莫名其妙初始化
     */
    function getDefaultView() {
        // 逐层找默认渲染器
        var self = this,
            c = self.constructor,
            DefaultRender;

        while (c && !DefaultRender) {
            DefaultRender = c['DefaultRender'];
            c = c.superclass && c.superclass.constructor;
        }
        if (DefaultRender) {
            /**
             * 将渲染层初始化所需要的属性，直接构造器设置过去
             */
            var attrs = self.__attrs,
                // attrVals = self.__attrVals,
                cfg = {};
            for (var attrName in attrs) {
                if (attrs.hasOwnProperty(attrName)) {
                    var attrCfg = attrs[attrName],v;
                    if (attrCfg.view) {
                        // 只设置用户设置的值
                        // 考虑 c 上的默认值
                        if (
                        // (v = attrVals[attrName])
                            ( v = self.get(attrName) )
                                !== undefined) {
                            cfg[attrName] = v;
                        }
                    }
                }
            }
            return new DefaultRender(cfg);
        }
        return 0;
    }

    function capitalFirst(s) {
        s += '';
        return s.charAt(0).toUpperCase() + s.substring(1);
    }

    /**
     * model and control for component
     * @constructor
     */
    var ModelControl = UIBase.create([UIBase.Box], {

            getCls:UIStore.getCls,

            initializer:function() {
                /**
                 * 整理属性，对纯属于 view 的属性，添加 getter setter 直接到 view
                 */
                var self = this,
                    attrs = self.__attrs;
                for (var attrName in attrs) {
                    if (attrs.hasOwnProperty(attrName)) {
                        var attrCfg = attrs[attrName];
                        if (attrCfg.view) {
                            // setter 不应该有实际操作，仅用于正规化比较好
                            // attrCfg.setter = wrapperViewSetter(attrName);
                            self.on("after" + capitalFirst(attrName) + "Change",
                                wrapperViewSetter(attrName));
                            // 逻辑层读值直接从 view 层读
                            // 那么如果存在默认值也设置在 view 层
                            attrCfg.getter = wrapperViewGetter(attrName);
                        }
                    }
                }

            },

            /**
             * control 层的渲染 ui 就是 render view
             */
            renderUI:function() {
                var self = this;
                self.get("view").render();
                //then render my children
                var children = self.get("children");
                S.each(children, function(child) {
                    child.render();
                });
            },

            /**
             * 控制层的 createDom 实际上就是调用 view 层的 create 来创建真正的节点
             */
            createDom:function() {
                var self = this;
                var view = self.get("view") || getDefaultView.call(self);
                if (!view) {
                    S.error("no view for");
                    S.error(self.constructor);
                    return;
                }
                view.create();
                if (!self.get("allowTextSelection_")) {
                    view.get("el").unselectable();
                }
                self.set("view", view);
            },

            /**
             * Returns the DOM element into which child components are to be rendered,
             or null if the container itself hasn't been rendered yet.  Overrides
             */
            getContentElement:function() {
                var view = this.get('view');
                return view && view.getContentElement();
            },



            _initChild:function(c, elBefore) {
                var self = this;
                // If this (parent) component doesn't have a DOM yet, call createDom now
                // to make sure we render the child component's element into the correct
                // parent element (otherwise render_ with a null first argument would
                // render the child into the document body, which is almost certainly not
                // what we want).
                self.create();
                var contentEl = self.getContentElement();
                c.set("parent", self);
                c.set("render", contentEl);
                c.set("elBefore", elBefore);
                // 如果 parent 已经渲染好了子组件也要立即渲染，就 创建 dom ，绑定事件
                if (this.get("rendered")) {
                    c.render();
                }
                // 如果 parent 也没渲染，子组件 create 出来和 parent 节点关联
                // 子组件和 parent 组件一起渲染
                else {
                    // 之前设好属性，view ，logic 同步还没 bind ,create 不是 render ，还没有 bindUI
                    c.create();
                    contentEl[0].insertBefore(c.get("el")[0], elBefore && elBefore[0] || null);

                }
            },

            /**
             *
             * @param c  children to be added
             * @param {int=} index  position to be inserted
             */
            addChild:function(c, index) {
                var self = this,
                    children = self.get("children"),
                    elBefore = children[index];
                if (index) {
                    children.splice(index, 0, c);
                } else {
                    children.push(c);
                }
                self._initChild(c, elBefore);
            },

            removeChild:function(c, destroy) {
                var children = this.get("children"),
                    index = S.indexOf(c, children);
                if (index != -1) {
                    children.splice(index, 1);
                }
                if (destroy) {
                    c.destroy();
                }
            },

            removeChildren:function(destroy) {
                var t = [];
                S.each(this.get("children"), function(c) {
                    t.push(c);
                });
                var self = this;
                S.each(t, function(c) {
                    self.removeChild(c, destroy);
                });
                this.set("children", []);
            },

            getChildAt:function(index) {
                var children = this.get("children");
                return children[index];
            },

            _uiSetHandleMouseEvents:function(v) {
                var self = this,
                    view = self.get("view"),
                    el = view.get("el");
                if (v) {
                    el.on("mouseenter", self._handleMouseEnter, self);
                    el.on("mouseleave", self._handleMouseLeave, self);
                    el.on("mousedown", self._handleMouseDown, self);
                    el.on("mouseup", self._handleMouseUp, self);
                    el.on("dblclick", self._handleDblClick, self);
                } else {
                    el.detach("mouseenter", self._handleMouseEnter, self);
                    el.detach("mouseleave", self._handleMouseLeave, self);
                    el.detach("mousedown", self._handleMouseDown, self);
                    el.detach("mouseup", self._handleMouseUp, self);
                    el.detach("dblclick", self._handleDblClick, self);
                }
            },

            _handleDblClick:function(e) {
                if (!this.get("disabled")) {
                    this._performInternal(e);
                }
            },
            isMouseEventWithinElement_:function(e, elem) {
                var relatedTarget = e.relatedTarget;
                relatedTarget = relatedTarget && S.one(relatedTarget)[0];
                if (!relatedTarget) {
                    return false;
                }
                // 在里面或等于自身都不算 mouseenter/leave
                if (relatedTarget === elem[0] || elem.contains(relatedTarget)) {
                    return true;
                }
            },
            _handleMouseOver:function(e) {
                if (this.get("disabled")) {
                    return true;
                }
                var self = this,
                    view = self.get("view"),
                    el = view.get("el");
                if (!self.isMouseEventWithinElement_(e, el)) {
                    self._handleMouseEnter(e);
                }
            },


            _handleMouseOut:function(e) {
                if (this.get("disabled")) {
                    return true;
                }
                var self = this,
                    view = self.get("view"),
                    el = view.get("el");
                if (!self.isMouseEventWithinElement_(e, el)) {
                    self._handleMouseLeave(e);
                }
            },

            /**
             * root element handler for mouse enter
             */
            _handleMouseEnter:function() {
                if (this.get("disabled")) {
                    return true;
                }
                this.set("highlighted", true);
            },
            /**
             * root element handler for mouse leave
             */
            _handleMouseLeave:function() {
                if (this.get("disabled")) {
                    return true;
                }
                this.set("active", false);
                this.set("highlighted", false);
            },
            /**
             * root element handler for mouse down
             * @param ev
             */
            _handleMouseDown:function(ev) {
                if (this.get("disabled")) {
                    return true;
                }
                if (ev.which == 1 && this.get("activeable")) {
                    this.set("active", true);
                }
                var el = this.getKeyEventTarget();
                // 左键，否则 unselectable 在 ie 下鼠标点击获得不到焦点
                if (ev.which == 1 && el.attr("tabindex") >= 0) {
                    this.getKeyEventTarget()[0].focus();
                }
                // Cancel the default action unless the control
                // allows text selection.
                if (ev.which == 1 && !this.get("allowTextSelection_")) {
                    // firefox 不会引起焦点转移
                    ev.preventDefault();
                }
            },
            /**
             * whether component can receive focus
             */
            _uiSetFocusable:function(v) {
                var self = this,
                    el = self.getKeyEventTarget();
                if (v) {
                    el.on("focus", self._handleFocus, self);
                    el.on("blur", self._handleBlur, self);
                    el.on("keydown", self._handleKeydown, self);
                } else {
                    el.detach("focus", self._handleFocus, self);
                    el.detach("blur", self._handleBlur, self);
                    el.detach("keydown", self._handleKeydown, self);
                }
            },

            /**
             * 焦点所在元素即键盘事件处理元素
             */
            getKeyEventTarget:function() {
                return this.get("view").getKeyEventTarget();
            },
            /**
             * root element handler for mouse up
             */
            _handleMouseUp:function(ev) {
                if (this.get("disabled")) {
                    return true;
                }
                // 左键
                if (this.get("active") && ev.which == 1) {
                    this._performInternal(ev);
                    this.set("active", false);
                }
            },
            /**
             * root element handler for focus
             */
            _handleFocus:function() {
                this.set("focused", true);
            },
            /**
             * root element handler for blur
             */
            _handleBlur:function() {
                this.set("focused", false);
            },

            _handleKeyEventInternal:function(ev) {
                if (ev.keyCode == Event.KeyCodes.ENTER) {
                    return this._performInternal(ev);
                }
            },
            /**
             * root element handler for keydown
             * @param ev
             */
            _handleKeydown:function(ev) {
                if (this.get("disabled")) {
                    return true;
                }
                if (this._handleKeyEventInternal(ev)) {
                    ev.halt();
                    return true;
                }
            },

            /**
             * root element handler for click
             */
            _performInternal:function() {
            },

            destructor:function() {
                var self = this;
                var children = self.get("children");
                S.each(children, function(child) {
                    child.destroy();
                });
                var view = self.get("view");
                if (view) {
                    view.destroy();
                }
            }
        },
        {
            ATTRS:{
                /**
                 *  session state
                 */

                    // 是否绑定鼠标事件
                handleMouseEvents:{
                    value:true
                },

                // 是否支持焦点处理
                focusable:{
                    /*
                     *  observer synchronization , model 分成两类：
                     *                view 负责监听 view 类 model 变化更新界面
                     *                control 负责监听 control 类变化改变逻辑
                     *  problem : Observer behavior is hard to understand and debug because it's implicit behavior.
                     *
                     *  Keeping screen state and session state synchronized is an important task
                     *  Data Binding
                     */
                    view:true,
                    value:true
                    /**
                     * In general data binding gets tricky
                     * because if you have to avoid cycles where a change to the control,
                     * changes the record set, which updates the control,
                     * which updates the record set....
                     * The flow of usage helps avoid these -
                     * we load from the session state to the screen when the screen is opened,
                     * after that any changes to the screen state propagate back to the session state.
                     * It's unusual for the session state to be updated directly once the screen is up.
                     * As a result data binding might not be entirely bi-directional -
                     * just confined to initial upload and
                     * then propagating changes from the controls to the session state.
                     */
                    // sync
                },

                activeable:{
                    value:true
                },

                focused:{
                    view:true
                },
                active:{
                    view:true
                },

                highlighted:{
                    view:true
                },

                //子组件
                children:{
                    value:[],
                    setter:function(v) {
                        var self = this;
                        //自动给儿子组件加入父亲链
                        S.each(v, function(c) {
                            self._initChild(c);
                        });
                    }
                },

                // 转交给渲染层
                prefixCls:{
                    view:true,
                    value:"ks-"
                },

                // 父组件
                // Parent component to which events will be propagated.
                parent:{
                },

                //渲染层
                view:{
                },

                //是否禁用
                disabled:{
                    view:true
                },

                // 是否允许 DOM 结构内的文字选定
                allowTextSelection_:{
                    value:false
                }
            },

            DefaultRender:Render
        });

    if (1 > 2) {
        ModelControl._uiSetHandleMouseEvents();
    }

    return ModelControl;
}, {
    requires:['event','uibase','./uistore','./render']
});
/**
 *  Note:
 *  控制层元属性配置中 view 的作用
 *   - 如果没有属性变化处理函数，自动生成属性变化处理函数，自动转发给 view 层
 *   - 如果没有指定 view 层实例，在生成默认 view 实例时，所有用户设置的 view 的属性都转到默认 view 实例中
 **/