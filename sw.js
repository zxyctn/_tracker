if(!self.define){let e,i={};const n=(n,r)=>(n=new URL(n+".js",r).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(r,o)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(i[c])return;let s={};const d=e=>n(e,c),a={module:{uri:c},exports:s,require:d};i[c]=Promise.all(r.map((e=>a[e]||d(e)))).then((e=>(o(...e),s)))}}define(["./workbox-3625d7b0"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"android-chrome-192x192.png",revision:"4f5f47b76ec4af82c76b77095197da62"},{url:"android-chrome-512x512.png",revision:"391b90a0497204cecb0a77ba6572c004"},{url:"apple-touch-icon.png",revision:"99b10568d169396683be860bd04e26b4"},{url:"assets/index-9484f517.js",revision:null},{url:"assets/index-fa2b2e5f.css",revision:null},{url:"favicon-16x16.png",revision:"80881f9739127ac3ac1c7dbacbf048d0"},{url:"favicon-32x32.png",revision:"c2637dbfcdbbc3150f93e2bc637d243c"},{url:"favicon.ico",revision:"549ee142a13e23331af573d5886338a0"},{url:"index.html",revision:"bb9616b1210aaf392f88c95a6f60e022"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"favicon.ico",revision:"549ee142a13e23331af573d5886338a0"},{url:"apple-touch-icon.png",revision:"99b10568d169396683be860bd04e26b4"},{url:"android-chrome-192x192.png",revision:"4f5f47b76ec4af82c76b77095197da62"},{url:"android-chrome-512x512.png",revision:"391b90a0497204cecb0a77ba6572c004"},{url:"manifest.webmanifest",revision:"e4c6c4573bec5da440dad145581c7642"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
