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


// 今日重點影音：YouTube 頻道 RSS，依觀看熱度挑 5 支，分類配額：投資股市 2、商業 1、醫療 1、保險 1（不足時由其他類補）
const YT=[["UCYIVkruUoN04UjV9pkBTswg","非凡財經新聞"],["UCuzqko_GKcj9922M1gUo__w","東森財經新聞"],["UC5nwNW4KdC0SzrhF9BXEYOQ","TVBS NEWS"],["UCAqzHNzLTC6Vm5UYE7xw_2A","健康2.0"],["UCuGQgbXhDC3a5emcEPCFKog","ETtoday健康雲"]];
const CAT={ins:/保險|保單|壽險|產險|理賠|保費|投保|保戶|長照險|醫療險|癌症險|金管會.*保/,med:/醫|藥|健保|癌|疫苗|長照|病|健康|失智|中風|心臟|血壓|血糖|腎|肝|肺|骨|睡眠|飲食|營養|運動傷害/,inv:/股|ETF|台積|輝達|半導體|美股|台股|Fed|聯準會|升息|降息|利率|債|匯率|美元|基金|期貨|加權|指數|外資|AI股|殖利率|黃金|比特幣/,biz:/經濟|景氣|企業|營收|產業|關稅|出口|訂單|消費|零售|房市|房價|薪|就業|無薪假|物價|通膨|財報|EPS|併購|上市|供應鏈|電商|航運/};
const catOf=t=>CAT.ins.test(t)?"ins":CAT.inv.test(t)?"inv":CAT.biz.test(t)?"biz":CAT.med.test(t)?"med":"";
async function videos(){
  const all=[];const now=Date.now();
  for(const [id,ch] of YT){try{const r=await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${id}`,{headers:UA});if(!r.ok)continue;const x=await r.text();
    for(const e of x.split("<entry>").slice(1)){const g=re=>{const m=e.match(re);return m?m[1]:""};
      const vid=g(/<yt:videoId>([^<]+)</),title=g(/<title>([^<]+)</).replace(/&amp;/g,"&").replace(/&quot;/g,'"').replace(/&#39;/g,"'"),pub=g(/<published>([^<]+)</),views=+g(/views="(\d+)"/)||0;
      if(!vid||/#shorts|shorts/i.test(title))continue;
      if(/民調|選戰|市長|議員|立委|藍綠|政黨|總統府|罷免|命案|車禍|地震|颱風|藝人|網紅/.test(title))continue;
      const age=(now-Date.parse(pub))/36e5;if(age>72)continue;
      let cat=catOf(title);if(/健康2\.0|健康雲/.test(ch)&&!cat)cat="med";if(!cat)continue;
      all.push({id:vid,title:title.replace(/｜.*$/,"").replace(/\s*【[^】]*】\s*$/,"").trim()||title,ch,pub,views,cat,score:views/Math.pow(age+2,0.9)})}}catch(e){}}
  all.sort((a,b)=>b.score-a.score);
  const quota={inv:2,biz:1,med:1,ins:1},pick=[];
  for(const c of ["inv","biz","med","ins"]){all.filter(v=>v.cat===c).slice(0,quota[c]).forEach(v=>pick.push(v))}
  for(const v of all){if(pick.length>=5)break;if(!pick.includes(v)&&pick.filter(p=>p.cat===v.cat).length<2)pick.push(v)}
  const order={inv:0,biz:1,med:2,ins:3};
  return pick.slice(0,5).sort((a,b)=>order[a.cat]-order[b.cat]||b.score-a.score).map(({score,...v})=>v);
}
// 影音每天早上 8 點（VIDEOS=1）更新一輪，其他時段沿用上一輪
if(process.env.VIDEOS==="1"){out.videos=await videos();out.videosAt=new Date().toISOString()}
else{try{const r=await fetch("https://raw.githubusercontent.com/sunghan69-sudo/stark-crm/data/market.json?t="+Date.now());const j=await r.json();out.videos=j.videos||[];out.videosAt=j.videosAt||null;if(!out.videos.length){out.videos=await videos();out.videosAt=new Date().toISOString()}}catch(e){out.videos=await videos();out.videosAt=new Date().toISOString()}}
fs.mkdirSync("out",{recursive:true});fs.writeFileSync("out/market.json",JSON.stringify(out,null,1));
console.log(JSON.stringify(out).slice(0,1500));
if(!out.index.length&&!out.tw.length)process.exit(1);
