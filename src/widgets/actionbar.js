// const { Color } = require("custom-electron-titlebar");

class Actionbar {
  constructor() {
    this.iconHolder = [];
    console.log("init actiobar");
  }

  addIcon(id, image, title) {
    this.iconHolder.push([id, image, title]);
  }

  setIconProp(img) {
    let style = {
      float: "left",
      "background-position": "center",
      width: "31px",
      padding: "4px",
      "border-radius": "100%",
      transition: "background 0.2s",
      cursor: "pointer",
      "margin-left": "9px",

      "border-radius": "100%",
    };
    Object.assign(img.style, style);
  }
  setToolbarProp(element) {
    let style = {
      height: "30px",
      display: "flex",

      "align-items": "center",
      // background: "#001c40",
      // width: "96.5%",
      //  color: "#fff",
      //  position:"fixed",
      // "z-index": "1",
      // "border-top": "2px solid #00193a",
    };
    Object.assign(element.style, style);
  }
  hoverchild(hover) {
    let style = {
      color: "blue",
    };
    Object.assign(hover.style, style);
  }

  render(wraper) {
    this.root = document.createElement("div");
    this.toolbar = document.createElement("div");
    this.setToolbarProp(this.root);
    for (let i = 0; i < this.iconHolder.length; i++) {
      this.toolbar.appendChild(document.createElement("img"));

      this.toolbar.childNodes[i].setAttribute("id", this.iconHolder[i][0]);
      this.toolbar.childNodes[i].src = this.iconHolder[i][1];
      this.toolbar.childNodes[i].title = this.iconHolder[i][2];

      this.setIconProp(this.toolbar.childNodes[i]);
      this.toolbar.childNodes[i].onmouseover = this.hoverchild(
        this.toolbar.childNodes[i]
      );
    }
    this.root.appendChild(this.toolbar);
    var hovereffect =
      "#header img:hover{ background: #92a8d1 radial-gradient(circle, transparent 1%, #c3c8cf 1%)center/15000%; }";
    var rippleeffect =
      "#header img:active{background-color: #000e20;background-size: 100%;transition: background 0s; }";
    var style = document.createElement("style");
    //TODO render tab

    style.appendChild(document.createTextNode(hovereffect));
    style.appendChild(document.createTextNode(rippleeffect));
    document.getElementsByTagName("body")[0].appendChild(style);
    wraper.appendChild(this.root);
  }

  setToolbarOnClick(onclickListner) {
    console.log("onclick event", onclickListner);
    for (var i = 0; i < this.toolbar.childNodes.length; i++) {
      this.toolbar.childNodes[i].addEventListener("click", onclickListner);
    }
  }
}
