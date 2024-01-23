function SnackboxAlertStyle() {
  var styles =
    ".snackbar{visibility:hidden; min-width:250px; margin-left: -125px; background-color: #333; color: #fff; text-align: center;border-radius: 2px; padding: 16px; position: fixed; z-index: 1;left: 50%; bottom: 30px;} .snackbar.show {visibility: visible;-webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;animation: fadein 0.5s,fadeout 0.5s 2.5s:}@-webkit-keyframes fadein {from {bottom: 0; opacity: 0;}to {bottom: 30px; opacity: 1;}}@keyframes fadein {from {bottom: 0; opacity: 0;}to {bottom: 30px; opacity: 1;}}@-webkit-keyframes fadeout {from {bottom: 30px; opacity: 1;}to {bottom: 0; opacity: 0;}}@keyframes fadeout {from {bottom: 30px; opacity: 1;}to {bottom: 0; opacity: 0;}}";

  var style = document.createElement("style");
  //TODO render tab

  style.appendChild(document.createTextNode(styles));

  document.getElementsByTagName("body")[0].appendChild(style);
}
function SnackboxAlert(snackId) {
  // Get the snackbar DIV
  var x = document.getElementById(snackId);

  // Add the "show" class to DIV
  x.classList.add("show");

  // After 3 seconds, remove the show class from DIV
  setTimeout(function () {
    x.classList.remove("show");
  }, 3000);
}
