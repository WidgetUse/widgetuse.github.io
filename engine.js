const fm = FileManager.iCloud();
const path = fm.joinPath(fm.documentsDirectory(), "widget_url.txt");
let imgUrl = "https://widgetuse.github.io/id1.png";
if (fm.fileExists(path)) {
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
  widget.presentSmall();
}
Script.complete();
