/* 史塔克 CRM｜線上試算引擎
   把保險公司 Excel 試算表（公式原封不動）轉成網頁試算：
   - 公式引擎：HyperFormula（GPLv3，非商用）
   - 模型：proposals/models/*.json（離線把 xls 公式萃取、只保留算得到結果的儲存格）
   - 介面規格：proposals.json 每份建議書的 calc 欄位 */
(function(){
"use strict";
const BASE=(window.STARK_PROP_BASE||"https://sunghan69-sudo.github.io/stark-crm/proposals/");
const HF_URL=(location.protocol.startsWith("http")&&location.hostname.endsWith("github.io")?"":"https://sunghan69-sudo.github.io/stark-crm/")+"calc/hyperformula.full.min.js";
let hfReady=null;
function loadHF(){if(hfReady)return hfReady;hfReady=new Promise((res,rej)=>{if(window.HyperFormula)return res(window.HyperFormula);const s=document.createElement("script");s.src=HF_URL;s.onload=()=>{try{regText();res(window.HyperFormula)}catch(e){rej(e)}};s.onerror=()=>{hfReady=null;rej(new Error("試算引擎載入失敗，請確認網路"))};document.head.appendChild(s)});return hfReady}
/* Excel TEXT() 數字格式（HyperFormula 內建版不支援 #,### 這類格式） */
function fmtNum(v,f){if(typeof v!=="number"){const n=Number(v);if(v===""||v==null||isNaN(n))return String(v==null?"":v);v=n}f=String(f);
  const sec=f.split(";");if(sec.length>1){if(v<0&&sec[1]!==undefined){f=sec[1];v=-v}else if(v===0&&sec[2]!==undefined)f=sec[2];else f=sec[0]}
  const m=f.match(/^([^#0?.,]*)([#0?,]*\.?[#0?]*)(%?)(.*)$/);if(!m||!m[2])return f.replace(/"/g,"");
  let pre=m[1],num=m[2],pct=m[3],post=m[4];if(pct)v*=100;
  const dot=num.indexOf("."),ip=dot<0?num:num.slice(0,dot),dp=dot<0?"":num.slice(dot+1);const dec=dp.length,minDec=(dp.match(/0/g)||[]).length;
  let s=Math.abs(v).toFixed(dec);let parts=s.split(".");let i=parts[0],d=parts[1]||"";d=d.replace(/0+$/,"");while(d.length<minDec)d+="0";
  const minInt=(ip.replace(/,/g,"").match(/0/g)||[]).length;if(i==="0"&&minInt===0)i="";while(i.length<minInt)i="0"+i;
  if(ip.includes(","))i=i.replace(/\B(?=(\d{3})+(?!\d))/g,",");
  return (v<0?"-":"")+pre.replace(/"/g,"")+i+(d?"."+d:"")+(pct?"%":"")+post.replace(/"/g,"")}
function regText(){const H=window.HyperFormula;
  class TextPlugin extends H.FunctionPlugin{text(ast,state){return this.runFunction(ast.args,state,this.metadata("TEXT"),(v,f)=>fmtNum(v,f))}}
  TextPlugin.implementedFunctions={TEXT:{method:"text",parameters:[{argumentType:H.FunctionArgumentType.SCALAR},{argumentType:H.FunctionArgumentType.STRING}]}};
  H.registerFunctionPlugin(TextPlugin,{enGB:{TEXT:"TEXT"}})}
function dec(a){const m=a.match(/^([A-Z]+)(\d+)$/);let c=0;for(const ch of m[1])c=c*26+ch.charCodeAt(0)-64;return {col:c-1,row:+m[2]-1}}
function buildModel(H,model){const sheets={};
  for(const n in model.sheets){const cs=model.sheets[n].cells;let mr=0;const ent=[];for(const a in cs){const p=dec(a);ent.push([p,cs[a]]);if(p.row>mr)mr=p.row}
    const arr=Array.from({length:ent.length?mr+1:1},()=>[]);ent.forEach(([p,v])=>{arr[p.row][p.col]=v});for(const row of arr)for(let i=0;i<row.length;i++)if(row[i]===undefined)row[i]=null;sheets[n]=arr}
  const hf=H.buildFromSheets(sheets,{licenseKey:"gpl-v3",smartRounding:false,dateFormats:["YYYY-MM-DD","YYYY/MM/DD","MM/DD/YYYY"],timeFormats:["hh:mm","hh:mm:ss.sss"]});
  hf.suspendEvaluation();for(const nm of model.names){try{hf.addNamedExpression(nm.n,nm.ref,nm.scope!=null?hf.getSheetId(nm.scope):undefined)}catch(e){}}hf.resumeEvaluation();return hf}
const models={};
async function getModel(file){if(models[file])return models[file];const r=await fetch(BASE+file,{cache:"force-cache"});if(!r.ok)throw new Error("試算模型下載失敗");const j=await r.json();models[file]=j;return j}
const esc=s=>String(s==null?"":s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));

/* ---------- 試算工作階段 ---------- */
function Session(item,model,H){const spec=item.calc;const hf=buildModel(H,model);const defSheet=spec.sheet||"基本資料輸入";
  const nameMap={};model.names.forEach(n=>{nameMap[n.orig]=n.n});
  const A=a=>{let s=defSheet,c=a;const k=a.lastIndexOf("!");if(k>0){s=a.slice(0,k).replace(/^'|'$/g,"");c=a.slice(k+1)}const p=dec(c.replace(/\$/g,""));return {sheet:hf.getSheetId(s),col:p.col,row:p.row}};
  const get=a=>{const v=hf.getCellValue(A(a));return v&&typeof v==="object"&&v.type?"":v};
  const set=(a,v)=>hf.setCellContents(A(a),[[v]]);
  const evalF=f=>{const ff=f.replace(/\{([^}]+)\}/g,(m,n)=>nameMap[n]||"NA()");try{return hf.calculateFormula(ff,hf.getSheetId(defSheet))}catch(e){return null}};
  const opts=function(o){if(!o)return null;if(o.list)return o.list;let v=null;
    if(o.cond){const c=evalF(o.cond);return opts(c===true||c===1?o.then:o.else)}
    if(o.name)v=evalF("={"+o.name+"}");else if(o.indirect){const nm=evalF("={"+o.indirect+"}");v=nm&&nameMap[nm]?evalF("={"+nm+"}"):null}else if(o.expr)v=evalF(o.expr);
    if(Array.isArray(v))return v.flat().filter(x=>x!==null&&x!==""&&!(x&&x.type));return v==null||(v&&typeof v==="object")?[]:[v]};
  return {hf,get,set,opts,spec,evalF}}

/* ---------- 介面 ---------- */
const CSS=`.sc-ov{position:fixed;inset:0;background:rgba(15,23,42,.55);z-index:9999;display:flex;align-items:stretch;justify-content:center}
.sc-box{background:#f5f7fa;width:min(1400px,100%);display:flex;flex-direction:column;box-shadow:0 10px 40px rgba(0,0,0,.3)}
.sc-hd{background:#16324f;color:#fff;padding:12px 18px;display:flex;align-items:center;gap:12px}.sc-hd h2{margin:0;font-size:17px;flex:1}
.sc-hd button{background:rgba(255,255,255,.15);color:#fff;border:0;border-radius:8px;padding:7px 12px;font-size:14px;cursor:pointer}
.sc-bd{flex:1;overflow:auto;display:grid;grid-template-columns:380px 1fr;gap:0}
.sc-form{background:#fff;border-right:1px solid #e3e8ef;padding:14px 16px;overflow:auto}
.sc-out{padding:16px 18px;overflow:auto}
.sc-g{margin-bottom:14px}.sc-g h4{margin:0 0 8px;font-size:14px;color:#0f7c8a;border-bottom:1px solid #e3e8ef;padding-bottom:4px}
.sc-f{display:flex;flex-direction:column;gap:3px;margin-bottom:9px;font-size:13px;color:#475569}
.sc-f input,.sc-f select{font-size:15px;padding:7px 9px;border:1px solid #cfd8e3;border-radius:8px;background:#fff;color:#0f172a;width:100%;box-sizing:border-box}
.sc-hint{font-size:12px;color:#94a3b8}.sc-row{display:flex;gap:8px}.sc-row>*{flex:1}
.sc-rd{border:1px solid #e3e8ef;border-radius:10px;padding:8px 10px;margin-bottom:8px;background:#fafcfe}.sc-rd.on{border-color:#0f7c8a;background:#f0f9fa}
.sc-rd label.t{display:flex;gap:8px;align-items:flex-start;font-size:13.5px;color:#0f172a;font-weight:600;cursor:pointer}.sc-rd label.t input{margin-top:3px}
.sc-rd .sc-p{font-size:12.5px;color:#0f7c8a;margin-left:auto;white-space:nowrap}.sc-rd .sc-in{margin-top:8px}
.sc-sum{display:grid;grid-template-columns:repeat(auto-fill,minmax(170px,1fr));gap:10px;margin-bottom:14px}
.sc-k{background:#fff;border:1px solid #e3e8ef;border-radius:12px;padding:10px 12px}.sc-k small{color:#64748b;font-size:12px}.sc-k b{display:block;font-size:20px;color:#16324f;margin-top:2px}
.sc-msg{background:#fff4e5;border:1px solid #f5c58a;color:#9a4b00;border-radius:10px;padding:8px 12px;margin-bottom:12px;font-size:13.5px;white-space:pre-line}
.sc-card{background:#fff;border:1px solid #e3e8ef;border-radius:12px;padding:12px 14px;margin-bottom:14px}.sc-card h3{margin:0 0 8px;font-size:15px}
.sc-t{border-collapse:collapse;width:100%;font-size:12.5px}.sc-t th,.sc-t td{border:1px solid #e3e8ef;padding:5px 7px;text-align:right;white-space:nowrap}
.sc-t th{min-width:62px;background:#eef3f8;color:#334155;font-weight:600;white-space:normal;text-align:center;vertical-align:bottom}.sc-t td.l{text-align:left;white-space:normal}
.sc-t tr.hl td{background:#fffbe6}.sc-wrap{overflow:auto;max-height:70vh}.sc-wrap thead th{position:sticky;top:0;z-index:1}
.sc-load{padding:60px;text-align:center;color:#64748b}.sc-note{font-size:12px;color:#94a3b8;margin-top:6px}
@media (max-width:860px){.sc-bd{grid-template-columns:1fr}.sc-form{border-right:0;border-bottom:1px solid #e3e8ef}.sc-hd h2{font-size:15px}}
@media print{body>*:not(.sc-ov){display:none!important}.sc-ov{position:static;background:none}.sc-form,.sc-hd button{display:none}.sc-bd{display:block}.sc-wrap{max-height:none;overflow:visible}}`;
function ensureCss(){if(document.getElementById("sc-css"))return;const s=document.createElement("style");s.id="sc-css";s.textContent=CSS;document.head.appendChild(s)}
function nfmt(v,kind){if(v===""||v==null)return "";if(typeof v==="boolean")return v?"✓":"";if(typeof v!=="number")return esc(v);
  if(kind==="pct")return (v*100).toFixed(2)+"%";if(kind==="x2")return v.toFixed(2);if(kind==="raw")return String(v);
  if(Number.isInteger(v))return v.toLocaleString("en-US");if(Math.abs(v)<10)return v.toFixed(2);return Math.round(v).toLocaleString("en-US")}
function rocToIso(y,m,d){y=+y;m=+m;d=+d;if(!y||!m||!d)return "";return `${y+1911}-${String(m).padStart(2,"0")}-${String(d).padStart(2,"0")}`}

async function open(item){ensureCss();
  const ov=document.createElement("div");ov.className="sc-ov";ov.innerHTML=`<div class="sc-box"><div class="sc-hd"><h2>🧮 ${esc(item.co)}｜${esc(item.title)}</h2><button data-x="print">🖨 列印</button><button data-x="close">✕ 關閉</button></div><div class="sc-bd"><div class="sc-load" style="grid-column:1/-1">試算引擎載入中…<br><small>第一次開啟需下載約 1–2 MB，之後會快很多</small></div></div></div>`;
  document.body.appendChild(ov);const close=()=>{ov.remove();document.removeEventListener("keydown",onKey)};const onKey=e=>{if(e.key==="Escape")close()};document.addEventListener("keydown",onKey);
  ov.addEventListener("click",e=>{const b=e.target.closest("[data-x]");if(!b)return;if(b.dataset.x==="close")close();if(b.dataset.x==="print")window.print()});
  let S;try{const [H,model]=await Promise.all([loadHF(),getModel(item.calc.model)]);await new Promise(r=>setTimeout(r,30));S=Session(item,model,H)}catch(e){ov.querySelector(".sc-bd").innerHTML=`<div class="sc-load" style="grid-column:1/-1">⚠ ${esc(e.message||e)}</div>`;return}
  const spec=item.calc;const bd=ov.querySelector(".sc-bd");bd.innerHTML=`<div class="sc-form"></div><div class="sc-out"></div>`;const form=bd.querySelector(".sc-form"),out=bd.querySelector(".sc-out");
  // 欄位狀態
  const fields=[];(spec.groups||[]).forEach(g=>g.fields.forEach(f=>fields.push(f)));(spec.riders||[]).forEach(r=>(r.fields||[]).forEach(f=>fields.push(f)));
  const curVal=f=>{if(f.type==="roc"){const [y,m,d]=f.cells.map(c=>S.get(c));return rocToIso(y,m,d)}if(f.type==="check")return !!S.get(f.cell);return S.get(f.cell)};
  function fieldHtml(f){const v=curVal(f);const id="scf_"+(f.cell||f.cells[0]).replace(/[^A-Za-z0-9]/g,"_");let inner="";
    if(f.type==="select"){let o=S.opts(f.opts)||[];if(o.length&&!o.some(x=>String(x)===String(v))){/* 目前值不在清單 → 改成第一個 */}
      inner=`<select id="${id}" data-c="${esc(f.cell)}" data-num="${o.length&&typeof o[0]==="number"?1:""}">${o.map(x=>`<option value="${esc(x)}" ${String(x)===String(v)?"selected":""}>${esc(f.fmt==="pct"?(x*100).toFixed(2)+"%":x)}</option>`).join("")}</select>`}
    else if(f.type==="roc")inner=`<input type="date" id="${id}" data-roc="${esc(f.cells.join(","))}" value="${esc(v)}">`;
    else if(f.type==="number")inner=`<input type="number" id="${id}" data-c="${esc(f.cell)}" data-num="1" value="${esc(v)}" ${f.step?`step="${f.step}"`:""} inputmode="decimal">`;
    else if(f.type==="check")return `<label class="sc-f" style="flex-direction:row;align-items:center;gap:8px"><input type="checkbox" data-c="${esc(f.cell)}" data-chk="1" ${v?"checked":""}> ${esc(f.label)}</label>`;
    else inner=`<input type="text" id="${id}" data-c="${esc(f.cell)}" value="${esc(v)}">`;
    const hint=f.hint?S.get(f.hint):"";const lbl=f.labelCell?S.get(f.labelCell)||f.label:f.label;
    return `<label class="sc-f" for="${id}">${esc(lbl)}${inner}${hint?`<span class="sc-hint">${esc(hint)}</span>`:""}</label>`}
  function visible(f){if(!f.show)return true;const v=S.evalF(f.show);return v===true||v===1}
  function drawForm(){const sc=form.scrollTop;let h="";
    (spec.groups||[]).forEach(g=>{h+=`<div class="sc-g"><h4>${esc(g.title)}</h4>${g.fields.filter(visible).map(f=>f.row?`<div class="sc-row">${fieldHtml(f)}</div>`:fieldHtml(f)).join("")}</div>`});
    if(spec.riders&&spec.riders.length){h+=`<div class="sc-g"><h4>${esc(spec.riderTitle||"附約")}</h4>`+spec.riders.map(r=>{const on=!!S.get(r.flag);const nm=(r.labelCell&&S.get(r.labelCell))||r.label;const p=r.prem?S.get(r.prem):"";
      return `<div class="sc-rd ${on?"on":""}"><label class="t"><input type="checkbox" data-c="${esc(r.flag)}" data-chk="1" ${on?"checked":""}><span>${esc(nm)}${r.hint&&S.get(r.hint)?`<br><span class="sc-hint" style="font-weight:400">${esc(S.get(r.hint))}</span>`:""}</span>${on&&p!==""?`<span class="sc-p">${nfmt(p)} 元</span>`:""}</label>${on&&r.fields&&r.fields.length?`<div class="sc-in">${r.fields.map(fieldHtml).join("")}</div>`:""}</div>`}).join("")+`</div>`}
    form.innerHTML=h+`<div class="sc-note">※ 計算公式取自 ${esc(item.co)} 官方試算表（${esc(item.ver||"")}，版本日 ${esc(item.date||"")}），僅供參考，實際以保單條款及核保結果為準。</div>`;form.scrollTop=sc}
  function drawOut(){let h="";
    const msgs=(spec.msgs||[]).map(c=>S.get(c)).filter(v=>typeof v==="string"&&v.trim()&&/＊|超過|不符|不得|錯誤|請確認|須輸入|未滿|以上者|不可|限/.test(v)&&!/^[\(★※]/.test(v.trim()));
    if(msgs.length)h+=`<div class="sc-msg">⚠ ${[...new Set(msgs)].map(esc).join("\n⚠ ")}</div>`;
    if(spec.summary)h+=`<div class="sc-sum">${spec.summary.map(k=>{const v=S.get(k.cell);return `<div class="sc-k"><small>${esc(k.label)}</small><b>${nfmt(v,k.fmt)}${k.unit&&v!==""&&v!=="-"?`<small> ${esc(k.unit)}</small>`:""}</b></div>`}).join("")}</div>`;
    (spec.tables||[]).forEach(t=>{h+=tableHtml(t)});
    out.innerHTML=h}
  function tableHtml(t){const sh=t.sheet;const cell=(c,r)=>S.get(`'${sh}'!${c}${r}`);
    const rows=[];for(let r=t.from;r<=t.to;r++){if(t.flag){const f=cell(t.flag,r);if(f===false||f===0||f==="0")continue}if(t.stop&&(cell(t.stop,r)===""||cell(t.stop,r)==null))break;if(t.need&&(cell(t.need,r)===""||cell(t.need,r)==null))continue;rows.push(r)}
    if(!rows.length)return "";
    let cols=t.cols;if(t.hideEmpty)cols=cols.filter(c=>c.keep||rows.some(r=>{const v=cell(c.c,r);return v!==""&&v!==0&&v!=null&&v!=="-"}));
    const head=cols.map(c=>{let lb=c.label;if(!lb&&t.head)for(const hr of t.head){const v=cell(c.c,hr);if(v!==""&&v!=null){lb=String(v).replace(/\n/g," ");break}}return `<th>${esc(lb||"")}</th>`}).join("");
    const body=rows.map(r=>`<tr class="${t.hl&&t.hl.includes(cell(t.hlCol||"B",r))?"hl":""}">${cols.map(c=>{const v=cell(c.c,r);return `<td class="${c.l?"l":""}">${nfmt(v,c.fmt)}</td>`}).join("")}</tr>`).join("");
    return `<div class="sc-card"><h3>${esc(t.title)}</h3>${t.note?`<div class="sc-note" style="margin:-4px 0 8px">${esc(typeof t.note==="string"&&t.note.startsWith("=")?S.get(t.note.slice(1)):t.note)}</div>`:""}<div class="sc-wrap"><table class="sc-t"><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table></div></div>`}
  // 套用欄位後：確保下拉值有效
  function fixSelects(){let changed=false;for(let pass=0;pass<3;pass++){let ch=false;fields.forEach(f=>{if(f.type!=="select"||!visible(f))return;const o=S.opts(f.opts)||[];if(!o.length)return;const v=S.get(f.cell);if(!o.some(x=>String(x)===String(v))){S.set(f.cell,o[0]);ch=changed=true}});if(!ch)break}return changed}
  function apply(el){const t0=performance.now();S.hf.batch(()=>{
      if(el.dataset.roc){const cs=el.dataset.roc.split(",");const d=el.value?new Date(el.value):null;const vals=d&&!isNaN(d)?[d.getFullYear()-1911,d.getMonth()+1,d.getDate()]:["","",""];
        cs.forEach((c,i)=>S.set(c,vals[i]));const f=fields.find(x=>x.type==="roc"&&x.cells.join(",")===el.dataset.roc);(f&&f.mirror||[]).forEach((c,i)=>S.set(c,vals[i]))}
      else{const c=el.dataset.c;let v=el.dataset.chk?el.checked:el.value;if(!el.dataset.chk&&el.dataset.num&&v!=="")v=Number(v);S.set(c,v);const f=fields.find(x=>x.cell===c);(f&&f.mirror||[]).forEach(m=>S.set(m,v))}});
    fixSelects();drawForm();drawOut();const ms=performance.now()-t0;if(ms>1500)console.log("calc ms",ms)}
  let tmr=null;form.addEventListener("change",e=>{const el=e.target;if(!el.matches("input,select"))return;clearTimeout(tmr);apply(el)});
  // 初始：套用預設值
  S.hf.batch(()=>{(spec.init||[]).forEach(([c,v])=>S.set(c,v))});fixSelects();drawForm();drawOut()}
window.StarkCalc={open,fmtNum};
})();
