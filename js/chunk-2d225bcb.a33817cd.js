(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d225bcb"],{e659:function(t,e,r){"use strict";r.r(e),r.d(e,"scopeCss",(function(){return N}));var n=r("9ab4"),c=function(t){var e,r=[],n=0;t=t.replace(/(\[[^\]]*\])/g,(function(t,e){var c="__ph-"+n+"__";return r.push(e),n++,c})),e=t.replace(/(:nth-[-\w]+)(\([^)]+\))/g,(function(t,e,c){var s="__ph-"+n+"__";return r.push(c),n++,e+s}));var c={content:e,placeholders:r};return c},s=function(t,e){return e.replace(/__ph-(\d+)__/g,(function(e,r){return t[+r]}))},o="-shadowcsshost",a="-shadowcssslotted",i="-shadowcsscontext",u=")(?:\\(((?:\\([^)(]*\\)|[^)(]*)+?)\\))?([^,{]*)",l=new RegExp("("+o+u,"gim"),p=new RegExp("("+i+u,"gim"),f=new RegExp("("+a+u,"gim"),h=o+"-no-combinator",g=/-shadowcsshost-no-combinator([^\s]*)/,v=[/::shadow/g,/::content/g],d="([>\\s~+[.,{:][\\s\\S]*)?$",m=/-shadowcsshost/gim,x=/:host/gim,_=/::slotted/gim,w=/:host-context/gim,b=/\/\*\s*[\s\S]*?\*\//g,S=function(t){return t.replace(b,"")},O=/\/\*\s*#\s*source(Mapping)?URL=[\s\S]+?\*\//g,W=function(t){return t.match(O)||[]},j=/(\s*)([^;\{\}]+?)(\s*)((?:{%BLOCK%}?\s*;?)|(?:\s*;))/g,k=/([{}])/g,E="{",R="}",T="%BLOCK%",C=function(t,e){var r=L(t),n=0;return r.escapedString.replace(j,(function(){for(var t=[],c=0;c<arguments.length;c++)t[c]=arguments[c];var s=t[2],o="",a=t[4],i="";a&&a.startsWith("{"+T)&&(o=r.blocks[n++],a=a.substring(T.length+1),i="{");var u={selector:s,content:o},l=e(u);return""+t[1]+l.selector+t[3]+i+l.content+a}))},L=function(t){for(var e=t.split(k),r=[],n=[],c=0,s=[],o=0;o<e.length;o++){var a=e[o];a===R&&c--,c>0?s.push(a):(s.length>0&&(n.push(s.join("")),r.push(T),s=[]),r.push(a)),a===E&&c++}s.length>0&&(n.push(s.join("")),r.push(T));var i={escapedString:r.join(""),blocks:n};return i},B=function(t){return t=t.replace(w,i).replace(x,o).replace(_,a),t},I=function(t,e,r){return t.replace(e,(function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];if(t[2]){for(var n=t[2].split(","),c=[],s=0;s<n.length;s++){var o=n[s].trim();if(!o)break;c.push(r(h,o,t[3]))}return c.join(",")}return h+t[3]}))},J=function(t,e,r){return t+e.replace(o,"")+r},K=function(t){return I(t,l,J)},$=function(t,e,r){return e.indexOf(o)>-1?J(t,e,r):t+e+r+", "+e+" "+t+r},y=function(t,e){var r="."+e+" > ",n=[];return t=t.replace(f,(function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];if(t[2]){for(var c=t[2].trim(),s=t[3],o=r+c+s,a="",i=t[4]-1;i>=0;i--){var u=t[5][i];if("}"===u||","===u)break;a=u+a}var l=a+o,p=""+a.trimRight()+o.trim();if(l.trim()!==p.trim()){var f=p+", "+l;n.push({orgSelector:l,updatedSelector:f})}return o}return h+t[3]})),{selectors:n,cssText:t}},A=function(t){return I(t,p,$)},M=function(t){return v.reduce((function(t,e){return t.replace(e," ")}),t)},U=function(t){var e=/\[/g,r=/\]/g;return t=t.replace(e,"\\[").replace(r,"\\]"),new RegExp("^("+t+")"+d,"m")},q=function(t,e){var r=U(e);return!r.test(t)},z=function(t,e,r){if(m.lastIndex=0,m.test(t)){var n="."+r;return t.replace(g,(function(t,e){return e.replace(/([^:]*)(:*)(.*)/,(function(t,e,r,c){return e+n+r+c}))})).replace(m,n+" ")}return e+" "+t},D=function(t,e,r){var n=/\[is=([^\]]*)\]/g;e=e.replace(n,(function(t){for(var e=[],r=1;r<arguments.length;r++)e[r-1]=arguments[r];return e[0]}));var o="."+e,a=function(t){var n=t.trim();if(!n)return"";if(t.indexOf(h)>-1)n=z(t,e,r);else{var c=t.replace(m,"");if(c.length>0){var s=c.match(/([^:]*)(:*)(.*)/);s&&(n=s[1]+o+s[2]+s[3])}}return n},i=c(t);t=i.content;var u,l="",p=0,f=/( |>|\+|~(?!=))\s*/g,g=t.indexOf(h)>-1,v=!g;while(null!==(u=f.exec(t))){var d=u[1],x=t.slice(p,u.index).trim();v=v||x.indexOf(h)>-1;var _=v?a(x):x;l+=_+" "+d+" ",p=f.lastIndex}var w=t.substring(p);return v=v||w.indexOf(h)>-1,l+=v?a(w):w,s(i.placeholders,l)},F=function(t,e,r,n){return t.split(",").map((function(t){return n&&t.indexOf("."+n)>-1?t.trim():q(t,e)?D(t,e,r).trim():t.trim()})).join(", ")},G=function(t,e,r,n,c){return C(t,(function(t){var c=t.selector,s=t.content;"@"!==t.selector[0]?c=F(t.selector,e,r,n):(t.selector.startsWith("@media")||t.selector.startsWith("@supports")||t.selector.startsWith("@page")||t.selector.startsWith("@document"))&&(s=G(t.content,e,r,n));var o={selector:c.replace(/\s{2,}/g," ").trim(),content:s};return o}))},H=function(t,e,r,n,c){t=B(t),t=K(t),t=A(t);var s=y(t,n);return t=s.cssText,t=M(t),e&&(t=G(t,e,r,n)),t=t.replace(/-shadowcsshost-no-combinator/g,"."+r),t=t.replace(/>\s*\*\s+([^{, ]+)/gm," $1 "),{cssText:t.trim(),slottedSelectors:s.selectors}},N=function(t,e,r){var c=e+"-h",s=e+"-s",o=W(t);t=S(t);var a=[];if(r){var i=function(t){var e="/*!@___"+a.length+"___*/",r="/*!@"+t.selector+"*/";return a.push({placeholder:e,comment:r}),t.selector=e+t.selector,t};t=C(t,(function(t){return"@"!==t.selector[0]?i(t):t.selector.startsWith("@media")||t.selector.startsWith("@supports")||t.selector.startsWith("@page")||t.selector.startsWith("@document")?(t.content=C(t.content,i),t):t}))}var u=H(t,e,c,s);return t=Object(n["__spreadArrays"])([u.cssText],o).join("\n"),r&&a.forEach((function(e){var r=e.placeholder,n=e.comment;t=t.replace(r,n)})),u.slottedSelectors.forEach((function(e){t=t.replace(e.orgSelector,e.updatedSelector)})),t};
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 *
 * This file is a port of shadowCSS from webcomponents.js to TypeScript.
 * https://github.com/webcomponents/webcomponentsjs/blob/4efecd7e0e/src/ShadowCSS/ShadowCSS.js
 * https://github.com/angular/angular/blob/master/packages/compiler/src/shadow_css.ts
 */}}]);
//# sourceMappingURL=chunk-2d225bcb.a33817cd.js.map