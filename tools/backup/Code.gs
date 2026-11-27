/**
 * 史塔克客戶管理系統 每日備份到 Google 雲端硬碟
 * - 用老蔡本人的 Google 帳號（Firestore 專案擁有者）讀取整個資料庫
 * - 每天一份 JSON 存在「史塔克CRM備份」資料夾，保留最近 60 天
 * - 檔案是 Firestore 原始格式，可用 restoreCollection() 寫回
 */
const PROJECT = 'stark-crm-112f6';
const FOLDER_NAME = '史塔克CRM備份';
const KEEP_DAYS = 60;
const BASE = 'https://firestore.googleapis.com/v1/projects/' + PROJECT + '/databases/(default)/documents';

function api_(method, url, body) {
  const opt = {
    method: method,
    contentType: 'application/json',
    headers: { Authorization: 'Bearer ' + ScriptApp.getOAuthToken() },
    muteHttpExceptions: true
  };
  if (body) opt.payload = JSON.stringify(body);
  for (let i = 0; i < 4; i++) {
    const r = UrlFetchApp.fetch(url, opt);
    const code = r.getResponseCode();
    if (code === 200) return JSON.parse(r.getContentText() || '{}');
    if (code === 429 || code >= 500) { Utilities.sleep(2000 * (i + 1)); continue; }
    throw new Error('Firestore ' + code + '：' + r.getContentText().slice(0, 300));
  }
  throw new Error('Firestore 多次重試仍失敗：' + url);
}

function listCollections_(parentPath) {
  const url = (parentPath ? BASE + '/' + parentPath : BASE) + ':listCollectionIds';
  let ids = [], token = '';
  do {
    const r = api_('post', url, { pageSize: 300, pageToken: token || undefined });
    ids = ids.concat(r.collectionIds || []);
    token = r.nextPageToken || '';
  } while (token);
  return ids;
}

function listDocs_(collectionPath) {
  let docs = [], token = '';
  do {
    const r = api_('get', BASE + '/' + collectionPath + '?pageSize=300&showMissing=true' + (token ? '&pageToken=' + encodeURIComponent(token) : ''));
    docs = docs.concat(r.documents || []);
    token = r.nextPageToken || '';
  } while (token);
  return docs;
}

/** 讀取整個資料庫：所有最上層集合，以及 users/{uid} 底下的子集合 */
function dumpAll_() {
  const out = { project: PROJECT, at: new Date().toISOString(), collections: {} };
  const roots = listCollections_('');
  roots.forEach(function (c) {
    const docs = listDocs_(c);
    out.collections[c] = docs.filter(function (d) { return d.fields; });
    if (c === 'users') {
      docs.forEach(function (d) {
        const path = d.name.split('/documents/')[1];
        listCollections_(path).forEach(function (sub) {
          out.collections[path + '/' + sub] = listDocs_(path + '/' + sub).filter(function (x) { return x.fields; });
        });
      });
    }
  });
  return out;
}

function folder_() {
  const it = DriveApp.getFoldersByName(FOLDER_NAME);
  return it.hasNext() ? it.next() : DriveApp.createFolder(FOLDER_NAME);
}

/** 每日排程呼叫：備份 + 清掉 60 天前的舊檔 + 寫一行紀錄 */
function backup() {
  const t0 = Date.now();
  const data = dumpAll_();
  const day = Utilities.formatDate(new Date(), 'Asia/Taipei', 'yyyy-MM-dd');
  const f = folder_();
  const name = 'stark-crm-' + day + '.json';
  const old = f.getFilesByName(name);
  while (old.hasNext()) old.next().setTrashed(true);
  const blob = Utilities.newBlob(JSON.stringify(data), 'application/json', name);
  f.createFile(blob);
  const cutoff = Date.now() - KEEP_DAYS * 864e5;
  const all = f.getFiles();
  while (all.hasNext()) {
    const x = all.next();
    if (/^stark-crm-\d{4}-\d{2}-\d{2}\.json$/.test(x.getName()) && x.getDateCreated().getTime() < cutoff) x.setTrashed(true);
  }
  const counts = Object.keys(data.collections).map(function (k) { return k + ':' + data.collections[k].length; }).join('，');
  log_('備份完成 ' + name + '（' + Math.round(blob.getBytes().length / 1024) + ' KB，' + Math.round((Date.now() - t0) / 1000) + ' 秒）' + counts);
  return counts;
}

/** 還原演練：讀最新備份，和線上資料筆數比對（不寫入任何資料） */
function verifyLatest() {
  const f = folder_();
  const files = [];
  const it = f.getFiles();
  while (it.hasNext()) { const x = it.next(); if (/^stark-crm-.*\.json$/.test(x.getName())) files.push(x); }
  if (!files.length) throw new Error('還沒有備份檔');
  files.sort(function (a, b) { return b.getName().localeCompare(a.getName()); });
  const data = JSON.parse(files[0].getBlob().getDataAsString());
  const live = dumpAll_();
  const rows = Object.keys(live.collections).map(function (k) {
    const a = (data.collections[k] || []).length, b = live.collections[k].length;
    return k + '：備份 ' + a + ' ／ 線上 ' + b + (a === b ? ' ✓' : ' ⚠');
  });
  log_('還原演練（' + files[0].getName() + '）\n' + rows.join('\n'));
  return rows.join('\n');
}

/**
 * 真的要還原時才用：把備份檔裡某個集合寫回（同 ID 覆蓋）。
 * 例：restoreCollection('stark-crm-2026-11-27.json', 'products')
 */
function restoreCollection(fileName, collectionPath) {
  const it = folder_().getFilesByName(fileName);
  if (!it.hasNext()) throw new Error('找不到 ' + fileName);
  const data = JSON.parse(it.next().getBlob().getDataAsString());
  const docs = data.collections[collectionPath] || [];
  const writes = docs.map(function (d) { return { update: { name: d.name, fields: d.fields } }; });
  for (let i = 0; i < writes.length; i += 400) {
    api_('post', BASE.replace('/documents', '/documents:commit'), { writes: writes.slice(i, i + 400) });
  }
  log_('已還原 ' + collectionPath + ' 共 ' + writes.length + ' 筆（來源 ' + fileName + '）');
  return writes.length;
}

function log_(msg) {
  const f = folder_();
  const it = f.getFilesByName('備份紀錄.txt');
  const line = Utilities.formatDate(new Date(), 'Asia/Taipei', 'yyyy-MM-dd HH:mm') + '  ' + msg + '\n';
  if (it.hasNext()) { const x = it.next(); x.setContent((line + x.getBlob().getDataAsString()).slice(0, 200000)); }
  else f.createFile('備份紀錄.txt', line);
  console.log(msg);
}

/** 只要執行一次：建立每天凌晨 3 點的排程 */
function setupDailyTrigger() {
  ScriptApp.getProjectTriggers().forEach(function (t) { if (t.getHandlerFunction() === 'backup') ScriptApp.deleteTrigger(t); });
  ScriptApp.newTrigger('backup').timeBased().everyDays(1).atHour(3).inTimezone('Asia/Taipei').create();
  return '已建立每日 03:00 備份排程';
}
