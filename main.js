
const { app, BrowserWindow,Menu } = require("electron");
const path = require("path");
var win = null
async function createWindow() {
  win = new BrowserWindow({
    width: 1280,
    height: 768,

    icon: __dirname + "./src/Assets/Images/Icon.png",
    webPreferences: {
      preload: path.join(__dirname, "preloader.js"),
    },
  });
  await win.loadURL("http://192.168.0.99:71/GLOBAL/View/EPP_XXIII/");
}

app.whenReady().then(() => {
  createWindow();

  app.on("active", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

//TEMPLATE MENU
const templateMenu = [
  {
    label: 'Opções',
    submenu: [
      {
        label: 'Fechar',
        role: 'quit'
      }
    ]
  }
]
//Menu 
const menu = Menu.buildFromTemplate(templateMenu);
Menu.setApplicationMenu(menu);