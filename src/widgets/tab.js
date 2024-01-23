class Tabbar {
  
  constructor() {
    this.tabHolder = [];
    this.selectedIndex=-1;
    console.log("init tabbar");
  }

  addTab(id, text) {
    this.tabHolder.push([id, text]);
  }

  setTabProp(tag) {
    let style = {
      float: "left",
      position: "relative",
      display: "table-cell",
      transition: "all ease 0.3s",
      transform: "translate3d(0, 0, 0)",
      "font-size": "10px",

      "white-space": "nowrap",
      cursor: "pointer",
      "font-size": "14px",
      "font-weight": "400",
      "padding-bottom": "3px",
      "margin-left": "15px",
    };
    Object.assign(tag.style, style);
  }
  Settabspecial(active) {
    let style = {
      color: "#fff",
    };
    Object.assign(active.style, style);
  }

  setTabbarProp(element1) {
    let style = {
      height: "30px",
      display: "flex",

      "align-items": "center",

      // background: "#001c40",
      // width: "96.5%",
      // color: "#fff",
      // position:"fixed",
      // "z-index": "1",
      // "border-top": "2px solid #00193a",
    };
    Object.assign(element1.style, style);
  }
  selectTab(Id) {
    // var r = document.querySelector(':root');
    // var rs = getComputedStyle(r);
    // console.log("The value of --variable is: " + rs.getPropertyValue('--tabbar'));

    for (var i = 0; i < this.tabbar.childNodes.length; i++) {
      document.getElementById(this.tabHolder[i][0]).style.color = "#d5d7e4e7";
      document.getElementById(this.tabHolder[i][0]).style.borderBottom =
        "3px solid transparent";
    }
    for (var i = 0; i < this.tabbar.childNodes.length; i++) {
      if (Id == this.tabHolder[i][0]) {
        document.getElementById(this.tabHolder[i][0]).style.color = "#fff";
        document.getElementById(this.tabHolder[i][0]).style.borderBottom =
          "3px solid #fff";
      }
      this.selectedIndex=i;
    }
  }
  render(wrapper) {
    this.root = document.createElement("div");
    this.tabbar = document.createElement("div");
    this.setTabbarProp(this.root);
    for (let i = 0; i < this.tabHolder.length; i++) {
      this.tabbar.appendChild(document.createElement("a"));
      console.log(this.tabHolder);
      this.tabbar.childNodes[i].setAttribute("id", this.tabHolder[i][0]);
      this.tabbar.childNodes[i].text = this.tabHolder[i][1];

      this.setTabProp(this.tabbar.childNodes[i]);
    }
    this.root.appendChild(this.tabbar);

    wrapper.appendChild(this.root);
    this.selectTab(this.tabHolder[0][0]);

    var clickIntercepter = function (event) {
      this.selectTab(event.target.id);
      if (this.listner != undefined) {
        this.listner(event);
      } else console.log(this, "Tabbar:clickIntercepter - no listner");
    }.bind(this);
    for ( var i = 0; i < this.tabbar.childNodes.length; i++) {
      this.tabbar.childNodes[i].addEventListener("click", clickIntercepter);
    }
  }

  setTabbarOnClick(onclickListner) {
    console.log("onclick event", this, onclickListner);
    this.listner = onclickListner;
  }
  getSelectedTab(){
    return this.selectedIndex;
  }
}
