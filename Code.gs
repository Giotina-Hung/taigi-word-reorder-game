/**
 * 語詞重組挑戰賽 - Google Apps Script 後端程式碼
 * 
 * 部署說明：
 * 1. 打開 Google 試算表（例如您的題庫試算表）
 * 2. 點擊頂部選單「擴充功能」 -> 「Apps Script」
 * 3. 將本程式碼全部複製並貼入編輯器中，覆蓋原有內容，然後點選「儲存 (磁碟圖示)」
 * 4. 點選右上角「部署」 -> 「新增部署作業」
 * 5. 點選齒輪圖示選擇「網路應用程式 (Web App)」：
 *    - 說明：語詞重組題庫 API
 *    - 執行身分：我 (您的 Google 帳號)
 *    - 誰可以存取：任何人 (Anyone)  <-- 非常重要！
 * 6. 點擊「部署」，完成後複製產生的「網路應用程式網址 (Web App URL)」
 * 7. （選用）若要在 GitHub 網頁直接指定此 API，打開網頁右上角「⚙️ 題庫來源」貼上儲存即可！
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
 * 自動根據標題列尋找：
 * - 「版本」(例如：康軒、真平)
 * - 「年級」(例如：三年級、四年級)
 * - 「課別」(例如：第1課、第2課)
 * - 「重組詞塊(以斜線分隔)」(例如：這盤 / 蕹菜 / 拄炒好 / 你 / 食看覓)
 * - 「完整句子(解答)」(例如：這盤蕹菜拄炒好，你食看覓。)
 */
function getSheetData() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  // 優先使用 gid=1894289031 的工作表，若找不到則使用目前啟用工作表
  let sheet = ss.getSheets().find(s => s.getSheetId() === 1894289031) || ss.getActiveSheet();
  const rows = sheet.getDataRange().getValues();
  
  if (rows.length <= 1) {
    return [];
  }

  // 取得標題列並動態尋找欄位位置
  const header = rows[0].map(h => String(h || '').trim());
  const colVersion = header.findIndex(h => h.includes('版本'));
  const colGrade = header.findIndex(h => h.includes('年級'));
  const colLesson = header.findIndex(h => h.includes('課別') || h.includes('課次'));
  const colChunks = header.findIndex(h => h.includes('重組詞塊') || h.includes('重組'));
  const colAnswer = header.findIndex(h => h.includes('完整句子') || h.includes('解答'));

  const result = [];
  
  // 從第 2 列開始讀取題目
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const version = String((colVersion !== -1 ? row[colVersion] : row[0]) || '').trim();
    const grade = String((colGrade !== -1 ? row[colGrade] : row[1]) || '').trim();
    const lesson = String((colLesson !== -1 ? row[colLesson] : row[2]) || '').trim();
    const chunks = String((colChunks !== -1 ? row[colChunks] : row[10]) || '').trim();
    const answer = String((colAnswer !== -1 ? row[colAnswer] : row[12]) || '').trim();

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
