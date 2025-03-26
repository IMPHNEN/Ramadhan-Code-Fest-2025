"use strict";
const axios = require("axios");
const fs = require("fs");
const fetch = require('node-fetch')
const jimp = require("jimp")

// exports serialize
exports.serialize = (ramz, msg) => {
msg.isGroup = msg.key.remoteJid.endsWith('@g.us')
try{
const berak = Object.keys(msg.message)[0]
msg.type = berak
} catch {
msg.type = null
}
try{
const context = msg.message[msg.type].contextInfo.quotedMessage
if(context["ephemeralMessage"]){
msg.quotedMsg = context.ephemeralMessage.message
}else{
msg.quotedMsg = context
}
msg.isQuotedMsg = true
msg.quotedMsg.sender = msg.message[msg.type].contextInfo.participant
msg.quotedMsg.fromMe = msg.quotedMsg.sender === ramz.user.id.split(':')[0]+'@s.whatsapp.net' ? true : false
msg.quotedMsg.type = Object.keys(msg.quotedMsg)[0]
let ane = msg.quotedMsg
msg.quotedMsg.chats = (ane.type === 'conversation' && ane.conversation) ? ane.conversation : (ane.type == 'imageMessage') && ane.imageMessage.caption ? ane.imageMessage.caption : (ane.type == 'documentMessage') && ane.documentMessage.caption ? ane.documentMessage.caption : (ane.type == 'videoMessage') && ane.videoMessage.caption ? ane.videoMessage.caption : (ane.type == 'extendedTextMessage') && ane.extendedTextMessage.text ? ane.extendedTextMessage.text : (ane.type == 'buttonsMessage') && ane.buttonsMessage.contentText ? ane.buttonsMessage.contentText : ""
msg.quotedMsg.id = msg.message[msg.type].contextInfo.stanzaId
}catch{
msg.quotedMsg = null
msg.isQuotedMsg = false
}

try{
const mention = msg.message[msg.type].contextInfo.mentionedJid
msg.mentioned = mention
}catch{
msg.mentioned = []
}
    
if (msg.isGroup){
msg.sender = msg.participant
}else{
msg.sender = msg.key.remoteJid
}
if (msg.key.fromMe){
msg.sender = ramz.user.id.split(':')[0]+'@s.whatsapp.net'
}

msg.from = msg.key.remoteJid
msg.now = msg.messageTimestamp
msg.fromMe = msg.key.fromMe

return msg
}

// exports getrandom
exports.getRandom = (ext) => {
return `${Math.floor(Math.random() * 10000)}${ext}`
}

// exports getBuffer
exports.getBuffer = async (url, options) => {
try {
options ? options : {}
const res = await axios({
method: "get",
url,
headers: {
'DNT': 1,
'Upgrade-Insecure-Request': 1
},
...options,
responseType: 'arraybuffer'
})
return res.data
} catch (e) {
console.log(`Error : ${e}`)
}
}

// exports fetchJson
exports.fetchJson = (url, options) => new Promise(async(resolve, reject) => {
fetch(url, options)
.then(response => response.json())
.then(json => {
resolve(json)
})
.catch((err) => {
reject(err)
})
})

// exports getGroupAdmins
exports.getGroupAdmins = function(participants){
let admins = []
for (let i of participants) {
i.admin !== null ? admins.push(i.id) : ''
}
return admins
}

// exports runtime
exports.runtime = function(seconds) {
seconds = Number(seconds);
var d = Math.floor(seconds / (3600 * 24));
var h = Math.floor(seconds % (3600 * 24) / 3600);
var m = Math.floor(seconds % 3600 / 60);
var s = Math.floor(seconds % 60);
var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
return dDisplay + hDisplay + mDisplay + sDisplay;
}

// exports sleep
exports.sleep = async (ms) => {
return new Promise(resolve => setTimeout(resolve, ms));
}

exports.reSize = async(buffer, ukur1, ukur2) => {
    return new Promise(async(resolve, reject) => {
        var baper = await jimp.read(buffer);
        var ab = await baper.resize(ukur1, ukur2).getBufferAsync(jimp.MIME_JPEG)
        resolve(ab)
    })
}

exports.makeid = (length) => {
let result = '';
const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const charactersLength = characters.length;
for (let i = 0; i < length; i++) {
result += characters.charAt(Math.floor(Math.random() *
charactersLength));
}
return result;
}

exports.isUrl = (url) => {
return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
}