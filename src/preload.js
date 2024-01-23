// Import the necessary Electron modules
const contextBridge = require("electron").contextBridge;
const { ipcMain, shell } = require("electron");
const ipcRenderer = require("electron").ipcRenderer;
const { remote } = require("electron");
const { PowerQuery } = require("./firework/powerQuery");
const { MqttAdapter } = require("./firework/mqttAdapter");
const fs = require("fs");
const {
  LABOUR_EXPENSE,
  PROJECT_EXPENSE,

  LABOUR_PENDING,
  PROJECT_PENDING,
  PURCHASE_ORDER,
  STOCK_DATA,
  LABOUR_SITE,
  PURCHASE_ORDER_HOME,
  PURCHASE_ORDER_ITEM,
  LABOUR_INSERT,
  LABOUR_FORM,
  PLOTTY_DATA,
} = require("./expense/labour/labourPqs");
const { Titlebar, Color } = require("custom-electron-titlebar");
const path = require("path");
const { EventEmitter } = require("stream");
const { Context } = require("ag-grid-community");
const XLSX = require("xlsx");
const Store = require("electron-store");

const store = new Store();

var titlebar;
ipcRenderer.send("getDime");
console.log("Binding powerquery");
contextBridge.exposeInMainWorld("loginAPI", {
  setLogin: (email, pass, fn) => {
    console.log("login details", email, pass);
    ipcRenderer.send("setLogin", String(email), String(pass));
    ipcRenderer.on("SetLogin", (event, data0) => {
      console.log("logindata in preload", data0);
      store.set("token", data0[0][0].token);
      for (let i = 1; i < data0[1].length; i++) {
        store.set("key", data0[i][0].key);
        store.set("db", data0[i][1].db);
      }
      var callback = fn;
      callback(data0);
    });
  },
  setKey: (key, fn) => {
    console.log("login key=>", key);
    ipcRenderer.send("setKey", String(key[0]), String(key[1]));
    ipcRenderer.on("setKey", (event, data) => {
      store.set("res1", data[0]);
      store.set("res2", data[1]);
      store.set("res3", data[2]);
      var callback = fn;
      callback(data);
    });
  },
});

pq = new PowerQuery(
  new MqttAdapter(store.get("res1"), store.get("res2"), store.get("res3"))
);

// EventEmitter.send("data", first_data);
// ipcMain.send("data", first_data);

//==========================================
window.addEventListener("DOMContentLoaded", () => {
  titlebar = new Titlebar({
    backgroundColor: Color.fromHex("#105389"),
    //itemBackgroundColor: Color.fromHex("#ffffff"),
    svgColor: Color.WHITE,
    icon: path.join(__dirname, "/assets/images", "/powerta-icon-32.svg "),
    //menuPosition: 'bottom',
    //menu: null // = do not automatically use Menu.applicationMenu
    menuTransparent: 80,
  });

  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  for (const type of ["chrome", "node", "electron"]) {
    replaceText(`${type}-version`, process.versions[type]);
  }
});
// Exposed protected methods in the render process
contextBridge.exposeInMainWorld(
  // Allowed 'ipcRenderer' methods
  "bridge",
  {
    // From main to render
    senddime: (message) => {
      ipcRenderer.on("senddime", message);
    },
    senddata: (message) => {
      ipcRenderer.on("senddata", message);
    },
  }
);

contextBridge.exposeInMainWorld("electronAPI", {
  setTitle: (title) => {
    titlebar.updateTitle(title);
  },

  openmainhtml: (title) => {
    console.log("title");
    ipcRenderer.send("openmainwindow", String(title));
  },

  openmainwindow: (title) => {
    console.log("title");
    ipcRenderer.send("openmainwindow", String(title));
  },
  generatePdf: (args, temp) => {
    ipcRenderer.send("render-start", args, temp);
  },
  handleCounter: (callback) => ipcRenderer.on("update-counter", callback),
  openchildwindow: (title) => {
    ipcRenderer.send("openchildwindow", String(title));
  },

  openPurchaseOrder: (title) => {
    ipcRenderer.send("openPurchaseOrder", String(title));
  },
  openPurchaseBill: (title, data) => {
    ipcRenderer.send("openPurchaseBill", String(title), String(data));
  },
  openPurchaseBillMain: (title) => {
    ipcRenderer.send("openPurchaseBillMain", String(title));
  },

  openPurchaseReturn: (title) => {
    ipcRenderer.send("openPurchaseReturn", String(title));
  },
  openquotation: (title) => {
    ipcRenderer.send("openquotation", String(title));
  },
  openGstinvoice: (title) => {
    ipcRenderer.send("openGstinvoice", String(title));
  },
  openChild: (title) => {
    ipcRenderer.send("openchild", String(title));
  },
});

