// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain, Menu, webContents } = require("electron");
const path = require("path");
const { screen } = require("electron");
const { Console, error } = require("console");
const nodePath = require("path");
const fetch = require("node-fetch");
const CryptoJS = require("crypto-js");

const remote = require("electron").remote;
const electronDialog = require("electron").dialog;
const XLSX = require("xlsx");
const {
  setupTitlebar,
  attachTitlebarToWindow,
} = require("custom-electron-titlebar/main");

var fs = require("fs");
const EOL = require("os").EOL;
const url = require("url");
const Store = require("electron-store");
Store.initRenderer();
let CWD = process.cwd();

// const isDev = require("electron-is-dev");
// if (!isDev) {
//   const chromePath = require("puppeteer").executablePath();
//   const exePath = path.dirname(app.getPath("exe"));

//   // process.cwd() returns '/' on unix from executable
//   if (process.platform !== "win32" && process.cwd() !== exePath) {
//     CWD = exePath;
//     process.chdir(CWD);
//   }
//   console.log("path of the app=>", CWD);

//   // get correct path to chrome executable when running on compiled electron app
//   process.env.extensions_chromePdf_launchOptions_executablePath = path.join(
//     CWD,
//     chromePath.slice(chromePath.indexOf("node_modules"))
//   );
// }
const rootDir = process.platform === "darwin" ? __dirname : CWD;

const jsreport = require("jsreport")({
  rootDirectory: rootDir,
});

setupTitlebar();
try {
  require("electron-reloader")({ ignored: /<report.pdf>|[\/\\]\./ });
} catch (_) {}

let w,
  h,
  index = 0;

let windows = new Set();
let mainWindow;
let login;
function createWindow() {
  console.log("index value=>", index);
  if (index == 0) {
    login = new BrowserWindow({
      width: 1500,
      height: 1000,
      transparent: false,
      frame: false,
      webPreferences: {
        nodeIntegration: true,
        preload: nodePath.join(__dirname, "preload.js"),
      },
    });
    login.loadFile("src/app.html");
    login.center();
    login.show();
    index++;
    login.webContents.setWindowOpenHandler(({ url }) => {
      return {
        action: "allow",
        overrideBrowserWindowOptions: {
          webPreferences: {
            preload: nodePath.join(__dirname, "preload.js"),
          },
        },
      };
    });
  }

  mainWindow = new BrowserWindow({
    width: 700,
    height: 600,
    show: false,
    frame: false,
    titleBarStyle: "hidden",
    webPreferences: {
      nodeIntegrationInSubFrames: true,
      nodeIntegration: true,
      preload: nodePath.join(__dirname, "preload.js"),
      minimumFontSize: 12,
      defaultFontSize: 16,
      defaultMonospaceFontSize: 16,
      sandbox: false,
      // fullscreen: true,
    },
  });
  const menu = Menu.buildFromTemplate(exampleMenuTemplate());
  Menu.setApplicationMenu(menu);

  attachTitlebarToWindow(mainWindow);

  mainWindow.on("closed", () => {
    windows.delete(mainWindow);
    mainWindow = null;
  });
  windows.add(mainWindow);
  console.log("winodes", windows);
  return mainWindow;
}

