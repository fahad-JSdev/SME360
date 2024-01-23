var async = require("async");
const { Console } = require("console");
const EventEmitter = require("events");
var QH = require("./queryHash");
class Adapter {
  listener;
  constructor() {
    if (this.constructor == Adapter) {
      throw new Error("object cannot be created");
    }
  }
  on(fn) {
    return (this.listener = fn);
  }
  start() {
    throw new Error("not impl");
  }
  read(event) {
    throw new Error("not impl");
  }
  write(event, value) {
    throw new Error("not impl");
  }
  update(event) {
    throw new Error("not impl");
  }
  addHoock(to, from) {
    throw new Error("not impl");
  }
  removeHoock(to, from) {
    throw new Error("not impl");
  }
  end() {
    throw new Error("not impl");
  }
}

class QueryListener {
  async onReciveStream(event, status, data, value) {
    throw new Error("not impl");
  }

  onNotifiStatus(event, msg) {
    throw new Error("not impl");
  }
}

class PowerQuery extends QueryListener {
  stream = new EventEmitter();

  adapter;
  isLive = false;
  constructor(mqa) {
    super();
    console.log("PowerQuery init....");
    this.adapter = mqa;
    this.adapter.on(this);
    this.adapter.start();
  }
  async onReciveStream(event, data) {
    var p;

    console.log("for our checking", event);
    var t = event.split("/")[2];
    console.log("t is our checker 3333", t);
    if (t == ":") {
      p = 1;
    } else {
      p = 0;
    }
    console.log("checking value is-------", p);
    var valuechecker = p;
    console.log("PowerQuery stream....", event, 200);
    if (valuechecker == 0) {
      event = event.split(":/")[1];
      console.log("`````````1122notupdated", valuechecker, event);
      console.log("3edrefs", QH.buildEvent(event));
      this.stream.emit(
        QH.buildEvent(event),
        200,
        new Buffer.from(data).toString()
      );
    } else {
      event = event.split(":")[1];
      console.log("`````````1122updated", valuechecker, event);
      console.log("PowerQuery stream....", event, 200);
      //var event=event.slice(0,1)
      event = QH.changeformat(event);
      event=event.replace(".","")
      console.log("PowerQuery stream....", event, 200);
      this.stream.emit(
        QH.changeformat(event),
        200,
        new Buffer.from(data).toString()
      );
    }
  }

  onNotifiStatus(event, msg) {
    console.log("PowerQuery notification....", event, msg);
    switch (event) {
      case "connect":
      case "reconnect":
        this.isLive = msg == undefined ? false : msg;
        break;
      case "error":
      case "close":
        this.isLive = false;
        break;
    }
    console.log("PowerQuery status....", this.isLive);
  }
  getStream(query, fn) {
    console.log("PowerQuery getStream....", this.isLive, query);
    var hash = QH.buildhash(query);
    console.log("PowerQuery getHash....", hash);
    this.stream.on(hash, fn);
    this.adapter.update(hash);
  }
  getStreamOnce(query, fn) {
    console.log("PowerQuery getStreamOnce....", this.isLive, query);
    var hash = QH.buildhash(query);
    this.stream.once(hash, fn);
    this.adapter.read(hash);
  }

  writeStream(query, value, fn) {
    console.log("PowerQuery writeStream....", this.isLive, query);
    var hash = QH.buildhash(query);
    this.stream.once(hash, fn);
    this.adapter.write(hash, value);
  }
  destroyStream(query, fn) {
    this.stream.removeListener(QH.buildhash(query), fn);
  }

  end() {
    this.stream.end();
    this.adapter.end();
  }
  // checktopic(topic) {
  //   var p;
  //   if (topic.startsWith("QP/UPDATE//")) {
  //     p = 1;
  //   } else {
  //     p = 0;

  //   }
  //   return p;
  // }
}

module.exports = { PowerQuery, Adapter };
