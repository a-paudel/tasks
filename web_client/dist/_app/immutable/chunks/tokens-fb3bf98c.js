import{c as n,w as p}from"./singletons-46705627.js";import{d as l}from"./database-4df4be65.js";const a="/api",g={base:a,tasks_sync:a+"/tasks/sync",login:a+"/users/login",register:a+"/users/register",refresh_token:a+"/users/refresh",logout:a+"/users/logout",logout_all:a+"/users/logout/all"};n.disable_scroll_handling;const f=n.goto;n.invalidate;n.invalidateAll;n.prefetch;n.prefetch_routes;n.before_navigate;n.after_navigate;new TextEncoder;const u=new TextDecoder,h=e=>{const t=atob(e),r=new Uint8Array(t.length);for(let o=0;o<t.length;o++)r[o]=t.charCodeAt(o);return r},w=e=>{let t=e;t instanceof Uint8Array&&(t=u.decode(t)),t=t.replace(/-/g,"+").replace(/_/g,"/").replace(/\s/g,"");try{return h(t)}catch{throw new TypeError("The input to be decoded is not correctly encoded.")}};class b extends Error{constructor(t){var r;super(t),this.code="ERR_JOSE_GENERIC",this.name=this.constructor.name,(r=Error.captureStackTrace)===null||r===void 0||r.call(Error,this,this.constructor)}static get code(){return"ERR_JOSE_GENERIC"}}class s extends b{constructor(){super(...arguments),this.code="ERR_JWT_INVALID"}static get code(){return"ERR_JWT_INVALID"}}function y(e){return typeof e=="object"&&e!==null}function _(e){if(!y(e)||Object.prototype.toString.call(e)!=="[object Object]")return!1;if(Object.getPrototypeOf(e)===null)return!0;let t=e;for(;Object.getPrototypeOf(t)!==null;)t=Object.getPrototypeOf(t);return Object.getPrototypeOf(e)===t}const T=w;function O(e){if(typeof e!="string")throw new s("JWTs must use Compact JWS serialization, JWT must be a string");const{1:t,length:r}=e.split(".");if(r===5)throw new s("Only JWTs using Compact JWS serialization can be decoded");if(r!==3)throw new s("Invalid JWT");if(!t)throw new s("JWTs must contain a payload");let o;try{o=T(t)}catch{throw new s("Failed to parse the base64url encoded payload")}let c;try{c=JSON.parse(u.decode(o))}catch{throw new s("Failed to parse the decoded payload as JSON")}if(!_(c))throw new s("Invalid JWT Claims Set");return c}const d=p(null);async function E(){let e=null;if(d.subscribe(o=>{e=o})(),e){let o=O(e),c=new Date(o.exp*1e3),i=new Date;if(!(c<i))return e}let r=await fetch(g.refresh_token,{method:"POST",credentials:"include"});if(r.ok){let o=await r.json();return d.set(o.access_token),o.access_token}await l.delete(),await l.open(),localStorage.removeItem("lastPulled"),window.location.pathname!=="/login"&&await f("/login")}async function k(){let e=await E();return{Authorization:"Bearer "+e,"Content-Type":"application/json"}}export{g as U,d as a,f as b,k as g};