const y="http://localhost:8000";class T{constructor(e={}){this.configuration=e}set config(e){this.configuration=e}get basePath(){return this.configuration.basePath!=null?this.configuration.basePath:y}get fetchApi(){return this.configuration.fetchApi}get middleware(){return this.configuration.middleware||[]}get queryParamsStringify(){return this.configuration.queryParamsStringify||g}get username(){return this.configuration.username}get password(){return this.configuration.password}get apiKey(){const e=this.configuration.apiKey;if(e)return typeof e=="function"?e:()=>e}get accessToken(){const e=this.configuration.accessToken;if(e)return typeof e=="function"?e:async()=>e}get headers(){var s,i;let e=(s=this.configuration.headers)!=null?s:{};const t=JSON.parse((i=localStorage.getItem("token"))!=null?i:"null");return t&&(e={...e,Authorization:`Bearer ${t.token}`}),e}get credentials(){return this.configuration.credentials}}const A=new T;class f{constructor(e=A){this.configuration=e,this.fetchApi=async(t,s)=>{let i={url:t,init:s};for(const r of this.middleware)r.pre&&(i=await r.pre({fetch:this.fetchApi,...i})||i);let a;try{a=await(this.configuration.fetchApi||fetch)(i.url,i.init)}catch(r){for(const o of this.middleware)o.onError&&(a=await o.onError({fetch:this.fetchApi,url:i.url,init:i.init,error:r,response:a?a.clone():void 0})||a);if(a!==void 0)throw new U(r,"The request failed and the interceptors did not return an alternative response")}for(const r of this.middleware)r.post&&(a=await r.post({fetch:this.fetchApi,url:i.url,init:i.init,response:a.clone()})||a);return a},this.middleware=e.middleware}withMiddleware(...e){const t=this.clone();return t.middleware=t.middleware.concat(...e),t}withPreMiddleware(...e){const t=e.map(s=>({pre:s}));return this.withMiddleware(...t)}withPostMiddleware(...e){const t=e.map(s=>({post:s}));return this.withMiddleware(...t)}async request(e,t){const{url:s,init:i}=await this.createFetchParams(e,t),a=await this.fetchApi(s,i);if(a.status>=200&&a.status<300)return a;throw new S(a,"Response returned an error code")}async createFetchParams(e,t){let s=this.configuration.basePath+e.path;e.query!==void 0&&Object.keys(e.query).length!==0&&(s+="?"+this.configuration.queryParamsStringify(e.query));const i=Object.assign({},this.configuration.headers,e.headers);Object.keys(i).forEach(h=>i[h]===void 0?delete i[h]:{});const a=typeof t=="function"?t:async()=>t,r={method:e.method,headers:i,body:e.body,credentials:this.configuration.credentials},o={...r,...await a({init:r,context:e})},u={...o,body:I(o.body)||o.body instanceof URLSearchParams||R(o.body)?o.body:JSON.stringify(o.body)};return{url:s,init:u}}clone(){const e=this.constructor,t=new e(this.configuration);return t.middleware=this.middleware.slice(),t}}function R(n){return typeof Blob<"u"&&n instanceof Blob}function I(n){return typeof FormData<"u"&&n instanceof FormData}class S extends Error{constructor(e,t){super(t),this.response=e,this.name="ResponseError"}}class U extends Error{constructor(e,t){super(t),this.cause=e,this.name="FetchError"}}class c extends Error{constructor(e,t){super(t),this.field=e,this.name="RequiredError"}}function g(n,e=""){return Object.keys(n).map(t=>m(t,n[t],e)).filter(t=>t.length>0).join("&")}function m(n,e,t=""){const s=t+(t.length?`[${n}]`:n);if(e instanceof Array){const i=e.map(a=>encodeURIComponent(String(a))).join(`&${encodeURIComponent(s)}=`);return`${encodeURIComponent(s)}=${i}`}if(e instanceof Set){const i=Array.from(e);return m(n,i,t)}return e instanceof Date?`${encodeURIComponent(s)}=${encodeURIComponent(e.toISOString())}`:e instanceof Object?g(e,s):`${encodeURIComponent(s)}=${encodeURIComponent(String(e))}`}function l(n){for(const e of n)if(e.contentType==="multipart/form-data")return!0;return!1}class d{constructor(e,t=s=>s){this.raw=e,this.transformer=t}async value(){return this.transformer(await this.raw.json())}}class k{constructor(e){this.raw=e}async value(){}}function O(n){if(n!==void 0)return n===null?null:{task:n.task,done:n.done,due:n.due===void 0?void 0:n.due.toISOString()}}function p(n){return P(n)}function P(n,e){return n==null?n:{id:n.id,task:n.task,done:n.done,due:new Date(n.due)}}function v(n){if(n!==void 0)return n===null?null:{task:n.task,done:n.done,due:n.due===void 0?void 0:n.due.toISOString()}}function w(n){return b(n)}function b(n,e){return n==null?n:{token:n.token,expiresAt:new Date(n.expires_at)}}function C(n){return E(n)}function E(n,e){return n==null?n:{id:n.id,username:n.username}}class G extends f{async createTaskApiTasksPostRaw(e,t){if(e.taskCreateInput===null||e.taskCreateInput===void 0)throw new c("taskCreateInput","Required parameter requestParameters.taskCreateInput was null or undefined when calling createTaskApiTasksPost.");const s={},i={};i["Content-Type"]="application/json",this.configuration&&this.configuration.accessToken&&(i.Authorization=await this.configuration.accessToken("OAuth2PasswordBearer",[]));const a=await this.request({path:"/api/tasks/",method:"POST",headers:i,query:s,body:O(e.taskCreateInput)},t);return new d(a,r=>p(r))}async createTaskApiTasksPost(e,t){return await(await this.createTaskApiTasksPostRaw(e,t)).value()}async deleteTaskApiTasksIdDeleteRaw(e,t){if(e.id===null||e.id===void 0)throw new c("id","Required parameter requestParameters.id was null or undefined when calling deleteTaskApiTasksIdDelete.");const s={},i={};this.configuration&&this.configuration.accessToken&&(i.Authorization=await this.configuration.accessToken("OAuth2PasswordBearer",[]));const a=await this.request({path:"/api/tasks/{id}".replace("{id}",encodeURIComponent(String(e.id))),method:"DELETE",headers:i,query:s},t);return new k(a)}async deleteTaskApiTasksIdDelete(e,t){await this.deleteTaskApiTasksIdDeleteRaw(e,t)}async getTaskApiTasksIdGetRaw(e,t){if(e.id===null||e.id===void 0)throw new c("id","Required parameter requestParameters.id was null or undefined when calling getTaskApiTasksIdGet.");const s={},i={};this.configuration&&this.configuration.accessToken&&(i.Authorization=await this.configuration.accessToken("OAuth2PasswordBearer",[]));const a=await this.request({path:"/api/tasks/{id}".replace("{id}",encodeURIComponent(String(e.id))),method:"GET",headers:i,query:s},t);return new d(a,r=>p(r))}async getTaskApiTasksIdGet(e,t){return await(await this.getTaskApiTasksIdGetRaw(e,t)).value()}async listTasksApiTasksGetRaw(e){const t={},s={};this.configuration&&this.configuration.accessToken&&(s.Authorization=await this.configuration.accessToken("OAuth2PasswordBearer",[]));const i=await this.request({path:"/api/tasks/",method:"GET",headers:s,query:t},e);return new d(i,a=>a.map(p))}async listTasksApiTasksGet(e){return await(await this.listTasksApiTasksGetRaw(e)).value()}async updateTaskApiTasksIdPutRaw(e,t){if(e.id===null||e.id===void 0)throw new c("id","Required parameter requestParameters.id was null or undefined when calling updateTaskApiTasksIdPut.");if(e.taskUpdateInput===null||e.taskUpdateInput===void 0)throw new c("taskUpdateInput","Required parameter requestParameters.taskUpdateInput was null or undefined when calling updateTaskApiTasksIdPut.");const s={},i={};i["Content-Type"]="application/json",this.configuration&&this.configuration.accessToken&&(i.Authorization=await this.configuration.accessToken("OAuth2PasswordBearer",[]));const a=await this.request({path:"/api/tasks/{id}".replace("{id}",encodeURIComponent(String(e.id))),method:"PUT",headers:i,query:s,body:v(e.taskUpdateInput)},t);return new d(a,r=>p(r))}async updateTaskApiTasksIdPut(e,t){return await(await this.updateTaskApiTasksIdPutRaw(e,t)).value()}}class q extends f{async checkApiUsersCheckGetRaw(e){const t={},s={};this.configuration&&this.configuration.accessToken&&(s.Authorization=await this.configuration.accessToken("OAuth2PasswordBearer",[]));const i=await this.request({path:"/api/users/check",method:"GET",headers:s,query:t},e);return new d(i,a=>C(a))}async checkApiUsersCheckGet(e){return await(await this.checkApiUsersCheckGetRaw(e)).value()}async loginApiUsersLoginPostRaw(e,t){if(e.username===null||e.username===void 0)throw new c("username","Required parameter requestParameters.username was null or undefined when calling loginApiUsersLoginPost.");if(e.password===null||e.password===void 0)throw new c("password","Required parameter requestParameters.password was null or undefined when calling loginApiUsersLoginPost.");const s={},i={};l([{contentType:"application/x-www-form-urlencoded"}]);let r;r=new URLSearchParams,e.grantType!==void 0&&r.append("grant_type",e.grantType),e.username!==void 0&&r.append("username",e.username),e.password!==void 0&&r.append("password",e.password),e.scope!==void 0&&r.append("scope",e.scope),e.clientId!==void 0&&r.append("client_id",e.clientId),e.clientSecret!==void 0&&r.append("client_secret",e.clientSecret);const o=await this.request({path:"/api/users/login",method:"POST",headers:i,query:s,body:r},t);return new d(o,u=>w(u))}async loginApiUsersLoginPost(e,t){return await(await this.loginApiUsersLoginPostRaw(e,t)).value()}async logoutApiUsersLogoutGetRaw(e){const t={},s={};this.configuration&&this.configuration.accessToken&&(s.Authorization=await this.configuration.accessToken("OAuth2PasswordBearer",[]));const i=await this.request({path:"/api/users/logout",method:"GET",headers:s,query:t},e);return new k(i)}async logoutApiUsersLogoutGet(e){await this.logoutApiUsersLogoutGetRaw(e)}async registerApiUsersRegisterPostRaw(e,t){if(e.username===null||e.username===void 0)throw new c("username","Required parameter requestParameters.username was null or undefined when calling registerApiUsersRegisterPost.");if(e.password===null||e.password===void 0)throw new c("password","Required parameter requestParameters.password was null or undefined when calling registerApiUsersRegisterPost.");const s={},i={};l([{contentType:"application/x-www-form-urlencoded"}]);let r;r=new URLSearchParams,e.grantType!==void 0&&r.append("grant_type",e.grantType),e.username!==void 0&&r.append("username",e.username),e.password!==void 0&&r.append("password",e.password),e.scope!==void 0&&r.append("scope",e.scope),e.clientId!==void 0&&r.append("client_id",e.clientId),e.clientSecret!==void 0&&r.append("client_secret",e.clientSecret);const o=await this.request({path:"/api/users/register",method:"POST",headers:i,query:s,body:r},t);return new d(o,u=>w(u))}async registerApiUsersRegisterPost(e,t){return await(await this.registerApiUsersRegisterPostRaw(e,t)).value()}}const D={task:new G,user:new q};export{D as a};
