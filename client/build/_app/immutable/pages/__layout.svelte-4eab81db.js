import{S as D,i as H,s as N,F as T,l as m,r as k,a as A,m as h,n as v,u as G,h as f,c as I,p as w,b as y,G as d,H as V,v as j,I as q,J as B,K as F,f as J,t as K,L as M,o as O}from"../chunks/index-503ae1fb.js";import{a as U}from"../chunks/client-e105b018.js";import{u as C}from"../chunks/stores-7ad03b58.js";import"../chunks/index-872bb42c.js";function P(l){let e,i,r,p,n,_,o,u,c,b,E;const g=l[3].default,s=T(g,l,l[2],null);return{c(){e=m("div"),i=m("span"),r=k(l[0]),p=A(),n=m("button"),_=k("Logout"),o=A(),u=m("div"),s&&s.c(),this.h()},l(t){e=h(t,"DIV",{class:!0});var a=v(e);i=h(a,"SPAN",{class:!0});var S=v(i);r=G(S,l[0]),S.forEach(f),p=I(a),n=h(a,"BUTTON",{class:!0});var $=v(n);_=G($,"Logout"),$.forEach(f),a.forEach(f),o=I(t),u=h(t,"DIV",{class:!0});var L=v(u);s&&s.l(L),L.forEach(f),this.h()},h(){w(i,"class","underline font-bold"),w(n,"class","btn"),w(e,"class","flex flex-row justify-between px-2 py-2 fixed top-0 w-full"),w(u,"class","container mx-auto p-10 h-screen")},m(t,a){y(t,e,a),d(e,i),d(i,r),d(e,p),d(e,n),d(n,_),y(t,o,a),y(t,u,a),s&&s.m(u,null),c=!0,b||(E=V(n,"click",l[1]),b=!0)},p(t,[a]){(!c||a&1)&&j(r,t[0]),s&&s.p&&(!c||a&4)&&q(s,g,t,t[2],c?F(g,t[2],a,null):B(t[2]),null)},i(t){c||(J(s,t),c=!0)},o(t){K(s,t),c=!1},d(t){t&&f(e),t&&f(o),t&&f(u),s&&s.d(t),b=!1,E()}}}function x(l,e,i){let r;M(l,C,o=>i(0,r=o));let{$$slots:p={},$$scope:n}=e;O(async()=>{if(window.location.pathname!=="/login/")try{let o=await U.user.checkApiUsersCheckGet();C.set(o.username)}catch{window.location.href="/login/"}});async function _(){try{await U.user.logoutApiUsersLogoutGet(),window.location.reload()}catch{alert("Error logging out.")}}return l.$$set=o=>{"$$scope"in o&&i(2,n=o.$$scope)},[r,_,n,p]}class X extends D{constructor(e){super(),H(this,e,x,P,N,{})}}export{X as default};