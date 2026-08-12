// 🚀 ПОВНИЙ КОД З ЧІТКИМ РОЗМІРОМ КАРТИНКИ

const widget = new ListWidget();
widget.backgroundColor = new Color("#0a0c10");

let imgUrl = "https://widgetuse.github.io/id1.png";

try {
  const fm = FileManager.iCloud();
  
  // 1. Шлях до Shortcuts/wu/link.txt
  const scriptableDir = fm.documentsDirectory();
  const shortcutsDir = scriptableDir.replace("iCloud~dk~simonbs~Scriptable", "iCloud~is~workflow~my~workflows");
  const path = fm.joinPath(shortcutsDir, "wu/link.txt");

  // 2. Читаємо URL з файлу
  if (fm.fileExists(path)) {
    if (!fm.isFileDownloaded(path)) {
      await fm.downloadFileFromiCloud(path);
    }
    const rawContent = fm.readString(path).trim().replace(/[\r\n\t]+/g, "");
    if (rawContent.length > 0) {
      imgUrl = rawContent;
    }
  }

  // 3. Качаємо картинку з GitHub
  const req = new Request(imgUrl);
  const image = await req.loadImage();
  
  // 4. 🔥 МАГІЯ ВИДНОСТІ: Додаємо спейсери та чіткий розмір!
  widget.addSpacer(); 
  
  const wImg = widget.addImage(image);
  wImg.centerAlign();
  wImg.imageSize = new Size(130, 130); // 👈 Фіксуємо розмір під Small віджет 2х2!
  
  widget.addSpacer();

} catch (err) {
  widget.addSpacer();
  const errTxt = widget.addText("❌ Не вдалося завантажити:\n" + imgUrl);
  errTxt.textColor = Color.red();
  errTxt.font = Font.boldSystemFont(9);
  widget.addSpacer();
}

// 5. Рендеримо UI
if (config.runsInWidget || config.runsFromShortcut) {
  Script.setWidget(widget);
} else {
  await widget.presentSmall();
}

Script.complete();
