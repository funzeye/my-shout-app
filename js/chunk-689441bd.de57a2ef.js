(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-689441bd"],{3495:function(t,e,r){"use strict";r.d(e,"a",(function(){return c})),r.d(e,"b",(function(){return o})),r.d(e,"c",(function(){return s})),r.d(e,"d",(function(){return a})),r.d(e,"e",(function(){return i}));var n={getEngine:function(){var t=window;return t.TapticEngine||t.Capacitor&&t.Capacitor.isPluginAvailable("Haptics")&&t.Capacitor.Plugins.Haptics},available:function(){return!!this.getEngine()},isCordova:function(){return!!window.TapticEngine},isCapacitor:function(){var t=window;return!!t.Capacitor},impact:function(t){var e=this.getEngine();if(e){var r=this.isCapacitor()?t.style.toUpperCase():t.style;e.impact({style:r})}},notification:function(t){var e=this.getEngine();if(e){var r=this.isCapacitor()?t.style.toUpperCase():t.style;e.notification({style:r})}},selection:function(){this.impact({style:"light"})},selectionStart:function(){var t=this.getEngine();t&&(this.isCapacitor()?t.selectionStart():t.gestureSelectionStart())},selectionChanged:function(){var t=this.getEngine();t&&(this.isCapacitor()?t.selectionChanged():t.gestureSelectionChanged())},selectionEnd:function(){var t=this.getEngine();t&&(this.isCapacitor()?t.selectionChanged():t.gestureSelectionChanged())}},i=function(){n.selection()},o=function(){n.selectionStart()},s=function(){n.selectionChanged()},a=function(){n.selectionEnd()},c=function(t){n.impact(t)}},c026:function(t,e,r){"use strict";r.r(e),r.d(e,"ion_reorder",(function(){return l})),r.d(e,"ion_reorder_group",(function(){return d}));var n=r("9ab4"),i=r("e6d3"),o=r("4dc5"),s=r("3495"),a=":host([slot]){display:none;line-height:0;z-index:100}.reorder-icon{display:block;font-size:22px}.reorder-icon{font-size:34px;opacity:0.4}",c=":host([slot]){display:none;line-height:0;z-index:100}.reorder-icon{display:block;font-size:22px}.reorder-icon{font-size:31px;opacity:0.3}",l=function(){function t(t){Object(i["j"])(this,t)}return t.prototype.onClick=function(t){t.preventDefault(),t.stopImmediatePropagation()},t.prototype.render=function(){var t=Object(o["a"])(this),e="ios"===t?"reorder-three-outline":"reorder-two-sharp";return Object(i["h"])(i["b"],{class:t},Object(i["h"])("slot",null,Object(i["h"])("ion-icon",{name:e,lazy:!1,class:"reorder-icon",part:"icon"})))},t}();l.style={ios:a,md:c};var h=".reorder-list-active>*{-webkit-transition:-webkit-transform 300ms;transition:-webkit-transform 300ms;transition:transform 300ms;transition:transform 300ms, -webkit-transform 300ms;will-change:transform}.reorder-enabled{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.reorder-enabled ion-reorder{display:block;cursor:-webkit-grab;cursor:grab;pointer-events:all;-ms-touch-action:none;touch-action:none}.reorder-selected,.reorder-selected ion-reorder{cursor:-webkit-grabbing;cursor:grabbing}.reorder-selected{position:relative;-webkit-transition:none !important;transition:none !important;-webkit-box-shadow:0 0 10px rgba(0, 0, 0, 0.4);box-shadow:0 0 10px rgba(0, 0, 0, 0.4);opacity:0.8;z-index:100}.reorder-visible ion-reorder .reorder-icon{-webkit-transform:translate3d(0,  0,  0);transform:translate3d(0,  0,  0)}",d=function(){function t(t){Object(i["j"])(this,t),this.lastToIndex=-1,this.cachedHeights=[],this.scrollElTop=0,this.scrollElBottom=0,this.scrollElInitial=0,this.containerTop=0,this.containerBottom=0,this.state=0,this.disabled=!0,this.ionItemReorder=Object(i["d"])(this,"ionItemReorder",7)}return t.prototype.disabledChanged=function(){this.gesture&&this.gesture.enable(!this.disabled)},t.prototype.connectedCallback=function(){return Object(n["__awaiter"])(this,void 0,void 0,(function(){var t,e,i,o=this;return Object(n["__generator"])(this,(function(n){switch(n.label){case 0:return t=this.el.closest("ion-content"),t?(e=this,[4,t.getScrollElement()]):[3,2];case 1:e.scrollEl=n.sent(),n.label=2;case 2:return i=this,[4,Promise.resolve().then(r.bind(null,"6e34"))];case 3:return i.gesture=n.sent().createGesture({el:this.el,gestureName:"reorder",gesturePriority:110,threshold:0,direction:"y",passive:!1,canStart:function(t){return o.canStart(t)},onStart:function(t){return o.onStart(t)},onMove:function(t){return o.onMove(t)},onEnd:function(){return o.onEnd()}}),this.disabledChanged(),[2]}}))}))},t.prototype.disconnectedCallback=function(){this.onEnd(),this.gesture&&(this.gesture.destroy(),this.gesture=void 0)},t.prototype.complete=function(t){return Promise.resolve(this.completeSync(t))},t.prototype.canStart=function(t){if(this.selectedItemEl||0!==this.state)return!1;var e=t.event.target,r=e.closest("ion-reorder");if(!r)return!1;var n=p(r,this.el);return!!n&&(t.data=n,!0)},t.prototype.onStart=function(t){t.event.preventDefault();var e=this.selectedItemEl=t.data,r=this.cachedHeights;r.length=0;var n=this.el,i=n.children;if(i&&0!==i.length){for(var o=0,a=0;a<i.length;a++){var c=i[a];o+=c.offsetHeight,r.push(o),c.$ionIndex=a}var l=n.getBoundingClientRect();if(this.containerTop=l.top,this.containerBottom=l.bottom,this.scrollEl){var h=this.scrollEl.getBoundingClientRect();this.scrollElInitial=this.scrollEl.scrollTop,this.scrollElTop=h.top+f,this.scrollElBottom=h.bottom-f}else this.scrollElInitial=0,this.scrollElTop=0,this.scrollElBottom=0;this.lastToIndex=u(e),this.selectedItemHeight=e.offsetHeight,this.state=1,e.classList.add(b),Object(s["b"])()}},t.prototype.onMove=function(t){var e=this.selectedItemEl;if(e){var r=this.autoscroll(t.currentY),n=this.containerTop-r,i=this.containerBottom-r,o=Math.max(n,Math.min(t.currentY,i)),a=r+o-t.startY,c=o-n,l=this.itemIndexForTop(c);if(l!==this.lastToIndex){var h=u(e);this.lastToIndex=l,Object(s["c"])(),this.reorderMove(h,l)}e.style.transform="translateY("+a+"px)"}},t.prototype.onEnd=function(){var t=this.selectedItemEl;if(this.state=2,t){var e=this.lastToIndex,r=u(t);e===r?this.completeSync():this.ionItemReorder.emit({from:r,to:e,complete:this.completeSync.bind(this)}),Object(s["d"])()}else this.state=0},t.prototype.completeSync=function(t){var e=this.selectedItemEl;if(e&&2===this.state){var r=this.el.children,n=r.length,i=this.lastToIndex,o=u(e);if(i!==o&&(!t||!0===t)){var s=o<i?r[i+1]:r[i];this.el.insertBefore(e,s)}Array.isArray(t)&&(t=m(t,o,i));for(var a=0;a<n;a++)r[a].style["transform"]="";e.style.transition="",e.classList.remove(b),this.selectedItemEl=void 0,this.state=0}return t},t.prototype.itemIndexForTop=function(t){var e=this.cachedHeights,r=0;for(r=0;r<e.length;r++)if(e[r]>t)break;return r},t.prototype.reorderMove=function(t,e){for(var r=this.selectedItemHeight,n=this.el.children,i=0;i<n.length;i++){var o=n[i].style,s="";i>t&&i<=e?s="translateY("+-r+"px)":i<t&&i>=e&&(s="translateY("+r+"px)"),o["transform"]=s}},t.prototype.autoscroll=function(t){if(!this.scrollEl)return 0;var e=0;return t<this.scrollElTop?e=-g:t>this.scrollElBottom&&(e=g),0!==e&&this.scrollEl.scrollBy(0,e),this.scrollEl.scrollTop-this.scrollElInitial},t.prototype.render=function(){var t,e=Object(o["a"])(this);return Object(i["h"])(i["b"],{class:(t={},t[e]=!0,t["reorder-enabled"]=!this.disabled,t["reorder-list-active"]=0!==this.state,t)})},Object.defineProperty(t.prototype,"el",{get:function(){return Object(i["e"])(this)},enumerable:!0,configurable:!0}),Object.defineProperty(t,"watchers",{get:function(){return{disabled:["disabledChanged"]}},enumerable:!0,configurable:!0}),t}(),u=function(t){return t["$ionIndex"]},p=function(t,e){var r;while(t){if(r=t.parentElement,r===e)return t;t=r}},f=60,g=10,b="reorder-selected",m=function(t,e,r){var n=t[e];return t.splice(e,1),t.splice(r,0,n),t.slice()};d.style=h}}]);
//# sourceMappingURL=chunk-689441bd.de57a2ef.js.map