ipcMain.on("openmainwindow", function (event, url) {
  // Create the browser window.
  createWindow();
  try {
    mainWindow.loadFile(url).then(() => {
      let dime = {
        renderer: {
          key1: w,
          key2: h,
        },
      };
      mainWindow.webContents.send("senddime", dime.renderer);
    });
  } catch {
    console.log("error", error);
  }
  mainWindow.once("ready-to-show", () => {
    mainWindow.center();
    // mainWindow.maximize();
    mainWindow.show();
    mainWindow.webContents.setWindowOpenHandler(({ url }) => {
      return {
        action: "allow",
        overrideBrowserWindowOptions: {
          webPreferences: {
            preload: nodePath.join(__dirname, "preload.js"),
          },
        },
      };
    });
  });
});
ipcMain.on("setLogin", function (event, email, pass) {
  console.log("email,pass,key", email, pass);

  // let sdata = JSON.stringify(logdata);
  // fs.writeFileSync("data/data.json", sdata);
  // console.log("data saved")

  var url = "http://13.233.118.68:2093/api/v1/users/login";

  fetch(url, {
    method: "POST",
    // url: 'https://catfact.ninja/fact',
    body: JSON.stringify({
      email: email,
      password: pass,
    }),

    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);

      var log_keys = [];
      const key = "poweta";
      // var token_i = CryptoJS.AES.decrypt(data.token, key);
      // var data0 = token_i.toString(CryptoJS.enc.Utf8);
      log_keys.push([{ token: data[0] }]);

      for (let i = 0; i < data[1].length; i++) {
        var key_i = CryptoJS.AES.decrypt(data[1][i][0], key);
        var data1 = key_i.toString(CryptoJS.enc.Utf8);
        var db_i = CryptoJS.AES.decrypt(data[1][i][1], key);
        var data2 = db_i.toString(CryptoJS.enc.Utf8);
        log_keys.push([{ key: data1 }, { db: data2 }]);
      }
      console.log("response key=>", log_keys);

      event.sender.send("SetLogin", log_keys);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
ipcMain.on("setKey", function (event, token, key) {
  console.log("key in appjs", token, key);
  var logdata = [];
  // logdata.push({ email: email }, { password: pass }, { key: key });
  // console.log("data array in appjs", logdata);
  var url = "http://13.233.118.68:2093/api/v1/users/tokenloginkey";

  fetch(url, {
    method: "POST",
    // url: 'https://catfact.ninja/fact',
    body: JSON.stringify({
      token: token,
      key: key,
    }),

    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success in key:", data);
      const key1 = "poweta";
      const bytes = CryptoJS.AES.decrypt(data[0], key1);
      console.log("bytes1", bytes);
      const bytes1 = CryptoJS.AES.decrypt(data[1], key1);
      const bytes2 = CryptoJS.AES.decrypt(data[2], key1);
      console.log("bytessssssssss", bytes2);
      const data0 = bytes.toString(CryptoJS.enc.Utf8);
      const data1 = bytes1.toString(CryptoJS.enc.Utf8);
      const data2 = bytes2.toString(CryptoJS.enc.Utf8);
      console.log("decrypted data", data0, data1, data2);
      var datas = [];
      datas.push(data0, data1, data2);
      event.sender.send("setKey", datas);
    });
});
//============================================================
//invoce printing

ipcMain.on("render-start", async (event, args, temp) => {
  appLog("info", "initializing reporter..");
  console.log("valuesdddddddddd", args);
  try {
    // we defer jsreport initialization on first report render
    // to avoid slowing down the app at start time
    if (!jsreport._initialized) {
      await jsreport.init();
      appLog("info", "jsreport started");
    }

    appLog("info", "rendering report..");

    try {
      const resp = await jsreport.render({
        template: {
          content: fs.readFileSync(path.join(__dirname, temp)).toString(),
          engine: "handlebars",
          recipe: "chrome-pdf",
          // helpers:
          // "function inWords(num) {var a = ['','one ','two ','three ','four ', 'five ','six ','seven ','eight ','nine ','ten ','eleven ','twelve ','thirteen ','fourteen ','fifteen ','sixteen ','seventeen ','eighteen ','nineteen ']; var b = ['', '', 'twenty','thirty','forty','fifty', 'sixty','seventy','eighty','ninety'];if ((num = num.toString()).length > 9) return 'overflow'; n = ('000000000' + num).substr(-9).match(/^(d{2})(d{2})(d{2})(d{1})(d{2})$/);if (!n) return; var str = '';str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore ' : '';str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh ' : '';str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand ' : '';str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred ' : '';str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + 'only ' : '';return str;} ",
        },
        data: args,
      });

      appLog("info", "report generated");

      fs.writeFileSync(path.join(CWD, "report.pdf"), resp.content);

      const pdfWindow = new BrowserWindow({
        width: 1024,
        height: 800,
        webPreferences: {
          parent: mainWindow,
          plugins: true,
        },
      });

      pdfWindow.loadURL(
        url.format({ pathname: path.join(CWD, "report.pdf"), protocol: "file" })
      );

      event.sender.send("render-finish", {});
    } catch (e) {
      appLog("error", `error while generating or saving report: ${e.stack}`);
      event.sender.send("render-finish", { errorText: e.stack });
    }
  } catch (e) {
    appLog("error", `error while starting jsreport: ${e.stack}`);
    app.quit();
  }
});

process.on("uncaughtException", (err) => {
  appLog("error", `Uncaught error: ${err.stack}`);
  throw err;
});
function appLog(level, message) {
  const origMsg = message;

  message += EOL;

  if (level === "info") {
    console.log(origMsg);
    fs.appendFileSync(path.join(CWD, "app-info.log"), message);
  } else if (level === "error") {
    console.error(origMsg);
    fs.appendFileSync(path.join(CWD, "app-error.log"), message);
  }
}

//===================================================================

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  console.log(width, height);
  w = width;
  h = height;

  createWindow();
});

//   app.on("activate", () => {
//     // On macOS it's common to re-create a window in the app when the
//     // dock icon is clicked and there are no other windows open.
//     if (BrowserWindow.getAllWindows().length === 0) createWindow();
//   });
// });

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
app.on("activate", () => {
  if (windows.size === 0) {
    createWindow();
  }
});
ipcMain.on("Exceldata", function (event, workbook) {
  console.log("workbook=>", workbook);

  async function exportfile() {
    console.log("entered function");
    /* show Save As dialog */
    var result = await electronDialog.showSaveDialog({
      title: "Save file as",
      filters: [
        {
          name: "Spreadsheets",
          extensions: ["xlsx", "xls", "xlsb"],
        },
      ],
    });
    /* write file */

    XLSX.writeFile(workbook, result.filePath);
  }
  exportfile(workbook);
});
ipcMain.on("ExcelImportClick", function (event) {
  /*import data*/
  console.log("inside immport in app.js");
  var sheetdata1;

  async function importfile() {
    console.log("import function called");
    const result = await electronDialog.showOpenDialog({
      title: "Select a file",
      filters: [
        {
          name: "Spreadsheets",
          extensions: ["xlsx", "xls", "xlsb" /* ... other formats ... */],
        },
      ],
    });
    /* result.filePaths is an array of selected files */
    if (result.filePaths.length == 0) throw new Error("No file was selected!");
    var importdata = XLSX.readFile(result.filePaths[0]);
    const sheetData = XLSX.utils.sheet_to_json(
      importdata.Sheets[importdata.SheetNames[0]],
      {
        header: 0,
        defval: "",
      }
    );

    var sheetArray1 = Object.entries(sheetData);
    console.log("import array to be send to preload", importArray);

    event.reply("ExcelImportClick", sheetArray1);
  }
  importfile();
  console.log("sheeetdataaaa1", sheetdata1);
});
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
const exampleMenuTemplate = () => [
  {
    label: "File",
    submenu: [
      {
        label: "Quit",
        click: () => app.quit(),
      },
    ],
  },
  {
    label: "Options",
  },
  {
    label: "&View",
    submenu: [
      { role: "reload" },
      { role: "forceReload" },
      { type: "separator" },
      { role: "zoomIn" },
      { role: "zoomOut" },
      { role: "resetZoom" },
      { role: "toggleDevTools" },
    ],
  },
];
