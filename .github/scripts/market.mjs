// 每日市場資訊：美金匯率、昨收行情、台股前五大、美股前五大科技股 → market.json
import fs from "node:fs";
const UA={"User-Agent":"Mozilla/5.0 (StarkCRM market bot)"};
async function yahoo(sym){
  for(const host of ["query1","query2"]){
    try{const r=await fetch(`https://${host}.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(sym)}?range=10d&interval=1d`,{headers:UA});
      if(!r.ok)continue;const j=await r.json();const x=j.chart.result[0];const q=x.indicators.quote[0];
      const rows=x.timestamp.map((t,i)=>({t,c:q.close[i]})).filter(v=>v.c!=null);if(rows.length<2)continue;
      const last=rows[rows.length-1],prev=rows[rows.length-2];
      return {sym,price:+last.c.toFixed(2),prev:+prev.c.toFixed(2),chg:+(last.c-prev.c).toFixed(2),pct:+((last.c-prev.c)/prev.c*100).toFixed(2),date:new Date(last.t*1000).toISOString().slice(0,10),cur:x.meta.currency}
    }catch(e){}
  }
  return null;
}
async function bot(){ // 台灣銀行牌告匯率 CSV
  try{const r=await fetch("https://rate.bot.com.tw/xrt/flcsv/0/day",{headers:UA});const t=await r.text();
    const line=t.split(/\r?\n/).find(l=>l.startsWith("USD"));if(!line)return null;const a=line.split(",").map(s=>s.trim());
    // 幣別,匯率,現金,即期,遠期10天...,匯率,現金,即期...  (本行買入 … 本行賣出)
    return {cashBuy:+a[2],spotBuy:+a[3],cashSell:+a[12],spotSell:+a[13]};
  }catch(e){return null}
}
const TW=[["2330.TW","台積電"],["2317.TW","鴻海"],["2454.TW","聯發科"],["2308.TW","台達電"],["2382.TW","廣達"]];
const US=[["NVDA","輝達"],["AAPL","蘋果"],["MSFT","微軟"],["GOOGL","Alphabet"],["AMZN","亞馬遜"]];
const IDX=[["^TWII","台股加權指數"],["^TWOII","櫃買指數"],["^DJI","道瓊工業"],["^IXIC","那斯達克"],["^GSPC","S&P 500"],["^SOX","費城半導體"]];
const out={updated:new Date().toISOString(),fx:{},index:[],tw:[],us:[]};
const fx=await yahoo("TWD=X");out.fx={market:fx?fx.price:null,chg:fx?fx.chg:null,date:fx?fx.date:null,bot:await bot()};
for(const [s,n] of IDX){const q=await yahoo(s);if(q)out.index.push({...q,name:n})}
for(const [s,n] of TW){const q=await yahoo(s);if(q)out.tw.push({...q,name:n,code:s.replace(".TW","")})}
for(const [s,n] of US){const q=await yahoo(s);if(q)out.us.push({...q,name:n,code:s})}

// 今日重點新聞（鉅亨網）：依「同一話題被報導的篇數」估算熱度，取 5 則（商業／投資股市為主，保證 1 則醫療保險）
async function cnyes(cat,limit){try{const r=await fetch(`https://api.cnyes.com/media/api/v1/newslist/category/${cat}?limit=${limit}`,{headers:UA});if(!r.ok)return [];const j=await r.json();return (j.items&&j.items.data)||[]}catch(e){return []}}
async function news(){
  const now=Date.now()/1000,day=now-36*3600;
  const cats=[["headline",100],["tw_stock",40],["wd_stock",40],["tw_insurance",20]];
  const pool=new Map();
  for(const [c,n] of cats){for(const x of await cnyes(c,n)){if(!pool.has(x.newsId))pool.set(x.newsId,{...x,_cat:c})}}
  const GEN=new Set(["市場預估","eps","目標價","鉅亨速報","factset","優分析","個股","盤後","盤前"]);
  const all=[...pool.values()].filter(x=>!/鉅亨速報|Factset|盤中速報/.test(x.title));
  const recent=all.filter(x=>x.publishAt>=day);
  const kw=x=>[...new Set((x.keyword||[]).map(k=>String(k).toLowerCase()).filter(k=>k.length>=2&&!GEN.has(k)))];
  const freq={};recent.forEach(x=>kw(x).forEach(k=>freq[k]=(freq[k]||0)+1));
  const score=x=>kw(x).reduce((a,k)=>a+Math.min(freq[k]||1,12)-1,0)+(x._cat==="headline"?3:0)+(x.is24h?2:0)+Math.max(0,(x.publishAt-day)/(36*3600))*3;
  const isIns=x=>x._cat==="tw_insurance"||/保險|保單|壽險|產險|醫療|健保|長照|癌|醫院|藥/.test(x.title);
  const isBiz=x=>!isIns(x)&&!/優惠|網購|周年慶|信用卡|回饋/.test(x.title);
  const pick=[],used=new Set();
  const add=x=>{if(!x||pick.includes(x))return false;const ks=kw(x).sort((a,b)=>(freq[b]||0)-(freq[a]||0)).slice(0,1);if(ks.some(k=>used.has(k)))return false;ks.forEach(k=>used.add(k));pick.push(x);return true};
  const biz=recent.filter(isBiz).sort((a,b)=>score(b)-score(a));for(const x of biz){if(pick.length>=4)break;add(x)}
  const ins=all.filter(isIns).filter(x=>x.publishAt>=now-72*3600).sort((a,b)=>((b._cat==="tw_insurance")-(a._cat==="tw_insurance"))||score(b)-score(a));add(ins[0]);
  for(const x of biz){if(pick.length>=5)break;add(x)}
  return pick.slice(0,5).map(x=>({id:x.newsId,title:x.title,cat:x.categoryName||"",t:x.publishAt,summary:String(x.summary||"").replace(/\s+/g," ").slice(0,90),url:`https://news.cnyes.com/news/id/${x.newsId}`,ins:isIns(x),kw:kw(x).slice(0,3)}));
}
out.news=await news();
fs.mkdirSync("out",{recursive:true});fs.writeFileSync("out/market.json",JSON.stringify(out,null,1));
console.log(JSON.stringify(out).slice(0,1500));
if(!out.index.length&&!out.tw.length)process.exit(1);
