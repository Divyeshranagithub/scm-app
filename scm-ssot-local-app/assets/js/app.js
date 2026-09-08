/* SCM SSOT bundle */
/* === LME Market Intelligence — bundled (Chart.js + datalabels + data layer + app) === */
/*!
 * Chart.js v4.4.1
 * https://www.chartjs.org
 * (c) 2023 Chart.js Contributors
 * Released under the MIT License
 */
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t="undefined"!=typeof globalThis?globalThis:t||self).Chart=e()}(this,(function(){"use strict";var t=Object.freeze({__proto__:null,get Colors(){return Go},get Decimation(){return Qo},get Filler(){return ma},get Legend(){return ya},get SubTitle(){return ka},get Title(){return Ma},get Tooltip(){return Ba}});function e(){}const i=(()=>{let t=0;return()=>t++})();function s(t){return null==t}function n(t){if(Array.isArray&&Array.isArray(t))return!0;const e=Object.prototype.toString.call(t);return"[object"===e.slice(0,7)&&"Array]"===e.slice(-6)}function o(t){return null!==t&&"[object Object]"===Object.prototype.toString.call(t)}function a(t){return("number"==typeof t||t instanceof Number)&&isFinite(+t)}function r(t,e){return a(t)?t:e}function l(t,e){return void 0===t?e:t}const h=(t,e)=>"string"==typeof t&&t.endsWith("%")?parseFloat(t)/100:+t/e,c=(t,e)=>"string"==typeof t&&t.endsWith("%")?parseFloat(t)/100*e:+t;function d(t,e,i){if(t&&"function"==typeof t.call)return t.apply(i,e)}function u(t,e,i,s){let a,r,l;if(n(t))if(r=t.length,s)for(a=r-1;a>=0;a--)e.call(i,t[a],a);else for(a=0;a<r;a++)e.call(i,t[a],a);else if(o(t))for(l=Object.keys(t),r=l.length,a=0;a<r;a++)e.call(i,t[l[a]],l[a])}function f(t,e){let i,s,n,o;if(!t||!e||t.length!==e.length)return!1;for(i=0,s=t.length;i<s;++i)if(n=t[i],o=e[i],n.datasetIndex!==o.datasetIndex||n.index!==o.index)return!1;return!0}function g(t){if(n(t))return t.map(g);if(o(t)){const e=Object.create(null),i=Object.keys(t),s=i.length;let n=0;for(;n<s;++n)e[i[n]]=g(t[i[n]]);return e}return t}function p(t){return-1===["__proto__","prototype","constructor"].indexOf(t)}function m(t,e,i,s){if(!p(t))return;const n=e[t],a=i[t];o(n)&&o(a)?b(n,a,s):e[t]=g(a)}function b(t,e,i){const s=n(e)?e:[e],a=s.length;if(!o(t))return t;const r=(i=i||{}).merger||m;let l;for(let e=0;e<a;++e){if(l=s[e],!o(l))continue;const n=Object.keys(l);for(let e=0,s=n.length;e<s;++e)r(n[e],t,l,i)}return t}function x(t,e){return b(t,e,{merger:_})}function _(t,e,i){if(!p(t))return;const s=e[t],n=i[t];o(s)&&o(n)?x(s,n):Object.prototype.hasOwnProperty.call(e,t)||(e[t]=g(n))}const y={"":t=>t,x:t=>t.x,y:t=>t.y};function v(t){const e=t.split("."),i=[];let s="";for(const t of e)s+=t,s.endsWith("\\")?s=s.slice(0,-1)+".":(i.push(s),s="");return i}function M(t,e){const i=y[e]||(y[e]=function(t){const e=v(t);return t=>{for(const i of e){if(""===i)break;t=t&&t[i]}return t}}(e));return i(t)}function w(t){return t.charAt(0).toUpperCase()+t.slice(1)}const k=t=>void 0!==t,S=t=>"function"==typeof t,P=(t,e)=>{if(t.size!==e.size)return!1;for(const i of t)if(!e.has(i))return!1;return!0};function D(t){return"mouseup"===t.type||"click"===t.type||"contextmenu"===t.type}const C=Math.PI,O=2*C,A=O+C,T=Number.POSITIVE_INFINITY,L=C/180,E=C/2,R=C/4,I=2*C/3,z=Math.log10,F=Math.sign;function V(t,e,i){return Math.abs(t-e)<i}function B(t){const e=Math.round(t);t=V(t,e,t/1e3)?e:t;const i=Math.pow(10,Math.floor(z(t))),s=t/i;return(s<=1?1:s<=2?2:s<=5?5:10)*i}function W(t){const e=[],i=Math.sqrt(t);let s;for(s=1;s<i;s++)t%s==0&&(e.push(s),e.push(t/s));return i===(0|i)&&e.push(i),e.sort(((t,e)=>t-e)).pop(),e}function N(t){return!isNaN(parseFloat(t))&&isFinite(t)}function H(t,e){const i=Math.round(t);return i-e<=t&&i+e>=t}function j(t,e,i){let s,n,o;for(s=0,n=t.length;s<n;s++)o=t[s][i],isNaN(o)||(e.min=Math.min(e.min,o),e.max=Math.max(e.max,o))}function $(t){return t*(C/180)}function Y(t){return t*(180/C)}function U(t){if(!a(t))return;let e=1,i=0;for(;Math.round(t*e)/e!==t;)e*=10,i++;return i}function X(t,e){const i=e.x-t.x,s=e.y-t.y,n=Math.sqrt(i*i+s*s);let o=Math.atan2(s,i);return o<-.5*C&&(o+=O),{angle:o,distance:n}}function q(t,e){return Math.sqrt(Math.pow(e.x-t.x,2)+Math.pow(e.y-t.y,2))}function K(t,e){return(t-e+A)%O-C}function G(t){return(t%O+O)%O}function Z(t,e,i,s){const n=G(t),o=G(e),a=G(i),r=G(o-n),l=G(a-n),h=G(n-o),c=G(n-a);return n===o||n===a||s&&o===a||r>l&&h<c}function J(t,e,i){return Math.max(e,Math.min(i,t))}function Q(t){return J(t,-32768,32767)}function tt(t,e,i,s=1e-6){return t>=Math.min(e,i)-s&&t<=Math.max(e,i)+s}function et(t,e,i){i=i||(i=>t[i]<e);let s,n=t.length-1,o=0;for(;n-o>1;)s=o+n>>1,i(s)?o=s:n=s;return{lo:o,hi:n}}const it=(t,e,i,s)=>et(t,i,s?s=>{const n=t[s][e];return n<i||n===i&&t[s+1][e]===i}:s=>t[s][e]<i),st=(t,e,i)=>et(t,i,(s=>t[s][e]>=i));function nt(t,e,i){let s=0,n=t.length;for(;s<n&&t[s]<e;)s++;for(;n>s&&t[n-1]>i;)n--;return s>0||n<t.length?t.slice(s,n):t}const ot=["push","pop","shift","splice","unshift"];function at(t,e){t._chartjs?t._chartjs.listeners.push(e):(Object.defineProperty(t,"_chartjs",{configurable:!0,enumerable:!1,value:{listeners:[e]}}),ot.forEach((e=>{const i="_onData"+w(e),s=t[e];Object.defineProperty(t,e,{configurable:!0,enumerable:!1,value(...e){const n=s.apply(this,e);return t._chartjs.listeners.forEach((t=>{"function"==typeof t[i]&&t[i](...e)})),n}})})))}function rt(t,e){const i=t._chartjs;if(!i)return;const s=i.listeners,n=s.indexOf(e);-1!==n&&s.splice(n,1),s.length>0||(ot.forEach((e=>{delete t[e]})),delete t._chartjs)}function lt(t){const e=new Set(t);return e.size===t.length?t:Array.from(e)}const ht="undefined"==typeof window?function(t){return t()}:window.requestAnimationFrame;function ct(t,e){let i=[],s=!1;return function(...n){i=n,s||(s=!0,ht.call(window,(()=>{s=!1,t.apply(e,i)})))}}function dt(t,e){let i;return function(...s){return e?(clearTimeout(i),i=setTimeout(t,e,s)):t.apply(this,s),e}}const ut=t=>"start"===t?"left":"end"===t?"right":"center",ft=(t,e,i)=>"start"===t?e:"end"===t?i:(e+i)/2,gt=(t,e,i,s)=>t===(s?"left":"right")?i:"center"===t?(e+i)/2:e;function pt(t,e,i){const s=e.length;let n=0,o=s;if(t._sorted){const{iScale:a,_parsed:r}=t,l=a.axis,{min:h,max:c,minDefined:d,maxDefined:u}=a.getUserBounds();d&&(n=J(Math.min(it(r,l,h).lo,i?s:it(e,l,a.getPixelForValue(h)).lo),0,s-1)),o=u?J(Math.max(it(r,a.axis,c,!0).hi+1,i?0:it(e,l,a.getPixelForValue(c),!0).hi+1),n,s)-n:s-n}return{start:n,count:o}}function mt(t){const{xScale:e,yScale:i,_scaleRanges:s}=t,n={xmin:e.min,xmax:e.max,ymin:i.min,ymax:i.max};if(!s)return t._scaleRanges=n,!0;const o=s.xmin!==e.min||s.xmax!==e.max||s.ymin!==i.min||s.ymax!==i.max;return Object.assign(s,n),o}class bt{constructor(){this._request=null,this._charts=new Map,this._running=!1,this._lastDate=void 0}_notify(t,e,i,s){const n=e.listeners[s],o=e.duration;n.forEach((s=>s({chart:t,initial:e.initial,numSteps:o,currentStep:Math.min(i-e.start,o)})))}_refresh(){this._request||(this._running=!0,this._request=ht.call(window,(()=>{this._update(),this._request=null,this._running&&this._refresh()})))}_update(t=Date.now()){let e=0;this._charts.forEach(((i,s)=>{if(!i.running||!i.items.length)return;const n=i.items;let o,a=n.length-1,r=!1;for(;a>=0;--a)o=n[a],o._active?(o._total>i.duration&&(i.duration=o._total),o.tick(t),r=!0):(n[a]=n[n.length-1],n.pop());r&&(s.draw(),this._notify(s,i,t,"progress")),n.length||(i.running=!1,this._notify(s,i,t,"complete"),i.initial=!1),e+=n.length})),this._lastDate=t,0===e&&(this._running=!1)}_getAnims(t){const e=this._charts;let i=e.get(t);return i||(i={running:!1,initial:!0,items:[],listeners:{complete:[],progress:[]}},e.set(t,i)),i}listen(t,e,i){this._getAnims(t).listeners[e].push(i)}add(t,e){e&&e.length&&this._getAnims(t).items.push(...e)}has(t){return this._getAnims(t).items.length>0}start(t){const e=this._charts.get(t);e&&(e.running=!0,e.start=Date.now(),e.duration=e.items.reduce(((t,e)=>Math.max(t,e._duration)),0),this._refresh())}running(t){if(!this._running)return!1;const e=this._charts.get(t);return!!(e&&e.running&&e.items.length)}stop(t){const e=this._charts.get(t);if(!e||!e.items.length)return;const i=e.items;let s=i.length-1;for(;s>=0;--s)i[s].cancel();e.items=[],this._notify(t,e,Date.now(),"complete")}remove(t){return this._charts.delete(t)}}var xt=new bt;
/*!
 * @kurkle/color v0.3.2
 * https://github.com/kurkle/color#readme
 * (c) 2023 Jukka Kurkela
 * Released under the MIT License
 */function _t(t){return t+.5|0}const yt=(t,e,i)=>Math.max(Math.min(t,i),e);function vt(t){return yt(_t(2.55*t),0,255)}function Mt(t){return yt(_t(255*t),0,255)}function wt(t){return yt(_t(t/2.55)/100,0,1)}function kt(t){return yt(_t(100*t),0,100)}const St={0:0,1:1,2:2,3:3,4:4,5:5,6:6,7:7,8:8,9:9,A:10,B:11,C:12,D:13,E:14,F:15,a:10,b:11,c:12,d:13,e:14,f:15},Pt=[..."0123456789ABCDEF"],Dt=t=>Pt[15&t],Ct=t=>Pt[(240&t)>>4]+Pt[15&t],Ot=t=>(240&t)>>4==(15&t);function At(t){var e=(t=>Ot(t.r)&&Ot(t.g)&&Ot(t.b)&&Ot(t.a))(t)?Dt:Ct;return t?"#"+e(t.r)+e(t.g)+e(t.b)+((t,e)=>t<255?e(t):"")(t.a,e):void 0}const Tt=/^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;function Lt(t,e,i){const s=e*Math.min(i,1-i),n=(e,n=(e+t/30)%12)=>i-s*Math.max(Math.min(n-3,9-n,1),-1);return[n(0),n(8),n(4)]}function Et(t,e,i){const s=(s,n=(s+t/60)%6)=>i-i*e*Math.max(Math.min(n,4-n,1),0);return[s(5),s(3),s(1)]}function Rt(t,e,i){const s=Lt(t,1,.5);let n;for(e+i>1&&(n=1/(e+i),e*=n,i*=n),n=0;n<3;n++)s[n]*=1-e-i,s[n]+=e;return s}function It(t){const e=t.r/255,i=t.g/255,s=t.b/255,n=Math.max(e,i,s),o=Math.min(e,i,s),a=(n+o)/2;let r,l,h;return n!==o&&(h=n-o,l=a>.5?h/(2-n-o):h/(n+o),r=function(t,e,i,s,n){return t===n?(e-i)/s+(e<i?6:0):e===n?(i-t)/s+2:(t-e)/s+4}(e,i,s,h,n),r=60*r+.5),[0|r,l||0,a]}function zt(t,e,i,s){return(Array.isArray(e)?t(e[0],e[1],e[2]):t(e,i,s)).map(Mt)}function Ft(t,e,i){return zt(Lt,t,e,i)}function Vt(t){return(t%360+360)%360}function Bt(t){const e=Tt.exec(t);let i,s=255;if(!e)return;e[5]!==i&&(s=e[6]?vt(+e[5]):Mt(+e[5]));const n=Vt(+e[2]),o=+e[3]/100,a=+e[4]/100;return i="hwb"===e[1]?function(t,e,i){return zt(Rt,t,e,i)}(n,o,a):"hsv"===e[1]?function(t,e,i){return zt(Et,t,e,i)}(n,o,a):Ft(n,o,a),{r:i[0],g:i[1],b:i[2],a:s}}const Wt={x:"dark",Z:"light",Y:"re",X:"blu",W:"gr",V:"medium",U:"slate",A:"ee",T:"ol",S:"or",B:"ra",C:"lateg",D:"ights",R:"in",Q:"turquois",E:"hi",P:"ro",O:"al",N:"le",M:"de",L:"yello",F:"en",K:"ch",G:"arks",H:"ea",I:"ightg",J:"wh"},Nt={OiceXe:"f0f8ff",antiquewEte:"faebd7",aqua:"ffff",aquamarRe:"7fffd4",azuY:"f0ffff",beige:"f5f5dc",bisque:"ffe4c4",black:"0",blanKedOmond:"ffebcd",Xe:"ff",XeviTet:"8a2be2",bPwn:"a52a2a",burlywood:"deb887",caMtXe:"5f9ea0",KartYuse:"7fff00",KocTate:"d2691e",cSO:"ff7f50",cSnflowerXe:"6495ed",cSnsilk:"fff8dc",crimson:"dc143c",cyan:"ffff",xXe:"8b",xcyan:"8b8b",xgTMnPd:"b8860b",xWay:"a9a9a9",xgYF:"6400",xgYy:"a9a9a9",xkhaki:"bdb76b",xmagFta:"8b008b",xTivegYF:"556b2f",xSange:"ff8c00",xScEd:"9932cc",xYd:"8b0000",xsOmon:"e9967a",xsHgYF:"8fbc8f",xUXe:"483d8b",xUWay:"2f4f4f",xUgYy:"2f4f4f",xQe:"ced1",xviTet:"9400d3",dAppRk:"ff1493",dApskyXe:"bfff",dimWay:"696969",dimgYy:"696969",dodgerXe:"1e90ff",fiYbrick:"b22222",flSOwEte:"fffaf0",foYstWAn:"228b22",fuKsia:"ff00ff",gaRsbSo:"dcdcdc",ghostwEte:"f8f8ff",gTd:"ffd700",gTMnPd:"daa520",Way:"808080",gYF:"8000",gYFLw:"adff2f",gYy:"808080",honeyMw:"f0fff0",hotpRk:"ff69b4",RdianYd:"cd5c5c",Rdigo:"4b0082",ivSy:"fffff0",khaki:"f0e68c",lavFMr:"e6e6fa",lavFMrXsh:"fff0f5",lawngYF:"7cfc00",NmoncEffon:"fffacd",ZXe:"add8e6",ZcSO:"f08080",Zcyan:"e0ffff",ZgTMnPdLw:"fafad2",ZWay:"d3d3d3",ZgYF:"90ee90",ZgYy:"d3d3d3",ZpRk:"ffb6c1",ZsOmon:"ffa07a",ZsHgYF:"20b2aa",ZskyXe:"87cefa",ZUWay:"778899",ZUgYy:"778899",ZstAlXe:"b0c4de",ZLw:"ffffe0",lime:"ff00",limegYF:"32cd32",lRF:"faf0e6",magFta:"ff00ff",maPon:"800000",VaquamarRe:"66cdaa",VXe:"cd",VScEd:"ba55d3",VpurpN:"9370db",VsHgYF:"3cb371",VUXe:"7b68ee",VsprRggYF:"fa9a",VQe:"48d1cc",VviTetYd:"c71585",midnightXe:"191970",mRtcYam:"f5fffa",mistyPse:"ffe4e1",moccasR:"ffe4b5",navajowEte:"ffdead",navy:"80",Tdlace:"fdf5e6",Tive:"808000",TivedBb:"6b8e23",Sange:"ffa500",SangeYd:"ff4500",ScEd:"da70d6",pOegTMnPd:"eee8aa",pOegYF:"98fb98",pOeQe:"afeeee",pOeviTetYd:"db7093",papayawEp:"ffefd5",pHKpuff:"ffdab9",peru:"cd853f",pRk:"ffc0cb",plum:"dda0dd",powMrXe:"b0e0e6",purpN:"800080",YbeccapurpN:"663399",Yd:"ff0000",Psybrown:"bc8f8f",PyOXe:"4169e1",saddNbPwn:"8b4513",sOmon:"fa8072",sandybPwn:"f4a460",sHgYF:"2e8b57",sHshell:"fff5ee",siFna:"a0522d",silver:"c0c0c0",skyXe:"87ceeb",UXe:"6a5acd",UWay:"708090",UgYy:"708090",snow:"fffafa",sprRggYF:"ff7f",stAlXe:"4682b4",tan:"d2b48c",teO:"8080",tEstN:"d8bfd8",tomato:"ff6347",Qe:"40e0d0",viTet:"ee82ee",JHt:"f5deb3",wEte:"ffffff",wEtesmoke:"f5f5f5",Lw:"ffff00",LwgYF:"9acd32"};let Ht;function jt(t){Ht||(Ht=function(){const t={},e=Object.keys(Nt),i=Object.keys(Wt);let s,n,o,a,r;for(s=0;s<e.length;s++){for(a=r=e[s],n=0;n<i.length;n++)o=i[n],r=r.replace(o,Wt[o]);o=parseInt(Nt[a],16),t[r]=[o>>16&255,o>>8&255,255&o]}return t}(),Ht.transparent=[0,0,0,0]);const e=Ht[t.toLowerCase()];return e&&{r:e[0],g:e[1],b:e[2],a:4===e.length?e[3]:255}}const $t=/^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;const Yt=t=>t<=.0031308?12.92*t:1.055*Math.pow(t,1/2.4)-.055,Ut=t=>t<=.04045?t/12.92:Math.pow((t+.055)/1.055,2.4);function Xt(t,e,i){if(t){let s=It(t);s[e]=Math.max(0,Math.min(s[e]+s[e]*i,0===e?360:1)),s=Ft(s),t.r=s[0],t.g=s[1],t.b=s[2]}}function qt(t,e){return t?Object.assign(e||{},t):t}function Kt(t){var e={r:0,g:0,b:0,a:255};return Array.isArray(t)?t.length>=3&&(e={r:t[0],g:t[1],b:t[2],a:255},t.length>3&&(e.a=Mt(t[3]))):(e=qt(t,{r:0,g:0,b:0,a:1})).a=Mt(e.a),e}function Gt(t){return"r"===t.charAt(0)?function(t){const e=$t.exec(t);let i,s,n,o=255;if(e){if(e[7]!==i){const t=+e[7];o=e[8]?vt(t):yt(255*t,0,255)}return i=+e[1],s=+e[3],n=+e[5],i=255&(e[2]?vt(i):yt(i,0,255)),s=255&(e[4]?vt(s):yt(s,0,255)),n=255&(e[6]?vt(n):yt(n,0,255)),{r:i,g:s,b:n,a:o}}}(t):Bt(t)}class Zt{constructor(t){if(t instanceof Zt)return t;const e=typeof t;let i;var s,n,o;"object"===e?i=Kt(t):"string"===e&&(o=(s=t).length,"#"===s[0]&&(4===o||5===o?n={r:255&17*St[s[1]],g:255&17*St[s[2]],b:255&17*St[s[3]],a:5===o?17*St[s[4]]:255}:7!==o&&9!==o||(n={r:St[s[1]]<<4|St[s[2]],g:St[s[3]]<<4|St[s[4]],b:St[s[5]]<<4|St[s[6]],a:9===o?St[s[7]]<<4|St[s[8]]:255})),i=n||jt(t)||Gt(t)),this._rgb=i,this._valid=!!i}get valid(){return this._valid}get rgb(){var t=qt(this._rgb);return t&&(t.a=wt(t.a)),t}set rgb(t){this._rgb=Kt(t)}rgbString(){return this._valid?(t=this._rgb)&&(t.a<255?`rgba(${t.r}, ${t.g}, ${t.b}, ${wt(t.a)})`:`rgb(${t.r}, ${t.g}, ${t.b})`):void 0;var t}hexString(){return this._valid?At(this._rgb):void 0}hslString(){return this._valid?function(t){if(!t)return;const e=It(t),i=e[0],s=kt(e[1]),n=kt(e[2]);return t.a<255?`hsla(${i}, ${s}%, ${n}%, ${wt(t.a)})`:`hsl(${i}, ${s}%, ${n}%)`}(this._rgb):void 0}mix(t,e){if(t){const i=this.rgb,s=t.rgb;let n;const o=e===n?.5:e,a=2*o-1,r=i.a-s.a,l=((a*r==-1?a:(a+r)/(1+a*r))+1)/2;n=1-l,i.r=255&l*i.r+n*s.r+.5,i.g=255&l*i.g+n*s.g+.5,i.b=255&l*i.b+n*s.b+.5,i.a=o*i.a+(1-o)*s.a,this.rgb=i}return this}interpolate(t,e){return t&&(this._rgb=function(t,e,i){const s=Ut(wt(t.r)),n=Ut(wt(t.g)),o=Ut(wt(t.b));return{r:Mt(Yt(s+i*(Ut(wt(e.r))-s))),g:Mt(Yt(n+i*(Ut(wt(e.g))-n))),b:Mt(Yt(o+i*(Ut(wt(e.b))-o))),a:t.a+i*(e.a-t.a)}}(this._rgb,t._rgb,e)),this}clone(){return new Zt(this.rgb)}alpha(t){return this._rgb.a=Mt(t),this}clearer(t){return this._rgb.a*=1-t,this}greyscale(){const t=this._rgb,e=_t(.3*t.r+.59*t.g+.11*t.b);return t.r=t.g=t.b=e,this}opaquer(t){return this._rgb.a*=1+t,this}negate(){const t=this._rgb;return t.r=255-t.r,t.g=255-t.g,t.b=255-t.b,this}lighten(t){return Xt(this._rgb,2,t),this}darken(t){return Xt(this._rgb,2,-t),this}saturate(t){return Xt(this._rgb,1,t),this}desaturate(t){return Xt(this._rgb,1,-t),this}rotate(t){return function(t,e){var i=It(t);i[0]=Vt(i[0]+e),i=Ft(i),t.r=i[0],t.g=i[1],t.b=i[2]}(this._rgb,t),this}}function Jt(t){if(t&&"object"==typeof t){const e=t.toString();return"[object CanvasPattern]"===e||"[object CanvasGradient]"===e}return!1}function Qt(t){return Jt(t)?t:new Zt(t)}function te(t){return Jt(t)?t:new Zt(t).saturate(.5).darken(.1).hexString()}const ee=["x","y","borderWidth","radius","tension"],ie=["color","borderColor","backgroundColor"];const se=new Map;function ne(t,e,i){return function(t,e){e=e||{};const i=t+JSON.stringify(e);let s=se.get(i);return s||(s=new Intl.NumberFormat(t,e),se.set(i,s)),s}(e,i).format(t)}const oe={values:t=>n(t)?t:""+t,numeric(t,e,i){if(0===t)return"0";const s=this.chart.options.locale;let n,o=t;if(i.length>1){const e=Math.max(Math.abs(i[0].value),Math.abs(i[i.length-1].value));(e<1e-4||e>1e15)&&(n="scientific"),o=function(t,e){let i=e.length>3?e[2].value-e[1].value:e[1].value-e[0].value;Math.abs(i)>=1&&t!==Math.floor(t)&&(i=t-Math.floor(t));return i}(t,i)}const a=z(Math.abs(o)),r=isNaN(a)?1:Math.max(Math.min(-1*Math.floor(a),20),0),l={notation:n,minimumFractionDigits:r,maximumFractionDigits:r};return Object.assign(l,this.options.ticks.format),ne(t,s,l)},logarithmic(t,e,i){if(0===t)return"0";const s=i[e].significand||t/Math.pow(10,Math.floor(z(t)));return[1,2,3,5,10,15].includes(s)||e>.8*i.length?oe.numeric.call(this,t,e,i):""}};var ae={formatters:oe};const re=Object.create(null),le=Object.create(null);function he(t,e){if(!e)return t;const i=e.split(".");for(let e=0,s=i.length;e<s;++e){const s=i[e];t=t[s]||(t[s]=Object.create(null))}return t}function ce(t,e,i){return"string"==typeof e?b(he(t,e),i):b(he(t,""),e)}class de{constructor(t,e){this.animation=void 0,this.backgroundColor="rgba(0,0,0,0.1)",this.borderColor="rgba(0,0,0,0.1)",this.color="#666",this.datasets={},this.devicePixelRatio=t=>t.chart.platform.getDevicePixelRatio(),this.elements={},this.events=["mousemove","mouseout","click","touchstart","touchmove"],this.font={family:"'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",size:12,style:"normal",lineHeight:1.2,weight:null},this.hover={},this.hoverBackgroundColor=(t,e)=>te(e.backgroundColor),this.hoverBorderColor=(t,e)=>te(e.borderColor),this.hoverColor=(t,e)=>te(e.color),this.indexAxis="x",this.interaction={mode:"nearest",intersect:!0,includeInvisible:!1},this.maintainAspectRatio=!0,this.onHover=null,this.onClick=null,this.parsing=!0,this.plugins={},this.responsive=!0,this.scale=void 0,this.scales={},this.showLine=!0,this.drawActiveElementsOnTop=!0,this.describe(t),this.apply(e)}set(t,e){return ce(this,t,e)}get(t){return he(this,t)}describe(t,e){return ce(le,t,e)}override(t,e){return ce(re,t,e)}route(t,e,i,s){const n=he(this,t),a=he(this,i),r="_"+e;Object.defineProperties(n,{[r]:{value:n[e],writable:!0},[e]:{enumerable:!0,get(){const t=this[r],e=a[s];return o(t)?Object.assign({},e,t):l(t,e)},set(t){this[r]=t}}})}apply(t){t.forEach((t=>t(this)))}}var ue=new de({_scriptable:t=>!t.startsWith("on"),_indexable:t=>"events"!==t,hover:{_fallback:"interaction"},interaction:{_scriptable:!1,_indexable:!1}},[function(t){t.set("animation",{delay:void 0,duration:1e3,easing:"easeOutQuart",fn:void 0,from:void 0,loop:void 0,to:void 0,type:void 0}),t.describe("animation",{_fallback:!1,_indexable:!1,_scriptable:t=>"onProgress"!==t&&"onComplete"!==t&&"fn"!==t}),t.set("animations",{colors:{type:"color",properties:ie},numbers:{type:"number",properties:ee}}),t.describe("animations",{_fallback:"animation"}),t.set("transitions",{active:{animation:{duration:400}},resize:{animation:{duration:0}},show:{animations:{colors:{from:"transparent"},visible:{type:"boolean",duration:0}}},hide:{animations:{colors:{to:"transparent"},visible:{type:"boolean",easing:"linear",fn:t=>0|t}}}})},function(t){t.set("layout",{autoPadding:!0,padding:{top:0,right:0,bottom:0,left:0}})},function(t){t.set("scale",{display:!0,offset:!1,reverse:!1,beginAtZero:!1,bounds:"ticks",clip:!0,grace:0,grid:{display:!0,lineWidth:1,drawOnChartArea:!0,drawTicks:!0,tickLength:8,tickWidth:(t,e)=>e.lineWidth,tickColor:(t,e)=>e.color,offset:!1},border:{display:!0,dash:[],dashOffset:0,width:1},title:{display:!1,text:"",padding:{top:4,bottom:4}},ticks:{minRotation:0,maxRotation:50,mirror:!1,textStrokeWidth:0,textStrokeColor:"",padding:3,display:!0,autoSkip:!0,autoSkipPadding:3,labelOffset:0,callback:ae.formatters.values,minor:{},major:{},align:"center",crossAlign:"near",showLabelBackdrop:!1,backdropColor:"rgba(255, 255, 255, 0.75)",backdropPadding:2}}),t.route("scale.ticks","color","","color"),t.route("scale.grid","color","","borderColor"),t.route("scale.border","color","","borderColor"),t.route("scale.title","color","","color"),t.describe("scale",{_fallback:!1,_scriptable:t=>!t.startsWith("before")&&!t.startsWith("after")&&"callback"!==t&&"parser"!==t,_indexable:t=>"borderDash"!==t&&"tickBorderDash"!==t&&"dash"!==t}),t.describe("scales",{_fallback:"scale"}),t.describe("scale.ticks",{_scriptable:t=>"backdropPadding"!==t&&"callback"!==t,_indexable:t=>"backdropPadding"!==t})}]);function fe(){return"undefined"!=typeof window&&"undefined"!=typeof document}function ge(t){let e=t.parentNode;return e&&"[object ShadowRoot]"===e.toString()&&(e=e.host),e}function pe(t,e,i){let s;return"string"==typeof t?(s=parseInt(t,10),-1!==t.indexOf("%")&&(s=s/100*e.parentNode[i])):s=t,s}const me=t=>t.ownerDocument.defaultView.getComputedStyle(t,null);function be(t,e){return me(t).getPropertyValue(e)}const xe=["top","right","bottom","left"];function _e(t,e,i){const s={};i=i?"-"+i:"";for(let n=0;n<4;n++){const o=xe[n];s[o]=parseFloat(t[e+"-"+o+i])||0}return s.width=s.left+s.right,s.height=s.top+s.bottom,s}const ye=(t,e,i)=>(t>0||e>0)&&(!i||!i.shadowRoot);function ve(t,e){if("native"in t)return t;const{canvas:i,currentDevicePixelRatio:s}=e,n=me(i),o="border-box"===n.boxSizing,a=_e(n,"padding"),r=_e(n,"border","width"),{x:l,y:h,box:c}=function(t,e){const i=t.touches,s=i&&i.length?i[0]:t,{offsetX:n,offsetY:o}=s;let a,r,l=!1;if(ye(n,o,t.target))a=n,r=o;else{const t=e.getBoundingClientRect();a=s.clientX-t.left,r=s.clientY-t.top,l=!0}return{x:a,y:r,box:l}}(t,i),d=a.left+(c&&r.left),u=a.top+(c&&r.top);let{width:f,height:g}=e;return o&&(f-=a.width+r.width,g-=a.height+r.height),{x:Math.round((l-d)/f*i.width/s),y:Math.round((h-u)/g*i.height/s)}}const Me=t=>Math.round(10*t)/10;function we(t,e,i,s){const n=me(t),o=_e(n,"margin"),a=pe(n.maxWidth,t,"clientWidth")||T,r=pe(n.maxHeight,t,"clientHeight")||T,l=function(t,e,i){let s,n;if(void 0===e||void 0===i){const o=ge(t);if(o){const t=o.getBoundingClientRect(),a=me(o),r=_e(a,"border","width"),l=_e(a,"padding");e=t.width-l.width-r.width,i=t.height-l.height-r.height,s=pe(a.maxWidth,o,"clientWidth"),n=pe(a.maxHeight,o,"clientHeight")}else e=t.clientWidth,i=t.clientHeight}return{width:e,height:i,maxWidth:s||T,maxHeight:n||T}}(t,e,i);let{width:h,height:c}=l;if("content-box"===n.boxSizing){const t=_e(n,"border","width"),e=_e(n,"padding");h-=e.width+t.width,c-=e.height+t.height}h=Math.max(0,h-o.width),c=Math.max(0,s?h/s:c-o.height),h=Me(Math.min(h,a,l.maxWidth)),c=Me(Math.min(c,r,l.maxHeight)),h&&!c&&(c=Me(h/2));return(void 0!==e||void 0!==i)&&s&&l.height&&c>l.height&&(c=l.height,h=Me(Math.floor(c*s))),{width:h,height:c}}function ke(t,e,i){const s=e||1,n=Math.floor(t.height*s),o=Math.floor(t.width*s);t.height=Math.floor(t.height),t.width=Math.floor(t.width);const a=t.canvas;return a.style&&(i||!a.style.height&&!a.style.width)&&(a.style.height=`${t.height}px`,a.style.width=`${t.width}px`),(t.currentDevicePixelRatio!==s||a.height!==n||a.width!==o)&&(t.currentDevicePixelRatio=s,a.height=n,a.width=o,t.ctx.setTransform(s,0,0,s,0,0),!0)}const Se=function(){let t=!1;try{const e={get passive(){return t=!0,!1}};fe()&&(window.addEventListener("test",null,e),window.removeEventListener("test",null,e))}catch(t){}return t}();function Pe(t,e){const i=be(t,e),s=i&&i.match(/^(\d+)(\.\d+)?px$/);return s?+s[1]:void 0}function De(t){return!t||s(t.size)||s(t.family)?null:(t.style?t.style+" ":"")+(t.weight?t.weight+" ":"")+t.size+"px "+t.family}function Ce(t,e,i,s,n){let o=e[n];return o||(o=e[n]=t.measureText(n).width,i.push(n)),o>s&&(s=o),s}function Oe(t,e,i,s){let o=(s=s||{}).data=s.data||{},a=s.garbageCollect=s.garbageCollect||[];s.font!==e&&(o=s.data={},a=s.garbageCollect=[],s.font=e),t.save(),t.font=e;let r=0;const l=i.length;let h,c,d,u,f;for(h=0;h<l;h++)if(u=i[h],null==u||n(u)){if(n(u))for(c=0,d=u.length;c<d;c++)f=u[c],null==f||n(f)||(r=Ce(t,o,a,r,f))}else r=Ce(t,o,a,r,u);t.restore();const g=a.length/2;if(g>i.length){for(h=0;h<g;h++)delete o[a[h]];a.splice(0,g)}return r}function Ae(t,e,i){const s=t.currentDevicePixelRatio,n=0!==i?Math.max(i/2,.5):0;return Math.round((e-n)*s)/s+n}function Te(t,e){(e=e||t.getContext("2d")).save(),e.resetTransform(),e.clearRect(0,0,t.width,t.height),e.restore()}function Le(t,e,i,s){Ee(t,e,i,s,null)}function Ee(t,e,i,s,n){let o,a,r,l,h,c,d,u;const f=e.pointStyle,g=e.rotation,p=e.radius;let m=(g||0)*L;if(f&&"object"==typeof f&&(o=f.toString(),"[object HTMLImageElement]"===o||"[object HTMLCanvasElement]"===o))return t.save(),t.translate(i,s),t.rotate(m),t.drawImage(f,-f.width/2,-f.height/2,f.width,f.height),void t.restore();if(!(isNaN(p)||p<=0)){switch(t.beginPath(),f){default:n?t.ellipse(i,s,n/2,p,0,0,O):t.arc(i,s,p,0,O),t.closePath();break;case"triangle":c=n?n/2:p,t.moveTo(i+Math.sin(m)*c,s-Math.cos(m)*p),m+=I,t.lineTo(i+Math.sin(m)*c,s-Math.cos(m)*p),m+=I,t.lineTo(i+Math.sin(m)*c,s-Math.cos(m)*p),t.closePath();break;case"rectRounded":h=.516*p,l=p-h,a=Math.cos(m+R)*l,d=Math.cos(m+R)*(n?n/2-h:l),r=Math.sin(m+R)*l,u=Math.sin(m+R)*(n?n/2-h:l),t.arc(i-d,s-r,h,m-C,m-E),t.arc(i+u,s-a,h,m-E,m),t.arc(i+d,s+r,h,m,m+E),t.arc(i-u,s+a,h,m+E,m+C),t.closePath();break;case"rect":if(!g){l=Math.SQRT1_2*p,c=n?n/2:l,t.rect(i-c,s-l,2*c,2*l);break}m+=R;case"rectRot":d=Math.cos(m)*(n?n/2:p),a=Math.cos(m)*p,r=Math.sin(m)*p,u=Math.sin(m)*(n?n/2:p),t.moveTo(i-d,s-r),t.lineTo(i+u,s-a),t.lineTo(i+d,s+r),t.lineTo(i-u,s+a),t.closePath();break;case"crossRot":m+=R;case"cross":d=Math.cos(m)*(n?n/2:p),a=Math.cos(m)*p,r=Math.sin(m)*p,u=Math.sin(m)*(n?n/2:p),t.moveTo(i-d,s-r),t.lineTo(i+d,s+r),t.moveTo(i+u,s-a),t.lineTo(i-u,s+a);break;case"star":d=Math.cos(m)*(n?n/2:p),a=Math.cos(m)*p,r=Math.sin(m)*p,u=Math.sin(m)*(n?n/2:p),t.moveTo(i-d,s-r),t.lineTo(i+d,s+r),t.moveTo(i+u,s-a),t.lineTo(i-u,s+a),m+=R,d=Math.cos(m)*(n?n/2:p),a=Math.cos(m)*p,r=Math.sin(m)*p,u=Math.sin(m)*(n?n/2:p),t.moveTo(i-d,s-r),t.lineTo(i+d,s+r),t.moveTo(i+u,s-a),t.lineTo(i-u,s+a);break;case"line":a=n?n/2:Math.cos(m)*p,r=Math.sin(m)*p,t.moveTo(i-a,s-r),t.lineTo(i+a,s+r);break;case"dash":t.moveTo(i,s),t.lineTo(i+Math.cos(m)*(n?n/2:p),s+Math.sin(m)*p);break;case!1:t.closePath()}t.fill(),e.borderWidth>0&&t.stroke()}}function Re(t,e,i){return i=i||.5,!e||t&&t.x>e.left-i&&t.x<e.right+i&&t.y>e.top-i&&t.y<e.bottom+i}function Ie(t,e){t.save(),t.beginPath(),t.rect(e.left,e.top,e.right-e.left,e.bottom-e.top),t.clip()}function ze(t){t.restore()}function Fe(t,e,i,s,n){if(!e)return t.lineTo(i.x,i.y);if("middle"===n){const s=(e.x+i.x)/2;t.lineTo(s,e.y),t.lineTo(s,i.y)}else"after"===n!=!!s?t.lineTo(e.x,i.y):t.lineTo(i.x,e.y);t.lineTo(i.x,i.y)}function Ve(t,e,i,s){if(!e)return t.lineTo(i.x,i.y);t.bezierCurveTo(s?e.cp1x:e.cp2x,s?e.cp1y:e.cp2y,s?i.cp2x:i.cp1x,s?i.cp2y:i.cp1y,i.x,i.y)}function Be(t,e,i,s,n){if(n.strikethrough||n.underline){const o=t.measureText(s),a=e-o.actualBoundingBoxLeft,r=e+o.actualBoundingBoxRight,l=i-o.actualBoundingBoxAscent,h=i+o.actualBoundingBoxDescent,c=n.strikethrough?(l+h)/2:h;t.strokeStyle=t.fillStyle,t.beginPath(),t.lineWidth=n.decorationWidth||2,t.moveTo(a,c),t.lineTo(r,c),t.stroke()}}function We(t,e){const i=t.fillStyle;t.fillStyle=e.color,t.fillRect(e.left,e.top,e.width,e.height),t.fillStyle=i}function Ne(t,e,i,o,a,r={}){const l=n(e)?e:[e],h=r.strokeWidth>0&&""!==r.strokeColor;let c,d;for(t.save(),t.font=a.string,function(t,e){e.translation&&t.translate(e.translation[0],e.translation[1]),s(e.rotation)||t.rotate(e.rotation),e.color&&(t.fillStyle=e.color),e.textAlign&&(t.textAlign=e.textAlign),e.textBaseline&&(t.textBaseline=e.textBaseline)}(t,r),c=0;c<l.length;++c)d=l[c],r.backdrop&&We(t,r.backdrop),h&&(r.strokeColor&&(t.strokeStyle=r.strokeColor),s(r.strokeWidth)||(t.lineWidth=r.strokeWidth),t.strokeText(d,i,o,r.maxWidth)),t.fillText(d,i,o,r.maxWidth),Be(t,i,o,d,r),o+=Number(a.lineHeight);t.restore()}function He(t,e){const{x:i,y:s,w:n,h:o,radius:a}=e;t.arc(i+a.topLeft,s+a.topLeft,a.topLeft,1.5*C,C,!0),t.lineTo(i,s+o-a.bottomLeft),t.arc(i+a.bottomLeft,s+o-a.bottomLeft,a.bottomLeft,C,E,!0),t.lineTo(i+n-a.bottomRight,s+o),t.arc(i+n-a.bottomRight,s+o-a.bottomRight,a.bottomRight,E,0,!0),t.lineTo(i+n,s+a.topRight),t.arc(i+n-a.topRight,s+a.topRight,a.topRight,0,-E,!0),t.lineTo(i+a.topLeft,s)}function je(t,e=[""],i,s,n=(()=>t[0])){const o=i||t;void 0===s&&(s=ti("_fallback",t));const a={[Symbol.toStringTag]:"Object",_cacheable:!0,_scopes:t,_rootScopes:o,_fallback:s,_getTarget:n,override:i=>je([i,...t],e,o,s)};return new Proxy(a,{deleteProperty:(e,i)=>(delete e[i],delete e._keys,delete t[0][i],!0),get:(i,s)=>qe(i,s,(()=>function(t,e,i,s){let n;for(const o of e)if(n=ti(Ue(o,t),i),void 0!==n)return Xe(t,n)?Je(i,s,t,n):n}(s,e,t,i))),getOwnPropertyDescriptor:(t,e)=>Reflect.getOwnPropertyDescriptor(t._scopes[0],e),getPrototypeOf:()=>Reflect.getPrototypeOf(t[0]),has:(t,e)=>ei(t).includes(e),ownKeys:t=>ei(t),set(t,e,i){const s=t._storage||(t._storage=n());return t[e]=s[e]=i,delete t._keys,!0}})}function $e(t,e,i,s){const a={_cacheable:!1,_proxy:t,_context:e,_subProxy:i,_stack:new Set,_descriptors:Ye(t,s),setContext:e=>$e(t,e,i,s),override:n=>$e(t.override(n),e,i,s)};return new Proxy(a,{deleteProperty:(e,i)=>(delete e[i],delete t[i],!0),get:(t,e,i)=>qe(t,e,(()=>function(t,e,i){const{_proxy:s,_context:a,_subProxy:r,_descriptors:l}=t;let h=s[e];S(h)&&l.isScriptable(e)&&(h=function(t,e,i,s){const{_proxy:n,_context:o,_subProxy:a,_stack:r}=i;if(r.has(t))throw new Error("Recursion detected: "+Array.from(r).join("->")+"->"+t);r.add(t);let l=e(o,a||s);r.delete(t),Xe(t,l)&&(l=Je(n._scopes,n,t,l));return l}(e,h,t,i));n(h)&&h.length&&(h=function(t,e,i,s){const{_proxy:n,_context:a,_subProxy:r,_descriptors:l}=i;if(void 0!==a.index&&s(t))return e[a.index%e.length];if(o(e[0])){const i=e,s=n._scopes.filter((t=>t!==i));e=[];for(const o of i){const i=Je(s,n,t,o);e.push($e(i,a,r&&r[t],l))}}return e}(e,h,t,l.isIndexable));Xe(e,h)&&(h=$e(h,a,r&&r[e],l));return h}(t,e,i))),getOwnPropertyDescriptor:(e,i)=>e._descriptors.allKeys?Reflect.has(t,i)?{enumerable:!0,configurable:!0}:void 0:Reflect.getOwnPropertyDescriptor(t,i),getPrototypeOf:()=>Reflect.getPrototypeOf(t),has:(e,i)=>Reflect.has(t,i),ownKeys:()=>Reflect.ownKeys(t),set:(e,i,s)=>(t[i]=s,delete e[i],!0)})}function Ye(t,e={scriptable:!0,indexable:!0}){const{_scriptable:i=e.scriptable,_indexable:s=e.indexable,_allKeys:n=e.allKeys}=t;return{allKeys:n,scriptable:i,indexable:s,isScriptable:S(i)?i:()=>i,isIndexable:S(s)?s:()=>s}}const Ue=(t,e)=>t?t+w(e):e,Xe=(t,e)=>o(e)&&"adapters"!==t&&(null===Object.getPrototypeOf(e)||e.constructor===Object);function qe(t,e,i){if(Object.prototype.hasOwnProperty.call(t,e))return t[e];const s=i();return t[e]=s,s}function Ke(t,e,i){return S(t)?t(e,i):t}const Ge=(t,e)=>!0===t?e:"string"==typeof t?M(e,t):void 0;function Ze(t,e,i,s,n){for(const o of e){const e=Ge(i,o);if(e){t.add(e);const o=Ke(e._fallback,i,n);if(void 0!==o&&o!==i&&o!==s)return o}else if(!1===e&&void 0!==s&&i!==s)return null}return!1}function Je(t,e,i,s){const a=e._rootScopes,r=Ke(e._fallback,i,s),l=[...t,...a],h=new Set;h.add(s);let c=Qe(h,l,i,r||i,s);return null!==c&&((void 0===r||r===i||(c=Qe(h,l,r,c,s),null!==c))&&je(Array.from(h),[""],a,r,(()=>function(t,e,i){const s=t._getTarget();e in s||(s[e]={});const a=s[e];if(n(a)&&o(i))return i;return a||{}}(e,i,s))))}function Qe(t,e,i,s,n){for(;i;)i=Ze(t,e,i,s,n);return i}function ti(t,e){for(const i of e){if(!i)continue;const e=i[t];if(void 0!==e)return e}}function ei(t){let e=t._keys;return e||(e=t._keys=function(t){const e=new Set;for(const i of t)for(const t of Object.keys(i).filter((t=>!t.startsWith("_"))))e.add(t);return Array.from(e)}(t._scopes)),e}function ii(t,e,i,s){const{iScale:n}=t,{key:o="r"}=this._parsing,a=new Array(s);let r,l,h,c;for(r=0,l=s;r<l;++r)h=r+i,c=e[h],a[r]={r:n.parse(M(c,o),h)};return a}const si=Number.EPSILON||1e-14,ni=(t,e)=>e<t.length&&!t[e].skip&&t[e],oi=t=>"x"===t?"y":"x";function ai(t,e,i,s){const n=t.skip?e:t,o=e,a=i.skip?e:i,r=q(o,n),l=q(a,o);let h=r/(r+l),c=l/(r+l);h=isNaN(h)?0:h,c=isNaN(c)?0:c;const d=s*h,u=s*c;return{previous:{x:o.x-d*(a.x-n.x),y:o.y-d*(a.y-n.y)},next:{x:o.x+u*(a.x-n.x),y:o.y+u*(a.y-n.y)}}}function ri(t,e="x"){const i=oi(e),s=t.length,n=Array(s).fill(0),o=Array(s);let a,r,l,h=ni(t,0);for(a=0;a<s;++a)if(r=l,l=h,h=ni(t,a+1),l){if(h){const t=h[e]-l[e];n[a]=0!==t?(h[i]-l[i])/t:0}o[a]=r?h?F(n[a-1])!==F(n[a])?0:(n[a-1]+n[a])/2:n[a-1]:n[a]}!function(t,e,i){const s=t.length;let n,o,a,r,l,h=ni(t,0);for(let c=0;c<s-1;++c)l=h,h=ni(t,c+1),l&&h&&(V(e[c],0,si)?i[c]=i[c+1]=0:(n=i[c]/e[c],o=i[c+1]/e[c],r=Math.pow(n,2)+Math.pow(o,2),r<=9||(a=3/Math.sqrt(r),i[c]=n*a*e[c],i[c+1]=o*a*e[c])))}(t,n,o),function(t,e,i="x"){const s=oi(i),n=t.length;let o,a,r,l=ni(t,0);for(let h=0;h<n;++h){if(a=r,r=l,l=ni(t,h+1),!r)continue;const n=r[i],c=r[s];a&&(o=(n-a[i])/3,r[`cp1${i}`]=n-o,r[`cp1${s}`]=c-o*e[h]),l&&(o=(l[i]-n)/3,r[`cp2${i}`]=n+o,r[`cp2${s}`]=c+o*e[h])}}(t,o,e)}function li(t,e,i){return Math.max(Math.min(t,i),e)}function hi(t,e,i,s,n){let o,a,r,l;if(e.spanGaps&&(t=t.filter((t=>!t.skip))),"monotone"===e.cubicInterpolationMode)ri(t,n);else{let i=s?t[t.length-1]:t[0];for(o=0,a=t.length;o<a;++o)r=t[o],l=ai(i,r,t[Math.min(o+1,a-(s?0:1))%a],e.tension),r.cp1x=l.previous.x,r.cp1y=l.previous.y,r.cp2x=l.next.x,r.cp2y=l.next.y,i=r}e.capBezierPoints&&function(t,e){let i,s,n,o,a,r=Re(t[0],e);for(i=0,s=t.length;i<s;++i)a=o,o=r,r=i<s-1&&Re(t[i+1],e),o&&(n=t[i],a&&(n.cp1x=li(n.cp1x,e.left,e.right),n.cp1y=li(n.cp1y,e.top,e.bottom)),r&&(n.cp2x=li(n.cp2x,e.left,e.right),n.cp2y=li(n.cp2y,e.top,e.bottom)))}(t,i)}const ci=t=>0===t||1===t,di=(t,e,i)=>-Math.pow(2,10*(t-=1))*Math.sin((t-e)*O/i),ui=(t,e,i)=>Math.pow(2,-10*t)*Math.sin((t-e)*O/i)+1,fi={linear:t=>t,easeInQuad:t=>t*t,easeOutQuad:t=>-t*(t-2),easeInOutQuad:t=>(t/=.5)<1?.5*t*t:-.5*(--t*(t-2)-1),easeInCubic:t=>t*t*t,easeOutCubic:t=>(t-=1)*t*t+1,easeInOutCubic:t=>(t/=.5)<1?.5*t*t*t:.5*((t-=2)*t*t+2),easeInQuart:t=>t*t*t*t,easeOutQuart:t=>-((t-=1)*t*t*t-1),easeInOutQuart:t=>(t/=.5)<1?.5*t*t*t*t:-.5*((t-=2)*t*t*t-2),easeInQuint:t=>t*t*t*t*t,easeOutQuint:t=>(t-=1)*t*t*t*t+1,easeInOutQuint:t=>(t/=.5)<1?.5*t*t*t*t*t:.5*((t-=2)*t*t*t*t+2),easeInSine:t=>1-Math.cos(t*E),easeOutSine:t=>Math.sin(t*E),easeInOutSine:t=>-.5*(Math.cos(C*t)-1),easeInExpo:t=>0===t?0:Math.pow(2,10*(t-1)),easeOutExpo:t=>1===t?1:1-Math.pow(2,-10*t),easeInOutExpo:t=>ci(t)?t:t<.5?.5*Math.pow(2,10*(2*t-1)):.5*(2-Math.pow(2,-10*(2*t-1))),easeInCirc:t=>t>=1?t:-(Math.sqrt(1-t*t)-1),easeOutCirc:t=>Math.sqrt(1-(t-=1)*t),easeInOutCirc:t=>(t/=.5)<1?-.5*(Math.sqrt(1-t*t)-1):.5*(Math.sqrt(1-(t-=2)*t)+1),easeInElastic:t=>ci(t)?t:di(t,.075,.3),easeOutElastic:t=>ci(t)?t:ui(t,.075,.3),easeInOutElastic(t){const e=.1125;return ci(t)?t:t<.5?.5*di(2*t,e,.45):.5+.5*ui(2*t-1,e,.45)},easeInBack(t){const e=1.70158;return t*t*((e+1)*t-e)},easeOutBack(t){const e=1.70158;return(t-=1)*t*((e+1)*t+e)+1},easeInOutBack(t){let e=1.70158;return(t/=.5)<1?t*t*((1+(e*=1.525))*t-e)*.5:.5*((t-=2)*t*((1+(e*=1.525))*t+e)+2)},easeInBounce:t=>1-fi.easeOutBounce(1-t),easeOutBounce(t){const e=7.5625,i=2.75;return t<1/i?e*t*t:t<2/i?e*(t-=1.5/i)*t+.75:t<2.5/i?e*(t-=2.25/i)*t+.9375:e*(t-=2.625/i)*t+.984375},easeInOutBounce:t=>t<.5?.5*fi.easeInBounce(2*t):.5*fi.easeOutBounce(2*t-1)+.5};function gi(t,e,i,s){return{x:t.x+i*(e.x-t.x),y:t.y+i*(e.y-t.y)}}function pi(t,e,i,s){return{x:t.x+i*(e.x-t.x),y:"middle"===s?i<.5?t.y:e.y:"after"===s?i<1?t.y:e.y:i>0?e.y:t.y}}function mi(t,e,i,s){const n={x:t.cp2x,y:t.cp2y},o={x:e.cp1x,y:e.cp1y},a=gi(t,n,i),r=gi(n,o,i),l=gi(o,e,i),h=gi(a,r,i),c=gi(r,l,i);return gi(h,c,i)}const bi=/^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/,xi=/^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;function _i(t,e){const i=(""+t).match(bi);if(!i||"normal"===i[1])return 1.2*e;switch(t=+i[2],i[3]){case"px":return t;case"%":t/=100}return e*t}const yi=t=>+t||0;function vi(t,e){const i={},s=o(e),n=s?Object.keys(e):e,a=o(t)?s?i=>l(t[i],t[e[i]]):e=>t[e]:()=>t;for(const t of n)i[t]=yi(a(t));return i}function Mi(t){return vi(t,{top:"y",right:"x",bottom:"y",left:"x"})}function wi(t){return vi(t,["topLeft","topRight","bottomLeft","bottomRight"])}function ki(t){const e=Mi(t);return e.width=e.left+e.right,e.height=e.top+e.bottom,e}function Si(t,e){t=t||{},e=e||ue.font;let i=l(t.size,e.size);"string"==typeof i&&(i=parseInt(i,10));let s=l(t.style,e.style);s&&!(""+s).match(xi)&&(console.warn('Invalid font style specified: "'+s+'"'),s=void 0);const n={family:l(t.family,e.family),lineHeight:_i(l(t.lineHeight,e.lineHeight),i),size:i,style:s,weight:l(t.weight,e.weight),string:""};return n.string=De(n),n}function Pi(t,e,i,s){let o,a,r,l=!0;for(o=0,a=t.length;o<a;++o)if(r=t[o],void 0!==r&&(void 0!==e&&"function"==typeof r&&(r=r(e),l=!1),void 0!==i&&n(r)&&(r=r[i%r.length],l=!1),void 0!==r))return s&&!l&&(s.cacheable=!1),r}function Di(t,e,i){const{min:s,max:n}=t,o=c(e,(n-s)/2),a=(t,e)=>i&&0===t?0:t+e;return{min:a(s,-Math.abs(o)),max:a(n,o)}}function Ci(t,e){return Object.assign(Object.create(t),e)}function Oi(t,e,i){return t?function(t,e){return{x:i=>t+t+e-i,setWidth(t){e=t},textAlign:t=>"center"===t?t:"right"===t?"left":"right",xPlus:(t,e)=>t-e,leftForLtr:(t,e)=>t-e}}(e,i):{x:t=>t,setWidth(t){},textAlign:t=>t,xPlus:(t,e)=>t+e,leftForLtr:(t,e)=>t}}function Ai(t,e){let i,s;"ltr"!==e&&"rtl"!==e||(i=t.canvas.style,s=[i.getPropertyValue("direction"),i.getPropertyPriority("direction")],i.setProperty("direction",e,"important"),t.prevTextDirection=s)}function Ti(t,e){void 0!==e&&(delete t.prevTextDirection,t.canvas.style.setProperty("direction",e[0],e[1]))}function Li(t){return"angle"===t?{between:Z,compare:K,normalize:G}:{between:tt,compare:(t,e)=>t-e,normalize:t=>t}}function Ei({start:t,end:e,count:i,loop:s,style:n}){return{start:t%i,end:e%i,loop:s&&(e-t+1)%i==0,style:n}}function Ri(t,e,i){if(!i)return[t];const{property:s,start:n,end:o}=i,a=e.length,{compare:r,between:l,normalize:h}=Li(s),{start:c,end:d,loop:u,style:f}=function(t,e,i){const{property:s,start:n,end:o}=i,{between:a,normalize:r}=Li(s),l=e.length;let h,c,{start:d,end:u,loop:f}=t;if(f){for(d+=l,u+=l,h=0,c=l;h<c&&a(r(e[d%l][s]),n,o);++h)d--,u--;d%=l,u%=l}return u<d&&(u+=l),{start:d,end:u,loop:f,style:t.style}}(t,e,i),g=[];let p,m,b,x=!1,_=null;const y=()=>x||l(n,b,p)&&0!==r(n,b),v=()=>!x||0===r(o,p)||l(o,b,p);for(let t=c,i=c;t<=d;++t)m=e[t%a],m.skip||(p=h(m[s]),p!==b&&(x=l(p,n,o),null===_&&y()&&(_=0===r(p,n)?t:i),null!==_&&v()&&(g.push(Ei({start:_,end:t,loop:u,count:a,style:f})),_=null),i=t,b=p));return null!==_&&g.push(Ei({start:_,end:d,loop:u,count:a,style:f})),g}function Ii(t,e){const i=[],s=t.segments;for(let n=0;n<s.length;n++){const o=Ri(s[n],t.points,e);o.length&&i.push(...o)}return i}function zi(t,e){const i=t.points,s=t.options.spanGaps,n=i.length;if(!n)return[];const o=!!t._loop,{start:a,end:r}=function(t,e,i,s){let n=0,o=e-1;if(i&&!s)for(;n<e&&!t[n].skip;)n++;for(;n<e&&t[n].skip;)n++;for(n%=e,i&&(o+=n);o>n&&t[o%e].skip;)o--;return o%=e,{start:n,end:o}}(i,n,o,s);if(!0===s)return Fi(t,[{start:a,end:r,loop:o}],i,e);return Fi(t,function(t,e,i,s){const n=t.length,o=[];let a,r=e,l=t[e];for(a=e+1;a<=i;++a){const i=t[a%n];i.skip||i.stop?l.skip||(s=!1,o.push({start:e%n,end:(a-1)%n,loop:s}),e=r=i.stop?a:null):(r=a,l.skip&&(e=a)),l=i}return null!==r&&o.push({start:e%n,end:r%n,loop:s}),o}(i,a,r<a?r+n:r,!!t._fullLoop&&0===a&&r===n-1),i,e)}function Fi(t,e,i,s){return s&&s.setContext&&i?function(t,e,i,s){const n=t._chart.getContext(),o=Vi(t.options),{_datasetIndex:a,options:{spanGaps:r}}=t,l=i.length,h=[];let c=o,d=e[0].start,u=d;function f(t,e,s,n){const o=r?-1:1;if(t!==e){for(t+=l;i[t%l].skip;)t-=o;for(;i[e%l].skip;)e+=o;t%l!=e%l&&(h.push({start:t%l,end:e%l,loop:s,style:n}),c=n,d=e%l)}}for(const t of e){d=r?d:t.start;let e,o=i[d%l];for(u=d+1;u<=t.end;u++){const r=i[u%l];e=Vi(s.setContext(Ci(n,{type:"segment",p0:o,p1:r,p0DataIndex:(u-1)%l,p1DataIndex:u%l,datasetIndex:a}))),Bi(e,c)&&f(d,u-1,t.loop,c),o=r,c=e}d<u-1&&f(d,u-1,t.loop,c)}return h}(t,e,i,s):e}function Vi(t){return{backgroundColor:t.backgroundColor,borderCapStyle:t.borderCapStyle,borderDash:t.borderDash,borderDashOffset:t.borderDashOffset,borderJoinStyle:t.borderJoinStyle,borderWidth:t.borderWidth,borderColor:t.borderColor}}function Bi(t,e){if(!e)return!1;const i=[],s=function(t,e){return Jt(e)?(i.includes(e)||i.push(e),i.indexOf(e)):e};return JSON.stringify(t,s)!==JSON.stringify(e,s)}var Wi=Object.freeze({__proto__:null,HALF_PI:E,INFINITY:T,PI:C,PITAU:A,QUARTER_PI:R,RAD_PER_DEG:L,TAU:O,TWO_THIRDS_PI:I,_addGrace:Di,_alignPixel:Ae,_alignStartEnd:ft,_angleBetween:Z,_angleDiff:K,_arrayUnique:lt,_attachContext:$e,_bezierCurveTo:Ve,_bezierInterpolation:mi,_boundSegment:Ri,_boundSegments:Ii,_capitalize:w,_computeSegments:zi,_createResolver:je,_decimalPlaces:U,_deprecated:function(t,e,i,s){void 0!==e&&console.warn(t+': "'+i+'" is deprecated. Please use "'+s+'" instead')},_descriptors:Ye,_elementsEqual:f,_factorize:W,_filterBetween:nt,_getParentNode:ge,_getStartAndCountOfVisiblePoints:pt,_int16Range:Q,_isBetween:tt,_isClickEvent:D,_isDomSupported:fe,_isPointInArea:Re,_limitValue:J,_longestText:Oe,_lookup:et,_lookupByKey:it,_measureText:Ce,_merger:m,_mergerIf:_,_normalizeAngle:G,_parseObjectDataRadialScale:ii,_pointInLine:gi,_readValueToProps:vi,_rlookupByKey:st,_scaleRangesChanged:mt,_setMinAndMaxByKey:j,_splitKey:v,_steppedInterpolation:pi,_steppedLineTo:Fe,_textX:gt,_toLeftRightCenter:ut,_updateBezierControlPoints:hi,addRoundedRectPath:He,almostEquals:V,almostWhole:H,callback:d,clearCanvas:Te,clipArea:Ie,clone:g,color:Qt,createContext:Ci,debounce:dt,defined:k,distanceBetweenPoints:q,drawPoint:Le,drawPointLegend:Ee,each:u,easingEffects:fi,finiteOrDefault:r,fontString:function(t,e,i){return e+" "+t+"px "+i},formatNumber:ne,getAngleFromPoint:X,getHoverColor:te,getMaximumSize:we,getRelativePosition:ve,getRtlAdapter:Oi,getStyle:be,isArray:n,isFinite:a,isFunction:S,isNullOrUndef:s,isNumber:N,isObject:o,isPatternOrGradient:Jt,listenArrayEvents:at,log10:z,merge:b,mergeIf:x,niceNum:B,noop:e,overrideTextDirection:Ai,readUsedSize:Pe,renderText:Ne,requestAnimFrame:ht,resolve:Pi,resolveObjectKey:M,restoreTextDirection:Ti,retinaScale:ke,setsEqual:P,sign:F,splineCurve:ai,splineCurveMonotone:ri,supportsEventListenerOptions:Se,throttled:ct,toDegrees:Y,toDimension:c,toFont:Si,toFontString:De,toLineHeight:_i,toPadding:ki,toPercentage:h,toRadians:$,toTRBL:Mi,toTRBLCorners:wi,uid:i,unclipArea:ze,unlistenArrayEvents:rt,valueOrDefault:l});function Ni(t,e,i,s){const{controller:n,data:o,_sorted:a}=t,r=n._cachedMeta.iScale;if(r&&e===r.axis&&"r"!==e&&a&&o.length){const t=r._reversePixels?st:it;if(!s)return t(o,e,i);if(n._sharedOptions){const s=o[0],n="function"==typeof s.getRange&&s.getRange(e);if(n){const s=t(o,e,i-n),a=t(o,e,i+n);return{lo:s.lo,hi:a.hi}}}}return{lo:0,hi:o.length-1}}function Hi(t,e,i,s,n){const o=t.getSortedVisibleDatasetMetas(),a=i[e];for(let t=0,i=o.length;t<i;++t){const{index:i,data:r}=o[t],{lo:l,hi:h}=Ni(o[t],e,a,n);for(let t=l;t<=h;++t){const e=r[t];e.skip||s(e,i,t)}}}function ji(t,e,i,s,n){const o=[];if(!n&&!t.isPointInArea(e))return o;return Hi(t,i,e,(function(i,a,r){(n||Re(i,t.chartArea,0))&&i.inRange(e.x,e.y,s)&&o.push({element:i,datasetIndex:a,index:r})}),!0),o}function $i(t,e,i,s,n,o){let a=[];const r=function(t){const e=-1!==t.indexOf("x"),i=-1!==t.indexOf("y");return function(t,s){const n=e?Math.abs(t.x-s.x):0,o=i?Math.abs(t.y-s.y):0;return Math.sqrt(Math.pow(n,2)+Math.pow(o,2))}}(i);let l=Number.POSITIVE_INFINITY;return Hi(t,i,e,(function(i,h,c){const d=i.inRange(e.x,e.y,n);if(s&&!d)return;const u=i.getCenterPoint(n);if(!(!!o||t.isPointInArea(u))&&!d)return;const f=r(e,u);f<l?(a=[{element:i,datasetIndex:h,index:c}],l=f):f===l&&a.push({element:i,datasetIndex:h,index:c})})),a}function Yi(t,e,i,s,n,o){return o||t.isPointInArea(e)?"r"!==i||s?$i(t,e,i,s,n,o):function(t,e,i,s){let n=[];return Hi(t,i,e,(function(t,i,o){const{startAngle:a,endAngle:r}=t.getProps(["startAngle","endAngle"],s),{angle:l}=X(t,{x:e.x,y:e.y});Z(l,a,r)&&n.push({element:t,datasetIndex:i,index:o})})),n}(t,e,i,n):[]}function Ui(t,e,i,s,n){const o=[],a="x"===i?"inXRange":"inYRange";let r=!1;return Hi(t,i,e,((t,s,l)=>{t[a](e[i],n)&&(o.push({element:t,datasetIndex:s,index:l}),r=r||t.inRange(e.x,e.y,n))})),s&&!r?[]:o}var Xi={evaluateInteractionItems:Hi,modes:{index(t,e,i,s){const n=ve(e,t),o=i.axis||"x",a=i.includeInvisible||!1,r=i.intersect?ji(t,n,o,s,a):Yi(t,n,o,!1,s,a),l=[];return r.length?(t.getSortedVisibleDatasetMetas().forEach((t=>{const e=r[0].index,i=t.data[e];i&&!i.skip&&l.push({element:i,datasetIndex:t.index,index:e})})),l):[]},dataset(t,e,i,s){const n=ve(e,t),o=i.axis||"xy",a=i.includeInvisible||!1;let r=i.intersect?ji(t,n,o,s,a):Yi(t,n,o,!1,s,a);if(r.length>0){const e=r[0].datasetIndex,i=t.getDatasetMeta(e).data;r=[];for(let t=0;t<i.length;++t)r.push({element:i[t],datasetIndex:e,index:t})}return r},point:(t,e,i,s)=>ji(t,ve(e,t),i.axis||"xy",s,i.includeInvisible||!1),nearest(t,e,i,s){const n=ve(e,t),o=i.axis||"xy",a=i.includeInvisible||!1;return Yi(t,n,o,i.intersect,s,a)},x:(t,e,i,s)=>Ui(t,ve(e,t),"x",i.intersect,s),y:(t,e,i,s)=>Ui(t,ve(e,t),"y",i.intersect,s)}};const qi=["left","top","right","bottom"];function Ki(t,e){return t.filter((t=>t.pos===e))}function Gi(t,e){return t.filter((t=>-1===qi.indexOf(t.pos)&&t.box.axis===e))}function Zi(t,e){return t.sort(((t,i)=>{const s=e?i:t,n=e?t:i;return s.weight===n.weight?s.index-n.index:s.weight-n.weight}))}function Ji(t,e){const i=function(t){const e={};for(const i of t){const{stack:t,pos:s,stackWeight:n}=i;if(!t||!qi.includes(s))continue;const o=e[t]||(e[t]={count:0,placed:0,weight:0,size:0});o.count++,o.weight+=n}return e}(t),{vBoxMaxWidth:s,hBoxMaxHeight:n}=e;let o,a,r;for(o=0,a=t.length;o<a;++o){r=t[o];const{fullSize:a}=r.box,l=i[r.stack],h=l&&r.stackWeight/l.weight;r.horizontal?(r.width=h?h*s:a&&e.availableWidth,r.height=n):(r.width=s,r.height=h?h*n:a&&e.availableHeight)}return i}function Qi(t,e,i,s){return Math.max(t[i],e[i])+Math.max(t[s],e[s])}function ts(t,e){t.top=Math.max(t.top,e.top),t.left=Math.max(t.left,e.left),t.bottom=Math.max(t.bottom,e.bottom),t.right=Math.max(t.right,e.right)}function es(t,e,i,s){const{pos:n,box:a}=i,r=t.maxPadding;if(!o(n)){i.size&&(t[n]-=i.size);const e=s[i.stack]||{size:0,count:1};e.size=Math.max(e.size,i.horizontal?a.height:a.width),i.size=e.size/e.count,t[n]+=i.size}a.getPadding&&ts(r,a.getPadding());const l=Math.max(0,e.outerWidth-Qi(r,t,"left","right")),h=Math.max(0,e.outerHeight-Qi(r,t,"top","bottom")),c=l!==t.w,d=h!==t.h;return t.w=l,t.h=h,i.horizontal?{same:c,other:d}:{same:d,other:c}}function is(t,e){const i=e.maxPadding;function s(t){const s={left:0,top:0,right:0,bottom:0};return t.forEach((t=>{s[t]=Math.max(e[t],i[t])})),s}return s(t?["left","right"]:["top","bottom"])}function ss(t,e,i,s){const n=[];let o,a,r,l,h,c;for(o=0,a=t.length,h=0;o<a;++o){r=t[o],l=r.box,l.update(r.width||e.w,r.height||e.h,is(r.horizontal,e));const{same:a,other:d}=es(e,i,r,s);h|=a&&n.length,c=c||d,l.fullSize||n.push(r)}return h&&ss(n,e,i,s)||c}function ns(t,e,i,s,n){t.top=i,t.left=e,t.right=e+s,t.bottom=i+n,t.width=s,t.height=n}function os(t,e,i,s){const n=i.padding;let{x:o,y:a}=e;for(const r of t){const t=r.box,l=s[r.stack]||{count:1,placed:0,weight:1},h=r.stackWeight/l.weight||1;if(r.horizontal){const s=e.w*h,o=l.size||t.height;k(l.start)&&(a=l.start),t.fullSize?ns(t,n.left,a,i.outerWidth-n.right-n.left,o):ns(t,e.left+l.placed,a,s,o),l.start=a,l.placed+=s,a=t.bottom}else{const s=e.h*h,a=l.size||t.width;k(l.start)&&(o=l.start),t.fullSize?ns(t,o,n.top,a,i.outerHeight-n.bottom-n.top):ns(t,o,e.top+l.placed,a,s),l.start=o,l.placed+=s,o=t.right}}e.x=o,e.y=a}var as={addBox(t,e){t.boxes||(t.boxes=[]),e.fullSize=e.fullSize||!1,e.position=e.position||"top",e.weight=e.weight||0,e._layers=e._layers||function(){return[{z:0,draw(t){e.draw(t)}}]},t.boxes.push(e)},removeBox(t,e){const i=t.boxes?t.boxes.indexOf(e):-1;-1!==i&&t.boxes.splice(i,1)},configure(t,e,i){e.fullSize=i.fullSize,e.position=i.position,e.weight=i.weight},update(t,e,i,s){if(!t)return;const n=ki(t.options.layout.padding),o=Math.max(e-n.width,0),a=Math.max(i-n.height,0),r=function(t){const e=function(t){const e=[];let i,s,n,o,a,r;for(i=0,s=(t||[]).length;i<s;++i)n=t[i],({position:o,options:{stack:a,stackWeight:r=1}}=n),e.push({index:i,box:n,pos:o,horizontal:n.isHorizontal(),weight:n.weight,stack:a&&o+a,stackWeight:r});return e}(t),i=Zi(e.filter((t=>t.box.fullSize)),!0),s=Zi(Ki(e,"left"),!0),n=Zi(Ki(e,"right")),o=Zi(Ki(e,"top"),!0),a=Zi(Ki(e,"bottom")),r=Gi(e,"x"),l=Gi(e,"y");return{fullSize:i,leftAndTop:s.concat(o),rightAndBottom:n.concat(l).concat(a).concat(r),chartArea:Ki(e,"chartArea"),vertical:s.concat(n).concat(l),horizontal:o.concat(a).concat(r)}}(t.boxes),l=r.vertical,h=r.horizontal;u(t.boxes,(t=>{"function"==typeof t.beforeLayout&&t.beforeLayout()}));const c=l.reduce(((t,e)=>e.box.options&&!1===e.box.options.display?t:t+1),0)||1,d=Object.freeze({outerWidth:e,outerHeight:i,padding:n,availableWidth:o,availableHeight:a,vBoxMaxWidth:o/2/c,hBoxMaxHeight:a/2}),f=Object.assign({},n);ts(f,ki(s));const g=Object.assign({maxPadding:f,w:o,h:a,x:n.left,y:n.top},n),p=Ji(l.concat(h),d);ss(r.fullSize,g,d,p),ss(l,g,d,p),ss(h,g,d,p)&&ss(l,g,d,p),function(t){const e=t.maxPadding;function i(i){const s=Math.max(e[i]-t[i],0);return t[i]+=s,s}t.y+=i("top"),t.x+=i("left"),i("right"),i("bottom")}(g),os(r.leftAndTop,g,d,p),g.x+=g.w,g.y+=g.h,os(r.rightAndBottom,g,d,p),t.chartArea={left:g.left,top:g.top,right:g.left+g.w,bottom:g.top+g.h,height:g.h,width:g.w},u(r.chartArea,(e=>{const i=e.box;Object.assign(i,t.chartArea),i.update(g.w,g.h,{left:0,top:0,right:0,bottom:0})}))}};class rs{acquireContext(t,e){}releaseContext(t){return!1}addEventListener(t,e,i){}removeEventListener(t,e,i){}getDevicePixelRatio(){return 1}getMaximumSize(t,e,i,s){return e=Math.max(0,e||t.width),i=i||t.height,{width:e,height:Math.max(0,s?Math.floor(e/s):i)}}isAttached(t){return!0}updateConfig(t){}}class ls extends rs{acquireContext(t){return t&&t.getContext&&t.getContext("2d")||null}updateConfig(t){t.options.animation=!1}}const hs="$chartjs",cs={touchstart:"mousedown",touchmove:"mousemove",touchend:"mouseup",pointerenter:"mouseenter",pointerdown:"mousedown",pointermove:"mousemove",pointerup:"mouseup",pointerleave:"mouseout",pointerout:"mouseout"},ds=t=>null===t||""===t;const us=!!Se&&{passive:!0};function fs(t,e,i){t.canvas.removeEventListener(e,i,us)}function gs(t,e){for(const i of t)if(i===e||i.contains(e))return!0}function ps(t,e,i){const s=t.canvas,n=new MutationObserver((t=>{let e=!1;for(const i of t)e=e||gs(i.addedNodes,s),e=e&&!gs(i.removedNodes,s);e&&i()}));return n.observe(document,{childList:!0,subtree:!0}),n}function ms(t,e,i){const s=t.canvas,n=new MutationObserver((t=>{let e=!1;for(const i of t)e=e||gs(i.removedNodes,s),e=e&&!gs(i.addedNodes,s);e&&i()}));return n.observe(document,{childList:!0,subtree:!0}),n}const bs=new Map;let xs=0;function _s(){const t=window.devicePixelRatio;t!==xs&&(xs=t,bs.forEach(((e,i)=>{i.currentDevicePixelRatio!==t&&e()})))}function ys(t,e,i){const s=t.canvas,n=s&&ge(s);if(!n)return;const o=ct(((t,e)=>{const s=n.clientWidth;i(t,e),s<n.clientWidth&&i()}),window),a=new ResizeObserver((t=>{const e=t[0],i=e.contentRect.width,s=e.contentRect.height;0===i&&0===s||o(i,s)}));return a.observe(n),function(t,e){bs.size||window.addEventListener("resize",_s),bs.set(t,e)}(t,o),a}function vs(t,e,i){i&&i.disconnect(),"resize"===e&&function(t){bs.delete(t),bs.size||window.removeEventListener("resize",_s)}(t)}function Ms(t,e,i){const s=t.canvas,n=ct((e=>{null!==t.ctx&&i(function(t,e){const i=cs[t.type]||t.type,{x:s,y:n}=ve(t,e);return{type:i,chart:e,native:t,x:void 0!==s?s:null,y:void 0!==n?n:null}}(e,t))}),t);return function(t,e,i){t.addEventListener(e,i,us)}(s,e,n),n}class ws extends rs{acquireContext(t,e){const i=t&&t.getContext&&t.getContext("2d");return i&&i.canvas===t?(function(t,e){const i=t.style,s=t.getAttribute("height"),n=t.getAttribute("width");if(t[hs]={initial:{height:s,width:n,style:{display:i.display,height:i.height,width:i.width}}},i.display=i.display||"block",i.boxSizing=i.boxSizing||"border-box",ds(n)){const e=Pe(t,"width");void 0!==e&&(t.width=e)}if(ds(s))if(""===t.style.height)t.height=t.width/(e||2);else{const e=Pe(t,"height");void 0!==e&&(t.height=e)}}(t,e),i):null}releaseContext(t){const e=t.canvas;if(!e[hs])return!1;const i=e[hs].initial;["height","width"].forEach((t=>{const n=i[t];s(n)?e.removeAttribute(t):e.setAttribute(t,n)}));const n=i.style||{};return Object.keys(n).forEach((t=>{e.style[t]=n[t]})),e.width=e.width,delete e[hs],!0}addEventListener(t,e,i){this.removeEventListener(t,e);const s=t.$proxies||(t.$proxies={}),n={attach:ps,detach:ms,resize:ys}[e]||Ms;s[e]=n(t,e,i)}removeEventListener(t,e){const i=t.$proxies||(t.$proxies={}),s=i[e];if(!s)return;({attach:vs,detach:vs,resize:vs}[e]||fs)(t,e,s),i[e]=void 0}getDevicePixelRatio(){return window.devicePixelRatio}getMaximumSize(t,e,i,s){return we(t,e,i,s)}isAttached(t){const e=ge(t);return!(!e||!e.isConnected)}}function ks(t){return!fe()||"undefined"!=typeof OffscreenCanvas&&t instanceof OffscreenCanvas?ls:ws}var Ss=Object.freeze({__proto__:null,BasePlatform:rs,BasicPlatform:ls,DomPlatform:ws,_detectPlatform:ks});const Ps="transparent",Ds={boolean:(t,e,i)=>i>.5?e:t,color(t,e,i){const s=Qt(t||Ps),n=s.valid&&Qt(e||Ps);return n&&n.valid?n.mix(s,i).hexString():e},number:(t,e,i)=>t+(e-t)*i};class Cs{constructor(t,e,i,s){const n=e[i];s=Pi([t.to,s,n,t.from]);const o=Pi([t.from,n,s]);this._active=!0,this._fn=t.fn||Ds[t.type||typeof o],this._easing=fi[t.easing]||fi.linear,this._start=Math.floor(Date.now()+(t.delay||0)),this._duration=this._total=Math.floor(t.duration),this._loop=!!t.loop,this._target=e,this._prop=i,this._from=o,this._to=s,this._promises=void 0}active(){return this._active}update(t,e,i){if(this._active){this._notify(!1);const s=this._target[this._prop],n=i-this._start,o=this._duration-n;this._start=i,this._duration=Math.floor(Math.max(o,t.duration)),this._total+=n,this._loop=!!t.loop,this._to=Pi([t.to,e,s,t.from]),this._from=Pi([t.from,s,e])}}cancel(){this._active&&(this.tick(Date.now()),this._active=!1,this._notify(!1))}tick(t){const e=t-this._start,i=this._duration,s=this._prop,n=this._from,o=this._loop,a=this._to;let r;if(this._active=n!==a&&(o||e<i),!this._active)return this._target[s]=a,void this._notify(!0);e<0?this._target[s]=n:(r=e/i%2,r=o&&r>1?2-r:r,r=this._easing(Math.min(1,Math.max(0,r))),this._target[s]=this._fn(n,a,r))}wait(){const t=this._promises||(this._promises=[]);return new Promise(((e,i)=>{t.push({res:e,rej:i})}))}_notify(t){const e=t?"res":"rej",i=this._promises||[];for(let t=0;t<i.length;t++)i[t][e]()}}class Os{constructor(t,e){this._chart=t,this._properties=new Map,this.configure(e)}configure(t){if(!o(t))return;const e=Object.keys(ue.animation),i=this._properties;Object.getOwnPropertyNames(t).forEach((s=>{const a=t[s];if(!o(a))return;const r={};for(const t of e)r[t]=a[t];(n(a.properties)&&a.properties||[s]).forEach((t=>{t!==s&&i.has(t)||i.set(t,r)}))}))}_animateOptions(t,e){const i=e.options,s=function(t,e){if(!e)return;let i=t.options;if(!i)return void(t.options=e);i.$shared&&(t.options=i=Object.assign({},i,{$shared:!1,$animations:{}}));return i}(t,i);if(!s)return[];const n=this._createAnimations(s,i);return i.$shared&&function(t,e){const i=[],s=Object.keys(e);for(let e=0;e<s.length;e++){const n=t[s[e]];n&&n.active()&&i.push(n.wait())}return Promise.all(i)}(t.options.$animations,i).then((()=>{t.options=i}),(()=>{})),n}_createAnimations(t,e){const i=this._properties,s=[],n=t.$animations||(t.$animations={}),o=Object.keys(e),a=Date.now();let r;for(r=o.length-1;r>=0;--r){const l=o[r];if("$"===l.charAt(0))continue;if("options"===l){s.push(...this._animateOptions(t,e));continue}const h=e[l];let c=n[l];const d=i.get(l);if(c){if(d&&c.active()){c.update(d,h,a);continue}c.cancel()}d&&d.duration?(n[l]=c=new Cs(d,t,l,h),s.push(c)):t[l]=h}return s}update(t,e){if(0===this._properties.size)return void Object.assign(t,e);const i=this._createAnimations(t,e);return i.length?(xt.add(this._chart,i),!0):void 0}}function As(t,e){const i=t&&t.options||{},s=i.reverse,n=void 0===i.min?e:0,o=void 0===i.max?e:0;return{start:s?o:n,end:s?n:o}}function Ts(t,e){const i=[],s=t._getSortedDatasetMetas(e);let n,o;for(n=0,o=s.length;n<o;++n)i.push(s[n].index);return i}function Ls(t,e,i,s={}){const n=t.keys,o="single"===s.mode;let r,l,h,c;if(null!==e){for(r=0,l=n.length;r<l;++r){if(h=+n[r],h===i){if(s.all)continue;break}c=t.values[h],a(c)&&(o||0===e||F(e)===F(c))&&(e+=c)}return e}}function Es(t,e){const i=t&&t.options.stacked;return i||void 0===i&&void 0!==e.stack}function Rs(t,e,i){const s=t[e]||(t[e]={});return s[i]||(s[i]={})}function Is(t,e,i,s){for(const n of e.getMatchingVisibleMetas(s).reverse()){const e=t[n.index];if(i&&e>0||!i&&e<0)return n.index}return null}function zs(t,e){const{chart:i,_cachedMeta:s}=t,n=i._stacks||(i._stacks={}),{iScale:o,vScale:a,index:r}=s,l=o.axis,h=a.axis,c=function(t,e,i){return`${t.id}.${e.id}.${i.stack||i.type}`}(o,a,s),d=e.length;let u;for(let t=0;t<d;++t){const i=e[t],{[l]:o,[h]:d}=i;u=(i._stacks||(i._stacks={}))[h]=Rs(n,c,o),u[r]=d,u._top=Is(u,a,!0,s.type),u._bottom=Is(u,a,!1,s.type);(u._visualValues||(u._visualValues={}))[r]=d}}function Fs(t,e){const i=t.scales;return Object.keys(i).filter((t=>i[t].axis===e)).shift()}function Vs(t,e){const i=t.controller.index,s=t.vScale&&t.vScale.axis;if(s){e=e||t._parsed;for(const t of e){const e=t._stacks;if(!e||void 0===e[s]||void 0===e[s][i])return;delete e[s][i],void 0!==e[s]._visualValues&&void 0!==e[s]._visualValues[i]&&delete e[s]._visualValues[i]}}}const Bs=t=>"reset"===t||"none"===t,Ws=(t,e)=>e?t:Object.assign({},t);class Ns{static defaults={};static datasetElementType=null;static dataElementType=null;constructor(t,e){this.chart=t,this._ctx=t.ctx,this.index=e,this._cachedDataOpts={},this._cachedMeta=this.getMeta(),this._type=this._cachedMeta.type,this.options=void 0,this._parsing=!1,this._data=void 0,this._objectData=void 0,this._sharedOptions=void 0,this._drawStart=void 0,this._drawCount=void 0,this.enableOptionSharing=!1,this.supportsDecimation=!1,this.$context=void 0,this._syncList=[],this.datasetElementType=new.target.datasetElementType,this.dataElementType=new.target.dataElementType,this.initialize()}initialize(){const t=this._cachedMeta;this.configure(),this.linkScales(),t._stacked=Es(t.vScale,t),this.addElements(),this.options.fill&&!this.chart.isPluginEnabled("filler")&&console.warn("Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options")}updateIndex(t){this.index!==t&&Vs(this._cachedMeta),this.index=t}linkScales(){const t=this.chart,e=this._cachedMeta,i=this.getDataset(),s=(t,e,i,s)=>"x"===t?e:"r"===t?s:i,n=e.xAxisID=l(i.xAxisID,Fs(t,"x")),o=e.yAxisID=l(i.yAxisID,Fs(t,"y")),a=e.rAxisID=l(i.rAxisID,Fs(t,"r")),r=e.indexAxis,h=e.iAxisID=s(r,n,o,a),c=e.vAxisID=s(r,o,n,a);e.xScale=this.getScaleForId(n),e.yScale=this.getScaleForId(o),e.rScale=this.getScaleForId(a),e.iScale=this.getScaleForId(h),e.vScale=this.getScaleForId(c)}getDataset(){return this.chart.data.datasets[this.index]}getMeta(){return this.chart.getDatasetMeta(this.index)}getScaleForId(t){return this.chart.scales[t]}_getOtherScale(t){const e=this._cachedMeta;return t===e.iScale?e.vScale:e.iScale}reset(){this._update("reset")}_destroy(){const t=this._cachedMeta;this._data&&rt(this._data,this),t._stacked&&Vs(t)}_dataCheck(){const t=this.getDataset(),e=t.data||(t.data=[]),i=this._data;if(o(e))this._data=function(t){const e=Object.keys(t),i=new Array(e.length);let s,n,o;for(s=0,n=e.length;s<n;++s)o=e[s],i[s]={x:o,y:t[o]};return i}(e);else if(i!==e){if(i){rt(i,this);const t=this._cachedMeta;Vs(t),t._parsed=[]}e&&Object.isExtensible(e)&&at(e,this),this._syncList=[],this._data=e}}addElements(){const t=this._cachedMeta;this._dataCheck(),this.datasetElementType&&(t.dataset=new this.datasetElementType)}buildOrUpdateElements(t){const e=this._cachedMeta,i=this.getDataset();let s=!1;this._dataCheck();const n=e._stacked;e._stacked=Es(e.vScale,e),e.stack!==i.stack&&(s=!0,Vs(e),e.stack=i.stack),this._resyncElements(t),(s||n!==e._stacked)&&zs(this,e._parsed)}configure(){const t=this.chart.config,e=t.datasetScopeKeys(this._type),i=t.getOptionScopes(this.getDataset(),e,!0);this.options=t.createResolver(i,this.getContext()),this._parsing=this.options.parsing,this._cachedDataOpts={}}parse(t,e){const{_cachedMeta:i,_data:s}=this,{iScale:a,_stacked:r}=i,l=a.axis;let h,c,d,u=0===t&&e===s.length||i._sorted,f=t>0&&i._parsed[t-1];if(!1===this._parsing)i._parsed=s,i._sorted=!0,d=s;else{d=n(s[t])?this.parseArrayData(i,s,t,e):o(s[t])?this.parseObjectData(i,s,t,e):this.parsePrimitiveData(i,s,t,e);const a=()=>null===c[l]||f&&c[l]<f[l];for(h=0;h<e;++h)i._parsed[h+t]=c=d[h],u&&(a()&&(u=!1),f=c);i._sorted=u}r&&zs(this,d)}parsePrimitiveData(t,e,i,s){const{iScale:n,vScale:o}=t,a=n.axis,r=o.axis,l=n.getLabels(),h=n===o,c=new Array(s);let d,u,f;for(d=0,u=s;d<u;++d)f=d+i,c[d]={[a]:h||n.parse(l[f],f),[r]:o.parse(e[f],f)};return c}parseArrayData(t,e,i,s){const{xScale:n,yScale:o}=t,a=new Array(s);let r,l,h,c;for(r=0,l=s;r<l;++r)h=r+i,c=e[h],a[r]={x:n.parse(c[0],h),y:o.parse(c[1],h)};return a}parseObjectData(t,e,i,s){const{xScale:n,yScale:o}=t,{xAxisKey:a="x",yAxisKey:r="y"}=this._parsing,l=new Array(s);let h,c,d,u;for(h=0,c=s;h<c;++h)d=h+i,u=e[d],l[h]={x:n.parse(M(u,a),d),y:o.parse(M(u,r),d)};return l}getParsed(t){return this._cachedMeta._parsed[t]}getDataElement(t){return this._cachedMeta.data[t]}applyStack(t,e,i){const s=this.chart,n=this._cachedMeta,o=e[t.axis];return Ls({keys:Ts(s,!0),values:e._stacks[t.axis]._visualValues},o,n.index,{mode:i})}updateRangeFromParsed(t,e,i,s){const n=i[e.axis];let o=null===n?NaN:n;const a=s&&i._stacks[e.axis];s&&a&&(s.values=a,o=Ls(s,n,this._cachedMeta.index)),t.min=Math.min(t.min,o),t.max=Math.max(t.max,o)}getMinMax(t,e){const i=this._cachedMeta,s=i._parsed,n=i._sorted&&t===i.iScale,o=s.length,r=this._getOtherScale(t),l=((t,e,i)=>t&&!e.hidden&&e._stacked&&{keys:Ts(i,!0),values:null})(e,i,this.chart),h={min:Number.POSITIVE_INFINITY,max:Number.NEGATIVE_INFINITY},{min:c,max:d}=function(t){const{min:e,max:i,minDefined:s,maxDefined:n}=t.getUserBounds();return{min:s?e:Number.NEGATIVE_INFINITY,max:n?i:Number.POSITIVE_INFINITY}}(r);let u,f;function g(){f=s[u];const e=f[r.axis];return!a(f[t.axis])||c>e||d<e}for(u=0;u<o&&(g()||(this.updateRangeFromParsed(h,t,f,l),!n));++u);if(n)for(u=o-1;u>=0;--u)if(!g()){this.updateRangeFromParsed(h,t,f,l);break}return h}getAllParsedValues(t){const e=this._cachedMeta._parsed,i=[];let s,n,o;for(s=0,n=e.length;s<n;++s)o=e[s][t.axis],a(o)&&i.push(o);return i}getMaxOverflow(){return!1}getLabelAndValue(t){const e=this._cachedMeta,i=e.iScale,s=e.vScale,n=this.getParsed(t);return{label:i?""+i.getLabelForValue(n[i.axis]):"",value:s?""+s.getLabelForValue(n[s.axis]):""}}_update(t){const e=this._cachedMeta;this.update(t||"default"),e._clip=function(t){let e,i,s,n;return o(t)?(e=t.top,i=t.right,s=t.bottom,n=t.left):e=i=s=n=t,{top:e,right:i,bottom:s,left:n,disabled:!1===t}}(l(this.options.clip,function(t,e,i){if(!1===i)return!1;const s=As(t,i),n=As(e,i);return{top:n.end,right:s.end,bottom:n.start,left:s.start}}(e.xScale,e.yScale,this.getMaxOverflow())))}update(t){}draw(){const t=this._ctx,e=this.chart,i=this._cachedMeta,s=i.data||[],n=e.chartArea,o=[],a=this._drawStart||0,r=this._drawCount||s.length-a,l=this.options.drawActiveElementsOnTop;let h;for(i.dataset&&i.dataset.draw(t,n,a,r),h=a;h<a+r;++h){const e=s[h];e.hidden||(e.active&&l?o.push(e):e.draw(t,n))}for(h=0;h<o.length;++h)o[h].draw(t,n)}getStyle(t,e){const i=e?"active":"default";return void 0===t&&this._cachedMeta.dataset?this.resolveDatasetElementOptions(i):this.resolveDataElementOptions(t||0,i)}getContext(t,e,i){const s=this.getDataset();let n;if(t>=0&&t<this._cachedMeta.data.length){const e=this._cachedMeta.data[t];n=e.$context||(e.$context=function(t,e,i){return Ci(t,{active:!1,dataIndex:e,parsed:void 0,raw:void 0,element:i,index:e,mode:"default",type:"data"})}(this.getContext(),t,e)),n.parsed=this.getParsed(t),n.raw=s.data[t],n.index=n.dataIndex=t}else n=this.$context||(this.$context=function(t,e){return Ci(t,{active:!1,dataset:void 0,datasetIndex:e,index:e,mode:"default",type:"dataset"})}(this.chart.getContext(),this.index)),n.dataset=s,n.index=n.datasetIndex=this.index;return n.active=!!e,n.mode=i,n}resolveDatasetElementOptions(t){return this._resolveElementOptions(this.datasetElementType.id,t)}resolveDataElementOptions(t,e){return this._resolveElementOptions(this.dataElementType.id,e,t)}_resolveElementOptions(t,e="default",i){const s="active"===e,n=this._cachedDataOpts,o=t+"-"+e,a=n[o],r=this.enableOptionSharing&&k(i);if(a)return Ws(a,r);const l=this.chart.config,h=l.datasetElementScopeKeys(this._type,t),c=s?[`${t}Hover`,"hover",t,""]:[t,""],d=l.getOptionScopes(this.getDataset(),h),u=Object.keys(ue.elements[t]),f=l.resolveNamedOptions(d,u,(()=>this.getContext(i,s,e)),c);return f.$shared&&(f.$shared=r,n[o]=Object.freeze(Ws(f,r))),f}_resolveAnimations(t,e,i){const s=this.chart,n=this._cachedDataOpts,o=`animation-${e}`,a=n[o];if(a)return a;let r;if(!1!==s.options.animation){const s=this.chart.config,n=s.datasetAnimationScopeKeys(this._type,e),o=s.getOptionScopes(this.getDataset(),n);r=s.createResolver(o,this.getContext(t,i,e))}const l=new Os(s,r&&r.animations);return r&&r._cacheable&&(n[o]=Object.freeze(l)),l}getSharedOptions(t){if(t.$shared)return this._sharedOptions||(this._sharedOptions=Object.assign({},t))}includeOptions(t,e){return!e||Bs(t)||this.chart._animationsDisabled}_getSharedOptions(t,e){const i=this.resolveDataElementOptions(t,e),s=this._sharedOptions,n=this.getSharedOptions(i),o=this.includeOptions(e,n)||n!==s;return this.updateSharedOptions(n,e,i),{sharedOptions:n,includeOptions:o}}updateElement(t,e,i,s){Bs(s)?Object.assign(t,i):this._resolveAnimations(e,s).update(t,i)}updateSharedOptions(t,e,i){t&&!Bs(e)&&this._resolveAnimations(void 0,e).update(t,i)}_setStyle(t,e,i,s){t.active=s;const n=this.getStyle(e,s);this._resolveAnimations(e,i,s).update(t,{options:!s&&this.getSharedOptions(n)||n})}removeHoverStyle(t,e,i){this._setStyle(t,i,"active",!1)}setHoverStyle(t,e,i){this._setStyle(t,i,"active",!0)}_removeDatasetHoverStyle(){const t=this._cachedMeta.dataset;t&&this._setStyle(t,void 0,"active",!1)}_setDatasetHoverStyle(){const t=this._cachedMeta.dataset;t&&this._setStyle(t,void 0,"active",!0)}_resyncElements(t){const e=this._data,i=this._cachedMeta.data;for(const[t,e,i]of this._syncList)this[t](e,i);this._syncList=[];const s=i.length,n=e.length,o=Math.min(n,s);o&&this.parse(0,o),n>s?this._insertElements(s,n-s,t):n<s&&this._removeElements(n,s-n)}_insertElements(t,e,i=!0){const s=this._cachedMeta,n=s.data,o=t+e;let a;const r=t=>{for(t.length+=e,a=t.length-1;a>=o;a--)t[a]=t[a-e]};for(r(n),a=t;a<o;++a)n[a]=new this.dataElementType;this._parsing&&r(s._parsed),this.parse(t,e),i&&this.updateElements(n,t,e,"reset")}updateElements(t,e,i,s){}_removeElements(t,e){const i=this._cachedMeta;if(this._parsing){const s=i._parsed.splice(t,e);i._stacked&&Vs(i,s)}i.data.splice(t,e)}_sync(t){if(this._parsing)this._syncList.push(t);else{const[e,i,s]=t;this[e](i,s)}this.chart._dataChanges.push([this.index,...t])}_onDataPush(){const t=arguments.length;this._sync(["_insertElements",this.getDataset().data.length-t,t])}_onDataPop(){this._sync(["_removeElements",this._cachedMeta.data.length-1,1])}_onDataShift(){this._sync(["_removeElements",0,1])}_onDataSplice(t,e){e&&this._sync(["_removeElements",t,e]);const i=arguments.length-2;i&&this._sync(["_insertElements",t,i])}_onDataUnshift(){this._sync(["_insertElements",0,arguments.length])}}class Hs{static defaults={};static defaultRoutes=void 0;x;y;active=!1;options;$animations;tooltipPosition(t){const{x:e,y:i}=this.getProps(["x","y"],t);return{x:e,y:i}}hasValue(){return N(this.x)&&N(this.y)}getProps(t,e){const i=this.$animations;if(!e||!i)return this;const s={};return t.forEach((t=>{s[t]=i[t]&&i[t].active()?i[t]._to:this[t]})),s}}function js(t,e){const i=t.options.ticks,n=function(t){const e=t.options.offset,i=t._tickSize(),s=t._length/i+(e?0:1),n=t._maxLength/i;return Math.floor(Math.min(s,n))}(t),o=Math.min(i.maxTicksLimit||n,n),a=i.major.enabled?function(t){const e=[];let i,s;for(i=0,s=t.length;i<s;i++)t[i].major&&e.push(i);return e}(e):[],r=a.length,l=a[0],h=a[r-1],c=[];if(r>o)return function(t,e,i,s){let n,o=0,a=i[0];for(s=Math.ceil(s),n=0;n<t.length;n++)n===a&&(e.push(t[n]),o++,a=i[o*s])}(e,c,a,r/o),c;const d=function(t,e,i){const s=function(t){const e=t.length;let i,s;if(e<2)return!1;for(s=t[0],i=1;i<e;++i)if(t[i]-t[i-1]!==s)return!1;return s}(t),n=e.length/i;if(!s)return Math.max(n,1);const o=W(s);for(let t=0,e=o.length-1;t<e;t++){const e=o[t];if(e>n)return e}return Math.max(n,1)}(a,e,o);if(r>0){let t,i;const n=r>1?Math.round((h-l)/(r-1)):null;for($s(e,c,d,s(n)?0:l-n,l),t=0,i=r-1;t<i;t++)$s(e,c,d,a[t],a[t+1]);return $s(e,c,d,h,s(n)?e.length:h+n),c}return $s(e,c,d),c}function $s(t,e,i,s,n){const o=l(s,0),a=Math.min(l(n,t.length),t.length);let r,h,c,d=0;for(i=Math.ceil(i),n&&(r=n-s,i=r/Math.floor(r/i)),c=o;c<0;)d++,c=Math.round(o+d*i);for(h=Math.max(o,0);h<a;h++)h===c&&(e.push(t[h]),d++,c=Math.round(o+d*i))}const Ys=(t,e,i)=>"top"===e||"left"===e?t[e]+i:t[e]-i,Us=(t,e)=>Math.min(e||t,t);function Xs(t,e){const i=[],s=t.length/e,n=t.length;let o=0;for(;o<n;o+=s)i.push(t[Math.floor(o)]);return i}function qs(t,e,i){const s=t.ticks.length,n=Math.min(e,s-1),o=t._startPixel,a=t._endPixel,r=1e-6;let l,h=t.getPixelForTick(n);if(!(i&&(l=1===s?Math.max(h-o,a-h):0===e?(t.getPixelForTick(1)-h)/2:(h-t.getPixelForTick(n-1))/2,h+=n<e?l:-l,h<o-r||h>a+r)))return h}function Ks(t){return t.drawTicks?t.tickLength:0}function Gs(t,e){if(!t.display)return 0;const i=Si(t.font,e),s=ki(t.padding);return(n(t.text)?t.text.length:1)*i.lineHeight+s.height}function Zs(t,e,i){let s=ut(t);return(i&&"right"!==e||!i&&"right"===e)&&(s=(t=>"left"===t?"right":"right"===t?"left":t)(s)),s}class Js extends Hs{constructor(t){super(),this.id=t.id,this.type=t.type,this.options=void 0,this.ctx=t.ctx,this.chart=t.chart,this.top=void 0,this.bottom=void 0,this.left=void 0,this.right=void 0,this.width=void 0,this.height=void 0,this._margins={left:0,right:0,top:0,bottom:0},this.maxWidth=void 0,this.maxHeight=void 0,this.paddingTop=void 0,this.paddingBottom=void 0,this.paddingLeft=void 0,this.paddingRight=void 0,this.axis=void 0,this.labelRotation=void 0,this.min=void 0,this.max=void 0,this._range=void 0,this.ticks=[],this._gridLineItems=null,this._labelItems=null,this._labelSizes=null,this._length=0,this._maxLength=0,this._longestTextCache={},this._startPixel=void 0,this._endPixel=void 0,this._reversePixels=!1,this._userMax=void 0,this._userMin=void 0,this._suggestedMax=void 0,this._suggestedMin=void 0,this._ticksLength=0,this._borderValue=0,this._cache={},this._dataLimitsCached=!1,this.$context=void 0}init(t){this.options=t.setContext(this.getContext()),this.axis=t.axis,this._userMin=this.parse(t.min),this._userMax=this.parse(t.max),this._suggestedMin=this.parse(t.suggestedMin),this._suggestedMax=this.parse(t.suggestedMax)}parse(t,e){return t}getUserBounds(){let{_userMin:t,_userMax:e,_suggestedMin:i,_suggestedMax:s}=this;return t=r(t,Number.POSITIVE_INFINITY),e=r(e,Number.NEGATIVE_INFINITY),i=r(i,Number.POSITIVE_INFINITY),s=r(s,Number.NEGATIVE_INFINITY),{min:r(t,i),max:r(e,s),minDefined:a(t),maxDefined:a(e)}}getMinMax(t){let e,{min:i,max:s,minDefined:n,maxDefined:o}=this.getUserBounds();if(n&&o)return{min:i,max:s};const a=this.getMatchingVisibleMetas();for(let r=0,l=a.length;r<l;++r)e=a[r].controller.getMinMax(this,t),n||(i=Math.min(i,e.min)),o||(s=Math.max(s,e.max));return i=o&&i>s?s:i,s=n&&i>s?i:s,{min:r(i,r(s,i)),max:r(s,r(i,s))}}getPadding(){return{left:this.paddingLeft||0,top:this.paddingTop||0,right:this.paddingRight||0,bottom:this.paddingBottom||0}}getTicks(){return this.ticks}getLabels(){const t=this.chart.data;return this.options.labels||(this.isHorizontal()?t.xLabels:t.yLabels)||t.labels||[]}getLabelItems(t=this.chart.chartArea){return this._labelItems||(this._labelItems=this._computeLabelItems(t))}beforeLayout(){this._cache={},this._dataLimitsCached=!1}beforeUpdate(){d(this.options.beforeUpdate,[this])}update(t,e,i){const{beginAtZero:s,grace:n,ticks:o}=this.options,a=o.sampleSize;this.beforeUpdate(),this.maxWidth=t,this.maxHeight=e,this._margins=i=Object.assign({left:0,right:0,top:0,bottom:0},i),this.ticks=null,this._labelSizes=null,this._gridLineItems=null,this._labelItems=null,this.beforeSetDimensions(),this.setDimensions(),this.afterSetDimensions(),this._maxLength=this.isHorizontal()?this.width+i.left+i.right:this.height+i.top+i.bottom,this._dataLimitsCached||(this.beforeDataLimits(),this.determineDataLimits(),this.afterDataLimits(),this._range=Di(this,n,s),this._dataLimitsCached=!0),this.beforeBuildTicks(),this.ticks=this.buildTicks()||[],this.afterBuildTicks();const r=a<this.ticks.length;this._convertTicksToLabels(r?Xs(this.ticks,a):this.ticks),this.configure(),this.beforeCalculateLabelRotation(),this.calculateLabelRotation(),this.afterCalculateLabelRotation(),o.display&&(o.autoSkip||"auto"===o.source)&&(this.ticks=js(this,this.ticks),this._labelSizes=null,this.afterAutoSkip()),r&&this._convertTicksToLabels(this.ticks),this.beforeFit(),this.fit(),this.afterFit(),this.afterUpdate()}configure(){let t,e,i=this.options.reverse;this.isHorizontal()?(t=this.left,e=this.right):(t=this.top,e=this.bottom,i=!i),this._startPixel=t,this._endPixel=e,this._reversePixels=i,this._length=e-t,this._alignToPixels=this.options.alignToPixels}afterUpdate(){d(this.options.afterUpdate,[this])}beforeSetDimensions(){d(this.options.beforeSetDimensions,[this])}setDimensions(){this.isHorizontal()?(this.width=this.maxWidth,this.left=0,this.right=this.width):(this.height=this.maxHeight,this.top=0,this.bottom=this.height),this.paddingLeft=0,this.paddingTop=0,this.paddingRight=0,this.paddingBottom=0}afterSetDimensions(){d(this.options.afterSetDimensions,[this])}_callHooks(t){this.chart.notifyPlugins(t,this.getContext()),d(this.options[t],[this])}beforeDataLimits(){this._callHooks("beforeDataLimits")}determineDataLimits(){}afterDataLimits(){this._callHooks("afterDataLimits")}beforeBuildTicks(){this._callHooks("beforeBuildTicks")}buildTicks(){return[]}afterBuildTicks(){this._callHooks("afterBuildTicks")}beforeTickToLabelConversion(){d(this.options.beforeTickToLabelConversion,[this])}generateTickLabels(t){const e=this.options.ticks;let i,s,n;for(i=0,s=t.length;i<s;i++)n=t[i],n.label=d(e.callback,[n.value,i,t],this)}afterTickToLabelConversion(){d(this.options.afterTickToLabelConversion,[this])}beforeCalculateLabelRotation(){d(this.options.beforeCalculateLabelRotation,[this])}calculateLabelRotation(){const t=this.options,e=t.ticks,i=Us(this.ticks.length,t.ticks.maxTicksLimit),s=e.minRotation||0,n=e.maxRotation;let o,a,r,l=s;if(!this._isVisible()||!e.display||s>=n||i<=1||!this.isHorizontal())return void(this.labelRotation=s);const h=this._getLabelSizes(),c=h.widest.width,d=h.highest.height,u=J(this.chart.width-c,0,this.maxWidth);o=t.offset?this.maxWidth/i:u/(i-1),c+6>o&&(o=u/(i-(t.offset?.5:1)),a=this.maxHeight-Ks(t.grid)-e.padding-Gs(t.title,this.chart.options.font),r=Math.sqrt(c*c+d*d),l=Y(Math.min(Math.asin(J((h.highest.height+6)/o,-1,1)),Math.asin(J(a/r,-1,1))-Math.asin(J(d/r,-1,1)))),l=Math.max(s,Math.min(n,l))),this.labelRotation=l}afterCalculateLabelRotation(){d(this.options.afterCalculateLabelRotation,[this])}afterAutoSkip(){}beforeFit(){d(this.options.beforeFit,[this])}fit(){const t={width:0,height:0},{chart:e,options:{ticks:i,title:s,grid:n}}=this,o=this._isVisible(),a=this.isHorizontal();if(o){const o=Gs(s,e.options.font);if(a?(t.width=this.maxWidth,t.height=Ks(n)+o):(t.height=this.maxHeight,t.width=Ks(n)+o),i.display&&this.ticks.length){const{first:e,last:s,widest:n,highest:o}=this._getLabelSizes(),r=2*i.padding,l=$(this.labelRotation),h=Math.cos(l),c=Math.sin(l);if(a){const e=i.mirror?0:c*n.width+h*o.height;t.height=Math.min(this.maxHeight,t.height+e+r)}else{const e=i.mirror?0:h*n.width+c*o.height;t.width=Math.min(this.maxWidth,t.width+e+r)}this._calculatePadding(e,s,c,h)}}this._handleMargins(),a?(this.width=this._length=e.width-this._margins.left-this._margins.right,this.height=t.height):(this.width=t.width,this.height=this._length=e.height-this._margins.top-this._margins.bottom)}_calculatePadding(t,e,i,s){const{ticks:{align:n,padding:o},position:a}=this.options,r=0!==this.labelRotation,l="top"!==a&&"x"===this.axis;if(this.isHorizontal()){const a=this.getPixelForTick(0)-this.left,h=this.right-this.getPixelForTick(this.ticks.length-1);let c=0,d=0;r?l?(c=s*t.width,d=i*e.height):(c=i*t.height,d=s*e.width):"start"===n?d=e.width:"end"===n?c=t.width:"inner"!==n&&(c=t.width/2,d=e.width/2),this.paddingLeft=Math.max((c-a+o)*this.width/(this.width-a),0),this.paddingRight=Math.max((d-h+o)*this.width/(this.width-h),0)}else{let i=e.height/2,s=t.height/2;"start"===n?(i=0,s=t.height):"end"===n&&(i=e.height,s=0),this.paddingTop=i+o,this.paddingBottom=s+o}}_handleMargins(){this._margins&&(this._margins.left=Math.max(this.paddingLeft,this._margins.left),this._margins.top=Math.max(this.paddingTop,this._margins.top),this._margins.right=Math.max(this.paddingRight,this._margins.right),this._margins.bottom=Math.max(this.paddingBottom,this._margins.bottom))}afterFit(){d(this.options.afterFit,[this])}isHorizontal(){const{axis:t,position:e}=this.options;return"top"===e||"bottom"===e||"x"===t}isFullSize(){return this.options.fullSize}_convertTicksToLabels(t){let e,i;for(this.beforeTickToLabelConversion(),this.generateTickLabels(t),e=0,i=t.length;e<i;e++)s(t[e].label)&&(t.splice(e,1),i--,e--);this.afterTickToLabelConversion()}_getLabelSizes(){let t=this._labelSizes;if(!t){const e=this.options.ticks.sampleSize;let i=this.ticks;e<i.length&&(i=Xs(i,e)),this._labelSizes=t=this._computeLabelSizes(i,i.length,this.options.ticks.maxTicksLimit)}return t}_computeLabelSizes(t,e,i){const{ctx:o,_longestTextCache:a}=this,r=[],l=[],h=Math.floor(e/Us(e,i));let c,d,f,g,p,m,b,x,_,y,v,M=0,w=0;for(c=0;c<e;c+=h){if(g=t[c].label,p=this._resolveTickFontOptions(c),o.font=m=p.string,b=a[m]=a[m]||{data:{},gc:[]},x=p.lineHeight,_=y=0,s(g)||n(g)){if(n(g))for(d=0,f=g.length;d<f;++d)v=g[d],s(v)||n(v)||(_=Ce(o,b.data,b.gc,_,v),y+=x)}else _=Ce(o,b.data,b.gc,_,g),y=x;r.push(_),l.push(y),M=Math.max(_,M),w=Math.max(y,w)}!function(t,e){u(t,(t=>{const i=t.gc,s=i.length/2;let n;if(s>e){for(n=0;n<s;++n)delete t.data[i[n]];i.splice(0,s)}}))}(a,e);const k=r.indexOf(M),S=l.indexOf(w),P=t=>({width:r[t]||0,height:l[t]||0});return{first:P(0),last:P(e-1),widest:P(k),highest:P(S),widths:r,heights:l}}getLabelForValue(t){return t}getPixelForValue(t,e){return NaN}getValueForPixel(t){}getPixelForTick(t){const e=this.ticks;return t<0||t>e.length-1?null:this.getPixelForValue(e[t].value)}getPixelForDecimal(t){this._reversePixels&&(t=1-t);const e=this._startPixel+t*this._length;return Q(this._alignToPixels?Ae(this.chart,e,0):e)}getDecimalForPixel(t){const e=(t-this._startPixel)/this._length;return this._reversePixels?1-e:e}getBasePixel(){return this.getPixelForValue(this.getBaseValue())}getBaseValue(){const{min:t,max:e}=this;return t<0&&e<0?e:t>0&&e>0?t:0}getContext(t){const e=this.ticks||[];if(t>=0&&t<e.length){const i=e[t];return i.$context||(i.$context=function(t,e,i){return Ci(t,{tick:i,index:e,type:"tick"})}(this.getContext(),t,i))}return this.$context||(this.$context=Ci(this.chart.getContext(),{scale:this,type:"scale"}))}_tickSize(){const t=this.options.ticks,e=$(this.labelRotation),i=Math.abs(Math.cos(e)),s=Math.abs(Math.sin(e)),n=this._getLabelSizes(),o=t.autoSkipPadding||0,a=n?n.widest.width+o:0,r=n?n.highest.height+o:0;return this.isHorizontal()?r*i>a*s?a/i:r/s:r*s<a*i?r/i:a/s}_isVisible(){const t=this.options.display;return"auto"!==t?!!t:this.getMatchingVisibleMetas().length>0}_computeGridLineItems(t){const e=this.axis,i=this.chart,s=this.options,{grid:n,position:a,border:r}=s,h=n.offset,c=this.isHorizontal(),d=this.ticks.length+(h?1:0),u=Ks(n),f=[],g=r.setContext(this.getContext()),p=g.display?g.width:0,m=p/2,b=function(t){return Ae(i,t,p)};let x,_,y,v,M,w,k,S,P,D,C,O;if("top"===a)x=b(this.bottom),w=this.bottom-u,S=x-m,D=b(t.top)+m,O=t.bottom;else if("bottom"===a)x=b(this.top),D=t.top,O=b(t.bottom)-m,w=x+m,S=this.top+u;else if("left"===a)x=b(this.right),M=this.right-u,k=x-m,P=b(t.left)+m,C=t.right;else if("right"===a)x=b(this.left),P=t.left,C=b(t.right)-m,M=x+m,k=this.left+u;else if("x"===e){if("center"===a)x=b((t.top+t.bottom)/2+.5);else if(o(a)){const t=Object.keys(a)[0],e=a[t];x=b(this.chart.scales[t].getPixelForValue(e))}D=t.top,O=t.bottom,w=x+m,S=w+u}else if("y"===e){if("center"===a)x=b((t.left+t.right)/2);else if(o(a)){const t=Object.keys(a)[0],e=a[t];x=b(this.chart.scales[t].getPixelForValue(e))}M=x-m,k=M-u,P=t.left,C=t.right}const A=l(s.ticks.maxTicksLimit,d),T=Math.max(1,Math.ceil(d/A));for(_=0;_<d;_+=T){const t=this.getContext(_),e=n.setContext(t),s=r.setContext(t),o=e.lineWidth,a=e.color,l=s.dash||[],d=s.dashOffset,u=e.tickWidth,g=e.tickColor,p=e.tickBorderDash||[],m=e.tickBorderDashOffset;y=qs(this,_,h),void 0!==y&&(v=Ae(i,y,o),c?M=k=P=C=v:w=S=D=O=v,f.push({tx1:M,ty1:w,tx2:k,ty2:S,x1:P,y1:D,x2:C,y2:O,width:o,color:a,borderDash:l,borderDashOffset:d,tickWidth:u,tickColor:g,tickBorderDash:p,tickBorderDashOffset:m}))}return this._ticksLength=d,this._borderValue=x,f}_computeLabelItems(t){const e=this.axis,i=this.options,{position:s,ticks:a}=i,r=this.isHorizontal(),l=this.ticks,{align:h,crossAlign:c,padding:d,mirror:u}=a,f=Ks(i.grid),g=f+d,p=u?-d:g,m=-$(this.labelRotation),b=[];let x,_,y,v,M,w,k,S,P,D,C,O,A="middle";if("top"===s)w=this.bottom-p,k=this._getXAxisLabelAlignment();else if("bottom"===s)w=this.top+p,k=this._getXAxisLabelAlignment();else if("left"===s){const t=this._getYAxisLabelAlignment(f);k=t.textAlign,M=t.x}else if("right"===s){const t=this._getYAxisLabelAlignment(f);k=t.textAlign,M=t.x}else if("x"===e){if("center"===s)w=(t.top+t.bottom)/2+g;else if(o(s)){const t=Object.keys(s)[0],e=s[t];w=this.chart.scales[t].getPixelForValue(e)+g}k=this._getXAxisLabelAlignment()}else if("y"===e){if("center"===s)M=(t.left+t.right)/2-g;else if(o(s)){const t=Object.keys(s)[0],e=s[t];M=this.chart.scales[t].getPixelForValue(e)}k=this._getYAxisLabelAlignment(f).textAlign}"y"===e&&("start"===h?A="top":"end"===h&&(A="bottom"));const T=this._getLabelSizes();for(x=0,_=l.length;x<_;++x){y=l[x],v=y.label;const t=a.setContext(this.getContext(x));S=this.getPixelForTick(x)+a.labelOffset,P=this._resolveTickFontOptions(x),D=P.lineHeight,C=n(v)?v.length:1;const e=C/2,i=t.color,o=t.textStrokeColor,h=t.textStrokeWidth;let d,f=k;if(r?(M=S,"inner"===k&&(f=x===_-1?this.options.reverse?"left":"right":0===x?this.options.reverse?"right":"left":"center"),O="top"===s?"near"===c||0!==m?-C*D+D/2:"center"===c?-T.highest.height/2-e*D+D:-T.highest.height+D/2:"near"===c||0!==m?D/2:"center"===c?T.highest.height/2-e*D:T.highest.height-C*D,u&&(O*=-1),0===m||t.showLabelBackdrop||(M+=D/2*Math.sin(m))):(w=S,O=(1-C)*D/2),t.showLabelBackdrop){const e=ki(t.backdropPadding),i=T.heights[x],s=T.widths[x];let n=O-e.top,o=0-e.left;switch(A){case"middle":n-=i/2;break;case"bottom":n-=i}switch(k){case"center":o-=s/2;break;case"right":o-=s;break;case"inner":x===_-1?o-=s:x>0&&(o-=s/2)}d={left:o,top:n,width:s+e.width,height:i+e.height,color:t.backdropColor}}b.push({label:v,font:P,textOffset:O,options:{rotation:m,color:i,strokeColor:o,strokeWidth:h,textAlign:f,textBaseline:A,translation:[M,w],backdrop:d}})}return b}_getXAxisLabelAlignment(){const{position:t,ticks:e}=this.options;if(-$(this.labelRotation))return"top"===t?"left":"right";let i="center";return"start"===e.align?i="left":"end"===e.align?i="right":"inner"===e.align&&(i="inner"),i}_getYAxisLabelAlignment(t){const{position:e,ticks:{crossAlign:i,mirror:s,padding:n}}=this.options,o=t+n,a=this._getLabelSizes().widest.width;let r,l;return"left"===e?s?(l=this.right+n,"near"===i?r="left":"center"===i?(r="center",l+=a/2):(r="right",l+=a)):(l=this.right-o,"near"===i?r="right":"center"===i?(r="center",l-=a/2):(r="left",l=this.left)):"right"===e?s?(l=this.left+n,"near"===i?r="right":"center"===i?(r="center",l-=a/2):(r="left",l-=a)):(l=this.left+o,"near"===i?r="left":"center"===i?(r="center",l+=a/2):(r="right",l=this.right)):r="right",{textAlign:r,x:l}}_computeLabelArea(){if(this.options.ticks.mirror)return;const t=this.chart,e=this.options.position;return"left"===e||"right"===e?{top:0,left:this.left,bottom:t.height,right:this.right}:"top"===e||"bottom"===e?{top:this.top,left:0,bottom:this.bottom,right:t.width}:void 0}drawBackground(){const{ctx:t,options:{backgroundColor:e},left:i,top:s,width:n,height:o}=this;e&&(t.save(),t.fillStyle=e,t.fillRect(i,s,n,o),t.restore())}getLineWidthForValue(t){const e=this.options.grid;if(!this._isVisible()||!e.display)return 0;const i=this.ticks.findIndex((e=>e.value===t));if(i>=0){return e.setContext(this.getContext(i)).lineWidth}return 0}drawGrid(t){const e=this.options.grid,i=this.ctx,s=this._gridLineItems||(this._gridLineItems=this._computeGridLineItems(t));let n,o;const a=(t,e,s)=>{s.width&&s.color&&(i.save(),i.lineWidth=s.width,i.strokeStyle=s.color,i.setLineDash(s.borderDash||[]),i.lineDashOffset=s.borderDashOffset,i.beginPath(),i.moveTo(t.x,t.y),i.lineTo(e.x,e.y),i.stroke(),i.restore())};if(e.display)for(n=0,o=s.length;n<o;++n){const t=s[n];e.drawOnChartArea&&a({x:t.x1,y:t.y1},{x:t.x2,y:t.y2},t),e.drawTicks&&a({x:t.tx1,y:t.ty1},{x:t.tx2,y:t.ty2},{color:t.tickColor,width:t.tickWidth,borderDash:t.tickBorderDash,borderDashOffset:t.tickBorderDashOffset})}}drawBorder(){const{chart:t,ctx:e,options:{border:i,grid:s}}=this,n=i.setContext(this.getContext()),o=i.display?n.width:0;if(!o)return;const a=s.setContext(this.getContext(0)).lineWidth,r=this._borderValue;let l,h,c,d;this.isHorizontal()?(l=Ae(t,this.left,o)-o/2,h=Ae(t,this.right,a)+a/2,c=d=r):(c=Ae(t,this.top,o)-o/2,d=Ae(t,this.bottom,a)+a/2,l=h=r),e.save(),e.lineWidth=n.width,e.strokeStyle=n.color,e.beginPath(),e.moveTo(l,c),e.lineTo(h,d),e.stroke(),e.restore()}drawLabels(t){if(!this.options.ticks.display)return;const e=this.ctx,i=this._computeLabelArea();i&&Ie(e,i);const s=this.getLabelItems(t);for(const t of s){const i=t.options,s=t.font;Ne(e,t.label,0,t.textOffset,s,i)}i&&ze(e)}drawTitle(){const{ctx:t,options:{position:e,title:i,reverse:s}}=this;if(!i.display)return;const a=Si(i.font),r=ki(i.padding),l=i.align;let h=a.lineHeight/2;"bottom"===e||"center"===e||o(e)?(h+=r.bottom,n(i.text)&&(h+=a.lineHeight*(i.text.length-1))):h+=r.top;const{titleX:c,titleY:d,maxWidth:u,rotation:f}=function(t,e,i,s){const{top:n,left:a,bottom:r,right:l,chart:h}=t,{chartArea:c,scales:d}=h;let u,f,g,p=0;const m=r-n,b=l-a;if(t.isHorizontal()){if(f=ft(s,a,l),o(i)){const t=Object.keys(i)[0],s=i[t];g=d[t].getPixelForValue(s)+m-e}else g="center"===i?(c.bottom+c.top)/2+m-e:Ys(t,i,e);u=l-a}else{if(o(i)){const t=Object.keys(i)[0],s=i[t];f=d[t].getPixelForValue(s)-b+e}else f="center"===i?(c.left+c.right)/2-b+e:Ys(t,i,e);g=ft(s,r,n),p="left"===i?-E:E}return{titleX:f,titleY:g,maxWidth:u,rotation:p}}(this,h,e,l);Ne(t,i.text,0,0,a,{color:i.color,maxWidth:u,rotation:f,textAlign:Zs(l,e,s),textBaseline:"middle",translation:[c,d]})}draw(t){this._isVisible()&&(this.drawBackground(),this.drawGrid(t),this.drawBorder(),this.drawTitle(),this.drawLabels(t))}_layers(){const t=this.options,e=t.ticks&&t.ticks.z||0,i=l(t.grid&&t.grid.z,-1),s=l(t.border&&t.border.z,0);return this._isVisible()&&this.draw===Js.prototype.draw?[{z:i,draw:t=>{this.drawBackground(),this.drawGrid(t),this.drawTitle()}},{z:s,draw:()=>{this.drawBorder()}},{z:e,draw:t=>{this.drawLabels(t)}}]:[{z:e,draw:t=>{this.draw(t)}}]}getMatchingVisibleMetas(t){const e=this.chart.getSortedVisibleDatasetMetas(),i=this.axis+"AxisID",s=[];let n,o;for(n=0,o=e.length;n<o;++n){const o=e[n];o[i]!==this.id||t&&o.type!==t||s.push(o)}return s}_resolveTickFontOptions(t){return Si(this.options.ticks.setContext(this.getContext(t)).font)}_maxDigits(){const t=this._resolveTickFontOptions(0).lineHeight;return(this.isHorizontal()?this.width:this.height)/t}}class Qs{constructor(t,e,i){this.type=t,this.scope=e,this.override=i,this.items=Object.create(null)}isForType(t){return Object.prototype.isPrototypeOf.call(this.type.prototype,t.prototype)}register(t){const e=Object.getPrototypeOf(t);let i;(function(t){return"id"in t&&"defaults"in t})(e)&&(i=this.register(e));const s=this.items,n=t.id,o=this.scope+"."+n;if(!n)throw new Error("class does not have id: "+t);return n in s||(s[n]=t,function(t,e,i){const s=b(Object.create(null),[i?ue.get(i):{},ue.get(e),t.defaults]);ue.set(e,s),t.defaultRoutes&&function(t,e){Object.keys(e).forEach((i=>{const s=i.split("."),n=s.pop(),o=[t].concat(s).join("."),a=e[i].split("."),r=a.pop(),l=a.join(".");ue.route(o,n,l,r)}))}(e,t.defaultRoutes);t.descriptors&&ue.describe(e,t.descriptors)}(t,o,i),this.override&&ue.override(t.id,t.overrides)),o}get(t){return this.items[t]}unregister(t){const e=this.items,i=t.id,s=this.scope;i in e&&delete e[i],s&&i in ue[s]&&(delete ue[s][i],this.override&&delete re[i])}}class tn{constructor(){this.controllers=new Qs(Ns,"datasets",!0),this.elements=new Qs(Hs,"elements"),this.plugins=new Qs(Object,"plugins"),this.scales=new Qs(Js,"scales"),this._typedRegistries=[this.controllers,this.scales,this.elements]}add(...t){this._each("register",t)}remove(...t){this._each("unregister",t)}addControllers(...t){this._each("register",t,this.controllers)}addElements(...t){this._each("register",t,this.elements)}addPlugins(...t){this._each("register",t,this.plugins)}addScales(...t){this._each("register",t,this.scales)}getController(t){return this._get(t,this.controllers,"controller")}getElement(t){return this._get(t,this.elements,"element")}getPlugin(t){return this._get(t,this.plugins,"plugin")}getScale(t){return this._get(t,this.scales,"scale")}removeControllers(...t){this._each("unregister",t,this.controllers)}removeElements(...t){this._each("unregister",t,this.elements)}removePlugins(...t){this._each("unregister",t,this.plugins)}removeScales(...t){this._each("unregister",t,this.scales)}_each(t,e,i){[...e].forEach((e=>{const s=i||this._getRegistryForType(e);i||s.isForType(e)||s===this.plugins&&e.id?this._exec(t,s,e):u(e,(e=>{const s=i||this._getRegistryForType(e);this._exec(t,s,e)}))}))}_exec(t,e,i){const s=w(t);d(i["before"+s],[],i),e[t](i),d(i["after"+s],[],i)}_getRegistryForType(t){for(let e=0;e<this._typedRegistries.length;e++){const i=this._typedRegistries[e];if(i.isForType(t))return i}return this.plugins}_get(t,e,i){const s=e.get(t);if(void 0===s)throw new Error('"'+t+'" is not a registered '+i+".");return s}}var en=new tn;class sn{constructor(){this._init=[]}notify(t,e,i,s){"beforeInit"===e&&(this._init=this._createDescriptors(t,!0),this._notify(this._init,t,"install"));const n=s?this._descriptors(t).filter(s):this._descriptors(t),o=this._notify(n,t,e,i);return"afterDestroy"===e&&(this._notify(n,t,"stop"),this._notify(this._init,t,"uninstall")),o}_notify(t,e,i,s){s=s||{};for(const n of t){const t=n.plugin;if(!1===d(t[i],[e,s,n.options],t)&&s.cancelable)return!1}return!0}invalidate(){s(this._cache)||(this._oldCache=this._cache,this._cache=void 0)}_descriptors(t){if(this._cache)return this._cache;const e=this._cache=this._createDescriptors(t);return this._notifyStateChanges(t),e}_createDescriptors(t,e){const i=t&&t.config,s=l(i.options&&i.options.plugins,{}),n=function(t){const e={},i=[],s=Object.keys(en.plugins.items);for(let t=0;t<s.length;t++)i.push(en.getPlugin(s[t]));const n=t.plugins||[];for(let t=0;t<n.length;t++){const s=n[t];-1===i.indexOf(s)&&(i.push(s),e[s.id]=!0)}return{plugins:i,localIds:e}}(i);return!1!==s||e?function(t,{plugins:e,localIds:i},s,n){const o=[],a=t.getContext();for(const r of e){const e=r.id,l=nn(s[e],n);null!==l&&o.push({plugin:r,options:on(t.config,{plugin:r,local:i[e]},l,a)})}return o}(t,n,s,e):[]}_notifyStateChanges(t){const e=this._oldCache||[],i=this._cache,s=(t,e)=>t.filter((t=>!e.some((e=>t.plugin.id===e.plugin.id))));this._notify(s(e,i),t,"stop"),this._notify(s(i,e),t,"start")}}function nn(t,e){return e||!1!==t?!0===t?{}:t:null}function on(t,{plugin:e,local:i},s,n){const o=t.pluginScopeKeys(e),a=t.getOptionScopes(s,o);return i&&e.defaults&&a.push(e.defaults),t.createResolver(a,n,[""],{scriptable:!1,indexable:!1,allKeys:!0})}function an(t,e){const i=ue.datasets[t]||{};return((e.datasets||{})[t]||{}).indexAxis||e.indexAxis||i.indexAxis||"x"}function rn(t){if("x"===t||"y"===t||"r"===t)return t}function ln(t,...e){if(rn(t))return t;for(const s of e){const e=s.axis||("top"===(i=s.position)||"bottom"===i?"x":"left"===i||"right"===i?"y":void 0)||t.length>1&&rn(t[0].toLowerCase());if(e)return e}var i;throw new Error(`Cannot determine type of '${t}' axis. Please provide 'axis' or 'position' option.`)}function hn(t,e,i){if(i[e+"AxisID"]===t)return{axis:e}}function cn(t,e){const i=re[t.type]||{scales:{}},s=e.scales||{},n=an(t.type,e),a=Object.create(null);return Object.keys(s).forEach((e=>{const r=s[e];if(!o(r))return console.error(`Invalid scale configuration for scale: ${e}`);if(r._proxy)return console.warn(`Ignoring resolver passed as options for scale: ${e}`);const l=ln(e,r,function(t,e){if(e.data&&e.data.datasets){const i=e.data.datasets.filter((e=>e.xAxisID===t||e.yAxisID===t));if(i.length)return hn(t,"x",i[0])||hn(t,"y",i[0])}return{}}(e,t),ue.scales[r.type]),h=function(t,e){return t===e?"_index_":"_value_"}(l,n),c=i.scales||{};a[e]=x(Object.create(null),[{axis:l},r,c[l],c[h]])})),t.data.datasets.forEach((i=>{const n=i.type||t.type,o=i.indexAxis||an(n,e),r=(re[n]||{}).scales||{};Object.keys(r).forEach((t=>{const e=function(t,e){let i=t;return"_index_"===t?i=e:"_value_"===t&&(i="x"===e?"y":"x"),i}(t,o),n=i[e+"AxisID"]||e;a[n]=a[n]||Object.create(null),x(a[n],[{axis:e},s[n],r[t]])}))})),Object.keys(a).forEach((t=>{const e=a[t];x(e,[ue.scales[e.type],ue.scale])})),a}function dn(t){const e=t.options||(t.options={});e.plugins=l(e.plugins,{}),e.scales=cn(t,e)}function un(t){return(t=t||{}).datasets=t.datasets||[],t.labels=t.labels||[],t}const fn=new Map,gn=new Set;function pn(t,e){let i=fn.get(t);return i||(i=e(),fn.set(t,i),gn.add(i)),i}const mn=(t,e,i)=>{const s=M(e,i);void 0!==s&&t.add(s)};class bn{constructor(t){this._config=function(t){return(t=t||{}).data=un(t.data),dn(t),t}(t),this._scopeCache=new Map,this._resolverCache=new Map}get platform(){return this._config.platform}get type(){return this._config.type}set type(t){this._config.type=t}get data(){return this._config.data}set data(t){this._config.data=un(t)}get options(){return this._config.options}set options(t){this._config.options=t}get plugins(){return this._config.plugins}update(){const t=this._config;this.clearCache(),dn(t)}clearCache(){this._scopeCache.clear(),this._resolverCache.clear()}datasetScopeKeys(t){return pn(t,(()=>[[`datasets.${t}`,""]]))}datasetAnimationScopeKeys(t,e){return pn(`${t}.transition.${e}`,(()=>[[`datasets.${t}.transitions.${e}`,`transitions.${e}`],[`datasets.${t}`,""]]))}datasetElementScopeKeys(t,e){return pn(`${t}-${e}`,(()=>[[`datasets.${t}.elements.${e}`,`datasets.${t}`,`elements.${e}`,""]]))}pluginScopeKeys(t){const e=t.id;return pn(`${this.type}-plugin-${e}`,(()=>[[`plugins.${e}`,...t.additionalOptionScopes||[]]]))}_cachedScopes(t,e){const i=this._scopeCache;let s=i.get(t);return s&&!e||(s=new Map,i.set(t,s)),s}getOptionScopes(t,e,i){const{options:s,type:n}=this,o=this._cachedScopes(t,i),a=o.get(e);if(a)return a;const r=new Set;e.forEach((e=>{t&&(r.add(t),e.forEach((e=>mn(r,t,e)))),e.forEach((t=>mn(r,s,t))),e.forEach((t=>mn(r,re[n]||{},t))),e.forEach((t=>mn(r,ue,t))),e.forEach((t=>mn(r,le,t)))}));const l=Array.from(r);return 0===l.length&&l.push(Object.create(null)),gn.has(e)&&o.set(e,l),l}chartOptionScopes(){const{options:t,type:e}=this;return[t,re[e]||{},ue.datasets[e]||{},{type:e},ue,le]}resolveNamedOptions(t,e,i,s=[""]){const o={$shared:!0},{resolver:a,subPrefixes:r}=xn(this._resolverCache,t,s);let l=a;if(function(t,e){const{isScriptable:i,isIndexable:s}=Ye(t);for(const o of e){const e=i(o),a=s(o),r=(a||e)&&t[o];if(e&&(S(r)||_n(r))||a&&n(r))return!0}return!1}(a,e)){o.$shared=!1;l=$e(a,i=S(i)?i():i,this.createResolver(t,i,r))}for(const t of e)o[t]=l[t];return o}createResolver(t,e,i=[""],s){const{resolver:n}=xn(this._resolverCache,t,i);return o(e)?$e(n,e,void 0,s):n}}function xn(t,e,i){let s=t.get(e);s||(s=new Map,t.set(e,s));const n=i.join();let o=s.get(n);if(!o){o={resolver:je(e,i),subPrefixes:i.filter((t=>!t.toLowerCase().includes("hover")))},s.set(n,o)}return o}const _n=t=>o(t)&&Object.getOwnPropertyNames(t).some((e=>S(t[e])));const yn=["top","bottom","left","right","chartArea"];function vn(t,e){return"top"===t||"bottom"===t||-1===yn.indexOf(t)&&"x"===e}function Mn(t,e){return function(i,s){return i[t]===s[t]?i[e]-s[e]:i[t]-s[t]}}function wn(t){const e=t.chart,i=e.options.animation;e.notifyPlugins("afterRender"),d(i&&i.onComplete,[t],e)}function kn(t){const e=t.chart,i=e.options.animation;d(i&&i.onProgress,[t],e)}function Sn(t){return fe()&&"string"==typeof t?t=document.getElementById(t):t&&t.length&&(t=t[0]),t&&t.canvas&&(t=t.canvas),t}const Pn={},Dn=t=>{const e=Sn(t);return Object.values(Pn).filter((t=>t.canvas===e)).pop()};function Cn(t,e,i){const s=Object.keys(t);for(const n of s){const s=+n;if(s>=e){const o=t[n];delete t[n],(i>0||s>e)&&(t[s+i]=o)}}}function On(t,e,i){return t.options.clip?t[i]:e[i]}class An{static defaults=ue;static instances=Pn;static overrides=re;static registry=en;static version="4.4.1";static getChart=Dn;static register(...t){en.add(...t),Tn()}static unregister(...t){en.remove(...t),Tn()}constructor(t,e){const s=this.config=new bn(e),n=Sn(t),o=Dn(n);if(o)throw new Error("Canvas is already in use. Chart with ID '"+o.id+"' must be destroyed before the canvas with ID '"+o.canvas.id+"' can be reused.");const a=s.createResolver(s.chartOptionScopes(),this.getContext());this.platform=new(s.platform||ks(n)),this.platform.updateConfig(s);const r=this.platform.acquireContext(n,a.aspectRatio),l=r&&r.canvas,h=l&&l.height,c=l&&l.width;this.id=i(),this.ctx=r,this.canvas=l,this.width=c,this.height=h,this._options=a,this._aspectRatio=this.aspectRatio,this._layers=[],this._metasets=[],this._stacks=void 0,this.boxes=[],this.currentDevicePixelRatio=void 0,this.chartArea=void 0,this._active=[],this._lastEvent=void 0,this._listeners={},this._responsiveListeners=void 0,this._sortedMetasets=[],this.scales={},this._plugins=new sn,this.$proxies={},this._hiddenIndices={},this.attached=!1,this._animationsDisabled=void 0,this.$context=void 0,this._doResize=dt((t=>this.update(t)),a.resizeDelay||0),this._dataChanges=[],Pn[this.id]=this,r&&l?(xt.listen(this,"complete",wn),xt.listen(this,"progress",kn),this._initialize(),this.attached&&this.update()):console.error("Failed to create chart: can't acquire context from the given item")}get aspectRatio(){const{options:{aspectRatio:t,maintainAspectRatio:e},width:i,height:n,_aspectRatio:o}=this;return s(t)?e&&o?o:n?i/n:null:t}get data(){return this.config.data}set data(t){this.config.data=t}get options(){return this._options}set options(t){this.config.options=t}get registry(){return en}_initialize(){return this.notifyPlugins("beforeInit"),this.options.responsive?this.resize():ke(this,this.options.devicePixelRatio),this.bindEvents(),this.notifyPlugins("afterInit"),this}clear(){return Te(this.canvas,this.ctx),this}stop(){return xt.stop(this),this}resize(t,e){xt.running(this)?this._resizeBeforeDraw={width:t,height:e}:this._resize(t,e)}_resize(t,e){const i=this.options,s=this.canvas,n=i.maintainAspectRatio&&this.aspectRatio,o=this.platform.getMaximumSize(s,t,e,n),a=i.devicePixelRatio||this.platform.getDevicePixelRatio(),r=this.width?"resize":"attach";this.width=o.width,this.height=o.height,this._aspectRatio=this.aspectRatio,ke(this,a,!0)&&(this.notifyPlugins("resize",{size:o}),d(i.onResize,[this,o],this),this.attached&&this._doResize(r)&&this.render())}ensureScalesHaveIDs(){u(this.options.scales||{},((t,e)=>{t.id=e}))}buildOrUpdateScales(){const t=this.options,e=t.scales,i=this.scales,s=Object.keys(i).reduce(((t,e)=>(t[e]=!1,t)),{});let n=[];e&&(n=n.concat(Object.keys(e).map((t=>{const i=e[t],s=ln(t,i),n="r"===s,o="x"===s;return{options:i,dposition:n?"chartArea":o?"bottom":"left",dtype:n?"radialLinear":o?"category":"linear"}})))),u(n,(e=>{const n=e.options,o=n.id,a=ln(o,n),r=l(n.type,e.dtype);void 0!==n.position&&vn(n.position,a)===vn(e.dposition)||(n.position=e.dposition),s[o]=!0;let h=null;if(o in i&&i[o].type===r)h=i[o];else{h=new(en.getScale(r))({id:o,type:r,ctx:this.ctx,chart:this}),i[h.id]=h}h.init(n,t)})),u(s,((t,e)=>{t||delete i[e]})),u(i,(t=>{as.configure(this,t,t.options),as.addBox(this,t)}))}_updateMetasets(){const t=this._metasets,e=this.data.datasets.length,i=t.length;if(t.sort(((t,e)=>t.index-e.index)),i>e){for(let t=e;t<i;++t)this._destroyDatasetMeta(t);t.splice(e,i-e)}this._sortedMetasets=t.slice(0).sort(Mn("order","index"))}_removeUnreferencedMetasets(){const{_metasets:t,data:{datasets:e}}=this;t.length>e.length&&delete this._stacks,t.forEach(((t,i)=>{0===e.filter((e=>e===t._dataset)).length&&this._destroyDatasetMeta(i)}))}buildOrUpdateControllers(){const t=[],e=this.data.datasets;let i,s;for(this._removeUnreferencedMetasets(),i=0,s=e.length;i<s;i++){const s=e[i];let n=this.getDatasetMeta(i);const o=s.type||this.config.type;if(n.type&&n.type!==o&&(this._destroyDatasetMeta(i),n=this.getDatasetMeta(i)),n.type=o,n.indexAxis=s.indexAxis||an(o,this.options),n.order=s.order||0,n.index=i,n.label=""+s.label,n.visible=this.isDatasetVisible(i),n.controller)n.controller.updateIndex(i),n.controller.linkScales();else{const e=en.getController(o),{datasetElementType:s,dataElementType:a}=ue.datasets[o];Object.assign(e,{dataElementType:en.getElement(a),datasetElementType:s&&en.getElement(s)}),n.controller=new e(this,i),t.push(n.controller)}}return this._updateMetasets(),t}_resetElements(){u(this.data.datasets,((t,e)=>{this.getDatasetMeta(e).controller.reset()}),this)}reset(){this._resetElements(),this.notifyPlugins("reset")}update(t){const e=this.config;e.update();const i=this._options=e.createResolver(e.chartOptionScopes(),this.getContext()),s=this._animationsDisabled=!i.animation;if(this._updateScales(),this._checkEventBindings(),this._updateHiddenIndices(),this._plugins.invalidate(),!1===this.notifyPlugins("beforeUpdate",{mode:t,cancelable:!0}))return;const n=this.buildOrUpdateControllers();this.notifyPlugins("beforeElementsUpdate");let o=0;for(let t=0,e=this.data.datasets.length;t<e;t++){const{controller:e}=this.getDatasetMeta(t),i=!s&&-1===n.indexOf(e);e.buildOrUpdateElements(i),o=Math.max(+e.getMaxOverflow(),o)}o=this._minPadding=i.layout.autoPadding?o:0,this._updateLayout(o),s||u(n,(t=>{t.reset()})),this._updateDatasets(t),this.notifyPlugins("afterUpdate",{mode:t}),this._layers.sort(Mn("z","_idx"));const{_active:a,_lastEvent:r}=this;r?this._eventHandler(r,!0):a.length&&this._updateHoverStyles(a,a,!0),this.render()}_updateScales(){u(this.scales,(t=>{as.removeBox(this,t)})),this.ensureScalesHaveIDs(),this.buildOrUpdateScales()}_checkEventBindings(){const t=this.options,e=new Set(Object.keys(this._listeners)),i=new Set(t.events);P(e,i)&&!!this._responsiveListeners===t.responsive||(this.unbindEvents(),this.bindEvents())}_updateHiddenIndices(){const{_hiddenIndices:t}=this,e=this._getUniformDataChanges()||[];for(const{method:i,start:s,count:n}of e){Cn(t,s,"_removeElements"===i?-n:n)}}_getUniformDataChanges(){const t=this._dataChanges;if(!t||!t.length)return;this._dataChanges=[];const e=this.data.datasets.length,i=e=>new Set(t.filter((t=>t[0]===e)).map(((t,e)=>e+","+t.splice(1).join(",")))),s=i(0);for(let t=1;t<e;t++)if(!P(s,i(t)))return;return Array.from(s).map((t=>t.split(","))).map((t=>({method:t[1],start:+t[2],count:+t[3]})))}_updateLayout(t){if(!1===this.notifyPlugins("beforeLayout",{cancelable:!0}))return;as.update(this,this.width,this.height,t);const e=this.chartArea,i=e.width<=0||e.height<=0;this._layers=[],u(this.boxes,(t=>{i&&"chartArea"===t.position||(t.configure&&t.configure(),this._layers.push(...t._layers()))}),this),this._layers.forEach(((t,e)=>{t._idx=e})),this.notifyPlugins("afterLayout")}_updateDatasets(t){if(!1!==this.notifyPlugins("beforeDatasetsUpdate",{mode:t,cancelable:!0})){for(let t=0,e=this.data.datasets.length;t<e;++t)this.getDatasetMeta(t).controller.configure();for(let e=0,i=this.data.datasets.length;e<i;++e)this._updateDataset(e,S(t)?t({datasetIndex:e}):t);this.notifyPlugins("afterDatasetsUpdate",{mode:t})}}_updateDataset(t,e){const i=this.getDatasetMeta(t),s={meta:i,index:t,mode:e,cancelable:!0};!1!==this.notifyPlugins("beforeDatasetUpdate",s)&&(i.controller._update(e),s.cancelable=!1,this.notifyPlugins("afterDatasetUpdate",s))}render(){!1!==this.notifyPlugins("beforeRender",{cancelable:!0})&&(xt.has(this)?this.attached&&!xt.running(this)&&xt.start(this):(this.draw(),wn({chart:this})))}draw(){let t;if(this._resizeBeforeDraw){const{width:t,height:e}=this._resizeBeforeDraw;this._resize(t,e),this._resizeBeforeDraw=null}if(this.clear(),this.width<=0||this.height<=0)return;if(!1===this.notifyPlugins("beforeDraw",{cancelable:!0}))return;const e=this._layers;for(t=0;t<e.length&&e[t].z<=0;++t)e[t].draw(this.chartArea);for(this._drawDatasets();t<e.length;++t)e[t].draw(this.chartArea);this.notifyPlugins("afterDraw")}_getSortedDatasetMetas(t){const e=this._sortedMetasets,i=[];let s,n;for(s=0,n=e.length;s<n;++s){const n=e[s];t&&!n.visible||i.push(n)}return i}getSortedVisibleDatasetMetas(){return this._getSortedDatasetMetas(!0)}_drawDatasets(){if(!1===this.notifyPlugins("beforeDatasetsDraw",{cancelable:!0}))return;const t=this.getSortedVisibleDatasetMetas();for(let e=t.length-1;e>=0;--e)this._drawDataset(t[e]);this.notifyPlugins("afterDatasetsDraw")}_drawDataset(t){const e=this.ctx,i=t._clip,s=!i.disabled,n=function(t,e){const{xScale:i,yScale:s}=t;return i&&s?{left:On(i,e,"left"),right:On(i,e,"right"),top:On(s,e,"top"),bottom:On(s,e,"bottom")}:e}(t,this.chartArea),o={meta:t,index:t.index,cancelable:!0};!1!==this.notifyPlugins("beforeDatasetDraw",o)&&(s&&Ie(e,{left:!1===i.left?0:n.left-i.left,right:!1===i.right?this.width:n.right+i.right,top:!1===i.top?0:n.top-i.top,bottom:!1===i.bottom?this.height:n.bottom+i.bottom}),t.controller.draw(),s&&ze(e),o.cancelable=!1,this.notifyPlugins("afterDatasetDraw",o))}isPointInArea(t){return Re(t,this.chartArea,this._minPadding)}getElementsAtEventForMode(t,e,i,s){const n=Xi.modes[e];return"function"==typeof n?n(this,t,i,s):[]}getDatasetMeta(t){const e=this.data.datasets[t],i=this._metasets;let s=i.filter((t=>t&&t._dataset===e)).pop();return s||(s={type:null,data:[],dataset:null,controller:null,hidden:null,xAxisID:null,yAxisID:null,order:e&&e.order||0,index:t,_dataset:e,_parsed:[],_sorted:!1},i.push(s)),s}getContext(){return this.$context||(this.$context=Ci(null,{chart:this,type:"chart"}))}getVisibleDatasetCount(){return this.getSortedVisibleDatasetMetas().length}isDatasetVisible(t){const e=this.data.datasets[t];if(!e)return!1;const i=this.getDatasetMeta(t);return"boolean"==typeof i.hidden?!i.hidden:!e.hidden}setDatasetVisibility(t,e){this.getDatasetMeta(t).hidden=!e}toggleDataVisibility(t){this._hiddenIndices[t]=!this._hiddenIndices[t]}getDataVisibility(t){return!this._hiddenIndices[t]}_updateVisibility(t,e,i){const s=i?"show":"hide",n=this.getDatasetMeta(t),o=n.controller._resolveAnimations(void 0,s);k(e)?(n.data[e].hidden=!i,this.update()):(this.setDatasetVisibility(t,i),o.update(n,{visible:i}),this.update((e=>e.datasetIndex===t?s:void 0)))}hide(t,e){this._updateVisibility(t,e,!1)}show(t,e){this._updateVisibility(t,e,!0)}_destroyDatasetMeta(t){const e=this._metasets[t];e&&e.controller&&e.controller._destroy(),delete this._metasets[t]}_stop(){let t,e;for(this.stop(),xt.remove(this),t=0,e=this.data.datasets.length;t<e;++t)this._destroyDatasetMeta(t)}destroy(){this.notifyPlugins("beforeDestroy");const{canvas:t,ctx:e}=this;this._stop(),this.config.clearCache(),t&&(this.unbindEvents(),Te(t,e),this.platform.releaseContext(e),this.canvas=null,this.ctx=null),delete Pn[this.id],this.notifyPlugins("afterDestroy")}toBase64Image(...t){return this.canvas.toDataURL(...t)}bindEvents(){this.bindUserEvents(),this.options.responsive?this.bindResponsiveEvents():this.attached=!0}bindUserEvents(){const t=this._listeners,e=this.platform,i=(i,s)=>{e.addEventListener(this,i,s),t[i]=s},s=(t,e,i)=>{t.offsetX=e,t.offsetY=i,this._eventHandler(t)};u(this.options.events,(t=>i(t,s)))}bindResponsiveEvents(){this._responsiveListeners||(this._responsiveListeners={});const t=this._responsiveListeners,e=this.platform,i=(i,s)=>{e.addEventListener(this,i,s),t[i]=s},s=(i,s)=>{t[i]&&(e.removeEventListener(this,i,s),delete t[i])},n=(t,e)=>{this.canvas&&this.resize(t,e)};let o;const a=()=>{s("attach",a),this.attached=!0,this.resize(),i("resize",n),i("detach",o)};o=()=>{this.attached=!1,s("resize",n),this._stop(),this._resize(0,0),i("attach",a)},e.isAttached(this.canvas)?a():o()}unbindEvents(){u(this._listeners,((t,e)=>{this.platform.removeEventListener(this,e,t)})),this._listeners={},u(this._responsiveListeners,((t,e)=>{this.platform.removeEventListener(this,e,t)})),this._responsiveListeners=void 0}updateHoverStyle(t,e,i){const s=i?"set":"remove";let n,o,a,r;for("dataset"===e&&(n=this.getDatasetMeta(t[0].datasetIndex),n.controller["_"+s+"DatasetHoverStyle"]()),a=0,r=t.length;a<r;++a){o=t[a];const e=o&&this.getDatasetMeta(o.datasetIndex).controller;e&&e[s+"HoverStyle"](o.element,o.datasetIndex,o.index)}}getActiveElements(){return this._active||[]}setActiveElements(t){const e=this._active||[],i=t.map((({datasetIndex:t,index:e})=>{const i=this.getDatasetMeta(t);if(!i)throw new Error("No dataset found at index "+t);return{datasetIndex:t,element:i.data[e],index:e}}));!f(i,e)&&(this._active=i,this._lastEvent=null,this._updateHoverStyles(i,e))}notifyPlugins(t,e,i){return this._plugins.notify(this,t,e,i)}isPluginEnabled(t){return 1===this._plugins._cache.filter((e=>e.plugin.id===t)).length}_updateHoverStyles(t,e,i){const s=this.options.hover,n=(t,e)=>t.filter((t=>!e.some((e=>t.datasetIndex===e.datasetIndex&&t.index===e.index)))),o=n(e,t),a=i?t:n(t,e);o.length&&this.updateHoverStyle(o,s.mode,!1),a.length&&s.mode&&this.updateHoverStyle(a,s.mode,!0)}_eventHandler(t,e){const i={event:t,replay:e,cancelable:!0,inChartArea:this.isPointInArea(t)},s=e=>(e.options.events||this.options.events).includes(t.native.type);if(!1===this.notifyPlugins("beforeEvent",i,s))return;const n=this._handleEvent(t,e,i.inChartArea);return i.cancelable=!1,this.notifyPlugins("afterEvent",i,s),(n||i.changed)&&this.render(),this}_handleEvent(t,e,i){const{_active:s=[],options:n}=this,o=e,a=this._getActiveElements(t,s,i,o),r=D(t),l=function(t,e,i,s){return i&&"mouseout"!==t.type?s?e:t:null}(t,this._lastEvent,i,r);i&&(this._lastEvent=null,d(n.onHover,[t,a,this],this),r&&d(n.onClick,[t,a,this],this));const h=!f(a,s);return(h||e)&&(this._active=a,this._updateHoverStyles(a,s,e)),this._lastEvent=l,h}_getActiveElements(t,e,i,s){if("mouseout"===t.type)return[];if(!i)return e;const n=this.options.hover;return this.getElementsAtEventForMode(t,n.mode,n,s)}}function Tn(){return u(An.instances,(t=>t._plugins.invalidate()))}function Ln(){throw new Error("This method is not implemented: Check that a complete date adapter is provided.")}class En{static override(t){Object.assign(En.prototype,t)}options;constructor(t){this.options=t||{}}init(){}formats(){return Ln()}parse(){return Ln()}format(){return Ln()}add(){return Ln()}diff(){return Ln()}startOf(){return Ln()}endOf(){return Ln()}}var Rn={_date:En};function In(t){const e=t.iScale,i=function(t,e){if(!t._cache.$bar){const i=t.getMatchingVisibleMetas(e);let s=[];for(let e=0,n=i.length;e<n;e++)s=s.concat(i[e].controller.getAllParsedValues(t));t._cache.$bar=lt(s.sort(((t,e)=>t-e)))}return t._cache.$bar}(e,t.type);let s,n,o,a,r=e._length;const l=()=>{32767!==o&&-32768!==o&&(k(a)&&(r=Math.min(r,Math.abs(o-a)||r)),a=o)};for(s=0,n=i.length;s<n;++s)o=e.getPixelForValue(i[s]),l();for(a=void 0,s=0,n=e.ticks.length;s<n;++s)o=e.getPixelForTick(s),l();return r}function zn(t,e,i,s){return n(t)?function(t,e,i,s){const n=i.parse(t[0],s),o=i.parse(t[1],s),a=Math.min(n,o),r=Math.max(n,o);let l=a,h=r;Math.abs(a)>Math.abs(r)&&(l=r,h=a),e[i.axis]=h,e._custom={barStart:l,barEnd:h,start:n,end:o,min:a,max:r}}(t,e,i,s):e[i.axis]=i.parse(t,s),e}function Fn(t,e,i,s){const n=t.iScale,o=t.vScale,a=n.getLabels(),r=n===o,l=[];let h,c,d,u;for(h=i,c=i+s;h<c;++h)u=e[h],d={},d[n.axis]=r||n.parse(a[h],h),l.push(zn(u,d,o,h));return l}function Vn(t){return t&&void 0!==t.barStart&&void 0!==t.barEnd}function Bn(t,e,i,s){let n=e.borderSkipped;const o={};if(!n)return void(t.borderSkipped=o);if(!0===n)return void(t.borderSkipped={top:!0,right:!0,bottom:!0,left:!0});const{start:a,end:r,reverse:l,top:h,bottom:c}=function(t){let e,i,s,n,o;return t.horizontal?(e=t.base>t.x,i="left",s="right"):(e=t.base<t.y,i="bottom",s="top"),e?(n="end",o="start"):(n="start",o="end"),{start:i,end:s,reverse:e,top:n,bottom:o}}(t);"middle"===n&&i&&(t.enableBorderRadius=!0,(i._top||0)===s?n=h:(i._bottom||0)===s?n=c:(o[Wn(c,a,r,l)]=!0,n=h)),o[Wn(n,a,r,l)]=!0,t.borderSkipped=o}function Wn(t,e,i,s){var n,o,a;return s?(a=i,t=Nn(t=(n=t)===(o=e)?a:n===a?o:n,i,e)):t=Nn(t,e,i),t}function Nn(t,e,i){return"start"===t?e:"end"===t?i:t}function Hn(t,{inflateAmount:e},i){t.inflateAmount="auto"===e?1===i?.33:0:e}class jn extends Ns{static id="doughnut";static defaults={datasetElementType:!1,dataElementType:"arc",animation:{animateRotate:!0,animateScale:!1},animations:{numbers:{type:"number",properties:["circumference","endAngle","innerRadius","outerRadius","startAngle","x","y","offset","borderWidth","spacing"]}},cutout:"50%",rotation:0,circumference:360,radius:"100%",spacing:0,indexAxis:"r"};static descriptors={_scriptable:t=>"spacing"!==t,_indexable:t=>"spacing"!==t&&!t.startsWith("borderDash")&&!t.startsWith("hoverBorderDash")};static overrides={aspectRatio:1,plugins:{legend:{labels:{generateLabels(t){const e=t.data;if(e.labels.length&&e.datasets.length){const{labels:{pointStyle:i,color:s}}=t.legend.options;return e.labels.map(((e,n)=>{const o=t.getDatasetMeta(0).controller.getStyle(n);return{text:e,fillStyle:o.backgroundColor,strokeStyle:o.borderColor,fontColor:s,lineWidth:o.borderWidth,pointStyle:i,hidden:!t.getDataVisibility(n),index:n}}))}return[]}},onClick(t,e,i){i.chart.toggleDataVisibility(e.index),i.chart.update()}}}};constructor(t,e){super(t,e),this.enableOptionSharing=!0,this.innerRadius=void 0,this.outerRadius=void 0,this.offsetX=void 0,this.offsetY=void 0}linkScales(){}parse(t,e){const i=this.getDataset().data,s=this._cachedMeta;if(!1===this._parsing)s._parsed=i;else{let n,a,r=t=>+i[t];if(o(i[t])){const{key:t="value"}=this._parsing;r=e=>+M(i[e],t)}for(n=t,a=t+e;n<a;++n)s._parsed[n]=r(n)}}_getRotation(){return $(this.options.rotation-90)}_getCircumference(){return $(this.options.circumference)}_getRotationExtents(){let t=O,e=-O;for(let i=0;i<this.chart.data.datasets.length;++i)if(this.chart.isDatasetVisible(i)&&this.chart.getDatasetMeta(i).type===this._type){const s=this.chart.getDatasetMeta(i).controller,n=s._getRotation(),o=s._getCircumference();t=Math.min(t,n),e=Math.max(e,n+o)}return{rotation:t,circumference:e-t}}update(t){const e=this.chart,{chartArea:i}=e,s=this._cachedMeta,n=s.data,o=this.getMaxBorderWidth()+this.getMaxOffset(n)+this.options.spacing,a=Math.max((Math.min(i.width,i.height)-o)/2,0),r=Math.min(h(this.options.cutout,a),1),l=this._getRingWeight(this.index),{circumference:d,rotation:u}=this._getRotationExtents(),{ratioX:f,ratioY:g,offsetX:p,offsetY:m}=function(t,e,i){let s=1,n=1,o=0,a=0;if(e<O){const r=t,l=r+e,h=Math.cos(r),c=Math.sin(r),d=Math.cos(l),u=Math.sin(l),f=(t,e,s)=>Z(t,r,l,!0)?1:Math.max(e,e*i,s,s*i),g=(t,e,s)=>Z(t,r,l,!0)?-1:Math.min(e,e*i,s,s*i),p=f(0,h,d),m=f(E,c,u),b=g(C,h,d),x=g(C+E,c,u);s=(p-b)/2,n=(m-x)/2,o=-(p+b)/2,a=-(m+x)/2}return{ratioX:s,ratioY:n,offsetX:o,offsetY:a}}(u,d,r),b=(i.width-o)/f,x=(i.height-o)/g,_=Math.max(Math.min(b,x)/2,0),y=c(this.options.radius,_),v=(y-Math.max(y*r,0))/this._getVisibleDatasetWeightTotal();this.offsetX=p*y,this.offsetY=m*y,s.total=this.calculateTotal(),this.outerRadius=y-v*this._getRingWeightOffset(this.index),this.innerRadius=Math.max(this.outerRadius-v*l,0),this.updateElements(n,0,n.length,t)}_circumference(t,e){const i=this.options,s=this._cachedMeta,n=this._getCircumference();return e&&i.animation.animateRotate||!this.chart.getDataVisibility(t)||null===s._parsed[t]||s.data[t].hidden?0:this.calculateCircumference(s._parsed[t]*n/O)}updateElements(t,e,i,s){const n="reset"===s,o=this.chart,a=o.chartArea,r=o.options.animation,l=(a.left+a.right)/2,h=(a.top+a.bottom)/2,c=n&&r.animateScale,d=c?0:this.innerRadius,u=c?0:this.outerRadius,{sharedOptions:f,includeOptions:g}=this._getSharedOptions(e,s);let p,m=this._getRotation();for(p=0;p<e;++p)m+=this._circumference(p,n);for(p=e;p<e+i;++p){const e=this._circumference(p,n),i=t[p],o={x:l+this.offsetX,y:h+this.offsetY,startAngle:m,endAngle:m+e,circumference:e,outerRadius:u,innerRadius:d};g&&(o.options=f||this.resolveDataElementOptions(p,i.active?"active":s)),m+=e,this.updateElement(i,p,o,s)}}calculateTotal(){const t=this._cachedMeta,e=t.data;let i,s=0;for(i=0;i<e.length;i++){const n=t._parsed[i];null===n||isNaN(n)||!this.chart.getDataVisibility(i)||e[i].hidden||(s+=Math.abs(n))}return s}calculateCircumference(t){const e=this._cachedMeta.total;return e>0&&!isNaN(t)?O*(Math.abs(t)/e):0}getLabelAndValue(t){const e=this._cachedMeta,i=this.chart,s=i.data.labels||[],n=ne(e._parsed[t],i.options.locale);return{label:s[t]||"",value:n}}getMaxBorderWidth(t){let e=0;const i=this.chart;let s,n,o,a,r;if(!t)for(s=0,n=i.data.datasets.length;s<n;++s)if(i.isDatasetVisible(s)){o=i.getDatasetMeta(s),t=o.data,a=o.controller;break}if(!t)return 0;for(s=0,n=t.length;s<n;++s)r=a.resolveDataElementOptions(s),"inner"!==r.borderAlign&&(e=Math.max(e,r.borderWidth||0,r.hoverBorderWidth||0));return e}getMaxOffset(t){let e=0;for(let i=0,s=t.length;i<s;++i){const t=this.resolveDataElementOptions(i);e=Math.max(e,t.offset||0,t.hoverOffset||0)}return e}_getRingWeightOffset(t){let e=0;for(let i=0;i<t;++i)this.chart.isDatasetVisible(i)&&(e+=this._getRingWeight(i));return e}_getRingWeight(t){return Math.max(l(this.chart.data.datasets[t].weight,1),0)}_getVisibleDatasetWeightTotal(){return this._getRingWeightOffset(this.chart.data.datasets.length)||1}}class $n extends Ns{static id="polarArea";static defaults={dataElementType:"arc",animation:{animateRotate:!0,animateScale:!0},animations:{numbers:{type:"number",properties:["x","y","startAngle","endAngle","innerRadius","outerRadius"]}},indexAxis:"r",startAngle:0};static overrides={aspectRatio:1,plugins:{legend:{labels:{generateLabels(t){const e=t.data;if(e.labels.length&&e.datasets.length){const{labels:{pointStyle:i,color:s}}=t.legend.options;return e.labels.map(((e,n)=>{const o=t.getDatasetMeta(0).controller.getStyle(n);return{text:e,fillStyle:o.backgroundColor,strokeStyle:o.borderColor,fontColor:s,lineWidth:o.borderWidth,pointStyle:i,hidden:!t.getDataVisibility(n),index:n}}))}return[]}},onClick(t,e,i){i.chart.toggleDataVisibility(e.index),i.chart.update()}}},scales:{r:{type:"radialLinear",angleLines:{display:!1},beginAtZero:!0,grid:{circular:!0},pointLabels:{display:!1},startAngle:0}}};constructor(t,e){super(t,e),this.innerRadius=void 0,this.outerRadius=void 0}getLabelAndValue(t){const e=this._cachedMeta,i=this.chart,s=i.data.labels||[],n=ne(e._parsed[t].r,i.options.locale);return{label:s[t]||"",value:n}}parseObjectData(t,e,i,s){return ii.bind(this)(t,e,i,s)}update(t){const e=this._cachedMeta.data;this._updateRadius(),this.updateElements(e,0,e.length,t)}getMinMax(){const t=this._cachedMeta,e={min:Number.POSITIVE_INFINITY,max:Number.NEGATIVE_INFINITY};return t.data.forEach(((t,i)=>{const s=this.getParsed(i).r;!isNaN(s)&&this.chart.getDataVisibility(i)&&(s<e.min&&(e.min=s),s>e.max&&(e.max=s))})),e}_updateRadius(){const t=this.chart,e=t.chartArea,i=t.options,s=Math.min(e.right-e.left,e.bottom-e.top),n=Math.max(s/2,0),o=(n-Math.max(i.cutoutPercentage?n/100*i.cutoutPercentage:1,0))/t.getVisibleDatasetCount();this.outerRadius=n-o*this.index,this.innerRadius=this.outerRadius-o}updateElements(t,e,i,s){const n="reset"===s,o=this.chart,a=o.options.animation,r=this._cachedMeta.rScale,l=r.xCenter,h=r.yCenter,c=r.getIndexAngle(0)-.5*C;let d,u=c;const f=360/this.countVisibleElements();for(d=0;d<e;++d)u+=this._computeAngle(d,s,f);for(d=e;d<e+i;d++){const e=t[d];let i=u,g=u+this._computeAngle(d,s,f),p=o.getDataVisibility(d)?r.getDistanceFromCenterForValue(this.getParsed(d).r):0;u=g,n&&(a.animateScale&&(p=0),a.animateRotate&&(i=g=c));const m={x:l,y:h,innerRadius:0,outerRadius:p,startAngle:i,endAngle:g,options:this.resolveDataElementOptions(d,e.active?"active":s)};this.updateElement(e,d,m,s)}}countVisibleElements(){const t=this._cachedMeta;let e=0;return t.data.forEach(((t,i)=>{!isNaN(this.getParsed(i).r)&&this.chart.getDataVisibility(i)&&e++})),e}_computeAngle(t,e,i){return this.chart.getDataVisibility(t)?$(this.resolveDataElementOptions(t,e).angle||i):0}}var Yn=Object.freeze({__proto__:null,BarController:class extends Ns{static id="bar";static defaults={datasetElementType:!1,dataElementType:"bar",categoryPercentage:.8,barPercentage:.9,grouped:!0,animations:{numbers:{type:"number",properties:["x","y","base","width","height"]}}};static overrides={scales:{_index_:{type:"category",offset:!0,grid:{offset:!0}},_value_:{type:"linear",beginAtZero:!0}}};parsePrimitiveData(t,e,i,s){return Fn(t,e,i,s)}parseArrayData(t,e,i,s){return Fn(t,e,i,s)}parseObjectData(t,e,i,s){const{iScale:n,vScale:o}=t,{xAxisKey:a="x",yAxisKey:r="y"}=this._parsing,l="x"===n.axis?a:r,h="x"===o.axis?a:r,c=[];let d,u,f,g;for(d=i,u=i+s;d<u;++d)g=e[d],f={},f[n.axis]=n.parse(M(g,l),d),c.push(zn(M(g,h),f,o,d));return c}updateRangeFromParsed(t,e,i,s){super.updateRangeFromParsed(t,e,i,s);const n=i._custom;n&&e===this._cachedMeta.vScale&&(t.min=Math.min(t.min,n.min),t.max=Math.max(t.max,n.max))}getMaxOverflow(){return 0}getLabelAndValue(t){const e=this._cachedMeta,{iScale:i,vScale:s}=e,n=this.getParsed(t),o=n._custom,a=Vn(o)?"["+o.start+", "+o.end+"]":""+s.getLabelForValue(n[s.axis]);return{label:""+i.getLabelForValue(n[i.axis]),value:a}}initialize(){this.enableOptionSharing=!0,super.initialize();this._cachedMeta.stack=this.getDataset().stack}update(t){const e=this._cachedMeta;this.updateElements(e.data,0,e.data.length,t)}updateElements(t,e,i,n){const o="reset"===n,{index:a,_cachedMeta:{vScale:r}}=this,l=r.getBasePixel(),h=r.isHorizontal(),c=this._getRuler(),{sharedOptions:d,includeOptions:u}=this._getSharedOptions(e,n);for(let f=e;f<e+i;f++){const e=this.getParsed(f),i=o||s(e[r.axis])?{base:l,head:l}:this._calculateBarValuePixels(f),g=this._calculateBarIndexPixels(f,c),p=(e._stacks||{})[r.axis],m={horizontal:h,base:i.base,enableBorderRadius:!p||Vn(e._custom)||a===p._top||a===p._bottom,x:h?i.head:g.center,y:h?g.center:i.head,height:h?g.size:Math.abs(i.size),width:h?Math.abs(i.size):g.size};u&&(m.options=d||this.resolveDataElementOptions(f,t[f].active?"active":n));const b=m.options||t[f].options;Bn(m,b,p,a),Hn(m,b,c.ratio),this.updateElement(t[f],f,m,n)}}_getStacks(t,e){const{iScale:i}=this._cachedMeta,n=i.getMatchingVisibleMetas(this._type).filter((t=>t.controller.options.grouped)),o=i.options.stacked,a=[],r=t=>{const i=t.controller.getParsed(e),n=i&&i[t.vScale.axis];if(s(n)||isNaN(n))return!0};for(const i of n)if((void 0===e||!r(i))&&((!1===o||-1===a.indexOf(i.stack)||void 0===o&&void 0===i.stack)&&a.push(i.stack),i.index===t))break;return a.length||a.push(void 0),a}_getStackCount(t){return this._getStacks(void 0,t).length}_getStackIndex(t,e,i){const s=this._getStacks(t,i),n=void 0!==e?s.indexOf(e):-1;return-1===n?s.length-1:n}_getRuler(){const t=this.options,e=this._cachedMeta,i=e.iScale,s=[];let n,o;for(n=0,o=e.data.length;n<o;++n)s.push(i.getPixelForValue(this.getParsed(n)[i.axis],n));const a=t.barThickness;return{min:a||In(e),pixels:s,start:i._startPixel,end:i._endPixel,stackCount:this._getStackCount(),scale:i,grouped:t.grouped,ratio:a?1:t.categoryPercentage*t.barPercentage}}_calculateBarValuePixels(t){const{_cachedMeta:{vScale:e,_stacked:i,index:n},options:{base:o,minBarLength:a}}=this,r=o||0,l=this.getParsed(t),h=l._custom,c=Vn(h);let d,u,f=l[e.axis],g=0,p=i?this.applyStack(e,l,i):f;p!==f&&(g=p-f,p=f),c&&(f=h.barStart,p=h.barEnd-h.barStart,0!==f&&F(f)!==F(h.barEnd)&&(g=0),g+=f);const m=s(o)||c?g:o;let b=e.getPixelForValue(m);if(d=this.chart.getDataVisibility(t)?e.getPixelForValue(g+p):b,u=d-b,Math.abs(u)<a){u=function(t,e,i){return 0!==t?F(t):(e.isHorizontal()?1:-1)*(e.min>=i?1:-1)}(u,e,r)*a,f===r&&(b-=u/2);const t=e.getPixelForDecimal(0),s=e.getPixelForDecimal(1),o=Math.min(t,s),h=Math.max(t,s);b=Math.max(Math.min(b,h),o),d=b+u,i&&!c&&(l._stacks[e.axis]._visualValues[n]=e.getValueForPixel(d)-e.getValueForPixel(b))}if(b===e.getPixelForValue(r)){const t=F(u)*e.getLineWidthForValue(r)/2;b+=t,u-=t}return{size:u,base:b,head:d,center:d+u/2}}_calculateBarIndexPixels(t,e){const i=e.scale,n=this.options,o=n.skipNull,a=l(n.maxBarThickness,1/0);let r,h;if(e.grouped){const i=o?this._getStackCount(t):e.stackCount,l="flex"===n.barThickness?function(t,e,i,s){const n=e.pixels,o=n[t];let a=t>0?n[t-1]:null,r=t<n.length-1?n[t+1]:null;const l=i.categoryPercentage;null===a&&(a=o-(null===r?e.end-e.start:r-o)),null===r&&(r=o+o-a);const h=o-(o-Math.min(a,r))/2*l;return{chunk:Math.abs(r-a)/2*l/s,ratio:i.barPercentage,start:h}}(t,e,n,i):function(t,e,i,n){const o=i.barThickness;let a,r;return s(o)?(a=e.min*i.categoryPercentage,r=i.barPercentage):(a=o*n,r=1),{chunk:a/n,ratio:r,start:e.pixels[t]-a/2}}(t,e,n,i),c=this._getStackIndex(this.index,this._cachedMeta.stack,o?t:void 0);r=l.start+l.chunk*c+l.chunk/2,h=Math.min(a,l.chunk*l.ratio)}else r=i.getPixelForValue(this.getParsed(t)[i.axis],t),h=Math.min(a,e.min*e.ratio);return{base:r-h/2,head:r+h/2,center:r,size:h}}draw(){const t=this._cachedMeta,e=t.vScale,i=t.data,s=i.length;let n=0;for(;n<s;++n)null!==this.getParsed(n)[e.axis]&&i[n].draw(this._ctx)}},BubbleController:class extends Ns{static id="bubble";static defaults={datasetElementType:!1,dataElementType:"point",animations:{numbers:{type:"number",properties:["x","y","borderWidth","radius"]}}};static overrides={scales:{x:{type:"linear"},y:{type:"linear"}}};initialize(){this.enableOptionSharing=!0,super.initialize()}parsePrimitiveData(t,e,i,s){const n=super.parsePrimitiveData(t,e,i,s);for(let t=0;t<n.length;t++)n[t]._custom=this.resolveDataElementOptions(t+i).radius;return n}parseArrayData(t,e,i,s){const n=super.parseArrayData(t,e,i,s);for(let t=0;t<n.length;t++){const s=e[i+t];n[t]._custom=l(s[2],this.resolveDataElementOptions(t+i).radius)}return n}parseObjectData(t,e,i,s){const n=super.parseObjectData(t,e,i,s);for(let t=0;t<n.length;t++){const s=e[i+t];n[t]._custom=l(s&&s.r&&+s.r,this.resolveDataElementOptions(t+i).radius)}return n}getMaxOverflow(){const t=this._cachedMeta.data;let e=0;for(let i=t.length-1;i>=0;--i)e=Math.max(e,t[i].size(this.resolveDataElementOptions(i))/2);return e>0&&e}getLabelAndValue(t){const e=this._cachedMeta,i=this.chart.data.labels||[],{xScale:s,yScale:n}=e,o=this.getParsed(t),a=s.getLabelForValue(o.x),r=n.getLabelForValue(o.y),l=o._custom;return{label:i[t]||"",value:"("+a+", "+r+(l?", "+l:"")+")"}}update(t){const e=this._cachedMeta.data;this.updateElements(e,0,e.length,t)}updateElements(t,e,i,s){const n="reset"===s,{iScale:o,vScale:a}=this._cachedMeta,{sharedOptions:r,includeOptions:l}=this._getSharedOptions(e,s),h=o.axis,c=a.axis;for(let d=e;d<e+i;d++){const e=t[d],i=!n&&this.getParsed(d),u={},f=u[h]=n?o.getPixelForDecimal(.5):o.getPixelForValue(i[h]),g=u[c]=n?a.getBasePixel():a.getPixelForValue(i[c]);u.skip=isNaN(f)||isNaN(g),l&&(u.options=r||this.resolveDataElementOptions(d,e.active?"active":s),n&&(u.options.radius=0)),this.updateElement(e,d,u,s)}}resolveDataElementOptions(t,e){const i=this.getParsed(t);let s=super.resolveDataElementOptions(t,e);s.$shared&&(s=Object.assign({},s,{$shared:!1}));const n=s.radius;return"active"!==e&&(s.radius=0),s.radius+=l(i&&i._custom,n),s}},DoughnutController:jn,LineController:class extends Ns{static id="line";static defaults={datasetElementType:"line",dataElementType:"point",showLine:!0,spanGaps:!1};static overrides={scales:{_index_:{type:"category"},_value_:{type:"linear"}}};initialize(){this.enableOptionSharing=!0,this.supportsDecimation=!0,super.initialize()}update(t){const e=this._cachedMeta,{dataset:i,data:s=[],_dataset:n}=e,o=this.chart._animationsDisabled;let{start:a,count:r}=pt(e,s,o);this._drawStart=a,this._drawCount=r,mt(e)&&(a=0,r=s.length),i._chart=this.chart,i._datasetIndex=this.index,i._decimated=!!n._decimated,i.points=s;const l=this.resolveDatasetElementOptions(t);this.options.showLine||(l.borderWidth=0),l.segment=this.options.segment,this.updateElement(i,void 0,{animated:!o,options:l},t),this.updateElements(s,a,r,t)}updateElements(t,e,i,n){const o="reset"===n,{iScale:a,vScale:r,_stacked:l,_dataset:h}=this._cachedMeta,{sharedOptions:c,includeOptions:d}=this._getSharedOptions(e,n),u=a.axis,f=r.axis,{spanGaps:g,segment:p}=this.options,m=N(g)?g:Number.POSITIVE_INFINITY,b=this.chart._animationsDisabled||o||"none"===n,x=e+i,_=t.length;let y=e>0&&this.getParsed(e-1);for(let i=0;i<_;++i){const g=t[i],_=b?g:{};if(i<e||i>=x){_.skip=!0;continue}const v=this.getParsed(i),M=s(v[f]),w=_[u]=a.getPixelForValue(v[u],i),k=_[f]=o||M?r.getBasePixel():r.getPixelForValue(l?this.applyStack(r,v,l):v[f],i);_.skip=isNaN(w)||isNaN(k)||M,_.stop=i>0&&Math.abs(v[u]-y[u])>m,p&&(_.parsed=v,_.raw=h.data[i]),d&&(_.options=c||this.resolveDataElementOptions(i,g.active?"active":n)),b||this.updateElement(g,i,_,n),y=v}}getMaxOverflow(){const t=this._cachedMeta,e=t.dataset,i=e.options&&e.options.borderWidth||0,s=t.data||[];if(!s.length)return i;const n=s[0].size(this.resolveDataElementOptions(0)),o=s[s.length-1].size(this.resolveDataElementOptions(s.length-1));return Math.max(i,n,o)/2}draw(){const t=this._cachedMeta;t.dataset.updateControlPoints(this.chart.chartArea,t.iScale.axis),super.draw()}},PieController:class extends jn{static id="pie";static defaults={cutout:0,rotation:0,circumference:360,radius:"100%"}},PolarAreaController:$n,RadarController:class extends Ns{static id="radar";static defaults={datasetElementType:"line",dataElementType:"point",indexAxis:"r",showLine:!0,elements:{line:{fill:"start"}}};static overrides={aspectRatio:1,scales:{r:{type:"radialLinear"}}};getLabelAndValue(t){const e=this._cachedMeta.vScale,i=this.getParsed(t);return{label:e.getLabels()[t],value:""+e.getLabelForValue(i[e.axis])}}parseObjectData(t,e,i,s){return ii.bind(this)(t,e,i,s)}update(t){const e=this._cachedMeta,i=e.dataset,s=e.data||[],n=e.iScale.getLabels();if(i.points=s,"resize"!==t){const e=this.resolveDatasetElementOptions(t);this.options.showLine||(e.borderWidth=0);const o={_loop:!0,_fullLoop:n.length===s.length,options:e};this.updateElement(i,void 0,o,t)}this.updateElements(s,0,s.length,t)}updateElements(t,e,i,s){const n=this._cachedMeta.rScale,o="reset"===s;for(let a=e;a<e+i;a++){const e=t[a],i=this.resolveDataElementOptions(a,e.active?"active":s),r=n.getPointPositionForValue(a,this.getParsed(a).r),l=o?n.xCenter:r.x,h=o?n.yCenter:r.y,c={x:l,y:h,angle:r.angle,skip:isNaN(l)||isNaN(h),options:i};this.updateElement(e,a,c,s)}}},ScatterController:class extends Ns{static id="scatter";static defaults={datasetElementType:!1,dataElementType:"point",showLine:!1,fill:!1};static overrides={interaction:{mode:"point"},scales:{x:{type:"linear"},y:{type:"linear"}}};getLabelAndValue(t){const e=this._cachedMeta,i=this.chart.data.labels||[],{xScale:s,yScale:n}=e,o=this.getParsed(t),a=s.getLabelForValue(o.x),r=n.getLabelForValue(o.y);return{label:i[t]||"",value:"("+a+", "+r+")"}}update(t){const e=this._cachedMeta,{data:i=[]}=e,s=this.chart._animationsDisabled;let{start:n,count:o}=pt(e,i,s);if(this._drawStart=n,this._drawCount=o,mt(e)&&(n=0,o=i.length),this.options.showLine){this.datasetElementType||this.addElements();const{dataset:n,_dataset:o}=e;n._chart=this.chart,n._datasetIndex=this.index,n._decimated=!!o._decimated,n.points=i;const a=this.resolveDatasetElementOptions(t);a.segment=this.options.segment,this.updateElement(n,void 0,{animated:!s,options:a},t)}else this.datasetElementType&&(delete e.dataset,this.datasetElementType=!1);this.updateElements(i,n,o,t)}addElements(){const{showLine:t}=this.options;!this.datasetElementType&&t&&(this.datasetElementType=this.chart.registry.getElement("line")),super.addElements()}updateElements(t,e,i,n){const o="reset"===n,{iScale:a,vScale:r,_stacked:l,_dataset:h}=this._cachedMeta,c=this.resolveDataElementOptions(e,n),d=this.getSharedOptions(c),u=this.includeOptions(n,d),f=a.axis,g=r.axis,{spanGaps:p,segment:m}=this.options,b=N(p)?p:Number.POSITIVE_INFINITY,x=this.chart._animationsDisabled||o||"none"===n;let _=e>0&&this.getParsed(e-1);for(let c=e;c<e+i;++c){const e=t[c],i=this.getParsed(c),p=x?e:{},y=s(i[g]),v=p[f]=a.getPixelForValue(i[f],c),M=p[g]=o||y?r.getBasePixel():r.getPixelForValue(l?this.applyStack(r,i,l):i[g],c);p.skip=isNaN(v)||isNaN(M)||y,p.stop=c>0&&Math.abs(i[f]-_[f])>b,m&&(p.parsed=i,p.raw=h.data[c]),u&&(p.options=d||this.resolveDataElementOptions(c,e.active?"active":n)),x||this.updateElement(e,c,p,n),_=i}this.updateSharedOptions(d,n,c)}getMaxOverflow(){const t=this._cachedMeta,e=t.data||[];if(!this.options.showLine){let t=0;for(let i=e.length-1;i>=0;--i)t=Math.max(t,e[i].size(this.resolveDataElementOptions(i))/2);return t>0&&t}const i=t.dataset,s=i.options&&i.options.borderWidth||0;if(!e.length)return s;const n=e[0].size(this.resolveDataElementOptions(0)),o=e[e.length-1].size(this.resolveDataElementOptions(e.length-1));return Math.max(s,n,o)/2}}});function Un(t,e,i,s){const n=vi(t.options.borderRadius,["outerStart","outerEnd","innerStart","innerEnd"]);const o=(i-e)/2,a=Math.min(o,s*e/2),r=t=>{const e=(i-Math.min(o,t))*s/2;return J(t,0,Math.min(o,e))};return{outerStart:r(n.outerStart),outerEnd:r(n.outerEnd),innerStart:J(n.innerStart,0,a),innerEnd:J(n.innerEnd,0,a)}}function Xn(t,e,i,s){return{x:i+t*Math.cos(e),y:s+t*Math.sin(e)}}function qn(t,e,i,s,n,o){const{x:a,y:r,startAngle:l,pixelMargin:h,innerRadius:c}=e,d=Math.max(e.outerRadius+s+i-h,0),u=c>0?c+s+i+h:0;let f=0;const g=n-l;if(s){const t=((c>0?c-s:0)+(d>0?d-s:0))/2;f=(g-(0!==t?g*t/(t+s):g))/2}const p=(g-Math.max(.001,g*d-i/C)/d)/2,m=l+p+f,b=n-p-f,{outerStart:x,outerEnd:_,innerStart:y,innerEnd:v}=Un(e,u,d,b-m),M=d-x,w=d-_,k=m+x/M,S=b-_/w,P=u+y,D=u+v,O=m+y/P,A=b-v/D;if(t.beginPath(),o){const e=(k+S)/2;if(t.arc(a,r,d,k,e),t.arc(a,r,d,e,S),_>0){const e=Xn(w,S,a,r);t.arc(e.x,e.y,_,S,b+E)}const i=Xn(D,b,a,r);if(t.lineTo(i.x,i.y),v>0){const e=Xn(D,A,a,r);t.arc(e.x,e.y,v,b+E,A+Math.PI)}const s=(b-v/u+(m+y/u))/2;if(t.arc(a,r,u,b-v/u,s,!0),t.arc(a,r,u,s,m+y/u,!0),y>0){const e=Xn(P,O,a,r);t.arc(e.x,e.y,y,O+Math.PI,m-E)}const n=Xn(M,m,a,r);if(t.lineTo(n.x,n.y),x>0){const e=Xn(M,k,a,r);t.arc(e.x,e.y,x,m-E,k)}}else{t.moveTo(a,r);const e=Math.cos(k)*d+a,i=Math.sin(k)*d+r;t.lineTo(e,i);const s=Math.cos(S)*d+a,n=Math.sin(S)*d+r;t.lineTo(s,n)}t.closePath()}function Kn(t,e,i,s,n){const{fullCircles:o,startAngle:a,circumference:r,options:l}=e,{borderWidth:h,borderJoinStyle:c,borderDash:d,borderDashOffset:u}=l,f="inner"===l.borderAlign;if(!h)return;t.setLineDash(d||[]),t.lineDashOffset=u,f?(t.lineWidth=2*h,t.lineJoin=c||"round"):(t.lineWidth=h,t.lineJoin=c||"bevel");let g=e.endAngle;if(o){qn(t,e,i,s,g,n);for(let e=0;e<o;++e)t.stroke();isNaN(r)||(g=a+(r%O||O))}f&&function(t,e,i){const{startAngle:s,pixelMargin:n,x:o,y:a,outerRadius:r,innerRadius:l}=e;let h=n/r;t.beginPath(),t.arc(o,a,r,s-h,i+h),l>n?(h=n/l,t.arc(o,a,l,i+h,s-h,!0)):t.arc(o,a,n,i+E,s-E),t.closePath(),t.clip()}(t,e,g),o||(qn(t,e,i,s,g,n),t.stroke())}function Gn(t,e,i=e){t.lineCap=l(i.borderCapStyle,e.borderCapStyle),t.setLineDash(l(i.borderDash,e.borderDash)),t.lineDashOffset=l(i.borderDashOffset,e.borderDashOffset),t.lineJoin=l(i.borderJoinStyle,e.borderJoinStyle),t.lineWidth=l(i.borderWidth,e.borderWidth),t.strokeStyle=l(i.borderColor,e.borderColor)}function Zn(t,e,i){t.lineTo(i.x,i.y)}function Jn(t,e,i={}){const s=t.length,{start:n=0,end:o=s-1}=i,{start:a,end:r}=e,l=Math.max(n,a),h=Math.min(o,r),c=n<a&&o<a||n>r&&o>r;return{count:s,start:l,loop:e.loop,ilen:h<l&&!c?s+h-l:h-l}}function Qn(t,e,i,s){const{points:n,options:o}=e,{count:a,start:r,loop:l,ilen:h}=Jn(n,i,s),c=function(t){return t.stepped?Fe:t.tension||"monotone"===t.cubicInterpolationMode?Ve:Zn}(o);let d,u,f,{move:g=!0,reverse:p}=s||{};for(d=0;d<=h;++d)u=n[(r+(p?h-d:d))%a],u.skip||(g?(t.moveTo(u.x,u.y),g=!1):c(t,f,u,p,o.stepped),f=u);return l&&(u=n[(r+(p?h:0))%a],c(t,f,u,p,o.stepped)),!!l}function to(t,e,i,s){const n=e.points,{count:o,start:a,ilen:r}=Jn(n,i,s),{move:l=!0,reverse:h}=s||{};let c,d,u,f,g,p,m=0,b=0;const x=t=>(a+(h?r-t:t))%o,_=()=>{f!==g&&(t.lineTo(m,g),t.lineTo(m,f),t.lineTo(m,p))};for(l&&(d=n[x(0)],t.moveTo(d.x,d.y)),c=0;c<=r;++c){if(d=n[x(c)],d.skip)continue;const e=d.x,i=d.y,s=0|e;s===u?(i<f?f=i:i>g&&(g=i),m=(b*m+e)/++b):(_(),t.lineTo(e,i),u=s,b=0,f=g=i),p=i}_()}function eo(t){const e=t.options,i=e.borderDash&&e.borderDash.length;return!(t._decimated||t._loop||e.tension||"monotone"===e.cubicInterpolationMode||e.stepped||i)?to:Qn}const io="function"==typeof Path2D;function so(t,e,i,s){io&&!e.options.segment?function(t,e,i,s){let n=e._path;n||(n=e._path=new Path2D,e.path(n,i,s)&&n.closePath()),Gn(t,e.options),t.stroke(n)}(t,e,i,s):function(t,e,i,s){const{segments:n,options:o}=e,a=eo(e);for(const r of n)Gn(t,o,r.style),t.beginPath(),a(t,e,r,{start:i,end:i+s-1})&&t.closePath(),t.stroke()}(t,e,i,s)}class no extends Hs{static id="line";static defaults={borderCapStyle:"butt",borderDash:[],borderDashOffset:0,borderJoinStyle:"miter",borderWidth:3,capBezierPoints:!0,cubicInterpolationMode:"default",fill:!1,spanGaps:!1,stepped:!1,tension:0};static defaultRoutes={backgroundColor:"backgroundColor",borderColor:"borderColor"};static descriptors={_scriptable:!0,_indexable:t=>"borderDash"!==t&&"fill"!==t};constructor(t){super(),this.animated=!0,this.options=void 0,this._chart=void 0,this._loop=void 0,this._fullLoop=void 0,this._path=void 0,this._points=void 0,this._segments=void 0,this._decimated=!1,this._pointsUpdated=!1,this._datasetIndex=void 0,t&&Object.assign(this,t)}updateControlPoints(t,e){const i=this.options;if((i.tension||"monotone"===i.cubicInterpolationMode)&&!i.stepped&&!this._pointsUpdated){const s=i.spanGaps?this._loop:this._fullLoop;hi(this._points,i,t,s,e),this._pointsUpdated=!0}}set points(t){this._points=t,delete this._segments,delete this._path,this._pointsUpdated=!1}get points(){return this._points}get segments(){return this._segments||(this._segments=zi(this,this.options.segment))}first(){const t=this.segments,e=this.points;return t.length&&e[t[0].start]}last(){const t=this.segments,e=this.points,i=t.length;return i&&e[t[i-1].end]}interpolate(t,e){const i=this.options,s=t[e],n=this.points,o=Ii(this,{property:e,start:s,end:s});if(!o.length)return;const a=[],r=function(t){return t.stepped?pi:t.tension||"monotone"===t.cubicInterpolationMode?mi:gi}(i);let l,h;for(l=0,h=o.length;l<h;++l){const{start:h,end:c}=o[l],d=n[h],u=n[c];if(d===u){a.push(d);continue}const f=r(d,u,Math.abs((s-d[e])/(u[e]-d[e])),i.stepped);f[e]=t[e],a.push(f)}return 1===a.length?a[0]:a}pathSegment(t,e,i){return eo(this)(t,this,e,i)}path(t,e,i){const s=this.segments,n=eo(this);let o=this._loop;e=e||0,i=i||this.points.length-e;for(const a of s)o&=n(t,this,a,{start:e,end:e+i-1});return!!o}draw(t,e,i,s){const n=this.options||{};(this.points||[]).length&&n.borderWidth&&(t.save(),so(t,this,i,s),t.restore()),this.animated&&(this._pointsUpdated=!1,this._path=void 0)}}function oo(t,e,i,s){const n=t.options,{[i]:o}=t.getProps([i],s);return Math.abs(e-o)<n.radius+n.hitRadius}function ao(t,e){const{x:i,y:s,base:n,width:o,height:a}=t.getProps(["x","y","base","width","height"],e);let r,l,h,c,d;return t.horizontal?(d=a/2,r=Math.min(i,n),l=Math.max(i,n),h=s-d,c=s+d):(d=o/2,r=i-d,l=i+d,h=Math.min(s,n),c=Math.max(s,n)),{left:r,top:h,right:l,bottom:c}}function ro(t,e,i,s){return t?0:J(e,i,s)}function lo(t){const e=ao(t),i=e.right-e.left,s=e.bottom-e.top,n=function(t,e,i){const s=t.options.borderWidth,n=t.borderSkipped,o=Mi(s);return{t:ro(n.top,o.top,0,i),r:ro(n.right,o.right,0,e),b:ro(n.bottom,o.bottom,0,i),l:ro(n.left,o.left,0,e)}}(t,i/2,s/2),a=function(t,e,i){const{enableBorderRadius:s}=t.getProps(["enableBorderRadius"]),n=t.options.borderRadius,a=wi(n),r=Math.min(e,i),l=t.borderSkipped,h=s||o(n);return{topLeft:ro(!h||l.top||l.left,a.topLeft,0,r),topRight:ro(!h||l.top||l.right,a.topRight,0,r),bottomLeft:ro(!h||l.bottom||l.left,a.bottomLeft,0,r),bottomRight:ro(!h||l.bottom||l.right,a.bottomRight,0,r)}}(t,i/2,s/2);return{outer:{x:e.left,y:e.top,w:i,h:s,radius:a},inner:{x:e.left+n.l,y:e.top+n.t,w:i-n.l-n.r,h:s-n.t-n.b,radius:{topLeft:Math.max(0,a.topLeft-Math.max(n.t,n.l)),topRight:Math.max(0,a.topRight-Math.max(n.t,n.r)),bottomLeft:Math.max(0,a.bottomLeft-Math.max(n.b,n.l)),bottomRight:Math.max(0,a.bottomRight-Math.max(n.b,n.r))}}}}function ho(t,e,i,s){const n=null===e,o=null===i,a=t&&!(n&&o)&&ao(t,s);return a&&(n||tt(e,a.left,a.right))&&(o||tt(i,a.top,a.bottom))}function co(t,e){t.rect(e.x,e.y,e.w,e.h)}function uo(t,e,i={}){const s=t.x!==i.x?-e:0,n=t.y!==i.y?-e:0,o=(t.x+t.w!==i.x+i.w?e:0)-s,a=(t.y+t.h!==i.y+i.h?e:0)-n;return{x:t.x+s,y:t.y+n,w:t.w+o,h:t.h+a,radius:t.radius}}var fo=Object.freeze({__proto__:null,ArcElement:class extends Hs{static id="arc";static defaults={borderAlign:"center",borderColor:"#fff",borderDash:[],borderDashOffset:0,borderJoinStyle:void 0,borderRadius:0,borderWidth:2,offset:0,spacing:0,angle:void 0,circular:!0};static defaultRoutes={backgroundColor:"backgroundColor"};static descriptors={_scriptable:!0,_indexable:t=>"borderDash"!==t};circumference;endAngle;fullCircles;innerRadius;outerRadius;pixelMargin;startAngle;constructor(t){super(),this.options=void 0,this.circumference=void 0,this.startAngle=void 0,this.endAngle=void 0,this.innerRadius=void 0,this.outerRadius=void 0,this.pixelMargin=0,this.fullCircles=0,t&&Object.assign(this,t)}inRange(t,e,i){const s=this.getProps(["x","y"],i),{angle:n,distance:o}=X(s,{x:t,y:e}),{startAngle:a,endAngle:r,innerRadius:h,outerRadius:c,circumference:d}=this.getProps(["startAngle","endAngle","innerRadius","outerRadius","circumference"],i),u=(this.options.spacing+this.options.borderWidth)/2,f=l(d,r-a)>=O||Z(n,a,r),g=tt(o,h+u,c+u);return f&&g}getCenterPoint(t){const{x:e,y:i,startAngle:s,endAngle:n,innerRadius:o,outerRadius:a}=this.getProps(["x","y","startAngle","endAngle","innerRadius","outerRadius"],t),{offset:r,spacing:l}=this.options,h=(s+n)/2,c=(o+a+l+r)/2;return{x:e+Math.cos(h)*c,y:i+Math.sin(h)*c}}tooltipPosition(t){return this.getCenterPoint(t)}draw(t){const{options:e,circumference:i}=this,s=(e.offset||0)/4,n=(e.spacing||0)/2,o=e.circular;if(this.pixelMargin="inner"===e.borderAlign?.33:0,this.fullCircles=i>O?Math.floor(i/O):0,0===i||this.innerRadius<0||this.outerRadius<0)return;t.save();const a=(this.startAngle+this.endAngle)/2;t.translate(Math.cos(a)*s,Math.sin(a)*s);const r=s*(1-Math.sin(Math.min(C,i||0)));t.fillStyle=e.backgroundColor,t.strokeStyle=e.borderColor,function(t,e,i,s,n){const{fullCircles:o,startAngle:a,circumference:r}=e;let l=e.endAngle;if(o){qn(t,e,i,s,l,n);for(let e=0;e<o;++e)t.fill();isNaN(r)||(l=a+(r%O||O))}qn(t,e,i,s,l,n),t.fill()}(t,this,r,n,o),Kn(t,this,r,n,o),t.restore()}},BarElement:class extends Hs{static id="bar";static defaults={borderSkipped:"start",borderWidth:0,borderRadius:0,inflateAmount:"auto",pointStyle:void 0};static defaultRoutes={backgroundColor:"backgroundColor",borderColor:"borderColor"};constructor(t){super(),this.options=void 0,this.horizontal=void 0,this.base=void 0,this.width=void 0,this.height=void 0,this.inflateAmount=void 0,t&&Object.assign(this,t)}draw(t){const{inflateAmount:e,options:{borderColor:i,backgroundColor:s}}=this,{inner:n,outer:o}=lo(this),a=(r=o.radius).topLeft||r.topRight||r.bottomLeft||r.bottomRight?He:co;var r;t.save(),o.w===n.w&&o.h===n.h||(t.beginPath(),a(t,uo(o,e,n)),t.clip(),a(t,uo(n,-e,o)),t.fillStyle=i,t.fill("evenodd")),t.beginPath(),a(t,uo(n,e)),t.fillStyle=s,t.fill(),t.restore()}inRange(t,e,i){return ho(this,t,e,i)}inXRange(t,e){return ho(this,t,null,e)}inYRange(t,e){return ho(this,null,t,e)}getCenterPoint(t){const{x:e,y:i,base:s,horizontal:n}=this.getProps(["x","y","base","horizontal"],t);return{x:n?(e+s)/2:e,y:n?i:(i+s)/2}}getRange(t){return"x"===t?this.width/2:this.height/2}},LineElement:no,PointElement:class extends Hs{static id="point";parsed;skip;stop;static defaults={borderWidth:1,hitRadius:1,hoverBorderWidth:1,hoverRadius:4,pointStyle:"circle",radius:3,rotation:0};static defaultRoutes={backgroundColor:"backgroundColor",borderColor:"borderColor"};constructor(t){super(),this.options=void 0,this.parsed=void 0,this.skip=void 0,this.stop=void 0,t&&Object.assign(this,t)}inRange(t,e,i){const s=this.options,{x:n,y:o}=this.getProps(["x","y"],i);return Math.pow(t-n,2)+Math.pow(e-o,2)<Math.pow(s.hitRadius+s.radius,2)}inXRange(t,e){return oo(this,t,"x",e)}inYRange(t,e){return oo(this,t,"y",e)}getCenterPoint(t){const{x:e,y:i}=this.getProps(["x","y"],t);return{x:e,y:i}}size(t){let e=(t=t||this.options||{}).radius||0;e=Math.max(e,e&&t.hoverRadius||0);return 2*(e+(e&&t.borderWidth||0))}draw(t,e){const i=this.options;this.skip||i.radius<.1||!Re(this,e,this.size(i)/2)||(t.strokeStyle=i.borderColor,t.lineWidth=i.borderWidth,t.fillStyle=i.backgroundColor,Le(t,i,this.x,this.y))}getRange(){const t=this.options||{};return t.radius+t.hitRadius}}});function go(t,e,i,s){const n=t.indexOf(e);if(-1===n)return((t,e,i,s)=>("string"==typeof e?(i=t.push(e)-1,s.unshift({index:i,label:e})):isNaN(e)&&(i=null),i))(t,e,i,s);return n!==t.lastIndexOf(e)?i:n}function po(t){const e=this.getLabels();return t>=0&&t<e.length?e[t]:t}function mo(t,e,{horizontal:i,minRotation:s}){const n=$(s),o=(i?Math.sin(n):Math.cos(n))||.001,a=.75*e*(""+t).length;return Math.min(e/o,a)}class bo extends Js{constructor(t){super(t),this.start=void 0,this.end=void 0,this._startValue=void 0,this._endValue=void 0,this._valueRange=0}parse(t,e){return s(t)||("number"==typeof t||t instanceof Number)&&!isFinite(+t)?null:+t}handleTickRangeOptions(){const{beginAtZero:t}=this.options,{minDefined:e,maxDefined:i}=this.getUserBounds();let{min:s,max:n}=this;const o=t=>s=e?s:t,a=t=>n=i?n:t;if(t){const t=F(s),e=F(n);t<0&&e<0?a(0):t>0&&e>0&&o(0)}if(s===n){let e=0===n?1:Math.abs(.05*n);a(n+e),t||o(s-e)}this.min=s,this.max=n}getTickLimit(){const t=this.options.ticks;let e,{maxTicksLimit:i,stepSize:s}=t;return s?(e=Math.ceil(this.max/s)-Math.floor(this.min/s)+1,e>1e3&&(console.warn(`scales.${this.id}.ticks.stepSize: ${s} would result generating up to ${e} ticks. Limiting to 1000.`),e=1e3)):(e=this.computeTickLimit(),i=i||11),i&&(e=Math.min(i,e)),e}computeTickLimit(){return Number.POSITIVE_INFINITY}buildTicks(){const t=this.options,e=t.ticks;let i=this.getTickLimit();i=Math.max(2,i);const n=function(t,e){const i=[],{bounds:n,step:o,min:a,max:r,precision:l,count:h,maxTicks:c,maxDigits:d,includeBounds:u}=t,f=o||1,g=c-1,{min:p,max:m}=e,b=!s(a),x=!s(r),_=!s(h),y=(m-p)/(d+1);let v,M,w,k,S=B((m-p)/g/f)*f;if(S<1e-14&&!b&&!x)return[{value:p},{value:m}];k=Math.ceil(m/S)-Math.floor(p/S),k>g&&(S=B(k*S/g/f)*f),s(l)||(v=Math.pow(10,l),S=Math.ceil(S*v)/v),"ticks"===n?(M=Math.floor(p/S)*S,w=Math.ceil(m/S)*S):(M=p,w=m),b&&x&&o&&H((r-a)/o,S/1e3)?(k=Math.round(Math.min((r-a)/S,c)),S=(r-a)/k,M=a,w=r):_?(M=b?a:M,w=x?r:w,k=h-1,S=(w-M)/k):(k=(w-M)/S,k=V(k,Math.round(k),S/1e3)?Math.round(k):Math.ceil(k));const P=Math.max(U(S),U(M));v=Math.pow(10,s(l)?P:l),M=Math.round(M*v)/v,w=Math.round(w*v)/v;let D=0;for(b&&(u&&M!==a?(i.push({value:a}),M<a&&D++,V(Math.round((M+D*S)*v)/v,a,mo(a,y,t))&&D++):M<a&&D++);D<k;++D){const t=Math.round((M+D*S)*v)/v;if(x&&t>r)break;i.push({value:t})}return x&&u&&w!==r?i.length&&V(i[i.length-1].value,r,mo(r,y,t))?i[i.length-1].value=r:i.push({value:r}):x&&w!==r||i.push({value:w}),i}({maxTicks:i,bounds:t.bounds,min:t.min,max:t.max,precision:e.precision,step:e.stepSize,count:e.count,maxDigits:this._maxDigits(),horizontal:this.isHorizontal(),minRotation:e.minRotation||0,includeBounds:!1!==e.includeBounds},this._range||this);return"ticks"===t.bounds&&j(n,this,"value"),t.reverse?(n.reverse(),this.start=this.max,this.end=this.min):(this.start=this.min,this.end=this.max),n}configure(){const t=this.ticks;let e=this.min,i=this.max;if(super.configure(),this.options.offset&&t.length){const s=(i-e)/Math.max(t.length-1,1)/2;e-=s,i+=s}this._startValue=e,this._endValue=i,this._valueRange=i-e}getLabelForValue(t){return ne(t,this.chart.options.locale,this.options.ticks.format)}}class xo extends bo{static id="linear";static defaults={ticks:{callback:ae.formatters.numeric}};determineDataLimits(){const{min:t,max:e}=this.getMinMax(!0);this.min=a(t)?t:0,this.max=a(e)?e:1,this.handleTickRangeOptions()}computeTickLimit(){const t=this.isHorizontal(),e=t?this.width:this.height,i=$(this.options.ticks.minRotation),s=(t?Math.sin(i):Math.cos(i))||.001,n=this._resolveTickFontOptions(0);return Math.ceil(e/Math.min(40,n.lineHeight/s))}getPixelForValue(t){return null===t?NaN:this.getPixelForDecimal((t-this._startValue)/this._valueRange)}getValueForPixel(t){return this._startValue+this.getDecimalForPixel(t)*this._valueRange}}const _o=t=>Math.floor(z(t)),yo=(t,e)=>Math.pow(10,_o(t)+e);function vo(t){return 1===t/Math.pow(10,_o(t))}function Mo(t,e,i){const s=Math.pow(10,i),n=Math.floor(t/s);return Math.ceil(e/s)-n}function wo(t,{min:e,max:i}){e=r(t.min,e);const s=[],n=_o(e);let o=function(t,e){let i=_o(e-t);for(;Mo(t,e,i)>10;)i++;for(;Mo(t,e,i)<10;)i--;return Math.min(i,_o(t))}(e,i),a=o<0?Math.pow(10,Math.abs(o)):1;const l=Math.pow(10,o),h=n>o?Math.pow(10,n):0,c=Math.round((e-h)*a)/a,d=Math.floor((e-h)/l/10)*l*10;let u=Math.floor((c-d)/Math.pow(10,o)),f=r(t.min,Math.round((h+d+u*Math.pow(10,o))*a)/a);for(;f<i;)s.push({value:f,major:vo(f),significand:u}),u>=10?u=u<15?15:20:u++,u>=20&&(o++,u=2,a=o>=0?1:a),f=Math.round((h+d+u*Math.pow(10,o))*a)/a;const g=r(t.max,f);return s.push({value:g,major:vo(g),significand:u}),s}class ko extends Js{static id="logarithmic";static defaults={ticks:{callback:ae.formatters.logarithmic,major:{enabled:!0}}};constructor(t){super(t),this.start=void 0,this.end=void 0,this._startValue=void 0,this._valueRange=0}parse(t,e){const i=bo.prototype.parse.apply(this,[t,e]);if(0!==i)return a(i)&&i>0?i:null;this._zero=!0}determineDataLimits(){const{min:t,max:e}=this.getMinMax(!0);this.min=a(t)?Math.max(0,t):null,this.max=a(e)?Math.max(0,e):null,this.options.beginAtZero&&(this._zero=!0),this._zero&&this.min!==this._suggestedMin&&!a(this._userMin)&&(this.min=t===yo(this.min,0)?yo(this.min,-1):yo(this.min,0)),this.handleTickRangeOptions()}handleTickRangeOptions(){const{minDefined:t,maxDefined:e}=this.getUserBounds();let i=this.min,s=this.max;const n=e=>i=t?i:e,o=t=>s=e?s:t;i===s&&(i<=0?(n(1),o(10)):(n(yo(i,-1)),o(yo(s,1)))),i<=0&&n(yo(s,-1)),s<=0&&o(yo(i,1)),this.min=i,this.max=s}buildTicks(){const t=this.options,e=wo({min:this._userMin,max:this._userMax},this);return"ticks"===t.bounds&&j(e,this,"value"),t.reverse?(e.reverse(),this.start=this.max,this.end=this.min):(this.start=this.min,this.end=this.max),e}getLabelForValue(t){return void 0===t?"0":ne(t,this.chart.options.locale,this.options.ticks.format)}configure(){const t=this.min;super.configure(),this._startValue=z(t),this._valueRange=z(this.max)-z(t)}getPixelForValue(t){return void 0!==t&&0!==t||(t=this.min),null===t||isNaN(t)?NaN:this.getPixelForDecimal(t===this.min?0:(z(t)-this._startValue)/this._valueRange)}getValueForPixel(t){const e=this.getDecimalForPixel(t);return Math.pow(10,this._startValue+e*this._valueRange)}}function So(t){const e=t.ticks;if(e.display&&t.display){const t=ki(e.backdropPadding);return l(e.font&&e.font.size,ue.font.size)+t.height}return 0}function Po(t,e,i,s,n){return t===s||t===n?{start:e-i/2,end:e+i/2}:t<s||t>n?{start:e-i,end:e}:{start:e,end:e+i}}function Do(t){const e={l:t.left+t._padding.left,r:t.right-t._padding.right,t:t.top+t._padding.top,b:t.bottom-t._padding.bottom},i=Object.assign({},e),s=[],o=[],a=t._pointLabels.length,r=t.options.pointLabels,l=r.centerPointLabels?C/a:0;for(let u=0;u<a;u++){const a=r.setContext(t.getPointLabelContext(u));o[u]=a.padding;const f=t.getPointPosition(u,t.drawingArea+o[u],l),g=Si(a.font),p=(h=t.ctx,c=g,d=n(d=t._pointLabels[u])?d:[d],{w:Oe(h,c.string,d),h:d.length*c.lineHeight});s[u]=p;const m=G(t.getIndexAngle(u)+l),b=Math.round(Y(m));Co(i,e,m,Po(b,f.x,p.w,0,180),Po(b,f.y,p.h,90,270))}var h,c,d;t.setCenterPoint(e.l-i.l,i.r-e.r,e.t-i.t,i.b-e.b),t._pointLabelItems=function(t,e,i){const s=[],n=t._pointLabels.length,o=t.options,{centerPointLabels:a,display:r}=o.pointLabels,l={extra:So(o)/2,additionalAngle:a?C/n:0};let h;for(let o=0;o<n;o++){l.padding=i[o],l.size=e[o];const n=Oo(t,o,l);s.push(n),"auto"===r&&(n.visible=Ao(n,h),n.visible&&(h=n))}return s}(t,s,o)}function Co(t,e,i,s,n){const o=Math.abs(Math.sin(i)),a=Math.abs(Math.cos(i));let r=0,l=0;s.start<e.l?(r=(e.l-s.start)/o,t.l=Math.min(t.l,e.l-r)):s.end>e.r&&(r=(s.end-e.r)/o,t.r=Math.max(t.r,e.r+r)),n.start<e.t?(l=(e.t-n.start)/a,t.t=Math.min(t.t,e.t-l)):n.end>e.b&&(l=(n.end-e.b)/a,t.b=Math.max(t.b,e.b+l))}function Oo(t,e,i){const s=t.drawingArea,{extra:n,additionalAngle:o,padding:a,size:r}=i,l=t.getPointPosition(e,s+n+a,o),h=Math.round(Y(G(l.angle+E))),c=function(t,e,i){90===i||270===i?t-=e/2:(i>270||i<90)&&(t-=e);return t}(l.y,r.h,h),d=function(t){if(0===t||180===t)return"center";if(t<180)return"left";return"right"}(h),u=function(t,e,i){"right"===i?t-=e:"center"===i&&(t-=e/2);return t}(l.x,r.w,d);return{visible:!0,x:l.x,y:c,textAlign:d,left:u,top:c,right:u+r.w,bottom:c+r.h}}function Ao(t,e){if(!e)return!0;const{left:i,top:s,right:n,bottom:o}=t;return!(Re({x:i,y:s},e)||Re({x:i,y:o},e)||Re({x:n,y:s},e)||Re({x:n,y:o},e))}function To(t,e,i){const{left:n,top:o,right:a,bottom:r}=i,{backdropColor:l}=e;if(!s(l)){const i=wi(e.borderRadius),s=ki(e.backdropPadding);t.fillStyle=l;const h=n-s.left,c=o-s.top,d=a-n+s.width,u=r-o+s.height;Object.values(i).some((t=>0!==t))?(t.beginPath(),He(t,{x:h,y:c,w:d,h:u,radius:i}),t.fill()):t.fillRect(h,c,d,u)}}function Lo(t,e,i,s){const{ctx:n}=t;if(i)n.arc(t.xCenter,t.yCenter,e,0,O);else{let i=t.getPointPosition(0,e);n.moveTo(i.x,i.y);for(let o=1;o<s;o++)i=t.getPointPosition(o,e),n.lineTo(i.x,i.y)}}class Eo extends bo{static id="radialLinear";static defaults={display:!0,animate:!0,position:"chartArea",angleLines:{display:!0,lineWidth:1,borderDash:[],borderDashOffset:0},grid:{circular:!1},startAngle:0,ticks:{showLabelBackdrop:!0,callback:ae.formatters.numeric},pointLabels:{backdropColor:void 0,backdropPadding:2,display:!0,font:{size:10},callback:t=>t,padding:5,centerPointLabels:!1}};static defaultRoutes={"angleLines.color":"borderColor","pointLabels.color":"color","ticks.color":"color"};static descriptors={angleLines:{_fallback:"grid"}};constructor(t){super(t),this.xCenter=void 0,this.yCenter=void 0,this.drawingArea=void 0,this._pointLabels=[],this._pointLabelItems=[]}setDimensions(){const t=this._padding=ki(So(this.options)/2),e=this.width=this.maxWidth-t.width,i=this.height=this.maxHeight-t.height;this.xCenter=Math.floor(this.left+e/2+t.left),this.yCenter=Math.floor(this.top+i/2+t.top),this.drawingArea=Math.floor(Math.min(e,i)/2)}determineDataLimits(){const{min:t,max:e}=this.getMinMax(!1);this.min=a(t)&&!isNaN(t)?t:0,this.max=a(e)&&!isNaN(e)?e:0,this.handleTickRangeOptions()}computeTickLimit(){return Math.ceil(this.drawingArea/So(this.options))}generateTickLabels(t){bo.prototype.generateTickLabels.call(this,t),this._pointLabels=this.getLabels().map(((t,e)=>{const i=d(this.options.pointLabels.callback,[t,e],this);return i||0===i?i:""})).filter(((t,e)=>this.chart.getDataVisibility(e)))}fit(){const t=this.options;t.display&&t.pointLabels.display?Do(this):this.setCenterPoint(0,0,0,0)}setCenterPoint(t,e,i,s){this.xCenter+=Math.floor((t-e)/2),this.yCenter+=Math.floor((i-s)/2),this.drawingArea-=Math.min(this.drawingArea/2,Math.max(t,e,i,s))}getIndexAngle(t){return G(t*(O/(this._pointLabels.length||1))+$(this.options.startAngle||0))}getDistanceFromCenterForValue(t){if(s(t))return NaN;const e=this.drawingArea/(this.max-this.min);return this.options.reverse?(this.max-t)*e:(t-this.min)*e}getValueForDistanceFromCenter(t){if(s(t))return NaN;const e=t/(this.drawingArea/(this.max-this.min));return this.options.reverse?this.max-e:this.min+e}getPointLabelContext(t){const e=this._pointLabels||[];if(t>=0&&t<e.length){const i=e[t];return function(t,e,i){return Ci(t,{label:i,index:e,type:"pointLabel"})}(this.getContext(),t,i)}}getPointPosition(t,e,i=0){const s=this.getIndexAngle(t)-E+i;return{x:Math.cos(s)*e+this.xCenter,y:Math.sin(s)*e+this.yCenter,angle:s}}getPointPositionForValue(t,e){return this.getPointPosition(t,this.getDistanceFromCenterForValue(e))}getBasePosition(t){return this.getPointPositionForValue(t||0,this.getBaseValue())}getPointLabelPosition(t){const{left:e,top:i,right:s,bottom:n}=this._pointLabelItems[t];return{left:e,top:i,right:s,bottom:n}}drawBackground(){const{backgroundColor:t,grid:{circular:e}}=this.options;if(t){const i=this.ctx;i.save(),i.beginPath(),Lo(this,this.getDistanceFromCenterForValue(this._endValue),e,this._pointLabels.length),i.closePath(),i.fillStyle=t,i.fill(),i.restore()}}drawGrid(){const t=this.ctx,e=this.options,{angleLines:i,grid:s,border:n}=e,o=this._pointLabels.length;let a,r,l;if(e.pointLabels.display&&function(t,e){const{ctx:i,options:{pointLabels:s}}=t;for(let n=e-1;n>=0;n--){const e=t._pointLabelItems[n];if(!e.visible)continue;const o=s.setContext(t.getPointLabelContext(n));To(i,o,e);const a=Si(o.font),{x:r,y:l,textAlign:h}=e;Ne(i,t._pointLabels[n],r,l+a.lineHeight/2,a,{color:o.color,textAlign:h,textBaseline:"middle"})}}(this,o),s.display&&this.ticks.forEach(((t,e)=>{if(0!==e){r=this.getDistanceFromCenterForValue(t.value);const i=this.getContext(e),a=s.setContext(i),l=n.setContext(i);!function(t,e,i,s,n){const o=t.ctx,a=e.circular,{color:r,lineWidth:l}=e;!a&&!s||!r||!l||i<0||(o.save(),o.strokeStyle=r,o.lineWidth=l,o.setLineDash(n.dash),o.lineDashOffset=n.dashOffset,o.beginPath(),Lo(t,i,a,s),o.closePath(),o.stroke(),o.restore())}(this,a,r,o,l)}})),i.display){for(t.save(),a=o-1;a>=0;a--){const s=i.setContext(this.getPointLabelContext(a)),{color:n,lineWidth:o}=s;o&&n&&(t.lineWidth=o,t.strokeStyle=n,t.setLineDash(s.borderDash),t.lineDashOffset=s.borderDashOffset,r=this.getDistanceFromCenterForValue(e.ticks.reverse?this.min:this.max),l=this.getPointPosition(a,r),t.beginPath(),t.moveTo(this.xCenter,this.yCenter),t.lineTo(l.x,l.y),t.stroke())}t.restore()}}drawBorder(){}drawLabels(){const t=this.ctx,e=this.options,i=e.ticks;if(!i.display)return;const s=this.getIndexAngle(0);let n,o;t.save(),t.translate(this.xCenter,this.yCenter),t.rotate(s),t.textAlign="center",t.textBaseline="middle",this.ticks.forEach(((s,a)=>{if(0===a&&!e.reverse)return;const r=i.setContext(this.getContext(a)),l=Si(r.font);if(n=this.getDistanceFromCenterForValue(this.ticks[a].value),r.showLabelBackdrop){t.font=l.string,o=t.measureText(s.label).width,t.fillStyle=r.backdropColor;const e=ki(r.backdropPadding);t.fillRect(-o/2-e.left,-n-l.size/2-e.top,o+e.width,l.size+e.height)}Ne(t,s.label,0,-n,l,{color:r.color,strokeColor:r.textStrokeColor,strokeWidth:r.textStrokeWidth})})),t.restore()}drawTitle(){}}const Ro={millisecond:{common:!0,size:1,steps:1e3},second:{common:!0,size:1e3,steps:60},minute:{common:!0,size:6e4,steps:60},hour:{common:!0,size:36e5,steps:24},day:{common:!0,size:864e5,steps:30},week:{common:!1,size:6048e5,steps:4},month:{common:!0,size:2628e6,steps:12},quarter:{common:!1,size:7884e6,steps:4},year:{common:!0,size:3154e7}},Io=Object.keys(Ro);function zo(t,e){return t-e}function Fo(t,e){if(s(e))return null;const i=t._adapter,{parser:n,round:o,isoWeekday:r}=t._parseOpts;let l=e;return"function"==typeof n&&(l=n(l)),a(l)||(l="string"==typeof n?i.parse(l,n):i.parse(l)),null===l?null:(o&&(l="week"!==o||!N(r)&&!0!==r?i.startOf(l,o):i.startOf(l,"isoWeek",r)),+l)}function Vo(t,e,i,s){const n=Io.length;for(let o=Io.indexOf(t);o<n-1;++o){const t=Ro[Io[o]],n=t.steps?t.steps:Number.MAX_SAFE_INTEGER;if(t.common&&Math.ceil((i-e)/(n*t.size))<=s)return Io[o]}return Io[n-1]}function Bo(t,e,i){if(i){if(i.length){const{lo:s,hi:n}=et(i,e);t[i[s]>=e?i[s]:i[n]]=!0}}else t[e]=!0}function Wo(t,e,i){const s=[],n={},o=e.length;let a,r;for(a=0;a<o;++a)r=e[a],n[r]=a,s.push({value:r,major:!1});return 0!==o&&i?function(t,e,i,s){const n=t._adapter,o=+n.startOf(e[0].value,s),a=e[e.length-1].value;let r,l;for(r=o;r<=a;r=+n.add(r,1,s))l=i[r],l>=0&&(e[l].major=!0);return e}(t,s,n,i):s}class No extends Js{static id="time";static defaults={bounds:"data",adapters:{},time:{parser:!1,unit:!1,round:!1,isoWeekday:!1,minUnit:"millisecond",displayFormats:{}},ticks:{source:"auto",callback:!1,major:{enabled:!1}}};constructor(t){super(t),this._cache={data:[],labels:[],all:[]},this._unit="day",this._majorUnit=void 0,this._offsets={},this._normalized=!1,this._parseOpts=void 0}init(t,e={}){const i=t.time||(t.time={}),s=this._adapter=new Rn._date(t.adapters.date);s.init(e),x(i.displayFormats,s.formats()),this._parseOpts={parser:i.parser,round:i.round,isoWeekday:i.isoWeekday},super.init(t),this._normalized=e.normalized}parse(t,e){return void 0===t?null:Fo(this,t)}beforeLayout(){super.beforeLayout(),this._cache={data:[],labels:[],all:[]}}determineDataLimits(){const t=this.options,e=this._adapter,i=t.time.unit||"day";let{min:s,max:n,minDefined:o,maxDefined:r}=this.getUserBounds();function l(t){o||isNaN(t.min)||(s=Math.min(s,t.min)),r||isNaN(t.max)||(n=Math.max(n,t.max))}o&&r||(l(this._getLabelBounds()),"ticks"===t.bounds&&"labels"===t.ticks.source||l(this.getMinMax(!1))),s=a(s)&&!isNaN(s)?s:+e.startOf(Date.now(),i),n=a(n)&&!isNaN(n)?n:+e.endOf(Date.now(),i)+1,this.min=Math.min(s,n-1),this.max=Math.max(s+1,n)}_getLabelBounds(){const t=this.getLabelTimestamps();let e=Number.POSITIVE_INFINITY,i=Number.NEGATIVE_INFINITY;return t.length&&(e=t[0],i=t[t.length-1]),{min:e,max:i}}buildTicks(){const t=this.options,e=t.time,i=t.ticks,s="labels"===i.source?this.getLabelTimestamps():this._generate();"ticks"===t.bounds&&s.length&&(this.min=this._userMin||s[0],this.max=this._userMax||s[s.length-1]);const n=this.min,o=nt(s,n,this.max);return this._unit=e.unit||(i.autoSkip?Vo(e.minUnit,this.min,this.max,this._getLabelCapacity(n)):function(t,e,i,s,n){for(let o=Io.length-1;o>=Io.indexOf(i);o--){const i=Io[o];if(Ro[i].common&&t._adapter.diff(n,s,i)>=e-1)return i}return Io[i?Io.indexOf(i):0]}(this,o.length,e.minUnit,this.min,this.max)),this._majorUnit=i.major.enabled&&"year"!==this._unit?function(t){for(let e=Io.indexOf(t)+1,i=Io.length;e<i;++e)if(Ro[Io[e]].common)return Io[e]}(this._unit):void 0,this.initOffsets(s),t.reverse&&o.reverse(),Wo(this,o,this._majorUnit)}afterAutoSkip(){this.options.offsetAfterAutoskip&&this.initOffsets(this.ticks.map((t=>+t.value)))}initOffsets(t=[]){let e,i,s=0,n=0;this.options.offset&&t.length&&(e=this.getDecimalForValue(t[0]),s=1===t.length?1-e:(this.getDecimalForValue(t[1])-e)/2,i=this.getDecimalForValue(t[t.length-1]),n=1===t.length?i:(i-this.getDecimalForValue(t[t.length-2]))/2);const o=t.length<3?.5:.25;s=J(s,0,o),n=J(n,0,o),this._offsets={start:s,end:n,factor:1/(s+1+n)}}_generate(){const t=this._adapter,e=this.min,i=this.max,s=this.options,n=s.time,o=n.unit||Vo(n.minUnit,e,i,this._getLabelCapacity(e)),a=l(s.ticks.stepSize,1),r="week"===o&&n.isoWeekday,h=N(r)||!0===r,c={};let d,u,f=e;if(h&&(f=+t.startOf(f,"isoWeek",r)),f=+t.startOf(f,h?"day":o),t.diff(i,e,o)>1e5*a)throw new Error(e+" and "+i+" are too far apart with stepSize of "+a+" "+o);const g="data"===s.ticks.source&&this.getDataTimestamps();for(d=f,u=0;d<i;d=+t.add(d,a,o),u++)Bo(c,d,g);return d!==i&&"ticks"!==s.bounds&&1!==u||Bo(c,d,g),Object.keys(c).sort(zo).map((t=>+t))}getLabelForValue(t){const e=this._adapter,i=this.options.time;return i.tooltipFormat?e.format(t,i.tooltipFormat):e.format(t,i.displayFormats.datetime)}format(t,e){const i=this.options.time.displayFormats,s=this._unit,n=e||i[s];return this._adapter.format(t,n)}_tickFormatFunction(t,e,i,s){const n=this.options,o=n.ticks.callback;if(o)return d(o,[t,e,i],this);const a=n.time.displayFormats,r=this._unit,l=this._majorUnit,h=r&&a[r],c=l&&a[l],u=i[e],f=l&&c&&u&&u.major;return this._adapter.format(t,s||(f?c:h))}generateTickLabels(t){let e,i,s;for(e=0,i=t.length;e<i;++e)s=t[e],s.label=this._tickFormatFunction(s.value,e,t)}getDecimalForValue(t){return null===t?NaN:(t-this.min)/(this.max-this.min)}getPixelForValue(t){const e=this._offsets,i=this.getDecimalForValue(t);return this.getPixelForDecimal((e.start+i)*e.factor)}getValueForPixel(t){const e=this._offsets,i=this.getDecimalForPixel(t)/e.factor-e.end;return this.min+i*(this.max-this.min)}_getLabelSize(t){const e=this.options.ticks,i=this.ctx.measureText(t).width,s=$(this.isHorizontal()?e.maxRotation:e.minRotation),n=Math.cos(s),o=Math.sin(s),a=this._resolveTickFontOptions(0).size;return{w:i*n+a*o,h:i*o+a*n}}_getLabelCapacity(t){const e=this.options.time,i=e.displayFormats,s=i[e.unit]||i.millisecond,n=this._tickFormatFunction(t,0,Wo(this,[t],this._majorUnit),s),o=this._getLabelSize(n),a=Math.floor(this.isHorizontal()?this.width/o.w:this.height/o.h)-1;return a>0?a:1}getDataTimestamps(){let t,e,i=this._cache.data||[];if(i.length)return i;const s=this.getMatchingVisibleMetas();if(this._normalized&&s.length)return this._cache.data=s[0].controller.getAllParsedValues(this);for(t=0,e=s.length;t<e;++t)i=i.concat(s[t].controller.getAllParsedValues(this));return this._cache.data=this.normalize(i)}getLabelTimestamps(){const t=this._cache.labels||[];let e,i;if(t.length)return t;const s=this.getLabels();for(e=0,i=s.length;e<i;++e)t.push(Fo(this,s[e]));return this._cache.labels=this._normalized?t:this.normalize(t)}normalize(t){return lt(t.sort(zo))}}function Ho(t,e,i){let s,n,o,a,r=0,l=t.length-1;i?(e>=t[r].pos&&e<=t[l].pos&&({lo:r,hi:l}=it(t,"pos",e)),({pos:s,time:o}=t[r]),({pos:n,time:a}=t[l])):(e>=t[r].time&&e<=t[l].time&&({lo:r,hi:l}=it(t,"time",e)),({time:s,pos:o}=t[r]),({time:n,pos:a}=t[l]));const h=n-s;return h?o+(a-o)*(e-s)/h:o}var jo=Object.freeze({__proto__:null,CategoryScale:class extends Js{static id="category";static defaults={ticks:{callback:po}};constructor(t){super(t),this._startValue=void 0,this._valueRange=0,this._addedLabels=[]}init(t){const e=this._addedLabels;if(e.length){const t=this.getLabels();for(const{index:i,label:s}of e)t[i]===s&&t.splice(i,1);this._addedLabels=[]}super.init(t)}parse(t,e){if(s(t))return null;const i=this.getLabels();return((t,e)=>null===t?null:J(Math.round(t),0,e))(e=isFinite(e)&&i[e]===t?e:go(i,t,l(e,t),this._addedLabels),i.length-1)}determineDataLimits(){const{minDefined:t,maxDefined:e}=this.getUserBounds();let{min:i,max:s}=this.getMinMax(!0);"ticks"===this.options.bounds&&(t||(i=0),e||(s=this.getLabels().length-1)),this.min=i,this.max=s}buildTicks(){const t=this.min,e=this.max,i=this.options.offset,s=[];let n=this.getLabels();n=0===t&&e===n.length-1?n:n.slice(t,e+1),this._valueRange=Math.max(n.length-(i?0:1),1),this._startValue=this.min-(i?.5:0);for(let i=t;i<=e;i++)s.push({value:i});return s}getLabelForValue(t){return po.call(this,t)}configure(){super.configure(),this.isHorizontal()||(this._reversePixels=!this._reversePixels)}getPixelForValue(t){return"number"!=typeof t&&(t=this.parse(t)),null===t?NaN:this.getPixelForDecimal((t-this._startValue)/this._valueRange)}getPixelForTick(t){const e=this.ticks;return t<0||t>e.length-1?null:this.getPixelForValue(e[t].value)}getValueForPixel(t){return Math.round(this._startValue+this.getDecimalForPixel(t)*this._valueRange)}getBasePixel(){return this.bottom}},LinearScale:xo,LogarithmicScale:ko,RadialLinearScale:Eo,TimeScale:No,TimeSeriesScale:class extends No{static id="timeseries";static defaults=No.defaults;constructor(t){super(t),this._table=[],this._minPos=void 0,this._tableRange=void 0}initOffsets(){const t=this._getTimestampsForTable(),e=this._table=this.buildLookupTable(t);this._minPos=Ho(e,this.min),this._tableRange=Ho(e,this.max)-this._minPos,super.initOffsets(t)}buildLookupTable(t){const{min:e,max:i}=this,s=[],n=[];let o,a,r,l,h;for(o=0,a=t.length;o<a;++o)l=t[o],l>=e&&l<=i&&s.push(l);if(s.length<2)return[{time:e,pos:0},{time:i,pos:1}];for(o=0,a=s.length;o<a;++o)h=s[o+1],r=s[o-1],l=s[o],Math.round((h+r)/2)!==l&&n.push({time:l,pos:o/(a-1)});return n}_generate(){const t=this.min,e=this.max;let i=super.getDataTimestamps();return i.includes(t)&&i.length||i.splice(0,0,t),i.includes(e)&&1!==i.length||i.push(e),i.sort(((t,e)=>t-e))}_getTimestampsForTable(){let t=this._cache.all||[];if(t.length)return t;const e=this.getDataTimestamps(),i=this.getLabelTimestamps();return t=e.length&&i.length?this.normalize(e.concat(i)):e.length?e:i,t=this._cache.all=t,t}getDecimalForValue(t){return(Ho(this._table,t)-this._minPos)/this._tableRange}getValueForPixel(t){const e=this._offsets,i=this.getDecimalForPixel(t)/e.factor-e.end;return Ho(this._table,i*this._tableRange+this._minPos,!0)}}});const $o=["rgb(54, 162, 235)","rgb(255, 99, 132)","rgb(255, 159, 64)","rgb(255, 205, 86)","rgb(75, 192, 192)","rgb(153, 102, 255)","rgb(201, 203, 207)"],Yo=$o.map((t=>t.replace("rgb(","rgba(").replace(")",", 0.5)")));function Uo(t){return $o[t%$o.length]}function Xo(t){return Yo[t%Yo.length]}function qo(t){let e=0;return(i,s)=>{const n=t.getDatasetMeta(s).controller;n instanceof jn?e=function(t,e){return t.backgroundColor=t.data.map((()=>Uo(e++))),e}(i,e):n instanceof $n?e=function(t,e){return t.backgroundColor=t.data.map((()=>Xo(e++))),e}(i,e):n&&(e=function(t,e){return t.borderColor=Uo(e),t.backgroundColor=Xo(e),++e}(i,e))}}function Ko(t){let e;for(e in t)if(t[e].borderColor||t[e].backgroundColor)return!0;return!1}var Go={id:"colors",defaults:{enabled:!0,forceOverride:!1},beforeLayout(t,e,i){if(!i.enabled)return;const{data:{datasets:s},options:n}=t.config,{elements:o}=n;if(!i.forceOverride&&(Ko(s)||(a=n)&&(a.borderColor||a.backgroundColor)||o&&Ko(o)))return;var a;const r=qo(t);s.forEach(r)}};function Zo(t){if(t._decimated){const e=t._data;delete t._decimated,delete t._data,Object.defineProperty(t,"data",{configurable:!0,enumerable:!0,writable:!0,value:e})}}function Jo(t){t.data.datasets.forEach((t=>{Zo(t)}))}var Qo={id:"decimation",defaults:{algorithm:"min-max",enabled:!1},beforeElementsUpdate:(t,e,i)=>{if(!i.enabled)return void Jo(t);const n=t.width;t.data.datasets.forEach(((e,o)=>{const{_data:a,indexAxis:r}=e,l=t.getDatasetMeta(o),h=a||e.data;if("y"===Pi([r,t.options.indexAxis]))return;if(!l.controller.supportsDecimation)return;const c=t.scales[l.xAxisID];if("linear"!==c.type&&"time"!==c.type)return;if(t.options.parsing)return;let{start:d,count:u}=function(t,e){const i=e.length;let s,n=0;const{iScale:o}=t,{min:a,max:r,minDefined:l,maxDefined:h}=o.getUserBounds();return l&&(n=J(it(e,o.axis,a).lo,0,i-1)),s=h?J(it(e,o.axis,r).hi+1,n,i)-n:i-n,{start:n,count:s}}(l,h);if(u<=(i.threshold||4*n))return void Zo(e);let f;switch(s(a)&&(e._data=h,delete e.data,Object.defineProperty(e,"data",{configurable:!0,enumerable:!0,get:function(){return this._decimated},set:function(t){this._data=t}})),i.algorithm){case"lttb":f=function(t,e,i,s,n){const o=n.samples||s;if(o>=i)return t.slice(e,e+i);const a=[],r=(i-2)/(o-2);let l=0;const h=e+i-1;let c,d,u,f,g,p=e;for(a[l++]=t[p],c=0;c<o-2;c++){let s,n=0,o=0;const h=Math.floor((c+1)*r)+1+e,m=Math.min(Math.floor((c+2)*r)+1,i)+e,b=m-h;for(s=h;s<m;s++)n+=t[s].x,o+=t[s].y;n/=b,o/=b;const x=Math.floor(c*r)+1+e,_=Math.min(Math.floor((c+1)*r)+1,i)+e,{x:y,y:v}=t[p];for(u=f=-1,s=x;s<_;s++)f=.5*Math.abs((y-n)*(t[s].y-v)-(y-t[s].x)*(o-v)),f>u&&(u=f,d=t[s],g=s);a[l++]=d,p=g}return a[l++]=t[h],a}(h,d,u,n,i);break;case"min-max":f=function(t,e,i,n){let o,a,r,l,h,c,d,u,f,g,p=0,m=0;const b=[],x=e+i-1,_=t[e].x,y=t[x].x-_;for(o=e;o<e+i;++o){a=t[o],r=(a.x-_)/y*n,l=a.y;const e=0|r;if(e===h)l<f?(f=l,c=o):l>g&&(g=l,d=o),p=(m*p+a.x)/++m;else{const i=o-1;if(!s(c)&&!s(d)){const e=Math.min(c,d),s=Math.max(c,d);e!==u&&e!==i&&b.push({...t[e],x:p}),s!==u&&s!==i&&b.push({...t[s],x:p})}o>0&&i!==u&&b.push(t[i]),b.push(a),h=e,m=0,f=g=l,c=d=u=o}}return b}(h,d,u,n);break;default:throw new Error(`Unsupported decimation algorithm '${i.algorithm}'`)}e._decimated=f}))},destroy(t){Jo(t)}};function ta(t,e,i,s){if(s)return;let n=e[t],o=i[t];return"angle"===t&&(n=G(n),o=G(o)),{property:t,start:n,end:o}}function ea(t,e,i){for(;e>t;e--){const t=i[e];if(!isNaN(t.x)&&!isNaN(t.y))break}return e}function ia(t,e,i,s){return t&&e?s(t[i],e[i]):t?t[i]:e?e[i]:0}function sa(t,e){let i=[],s=!1;return n(t)?(s=!0,i=t):i=function(t,e){const{x:i=null,y:s=null}=t||{},n=e.points,o=[];return e.segments.forEach((({start:t,end:e})=>{e=ea(t,e,n);const a=n[t],r=n[e];null!==s?(o.push({x:a.x,y:s}),o.push({x:r.x,y:s})):null!==i&&(o.push({x:i,y:a.y}),o.push({x:i,y:r.y}))})),o}(t,e),i.length?new no({points:i,options:{tension:0},_loop:s,_fullLoop:s}):null}function na(t){return t&&!1!==t.fill}function oa(t,e,i){let s=t[e].fill;const n=[e];let o;if(!i)return s;for(;!1!==s&&-1===n.indexOf(s);){if(!a(s))return s;if(o=t[s],!o)return!1;if(o.visible)return s;n.push(s),s=o.fill}return!1}function aa(t,e,i){const s=function(t){const e=t.options,i=e.fill;let s=l(i&&i.target,i);void 0===s&&(s=!!e.backgroundColor);if(!1===s||null===s)return!1;if(!0===s)return"origin";return s}(t);if(o(s))return!isNaN(s.value)&&s;let n=parseFloat(s);return a(n)&&Math.floor(n)===n?function(t,e,i,s){"-"!==t&&"+"!==t||(i=e+i);if(i===e||i<0||i>=s)return!1;return i}(s[0],e,n,i):["origin","start","end","stack","shape"].indexOf(s)>=0&&s}function ra(t,e,i){const s=[];for(let n=0;n<i.length;n++){const o=i[n],{first:a,last:r,point:l}=la(o,e,"x");if(!(!l||a&&r))if(a)s.unshift(l);else if(t.push(l),!r)break}t.push(...s)}function la(t,e,i){const s=t.interpolate(e,i);if(!s)return{};const n=s[i],o=t.segments,a=t.points;let r=!1,l=!1;for(let t=0;t<o.length;t++){const e=o[t],s=a[e.start][i],h=a[e.end][i];if(tt(n,s,h)){r=n===s,l=n===h;break}}return{first:r,last:l,point:s}}class ha{constructor(t){this.x=t.x,this.y=t.y,this.radius=t.radius}pathSegment(t,e,i){const{x:s,y:n,radius:o}=this;return e=e||{start:0,end:O},t.arc(s,n,o,e.end,e.start,!0),!i.bounds}interpolate(t){const{x:e,y:i,radius:s}=this,n=t.angle;return{x:e+Math.cos(n)*s,y:i+Math.sin(n)*s,angle:n}}}function ca(t){const{chart:e,fill:i,line:s}=t;if(a(i))return function(t,e){const i=t.getDatasetMeta(e),s=i&&t.isDatasetVisible(e);return s?i.dataset:null}(e,i);if("stack"===i)return function(t){const{scale:e,index:i,line:s}=t,n=[],o=s.segments,a=s.points,r=function(t,e){const i=[],s=t.getMatchingVisibleMetas("line");for(let t=0;t<s.length;t++){const n=s[t];if(n.index===e)break;n.hidden||i.unshift(n.dataset)}return i}(e,i);r.push(sa({x:null,y:e.bottom},s));for(let t=0;t<o.length;t++){const e=o[t];for(let t=e.start;t<=e.end;t++)ra(n,a[t],r)}return new no({points:n,options:{}})}(t);if("shape"===i)return!0;const n=function(t){const e=t.scale||{};if(e.getPointPositionForValue)return function(t){const{scale:e,fill:i}=t,s=e.options,n=e.getLabels().length,a=s.reverse?e.max:e.min,r=function(t,e,i){let s;return s="start"===t?i:"end"===t?e.options.reverse?e.min:e.max:o(t)?t.value:e.getBaseValue(),s}(i,e,a),l=[];if(s.grid.circular){const t=e.getPointPositionForValue(0,a);return new ha({x:t.x,y:t.y,radius:e.getDistanceFromCenterForValue(r)})}for(let t=0;t<n;++t)l.push(e.getPointPositionForValue(t,r));return l}(t);return function(t){const{scale:e={},fill:i}=t,s=function(t,e){let i=null;return"start"===t?i=e.bottom:"end"===t?i=e.top:o(t)?i=e.getPixelForValue(t.value):e.getBasePixel&&(i=e.getBasePixel()),i}(i,e);if(a(s)){const t=e.isHorizontal();return{x:t?s:null,y:t?null:s}}return null}(t)}(t);return n instanceof ha?n:sa(n,s)}function da(t,e,i){const s=ca(e),{line:n,scale:o,axis:a}=e,r=n.options,l=r.fill,h=r.backgroundColor,{above:c=h,below:d=h}=l||{};s&&n.points.length&&(Ie(t,i),function(t,e){const{line:i,target:s,above:n,below:o,area:a,scale:r}=e,l=i._loop?"angle":e.axis;t.save(),"x"===l&&o!==n&&(ua(t,s,a.top),fa(t,{line:i,target:s,color:n,scale:r,property:l}),t.restore(),t.save(),ua(t,s,a.bottom));fa(t,{line:i,target:s,color:o,scale:r,property:l}),t.restore()}(t,{line:n,target:s,above:c,below:d,area:i,scale:o,axis:a}),ze(t))}function ua(t,e,i){const{segments:s,points:n}=e;let o=!0,a=!1;t.beginPath();for(const r of s){const{start:s,end:l}=r,h=n[s],c=n[ea(s,l,n)];o?(t.moveTo(h.x,h.y),o=!1):(t.lineTo(h.x,i),t.lineTo(h.x,h.y)),a=!!e.pathSegment(t,r,{move:a}),a?t.closePath():t.lineTo(c.x,i)}t.lineTo(e.first().x,i),t.closePath(),t.clip()}function fa(t,e){const{line:i,target:s,property:n,color:o,scale:a}=e,r=function(t,e,i){const s=t.segments,n=t.points,o=e.points,a=[];for(const t of s){let{start:s,end:r}=t;r=ea(s,r,n);const l=ta(i,n[s],n[r],t.loop);if(!e.segments){a.push({source:t,target:l,start:n[s],end:n[r]});continue}const h=Ii(e,l);for(const e of h){const s=ta(i,o[e.start],o[e.end],e.loop),r=Ri(t,n,s);for(const t of r)a.push({source:t,target:e,start:{[i]:ia(l,s,"start",Math.max)},end:{[i]:ia(l,s,"end",Math.min)}})}}return a}(i,s,n);for(const{source:e,target:l,start:h,end:c}of r){const{style:{backgroundColor:r=o}={}}=e,d=!0!==s;t.save(),t.fillStyle=r,ga(t,a,d&&ta(n,h,c)),t.beginPath();const u=!!i.pathSegment(t,e);let f;if(d){u?t.closePath():pa(t,s,c,n);const e=!!s.pathSegment(t,l,{move:u,reverse:!0});f=u&&e,f||pa(t,s,h,n)}t.closePath(),t.fill(f?"evenodd":"nonzero"),t.restore()}}function ga(t,e,i){const{top:s,bottom:n}=e.chart.chartArea,{property:o,start:a,end:r}=i||{};"x"===o&&(t.beginPath(),t.rect(a,s,r-a,n-s),t.clip())}function pa(t,e,i,s){const n=e.interpolate(i,s);n&&t.lineTo(n.x,n.y)}var ma={id:"filler",afterDatasetsUpdate(t,e,i){const s=(t.data.datasets||[]).length,n=[];let o,a,r,l;for(a=0;a<s;++a)o=t.getDatasetMeta(a),r=o.dataset,l=null,r&&r.options&&r instanceof no&&(l={visible:t.isDatasetVisible(a),index:a,fill:aa(r,a,s),chart:t,axis:o.controller.options.indexAxis,scale:o.vScale,line:r}),o.$filler=l,n.push(l);for(a=0;a<s;++a)l=n[a],l&&!1!==l.fill&&(l.fill=oa(n,a,i.propagate))},beforeDraw(t,e,i){const s="beforeDraw"===i.drawTime,n=t.getSortedVisibleDatasetMetas(),o=t.chartArea;for(let e=n.length-1;e>=0;--e){const i=n[e].$filler;i&&(i.line.updateControlPoints(o,i.axis),s&&i.fill&&da(t.ctx,i,o))}},beforeDatasetsDraw(t,e,i){if("beforeDatasetsDraw"!==i.drawTime)return;const s=t.getSortedVisibleDatasetMetas();for(let e=s.length-1;e>=0;--e){const i=s[e].$filler;na(i)&&da(t.ctx,i,t.chartArea)}},beforeDatasetDraw(t,e,i){const s=e.meta.$filler;na(s)&&"beforeDatasetDraw"===i.drawTime&&da(t.ctx,s,t.chartArea)},defaults:{propagate:!0,drawTime:"beforeDatasetDraw"}};const ba=(t,e)=>{let{boxHeight:i=e,boxWidth:s=e}=t;return t.usePointStyle&&(i=Math.min(i,e),s=t.pointStyleWidth||Math.min(s,e)),{boxWidth:s,boxHeight:i,itemHeight:Math.max(e,i)}};class xa extends Hs{constructor(t){super(),this._added=!1,this.legendHitBoxes=[],this._hoveredItem=null,this.doughnutMode=!1,this.chart=t.chart,this.options=t.options,this.ctx=t.ctx,this.legendItems=void 0,this.columnSizes=void 0,this.lineWidths=void 0,this.maxHeight=void 0,this.maxWidth=void 0,this.top=void 0,this.bottom=void 0,this.left=void 0,this.right=void 0,this.height=void 0,this.width=void 0,this._margins=void 0,this.position=void 0,this.weight=void 0,this.fullSize=void 0}update(t,e,i){this.maxWidth=t,this.maxHeight=e,this._margins=i,this.setDimensions(),this.buildLabels(),this.fit()}setDimensions(){this.isHorizontal()?(this.width=this.maxWidth,this.left=this._margins.left,this.right=this.width):(this.height=this.maxHeight,this.top=this._margins.top,this.bottom=this.height)}buildLabels(){const t=this.options.labels||{};let e=d(t.generateLabels,[this.chart],this)||[];t.filter&&(e=e.filter((e=>t.filter(e,this.chart.data)))),t.sort&&(e=e.sort(((e,i)=>t.sort(e,i,this.chart.data)))),this.options.reverse&&e.reverse(),this.legendItems=e}fit(){const{options:t,ctx:e}=this;if(!t.display)return void(this.width=this.height=0);const i=t.labels,s=Si(i.font),n=s.size,o=this._computeTitleHeight(),{boxWidth:a,itemHeight:r}=ba(i,n);let l,h;e.font=s.string,this.isHorizontal()?(l=this.maxWidth,h=this._fitRows(o,n,a,r)+10):(h=this.maxHeight,l=this._fitCols(o,s,a,r)+10),this.width=Math.min(l,t.maxWidth||this.maxWidth),this.height=Math.min(h,t.maxHeight||this.maxHeight)}_fitRows(t,e,i,s){const{ctx:n,maxWidth:o,options:{labels:{padding:a}}}=this,r=this.legendHitBoxes=[],l=this.lineWidths=[0],h=s+a;let c=t;n.textAlign="left",n.textBaseline="middle";let d=-1,u=-h;return this.legendItems.forEach(((t,f)=>{const g=i+e/2+n.measureText(t.text).width;(0===f||l[l.length-1]+g+2*a>o)&&(c+=h,l[l.length-(f>0?0:1)]=0,u+=h,d++),r[f]={left:0,top:u,row:d,width:g,height:s},l[l.length-1]+=g+a})),c}_fitCols(t,e,i,s){const{ctx:n,maxHeight:o,options:{labels:{padding:a}}}=this,r=this.legendHitBoxes=[],l=this.columnSizes=[],h=o-t;let c=a,d=0,u=0,f=0,g=0;return this.legendItems.forEach(((t,o)=>{const{itemWidth:p,itemHeight:m}=function(t,e,i,s,n){const o=function(t,e,i,s){let n=t.text;n&&"string"!=typeof n&&(n=n.reduce(((t,e)=>t.length>e.length?t:e)));return e+i.size/2+s.measureText(n).width}(s,t,e,i),a=function(t,e,i){let s=t;"string"!=typeof e.text&&(s=_a(e,i));return s}(n,s,e.lineHeight);return{itemWidth:o,itemHeight:a}}(i,e,n,t,s);o>0&&u+m+2*a>h&&(c+=d+a,l.push({width:d,height:u}),f+=d+a,g++,d=u=0),r[o]={left:f,top:u,col:g,width:p,height:m},d=Math.max(d,p),u+=m+a})),c+=d,l.push({width:d,height:u}),c}adjustHitBoxes(){if(!this.options.display)return;const t=this._computeTitleHeight(),{legendHitBoxes:e,options:{align:i,labels:{padding:s},rtl:n}}=this,o=Oi(n,this.left,this.width);if(this.isHorizontal()){let n=0,a=ft(i,this.left+s,this.right-this.lineWidths[n]);for(const r of e)n!==r.row&&(n=r.row,a=ft(i,this.left+s,this.right-this.lineWidths[n])),r.top+=this.top+t+s,r.left=o.leftForLtr(o.x(a),r.width),a+=r.width+s}else{let n=0,a=ft(i,this.top+t+s,this.bottom-this.columnSizes[n].height);for(const r of e)r.col!==n&&(n=r.col,a=ft(i,this.top+t+s,this.bottom-this.columnSizes[n].height)),r.top=a,r.left+=this.left+s,r.left=o.leftForLtr(o.x(r.left),r.width),a+=r.height+s}}isHorizontal(){return"top"===this.options.position||"bottom"===this.options.position}draw(){if(this.options.display){const t=this.ctx;Ie(t,this),this._draw(),ze(t)}}_draw(){const{options:t,columnSizes:e,lineWidths:i,ctx:s}=this,{align:n,labels:o}=t,a=ue.color,r=Oi(t.rtl,this.left,this.width),h=Si(o.font),{padding:c}=o,d=h.size,u=d/2;let f;this.drawTitle(),s.textAlign=r.textAlign("left"),s.textBaseline="middle",s.lineWidth=.5,s.font=h.string;const{boxWidth:g,boxHeight:p,itemHeight:m}=ba(o,d),b=this.isHorizontal(),x=this._computeTitleHeight();f=b?{x:ft(n,this.left+c,this.right-i[0]),y:this.top+c+x,line:0}:{x:this.left+c,y:ft(n,this.top+x+c,this.bottom-e[0].height),line:0},Ai(this.ctx,t.textDirection);const _=m+c;this.legendItems.forEach(((y,v)=>{s.strokeStyle=y.fontColor,s.fillStyle=y.fontColor;const M=s.measureText(y.text).width,w=r.textAlign(y.textAlign||(y.textAlign=o.textAlign)),k=g+u+M;let S=f.x,P=f.y;r.setWidth(this.width),b?v>0&&S+k+c>this.right&&(P=f.y+=_,f.line++,S=f.x=ft(n,this.left+c,this.right-i[f.line])):v>0&&P+_>this.bottom&&(S=f.x=S+e[f.line].width+c,f.line++,P=f.y=ft(n,this.top+x+c,this.bottom-e[f.line].height));if(function(t,e,i){if(isNaN(g)||g<=0||isNaN(p)||p<0)return;s.save();const n=l(i.lineWidth,1);if(s.fillStyle=l(i.fillStyle,a),s.lineCap=l(i.lineCap,"butt"),s.lineDashOffset=l(i.lineDashOffset,0),s.lineJoin=l(i.lineJoin,"miter"),s.lineWidth=n,s.strokeStyle=l(i.strokeStyle,a),s.setLineDash(l(i.lineDash,[])),o.usePointStyle){const a={radius:p*Math.SQRT2/2,pointStyle:i.pointStyle,rotation:i.rotation,borderWidth:n},l=r.xPlus(t,g/2);Ee(s,a,l,e+u,o.pointStyleWidth&&g)}else{const o=e+Math.max((d-p)/2,0),a=r.leftForLtr(t,g),l=wi(i.borderRadius);s.beginPath(),Object.values(l).some((t=>0!==t))?He(s,{x:a,y:o,w:g,h:p,radius:l}):s.rect(a,o,g,p),s.fill(),0!==n&&s.stroke()}s.restore()}(r.x(S),P,y),S=gt(w,S+g+u,b?S+k:this.right,t.rtl),function(t,e,i){Ne(s,i.text,t,e+m/2,h,{strikethrough:i.hidden,textAlign:r.textAlign(i.textAlign)})}(r.x(S),P,y),b)f.x+=k+c;else if("string"!=typeof y.text){const t=h.lineHeight;f.y+=_a(y,t)+c}else f.y+=_})),Ti(this.ctx,t.textDirection)}drawTitle(){const t=this.options,e=t.title,i=Si(e.font),s=ki(e.padding);if(!e.display)return;const n=Oi(t.rtl,this.left,this.width),o=this.ctx,a=e.position,r=i.size/2,l=s.top+r;let h,c=this.left,d=this.width;if(this.isHorizontal())d=Math.max(...this.lineWidths),h=this.top+l,c=ft(t.align,c,this.right-d);else{const e=this.columnSizes.reduce(((t,e)=>Math.max(t,e.height)),0);h=l+ft(t.align,this.top,this.bottom-e-t.labels.padding-this._computeTitleHeight())}const u=ft(a,c,c+d);o.textAlign=n.textAlign(ut(a)),o.textBaseline="middle",o.strokeStyle=e.color,o.fillStyle=e.color,o.font=i.string,Ne(o,e.text,u,h,i)}_computeTitleHeight(){const t=this.options.title,e=Si(t.font),i=ki(t.padding);return t.display?e.lineHeight+i.height:0}_getLegendItemAt(t,e){let i,s,n;if(tt(t,this.left,this.right)&&tt(e,this.top,this.bottom))for(n=this.legendHitBoxes,i=0;i<n.length;++i)if(s=n[i],tt(t,s.left,s.left+s.width)&&tt(e,s.top,s.top+s.height))return this.legendItems[i];return null}handleEvent(t){const e=this.options;if(!function(t,e){if(("mousemove"===t||"mouseout"===t)&&(e.onHover||e.onLeave))return!0;if(e.onClick&&("click"===t||"mouseup"===t))return!0;return!1}(t.type,e))return;const i=this._getLegendItemAt(t.x,t.y);if("mousemove"===t.type||"mouseout"===t.type){const o=this._hoveredItem,a=(n=i,null!==(s=o)&&null!==n&&s.datasetIndex===n.datasetIndex&&s.index===n.index);o&&!a&&d(e.onLeave,[t,o,this],this),this._hoveredItem=i,i&&!a&&d(e.onHover,[t,i,this],this)}else i&&d(e.onClick,[t,i,this],this);var s,n}}function _a(t,e){return e*(t.text?t.text.length:0)}var ya={id:"legend",_element:xa,start(t,e,i){const s=t.legend=new xa({ctx:t.ctx,options:i,chart:t});as.configure(t,s,i),as.addBox(t,s)},stop(t){as.removeBox(t,t.legend),delete t.legend},beforeUpdate(t,e,i){const s=t.legend;as.configure(t,s,i),s.options=i},afterUpdate(t){const e=t.legend;e.buildLabels(),e.adjustHitBoxes()},afterEvent(t,e){e.replay||t.legend.handleEvent(e.event)},defaults:{display:!0,position:"top",align:"center",fullSize:!0,reverse:!1,weight:1e3,onClick(t,e,i){const s=e.datasetIndex,n=i.chart;n.isDatasetVisible(s)?(n.hide(s),e.hidden=!0):(n.show(s),e.hidden=!1)},onHover:null,onLeave:null,labels:{color:t=>t.chart.options.color,boxWidth:40,padding:10,generateLabels(t){const e=t.data.datasets,{labels:{usePointStyle:i,pointStyle:s,textAlign:n,color:o,useBorderRadius:a,borderRadius:r}}=t.legend.options;return t._getSortedDatasetMetas().map((t=>{const l=t.controller.getStyle(i?0:void 0),h=ki(l.borderWidth);return{text:e[t.index].label,fillStyle:l.backgroundColor,fontColor:o,hidden:!t.visible,lineCap:l.borderCapStyle,lineDash:l.borderDash,lineDashOffset:l.borderDashOffset,lineJoin:l.borderJoinStyle,lineWidth:(h.width+h.height)/4,strokeStyle:l.borderColor,pointStyle:s||l.pointStyle,rotation:l.rotation,textAlign:n||l.textAlign,borderRadius:a&&(r||l.borderRadius),datasetIndex:t.index}}),this)}},title:{color:t=>t.chart.options.color,display:!1,position:"center",text:""}},descriptors:{_scriptable:t=>!t.startsWith("on"),labels:{_scriptable:t=>!["generateLabels","filter","sort"].includes(t)}}};class va extends Hs{constructor(t){super(),this.chart=t.chart,this.options=t.options,this.ctx=t.ctx,this._padding=void 0,this.top=void 0,this.bottom=void 0,this.left=void 0,this.right=void 0,this.width=void 0,this.height=void 0,this.position=void 0,this.weight=void 0,this.fullSize=void 0}update(t,e){const i=this.options;if(this.left=0,this.top=0,!i.display)return void(this.width=this.height=this.right=this.bottom=0);this.width=this.right=t,this.height=this.bottom=e;const s=n(i.text)?i.text.length:1;this._padding=ki(i.padding);const o=s*Si(i.font).lineHeight+this._padding.height;this.isHorizontal()?this.height=o:this.width=o}isHorizontal(){const t=this.options.position;return"top"===t||"bottom"===t}_drawArgs(t){const{top:e,left:i,bottom:s,right:n,options:o}=this,a=o.align;let r,l,h,c=0;return this.isHorizontal()?(l=ft(a,i,n),h=e+t,r=n-i):("left"===o.position?(l=i+t,h=ft(a,s,e),c=-.5*C):(l=n-t,h=ft(a,e,s),c=.5*C),r=s-e),{titleX:l,titleY:h,maxWidth:r,rotation:c}}draw(){const t=this.ctx,e=this.options;if(!e.display)return;const i=Si(e.font),s=i.lineHeight/2+this._padding.top,{titleX:n,titleY:o,maxWidth:a,rotation:r}=this._drawArgs(s);Ne(t,e.text,0,0,i,{color:e.color,maxWidth:a,rotation:r,textAlign:ut(e.align),textBaseline:"middle",translation:[n,o]})}}var Ma={id:"title",_element:va,start(t,e,i){!function(t,e){const i=new va({ctx:t.ctx,options:e,chart:t});as.configure(t,i,e),as.addBox(t,i),t.titleBlock=i}(t,i)},stop(t){const e=t.titleBlock;as.removeBox(t,e),delete t.titleBlock},beforeUpdate(t,e,i){const s=t.titleBlock;as.configure(t,s,i),s.options=i},defaults:{align:"center",display:!1,font:{weight:"bold"},fullSize:!0,padding:10,position:"top",text:"",weight:2e3},defaultRoutes:{color:"color"},descriptors:{_scriptable:!0,_indexable:!1}};const wa=new WeakMap;var ka={id:"subtitle",start(t,e,i){const s=new va({ctx:t.ctx,options:i,chart:t});as.configure(t,s,i),as.addBox(t,s),wa.set(t,s)},stop(t){as.removeBox(t,wa.get(t)),wa.delete(t)},beforeUpdate(t,e,i){const s=wa.get(t);as.configure(t,s,i),s.options=i},defaults:{align:"center",display:!1,font:{weight:"normal"},fullSize:!0,padding:0,position:"top",text:"",weight:1500},defaultRoutes:{color:"color"},descriptors:{_scriptable:!0,_indexable:!1}};const Sa={average(t){if(!t.length)return!1;let e,i,s=0,n=0,o=0;for(e=0,i=t.length;e<i;++e){const i=t[e].element;if(i&&i.hasValue()){const t=i.tooltipPosition();s+=t.x,n+=t.y,++o}}return{x:s/o,y:n/o}},nearest(t,e){if(!t.length)return!1;let i,s,n,o=e.x,a=e.y,r=Number.POSITIVE_INFINITY;for(i=0,s=t.length;i<s;++i){const s=t[i].element;if(s&&s.hasValue()){const t=q(e,s.getCenterPoint());t<r&&(r=t,n=s)}}if(n){const t=n.tooltipPosition();o=t.x,a=t.y}return{x:o,y:a}}};function Pa(t,e){return e&&(n(e)?Array.prototype.push.apply(t,e):t.push(e)),t}function Da(t){return("string"==typeof t||t instanceof String)&&t.indexOf("\n")>-1?t.split("\n"):t}function Ca(t,e){const{element:i,datasetIndex:s,index:n}=e,o=t.getDatasetMeta(s).controller,{label:a,value:r}=o.getLabelAndValue(n);return{chart:t,label:a,parsed:o.getParsed(n),raw:t.data.datasets[s].data[n],formattedValue:r,dataset:o.getDataset(),dataIndex:n,datasetIndex:s,element:i}}function Oa(t,e){const i=t.chart.ctx,{body:s,footer:n,title:o}=t,{boxWidth:a,boxHeight:r}=e,l=Si(e.bodyFont),h=Si(e.titleFont),c=Si(e.footerFont),d=o.length,f=n.length,g=s.length,p=ki(e.padding);let m=p.height,b=0,x=s.reduce(((t,e)=>t+e.before.length+e.lines.length+e.after.length),0);if(x+=t.beforeBody.length+t.afterBody.length,d&&(m+=d*h.lineHeight+(d-1)*e.titleSpacing+e.titleMarginBottom),x){m+=g*(e.displayColors?Math.max(r,l.lineHeight):l.lineHeight)+(x-g)*l.lineHeight+(x-1)*e.bodySpacing}f&&(m+=e.footerMarginTop+f*c.lineHeight+(f-1)*e.footerSpacing);let _=0;const y=function(t){b=Math.max(b,i.measureText(t).width+_)};return i.save(),i.font=h.string,u(t.title,y),i.font=l.string,u(t.beforeBody.concat(t.afterBody),y),_=e.displayColors?a+2+e.boxPadding:0,u(s,(t=>{u(t.before,y),u(t.lines,y),u(t.after,y)})),_=0,i.font=c.string,u(t.footer,y),i.restore(),b+=p.width,{width:b,height:m}}function Aa(t,e,i,s){const{x:n,width:o}=i,{width:a,chartArea:{left:r,right:l}}=t;let h="center";return"center"===s?h=n<=(r+l)/2?"left":"right":n<=o/2?h="left":n>=a-o/2&&(h="right"),function(t,e,i,s){const{x:n,width:o}=s,a=i.caretSize+i.caretPadding;return"left"===t&&n+o+a>e.width||"right"===t&&n-o-a<0||void 0}(h,t,e,i)&&(h="center"),h}function Ta(t,e,i){const s=i.yAlign||e.yAlign||function(t,e){const{y:i,height:s}=e;return i<s/2?"top":i>t.height-s/2?"bottom":"center"}(t,i);return{xAlign:i.xAlign||e.xAlign||Aa(t,e,i,s),yAlign:s}}function La(t,e,i,s){const{caretSize:n,caretPadding:o,cornerRadius:a}=t,{xAlign:r,yAlign:l}=i,h=n+o,{topLeft:c,topRight:d,bottomLeft:u,bottomRight:f}=wi(a);let g=function(t,e){let{x:i,width:s}=t;return"right"===e?i-=s:"center"===e&&(i-=s/2),i}(e,r);const p=function(t,e,i){let{y:s,height:n}=t;return"top"===e?s+=i:s-="bottom"===e?n+i:n/2,s}(e,l,h);return"center"===l?"left"===r?g+=h:"right"===r&&(g-=h):"left"===r?g-=Math.max(c,u)+n:"right"===r&&(g+=Math.max(d,f)+n),{x:J(g,0,s.width-e.width),y:J(p,0,s.height-e.height)}}function Ea(t,e,i){const s=ki(i.padding);return"center"===e?t.x+t.width/2:"right"===e?t.x+t.width-s.right:t.x+s.left}function Ra(t){return Pa([],Da(t))}function Ia(t,e){const i=e&&e.dataset&&e.dataset.tooltip&&e.dataset.tooltip.callbacks;return i?t.override(i):t}const za={beforeTitle:e,title(t){if(t.length>0){const e=t[0],i=e.chart.data.labels,s=i?i.length:0;if(this&&this.options&&"dataset"===this.options.mode)return e.dataset.label||"";if(e.label)return e.label;if(s>0&&e.dataIndex<s)return i[e.dataIndex]}return""},afterTitle:e,beforeBody:e,beforeLabel:e,label(t){if(this&&this.options&&"dataset"===this.options.mode)return t.label+": "+t.formattedValue||t.formattedValue;let e=t.dataset.label||"";e&&(e+=": ");const i=t.formattedValue;return s(i)||(e+=i),e},labelColor(t){const e=t.chart.getDatasetMeta(t.datasetIndex).controller.getStyle(t.dataIndex);return{borderColor:e.borderColor,backgroundColor:e.backgroundColor,borderWidth:e.borderWidth,borderDash:e.borderDash,borderDashOffset:e.borderDashOffset,borderRadius:0}},labelTextColor(){return this.options.bodyColor},labelPointStyle(t){const e=t.chart.getDatasetMeta(t.datasetIndex).controller.getStyle(t.dataIndex);return{pointStyle:e.pointStyle,rotation:e.rotation}},afterLabel:e,afterBody:e,beforeFooter:e,footer:e,afterFooter:e};function Fa(t,e,i,s){const n=t[e].call(i,s);return void 0===n?za[e].call(i,s):n}class Va extends Hs{static positioners=Sa;constructor(t){super(),this.opacity=0,this._active=[],this._eventPosition=void 0,this._size=void 0,this._cachedAnimations=void 0,this._tooltipItems=[],this.$animations=void 0,this.$context=void 0,this.chart=t.chart,this.options=t.options,this.dataPoints=void 0,this.title=void 0,this.beforeBody=void 0,this.body=void 0,this.afterBody=void 0,this.footer=void 0,this.xAlign=void 0,this.yAlign=void 0,this.x=void 0,this.y=void 0,this.height=void 0,this.width=void 0,this.caretX=void 0,this.caretY=void 0,this.labelColors=void 0,this.labelPointStyles=void 0,this.labelTextColors=void 0}initialize(t){this.options=t,this._cachedAnimations=void 0,this.$context=void 0}_resolveAnimations(){const t=this._cachedAnimations;if(t)return t;const e=this.chart,i=this.options.setContext(this.getContext()),s=i.enabled&&e.options.animation&&i.animations,n=new Os(this.chart,s);return s._cacheable&&(this._cachedAnimations=Object.freeze(n)),n}getContext(){return this.$context||(this.$context=(t=this.chart.getContext(),e=this,i=this._tooltipItems,Ci(t,{tooltip:e,tooltipItems:i,type:"tooltip"})));var t,e,i}getTitle(t,e){const{callbacks:i}=e,s=Fa(i,"beforeTitle",this,t),n=Fa(i,"title",this,t),o=Fa(i,"afterTitle",this,t);let a=[];return a=Pa(a,Da(s)),a=Pa(a,Da(n)),a=Pa(a,Da(o)),a}getBeforeBody(t,e){return Ra(Fa(e.callbacks,"beforeBody",this,t))}getBody(t,e){const{callbacks:i}=e,s=[];return u(t,(t=>{const e={before:[],lines:[],after:[]},n=Ia(i,t);Pa(e.before,Da(Fa(n,"beforeLabel",this,t))),Pa(e.lines,Fa(n,"label",this,t)),Pa(e.after,Da(Fa(n,"afterLabel",this,t))),s.push(e)})),s}getAfterBody(t,e){return Ra(Fa(e.callbacks,"afterBody",this,t))}getFooter(t,e){const{callbacks:i}=e,s=Fa(i,"beforeFooter",this,t),n=Fa(i,"footer",this,t),o=Fa(i,"afterFooter",this,t);let a=[];return a=Pa(a,Da(s)),a=Pa(a,Da(n)),a=Pa(a,Da(o)),a}_createItems(t){const e=this._active,i=this.chart.data,s=[],n=[],o=[];let a,r,l=[];for(a=0,r=e.length;a<r;++a)l.push(Ca(this.chart,e[a]));return t.filter&&(l=l.filter(((e,s,n)=>t.filter(e,s,n,i)))),t.itemSort&&(l=l.sort(((e,s)=>t.itemSort(e,s,i)))),u(l,(e=>{const i=Ia(t.callbacks,e);s.push(Fa(i,"labelColor",this,e)),n.push(Fa(i,"labelPointStyle",this,e)),o.push(Fa(i,"labelTextColor",this,e))})),this.labelColors=s,this.labelPointStyles=n,this.labelTextColors=o,this.dataPoints=l,l}update(t,e){const i=this.options.setContext(this.getContext()),s=this._active;let n,o=[];if(s.length){const t=Sa[i.position].call(this,s,this._eventPosition);o=this._createItems(i),this.title=this.getTitle(o,i),this.beforeBody=this.getBeforeBody(o,i),this.body=this.getBody(o,i),this.afterBody=this.getAfterBody(o,i),this.footer=this.getFooter(o,i);const e=this._size=Oa(this,i),a=Object.assign({},t,e),r=Ta(this.chart,i,a),l=La(i,a,r,this.chart);this.xAlign=r.xAlign,this.yAlign=r.yAlign,n={opacity:1,x:l.x,y:l.y,width:e.width,height:e.height,caretX:t.x,caretY:t.y}}else 0!==this.opacity&&(n={opacity:0});this._tooltipItems=o,this.$context=void 0,n&&this._resolveAnimations().update(this,n),t&&i.external&&i.external.call(this,{chart:this.chart,tooltip:this,replay:e})}drawCaret(t,e,i,s){const n=this.getCaretPosition(t,i,s);e.lineTo(n.x1,n.y1),e.lineTo(n.x2,n.y2),e.lineTo(n.x3,n.y3)}getCaretPosition(t,e,i){const{xAlign:s,yAlign:n}=this,{caretSize:o,cornerRadius:a}=i,{topLeft:r,topRight:l,bottomLeft:h,bottomRight:c}=wi(a),{x:d,y:u}=t,{width:f,height:g}=e;let p,m,b,x,_,y;return"center"===n?(_=u+g/2,"left"===s?(p=d,m=p-o,x=_+o,y=_-o):(p=d+f,m=p+o,x=_-o,y=_+o),b=p):(m="left"===s?d+Math.max(r,h)+o:"right"===s?d+f-Math.max(l,c)-o:this.caretX,"top"===n?(x=u,_=x-o,p=m-o,b=m+o):(x=u+g,_=x+o,p=m+o,b=m-o),y=x),{x1:p,x2:m,x3:b,y1:x,y2:_,y3:y}}drawTitle(t,e,i){const s=this.title,n=s.length;let o,a,r;if(n){const l=Oi(i.rtl,this.x,this.width);for(t.x=Ea(this,i.titleAlign,i),e.textAlign=l.textAlign(i.titleAlign),e.textBaseline="middle",o=Si(i.titleFont),a=i.titleSpacing,e.fillStyle=i.titleColor,e.font=o.string,r=0;r<n;++r)e.fillText(s[r],l.x(t.x),t.y+o.lineHeight/2),t.y+=o.lineHeight+a,r+1===n&&(t.y+=i.titleMarginBottom-a)}}_drawColorBox(t,e,i,s,n){const a=this.labelColors[i],r=this.labelPointStyles[i],{boxHeight:l,boxWidth:h}=n,c=Si(n.bodyFont),d=Ea(this,"left",n),u=s.x(d),f=l<c.lineHeight?(c.lineHeight-l)/2:0,g=e.y+f;if(n.usePointStyle){const e={radius:Math.min(h,l)/2,pointStyle:r.pointStyle,rotation:r.rotation,borderWidth:1},i=s.leftForLtr(u,h)+h/2,o=g+l/2;t.strokeStyle=n.multiKeyBackground,t.fillStyle=n.multiKeyBackground,Le(t,e,i,o),t.strokeStyle=a.borderColor,t.fillStyle=a.backgroundColor,Le(t,e,i,o)}else{t.lineWidth=o(a.borderWidth)?Math.max(...Object.values(a.borderWidth)):a.borderWidth||1,t.strokeStyle=a.borderColor,t.setLineDash(a.borderDash||[]),t.lineDashOffset=a.borderDashOffset||0;const e=s.leftForLtr(u,h),i=s.leftForLtr(s.xPlus(u,1),h-2),r=wi(a.borderRadius);Object.values(r).some((t=>0!==t))?(t.beginPath(),t.fillStyle=n.multiKeyBackground,He(t,{x:e,y:g,w:h,h:l,radius:r}),t.fill(),t.stroke(),t.fillStyle=a.backgroundColor,t.beginPath(),He(t,{x:i,y:g+1,w:h-2,h:l-2,radius:r}),t.fill()):(t.fillStyle=n.multiKeyBackground,t.fillRect(e,g,h,l),t.strokeRect(e,g,h,l),t.fillStyle=a.backgroundColor,t.fillRect(i,g+1,h-2,l-2))}t.fillStyle=this.labelTextColors[i]}drawBody(t,e,i){const{body:s}=this,{bodySpacing:n,bodyAlign:o,displayColors:a,boxHeight:r,boxWidth:l,boxPadding:h}=i,c=Si(i.bodyFont);let d=c.lineHeight,f=0;const g=Oi(i.rtl,this.x,this.width),p=function(i){e.fillText(i,g.x(t.x+f),t.y+d/2),t.y+=d+n},m=g.textAlign(o);let b,x,_,y,v,M,w;for(e.textAlign=o,e.textBaseline="middle",e.font=c.string,t.x=Ea(this,m,i),e.fillStyle=i.bodyColor,u(this.beforeBody,p),f=a&&"right"!==m?"center"===o?l/2+h:l+2+h:0,y=0,M=s.length;y<M;++y){for(b=s[y],x=this.labelTextColors[y],e.fillStyle=x,u(b.before,p),_=b.lines,a&&_.length&&(this._drawColorBox(e,t,y,g,i),d=Math.max(c.lineHeight,r)),v=0,w=_.length;v<w;++v)p(_[v]),d=c.lineHeight;u(b.after,p)}f=0,d=c.lineHeight,u(this.afterBody,p),t.y-=n}drawFooter(t,e,i){const s=this.footer,n=s.length;let o,a;if(n){const r=Oi(i.rtl,this.x,this.width);for(t.x=Ea(this,i.footerAlign,i),t.y+=i.footerMarginTop,e.textAlign=r.textAlign(i.footerAlign),e.textBaseline="middle",o=Si(i.footerFont),e.fillStyle=i.footerColor,e.font=o.string,a=0;a<n;++a)e.fillText(s[a],r.x(t.x),t.y+o.lineHeight/2),t.y+=o.lineHeight+i.footerSpacing}}drawBackground(t,e,i,s){const{xAlign:n,yAlign:o}=this,{x:a,y:r}=t,{width:l,height:h}=i,{topLeft:c,topRight:d,bottomLeft:u,bottomRight:f}=wi(s.cornerRadius);e.fillStyle=s.backgroundColor,e.strokeStyle=s.borderColor,e.lineWidth=s.borderWidth,e.beginPath(),e.moveTo(a+c,r),"top"===o&&this.drawCaret(t,e,i,s),e.lineTo(a+l-d,r),e.quadraticCurveTo(a+l,r,a+l,r+d),"center"===o&&"right"===n&&this.drawCaret(t,e,i,s),e.lineTo(a+l,r+h-f),e.quadraticCurveTo(a+l,r+h,a+l-f,r+h),"bottom"===o&&this.drawCaret(t,e,i,s),e.lineTo(a+u,r+h),e.quadraticCurveTo(a,r+h,a,r+h-u),"center"===o&&"left"===n&&this.drawCaret(t,e,i,s),e.lineTo(a,r+c),e.quadraticCurveTo(a,r,a+c,r),e.closePath(),e.fill(),s.borderWidth>0&&e.stroke()}_updateAnimationTarget(t){const e=this.chart,i=this.$animations,s=i&&i.x,n=i&&i.y;if(s||n){const i=Sa[t.position].call(this,this._active,this._eventPosition);if(!i)return;const o=this._size=Oa(this,t),a=Object.assign({},i,this._size),r=Ta(e,t,a),l=La(t,a,r,e);s._to===l.x&&n._to===l.y||(this.xAlign=r.xAlign,this.yAlign=r.yAlign,this.width=o.width,this.height=o.height,this.caretX=i.x,this.caretY=i.y,this._resolveAnimations().update(this,l))}}_willRender(){return!!this.opacity}draw(t){const e=this.options.setContext(this.getContext());let i=this.opacity;if(!i)return;this._updateAnimationTarget(e);const s={width:this.width,height:this.height},n={x:this.x,y:this.y};i=Math.abs(i)<.001?0:i;const o=ki(e.padding),a=this.title.length||this.beforeBody.length||this.body.length||this.afterBody.length||this.footer.length;e.enabled&&a&&(t.save(),t.globalAlpha=i,this.drawBackground(n,t,s,e),Ai(t,e.textDirection),n.y+=o.top,this.drawTitle(n,t,e),this.drawBody(n,t,e),this.drawFooter(n,t,e),Ti(t,e.textDirection),t.restore())}getActiveElements(){return this._active||[]}setActiveElements(t,e){const i=this._active,s=t.map((({datasetIndex:t,index:e})=>{const i=this.chart.getDatasetMeta(t);if(!i)throw new Error("Cannot find a dataset at index "+t);return{datasetIndex:t,element:i.data[e],index:e}})),n=!f(i,s),o=this._positionChanged(s,e);(n||o)&&(this._active=s,this._eventPosition=e,this._ignoreReplayEvents=!0,this.update(!0))}handleEvent(t,e,i=!0){if(e&&this._ignoreReplayEvents)return!1;this._ignoreReplayEvents=!1;const s=this.options,n=this._active||[],o=this._getActiveElements(t,n,e,i),a=this._positionChanged(o,t),r=e||!f(o,n)||a;return r&&(this._active=o,(s.enabled||s.external)&&(this._eventPosition={x:t.x,y:t.y},this.update(!0,e))),r}_getActiveElements(t,e,i,s){const n=this.options;if("mouseout"===t.type)return[];if(!s)return e.filter((t=>this.chart.data.datasets[t.datasetIndex]&&void 0!==this.chart.getDatasetMeta(t.datasetIndex).controller.getParsed(t.index)));const o=this.chart.getElementsAtEventForMode(t,n.mode,n,i);return n.reverse&&o.reverse(),o}_positionChanged(t,e){const{caretX:i,caretY:s,options:n}=this,o=Sa[n.position].call(this,t,e);return!1!==o&&(i!==o.x||s!==o.y)}}var Ba={id:"tooltip",_element:Va,positioners:Sa,afterInit(t,e,i){i&&(t.tooltip=new Va({chart:t,options:i}))},beforeUpdate(t,e,i){t.tooltip&&t.tooltip.initialize(i)},reset(t,e,i){t.tooltip&&t.tooltip.initialize(i)},afterDraw(t){const e=t.tooltip;if(e&&e._willRender()){const i={tooltip:e};if(!1===t.notifyPlugins("beforeTooltipDraw",{...i,cancelable:!0}))return;e.draw(t.ctx),t.notifyPlugins("afterTooltipDraw",i)}},afterEvent(t,e){if(t.tooltip){const i=e.replay;t.tooltip.handleEvent(e.event,i,e.inChartArea)&&(e.changed=!0)}},defaults:{enabled:!0,external:null,position:"average",backgroundColor:"rgba(0,0,0,0.8)",titleColor:"#fff",titleFont:{weight:"bold"},titleSpacing:2,titleMarginBottom:6,titleAlign:"left",bodyColor:"#fff",bodySpacing:2,bodyFont:{},bodyAlign:"left",footerColor:"#fff",footerSpacing:2,footerMarginTop:6,footerFont:{weight:"bold"},footerAlign:"left",padding:6,caretPadding:2,caretSize:5,cornerRadius:6,boxHeight:(t,e)=>e.bodyFont.size,boxWidth:(t,e)=>e.bodyFont.size,multiKeyBackground:"#fff",displayColors:!0,boxPadding:0,borderColor:"rgba(0,0,0,0)",borderWidth:0,animation:{duration:400,easing:"easeOutQuart"},animations:{numbers:{type:"number",properties:["x","y","width","height","caretX","caretY"]},opacity:{easing:"linear",duration:200}},callbacks:za},defaultRoutes:{bodyFont:"font",footerFont:"font",titleFont:"font"},descriptors:{_scriptable:t=>"filter"!==t&&"itemSort"!==t&&"external"!==t,_indexable:!1,callbacks:{_scriptable:!1,_indexable:!1},animation:{_fallback:!1},animations:{_fallback:"animation"}},additionalOptionScopes:["interaction"]};return An.register(Yn,jo,fo,t),An.helpers={...Wi},An._adapters=Rn,An.Animation=Cs,An.Animations=Os,An.animator=xt,An.controllers=en.controllers.items,An.DatasetController=Ns,An.Element=Hs,An.elements=fo,An.Interaction=Xi,An.layouts=as,An.platforms=Ss,An.Scale=Js,An.Ticks=ae,Object.assign(An,Yn,jo,fo,t,Ss),An.Chart=An,"undefined"!=typeof window&&(window.Chart=An),An}));
//# sourceMappingURL=chart.umd.js.map

;
/*!
 * chartjs-plugin-datalabels v2.2.0
 * https://chartjs-plugin-datalabels.netlify.app
 * (c) 2017-2022 chartjs-plugin-datalabels contributors
 * Released under the MIT license
 */
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e(require("chart.js/helpers"),require("chart.js")):"function"==typeof define&&define.amd?define(["chart.js/helpers","chart.js"],e):(t="undefined"!=typeof globalThis?globalThis:t||self).ChartDataLabels=e(t.Chart.helpers,t.Chart)}(this,(function(t,e){"use strict";var r=function(){if("undefined"!=typeof window){if(window.devicePixelRatio)return window.devicePixelRatio;var t=window.screen;if(t)return(t.deviceXDPI||1)/(t.logicalXDPI||1)}return 1}(),a=function(e){var r,a=[];for(e=[].concat(e);e.length;)"string"==typeof(r=e.pop())?a.unshift.apply(a,r.split("\n")):Array.isArray(r)?e.push.apply(e,r):t.isNullOrUndef(e)||a.unshift(""+r);return a},o=function(t,e,r){var a,o=[].concat(e),n=o.length,i=t.font,l=0;for(t.font=r.string,a=0;a<n;++a)l=Math.max(t.measureText(o[a]).width,l);return t.font=i,{height:n*r.lineHeight,width:l}},n=function(t,e,r){return Math.max(t,Math.min(e,r))},i=function(t,e){var r,a,o,n,i=t.slice(),l=[];for(r=0,o=e.length;r<o;++r)n=e[r],-1===(a=i.indexOf(n))?l.push([n,1]):i.splice(a,1);for(r=0,o=i.length;r<o;++r)l.push([i[r],-1]);return l};function l(t,e){var r=e.x,a=e.y;if(null===r)return{x:0,y:-1};if(null===a)return{x:1,y:0};var o=t.x-r,n=t.y-a,i=Math.sqrt(o*o+n*n);return{x:i?o/i:0,y:i?n/i:-1}}function s(t,e,r){var a=0;return t<r.left?a|=1:t>r.right&&(a|=2),e<r.top?a|=8:e>r.bottom&&(a|=4),a}function u(t,e){var r,a,o=e.anchor,n=t;return e.clamp&&(n=function(t,e){for(var r,a,o,n=t.x0,i=t.y0,l=t.x1,u=t.y1,d=s(n,i,e),c=s(l,u,e);d|c&&!(d&c);)8&(r=d||c)?(a=n+(l-n)*(e.top-i)/(u-i),o=e.top):4&r?(a=n+(l-n)*(e.bottom-i)/(u-i),o=e.bottom):2&r?(o=i+(u-i)*(e.right-n)/(l-n),a=e.right):1&r&&(o=i+(u-i)*(e.left-n)/(l-n),a=e.left),r===d?d=s(n=a,i=o,e):c=s(l=a,u=o,e);return{x0:n,x1:l,y0:i,y1:u}}(n,e.area)),"start"===o?(r=n.x0,a=n.y0):"end"===o?(r=n.x1,a=n.y1):(r=(n.x0+n.x1)/2,a=(n.y0+n.y1)/2),function(t,e,r,a,o){switch(o){case"center":r=a=0;break;case"bottom":r=0,a=1;break;case"right":r=1,a=0;break;case"left":r=-1,a=0;break;case"top":r=0,a=-1;break;case"start":r=-r,a=-a;break;case"end":break;default:o*=Math.PI/180,r=Math.cos(o),a=Math.sin(o)}return{x:t,y:e,vx:r,vy:a}}(r,a,t.vx,t.vy,e.align)}var d=function(t,e){var r=(t.startAngle+t.endAngle)/2,a=Math.cos(r),o=Math.sin(r),n=t.innerRadius,i=t.outerRadius;return u({x0:t.x+a*n,y0:t.y+o*n,x1:t.x+a*i,y1:t.y+o*i,vx:a,vy:o},e)},c=function(t,e){var r=l(t,e.origin),a=r.x*t.options.radius,o=r.y*t.options.radius;return u({x0:t.x-a,y0:t.y-o,x1:t.x+a,y1:t.y+o,vx:r.x,vy:r.y},e)},h=function(t,e){var r=l(t,e.origin),a=t.x,o=t.y,n=0,i=0;return t.horizontal?(a=Math.min(t.x,t.base),n=Math.abs(t.base-t.x)):(o=Math.min(t.y,t.base),i=Math.abs(t.base-t.y)),u({x0:a,y0:o+i,x1:a+n,y1:o,vx:r.x,vy:r.y},e)},f=function(t,e){var r=l(t,e.origin);return u({x0:t.x,y0:t.y,x1:t.x+(t.width||0),y1:t.y+(t.height||0),vx:r.x,vy:r.y},e)},x=function(t){return Math.round(t*r)/r};function y(t,e){var r=e.chart.getDatasetMeta(e.datasetIndex).vScale;if(!r)return null;if(void 0!==r.xCenter&&void 0!==r.yCenter)return{x:r.xCenter,y:r.yCenter};var a=r.getBasePixel();return t.horizontal?{x:a,y:null}:{x:null,y:a}}function v(t,e,r){var a=r.backgroundColor,o=r.borderColor,n=r.borderWidth;(a||o&&n)&&(t.beginPath(),function(t,e,r,a,o,n){var i=Math.PI/2;if(n){var l=Math.min(n,o/2,a/2),s=e+l,u=r+l,d=e+a-l,c=r+o-l;t.moveTo(e,u),s<d&&u<c?(t.arc(s,u,l,-Math.PI,-i),t.arc(d,u,l,-i,0),t.arc(d,c,l,0,i),t.arc(s,c,l,i,Math.PI)):s<d?(t.moveTo(s,r),t.arc(d,u,l,-i,i),t.arc(s,u,l,i,Math.PI+i)):u<c?(t.arc(s,u,l,-Math.PI,0),t.arc(s,c,l,0,Math.PI)):t.arc(s,u,l,-Math.PI,Math.PI),t.closePath(),t.moveTo(e,r)}else t.rect(e,r,a,o)}(t,x(e.x)+n/2,x(e.y)+n/2,x(e.w)-n,x(e.h)-n,r.borderRadius),t.closePath(),a&&(t.fillStyle=a,t.fill()),o&&n&&(t.strokeStyle=o,t.lineWidth=n,t.lineJoin="miter",t.stroke()))}function b(t,e,r){var a=t.shadowBlur,o=r.stroked,n=x(r.x),i=x(r.y),l=x(r.w);o&&t.strokeText(e,n,i,l),r.filled&&(a&&o&&(t.shadowBlur=0),t.fillText(e,n,i,l),a&&o&&(t.shadowBlur=a))}var _=function(t,e,r,a){var o=this;o._config=t,o._index=a,o._model=null,o._rects=null,o._ctx=e,o._el=r};t.merge(_.prototype,{_modelize:function(r,a,n,i){var l,s=this,u=s._index,x=t.toFont(t.resolve([n.font,{}],i,u)),v=t.resolve([n.color,e.defaults.color],i,u);return{align:t.resolve([n.align,"center"],i,u),anchor:t.resolve([n.anchor,"center"],i,u),area:i.chart.chartArea,backgroundColor:t.resolve([n.backgroundColor,null],i,u),borderColor:t.resolve([n.borderColor,null],i,u),borderRadius:t.resolve([n.borderRadius,0],i,u),borderWidth:t.resolve([n.borderWidth,0],i,u),clamp:t.resolve([n.clamp,!1],i,u),clip:t.resolve([n.clip,!1],i,u),color:v,display:r,font:x,lines:a,offset:t.resolve([n.offset,4],i,u),opacity:t.resolve([n.opacity,1],i,u),origin:y(s._el,i),padding:t.toPadding(t.resolve([n.padding,4],i,u)),positioner:(l=s._el,l instanceof e.ArcElement?d:l instanceof e.PointElement?c:l instanceof e.BarElement?h:f),rotation:t.resolve([n.rotation,0],i,u)*(Math.PI/180),size:o(s._ctx,a,x),textAlign:t.resolve([n.textAlign,"start"],i,u),textShadowBlur:t.resolve([n.textShadowBlur,0],i,u),textShadowColor:t.resolve([n.textShadowColor,v],i,u),textStrokeColor:t.resolve([n.textStrokeColor,v],i,u),textStrokeWidth:t.resolve([n.textStrokeWidth,0],i,u)}},update:function(e){var r,o,n,i=this,l=null,s=null,u=i._index,d=i._config,c=t.resolve([d.display,!0],e,u);c&&(r=e.dataset.data[u],o=t.valueOrDefault(t.callback(d.formatter,[r,e]),r),(n=t.isNullOrUndef(o)?[]:a(o)).length&&(s=function(t){var e=t.borderWidth||0,r=t.padding,a=t.size.height,o=t.size.width,n=-o/2,i=-a/2;return{frame:{x:n-r.left-e,y:i-r.top-e,w:o+r.width+2*e,h:a+r.height+2*e},text:{x:n,y:i,w:o,h:a}}}(l=i._modelize(c,n,d,e)))),i._model=l,i._rects=s},geometry:function(){return this._rects?this._rects.frame:{}},rotation:function(){return this._model?this._model.rotation:0},visible:function(){return this._model&&this._model.opacity},model:function(){return this._model},draw:function(t,e){var r,a=t.ctx,o=this._model,i=this._rects;this.visible()&&(a.save(),o.clip&&(r=o.area,a.beginPath(),a.rect(r.left,r.top,r.right-r.left,r.bottom-r.top),a.clip()),a.globalAlpha=n(0,o.opacity,1),a.translate(x(e.x),x(e.y)),a.rotate(o.rotation),v(a,i.frame,o),function(t,e,r,a){var o,n=a.textAlign,i=a.color,l=!!i,s=a.font,u=e.length,d=a.textStrokeColor,c=a.textStrokeWidth,h=d&&c;if(u&&(l||h))for(r=function(t,e,r){var a=r.lineHeight,o=t.w,n=t.x;return"center"===e?n+=o/2:"end"!==e&&"right"!==e||(n+=o),{h:a,w:o,x:n,y:t.y+a/2}}(r,n,s),t.font=s.string,t.textAlign=n,t.textBaseline="middle",t.shadowBlur=a.textShadowBlur,t.shadowColor=a.textShadowColor,l&&(t.fillStyle=i),h&&(t.lineJoin="round",t.lineWidth=c,t.strokeStyle=d),o=0,u=e.length;o<u;++o)b(t,e[o],{stroked:h,filled:l,w:r.w,x:r.x,y:r.y+r.h*o})}(a,o.lines,i.text,o),a.restore())}});var p=Number.MIN_SAFE_INTEGER||-9007199254740991,g=Number.MAX_SAFE_INTEGER||9007199254740991;function m(t,e,r){var a=Math.cos(r),o=Math.sin(r),n=e.x,i=e.y;return{x:n+a*(t.x-n)-o*(t.y-i),y:i+o*(t.x-n)+a*(t.y-i)}}function w(t,e){var r,a,o,n,i,l=g,s=p,u=e.origin;for(r=0;r<t.length;++r)o=(a=t[r]).x-u.x,n=a.y-u.y,i=e.vx*o+e.vy*n,l=Math.min(l,i),s=Math.max(s,i);return{min:l,max:s}}function M(t,e){var r=e.x-t.x,a=e.y-t.y,o=Math.sqrt(r*r+a*a);return{vx:(e.x-t.x)/o,vy:(e.y-t.y)/o,origin:t,ln:o}}var k=function(){this._rotation=0,this._rect={x:0,y:0,w:0,h:0}};function $(t,e,r){var a=e.positioner(t,e),o=a.vx,n=a.vy;if(!o&&!n)return{x:a.x,y:a.y};var i=r.w,l=r.h,s=e.rotation,u=Math.abs(i/2*Math.cos(s))+Math.abs(l/2*Math.sin(s)),d=Math.abs(i/2*Math.sin(s))+Math.abs(l/2*Math.cos(s)),c=1/Math.max(Math.abs(o),Math.abs(n));return u*=o*c,d*=n*c,u+=e.offset*o,d+=e.offset*n,{x:a.x+u,y:a.y+d}}t.merge(k.prototype,{center:function(){var t=this._rect;return{x:t.x+t.w/2,y:t.y+t.h/2}},update:function(t,e,r){this._rotation=r,this._rect={x:e.x+t.x,y:e.y+t.y,w:e.w,h:e.h}},contains:function(t){var e=this,r=e._rect;return!((t=m(t,e.center(),-e._rotation)).x<r.x-1||t.y<r.y-1||t.x>r.x+r.w+2||t.y>r.y+r.h+2)},intersects:function(t){var e,r,a,o=this._points(),n=t._points(),i=[M(o[0],o[1]),M(o[0],o[3])];for(this._rotation!==t._rotation&&i.push(M(n[0],n[1]),M(n[0],n[3])),e=0;e<i.length;++e)if(r=w(o,i[e]),a=w(n,i[e]),r.max<a.min||a.max<r.min)return!1;return!0},_points:function(){var t=this,e=t._rect,r=t._rotation,a=t.center();return[m({x:e.x,y:e.y},a,r),m({x:e.x+e.w,y:e.y},a,r),m({x:e.x+e.w,y:e.y+e.h},a,r),m({x:e.x,y:e.y+e.h},a,r)]}});var C={prepare:function(t){var e,r,a,o,n,i=[];for(e=0,a=t.length;e<a;++e)for(r=0,o=t[e].length;r<o;++r)n=t[e][r],i.push(n),n.$layout={_box:new k,_hidable:!1,_visible:!0,_set:e,_idx:n._index};return i.sort((function(t,e){var r=t.$layout,a=e.$layout;return r._idx===a._idx?a._set-r._set:a._idx-r._idx})),this.update(i),i},update:function(t){var e,r,a,o,n,i=!1;for(e=0,r=t.length;e<r;++e)o=(a=t[e]).model(),(n=a.$layout)._hidable=o&&"auto"===o.display,n._visible=a.visible(),i|=n._hidable;i&&function(t){var e,r,a,o,n,i,l;for(e=0,r=t.length;e<r;++e)(o=(a=t[e]).$layout)._visible&&(l=new Proxy(a._el,{get:(t,e)=>t.getProps([e],!0)[e]}),n=a.geometry(),i=$(l,a.model(),n),o._box.update(i,n,a.rotation()));(function(t,e){var r,a,o,n;for(r=t.length-1;r>=0;--r)for(o=t[r].$layout,a=r-1;a>=0&&o._visible;--a)(n=t[a].$layout)._visible&&o._box.intersects(n._box)&&e(o,n)})(t,(function(t,e){var r=t._hidable,a=e._hidable;r&&a||a?e._visible=!1:r&&(t._visible=!1)}))}(t)},lookup:function(t,e){var r,a;for(r=t.length-1;r>=0;--r)if((a=t[r].$layout)&&a._visible&&a._box.contains(e))return t[r];return null},draw:function(t,e){var r,a,o,n,i,l;for(r=0,a=e.length;r<a;++r)(n=(o=e[r]).$layout)._visible&&(i=o.geometry(),l=$(o._el,o.model(),i),n._box.update(l,i,o.rotation()),o.draw(t,l))}},P="$default";function S(e,r,a,o){if(r){var n,i=a.$context,l=a.$groups;r[l._set]&&(n=r[l._set][l._key])&&!0===t.callback(n,[i,o])&&(e.$datalabels._dirty=!0,a.update(i))}}function I(t,e){var r,a,o=t.$datalabels,n=o._listeners;if(n.enter||n.leave){if("mousemove"===e.type)a=C.lookup(o._labels,e);else if("mouseout"!==e.type)return;r=o._hovered,o._hovered=a,function(t,e,r,a,o){var n,i;(r||a)&&(r?a?r!==a&&(i=n=!0):i=!0:n=!0,i&&S(t,e.leave,r,o),n&&S(t,e.enter,a,o))}(t,n,r,a,e)}}return{id:"datalabels",defaults:{align:"center",anchor:"center",backgroundColor:null,borderColor:null,borderRadius:0,borderWidth:0,clamp:!1,clip:!1,color:void 0,display:!0,font:{family:void 0,lineHeight:1.2,size:void 0,style:void 0,weight:null},formatter:function(e){if(t.isNullOrUndef(e))return null;var r,a,o,n=e;if(t.isObject(e))if(t.isNullOrUndef(e.label))if(t.isNullOrUndef(e.r))for(n="",o=0,a=(r=Object.keys(e)).length;o<a;++o)n+=(0!==o?", ":"")+r[o]+": "+e[r[o]];else n=e.r;else n=e.label;return""+n},labels:void 0,listeners:{},offset:4,opacity:1,padding:{top:4,right:4,bottom:4,left:4},rotation:0,textAlign:"start",textStrokeColor:void 0,textStrokeWidth:0,textShadowBlur:0,textShadowColor:void 0},beforeInit:function(t){t.$datalabels={_actives:[]}},beforeUpdate:function(t){var e=t.$datalabels;e._listened=!1,e._listeners={},e._datasets=[],e._labels=[]},afterDatasetUpdate:function(e,r,a){var o,n,i,l,s,u,d,c,h=r.index,f=e.$datalabels,x=f._datasets[h]=[],y=e.isDatasetVisible(h),v=e.data.datasets[h],b=function(e,r){var a,o,n,i=e.datalabels,l=[];return!1===i?null:(!0===i&&(i={}),r=t.merge({},[r,i]),o=r.labels||{},n=Object.keys(o),delete r.labels,n.length?n.forEach((function(e){o[e]&&l.push(t.merge({},[r,o[e],{_key:e}]))})):l.push(r),a=l.reduce((function(e,r){return t.each(r.listeners||{},(function(t,a){e[a]=e[a]||{},e[a][r._key||P]=t})),delete r.listeners,e}),{}),{labels:l,listeners:a})}(v,a),p=r.meta.data||[],g=e.ctx;for(g.save(),o=0,i=p.length;o<i;++o)if((d=p[o]).$datalabels=[],y&&d&&e.getDataVisibility(o)&&!d.skip)for(n=0,l=b.labels.length;n<l;++n)u=(s=b.labels[n])._key,(c=new _(s,g,d,o)).$groups={_set:h,_key:u||P},c.$context={active:!1,chart:e,dataIndex:o,dataset:v,datasetIndex:h},c.update(c.$context),d.$datalabels.push(c),x.push(c);g.restore(),t.merge(f._listeners,b.listeners,{merger:function(t,e,a){e[t]=e[t]||{},e[t][r.index]=a[t],f._listened=!0}})},afterUpdate:function(t){t.$datalabels._labels=C.prepare(t.$datalabels._datasets)},afterDatasetsDraw:function(t){C.draw(t,t.$datalabels._labels)},beforeEvent:function(t,e){if(t.$datalabels._listened){var r=e.event;switch(r.type){case"mousemove":case"mouseout":I(t,r);break;case"click":!function(t,e){var r=t.$datalabels,a=r._listeners.click,o=a&&C.lookup(r._labels,e);o&&S(t,a,o,e)}(t,r)}}},afterEvent:function(t){var e,r,a,o,n,l,s,u=t.$datalabels,d=u._actives,c=u._actives=t.getActiveElements(),h=i(d,c);for(e=0,r=h.length;e<r;++e)if((n=h[e])[1])for(a=0,o=(s=n[0].element.$datalabels||[]).length;a<o;++a)(l=s[a]).$context.active=1===n[1],l.update(l.$context);(u._dirty||h.length)&&(C.update(u._labels),t.render()),delete u._dirty}}}));

;

;
/* ---------- LME sample data (fallback when Dataverse isn't reachable) ---------- */

/* ---- "data currently updating" cover, shown when a live source is unavailable ---- */
window.scmCover=function(hostId,title,detail){
  const h=document.getElementById(hostId); if(!h) return;
  h.innerHTML='<div class="updcover"><div class="updcover__ic">'+
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">'+
    '<path d="M21 12a9 9 0 1 1-2.6-6.4"/><path d="M21 3v6h-6"/></svg></div>'+
    '<h4>'+title+'</h4><p>'+detail+'</p></div>';
};
window.LME_SAMPLE=null; /* sample removed — served from Dataverse cra95_lmesnapshots */
/* ---------- LME dashboard app (Dataverse Web API backend, cra95_) ---------- */
(function(){
const LME_DIAG=[];
window.LME_DIAG=LME_DIAG;

const CONFIG = {
  dataSource: 'auto',          // 'auto' | 'json' | 'webapi' | 'api' | 'sample'
  remote: 'api',                // backend used by 'auto' over http(s)

  api: {                        // 'api' backend (FastAPI + Postgres)
    base: 'https://orion.algihaz.com/scm',  // <- only this line changes when the backend moves
    key : 'algihaz_bHJ2e7KqLp8XrF5vYzT9dC3mD8sW6gA'   // must match one entry in the backend's API_KEYS env var
  },

  json: {                      // 'json' backend (per-day web files)
    base : '/',                // site-root path where the data files live
    index: 'lme-index.json'    // manifest of available dates
  },

  webapi: {                    // 'webapi' backend (Dataverse)
    tableSet     : 'cra95_lmesnapshots',
    dateField    : 'cra95_reportdate',
    labelField   : 'cra95_reportdatelabel',
    payloadField : 'cra95_payloadjson',
    top          : 90
  },

  quietFallback: true,        // single-file build sets this true (no banner on fallback)
  coverMinMs: 1100
};

window.SCM_API = CONFIG.api;   // shared base/key for other modules (e.g. rbac.js) — one source of truth

const STATE = {
  source:'sample', dates:[], cache:{}, activeDate:null,
  activeTab:'copper', chart:null, win:{copper:null,aluminium:null}
};

function resolveSource(){
  if(CONFIG.dataSource!=='auto') return CONFIG.dataSource;
  return (location.protocol==='file:') ? 'sample' : CONFIG.remote;
}

/* ============================== DATA LAYER ================================ */
async function fetchDateList(){
  if(STATE.source==='sample') return sampleDateList();
  if(STATE.source==='json')   return jsonDateList();
  if(STATE.source==='api')    return apiDateList();
  return webapiDateList();
}
async function fetchSnapshot(date){
  if(STATE.cache[date]) return STATE.cache[date];
  let p;
  if(STATE.source==='sample')    p=sampleSnapshot(date);
  else if(STATE.source==='json') p=await jsonSnapshot(date);
  else if(STATE.source==='api')  p=await apiSnapshot(date);
  else                           p=await webapiSnapshot(date);
  STATE.cache[date]=p; return p;
}

/* sample */
function sampleList(){
  if(!window.LME_SAMPLE){ try{ window.scmCover('lmeHost','Market data is currently updating',
      'Daily LME snapshots are being refreshed from Dataverse. Copper and aluminium prices will appear here shortly.'); }catch(e){} }
  return (window.LME_SAMPLE||[]).map(r=>({reportDate:r.reportDate,reportDateLabel:r.reportDateLabel||r.reportDate,demo:!!r._demo,_obj:r}))
    .sort((a,b)=>b.reportDate.localeCompare(a.reportDate));
}
function sampleDateList(){ return Promise.resolve(sampleList().map(({_obj,...d})=>d)); }
function sampleSnapshot(date){ const e=sampleList().find(d=>d.reportDate===date); return e?e._obj:null; }

/* json */
async function jsonDateList(){
  const res=await fetch(CONFIG.json.base+CONFIG.json.index,{cache:'no-cache'});
  if(!res.ok) throw new Error(`index ${res.status}`);
  const j=await res.json();
  return (j.dates||[]).map(d=>({reportDate:d.reportDate,reportDateLabel:d.reportDateLabel||formatLabel(d.reportDate),demo:!!d.demo,file:d.file||('lme-'+d.reportDate+'.json')}))
    .sort((a,b)=>b.reportDate.localeCompare(a.reportDate));
}
async function jsonSnapshot(date){
  const entry=STATE.dates.find(d=>d.reportDate===date);
  const file=entry?.file||('lme-'+date+'.json');
  const res=await fetch(CONFIG.json.base+file,{cache:'no-cache'});
  if(!res.ok) throw new Error(`${file} ${res.status}`);
  return res.json();
}

/* api (FastAPI + Postgres) */
function apiHeaders(){ return {'X-API-Key': CONFIG.api.key}; }
async function apiDateList(){
  const res=await fetch(CONFIG.api.base+'/api/lme/dates',{cache:'no-cache',headers:apiHeaders()});
  if(!res.ok) throw new Error(`lme api dates ${res.status}`);
  const list=await res.json();
  return (list||[]).map(d=>({reportDate:d.reportDate,reportDateLabel:d.reportDateLabel||formatLabel(d.reportDate),demo:false}))
    .sort((a,b)=>b.reportDate.localeCompare(a.reportDate));
}
async function apiSnapshot(date){
  const res=await fetch(CONFIG.api.base+'/api/lme/snapshot/'+date,{cache:'no-cache',headers:apiHeaders()});
  if(!res.ok) throw new Error(`lme api snapshot ${date} ${res.status}`);
  return normalizePayload(await res.json());
}

/* webapi (Dataverse) */
async function webapiDateList(){
  const w=CONFIG.webapi;
  const url=`/_api/${w.tableSet}?$select=${w.dateField},${w.labelField}&$orderby=${encodeURIComponent(w.dateField+' desc')}&$top=${w.top}`;
  const j=await odata(url);
  return (j.value||[]).map(rec=>({reportDate:(rec[w.dateField]||'').slice(0,10),reportDateLabel:rec[w.labelField]||formatLabel(rec[w.dateField]),demo:false}))
    .sort((a,b)=>b.reportDate.localeCompare(a.reportDate));
}
function normalizePayload(p){
  // accept: raw payload  OR  the envelope {name,reportDate,reportDateLabel,payload:{...}}
  if(typeof p==='string'){ try{ p=JSON.parse(p); }catch(e){ throw new Error('payload is not valid JSON'); } }
  if(p && p.payload) p=p.payload;                       // <- unwrap envelope
  if(typeof p==='string'){ try{ p=JSON.parse(p); }catch(e){ throw new Error('inner payload is not valid JSON'); } }
  if(!p || !p.metals || !p.metals.copper) throw new Error('payload has no metals.copper — check the JSON shape');
  return p;
}
async function webapiSnapshot(date){
  const w=CONFIG.webapi;
  // A) precise filter (Date Only column)
  try{
    const url=`/_api/${w.tableSet}?$select=${w.payloadField}&$filter=${w.dateField} eq ${date}&$top=1`;
    const j=await odata(url);
    const rec=(j.value&&j.value[0])?j.value[0][w.payloadField]:null;
    if(rec) return normalizePayload(rec);
  }catch(e){ LME_DIAG.push('filter query failed: '+e.message); }
  // B) fallback: pull rows and match client-side (avoids any $filter/date-type issue)
  const url2=`/_api/${w.tableSet}?$select=${w.dateField},${w.payloadField}&$top=${w.top}`;
  const j2=await odata(url2);
  const hit=(j2.value||[]).find(r=>String(r[w.dateField]||'').slice(0,10)===date);
  if(!hit) throw new Error('no row found for '+date);
  return normalizePayload(hit[w.payloadField]);
}
async function odata(url){
  const res=await fetch(url,{method:'GET',credentials:'same-origin',headers:{'Accept':'application/json','OData-MaxVersion':'4.0','OData-Version':'4.0'}});
  if(!res.ok){
    let extra='';
    try{ const t=await res.text(); extra=' — '+t.slice(0,180); }catch(e){}
    const hint = res.status===403 ? ' (missing Table Permission Read, or Site Setting Webapi/<table>/enabled)'
              : res.status===404 ? ' (wrong tableSet / EntitySet name — must be the PLURAL name)'
              : res.status===400 ? ' (bad column name in $select/$filter, or field not listed in Webapi/<table>/fields)' : '';
    const msg=`Web API ${res.status} ${res.statusText}${hint}${extra}`;
    LME_DIAG.push(url+' -> '+msg);
    throw new Error(msg);
  }
  return res.json();
}

function formatLabel(iso){
  if(!iso) return '';
  const d=new Date(iso); const m=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][d.getMonth()];
  return `${String(d.getDate()).padStart(2,'0')} ${m} ${d.getFullYear()}`;
}

/* ============================== BOOTSTRAP ================================ */
async function boot(){
  const started=Date.now();
  if(/[?&]lmedebug=1/.test(location.search)) CONFIG.quietFallback=false;
  STATE.source=resolveSource();
  try{
    STATE.dates=await fetchDateList();
    if(!STATE.dates.length) throw new Error('no report dates');
    const today=new Date().toISOString().slice(0,10);
    STATE.activeDate=(STATE.dates.find(d=>d.reportDate===today)||STATE.dates[0]).reportDate;
    await fetchSnapshot(STATE.activeDate);
  }catch(err){
    if(!CONFIG.quietFallback) showDataError(err.message);
    STATE.source='sample';
    STATE.dates=await fetchDateList();
    STATE.activeDate=STATE.dates[0]?.reportDate;
    if(STATE.activeDate) await fetchSnapshot(STATE.activeDate);
  }
  buildDateMenu(); bindNav();
  try{ render(); }catch(e){ console.error(e); showDataError('render: '+e.message); }
  showSourceChip();
  if(LME_DIAG.length) console.warn('[LME backend diagnostics]\n'+LME_DIAG.join('\n'));
}
function showSourceChip(){
  const el=document.getElementById('lmeSrc'); if(!el) return;
  const live = STATE.source==='webapi' || STATE.source==='json' || STATE.source==='api';
  const label = STATE.source==='webapi' ? 'Dataverse' : STATE.source==='api' ? 'Postgres' : 'JSON';
  el.textContent = live ? ('Live · '+label) : 'Sample data';
  el.className = 'srcchip '+(live?'is-live':'is-sample');
  el.title = LME_DIAG.length ? LME_DIAG.join('\n') : 'Backend reachable';
}
function currentData(){ return STATE.cache[STATE.activeDate]; }
function currentMeta(){ return STATE.dates.find(d=>d.reportDate===STATE.activeDate); }

/* cover */
function buildCoverDate(){}
function hideCover(){}

/* date checklist */
const CAL={y:null,m:null};
function buildDateMenu(){
  const menu=document.getElementById('dateMenu');
  const byDate={}; STATE.dates.forEach(s=>byDate[s.reportDate]=s);
  const keys=Object.keys(byDate).sort();
  if(!keys.length){ menu.innerHTML='<div class="datecard__head">No dates available</div>'; updateDateBtn(); return; }
  const first=keys[0], last=keys[keys.length-1];
  const active=STATE.activeDate||last;
  if(CAL.y==null){ const d=new Date(active+'T00:00:00'); CAL.y=d.getFullYear(); CAL.m=d.getMonth(); }
  const MON=['January','February','March','April','May','June','July','August','September','October','November','December'];
  const y=CAL.y, m=CAL.m;
  const start=new Date(y,m,1), startDow=(start.getDay()+6)%7;      // Monday-first
  const days=new Date(y,m+1,0).getDate();
  const key=d=>`${y}-${String(m+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
  const prevOK=`${y}-${String(m+1).padStart(2,'0')}-01` > first;
  const nextOK=`${y}-${String(m+1).padStart(2,'0')}-${String(days).padStart(2,'0')}` < last;

  let cells='';
  for(let i=0;i<startDow;i++) cells+='<button class="lmc-d empty"></button>';
  for(let d=1;d<=days;d++){
    const k=key(d), rec=byDate[k];
    const cls=['lmc-d']; if(rec) cls.push('has'); if(k===active) cls.push('is-sel'); if(rec&&rec.demo) cls.push('is-demo');
    cells+=`<button class="${cls.join(' ')}" ${rec?`data-date="${k}" title="${rec.reportDateLabel}${rec.demo?' · DEMO':''}"`:'disabled'}>${d}</button>`;
  }
  menu.innerHTML=`<div class="lmc">
      <div class="lmc-top">
        <button class="lmc-nav" data-mv="-1" ${prevOK?'':'disabled'} aria-label="Previous month">‹</button>
        <span class="lmc-mon">${MON[m]} ${y}</span>
        <button class="lmc-nav" data-mv="1" ${nextOK?'':'disabled'} aria-label="Next month">›</button>
      </div>
      <div class="lmc-dow"><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span><span>Su</span></div>
      <div class="lmc-grid">${cells}</div>
      <div class="lmc-foot"><button class="lmc-latest">Latest report</button>
        <span class="lmc-hint">${STATE.dates.length} reports</span></div>
    </div>`;
  menu.querySelectorAll('.lmc-nav').forEach(b=>b.addEventListener('click',ev=>{
    ev.stopPropagation();
    const mv=+b.dataset.mv, d=new Date(CAL.y,CAL.m+mv,1);
    CAL.y=d.getFullYear(); CAL.m=d.getMonth(); buildDateMenu();
  }));
  menu.querySelectorAll('.lmc-d.has').forEach(b=>b.addEventListener('click',()=>selectDate(b.dataset.date)));
  menu.querySelector('.lmc-latest').addEventListener('click',()=>{
    const d=new Date(last+'T00:00:00'); CAL.y=d.getFullYear(); CAL.m=d.getMonth(); selectDate(last);
  });
  updateDateBtn();
}

async function selectDate(date){
  if(date===STATE.activeDate){ document.getElementById('datecard').classList.remove('is-open'); return; }
  STATE.activeDate=date; STATE.win={copper:null,aluminium:null};
  document.getElementById('datecard').classList.remove('is-open');
  { const d=new Date(STATE.activeDate+'T00:00:00'); if(!isNaN(d)){ CAL.y=d.getFullYear(); CAL.m=d.getMonth(); } }
  buildDateMenu();
  if(!STATE.cache[date]){ showViewLoading(); try{ await fetchSnapshot(date); }catch(err){ showDataError('date '+date+': '+err.message); } }
  try{ render(); }catch(e){ console.error(e); }
}
function updateDateBtn(){ document.getElementById('dateBtnLabel').textContent=currentMeta()?.reportDateLabel||''; }
function checkSvg(){ return '<svg width="11" height="11" viewBox="0 0 12 12"><path d="M2 6.5 L4.7 9 L10 2.5" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>'; }

/* nav */
function bindNav(){
  document.querySelectorAll('.tab').forEach(t=>t.addEventListener('click',()=>{STATE.activeTab=t.dataset.tab;render();}));
  const dc=document.getElementById('datecard');
  const btn=document.getElementById('dateBtn');
  const menu=document.getElementById('dateMenu');
  function positionDateMenu(){
    if(!btn||!menu) return;
    const r=btn.getBoundingClientRect();
    const w=menu.offsetWidth||266, h=menu.offsetHeight||280;
    let left=r.right-w; if(left<8) left=8;
    if(left+w>innerWidth-8) left=Math.max(8,innerWidth-8-w);
    let top=r.bottom+8;
    if(top+h>innerHeight-8) top=Math.max(8, r.top-8-h);   // flip above the button
    menu.style.left=left+'px'; menu.style.top=top+'px'; menu.style.right='auto';
  }
  btn.addEventListener('click',e=>{e.stopPropagation(); dc.classList.toggle('is-open'); if(dc.classList.contains('is-open')) positionDateMenu();});
  document.addEventListener('click',()=>dc.classList.remove('is-open'));
  window.addEventListener('resize',()=>{ if(dc.classList.contains('is-open')) positionDateMenu(); });
  window.addEventListener('scroll',()=>{ if(dc.classList.contains('is-open')) positionDateMenu(); }, true);
}

/* render */
function showViewLoading(){
  const root=document.getElementById('view'); root.className='view';
  root.innerHTML='<div style="display:flex;align-items:center;gap:14px;color:#6E5A5A;padding:60px 4px;font-size:14px;letter-spacing:1px"><span class="spinner" style="border-color:#E4D7D7;border-top-color:#A20F1B"></span> Fetching market data…</div>';
}
function render(){
  document.querySelectorAll('.tab').forEach(t=>t.classList.toggle('is-active',t.dataset.tab===STATE.activeTab));
  updateDateBtn();
  const root=document.getElementById('view'); const d=currentData(); const meta=currentMeta();
  if(!d){ showViewLoading(); return; }
  if(STATE.activeTab==='refs'){ renderRefs(root,d,meta); return; }
  const metalKey=STATE.activeTab; const m=d.metals[metalKey];
  root.className='view fade-in';
  root.innerHTML=`
    <div class="titlebar"><div>
      <h1 class="pagetitle"><span class="big">${m.name}</span><span class="lme">LME</span></h1>
      <div class="pagesub">LME Intelligence&nbsp; · &nbsp;${meta.reportDateLabel}&nbsp; · Procurement Strategy</div></div>
      <div class="bigdate"><div class="bigdate__bar"></div><div class="bigdate__day">${d.closing.day}</div>
      <div class="bigdate__meta"><div class="bigdate__mon">${d.closing.month}</div><div class="bigdate__lbl">${d.closing.label}</div></div></div></div>
    <div class="main2">
      <div class="col-left">
        <div class="kpis">${['cash','m3','stock'].map((k,i)=>kpiCard(m.kpis[k],i+1)).join('')}</div>
        <div class="panel"><h2 class="panel__title">Cash vs 3M Futures — Price ($/t)</h2>
          <div class="panel__sub">YTD 2026&nbsp; ·&nbsp; LME Official</div>
          <div class="legend"><span><i class="ln"></i>Cash ($/t)</span><span><i class="ln dash"></i>3M Futures ($/t)</span></div>
          <div class="chartwrap"><canvas id="priceChart"></canvas></div>${windowSlider(m)}</div>
      </div>
      <div class="panel heads col-right"><div class="heads__title"><h3>Key Market Headlines</h3><span class="heads__dot"></span></div>
        ${m.headlines.map(headlineBlock).join('')}</div>
    </div>`;
  drawChart(m,metalKey); bindSlider(m,metalKey);
}
function kpiCard(k,n){ return `<div class="kpi"><div class="kpi__top"><span class="kpi__num">${n}</span><span class="kpi__label">${k.label}</span></div><div class="kpi__val">${formatVal(k.value)}</div>${k.deltas.map(deltaRow).join('')}</div>`; }
function formatVal(v){ if(v.endsWith('/t'))return `${v.slice(0,-2)}<span class="unit">/t</span>`; if(v.endsWith(' t'))return `${v.slice(0,-2)}<span class="unit"> t</span>`; return v; }
function deltaRow(dl){ const a=dl.dir==='up'?'▲':dl.dir==='down'?'▼':''; return `<div class="delta ${dl.dir}"><span class="delta__val"><span class="arw">${a}</span>${dl.text}</span><span class="delta__per">${dl.period}</span></div>`; }
function headlineBlock(h){ const ref=h.ref?` <span class="refbadge">[${h.ref}]</span>`:''; return `<div class="headline"><div class="headline__top"><span class="headline__n">${h.n}</span><span class="headline__ttl">${h.title}</span></div><div class="headline__body">${h.body}${ref}</div></div>`; }

function windowSlider(m){
  const n=m.chart.labels.length; const w=STATE.win[STATE.activeTab]||{from:0,to:n-1};
  return `<div class="slider"><div class="slider__head"><span class="slider__lbl">Window</span>
    <span class="slider__rng" id="sliderRange">${m.chart.labels[w.from]} — ${m.chart.labels[w.to]}</span></div>
    <div class="dual"><div class="dual__track"></div><div class="dual__fill" id="dualFill"></div>
    <input type="range" id="rFrom" min="0" max="${n-1}" step="1" value="${w.from}">
    <input type="range" id="rTo" min="0" max="${n-1}" step="1" value="${w.to}"></div></div>`;
}
function bindSlider(m,metalKey){
  const n=m.chart.labels.length; const rFrom=document.getElementById('rFrom'),rTo=document.getElementById('rTo');
  const fill=document.getElementById('dualFill'),rng=document.getElementById('sliderRange');
  const paint=()=>{ let from=+rFrom.value,to=+rTo.value; if(from>to)[from,to]=[to,from];
    const a=(from/(n-1))*100,b=(to/(n-1))*100; fill.style.left=a+'%'; fill.style.width=(b-a)+'%';
    rng.textContent=`${m.chart.labels[from]} — ${m.chart.labels[to]}`; STATE.win[metalKey]={from,to}; updateChart(m,from,to); };
  rFrom.addEventListener('input',paint); rTo.addEventListener('input',paint); paint();
}
function sliceData(m,from,to){return{labels:m.chart.labels.slice(from,to+1),cash:m.chart.cash.slice(from,to+1),m3:m.chart.m3.slice(from,to+1)};}
function drawChart(m,metalKey){
  const w=STATE.win[metalKey]||{from:0,to:m.chart.labels.length-1};
  const ctx=document.getElementById('priceChart').getContext('2d'); if(STATE.chart) STATE.chart.destroy();
  const s=sliceData(m,w.from,w.to); const RED='#A20F1B',RED2='#982A33',INK='#6E5A5A';
  const lblAlign=(ctx)=>{const i=ctx.dataIndex;
    const cash=ctx.chart.data.datasets[0].data[i], m3=ctx.chart.data.datasets[1].data[i];
    const mine=ctx.dataset.data[i], other=(ctx.datasetIndex===0)?m3:cash;
    return mine>=other ? 'top' : 'bottom';};
  STATE.chart=new Chart(ctx,{type:'line',data:{labels:s.labels,datasets:[
    {label:'Cash ($/t)',data:s.cash,borderColor:RED,backgroundColor:RED,borderWidth:2.4,pointRadius:4,pointBackgroundColor:RED,tension:.35,datalabels:{color:RED,offset:6,anchor:'center',align:lblAlign}},
    {label:'3M Futures ($/t)',data:s.m3,borderColor:RED2,backgroundColor:RED2,borderWidth:2,borderDash:[6,4],pointRadius:4,pointBackgroundColor:RED2,tension:.35,datalabels:{color:'#C24A52',offset:6,anchor:'center',align:lblAlign}}]},
    options:{responsive:true,maintainAspectRatio:false,layout:{padding:{top:24,bottom:6,left:4,right:8}},
      plugins:{legend:{display:false},tooltip:{backgroundColor:'#fff',titleColor:INK,bodyColor:INK,borderColor:'#E4D7D7',borderWidth:1,padding:10,callbacks:{label:c=>` ${c.dataset.label}: $${(+c.raw).toLocaleString()}`}},
        datalabels:{font:{family:'Segoe UI, Calibri, sans-serif',size:11,weight:'600'},formatter:v=>(+v).toLocaleString()}},
      scales:{x:{grid:{display:false},ticks:{color:INK,font:{size:11.5}}},y:{grid:{color:'#EFE5E5'},ticks:{display:false},border:{display:false},grace:'12%'}},
      animation:{duration:500}},plugins:[ChartDataLabels]});
}
function updateChart(m,from,to){ if(!STATE.chart)return; const s=sliceData(m,from,to); STATE.chart.data.labels=s.labels; STATE.chart.data.datasets[0].data=s.cash; STATE.chart.data.datasets[1].data=s.m3; STATE.chart.update(); }

function renderRefs(root,d,meta){
  root.className='view fade-in';
  const rows=(d.references||[]).map(r=>`<tr><td class="num">${r.n}</td><td class="src"><a href="${r.url}" target="_blank" rel="noopener">${r.source}</a></td><td class="quote">${r.quotation}</td></tr>`).join('');
  root.innerHTML=`<div class="titlebar"><div><h1 class="pagetitle"><span class="big">Sources &amp; References</span></h1>
    <div class="pagesub">Exact quotations &amp; source attribution&nbsp; ·&nbsp; ${meta.reportDateLabel}</div></div>
    <div class="refbox"><div class="refbox__bar"></div><div class="refbox__txt">${(d.references||[]).length} REFERENCES</div></div></div>
    <p class="refs__intro">All reference numbers [n] link to the exact source quotation below. For internal procurement intelligence use only.</p>
    <table class="reftable"><thead><tr><th>#</th><th>SOURCE</th><th>EXACT QUOTATION</th></tr></thead><tbody>${rows}</tbody></table>`;
}
function showDataError(msg){ const b=document.getElementById('dataBanner'); if(!b) return; b.textContent=`Live data unavailable (${msg}). Showing the most recent available data.`; b.classList.remove('hidden'); }

window.LME_BOOT=boot;
})();
;
/* ---------- Approved Vendor List: embedded preview data + world map ---------- */
window.AVL_DATA=null; /* sample removed — served from Dataverse / avl.json */
window.WORLD_MAP = {"w":760,"h":400,"countries":{"Fiji":"M755,240L755,240L755,240ZM760,238L758,239L760,237L760,237L760,238ZM0,237L0,237L0,237L0,238L0,238L0,237Z","Tanzania":"M452,199L461,205L464,208L463,213L463,218L466,222L458,226L453,225L452,220L450,220L445,218L443,213L443,208L446,205L445,203L445,200Z","W. Sahara":"M362,128L362,129L362,133L355,133L355,139L353,139L353,144L345,144L344,145L344,144L349,144L351,138L354,136L356,130L362,130Z","Canada":"M149,76L145,72L143,71L144,68L142,67L143,62L146,59L144,58L144,54L143,51L137,53L137,50L134,49L153,29L158,31L163,29L165,29L175,27L177,29L182,29L194,32L194,33L200,33L207,31L209,33L213,33L218,33L219,32L225,32L227,30L225,28L227,26L230,24L232,26L234,29L232,32L236,30L237,31L236,34L241,31L242,29L248,30L246,32L246,34L242,36L238,36L233,39L228,41L216,48L213,52L215,53L215,57L221,57L226,61L231,61L230,63L230,68L231,70L235,67L235,62L238,61L243,58L243,54L241,53L245,50L246,45L253,45L256,47L259,48L258,52L260,54L263,53L267,49L270,57L269,58L272,61L276,62L278,66L277,68L268,73L256,73L251,76L244,81L255,75L259,76L257,78L257,82L262,83L265,81L265,83L258,86L253,89L252,87L256,85L251,85L251,80L248,79L242,85L236,85L231,89L226,89L226,91L219,94L218,93L221,89L221,85L218,81L213,77L207,78L201,76L176,74ZM236,45L236,45L236,45ZM255,23L255,21L259,21L261,23ZM242,45L242,45L242,45ZM237,18L235,19L232,18L236,17ZM240,13L240,13L240,13ZM238,11L239,12L236,13L235,11ZM244,19L238,19L238,16L234,15L235,14L242,15L244,17L248,17L257,17L258,18L254,19ZM215,12L213,14L211,13ZM217,11L217,11L217,11ZM277,70L274,74L279,75L280,79L277,81L277,79L268,79L268,77L273,72ZM239,39L244,42L242,42L239,41L234,43L234,41L237,37ZM256,24L258,23L266,26L270,27L271,30L268,31L274,33L275,35L278,35L273,39L269,36L266,37L270,40L269,44L263,42L266,46L262,45L254,40L249,41L249,38L256,38L260,34L260,32L255,31L256,30L253,28L249,29L238,27L238,24L243,21L247,21L245,23L248,22L252,21L254,23L253,24ZM234,20L240,20L231,24L230,22ZM194,16L203,13L207,13L205,15L198,16ZM138,64L138,64L138,64ZM226,10L232,11L232,13L228,12ZM147,77L143,76L141,71L145,73ZM193,19L198,20L200,21L193,23L189,25L184,26L181,25L188,21L187,20ZM216,17L220,16L217,18L207,19L205,19L209,18L200,18L206,15L214,17L213,15L217,15ZM214,22L215,23L214,26L218,28L214,29L213,31L208,30L195,31L192,30L191,28L200,28L191,27L196,26L191,25L195,23L201,22L200,23L204,22L205,23L208,22L209,25L211,22ZM223,23L222,21L224,21L229,21L227,22L228,23L227,25L224,26L219,23ZM214,21L217,21L215,23ZM232,15L230,18L226,18L224,17L225,16ZM242,8L249,7L250,8L254,8L255,10L249,12L243,12L244,10L242,10L241,9ZM251,6L261,5L264,5L266,4L270,4L280,4L289,4L293,5L284,6L287,6L280,8L277,9L268,10L269,12L264,13L261,14L263,15L258,16L255,15L245,15L249,14L249,13L253,13L250,12L256,10L255,8L260,9L262,8L254,8ZM256,34L253,34L254,32ZM224,29L223,31L219,30L222,28ZM259,74L259,74L259,74ZM258,80L262,82L260,83Z","United States of America":"M149,76L176,74L201,76L207,78L213,77L218,81L221,85L221,89L218,93L219,94L226,91L226,89L231,89L236,85L242,85L248,79L251,80L251,85L251,86L244,89L242,91L243,94L237,95L229,103L228,101L228,109L221,113L214,119L214,121L215,130L213,134L212,134L209,123L206,123L203,122L197,122L197,125L192,123L186,124L179,129L179,133L175,132L173,124L170,123L168,125L166,124L163,118L154,119L147,116L142,116L141,113L137,111L135,100L135,97L138,91L142,84L145,77L147,80ZM54,147L54,147L54,147ZM53,146L53,146L53,146ZM52,144L52,144L52,144ZM50,143L50,143L50,143ZM47,142L47,142L47,142ZM90,49L90,49L90,49ZM108,55L109,56L104,57L104,56ZM153,29L134,49L137,50L137,53L143,51L144,54L144,58L146,59L143,62L142,54L138,54L134,51L128,50L124,48L121,50L113,52L117,48L109,52L109,53L101,56L95,59L84,62L80,63L88,59L91,59L99,56L103,53L98,54L97,52L94,53L96,51L93,51L93,47L99,43L101,43L107,42L109,39L101,40L99,38L107,36L111,37L109,32L110,31L113,31L120,28L131,26L136,27L140,27ZM88,42L92,43L90,43Z","Kazakhstan":"M544,75L542,77L542,81L538,80L538,84L534,86L537,90L537,92L534,91L524,90L523,92L520,91L518,92L515,96L511,95L509,90L506,89L500,89L492,84L488,85L490,94L485,92L483,93L477,86L482,85L481,81L477,80L474,82L471,79L468,77L469,72L474,69L477,69L484,72L489,71L491,72L494,70L491,69L493,66L492,64L499,63L505,61L508,61L510,64L514,64L515,65L520,63L523,65L529,71L535,71L540,74Z","Uzbekistan":"M490,94L488,85L492,84L500,89L506,89L509,90L511,95L515,96L518,92L518,94L523,96L520,97L516,96L513,100L516,102L515,105L513,104L512,103L503,98L501,95L498,94L494,91Z","Papua New Guinea":"M681,203L689,206L692,210L695,212L693,214L697,219L701,222L695,222L691,217L688,216L684,220L680,219ZM706,206L706,206L706,206ZM703,211L699,213L697,210ZM710,210L710,210L710,210Z","Indonesia":"M681,203L680,219L679,217L673,218L676,215L674,210L665,206L664,207L662,202L659,199L663,198L666,199L667,204L669,205L671,203L676,201ZM646,219L646,220L646,219ZM666,214L666,214L666,214ZM632,187L631,189L634,195L632,195L631,199L629,201L628,207L625,207L622,205L619,206L615,204L613,198L614,192L616,195L621,193L625,193L627,186ZM656,204L658,205L653,205ZM651,206L651,206L651,206ZM653,192L655,193L654,199L652,194ZM643,195L648,193L646,196L637,196L638,200L644,198L640,202L643,210L641,210L637,204L637,211L635,210L635,206L634,204L636,196L638,194ZM636,222L636,222L636,222ZM638,218L638,218L638,218ZM632,218L632,218L632,218ZM611,213L620,214L621,216L626,218L624,219L611,216L605,214L606,212ZM603,200L607,204L606,211L603,211L599,207L591,192L584,185L588,184L595,192L597,192L602,197Z","Argentina":"M254,327L256,330L262,332L258,332L255,332ZM262,272L262,281L265,284L267,288L265,292L263,293L257,293L258,298L252,299L253,301L256,302L254,305L254,309L251,312L255,314L253,320L251,322L253,326L247,325L245,322L243,321L243,308L239,302L239,293L240,293L238,288L239,282L236,275L237,267L239,264L238,258L240,256L240,253L242,251L249,252L253,256L260,259L259,264L264,265L267,263L267,261L269,264Z","Chile":"M254,327L255,332L258,332L257,334L251,332L243,327L250,330L251,327ZM233,240L236,245L236,247L239,254L240,253L240,256L238,258L239,264L237,267L236,275L239,282L238,288L240,293L239,293L239,302L243,308L243,321L245,322L247,325L253,326L250,327L250,330L247,329L242,326L237,317L239,313L236,312L237,310L236,306L239,307L238,302L236,304L234,289L235,277L233,268L234,265L233,250L232,242Z","Dem. Rep. Congo":"M443,208L443,213L445,218L441,218L440,226L441,230L438,226L436,226L431,224L427,224L426,215L421,215L421,217L417,217L415,211L406,212L406,211L408,209L411,209L414,206L415,201L417,199L419,188L422,184L428,187L432,184L438,184L440,186L443,186L446,188L447,191L444,195L443,200L442,204Z","Somalia":"M469,201L468,199L468,190L469,187L473,185L476,185L482,177L484,174L484,169L488,167L489,171L485,180L479,190L472,196Z","Kenya":"M464,208L461,205L452,199L452,197L455,192L453,186L455,183L457,186L464,188L467,186L469,187L468,190L468,199L469,201L466,203Z","Sudan":"M432,177L430,175L429,169L427,161L429,158L430,158L430,148L432,147L432,142L457,142L459,151L461,152L458,155L457,161L456,166L453,171L452,175L450,167L447,173L444,171L442,174L436,173L433,172Z","Chad":"M430,148L430,158L429,158L427,161L429,169L425,173L420,175L418,177L413,179L410,173L413,172L411,165L409,161L410,158L412,156L413,146L411,140L413,139Z","Haiti":"M230,148L229,152L224,151L228,151L227,148Z","Dominican Rep.":"M229,152L230,148L231,148L236,151Z","Russia":"M514,7L516,7L525,9L526,11L524,11L516,10L511,8ZM530,10L535,12L527,13L528,10ZM590,16L594,16L601,17L601,19L594,19L589,18ZM606,18L611,18L610,19L603,18ZM598,21L600,20L604,22ZM444,8L451,7L454,8L449,9L448,8ZM421,63L416,63L419,61ZM463,21L466,19L465,18L472,16L482,15L483,16L474,18L470,20L467,23L468,25L472,27L466,27L462,25ZM641,65L645,69L652,76L649,75L650,78L654,81L652,83L645,71L640,65ZM88,31L88,31L92,35L96,35L97,37L91,38L89,40L86,41L85,38L80,37L77,39L77,39L88,31ZM683,39L683,39L679,40L687,43L688,45L684,44L680,46L678,50L674,49L671,51L666,50L667,54L671,55L674,62L672,63L674,66L671,66L672,71L661,61L659,55L661,54L663,49L664,47L662,44L659,49L655,46L651,47L650,51L653,52L647,53L646,51L642,52L636,52L631,52L626,62L633,64L635,63L640,66L645,77L644,82L642,89L640,91L637,90L635,92L635,92L635,92L632,85L636,85L635,77L628,79L623,75L619,74L612,67L606,65L602,66L603,69L601,75L599,74L594,73L588,75L584,75L580,73L574,73L570,70L563,68L562,74L552,71L545,75L544,75L540,74L535,71L529,71L523,65L520,63L515,65L514,64L510,64L508,61L505,61L499,63L492,64L493,66L491,69L494,70L491,72L489,71L484,72L477,69L474,69L469,72L468,77L471,79L474,82L470,86L475,93L474,95L471,93L469,92L458,89L451,85L453,82L453,80L455,78L455,74L446,72L442,68L439,68L438,66L440,65L436,62L436,60L431,59L429,56L429,51L429,49L434,44L431,42L430,39L430,37L428,35L429,33L426,30L430,29L439,30L446,33L448,35L444,37L436,35L438,37L439,40L443,41L442,39L447,40L447,38L450,36L453,37L454,35L451,31L456,32L457,35L459,34L467,31L467,32L476,31L478,32L479,31L478,29L483,29L492,32L493,31L488,28L486,26L489,22L494,23L494,25L497,28L498,30L500,32L498,36L501,36L503,33L502,30L499,29L499,27L496,25L499,24L500,24L505,24L509,25L505,21L514,20L513,18L521,16L527,16L532,15L532,14L535,13L537,14L547,15L553,17L554,18L549,20L557,22L559,21L565,21L566,22L573,22L571,21L577,21L581,22L583,24L590,27L589,25L602,25L599,23L600,23L616,24L624,27L634,27L638,29L640,30L651,29L656,31L657,30L654,28L663,29L669,30L672,31L683,39ZM667,27L666,27L665,26L665,25L667,27ZM95,25L95,25L95,25L98,26L93,27L93,27L95,25ZM444,83L447,84L450,85L445,87L442,85Z","Bahamas":"M217,131L217,131L217,131ZM220,130L220,130L220,130ZM218,134L218,134L218,134Z","Falkland Is.":"M267,325L271,323L273,324L270,326Z","Norway":"M402,10L405,9L412,11L408,11L406,15L401,14L402,13L396,11L395,10L399,9ZM430,29L426,30L427,29L422,29L420,31L413,30L412,32L409,31L407,33L400,43L402,47L399,53L398,51L395,54L390,53L389,46L398,40L404,33L411,29L417,28L419,26L425,26L430,27ZM420,9L418,10L409,10L405,8L413,8ZM417,13L414,14L411,12L414,12Z","Greenland":"M315,5L320,4L325,4L332,3L343,3L351,4L348,5L335,5L345,6L348,5L347,7L358,6L363,7L354,9L351,11L351,13L352,14L347,15L350,16L348,18L350,20L347,20L348,21L343,22L345,24L342,23L345,25L345,27L342,27L339,25L338,28L344,28L335,32L328,32L323,35L319,37L313,38L310,42L307,44L307,46L304,50L302,50L300,48L296,48L292,42L292,39L291,37L291,34L293,32L296,31L298,28L293,30L292,29L293,27L298,27L294,25L292,25L294,23L291,17L287,16L276,16L273,14L280,14L274,13L272,12L284,10L282,9L284,8L292,7L292,6L300,5L305,6L310,5L317,6Z","Fr. S. Antarctic Lands":"M510,317L513,318L509,320Z","Timor-Leste":"M646,219L646,220L646,219Z","South Africa":"M414,268L415,267L418,269L421,268L421,258L423,263L428,260L433,260L436,255L441,252L445,252L446,257L446,261L443,263L446,263L448,263L447,267L441,274L437,278L432,281L426,281L419,283L417,281L417,275ZM439,269L435,271L437,273Z","Lesotho":"M439,269L437,273L435,271Z","Mexico":"M142,116L147,116L154,119L163,118L166,124L168,125L170,123L173,124L175,132L179,133L176,141L178,150L181,152L189,149L191,145L198,144L195,152L194,151L192,153L187,154L189,157L186,157L185,161L180,157L176,158L162,152L158,146L160,144L159,141L154,131L150,125L149,120L147,118L146,122L150,131L152,139L147,136L148,132L144,130L145,126L143,124Z","Uruguay":"M262,272L263,272L271,276L272,281L269,284L263,282L262,281Z","Brazil":"M272,281L271,276L263,272L262,272L269,264L267,261L267,256L265,256L264,253L259,252L258,247L259,242L257,237L253,237L252,231L241,226L241,221L235,224L232,224L230,224L230,220L226,222L222,216L224,210L231,208L232,201L231,193L237,194L238,195L243,193L242,187L245,188L250,186L250,184L253,187L252,190L254,194L259,192L264,191L268,191L270,187L273,194L272,197L276,198L284,201L285,204L287,203L295,204L301,209L305,210L306,215L305,219L301,224L297,231L298,236L297,245L294,251L293,254L287,255L283,257L280,261L280,268Z","Bolivia":"M232,224L235,224L241,221L241,226L252,231L253,237L257,237L259,242L258,247L256,245L250,246L249,252L242,251L240,253L239,254L236,247L236,245L233,240L234,228Z","Peru":"M231,208L224,210L222,216L226,222L230,220L230,224L232,224L234,228L233,240L232,242L229,240L219,233L210,215L207,212L206,209L208,205L208,208L211,209L214,204L219,201L219,197L224,203L229,203Z","Colombia":"M237,194L231,193L232,201L231,208L229,203L224,203L219,197L215,196L212,194L215,187L214,179L215,175L219,174L220,171L224,169L228,166L229,168L225,171L227,180L231,180L232,182L236,182L235,190Z","Panama":"M215,175L214,179L212,175L209,178L203,177L204,173L207,175L211,173Z","Costa Rica":"M204,173L203,177L198,172L198,170L202,170Z","Nicaragua":"M202,170L198,170L195,165L200,160L204,160Z","Honduras":"M204,160L200,160L195,165L194,164L191,161L194,158L202,158Z","El Salvador":"M191,161L194,164L189,163Z","Guatemala":"M185,161L186,157L189,157L187,154L192,153L192,158L194,158L191,161L189,163Z","Belize":"M192,153L194,151L192,158Z","Venezuela":"M250,184L250,186L245,188L242,187L243,193L238,195L237,194L235,190L236,182L232,182L231,180L227,180L225,171L229,168L228,170L234,169L235,171L248,170L247,172L253,176L249,182Z","Guyana":"M259,192L254,194L252,190L253,187L250,184L249,182L253,176L258,182L256,187Z","Suriname":"M264,191L259,192L256,187L258,182L265,183Z","France":"M270,187L268,191L264,191L265,183ZM392,75L395,76L394,79L392,81L393,83L394,89L393,90L389,89L386,92L384,92L376,89L378,83L371,76L377,77L383,73L385,71L391,74ZM397,91L397,91L397,91Z","Ecuador":"M219,197L219,201L214,204L211,209L208,208L208,205L207,202L209,195L212,194L215,196Z","Puerto Rico":"M241,151L241,151L241,151Z","Jamaica":"M217,151L217,151L217,151Z","Cuba":"M209,139L217,141L220,144L225,147L217,148L218,146L215,143L207,141Z","Zimbabwe":"M445,252L441,252L439,250L433,241L437,241L442,236L444,235L449,238L447,249Z","Botswana":"M441,252L436,255L433,260L428,260L423,263L421,258L422,251L424,251L424,242L433,241L433,241L439,250Z","Namibia":"M421,258L421,268L418,269L415,267L414,268L411,264L410,252L408,249L405,240L418,240L425,241L429,240L433,241L424,242L424,251L422,251Z","Senegal":"M345,163L343,160L345,157L349,156L354,161L356,166L351,166L345,166L344,164Z","Mali":"M356,166L354,161L355,159L368,159L368,157L367,135L370,135L387,148L389,150L389,155L388,158L381,160L376,161L372,164L369,168L369,171L363,172L361,166L358,168Z","Mauritania":"M344,145L345,144L353,144L353,139L355,139L355,133L362,133L362,129L370,135L367,135L368,157L368,159L355,159L354,161L349,156L345,157L346,147Z","Benin":"M386,181L384,182L384,174L382,170L385,167L388,168L388,172L386,176Z","Niger":"M411,140L413,146L412,156L410,158L409,161L411,165L410,166L408,163L406,165L401,164L399,165L389,163L388,168L385,167L382,165L381,160L388,158L389,155L389,150L392,148L398,144L405,139Z","Nigeria":"M386,181L386,176L388,172L388,168L389,163L399,165L401,164L406,165L408,163L410,166L405,180L400,181L398,185L393,186L389,181Z","Cameroon":"M411,165L413,172L410,173L413,179L411,185L414,191L414,193L408,191L404,191L401,191L401,189L398,185L400,181L405,180L410,166Z","Togo":"M382,170L384,174L384,182L382,182L381,179L380,170Z","Ghana":"M380,170L381,179L382,182L376,185L374,185L373,181L375,177L374,173L374,170Z","Côte d'Ivoire":"M363,172L369,171L374,173L375,177L373,181L374,185L368,185L364,186L364,183L362,181L362,178Z","Guinea":"M351,166L356,166L358,168L361,166L363,172L362,178L358,176L356,172L352,175L348,170Z","Guinea-Bissau":"M345,166L351,166L348,170Z","Liberia":"M362,178L362,181L364,183L364,186L361,185L356,180L358,176Z","Sierra Leone":"M352,175L356,172L358,176L356,180L352,178Z","Burkina Faso":"M369,171L369,168L372,164L376,161L381,160L382,165L385,167L382,170L380,170L374,170L374,173Z","Central African Rep.":"M438,184L432,184L428,187L422,184L419,188L417,188L414,191L411,185L413,179L418,177L420,175L425,173L429,169L430,175L432,177Z","Congo":"M419,188L417,199L415,201L414,206L411,209L408,209L405,209L404,207L405,204L410,203L411,200L410,197L411,194L408,191L414,193L414,191L417,188Z","Gabon":"M404,191L408,191L411,194L410,197L411,200L410,203L405,204L404,207L399,200L400,194L404,194Z","Eq. Guinea":"M401,191L404,191L404,194L400,194Z","Zambia":"M445,218L450,220L451,223L450,231L444,234L444,235L442,236L437,241L433,241L433,241L429,240L426,237L427,229L431,229L431,224L436,226L438,226L441,230L440,226L441,218Z","Malawi":"M450,220L452,220L453,225L453,231L455,233L454,239L453,233L450,231L451,223Z","Mozambique":"M453,225L458,226L466,222L466,233L463,238L459,240L453,246L454,252L453,258L447,261L448,263L446,263L446,261L446,257L445,252L447,249L449,238L444,235L444,234L450,231L453,233L454,239L455,233L453,231Z","eSwatini":"M446,263L443,263L446,261Z","Angola":"M408,209L406,211L405,209ZM406,212L415,211L417,217L421,217L421,215L426,215L427,224L431,224L431,229L427,229L426,237L429,240L425,241L418,240L405,240L407,229L409,227L408,218Z","Burundi":"M445,203L446,205L443,208L442,204Z","Israel":"M452,116L452,117L452,119L452,124L450,119L451,115L452,114Z","Lebanon":"M452,114L451,115L452,111Z","Madagascar":"M485,228L487,235L478,259L474,260L471,259L470,252L473,247L473,240L474,237L478,236Z","Palestine":"M452,119L452,117L452,119Z","Gambia":"M345,163L344,164L345,163Z","Tunisia":"M399,122L398,117L395,114L397,105L399,104L401,107L400,112L403,115Z","Algeria":"M362,129L362,128L362,125L369,123L373,118L377,117L376,110L383,106L392,105L397,105L395,114L398,117L399,122L400,125L399,132L401,137L405,139L398,144L392,148L389,150L387,148L370,135Z","Jordan":"M452,117L452,116L455,117L458,114L460,117L455,119L458,121L454,125L452,124L452,124L452,119Z","United Arab Emirates":"M487,137L492,137L496,132L496,133L497,135L495,141L488,140Z","Qatar":"M485,136L487,136L485,136Z","Kuwait":"M478,123L479,126L476,125Z","Iraq":"M460,117L458,114L463,112L463,107L464,105L469,105L473,110L472,113L476,116L479,123L478,123L476,125L472,125L465,120Z","Oman":"M495,141L497,135L502,139L505,142L501,150L496,154L492,156L489,150L495,147L496,142ZM496,133L496,132L496,133Z","Vanuatu":"M733,236L733,236L733,236ZM732,236L732,236L732,236Z","Cambodia":"M598,167L598,162L603,162L607,162L608,166L605,168L606,170L602,171Z","Thailand":"M603,162L598,162L598,167L592,164L591,172L594,179L598,182L596,183L593,181L590,176L590,172L591,168L588,160L589,157L585,151L586,148L590,146L593,149L593,154L599,152L603,158Z","Laos":"M607,162L603,162L603,158L599,152L593,154L593,149L590,146L592,144L593,141L596,146L599,146L598,149L601,151L607,159Z","Myanmar":"M590,146L586,148L585,151L589,157L588,160L591,168L590,172L590,169L585,155L581,158L579,157L578,152L573,146L574,142L574,137L576,138L576,131L580,130L580,127L583,129L584,133L583,138L585,137L587,142L592,144Z","Vietnam":"M602,171L606,170L605,168L608,166L607,162L607,159L601,151L598,149L599,146L596,146L593,141L599,139L606,144L603,146L602,150L610,159L612,168L604,176Z","North Korea":"M635,92L635,92L635,92ZM635,92L635,92L635,96L632,98L635,101L631,103L628,102L628,99L625,98L628,93Z","South Korea":"M631,103L635,101L639,106L640,110L635,112Z","Mongolia":"M545,75L552,71L562,74L563,68L570,70L574,73L580,73L584,75L588,75L594,73L599,74L600,79L604,78L608,81L604,81L599,86L595,85L597,88L593,91L587,92L585,94L578,92L568,91L564,87L560,85L555,85L551,79L546,77Z","India":"M580,127L580,130L576,131L576,138L574,137L574,142L572,138L570,139L572,135L566,134L563,131L564,134L563,136L566,142L562,144L561,147L559,149L553,155L550,158L550,171L545,177L543,175L535,157L532,144L528,145L525,141L522,138L523,137L528,137L523,130L525,128L528,128L533,117L529,112L535,111L536,109L539,112L540,119L546,122L544,126L556,131L562,131L561,128L563,129L565,131L570,130L569,128L574,124L577,124Z","Bangladesh":"M574,142L573,146L571,141L569,143L566,142L563,136L564,134L563,131L566,134L572,135L570,139L572,138Z","Bhutan":"M569,128L570,130L565,131L563,129L565,127Z","Nepal":"M561,128L562,131L556,131L544,126L546,122L547,121L556,127Z","Pakistan":"M536,109L535,111L529,112L533,117L528,128L525,128L523,130L528,137L523,137L522,138L518,134L508,135L508,132L511,131L509,127L505,123L508,124L516,123L516,119L520,118L521,113L523,113L524,106L530,105L533,108Z","Afghanistan":"M513,104L515,105L520,104L520,101L524,106L526,104L529,104L530,105L524,106L523,113L521,113L520,118L516,119L516,123L508,124L505,123L506,121L504,119L502,113L503,108L505,109L509,107L511,103Z","Tajikistan":"M515,105L516,102L513,100L516,96L520,97L517,99L526,99L529,104L526,104L524,106L520,101L520,104Z","Kyrgyzstan":"M518,92L520,91L523,92L524,90L534,91L537,92L533,95L528,96L526,99L517,99L520,97L523,96L518,94Z","Turkmenistan":"M483,93L485,92L490,94L494,91L498,94L501,95L503,98L512,103L513,104L511,103L509,107L505,109L503,108L502,106L494,103L490,103L488,105L487,100L484,98L484,96L487,95L485,92Z","Iran":"M479,123L476,116L472,113L473,110L469,105L467,99L468,98L471,101L472,101L474,99L477,102L478,104L484,106L488,105L490,103L494,103L502,106L503,108L502,113L504,119L506,121L505,123L509,127L511,131L508,132L508,135L499,133L497,130L493,131L486,128L482,122Z","Syria":"M452,116L452,114L452,111L452,108L454,106L464,105L463,107L463,112L458,114L455,117Z","Armenia":"M472,101L471,101L468,98L465,95L468,95Z","Sweden":"M399,53L402,47L400,43L407,33L409,31L412,32L413,30L419,33L420,37L417,37L416,40L411,44L410,47L413,50L410,53L409,59L403,61Z","Belarus":"M431,59L436,60L436,62L440,65L438,66L439,68L437,70L429,69L424,70L423,64L427,63L428,60Z","Ukraine":"M439,68L442,68L446,72L455,74L455,78L453,80L448,81L447,84L444,83L439,82L437,85L434,84L437,82L435,79L430,78L427,79L423,78L422,77L422,76L425,72L424,70L429,69L437,70Z","Poland":"M423,64L424,70L425,72L422,76L415,75L408,71L406,64L412,62L416,63L421,63Z","Austria":"M412,78L411,81L406,82L403,80L400,81L398,79L405,79L406,76L412,77Z","Hungary":"M422,77L423,78L419,83L416,83L412,82L411,81L412,78L414,79L419,77Z","Moldova":"M430,78L435,79L437,82L434,84L434,81Z","Romania":"M434,84L437,85L435,89L433,87L430,89L424,87L419,83L423,78L427,79L430,78L434,81Z","Lithuania":"M428,60L427,63L423,64L421,63L419,61L418,59L425,58Z","Latvia":"M429,56L431,59L428,60L425,58L418,59L418,56L422,57L423,55Z","Estonia":"M429,51L429,56L423,55L421,52L425,51Z","Germany":"M406,64L408,71L403,73L406,76L405,79L398,79L394,79L395,76L392,75L391,73L391,71L393,65L396,64L395,62L398,62L400,64L403,63Z","Bulgaria":"M424,87L430,89L433,87L435,89L435,93L431,93L431,94L425,94L424,92Z","Greece":"M433,109L433,109L433,109ZM425,94L431,94L431,93L431,96L425,97L425,100L428,102L423,106L420,99L421,96Z","Turkey":"M469,105L464,105L454,106L452,108L449,106L445,107L441,106L439,107L435,106L432,102L432,99L437,95L441,95L445,93L449,93L455,95L461,94L465,95L468,98L467,99ZM431,93L435,93L437,95L432,97L431,96Z","Albania":"M421,96L420,99L418,93L419,91L420,93Z","Croatia":"M412,82L416,83L417,86L413,85L410,86L416,91L416,92L411,89L409,85L406,84L409,84Z","Switzerland":"M398,79L400,81L395,83L393,83L392,81L394,79Z","Luxembourg":"M391,73L392,75L391,74Z","Belgium":"M391,71L391,73L391,74L385,71L386,70L389,70Z","Netherlands":"M393,65L391,71L389,70L386,70L389,66Z","Portugal":"M362,93L367,93L365,105L362,105L361,101L363,96Z","Spain":"M365,105L367,93L362,93L362,90L365,88L376,89L384,92L386,92L384,95L382,95L379,99L380,101L376,106L371,106L369,108Z","Ireland":"M369,64L367,68L362,69L363,67L362,64L366,61L366,64Z","New Caledonia":"M727,249L727,249L727,249Z","Solomon Is.":"M725,223L725,223L725,223ZM724,221L724,221L724,221ZM722,221L722,221L722,221ZM720,217L720,217L720,217ZM715,214L715,214L715,214Z","New Zealand":"M729,296L725,299L723,295L726,293L729,288L728,283L730,284L730,289L733,291L735,290ZM709,305L720,297L721,301L711,307L707,311L703,312L699,311L701,309Z","Australia":"M670,298L671,298L667,304L663,305L664,298ZM636,277L632,279L630,281L622,281L617,284L612,282L615,277L616,270L615,267L616,257L618,251L634,246L637,242L640,238L646,232L649,231L651,234L654,233L657,228L661,227L661,224L667,227L671,227L666,233L673,240L677,240L680,234L681,228L683,223L685,233L687,234L688,244L692,247L692,252L697,260L696,267L691,275L687,279L680,287L679,290L675,291L670,294L668,292L665,293L660,291L660,287L657,285L659,282L655,284L659,279L654,284L652,278L647,275Z","Sri Lanka":"M554,178L554,181L551,182L550,177L550,173Z","China":"M610,152L608,151L609,148L612,147ZM537,92L537,90L534,86L538,84L538,80L542,81L542,77L544,75L545,75L546,77L551,79L555,85L560,85L564,87L568,91L578,92L585,94L587,92L593,91L597,88L595,85L599,86L604,81L608,81L604,78L600,79L599,74L601,75L603,69L602,66L606,65L612,67L619,74L623,75L628,79L635,77L636,85L632,85L635,92L628,93L625,98L620,100L620,97L619,95L613,101L619,105L620,103L625,105L622,106L620,110L622,112L628,118L628,121L630,123L626,136L622,140L617,141L612,144L606,144L599,139L593,141L592,144L587,142L585,137L583,138L584,133L583,129L580,127L577,124L574,124L569,128L565,127L563,129L561,128L556,127L547,121L546,122L540,119L539,112L536,109L533,108L530,105L529,104L526,99L528,96L533,95Z","Taiwan":"M633,136L632,143L630,139L632,134Z","Italy":"M400,81L403,80L406,82L407,84L404,84L404,88L411,94L416,97L413,97L414,99L412,103L410,98L405,95L397,87L394,89L393,83L395,83ZM409,102L410,106L405,104ZM397,95L399,96L399,100L397,100Z","Denmark":"M398,62L395,62L395,58L399,55L400,58ZM402,59L402,62L400,60Z","United Kingdom":"M369,64L366,64L366,61L370,63ZM374,65L373,62L370,61L369,57L371,53L375,53L373,56L377,55L374,59L376,59L379,63L381,66L383,67L381,72L369,73L372,70L372,65Z","Iceland":"M356,36L357,39L355,40L348,42L341,41L343,40L340,39L343,38L339,38L343,36L346,37Z","Azerbaijan":"M471,93L474,95L475,93L478,96L477,102L474,99L472,101L468,95ZM471,101L468,98L471,101Z","Georgia":"M458,89L469,92L471,93L468,95L465,95L461,94L461,91Z","Philippines":"M636,166L636,166L636,166ZM641,172L644,169L642,175ZM649,176L648,183L645,182L643,178L640,180L641,177L649,174ZM632,174L632,174L632,174ZM637,152L637,158L638,161L643,163L643,166L640,163L635,163L634,160L634,151ZM639,169L639,169L639,169ZM646,167L645,172L644,166Z","Malaysia":"M593,181L596,183L598,182L601,185L601,194L597,190ZM632,187L627,186L625,193L621,193L616,195L614,192L618,192L618,190L621,189L624,186L626,186L626,183L629,180L634,184Z","Brunei":"M626,183L626,186L624,186Z","Slovenia":"M406,82L411,81L412,82L409,84L406,84L407,84Z","Finland":"M426,30L429,33L428,35L430,37L430,39L431,42L434,44L429,49L420,50L417,48L416,44L418,42L423,39L420,37L419,33L413,30L420,31L422,29L427,29Z","Slovakia":"M422,76L422,77L419,77L414,79L412,78L412,77L415,75Z","Czechia":"M408,71L415,75L412,77L406,76L403,73Z","Eritrea":"M457,161L458,155L461,152L463,158L471,166L470,166L467,162L460,160Z","Japan":"M661,100L660,102L662,108L660,111L656,111L655,114L652,111L645,113L647,115L647,119L642,114L646,109L652,109L653,104L654,106L657,102L655,95L657,94ZM660,88L663,90L660,90L660,93L656,91L656,94L654,94L652,89L654,89L652,84ZM648,114L650,112L652,113L650,116Z","Paraguay":"M258,247L259,252L264,253L265,256L267,256L267,261L267,263L264,265L259,264L260,259L253,256L249,252L250,246L256,245Z","Yemen":"M489,150L492,156L490,158L483,162L472,166L470,156L471,153L480,155L483,151Z","Saudi Arabia":"M452,124L454,125L458,121L455,119L460,117L465,120L472,125L476,125L479,126L484,131L485,136L487,136L487,137L488,140L495,141L496,142L495,147L489,150L483,151L480,155L471,153L470,156L466,149L462,144L461,141L452,127Z","N. Cyprus":"M446,110L448,110L446,110Z","Cyprus":"M446,110L448,110L446,110Z","Morocco":"M376,110L377,117L373,118L369,123L362,125L362,128L362,130L356,130L354,136L351,138L349,144L344,144L350,132L354,127L356,127L360,123L360,120L362,114L366,112L368,108Z","Egypt":"M457,142L432,142L431,119L439,120L441,119L450,119L452,124L450,128L447,126L454,138L454,140Z","Libya":"M432,142L432,147L430,148L413,139L411,140L405,139L401,137L399,132L400,125L399,122L403,115L411,117L412,119L419,122L422,116L426,116L431,119Z","Ethiopia":"M482,177L476,185L473,185L469,187L467,186L464,188L457,186L455,183L452,178L452,175L453,171L456,166L457,161L460,160L467,162L470,166L469,170L471,170L473,174Z","Djibouti":"M470,166L471,166L472,169L471,170L469,170Z","Somaliland":"M484,169L484,174L482,177L473,174L471,170L472,169L474,171Z","Uganda":"M452,199L445,200L443,200L444,195L447,191L446,188L453,186L455,192L452,197Z","Rwanda":"M445,200L445,203L442,204L443,200Z","Bosnia and Herz.":"M416,91L410,86L413,85L417,86L417,89Z","Macedonia":"M424,92L425,94L421,96L420,93L422,92Z","Serbia":"M416,83L419,83L424,87L424,92L422,92L419,91L417,89L417,86Z","Montenegro":"M419,91L418,93L416,92L416,91L417,89L419,91Z","Kosovo":"M420,93L419,91L419,91L422,92Z","Trinidad and Tobago":"M249,170L249,170L249,170Z","S. Sudan":"M446,188L443,186L440,186L438,184L432,177L433,172L436,173L442,174L444,171L447,173L450,167L452,175L452,178L455,183L453,186Z"}};
;
/* ---------- AVL KPI engine ---------- */
(function(){
/* ============ APPROVED VENDOR MASTER DATA — engine ============ */
const AVL_CFG = {
  webapi: { tableSet:'cra95_avlsnapshots', payloadField:'cra95_payloadjson', dateField:'cra95_refreshedon' },
  url: 'avl.json'
};
const RED='#A20F1B', RED2='#982A33', ROSE='#C0656B', TAUPE='#6E5A5A', SAND='#D8B6B9', CARD='#EBE0E0';
const PAL=[RED, RED2, ROSE, TAUPE, SAND, '#7C3B41'];
const TYPE_COL={'Materials(Manufacturer)':RED,'Materials(Trade)':RED2,'Subcontractor':ROSE,'Services':TAUPE};
let CHARTS=[], SRC={txt:'Preview sample',cls:'warn'};
let F={type:null,source:null,country:null,year:null,segment:null};   // cross-filter state
let TOPN=25, QUERY='';

const sar=n=>{n=+n||0; return n>=1e9?(n/1e9).toFixed(2)+' bn' : n>=1e6?(n/1e6).toFixed(1)+' M' : n>=1e3?(n/1e3).toFixed(0)+' K' : n.toFixed(0);};
const num=n=>(+n||0).toLocaleString('en-US');
const pc=(a,b)=>b?(a/b*100):0;
const DOM=()=> (window.AVL_DATA&&window.AVL_DATA.domesticCountry)||'Saudi Arabia';

function filtered(){
  const V=(window.AVL_DATA&&window.AVL_DATA.vendors)||[];
  return V.filter(v=>
    (!F.type    || v.type===F.type) &&
    (!F.source  || v.source===F.source) &&
    (!F.country || v.country===F.country) &&
    (!F.year    || String(v.year)===String(F.year)) &&
    (!F.segment || (F.segment==='Domestic' ? v.country===DOM() : v.country!==DOM()))
  );
}
function agg(V,key){ const m={}; V.forEach(v=>{const k=v[key]; (m[k]=m[k]||{count:0,spend:0}); m[k].count++; m[k].spend+=(+v.spend||0);}); return m; }
function toggle(k,val){ F[k] = (F[k]===val ? null : val); render(); }
window.avlToggle = toggle;
function clearAll(){ F={type:null,source:null,country:null,year:null,segment:null}; render(); }
window.avlClear = clearAll;

/* ---------- filter bar ---------- */
function filterBar(){
  const bits=[];
  const lbl={type:'Type',source:'Source',country:'Country',year:'Year',segment:'Segment'};
  Object.entries(F).forEach(([k,v])=>{ if(v) bits.push(
    `<button class="fchip" data-act="avlToggle" data-a1="${k}" data-a2="${String(v).replace(/"/g,'&quot;')}">${lbl[k]}: <b>${v}</b> <span>✕</span></button>`); });
  const el=document.getElementById('avlFilters');
  el.innerHTML = bits.length
    ? bits.join('') + `<button class="fchip clear" data-act="avlClear">Clear all</button>`
    : `<span class="fhint">Click any chart segment, bar or country to filter the whole dashboard.</span>`;
}

/* ---------- KPI cards (grouped, by importance) ---------- */
function renderCards(V){
  const all=(window.AVL_DATA.vendors)||[];
  const spend=V.reduce((s,v)=>s+(+v.spend||0),0);
  const allSpend=all.reduce((s,v)=>s+(+v.spend||0),0);
  const dom=V.filter(v=>v.country===DOM()), intl=V.filter(v=>v.country!==DOM());
  const dSpend=dom.reduce((s,v)=>s+(+v.spend||0),0), iSpend=intl.reduce((s,v)=>s+(+v.spend||0),0);
  const types=new Set(V.map(v=>v.type)).size, countries=new Set(V.map(v=>v.country)).size;
  const isFilt=Object.values(F).some(Boolean);

  document.getElementById('avlCards').innerHTML = `
    <div class="gcard gcard--hero">
      <div class="hero4">
        <div class="h4">
          <div class="gcard__cap">Total Spend</div>
          <div class="gcard__val">SAR ${sar(spend)}</div>
          <div class="gcard__sub">${isFilt? `${pc(spend,allSpend).toFixed(1)}% of total spend` : (window.AVL_DATA.spendWindow||'')}</div>
        </div>
        <div class="h4sep"></div>
        <div class="h4">
          <div class="gcard__cap">Total Vendors</div>
          <div class="gcard__val big">${num(V.length)}</div>
          <div class="gcard__sub">${isFilt? `${pc(V.length,all.length).toFixed(1)}% of all vendors` : 'Active · spend authorized'}</div>
        </div>
        <div class="h4sep"></div>
        <div class="h4 h4--stack">
          <div class="stackrow">
            <div class="gcard__cap">Vendor Types</div>
            <div class="gcard__val sm">${types}</div>
          </div>
          <div class="stackline"></div>
          <div class="stackrow">
            <div class="gcard__cap">Countries</div>
            <div class="gcard__val sm">${countries}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="gcard gcard--split" data-act="avlToggle" data-a1="segment" data-a2="Domestic" title="Filter: Domestic">
      <div class="gcard__cap">Domestic — ${DOM()}</div>
      <div class="split">
        <div><div class="split__n">${num(dom.length)}</div><div class="split__l">Vendors · ${pc(dom.length,V.length).toFixed(1)}%</div></div>
        <div><div class="split__n">SAR ${sar(dSpend)}</div><div class="split__l">Spend · ${pc(dSpend,spend).toFixed(1)}%</div></div>
      </div>
      <div class="mbar"><i style="width:${pc(dSpend,spend).toFixed(1)}%"></i></div>
      <div class="gcard__hint">${F.segment==='Domestic'?'Filtering ✓':'Click to filter'}</div>
    </div>

    <div class="gcard gcard--split alt" data-act="avlToggle" data-a1="segment" data-a2="International" title="Filter: International">
      <div class="gcard__cap">International</div>
      <div class="split">
        <div><div class="split__n">${num(intl.length)}</div><div class="split__l">Vendors · ${pc(intl.length,V.length).toFixed(1)}%</div></div>
        <div><div class="split__n">SAR ${sar(iSpend)}</div><div class="split__l">Spend · ${pc(iSpend,spend).toFixed(1)}%</div></div>
      </div>
      <div class="mbar alt"><i style="width:${pc(iSpend,spend).toFixed(1)}%"></i></div>
      <div class="gcard__hint">${F.segment==='International'?'Filtering ✓':'Click to filter'}</div>
    </div>`;
}

/* ---------- charts ---------- */
function mk(id,cfg){
  const el=document.getElementById(id); if(!el) return;
  const old=Chart.getChart(el); if(old) old.destroy();          // canvas may be reused (explorer re-renders)
  const c=new Chart(el,cfg); CHARTS.push(c); return c;
}
const DL = ()=> (typeof ChartDataLabels!=='undefined') ? [ChartDataLabels] : [];

function renderCharts(V){
  CHARTS.forEach(c=>c.destroy()); CHARTS=[];
  const total=V.length, spend=V.reduce((s,v)=>s+(+v.spend||0),0);

  /* 1 — supplier type: doughnut (count) with centre total + spend legend */
  const T=Object.entries(agg(V,'type')).sort((a,b)=>b[1].count-a[1].count);
  mk('cType',{type:'doughnut',
    data:{labels:T.map(x=>x[0]),datasets:[{data:T.map(x=>x[1].count),
      backgroundColor:T.map(x=>TYPE_COL[x[0]]||ROSE),borderColor:'#fff',borderWidth:2,
      offset:T.map(x=>F.type===x[0]?10:0)}]},
    options:{cutout:'62%',onClick:(e,el)=>{if(el.length) toggle('type',T[el[0].index][0]);},
      plugins:{legend:{display:false},
        tooltip:{callbacks:{label:c=>` ${c.label}: ${num(c.raw)} (${pc(c.raw,total).toFixed(1)}%)`}},
        datalabels:{color:'#fff',font:{weight:'700',size:11},
          formatter:v=>pc(v,total)<7?'':pc(v,total).toFixed(0)+'%'}}},plugins:DL()});
  document.getElementById('cTypeMid').innerHTML=`<b>${num(total)}</b><span>vendors</span>`;
  document.getElementById('cTypeLeg').innerHTML = T.map(([k,v])=>`
    <button class="leg ${F.type===k?'on':''}" data-act="avlToggle" data-a1="type" data-a2="${k.replace(/"/g,'&quot;')}">
      <i style="background:${TYPE_COL[k]||ROSE}"></i>
      <span class="leg__k">${k}</span>
      <span class="leg__n">${num(v.count)}<em>${pc(v.count,total).toFixed(1)}%</em></span>
      <span class="leg__s">SAR ${sar(v.spend)}<em>${pc(v.spend,spend).toFixed(1)}%</em></span>
    </button>`).join('');

  /* 2 — creation source: 100% stacked bar (count) + spend row */
  const S=Object.entries(agg(V,'source')).sort((a,b)=>b[1].count-a[1].count);
  document.getElementById('cSrc').innerHTML = `
    <div class="sbar">${S.map(([k,v],i)=>`
      <button class="sbar__seg ${F.source===k?'on':''}" style="width:${pc(v.count,total)}%;background:${PAL[i]}"
        data-act="avlToggle" data-a1="source" data-a2="${k}" title="${k}: ${num(v.count)} vendors">
        ${pc(v.count,total)>9?pc(v.count,total).toFixed(0)+'%':''}</button>`).join('')}</div>
    <div class="srows">${S.map(([k,v],i)=>`
      <button class="srow ${F.source===k?'on':''}" data-act="avlToggle" data-a1="source" data-a2="${k}">
        <i style="background:${PAL[i]}"></i><span class="srow__k">${k}</span>
        <span class="srow__n">${num(v.count)} <em>${pc(v.count,total).toFixed(1)}%</em></span>
        <span class="srow__bar"><i style="width:${pc(v.spend,spend)}%"></i></span>
        <span class="srow__s">SAR ${sar(v.spend)} <em>${pc(v.spend,spend).toFixed(1)}%</em></span>
      </button>`).join('')}</div>`;

  /* 5 — onboarding by year, STACKED by supplier type */
  const years=[...new Set(V.map(v=>v.year))].sort();
  const typeKeys=Object.keys(TYPE_COL).filter(t=>V.some(v=>v.type===t));
  mk('cYear',{type:'bar',
    data:{labels:years,datasets:typeKeys.map(t=>({label:t,backgroundColor:TYPE_COL[t],borderWidth:0,
      data:years.map(y=>V.filter(v=>v.year===y && v.type===t).length)}))},
    options:{maintainAspectRatio:false,
      onClick:(e,el)=>{if(el.length) toggle('year',years[el[0].index]);},
      categoryPercentage:0.94, barPercentage:0.86,          // wide columns, plot fills the card
      plugins:{legend:{position:'bottom',labels:{boxWidth:10,font:{size:10.5},padding:12}},datalabels:{display:false},
        tooltip:{mode:'index'}},
      layout:{padding:{left:0,right:0}},
      scales:{x:{stacked:true,grid:{display:false},ticks:{font:{size:11}}},
              y:{stacked:true,beginAtZero:true,grid:{color:'#F0E6E6'},ticks:{font:{size:10}}}}},
    plugins:DL()});

  /* map */
  const M=window.WORLD_MAP, C=agg(V,'country');
  if(M){
    const max=Math.max(1,...Object.values(C).map(v=>v.count));
    document.getElementById('avlMap').innerHTML =
      `<svg viewBox="0 0 ${M.w} ${M.h}" class="wmap">` +
      Object.entries(M.countries).map(([n,d])=>{
        const r=C[n]; const on=F.country===n;
        const f=r?0.18+0.82*Math.sqrt(r.count/max):0;
        const fill=on?'#1A1630':(r?`rgba(162,15,27,${f.toFixed(2)})`:'#F1E9E9');
        return `<path d="${d}" fill="${fill}" stroke="#fff" stroke-width="0.5"
          ${r?`data-act="avlToggle" data-a1="country" data-a2="${n.replace(/"/g,'&quot;')}" style="cursor:pointer"`:''}>
          <title>${r?`${n}: ${num(r.count)} vendors · SAR ${sar(r.spend)}`:n}</title></path>`;
      }).join('') + `</svg>
      <div class="mapleg"><span>Fewer</span><i class="grad"></i><span>More vendors</span></div>`;
  }
  /* country table */
  const CT=Object.entries(C).sort((a,b)=>b[1].count-a[1].count).slice(0,15);
  document.getElementById('avlCountryTbl').innerHTML =
    `<table class="avltbl"><thead><tr><th>Country</th><th>Vendors</th><th>%</th><th>Spend</th></tr></thead><tbody>` +
    CT.map(([k,v])=>`<tr class="${F.country===k?'on':''}" data-act="avlToggle" data-a1="country" data-a2="${k.replace(/"/g,'&quot;')}" style="cursor:pointer">
      <td>${k}</td><td class="n">${num(v.count)}</td><td class="n">${pc(v.count,total).toFixed(1)}%</td>
      <td class="n">SAR ${sar(v.spend)}</td></tr>`).join('') + `</tbody></table>`;
}

/* ---------- spend explorer: search + slider over ALL vendors ---------- */
function renderExplorer(V){
  const q=QUERY.trim().toLowerCase();
  let L=[...V].sort((a,b)=>(+b.spend||0)-(+a.spend||0));
  if(q) L=L.filter(v=>(v.name||'').toLowerCase().includes(q) || (v.id||'').toLowerCase().includes(q));
  const shown=L.slice(0,TOPN);
  document.getElementById('expMeta').innerHTML =
    `<span>${num(L.length)} vendors${q?' matching “'+QUERY+'”':''} · showing top ${Math.min(TOPN,L.length)}</span>`
    + `<span class="explegend">` + Object.keys(TYPE_COL).filter(t=>shown.some(v=>v.type===t))
        .map(t=>`<i style="background:${TYPE_COL[t]}"></i>${t.replace('Materials','Materials ')}`).join('') + `</span>`;
  document.getElementById('expMax').textContent = TOPN;

  const ch=document.getElementById('cSpend');
  if(ch){ ch.parentElement.style.height = Math.max(220, shown.length*26+40)+'px'; }
  mk('cSpend',{type:'bar',
    data:{labels:shown.map(v=>v.name.length>38?v.name.slice(0,36)+'…':v.name),
      datasets:[{data:shown.map(v=>(+v.spend||0)/1e9),borderWidth:0,
        backgroundColor:shown.map(v=>TYPE_COL[v.type]||RED)}]},
    options:{indexAxis:'y',maintainAspectRatio:false,
      onClick:(e,el)=>{if(el.length) toggle('type', shown[el[0].index].type);},
      plugins:{legend:{display:false},
        tooltip:{callbacks:{title:c=>shown[c[0].dataIndex].id+' · '+shown[c[0].dataIndex].name,
          label:c=>` SAR ${sar((+shown[c.dataIndex].spend||0))} · ${shown[c.dataIndex].type} · ${shown[c.dataIndex].country}`}},
        datalabels:{anchor:'end',align:'right',color:TAUPE,font:{size:9.5,weight:'700'},
          formatter:(v,c)=>'SAR '+sar(+shown[c.dataIndex].spend||0)}},
      layout:{padding:{right:78}},
      scales:{x:{beginAtZero:true,grid:{color:'#F0E6E6'},title:{display:true,text:'Spend (SAR bn)',font:{size:10}}},
              y:{grid:{display:false},ticks:{font:{size:10}}}}},plugins:DL()});
}

/* ---------- main render ---------- */
function render(){
  const D=window.AVL_DATA;
  if(!D){
    window.scmCover('avlHost','Vendor data is currently updating',
      'The AGC Approved Vendor List is being refreshed from Dataverse. Live figures will appear here once the refresh completes.');
    return;
  }
  const parts = (D.scope||'').split(/\s*·\s*/).filter(Boolean);
  const field = (raw)=>{
    const i = raw.indexOf(':');
    const k = i>0 ? raw.slice(0,i).trim() : 'Operating Unit';
    const v = i>0 ? raw.slice(i+1).trim() : raw.trim();
    return `<div class="sfield"><span>${k}</span><b>${v}</b></div>`;
  };
  document.getElementById('avlScope').innerHTML =
    `<div class="scopebar">
       <div class="sfields">${parts.map(field).join('')}</div>
       <div class="datecard2"><span>Data Date</span><b>${D.dataDate||''}</b>
         <em class="chip ${SRC.cls}" id="avlSrcChip" title="">${SRC.txt}</em></div>
     </div>`;
  const V=filtered();
  filterBar(); renderCards(V); renderCharts(V); renderExplorer(V);
}
window.renderAVL=render;

/* ---------- controls ---------- */
function bind(){
  const s=document.getElementById('expSearch'), r=document.getElementById('expRange');
  if(s && !s._b){ s._b=1; s.addEventListener('input',e=>{QUERY=e.target.value; renderExplorer(filtered());}); }
  if(r && !r._b){ r._b=1; r.addEventListener('input',e=>{TOPN=+e.target.value; renderExplorer(filtered());}); }
}

/* ---------- data loading ---------- */
function normalize(p){
  if(typeof p==='string') p=JSON.parse(p);
  if(p && p.payload) p=p.payload;
  if(typeof p==='string') p=JSON.parse(p);
  if(!p || !Array.isArray(p.vendors)) throw new Error('payload has no vendors[]');
  return p;
}
async function fromDataverse(w){
  const url=`/_api/${w.tableSet}?$select=${w.payloadField}`+(w.dateField?`&$orderby=${encodeURIComponent(w.dateField+' desc')}`:'')+`&$top=1`;
  const r=await fetch(url,{credentials:'same-origin',headers:{'Accept':'application/json','OData-Version':'4.0','OData-MaxVersion':'4.0'}});
  if(!r.ok) throw new Error('Web API '+r.status);
  const j=await r.json(); const rec=j.value&&j.value[0]?j.value[0][w.payloadField]:null;
  if(!rec) throw new Error('no AVL row');
  return normalize(rec);
}
async function loadAVL(){
  const why=[];
  if(location.protocol==='file:'){
    why.push('opened from disk (file://) — the browser blocks fetch; deploy the page to test live data');
  } else {
    // 1) Dataverse (only if a table is actually configured)
    if(AVL_CFG.webapi && AVL_CFG.webapi.tableSet){
      try{
        window.AVL_DATA=await fromDataverse(AVL_CFG.webapi);
        SRC={txt:'Live · Dataverse',cls:'live'}; bind(); render(); return;
      }catch(e){ why.push('Dataverse: '+e.message); }
    }
    // 2) JSON web file — cache-busted (Power Pages caches web files hard)
    const url = AVL_CFG.url + (AVL_CFG.url.includes('?')?'&':'?') + 'v=' + Date.now();
    try{
      const r=await fetch(url,{credentials:'same-origin',cache:'no-store',headers:{'Accept':'application/json'}});
      if(r.ok){
        const txt = await r.text();
        let data;
        try{ data = normalize(txt); }
        catch(pe){ why.push('avl.json is not valid: '+pe.message+' — first 60 chars: '+txt.slice(0,60)); throw pe; }
        window.AVL_DATA=data;
        SRC={txt:'Live · avl.json',cls:'live'}; bind(); render(); return;
      }
      why.push('avl.json -> HTTP '+r.status+(r.status===404?' (file not uploaded as a Web File, or the Partial URL is not /avl.json)':''));
    }catch(e){ if(!why.length||!/not valid/.test(why[why.length-1])) why.push('avl.json fetch failed: '+e.message); }
  }
  SRC={txt:'Preview sample',cls:'warn'}; bind(); render();
  console.warn('[AVL] using the embedded sample because:\n · ' + why.join('\n · '));
  const el=document.getElementById('avlSrcChip'); if(el) el.title = why.join('\n');
}
window.loadAVL=loadAVL;
})();
;
/* ---------- SCM SSOT app ---------- */
/* ================= DATA (JSON-driven — swap by loading another JSON) ================= */
window.SCM_OVERVIEW = {
  "title": "Executive Summary | SCM KPIs",
  "cutoff": "Cut-off: Jan \u2013 30 Jun 2026",
  "cadence": "Monthly",
  "poDate": "2026",
  "overallScore": 76,
  "value": {
    "spend": 1.6,
    "spendUnit": "bn SAR",
    "saving": 207.2,
    "savingUnit": "M SAR",
    "savingPct": 11.6,
    "avoidance": 140.06,    
    "avoidanceUnit": "M SAR",
    "avoidancePct": 14.0
  },
  "groups": [
    {
      "name": "Procurement Value",
      "note": "Financial impact of sourcing & negotiation",
      "kpis": [
        {
          "cap": "Total Spend",
          "value": 1.6,
          "disp": "1.6",
          "unit": "bn",
          "sub": "Total procurement base",
          "type": "stat"
        },
        {
          "cap": "Total Saving",
          "value": 207.2,
          "disp": "207.2",
          "unit": "M",
          "sub": "Budget reduction achieved",
          "type": "stat"
        },
        {
          "cap": "Saving %",
          "value": 11.6,
          "disp": "11.6",
          "unit": "%",
          "min": 5,
          "target": 8,
          "max": 15,
          "dir": "higher"
        },
        {
          "cap": "Cost Avoidance %",
          "value": 14,
          "disp": "14",
          "unit": "%",
          "min": 5,
          "target": 10,
          "max": 18,
          "dir": "higher"
        }
      ]
    },
    {
      "name": "Procurement Efficiency & Cash Flow",
      "note": "Working capital, payment terms & cycle speed",
      "kpis": [
        {
          "cap": "On Time \u2013 PR to PO %",
          "value": 85,
          "disp": "85",
          "unit": "%",
          "min": 85,
          "target": 95,
          "max": 100,
          "dir": "higher"
        },
        {
          "cap": "No. of Days To Pay",
          "value": 85,
          "disp": "85",
          "unit": "d",
          "min": 60,
          "target": 100,
          "max": 120,
          "dir": "higher"
        },
        {
          "cap": "Advance Payments %",
          "value": 6,
          "disp": "6",
          "unit": "%",
          "target": 7,
          "maxAccept": 10,
          "max": 12,
          "dir": "lower"
        },
        {
          "cap": "Post Delivery %",
          "value": 94,
          "disp": "94",
          "unit": "%",
          "min": 85,
          "target": 95,
          "max": 100,
          "dir": "higher"
        }
      ]
    },
    {
      "name": "Expediting & Logistics",
      "note": "Shipment safety, on-time delivery & port cost control",
      "kpis": [
        {
          "cap": "On Time Delivery % (Expediting)",
          "value": 91,
          "disp": "91",
          "unit": "%",
          "min": 80,
          "target": 95,
          "max": 100,
          "dir": "higher"
        },
        {
          "cap": "Incident Free Trans. Accuracy",
          "value": 100,
          "disp": "100",
          "unit": "%",
          "min": 95,
          "target": 100,
          "max": 100,
          "dir": "higher"
        },
        {
          "cap": "Demurrage / Material Cost",
          "value": 0.04,
          "disp": "0.04",
          "unit": "%",
          "target": 0,
          "maxAccept": 0.2,
          "max": 0.25,
          "dir": "lower"
        }
      ]
    },
    {
      "name": "Inventory & Warehouse",
      "note": "Stock reliability & system compliance",
      "kpis": [
        {
          "cap": "Inventory Accuracy %",
          "value": 100,
          "disp": "100.0",
          "unit": "%",
          "min": 95,
          "target": 100,
          "max": 100,
          "dir": "higher"
        },
        {
          "cap": "On Time % System. Receipt",
          "value": 85.4,
          "disp": "85.4",
          "unit": "%",
          "min": 85,
          "target": 95,
          "max": 100,
          "dir": "higher"
        }
      ]
    }
  ]
};


window.SCM_MASTERDATA = {
  title: "Item Code Cleansing — Duplication Removal Progress",
  sub: "MASTER DATA CLEANSING · REMOVING DUPLICATION ACROSS 6 BATCHES",
  context: "Al Gihaz Holding · Construction & Industrial Cluster · ERS Phase 2",
  headline: [
    { cap:"Total item codes", from:"41,000", value:"38,100", sub:"Total item codes now — down from 41K before cleansing" },
    { cap:"Batches completed", value:"3 of 6", sub:"Batches completed — 50% of the plan", pct:50 },
    { cap:"Duplicates removed", value:"7,612", sub:"Duplicate records removed to date", accent:"ok" }
  ],
  completed: [
    { n:"BATCH 1", value:"4,380", d:"Duplicate records removed", pct:100 },
    { n:"BATCH 2", value:"2,566", d:"Duplicate records removed", pct:100 },
    { n:"BATCH 3", value:"660",   d:"Duplicate records removed", pct:100 }
  ],
  remaining: [
    { n:"BATCH 4", value:"August 2026",   d:"Target completion", pct:30, state:"in progress" },
    { n:"BATCH 5", value:"October 2026",  d:"Start date" },
    { n:"BATCH 6", value:"December 2026", d:"Start date" }
  ],
  perBatchNote: "Approx. <b>12,000 items</b> checked per batch",
  remainingNote: "3 batches remaining · One batch every two months, completing duplication removal across all 41K item codes.",
  taxonomy: {
    title: "AI-Powered Item Taxonomy Mapping",
    sub: "MASTER DATA · AUTOMATED UNSPSC CLASSIFICATION TO LEVEL 4",
    kpis: [
      { cap:"Pilot scope", value:"50", sub:"Item codes in the pilot" },
      { cap:"Taxonomy depth", value:"L1 → L4", sub:"Full UNSPSC depth mapped" },
      { cap:"Automated", value:"100", unit:"%", sub:"No human picks the code" }
    ],
    steps: [
      { b:"Item Input", p:"Item code, description and attributes are read from the master data." },
      { b:"AI Classification", p:"The model interprets each item and infers its category automatically." },
      { b:"UNSPSC Mapping", p:"Item is mapped to the UNSPSC hierarchy from Level 1 down to Level 4." },
      { b:"Code Assigned", p:"Final UNSPSC code is assigned automatically — no human selection." }
    ],
    goal: "Build an AI-powered tool that maps every item to its UNSPSC taxonomy down to Level 4 automatically — removing manual selection of the code for each item."
  }
};


/* ================= EXTERNAL JSON LOADERS =================
   Data is JSON-driven. The objects above are the DEFAULT (current) data.
   To publish new data, upload a JSON Web File and point CONFIG_SCM at it —
   no code change. Shapes are identical to window.SCM_OVERVIEW / SCM_MASTERDATA.
   Dataverse option: set table/columns and it reads the newest row's JSON.
   ========================================================= */
const CONFIG_SCM = {
  overview: {
    url: 'scm-overview.json',            // Web File at the site root  (leave as-is)
    webapi: null                         // or: {tableSet:'cra95_scmoverviews', dateField:'cra95_reportdate', payloadField:'cra95_payloadjson'}
  },
  masterdata: {
    url: 'scm-masterdata.json',
    webapi: null
  },
  quiet: true                            // keep defaults silently if the file isn't there yet
};

async function loadJson(url){
  const res = await fetch(url, {credentials:'same-origin', headers:{'Accept':'application/json'}});
  if(!res.ok) throw new Error(url+' -> '+res.status+' '+res.statusText);
  return res.json();
}
async function loadFromWebapi(w){
  const url = `/_api/${w.tableSet}?$select=${w.payloadField},${w.dateField}&$orderby=${encodeURIComponent(w.dateField+' desc')}&$top=1`;
  const res = await fetch(url,{credentials:'same-origin',headers:{'Accept':'application/json','OData-Version':'4.0','OData-MaxVersion':'4.0'}});
  if(!res.ok) throw new Error('Web API '+res.status);
  const j = await res.json();
  let p = (j.value&&j.value[0]) ? j.value[0][w.payloadField] : null;
  if(typeof p==='string') p = JSON.parse(p);
  if(p && p.payload) p = p.payload;                 // unwrap envelope
  if(!p) throw new Error('no row');
  return p;
}
async function loadSection(key, globalName, renderFn){
  const c = CONFIG_SCM[key];
  if(location.protocol === 'file:') return;         // preview: keep defaults
  try{
    const data = c.webapi ? await loadFromWebapi(c.webapi) : await loadJson(c.url);
    window[globalName] = data;
    renderFn();
    console.info('[SCM] '+key+' loaded from '+(c.webapi ? 'Dataverse' : c.url));
  }catch(err){
    if(!CONFIG_SCM.quiet) console.warn('[SCM] '+key+' fallback to embedded data: '+err.message);
  }
}

/* ================= RENDERERS ================= */
function kpiCardC(k){
  const st = k.status ? ' '+k.status : '';
  const bar = (k.pct!=null) ? `<div class="kpiC__bar"><i style="width:${Math.min(100,k.pct)}%"></i></div>` : '';
  const note = k.note ? `<div class="kpiC__note">${k.note}</div>` : (k.sub?`<div class="kpiC__sub">${k.sub}</div>`:'');
  const sub = (k.note && k.sub) ? `<div class="kpiC__sub">${k.sub}</div>` : '';
  return `<div class="kpiC${st}"><div class="kpiC__cap">${k.cap}</div>
    <div class="kpiC__val">${k.value}${k.unit?`<span class="u">${k.unit}</span>`:''}</div>
    ${sub}${bar}${note}</div>`;
}
/* ============ OVERVIEW — infographic renderers ============ */
const OKC='#2E7D57', WARNC='#B5852A', REDC='#A20F1B', LINEC='#E4D7D7', CARDC='#EBE0E0', MUTEC='#9B8A8A';

function kpiStatus(k){
  if(k.type==='stat') return 'stat';
  if(k.dir==='lower'){
    if(k.target!=null && k.value<=k.target) return 'ok';
    if(k.maxAccept!=null && k.value<=k.maxAccept) return 'ok';
    return 'warn';
  }
  if(k.target!=null && k.value>=k.target) return 'ok';
  if(k.min!=null && k.value>=k.min) return 'warn';
  return 'bad';
}
function pctOf(k){                       // fill % of the bullet track
  const max = k.max!=null?k.max:100;
  return Math.max(0, Math.min(100, (k.value/max)*100));
}
function markAt(v,k){                     // marker position %
  const max = k.max!=null?k.max:100;
  return Math.max(0, Math.min(100, (v/max)*100));
}

/* --- radial gauge (overall score) --- */
function gauge(score){
  const R=54, C=2*Math.PI*R, on=C*score/100;
  return `<svg viewBox="0 0 140 140" class="gauge">
    <circle cx="70" cy="70" r="${R}" fill="none" stroke="${CARDC}" stroke-width="16"/>
    <circle cx="70" cy="70" r="${R}" fill="none" stroke="${REDC}" stroke-width="16"
      stroke-dasharray="${on.toFixed(1)} ${(C-on).toFixed(1)}" stroke-dashoffset="${(C*0.25).toFixed(1)}"
      transform="rotate(-90 70 70)" stroke-linecap="butt"/>
    <text x="70" y="66" text-anchor="middle" class="g-val">${score}<tspan class="g-pct">%</tspan></text>
    <text x="70" y="88" text-anchor="middle" class="g-cap">SCM SCORE</text>
  </svg>`;
}
/* --- status donut (how many KPIs on target) --- */
function statusDonut(counts){
  const total = counts.ok+counts.warn+counts.bad || 1;
  let off=25, out='';
  [['ok',OKC],['warn',WARNC],['bad',REDC]].forEach(([k,c])=>{
    const p = counts[k]/total*100; if(!p) return;
    out += `<circle cx="21" cy="21" r="15.9" fill="none" stroke="${c}" stroke-width="7"
      stroke-dasharray="${p.toFixed(2)} ${(100-p).toFixed(2)}" stroke-dashoffset="${off.toFixed(2)}"/>`;
    off = (off - p + 100) % 100;
  });
  return `<svg viewBox="0 0 42 42" class="donut">
    <circle cx="21" cy="21" r="15.9" fill="none" stroke="${CARDC}" stroke-width="7"/>${out}
    <text x="21" y="20.5" text-anchor="middle" class="d-val">${counts.ok}</text>
    <text x="21" y="25.5" text-anchor="middle" class="d-cap">of ${total}</text></svg>`;
}
/* --- bullet chart (value vs MIN band and TARGET marker) --- */
function bullet(k){
  const st=kpiStatus(k), col = st==='ok'?OKC : st==='warn'?WARNC : REDC;
  const fill=pctOf(k);
  let bands='';
  if(k.dir==='lower' && k.maxAccept!=null){
    bands = `<rect x="0" y="0" width="${markAt(k.maxAccept,k)}%" height="14" fill="${CARDC}" opacity=".55"/>`;
  } else if(k.min!=null){
    bands = `<rect x="0" y="0" width="${markAt(k.min,k)}%" height="14" fill="${CARDC}" opacity=".55"/>`;
  }
  const tX = Math.min(markAt(k.target,k), 98.6);
  const tMark = (k.target!=null)
    ? `<rect x="${tX}%" y="-3" width="2.5" height="20" fill="#4A3C3C"/>` : '';
  const aX = Math.min(markAt(k.maxAccept,k), 99);
  const aMark = (k.dir==='lower' && k.maxAccept!=null)
    ? `<rect x="${aX}%" y="-1" width="1.5" height="16" fill="${MUTEC}" opacity=".8"/>` : '';
  return `<svg class="bul" viewBox="0 0 100 14" preserveAspectRatio="none">
      <rect x="0" y="0" width="100%" height="14" fill="#F7F1F1"/>${bands}
      <rect x="0" y="3" width="${fill}%" height="8" fill="${col}"/>${aMark}${tMark}
    </svg>`;
}
function legendFor(k){
  const bits=[];
  if(k.min!=null) bits.push(`MIN ${k.min}${k.unit==='d'?'':k.unit||''}`);
  if(k.maxAccept!=null) bits.push(`MAX ${k.maxAccept}${k.unit||''}`);
  if(k.target!=null) bits.push(`TARGET ${k.target}${k.unit==='d'?'':k.unit||''}`);
  return bits.join(' &nbsp;·&nbsp; ');
}
function kpiTile(k){
  const st=kpiStatus(k);
  if(st==='stat'){
    return `<div class="ktile stat"><div class="ktile__cap">${k.cap}</div>
      <div class="ktile__val">${k.disp}<span class="u">${k.unit||''}</span></div>
      <div class="ktile__sub">${k.sub||''}</div></div>`;
  }
  const dot = st==='ok'?'On target':(st==='warn'?'At minimum':'Below minimum');
  return `<div class="ktile ${st}">
    <div class="ktile__cap">${k.cap}<span class="ktile__flag">${dot}</span></div>
    <div class="ktile__val">${k.disp}<span class="u">${k.unit||''}</span></div>
    ${bullet(k)}
    <div class="ktile__legend">${legendFor(k)}</div></div>`;
}
function vcNum(v,unit){const u=String(unit||'').toLowerCase();
  const m=u.includes('bn')?1e9:u.includes('m')?1e6:u.includes('k')?1e3:1; return (+v||0)*m;}
function vcF(n){n=+n||0; return n>=1e9?(n/1e9).toFixed(2)+' bn':n>=1e6?(n/1e6).toFixed(1)+' M':n>=1e3?(n/1e3).toFixed(0)+' K':n.toFixed(0);}
function vcFind(d,re){for(const g of (d.groups||[])) for(const k of (g.kpis||[])) if(re.test(k.cap||'')) return k; return null;}
function renderOverview(){
  const d=window.SCM_OVERVIEW;
  const kSave  = vcFind(d,/saving\s*%/i)  || {value:d.value.savingPct,   min:5,target:8, max:15,unit:'%',dir:'higher'};
  const kAvoid = vcFind(d,/avoidance/i)   || {value:d.value.avoidancePct,min:5,target:10,max:18,unit:'%',dir:'higher'};
  const vcTot   = vcNum(d.value.spend, d.value.spendUnit);
  const vcSave  = d.value.saving!=null ? vcNum(d.value.saving,d.value.savingUnit) : vcTot*(d.value.savingPct||0)/100;
  const vcAvoid = d.value.avoidance!=null ? vcNum(d.value.avoidance,d.value.avoidanceUnit||d.value.savingUnit)
                                          : vcTot*(d.value.avoidancePct||0)/100;
  // use the OFFICIAL KPI percentages so the bar always agrees with the KPI cards below
  const vcSaveP  = d.value.savingPct    != null ? +d.value.savingPct    : (vcTot? vcSave/vcTot*100 : 0);
  const vcAvoidP = d.value.avoidancePct != null ? +d.value.avoidancePct : (vcTot? vcAvoid/vcTot*100 : 0);
  const vcNetP   = Math.max(0, 100 - vcSaveP - vcAvoidP);
  const vcNet    = Math.max(0, vcTot - vcSave - vcAvoid);
  const all=d.groups.flatMap(g=>g.kpis).filter(k=>k.type!=='stat');
  const counts={ok:0,warn:0,bad:0};
  all.forEach(k=>counts[kpiStatus(k)]++);

  document.getElementById('ovTop').innerHTML = `
    <div class="ovcard ovcard--score">${gauge(d.overallScore)}
      <div class="ovcard__side"><div class="t">Overall SCM Score</div>
        <div class="s">${d.cutoff}</div><div class="s">${d.cadence} · PO Date ${d.poDate}</div></div></div>

    <div class="ovcard">
      <div class="ovcard__h">KPI health</div>
      <div class="health">${statusDonut(counts)}
        <ul class="hl">
          <li><i style="background:${OKC}"></i>On target <b>${counts.ok}</b></li>
          <li><i style="background:${WARNC}"></i>At minimum <b>${counts.warn}</b></li>
          <li><i style="background:${REDC}"></i>Below minimum <b>${counts.bad}</b></li>
        </ul></div>
    </div>

    <div class="ovcard ovcard--wide">
      <div class="ovcard__h">Value captured
        <em class="ovcard__of">measured against SAR ${vcF(vcTot)} total spend</em></div>

      <div class="vclist">
        ${[['Total saving',vcSave,vcSaveP,kSave,'save'],
           ['Cost avoidance',vcAvoid,vcAvoidP,kAvoid,'avoid']].map(([lbl,abs,share,k,cls])=>{
          const st=kpiStatus(k), gap=k.value-(k.target!=null?k.target:0);
          const tX=Math.min(100,(k.target!=null?k.target:0)/ (k.max!=null?k.max:100) *100);
          return `<div class="vcitem ${cls} ${st}">
            <div class="vcitem__top">
              <span class="vcitem__k">${lbl}</span>
              <b class="vcitem__v">SAR ${vcF(abs)}</b>
            </div>
            <div class="vctrack" title="${share.toFixed(1)}% ">
              <i class="vctrack__fill" style="width:${Math.min(100,share)}%"></i>
              <i class="vctrack__target" style="left:${Math.min(100,share? (k.target/ (k.value||1) )*share :0)}%"></i>
            </div>
            <div class="vcitem__foot">
              <span class="vcitem__pct">${share.toFixed(1)}%<em></em></span>
              <span class="vcitem__tgt">target ${k.target}%<em>${gap>=0?'+':''}${gap.toFixed(1)} pts</em></span>
            </div>
          </div>`;}).join('')}
      </div>
    </div>`;

  document.getElementById('ovGroups').innerHTML = d.groups.map(g=>{
    return `<section class="grp">
      <div class="grp__h"><b>${g.name}</b><span>${g.note}</span></div>
      <div class="kgrid">${g.kpis.map(kpiTile).join('')}</div>
    </section>`;}).join('');
}

function renderMaster(){
  const d = window.SCM_MASTERDATA;
  document.getElementById('mdHead').innerHTML = d.headline.map(k=>
    k.from ? `<div class="kpiC"><div class="kpiC__cap">${k.from? k.cap : k.cap}</div>
        <div class="kpiC__val mdfrom"><s>${k.from}</s><em>&rarr;</em><b>${k.value}</b></div>
        <div class="kpiC__sub">${k.sub||''}</div></div>`
      : kpiCardC(k)).join('');

  document.getElementById('mdDone').innerHTML = d.completed.map(b=>`
    <div class="batch"><div class="n">${b.n}</div><div class="v">${b.value}</div><div class="d">${b.d}</div>
      <div class="track"><i style="width:${b.pct!=null?b.pct:100}%"></i></div>
      <div class="bstate done">${b.pct!=null?b.pct:100}% completed</div></div>`).join('');

  document.getElementById('mdPlan').innerHTML = d.remaining.map((b,i)=>`
    <div class="batch plan${b.pct?' is-live':''}">
      <div class="n">${b.n}</div><div class="v">${b.value}</div>
      ${b.pct!=null
        ? `<div class="track plan"><i style="width:${b.pct}%"></i></div>
           <div class="bstate live">${b.pct}% ${b.state||'in progress'}</div>`
        : `<div class="d">${b.d}</div>`}
    </div>${i<d.remaining.length-1?'<div class="barrow">&rarr;</div>':''}`).join('');

  document.getElementById('mdNote').textContent = d.remainingNote;
  const pbn=document.getElementById('mdPerBatch');
  if(pbn) pbn.innerHTML = d.perBatchNote||'';
  const t = d.taxonomy;
  document.getElementById('mdTaxHead').innerHTML =
    `<div class="grp__h"><b>${t.title}</b><span>${t.sub}</span></div>`;
  document.getElementById('mdTaxKpis').innerHTML = t.kpis.map(kpiCardC).join('');
  document.getElementById('mdSteps').innerHTML = t.steps.map((s,i)=>`
    <div class="step"><div class="i">${i+1}</div><b>${s.b}</b><p>${s.p}</p></div>`).join('');
  document.getElementById('mdGoal').innerHTML = `<b>Goal ·</b> ${t.goal}`;
}



/* ============ CSP-SAFE EVENT DISPATCH ============
   Power Pages enforces a Content Security Policy without 'unsafe-inline',
   which blocks inline on* handler attributes. All interactive controls
   therefore declare data-act / data-chg / data-inp and are dispatched here
   through delegated listeners, which CSP permits. ============ */
(function(){
  function argsOf(el, ev){
    var a=[], d=el.dataset;
    for(var i=1;i<=3;i++){
      var v=d['a'+i];
      if(v===undefined) break;
      a.push(/^-?\d+$/.test(v) ? Number(v) : v);
    }
    if(d.aval!==undefined) a.push(el.value);
    return a;
  }
  function run(el, name, ev){
    var fn=window[name];
    if(typeof fn!=='function'){ console.warn('[SCM] no handler:',name); return; }
    try{ fn.apply(null, argsOf(el, ev)); }
    catch(err){ console.warn('[SCM] handler error:',name,err); }
  }
  document.addEventListener('click', function(e){
    var el=e.target && e.target.closest && e.target.closest('[data-act]');
    if(!el || el.disabled) return;
    e.preventDefault();
    run(el, el.dataset.act, e);
  });
  document.addEventListener('change', function(e){
    var el=e.target && e.target.closest && e.target.closest('[data-chg]');
    if(!el) return;
    run(el, el.dataset.chg, e);
  });
  document.addEventListener('input', function(e){
    var el=e.target && e.target.closest && e.target.closest('[data-inp]');
    if(!el) return;
    run(el, el.dataset.inp, e);
  });
})();

/* ================= MONTHLY INTELLIGENCE — month dropdown ================= */
window.SCM_MONTHLY = {
  months: [
{key:"2026-08",label:"August 2026",status:"published",
src:"https://app.powerbi.com/view?r=eyJrIjoiZjc4NDNlOTMtNWNhMy00Yzc2LWI1YzUtNjYzYTBiZDM1ZGNmIiwidCI6Ijk3ZGE5ZDRmLWRlM2EtNDMxMC04MWM5LTcwZDU4ZjM3YWJkNSIsImMiOjl9"},
    { key:"2026-07", label:"July 2026", status:"published",
      src:"https://app.powerbi.com/view?r=eyJrIjoiNzNkZGUwMDQtZDA4MS00ZTlhLTkxYTAtNzcyZDk5ZTBkODhiIiwidCI6Ijk3ZGE5ZDRmLWRlM2EtNDMxMC04MWM5LTcwZDU4ZjM3YWJkNSIsImMiOjl9" },
    { key:"2026-06", label:"June 2026", status:"published",
      src:"https://app.powerbi.com/view?r=eyJrIjoiYzUyMTM0MDItOGY2Yy00ZDcyLThhMmUtNGJkZGY1YTBhZmMyIiwidCI6Ijk3ZGE5ZDRmLWRlM2EtNDMxMC04MWM5LTcwZDU4ZjM3YWJkNSIsImMiOjl9" }
  ]
};
const MO_LABEL = { published:{ t:"Published", c:"" }, updating:{ t:"Updating", c:"draft" } };
let MO_ACTIVE = null;
function renderMonthly(){
  const list=((window.SCM_MONTHLY||{}).months)||[]; if(!list.length) return;
  if(MO_ACTIVE==null || !list.some(m=>m.key===MO_ACTIVE)) MO_ACTIVE=list[0].key;
  const m=list.find(x=>x.key===MO_ACTIVE)||list[0], st=MO_LABEL[m.status]||MO_LABEL.published;
  const sel=document.getElementById('moSelect');
  if(sel && sel.dataset.n!==String(list.length)){
    sel.innerHTML=list.map(x=>`<option value="${x.key}">${x.label}</option>`).join('');
    sel.dataset.n=String(list.length);
  }
  if(sel) sel.value=MO_ACTIVE;
  const pill=document.getElementById('moPill');
  if(pill){ pill.className='mopill '+st.c; pill.innerHTML=`<i></i>${st.t}`; }
  const bi=document.getElementById('moBi');
  if(bi){ const cur=bi.querySelector('iframe');
    if(!cur || cur.getAttribute('data-key')!==m.key){
      bi.innerHTML = m.src
        ? `<iframe title="${m.label}" data-key="${m.key}" src="${m.src}" frameborder="0" allowFullScreen="true"></iframe>`
        : `<div class="biempty">No report published for ${m.label} yet.</div>`; } }
}
window.renderMonthly=renderMonthly;
document.addEventListener('change',function(e){
  if(e.target && e.target.id==='moSelect'){ MO_ACTIVE=e.target.value; renderMonthly(); }
});

/* ================= ROUTER + DRAWER ================= */
const TITLES = {
  admin:['Administration','User Management'],
  'content-admin':['Content Administration','Update site content & data'],
  overview:['Supply Chain Management','Overview'],
  scmkpi:['Analytics','SCM KPIs'],
  monthly:['Reporting','Monthly Intelligence'],
  lme:['Market','Daily LME Alert'],
  masterdata:['Master Data','Item Master Data Progress'],
  avl:['Vendor Master Data','AGC Approved Vendor List'],
  secavl:['Vendor Master Data','SEC Approved Vendor List'],
  secsole:['SCM Risk Management','SEC AVL Sole Source Risk Analysis'],
  riskregister:['SCM Risk Management','Risk Register'],
  l0projects:['SCM Risk Management','L0 Projects'],
  categoryfactpacks:['Market','Category Fact Packs'],
  'cfp-power-transformers':['Category Fact Packs','Power Transformers'],
  coststructure:['Should-Cost Model','Cost Structure For Main Equipment'],
  shouldcost:['Should-Cost Model','Demo Should Cost Model'],
  strategy:['Advisory','Strategy Recommendation']
};
let lmeBooted=false, avlBooted=false;
var openSide = function(o){
  const s=document.getElementById('side'), c=document.getElementById('scrim');
  if(s) s.classList.toggle('is-open',o);
  if(c) c.classList.toggle('is-open',o);
};
function go(page){
  if(!page || !TITLES[page]) page='overview';
  if(page==='secsole' && !window._secBooted){ window._secBooted=1; try{ loadSEC(); }catch(e){ console.warn(e); } }
  if(page==='coststructure'){ try{ renderCostStructure(); }catch(e){ console.warn('[SCM] cost structure:',e); } }
  if(page==='shouldcost'){ try{ renderDemoSelect(); }catch(e){ console.warn('[SCM] demo select:',e); } }
  document.querySelectorAll('.nav__item').forEach(n=>n.classList.toggle('is-active',n.dataset.page===page));
  document.querySelectorAll('.page').forEach(p=>p.classList.toggle('is-active',p.dataset.page===page));
  /* SELF-HEAL: if a host/portal stylesheet overrides our .page rules, the class
     toggle above changes nothing visually and the menu looks dead. Enforce it
     with inline styles, which outrank any external sheet. */
  try{
    document.querySelectorAll('.page').forEach(function(p){
      const want = p.dataset.page===page;
      const shown = p.offsetParent!==null || getComputedStyle(p).display!=='none';
      if(want && !shown)      p.style.setProperty('display','block','important');
      else if(!want && shown) p.style.setProperty('display','none','important');
      else                    p.style.removeProperty('display');
    });
  }catch(e){ console.warn('[SCM] visibility guard:', e); }
  document.querySelectorAll('.nav__group').forEach(g=>{
    const inside=!!g.querySelector(`.nav__item[data-page="${page}"]`);
    const par=g.querySelector('.nav__parent'), sub=g.querySelector('.nav__sub');
    if(!par||!sub) return;
    par.classList.toggle('has-active',inside);
    if(inside){ sub.classList.add('is-open'); par.setAttribute('aria-expanded','true'); }
  });
  const cr=document.getElementById('crumb'), pt=document.getElementById('ptitle');
  if(cr) cr.textContent=TITLES[page][0];
  if(pt) pt.textContent=TITLES[page][1];
  openSide(false);
  window.scrollTo({top:0});
  if(page==='lme' && !lmeBooted){ lmeBooted=true; if(window.LME_BOOT) window.LME_BOOT(); }
  if(page==='avl' && !avlBooted){ avlBooted=true; if(window.loadAVL) window.loadAVL(); }
  if(page==='monthly'){ try{ renderMonthly(); }catch(e){ console.warn('[SCM] monthly:',e); } }
}
/* =============================================================================
   NAVIGATION — bound by delegation on `document`, so it can never break:
   it works even if the script runs before the markup exists, if an element is
   replaced by the portal, or if any renderer throws.
   ============================================================================= */
function scmOpenSide(open){
  const side=document.getElementById('side'), scrim=document.getElementById('scrim');
  if(side)  side.classList.toggle('is-open', open);
  if(scrim) scrim.classList.toggle('is-open', open);
}
openSide = scmOpenSide;

document.addEventListener('click', function(e){
  try{
    if(e.target.closest('#burger')){
      const side=document.getElementById('side');
      scmOpenSide(!(side && side.classList.contains('is-open')));
      e.preventDefault(); return;
    }
    if(e.target.closest('#sideX') || e.target.closest('#scrim')){ scmOpenSide(false); return; }

    const par=e.target.closest('.nav__parent');
    if(par){
      const sub=document.querySelector('.nav__sub[data-sub="'+par.dataset.group+'"]');
      if(sub){ const open=sub.classList.toggle('is-open');
               par.setAttribute('aria-expanded', open?'true':'false'); }
      e.preventDefault(); return;
    }
    const item=e.target.closest('.nav__item');
    if(item && item.dataset.page){ go(item.dataset.page); e.preventDefault(); return; }

    /* drill-down cards — scoped to our own class so a host theme that happens
       to use [data-open] can never hijack the router */
    const opener=e.target.closest('.mi--open[data-open]');
    if(opener && opener.dataset.open){ go(opener.dataset.open); e.preventDefault(); return; }

    /* back links on sub-pages */
    const back=e.target.closest('.backlink');
    if(back && back.dataset.page){ go(back.dataset.page); e.preventDefault(); }
  }catch(err){ console.warn('[SCM nav]', err); }
}, true);

/* keyboard access for drill-down cards */
document.addEventListener('keydown', function(e){
  if(e.key!=='Enter' && e.key!==' ') return;
  const t=e.target.closest && e.target.closest('.mi--open[data-open]');
  if(t && t.dataset.open){ go(t.dataset.open); e.preventDefault(); }
});

document.addEventListener('keydown', function(e){ if(e.key==='Escape') scmOpenSide(false); });

/* boot — every step isolated so one failure cannot disable the rest */
function scmBoot(){
  try{ renderOverview(); }catch(e){ console.warn('[SCM] overview render:', e); }
  try{ renderMaster();   }catch(e){ console.warn('[SCM] master render:', e); }
  try{ renderMonthly();  }catch(e){ console.warn('[SCM] monthly render:', e); }
  try{ go(location.hash && TITLES[location.hash.slice(1)] ? location.hash.slice(1) : 'overview'); }
  catch(e){ console.warn('[SCM] initial page:', e);
    const p=document.querySelector('.page'); if(p) p.classList.add('is-active'); }
  try{ loadSection('overview',   'SCM_OVERVIEW',   renderOverview); }catch(e){}
  try{ loadSection('masterdata', 'SCM_MASTERDATA', renderMaster);   }catch(e){}
}
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', scmBoot);
else scmBoot();

/* safety net: if no page is ever shown, show the first one */
setTimeout(function(){
  if(!document.querySelector('.page.is-active')){
    const p=document.querySelector('.page'); if(p) p.classList.add('is-active');
    console.warn('[SCM] no active page — fell back to the first one');
  }
}, 1500);

/* manual recovery from the console: SCM.go('avl') · SCM.menu(true) */
window.SCM = { go:function(p){ try{ go(p); }catch(e){ console.warn(e); } },
               menu:scmOpenSide, boot:scmBoot };

/* ===== SEC AVL SOLE SOURCE — Strategic AVL Dashboard engine (v3) =====
   Methodology mirrors AGC_Strategic_AVL_Dashboard:
   - MATERIAL-level analysis uses rows where distinctMarker > 0 (canonical row per material)
   - RECORD-level analysis uses all rows
   Sections 1-5 = portfolio view (full dataset) · Section 6 = interactive explorer
==================================================================== */
(function(){
const CFG={webapi:{tableSet:'cra95_secavlsnapshots',payloadField:'cra95_payloadjson',dateField:'cra95_refreshedon'},url:'sec-sole-source.json',detailUrl:'sec-avl-details.json'};
const RED='#A20F1B',RED2='#982A33',ROSE='#C0656B',SAND='#D8B6B9',
      TAUPE='#6E5A5A',OK='#2E7D57',WARN='#B5852A';
const RISK_COL={'Sole Source':RED,'High Risk':RED2,'Medium Risk':WARN,'Low Risk':OK};
const RISK_ORDER=['Sole Source','High Risk','Medium Risk','Low Risk'];
const DOM='Saudi Arabia';
let CH={},SRC={txt:'Preview data',cls:'warn'};

const num=n=>(+n||0).toLocaleString('en-US');
const pc=(a,b)=>b?a/b*100:0;
const esc=s=>String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const el=id=>document.getElementById(id);
const rows=()=>(window.SEC_DATA&&window.SEC_DATA.rows)||[];
function tagIndex(){const R=rows();for(let i=0;i<R.length;i++)R[i].__i=i;}
const mats=V=>V.filter(r=>+r.distinctMarker>0);
const cnt=(A,k)=>{const m={};A.forEach(r=>{const v=r[k];if(v!=null&&v!=='')m[v]=(m[v]||0)+1;});return m;};
function mk(id,cfg){const c=el(id);if(!c)return;if(CH[id])CH[id].destroy();CH[id]=new Chart(c,cfg);}
const DL=()=>(typeof ChartDataLabels!=='undefined')?[ChartDataLabels]:[];

/* ================= header + KPI row ================= */
function renderHead(){
  const V=rows(),M=mats(V),meta=(window.SEC_DATA&&window.SEC_DATA.meta)||{};
  el('secBar').innerHTML=
    '<div class="dbar"><div class="dbar__l"><i class="livedot"></i>'+
    '<strong>SEC AVL Database</strong>'+
    '<span>'+num(V.length)+' Records · '+num(new Set(M.map(r=>r.material)).size)+' Materials · '+num(new Set(V.map(r=>r.category)).size)+' Categories</span>'+
    '<em>· Last Updated: '+esc(meta.exportedAt||'—')+'</em></div>'+
    '<div class="dbar__r"><span class="chip '+SRC.cls+'">'+esc(SRC.txt)+'</span></div></div>';
  const sole=M.filter(r=>r.risk==='Sole Source').length;
  el('secKpis').innerHTML=[
    ['Total Vendor Records',num(V.length),'Entries in SEC Cleansed AVL',0],
    ['Distinct Materials',num(new Set(M.map(r=>r.material)).size),'Unique material classifications',0],
    ['Categories',num(new Set(V.map(r=>r.category)).size),'Procurement categories',0],
    ['Sourcing Countries',num(new Set(V.map(r=>r.country)).size),'Vendor origin countries',0],
    ['Sole-Source Materials',num(sole),'Single-supplier · Critical risk',1],
    ['Local Representation',num(V.filter(r=>r.hasLocalRep==='Yes').length),
      pc(V.filter(r=>r.hasLocalRep==='Yes').length,V.length).toFixed(1)+'% have a local rep',0],
    ['Procurement Highlights',num(V.filter(r=>r.procurementHighlight==='Yes').length),
      'Flagged for action',0]
  ].map(function(a){
    return '<div class="kpc'+(a[3]?' kpc--crit':'')+'"><i class="kpc__ac"></i><div class="kpc__b">'+
      '<div class="kpc__e">'+a[0]+'</div><div class="kpc__v">'+a[1]+'</div><div class="kpc__s">'+a[2]+'</div></div></div>';
  }).join('');
}

/* ================= SECTION 1 — Sourcing Risk Profile ================= */
function riskTable(title,unit,counts,total){
  return '<table class="dtbl"><thead><tr><th>'+title+'</th><th class="n">'+unit+'</th><th class="n">Share</th><th class="n">Progress</th></tr></thead><tbody>'+
   RISK_ORDER.map(function(k){
     var v=counts[k]||0,p=pc(v,total);
     return '<tr><td><span class="rbadge" style="background:'+RISK_COL[k]+'">'+k+'</span></td>'+
       '<td class="n"><strong>'+num(v)+'</strong></td><td class="n">'+p.toFixed(1)+'%</td>'+
       '<td><div class="pbar"><i style="width:'+p.toFixed(1)+'%;background:'+RISK_COL[k]+'"></i></div></td></tr>';
   }).join('')+'</tbody></table>';
}
function sec1(){
  const V=rows(),M=mats(V);
  const rm=cnt(M,'risk'),rr=cnt(V,'risk');
  const nM=M.length,nR=V.length;
  function donut(id,counts,total,mid,unit){
    const labels=RISK_ORDER.filter(k=>counts[k]);
    mk(id,{type:'doughnut',
      data:{labels:labels,datasets:[{data:labels.map(k=>counts[k]),backgroundColor:labels.map(k=>RISK_COL[k]),borderColor:'#fff',borderWidth:2}]},
      options:{cutout:'62%',responsive:true,maintainAspectRatio:false,
        plugins:{legend:{position:'bottom',labels:{boxWidth:10,font:{size:10.5},padding:10}},
          tooltip:{callbacks:{label:c=>' '+c.label+': '+num(c.raw)+' ('+pc(c.raw,total).toFixed(1)+'%)'}},
          datalabels:{color:'#fff',font:{weight:'700',size:11},formatter:v=>pc(v,total)<5?'':Math.round(pc(v,total))+'%'}}},
      plugins:DL()});
    if(el(mid))el(mid).innerHTML='<b>'+num(total)+'</b><span>'+unit+'</span>';
  }
  donut('secRiskMat',rm,nM,'secMatMid','materials');
  donut('secRiskRec',rr,nR,'secRecMid','records');
  el('secMatNote').textContent=num(nM)+' distinct materials — risk assessed per material';
  el('secRecNote').textContent=num(nR)+' vendor records — Low Risk accounts for '+pc(rr['Low Risk']||0,nR).toFixed(1)+'%';
  el('secMatTbl').innerHTML=riskTable('Risk Level — by Material','Materials',rm,nM);
  el('secRecTbl').innerHTML=riskTable('Risk Level — by Records','Records',rr,nR);
}

/* ================= SECTION 2 — Sourcing Intelligence ================= */
function sec2(){
  const V=rows();
  const dom=V.filter(r=>r.country===DOM).length,frn=V.length-dom;
  mk('secLocal',{type:'doughnut',
    data:{labels:['Saudi Arabia','Foreign'],datasets:[{data:[dom,frn],backgroundColor:[RED,TAUPE],borderColor:'#fff',borderWidth:2}]},
    options:{cutout:'55%',responsive:true,maintainAspectRatio:false,
      plugins:{legend:{display:false},tooltip:{callbacks:{label:c=>' '+num(c.raw)+' ('+pc(c.raw,V.length).toFixed(1)+'%)'}},
        datalabels:{color:'#fff',font:{weight:'700',size:12},formatter:v=>pc(v,V.length).toFixed(1)+'%'}}},plugins:DL()});
  el('secLocalLeg').innerHTML=
    '<span><i style="background:'+RED+'"></i>Saudi Arabia: '+num(dom)+' ('+pc(dom,V.length).toFixed(1)+'%)</span>'+
    '<span><i style="background:'+TAUPE+'"></i>Foreign: '+num(frn)+' ('+pc(frn,V.length).toFixed(1)+'%)</span>';

  /* local representation (from Excel col 'Local Representee') */
  const lrY=V.filter(r=>r.hasLocalRep==='Yes').length;
  mk('secLocalRep',{type:'doughnut',
    data:{labels:['Has local representative','No local representative'],
      datasets:[{data:[lrY,V.length-lrY],backgroundColor:[OK,SAND],borderColor:'#fff',borderWidth:2}]},
    options:{cutout:'55%',responsive:true,maintainAspectRatio:false,
      plugins:{legend:{display:false},tooltip:{callbacks:{label:c=>' '+num(c.raw)+' ('+pc(c.raw,V.length).toFixed(1)+'%)'}},
        datalabels:{color:'#fff',font:{weight:'700',size:12},formatter:v=>pc(v,V.length)<6?'':pc(v,V.length).toFixed(1)+'%'}}},plugins:DL()});
  if(el('secLocalRepLeg'))el('secLocalRepLeg').innerHTML=
    '<span><i style="background:'+OK+'"></i>With local rep: '+num(lrY)+' ('+pc(lrY,V.length).toFixed(1)+'%)</span>'+
    '<span><i style="background:'+SAND+'"></i>Without: '+num(V.length-lrY)+'</span>';

  const C=Object.entries(cnt(V,'country')).sort((a,b)=>b[1]-a[1]).slice(0,10);
  mk('secCountry',{type:'bar',
    data:{labels:C.map(x=>x[0]),datasets:[{data:C.map(x=>x[1]),backgroundColor:C.map(x=>x[0]===DOM?RED:ROSE),borderWidth:0}]},
    options:{indexAxis:'y',responsive:true,maintainAspectRatio:false,
      plugins:{legend:{display:false},datalabels:{anchor:'end',align:'right',color:TAUPE,font:{size:10,weight:'700'},formatter:v=>num(v)}},
      layout:{padding:{right:40}},
      scales:{x:{beginAtZero:true,grid:{color:'#F2EAEA'}},y:{grid:{display:false},ticks:{font:{size:10.5}}}}},plugins:DL()});
  renderMap(V);
}
function renderMap(V){
  const box=el('secMap');if(!box)return;
  const W=window.WORLD_MAP,C=cnt(V,'country');
  el('secMapNote').textContent='Choropleth intensity reflects vendor records per country · '+Object.keys(C).length+' countries · hover for detail';
  if(!W){box.innerHTML='<div class="mapna">Map data unavailable</div>';return;}
  const max=Math.max(1,...Object.values(C));
  box.innerHTML='<svg viewBox="0 0 '+W.w+' '+W.h+'" class="wmap">'+
    Object.entries(W.countries).map(function(e){
      const n=e[0],d=e[1],c=C[n];
      const f=c?0.18+0.82*Math.sqrt(c/max):0;
      return '<path d="'+d+'" fill="'+(c?'rgba(162,15,27,'+f.toFixed(2)+')':'#F1E9E9')+'" stroke="#fff" stroke-width="0.5"><title>'+esc(n)+(c?': '+num(c)+' records':'')+'</title></path>';
    }).join('')+'</svg><div class="mapleg"><span>Fewer</span><i class="mapleg__g"></i><span>More records</span></div>';
}

/* ================= SECTION 3 — Category Analysis ================= */
function sec3(){
  const M=mats(rows()),by={};
  M.forEach(function(r){
    const c=r.category;
    if(!by[c])by[c]={materials:0,sole:0,high:0};
    by[c].materials++;
    if(r.risk==='Sole Source')by[c].sole++;else if(r.risk==='High Risk')by[c].high++;
  });
  const T=Object.keys(by).map(function(k){
    return {category:k,materials:by[k].materials,sole:by[k].sole,high:by[k].high,critical:by[k].sole+by[k].high};
  }).sort((a,b)=>b.materials-a.materials||b.critical-a.critical).slice(0,10);
  const short=s=>s.length>28?s.slice(0,26)+'…':s;
  mk('secCat',{type:'bar',
    data:{labels:T.map(x=>short(x.category)),
      datasets:[{label:'Materials',data:T.map(x=>x.materials),backgroundColor:SAND,borderWidth:0},
                {label:'Sole / High Risk',data:T.map(x=>x.critical),backgroundColor:RED,borderWidth:0}]},
    options:{indexAxis:'y',responsive:true,maintainAspectRatio:false,
      plugins:{legend:{position:'bottom',labels:{boxWidth:10,font:{size:10}}},datalabels:{display:false},
        tooltip:{callbacks:{title:c=>T[c[0].dataIndex].category}}},
      scales:{x:{beginAtZero:true,grid:{color:'#F2EAEA'}},y:{grid:{display:false},ticks:{font:{size:9.5}}}}},plugins:DL()});
  el('secCatTbl').innerHTML='<table class="dtbl"><thead><tr><th>Category</th><th class="n">Mats</th>'+
    '<th class="n">Sole</th><th class="n">High</th><th class="n">Other</th><th class="n">Crit%</th></tr></thead><tbody>'+
    T.map(function(x){
      const crit=pc(x.critical,x.materials);
      return '<tr><td class="cat">'+esc(x.category)+'</td><td class="n"><strong>'+x.materials+'</strong></td>'+
        '<td class="n">'+(x.sole||'—')+'</td><td class="n">'+(x.high||'—')+'</td>'+
        '<td class="n">'+(x.materials-x.critical)+'</td>'+
        '<td class="n"><span class="critpc'+(crit>=50?' hot':'')+'">'+crit.toFixed(1)+'%</span></td></tr>';
    }).join('')+'</tbody></table>';
}

/* ================= SECTION 4 — Strategic Insights (computed) ================= */
function sec4(){
  const V=rows(),M=mats(V),nM=M.length,nR=V.length;
  const rm=cnt(M,'risk'),sole=rm['Sole Source']||0,high=rm['High Risk']||0,crit=sole+high;
  const dom=V.filter(r=>r.country===DOM).length;
  const nCtry=new Set(V.map(r=>r.country)).size;
  const C=Object.entries(cnt(V,'country')).sort((a,b)=>b[1]-a[1]);
  const top3=C.filter(x=>x[0]!==DOM).slice(0,3);
  const top3sum=top3.reduce((a,b)=>a+b[1],0);
  const soleCat={};
  M.filter(r=>r.risk==='Sole Source').forEach(function(r){soleCat[r.category]=(soleCat[r.category]||0)+1;});
  const topSole=Object.entries(soleCat).sort((a,b)=>b[1]-a[1]).slice(0,3);
  const by={};
  M.forEach(function(r){
    const c=r.category;if(!by[c])by[c]={m:0,c:0};by[c].m++;
    if(r.risk==='Sole Source'||r.risk==='High Risk')by[c].c++;
  });
  const top10=Object.entries(by).sort((a,b)=>b[1].m-a[1].m).slice(0,10);
  const lead=top10[0];
  const worst=top10.slice().sort((a,b)=>pc(b[1].c,b[1].m)-pc(a[1].c,a[1].m))[0];
  const lowR=cnt(V,'risk')['Low Risk']||0;

  const I=[
    '<strong>Supply-risk concentration:</strong> '+pc(crit,nM).toFixed(1)+'% of the '+num(nM)+' classified materials are rated Sole-Source or High-Risk — roughly 1 in '+Math.max(1,Math.round(nM/Math.max(1,crit)))+' materials is exposed to supply disruption with limited or no competitive alternatives.',
    '<strong>'+num(sole)+' Sole-Source materials</strong> carry zero-competition risk. Critical categories include '+topSole.map(x=>esc(x[0])+' ('+x[1]+')').join(', ')+' — where any vendor failure creates an immediate procurement emergency.',
    '<strong>Localization gap:</strong> Only '+pc(dom,nR).toFixed(1)+'% of vendor records ('+num(dom)+' of '+num(nR)+') originate from '+DOM+'. The remaining '+pc(nR-dom,nR).toFixed(1)+'% come from '+(nCtry-1)+' foreign countries, creating geopolitical and logistics exposure.',
    '<strong>Top 3 import sources</strong> are '+top3.map(x=>esc(x[0])+' ('+num(x[1])+' records, '+pc(x[1],nR).toFixed(1)+'%)').join(', ')+' — together '+pc(top3sum,nR).toFixed(1)+'% of all vendor records, increasing exposure to trade-policy and currency risk.',
    lead?('<strong>'+esc(lead[0])+'</strong> leads all categories with '+lead[1].m+' materials, of which '+lead[1].c+' ('+pc(lead[1].c,lead[1].m).toFixed(1)+'%) are Sole or High Risk.'+((worst&&worst[0]!==lead[0])?' '+esc(worst[0])+' carries the highest critical ratio at '+pc(worst[1].c,worst[1].m).toFixed(1)+'%.':'')):'',
    '<strong>'+num(high)+' High-Risk materials</strong> (2–3 qualified suppliers) represent the most actionable pipeline: qualifying a single additional supplier per material converts each from High to Medium Risk.',
    '<strong>Low-risk dominance at record level:</strong> '+pc(lowR,nR).toFixed(1)+'% of vendor records ('+num(lowR)+' of '+num(nR)+') belong to Low-Risk materials — risk is concentrated in a specific subset of technically complex or niche materials.'
  ].filter(Boolean);

  el('secInsights').innerHTML=I.map(function(t,i){
    return '<div class="insl'+(i===I.length-1?' last':'')+'"><span class="insb">▸</span><span>'+t+'</span></div>';
  }).join('')+
    '<div class="insact"><span class="insact__l">ACTION</span><span>Initiate Priority Supplier Development for all '+num(sole)+' Sole-Source materials'+
    (topSole.length?' — prioritizing '+topSole.map(x=>esc(x[0])).join(', '):'')+
    '. Concurrently, target the '+num(high)+' High-Risk materials for single-vendor-addition qualification drives to achieve Medium-Risk status.</span></div>';
}

/* ================= SECTION 5 — Sole-Source Watchlist ================= */
function sec5(){
  const W=mats(rows()).filter(r=>r.risk==='Sole Source')
    .sort((a,b)=>a.category.localeCompare(b.category)||a.material.localeCompare(b.material));
  el('secWatchHd').textContent='Sole-Source Watchlist — '+W.length+' Materials';
  el('secWatch').innerHTML='<table class="dtbl wtbl"><thead><tr><th style="width:36px">#</th>'+
    '<th>Material Description</th><th>Vendor / Manufacturer</th><th>Category</th><th>Country of Origin</th><th class="n">Suppliers</th></tr></thead><tbody>'+
    (W.length?W.map(function(r,i){
      return '<tr class="rowlink" data-act="secDetail" data-a1="'+r.__i+'" title="Open full record"><td class="n">'+(i+1)+'</td><td class="mat">'+esc(r.material)+'</td>'+
        '<td>'+esc(r.vendor||'—')+'</td><td class="cat">'+esc(r.category)+'</td><td>'+esc(r.country)+'</td>'+
        '<td class="n"><strong>'+r.supplierCount+'</strong></td></tr>';
    }).join(''):'<tr><td colspan="6" class="empty">No sole-source materials in the current dataset.</td></tr>')+
    '</tbody></table>';
}

/* ================= SECTION 6 — Vendor Explorer ================= */
let F={risk:'',category:'',country:'',material:'',localrep:'',highlight:''},PAGE=1;
const PAGE_SIZE=25;
function fdata(){
  return rows().filter(function(r){
    return (!F.risk||r.risk===F.risk)&&
      (!F.category||r.category===F.category)&&
      (!F.country||r.country===F.country)&&
      (!F.material||String(r.material).toLowerCase().indexOf(F.material.toLowerCase())>=0)&&
      (!F.localrep||r.hasLocalRep===F.localrep)&&
      (!F.highlight||r.procurementHighlight===F.highlight);
  });
}
window.secPill=function(v){
  F.risk=v;PAGE=1;
  Array.prototype.forEach.call(document.querySelectorAll('#secPills .spill'),function(p){
    p.classList.toggle('on',p.getAttribute('data-value')===v);});
  updateExplorer();
};
window.secSel=function(k,v){F[k]=v;PAGE=1;updateExplorer();};
window.secSearch=function(v){F.material=v;PAGE=1;updateExplorer();};
window.secReset=function(){
  F={risk:'',category:'',country:'',material:'',localrep:'',highlight:''};PAGE=1;
  const lr=el('secLRSel'),hs=el('secHLSel'); if(lr)lr.value=''; if(hs)hs.value='';
  const c=el('secCatSel'),n=el('secCtrySel'),s=el('secSearch');
  if(c)c.value='';if(n)n.value='';if(s)s.value='';
  Array.prototype.forEach.call(document.querySelectorAll('#secPills .spill'),function(p){
    p.classList.toggle('on',p.getAttribute('data-value')==='');});
  updateExplorer();
};
window.secPage=function(p){PAGE=p;updateExplorer();};

function buildExplorerControls(){
  const V=rows();
  el('secPills').innerHTML=[['','All']].concat(RISK_ORDER.map(k=>[k,k]))
    .map(function(a){
      return '<button class="spill'+(a[0]===F.risk?' on':'')+'" data-value="'+esc(a[0])+'" data-act="secPill" data-a1="'+esc(a[0])+'"'+
        (a[0]?' style="--pc:'+RISK_COL[a[0]]+'"':'')+'>'+esc(a[1])+'</button>';
    }).join('');
  function opts(o,cur){
    return o.map(function(e){
      return '<option value="'+esc(e[0])+'"'+(cur===e[0]?' selected':'')+'>'+esc(e[0])+' ('+num(e[1])+')</option>';
    }).join('');
  }
  el('secCatSel').innerHTML='<option value="">All Categories</option>'+
    opts(Object.entries(cnt(V,'category')).sort((a,b)=>a[0].localeCompare(b[0])),F.category);
  el('secCtrySel').innerHTML='<option value="">All Countries</option>'+
    opts(Object.entries(cnt(V,'country')).sort((a,b)=>b[1]-a[1]),F.country);
  mk('secFRisk',{type:'bar',
    data:{labels:RISK_ORDER,datasets:[{data:[0,0,0,0],backgroundColor:RISK_ORDER.map(k=>RISK_COL[k]),borderWidth:0}]},
    options:{responsive:true,maintainAspectRatio:false,
      plugins:{legend:{display:false},datalabels:{anchor:'end',align:'top',color:TAUPE,font:{size:10,weight:'700'},formatter:v=>v||''}},
      layout:{padding:{top:14}},
      scales:{x:{grid:{display:false},ticks:{font:{size:9}}},y:{display:false,beginAtZero:true}}},plugins:DL()});
}
function updateExplorer(){
  const D=fdata(),M=mats(D);
  el('secFRec').textContent=num(D.length);
  el('secFMat').textContent=num(new Set(M.map(r=>r.material)).size);
  if(CH.secFRisk){
    const c=cnt(M,'risk');
    CH.secFRisk.data.datasets[0].data=RISK_ORDER.map(k=>c[k]||0);
    CH.secFRisk.update('none');
  }
  const pages=Math.max(1,Math.ceil(D.length/PAGE_SIZE));
  if(PAGE>pages)PAGE=pages;
  const start=(PAGE-1)*PAGE_SIZE,page=D.slice(start,start+PAGE_SIZE);
  el('secExpBody').innerHTML=page.length?page.map(function(r,i){
    return '<tr class="rowlink" data-act="secDetail" data-a1="'+r.__i+'" title="Open full record">'+
      '<td class="n">'+(start+i+1)+'</td><td class="cat">'+esc(r.category)+'</td>'+
      '<td class="mat">'+esc(r.material)+'</td><td>'+esc(r.vendor||'—')+'</td><td>'+esc(r.country)+'</td>'+
      '<td class="n">'+(r.hasLocalRep==='Yes'?'<span class="lrdot" title="'+esc(r.localRepName||'Local representative')+'">●</span>':'<span class="lrno">–</span>')+'</td>'+
      '<td><span class="rbadge" style="background:'+(RISK_COL[r.risk]||ROSE)+'">'+esc(r.risk)+'</span></td>'+
      '<td class="n">'+r.supplierCount+'</td></tr>';
  }).join(''):'<tr><td colspan="8" class="empty">No records match the current filters.</td></tr>';

  const P=[],win=2;
  function add(p,l,cls){P.push('<button class="pg'+(cls||'')+'" '+(p?'data-act="secPage" data-a1="'+p+'"':'disabled')+'>'+l+'</button>');}
  add(PAGE>1?PAGE-1:0,'‹');
  const from=Math.max(1,PAGE-win),to=Math.min(pages,PAGE+win);
  if(from>1){add(1,'1');if(from>2)P.push('<span class="pgdots">…</span>');}
  for(let p=from;p<=to;p++)add(p,String(p),p===PAGE?' on':'');
  if(to<pages){if(to<pages-1)P.push('<span class="pgdots">…</span>');add(pages,String(pages));}
  add(PAGE<pages?PAGE+1:0,'›');
  el('secPager').innerHTML='<div class="pgmeta">'+(D.length?num(start+1)+'–'+num(Math.min(start+PAGE_SIZE,D.length)):0)+' of '+num(D.length)+' records</div>'+
    '<div class="pgbtns">'+P.join('')+'</div>';
}

/* ================= orchestration ================= */
function render(){
  if(!window.SEC_DATA)return;
  tagIndex();
  /* a stale source that lacks newer columns would silently render 0s — say so */
  const gaps=schemaGaps(window.SEC_DATA.rows);
  const warn=el('secWarn');
  if(warn){
    warn.innerHTML = gaps.length
      ? '<div class="dwarn"><b>Outdated data source.</b> The loaded dataset is missing '+
        gaps.length+' field'+(gaps.length>1?'s':'')+' ('+gaps.join(', ')+'), so any metric built on '+
        'them will read 0. Upload the current <code>sec-sole-source.json</code> as a Web File, or refresh '+
        'the Dataverse snapshot.</div>'
      : '';
  }
  renderHead();sec1();sec2();sec3();sec4();sec5();
  buildExplorerControls();updateExplorer();
}
window.renderSEC=render;

/* ================= data loading ================= */
const REQUIRED=['hasLocalRep','procurementHighlight','ser','localRepName'];
function schemaGaps(rows){
  const r=(rows&&rows[0])||{};
  return REQUIRED.filter(k=>!(k in r));
}
function normalize(p){
  if(typeof p==='string')p=JSON.parse(p);
  if(p&&p.payload)p=p.payload;
  if(typeof p==='string')p=JSON.parse(p);
  /* columnar {cols:[...],data:[[...]]} -> objects */
  if(p&&Array.isArray(p.cols)&&Array.isArray(p.data)){
    const c=p.cols;
    return {meta:p.meta||{},rows:p.data.map(function(a){
      const o={};for(let i=0;i<c.length;i++)o[c[i]]=a[i];return o;})};
  }
  if(Array.isArray(p))p={rows:p.map(function(a){
    return {category:a[0],material:a[1],country:a[2],distinctMarker:a[3],risk:a[4],
            supplierCount:a[5],procurementHighlight:a[6],vendor:a[7]||''};})};
  if(p&&Array.isArray(p.records))p={meta:p.meta,rows:p.records};
  if(!p||!Array.isArray(p.rows))throw new Error('no rows[]');
  return p;
}
/* ---- lazy-loaded detail file (long free-text fields) ---- */
let DET=null,DETpending=null;
function loadDetails(){
  if(DET)return Promise.resolve(DET);
  if(DETpending)return DETpending;
  DETpending=fetch(CFG.detailUrl+'?v='+Date.now(),{credentials:'same-origin',cache:'no-store'})
    .then(r=>r.ok?r.json():Promise.reject(new Error('HTTP '+r.status)))
    .then(function(j){
      const c=j.cols;
      DET=j.data.map(function(a){const o={};for(let i=0;i<c.length;i++)o[c[i]]=a[i];return o;});
      return DET;
    }).catch(function(err){console.warn('[SEC] details unavailable:',err.message);DET=[];return DET;});
  return DETpending;
}
window.secDetail=function(i){
  const V=rows(); const r=V[i]; if(!r)return;
  const box=el('secDrawer'); if(!box)return;
  box.classList.add('on');
  box.innerHTML='<div class="drw__in"><button class="drw__x" data-act="secDetailClose">✕</button>'+
    '<div class="drw__k">'+esc(r.category)+'</div><h4>'+esc(r.material)+'</h4>'+
    '<div class="drw__load">Loading record details…</div></div>';
  loadDetails().then(function(D){
    const d=(D&&D[r.__i])||{};
    const F=[['Vendor / Manufacturer',r.vendor],['Country',r.country],
      ['Risk level',r.risk],['Qualified suppliers',r.supplierCount],
      ['SER.',r.ser],['Local representative?',r.hasLocalRep],
      ['Local representative name',r.localRepName],
      ['Procurement highlight',r.procurementHighlight],
      ['Procurement comments',r.procurementComments],
      ['AVL material / equipment description',d.avlDesc],
      ['Authorized local representative',d.localRep],
      ['Type / model and rating',d.typeModel],
      ['Type-test details',d.typeTests],['Remarks / observations',d.remarks]];
    box.innerHTML='<div class="drw__in"><button class="drw__x" data-act="secDetailClose">✕</button>'+
      '<div class="drw__k">'+esc(r.category)+'</div><h4>'+esc(r.material)+'</h4>'+
      '<span class="rbadge" style="background:'+(RISK_COL[r.risk]||ROSE)+'">'+esc(r.risk)+'</span>'+
      '<dl class="drw__dl">'+F.filter(x=>x[1]!==''&&x[1]!=null).map(function(x){
        return '<dt>'+x[0]+'</dt><dd>'+esc(x[1])+'</dd>';}).join('')+'</dl></div>';
  });
};
window.secDetailClose=function(){const b=el('secDrawer');if(b){b.classList.remove('on');b.innerHTML='';}};
async function fromDataverse(w){
  const url='/_api/'+w.tableSet+'?$select='+w.payloadField+(w.dateField?'&$orderby='+encodeURIComponent(w.dateField+' desc'):'')+'&$top=1';
  const r=await fetch(url,{credentials:'same-origin',headers:{'Accept':'application/json','OData-Version':'4.0','OData-MaxVersion':'4.0'}});
  if(!r.ok)throw new Error('Web API '+r.status);
  const j=await r.json(),rec=j.value&&j.value[0]?j.value[0][w.payloadField]:null;
  if(!rec)throw new Error('no row');
  return normalize(rec);
}
async function loadSEC(){
  const why=[];
  if(location.protocol==='file:')why.push('file:// blocks fetch');
  else{
    if(CFG.webapi&&CFG.webapi.tableSet){
      try{
        const dv=await fromDataverse(CFG.webapi);
        const gaps=schemaGaps(dv.rows);
        if(gaps.length){
          why.push('Dataverse payload is stale — missing: '+gaps.join(', ')+' (falling back to '+CFG.url+')');
        }else{
          window.SEC_DATA=dv;SRC={txt:'Live · Dataverse',cls:'live'};render();return;
        }
      }catch(e){why.push('Dataverse: '+e.message);}
    }
    if(CFG.url){
      const u=CFG.url+(CFG.url.indexOf('?')>=0?'&':'?')+'v='+Date.now();
      try{
        const r=await fetch(u,{credentials:'same-origin',cache:'no-store',headers:{'Accept':'application/json'}});
        if(r.ok){window.SEC_DATA=normalize(await r.text());SRC={txt:'Live · '+CFG.url,cls:'live'};render();return;}
        why.push(CFG.url+' -> HTTP '+r.status);
      }catch(e){why.push('fetch: '+e.message);}
    }
  }
  SRC={txt:'Preview data',cls:'warn'};render();
  console.warn('[SEC] embedded fallback:\n · '+why.join('\n · '));
}
window.loadSEC=loadSEC;
})();


/* ===== COST STRUCTURE DATA (embedded from Cost Structure.xlsx) ===== */
window.COST_STRUCTURE={"meta":{"source":"Cost Structure.xlsx","preparedBy":"Mohamed Radwan","department":"Procurement Strategy Department – Supply Chain","exportedAt":"2026-07-22","version":"1.0"},"commodities":[{"id":"transformers","name":"Transformers","classification":"Electrical","sub":"Oil-filled transformers manufactured to specification per application.","mainBreakdown":{"title":"Overall Cost Structure","items":[{"label":"Raw Materials","value":74.5},{"label":"Design & Labor","value":15.0},{"label":"Other Components","value":10.5}]},"subBreakdown":{"title":"Raw Materials Composition (74% of Total Cost)","items":[{"label":"Copper","value":30},{"label":"Electrical Steel (CRGO)","value":25},{"label":"Steel","value":7},{"label":"Oil","value":6},{"label":"Insulators","value":6}]},"notes":["Oil-filled transformers are manufactured to suit the requirements of each application, based on client specifications: load requirement, current density, flux density, impedance, etc.","<strong>Fixed components</strong> include oil temperature indicators, winding temperature indicator, control cubicles, radiators, oil level indicators, off-circuit tap changers, on-load tap changers, etc.","<strong>Copper:</strong> being a traded commodity, it is tracked on the LME, SHFE, COMEX, etc.","<strong>CRGO:</strong> Transformer core is made of CRGO (Cold Rolled Grain Oriented) steel.","<strong>Oil:</strong> Mineral oil is used as a coolant. CRGO and mineral oil are non-traded commodities. Suppliers purchase these in bulk, mainly through global sourcing channels for better prices.","<strong>Steel:</strong> The transformer structure and the oil tank are usually made up of steel.","<strong>Insulation:</strong> Paper insulations are used on copper conductors. Compressed pressboards are used within windings. Wood ring insulations limit transformer losses."]},{"id":"switchgears","name":"Switchgears","classification":"Electrical","sub":"Assembly of components made to client technical specifications. Cost of production ~88-92%; Margins ~8-12%.","mainBreakdown":{"title":"Cost Structure","items":[{"label":"Switchgear Components","value":33,"range":"30-40%"},{"label":"Metal Enclosures","value":12,"range":"15-20%"},{"label":"Material Consumables","value":30,"range":"~30%"},{"label":"Design & Labor","value":15,"range":"15-20%"},{"label":"Margins","value":10,"range":"8-12%"}]},"notes":["Switchgears are an assembly of components made based on the technical specifications given by the client.","<strong>Switchgear Components</strong> include Circuit Breakers, disconnect switches, Relays, Contactors, etc.","<strong>Metal Enclosures:</strong> Steel / 316-Stainless steel / Aluminum enclosures.","<strong>Material Consumables:</strong> Bus bars, Insulations, Buttons, Motor Starters, Meters, Current Transformers, etc.","Cost drivers: Size of the board · Form of segregation · Current rating · Circuit size · Number of circuit breakers · Feeders · Controls · Metering devices · Motor control units · VFDs · Current/Voltage transformers · Monitoring devices."]},{"id":"cables","name":"Cables","classification":"Electrical","sub":"Copper/aluminum, thermoplastics, rubber and non-metallic elements form raw materials. Raw materials constitute ~65% of overall cost structure.","mainBreakdown":{"title":"Overall Cost Structure","items":[{"label":"Raw Materials","value":60,"range":"50-70%"},{"label":"Labor","value":8,"range":"5-10%"},{"label":"Conversion Cost","value":10,"range":"8-12%"},{"label":"Selling, General & Admin","value":12,"range":"9-13%"},{"label":"Profit Margin","value":10,"range":"8-12%"}]},"cableBreakdowns":[{"title":"110 kV HV Power Cable (300 mm²)","items":[{"label":"Copper","value":55},{"label":"Polyethylene (XLPE)","value":4},{"label":"PVC","value":2},{"label":"Galvanised Steel Wires","value":10},{"label":"Labour","value":8},{"label":"Electricity","value":3},{"label":"Overhead","value":6},{"label":"Profit","value":12}]},{"title":"11 kV MV Power Cable (300 mm²)","items":[{"label":"Copper","value":55},{"label":"Polyethylene (Semi-con+XLPE)","value":5},{"label":"PVC","value":2},{"label":"Galvanised Steel Wires","value":8},{"label":"Labour","value":5},{"label":"Electricity","value":4},{"label":"Overhead","value":6},{"label":"Profit","value":15}]},{"title":"0.6 kV LV Power Cable (300 mm²)","items":[{"label":"Copper","value":55},{"label":"Polyethylene (XLPE)","value":4},{"label":"PVC","value":2},{"label":"Galvanised Steel Wires","value":9},{"label":"Labour","value":8},{"label":"Electricity","value":4},{"label":"Overhead","value":6},{"label":"Profit","value":12}]}],"notes":["<strong>Raw Materials:</strong> Copper/aluminum, thermoplastics, rubber and non-metallic paper insulation. Raw materials constitute ~65% of the overall cost structure.","<strong>Copper/aluminum</strong> is the principal raw material, representing ~50-70% of total raw material costs for wire and cable.","<strong>Thermoplastic</strong> is used in sheathing and enclosure of copper/aluminum rods as an outer cover.","<strong>Rubber and nonmetallic paper insulation</strong> elements are used inside the cables for strengthening and insulation.","<strong>Conversion cost</strong> includes machine rate, handling & finishing. Manufacturing overheads, utility cost, maintenance and operator cost are included in machine rate.","Labor, conversion cost, manufacturing, selling and administrative costs contribute ~20% of the cable cost structure."]},{"id":"ring-main-units","name":"Ring Main Units","classification":"Electrical","sub":"Medium-voltage distribution equipment · assembly-based cost structure similar to switchgear.","mainBreakdown":{"title":"Cost Structure","items":[{"label":"Switchgear Components","value":32},{"label":"Material Consumables","value":28},{"label":"Metal Enclosures","value":15},{"label":"Design & Labor","value":15},{"label":"Margins","value":10}]},"notes":["<strong>Components</strong> include Circuit Breakers, Relays, etc.","<strong>Metal Enclosures:</strong> Steel / Stainless Steel / Aluminum.","<strong>Material Consumables:</strong> Bus bars, Insulations, Buttons, Current Transformers, etc."]},{"id":"solar-pv","name":"Solar Photovoltaic Panels (PV)","classification":"Electrical","sub":"Raw material cost is the major driver (~61%). Crystalline silicon technology dominates the market (95%).","mainBreakdown":{"title":"Overall Cost Structure","items":[{"label":"Raw Material Cost","value":61.0},{"label":"Utility Cost","value":18.0},{"label":"Indirect Cost","value":10.9},{"label":"Labor and Overhead Cost","value":9.1},{"label":"Packaging Cost","value":1.0}]},"subBreakdown":{"title":"Raw Material Composition (of the 61% Raw Material Cost)","items":[{"label":"Crystalline silicon","value":40,"range":"35-45%"},{"label":"Silver","value":16,"range":"9-23%"},{"label":"Glass","value":13,"range":"11-15%"},{"label":"Aluminium","value":10.5,"range":"9-12%"},{"label":"Copper","value":8.5,"range":"5-12%"},{"label":"Polymers","value":8.5,"range":"7-10%"},{"label":"Others","value":0.5,"range":"<0.5%"}]},"notes":["Raw material cost is the major cost driver of the manufacturing cost of solar photovoltaic panels. As crystalline silicon technology dominates the market, the cost of <strong>polysilicon</strong> plays a key role in the production cost of PV panels.","Raw material accounts for 40–65% of the total cost, followed by utility costs with 16–20% contribution.","The increase in the raw material cost will have a significant impact on the total PV panel production cost.","Major components of a PV module: metals, non-metallic minerals, polymers, metalloids, glass for outer covering, aluminum for frames.","<strong>95% of the global PV market is of crystalline silicon technology.</strong>"]},{"id":"structural-steel","name":"Structural Steel","classification":"Civil","sub":"Raw material (Iron Ore, Coal, Lime) is the key cost driver at ~60% of production cost.","mainBreakdown":{"title":"Cost Structure","items":[{"label":"Raw Material (Iron Ore, Coal, Lime)","value":60},{"label":"Energy","value":23},{"label":"Labour","value":9},{"label":"Others","value":8}]},"notes":["<strong>Raw material</strong> is the key cost driver constituting ~60% of the production cost. Scrap costs are decreasing but Turkey's earthquake has impacted the market.","<strong>Primary & secondary energy products</strong> contribute ~23% of final cost. Since the Russia–Ukraine war, coal, oil & natural gas prices soared. Electricity prices also surged, especially in Europe.","<strong>High freight rates</strong> due to container shortages and high fuel costs also contribute to rising costs.","<strong>Iron Ore:</strong> Australia, Brazil, China and India combined account for 75% of global iron ore production (37%, 16%, 15%, 8% respectively). Top 5 suppliers = 44% of production; top 10 = 54%.","<strong>Coal:</strong> China accounts for ~47% of global coal production. Top coal exporters: China, India, Australia, Indonesia, US. China is also top coking coal producer/consumer, followed by Australia, US and Russia.","<strong>Lime:</strong> China is top producer with 72% share of total global production; US and India ~4% each. Top four suppliers (Imerys, Carmeuse, Graymont, Lhoist) account for 85% of global market share."]},{"id":"steel-rebar","name":"Steel Rebar","classification":"Civil","sub":"Reinforcement bar · shares cost structure with structural steel (iron ore, coal, lime base).","mainBreakdown":{"title":"Cost Structure","items":[{"label":"Raw Material (Iron Ore, Coal, Lime)","value":60},{"label":"Energy","value":23},{"label":"Labour","value":9},{"label":"Others","value":8}]},"notes":["Steel Rebar shares the same cost structure basis as Structural Steel (raw materials Iron Ore, Coal, Lime dominate).","Key drivers: iron ore prices, energy costs (especially in Europe post Russia–Ukraine war), freight and container shortages.","See Structural Steel notes for supplier concentration details."]},{"id":"pre-fab-buildings","name":"Pre-Fabricated Buildings & Structures","classification":"Civil","sub":"Modular construction · raw material dominates at 65%.","mainBreakdown":{"title":"Cost Structure","items":[{"label":"Raw Material","value":65.0},{"label":"Margins","value":12.0},{"label":"Overhead","value":10.0},{"label":"Fabrication Cost","value":7.5},{"label":"Installation","value":3.0},{"label":"Engineering and Design","value":2.5}]},"notes":["Raw material is the dominant cost driver at 65%.","Margins account for 12%, followed by overhead at 10%.","Fabrication cost, installation and engineering/design together contribute ~13%.","Applications include site offices, temporary structures, warehouses and modular substations."]},{"id":"precast-concrete","name":"Precast Concrete","classification":"Civil","sub":"Raw materials (cement, aggregates, sand) dominate at 74%. Highly sensitive to raw material price fluctuations.","mainBreakdown":{"title":"Cost Structure","items":[{"label":"Materials","value":74},{"label":"Fixed Overheads","value":12},{"label":"Production Cost","value":7},{"label":"Other Costs","value":5},{"label":"Labour","value":2}]},"notes":["The major cost contributor is raw materials, with <strong>cement</strong> being the highest cost-maker, seconded by aggregates and sand.","Raw materials constitute 55-75% of total cost of precast concrete. Any change in material prices directly impacts cost.","Cost of labor and production combines to nearly 25% in developed economies and fluctuates majorly on energy prices and labor availability.","Cost makeup is dominated by raw materials alone in countries like China and India where labor sourcing is relatively easy.","Suppliers make up a margin of 8-13%, climbing to 20% for specialized design mixes with enhanced properties (speed flow, extra strength, high workability)."]},{"id":"industrial-pumps","name":"Industrial Pumps (Centrifugal)","classification":"Mechanical","sub":"Vertical & Horizontal Centrifugal · raw materials (steel, copper, aluminum, nickel) dominate at 74%.","mainBreakdown":{"title":"Cost Structure","items":[{"label":"Raw Materials","value":74},{"label":"Labour","value":13},{"label":"Overheads","value":8},{"label":"Technology and R&D","value":5}]},"subBreakdown":{"title":"Raw Material Parameter Weightages","items":[{"label":"Steel","value":44.5,"range":"43-46%"},{"label":"Aluminum","value":16.5,"range":"15-18%"},{"label":"Copper","value":13,"range":"12-14%"},{"label":"Labor and Machining","value":13.5,"range":"13-14%"},{"label":"Electricity","value":12.5,"range":"11-14%"}]},"notes":["Raw materials (steel, copper, aluminum, nickel, stainless steel) account for ~80% of the major cost structure of pumps.","The pump industry is highly susceptible to raw material price hikes.","This also includes cost of assembly parts such as motors, seals and bearings.","<strong>Steel</strong> is the highly correlated material in the cost index of pumps, followed by aluminum and copper. Stainless steel is associated with manufacturing of industrial pumps. Steel captures the material movement trend."]},{"id":"pipes-fittings","name":"Pipes and Pipe Fittings","classification":"Mechanical","sub":"Pipes (seamless / welded) + Fittings (elbow, bend, tee, cross, cap, reducer, coupling, union). Raw materials 55%.","mainBreakdown":{"title":"Cost Structure","items":[{"label":"Raw Materials","value":55},{"label":"Labour","value":18},{"label":"Administrative & Overheads","value":18},{"label":"Energy and Other Expenses","value":9}]},"subBreakdown":{"title":"Direct Materials Breakdown (indicative ranges)","items":[{"label":"Iron foundries","value":10.5,"range":"9.5-11.5%"},{"label":"Fabricated metal products","value":7.9,"range":"6.9-8.9%"},{"label":"Copper/non-ferrous foundries","value":4.5,"range":"3.5-5.5%"},{"label":"Non-ferrous forgings","value":4.5,"range":"3.5-5.5%"},{"label":"Merchant bar (carbon steel)","value":4.2,"range":"3.2-5.2%"},{"label":"Structural shapes (carbon steel)","value":3.8,"range":"2.8-4.8%"},{"label":"Bolts, nuts, rivets, washers","value":3.4,"range":"2.4-4.4%"},{"label":"Rubber and plastics","value":3.3,"range":"2.3-4.3%"},{"label":"Industrial electric power","value":1.5,"range":"1-2%"},{"label":"Metal stampings","value":0.4,"range":"0.2-0.6%"}]},"notes":["Cost structure is indicative, subject to change depending on requirement and application.","<strong>Pipes</strong> include Seamless and Welded pipes. <strong>Valves</strong> include Globe, Gate, Butterfly, Ball, Check, and Other Special Valves. <strong>Fittings</strong> include Elbow, Bends, Tees, Cross, Caps, Reducers, Couplings and Unions.","Raw material prices are sensitive; any upward movement is transferred to buyers. Future trading or hedging is a rare practice among PVF manufacturers.","Material is the major cost driver of PVF, accounting for ~65-70% of the total cost.","Application-driven cost factors: material of body and trim, size of PVFs, pressure rating, temperature rating."]},{"id":"industrial-valves","name":"Industrial Valves","classification":"Mechanical","sub":"Gate, Globe, Check, Butterfly and Ball Valves · raw materials 55%; labour 21%.","mainBreakdown":{"title":"Cost Structure","items":[{"label":"Raw Materials","value":55},{"label":"Labour","value":21},{"label":"Technology and R&D","value":18},{"label":"Overheads","value":6}]},"subBreakdown":{"title":"Direct Materials Breakdown (indicative ranges)","items":[{"label":"Iron foundries","value":10.5,"range":"9.5-11.5%"},{"label":"Fabricated metal products","value":7.9,"range":"6.9-8.9%"},{"label":"Copper/non-ferrous foundries","value":4.5,"range":"3.5-5.5%"},{"label":"Non-ferrous forgings","value":4.5,"range":"3.5-5.5%"},{"label":"Merchant bar (carbon steel)","value":4.2,"range":"3.2-5.2%"},{"label":"Structural shapes (carbon steel)","value":3.8,"range":"2.8-4.8%"},{"label":"Bolts, nuts, rivets, washers","value":3.4,"range":"2.4-4.4%"},{"label":"Rubber and plastics","value":3.3,"range":"2.3-4.3%"},{"label":"Industrial electric power","value":1.5,"range":"1-2%"},{"label":"Metal stampings","value":0.4,"range":"0.2-0.6%"}]},"notes":["Raw material prices are sensitive; any upward movement is transferred to buyers. Future trading or hedging is a rare practice among valve manufacturers.","Material is the major cost driver of valves, accounting for ~50-53% of the total cost.","Application-driven cost factors (based on the fluid): material of body and trim, size of valve, pressure rating, temperature rating.","Valve types include: Gate Valve, Globe Valve, Check Valve, Butterfly Valve, Ball Valves."]}]};

/* ============ COST STRUCTURE FOR MAIN EQUIPMENT (native) ============
   Source: Cost Structure.xlsx · rebuilt on AGC brand DNA.
   All 12 commodities, breakdowns, sub-breakdowns, cable variants and
   notes preserved verbatim. Layout follows the source dashboard:
   segmented classification + commodity multi-select + 5 KPI cards.
==================================================================== */
(function(){
const RED='#A20F1B',DEEP='#8A0C17',RED2='#982A33',ROSE='#C0656B',SAND='#D8B6B9',
      TAUPE='#6E5A5A';
const SERIES=[RED,ROSE,SAND,TAUPE,'#7C3B41',DEEP,RED2,'#C9A0A3','#5A4F52','#EBE0E0'];
const NOANIM={duration:0};
let CH={},BUILT=false,F={cls:'All',ids:[]},OPEN={},MSOPEN=false;

const el=id=>document.getElementById(id);
const esc=s=>String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
/* notes carry intentional <strong>/<em> from source — keep those, escape the rest */
const noteHTML=s=>String(s==null?'':s)
  .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
  .replace(/&lt;strong&gt;/g,'<strong>').replace(/&lt;\/strong&gt;/g,'</strong>')
  .replace(/&lt;em&gt;/g,'<em>').replace(/&lt;\/em&gt;/g,'</em>');
const pc=v=>(Math.round(v*10)/10);
const DL=()=>(typeof ChartDataLabels!=='undefined')?[ChartDataLabels]:[];
const data=()=>window.COST_STRUCTURE||{commodities:[]};
const all=()=>data().commodities||[];
const inCls=c=>F.cls==='All'||c.classification===F.cls;
function shown(){return all().filter(c=>inCls(c)&&(!F.ids.length||F.ids.indexOf(c.id)>=0));}
/* short descriptor of the commodities inside a classification, for the KPI cards */
function clsNames(cls){
  const n=all().filter(c=>c.classification===cls).map(function(c){
    return ({'transformers':'Transformers','switchgears':'switchgear','cables':'cables',
      'ring-main-units':'RMU','solar-pv':'PV','structural-steel':'Steel','steel-rebar':'rebar',
      'precast-concrete':'precast','pre-fab-buildings':'pre-fab','industrial-pumps':'Pumps',
      'pipes-fittings':'pipes/fittings','industrial-valves':'valves'})[c.id]||c.name;});
  return n.join(', ');
}

/* ---------------- filters ---------------- */
window.csCls=function(v){F.cls=v;F.ids=[];render();};
window.csTogg=function(id){
  const i=F.ids.indexOf(id);
  if(i>=0)F.ids.splice(i,1);else F.ids.push(id);
  render();
};
window.csClear=function(){F={cls:'All',ids:[]};MSOPEN=false;render();};
window.csNotes=function(id){
  OPEN[id]=!OPEN[id];
  const n=el('nt-'+id),b=el('nb-'+id);
  if(n)n.classList.toggle('on',!!OPEN[id]);
  if(b)b.textContent=OPEN[id]?'Hide notes':'Show notes';
};
function renderFilters(){
  const A=all(),counts={All:A.length};
  A.forEach(c=>{counts[c.classification]=(counts[c.classification]||0)+1;});
  el('csSeg').innerHTML=['All','Electrical','Civil','Mechanical']
    .filter(k=>k==='All'||counts[k]).map(function(k){
      return '<button class="csseg__b'+(F.cls===k?' on':'')+'" data-act="csCls" data-a1="'+k+'">'+
        k+'<span class="csseg__n">'+(counts[k]||0)+'</span></button>';}).join('');
  const pool=A.filter(inCls);
  el('csMsPanel').innerHTML=pool.map(function(c){
    const on=F.ids.indexOf(c.id)>=0;
    return '<label class="msel__o'+(on?' on':'')+'"><input type="checkbox" '+(on?'checked':'')+
      ' data-chg="csTogg" data-a1="'+c.id+'"><span>'+esc(c.name)+'</span></label>';}).join('');
  const t=el('csMsTrig');
  if(t)t.textContent=F.ids.length
    ? (F.ids.length===1?(all().filter(c=>c.id===F.ids[0])[0]||{}).name:F.ids.length+' commodities selected')
    : '(All commodities)';
  el('csMsPanel').classList.toggle('on',MSOPEN);
}

/* ---------------- KPI cards (mirrors source dashboard) ---------------- */
function renderKpis(){
  const V=shown();
  const A=all();
  const counts={};A.forEach(c=>{counts[c.classification]=(counts[c.classification]||0)+1;});
  /* Average raw-material share, over commodities that actually carry a
     raw-material line. Switchgears and Ring Main Units are assembly-based
     and have none, so they are excluded rather than counted as zero. */
  const RX=/raw material|^materials$/i;
  const rawOf=function(c){
    const h=c.mainBreakdown.items.filter(i=>RX.test(i.label));
    return h.length?h[0].value:null;};
  const raws=V.map(rawOf).filter(v=>v!==null);
  const avg=raws.length?raws.reduce((a,b)=>a+b,0)/raws.length:0;
  let hi={v:0,n:''};
  V.forEach(function(c){const r=rawOf(c);if(r!==null&&r>hi.v)hi={v:r,n:c.name};});
  const card=(cap,val,sub,unit,crit)=>
    '<div class="kpc'+(crit?' kpc--crit':'')+'"><i class="kpc__ac"></i><div class="kpc__b">'+
    '<div class="kpc__e">'+cap+'</div><div class="kpc__v">'+val+
    (unit?'<span class="kpc__u">'+unit+'</span>':'')+'</div>'+
    '<div class="kpc__s">'+sub+'</div></div></div>';
  el('csKpis').innerHTML=
    card('Total Commodities',V.length,'Cost structures analyzed','',0)+
    card('Electrical',counts.Electrical||0,'<em>'+esc(clsNames('Electrical'))+'</em>','',0)+
    card('Civil',counts.Civil||0,'<em>'+esc(clsNames('Civil'))+'</em>','',0)+
    card('Mechanical',counts.Mechanical||0,'<em>'+esc(clsNames('Mechanical'))+'</em>','',0)+
    card('Avg Raw Material',avg.toFixed(1),
      '<em>Highest: '+esc(hi.n)+' ('+pc(hi.v)+'%)</em>','%',1);
}

/* ---------------- commodity cards ---------------- */
function legendHTML(items){
  return items.map(function(it,i){
    return '<div class="cslg"><i style="background:'+SERIES[i%SERIES.length]+'"></i>'+
      '<span class="cslg__k">'+esc(it.label)+'</span>'+
      '<span class="cslg__v">'+pc(it.value)+'%</span></div>';}).join('');
}
/* Bars are drawn on an absolute 0-100 scale, so a 60% component fills 60% of
   the track. (Scaling to the largest item would make the top contributor a
   full row in every card and overstate its share.) */
function barsHTML(items){
  return '<div class="csbars">'+items.map(function(it,i){
    return '<div class="csbar"><div class="csbar__t"><span>'+esc(it.label)+'</span><b>'+pc(it.value)+'%</b></div>'+
      '<div class="csbar__tr"><i style="width:'+Math.max(0,Math.min(100,it.value)).toFixed(1)+'%;background:'+SERIES[i%SERIES.length]+'"></i></div></div>';
  }).join('')+
  '<div class="csbars__ax"><span>0%</span><span>25%</span><span>50%</span><span>75%</span><span>100%</span></div></div>';
}
function cardHTML(c){
  let h='<article class="cscard"><div class="cscard__h">'+
    '<span class="cscard__cls">'+esc(c.classification)+'</span>'+
    '<h4 class="cscard__t">'+esc(c.name)+'</h4>'+
    '<p class="cscard__s">'+esc(c.sub||'')+'</p></div>'+
    '<div class="csblock"><div class="csblock__e">'+esc(c.mainBreakdown.title||'Cost Structure')+'</div>'+
      '<div class="csdon"><canvas id="csm-'+c.id+'"></canvas></div>'+
      '<div class="cslegs">'+legendHTML(c.mainBreakdown.items)+'</div></div>';
  if(c.subBreakdown){
    h+='<div class="csblock csblock--sub"><div class="csblock__e">'+esc(c.subBreakdown.title)+'</div>'+
      '<div class="csdon"><canvas id="css-'+c.id+'"></canvas></div>'+
      '<div class="cslegs">'+legendHTML(c.subBreakdown.items)+'</div></div>';
  }else if(c.cableBreakdowns&&c.cableBreakdowns.length){
    h+='<div class="csblock csblock--sub"><div class="csblock__e">Cable Variants — Cost Composition</div>'+
      '<div class="cstabs" id="ct-'+c.id+'">'+c.cableBreakdowns.map(function(cb,i){
        return '<button class="cstab'+(i===0?' on':'')+'" data-act="csCable" data-a1="'+c.id+'" data-a2="'+i+'">'+
          esc(cb.title)+'</button>';}).join('')+'</div>'+
      '<div class="csdon"><canvas id="csc-'+c.id+'"></canvas></div>'+
      '<div class="cslegs" id="ccl-'+c.id+'">'+legendHTML(c.cableBreakdowns[0].items)+'</div></div>';
  }else{
    h+='<div class="csblock csblock--sub"><div class="csblock__e">Component Weighting</div>'+
      barsHTML(c.mainBreakdown.items)+'</div>';
  }
  if(c.notes&&c.notes.length){
    h+='<button class="csnotes__b" id="nb-'+c.id+'" data-act="csNotes" data-a1="'+c.id+'">'+
      (OPEN[c.id]?'Hide notes':'Show notes')+'</button>'+
      '<div class="csnotes'+(OPEN[c.id]?' on':'')+'" id="nt-'+c.id+'"><ul>'+
      c.notes.map(n=>'<li>'+noteHTML(n)+'</li>').join('')+'</ul></div>';
  }
  return h+'</article>';
}
window.csCable=function(id,i){
  const c=all().filter(x=>x.id===id)[0];if(!c)return;
  const cb=c.cableBreakdowns[i];if(!cb)return;
  const box=el('ct-'+id);
  if(box)Array.prototype.forEach.call(box.children,function(b,j){b.classList.toggle('on',j===i);});
  const lg=el('ccl-'+id);if(lg)lg.innerHTML=legendHTML(cb.items);
  const ch=CH['csc-'+id];
  if(ch){ch.data.labels=cb.items.map(x=>x.label);
    ch.data.datasets[0].data=cb.items.map(x=>x.value);
    ch.data.datasets[0].backgroundColor=cb.items.map((x,k)=>SERIES[k%SERIES.length]);
    ch.update('none');}
};

/* ---------------- charts ---------------- */
function donut(id,items,cut){
  const c=el(id);if(!c)return;
  if(CH[id]){CH[id].destroy();delete CH[id];}
  const tot=items.reduce((a,b)=>a+b.value,0)||1;
  CH[id]=new Chart(c,{type:'doughnut',
    data:{labels:items.map(i=>i.label),
      datasets:[{data:items.map(i=>i.value),
        backgroundColor:items.map((x,k)=>SERIES[k%SERIES.length]),borderColor:'#fff',borderWidth:2}]},
    options:{cutout:cut||'58%',animation:NOANIM,responsive:true,maintainAspectRatio:false,
      plugins:{legend:{display:false},
        tooltip:{callbacks:{label:c2=>' '+c2.label+': '+pc(c2.raw)+'%'}},
        datalabels:{color:'#fff',font:{weight:'700',size:10},
          formatter:v=>(v/tot)<0.07?'':pc(v)+'%'}}},plugins:DL()});
}
function drawCharts(){
  shown().forEach(function(c){
    donut('csm-'+c.id,c.mainBreakdown.items);
    if(c.subBreakdown)donut('css-'+c.id,c.subBreakdown.items,'52%');
    else if(c.cableBreakdowns&&c.cableBreakdowns.length)donut('csc-'+c.id,c.cableBreakdowns[0].items,'52%');
  });
}
/* ---------------- orchestration ---------------- */
function render(){
  if(!all().length)return;
  if(!BUILT){
    const m=data().meta||{};
    const t=el('csMeta');
    if(t)t.textContent='Source: '+(m.source||'Cost Structure.xlsx')+' · '+(m.exportedAt||'');
    BUILT=true;
  }
  renderFilters();renderKpis();
  const V=shown();
  el('csCards').innerHTML=V.length?V.map(cardHTML).join('')
    :'<div class="csempty">No commodities match the current filter.</div>';
  drawCharts();
}
window.renderCostStructure=render;

/* multi-select open/close */
document.addEventListener('click',function(e){
  const trig=e.target.closest&&e.target.closest('#csMsTrig');
  if(trig){MSOPEN=!MSOPEN;const p=el('csMsPanel');if(p)p.classList.toggle('on',MSOPEN);return;}
  if(e.target.closest&&e.target.closest('#csMsPanel'))return;
  if(MSOPEN){MSOPEN=false;const p=el('csMsPanel');if(p)p.classList.remove('on');}
});
document.addEventListener('click',function(e){
  if(e.target&&e.target.id==='csClearBtn')csClear();
});
})();

/* ============ SHOULD-COST — DEMO SELECTOR ============
   Card picker for parametric models. Only ACSR CONDOR has a live model;
   the rest advertise as onboarding so the shelf reads as a roadmap
   rather than a dead end.
==================================================================== */
(function(){
const MODELS=[
  {id:'acsr-condor',name:'ACSR CONDOR Conductor',cat:'Conductors, Bare',
   sub:'Aluminium + steel core · LME-linked parametric build-up',ready:true,
   ctx:'Demo: Should-Cost Model for ACSR CONDOR · NEOM Grid'},
  {id:'power-transformer',name:'Power Transformer',cat:'Transformers',
   sub:'Copper, CRGO steel, oil and tank fabrication',ready:false},
  {id:'mv-switchgear',name:'MV Switchgear',cat:'Switchgears',
   sub:'Assembly-based build-up · components + enclosure',ready:false},
  {id:'xlpe-cable',name:'XLPE Power Cable',cat:'Cables',
   sub:'Conductor, insulation, armour and sheath',ready:false}
];
let SEL='acsr-condor';
const el=id=>document.getElementById(id);
const esc=s=>String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');

window.scPick=function(id){
  const m=MODELS.filter(x=>x.id===id)[0];
  if(!m||!m.ready)return;
  SEL=id;renderSelect();
};
function renderSelect(){
  const box=el('scSelect');if(!box)return;
  box.innerHTML=MODELS.map(function(m){
    const on=m.ready&&m.id===SEL;
    return '<button class="dcard'+(on?' on':'')+(m.ready?'':' dcard--soon')+'"'+
      (m.ready?' data-act="scPick" data-a1="'+m.id+'"':' disabled')+'>'+
      '<span class="dcard__cat">'+esc(m.cat)+'</span>'+
      '<span class="dcard__n">'+esc(m.name)+'</span>'+
      '<span class="dcard__s">'+esc(m.sub)+'</span>'+
      '<span class="dcard__f">'+(m.ready
        ? (on?'<em class="dcard__on">● Active model</em>':'<em class="dcard__go">Run model →</em>')
        : '<em class="dcard__soon">Data currently updating</em>')+'</span></button>';
  }).join('');
  const m=MODELS.filter(x=>x.id===SEL)[0]||{};
  const ctx=el('scCtx');if(ctx)ctx.textContent=m.ctx||'';
  const run=el('scRunner');
  if(run){
    run.style.display=m.ready?'':'none';
    if(m.ready&&!window._scBooted){
      window._scBooted=1;
      try{renderShouldCost();}catch(e){console.warn('[SCM] should-cost:',e);}
    }
  }
}
window.renderDemoSelect=renderSelect;
})();

/* ============ SHOULD-COST MODEL — ACSR CONDOR (native, v2) ============
   v2 changes:
   - Inputs are built ONCE. Slider drags no longer rebuild the DOM, so the
     control keeps focus and charts never replay their entry animation.
   - Charts are created once and updated in place with update('none').
   - Waterfall now reconciles: Base + ΔAlu + ΔSteel + ΔConv + Δ(freight/scrap/
     margin) = Simulated. Previously the cascade was omitted.
   - Conversion cost is quoted in SAR/tonne, so it no longer scales with FX.
   - Typed values are clamped to each field's min/max.
   - Added: driver sensitivity (tornado) + target-price solver.
======================================================================== */
(function(){
const RED='#A20F1B',RED2='#982A33',ROSE='#C0656B',TAUPE='#6E5A5A',SAND='#D8B6B9',
      OK='#2E7D57',WARN='#B5852A',INK='#3A2E2E';
const REDUCED = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let CH={}, BUILT=false;
const DL=()=>(typeof ChartDataLabels!=='undefined')?[ChartDataLabels]:[];

const DEFAULTS={
  quote:23500, alWt:1115.52, stWt:345.48, lmeBase:2582.24, steelBase:1200,
  convBase:1800, marginPct:8.0, fx:3.75, freightPct:2.5, scrapPct:1.5,
  lmeShock:0, steelShock:0, convShock:0
};
const D=Object.assign({project:"NEOM Grid",conductor:"ACSR CONDOR"},DEFAULTS);

/* field definitions drive both the markup and the clamping */
const FIELDS=[
  ['Commercial',[
    ['quote','Supplier quote','SAR/km',10000,40000,50,''],
    ['marginPct','Supplier margin','%',0,25,0.5,''],
    ['fx','FX rate (USD→SAR)','',3.5,4.0,0.01,'Official peg ≈ 3.75']]],
  ['Engineering weights',[
    ['alWt','Aluminium content','kg/km',800,1500,1,''],
    ['stWt','Steel content','kg/km',200,600,1,'']]],
  ['Cost drivers (base prices)',[
    ['lmeBase','LME aluminium','USD/t',1500,4000,1,''],
    ['steelBase','Steel billet','USD/t',600,2000,1,''],
    ['convBase','Conversion & drawing','SAR/t',800,3500,10,'Quoted in SAR — not FX-linked'],
    ['freightPct','Freight & logistics','%',0,10,0.1,''],
    ['scrapPct','Scrap / yield loss','%',0,8,0.1,'']]],
  ['Market shock simulator',[
    ['lmeShock','LME aluminium shock','%',-40,60,1,''],
    ['steelShock','Steel shock','%',-40,60,1,''],
    ['convShock','Conversion shock','%',-40,60,1,'']]]
];
const LIMITS={};
FIELDS.forEach(g=>g[1].forEach(f=>{LIMITS[f[0]]={min:f[3],max:f[4]};}));

const f0=n=>Math.round(+n||0).toLocaleString('en-US');
const clamp=(k,v)=>{const L=LIMITS[k];if(!L)return v;return Math.min(L.max,Math.max(L.min,v));};

/* ---------------- model ---------------- */
function model(s){
  const totalWt=s.alWt+s.stWt;
  const alBase=(s.lmeBase*s.fx)*(s.alWt/1000);
  const stBase=(s.steelBase*s.fx)*(s.stWt/1000);
  const convBase=s.convBase*(totalWt/1000);          // already SAR/t — no FX
  const matB=alBase+stBase+convBase;
  const freightB=matB*(s.freightPct/100), scrapB=matB*(s.scrapPct/100);
  const preB=matB+freightB+scrapB;
  const marginB=preB*(s.marginPct/100);
  const baseTotal=preB+marginB;

  const alS=alBase*(1+s.lmeShock/100);
  const stS=stBase*(1+s.steelShock/100);
  const convS=convBase*(1+s.convShock/100);
  const matS=alS+stS+convS;
  const freightS=matS*(s.freightPct/100), scrapS=matS*(s.scrapPct/100);
  const preS=matS+freightS+scrapS;
  const marginS=preS*(s.marginPct/100);
  const simTotal=preS+marginS;

  const dAl=alS-alBase, dSt=stS-stBase, dConv=convS-convBase;
  /* everything the shocks drag along with them (freight+scrap+margin) */
  const dCascade=(simTotal-baseTotal)-(dAl+dSt+dConv);
  return {
    base:{al:alBase,st:stBase,conv:convBase,freight:freightB,scrap:scrapB,margin:marginB,total:baseTotal},
    sim:{al:alS,st:stS,conv:convS,freight:freightS,scrap:scrapS,margin:marginS,total:simTotal},
    diff:{al:dAl,st:dSt,conv:dConv,cascade:dCascade},
    quote:s.quote, gap:s.quote-baseTotal, gapPct:baseTotal?(s.quote-baseTotal)/baseTotal*100:0,
    simGap:s.quote-simTotal, totalWt
  };
}
/* sensitivity: ±10% on each driver, effect on base total */
function sensitivity(s){
  const b=model(s).base.total;
  return [['LME aluminium','lmeBase'],['Steel billet','steelBase'],['Conversion','convBase'],
          ['Aluminium weight','alWt'],['Steel weight','stWt'],['Margin %','marginPct'],
          ['FX rate','fx'],['Freight %','freightPct']]
    .map(function(p){
      const up=Object.assign({},s); up[p[1]]=s[p[1]]*1.10;
      const dn=Object.assign({},s); dn[p[1]]=s[p[1]]*0.90;
      return {label:p[0], up:model(up).base.total-b, dn:model(dn).base.total-b};
    }).sort((a,b2)=>Math.abs(b2.up)-Math.abs(a.up));
}

/* ---------------- markup (built once) ---------------- */
function fieldHTML(k,label,unit,min,max,step,hint){
  return '<div class="scfield"><div class="scfield__top"><label for="in_'+k+'">'+label+'</label>'+
    '<div class="scfield__inp"><input type="number" id="in_'+k+'" data-k="'+k+'" value="'+D[k]+
    '" min="'+min+'" max="'+max+'" step="'+step+'"><span class="scfield__u">'+unit+'</span></div></div>'+
    '<input type="range" class="scfield__rng" data-k="'+k+'" min="'+min+'" max="'+max+'" step="'+step+'" value="'+D[k]+'">'+
    (hint?'<div class="scfield__hint">'+hint+'</div>':'')+'</div>';
}
function buildShell(){
  document.getElementById('scBody').innerHTML=
   '<div class="avlgrid g2b">'+
     '<div class="avlcard"><div class="avlcard__h">Price Validation — Quote vs Should-Cost</div>'+
       '<div class="avlchart" style="height:270px"><canvas id="scQuote"></canvas></div></div>'+
     '<div class="avlcard"><div class="avlcard__h">Cost Build-Up (SAR/km)</div>'+
       '<div class="avlchart" style="height:270px"><canvas id="scDonut"></canvas></div></div>'+
   '</div>'+
   '<div class="avlgrid g2">'+
     '<div class="avlcard"><div class="avlcard__h">Model Inputs — edit any value</div>'+
       '<div class="scgroups">'+
         FIELDS.map(function(g){
           return '<div class="scgroup"><div class="scgroup__h">'+g[0]+'</div>'+
             g[1].map(function(f){return fieldHTML.apply(null,f);}).join('')+'</div>';
         }).join('')+
       '</div>'+
       '<div class="scactions"><button class="scbtn" id="scReset">Reset to demo defaults</button></div></div>'+
     '<div class="avlcol">'+
       '<div class="avlcard"><div class="avlcard__h">Scenario Variance Waterfall</div>'+
         '<div class="avlchart" style="height:250px"><canvas id="scWater"></canvas></div></div>'+
       '<div class="avlcard"><div class="avlcard__h">Driver Sensitivity — ±10% impact on should-cost</div>'+
         '<div class="avlchart" style="height:250px"><canvas id="scTorn"></canvas></div></div>'+
       '<div class="avlcard"><div class="avlcard__h">Cost Breakdown</div><div id="scBreak"></div></div>'+
     '</div>'+
   '</div>';
  BUILT=true;
}

/* ---------------- charts: create once, then update in place ---------------- */
const NOANIM={duration:0};
function makeCharts(m){
  const el=id=>document.getElementById(id);
  if(el('scQuote')) CH.quote=new Chart(el('scQuote'),{type:'bar',
    data:{labels:['Should-Cost (Base)','Simulated','Supplier Quote'],
      datasets:[{data:[m.base.total,m.sim.total,m.quote],backgroundColor:[TAUPE,WARN,RED],borderWidth:0}]},
    options:{animation:NOANIM,responsive:true,maintainAspectRatio:false,
      plugins:{legend:{display:false},
        datalabels:{anchor:'end',align:'top',color:INK,font:{size:11,weight:'700'},formatter:v=>f0(v)},
        tooltip:{callbacks:{label:c=>' SAR '+f0(c.raw)+'/km'}}},
      scales:{x:{grid:{display:false}},y:{beginAtZero:true,grid:{color:'#F0E6E6'}}}},plugins:DL()});

  if(el('scDonut')) CH.donut=new Chart(el('scDonut'),{type:'doughnut',
    data:{labels:['Aluminium','Steel','Conversion','Freight','Scrap','Margin'],
      datasets:[{data:[m.sim.al,m.sim.st,m.sim.conv,m.sim.freight,m.sim.scrap,m.sim.margin],
        backgroundColor:[RED,RED2,ROSE,TAUPE,SAND,'#7C3B41'],borderColor:'#fff',borderWidth:2}]},
    options:{cutout:'56%',animation:NOANIM,responsive:true,maintainAspectRatio:false,
      plugins:{legend:{position:'right',labels:{boxWidth:11,font:{size:10.5}}},
        datalabels:{color:'#fff',font:{weight:'700',size:9},
          formatter:function(v,ctx){const t=ctx.dataset.data.reduce((a,b)=>a+b,0);return v/t<0.05?'':Math.round(v/t*100)+'%';}},
        tooltip:{callbacks:{label:c=>' '+c.label+': SAR '+f0(c.raw)}}}},plugins:DL()});

  if(el('scWater')) CH.water=new Chart(el('scWater'),{type:'bar',
    data:{labels:['Base','Δ Alu','Δ Steel','Δ Conv','Δ Freight/Scrap/Margin','Simulated'],
      datasets:[{data:[],backgroundColor:[],borderWidth:0}]},
    options:{animation:NOANIM,responsive:true,maintainAspectRatio:false,
      plugins:{legend:{display:false},datalabels:{display:false},
        tooltip:{callbacks:{label:function(c){const r=c.raw,v=Array.isArray(r)?r[1]-r[0]:r;
          return (c.dataIndex===0||c.dataIndex===5)?' SAR '+f0(v):((v>0?'+':'')+f0(v)+' SAR');}}}},
      scales:{x:{grid:{display:false},ticks:{font:{size:9.5},maxRotation:0,autoSkip:false}},
              y:{beginAtZero:true,grid:{color:'#F0E6E6'}}}},plugins:DL()});

  if(el('scTorn')) CH.torn=new Chart(el('scTorn'),{type:'bar',
    data:{labels:[],datasets:[
      {label:'-10%',data:[],backgroundColor:OK,borderWidth:0},
      {label:'+10%',data:[],backgroundColor:RED,borderWidth:0}]},
    options:{indexAxis:'y',animation:NOANIM,responsive:true,maintainAspectRatio:false,
      plugins:{legend:{position:'bottom',labels:{boxWidth:10,font:{size:10}}},datalabels:{display:false},
        tooltip:{callbacks:{label:c=>' '+c.dataset.label+': '+(c.raw>0?'+':'')+f0(c.raw)+' SAR/km'}}},
      scales:{x:{stacked:false,grid:{color:'#F0E6E6'},ticks:{font:{size:9.5}}},
              y:{stacked:true,grid:{display:false},ticks:{font:{size:10}}}}},plugins:DL()});
}
function updateCharts(m,s){
  if(CH.quote){
    CH.quote.data.datasets[0].data=[m.base.total,m.sim.total,m.quote];
    CH.quote.data.datasets[0].backgroundColor=[TAUPE,WARN,m.gap>0?RED:OK];
    CH.quote.update('none');
  }
  if(CH.donut){
    CH.donut.data.datasets[0].data=[m.sim.al,m.sim.st,m.sim.conv,m.sim.freight,m.sim.scrap,m.sim.margin];
    CH.donut.update('none');
  }
  if(CH.water){
    const b=m.base.total,d=m.diff;
    let c1=b+d.al, c2=c1+d.st, c3=c2+d.conv, c4=c3+d.cascade;
    const col=v=>v>0?RED:(v<0?OK:'#CBD5E1');
    CH.water.data.datasets[0].data=[[0,b],[b,c1],[c1,c2],[c2,c3],[c3,c4],[0,m.sim.total]];
    CH.water.data.datasets[0].backgroundColor=[TAUPE,col(d.al),col(d.st),col(d.conv),col(d.cascade),WARN];
    CH.water.update('none');
  }
  if(CH.torn){
    const S=sensitivity(s);
    CH.torn.data.labels=S.map(x=>x.label);
    CH.torn.data.datasets[0].data=S.map(x=>x.dn);
    CH.torn.data.datasets[1].data=S.map(x=>x.up);
    CH.torn.update('none');
  }
}

/* ---------------- text outputs ---------------- */
function renderOutputs(){
  const s=D,m=model(s);
  const over=m.gap>0;
  const verdict=over?{t:'Quote is ABOVE should-cost',c:RED}:{t:'Quote is at / below should-cost',c:OK};
  document.getElementById('scKpis').innerHTML=
   '<div class="gcard gcard--hero"><div class="hero4">'+
     '<div class="h4"><div class="gcard__cap">Supplier Quote</div><div class="gcard__val">SAR '+f0(m.quote)+'</div>'+
       '<div class="gcard__sub">per km · '+s.conductor+'</div></div><div class="h4sep"></div>'+
     '<div class="h4"><div class="gcard__cap">Should-Cost (Base)</div><div class="gcard__val big">SAR '+f0(m.base.total)+'</div>'+
       '<div class="gcard__sub">bottom-up build-up</div></div><div class="h4sep"></div>'+
     '<div class="h4 h4--stack">'+
       '<div class="stackrow"><div class="gcard__cap">Simulated</div><div class="gcard__val sm">SAR '+f0(m.sim.total)+'</div></div>'+
       '<div class="stackline"></div>'+
       '<div class="stackrow"><div class="gcard__cap">Neg. gap</div><div class="gcard__val sm" style="color:'+(over?RED:OK)+'">'+
         (over?'+':'')+f0(m.gap)+'</div></div></div></div></div>'+
   '<div class="gcard gcard--split" style="border-left:none">'+
     '<div class="gcard__cap">Negotiation Position</div>'+
     '<div class="split"><div><div class="split__n" style="color:'+verdict.c+'">'+(m.gapPct>0?'+':'')+m.gapPct.toFixed(1)+'%</div>'+
       '<div class="split__l">quote vs should-cost</div></div>'+
       '<div><div class="split__n">SAR '+f0(Math.max(0,m.quote-m.sim.total))+'</div>'+
       '<div class="split__l">headroom to target</div></div></div>'+
     '<div class="scverdict" style="color:'+verdict.c+'">● '+verdict.t+'</div></div>';

  const rows=[['Aluminium',m.base.al,m.sim.al],['Steel',m.base.st,m.sim.st],['Conversion',m.base.conv,m.sim.conv],
    ['Freight',m.base.freight,m.sim.freight],['Scrap/yield',m.base.scrap,m.sim.scrap],['Margin',m.base.margin,m.sim.margin]];
  document.getElementById('scBreak').innerHTML=
   '<table class="avltbl scbtbl"><thead><tr><th>Component</th><th>Base</th><th>Simulated</th><th>Δ</th></tr></thead><tbody>'+
   rows.map(function(r){const d=r[2]-r[1];
     return '<tr><td>'+r[0]+'</td><td class="n">'+f0(r[1])+'</td><td class="n">'+f0(r[2])+'</td>'+
       '<td class="n" style="color:'+(d>0?RED:d<0?OK:INK)+'">'+(d>0?'+':'')+f0(d)+'</td></tr>';}).join('')+
   '<tr class="scbtbl__tot"><td>Total SAR/km</td><td class="n">'+f0(m.base.total)+'</td><td class="n">'+f0(m.sim.total)+'</td>'+
     '<td class="n" style="color:'+(m.sim.total>m.base.total?RED:OK)+'">'+
     ((m.sim.total-m.base.total)>0?'+':'')+f0(m.sim.total-m.base.total)+'</td></tr></tbody></table>';
  updateCharts(m,s);
}

function render(){
  if(!document.getElementById('scBody'))return;
  if(!BUILT){ buildShell(); makeCharts(model(D)); }
  renderOutputs();
}
window.renderShouldCost=render;

/* ---------------- input handling (no DOM rebuild) ---------------- */
let raf=0;
function schedule(){ if(raf)return; raf=requestAnimationFrame(function(){raf=0;renderOutputs();}); }
function syncPair(k,v,from){
  document.querySelectorAll('#scBody [data-k="'+k+'"]').forEach(function(n){
    if(n!==from && n.value!==String(v)) n.value=v;
  });
}
document.addEventListener('input',function(e){
  const t=e.target; if(!t.dataset||!t.dataset.k) return;
  if(!t.closest('#scBody')) return;
  const k=t.dataset.k; let v=parseFloat(t.value);
  if(isNaN(v)) return;                       // let the user finish typing
  if(t.type==='range') v=clamp(k,v);
  D[k]=v; syncPair(k,v,t); schedule();
});
/* clamp typed numbers only when the field is committed, so typing isn't fought */
document.addEventListener('change',function(e){
  const t=e.target; if(!t.dataset||!t.dataset.k||t.type!=='number') return;
  if(!t.closest('#scBody')) return;
  let v=parseFloat(t.value);
  if(isNaN(v)) v=DEFAULTS[t.dataset.k];
  v=clamp(t.dataset.k,v);
  D[t.dataset.k]=v; t.value=v; syncPair(t.dataset.k,v,null); renderOutputs();
});
document.addEventListener('click',function(e){
  if(e.target && e.target.id==='scReset'){
    Object.assign(D,DEFAULTS);
    Object.keys(DEFAULTS).forEach(function(k){ syncPair(k,DEFAULTS[k],null); });
    renderOutputs();
  }
});
})();