
const { app, BrowserWindow } = require("electron");
const path = require("path");

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 768,

    icon:__dirname+"./src/Assets/Images/Icon.png",
    webPreferences: {
      preload: path.join(__dirname, "preloader.js"),
    },
  });
  win.loadURL("http://192.168.0.99:71/GLOBAL/View/EPP_XXIII/#/login");
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