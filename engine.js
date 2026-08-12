const fm = FileManager.iCloud();

const scriptableDir = fm.documentsDirectory();
const shortcutsDir = scriptableDir.replace("iCloud~dk~simonbs~Scriptable", "iCloud~is~workflow~my~workflows");
const path = fm.joinPath(shortcutsDir, "wu/link.txt");

let imgUrl = "https://widgetuse.github.io/id1.png";

if (fm.fileExists(path)) {
  if (!fm.isFileDownloaded(path)) {
    await fm.downloadFileFromiCloud(path);
  }
  imgUrl = fm.readString(path).trim();
}

const req = new Request(imgUrl);
const image = await req.loadImage();

const widget = new ListWidget();
widget.backgroundColor = new Color("#0a0c10");

const wImg = widget.addImage(image);
wImg.centerAlign();

if (config.runsInWidget) {
  Script.setWidget(widget);
} else {
  await widget.presentSmall();
}

Script.complete();
