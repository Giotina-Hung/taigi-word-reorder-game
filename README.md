# 🧩 語詞重組大挑戰 (Taigi Word Reorder Challenge)

專為國小語文與本土語（閩南語/台語）教學設計的互動式語詞重組挑戰網頁遊戲。支援拖曳與點擊操作、即時對錯檢查、倒數計時與加分、座號成績登記與排行榜，並可直接串接 Google 試算表題庫！

🔗 **線上遊玩網址**：[https://giotina-hung.github.io/taigi-word-reorder-game/](https://giotina-hung.github.io/taigi-word-reorder-game/)

---

## 🌟 遊戲特色

1. **直覺流暢的操作體驗**：
   - 支援 **拖曳排序** (Sortable.js) 與 **單擊字卡退回/放入** 雙重操作。
   - 觸控螢幕、電子白板、平板與電腦滑鼠皆能完美操作。
2. **智慧字詞比對與標點容錯**：
   - 比對時自動過濾標點符號與多餘空白，專注於語詞順序是否正確。
3. **即時互動音效**：
   - 整合 [Tone.js](https://tonejs.github.io/) 合成音效，點擊字卡發出清脆提示聲、答對與答錯即時給予聽覺回饋。
4. **挑戰機制與積分榜**：
   - 每回合 5 題，依據答題速度給予額外秒數獎勵分。
   - 答錯提供正解觀摩並支援重新嘗試。
   - 挑戰完成後可選擇學生座號（1~28號）並記錄至排行榜 (LocalStorage)。
5. **Google 試算表雲端題庫即時串接**：
   - **直接支援 Google 試算表連結**（自動透過 Google Visualization API 跨域讀取，零後端設定）。
   - **亦支援 Google Apps Script Web App API**。
   - 內建離線範例題庫（涵蓋真平、康軒、南一各版本），斷網時亦能暢玩！

---

## 📋 Google 試算表題庫格式

在 Google 試算表建立題庫時，欄位可直接比照標準格式（系統會自動根據標題名稱對應欄位）：

| 版本 | 年級 | 課別 | 重組詞塊(以斜線分隔) | 完整句子(解答) |
| :--- | :--- | :--- | :--- | :--- |
| 康軒 | 四年級 | 第1課 | 這盤 / 蕹菜 / 拄炒好 / 你 / 食看覓 | 這盤蕹菜拄炒好，你食看覓。 |
| 康軒 | 四年級 | 第1課 | 這馬 / 菜頭 / 當著時 / 你 / 食看覓 | 這馬菜頭當著時，你食看覓。 |
| 真平 | 三年級 | 第1課 | 透早起來 / 刷牙洗面 / 準備上學去 | 透早起來刷牙洗面準備上學去 |

> 💡 **提示**：詞塊之間可以使用斜線 `/` 或空白鍵隔開，系統會自動切成獨立的重組卡片。

---

## 🚀 如何讓 GitHub 網頁讀取您的試算表？

本遊戲支援兩種串接方式，建議使用 **方案一（最簡單）**：

### 方案一：直接使用 Google 試算表網址（推薦，免寫任何程式）
1. 打開您的 Google 試算表，點擊右上角 **「共用」**。
2. 在「一般存取權」將權限設為：**「知道連結的使用者」均可「檢視」**。
3. 複製試算表的瀏覽器網址（例如：`https://docs.google.com/spreadsheets/d/.../edit?gid=...`）。
4. 在遊戲網頁右上角點擊 **「⚙️ 題庫來源」**，貼上網址並點選「儲存並重新載入」即可！
   *(亦可在網址後方加上參數，如：`https://giotina-hung.github.io/taigi-word-reorder-game/?sheet=您的試算表網址`)*

### 方案二：部署 Google Apps Script Web App API
若希望透過 Google Apps Script 部署獨立 API：
1. 開啟試算表，點選頂部選單 **「擴充功能」** -> **「Apps Script」**。
2. 將本專案中的 [`Code.gs`](./Code.gs) 內容複製並貼到 Apps Script 編輯器中儲存。
3. 點擊右上角 **「部署」** -> **「新增部署作業」**。
4. 齒輪圖示選擇 **「網路應用程式 (Web App)」**：
   - **說明**：語詞重組題庫 API
   - **執行身分**：我 (您的 Google 帳戶)
   - **誰可以存取**：**任何人 (Anyone)**
5. 點選 **「部署」** 並複製產生的 **「網路應用程式網址 (Web App URL)」**。
6. 打開本遊戲網頁，點選右上角 **「⚙️ 題庫來源」**，貼上您的 Web App 網址儲存即可！

---

## 🛠️ 技術棧

- **Frontend**：HTML5, Vanilla JavaScript (ES6+), CSS3
- **CSS Framework**：[Tailwind CSS CDN](https://tailwindcss.com/)
- **Drag & Drop**：[SortableJS](https://sortablejs.github.io/Sortable/)
- **Audio Synthesis**：[Tone.js](https://tonejs.github.io/)
- **Cloud Backend**：Google Sheets API / Google Apps Script Web App
- **Deployment**：GitHub Pages

---

## 📄 授權條款

本專案採用 [MIT License](LICENSE) 授權，歡迎教育工作者自由分享與改編使用。
