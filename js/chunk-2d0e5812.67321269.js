(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0e5812"],{9588:function(t,i,o){"use strict";o.r(i),o.d(i,"ion_img",(function(){return s}));var n=o("e6d3"),e=o("4dc5"),r=":host{display:block;-o-object-fit:contain;object-fit:contain}img{display:block;width:100%;height:100%;-o-object-fit:inherit;object-fit:inherit;-o-object-position:inherit;object-position:inherit}",s=function(){function t(t){var i=this;Object(n["j"])(this,t),this.onLoad=function(){i.ionImgDidLoad.emit()},this.onError=function(){i.ionError.emit()},this.ionImgWillLoad=Object(n["d"])(this,"ionImgWillLoad",7),this.ionImgDidLoad=Object(n["d"])(this,"ionImgDidLoad",7),this.ionError=Object(n["d"])(this,"ionError",7)}return t.prototype.srcChanged=function(){this.addIO()},t.prototype.componentDidLoad=function(){this.addIO()},t.prototype.addIO=function(){var t=this;void 0!==this.src&&("IntersectionObserver"in window?(this.removeIO(),this.io=new IntersectionObserver((function(i){i[0].isIntersecting&&(t.load(),t.removeIO())})),this.io.observe(this.el)):setTimeout((function(){return t.load()}),200))},t.prototype.load=function(){this.loadError=this.onError,this.loadSrc=this.src,this.ionImgWillLoad.emit()},t.prototype.removeIO=function(){this.io&&(this.io.disconnect(),this.io=void 0)},t.prototype.render=function(){return Object(n["h"])(n["b"],{class:Object(e["a"])(this)},Object(n["h"])("img",{decoding:"async",src:this.loadSrc,alt:this.alt,onLoad:this.onLoad,onError:this.loadError,part:"image"}))},Object.defineProperty(t.prototype,"el",{get:function(){return Object(n["e"])(this)},enumerable:!0,configurable:!0}),Object.defineProperty(t,"watchers",{get:function(){return{src:["srcChanged"]}},enumerable:!0,configurable:!0}),t}();s.style=r}}]);
//# sourceMappingURL=chunk-2d0e5812.67321269.js.map