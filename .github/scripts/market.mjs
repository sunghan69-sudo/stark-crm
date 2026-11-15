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
fs.mkdirSync("out",{recursive:true});fs.writeFileSync("out/market.json",JSON.stringify(out,null,1));
console.log(JSON.stringify(out).slice(0,1500));
if(!out.index.length&&!out.tw.length)process.exit(1);