//data transfer contextbridge
contextBridge.exposeInMainWorld("MainDatastream", {
  //labour datatransfer
  streamLabourExpense: (fn, context) => {
    pq.getStream(LABOUR_EXPENSE, fn, context);
  },
  streamlaboursitelist: (fn) => {
    pq.getStreamOnce(LABOUR_SITE, fn);
  },
  streamPay: (fn, context) => {
    pq.getStream(PLOTTY_DATA, fn, context);
  },
  streamLabourPending: (fn, context) => {
    pq.getStream(LABOUR_PENDING, fn, context);
  },

  streamLabourAddExpense: (query, value, fn) => {
    pq.writeStream(query, value, fn);
    console.log(query);
  },
  streamLabourAddExpenseInsert: (fn, context) => {
    pq.getStream(LABOUR_INSERT, fn, Context);
  },
  streamLabourAddExpense: (fn, context) => {
    pq.getStream(LABOUR_FORM, fn, Context);
  },
  streamLabourAddExpenseValue: (query, value, fn) => {
    pq.writeStream(query, value, fn);
    console.log(query);
  },
  streamCashInHand: (query, value, fn) => {
    pq.writeStream(query, value, fn);
    console.log(query);
  },
  streamPayOut: (query, value, fn) => {
    pq.writeStream(query, value, fn);
    console.log(query);
  },
  streamADDACCOUNT: (query, value, fn) => {
    pq.writeStream(query, value, fn);
    console.log(query);
  },
  //project datatransfer
  streamprojectview: (fn, context) => {
    pq.getStream(PROJECT_EXPENSE, fn, context);
  },
  // streamprojectsitelist: (fn) => {
  //   pq.getStreamOnce(LABOUR_EXPENSE, fn);
  // },
  streamProjectAddsite: (query, value, fn) => {
    pq.writeStream(query, value, fn);
    console.log(query);
  },
  streamProjectButtonClick: (query, value, fn) => {
    pq.writeStream(query, value, fn);
    console.log(query);
  },
  streamProjectAddExpense: (query, value, fn) => {
    pq.writeStream(query, value, fn);
    console.log(query);
  },
  streamProjectPending: (fn, context) => {
    pq.getStream(PROJECT_PENDING, fn, context);
  },
  //purchase datatransfer
  streampurchaseview: (fn, context) => {
    pq.getStream(PURCHASE_ORDER, fn, context);
  },
  streampurchasepartyview: (fn) => {
    pq.getStream(PURCHASE_ORDER, fn);
  },
  streampurchasehomeview: (fn) => {
    pq.getStream(PURCHASE_ORDER_HOME, fn);
  },
  streamconvertbill: (query, value, fn) => {
    pq.writeStream(query, value, fn);
  },
  streamAddBill: (query, fn) => {
    pq.getStream(query, fn);
  },
  streamPayAdd: (query, fn) => {
    pq.getStream(query, fn);
  },
  streampurchasegetdata: (query, fn) => {
    pq.getStream(query, fn);
  },
  streamAddPurchaseOrder: (query, value, fn) => {
    pq.writeStream(query, value, fn);
  },
  streampurchaseAdditem: (fn) => {
    pq.getStream(PURCHASE_ORDER_ITEM, fn);
  },
  streamquotationhomeview: (fn) => {
    pq.getStream(QUOTATION_HOME, fn);
  },
  streamGetData: (query, fn) => {
    pq.getStream(query, fn);
  },
  //stock datatransfer
  streamstockview: (fn) => {
    pq.getStream(STOCK_DATA, fn);
  },
  streamAddStock: (query, value, fn) => {
    pq.writeStream(query, value, fn);
  },

  streamstockview: (fn) => {
    pq.getStream(STOCK_DATA, fn);
  },

  streamstocksitelist: (fn) => {
    pq.getStreamOnce(STOCK_LIST, fn);
  },

  // streamstocksitelist: (fn) => {
  //   pq.getStreamOnce(STOCK_LIST, fn);
  // },
  //employee datatransfer
  streamemployeeview: (querry, fn) => {
    pq.getStream(querry, fn);
  },
  streamAddEmloyee: (query, value, fn) => {
    pq.writeStream(query, value, fn);
    console.log(query);
  },

  //maincontextbridges
  streamAddData: (query, value, fn) => {
    pq.writeStream(query, value, fn);
    console.log(query);
  },
  streamGetData: (query, fn) => {
    pq.getStream(query, fn);
    console.log(query);
  },
  streamGetDataOnce: (query, fn) => {
    pq.getStreamOnce(query, fn);
    console.log(query);
  },
});
contextBridge.exposeInMainWorld("ExcelDatastream", {
  Exceldata: (data, header) => {
    console.log("excel data =>", data);
    // const aoa = await connection.query(`SELECT * FROM labour_account`).rows;
    const worksheet = XLSX.utils.json_to_sheet(data, []);
    console.log("worksheet=>", worksheet);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.sheet_add_aoa(worksheet, header);

    console.log("workbook=>", workbook);
    XLSX.utils.book_append_sheet(workbook, worksheet, "labour");
    ipcRenderer.send("Exceldata", workbook);
  },

  ExcelImportClick: (fn) => {
    console.log("inside import function in preload");
    ipcRenderer.send("ExcelImportClick");
    ipcRenderer.on("ExcelImportClick", (event, data) => {
      console.log("imported data in preload", data);
      var callback = fn;
      callback(data);
    });
    // ipcRenderer.invoke("ExcelImportClick").then((result) => {
    //   console.log("imported data in preload", result);
    //   var callback = fn;
    //   callback(result);
    // });
  },
});
contextBridge.exposeInMainWorld("DriveDatastream", {
  DriveClick: (fn) => {
    console.log("inside drive click in preload");
    shell.openExternal("http://drive.google.com");
  },
});
