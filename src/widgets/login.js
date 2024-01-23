class login {
  constructor() {
    this.loginData = [];
    console.log("init login");
  }

  addData(data) {
    this.loginData = [...data];
    console.log("login data in loginjs", this.loginData);
  }

  setRootDiv(root) {
    let style = {
      display: "flex",
      "justify-content": "center",
      "column-gap": "10px",
      width: "800px",
      height: "150px",
      // "grid-template-columns": "200px auto 200px auto",
      // "grid-template-rows": "repeat(5,200px)",
      // "grid-template-columns": "repeat(5, 200px)",
    };
    let style1 = {
      display: "inline",
    };
    Object.assign(root.style, style);
    // Object.assign(checkbox.style, style);
  }

  setCardProp(submit) {
    let style = {
      width: "124px",
      height: "170px",
      "box-shadow": "0 0 5px rgb(0 0 0 / 10%)",
      "border-radius": "5px",

      "align-items": "center",
      "font-family": "Arial,sans-sarif",
      display: "block",
      "border-width": "1px",
      "border-style": "solid",
      "border-color": "#3f373782",
      ":hover": {
        "background-color": "#2b4364",
      },
    };
    let style1 = {
      display: "none",
    };
    Object.assign(submit.style, style);
    // Object.assign(signin.style, style1);
  }
  setOrgTxt(span) {
    let style = {
      "font-size": "14px",
      "font-weight": 400,
      "margin-bottom": "10px",
      "margin-top": "10px",
      "font-family": "'Segoe UI', Tahoma, Geneva,Verdana,sans-serif",
    };
    Object.assign(span.style, style);
  }

  getKey(key) {
    window.loginAPI.setKey(key, (data) => {
      console.log("key at loginjs", data);
      if (data[0] != "undefined" && data[1] != "undefined") {
        // document.getElementById("AppCards").style.display = "block";
        // document.getElementById("body2").style.display = "none";
        // window.open(
        //   "./src/app.html?data=" +
        //   encodeURIComponent(JSON.stringify(data)),
        //   "_blank",
        //   "resizable=no,frame=0"
        // );

      }
    });
  }
  // hoverchild(hover) {
  //   let style = {
  //     "border-color": "aliceblue",
  //   };
  //   Object.assign(hover.style, style);
  // }
  renderSpan(wrapper) {
    let style = {
      display: "block",
    };

    Object.assign(wrapper.style, style);
  }
  unrenderSpan(span) {
    let style = {
      display: "none",
    };
    Object.assign(span.style, style);
  }
  render(wrapper) {
    console.log(
      "inside render function",
      this.loginData[0][0].token,
      this.loginData
    );
    this.root = document.createElement("div");
    this.root.id = "root";
    this.setRootDiv(this.root);
    var OrgName = ["Org-0", "Org-1", "Org-2", "Org-3", "Org-4", "Org-5"];
    var Orgimg = [
      "../assets/images/org1.png",
      "../assets/images/org2.png",
      "../assets/images/org3.png",
      "../assets/images/org4.png",
      "../assets/images/org5.png",
    ];
    for (let i = 1; i < this.loginData.length; i++) {
      var newCard = document.createElement("div");
      // newCheckBox.type = "checkbox";
      newCard.id = "card" + i;
      newCard.className = "DbCard";
      var newcardval = [];
      newcardval.push(this.loginData[0][0].token, this.loginData[i][0].key);
      newCard.value = newcardval; // need unique Ids!

      this.setCardProp(newCard);
      // this.root.childNodes[i].onmouseover = this.hoverchild(this.root.childNodes[i]);
      var Orgtxt = document.createElement("div");
      Orgtxt.id = "name" + i;
      Orgtxt.innerText = this.loginData[i][1].db;
      this.setOrgTxt(Orgtxt);
      Orgtxt.value = this.loginData[i][0].key;

      var OrgImg = document.createElement("img");
      OrgImg.src = Orgimg[i];
      OrgImg.value = this.loginData[i][0].key; // newCheckBox.name = this.loginData[i][1].db;
      // newCheckBox.value = this.loginData[i][0].key;+

      // var labelbox = document.createElement("label");
      // labelbox.innerHTML = this.loginData[i][1].db;
      // this.setCheckBoxProp(newCheckBox, labelbox)
      newCard.appendChild(Orgtxt);
      newCard.appendChild(OrgImg);
      this.root.appendChild(newCard);

      // this.root.appendChild(labelbox);
      wrapper.appendChild(this.root);
    }
    // var submit = document.getElementById("submit_btn");
    // var signIn = document.getElementById("login-button");
    // this.setSubmitProp(submit, signIn);
    // console.log("Checked Values:", checkedValues);
  }
  renderOne(wrapper, data) {
    var newCard = document.createElement("div");
    // newCheckBox.type = "checkbox";
    newCard.id = data[0];
    // var newcardval = [];
    // newcardval.push(this.loginData[0][0].token, this.loginData[i][0].key)
    // newCard.value = newcardval;// need unique Ids!

    this.setCardProp(newCard);

    // this.root.childNodes[i].onmouseover = this.hoverchild(this.root.childNodes[i]);
    var Orgtxt = document.createElement("div");
    Orgtxt.id = data[0];
    Orgtxt.innerText = data[0];
    this.setOrgTxt(Orgtxt); // newCheckBox.name = this.loginData[i][1].db;
    // newCheckBox.value = this.loginData[i][0].key;+

    // var labelbox = document.createElement("label");
    // labelbox.innerHTML = this.loginData[i][1].db;
    // this.setCheckBoxProp(newCheckBox, labelbox)
    newCard.appendChild(Orgtxt);
    wrapper.appendChild(newCard);

    // this.root.appendChild(labelbox);
  }

  setCardOnClick(onclickListner) {
    console.log("oncclick event", onclickListner);
    for (let i = 0; i < this.root.childNodes.length; i++) {
      this.root.childNodes[i].addEventListener("click", onclickListner);
    }
  }
}
