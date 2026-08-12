// 🚀 ПОВНИЙ І РОБОЧИЙ ДВИГУН ВІДЖЕТА ДЛЯ SCRIPTABLE

const widget = new ListWidget();
widget.backgroundColor = new Color("#0a0c10");

// Дефолтне посилання, якщо файл порожній або ще не створився
let imgUrl = "https://widgetuse.github.io/id1.png";

try {
  const fm = FileManager.iCloud();
  
  // 1. Переходимо в папку Shortcuts/wu/link.txt
  const scriptableDir = fm.documentsDirectory();
  const shortcutsDir = scriptableDir.replace("iCloud~dk~simonbs~Scriptable", "iCloud~is~workflow~my~workflows");
  const path = fm.joinPath(shortcutsDir, "wu/link.txt");

  // 2. Зчитуємо файл
  if (fm.fileExists(path)) {
    if (!fm.isFileDownloaded(path)) {
      await fm.downloadFileFromiCloud(path);
    }
    
    // Очищаємо URL від пробілів та некоректних символів
    const rawContent = fm.readString(path).trim().replace(/[\r\n\t]+/g, "");
    if (rawContent.length > 0) {
      imgUrl = rawContent;
    }
  }

  // 3. Качаємо PNG картинку з GitHub
  const req = new Request(imgUrl);
  const image = await req.loadImage();
  
  // 4. Малюємо картинку на віджеті
  const wImg = widget.addImage(image);
  wImg.centerAlign(); // 👈 centerAlign() для картинок

} catch (err) {
  // ⚠️ Фолбек: якщо 404 або немає інету — виводимо текст
  const errTxt = widget.addText("❌ Не вдалося завантажити:\n" + imgUrl);
  errTxt.textColor = Color.red();
  errTxt.font = Font.boldSystemFont(9);
  errTxt.centerAlign(); // 👈 ТУТ ТАКОЖ centerAlign(), А НЕ centerAligned()!
}

// 5. Рендеримо UI
if (config.runsInWidget || config.runsFromShortcut) {
  Script.setWidget(widget);
} else {
  await widget.presentSmall();
}

Script.complete();
