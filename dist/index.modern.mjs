function n(){return n=Object.assign?Object.assign.bind():function(n){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var l in r)Object.prototype.hasOwnProperty.call(r,l)&&(n[l]=r[l])}return n},n.apply(this,arguments)}class t extends Error{constructor(n,t){super(n),this.statusCode=void 0,this.name="TryException",this.statusCode=t||400,Error.captureStackTrace(this,this.constructor)}}const r=n=>{var t;return"Function"===(null==n||null==(t=n.constructor)?void 0:t.name)},l=n=>{var t;return"AsyncFunction"===(null==n||null==(t=n.constructor)?void 0:t.name)},o=n=>{var t;return"RegExp"===(null==(t=n.constructor)?void 0:t.name)},u=n=>"string"==typeof n&&n.trim(),e=(n,t=null)=>l(n)||r(n)?n(t):n,i=n=>new Promise((t,r)=>setTimeout(t,n)),c=(n,...t)=>{const r=new Promise((t,r)=>{setTimeout(()=>r(`limit time excedded (${n} ms)`),n)});return Promise.race([r,...t])};function a(n,t){return s(n,t)}function s(o,u){var a,s,d;const y=null!=(a=null==u?void 0:u.max)?a:0,m=null!=(s=null==u?void 0:u.async)?s:l(o);let f=null!=(d=null==u?void 0:u.count)?d:0;try{var h;return m?c(null!=(h=null==u?void 0:u.timeout)?h:9999,e(o)).then(n=>[null,n]).catch(t=>f>=y?null!=u&&u.onError?[u.onError(t),null]:[t,null]:(f++,null!=u&&u.onRetry&&u.onRetry(f,f>=y),v(o,n({},u,{count:f})))):(r(o),[null,e(o)])}catch(r){if(f>=y){if(null!=u&&u.strict)throw new t(r);return null!=u&&u.onError?[u.onError(r),null]:[r,null]}return f++,null!=u&&u.onRetry&&u.onRetry(f,f>=y),y>0?async function(t){return await i(f**(null!=(t=null==u?void 0:u.exponential)?t:1.5)*1e3),v(o,n({},u,{count:f}))}():v(o,n({},u,{count:f}))}}function v(o,u){var a,s,d;const y=null!=(a=null==u?void 0:u.max)?a:0,m=null!=(s=null==u?void 0:u.async)?s:l(o);let f=null!=(d=null==u?void 0:u.count)?d:0;try{var h;return m?c(null!=(h=null==u?void 0:u.timeout)?h:9999,e(o)).catch(t=>f>=y?null!=u&&u.onError?e(null==u?void 0:u.onError,t):t:(f++,null!=u&&u.onRetry&&u.onRetry(f,f>=y),y>0?async function(t){return await i(f**(null!=(t=null==u?void 0:u.exponential)?t:.5)*1e3),v(o,n({},u,{count:f}))}():v(o,n({},u,{count:f})))):(r(o),e(o))}catch(r){if(f>=y){if(null!=u&&u.strict)throw new t(r);return e(null==u?void 0:u.onError,r)}return f++,null!=u&&u.onRetry&&u.onRetry(f,f>=y),y>0?async function(t){return await i(f**(null!=(t=null==u?void 0:u.exponential)?t:.5)*1e3),v(o,n({},u,{count:f}))}():v(o,n({},u,{count:f}))}}export{e as Execute,v as Try,i as delay,l as isAsyncFunction,r as isFunction,o as isPlainRegex,u as isPlainString,c as race,s as safeTry,a as safetry};
//# sourceMappingURL=index.modern.mjs.map
