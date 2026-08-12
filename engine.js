
const fm = FileManager.iCloud();
const path = fm.joinPath(fm.documentsDirectory(), "widget_url.txt");

let imgUrl = "https://widgetuse.github.io/id1.png";

if (fm.fileExists(path)) {
  const savedUrl = fm.readString(path).trim();
  if (savedUrl.length > 0) {
    imgUrl = savedUrl;
  }
}

const widget = new ListWidget();
widget.backgroundColor = new Color("#0a0c10");

try {
  const req = new Request(imgUrl);
  const image = await req.loadImage();
  
  const wImg = widget.addImage(image);
  wImg.centerAlign();
  wImg.imageSize = new Size(130, 130);
} catch (e) {
  const errorText = widget.addText("⚠️ Картинку не знайдено");
  errorText.textColor = Color.red();
  errorText.centerAlign();
  errorText.font = Font.boldSystemFont(12);
}
if (config.runsInWidget) {
  Script.setWidget(widget);
} else {
  await widget.presentSmall(); 
}

Script.complete();
