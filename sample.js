var builder = require('botbuilder');
//var wechatBotBuilder = require('./wechatBot');
//take out the wechatbot and import directly from npm
var wechatBotBuilder = require('botbuilder-wechat');

var express = require('express');
var app = express();
var http = require('http').Server(app);
var fs = require('fs');

var bot = new wechatBotBuilder.WechatBot({
  appId: process.env.appId,
  appSecret: process.env.appSecret,
  //wechatAppId: process.env.wechatAppId,
  //wechatSecret: process.env.wechatSecret,
  //wechatken: process.e//nv.wechatToken,
  wechatAppId: 'wxa28b834343434',
  wechatSecret:'96e1fd0e72ff4343434',
  wechatToken: 'asdasd33',

  voiceMessageParser: function(payload, done) {
    // paylod is a buffer containing an AMR Audio File
    // parsing logic goes in here
    // call service like ibm watson or microsoft speech
    done('Hello!');
  }
});

bot.add('/', [
  function (session) {
    builder.Prompts.text(session, "Hello... What's your name?");
  },
  function (session, results) {
    session.userData.name = results.response;
    builder.Prompts.number(session, "Hi " + results.response + ", How many years have you been coding?");
  },
  function (session, results) {
    session.userData.coding = results.response;
    builder.Prompts.choice(session, "What language do you code Node using?", ["JavaScript", "CoffeeScript", "TypeScript"]);
  },
  function (session, results) {
    session.userData.language = results.response.entity;
    session.send("Got it... " + session.userData.name +
    " you've been programming for " + session.userData.coding +
    " years and use " + session.userData.language + ".");
  }
]);

app.use('/bot/wc', bot.getWechatCallbackHandler());

app.get('*', function(req, res) {
  //res.status(404).end();
  res.sendfile('index.html');
}); 

var port = process.env.PORT || 3000;

http.listen(port, function() {
  console.log('== Server started ==');
});
