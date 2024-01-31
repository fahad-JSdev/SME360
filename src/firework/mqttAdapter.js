const process = require("process");
const { Adapter } = require("./powerQuery");
const mqtt = require("mqtt");
const { ipcMain } = require("electron");
var async = require("async");
const EventEmitter = require("events");
var ip = "51.20.133.218";
const key =
  "instance." +
  Math.floor(100000000 + Math.random() * 900000) +
  "." +
  "user.app.unit.bussiness.organization" +
  ".:";

// const this.f = 'pq';
// const QP = 'qp';

class MqttAdapter extends Adapter {
  constructor(f, d, h) {
    super();
    this.f = 'PQ';
    this.d ='QP';
    this.h = h;
  }

  start() {
    console.log("starting mqtt");
    console.log(
      "values in mqtt",
      this.f,
      this.d,
      this.h,
      "mqtt:/" + this.h + ":61616"
    );
    this.Client = mqtt.connect("mqtt://"+ip+":61616",{clientId:key.replace("/\./gi","")+process.pid,username: "artemis", password:"aalbot"});
    var client = this.Client;
    var listener = this.listener;
    var myn = this;
    var k = this.d;

    client.on("connect", function () {
      console.log("connected", client.connected);
      //TODO ENIT MQQT CONNECT
      listener.onNotifiStatus("connect", client.connected);
    });

    client.on("reconnect", function () {
      console.log("reconnected", client.reconneted);
      listener.onNotifiStatus("reconnect", client.reconnected);
    });

    client.on("error", function (error) {
      console.log("cant connect" + error);
      listener.onNotifiStatus("error", error);
    });

    client.on("message", function (topic, message) {
      console.log("message is" + message, "topic is" + topic);
      //TODO EMIT DATA STREAM EVENT WITH TOPIC AND MESSAGE

      // if(topic.startsWith("this.d.UPDATE")){
      checktopic(topic, message, k);
      //listener.onReciveStream(topic, message);

      client.unsubscribe(topic);
    });
    client.on("close", function () {
      console.log("closed", client.closed);
      listener.onNotifiStatus("close", client.closed);
    });

    function checktopic(topic, message, d, f) {
      console.log("chwecktopic........",message,k)
      //topic=="this.d/UPDATE//SELECT/empid,emp_name,designation,phone_no/FROM/employee"
      var p;
      //
      console.log("tttttt eeeelement", topic.split("/")[1]);
      if (topic.split("/")[1] == "UPDATE") {
        console.log("in IF statement", topic);
        // var keys = key.replaceAll(".", "/");
        // var ref = topic.replace("" + keys + "", "");
        // console.log("scsacascas", ref);
        // client.subscribe(topic);
        console.log(
          "message is from condition if" + message,
          "topic is" + topic
        );
        client.subscribe(k + "/UPDATE/#");
        // client.subscribe(this.d + "/UPDATE/#");

        listener.onReciveStream(topic, message);
      } else {
        //client.subscribe(topic);
        console.log(
          "message is from condition else" + message,
          "topic is" + topic
        );
        listener.onReciveStream(topic, message);
        console.log("on else statement");
        // listener.onReciveStream(topic.split(":/")[1], message, p);
      }
      return p;
    }
  }

  read(event) {
    var to = this.f + ".READ." + key + "." + event;
    var from = this.d + ".READ." + key + "." + event;

    console.log("mqtt read send....", event);
    this.Client.subscribe(from);
    this.Client.publish(to, "{}");
  }
  update(event) {
    console.log("mqtt read send....", event);
    var to = this.f + ".UPDATE." + key + "." + event;
    var from = this.d + ".UPDATE." + key + "." + event;

    console.log(from);
    this.Client.subscribe(from);
    this.Client.publish(to, "{}");
  }
  write(event, value) {
    console.log("mqtt write send....", event);

    var to = this.f + ".WRITE." + key + "." + event;
    var from = this.d + ".WRITE." + key + "." + event;
    this.Client.subscribe(from);
    this.Client.publish(to, value);
  }
  addHoock(ref) {
    this.Client.subscribe(ref);
  }
  removeHoock(ref) {
    this.Client.unsubscribe(ref);
  }
  end() {
    this.Client.end;
  }
}
module.exports = { MqttAdapter };