import{J as y,K as f,L as w,j as e,$ as x,ao as F,b as i,ap as P,a6 as v,aq as A,ar as _,as as I,at as R,au as $,av as W,F as G,aj as V,ak as N,aw as J}from"./index-ada146de.js";const Y="/assets/colorwheel320-86946298.png",q=()=>{const{cssAuth:s}=y(a=>a),r=f(),t=w(),c=()=>{localStorage.clear(),r(F()),t("/dropofcss/"),window.location.reload()};return e.jsx(e.Fragment,{children:e.jsxs("nav",{children:[e.jsx("img",{src:Y}),e.jsxs("div",{id:"css-navSiteTitle",children:[e.jsx("h1",{children:e.jsx(x,{to:"/dropofcss/",style:{color:"white",textDecoration:"none"},className:"css-main-title",children:"Drop of CSS"})}),e.jsx("h5",{style:{padding:0,color:"white"},className:"css-main-subtitle",children:"JSX Color Palette and Component Builder"})]}),e.jsxs("div",{id:"css-navlinks",style:{justifyContent:"flex-end",marginRight:"2rem"},children:[e.jsx("div",{children:s.id&&e.jsxs("div",{children:[e.jsx(x,{to:"/dropofcss/",style:{fontSize:"calc(14px + 0.5vw)",color:"white",textDecoration:"none",margin:".5rem"},children:"Home"}),e.jsx(x,{to:"/dropofcss/profile",style:{color:"white",fontSize:"calc(14px + 0.5vw)",textDecoration:"none",margin:".5rem"},children:"Profile"}),e.jsx(x,{style:{color:"white",fontSize:"calc(14px + 0.5vw)",textDecoration:"none",margin:".5rem"},onClick:c,children:"Logout"})]})}),e.jsx("div",{children:!s.id&&e.jsxs("div",{children:[e.jsx(x,{to:"/dropofcss/",style:{fontSize:"calc(14px + 0.5vw)",color:"white",textDecoration:"none",margin:".5rem"},children:"Home"}),e.jsx(x,{style:{color:"white",fontSize:"calc(14px + 0.5vw)",textDecoration:"none",margin:".5rem 2rem"},to:"/dropofcss/login",children:"Login"})]})})]})]})})},K=()=>{y(o=>o);const s=f(),r=w(),[t,c]=i.useState({username:"",password:""}),[a,h]=i.useState(""),l=o=>{c({...t,[o.target.name]:o.target.value})},d=async o=>{o.preventDefault();try{await s(P(t)),console.log("successful"),r("/dropofcss/")}catch(j){h("username or password is incorrect"),console.log("login error",j)}};return e.jsxs("div",{className:"css-login",children:[e.jsx("h3",{className:"css-proheader",children:"Login"}),e.jsxs("form",{onSubmit:d,style:{display:"flex",flexDirection:"column",margin:"0",padding:"0"},children:[e.jsx("label",{style:{margin:2},children:"Username"}),e.jsx("input",{value:t.username,name:"username",onChange:l,autoComplete:"username"}),e.jsx("label",{style:{margin:2},children:"Password"}),e.jsx("input",{name:"password",value:t.password,onChange:l,autoComplete:"password",style:{marginBottom:"8px"}}),e.jsx("div",{style:{margin:"0 auto",color:"darkred",fontSize:"calc(4px + 0.5vw)",fontStyle:"italic",minHeight:"2vh"},children:a||e.jsx("div",{style:{minHeight:"(4px + 0.5vw)"}})}),e.jsx("button",{type:"submit",style:{display:"none"}}),e.jsx("div",{className:"css-rainbowBtn",type:"submit",onClick:d,style:{fontSize:"calc(10px + 1vw)"},children:"Login"}),e.jsx("div",{className:"css-rainbowBtn",children:e.jsx("a",{href:`https://github.com/login/oauth/authorize?client_id=${window.client_id}`,style:{fontSize:"calc(10px + 1vw)",fontFamily:"Arial, sans-serif",color:"white",textDecoration:"none"},children:"Login with Github"})})," ",e.jsx("div",{className:"css-rainbowBtn",children:e.jsx(x,{to:"/dropofcss/register",style:{fontSize:"calc(10px + 1vw)",fontFamily:"Arial, sans-serif",color:"white",textDecoration:"none"},children:"Create New User"})})]})]})};var L={color:void 0,size:void 0,className:void 0,style:void 0,attr:void 0},z=v.createContext&&v.createContext(L),g=globalThis&&globalThis.__assign||function(){return g=Object.assign||function(s){for(var r,t=1,c=arguments.length;t<c;t++){r=arguments[t];for(var a in r)Object.prototype.hasOwnProperty.call(r,a)&&(s[a]=r[a])}return s},g.apply(this,arguments)},X=globalThis&&globalThis.__rest||function(s,r){var t={};for(var c in s)Object.prototype.hasOwnProperty.call(s,c)&&r.indexOf(c)<0&&(t[c]=s[c]);if(s!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,c=Object.getOwnPropertySymbols(s);a<c.length;a++)r.indexOf(c[a])<0&&Object.prototype.propertyIsEnumerable.call(s,c[a])&&(t[c[a]]=s[c[a]]);return t};function U(s){return s&&s.map(function(r,t){return v.createElement(r.tag,g({key:t},r.attr),U(r.child))})}function k(s){return function(r){return v.createElement(Z,g({attr:g({},s.attr)},r),U(s.child))}}function Z(s){var r=function(t){var c=s.attr,a=s.size,h=s.title,l=X(s,["attr","size","title"]),d=a||t.size||"1em",o;return t.className&&(o=t.className),s.className&&(o=(o?o+" ":"")+s.className),v.createElement("svg",g({stroke:"currentColor",fill:"currentColor",strokeWidth:"0"},t.attr,c,l,{className:o,style:g(g({color:s.color||t.color},t.style),s.style),height:d,width:d,xmlns:"http://www.w3.org/2000/svg"}),h&&v.createElement("title",null,h),s.children)};return z!==void 0?v.createElement(z.Consumer,null,function(t){return r(t)}):r(L)}function Q(s){return k({tag:"svg",attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z"}}]})(s)}function ee(s){return k({tag:"svg",attr:{viewBox:"0 0 448 512"},child:[{tag:"path",attr:{d:"M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"}}]})(s)}const se=()=>{const s=f(),r=w(),{cssAuth:t,cssTemplates:c}=y(n=>n),[a,h]=i.useState(null),[l,d]=i.useState("");i.useEffect(()=>{t&&s(A(t.id))},[t]);const o=n=>{const u=document.createElement("template");return u.innerHTML=n,u.innerHTML},j=n=>{h(n)},m=n=>{d(n.target.value)},p=n=>(s(_(n)),r("/profile")),C=()=>{a&&(s(I(a.id,l)),h(n=>({...n,name:l})),d(""))},b=()=>{const n=document.createElement("textarea");n.value=a.htmlText,document.body.appendChild(n),n.select(),document.execCommand("copy"),document.body.removeChild(n);const u=document.getElementById("css-clipboard-message");u.innerText="Copied to clipboard!",setTimeout(()=>{u.innerText=""},2e3)},E=n=>{let u=(n[0].toUpperCase()+n.slice(1)).split(""),S=[u[0]];for(let T=1;T<u.length;T++){const D=u[T];/[A-Z]/.test(D)&&S.push(" "),S.push(D)}return S.join("")},H=n=>{if(n.name)return n.name;{const u=new Date(n.createdAt).toLocaleDateString();return E(n.type),`Untitled ${E(n.type)}(${u})`}},M=()=>{a&&d(a.name||"")},O=()=>{C()},B=()=>e.jsxs("div",{className:"css-no-components-message",children:[e.jsx("p",{children:"You have no components!"}),e.jsx(x,{to:"/",className:"css-stylelink",children:"Style a Component"})]});return e.jsxs("div",{className:"css-template-list-container",children:[e.jsxs("div",{className:"css-templatesidebar",children:[e.jsx("h4",{className:"css-proheader",children:"My Components"}),e.jsx("table",{className:"css-profile-comp-table",children:e.jsx("tbody",{children:c.filter(n=>n.userId===t.id).map(n=>e.jsx("tr",{onClick:()=>j(n),className:a===n?"selected":"",children:a===n?e.jsxs(e.Fragment,{children:[e.jsx("td",{children:e.jsx("input",{type:"text",placeholder:n.name,value:l,onChange:m,className:"css-comp-name-input"})}),e.jsx("td",{children:e.jsx("button",{onClick:O,className:"css-edit-icon",title:"Save",children:"Save"})})]}):e.jsxs(e.Fragment,{children:[e.jsx("td",{className:"css-template-name",children:H(n)}),e.jsx("td",{children:e.jsx("button",{onClick:M,className:"css-edit-icon",title:"Edit",children:"✏️"})}),e.jsx("td",{children:e.jsx("button",{onClick:()=>p(n.id),className:"css-delete-icon",title:"Delete",children:"Delete"})})]})},n.id))})}),c.filter(n=>n.userId===t.id).length===0&&B()]}),e.jsx("div",{className:"css-template-componentandcode-div",children:a&&c.map(n=>n.id===a.id?e.jsxs("div",{children:[e.jsxs("h4",{className:"css-proheader",children:[" ",n.name," "]}),e.jsxs("div",{className:"css-boxesflex",children:[e.jsxs("div",{children:[e.jsx("h5",{children:"Component:"}),e.jsx("div",{className:"css-profilecomppreview",dangerouslySetInnerHTML:{__html:o(a.htmlText)}})]}),e.jsxs("div",{children:[e.jsx("h5",{children:"HTML and CSS:"}),e.jsx("div",{className:"css-profilehtmlpreview",children:e.jsx("pre",{children:a.htmlText})}),e.jsx("button",{onClick:b,className:"css-rainbowBtn",children:"Copy HTML"}),e.jsx("div",{id:"css-clipboard-message",className:"css-copytoclip"})]})]})]},n.id):"")})]})},te=()=>{const s=w(),r=f(),[t,c]=i.useState(""),[a,h]=i.useState(""),[l,d]=i.useState(""),o=y(m=>m.cssAuth.isOAuthUser),j=async m=>{m.preventDefault(),await r(R({username:t,password:a,email:l})),c(""),h(""),d(""),s("/profile")};return o?e.jsx("div",{children:"You are logged in via Github. Email and password updates are not allowed."}):e.jsx("div",{children:e.jsxs("form",{onSubmit:j,children:[e.jsx("input",{value:t,onChange:m=>c(m.target.value),placeholder:"username",name:"username"}),e.jsx("input",{value:a,onChange:m=>h(m.target.value),type:"password",placeholder:"password",name:"password"}),e.jsx("input",{value:l,onChange:m=>d(m.target.value),placeholder:"email",name:"email"}),e.jsx("button",{className:"css-rainbowBtn",children:"Update Account"})]})})},ne=()=>{const{cssAuth:s}=y(t=>t),r=f();return i.useEffect(()=>{r(A(s.id))},[]),s.id?e.jsxs("div",{children:[e.jsxs("div",{className:"css-profile-main",children:[e.jsx("h3",{className:"css-proheader",children:"My Components"}),e.jsx(se,{})]}),e.jsxs("div",{className:"css-profile",children:[e.jsxs("div",{children:[e.jsxs("h4",{className:"css-proheader",children:["Welcome ",s.username.charAt(0).toUpperCase()+s.username.slice(1),"!"]}),e.jsxs("p",{children:[e.jsx(ee,{className:"custom-icon"})," ",s.username]}),s.email&&e.jsxs("p",{children:[e.jsx(Q,{className:"custom-icon"})," ",s.email]})]}),e.jsxs("div",{children:[e.jsx("h4",{className:"proheader",children:"Update Info"}),e.jsx(te,{})]})]})]}):e.jsx("p",{children:"Please log in to view your profile."})},ae=()=>{const s=w(),r=f(),[t,c]=i.useState(""),[a,h]=i.useState(""),[l,d]=i.useState(""),[o,j]=i.useState(""),m=async p=>{p.preventDefault();const C={username:t,password:a,email:l};try{await r(cssRegister(C)),r(cssAttemptLogin(C)),s("/dropofcss/")}catch(b){j("username or email already exists"),console.log(b)}};return e.jsxs("div",{className:"css-login",children:[e.jsx("h3",{className:"css-proheader",children:"Create Account"}),e.jsxs("form",{onSubmit:m,children:[e.jsx("label",{children:"Username"}),e.jsx("input",{value:t,onChange:p=>c(p.target.value),name:"username"}),e.jsx("label",{children:"Password"}),e.jsx("input",{value:a,onChange:p=>h(p.target.value),type:"password",name:"password"}),e.jsx("label",{children:"Email"}),e.jsx("input",{value:l,onChange:p=>d(p.target.value),name:"email"}),e.jsx("div",{style:{margin:"0 auto",color:"darkred",fontSize:"calc(4px + 0.5vw)",fontStyle:"italic",minHeight:"2vh"},children:o||e.jsx("div",{style:{minHeight:"(4px + 0.5vw)"}})}),e.jsx("button",{className:"css-rainbowBtn",children:"Create Account"})]}),e.jsx("button",{className:"css-rainbowBtn",children:e.jsx(x,{to:"/dropofcss/login",style:{maxWidth:"10px",fontSize:"13.33333px",fontFamily:"Arial, sans-serif",color:"white",textDecoration:"none"},children:"Back"})})]})},ce=()=>{const{cssAuth:s}=y(c=>c),r=f();w();const t=i.useRef(s);return i.useEffect(()=>{r($())},[]),i.useEffect(()=>{!t.current.id&&s.id&&(console.log(`${s.username} is logged in`),r(W())),t.current.id&&!s.id&&console.log("logged out")},[s]),i.useEffect(()=>{t.current=s}),e.jsx(G,{children:e.jsxs("div",{className:"DropOfCss",children:[e.jsx(q,{}),e.jsx("div",{children:e.jsxs(V,{children:[e.jsx(N,{path:"/",element:e.jsx(J,{})}),!s.id&&e.jsxs(e.Fragment,{children:[e.jsx(N,{path:"/login",element:e.jsx(K,{})}),e.jsx(N,{path:"/register",element:e.jsx(ae,{})})]}),s.id&&e.jsx(e.Fragment,{children:e.jsx(N,{path:"/profile",element:e.jsx(ne,{})})})]})})]})})};export{ce as default};
