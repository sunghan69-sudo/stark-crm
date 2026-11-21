# Graph Report - stark-crm  (2026-11-21)

## Corpus Check
- 11 files · ~11,226 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 4 file(s) not represented in the graph (top: (none) 2, .rules 1, .webmanifest 1)

## Summary
- 157 nodes · 188 edges · 13 communities (10 shown, 3 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 3 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `7ec6092e`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- build.yml
- web
- steps
- with
- open
- package.json
- graph.yml
- steps
- market.mjs
- 史塔克客戶管理系統 Stark Insurance CRM
- sw.js

## God Nodes (most connected - your core abstractions)
1. `open()` - 18 edges
2. `with` - 11 edges
3. `史塔克客戶管理系統 Stark Insurance CRM` - 9 edges
4. `drawForm()` - 8 edges
5. `applyInsured()` - 7 edges
6. `web` - 6 edges
7. `steps` - 6 edges
8. `applyAge()` - 6 edges
9. `drawOut()` - 6 edges
10. `steps` - 5 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (13 total, 3 thin omitted)

### Community 0 - "build.yml"
Cohesion: 0.14
Nodes (13): name, runs-on, jobs, android, name, on, push, workflow_dispatch (+5 more)

### Community 1 - "web"
Cohesion: 0.22
Nodes (9): cancel-in-progress, group, name, url, web, concurrency, environment, name (+1 more)

### Community 2 - "steps"
Cohesion: 0.22
Nodes (9): runs-on, steps, jobs, graph, name, run, uses, with (+1 more)

### Community 3 - "with"
Cohesion: 0.13
Nodes (16): steps, id, name, run, uses, with, steps, body (+8 more)

### Community 4 - "open"
Cohesion: 0.20
Nodes (22): buildModel(), dec(), ensureCss(), getModel(), loadHF(), nfmt(), open(), apply() (+14 more)

### Community 5 - "package.json"
Cohesion: 0.12
Nodes (21): dependencies, @capacitor/android@^8.6.2, @capacitor/core@^8.6.2, @capacitor/filesystem@^8.0.0, @capacitor/share@^8.0.0, description, devDependencies, @capacitor/assets@^4.0.0 (+13 more)

### Community 6 - "graph.yml"
Cohesion: 0.17
Nodes (11): concurrency, cancel-in-progress, group, name, on, push, workflow_dispatch, permissions (+3 more)

### Community 7 - "steps"
Cohesion: 0.11
Nodes (18): VIDEOS, jobs, market, runs-on, steps, name, on, schedule (+10 more)

### Community 9 - "market.mjs"
Cohesion: 0.15
Nodes (11): CAT, catOf(), cnyes(), IDX, news(), out, TW, UA (+3 more)

### Community 12 - "史塔克客戶管理系統 Stark Insurance CRM"
Cohesion: 0.20
Nodes (9): 功能, 史塔克客戶管理系統 Stark Insurance CRM, 專案結構, 從 claude.ai 版本搬資料, 注意, 第一步：建立 Firebase（雲端資料庫，免費，約 10 分鐘）, 第三步：在手機安裝 APK, 第二步：放上 GitHub（自動編譯 APK＋架設網頁版） (+1 more)

## Knowledge Gaps
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `web` connect `web` to `build.yml`, `with`?**
  _High betweenness centrality (0.029) - this node is a cross-community bridge._
- **Should `build.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.14285714285714285 - nodes in this community are weakly interconnected._
- **Why does `jobs` connect `build.yml` to `web`?**
  _High betweenness centrality (0.026) - this node is a cross-community bridge._
- **Should `with` be split into smaller, more focused modules?**
  _Cohesion score 0.13333333333333333 - nodes in this community are weakly interconnected._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.11688311688311688 - nodes in this community are weakly interconnected._
- **Should `steps` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._