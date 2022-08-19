import{_ as v,C as $,P as C}from"./index-503ae1fb.js";function w(e){const n=e-1;return n*n*n+1}/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */function B(e,n){var i={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&n.indexOf(o)<0&&(i[o]=e[o]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var t=0,o=Object.getOwnPropertySymbols(e);t<o.length;t++)n.indexOf(o[t])<0&&Object.prototype.propertyIsEnumerable.call(e,o[t])&&(i[o[t]]=e[o[t]]);return i}function S(e,{delay:n=0,duration:i=400,easing:o=v}={}){const t=+getComputedStyle(e).opacity;return{delay:n,duration:i,easing:o,css:l=>`opacity: ${l*t}`}}function j(e,{delay:n=0,duration:i=400,easing:o=w}={}){const t=getComputedStyle(e),l=+t.opacity,y=parseFloat(t.height),c=parseFloat(t.paddingTop),s=parseFloat(t.paddingBottom),f=parseFloat(t.marginTop),d=parseFloat(t.marginBottom),r=parseFloat(t.borderTopWidth),g=parseFloat(t.borderBottomWidth);return{delay:n,duration:i,easing:o,css:a=>`overflow: hidden;opacity: ${Math.min(a*20,1)*l};height: ${a*y}px;padding-top: ${a*c}px;padding-bottom: ${a*s}px;margin-top: ${a*f}px;margin-bottom: ${a*d}px;border-top-width: ${a*r}px;border-bottom-width: ${a*g}px;`}}function P(e){var{fallback:n}=e,i=B(e,["fallback"]);const o=new Map,t=new Map;function l(c,s,f){const{delay:d=0,duration:r=p=>Math.sqrt(p)*30,easing:g=w}=$($({},i),f),a=s.getBoundingClientRect(),u=c.left-a.left,h=c.top-a.top,x=c.width/a.width,_=c.height/a.height,O=Math.sqrt(u*u+h*h),b=getComputedStyle(s),k=b.transform==="none"?"":b.transform,F=+b.opacity;return{delay:d,duration:C(r)?r(O):r,easing:g,css:(p,m)=>`
				opacity: ${p*F};
				transform-origin: top left;
				transform: ${k} translate(${m*u}px,${m*h}px) scale(${p+(1-p)*x}, ${p+(1-p)*_});
			`}}function y(c,s,f){return(d,r)=>(c.set(r.key,{rect:d.getBoundingClientRect()}),()=>{if(s.has(r.key)){const{rect:g}=s.get(r.key);return s.delete(r.key),l(g,d,r)}return c.delete(r.key),n&&n(d,r,f)})}return[y(t,o,!1),y(o,t,!0)]}export{P as a,w as c,S as f,j as s};
