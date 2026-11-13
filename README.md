# 史塔克客戶管理系統 Stark Insurance CRM

保險業務用的客戶管理系統，有 **Android App（APK）** 和 **網頁版** 兩種用法。兩邊用同一組帳號登入，資料透過 Firebase 雲端即時同步。

## 功能
- 總覽：客戶數、有效保單、年化保費、待辦提醒、保障缺口商機
- 客戶管理：全家保單整合、智慧篩選（缺重疾／缺實支實付／缺意外／90 天未聯絡／本月壽星…）、標籤
- 提醒中心：生日、繳費日、繳費期滿、追蹤約訪，一鍵複製或直接傳到 LINE
- 保障總覽：8 大保障項目和建議額度比較
- 怎麼賠：罹癌、車禍、中風、身故、長照的理賠情境試算
- 電子名片、CSV／JSON 匯出、JSON 匯入

---

## 第一步：建立 Firebase（雲端資料庫，免費，約 10 分鐘）

1. 用 Google 帳號登入 <https://console.firebase.google.com>，按「建立專案」，名稱填 `stark-crm`（Google Analytics 可以關掉）。
2. 左邊選單 **建構 → Authentication** → 開始使用 → 「登入方式」分頁 → **電子郵件/密碼** → 啟用 → 儲存。
3. 左邊選單 **建構 → Firestore Database** → 建立資料庫
   - 位置選 **asia-east1（台灣）**
   - 選「正式版模式」
   - 建好後切到「規則」分頁，整段換成本專案的 `firestore.rules` 內容，按「發布」。
     （這份規則讓每個帳號只能讀寫自己的客戶資料。）
4. 左上角 ⚙ **專案設定 → 一般** → 拉到最下面「你的應用程式」→ 按網頁圖示 `</>` → 隨便取個暱稱 → 註冊。
   畫面上會出現一段 `const firebaseConfig = { ... }`，**整段複製**。
5. 把這段設定填進 `www/firebase-config.js`（或直接貼給 Claude 幫你填）。
   不填也可以用：App 第一次打開時會請你貼上這段設定。

> Firebase 網頁設定（apiKey 等）本來就會放在前端程式裡，不算密碼，真正保護資料的是第 3 步的規則。

## 第二步：放上 GitHub（自動編譯 APK＋架設網頁版）

1. 註冊／登入 <https://github.com>。
2. 右上角 ＋ → **New repository**，名稱填 `stark-crm`，選 **Public**（免費架設網頁版需要公開；客戶資料存在 Firebase，不在程式碼裡）。
3. 把這個資料夾的所有檔案上傳到 repository（或讓 Claude 幫你推上去）。
4. Repository 的 **Settings → Pages → Build and deployment → Source** 選 **GitHub Actions**。
5. 到 **Actions** 分頁，等「編譯 Android App 與部署網頁版」跑完（約 5–8 分鐘）。

完成後：
- **Android App**：repository 右側 **Releases** → 下載 `StarkCRM.apk`
  固定下載連結：`https://github.com/<你的帳號>/stark-crm/releases/latest/download/StarkCRM.apk`
- **網頁版**：`https://<你的帳號>.github.io/stark-crm/`
  Android 手機用 Chrome 開啟網頁版 → 選單 →「加到主畫面」，也能當 App 用。

之後每次修改程式並推上 GitHub，都會自動編出新版 APK，直接覆蓋安裝就好，資料在雲端不會不見。

## 第三步：在手機安裝 APK
1. 用手機下載 `StarkCRM.apk`，點開安裝。
2. 第一次會問「是否允許安裝不明來源的應用程式」，允許 Chrome（或檔案管理員）安裝即可。
3. 打開 App → 建立帳號（Email＋密碼）→ 開始使用。電腦開網頁版，用同一組帳號登入就會同步。

## 開啟「拍照匯入保單」（AI 辨識）
1. Firebase 主控台左邊 **AI 服務 → AI Logic** → 開始使用 → 選 **Gemini Developer API**（免費方案即可）。
2. 完成後，在客戶的「保單」分頁按「📷 拍照匯入」，拍下保單整理表，確認後匯入。

> 注意：使用免費層時，依 Google Gemini API 條款，送出的內容可能被 Google 用於改進服務。
> 若要處理大量真實客戶資料，建議升級 Blaze 方案（付費層不會拿資料去訓練，費用通常每月幾元台幣），或拍照前先遮住身分證字號等敏感資訊。

## 從 claude.ai 版本搬資料
舊版 → 設定 →「複製完整備份 JSON」→ 新版登入後 → 設定 →「匯入 JSON 備份」→ 貼上。

## 專案結構
```
www/                    網頁與 App 共用的程式（網頁版直接部署這個資料夾）
  index.html            主程式
  firebase-config.js    Firebase 設定
  manifest.webmanifest  PWA 設定
  sw.js                 離線快取
  vendor/               Firebase SDK（放在本地，離線也能開）
  icons/                App 圖示
assets/                 產生 Android 圖示用的原始圖
capacitor.config.json   Android App 設定（套件名稱 com.stark.insurancecrm）
firestore.rules         Firestore 安全規則
keystore/debug.keystore 固定 App 簽章，讓更新可以直接覆蓋安裝
.github/workflows/      自動編譯 APK、部署網頁版
```

## 注意
- 「怎麼賠」是用保障額度加總的簡化試算，僅供溝通參考，實際以保單條款與保險公司核定為準。
- 客戶資料屬於個人資料，請依公司的個資規範使用；帳號請設定強密碼。
- 目前的 APK 用的是開發版簽章，適合自己和團隊安裝使用；要上架 Google Play 需要另外申請開發者帳號並改用正式簽章。
