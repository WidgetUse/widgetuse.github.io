
const widget = new ListWidget();
widget.backgroundColor = new Color("#0a0c10");

let imgUrl = "https://widgetuse.github.io/id1.png";

try {
  const fm = FileManager.iCloud();
  
  const scriptableDir = fm.documentsDirectory();
  const shortcutsDir = scriptableDir.replace("iCloud~dk~simonbs~Scriptable", "iCloud~is~workflow~my~workflows");
  const path = fm.joinPath(shortcutsDir, "wu/link.txt");

  if (fm.fileExists(path)) {
    if (!fm.isFileDownloaded(path)) {
      await fm.downloadFileFromiCloud(path);
    }
  
    const rawContent = fm.readString(path).trim().replace(/[\r\n\t]+/g, "");
    if (rawContent.length > 0) {
      imgUrl = rawContent;
    }
  }

  const req = new Request(imgUrl);
  const image = await req.loadImage();
  
  const wImg = widget.addImage(image);
  wImg.centerAlign(); 

} catch (err) {
  const errTxt = widget.addText("❌:\n" + imgUrl);
  errTxt.textColor = Color.red();
  errTxt.font = Font.boldSystemFont(9);
  errTxt.centerAligned(); 
}

if (config.runsInWidget || config.runsFromShortcut) {
  Script.setWidget(widget);
} else {
  await widget.presentSmall();
}

Script.complete();
