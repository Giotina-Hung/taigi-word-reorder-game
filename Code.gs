/**
 * 語詞重組挑戰賽 (Google Apps Script 後端程式碼)
 * 
 * 部署說明：
 * 1. 打開包含題庫的 Google 試算表
 * 2. 點擊頂部選單「擴充功能」 ->「Apps Script」
 * 3. 將本程式碼貼入「程式碼.gs (Code.gs)」中儲存
 * 4. 點選右上角「部署」 -> 「新增部署作業」
 * 5. 類型選擇「網路應用程式 (Web App)」
 *    - 說明：語詞重組題庫 API
 *    - 執行身分：我 (您的 Google 帳號)
 *    - 誰可以存取：任何人 (Anyone)
 * 6. 點擊「部署」，並複製產生的「網路應用程式網址 (Web App URL)」
 * 7. 將該網址貼入前端 index.html 的 API_URL 中即可！
 */

function doGet(e) {
  try {
    const data = getSheetData();
    // 回傳 JSON 格式題庫，支援 CORS 與 GitHub Pages 跨域讀取
    return ContentService.createTextOutput(JSON.stringify(data))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * 讀取試算表中的題庫資料
 * 預設讀取第一個工作表 (Sheet1)
 * 欄位結構（第 1 列為標題）：
 * A 欄: 版本 (例如: 真平、康軒、南一)
 * B 欄: 年級 (例如: 三年級、四年級)
 * C 欄: 課別 (例如: 第一課、第二課)
 * D 欄: 詞塊 (例如: 透早起來 / 刷牙洗面 / 準備上學，以斜線 / 或空格分隔)
 * E 欄: 正確句子 (例如: 透早起來刷牙洗面準備上學)
 */
function getSheetData() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getActiveSheet();
  const rows = sheet.getDataRange().getValues();
  
  if (rows.length <= 1) {
    return [];
  }

  const result = [];
  
  // 從第 2 列開始讀取（略過標題列）
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const version = String(row[0] || '').trim();
    const grade = String(row[1] || '').trim();
    const lesson = String(row[2] || '').trim();
    const chunks = String(row[3] || '').trim();
    const answer = String(row[4] || '').trim();

    // 必須包含詞塊與答案才算有效題目
    if (chunks && answer) {
      result.push({
        version: version || '通用',
        grade: grade || '不分年級',
        lesson: lesson || '一般練習',
        chunks: chunks,
        answer: answer
      });
    }
  }

  return result;
}
