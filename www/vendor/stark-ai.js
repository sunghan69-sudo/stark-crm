(()=>{var Ue=()=>{};var Be=function(t){let e=[],n=0;for(let s=0;s<t.length;s++){let i=t.charCodeAt(s);i<128?e[n++]=i:i<2048?(e[n++]=i>>6|192,e[n++]=i&63|128):(i&64512)===55296&&s+1<t.length&&(t.charCodeAt(s+1)&64512)===56320?(i=65536+((i&1023)<<10)+(t.charCodeAt(++s)&1023),e[n++]=i>>18|240,e[n++]=i>>12&63|128,e[n++]=i>>6&63|128,e[n++]=i&63|128):(e[n++]=i>>12|224,e[n++]=i>>6&63|128,e[n++]=i&63|128)}return e},Nt=function(t){let e=[],n=0,s=0;for(;n<t.length;){let i=t[n++];if(i<128)e[s++]=String.fromCharCode(i);else if(i>191&&i<224){let o=t[n++];e[s++]=String.fromCharCode((i&31)<<6|o&63)}else if(i>239&&i<365){let o=t[n++],r=t[n++],a=t[n++],c=((i&7)<<18|(o&63)<<12|(r&63)<<6|a&63)-65536;e[s++]=String.fromCharCode(55296+(c>>10)),e[s++]=String.fromCharCode(56320+(c&1023))}else{let o=t[n++],r=t[n++];e[s++]=String.fromCharCode((i&15)<<12|(o&63)<<6|r&63)}}return e.join("")},$e={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();let n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,s=[];for(let i=0;i<t.length;i+=3){let o=t[i],r=i+1<t.length,a=r?t[i+1]:0,c=i+2<t.length,l=c?t[i+2]:0,h=o>>2,m=(o&3)<<4|a>>4,f=(a&15)<<2|l>>6,_=l&63;c||(_=64,r||(f=64)),s.push(n[h],n[m],n[f],n[_])}return s.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(Be(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):Nt(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();let n=e?this.charToByteMapWebSafe_:this.charToByteMap_,s=[];for(let i=0;i<t.length;){let o=n[t.charAt(i++)],a=i<t.length?n[t.charAt(i)]:0;++i;let l=i<t.length?n[t.charAt(i)]:64;++i;let m=i<t.length?n[t.charAt(i)]:64;if(++i,o==null||a==null||l==null||m==null)throw new Z;let f=o<<2|a>>4;if(s.push(f),l!==64){let _=a<<4&240|l>>2;if(s.push(_),m!==64){let g=l<<6&192|m;s.push(g)}}}return s},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}},Z=class extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}},vt=function(t){let e=Be(t);return $e.encodeByteArray(e,!0)},ee=function(t){return vt(t).replace(/\./g,"")},He=function(t){try{return $e.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};function N(t){return Ge(void 0,t)}function Ge(t,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:let n=e;return new Date(n.getTime());case Object:t===void 0&&(t={});break;case Array:t=[];break;default:return e}for(let n in e)!e.hasOwnProperty(n)||!Lt(n)||(t[n]=Ge(t[n],e[n]));return t}function Lt(t){return t!=="__proto__"}function te(){if(typeof self!="undefined")return self;if(typeof window!="undefined")return window;if(typeof global!="undefined")return global;throw new Error("Unable to locate global object.")}var Mt=()=>te().__FIREBASE_DEFAULTS__,Pt=()=>{if(typeof process=="undefined"||typeof process.env=="undefined")return;let t=process.env.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},kt=()=>{if(typeof document=="undefined")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}let e=t&&He(t[1]);return e&&JSON.parse(e)},xt=()=>{try{return Ue()||Mt()||Pt()||kt()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}};var ne=()=>{var t;return(t=xt())==null?void 0:t.config};var F=class{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,s)=>{n?this.reject(n):this.resolve(s),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,s))}}};function Ve(){try{return typeof indexedDB=="object"}catch{return!1}}function We(){return new Promise((t,e)=>{try{let n=!0,s="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(s);i.onsuccess=()=>{i.result.close(),n||self.indexedDB.deleteDatabase(s),t(!0)},i.onupgradeneeded=()=>{n=!1},i.onerror=()=>{var o;e(((o=i.error)==null?void 0:o.message)||"")}}catch(n){e(n)}})}var Ut="FirebaseError",A=class t extends Error{constructor(e,n,s){super(n),this.code=e,this.customData=s,this.name=Ut,Object.setPrototypeOf(this,t.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,B.prototype.create)}},B=class{constructor(e,n,s){this.service=e,this.serviceName=n,this.errors=s}create(e,...n){let s=n[0]||{},i=`${this.service}/${e}`,o=this.errors[e],r=o?Ft(o,s):"Error",a=`${this.serviceName}: ${r} (${i}).`;return new A(i,a,s)}};function Ft(t,e){try{let n=0,s="";for(;n<t.length;){let i=t.indexOf("{$",n);if(i===-1){s+=t.substring(n);break}let o=t.indexOf("}",i+2);if(o===-1){s+=t.substring(n);break}let r=t.substring(i+2,o),a=e[r];s+=t.substring(n,i)+(a!=null?String(a):`<${r}?>`),n=o+1}return s}catch{return t}}function V(t,e){if(t===e)return!0;let n=Object.keys(t),s=Object.keys(e);for(let i of n){if(!s.includes(i))return!1;let o=t[i],r=e[i];if(Fe(o)&&Fe(r)){if(!V(o,r))return!1}else if(o!==r)return!1}for(let i of s)if(!n.includes(i))return!1;return!0}function Fe(t){return t!==null&&typeof t=="object"}var Ps=14400*1e3;function je(t){return t&&t._delegate?t._delegate:t}var I=class{constructor(e,n,s){this.name=e,this.instanceFactory=n,this.type=s,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}};var M="[DEFAULT]";var se=class{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){let n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){let s=new F;if(this.instancesDeferred.set(n,s),this.isInitialized(n)||this.shouldAutoInitialize())try{let i=this.getOrInitializeService({instanceIdentifier:n});i&&s.resolve(i)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){var i;let n=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),s=(i=e==null?void 0:e.optional)!=null?i:!1;if(this.isInitialized(n)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:n})}catch(o){if(s)return null;throw o}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if($t(e))try{this.getOrInitializeService({instanceIdentifier:M})}catch{}for(let[n,s]of this.instancesDeferred.entries()){let i=this.normalizeInstanceIdentifier(n);try{let o=this.getOrInitializeService({instanceIdentifier:i});s.resolve(o)}catch{}}}}clearInstance(e=M){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){let e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=M){return this.instances.has(e)}getOptions(e=M){return this.instancesOptions.get(e)||{}}initialize(e={}){let{options:n={}}=e,s=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(s))throw Error(`${this.name}(${s}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);let i=this.getOrInitializeService({instanceIdentifier:s,options:n});for(let[o,r]of this.instancesDeferred.entries()){let a=this.normalizeInstanceIdentifier(o);s===a&&r.resolve(i)}return i}onInit(e,n){var r;let s=this.normalizeInstanceIdentifier(n),i=(r=this.onInitCallbacks.get(s))!=null?r:new Set;i.add(e),this.onInitCallbacks.set(s,i);let o=this.instances.get(s);return o&&e(o,s),()=>{i.delete(e)}}invokeOnInitCallbacks(e,n){let s=this.onInitCallbacks.get(n);if(s)for(let i of s)try{i(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let s=this.instances.get(e);if(!s&&this.component&&(s=this.component.instanceFactory(this.container,{instanceIdentifier:Bt(e),options:n}),this.instances.set(e,s),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(s,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,s)}catch{}return s||null}normalizeInstanceIdentifier(e=M){return this.component?this.component.multipleInstances?e:M:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}};function Bt(t){return t===M?void 0:t}function $t(t){return t.instantiationMode==="EAGER"}var W=class{constructor(e){this.name=e,this.providers=new Map}addComponent(e){let n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);let n=new se(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}};var Ht=[],p;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(p||(p={}));var Gt={debug:p.DEBUG,verbose:p.VERBOSE,info:p.INFO,warn:p.WARN,error:p.ERROR,silent:p.SILENT},Vt=p.INFO,Wt={[p.DEBUG]:"log",[p.VERBOSE]:"log",[p.INFO]:"info",[p.WARN]:"warn",[p.ERROR]:"error"},jt=(t,e,...n)=>{if(e<t.logLevel)return;let s=new Date().toISOString(),i=Wt[e];if(i)console[i](`[${s}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)},x=class{constructor(e){this.name=e,this._logLevel=Vt,this._logHandler=jt,this._userLogHandler=null,Ht.push(this)}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in p))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Gt[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,p.DEBUG,...e),this._logHandler(this,p.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,p.VERBOSE,...e),this._logHandler(this,p.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,p.INFO,...e),this._logHandler(this,p.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,p.WARN,...e),this._logHandler(this,p.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,p.ERROR,...e),this._logHandler(this,p.ERROR,...e)}};var Yt=(t,e)=>e.some(n=>t instanceof n),Ye,ze;function zt(){return Ye||(Ye=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Jt(){return ze||(ze=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}var Je=new WeakMap,oe=new WeakMap,Ke=new WeakMap,ie=new WeakMap,ae=new WeakMap;function Kt(t){let e=new Promise((n,s)=>{let i=()=>{t.removeEventListener("success",o),t.removeEventListener("error",r)},o=()=>{n(O(t.result)),i()},r=()=>{s(t.error),i()};t.addEventListener("success",o),t.addEventListener("error",r)});return e.then(n=>{n instanceof IDBCursor&&Je.set(n,t)}).catch(()=>{}),ae.set(e,t),e}function qt(t){if(oe.has(t))return;let e=new Promise((n,s)=>{let i=()=>{t.removeEventListener("complete",o),t.removeEventListener("error",r),t.removeEventListener("abort",r)},o=()=>{n(),i()},r=()=>{s(t.error||new DOMException("AbortError","AbortError")),i()};t.addEventListener("complete",o),t.addEventListener("error",r),t.addEventListener("abort",r)});oe.set(t,e)}var re={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return oe.get(t);if(e==="objectStoreNames")return t.objectStoreNames||Ke.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return O(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function qe(t){re=t(re)}function Qt(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){let s=t.call(j(this),e,...n);return Ke.set(s,e.sort?e.sort():[e]),O(s)}:Jt().includes(t)?function(...e){return t.apply(j(this),e),O(Je.get(this))}:function(...e){return O(t.apply(j(this),e))}}function Xt(t){return typeof t=="function"?Qt(t):(t instanceof IDBTransaction&&qt(t),Yt(t,zt())?new Proxy(t,re):t)}function O(t){if(t instanceof IDBRequest)return Kt(t);if(ie.has(t))return ie.get(t);let e=Xt(t);return e!==t&&(ie.set(t,e),ae.set(e,t)),e}var j=t=>ae.get(t);function Xe(t,e,{blocked:n,upgrade:s,blocking:i,terminated:o}={}){let r=indexedDB.open(t,e),a=O(r);return s&&r.addEventListener("upgradeneeded",c=>{s(O(r.result),c.oldVersion,c.newVersion,O(r.transaction),c)}),n&&r.addEventListener("blocked",c=>n(c.oldVersion,c.newVersion,c)),a.then(c=>{o&&c.addEventListener("close",()=>o()),i&&c.addEventListener("versionchange",l=>i(l.oldVersion,l.newVersion,l))}).catch(()=>{}),a}var Zt=["get","getKey","getAll","getAllKeys","count"],en=["put","add","delete","clear"],ce=new Map;function Qe(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(ce.get(e))return ce.get(e);let n=e.replace(/FromIndex$/,""),s=e!==n,i=en.includes(n);if(!(n in(s?IDBIndex:IDBObjectStore).prototype)||!(i||Zt.includes(n)))return;let o=async function(r,...a){let c=this.transaction(r,i?"readwrite":"readonly"),l=c.store;return s&&(l=l.index(a.shift())),(await Promise.all([l[n](...a),i&&c.done]))[0]};return ce.set(e,o),o}qe(t=>({...t,get:(e,n,s)=>Qe(e,n)||t.get(e,n,s),has:(e,n)=>!!Qe(e,n)||t.has(e,n)}));var ue=class{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(tn(n)){let s=n.getImmediate();return`${s.library}/${s.version}`}else return null}).filter(n=>n).join(" ")}};function tn(t){let e=t.getComponent();return(e==null?void 0:e.type)==="VERSION"}var de="@firebase/app",Ze="0.16.6";var C=new x("@firebase/app"),nn="@firebase/app-compat",sn="@firebase/analytics-compat",on="@firebase/analytics",rn="@firebase/app-check-compat",an="@firebase/app-check",cn="@firebase/auth",ln="@firebase/auth-compat",un="@firebase/crashlytics",dn="@firebase/database",fn="@firebase/data-connect",hn="@firebase/database-compat",pn="@firebase/functions",mn="@firebase/functions-compat",gn="@firebase/installations",En="@firebase/installations-compat",_n="@firebase/messaging",yn="@firebase/messaging-compat",bn="@firebase/performance",Sn="@firebase/performance-compat",On="@firebase/remote-config",wn="@firebase/remote-config-compat",An="@firebase/storage",In="@firebase/storage-compat",Rn="@firebase/firestore",Cn="@firebase/ai",Tn="@firebase/firestore-compat",Dn="firebase";var fe="[DEFAULT]",Nn={[de]:"fire-core",[nn]:"fire-core-compat",[on]:"fire-analytics",[sn]:"fire-analytics-compat",[an]:"fire-app-check",[rn]:"fire-app-check-compat",[cn]:"fire-auth",[ln]:"fire-auth-compat",[un]:"fire-cls",[dn]:"fire-rtdb",[fn]:"fire-data-connect",[hn]:"fire-rtdb-compat",[pn]:"fire-fn",[mn]:"fire-fn-compat",[gn]:"fire-iid",[En]:"fire-iid-compat",[_n]:"fire-fcm",[yn]:"fire-fcm-compat",[bn]:"fire-perf",[Sn]:"fire-perf-compat",[On]:"fire-rc",[wn]:"fire-rc-compat",[An]:"fire-gcs",[In]:"fire-gcs-compat",[Rn]:"fire-fst",[Tn]:"fire-fst-compat",[Cn]:"fire-vertex","fire-js":"fire-js",[Dn]:"fire-js-all"};var Y=new Map,vn=new Map,he=new Map;function et(t,e){try{t.container.addComponent(e)}catch(n){C.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function $(t){let e=t.name;if(he.has(e))return C.debug(`There were multiple attempts to register component ${e}.`),!1;he.set(e,t);for(let n of Y.values())et(n,t);for(let n of vn.values())et(n,t);return!0}function it(t,e){let n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}function ot(t){return t==null?!1:t.settings!==void 0}var Ln={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different {$mismatchedParam}. Existing: '{$oldValue}'. New: '{$newValue}'.","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},R=new B("app","Firebase",Ln);var pe=class{constructor(e,n,s){this._isDeleted=!1,this._options={...e},this._config={...n},this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=s,this.container.addComponent(new I("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw R.create("app-deleted",{appName:this._name})}};function Ee(t,e={}){let n=t;typeof e!="object"&&(e={name:e});let s={name:fe,automaticDataCollectionEnabled:!0,...e},i=s.name;if(typeof i!="string"||!i)throw R.create("bad-app-name",{appName:String(i)});if(n||(n=ne()),!n)throw R.create("no-options");let o=Y.get(i);if(o)if(V(n,o.options)){if(V(s,o.config))return o;throw R.create("duplicate-app",{appName:i,mismatchedParam:"config",oldValue:JSON.stringify(o.config),newValue:JSON.stringify(s)})}else throw R.create("duplicate-app",{appName:i,mismatchedParam:"options",oldValue:JSON.stringify(o.options),newValue:JSON.stringify(n)});let r=new W(i);for(let c of he.values())r.addComponent(c);let a=new pe(n,s,r);return Y.set(i,a),a}function rt(t=fe){let e=Y.get(t);if(!e&&t===fe&&ne())return Ee();if(!e)throw R.create("no-app",{appName:t});return e}function v(t,e,n){var r;let s=(r=Nn[t])!=null?r:t;n&&(s+=`-${n}`);let i=s.match(/\s|\//),o=e.match(/\s|\//);if(i||o){let a=[`Unable to register library "${s}" with version "${e}":`];i&&a.push(`library name "${s}" contains illegal characters (whitespace or "/")`),i&&o&&a.push("and"),o&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),C.warn(a.join(" "));return}$(new I(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}var Mn="firebase-heartbeat-database",Pn=1,H="firebase-heartbeat-store",le=null;function at(){return le||(le=Xe(Mn,Pn,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(H)}catch(n){console.warn(n)}}}}).catch(t=>{throw R.create("idb-open",{originalErrorMessage:t.message})})),le}async function kn(t){try{let n=(await at()).transaction(H),s=await n.objectStore(H).get(ct(t));return await n.done,s}catch(e){if(e instanceof A)C.warn(e.message);else{let n=R.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});C.warn(n.message)}}}async function tt(t,e){try{let s=(await at()).transaction(H,"readwrite");await s.objectStore(H).put(e,ct(t)),await s.done}catch(n){if(n instanceof A)C.warn(n.message);else{let s=R.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});C.warn(s.message)}}}function ct(t){return`${t.name}!${t.options.appId}`}var xn=1024,Un=30,me=class{constructor(e){this.container=e,this._heartbeatsCache=null;let n=this.container.getProvider("app").getImmediate();this._storage=new ge(n),this._heartbeatsCachePromise=this._storage.read().then(s=>(this._heartbeatsCache=s,s))}async triggerHeartbeat(){var e,n;try{let i=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),o=nt();if(((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((n=this._heartbeatsCache)==null?void 0:n.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===o||this._heartbeatsCache.heartbeats.some(r=>r.date===o))return;if(this._heartbeatsCache.heartbeats.push({date:o,agent:i}),this._heartbeatsCache.heartbeats.length>Un){let r=Bn(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(r,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(s){C.warn(s)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";let n=nt(),{heartbeatsToSend:s,unsentEntries:i}=Fn(this._heartbeatsCache.heartbeats),o=ee(JSON.stringify({version:2,heartbeats:s}));return this._heartbeatsCache.lastSentHeartbeatDate=n,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),o}catch(n){return C.warn(n),""}}};function nt(){return new Date().toISOString().substring(0,10)}function Fn(t,e=xn){let n=[],s=t.slice();for(let i of t){let o=n.find(r=>r.agent===i.agent);if(o){if(o.dates.push(i.date),st(n)>e){o.dates.pop();break}}else if(n.push({agent:i.agent,dates:[i.date]}),st(n)>e){n.pop();break}s=s.slice(1)}return{heartbeatsToSend:n,unsentEntries:s}}var ge=class{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Ve()?We().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){let n=await kn(this.app);return n!=null&&n.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var s;if(await this._canUseIndexedDBPromise){let i=await this.read();return tt(this.app,{lastSentHeartbeatDate:(s=e.lastSentHeartbeatDate)!=null?s:i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var s;if(await this._canUseIndexedDBPromise){let i=await this.read();return tt(this.app,{lastSentHeartbeatDate:(s=e.lastSentHeartbeatDate)!=null?s:i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}};function st(t){return ee(JSON.stringify({version:2,heartbeats:t})).length}function Bn(t){if(t.length===0)return-1;let e=0,n=t[0].date;for(let s=1;s<t.length;s++)t[s].date<n&&(n=t[s].date,e=s);return e}function $n(t){$(new I("platform-logger",e=>new ue(e),"PRIVATE")),$(new I("heartbeat",e=>new me(e),"PRIVATE")),v(de,Ze,t),v(de,Ze,"esm2020"),v("fire-js","")}$n("");var Hn="firebase",Gn="13.3.0";v(Hn,Gn,"app");var lt="@firebase/ai",Oe="3.1.0";var U="AI",Vn="global",Wn="firebasevertexai.googleapis.com",J="v1beta",ut=Oe,jn="gl-js",Yn="hybrid",zn=180*1e3,Jn="gemini-3.5-flash-lite";var d=class t extends A{constructor(e,n,s){let i=U,o=`${i}/${e}`,r=`${i}: ${n} (${o})`;super(e,r),this.code=e,this.customErrorData=s,Error.captureStackTrace&&Error.captureStackTrace(this,t),Object.setPrototypeOf(this,t.prototype),this.toString=()=>r}};var dt=["user","model","function","system"];var Et={HARM_SEVERITY_NEGLIGIBLE:"HARM_SEVERITY_NEGLIGIBLE",HARM_SEVERITY_LOW:"HARM_SEVERITY_LOW",HARM_SEVERITY_MEDIUM:"HARM_SEVERITY_MEDIUM",HARM_SEVERITY_HIGH:"HARM_SEVERITY_HIGH",HARM_SEVERITY_UNSUPPORTED:"HARM_SEVERITY_UNSUPPORTED"};var b={STOP:"STOP",MAX_TOKENS:"MAX_TOKENS",SAFETY:"SAFETY",RECITATION:"RECITATION",OTHER:"OTHER",BLOCKLIST:"BLOCKLIST",PROHIBITED_CONTENT:"PROHIBITED_CONTENT",SPII:"SPII",MALFORMED_FUNCTION_CALL:"MALFORMED_FUNCTION_CALL",IMAGE_SAFETY:"IMAGE_SAFETY",IMAGE_PROHIBITED_CONTENT:"IMAGE_PROHIBITED_CONTENT",IMAGE_OTHER:"IMAGE_OTHER",NO_IMAGE:"NO_IMAGE",IMAGE_RECITATION:"IMAGE_RECITATION",LANGUAGE:"LANGUAGE",UNEXPECTED_TOOL_CALL:"UNEXPECTED_TOOL_CALL",TOO_MANY_TOOL_CALLS:"TOO_MANY_TOOL_CALLS",MISSING_THOUGHT_SIGNATURE:"MISSING_THOUGHT_SIGNATURE",MALFORMED_RESPONSE:"MALFORMED_RESPONSE"};var S={PREFER_ON_DEVICE:"prefer_on_device",ONLY_ON_DEVICE:"only_on_device",ONLY_IN_CLOUD:"only_in_cloud",PREFER_IN_CLOUD:"prefer_in_cloud"},L={ON_DEVICE:"on_device",IN_CLOUD:"in_cloud"};var u={ERROR:"error",REQUEST_ERROR:"request-error",RESPONSE_ERROR:"response-error",FETCH_ERROR:"fetch-error",SESSION_CLOSED:"session-closed",INVALID_CONTENT:"invalid-content",API_NOT_ENABLED:"api-not-enabled",ALREADY_INITIALIZED:"already-initialized",INVALID_SCHEMA:"invalid-schema",NO_API_KEY:"no-api-key",NO_APP_ID:"no-app-id",NO_MODEL:"no-model",NO_PROJECT_ID:"no-project-id",PARSE_FAILED:"parse-failed",UNSUPPORTED:"unsupported"};var D={AGENT_PLATFORM:"AGENT_PLATFORM",GOOGLE_AI:"GOOGLE_AI"};var K=class{constructor(e){this.backendType=e}},k=class extends K{constructor(){super(D.GOOGLE_AI)}_getModelPath(e,n){return`/${J}/projects/${e}/${n}`}_getTemplatePath(e,n){return`/${J}/projects/${e}/templates/${n}`}},q=class extends K{constructor(e){super(D.AGENT_PLATFORM),this.location=Vn,e&&(this.location=e)}_getModelPath(e,n){return`/${J}/projects/${e}/locations/${this.location}/${n}`}_getTemplatePath(e,n){return`/${J}/projects/${e}/locations/${this.location}/templates/${n}`}};function Kn(t){if(t instanceof k)return`${U}/googleai`;if(t instanceof q)return`${U}/agentplatform/${t.location}`;throw new d(u.ERROR,`Invalid backend: ${JSON.stringify(t.backendType)}`)}function qn(t){let e=t.split("/");if(e[0]!==U)throw new d(u.ERROR,`Invalid instance identifier, unknown prefix '${e[0]}'`);switch(e[1]){case"agentplatform":let s=e[2];if(!s)throw new d(u.ERROR,`Invalid instance identifier, unknown location '${t}'`);return new q(s);case"googleai":return new k;default:throw new d(u.ERROR,`Invalid instance identifier string: '${t}'`)}}var E=new x("@firebase/ai"),T;(function(t){t.UNAVAILABLE="unavailable",t.DOWNLOADABLE="downloadable",t.DOWNLOADING="downloading",t.AVAILABLE="available"})(T||(T={}));var _t={type:"text",languages:["en"]},_e=[_t,{type:"image"}],ye=[_t],Q=class t{constructor(e,n,s){this.languageModelProvider=e,this.mode=n,this.downloadPromise=null,this.onDeviceParams={createOptions:{expectedInputs:_e,expectedOutputs:ye}},s&&(this.onDeviceParams=s,this.onDeviceParams.createOptions?(this.onDeviceParams.createOptions.expectedInputs||(this.onDeviceParams.createOptions.expectedInputs=_e),this.onDeviceParams.createOptions.expectedOutputs||(this.onDeviceParams.createOptions.expectedOutputs=ye)):this.onDeviceParams.createOptions={expectedInputs:_e,expectedOutputs:ye})}async isAvailable(e){var s;if(!this.mode)return E.debug("On-device inference unavailable because mode is undefined."),!1;if(this.mode===S.ONLY_IN_CLOUD)return E.debug('On-device inference unavailable because mode is "only_in_cloud".'),!1;let n=await((s=this.languageModelProvider)==null?void 0:s.availability(this.onDeviceParams.createOptions));if(this.mode===S.ONLY_ON_DEVICE){if(n===T.UNAVAILABLE)throw new d(u.API_NOT_ENABLED,"Local LanguageModel API not available in this environment.");if(n===T.DOWNLOADABLE||n===T.DOWNLOADING){E.debug("Waiting for download of LanguageModel to complete.");try{await this.downloadPromise}catch(i){throw new d(u.ERROR,i.message)}return!0}return!0}return n!==T.AVAILABLE?(E.debug(`On-device inference unavailable because availability is "${n}".`),!1):t.isOnDeviceRequest(e)?!0:(E.debug("On-device inference unavailable because request is incompatible."),!1)}async generateContent(e){let n=await this.createSession(),s=await Promise.all(e.contents.map(t.toLanguageModelMessage)),i=await n.prompt(s,this.onDeviceParams.promptOptions);return t.toResponse(i)}async generateContentStream(e){let n=await this.createSession(),s=await Promise.all(e.contents.map(t.toLanguageModelMessage)),i=n.promptStreaming(s,this.onDeviceParams.promptOptions);return t.toStreamResponse(i)}async countTokens(e){throw new d(u.REQUEST_ERROR,"Count Tokens is not yet available for on-device model.")}static isOnDeviceRequest(e){if(e.contents.length===0)return E.debug("Empty prompt rejected for on-device inference."),!1;for(let n of e.contents){if(n.parts.some(s=>"functionResponse"in s))return E.debug("Content with a function response part rejected for on-device inference."),!1;for(let s of n.parts)if("inlineData"in s&&s.inlineData&&t.SUPPORTED_MIME_TYPES.indexOf(s.inlineData.mimeType)===-1)return E.debug(`Unsupported mime type "${s.inlineData.mimeType}" rejected for on-device inference.`),!1}return!0}async downloadIfAvailable(e){var s;let n=await((s=this.languageModelProvider)==null?void 0:s.availability(this.onDeviceParams.createOptions));return(n===T.DOWNLOADABLE||n===T.DOWNLOADING)&&this.download(e),n}download(e){var s;if(this.downloadPromise)return;let n={...this.onDeviceParams.createOptions};n&&!n.monitor&&e&&(n.monitor=i=>{i.addEventListener("downloadprogress",o=>{e(o.loaded)})}),this.downloadPromise=(s=this.languageModelProvider)==null?void 0:s.create(n).finally(()=>{this.downloadPromise=null})}static async toLanguageModelMessage(e){let n=await Promise.all(e.parts.map(t.toLanguageModelMessageContent));return{role:t.toLanguageModelMessageRole(e.role),content:n}}static async toLanguageModelMessageContent(e){if("text"in e&&typeof e.text=="string")return{type:"text",value:e.text};if("inlineData"in e&&e.inlineData){let s=await(await fetch(`data:${e.inlineData.mimeType};base64,${e.inlineData.data}`)).blob();return{type:"image",value:await createImageBitmap(s)}}throw new d(u.REQUEST_ERROR,"Processing of this Part type is not currently supported.")}static toLanguageModelMessageRole(e){return e==="model"?"assistant":"user"}async createSession(){if(!this.languageModelProvider)throw new d(u.UNSUPPORTED,"Chrome AI requested for unsupported browser version.");let e=await this.languageModelProvider.create(this.onDeviceParams.createOptions);return this.oldSession&&this.oldSession.destroy(),this.oldSession=e,e}static toResponse(e){return{json:async()=>({candidates:[{content:{parts:[{text:e}]}}]})}}static toStreamResponse(e){let n=new TextEncoder;return{body:e.pipeThrough(new TransformStream({transform(s,i){let o=JSON.stringify({candidates:[{content:{role:"model",parts:[{text:s}]}}]});i.enqueue(n.encode(`data: ${o}

`))}}))}}};Q.SUPPORTED_MIME_TYPES=["image/jpeg","image/png"];function Qn(t,e,n){let i=(e||te()).LanguageModel;if(i&&t)return new Q(i,t,n)}var we=class{constructor(e,n,s,i,o){this.app=e,this.backend=n,this.chromeAdapterFactory=o;let r=i==null?void 0:i.getImmediate({optional:!0}),a=s==null?void 0:s.getImmediate({optional:!0});this.auth=a||null,this.appCheck=r||null}_delete(){return Promise.resolve()}set options(e){this._options=e}get options(){return this._options}};function Xn(t,{instanceIdentifier:e}){if(!e)throw new d(u.ERROR,"AIService instance identifier is undefined.");let n=qn(e),s=t.getProvider("app").getImmediate(),i=t.getProvider("auth-internal"),o=t.getProvider("app-check-internal");return new we(s,n,i,o,Qn)}function Zn(t){var n,s,i,o,r,a,c;if((s=(n=t.app)==null?void 0:n.options)!=null&&s.apiKey)if((o=(i=t.app)==null?void 0:i.options)!=null&&o.projectId){if(!((a=(r=t.app)==null?void 0:r.options)!=null&&a.appId))throw new d(u.NO_APP_ID,'The "appId" field is empty in the local Firebase config. Firebase AI requires this field to contain a valid app ID.')}else throw new d(u.NO_PROJECT_ID,'The "projectId" field is empty in the local Firebase config. Firebase AI requires this field to contain a valid project ID.');else throw new d(u.NO_API_KEY,'The "apiKey" field is empty in the local Firebase config. Firebase AI requires this field to contain a valid API key.');let e={apiKey:t.app.options.apiKey,project:t.app.options.projectId,appId:t.app.options.appId,automaticDataCollectionEnabled:t.app.automaticDataCollectionEnabled,backend:t.backend};if(ot(t.app)&&t.app.settings.appCheckToken){let l=t.app.settings.appCheckToken;e.getAppCheckToken=()=>Promise.resolve({token:l})}else t.appCheck&&((c=t.options)!=null&&c.useLimitedUseAppCheckTokens?e.getAppCheckToken=()=>t.appCheck.getLimitedUseToken():e.getAppCheckToken=()=>t.appCheck.getToken());return t.auth&&(e.getAuthToken=()=>t.auth.getToken()),e}var Ae=class t{constructor(e,n){this._apiSettings=Zn(e),this.model=t.normalizeModelName(n,this._apiSettings.backend.backendType)}static normalizeModelName(e,n){return n===D.GOOGLE_AI?t.normalizeGoogleAIModelName(e):t.normalizeVertexAIModelName(e)}static normalizeGoogleAIModelName(e){return`models/${e}`}static normalizeVertexAIModelName(e){let n;return e.includes("/")?e.startsWith("models/")?n=`publishers/google/${e}`:n=e:n=`publishers/google/models/${e}`,n}};var es="Timeout has expired.",be="AbortError",Ie=class{constructor(e){this.params=e}toString(){let e=new URL(this.baseUrl);return e.pathname=this.pathname,e.search=this.queryParams.toString(),e.toString()}get pathname(){return this.params.templateId?`${this.params.apiSettings.backend._getTemplatePath(this.params.apiSettings.project,this.params.templateId)}:${this.params.task}`:`${this.params.apiSettings.backend._getModelPath(this.params.apiSettings.project,this.params.model)}:${this.params.task}`}get baseUrl(){var e,n;return(n=(e=this.params.singleRequestOptions)==null?void 0:e.baseUrl)!=null?n:`https://${Wn}`}get queryParams(){let e=new URLSearchParams;return this.params.stream&&e.set("alt","sse"),e}};function ts(t){let e=[];return e.push(`${jn}/${ut}`),e.push(`fire/${ut}`),(t.params.apiSettings.inferenceMode===S.PREFER_ON_DEVICE||t.params.apiSettings.inferenceMode===S.PREFER_IN_CLOUD)&&e.push(Yn),e.join(" ")}async function ns(t){let e=new Headers;if(e.append("Content-Type","application/json"),e.append("x-goog-api-client",ts(t)),e.append("x-goog-api-key",t.params.apiSettings.apiKey),t.params.apiSettings.automaticDataCollectionEnabled&&e.append("X-Firebase-Appid",t.params.apiSettings.appId),t.params.apiSettings.getAppCheckToken){let n=await t.params.apiSettings.getAppCheckToken();n&&(e.append("X-Firebase-AppCheck",n.token),n.error&&E.warn(`Unable to obtain a valid App Check token: ${n.error.message}`))}if(t.params.apiSettings.getAuthToken){let n=await t.params.apiSettings.getAuthToken();n&&e.append("Authorization",`Firebase ${n.accessToken}`)}return e}async function De(t,e){var l,h,m;let n=new Ie(t),s,i=(l=t.singleRequestOptions)==null?void 0:l.signal,o=((h=t.singleRequestOptions)==null?void 0:h.timeout)!=null&&t.singleRequestOptions.timeout>=0?t.singleRequestOptions.timeout:zn,r=new AbortController,a=setTimeout(()=>{r.abort(new DOMException(es,be)),E.debug(`Aborting request to ${n} due to timeout (${o}ms)`)},o),c=AbortSignal.any(i?[i,r.signal]:[r.signal]);if(i&&i.aborted)throw clearTimeout(a),new DOMException((m=i.reason)!=null?m:"Aborted externally before fetch",be);try{let f={method:"POST",headers:await ns(n),signal:c,body:e};if(s=await fetch(n.toString(),f),!s.ok){let _="",g;try{let y=await s.json();_=y.error.message,y.error.details&&(_+=` ${JSON.stringify(y.error.details)}`,g=y.error.details)}catch{}throw s.status===403&&g&&g.some(y=>y.reason==="SERVICE_DISABLED")&&g.some(y=>{var ke,xe;return(xe=(ke=y.links)==null?void 0:ke[0])==null?void 0:xe.description.includes("Google developers console API activation")})?new d(u.API_NOT_ENABLED,`The Firebase AI SDK requires the Firebase AI API ('firebasevertexai.googleapis.com') to be enabled in your Firebase project. Enable this API by visiting the Firebase Console at https://console.firebase.google.com/project/${n.params.apiSettings.project}/ailogic/ and clicking "Get started". If you enabled this API recently, wait a few minutes for the action to propagate to our systems and then retry.`,{status:s.status,statusText:s.statusText,errorDetails:g}):new d(u.FETCH_ERROR,`Error fetching from ${n}: [${s.status} ${s.statusText}] ${_}`,{status:s.status,statusText:s.statusText,errorDetails:g})}}catch(f){let _=f;throw f.code!==u.FETCH_ERROR&&f.code!==u.API_NOT_ENABLED&&f instanceof Error&&f.name!==be&&(_=new d(u.ERROR,`Error fetching from ${n.toString()}: ${f.message}`),_.stack=f.stack),_}finally{clearTimeout(a)}return s}function z(t){if(t.candidates&&t.candidates.length>0){if(t.candidates.length>1&&E.warn(`This response had ${t.candidates.length} candidates. Returning text from the first candidate only. Access response.candidates directly to use the other candidates.`),bt(t.candidates[0]))throw new d(u.RESPONSE_ERROR,`Response error: ${P(t)}. Response body stored in error.response`,{response:t});return!0}else return!1}function w(t){return"type"in t&&t.type?t:t.text!==void 0?{...t,type:"text"}:t.inlineData!==void 0?{...t,type:"inlineData"}:t.functionCall!==void 0?{...t,type:"functionCall"}:t.functionResponse!==void 0?{...t,type:"functionResponse"}:t.fileData!==void 0?{...t,type:"fileData"}:t.executableCode!==void 0?{...t,type:"executableCode"}:t.codeExecutionResult!==void 0?{...t,type:"codeExecutionResult"}:t}function X(t,e=L.IN_CLOUD){var s,i;if((s=t.candidates)!=null&&s[0]&&!t.candidates[0].hasOwnProperty("index")&&(t.candidates[0].index=0),t.candidates)for(let o of t.candidates)(i=o.content)!=null&&i.parts&&(o.content.parts=o.content.parts.map(w));let n=ss(t);return n.inferenceSource=e,n}function ss(t){return t.text=()=>{if(z(t))return ft(t,e=>!("thought"in e&&e.thought));if(t.promptFeedback)throw new d(u.RESPONSE_ERROR,`Text not available. ${P(t)}`,{response:t});return""},t.thoughtSummary=()=>{if(z(t)){let e=ft(t,n=>!!("thought"in n&&n.thought));return e===""?void 0:e}else if(t.promptFeedback)throw new d(u.RESPONSE_ERROR,`Thought summary not available. ${P(t)}`,{response:t})},t.inlineDataParts=()=>{if(z(t))return is(t);if(t.promptFeedback)throw new d(u.RESPONSE_ERROR,`Data not available. ${P(t)}`,{response:t})},t.functionCalls=()=>{if(z(t))return yt(t);if(t.promptFeedback)throw new d(u.RESPONSE_ERROR,`Function call not available. ${P(t)}`,{response:t})},t}function ft(t,e){var s,i,o,r;let n=[];if((i=(s=t.candidates)==null?void 0:s[0].content)!=null&&i.parts)for(let a of(r=(o=t.candidates)==null?void 0:o[0].content)==null?void 0:r.parts){let c=w(a);c.type==="text"&&e(c)&&n.push(c.text)}return n.length>0?n.join(""):""}function yt(t){var n,s,i,o;if(!t)return;let e=[];if((s=(n=t.candidates)==null?void 0:n[0].content)!=null&&s.parts)for(let r of(o=(i=t.candidates)==null?void 0:i[0].content)==null?void 0:o.parts){let a=w(r);a.type==="functionCall"&&e.push(a.functionCall)}if(e.length>0)return e}function is(t){var n,s,i,o;let e=[];if((s=(n=t.candidates)==null?void 0:n[0].content)!=null&&s.parts)for(let r of(o=(i=t.candidates)==null?void 0:i[0].content)==null?void 0:o.parts){let a=w(r);a.type==="inlineData"&&e.push(a)}if(e.length>0)return e}var os=[b.RECITATION,b.SAFETY,b.BLOCKLIST,b.PROHIBITED_CONTENT,b.SPII,b.MALFORMED_FUNCTION_CALL,b.IMAGE_SAFETY,b.IMAGE_PROHIBITED_CONTENT,b.IMAGE_OTHER,b.NO_IMAGE,b.IMAGE_RECITATION,b.LANGUAGE,b.UNEXPECTED_TOOL_CALL,b.TOO_MANY_TOOL_CALLS,b.MISSING_THOUGHT_SIGNATURE,b.MALFORMED_RESPONSE];function bt(t){return!!t.finishReason&&os.some(e=>e===t.finishReason)}function P(t){var n,s,i;let e="";if((!t.candidates||t.candidates.length===0)&&t.promptFeedback)e+="Response was blocked",(n=t.promptFeedback)!=null&&n.blockReason&&(e+=` due to ${t.promptFeedback.blockReason}`),(s=t.promptFeedback)!=null&&s.blockReasonMessage&&(e+=`: ${t.promptFeedback.blockReasonMessage}`);else if((i=t.candidates)!=null&&i[0]){let o=t.candidates[0];bt(o)&&(e+=`Candidate was blocked due to ${o.finishReason}`,o.finishMessage&&(e+=`: ${o.finishMessage}`))}return e}function Ne(t){if(t!=null){if(typeof t=="string")return{role:"system",parts:[{type:"text",text:t}]};if(t.type==="text"||"text"in t&&typeof t.text=="string")return{role:"system",parts:[N(w(t))]};if(t.parts){let e=t.parts.map(n=>N(w(n)));return t.role?{...t,parts:e}:{role:"system",parts:e}}}}function G(t){let e=[];if(typeof t=="string")e=[{type:"text",text:t}];else for(let n of t)typeof n=="string"?e.push({type:"text",text:n}):e.push(N(w(n)));return rs(e)}function rs(t){let e={role:"user",parts:[]},n=!1,s=!1;for(let i of t)i.type==="functionResponse"||"functionResponse"in i?s=!0:n=!0,e.parts.push(i);if(n&&s)throw new d(u.INVALID_CONTENT,"Within a single message, FunctionResponse cannot be mixed with other type of Part in the request for sending chat message.");if(!n&&!s)throw new d(u.INVALID_CONTENT,"No Content is provided for sending chat message.");return e}function Se(t){let e;if(t.contents){let n=t;e={...n,contents:n.contents.map(s=>({...s,parts:s.parts?s.parts.map(w):[]}))}}else e={contents:[G(t)]};return t.systemInstruction&&(e.systemInstruction=Ne(t.systemInstruction)),e}function as(t){return t.parts&&Array.isArray(t.parts)?{...t,parts:t.parts.map(ve)}:t}function ve(t){let e;if("type"in t){let{type:n,...s}=t;e=s}else e=t;return e.functionResponse&&(e={...e,functionResponse:as(e.functionResponse)}),e}function Le(t){return t.parts?{...t,parts:t.parts.map(ve)}:t}function St(t){return t==null||typeof t=="string"?t:"parts"in t&&Array.isArray(t.parts)?Le(t):ve(t)}function Ot(t){let e={...t};return e.contents&&(e.contents=e.contents.map(Le)),e.systemInstruction&&(e.systemInstruction=St(e.systemInstruction)),e}function cs(t){let e={...t};return e.contents&&(e.contents=e.contents.map(Le)),e.systemInstruction&&(e.systemInstruction=St(e.systemInstruction)),e}function wt(t){var e,n;if((e=t.safetySettings)==null||e.forEach(s=>{if(s.method)throw new d(u.UNSUPPORTED,"SafetySetting.method is not supported in the the Gemini Developer API. Please remove this property.")}),(n=t.generationConfig)!=null&&n.topK){let s=Math.round(t.generationConfig.topK);s!==t.generationConfig.topK&&(E.warn("topK in GenerationConfig has been rounded to the nearest integer to match the format for requests to the Gemini Developer API."),t.generationConfig.topK=s)}return t}function Me(t){return{candidates:t.candidates?us(t.candidates):void 0,promptFeedback:t.promptFeedback?ds(t.promptFeedback):void 0,usageMetadata:t.usageMetadata}}function ls(t,e){return{generateContentRequest:{model:e,...t}}}function us(t){let e=[],n;return e&&t.forEach(s=>{var r,a;let i;if(s.citationMetadata&&(i={citations:s.citationMetadata.citationSources}),s.safetyRatings&&(n=s.safetyRatings.map(c=>{var l,h,m;return{...c,severity:(l=c.severity)!=null?l:Et.HARM_SEVERITY_UNSUPPORTED,probabilityScore:(h=c.probabilityScore)!=null?h:0,severityScore:(m=c.severityScore)!=null?m:0}})),(a=(r=s.content)==null?void 0:r.parts)!=null&&a.some(c=>"videoMetadata"in c&&c.videoMetadata))throw new d(u.UNSUPPORTED,"Part.videoMetadata is not supported in the Gemini Developer API. Please remove this property.");let o={index:s.index,content:s.content,finishReason:s.finishReason,finishMessage:s.finishMessage,safetyRatings:n,citationMetadata:i,groundingMetadata:s.groundingMetadata,urlContextMetadata:s.urlContextMetadata};e.push(o)}),e}function ds(t){var s;let e=[];return((s=t.safetyRatings)!=null?s:[]).forEach(i=>{var o,r,a;e.push({category:i.category,probability:i.probability,severity:(o=i.severity)!=null?o:Et.HARM_SEVERITY_UNSUPPORTED,probabilityScore:(r=i.probabilityScore)!=null?r:0,severityScore:(a=i.severityScore)!=null?a:0,blocked:i.blocked})}),{blockReason:t.blockReason,safetyRatings:e,blockReasonMessage:t.blockReasonMessage}}var ht=/^data\: (.*)(?:\n\n|\r\r|\r\n\r\n)/;async function fs(t,e,n){let s=t.body.pipeThrough(new TextDecoderStream("utf8",{fatal:!0})),i=gs(s),[o,r]=i.tee(),{response:a,firstValue:c}=await hs(r,e,n);return{stream:ms(o,e,n),response:a,firstValue:c}}async function hs(t,e,n){let[s,i]=t.tee(),o=s.getReader(),{value:r}=await o.read();return{firstValue:r,response:ps(i,e,n)}}async function ps(t,e,n){let s=[],i=t.getReader();for(;;){let{done:o,value:r}=await i.read();if(o){let a=Es(s);return e.backend.backendType===D.GOOGLE_AI&&(a=Me(a)),X(a,n)}s.push(r)}}async function*ms(t,e,n){var i,o;let s=t.getReader();for(;;){let{value:r,done:a}=await s.read();if(a)break;let c;e.backend.backendType===D.GOOGLE_AI?c=X(Me(r),n):c=X(r,n);let l=(i=c.candidates)==null?void 0:i[0];!((o=l==null?void 0:l.content)!=null&&o.parts)&&!(l!=null&&l.finishReason)&&!(l!=null&&l.citationMetadata)&&!(l!=null&&l.urlContextMetadata)||(yield c)}}function gs(t){let e=t.getReader();return new ReadableStream({start(s){let i="";return o();function o(){return e.read().then(({value:r,done:a})=>{if(a){if(i.trim()){s.error(new d(u.PARSE_FAILED,"Failed to parse stream"));return}s.close();return}i+=r;let c=i.match(ht),l;for(;c;){try{l=JSON.parse(c[1])}catch{s.error(new d(u.PARSE_FAILED,`Error parsing JSON response: "${c[1]}`));return}s.enqueue(l),i=i.substring(c[0].length),c=i.match(ht)}return o()})}}})}function Es(t){let e=t[t.length-1],n={promptFeedback:e==null?void 0:e.promptFeedback};for(let s of t)if(s.candidates)for(let i of s.candidates){let o=i.index||0;n.candidates||(n.candidates=[]),n.candidates[o]||(n.candidates[o]={index:i.index}),n.candidates[o].citationMetadata=i.citationMetadata,n.candidates[o].finishReason=i.finishReason,n.candidates[o].finishMessage=i.finishMessage,n.candidates[o].safetyRatings=i.safetyRatings,n.candidates[o].groundingMetadata=i.groundingMetadata;let r=i.urlContextMetadata;if(typeof r=="object"&&r!==null&&Object.keys(r).length>0&&(n.candidates[o].urlContextMetadata=r),i.content){if(!i.content.parts)continue;n.candidates[o].content||(n.candidates[o].content={role:i.content.role||"user",parts:[]});for(let a of i.content.parts){if("text"in a&&a.text==="")continue;if(Object.keys(a).length===0)throw new d(u.INVALID_CONTENT,"Part should have at least one property, but there are none. This is likely caused by a malformed response from the backend.");let c=w({...a});Object.keys(c).length>0&&n.candidates[o].content.parts.push(c)}}}return n}var _s=[u.FETCH_ERROR,u.ERROR,u.API_NOT_ENABLED];async function At(t,e,n,s){if(!e)return{response:await s(),inferenceSource:L.IN_CLOUD};switch(e.mode){case S.ONLY_ON_DEVICE:if(await e.isAvailable(t))return{response:await n(),inferenceSource:L.ON_DEVICE};throw new d(u.UNSUPPORTED,"Inference mode is ONLY_ON_DEVICE, but an on-device model is not available.");case S.ONLY_IN_CLOUD:return{response:await s(),inferenceSource:L.IN_CLOUD};case S.PREFER_IN_CLOUD:try{return{response:await s(),inferenceSource:L.IN_CLOUD}}catch(i){if(i instanceof d&&_s.includes(i.code)&&await e.isAvailable(t))return{response:await n(),inferenceSource:L.ON_DEVICE};throw i}case S.PREFER_ON_DEVICE:return await e.isAvailable(t)?{response:await n(),inferenceSource:L.ON_DEVICE}:{response:await s(),inferenceSource:L.IN_CLOUD};default:throw new d(u.ERROR,`Unexpected infererence mode: ${e.mode}`)}}async function ys(t,e,n,s){return n=Ot(n),t.backend.backendType===D.GOOGLE_AI&&(n=wt(n)),De({task:"streamGenerateContent",model:e,apiSettings:t,stream:!0,singleRequestOptions:s},JSON.stringify(n))}async function It(t,e,n,s,i){let o=await At(n,s,()=>s.generateContentStream(n),()=>ys(t,e,n,i));return fs(o.response,t,o.inferenceSource)}async function bs(t,e,n,s){return n=Ot(n),t.backend.backendType===D.GOOGLE_AI&&(n=wt(n)),De({model:e,task:"generateContent",apiSettings:t,stream:!1,singleRequestOptions:s},JSON.stringify(n))}async function Rt(t,e,n,s,i){let o=await At(n,s,()=>s.generateContent(n),()=>bs(t,e,n,i)),r=await Ss(o.response,t);return{response:X(r,o.inferenceSource)}}async function Ss(t,e){let n=await t.json();return e.backend.backendType===D.GOOGLE_AI?Me(n):n}var pt="SILENT_ERROR",mt=10,Re=class{constructor(e,n,s){this.params=n,this.requestOptions=s,this._history=[],this._sendPromise=Promise.resolve(),this._apiSettings=e}async getHistory(){return await this._sendPromise,N(this._history).map(e=>({...e,parts:e.parts?e.parts.map(w):[]}))}async _sendMessage(e,n){let s={};await this._sendPromise;let i=[];return this._sendPromise=this._sendPromise.then(async()=>{var c,l,h,m;let o,r=0,a=(l=(c=this.requestOptions)==null?void 0:c.maxSequentialFunctionCalls)!=null?l:mt;do{let f;if(o){r++;let y=await this._callFunctionsAsNeeded(o);f=G(y)}else f=G(e);let _=this._formatRequest(f,[...i]);i.push(f);let g=await this._callGenerateContent(_,n);if(g)if(s=g,o=this._getCallableFunctionCalls(g.response),g.response.candidates&&g.response.candidates.length>0){let y={parts:((h=g.response.candidates)==null?void 0:h[0].content.parts)||[],role:((m=g.response.candidates)==null?void 0:m[0].content.role)||"model"};i.push(N(y))}else{let y=P(g.response);y&&E.warn(`sendMessage() was unsuccessful. ${y}. Inspect response object for details.`)}else o=void 0}while(o&&r<a);o&&r>=a&&E.warn(`Automatic function calling exceeded the limit of ${a} function calls. Returning last model response.`)}),await this._sendPromise,this._history=this._history.concat(i),s}async _sendMessageStream(e,n){await this._sendPromise;let s=[],o=(async()=>{var h,m;let r,a=0,c=(m=(h=this.requestOptions)==null?void 0:h.maxSequentialFunctionCalls)!=null?m:mt,l;do{let f;if(r){a++;let g=await this._callFunctionsAsNeeded(r);f=G(g)}else f=G(e);let _=this._formatRequest(f,[...s]);if(s.push(f),l=await this._callGenerateContentStream(_,n),r=this._getCallableFunctionCalls(l.firstValue),r&&l.firstValue&&l.firstValue.candidates&&l.firstValue.candidates.length>0){let g={...l.firstValue.candidates[0].content};g.role||(g.role="model"),s.push(g)}}while(r&&a<c);return r&&a>=c&&E.warn(`Automatic function calling exceeded the limit of ${c} function calls. Returning last model response.`),{stream:l.stream,response:l.response}})();return this._sendPromise=this._sendPromise.then(async()=>o).catch(r=>{throw new Error(pt)}).then(r=>r.response).then(r=>{if(r.candidates&&r.candidates.length>0){this._history=this._history.concat(s);let a={...r.candidates[0].content};a.role||(a.role="model"),this._history.push(N(a))}else{let a=P(r);a&&E.warn(`sendMessageStream() was unsuccessful. ${a}. Inspect response object for details.`)}}).catch(r=>{r.message!==pt&&r.name!=="AbortError"&&E.error(r)}),o}_getCallableFunctionCalls(e){var i,o,r;let n=(o=(i=this.params)==null?void 0:i.tools)==null?void 0:o.find(a=>a.functionDeclarations);if(!(n!=null&&n.functionDeclarations))return;let s=yt(e);if(s){for(let a of s)if(!((r=n.functionDeclarations)==null?void 0:r.some(l=>l.name===a.name&&typeof l.functionReference=="function")))return;return s}}async _callFunctionsAsNeeded(e){var o,r;let n=[],s=[],i=(r=(o=this.params)==null?void 0:o.tools)==null?void 0:r.find(a=>a.functionDeclarations);if(i&&i.functionDeclarations){for(let c of e){let l=i.functionDeclarations.find(h=>h.name===c.name);if(l!=null&&l.functionReference){let h=Promise.resolve(l.functionReference(c.args)).catch(m=>{let f=new d(u.ERROR,`Error in user-defined function "${l.name}": ${m.message}`);throw f.stack=m.stack,f});n.push({name:c.name,id:c.id,results:h}),s.push(h)}}await Promise.all(s);let a=[];for(let{name:c,id:l,results:h}of n){let m={name:c,response:await h};l&&(m.id=l),a.push({type:"functionResponse",functionResponse:m})}return a}else throw new d(u.REQUEST_ERROR,'No function declarations were provided in "tools".')}};var Os=["text","inlineData","functionCall","functionResponse","thought","thoughtSignature"],ws={user:["text","inlineData","functionResponse"],function:["functionResponse"],model:["text","functionCall","thought","thoughtSignature"],system:["text"]},gt={user:["model"],function:["model"],model:["user","function"],system:[]};function As(t){let e=null;for(let n of t){let{role:s,parts:i}=n;if(!e&&s!=="user")throw new d(u.INVALID_CONTENT,`First Content should be with role 'user', got ${s}`);if(!dt.includes(s))throw new d(u.INVALID_CONTENT,`Each item should include role field. Got ${s} but valid roles are: ${JSON.stringify(dt)}`);if(!Array.isArray(i))throw new d(u.INVALID_CONTENT,"Content should have 'parts' property with an array of Parts");if(i.length===0)throw new d(u.INVALID_CONTENT,"Each Content should have at least one part");let o={text:0,inlineData:0,functionCall:0,functionResponse:0,thought:0,thoughtSignature:0,fileData:0,executableCode:0,codeExecutionResult:0};for(let a of i){if(a.type)o[a.type]+=1;else for(let c of["text","inlineData","functionCall","functionResponse","fileData","executableCode","codeExecutionResult"])c in a&&(o[c]+=1);"thought"in a&&a.thought&&(o.thought+=1),"thoughtSignature"in a&&a.thoughtSignature&&(o.thoughtSignature+=1)}let r=ws[s];for(let a of Os)if(!r.includes(a)&&o[a]>0)throw new d(u.INVALID_CONTENT,`Content with role '${s}' can't contain '${a}' part`);if(e&&!gt[s].includes(e.role))throw new d(u.INVALID_CONTENT,`Content with role '${s}' can't follow '${e.role}'. Valid previous roles: ${JSON.stringify(gt)}`);e=n}}var Ce=class extends Re{constructor(e,n,s,i,o){var r;super(e,i,o),this.model=n,this.chromeAdapter=s,this.params=i,this.requestOptions=o,i!=null&&i.history&&(As(i.history),this._history=N(i.history)),((r=this.params)==null?void 0:r.systemInstruction)!=null&&(this.params={...this.params,systemInstruction:Ne(this.params.systemInstruction)})}_formatRequest(e,n){var s,i,o,r,a;return{safetySettings:(s=this.params)==null?void 0:s.safetySettings,generationConfig:(i=this.params)==null?void 0:i.generationConfig,tools:(o=this.params)==null?void 0:o.tools,toolConfig:(r=this.params)==null?void 0:r.toolConfig,systemInstruction:(a=this.params)==null?void 0:a.systemInstruction,contents:[...this._history,...n,e]}}_callGenerateContent(e,n){return Rt(this._apiSettings,this.model,e,this.chromeAdapter,{...this.requestOptions,...n})}_callGenerateContentStream(e,n){return It(this._apiSettings,this.model,e,this.chromeAdapter,{...this.requestOptions,...n})}async sendMessage(e,n){return this._sendMessage(e,n)}async sendMessageStream(e,n){return this._sendMessageStream(e,n)}};async function Is(t,e,n,s){n=cs(n);let i="";if(t.backend.backendType===D.GOOGLE_AI){let r=ls(n,e);i=JSON.stringify(r)}else i=JSON.stringify(n);return(await De({model:e,task:"countTokens",apiSettings:t,stream:!1,singleRequestOptions:s},i)).json()}async function Rs(t,e,n,s,i){if((s==null?void 0:s.mode)===S.ONLY_ON_DEVICE)throw new d(u.UNSUPPORTED,"countTokens() is not supported for on-device models.");return Is(t,e,n,i)}var Te=class extends Ae{constructor(e,n,s,i){super(e,n.model),this.chromeAdapter=i,this.generationConfig=n.generationConfig||{},Cs(this.generationConfig),this.safetySettings=n.safetySettings||[],this.tools=n.tools,this.toolConfig=n.toolConfig,this.systemInstruction=Ne(n.systemInstruction),this.requestOptions=s||{}}async initializeDeviceModel(e){if(!this.chromeAdapter||this.chromeAdapter.mode===S.ONLY_IN_CLOUD)return;if(await this.chromeAdapter.downloadIfAvailable(e)===T.UNAVAILABLE){let s=new d(u.API_NOT_ENABLED,"Local LanguageModel API not available in this environment.");if(this.chromeAdapter.mode===S.ONLY_ON_DEVICE)throw s;E.debug(s.message)}await this.chromeAdapter.downloadPromise}async generateContent(e,n){let s=Se(e);return Rt(this._apiSettings,this.model,{generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,...s},this.chromeAdapter,{...this.requestOptions,...n})}async generateContentStream(e,n){let s=Se(e),{stream:i,response:o}=await It(this._apiSettings,this.model,{generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,...s},this.chromeAdapter,{...this.requestOptions,...n});return{stream:i,response:o}}startChat(e){return new Ce(this._apiSettings,this.model,this.chromeAdapter,{tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,generationConfig:this.generationConfig,safetySettings:this.safetySettings,...e},this.requestOptions)}async countTokens(e,n){let s=Se(e);return Rs(this._apiSettings,this.model,s,this.chromeAdapter,{...this.requestOptions,...n})}};function Cs(t){var e,n;if(((e=t.thinkingConfig)==null?void 0:e.thinkingBudget)!=null&&((n=t.thinkingConfig)!=null&&n.thinkingLevel))throw new d(u.UNSUPPORTED,"Cannot set both thinkingBudget and thinkingLevel in a config.");if(t.responseSchema!=null&&t.responseJsonSchema!=null)throw new d(u.UNSUPPORTED,"Cannot set both responseSchema and responseJsonSchema in a config.");if((t.responseSchema!=null||t.responseJsonSchema!=null)&&t.responseMimeType!=="application/json"&&t.responseMimeType!=="text/x.enum")throw new d(u.UNSUPPORTED,'responseMimeType must be set to "application/json" or "text/x.enum" if responseSchema or responseJsonSchema are set.')}var Ts="audio-processor",ri=`
  class AudioProcessor extends AudioWorkletProcessor {
    constructor(options) {
      super();
      this.targetSampleRate = options.processorOptions.targetSampleRate;
      // 'sampleRate' is a global variable available inside the AudioWorkletGlobalScope,
      // representing the native sample rate of the AudioContext.
      this.inputSampleRate = sampleRate;
    }

    /**
     * This method is called by the browser's audio engine for each block of audio data.
     * Input is a single input, with a single channel (input[0][0]).
     */
    process(inputs) {
      const input = inputs[0];
      if (input && input.length > 0 && input[0].length > 0) {
        const pcmData = input[0]; // Float32Array of raw audio samples.
        
        // Simple linear interpolation for resampling.
        const resampled = new Float32Array(Math.round(pcmData.length * this.targetSampleRate / this.inputSampleRate));
        const ratio = pcmData.length / resampled.length;
        for (let i = 0; i < resampled.length; i++) {
          resampled[i] = pcmData[Math.floor(i * ratio)];
        }

        // Convert Float32 (-1, 1) samples to Int16 (-32768, 32767)
        const resampledInt16 = new Int16Array(resampled.length);
        for (let i = 0; i < resampled.length; i++) {
          const sample = Math.max(-1, Math.min(1, resampled[i]));
          if (sample < 0) {
            resampledInt16[i] = sample * 32768;
          } else {
            resampledInt16[i] = sample * 32767;
          }
        }
        
        this.port.postMessage(resampledInt16);
      }
      // Return true to keep the processor alive and processing the next audio block.
      return true;
    }
  }

  // Register the processor with a name that can be used to instantiate it from the main thread.
  registerProcessor('${Ts}', AudioProcessor);
`;function Ct(t=rt(),e){var a,c;t=je(t);let n=it(t,U),s=(a=e==null?void 0:e.backend)!=null?a:new k,i=Kn(s),o=n.getImmediate({identifier:i}),r=o.options;if(r){let l=e==null?void 0:e.useLimitedUseAppCheckTokens,h=!!r.useLimitedUseAppCheckTokens;if(l!=null&&!!l!==h)throw new d(u.ALREADY_INITIALIZED,`getAI() has already been called for app "${t.name}" and this backend with useLimitedUseAppCheckTokens: ${h}. This option cannot be changed after the AI instance has been initialized. Pass the desired options to the first getAI() call for this app and backend, or omit useLimitedUseAppCheckTokens to reuse the existing instance.`);return o}return o.options={useLimitedUseAppCheckTokens:(c=e==null?void 0:e.useLimitedUseAppCheckTokens)!=null?c:!1},o}var Ds=["mode","onDeviceParams","inCloudParams"];function Tt(t,e,n){var a;let s=e,i;if(s.mode){for(let c of Object.keys(e))Ds.includes(c)||E.warn(`When a hybrid inference mode is specified (mode is currently set to ${s.mode}), "${c}" cannot be configured at the top level. Configuration for in-cloud and on-device must be done separately in inCloudParams and onDeviceParams. Configuration values set outside of inCloudParams and onDeviceParams will be ignored.`);i=s.inCloudParams||{model:Jn}}else i=e;if(!i.model)throw new d(u.NO_MODEL,"Must provide a model name. Example: getGenerativeModel({ model: 'my-model-name' })");let o=(a=t.chromeAdapterFactory)==null?void 0:a.call(t,s.mode,typeof window=="undefined"?void 0:window,s.onDeviceParams),r=new Te(t,i,n,o);return r._apiSettings.inferenceMode=s.mode,r}function Ns(){$(new I(U,Xn,"PUBLIC").setMultipleInstances(!0)),v(lt,Oe),v(lt,Oe,"esm2020")}Ns();var Pe=null,Dt=null;async function vs(t){let e=new Uint8Array(await t.arrayBuffer()),n="";for(let s=0;s<e.length;s+=32768)n+=String.fromCharCode.apply(null,e.subarray(s,s+32768));return{inlineData:{data:btoa(n),mimeType:t.type||"image/jpeg"}}}window.StarkAI={async extract(t,e,n,s){Pe||(Pe=Ee(t,"stark-ai"),Dt=Ct(Pe,{backend:new k}));let i=[{text:n}];for(let r of s)i.push(await vs(r));let o;for(let r of e)try{return{text:(await Tt(Dt,{model:r,generationConfig:{responseMimeType:"application/json",temperature:0}}).generateContent(i)).response.text(),model:r}}catch(a){o=a;let c=String(a&&a.message||a);if(!/not found|404|not supported|unsupported|NOT_FOUND|is not available/i.test(c))throw a}throw o}};})();
/*! Bundled license information:

@firebase/util/dist/index.esm.js:
@firebase/util/dist/index.esm.js:
@firebase/util/dist/index.esm.js:
@firebase/util/dist/index.esm.js:
@firebase/util/dist/index.esm.js:
@firebase/util/dist/index.esm.js:
@firebase/util/dist/index.esm.js:
@firebase/util/dist/index.esm.js:
@firebase/util/dist/index.esm.js:
@firebase/util/dist/index.esm.js:
@firebase/logger/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm.js:
@firebase/component/dist/esm/index.esm.js:
@firebase/app/dist/esm/index.esm.js:
@firebase/app/dist/esm/index.esm.js:
@firebase/app/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm.js:
firebase/app/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2025 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm.js:
@firebase/ai/dist/esm/index.esm.js:
@firebase/ai/dist/esm/index.esm.js:
@firebase/ai/dist/esm/index.esm.js:
@firebase/ai/dist/esm/index.esm.js:
@firebase/ai/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2025 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/ai/dist/esm/index.esm.js:
@firebase/ai/dist/esm/index.esm.js:
@firebase/ai/dist/esm/index.esm.js:
@firebase/ai/dist/esm/index.esm.js:
@firebase/ai/dist/esm/index.esm.js:
@firebase/ai/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/ai/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2025 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/ai/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2025 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2024 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/ai/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2026 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2024 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2025 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/ai/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2026 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
*/
