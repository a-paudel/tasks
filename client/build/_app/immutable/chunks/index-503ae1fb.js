function $(){}const W=t=>t;function mt(t,e){for(const n in e)t[n]=e[n];return t}function nt(t){return t()}function Z(){return Object.create(null)}function C(t){t.forEach(nt)}function G(t){return typeof t=="function"}function Ht(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}function pt(t){return Object.keys(t).length===0}function yt(t,...e){if(t==null)return $;const n=t.subscribe(...e);return n.unsubscribe?()=>n.unsubscribe():n}function It(t,e,n){t.$$.on_destroy.push(yt(e,n))}function Wt(t,e,n,i){if(t){const s=it(t,e,n,i);return t[0](s)}}function it(t,e,n,i){return t[1]&&i?mt(n.ctx.slice(),t[1](i(e))):n.ctx}function Gt(t,e,n,i){if(t[2]&&i){const s=t[2](i(n));if(e.dirty===void 0)return s;if(typeof s=="object"){const c=[],r=Math.max(e.dirty.length,s.length);for(let l=0;l<r;l+=1)c[l]=e.dirty[l]|s[l];return c}return e.dirty|s}return e.dirty}function Jt(t,e,n,i,s,c){if(s){const r=it(e,n,i,c);t.p(r,s)}}function Kt(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let i=0;i<n;i++)e[i]=-1;return e}return-1}const st=typeof window<"u";let J=st?()=>window.performance.now():()=>Date.now(),K=st?t=>requestAnimationFrame(t):$;const E=new Set;function rt(t){E.forEach(e=>{e.c(t)||(E.delete(e),e.f())}),E.size!==0&&K(rt)}function Q(t){let e;return E.size===0&&K(rt),{promise:new Promise(n=>{E.add(e={c:t,f:n})}),abort(){E.delete(e)}}}let q=!1;function gt(){q=!0}function xt(){q=!1}function bt(t,e,n,i){for(;t<e;){const s=t+(e-t>>1);n(s)<=i?t=s+1:e=s}return t}function wt(t){if(t.hydrate_init)return;t.hydrate_init=!0;let e=t.childNodes;if(t.nodeName==="HEAD"){const o=[];for(let u=0;u<e.length;u++){const f=e[u];f.claim_order!==void 0&&o.push(f)}e=o}const n=new Int32Array(e.length+1),i=new Int32Array(e.length);n[0]=-1;let s=0;for(let o=0;o<e.length;o++){const u=e[o].claim_order,f=(s>0&&e[n[s]].claim_order<=u?s+1:bt(1,s,_=>e[n[_]].claim_order,u))-1;i[o]=n[f]+1;const a=f+1;n[a]=o,s=Math.max(a,s)}const c=[],r=[];let l=e.length-1;for(let o=n[s]+1;o!=0;o=i[o-1]){for(c.push(e[o-1]);l>=o;l--)r.push(e[l]);l--}for(;l>=0;l--)r.push(e[l]);c.reverse(),r.sort((o,u)=>o.claim_order-u.claim_order);for(let o=0,u=0;o<r.length;o++){for(;u<c.length&&r[o].claim_order>=c[u].claim_order;)u++;const f=u<c.length?c[u]:null;t.insertBefore(r[o],f)}}function $t(t,e){t.appendChild(e)}function ot(t){if(!t)return document;const e=t.getRootNode?t.getRootNode():t.ownerDocument;return e&&e.host?e:t.ownerDocument}function vt(t){const e=ct("style");return kt(ot(t),e),e.sheet}function kt(t,e){$t(t.head||t,e)}function Et(t,e){if(q){for(wt(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentElement!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;e!==t.actual_end_child?(e.claim_order!==void 0||e.parentNode!==t)&&t.insertBefore(e,t.actual_end_child):t.actual_end_child=e.nextSibling}else(e.parentNode!==t||e.nextSibling!==null)&&t.appendChild(e)}function Qt(t,e,n){q&&!n?Et(t,e):(e.parentNode!==t||e.nextSibling!=n)&&t.insertBefore(e,n||null)}function Ct(t){t.parentNode.removeChild(t)}function ct(t){return document.createElement(t)}function U(t){return document.createTextNode(t)}function Ut(){return U(" ")}function Vt(){return U("")}function Xt(t,e,n,i){return t.addEventListener(e,n,i),()=>t.removeEventListener(e,n,i)}function Yt(t){return function(e){return e.preventDefault(),t.call(this,e)}}function Zt(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function St(t){return Array.from(t.childNodes)}function Nt(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function lt(t,e,n,i,s=!1){Nt(t);const c=(()=>{for(let r=t.claim_info.last_index;r<t.length;r++){const l=t[r];if(e(l)){const o=n(l);return o===void 0?t.splice(r,1):t[r]=o,s||(t.claim_info.last_index=r),l}}for(let r=t.claim_info.last_index-1;r>=0;r--){const l=t[r];if(e(l)){const o=n(l);return o===void 0?t.splice(r,1):t[r]=o,s?o===void 0&&t.claim_info.last_index--:t.claim_info.last_index=r,l}}return i()})();return c.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,c}function jt(t,e,n,i){return lt(t,s=>s.nodeName===e,s=>{const c=[];for(let r=0;r<s.attributes.length;r++){const l=s.attributes[r];n[l.name]||c.push(l.name)}c.forEach(r=>s.removeAttribute(r))},()=>i(e))}function te(t,e,n){return jt(t,e,n,ct)}function At(t,e){return lt(t,n=>n.nodeType===3,n=>{const i=""+e;if(n.data.startsWith(i)){if(n.data.length!==i.length)return n.splitText(i.length)}else n.data=i},()=>U(e),!0)}function ee(t){return At(t," ")}function ne(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function ie(t,e){t.value=e==null?"":e}function se(t,e,n,i){n===null?t.style.removeProperty(e):t.style.setProperty(e,n,i?"important":"")}function re(t,e,n){t.classList[n?"add":"remove"](e)}function Mt(t,e,{bubbles:n=!1,cancelable:i=!1}={}){const s=document.createEvent("CustomEvent");return s.initCustomEvent(t,n,i,e),s}const P=new Map;let L=0;function Rt(t){let e=5381,n=t.length;for(;n--;)e=(e<<5)-e^t.charCodeAt(n);return e>>>0}function Bt(t,e){const n={stylesheet:vt(e),rules:{}};return P.set(t,n),n}function V(t,e,n,i,s,c,r,l=0){const o=16.666/i;let u=`{
`;for(let m=0;m<=1;m+=o){const g=e+(n-e)*c(m);u+=m*100+`%{${r(g,1-g)}}
`}const f=u+`100% {${r(n,1-n)}}
}`,a=`__svelte_${Rt(f)}_${l}`,_=ot(t),{stylesheet:d,rules:h}=P.get(_)||Bt(_,t);h[a]||(h[a]=!0,d.insertRule(`@keyframes ${a} ${f}`,d.cssRules.length));const y=t.style.animation||"";return t.style.animation=`${y?`${y}, `:""}${a} ${i}ms linear ${s}ms 1 both`,L+=1,a}function T(t,e){const n=(t.style.animation||"").split(", "),i=n.filter(e?c=>c.indexOf(e)<0:c=>c.indexOf("__svelte")===-1),s=n.length-i.length;s&&(t.style.animation=i.join(", "),L-=s,L||Dt())}function Dt(){K(()=>{L||(P.forEach(t=>{const{stylesheet:e}=t;let n=e.cssRules.length;for(;n--;)e.deleteRule(n);t.rules={}}),P.clear())})}function oe(t,e,n,i){if(!e)return $;const s=t.getBoundingClientRect();if(e.left===s.left&&e.right===s.right&&e.top===s.top&&e.bottom===s.bottom)return $;const{delay:c=0,duration:r=300,easing:l=W,start:o=J()+c,end:u=o+r,tick:f=$,css:a}=n(t,{from:e,to:s},i);let _=!0,d=!1,h;function y(){a&&(h=V(t,0,1,r,c,l,a)),c||(d=!0)}function m(){a&&T(t,h),_=!1}return Q(g=>{if(!d&&g>=o&&(d=!0),d&&g>=u&&(f(1,0),m()),!_)return!1;if(d){const w=g-o,v=0+1*l(w/r);f(v,1-v)}return!0}),y(),f(0,1),m}function ce(t){const e=getComputedStyle(t);if(e.position!=="absolute"&&e.position!=="fixed"){const{width:n,height:i}=e,s=t.getBoundingClientRect();t.style.position="absolute",t.style.width=n,t.style.height=i,Ot(t,s)}}function Ot(t,e){const n=t.getBoundingClientRect();if(e.left!==n.left||e.top!==n.top){const i=getComputedStyle(t),s=i.transform==="none"?"":i.transform;t.style.transform=`${s} translate(${e.left-n.left}px, ${e.top-n.top}px)`}}let A;function j(t){A=t}function X(){if(!A)throw new Error("Function called outside component initialization");return A}function le(t){X().$$.on_mount.push(t)}function ue(t){X().$$.after_update.push(t)}function ae(t,e){return X().$$.context.set(t,e),e}const N=[],tt=[],D=[],et=[],ut=Promise.resolve();let I=!1;function at(){I||(I=!0,ut.then(ft))}function fe(){return at(),ut}function M(t){D.push(t)}const H=new Set;let B=0;function ft(){const t=A;do{for(;B<N.length;){const e=N[B];B++,j(e),Pt(e.$$)}for(j(null),N.length=0,B=0;tt.length;)tt.pop()();for(let e=0;e<D.length;e+=1){const n=D[e];H.has(n)||(H.add(n),n())}D.length=0}while(N.length);for(;et.length;)et.pop()();I=!1,H.clear(),j(t)}function Pt(t){if(t.fragment!==null){t.update(),C(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(M)}}let S;function _t(){return S||(S=Promise.resolve(),S.then(()=>{S=null})),S}function z(t,e,n){t.dispatchEvent(Mt(`${e?"intro":"outro"}${n}`))}const O=new Set;let k;function _e(){k={r:0,c:[],p:k}}function de(){k.r||C(k.c),k=k.p}function dt(t,e){t&&t.i&&(O.delete(t),t.i(e))}function Lt(t,e,n,i){if(t&&t.o){if(O.has(t))return;O.add(t),k.c.push(()=>{O.delete(t),i&&(n&&t.d(1),i())}),t.o(e)}else i&&i()}const ht={duration:0};function he(t,e,n){let i=e(t,n),s=!1,c,r,l=0;function o(){c&&T(t,c)}function u(){const{delay:a=0,duration:_=300,easing:d=W,tick:h=$,css:y}=i||ht;y&&(c=V(t,0,1,_,a,d,y,l++)),h(0,1);const m=J()+a,g=m+_;r&&r.abort(),s=!0,M(()=>z(t,!0,"start")),r=Q(w=>{if(s){if(w>=g)return h(1,0),z(t,!0,"end"),o(),s=!1;if(w>=m){const v=d((w-m)/_);h(v,1-v)}}return s})}let f=!1;return{start(){f||(f=!0,T(t),G(i)?(i=i(),_t().then(u)):u())},invalidate(){f=!1},end(){s&&(o(),s=!1)}}}function me(t,e,n){let i=e(t,n),s=!0,c;const r=k;r.r+=1;function l(){const{delay:o=0,duration:u=300,easing:f=W,tick:a=$,css:_}=i||ht;_&&(c=V(t,1,0,u,o,f,_));const d=J()+o,h=d+u;M(()=>z(t,!1,"start")),Q(y=>{if(s){if(y>=h)return a(0,1),z(t,!1,"end"),--r.r||C(r.c),!1;if(y>=d){const m=f((y-d)/u);a(1-m,m)}}return s})}return G(i)?_t().then(()=>{i=i(),l()}):l(),{end(o){o&&i.tick&&i.tick(1,0),s&&(c&&T(t,c),s=!1)}}}function Tt(t,e){Lt(t,1,1,()=>{e.delete(t.key)})}function pe(t,e){t.f(),Tt(t,e)}function ye(t,e,n,i,s,c,r,l,o,u,f,a){let _=t.length,d=c.length,h=_;const y={};for(;h--;)y[t[h].key]=h;const m=[],g=new Map,w=new Map;for(h=d;h--;){const p=a(s,c,h),x=n(p);let b=r.get(x);b?i&&b.p(p,e):(b=u(x,p),b.c()),g.set(x,m[h]=b),x in y&&w.set(x,Math.abs(h-y[x]))}const v=new Set,Y=new Set;function F(p){dt(p,1),p.m(l,f),r.set(p.key,p),f=p.first,d--}for(;_&&d;){const p=m[d-1],x=t[_-1],b=p.key,R=x.key;p===x?(f=p.first,_--,d--):g.has(R)?!r.has(b)||v.has(b)?F(p):Y.has(R)?_--:w.get(b)>w.get(R)?(Y.add(b),F(p)):(v.add(R),_--):(o(x,r),_--)}for(;_--;){const p=t[_];g.has(p.key)||o(p,r)}for(;d;)F(m[d-1]);return m}function ge(t,e){const n={},i={},s={$$scope:1};let c=t.length;for(;c--;){const r=t[c],l=e[c];if(l){for(const o in r)o in l||(i[o]=1);for(const o in l)s[o]||(n[o]=l[o],s[o]=1);t[c]=l}else for(const o in r)s[o]=1}for(const r in i)r in n||(n[r]=void 0);return n}function xe(t){return typeof t=="object"&&t!==null?t:{}}function be(t){t&&t.c()}function we(t,e){t&&t.l(e)}function zt(t,e,n,i){const{fragment:s,on_mount:c,on_destroy:r,after_update:l}=t.$$;s&&s.m(e,n),i||M(()=>{const o=c.map(nt).filter(G);r?r.push(...o):C(o),t.$$.on_mount=[]}),l.forEach(M)}function qt(t,e){const n=t.$$;n.fragment!==null&&(C(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function Ft(t,e){t.$$.dirty[0]===-1&&(N.push(t),at(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function $e(t,e,n,i,s,c,r,l=[-1]){const o=A;j(t);const u=t.$$={fragment:null,ctx:null,props:c,update:$,not_equal:s,bound:Z(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(o?o.$$.context:[])),callbacks:Z(),dirty:l,skip_bound:!1,root:e.target||o.$$.root};r&&r(u.root);let f=!1;if(u.ctx=n?n(t,e.props||{},(a,_,...d)=>{const h=d.length?d[0]:_;return u.ctx&&s(u.ctx[a],u.ctx[a]=h)&&(!u.skip_bound&&u.bound[a]&&u.bound[a](h),f&&Ft(t,a)),_}):[],u.update(),f=!0,C(u.before_update),u.fragment=i?i(u.ctx):!1,e.target){if(e.hydrate){gt();const a=St(e.target);u.fragment&&u.fragment.l(a),a.forEach(Ct)}else u.fragment&&u.fragment.c();e.intro&&dt(t.$$.fragment),zt(t,e.target,e.anchor,e.customElement),xt(),ft()}j(o)}class ve{$destroy(){qt(this,1),this.$destroy=$}$on(e,n){const i=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return i.push(n),()=>{const s=i.indexOf(n);s!==-1&&i.splice(s,1)}}$set(e){this.$$set&&!pt(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}export{xe as A,qt as B,mt as C,fe as D,$ as E,Wt as F,Et as G,Xt as H,Jt as I,Kt as J,Gt as K,It as L,ie as M,Yt as N,C as O,G as P,ye as Q,re as R,ve as S,ce as T,Ot as U,oe as V,M as W,he as X,me as Y,pe as Z,W as _,Ut as a,Qt as b,ee as c,de as d,Vt as e,dt as f,_e as g,Ct as h,$e as i,ae as j,ue as k,ct as l,te as m,St as n,le as o,Zt as p,se as q,U as r,Ht as s,Lt as t,At as u,ne as v,be as w,we as x,zt as y,ge as z};
