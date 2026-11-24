/* 史塔克CRM：App 版本檢查
   App 開啟或切回前景時，比對 GitHub Releases 最新版號；
   有新版就跳出提示，按「立即更新」直接下載新 APK，下載完點一下即可覆蓋安裝（資料在雲端不受影響）。 */
(function(){
  const REPO="sunghan69-sudo/stark-crm";
  const APK="https://github.com/"+REPO+"/releases/latest/download/StarkCRM.apk";
  const Cap=window.Capacitor;
  const cur=Number(window.STARK_BUILD||0);
  if(!(Cap&&Cap.isNativePlatform&&Cap.isNativePlatform())||!cur)return; // 只在手機 App 內執行
  let lastCheck=0,shown=false;
  async function check(){
    if(shown||Date.now()-lastCheck<10*60*1000)return; // 10 分鐘內不重複查
    lastCheck=Date.now();
    try{
      const r=await fetch("https://api.github.com/repos/"+REPO+"/releases/latest",{cache:"no-store"});
      if(!r.ok)return;
      const j=await r.json();
      const m=String(j.tag_name||"").match(/(\d+)$/);const latest=m?Number(m[1]):0;
      const hasApk=(j.assets||[]).some(a=>a.name==="StarkCRM.apk");
      if(latest>cur&&hasApk)show(latest,(j.body||"").trim());
    }catch(e){}
  }
  function show(latest,notes){
    shown=true;
    const skip=localStorage.getItem("stark_skip_build");
    if(skip&&Number(skip)>=latest){shown=false;return}
    const w=document.createElement("div");
    w.style.cssText="position:fixed;inset:0;z-index:9999;background:rgba(10,25,45,.55);display:flex;align-items:center;justify-content:center;padding:20px";
    w.innerHTML='<div style="background:#fff;border-radius:16px;max-width:360px;width:100%;padding:22px;box-shadow:0 12px 40px rgba(0,0,0,.3);font-family:inherit">'+
      '<div style="font-size:19px;font-weight:900;color:#14365c;margin-bottom:6px">有新版本可以更新</div>'+
      '<div style="color:#555;font-size:14px;line-height:1.6;margin-bottom:14px">目前 v1.0.'+cur+' → 最新 v1.0.'+latest+'<br>按「立即更新」會下載新版 APK，下載完成後點通知列安裝即可，資料都在雲端不會不見。</div>'+
      '<button id="upGo" style="width:100%;padding:12px;border:0;border-radius:10px;background:#14365c;color:#fff;font-size:16px;font-weight:700;margin-bottom:8px">立即更新</button>'+
      '<button id="upLater" style="width:100%;padding:10px;border:1px solid #ccd;border-radius:10px;background:#fff;color:#14365c;font-size:14px">稍後再說</button></div>';
    document.body.appendChild(w);
    w.querySelector("#upGo").onclick=()=>{location.href=APK+"?v="+latest}; // 交給系統瀏覽器下載
    w.querySelector("#upLater").onclick=()=>{localStorage.setItem("stark_skip_build",String(latest));w.remove();shown=false};
  }
  check();
  document.addEventListener("visibilitychange",()=>{if(document.visibilityState==="visible")check()});
})();
