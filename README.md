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
5. **Google 試算表雲端題庫串接**：
   - 支援透過 Google Apps Script Web App 讀取 Google Sheet 雲端題庫。
   - 內建離線範例題庫（涵蓋真平、康軒、南一各版本），未設定 API 亦能立即暢玩！

---

## 📋 Google 試算表題庫格式

在 Google 試算表建立題庫時，請在第一個工作表中依下列欄位排列（第 1 列為欄位名稱，第 2 列起為題目資料）：

| A: 版本 | B: 年級 | C: 課別 | D: 詞塊 (重組字卡) | E: 正確答案 (完整句子) |
| :--- | :--- | :--- | :--- | :--- |
| 真平 | 三年級 | 第一課 歡喜來讀冊 | 透早起來 / 刷牙洗面 / 準備上學去 | 透早起來刷牙洗面準備上學去 |
| 真平 | 三年級 | 第一課 歡喜來讀冊 | 老師好 / 同學逐家早 / 請入去坐 | 老師好同學逐家早請入去坐 |
| 康軒 | 四年級 | 第一課 大自然之美 | 天頂的日頭 / 熾佮像火球 / 真熱 | 天頂的日頭熾佮像火球真熱 |
| 南一 | 三年級 | 第一課 學校好所在 | 阮的學校 / 有真濟大樹 / 閣有大草地 | 阮的學校有真濟大樹閣有大草地 |

> 💡 **提示**：詞塊之間可以使用斜線 `/` 或空白鍵隔開，系統會自動切成獨立的重組卡片。

---

## 🚀 部署自己的 Google 試算表 API

若想使用您自己的 Google 試算表題目，請參考以下步驟：

1. 開啟您的 Google 試算表，點選頂部選單 **「擴充功能」** -> **「Apps Script」**。
2. 將本專案中的 [`Code.gs`](./Code.gs) 內容複製並貼到 Apps Script 編輯器中儲存。
3. 點擊右上角 **「部署」** -> **「新增部署作業」**。
4. 齒輪圖示選擇 **「網路應用程式 (Web App)」**：
   - **說明**：語詞重組題庫 API
   - **執行身分**：我 (您的 Google 帳戶)
   - **誰可以存取**：**任何人 (Anyone)**
5. 點選 **「部署」** 並複製產生的 **「網路應用程式網址 (Web App URL)」**。
6. 打開本遊戲網頁，點選右上角 **「⚙️ 題庫來源」**，貼上您的 Web App 網址並儲存即可！

---

## 🛠️ 技術棧

- **Frontend**：HTML5, Vanilla JavaScript (ES6+), CSS3
- **CSS Framework**：[Tailwind CSS CDN](https://tailwindcss.com/)
- **Drag & Drop**：[SortableJS](https://sortablejs.github.io/Sortable/)
- **Audio Synthesis**：[Tone.js](https://tonejs.github.io/)
- **Cloud Backend**：Google Apps Script (Web App API)
- **Deployment**：GitHub Pages

---

## 📄 授權條款

本專案採用 [MIT License](LICENSE) 授權，歡迎教育工作者自由分享與改編使用。
