# Graph Report - stark-crm  (2026-11-21)

## Corpus Check
- 12 files · ~19,088 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 4 file(s) not represented in the graph (top: (none) 2, .rules 1, .webmanifest 1)

## Summary
- 390 nodes · 985 edges · 16 communities (13 shown, 3 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 44 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `30a76694`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- index.inline.js
- buildReport
- esc
- with
- open
- package.json
- graph.yml
- steps
- drawModal
- market.mjs
- vProducts
- vMarket
- 史塔克客戶管理系統 Stark Insurance CRM
- sw.js

## God Nodes (most connected - your core abstractions)
1. `esc()` - 50 edges
2. `render()` - 38 edges
3. `buildReport()` - 25 edges
4. `active()` - 22 edges
5. `openScan()` - 21 edges
6. `fmt()` - 19 edges
7. `sheetHtml()` - 19 edges
8. `reminders()` - 18 edges
9. `open()` - 18 edges
10. `num()` - 17 edges

## Surprising Connections (you probably didn't know these)
- `drawOut()` --indirect_call--> `esc()`  [INFERRED]
  www/calc/calc.js → graphify-src/index.inline.js

## Import Cycles
- None detected.

## Communities (16 total, 3 thin omitted)

### Community 0 - "index.inline.js"
Cohesion: 0.06
Nodes (75): admAction(), aiExtract(), bulkHeadName(), bulkImportOne(), bulkNp(), cById(), checkAccess(), claimText() (+67 more)

### Community 1 - "buildReport"
Cohesion: 0.09
Nodes (63): active(), addMonths(), agentName(), annual(), annualRaw(), annualSum(), annuitySchedule(), buildReport() (+55 more)

### Community 2 - "esc"
Cohesion: 0.07
Nodes (43): canInv(), canProd(), cardText(), closeModal(), coBadge(), coColor(), coName(), confirmBox() (+35 more)

### Community 3 - "with"
Cohesion: 0.05
Nodes (38): name, runs-on, steps, cancel-in-progress, group, name, url, jobs (+30 more)

### Community 4 - "open"
Cohesion: 0.20
Nodes (22): buildModel(), dec(), ensureCss(), getModel(), loadHF(), nfmt(), open(), apply() (+14 more)

### Community 5 - "package.json"
Cohesion: 0.12
Nodes (21): dependencies, @capacitor/android@^8.6.2, @capacitor/core@^8.6.2, @capacitor/filesystem@^8.0.0, @capacitor/share@^8.0.0, description, devDependencies, @capacitor/assets@^4.0.0 (+13 more)

### Community 6 - "graph.yml"
Cohesion: 0.10
Nodes (20): concurrency, cancel-in-progress, group, runs-on, steps, jobs, graph, name (+12 more)

### Community 7 - "steps"
Cohesion: 0.11
Nodes (18): VIDEOS, jobs, market, runs-on, steps, name, on, schedule (+10 more)

### Community 8 - "drawModal"
Cohesion: 0.18
Nodes (17): age(), applyId(), avatar(), drawModal(), famHead(), famMembers(), households(), isHead() (+9 more)

### Community 9 - "market.mjs"
Cohesion: 0.15
Nodes (11): CAT, catOf(), cnyes(), IDX, news(), out, TW, UA (+3 more)

### Community 10 - "vProducts"
Cohesion: 0.22
Nodes (14): allMissing(), baseName(), coKey(), cosList(), finfoSearchUrl(), matchProduct(), matchProduct0(), mcache() (+6 more)

### Community 11 - "vMarket"
Cohesion: 0.38
Nodes (11): loadMarket(), loadTwRt(), loadUsRt(), mktChg(), mktPrice(), twOpenNow(), twrtHtml(), twrtTick() (+3 more)

### Community 12 - "史塔克客戶管理系統 Stark Insurance CRM"
Cohesion: 0.20
Nodes (9): 功能, 史塔克客戶管理系統 Stark Insurance CRM, 專案結構, 從 claude.ai 版本搬資料, 注意, 第一步：建立 Firebase（雲端資料庫，免費，約 10 分鐘）, 第三步：在手機安裝 APK, 第二步：放上 GitHub（自動編譯 APK＋架設網頁版） (+1 more)

## Knowledge Gaps
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `esc()` connect `esc` to `index.inline.js`, `buildReport`, `open`, `drawModal`, `vProducts`, `vMarket`?**
  _High betweenness centrality (0.080) - this node is a cross-community bridge._
- **Are the 12 inferred relationships involving `render()` (e.g. with `vAdmin()` and `vCard()`) actually correct?**
  _`render()` has 12 INFERRED edges - model-reasoned connections that need verification._
- **Should `index.inline.js` be split into smaller, more focused modules?**
  _Cohesion score 0.05966386554621849 - nodes in this community are weakly interconnected._
- **Why does `drawOut()` connect `open` to `esc`?**
  _High betweenness centrality (0.071) - this node is a cross-community bridge._
- **Are the 16 inferred relationships involving `active()` (e.g. with `annualSum()` and `annuitySchedule()`) actually correct?**
  _`active()` has 16 INFERRED edges - model-reasoned connections that need verification._
- **Should `buildReport` be split into smaller, more focused modules?**
  _Cohesion score 0.09370199692780339 - nodes in this community are weakly interconnected._
- **Should `esc` be split into smaller, more focused modules?**
  _Cohesion score 0.07087486157253599 - nodes in this community are weakly interconnected._