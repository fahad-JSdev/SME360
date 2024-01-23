function buildhash(Q) {
  //TODO handle once&write by appending a key
  console.log("PowerQuery hashing....");
  var mapObj = {
    "*": "-BLU-",
    "#": "-BLUBLU-",
    ".": "-BLUBLUBLU-",
    "+": "-BLUBLUBLUBLU-",
    "/": "-BLUBLUBLUBLUBLU-",
    " ": ".",
  };
  return Q.replace(/\.|\#|\*|\+|\/| /gi, function (matched) {
    return mapObj[matched];
  });
}

function buildQuery(H) {
  //TODO handle once&write by appending a key
  console.log("PowerQuery makeQuery....");
  var mapObj = {
    "-BLU-": "*",
    "-BLUBLU-": "#",
    "-BLUBLUBLU-": ".",
    "-BLUBLUBLUBLU-": "+",
    "-BLUBLUBLUBLUBLU-": "/",
    "/": " ",
  };
  return H.replace(
    /(-BLU-)|(-BLUBLU-)|(-BLUBLUBLU-)|(-BLUBLUBLUBLU-)|(-BLUBLUBLUBLUBLU-)|\//gi,
    function (matched) {
      return mapObj[matched];
    }
  );
}
function buildEvent(H) {
  //TODO handle once&write by appending a key
  console.log("PowerQuery makeQuery....");
  return H.replace(/\//gi, ".");
}
function changeformat(value) {
  var from = "/";
  var to = ".";
  if (value.indexOf(from) === -1) {
    console.log("Character to replace not found in string");
    return value;
  } else {
    return value.split(from).join(to);
  }
}
var p =
  "QP/UPDATE//SELECT/emp_name,designation,phone_no,email_id/FROM/employee";
console.log(changeformat(p));

module.exports = { buildhash, buildQuery, buildEvent, changeformat };
