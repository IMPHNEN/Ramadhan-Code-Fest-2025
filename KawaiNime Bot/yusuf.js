require('./setting')
require('./setting2')
const { BufferJSON, WA_DEFAULT_EPHEMERAL, proto, prepareWAMessageMedia, areJidsSameUser, getContentType } = require('@whiskeysockets/baileys')
const { getAggregateVotesInPollMessage, downloadContentFromMessage, generateWAMessage, generateWAMessageFromContent, MessageType, buttonsMessage } = require("@whiskeysockets/baileys")
const { exec, spawn } = require("child_process");
const { color, bgcolor, pickRandom, randomNomor } = require('./lib/console.js')
const { isUrl, getRandom, getGroupAdmins, runtime, sleep, reSize, makeid, fetchJson, getBuffer } = require("./lib/myfunc");
const { addResponList, delResponList, isAlreadyResponList, isAlreadyResponListGroup, sendResponList, updateResponList, getDataResponList } = require('./lib/all-function');
const { addResponTesti, delResponTesti, isAlreadyResponTesti, sendResponTesti, updateResponTesti, getDataResponTesti } = require('./lib/all-function');
const { addResponProduk, delResponProduk, resetProdukAll, isAlreadyResponProduk, sendResponProduk, updateResponProduk, getDataResponProduk } = require('./lib/all-function');
const { isSetDone, addSetDone, removeSetDone, changeSetDone, getTextSetDone } = require('./lib/all-function');
const { isSetProses, addSetProses, removeSetProses, changeSetProses, getTextSetProses } = require('./lib/all-function');
const { addSewaGroup, getSewaExpired, getSewaPosition, expiredCheck, checkSewaGroup } = require('./lib/all-function');
const { remini } = require('./lib/scraper2');
const toMs = require("ms");

// apinya
const fs = require("fs");
const ms = require("ms");
const chalk = require('chalk');
const axios = require("axios");
const colors = require('colors/safe');
const ffmpeg = require("fluent-ffmpeg");
const moment = require("moment-timezone");
const { UploadFileUgu } = require('./lib/Upload_Url');
const crypto = require("crypto");
const util = require("util");
const path = require('path');

// Database
const antilink = JSON.parse(fs.readFileSync('./database/antilink.json'));
const antilink2 = JSON.parse(fs.readFileSync('./database/antilink2.json'));
const mess = JSON.parse(fs.readFileSync('./mess.json'));
const welcome = JSON.parse(fs.readFileSync('./database/welcome.json'));
const db_error = JSON.parse(fs.readFileSync('./database/error.json'));
const db_respon_list = JSON.parse(fs.readFileSync('./database/list.json'));
const db_respon_testi = JSON.parse(fs.readFileSync('./database/list-testi.json'));
const db_respon_produk = JSON.parse(fs.readFileSync('./database/list-produk.json'));
const { addSaldo, minSaldo, cekSaldo } = require("./database/deposit");
const { Saweria } = require("./lib/saweria")
const db_saweria = JSON.parse(fs.readFileSync('./src/saweria.json'));
let db_saldo = JSON.parse(fs.readFileSync("./database/saldo.json"));
let set_done = JSON.parse(fs.readFileSync('./database/set_done.json'));
let set_proses = JSON.parse(fs.readFileSync('./database/set_proses.json'));
const sewa = JSON.parse(fs.readFileSync('./database/sewa.json'));

moment.tz.setDefault("Asia/Jakarta").locale("id");
module.exports = async(youzuf, msg, m, setting, store) => {
try {
const { type, quotedMsg, mentioned, now, fromMe, isBaileys } = msg
if (msg.isBaileys) return
const jam = moment.tz('asia/jakarta').format('HH:mm:ss')
const tanggal = moment().tz("Asia/Jakarta").format("ll")
let dt = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('a')
const ucapanWaktu = "Selamat "+dt.charAt(0).toUpperCase() + dt.slice(1)
const content = JSON.stringify(msg.message)
const from = msg.key.remoteJid
const time = moment(new Date()).format("HH:mm");
var chats = (type === 'conversation' && msg.message.conversation) ? msg.message.conversation : (type === 'imageMessage') && msg.message.imageMessage.caption ? msg.message.imageMessage.caption : (type === 'videoMessage') && msg.message.videoMessage.caption ? msg.message.videoMessage.caption : (type === 'extendedTextMessage') && msg.message.extendedTextMessage.text ? msg.message.extendedTextMessage.text : (type === 'buttonsResponseMessage') && quotedMsg.fromMe && msg.message.buttonsResponseMessage.selectedButtonId ? msg.message.buttonsResponseMessage.selectedButtonId : (type === 'templateButtonReplyMessage') && quotedMsg.fromMe && msg.message.templateButtonReplyMessage.selectedId ? msg.message.templateButtonReplyMessage.selectedId : (type === 'messageContextInfo') ? (msg.message.buttonsResponseMessage?.selectedButtonId || msg.message.listResponseMessage?.singleSelectReply.selectedRowId) : (type == 'listResponseMessage') && quotedMsg.fromMe && msg.message.listResponseMessage.singleSelectReply.selectedRowId ? msg.message.listResponseMessage.singleSelectReply.selectedRowId : ""
if (chats == undefined) { chats = '' }
const prefix = /^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^]/.test(chats) ? chats.match(/^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^]/gi) : '#'
const isGroup = msg.key.remoteJid.endsWith('@g.us')
const sender = isGroup ? (msg.key.participant ? msg.key.participant : msg.participant) : msg.key.remoteJid
const isOwner = [`${global.ownerNumber}`,"085935002092@s.whatsapp.net"].includes(sender) ? true : false
const pushname = msg.pushName
const body = chats.startsWith(prefix) ? chats : ''
const budy = (type === 'conversation') ? msg.message.conversation : (type === 'extendedTextMessage') ? msg.message.extendedTextMessage.text : ''
const args = body.trim().split(/ +/).slice(1);
const q = args.join(" ");
const isCommand = body.startsWith(prefix);
const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
const isCmd = isCommand ? body.slice(1).trim().split(/ +/).shift().toLowerCase() : null;
const botNumber = youzuf.user.id.split(':')[0] + '@s.whatsapp.net'

// Group
const groupMetadata = isGroup ? await youzuf.groupMetadata(from) : ''
const groupName = isGroup ? groupMetadata.subject : ''
const groupId = isGroup ? groupMetadata.id : ''
const participants = isGroup ? await groupMetadata.participants : ''
const groupMembers = isGroup ? groupMetadata.participants : ''
const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
const isGroupAdmins = groupAdmins.includes(sender)
const isAntiLink = antilink.includes(from) ? true : false
const isAntiLink2 = antilink2.includes(from) ? true : false
const isWelcome = isGroup ? welcome.includes(from) : false
const isSewa = checkSewaGroup(from, sewa);

// Quoted
const quoted = msg.quoted ? msg.quoted : msg
const isImage = (type == 'imageMessage')
const isQuotedMsg = (type == 'extendedTextMessage')
const isMedia = (type === 'imageMessage' || type === 'videoMessage');
const isQuotedImage = isQuotedMsg ? content.includes('imageMessage') ? true : false : false
const isVideo = (type == 'videoMessage')
const isQuotedVideo = isQuotedMsg ? content.includes('videoMessage') ? true : false : false
const isSticker = (type == 'stickerMessage')
const isQuotedSticker = isQuotedMsg ? content.includes('stickerMessage') ? true : false : false 
const isQuotedAudio = isQuotedMsg ? content.includes('audioMessage') ? true : false : false
var dataGroup = (type === 'buttonsResponseMessage') ? msg.message.buttonsResponseMessage.selectedButtonId : ''
var dataPrivate = (type === "messageContextInfo") ? (msg.message.buttonsResponseMessage?.selectedButtonId || msg.message.listResponseMessage?.singleSelectReply.selectedRowId) : ''
const isButton = dataGroup.length !== 0 ? dataGroup : dataPrivate
var dataListG = (type === "listResponseMessage") ? msg.message.listResponseMessage.singleSelectReply.selectedRowId : ''
var dataList = (type === 'messageContextInfo') ? (msg.message.buttonsResponseMessage?.selectedButtonId || msg.message.listResponseMessage?.singleSelectReply.selectedRowId) : ''
const isListMessage = dataListG.length !== 0 ? dataListG : dataList

function mentions(teks, mems = [], id) {
if (id == null || id == undefined || id == false) {
let res = youzuf.sendMessage(from, { text: teks, mentions: mems })
return res
} else {
let res = youzuf.sendMessage(from, { text: teks, mentions: mems }, { quoted: msg })
return res
}
}

const mentionByTag = type == "extendedTextMessage" && msg.message.extendedTextMessage.contextInfo != null ? msg.message.extendedTextMessage.contextInfo.mentionedJid : []
const mentionByReply = type == "extendedTextMessage" && msg.message.extendedTextMessage.contextInfo != null ? msg.message.extendedTextMessage.contextInfo.participant || "" : ""
const mention = typeof(mentionByTag) == 'string' ? [mentionByTag] : mentionByTag
mention != undefined ? mention.push(mentionByReply) : []
const mentionUser = mention != undefined ? mention.filter(n => n) : []
const createSerial = (size) => {
return crypto.randomBytes(size).toString('hex').slice(0, size)
}

function toRupiah(angka) {
var saldo = '';
var angkarev = angka.toString().split('').reverse().join('');
for (var i = 0; i < angkarev.length; i++)
if (i % 3 == 0) saldo += angkarev.substr(i, 3) + '.';
return '' + saldo.split('', saldo.length - 1).reverse().join('');
}
async function downloadAndSaveMediaMessage (type_file, path_file) {
if (type_file === 'image') {
var stream = await downloadContentFromMessage(msg.message.imageMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.imageMessage, 'image')
let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk]) }
fs.writeFileSync(path_file, buffer)
return path_file } 
else if (type_file === 'video') {
var stream = await downloadContentFromMessage(msg.message.videoMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.videoMessage, 'video')
let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])}
fs.writeFileSync(path_file, buffer)
return path_file
} else if (type_file === 'sticker') {
var stream = await downloadContentFromMessage(msg.message.stickerMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.stickerMessage, 'sticker')
let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])}
fs.writeFileSync(path_file, buffer)
return path_file
} else if (type_file === 'audio') {
var stream = await downloadContentFromMessage(msg.message.audioMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.audioMessage, 'audio')
let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])}
fs.writeFileSync(path_file, buffer)
return path_file}
}
function TelegraPh(path) {
    return new Promise(async (resolve, reject) => {
	const { ImageUploadService } = require('node-upload-images')
const service = new ImageUploadService('pixhost.to');
    try {
let { directLink } = await service.uploadFromBinary(fs.readFileSync(path), 'ramagnz.jpg');
let teks = directLink.toString()
			return resolve(teks)
		} catch (err) {
			return reject(new Error(String(err)))
		}
        })
    }
    
const reply = (teks) => {youzuf.sendMessage(from, { text: teks }, { quoted: msg })}

//Antilink
if (isGroup && isAntiLink && isBotGroupAdmins){
if (chats.includes(`https://chat.whatsapp.com/`) || chats.includes(`http://chat.whatsapp.com/`)) {
if (!isBotGroupAdmins) return reply('Untung bot bukan admin')
if (isOwner) return reply('Untung lu owner ku:v😙')
if (isGroupAdmins) return reply('Admin grup mah bebas ygy🤭')
if (fromMe) return reply('bot bebas Share link')
await youzuf.sendMessage(from, { delete: msg.key })
reply(`*「 GROUP LINK DETECTOR 」*\n\nTerdeteksi mengirim link group,Maaf sepertinya kamu akan di kick`)
youzuf.groupParticipantsUpdate(from, [sender], "remove")
}
}

//Antilink 2
if (isGroup && isAntiLink2 && isBotGroupAdmins){
if (chats.includes(`https://chat.whatsapp.com/`) || chats.includes(`http://chat.whatsapp.com/`)) {
if (!isBotGroupAdmins) return reply('Untung bot bukan admin')
if (isOwner) return reply('Untung lu owner ku:v😙')
if (isGroupAdmins) return reply('Admin grup mah bebas ygy🤭')
if (fromMe) return reply('bot bebas Share link')
await youzuf.sendMessage(from, { delete: msg.key })
reply(`*「 GROUP LINK DETECTOR 」*\n\nTerdeteksi mengirim link group`)
}
}

// Response Addlist
if (!isCmd && isGroup && isAlreadyResponList(from, chats, db_respon_list)) {
var get_data_respon = getDataResponList(from, chats, db_respon_list)
if (get_data_respon.isImage === false) {
youzuf.sendMessage(from, { text: sendResponList(from, chats, db_respon_list) }, {
quoted: msg
})
} else {
youzuf.sendMessage(from, { image: await getBuffer(get_data_respon.image_url), caption: get_data_respon.response }, {quoted: msg})
}
}
if (!isGroup && isAlreadyResponTesti(chats, db_respon_testi)) {
var get_data_respon = getDataResponTesti(chats, db_respon_testi)
youzuf.sendMessage(from, { image: { url: get_data_respon.image_url }, caption: get_data_respon.response }, { quoted: msg })
}
if (!isGroup && isAlreadyResponProduk(chats, db_respon_produk)) {
var get_data_respon = getDataResponProduk(chats, db_respon_produk)
youzuf.sendMessage(from, { image: { url: get_data_respon.image_url }, caption: get_data_respon.response }, { quoted: msg })
}

//cek sewa otomatis 
if (msg.isGroup) {
      expiredCheck(youzuf, sewa);
    } 


const sendContact = (jid, numbers, name, quoted, mn) => {
let number = numbers.replace(/[^0-9]/g, '')
const vcard = 'BEGIN:VCARD\n' 
+ 'VERSION:3.0\n' 
+ 'FN:' + name + '\n'
+ 'ORG:;\n'
+ 'TEL;type=CELL;type=VOICE;waid=' + number + ':+' + number + '\n'
+ 'END:VCARD'
return youzuf.sendMessage(from, { contacts: { displayName: name, contacts: [{ vcard }] }, mentions : mn ? mn : []},{ quoted: quoted })
}

function readSewaFile() {
          try {
            const fileContent = fs.readFileSync("database/sewa.json", "utf-8");
            return JSON.parse(fileContent);
          } catch (error) {
            console.error("Error di bagian sewa.json", error);
            return [];
          }
        }
async function getGcName(groupID) {
      try {
        let data_name = await youzuf.groupMetadata(groupID);
        return data_name.subject;
      } catch (err) {
        return "-";
      }
    }
    function msToDate(mse) {
  temp = mse;
  days = Math.floor(mse / (24 * 60 * 60 * 1000));
  daysms = mse % (24 * 60 * 60 * 1000);
  hours = Math.floor(daysms / (60 * 60 * 1000));
  hoursms = mse % (60 * 60 * 1000);
  minutes = Math.floor(hoursms / (60 * 1000));
  minutesms = mse % (60 * 1000);
  sec = Math.floor(minutesms / 1000);
  return days + " Days " + hours + " Hours " + minutes + " Minutes";
}


const fkontak = { key: {fromMe: false,participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { 'contactMessage': { 'displayName': `Bot Created By ${global.ownerName}\n`, 'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:XL;${global.botName},;;;\nFN:Halo ${pushname},\nitem1.TEL;waid=${sender.split('@')[0]}:${sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`, 'jpegThumbnail': { url: `${global.qris}` }}}}
//const fkontak = msg

function parseMention(text = '') {
return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')
}


// Console
if (isGroup && isCmd) {
console.log(colors.green.bold("[Group]") + " " + colors.brightCyan(time,) + " " + colors.black.bgYellow(command) + " " + colors.green("from") + " " + colors.blue(groupName));
}
if (!isGroup && isCmd) {
console.log(colors.green.bold("[Private]") + " " + colors.brightCyan(time,) + " " + colors.black.bgYellow(command) + " " + colors.green("from") + " " + colors.blue(pushname));
}

// Casenya
switch(command) {
	case 'help':
	case 'menu':{
		const mark_slebew = '0@s.whatsapp.net'
const more = String.fromCharCode(8206)
const strip_ny = more.repeat(4001)
let simbol = `${pickRandom(["⇉","〆"])}`
var footer_nya =`Creator by - ${global.ownerName}`
var ramex = `./SCRIPT BY YusufHosting`
	let menu = `▭▬▭▬[   𝗬𝘂𝘀𝘂𝗳 𝗦𝘁𝗼𝗿𝗲 𝗩𝟳   ]▭▬▭▬


✪  𝐈𝐍𝐅𝐎 𝐁𝐎𝐓 ✪
${simbol} 𝙾𝚆𝙽𝙴𝚁 : *${global.ownerName}*
${simbol} 𝙱𝙾𝚃𝙽𝙰𝙼𝙴 : *${global.botName}*
${simbol} 𝙹𝙰𝙼 : *${jam}*
${simbol} 𝚅𝙴𝚁𝚂𝙸𝙾𝙽 : 7⃣.0️⃣

✪  𝐁𝐎𝐓 𝐌𝐄𝐍𝐔 ✪
${simbol} .𝙶𝚁𝚄𝙿𝙼𝙴𝙽𝚄
${simbol} .𝙿𝙰𝙽𝙴𝙻𝙼𝙴𝙽𝚄 (𝚜𝚘𝚘𝚗)
${simbol} .𝙼𝙰𝙸𝙽𝙼𝙴𝙽𝚄
${simbol} .𝙾𝚆𝙽𝙴𝚁𝙼𝙴𝙽𝚄
${simbol} .𝚂𝚃𝙾𝚁𝙴𝙼𝙴𝙽𝚄
${simbol} .𝙺𝙰𝙻𝙺𝚄𝙻𝙰𝚃𝙾𝚁
${simbol} .𝚂𝙾𝚂𝙼𝙴𝙳𝙼𝙴𝙽𝚄
`
youzuf.sendMessage(from, {
text: menu},
 {quoted: fkontak})
}
break
case 'grupmenu':{
	let simbol = `${pickRandom(["⇉","〆"])}`
	let menu = `✪  𝐆𝐑𝐔𝐏 𝐌𝐄𝐍𝐔 ✪
${simbol} .𝙷𝚒𝚍𝚎𝚝𝚊𝚐
${simbol} .𝙶𝚛𝚘𝚞𝚙 𝚘𝚙𝚎𝚗
${simbol} .𝙶𝚛𝚘𝚞𝚙 𝚌𝚕𝚘𝚜𝚎
${simbol} .𝙰𝚗𝚝𝚒𝚕𝚒𝚗𝚔 𝚔𝚒𝚌𝚔
${simbol} .𝙰𝚗𝚝𝚒𝚕𝚒𝚗𝚔2 𝚗𝚘 𝚔𝚒𝚌𝚔
${simbol} .𝚆𝚎𝚕𝚌𝚘𝚖𝚎 𝚘𝚗/𝚘𝚏𝚏
${simbol} .𝙺𝚒𝚌𝚔
${simbol} .𝙿𝚛𝚘𝚜𝚎𝚜
${simbol} .𝚜𝚎𝚝𝙿𝚛𝚘𝚜𝚎𝚜
${simbol} .𝚍𝚎𝚕𝚜𝚎𝚝𝙿𝚛𝚘𝚜𝚎𝚜
${simbol} .𝚌𝚑𝚊𝚗𝚐𝚎𝙿𝚛𝚘𝚜𝚎𝚜
${simbol} .𝙳𝚘𝚗𝚎
${simbol} .𝚂𝚎𝚝𝙳𝚘𝚗𝚎
${simbol} .𝚍𝚎𝚕𝚜𝚎𝚝𝙳𝚘𝚗𝚎
${simbol} .𝚌𝚑𝚊𝚗𝚐𝚎𝙳𝚘𝚗𝚎
${simbol} .𝙰𝚍𝚍𝚕𝚒𝚜𝚝 (𝚒𝚖𝚊𝚐𝚎)
${simbol} .𝙳𝚎𝚕𝚕𝚒𝚜𝚝
${simbol} .𝙻𝚒𝚜𝚝
${simbol} .𝚂𝚑𝚘𝚙
${simbol} .𝙷𝚊𝚙𝚞𝚜𝚕𝚒𝚜𝚝
${simbol} .𝚕𝚒𝚗𝚔𝚐𝚌
${simbol} .𝚝𝚊𝚐𝚊𝚕𝚕
${simbol} .𝚏𝚒𝚝𝚗𝚊𝚑
${simbol} .𝚍𝚎𝚕𝚎𝚝
${simbol} .𝚛𝚎𝚟𝚘𝚔𝚎

▭▬▭▬[   𝗬𝘂𝘀𝘂𝗳 𝗦𝘁𝗼𝗿𝗲 𝗩𝟳   ]▭▬▭▬`
youzuf.sendMessage(from, {text: menu}, {quoted: fkontak})
}
break
case 'panelmenu':{
	let simbol = `${pickRandom(["⇉","〆"])}`
	let menu = `✪ 𝐏𝐀𝐍𝐄𝐋 𝐌𝐄𝐍𝐔 ✪
${simbol} .1𝚐𝚋 𝚞𝚜𝚎𝚛,62𝚡𝚡𝚡,𝚙𝚠
${simbol} .2𝚐𝚋 𝚞𝚜𝚎𝚛,62𝚡𝚡𝚡,𝚙𝚠
${simbol} .3𝚐𝚋 𝚞𝚜𝚎𝚛,62𝚡𝚡𝚡,𝚙𝚠
${simbol} .4𝚐𝚋 𝚞𝚜𝚎𝚛,62𝚡𝚡𝚡,𝚙𝚠
${simbol} .5𝚐𝚋 𝚞𝚜𝚎𝚛,62𝚡𝚡𝚡,𝚙𝚠
${simbol} .6𝚐𝚋 𝚞𝚜𝚎𝚛,62𝚡𝚡𝚡,𝚙𝚠
${simbol} .7𝚐𝚋 𝚞𝚜𝚎𝚛,62𝚡𝚡𝚡,𝚙𝚠
${simbol} .𝚞𝚗𝚕𝚒 𝚞𝚜𝚎𝚛,62𝚡𝚡𝚡,𝚙𝚠
${simbol} .𝚌𝚛𝚎𝚊𝚝𝚎𝚊𝚍𝚖𝚒𝚗 𝚞𝚜𝚎𝚛,62𝚡𝚡

▭▬▭▬[   𝗬𝘂𝘀𝘂𝗳 𝗦𝘁𝗼𝗿𝗲 𝗩𝟳   ]▭▬▭▬`
youzuf.sendMessage(from, {text: menu}, {quoted: fkontak})
}
break
case 'mainmenu':{
	let simbol = `${pickRandom(["⇉","〆"])}`
	let menu = `✪ 𝐌𝐀𝐈𝐍 𝐌𝐄𝐍𝐔✪
${simbol} .𝚏𝚏𝚜𝚝𝚊𝚕𝚔
${simbol} .𝚖𝚕𝚜𝚝𝚊𝚕𝚔
${simbol} .𝚝𝚒𝚔𝚝𝚘𝚔
${simbol} .𝚝𝚒𝚔𝚛𝚘𝚔𝚊𝚞𝚍𝚒𝚘
${simbol} .𝚙𝚛𝚘𝚍𝚞𝚔
${simbol} .𝚍𝚘𝚗𝚊𝚜𝚒
${simbol} .𝚙𝚒𝚗𝚐
${simbol} .𝚝𝚎𝚜𝚝
${simbol} .𝚙𝚊𝚢
${simbol} .𝚙𝚎𝚖𝚋𝚊𝚢𝚊𝚛𝚊𝚗
${simbol} .𝚜𝚌𝚛𝚒𝚙𝚝
${simbol} .𝚜𝚝𝚒𝚌𝚔𝚎𝚛

▭▬▭▬[   𝗬𝘂𝘀𝘂𝗳 𝗦𝘁𝗼𝗿𝗲 𝗩𝟳   ]▭▬▭▬`
youzuf.sendMessage(from, {text: menu}, {quoted: fkontak})
}
break
case 'ownermenu':{
	let simbol = `${pickRandom(["⇉","〆"])}`
	let menu = `✪ 𝐎𝐖𝐍𝐄𝐑 𝐌𝐄𝐍𝐔✪
${simbol} .𝚖𝚘𝚍𝚎 𝚘𝚗/𝚘𝚏𝚏
${simbol} .𝚊𝚍𝚍𝚜𝚎𝚠𝚊
${simbol} .𝚍𝚎𝚕𝚜𝚎𝚠𝚊
${simbol} .𝚕𝚒𝚜𝚝𝚜𝚎𝚠𝚊
${simbol} .𝚐𝚊𝚗𝚝𝚒𝚚𝚛𝚒𝚜
${simbol} .𝚊𝚍𝚍𝚝𝚎𝚜𝚝𝚒
${simbol} .𝚍𝚎𝚕𝚝𝚎𝚜𝚝𝚒
${simbol} .𝚊𝚍𝚍𝚙𝚛𝚘𝚍𝚞𝚔
${simbol} .𝚍𝚎𝚕𝚙𝚛𝚘𝚍𝚞𝚔
${simbol} .𝚓𝚘𝚒𝚗
${simbol} .𝚜𝚎𝚗𝚍𝚋𝚢𝚛 62𝚡𝚡
${simbol} .𝚋𝚕𝚘𝚌𝚔 62𝚡𝚡
${simbol} .𝚞𝚗𝚋𝚕𝚘𝚌𝚔 62𝚡𝚡

▭▬▭▬[   𝗬𝘂𝘀𝘂𝗳 𝗦𝘁𝗼𝗿𝗲 𝗩𝟳   ]▭▬▭▬`
youzuf.sendMessage(from, {text: menu}, {quoted: fkontak})
}
break
case 'storemenu':{
	let simbol = `${pickRandom(["⇉","〆"])}`
	let menu = `✪ 𝐒𝐓𝐎𝐑𝐄 𝐌𝐄𝐍𝐔 ✪
${simbol} .𝚙𝚛𝚘𝚜𝚎𝚜
${simbol} .𝚍𝚘𝚗𝚎
${simbol} .𝚜𝚎𝚝𝚍𝚘𝚗𝚎
${simbol} .𝚍𝚎𝚕𝚜𝚎𝚝𝚍𝚘𝚗𝚎
${simbol} .𝚜𝚎𝚝𝚙𝚛𝚘𝚜𝚎𝚜
${simbol} .𝚍𝚎𝚕𝚜𝚎𝚝𝚙𝚛𝚘𝚜𝚎𝚜
${simbol} .𝚌𝚑𝚊𝚗𝚐𝚎𝚙𝚛𝚘𝚜𝚎𝚜
${simbol} .𝚊𝚍𝚍𝚕𝚒𝚜𝚝 (𝚒𝚖𝚊𝚐𝚎)
${simbol} .𝚍𝚎𝚕𝚕𝚒𝚜𝚝
${simbol} .𝚜𝚑𝚘𝚙
${simbol} .𝚑𝚊𝚙𝚞𝚜𝚕𝚒𝚜𝚝
${simbol} .𝚝𝚎𝚜𝚝𝚒
${simbol} .𝚙𝚛𝚘𝚍𝚞𝚔


▭▬▭▬[   𝗬𝘂𝘀𝘂𝗳 𝗦𝘁𝗼𝗿𝗲 𝗩𝟳   ]▭▬▭▬`
youzuf.sendMessage(from, {text: menu}, {quoted: fkontak})
}
break
case 'domainmenu':{
	let simbol = `${pickRandom(["⇉","〆"])}`
	let menu = `✪ 𝐃𝐎𝐌𝐀𝐈𝐍 𝐌𝐄𝐍𝐔 ✪
${simbol} .𝚍𝚘𝚖𝚊𝚒𝚗1 sellerpannel.my.id
${simbol} .𝚍𝚘𝚖𝚊𝚒𝚗2 panellku.my.id
${simbol} .𝚍𝚘𝚖𝚊𝚒𝚗3 panellku.me
${simbol} .𝚍𝚘𝚖𝚊𝚒𝚗4 panellku.biz.id
${simbol} .𝚍𝚘𝚖𝚊𝚒𝚗5 panellku.com
${simbol} .𝚍𝚘𝚖𝚊𝚒𝚗6 mypanel.biz.id
${simbol} .𝚍𝚘𝚖𝚊𝚒𝚗7 panellku.art
${simbol} .𝚍𝚘𝚖𝚊𝚒𝚗8 kangpannel.xyz
${simbol} .𝚍𝚘𝚖𝚊𝚒𝚗9 pannelfast.xyz

▭▬▭▬[   𝗬𝘂𝘀𝘂𝗳 𝗦𝘁𝗼𝗿𝗲 𝗩𝟳   ]▭▬▭▬`
youzuf.sendMessage(from, {text: menu}, {quoted: fkontak})
}
break
case 'kalkulator':{
	let simbol = `${pickRandom(["⇉","〆"])}`
	let menu = `✪ 𝐊𝐀𝐋𝐊𝐔𝐋𝐀𝐓𝐎𝐑 ✪
${simbol} . 𝚃𝚊𝚖𝚋𝚊𝚑
${simbol} . 𝙺𝚊𝚕𝚒
${simbol} . 𝙱𝚊𝚐𝚒
${simbol} . 𝙺𝚞𝚛𝚊𝚗𝚐

▭▬▭▬[   𝗬𝘂𝘀𝘂𝗳 𝗦𝘁𝗼𝗿𝗲 𝗩𝟳   ]▭▬▭▬`
youzuf.sendMessage(from, {text: menu}, {quoted: fkontak})
}
break
case 'sosmedmenu':{
	let simbol = `${pickRandom(["⇉","〆"])}`
	let menu = `✪ 𝐒𝐎𝐒𝐌𝐄𝐃 𝐌𝐄𝐍𝐔 ✪
.𝚒𝚐
.𝚢𝚝
.𝚐𝚌
.𝚢𝚘𝚞𝚝𝚞𝚋𝚎
.𝚒𝚗𝚜𝚝𝚊𝚐𝚛𝚊𝚖
.𝚐𝚛𝚘𝚞𝚙𝚊𝚍𝚖𝚒𝚗

▭▬▭▬[   𝗬𝘂𝘀𝘂𝗳 𝗦𝘁𝗼𝗿𝗲 𝗩𝟳   ]▭▬▭▬`
youzuf.sendMessage(from, {text: menu}, {quoted: fkontak})
}
break
case 'acc': case 'addsaldo':{
if (!isOwner) return reply('fitur khusus 𝗢𝗪𝗡𝗘𝗥')
if (!q.split(",")[0]) return reply(`Ex : ${prefix+command} nomor,jumlah\n\nContoh :\n${prefix+command} 628xxx,20000`)
if (!q.split(",")[1]) return reply(`Ex : ${prefix+command} nomor,jumlah\n\nContoh :\n${prefix+command} 628xxx,20000`)
addSaldo(q.split(",")[0]+"@s.whatsapp.net", Number(q.split(",")[1]), db_saldo)
reply(`「 *SALDO USER* 」
⭔ID: @${sender.split("@")[0]}
⭔Nomer: @${q.split(",")[0]}
⭔Tanggal: ${tanggal}
⭔Saldo: Rp${toRupiah(cekSaldo(q.split(",")[0]+"@s.whatsapp.net", db_saldo))}, `)
                }
        case 'kirim': {
                    let messageText = `𝗬𝗲𝘆 𝗱𝗲𝗽𝗼𝘀𝗶𝘁 𝗯𝗲𝗿𝗵𝗮𝘀𝗶𝗹!! 
𝙎𝙚𝙟𝙪𝙢𝙡𝙖𝙝 _${q.split(",")[1]}_
sɪʟᴀʜᴋᴀɴ ᴄᴇᴋ sᴀʟᴅᴏ ᴀɴᴅᴀ! ᴋᴇᴛɪᴋ .ᴄᴇᴋsᴀʟᴅᴏ`
  let targetNumber = `${q.split(",")[0]}@s.whatsapp.net`;

  youzuf.sendMessage(targetNumber, {
    text: `*${messageText}*`,
    mentions: [sender]
  }, {
    quoted: reply
  }).then(() => {
    reply('𝘽𝙚𝙧𝙝𝙖𝙨𝙞𝙡 𝙢𝙚𝙣𝙖𝙢𝙗𝙖𝙝𝙠𝙖𝙣 𝙨𝙖𝙡𝙙𝙤 ✅');
  }).catch(() => {
    reply('Gagal mengirim pesan!');
  });
}
break;

case 'ceksaldo':{
reply(`*━━ CHECK YOUR INFO ━━*

 _• *Name:* ${pushname}_
 _• *Nomer:* ${sender.split('@')[0]}_
 _• *Saldo:* Rp${toRupiah(cekSaldo(sender, db_saldo))}_

*Note :*
_Saldo hanya bisa untuk beli di bot_
_Tidak bisa ditarik atau transfer_!`)
}
break
case 'bukti':{
           let jumlah = args[0]
           if (!jumlah) return reply('Jumblah nya?')
reply('𝙈𝙤𝙝𝙤𝙣 𝙢𝙚𝙣𝙪𝙣𝙜𝙪𝙪.. Proses deposit anda sedang di cek oleh owner kami!')
youzuf.sendMessage(`${setting.kontakOwner}@s.whatsapp.net`, { text: `👋🏼 *Hai Yusuf*
Ada yang deposit nih\n🎫: *Nominal ${jumlah}* \n👤: @${sender.split('@')[0]} \n _____________________ \n*ingin acc deposit? KETIK*\n*${prefix}acc*`, mentions: [sender]}, { quoted: reply.msg })
        }
        break
case 'login':{
if (!isOwner) return reply(mess.OnlyOwner)
if (db_saweria.length == 1) return m.reply(`Sudah login disaweria...`)
if (!isGroupAdmins) return reply(mess.GrupAdmin)
if (!q) return reply(`Contoh: ${prefix+command} email@gmail.com,password`)
if (!q.split("@")[1]) return m.reply(`Contoh: ${prefix+command} email@gmail.com,password`)
if (!q.split(".")[1]) return m.reply(`Contoh: ${prefix+command} email@gmail.com,password`)
if (!q.split(",")[1]) return m.reply(`Contoh: ${prefix+command} email@gmail.com,password`)
await m.reply("Sedang mencoba login...")
let Pay = new Saweria(db_saweria)
let res = await Pay.login(q.split(",")[0], q.split(",")[1])
if (!res.status) return m.reply(`Terjadi kesalahan saat login:\n${res.msg}`)
await sleep(500)
await m.reply(`*LOGIN SUKSES ✅*\n\n*USER ID:* ${res.data.user_id}`)
db_saweria.push(res.data.user_id)
fs.writeFileSync("./src/saweria.json", JSON.stringify(db_saweria))
}
break
        case 'deposit':{
let tekssss = `
*━━𝙋𝘼𝙔𝙈𝙀𝙉𝙏 𝘼𝙉𝘿𝘼━━*

 _• *Dana:* SCAN DI ATAS_
 _• *Gopay:* SCAN DI ATAS_
 _• *Ovo:* SCAN DI ATAS_

Note : _Ketik *.Bukti* lalu sertakan bukti tf_ Setelah transfer
_transfer sesuai jumlah_!
`
youzuf.sendMessage(from, { image: fs.readFileSync(`./gambar/qris.jpg`),
 caption: tekssss, 
footer: `${setting.ownerName} © 2023`},
{quoted: msg})
}
break
case 'sticker': case 's': case 'stiker':{
if (isImage || isQuotedImage) {
let media = await downloadAndSaveMediaMessage('image', `./gambar/${tanggal}.jpg`)
reply(mess.wait)
youzuf.sendImageAsSticker(from, media, msg, { packname: `${global.namaStore}`, author: `Store Bot`})
} else if (isVideo || isQuotedVideo) {
let media = await downloadAndSaveMediaMessage('video', `./sticker/${tanggal}.mp4`)
reply(mess.wait)
youzuf.sendVideoAsSticker(from, media, msg, { packname: `${global.namaStore}`, author: `Store Bot`})
} else {
reply(`Kirim/reply gambar/vidio dengan caption *${prefix+command}*`)
}
}
break
case 'owner':{
var owner_Nya = `${global.ownerNumber}`
sendContact(from, owner_Nya, `${global.ownerName}`, msg)
reply('*Itu kak nomor owner ku, Chat aja gk usah malu😆*')
}
break

case 'ffstalk':{
if (!q) return reply(`Kirim perintah ${prefix+command} id\nContoh: ${prefix+command} 2023873618`)
let anu = await fetchJson('https://api.gamestoreindonesia.com/v1/order/prepare/FREEFIRE?userId=' + q + '&zoneId=null')
if (!anu.statusCode == "404") return reply("Id tidak ditemukan")
    let dataa = anu.data
reply(`*BERHASIL DITEMUKAN*
ID: ${q}
Nickname: ${dataa}`)
}
break
case 'mlstalk':{
if (!q) return reply(`Kirim perintah ${prefix+command} id|zone\nContoh: ${prefix+command} 106281329|2228`)
var id = q.split('|')[0]
var zon = q.split('|')[1]
if (!id) return reply('ID wajib di isi')
if (!zon) return reply('ZoneID wajib di isi')
let anu = await fetchJson('https://api.gamestoreindonesia.com/v1/order/prepare/MOBILE_LEGENDS?userId=' + id + '&zoneId=' + zon)
if (!anu.statusCode == "404") return reply("Id/zone tidak ditemukan")
    let dataa = anu.data
reply(`*BERHSAIL DITEMUKAN*
ID: ${id}
Zone: ${zon}
Nickname: ${dataa}`)
}
break

case 'tiktok':{ 
if (!q) return reply( `Example : ${prefix + command} link`)
if (!q.includes('tiktok')) return reply(`Link Invalid!!`)
reply(mess.wait)
require('./lib/scraper2').Tiktok(q).then( data => {
youzuf.sendMessage(from, { caption: `*Download Tiktok No Wm*`, video: { url: data.watermark }}, {quoted:msg})
})
}
break
case 'tiktokaudio':{
if (!q) return reply( `Example : ${prefix + command} link`)
if (!q.includes('tiktok')) return reply(`Link Invalid!!`)
reply(mess.wait)
require('./lib/scraper2').Tiktok(q).then( data => {
youzuf.sendMessage(from, { audio: { url: data.audio }, mimetype: 'audio/mp4' }, { quoted: msg })
})
}
break
case 'yt':
case 'youtube':
	youzuf.sendMessage(from, 
{text: `Jangan Lupa Subscriber yah kak
*Link* : ${global.linkyt}`},
{quoted: msg})
break
case 'ig':
case 'instagram':
	youzuf.sendMessage(from, {text: `Follow Instragram kami\nLink \n${global.linkig}`},
{quoted: msg})
break
case 'gc':
case 'groupadmin':
	youzuf.sendMessage(from, 
{text: `*Group  ${global.ownerName}*\n
Group1 : ${global.linkgc1}
Group2 : ${global.linkgc2}`},
{quoted: msg})
break
case 'donasi': case 'donate':{
let tekssss = `───「  *DONASI*  」────

*Payment donasi💰* 

- *Dana :* ${global.dana}
- *Gopay :*  ${global.gopay}
- *Ovo :* ${global.ovo}
- *Saweria :* ${global.sawer}
- *Qris :* Scan qr di atas

berapapun donasi dari kalian itu sangat berarti bagi kami 
`
youzuf.sendMessage(from, { image: fs.readFileSync(`./gambar/qris.jpg`),
 caption: tekssss, 
footer: `${global.ownerName} © 2022`},
{quoted: msg})
}
break
case 'sendbyr':{
	if (!isOwner) return reply(mess.OnlyOwner)
	if (!q) return reply('*Contoh:*\n.add 628xxx')
	var number = q.replace(/[^0-9]/gi, '')+'@s.whatsapp.net'
let tekssss = `───「  *PAYMENT*  」────

- *Dana :* ${global.dana}
- *Gopay :*  ${global.gopay}
- *Ovo :* ${global.ovo}
- *Qris :* Scan qr di atas

_Pembayaran ini Telah di kirim oleh Admin_
_Melalui bot ini🙏_


OK, thanks udah order di *${global.namaStore}*
`
youzuf.sendMessage(number, { image: fs.readFileSync(`./gambar/qris.jpg`),
 caption: tekssss, 
footer: `${global.ownerName} © 2022`},
{quoted: msg})
reply (`Suksess Owner ku tercinta 😘🙏`)
}
break
case 'join':{
 if (!isOwner) return reply(mess.OnlyOwner)
if (!q) return reply(`Kirim perintah ${prefix+command} _linkgrup_`)
var ini_urrrl = q.split('https://chat.whatsapp.com/')[1]
var data = await youzuf.groupAcceptInvite(ini_urrrl).then((res) => reply(`Berhasil Join ke grup...`)).catch((err) => reply(`Eror.. Munkin bot telah di kick Dari grup tersebut`))
}
break
case 'pay':
case 'payment':
case 'pembayaran':
case 'bayar':{
let tekssss = `───「  *PAYMENT*  」────

- *Dana :* ${global.dana}
- *Gopay :*  ${global.gopay}
- *Ovo :* ${global.ovo}
- *Qris :* Scan qr di atas

OK, thanks udah order di *${global.botName}*
`
youzuf.sendMessage(from, { image: fs.readFileSync(`./gambar/qris.jpg`),
 caption: tekssss, 
footer: `${global.ownerName} © 2022`},
{quoted: msg})
}
break
case 'mode':{
if (!isOwner) return reply(mess.OnlyOwner)
if (!args[0]) return reply(`Kirim perintah #${command} _options_\nOptions : on & off\nContoh : #${command} on`)
if (args[0] == 'OFF' || args[0] == 'OF' || args[0] == 'Of' || args[0] == 'Off' || args[0] == 'of' || args[0] == 'off') {
if (isCmd) {
if (!msg.key.fromMe && !isOwner) return
reply('Secces mode Off')
}
} else if (args[0] == 'ON' || args[0] == 'on' || args[0] == 'On') {
reply('Secces mode ON')
} else { reply('Kata kunci tidak ditemukan!') }
}
break
case 'p': case 'proses':{
if (!msg.key.fromMe && ! isOwner && !isGroup) return reply('Hanya Dapat Digunakan oleh Owner/admingrup')
if (!msg.key.fromMe && ! isOwner && !isGroupAdmins) return reply('Hanya Dapat Digunakan oleh Owner/admingrup')
if (!quotedMsg) return reply('Reply pesanannya!')
let proses = `「 *TRANSAKSI PENDING* 」\n\n\`\`\`📆 TANGGAL : ${tanggal}\n⌚ JAM     : ${jam}\n✨ STATUS  : Pending\`\`\`\n\n📝 Catatan : ${quotedMsg.chats}\n\nPesanan @${quotedMsg.sender.split("@")[0]} sedang di proses!`
const getTextP = getTextSetProses(from, set_proses);
if (getTextP !== undefined) {
mentions(getTextP.replace('pesan', quotedMsg.chats).replace('nama', quotedMsg.sender.split("@")[0]).replace('jam', jam).replace('tanggal', tanggal), [quotedMsg.sender], true)
} else {
mentions(proses, [quotedMsg.sender], true)
}
}
break
case 'd': case 'done':{
if (!msg.key.fromMe && ! isOwner && !isGroup) return reply('Hanya Dapat Digunakan oleh Owner/admingrup')
if (!msg.key.fromMe && ! isOwner && !isGroupAdmins) return reply('Hanya Dapat Digunakan oleh Owner/admingrup')
if (!quotedMsg) return reply('Reply pesanannya!')
let sukses = `「 *TRANSAKSI BERHASIL* 」\n\n\`\`\`📆 TANGGAL : ${tanggal}\n⌚ JAM     : ${jam}\n✨ STATUS  : Berhasil\`\`\`\n\nTerimakasih @${quotedMsg.sender.split("@")[0]} Next Order ya??`
const getTextD = getTextSetDone(from, set_done);
if (getTextD !== undefined) {
mentions(getTextD.replace('pesan', quotedMsg.chats).replace('nama', quotedMsg.sender.split("@")[0]).replace('jam', jam).replace('tanggal', tanggal), [quotedMsg.sender], true);
} else {
mentions(sukses, [quotedMsg.sender], true)
}
}
break

case 'tambah':
if (!q) return reply(`Gunakan dengan cara ${command} *angka* *angka*\n\n_Contoh_\n\n${command} 1 2`)
var num_one = q.split(' ')[0]
var num_two = q.split(' ')[1]
if (!num_one) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`)
if (!num_two) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`)
var nilai_one = Number(num_one)
var nilai_two = Number(num_two)
reply(`${nilai_one + nilai_two}`)
break
case 'kurang':
if (!q) return reply(`Gunakan dengan cara ${command} *angka* *angka*\n\n_Contoh_\n\n${command} 1 2`)
var num_one = q.split(' ')[0]
var num_two = q.split(' ')[1]
if (!num_one) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`)
if (!num_two) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`)
var nilai_one = Number(num_one)
var nilai_two = Number(num_two)
reply(`${nilai_one - nilai_two}`)
break
case 'kali':
if (!q) return reply(`Gunakan dengan cara ${command} *angka* *angka*\n\n_Contoh_\n\n${command} 1 2`)
var num_one = q.split(' ')[0]
var num_two = q.split(' ')[1]
if (!num_one) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`)
if (!num_two) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`)
var nilai_one = Number(num_one)
var nilai_two = Number(num_two)
reply(`${nilai_one * nilai_two}`)
break
case 'bagi':
if (!q) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${command} 1 2`)
var num_one = q.split(' ')[0]
var num_two = q.split(' ')[1]
if (!num_one) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`)
if (!num_two) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`)
var nilai_one = Number(num_one)
var nilai_two = Number(num_two)
reply(`${nilai_one / nilai_two}`)
break
case 'hidetag':
if (!isGroup) return reply(mess.OnlyGroup)
if (!isGroupAdmins) return reply(mess.GrupAdmin)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
let mem = [];
groupMembers.map( i => mem.push(i.id) )
youzuf.sendMessage(from, { text: q ? q : '', mentions: mem })
break
case 'antilink':{
if (!isGroup) return reply(mess.OnlyGroup)
if (!isGroupAdmins) return reply(mess.GrupAdmin)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
if (!args[0]) return reply(`Kirim perintah #${command} _options_\nOptions : on & off\nContoh : #${command} on`)
if (args[0] == 'ON' || args[0] == 'on' || args[0] == 'On') {
if (isAntiLink) return reply('Antilink sudah aktif')
antilink.push(from)
fs.writeFileSync('./database/antilink.json', JSON.stringify(antilink, null, 2))
reply('Successfully Activate Antilink In This Group')
} else if (args[0] == 'OFF' || args[0] == 'OF' || args[0] == 'Of' || args[0] == 'Off' || args[0] == 'of' || args[0] == 'off') {
if (!isAntiLink) return reply('Antilink belum aktif')
let anu = antilink.indexOf(from)
antilink.splice(anu, 1)
fs.writeFileSync('./database/antilink.json', JSON.stringify(antilink, null, 2))
reply('Successfully Disabling Antilink In This Group')
} else { reply('Kata kunci tidak ditemukan!') }
}
break
case 'tagall':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
if (!q) return reply(`Teks?\nContoh #tagall hallo`)
let teks_tagall = `══✪〘 *👥 Tag All* 〙✪══\n\n${q ? q : ''}\n\n`
for (let mem of participants) {
teks_tagall += `➲ @${mem.id.split('@')[0]}\n`
}
youzuf.sendMessage(from, { text: teks_tagall, mentions: participants.map(a => a.id) }, { quoted: msg })
break
case 'fitnah':
if (!isGroup) return reply(mess.OnlyGrup)
if (!q) return reply(`Kirim perintah #*${command}* @tag|pesantarget|pesanbot`)
var org = q.split("|")[0]
var target = q.split("|")[1]
var bot = q.split("|")[2]
if (!org.startsWith('@')) return reply('Tag orangnya')
if (!target) return reply(`Masukkan pesan target!`)
if (!bot) return reply(`Masukkan pesan bot!`)
var mens = parseMention(target)
var msg1 = { key: { fromMe: false, participant: `${parseMention(org)}`, remoteJid: from ? from : '' }, message: { extemdedTextMessage: { text: `${target}`, contextInfo: { mentionedJid: mens }}}}
var msg2 = { key: { fromMe: false, participant: `${parseMention(org)}`, remoteJid: from ? from : '' }, message: { conversation: `${target}` }}
youzuf.sendMessage(from, { text: bot, mentions: mentioned }, { quoted: mens.length > 2 ? msg1 : msg2 })
break
case 'del':
case 'delete':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
if (!quotedMsg) return reply(`Balas chat dari bot yang ingin dihapus`)
if (!quotedMsg.fromMe) return reply(`Hanya bisa menghapus chat dari bot`)
youzuf.sendMessage(from, { delete: { fromMe: true, id: quotedMsg.id, remoteJid: from }})
break
case 'linkgrup': case 'linkgc':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
var url = await youzuf.groupInviteCode(from).catch(() => reply(mess.error.api))
url = 'https://chat.whatsapp.com/'+url
reply(url)
break
case 'revoke':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins) return reply(mess.GrupAdmin)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
await youzuf.groupRevokeInvite(from)
.then( res => {
reply(`Sukses menyetel tautan undangan grup ini`)
}).catch(() => reply(mess.error.api))
break
case 'antilink2':{
if (!isGroup) return reply(mess.OnlyGroup)
if (!isGroupAdmins) return reply(mess.GrupAdmin)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
if (!args[0]) return reply(`Kirim perintah #${command} _options_\nOptions : on & off\nContoh : #${command} on`)
if (args[0] == 'ON' || args[0] == 'on' || args[0] == 'On') {
if (isAntiLink2) return reply('Antilink 2 sudah aktif')
antilink2.push(from)
fs.writeFileSync('./database/antilink2.json', JSON.stringify(antilink2, null, 2))
reply('Successfully Activate Antilink 2 In This Group')
} else if (args[0] == 'OFF' || args[0] == 'OF' || args[0] == 'Of' || args[0] == 'Off' || args[0] == 'of' || args[0] == 'off') {
if (!isAntiLink2) return reply('Antilink 2 belum aktif')
let anu = antilink2.indexOf(from)
antilink2.splice(anu, 1)
fs.writeFileSync('./database/antilink2.json', JSON.stringify(antilink2, null, 2))
reply('Successfully Disabling Antilink 2 In This Group')
} else { reply('Kata kunci tidak ditemukan!') }
}
break
case 'group':
case 'grup':
if (!isGroup) return reply(mess.OnlyGroup)
if (!isGroupAdmins) return reply(mess.GrupAdmin)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
if (!q) return reply(`Kirim perintah #${command} _options_\nOptions : close & open\nContoh : #${command} close`)
if (args[0] == "close") {
youzuf.groupSettingUpdate(from, 'announcement')
reply(`Sukses mengizinkan hanya admin yang dapat mengirim pesan ke grup ini`)
} else if (args[0] == "open") {
youzuf.groupSettingUpdate(from, 'not_announcement')
reply(`Sukses mengizinkan semua peserta dapat mengirim pesan ke grup ini`)
} else {
reply(`Kirim perintah #${command} _options_\nOptions : close & open\nContoh : #${command} close`)
}
break
case 'kick':
if (!isGroup) return reply(mess.OnlyGroup)
if (!isGroupAdmins) return reply(mess.GrupAdmin)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
var number;
if (mentionUser.length !== 0) {
number = mentionUser[0]
youzuf.groupParticipantsUpdate(from, [number], "remove")
.then( res => 
reply(`*Sukses mengeluarkan member..!*`))
.catch((err) => reply(mess.error.api))
} else if (isQuotedMsg) {
number = quotedMsg.sender
youzuf.groupParticipantsUpdate(from, [number], "remove")
.then( res => 
reply(`*Sukses mengeluarkan member..!*`))
.catch((err) => reply(mess.error.api))
} else {
reply(`Tag atau balas pesan orang yang ingin dikeluarkan dari grup`)
}
break
case 'welcome':{
if (!isGroup) return reply('Khusus Group!') 
if (!msg.key.fromMe && !isOwner && !isGroupAdmins) return reply("Mau ngapain?, Fitur ini khusus admin")
if (!args[0]) return reply('*Kirim Format*\n\n.welcome on\n.welcome off')
if (args[0] == 'ON' || args[0] == 'on' || args[0] == 'On') {
if (isWelcome) return reply('Sudah aktif✓')
welcome.push(from)
fs.writeFileSync('./database/welcome.json', JSON.stringify(welcome))
reply('Suksess mengaktifkan welcome di group:\n'+groupName)
} else if (args[0] == 'OFF' || args[0] == 'OF' || args[0] == 'Of' || args[0] == 'Off' || args[0] == 'of' || args[0] == 'off') {
var posi = welcome.indexOf(from)
welcome.splice(posi, 1)
fs.writeFileSync('./database/welcome.json', JSON.stringify(welcome))
reply('Success menonaktifkan welcome di group:\n'+groupName)
} else { reply('Kata kunci tidak ditemukan!') }
}
break
case 'block':{
if (!isOwner && !fromMe) return reply(mess.OnlyOwner)
if (!q) return reply(`Ex : ${prefix+command} Nomor Yang Ingin Di Block\n\nContoh :\n${prefix+command} 628xxxx`)
let nomorNya = q
await youzuf.updateBlockStatus(`${nomorNya}@s.whatsapp.net`, "block") // Block user
reply('Sukses Block Nomor')
}
break
case 'unblock':{
if (!isOwner && !fromMe) return reply(mess.OnlyOwner)
if (!q) return reply(`Ex : ${prefix+command} Nomor Yang Ingin Di Unblock\n\nContoh :\n${prefix+command} 628xxxx`)
let nomorNya = q
await youzuf.updateBlockStatus(`${nomorNya}@s.whatsapp.net`, "unblock")
reply('Sukses Unblock Nomor')
}
break
case 'shop':
case 'list':
  if (!isGroup) {
    return reply(mess.OnlyGrup);
  }
  if (db_respon_list.length === 0) {
    return reply(`Belum ada list message di database`);
  }
  if (!isAlreadyResponListGroup(from, db_respon_list)) {
    return reply(`Belum ada list message yang terdaftar di group ini`);
  }
  var arr_rows = [];
  for (let x of db_respon_list) {
    if (x.id === from) {
      arr_rows.push({
        title: x.key,
        rowId: x.key
      });
    }
  }
  let tekny = `Hai @${sender.split("@")[0]}\nBerikut list item yang tersedia di group ini!\n\nSilahkan ketik nama produk yang diinginkan!\n\n`;
  for (let i of arr_rows) {
    tekny += `Produk : ${i.title}\n\n`;
  }
  var listMsg = {
    text: tekny,
  };
  youzuf.sendMessage(from, listMsg);
  break;
case 'addlist':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
var args1 = q.split("@")[0]
var args2 = q.split("@")[1]
if (!q.includes("@")) return reply(`Gunakan dengan cara ${command} *key@response*\n\n_Contoh_\n\n#${command} tes@apa\n\nAtau kalian bisa Reply/Kasih Image dengan caption: #${command} tes@apa`)
if (isImage || isQuotedImage) {
if (isAlreadyResponList(from, args1, db_respon_list)) return reply(`List respon dengan key : *${args1}* sudah ada di group ini.`)
let media = await downloadAndSaveMediaMessage('image', `./gambar/${sender.split('@')[0]}.jpg`)
let url = await TelegraPh(media)
addResponList(from, args1, args2, true, url, db_respon_list)
reply(`Berhasil menambah List menu : *${args1}*`)
} else {
	if (isAlreadyResponList(from, args1, db_respon_list)) return reply(`List respon dengan key : *${args1}* sudah ada di group ini.`)
	addResponList(from, args1, args2, false, '-', db_respon_list)
reply(`Berhasil menambah List menu : *${args1}*`)
}
break
case 'dellist':{
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
if (db_respon_list.length === 0) return reply(`Belum ada list message di database`)
var arr_rows = [];
for (let x of db_respon_list) {
if (x.id === from) {
arr_rows.push({
title: x.key,
rowId: `#hapuslist ${x.key}`
})
}
}
let tekny = `Hai @${sender.split("@")[0]}\nSilahkan Hapus list dengan Mengetik #hapuslist Nama list\n\nContoh: #hapuslist Tes\n\n`;
  for (let i of arr_rows) {
    tekny += `List : ${i.title}\n\n`;
  }
var listMsg = {
    text: tekny,
  };
youzuf.sendMessage(from, listMsg)
}
break
case 'hapuslist':
delResponList(from, q, db_respon_list)
reply(`Sukses delete list message dengan key *${q}*`)
break
case 'sc':
case 'script':
case 'scbot':
case 'scriptbot':{
reply(`𝗦𝗖𝗥𝗜𝗣𝗧 𝗞𝗛𝗨𝗦𝗨𝗦 𝗦𝗧𝗢𝗥𝗘 𝗩7

-Untuk Script nya bisa kalian dapatkan di YouTube saya
: https://youtube.com/@RamaaGnnZ
-Judul Sc:
: SC STORE V7

Sosial media
https://Instagram.com/@mmsuffy`)
}
break
case 'testi':{
if (isGroup) return reply(mess.OnlyPM)
if (db_respon_testi.length === 0) return reply(`Belum ada list testi di database`)
var teks = `Hi @${sender.split("@")[0]}\nBerikut list testi\n\n`
for (let x of db_respon_testi) {
teks += `*LIST TESTI:* ${x.key}\n\n`
}
teks += `_Ingin melihat listnya?_\n_Ketik List Testi yang ada di atss_`
var listMsg = {
text: teks,
mentions: [sender]
}
youzuf.sendMessage(from, listMsg, { quoted: msg })
}
break
case 'addtesti':
if (isGroup) return reply(mess.OnlyPM)
if (!isOwner) return reply(mess.OnlyOwner)
var args1 = q.split("@")[0]
var args2 = q.split("@")[1]
if (isImage || isQuotedImage) {
if (!q.includes("@")) return reply(`Gunakan dengan cara ${prefix+command} *key@response*\n\n_Contoh_\n\n${prefix+command} testi1@testimoni sc bot`)
if (isAlreadyResponTesti(args1, db_respon_testi)) return reply(`List respon dengan key : *${args1}* sudah ada.`)
let media = await downloadAndSaveMediaMessage('image', `./gambar/${sender}`)
let tphurl = await TelegraPh(media)
addResponTesti(args1, args2, true, tphurl, db_respon_testi)
reply(`Berhasil menambah List testi *${args1}*`)
if (fs.existsSync(media)) return fs.unlinkSync(media)
} else {
	reply(`Kirim gambar dengan caption ${prefix+command} *key@response* atau reply gambar yang sudah ada dengan caption ${prefix+command} *key@response*`)
	}
break
case 'deltesti':
if (isGroup) return reply(mess.OnlyPM)
if (!isOwner) return reply(mess.OnlyOwner)
if (db_respon_testi.length === 0) return reply(`Belum ada list testi di database`)
if (!q) return reply(`Gunakan dengan cara ${prefix+command} *key*\n\n_Contoh_\n\n${prefix+command} testi1`)
if (!isAlreadyResponTesti(q, db_respon_testi)) return reply(`List testi dengan key *${q}* tidak ada di database!`)
delResponTesti(q, db_respon_testi)
reply(`Sukses delete list testi dengan key *${q}*`)
break
case 'listproduk': case 'produk':{
if (isGroup) return reply(mess.OnlyPM)
if (db_respon_produk.length === 0) return reply(`Belum ada list produk di database`)
var teks = `Hi @${sender.split("@")[0]}\nBerikut list produk\n\n`
for (let x of db_respon_produk) {
teks += `〆 ${x.key}\n`
}
teks += `\n _Contoh: Sewa bot_\n_Ketik .payment untuk pembelian_`
var listMsg = {
text: teks,
mentions: [sender]
}
youzuf.sendMessage(from, listMsg, { quoted: msg })
}
break
case "balaspesan": {
let t = q.split(',');
if (t.length < 2) return reply(`*Format salah!*
Penggunaan:
${prefix + command} user,nomer`)
let u = msg.quoted ? msg.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : msg.mentionedJid[0];
let pesanya = t[0];
let pesan = pesanya
if (!u) return
ctf = pesan
youzuf.sendMessage(u, { text: ctf }, { quoted: fkontak })

}

break
case 'addproduk':
if (isGroup) return reply(mess.OnlyPM)
if (!isOwner) return reply(mess.OnlyOwner)
var args1 = q.split("@")[0]
var args2 = q.split("@")[1]
if (isImage || isQuotedImage) {
if (!q.includes("@")) return reply(`Gunakan dengan cara ${prefix+command} *key@response*\n\n_Contoh_\n\n${prefix+command} diamond_ml@list mu`)
if (isAlreadyResponProduk(args1, db_respon_produk)) return reply(`List respon dengan key : *${args1}* sudah ada.`)
let media = await downloadAndSaveMediaMessage('image', `./gambar/${sender}`)
let tphurl = await TelegraPh(media)
addResponProduk(args1, args2, true, tphurl, db_respon_produk)
reply(`Berhasil menambah List Produk *${args1}*`)
if (fs.existsSync(media)) return fs.unlinkSync(media)
} else {
	reply(`Kirim gambar dengan caption ${prefix+command} *key@response* atau reply gambar yang sudah ada dengan caption ${prefix+command} *key@response*`)
	}
break
case 'delproduk':
if (isGroup) return reply(mess.OnlyPM)
if (!isOwner) return reply(mess.OnlyOwner)
if (db_respon_produk.length === 0) return reply(`Belum ada list produk di database`)
if (!q) return reply(`Gunakan dengan cara ${prefix+command} *key*\n\n_Contoh_\n\n${prefix+command} diamond_ml`)
if (!isAlreadyResponProduk(q, db_respon_produk)) return reply(`List testi dengan key *${q}* tidak ada di database!`)
delResponProduk(q, db_respon_produk)
reply(`Sukses delete list testi dengan key *${q}*`)
break
case 'setdone': case 'setd':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
if (!q) return reply(`Gunakan dengan cara ${prefix+command} *teks_done*\n\n_Contoh_\n\n${prefix+command} pesanan @pesan, tag orang @nama\n\nList Opts : tanggal/jamwib`)
if (isSetDone(from, set_done)) return reply(`Set done already active`)
addSetDone(q, from, set_done)
reply(`Successfully set done!`)
break

case 'delsetdone': case 'delsetd':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
if (!isSetDone(from, set_done)) return reply(`Belum ada set done di sini..`)
removeSetDone(from, set_done)
reply(`Sukses delete set done`)
break

case 'changedone': case 'changed':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
if (!q) return reply(`Gunakan dengan cara ${prefix+command} *teks_done*\n\n_Contoh_\n\n${prefix+command} pesanan @pesan, tag orang @nama\n\nList Opts : tanggal/jamwib`)
if (isSetDone(from, set_done)) {
changeSetDone(q, from, set_done)
reply(`Sukses change set done teks!`)
} else {
addSetDone(q, from, set_done)
reply(`Sukses change set done teks!`)
}
break

case 'setproses': case 'setp':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
if (!q) return reply(`Gunakan dengan cara *${prefix+command} teks*\n\n_Contoh_\n\n${prefix+command} pesanan @pesan, tag orang @nama`)
if (isSetProses(from, set_proses)) return reply(`Set proses already active`)
addSetProses(q, from, set_proses)
reply(`Sukses set proses!`)
break

case 'delsetproses': case 'delsetp':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
if (!isSetProses(from, set_proses)) return reply(`Belum ada set proses di sini..`)
removeSetProses(from, set_proses)
reply(`Sukses delete set proses`)
break

case 'changeproses': case 'changep':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
if (!q) return reply(`Gunakan dengan cara ${prefix+command} *teks_p*\n\n_Contoh_\n\n${prefix+command} pesanan @pesan, tag orang @nama`)
if (isSetProses(from, set_proses)) {
changeSetProses(q, from, set_proses)
reply(`Sukses change set proses teks!`)
} else {
addSetProses(q, from, set_proses)
reply(`Sukses change set proses teks!`)
}
break
case 'gantiqris':{
	if (!isOwner) return reply(mess.OnlyOwner)
if (isImage || isQuotedImage) {
	let media = await downloadAndSaveMediaMessage('image', `./gambar/${sender}`)
	fs.unlinkSync(`./gambar/qris.jpg`)
	fs.renameSync(media, `./gambar/qris.jpg`)
reply(`Sukses mengganti Image Qris`)
} else {
	reply(`kirim gambar/reply gambar dengan caption .gantiqris`)
}
}
break
case 'addsewa': {
	if (q < 2) return reply(`Contoh: ${prefix + command} *linkgc waktu*\n\nContoh : ${command} https://chat.whatsapp.com/JanPql7MaMLa 30d\n\n*CATATAN:*\nd = hari (day)\nm = menit(minute)\ns = detik (second)\ny = tahun (year)\nh = jam (hour)`)
var url = q.split(' ')[0]
var hari = q.split(' ')[1]
if (!isUrl(url)) return reply("Link grup tidak valid");
var urrll = url.split('https://chat.whatsapp.com/')[1]
var data = await youzuf.groupAcceptInvite(urrll);
if (checkSewaGroup(data, sewa)) return reply(`Bot sudah disewakan di grup tersebut 🙂‍↔️`);
   addSewaGroup(data, hari, sewa);
          reply(`Bot berhasil disewakan dalam waktu *${hari}* 🙂‍↕️`)
          youzuf.sendMessage(data, {text: `Haii...\nBot telah disewakan di grup ini selama *${hari}* ketik .menu untuk memulai bot, jika tidak merespon ketik 2x agar bot bisa merespon`})
          }
          break
          case 'delsewa': {
          if (!isOwner) return reply(mess.OnlyOwner);
          if (!isGroup) return reply(`Khusus di dalam group`)
          if (!isSewa) return m.reply(`Bot tidak disewakan di grup ini🙂‍↔️`);
          sewa.splice(getSewaPosition(from, sewa), 1);
          fs.writeFileSync("./database/sewa.json",JSON.stringify(sewa, null, 2));
          reply(`Suksess delete sewa di grup ini🙂‍↕️`);
        }
        break
        case 'ceksewa': {
          if (!isGroup) return reply("fitur ini khusus di grub🙂‍↔️");
          try {
            const sewaData = await readSewaFile();
            const matchingEntry = sewaData.find(
              (entry) => entry.id === msg.key.remoteJid
            );
            if (matchingEntry) {
              const groupName = await getGcName(matchingEntry.id);
              const dateexpired = matchingEntry.expired - Date.now();
              const formattedDate = msToDate(dateexpired);
              reply(`*CEK SEWA DI GROUP ${groupName}*\n\n*⌛EXPIRED TIME:* ${formattedDate}`
              );
            } else {
              reply("Grup ini tidak disewakan");
            }
          } catch (error) {
            console.error("ror", error);
            reply("An error occurred while processing the request.");
          }
        }
        break;
   case 'listsewa': {       
          if (!isOwner) return reply(mess.OnlyOwner);
          if (isGroup) return reply(`Fitur ini tidak dapat digunakan dialam group`)
          let list_sewa_list = `*LIST SEWA BOT🤖*\n*Total Group:* ${sewa.length}\n\n`;
          let data_array = [];
          for (let x of sewa) {
            list_sewa_list += `*NAME:* ${await getGcName(x.id)}\n*ID :* ${x.id}\n`;
            if (x.expired === "PERMANENT") {
              let ceksewa = "PERMANENT";
              list_sewa_list += `*Expired :* Unlimited\n\n`;
            } else {
              let ceksewa = x.expired - Date.now();
              list_sewa_list += `*Expired :* ${msToDate(ceksewa)}\n\n`;
            }
          }
          youzuf.sendMessage(from, { text: list_sewa_list }, { quoted: msg });
        }
        break;
case "1gb": {
if (cekSaldo(sender,db_saldo) < 2000) return youzuf.sendMessage(from, { text: `❌ 𝗦𝗔𝗟𝗗𝗢 𝗞𝗨𝗥𝗔𝗡𝗚 𝗕𝗥𝗢!

*👤 Nama : @${sender.split('@')[0]}*
*🛒Produk : ${command}*
*📝Harga : Rp2.000*
*💸 Saldo : Rp${toRupiah(cekSaldo(sender, db_saldo))}*

_ketik  *.deposit* untuk melakukan pembelian di bot_`, mentions: [sender]}, { quoted: msg })
let t = q.split(',');
if (t.length < 2) return reply(`*Format salah!*
Penggunaan:
${prefix + command} user,nomer,pw,pw`)
minSaldo(sender, 2000, db_saldo)
let username = t[0];
let u = msg.quoted ? msg.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : msg.mentionedJid[0];
let name = username
let egg = "15"
let loc = "1"
let memo = "1024"
let cpu = "30"
let disk = "1024"
let email = username + "@gmail.com"
akunlo = "https://telegra.ph/file/b63e3a3873223d8abf8c4.jpg" 
if (!u) return
let d = (await youzuf.onWhatsApp(u.split`@`[0]))[0] || {}
let password = t[2];
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password
})
})
let data = await f.json();
if (data.errors) return reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
reply(`SUCCES CREATE USER ID: ${user.id}`)
ctf = `Hai @${u.split`@`[0]}

𝘽𝙀𝙍𝙄𝙆𝙐𝙏 𝘿𝘼𝙏𝘼 𝙋𝘼𝙉𝙀𝙇 𝘼𝙉𝘿𝘼⚡ ͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏

𝙇𝙞𝙣𝙠 : ${domain}
𝙀𝙢𝙖𝙞𝙡 : ${user.email}
𝙐𝙨𝙚𝙧𝙣𝙖𝙢𝙚 : ${user.username}
𝙋𝙖𝙨𝙬𝙤𝙧𝙙 : ${password}

⚡𝙉𝙊𝙏𝙀:
𝙎𝙄𝙈𝙋𝘼𝙉 𝙇𝙄𝙉𝙆 𝘽𝙀𝙎𝙀𝙍𝙏𝘼 𝙐𝙎𝙀𝙍 & 𝙋𝙒, 𝙅𝙄𝙆𝘼 𝙇𝙄𝙉𝙆 𝙃𝙄𝙇𝘼𝙉𝙂/𝙇𝙐𝙋𝘼, [𝙔𝙐𝙎𝙐𝙁𝙓𝘿] 𝙏𝙄𝘿𝘼𝙆 𝘼𝙆𝘼𝙉 𝙈𝙀𝙉𝙂𝙄𝙍𝙄𝙈 𝙉𝙔𝘼 2𝙓

𝙏𝙪𝙩𝙤𝙧𝙞𝙖𝙡 𝙥𝙖𝙨𝙖𝙣𝙜 𝙨𝙘
https://youtu.be/PI0yAwIf4y4?si=zmzX7dWfKZhEyS47
`
youzuf.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: fkontak })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": "PANEL BY Yusuf",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 5
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = await reply(`
┌⁠──────────⁠─────────
○ *SUCCESSFULLY ADD USER + SERVER*

○ TYPE: user

○ ID : ${user.id}
○ USERNAME : ${user.username}
○ EMAIL : ${user.email}
○ NAME : ${user.first_name} ${user.last_name}
○ MEMORY : ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
○ DISK : ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
○ CPU : ${server.limits.cpu}%
└──────────⁠─────────

`)

}

break

case "2gb": {
if (cekSaldo(sender,db_saldo) < 4000) return youzuf.sendMessage(from, { text: `❌ 𝗦𝗔𝗟𝗗𝗢 𝗞𝗨𝗥𝗔𝗡𝗚 𝗕𝗥𝗢!

*👤 Nama : @${sender.split('@')[0]}*
*🛒Produk : ${command}*
*📝Harga : Rp4.000*
*💸 Saldo : Rp${toRupiah(cekSaldo(sender, db_saldo))}*

_ketik  *.deposit* untuk melakukan pembelian di bot_`, mentions: [sender]}, { quoted: msg })
let t = q.split(',');
if (t.length < 2) return reply(`*Format salah!*
Penggunaan:
${prefix + command} user,nomer,pw`)
minSaldo(sender, 4000, db_saldo)
let username = t[0];
let u = msg.quoted ? msg.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : msg.mentionedJid[0];
let name = username
let egg = "15"
let loc = "1"
let memo = "2048"
let cpu = "50"
let disk = "2048"
let email = username + "@gmail.com"
akunlo = "https://telegra.ph/file/b63e3a3873223d8abf8c4.jpg" 
if (!u) return
let d = (await youzuf.onWhatsApp(u.split`@`[0]))[0] || {}
let password = t[2];
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password
})
})
let data = await f.json();
if (data.errors) return reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
reply(`SUCCES CREATE USER ID: ${user.id}`)
ctf = `Hai @${u.split`@`[0]}

𝘽𝙀𝙍𝙄𝙆𝙐𝙏 𝘿𝘼𝙏𝘼 𝙋𝘼𝙉𝙀𝙇 𝘼𝙉𝘿𝘼⚡ ͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏

𝙇𝙞𝙣𝙠 : ${domain}
𝙀𝙢𝙖𝙞𝙡 : ${user.email}
𝙐𝙨𝙚𝙧𝙣𝙖𝙢𝙚 : ${user.username}
𝙋𝙖𝙨𝙬𝙤𝙧𝙙 : ${password}

⚡𝙉𝙊𝙏𝙀:
𝙎𝙄𝙈𝙋𝘼𝙉 𝙇𝙄𝙉𝙆 𝘽𝙀𝙎𝙀𝙍𝙏𝘼 𝙐𝙎𝙀𝙍 & 𝙋𝙒, 𝙅𝙄𝙆𝘼 𝙇𝙄𝙉𝙆 𝙃𝙄𝙇𝘼𝙉𝙂/𝙇𝙐𝙋𝘼, [𝙔𝙐𝙎𝙐𝙁𝙓𝘿] 𝙏𝙄𝘿𝘼𝙆 𝘼𝙆𝘼𝙉 𝙈𝙀𝙉𝙂𝙄𝙍𝙄𝙈 𝙉𝙔𝘼 2𝙓

𝙏𝙪𝙩𝙤𝙧𝙞𝙖𝙡 𝙥𝙖𝙨𝙖𝙣𝙜 𝙨𝙘
https://youtu.be/PI0yAwIf4y4?si=zmzX7dWfKZhEyS47
`
youzuf.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: fkontak })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": "PANEL BY Yusuf",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 5
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = await reply(`
┌⁠──────────⁠─────────
○ *SUCCESSFULLY ADD USER + SERVER*

○ TYPE: user

○ ID : ${user.id}
○ USERNAME : ${user.username}
○ EMAIL : ${user.email}
○ NAME : ${user.first_name} ${user.last_name}
○ MEMORY : ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
○ DISK : ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
○ CPU : ${server.limits.cpu}%
└──────────⁠─────────

`)

}

break

case "3gb": {
if (cekSaldo(sender,db_saldo) < 6000) return youzuf.sendMessage(from, { text: `❌ 𝗦𝗔𝗟𝗗𝗢 𝗞𝗨𝗥𝗔𝗡𝗚 𝗕𝗥𝗢!

*👤 Nama : @${sender.split('@')[0]}*
*🛒Produk : ${command}*
*📝Harga : Rp4.000*
*💸 Saldo : Rp${toRupiah(cekSaldo(sender, db_saldo))}*

_ketik  *.deposit* untuk melakukan pembelian di bot_`, mentions: [sender]}, { quoted: msg })
let t = q.split(',');
if (t.length < 2) return reply(`*Format salah!*
Penggunaan:
${prefix + command} user,nomer,pw`)
minSaldo(sender, 6000, db_saldo)
let username = t[0];
let u = msg.quoted ? msg.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : msg.mentionedJid[0];
let name = username
let egg = "15"
let loc = "1"
let memo = "3072"
let cpu = "75"
let disk = "3072"
let email = username + "@gmail.com"
akunlo = "https://telegra.ph/file/b63e3a3873223d8abf8c4.jpg" 
if (!u) return
let d = (await youzuf.onWhatsApp(u.split`@`[0]))[0] || {}
let password = t[2];
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password
})
})
let data = await f.json();
if (data.errors) return reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
reply(`SUCCES CREATE USER ID: ${user.id}`)
ctf = `Hai @${u.split`@`[0]}

𝘽𝙀𝙍𝙄𝙆𝙐𝙏 𝘿𝘼𝙏𝘼 𝙋𝘼𝙉𝙀𝙇 𝘼𝙉𝘿𝘼⚡ ͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏

𝙇𝙞𝙣𝙠 : ${domain}
𝙀𝙢𝙖𝙞𝙡 : ${user.email}
𝙐𝙨𝙚𝙧𝙣𝙖𝙢𝙚 : ${user.username}
𝙋𝙖𝙨𝙬𝙤𝙧𝙙 : ${password}

⚡𝙉𝙊𝙏𝙀:
𝙎𝙄𝙈𝙋𝘼𝙉 𝙇𝙄𝙉𝙆 𝘽𝙀𝙎𝙀𝙍𝙏𝘼 𝙐𝙎𝙀𝙍 & 𝙋𝙒, 𝙅𝙄𝙆𝘼 𝙇𝙄𝙉𝙆 𝙃𝙄𝙇𝘼𝙉𝙂/𝙇𝙐𝙋𝘼, [𝙔𝙐𝙎𝙐𝙁𝙓𝘿] 𝙏𝙄𝘿𝘼𝙆 𝘼𝙆𝘼𝙉 𝙈𝙀𝙉𝙂𝙄𝙍𝙄𝙈 𝙉𝙔𝘼 2𝙓

𝙏𝙪𝙩𝙤𝙧𝙞𝙖𝙡 𝙥𝙖𝙨𝙖𝙣𝙜 𝙨𝙘
https://youtu.be/PI0yAwIf4y4?si=zmzX7dWfKZhEyS47
`
youzuf.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: fkontak })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": "PANEL BY Yusuf",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 5
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = await reply(`
┌⁠──────────⁠─────────
○ *SUCCESSFULLY ADD USER + SERVER*

○ TYPE: user

○ ID : ${user.id}
○ USERNAME : ${user.username}
○ EMAIL : ${user.email}
○ NAME : ${user.first_name} ${user.last_name}
○ MEMORY : ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
○ DISK : ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
○ CPU : ${server.limits.cpu}%
└──────────⁠─────────

`)

}

break

case "4gb": {
if (cekSaldo(sender,db_saldo) < 8000) return youzuf.sendMessage(from, { text: `❌ 𝗦𝗔𝗟𝗗𝗢 𝗞𝗨𝗥𝗔𝗡𝗚 𝗕𝗥𝗢!

*👤 Nama : @${sender.split('@')[0]}*
*🛒Produk : ${command}*
*📝Harga : Rp8.000*
*💸 Saldo : Rp${toRupiah(cekSaldo(sender, db_saldo))}*

_ketik  *.deposit* untuk melakukan pembelian di bot_`, mentions: [sender]}, { quoted: msg })
let t = q.split(',');
if (t.length < 2) return reply(`*Format salah!*
Penggunaan:
${prefix + command} user,nomer,pw`)
minSaldo(sender, 8000, db_saldo)
let username = t[0];
let u = msg.quoted ? msg.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : msg.mentionedJid[0];
let name = username
let egg = "15"
let loc = "1"
let memo = "4096"
let cpu = "100"
let disk = "4096"
let email = username + "@gmail.com"
akunlo = "https://telegra.ph/file/b63e3a3873223d8abf8c4.jpg" 
if (!u) return
let d = (await youzuf.onWhatsApp(u.split`@`[0]))[0] || {}
let password = t[2];
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password
})
})
let data = await f.json();
if (data.errors) return reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
reply(`SUCCES CREATE USER ID: ${user.id}`)
ctf = `Hai @${u.split`@`[0]}

𝘽𝙀𝙍𝙄𝙆𝙐𝙏 𝘿𝘼𝙏𝘼 𝙋𝘼𝙉𝙀𝙇 𝘼𝙉𝘿𝘼⚡ ͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏

𝙇𝙞𝙣𝙠 : ${domain}
𝙀𝙢𝙖𝙞𝙡 : ${user.email}
𝙐𝙨𝙚𝙧𝙣𝙖𝙢𝙚 : ${user.username}
𝙋𝙖𝙨𝙬𝙤𝙧𝙙 : ${password}

⚡𝙉𝙊𝙏𝙀:
𝙎𝙄𝙈𝙋𝘼𝙉 𝙇𝙄𝙉𝙆 𝘽𝙀𝙎𝙀𝙍𝙏𝘼 𝙐𝙎𝙀𝙍 & 𝙋𝙒, 𝙅𝙄𝙆𝘼 𝙇𝙄𝙉𝙆 𝙃𝙄𝙇𝘼𝙉𝙂/𝙇𝙐𝙋𝘼, [𝙔𝙐𝙎𝙐𝙁𝙓𝘿] 𝙏𝙄𝘿𝘼𝙆 𝘼𝙆𝘼𝙉 𝙈𝙀𝙉𝙂𝙄𝙍𝙄𝙈 𝙉𝙔𝘼 2𝙓

𝙏𝙪𝙩𝙤𝙧𝙞𝙖𝙡 𝙥𝙖𝙨𝙖𝙣𝙜 𝙨𝙘
https://youtu.be/PI0yAwIf4y4?si=zmzX7dWfKZhEyS47
`
youzuf.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: fkontak })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": "PANEL BY Yusuf",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 5
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = await reply(`
┌⁠──────────⁠─────────
○ *SUCCESSFULLY ADD USER + SERVER*

○ TYPE: user

○ ID : ${user.id}
○ USERNAME : ${user.username}
○ EMAIL : ${user.email}
○ NAME : ${user.first_name} ${user.last_name}
○ MEMORY : ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
○ DISK : ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
○ CPU : ${server.limits.cpu}%
└──────────⁠─────────

`)

}

break
case "5gb": {
if (cekSaldo(sender,db_saldo) < 10000) return youzuf.sendMessage(from, { text: `❌ 𝗦𝗔𝗟𝗗𝗢 𝗞𝗨𝗥𝗔𝗡𝗚 𝗕𝗥𝗢!

*👤 Nama : @${sender.split('@')[0]}*
*🛒Produk : ${command}*
*📝Harga : Rp10.000*
*💸 Saldo : Rp${toRupiah(cekSaldo(sender, db_saldo))}*

_ketik  *.deposit* untuk melakukan pembelian di bot_`, mentions: [sender]}, { quoted: msg })
let t = q.split(',');
if (t.length < 2) return reply(`*Format salah!*
Penggunaan:
${prefix + command} user,nomer,pw`)
minSaldo(sender, 10000, db_saldo)
let username = t[0];
let u = msg.quoted ? msg.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : msg.mentionedJid[0];
let name = username
let egg = "15"
let loc = "1"
let memo = "5120"
let cpu = "130"
let disk = "5120"
let email = username + "@gmail.com"
akunlo = "https://telegra.ph/file/b63e3a3873223d8abf8c4.jpg" 
if (!u) return
let d = (await youzuf.onWhatsApp(u.split`@`[0]))[0] || {}
let password = t[2];
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password
})
})
let data = await f.json();
if (data.errors) return reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
reply(`SUCCES CREATE USER ID: ${user.id}`)
ctf = `Hai @${u.split`@`[0]}

𝘽𝙀𝙍𝙄𝙆𝙐𝙏 𝘿𝘼𝙏𝘼 𝙋𝘼𝙉𝙀𝙇 𝘼𝙉𝘿𝘼⚡ ͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏

𝙇𝙞𝙣𝙠 : ${domain}
𝙀𝙢𝙖𝙞𝙡 : ${user.email}
𝙐𝙨𝙚𝙧𝙣𝙖𝙢𝙚 : ${user.username}
𝙋𝙖𝙨𝙬𝙤𝙧𝙙 : ${password}

⚡𝙉𝙊𝙏𝙀:
𝙎𝙄𝙈𝙋𝘼𝙉 𝙇𝙄𝙉𝙆 𝘽𝙀𝙎𝙀𝙍𝙏𝘼 𝙐𝙎𝙀𝙍 & 𝙋𝙒, 𝙅𝙄𝙆𝘼 𝙇𝙄𝙉𝙆 𝙃𝙄𝙇𝘼𝙉𝙂/𝙇𝙐𝙋𝘼, [𝙔𝙐𝙎𝙐𝙁𝙓𝘿] 𝙏𝙄𝘿𝘼𝙆 𝘼𝙆𝘼𝙉 𝙈𝙀𝙉𝙂𝙄𝙍𝙄𝙈 𝙉𝙔𝘼 2𝙓

𝙏𝙪𝙩𝙤𝙧𝙞𝙖𝙡 𝙥𝙖𝙨𝙖𝙣𝙜 𝙨𝙘
https://youtu.be/PI0yAwIf4y4?si=zmzX7dWfKZhEyS47
`
youzuf.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: fkontak })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": "PANEL BY Yusuf",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 5
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = await reply(`
┌⁠──────────⁠─────────
○ *SUCCESSFULLY ADD USER + SERVER*

○ TYPE: user

○ ID : ${user.id}
○ USERNAME : ${user.username}
○ EMAIL : ${user.email}
○ NAME : ${user.first_name} ${user.last_name}
○ MEMORY : ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
○ DISK : ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
○ CPU : ${server.limits.cpu}%
└──────────⁠─────────

`)

}

break
case "6gb": {
if (cekSaldo(sender,db_saldo) < 12000) return youzuf.sendMessage(from, { text: `❌ 𝗦𝗔𝗟𝗗𝗢 𝗞𝗨𝗥𝗔𝗡𝗚 𝗕𝗥𝗢!

*👤 Nama : @${sender.split('@')[0]}*
*🛒Produk : ${command}*
*📝Harga : Rp12.000*
*💸 Saldo : Rp${toRupiah(cekSaldo(sender, db_saldo))}*

_ketik  *.deposit* untuk melakukan pembelian di bot_`, mentions: [sender]}, { quoted: msg })
let t = q.split(',');
if (t.length < 2) return reply(`*Format salah!*
Penggunaan:
${prefix + command} user,nomer,pw`)
minSaldo(sender, 12000, db_saldo)
let username = t[0];
let u = msg.quoted ? msg.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : msg.mentionedJid[0];
let name = username
let egg = "15"
let loc = "1"
let memo = "6144"
let cpu = "150"
let disk = "6144"
let email = username + "@gmail.com"
akunlo = "https://telegra.ph/file/b63e3a3873223d8abf8c4.jpg" 
if (!u) return
let d = (await youzuf.onWhatsApp(u.split`@`[0]))[0] || {}
let password = t[2];
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password
})
})
let data = await f.json();
if (data.errors) return reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
reply(`SUCCES CREATE USER ID: ${user.id}`)
ctf = `Hai @${u.split`@`[0]}

𝘽𝙀𝙍𝙄𝙆𝙐𝙏 𝘿𝘼𝙏𝘼 𝙋𝘼𝙉𝙀𝙇 𝘼𝙉𝘿𝘼⚡ ͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏

𝙇𝙞𝙣𝙠 : ${domain}
𝙀𝙢𝙖𝙞𝙡 : ${user.email}
𝙐𝙨𝙚𝙧𝙣𝙖𝙢𝙚 : ${user.username}
𝙋𝙖𝙨𝙬𝙤𝙧𝙙 : ${password}

⚡𝙉𝙊𝙏𝙀:
𝙎𝙄𝙈𝙋𝘼𝙉 𝙇𝙄𝙉𝙆 𝘽𝙀𝙎𝙀𝙍𝙏𝘼 𝙐𝙎𝙀𝙍 & 𝙋𝙒, 𝙅𝙄𝙆𝘼 𝙇𝙄𝙉𝙆 𝙃𝙄𝙇𝘼𝙉𝙂/𝙇𝙐𝙋𝘼, [𝙔𝙐𝙎𝙐𝙁𝙓𝘿] 𝙏𝙄𝘿𝘼𝙆 𝘼𝙆𝘼𝙉 𝙈𝙀𝙉𝙂𝙄𝙍𝙄𝙈 𝙉𝙔𝘼 2𝙓

𝙏𝙪𝙩𝙤𝙧𝙞𝙖𝙡 𝙥𝙖𝙨𝙖𝙣𝙜 𝙨𝙘
https://youtu.be/PI0yAwIf4y4?si=zmzX7dWfKZhEyS47
`
youzuf.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: fkontak })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": "PANEL BY Yusuf",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 5
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = await reply(`
┌⁠──────────⁠─────────
○ *SUCCESSFULLY ADD USER + SERVER*

○ TYPE: user

○ ID : ${user.id}
○ USERNAME : ${user.username}
○ EMAIL : ${user.email}
○ NAME : ${user.first_name} ${user.last_name}
○ MEMORY : ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
○ DISK : ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
○ CPU : ${server.limits.cpu}%
└──────────⁠─────────`)

}

break

case "7gb": {
if (cekSaldo(sender,db_saldo) < 14000) return youzuf.sendMessage(from, { text: `❌ 𝗦𝗔𝗟𝗗𝗢 𝗞𝗨𝗥𝗔𝗡𝗚 𝗕𝗥𝗢!

*👤 Nama : @${sender.split('@')[0]}*
*🛒Produk : ${command}*
*📝Harga : Rp14.000*
*💸 Saldo : Rp${toRupiah(cekSaldo(sender, db_saldo))}*

_ketik  *.deposit* untuk melakukan pembelian di bot_`, mentions: [sender]}, { quoted: msg })
let t = q.split(',');
if (t.length < 2) return reply(`*Format salah!*
Penggunaan:
${prefix + command} user,nomer,pw`)
minSaldo(sender, 14000, db_saldo)
let username = t[0];
let u = msg.quoted ? msg.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : msg.mentionedJid[0];
let name = username
let egg = "15"
let loc = "1"
let memo = "7168"
let cpu = "180"
let disk = "7168"
let email = username + "@gmail.com"
akunlo = "https://telegra.ph/file/b63e3a3873223d8abf8c4.jpg" 
if (!u) return
let d = (await youzuf.onWhatsApp(u.split`@`[0]))[0] || {}
let password = t[2];
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password
})
})
let data = await f.json();
if (data.errors) return reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
reply(`SUCCES CREATE USER ID: ${user.id}`)
ctf = `Hai @${u.split`@`[0]}

𝘽𝙀𝙍𝙄𝙆𝙐𝙏 𝘿𝘼𝙏𝘼 𝙋𝘼𝙉𝙀𝙇 𝘼𝙉𝘿𝘼⚡ ͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏

𝙇𝙞𝙣𝙠 : ${domain}
𝙀𝙢𝙖𝙞𝙡 : ${user.email}
𝙐𝙨𝙚𝙧𝙣𝙖𝙢𝙚 : ${user.username}
𝙋𝙖𝙨𝙬𝙤𝙧𝙙 : ${password}

⚡𝙉𝙊𝙏𝙀:
𝙎𝙄𝙈𝙋𝘼𝙉 𝙇𝙄𝙉𝙆 𝘽𝙀𝙎𝙀𝙍𝙏𝘼 𝙐𝙎𝙀𝙍 & 𝙋𝙒, 𝙅𝙄𝙆𝘼 𝙇𝙄𝙉𝙆 𝙃𝙄𝙇𝘼𝙉𝙂/𝙇𝙐𝙋𝘼, [𝙔𝙐𝙎𝙐𝙁𝙓𝘿] 𝙏𝙄𝘿𝘼𝙆 𝘼𝙆𝘼𝙉 𝙈𝙀𝙉𝙂𝙄𝙍𝙄𝙈 𝙉𝙔𝘼 2𝙓

𝙏𝙪𝙩𝙤𝙧𝙞𝙖𝙡 𝙥𝙖𝙨𝙖𝙣𝙜 𝙨𝙘
https://youtu.be/PI0yAwIf4y4?si=zmzX7dWfKZhEyS47
`
youzuf.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: fkontak })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": "PANEL BY Yusuf",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 5
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = await reply(`
┌⁠──────────⁠─────────
○ *SUCCESSFULLY ADD USER + SERVER*

○ TYPE: user

○ ID : ${user.id}
○ USERNAME : ${user.username}
○ EMAIL : ${user.email}
○ NAME : ${user.first_name} ${user.last_name}
○ MEMORY : ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
○ DISK : ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
○ CPU : ${server.limits.cpu}%
└──────────⁠─────────`)

}

break

case "unli": {
if (cekSaldo(sender,db_saldo) < 15000) return youzuf.sendMessage(from, { text: `❌ 𝗦𝗔𝗟𝗗𝗢 𝗞𝗨𝗥𝗔𝗡𝗚 𝗕𝗥𝗢!

*👤 Nama : @${sender.split('@')[0]}*
*🛒Produk : ${command}*
*📝Harga : Rp15.000*
*💸 Saldo : Rp${toRupiah(cekSaldo(sender, db_saldo))}*

_ketik  *.deposit* untuk melakukan pembelian di bot_`, mentions: [sender]}, { quoted: msg })
let t = q.split(',');
if (t.length < 2) return reply(`*Format salah!*
Penggunaan:
${prefix + command} user,nomer,pw`)
minSaldo(sender, 15000, db_saldo)
let username = t[0];
let u = msg.quoted ? msg.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : msg.mentionedJid[0];
let name = username
let egg = "15"
let loc = "1"
let memo = "0"
let cpu = "0"
let disk = "0"
let email = username + "@gmail.com"
akunlo = "https://telegra.ph/file/b63e3a3873223d8abf8c4.jpg" 
if (!u) return
let d = (await youzuf.onWhatsApp(u.split`@`[0]))[0] || {}
let password = t[2];
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password
})
})
let data = await f.json();
if (data.errors) return reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
reply(`SUCCES CREATE USER ID: ${user.id}`)
ctf = `Hai @${u.split`@`[0]}

𝘽𝙀𝙍𝙄𝙆𝙐𝙏 𝘿𝘼𝙏𝘼 𝙋𝘼𝙉𝙀𝙇 𝘼𝙉𝘿𝘼⚡ ͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏

𝙇𝙞𝙣𝙠 : ${domain}
𝙀𝙢𝙖𝙞𝙡 : ${user.email}
𝙐𝙨𝙚𝙧𝙣𝙖𝙢𝙚 : ${user.username}
𝙋𝙖𝙨𝙬𝙤𝙧𝙙 : ${password}

⚡𝙉𝙊𝙏𝙀:
𝙎𝙄𝙈𝙋𝘼𝙉 𝙇𝙄𝙉𝙆 𝘽𝙀𝙎𝙀𝙍𝙏𝘼 𝙐𝙎𝙀𝙍 & 𝙋𝙒, 𝙅𝙄𝙆𝘼 𝙇𝙄𝙉𝙆 𝙃𝙄𝙇𝘼𝙉𝙂/𝙇𝙐𝙋𝘼, [𝙔𝙐𝙎𝙐𝙁𝙓𝘿] 𝙏𝙄𝘿𝘼𝙆 𝘼𝙆𝘼𝙉 𝙈𝙀𝙉𝙂𝙄𝙍𝙄𝙈 𝙉𝙔𝘼 2𝙓

𝙏𝙪𝙩𝙤𝙧𝙞𝙖𝙡 𝙥𝙖𝙨𝙖𝙣𝙜 𝙨𝙘
https://youtu.be/PI0yAwIf4y4?si=zmzX7dWfKZhEyS47
`
youzuf.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: fkontak })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": "PANEL BY yusuf",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 5
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = await reply(`
┌⁠──────────⁠─────────
○ *SUCCESSFULLY ADD USER + SERVER*

○ TYPE: user

○ ID : ${user.id}
○ USERNAME : ${user.username}
○ EMAIL : ${user.email}
○ NAME : ${user.first_name} ${user.last_name}
○ MEMORY : ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
○ DISK : ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
○ CPU : ${server.limits.cpu}%
└──────────⁠─────────

`)

}

break

case "createadmin": {
if (cekSaldo(sender,db_saldo) < 25000) return youzuf.sendMessage(from, { text: `❌ 𝗦𝗔𝗟𝗗𝗢 𝗞𝗨𝗥𝗔𝗡𝗚 𝗕𝗥𝗢!

*👤 Nama : @${sender.split('@')[0]}*
*🛒Produk : ${command}*
*📝Harga : Rp25.000*
*💸 Saldo : Rp${toRupiah(cekSaldo(sender, db_saldo))}*

_ketik  *.deposit* untuk melakukan pembelian di bot_`, mentions: [sender]}, { quoted: msg })
let t = q.split(',');
if (t.length < 3) return reply(`*Format salah!*
Penggunaan:
${prefix + command} email,username,number/tag`);
minSaldo(sender, 25000, db_saldo)
let email = t[0];
let username = t[1];
let u = msg.quoted ? msg.quoted.sender : t[2] ? t[2].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : msg.mentionedJid[0];
if (!u) return reply(`*Format salah!*

Penggunaan:
${prefix + command} email,username,number/tag`);
let d = (await youzuf.onWhatsApp(u.split`@`[0]))[0] || {}
let password = t[2];
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": "Yusuf",
"last_name": "Memb",
"language": "en",
"password": password,
root_admin: true,
})
})
let data = await f.json();
if (data.errors) return reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let footer = `Panel By Yusuf`
let p = youzuf.sendMessage(from, { text: `*SUCCESSFULLY ADD ADMIN*

⚡ *ID* : ${user.id}
⚡ *USERNAME* : ${user.username}
⚡ *EMAIL* : ${user.email}
⚡ *NAME* : ${user.first_name} ${user.last_name}
⚡ *CREATED AT* :  ${user.created_at}
⚡ *LOGIN* : ${domain}
⚡ *PASSWORD BERHASIL DI KIRIM KE @${u.split`@`[0]}*`, mentions:[u],
})
youzuf.sendMessage(u, { text: `𝘽𝙀𝙍𝙄𝙆𝙐𝙏 𝘿𝘼𝙏𝘼 𝘼𝘿𝙈𝙄𝙉 𝙋𝘼𝙉𝙀𝙇 𝘼𝙉𝘿𝘼⚡\n ͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏

𝙇𝙞𝙣𝙠 : ${domain}
𝙀𝙢𝙖𝙞𝙡 : ${user.email}
𝙐𝙨𝙚𝙧𝙣𝙖𝙢𝙚 : ${user.username}
𝙋𝙖𝙨𝙬𝙤𝙧𝙙 : ${password}

⚡𝙉𝙊𝙏𝙀:
𝙎𝙄𝙈𝙋𝘼𝙉 𝙇𝙄𝙉𝙆 𝘽𝙀𝙎𝙀𝙍𝙏𝘼 𝙐𝙎𝙀𝙍 & 𝙋𝙒, 𝙅𝙄𝙆𝘼 𝙇𝙄𝙉𝙆 𝙃𝙄𝙇𝘼𝙉𝙂/𝙇𝙐𝙋𝘼, [𝙔𝙐𝙎𝙐𝙁𝙓𝘿] 𝙏𝙄𝘿𝘼𝙆 𝘼𝙆𝘼𝙉 𝙈𝙀𝙉𝙂𝙄𝙍𝙄𝙈 𝙉𝙔𝘼 2𝙓

𝙏𝙪𝙩𝙤𝙧𝙞𝙖𝙡 𝙘𝙧𝙚𝙖𝙩 𝙥𝙖𝙣𝙚𝙡
https://youtu.be/Sy5Sx5TC3sY?si=DpVQZ8RalrI5oCYr`,
})
}
break
           case 'domain1': {
           
    if (cekSaldo(sender,db_saldo) < 5000) return youzuf.sendMessage(from, { text: `❌ 𝗦𝗔𝗟𝗗𝗢 𝗞𝗨𝗥𝗔𝗡𝗚 𝗕𝗥𝗢!

*👤 Nama : @${sender.split('@')[0]}*
*🛒Produk : ${command}*
*📝Harga : Rp5.000*
*💸 Saldo : Rp${toRupiah(cekSaldo(sender, db_saldo))}*

_ketik  *.deposit* untuk melakukan pembelian di bot_`, mentions: [sender]}, { quoted: msg })
           function subDomain1(host, ip) {
             return new Promise((resolve) => {
               let zone = "d41a17e101c0f89f0aec609c31137f91";
               let apitoken = "fjYUs5uWqoZBU-4fCfqiqXHXhdRRrr2Lc2GZ0dOj";
               let tld = "sellerpannel.my.id";
               axios
                 .post(
                   `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`,
                   { type: "A", name: host.replace(/[^a-z0-9.-]/gi, "") + "." + tld, content: ip.replace(/[^0-9.]/gi, ""), ttl: 3600, priority: 10, proxied: false },
                   {
                     headers: {
                       Authorization: "Bearer " + apitoken,
                       "Content-Type": "application/json",
                     },
                   }
                 )
                 .then((e) => {
                   let res = e.data;
                   if (res.success) resolve({ success: true, zone: res.result?.zone_name, name: res.result?.name, ip: res.result?.content });
                 })
                 .catch((e) => {
                   let err1 = e.response?.data?.errors?.[0]?.message || e.response?.data?.errors || e.response?.data || e.response || e;
                   let err1Str = String(err1);
                   resolve({ success: false, error: err1Str });
                 });
             });
           }
   
           let raw1 = args?.join(" ")?.trim();
           if (!raw1) return reply("Contoh .domain5 namalu|167.29.379.23");
minSaldo(sender, 5000, db_saldo)
           let host1 = raw1
             .split("|")[0]
             .trim()
             .replace(/[^a-z0-9.-]/gi, "");
           if (!host1) return reply("host tidak valid, pastikan host hanya mengandung huruf, angka, - (strip), dan . (titik)");
           let ip1 = raw1.split("|")[1]?.replace(/[^0-9.]/gi, "");
           if (!ip1 || ip1.split(".").length < 4) return reply(ip1 ? "ip tidak valid" : "mana ip nya");
   
           subDomain1(host1, ip1).then((e) => {
             if (e['success']) reply(`✅berhasil menambah domain\nip: ${e['ip']}\nhostname: ${e['name']}`);
             else reply(`gagal membuat subdomain\nMsg: ${e['error']}`)
           }); }
           
break

 case 'domain2': {
    if (cekSaldo(sender,db_saldo) < 5000) return youzuf.sendMessage(from, { text: `❌ 𝗦𝗔𝗟𝗗𝗢 𝗞𝗨𝗥𝗔𝗡𝗚 𝗕𝗥𝗢!

*👤 Nama : @${sender.split('@')[0]}*
*🛒Produk : ${command}*
*📝Harga : Rp5.000*
*💸 Saldo : Rp${toRupiah(cekSaldo(sender, db_saldo))}*

_ketik  *.deposit* untuk melakukan pembelian di bot_`, mentions: [sender]}, { quoted: msg })
           function subDomain1(host, ip) {
             return new Promise((resolve) => {
               let zone = "a6c9cf9cd38077e52db6874200c5c0c4";
               let apitoken = "DyQW84WhtZwTfWZCanO-MQNd6gglRwDHOmK8KRF2";
               let tld = "panellku.my.id";
               axios
                 .post(
                   `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`,
                   { type: "A", name: host.replace(/[^a-z0-9.-]/gi, "") + "." + tld, content: ip.replace(/[^0-9.]/gi, ""), ttl: 3600, priority: 10, proxied: false },
                   {
                     headers: {
                       Authorization: "Bearer " + apitoken,
                       "Content-Type": "application/json",
                     },
                   }
                 )
                 .then((e) => {
                   let res = e.data;
                   if (res.success) resolve({ success: true, zone: res.result?.zone_name, name: res.result?.name, ip: res.result?.content });
                 })
                 .catch((e) => {
                   let err1 = e.response?.data?.errors?.[0]?.message || e.response?.data?.errors || e.response?.data || e.response || e;
                   let err1Str = String(err1);
                   resolve({ success: false, error: err1Str });
                 });
             });
           }
   
           let raw1 = args?.join(" ")?.trim();
           if (!raw1) return reply("Contoh .domain5 namalu|167.29.379.23");
minSaldo(sender, 5000, db_saldo)
           let host1 = raw1
             .split("|")[0]
             .trim()
             .replace(/[^a-z0-9.-]/gi, "");
           if (!host1) return reply("host tidak valid, pastikan host hanya mengandung huruf, angka, - (strip), dan . (titik)");
           let ip1 = raw1.split("|")[1]?.replace(/[^0-9.]/gi, "");
           if (!ip1 || ip1.split(".").length < 4) return reply(ip1 ? "ip tidak valid" : "mana ip nya");
   
           subDomain1(host1, ip1).then((e) => {
             if (e['success']) reply(`┏━━━━━━━━━━━━━━━━━━━
┣ Ip = ${e['ip']}
┗━━━━━━━━━━━━━━━━━━━
┣ Username = ${e['name']}
┗━━━━━━━━━━━━━━━━━━━
┣ crate by = ${author}
┗━━━━━━━━━━━━━━━━━━━`);
             else reply(`gagal membuat subdomain\nMsg: ${e['error']}`)
           }); }
           break
           case 'domain3': {
    if (cekSaldo(sender,db_saldo) < 5000) return youzuf.sendMessage(from, { text: `❌ 𝗦𝗔𝗟𝗗𝗢 𝗞𝗨𝗥𝗔𝗡𝗚 𝗕𝗥𝗢!

*👤 Nama : @${sender.split('@')[0]}*
*🛒Produk : ${command}*
*📝Harga : Rp5.000*
*💸 Saldo : Rp${toRupiah(cekSaldo(sender, db_saldo))}*

_ketik  *.deposit* untuk melakukan pembelian di bot_`, mentions: [sender]}, { quoted: msg })
           function subDomain1(host, ip) {
             return new Promise((resolve) => {
               let zone = "512f917ecb9e0d4eb0085458fdcc95ee";
               let apitoken = "a4hizwK6UjIi8MBEscAOVNG-njTDfJejAhOJlOFh";
               let tld = "panellku.me";
               axios
                 .post(
                   `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`,
                   { type: "A", name: host.replace(/[^a-z0-9.-]/gi, "") + "." + tld, content: ip.replace(/[^0-9.]/gi, ""), ttl: 3600, priority: 10, proxied: false },
                   {
                     headers: {
                       Authorization: "Bearer " + apitoken,
                       "Content-Type": "application/json",
                     },
                   }
                 )
                 .then((e) => {
                   let res = e.data;
                   if (res.success) resolve({ success: true, zone: res.result?.zone_name, name: res.result?.name, ip: res.result?.content });
                 })
                 .catch((e) => {
                   let err1 = e.response?.data?.errors?.[0]?.message || e.response?.data?.errors || e.response?.data || e.response || e;
                   let err1Str = String(err1);
                   resolve({ success: false, error: err1Str });
                 });
             });
           }
   
           let raw1 = args?.join(" ")?.trim();
           if (!raw1) return reply("Contoh .domain5 namalu|167.29.379.23");
minSaldo(sender, 5000, db_saldo)
           let host1 = raw1
             .split("|")[0]
             .trim()
             .replace(/[^a-z0-9.-]/gi, "");
           if (!host1) return reply("host tidak valid, pastikan host hanya mengandung huruf, angka, - (strip), dan . (titik)");
           let ip1 = raw1.split("|")[1]?.replace(/[^0-9.]/gi, "");
           if (!ip1 || ip1.split(".").length < 4) return reply(ip1 ? "ip tidak valid" : "mana ip nya");
   
           subDomain1(host1, ip1).then((e) => {
             if (e['success']) reply(`┏━━━━━━━━━━━━━━━━━━━
┣ Ip = ${e['ip']}
┗━━━━━━━━━━━━━━━━━━━
┣ Username = ${e['name']}
┗━━━━━━━━━━━━━━━━━━━
┣ crate by = ${author}
┗━━━━━━━━━━━━━━━━━━━`);
             else reply(`gagal membuat subdomain\nMsg: ${e['error']}`)
           }); }
           break
           case 'domain4': {
    if (cekSaldo(sender,db_saldo) < 5000) return youzuf.sendMessage(from, { text: `❌ 𝗦𝗔𝗟𝗗𝗢 𝗞𝗨𝗥𝗔𝗡𝗚 𝗕𝗥𝗢!

*👤 Nama : @${sender.split('@')[0]}*
*🛒Produk : ${command}*
*📝Harga : Rp5.000*
*💸 Saldo : Rp${toRupiah(cekSaldo(sender, db_saldo))}*

_ketik  *.deposit* untuk melakukan pembelian di bot_`, mentions: [sender]}, { quoted: msg })
           function subDomain1(host, ip) {
             return new Promise((resolve) => {
               let zone = "b268933cdea4ffd662bc56dd84e46e21";
               let apitoken = "v80Y6QMWDamHAg-u18z8IEMBp1kpodn_lZkyduJ8";
               let tld = "panellku.biz.id";
               axios
                 .post(
                   `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`,
                   { type: "A", name: host.replace(/[^a-z0-9.-]/gi, "") + "." + tld, content: ip.replace(/[^0-9.]/gi, ""), ttl: 3600, priority: 10, proxied: false },
                   {
                     headers: {
                       Authorization: "Bearer " + apitoken,
                       "Content-Type": "application/json",
                     },
                   }
                 )
                 .then((e) => {
                   let res = e.data;
                   if (res.success) resolve({ success: true, zone: res.result?.zone_name, name: res.result?.name, ip: res.result?.content });
                 })
                 .catch((e) => {
                   let err1 = e.response?.data?.errors?.[0]?.message || e.response?.data?.errors || e.response?.data || e.response || e;
                   let err1Str = String(err1);
                   resolve({ success: false, error: err1Str });
                 });
             });
           }
   
           let raw1 = args?.join(" ")?.trim();
           if (!raw1) return reply("Contoh .domain5 namalu|167.29.379.23");
minSaldo(sender, 5000, db_saldo)
           let host1 = raw1
             .split("|")[0]
             .trim()
             .replace(/[^a-z0-9.-]/gi, "");
           if (!host1) return reply("host tidak valid, pastikan host hanya mengandung huruf, angka, - (strip), dan . (titik)");
           let ip1 = raw1.split("|")[1]?.replace(/[^0-9.]/gi, "");
           if (!ip1 || ip1.split(".").length < 4) return reply(ip1 ? "ip tidak valid" : "mana ip nya");
   
           subDomain1(host1, ip1).then((e) => {
             if (e['success']) reply(`┏━━━━━━━━━━━━━━━━━━━
┣ Ip = ${e['ip']}
┗━━━━━━━━━━━━━━━━━━━
┣ Username = ${e['name']}
┗━━━━━━━━━━━━━━━━━━━
┣ crate by = ${author}
┗━━━━━━━━━━━━━━━━━━━`);
             else reply(`gagal membuat subdomain\nMsg: ${e['error']}`)
           }); }
           break
           case 'domain5': {
    if (cekSaldo(sender,db_saldo) < 5000) return youzuf.sendMessage(from, { text: `❌ 𝗦𝗔𝗟𝗗𝗢 𝗞𝗨𝗥𝗔𝗡𝗚 𝗕𝗥𝗢!

*👤 Nama : @${sender.split('@')[0]}*
*🛒Produk : ${command}*
*📝Harga : Rp5.000*
*💸 Saldo : Rp${toRupiah(cekSaldo(sender, db_saldo))}*

_ketik  *.deposit* untuk melakukan pembelian di bot_`, mentions: [sender]}, { quoted: msg })
           function subDomain1(host, ip) {
             return new Promise((resolve) => {
               let zone = "c8a876bc10af3ce5ab11f2209121cf63";
               let apitoken = "O8uR00EP6u4Rp9TtmwCSASwfkEHAIaNw2DVmIgAD";
               let tld = "panellku.com";
               axios
                 .post(
                   `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`,
                   { type: "A", name: host.replace(/[^a-z0-9.-]/gi, "") + "." + tld, content: ip.replace(/[^0-9.]/gi, ""), ttl: 3600, priority: 10, proxied: false },
                   {
                     headers: {
                       Authorization: "Bearer " + apitoken,
                       "Content-Type": "application/json",
                     },
                   }
                 )
                 .then((e) => {
                   let res = e.data;
                   if (res.success) resolve({ success: true, zone: res.result?.zone_name, name: res.result?.name, ip: res.result?.content });
                 })
                 .catch((e) => {
                   let err1 = e.response?.data?.errors?.[0]?.message || e.response?.data?.errors || e.response?.data || e.response || e;
                   let err1Str = String(err1);
                   resolve({ success: false, error: err1Str });
                 });
             });
           }
   
           let raw1 = args?.join(" ")?.trim();
           if (!raw1) return reply("Contoh .domain5 namalu|167.29.379.23");
minSaldo(sender, 5000, db_saldo)
           let host1 = raw1
             .split("|")[0]
             .trim()
             .replace(/[^a-z0-9.-]/gi, "");
           if (!host1) return reply("host tidak valid, pastikan host hanya mengandung huruf, angka, - (strip), dan . (titik)");
           let ip1 = raw1.split("|")[1]?.replace(/[^0-9.]/gi, "");
           if (!ip1 || ip1.split(".").length < 4) return reply(ip1 ? "ip tidak valid" : "mana ip nya");
   
           subDomain1(host1, ip1).then((e) => {
             if (e['success']) reply(`┏━━━━━━━━━━━━━━━━━━━
┣ Ip = ${e['ip']}
┗━━━━━━━━━━━━━━━━━━━
┣ Username = ${e['name']}
┗━━━━━━━━━━━━━━━━━━━
┣ crate by = ${author}
┗━━━━━━━━━━━━━━━━━━━`);
             else reply(`gagal membuat subdomain\nMsg: ${e['error']}`)
           }); }
           break
           case 'domain6': {
    if (cekSaldo(sender,db_saldo) < 5000) return youzuf.sendMessage(from, { text: `❌ 𝗦𝗔𝗟𝗗𝗢 𝗞𝗨𝗥𝗔𝗡𝗚 𝗕𝗥𝗢!

*👤 Nama : @${sender.split('@')[0]}*
*🛒Produk : ${command}*
*📝Harga : Rp5.000*
*💸 Saldo : Rp${toRupiah(cekSaldo(sender, db_saldo))}*

_ketik  *.deposit* untuk melakukan pembelian di bot_`, mentions: [sender]}, { quoted: msg })
           function subDomain1(host, ip) {
             return new Promise((resolve) => {
               let zone = "4dab40fe5183e4c6bd7b9fd87582803c";
               let apitoken = "95QUM8iFtLPZA-CgZplgvg19LhY-_QwxYdFNdotp";
               let tld = "mypanel.biz.id";
               axios
                 .post(
                   `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`,
                   { type: "A", name: host.replace(/[^a-z0-9.-]/gi, "") + "." + tld, content: ip.replace(/[^0-9.]/gi, ""), ttl: 3600, priority: 10, proxied: false },
                   {
                     headers: {
                       Authorization: "Bearer " + apitoken,
                       "Content-Type": "application/json",
                     },
                   }
                 )
                 .then((e) => {
                   let res = e.data;
                   if (res.success) resolve({ success: true, zone: res.result?.zone_name, name: res.result?.name, ip: res.result?.content });
                 })
                 .catch((e) => {
                   let err1 = e.response?.data?.errors?.[0]?.message || e.response?.data?.errors || e.response?.data || e.response || e;
                   let err1Str = String(err1);
                   resolve({ success: false, error: err1Str });
                 });
             });
           }
   
           let raw1 = args?.join(" ")?.trim();
           if (!raw1) return reply("Contoh .domain5 namalu|167.29.379.23");
minSaldo(sender, 5000, db_saldo)
           let host1 = raw1
             .split("|")[0]
             .trim()
             .replace(/[^a-z0-9.-]/gi, "");
           if (!host1) return reply("host tidak valid, pastikan host hanya mengandung huruf, angka, - (strip), dan . (titik)");
           let ip1 = raw1.split("|")[1]?.replace(/[^0-9.]/gi, "");
           if (!ip1 || ip1.split(".").length < 4) return reply(ip1 ? "ip tidak valid" : "mana ip nya");
   
           subDomain1(host1, ip1).then((e) => {
             if (e['success']) reply(`┏━━━━━━━━━━━━━━━━━━━
┣ Ip = ${e['ip']}
┗━━━━━━━━━━━━━━━━━━━
┣ Username = ${e['name']}
┗━━━━━━━━━━━━━━━━━━━
┣ crate by = ${author}
┗━━━━━━━━━━━━━━━━━━━`);
             else reply(`gagal membuat subdomain\nMsg: ${e['error']}`)
           }); }
           break
           case 'domain7': {
    if (cekSaldo(sender,db_saldo) < 5000) return youzuf.sendMessage(from, { text: `❌ 𝗦𝗔𝗟𝗗𝗢 𝗞𝗨𝗥𝗔𝗡𝗚 𝗕𝗥𝗢!

*👤 Nama : @${sender.split('@')[0]}*
*🛒Produk : ${command}*
*📝Harga : Rp5.000*
*💸 Saldo : Rp${toRupiah(cekSaldo(sender, db_saldo))}*

_ketik  *.deposit* untuk melakukan pembelian di bot_`, mentions: [sender]}, { quoted: msg })
           function subDomain1(host, ip) {
             return new Promise((resolve) => {
               let zone = "fbb7300781a84b11d6db8767d59c";
               let apitoken = "jS5iwULl-Yr5H7miIYWhWVkF-4j5p1RzjwjyN";
               let tld = "panellku.art";
               axios
                 .post(
                   `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`,
                   { type: "A", name: host.replace(/[^a-z0-9.-]/gi, "") + "." + tld, content: ip.replace(/[^0-9.]/gi, ""), ttl: 3600, priority: 10, proxied: false },
                   {
                     headers: {
                       Authorization: "Bearer " + apitoken,
                       "Content-Type": "application/json",
                     },
                   }
                 )
                 .then((e) => {
                   let res = e.data;
                   if (res.success) resolve({ success: true, zone: res.result?.zone_name, name: res.result?.name, ip: res.result?.content });
                 })
                 .catch((e) => {
                   let err1 = e.response?.data?.errors?.[0]?.message || e.response?.data?.errors || e.response?.data || e.response || e;
                   let err1Str = String(err1);
                   resolve({ success: false, error: err1Str });
                 });
             });
           }
   
           let raw1 = args?.join(" ")?.trim();
           if (!raw1) return reply("Contoh .domain5 namalu|167.29.379.23");
minSaldo(sender, 5000, db_saldo)
           let host1 = raw1
             .split("|")[0]
             .trim()
             .replace(/[^a-z0-9.-]/gi, "");
           if (!host1) return reply("host tidak valid, pastikan host hanya mengandung huruf, angka, - (strip), dan . (titik)");
           let ip1 = raw1.split("|")[1]?.replace(/[^0-9.]/gi, "");
           if (!ip1 || ip1.split(".").length < 4) return reply(ip1 ? "ip tidak valid" : "mana ip nya");
   
           subDomain1(host1, ip1).then((e) => {
             if (e['success']) reply(`┏━━━━━━━━━━━━━━━━━━━
┣ Ip = ${e['ip']}
┗━━━━━━━━━━━━━━━━━━━
┣ Username = ${e['name']}
┗━━━━━━━━━━━━━━━━━━━
┣ crate by = ${author}
┗━━━━━━━━━━━━━━━━━━━`);
             else reply(`gagal membuat subdomain\nMsg: ${e['error']}`)
           }); }
           break
         
           case 'domain8': {
    if (cekSaldo(sender,db_saldo) < 5000) return youzuf.sendMessage(from, { text: `❌ 𝗦𝗔𝗟𝗗𝗢 𝗞𝗨𝗥𝗔𝗡𝗚 𝗕𝗥𝗢!

*👤 Nama : @${sender.split('@')[0]}*
*🛒Produk : ${command}*
*📝Harga : Rp5.000*
*💸 Saldo : Rp${toRupiah(cekSaldo(sender, db_saldo))}*

_ketik  *.deposit* untuk melakukan pembelian di bot_`, mentions: [sender]}, { quoted: msg })
           function subDomain1(host, ip) {
             return new Promise((resolve) => {
               let zone = "ba86d80050aa5a2343a8e456c85c32f0";
               let apitoken = "vvAcoh_BQOZ1u-jb7ORkH1YZDXOEoiA7dBovCcCs";
               let tld = "kangpannel.xyz";
               axios
                 .post(
                   `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`,
                   { type: "A", name: host.replace(/[^a-z0-9.-]/gi, "") + "." + tld, content: ip.replace(/[^0-9.]/gi, ""), ttl: 3600, priority: 10, proxied: false },
                   {
                     headers: {
                       Authorization: "Bearer " + apitoken,
                       "Content-Type": "application/json",
                     },
                   }
                 )
                 .then((e) => {
                   let res = e.data;
                   if (res.success) resolve({ success: true, zone: res.result?.zone_name, name: res.result?.name, ip: res.result?.content });
                 })
                 .catch((e) => {
                   let err1 = e.response?.data?.errors?.[0]?.message || e.response?.data?.errors || e.response?.data || e.response || e;
                   let err1Str = String(err1);
                   resolve({ success: false, error: err1Str });
                 });
             });
           }
   
           let raw1 = args?.join(" ")?.trim();
           if (!raw1) return reply("Contoh .domain5 namalu|167.29.379.23");
minSaldo(sender, 5000, db_saldo)
           let host1 = raw1
             .split("|")[0]
             .trim()
             .replace(/[^a-z0-9.-]/gi, "");
           if (!host1) return reply("host tidak valid, pastikan host hanya mengandung huruf, angka, - (strip), dan . (titik)");
           let ip1 = raw1.split("|")[1]?.replace(/[^0-9.]/gi, "");
           if (!ip1 || ip1.split(".").length < 4) return reply(ip1 ? "ip tidak valid" : "mana ip nya");
   
           subDomain1(host1, ip1).then((e) => {
             if (e['success']) reply(`berhasil menambah domain\nip: ${e['ip']}\nhostname: ${e['name']}`);
             else reply(`gagal membuat subdomain\nMsg: ${e['error']}`)
           }); }
           break
           case 'domain9': {
    if (cekSaldo(sender,db_saldo) < 5000) return youzuf.sendMessage(from, { text: `❌ 𝗦𝗔𝗟𝗗𝗢 𝗞𝗨𝗥𝗔𝗡𝗚 𝗕𝗥𝗢!

*👤 Nama : @${sender.split('@')[0]}*
*🛒Produk : ${command}*
*📝Harga : Rp5.000*
*💸 Saldo : Rp${toRupiah(cekSaldo(sender, db_saldo))}*

_ketik  *.deposit* untuk melakukan pembelian di bot_`, mentions: [sender]}, { quoted: msg })
           function subDomain1(host, ip) {
             return new Promise((resolve) => {
               let zone = "0047ba6dd5ac0404b2d348c07434b552";
               let apitoken = "QZEHqxekQ7I5SE-W6VIAHqXdNX5L612-uccO_dgd";
               let tld = "pannelfast.xyz";
               axios
                 .post(
                   `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`,
                   { type: "A", name: host.replace(/[^a-z0-9.-]/gi, "") + "." + tld, content: ip.replace(/[^0-9.]/gi, ""), ttl: 3600, priority: 10, proxied: false },
                   {
                     headers: {
                       Authorization: "Bearer " + apitoken,
                       "Content-Type": "application/json",
                     },
                   }
                 )
                 .then((e) => {
                   let res = e.data;
                   if (res.success) resolve({ success: true, zone: res.result?.zone_name, name: res.result?.name, ip: res.result?.content });
                 })
                 .catch((e) => {
                   let err1 = e.response?.data?.errors?.[0]?.message || e.response?.data?.errors || e.response?.data || e.response || e;
                   let err1Str = String(err1);
                   resolve({ success: false, error: err1Str });
                 });
             });
           }
   
           let raw1 = args?.join(" ")?.trim();
           if (!raw1) return reply("Contoh .domain5 namalu|167.29.379.23");
minSaldo(sender, 5000, db_saldo)
           let host1 = raw1
             .split("|")[0]
             .trim()
             .replace(/[^a-z0-9.-]/gi, "");
           if (!host1) return reply("host tidak valid, pastikan host hanya mengandung huruf, angka, - (strip), dan . (titik)");
           let ip1 = raw1.split("|")[1]?.replace(/[^0-9.]/gi, "");
           if (!ip1 || ip1.split(".").length < 4) return reply(ip1 ? "ip tidak valid" : "mana ip nya");
   
           subDomain1(host1, ip1).then((e) => {
             if (e['success']) reply(`berhasil menambah domain\nip: ${e['ip']}\nhostname: ${e['name']}`);
             else reply(`gagal membuat subdomain\nMsg: ${e['error']}`)
           }); }
           
           break
default:
if ((budy) && ["assalamu'alaikum", "Assalamu'alaikum", "Assalamualaikum", "assalamualaikum", "Assalammualaikum", "assalammualaikum", "Asalamualaikum", "asalamualaikum", "Asalamu'alaikum", " asalamu'alaikum"].includes(budy) && !isCmd) {
youzuf.sendMessage(from, { text: `${pickRandom(["Wa'alaikumussalam","Wa'alaikumussalam Wb.","Wa'alaikumussalam Wr. Wb.","Wa'alaikumussalam Warahmatullahi Wabarakatuh"])}`})
}
if ((budy) && ["tes", "Tes", "TES", "Test", "test", "ping", "Ping"].includes(budy) && !isCmd) {
youzuf.sendMessage(from, { text: `${runtime(process.uptime())}*⏰`})
}

}} catch (err) {
console.log(color('[ERROR]', 'red'), err)
const isGroup = msg.key.remoteJid.endsWith('@g.us')
const sender = isGroup ? (msg.key.participant ? msg.key.participant : msg.participant) : msg.key.remoteJid
const moment = require("moment-timezone");
const jam = moment.tz('asia/jakarta').format('HH:mm:ss')
const tanggal = moment().tz("Asia/Jakarta").format("ll")
let kon_erorr = {"tanggal": tanggal, "jam": jam, "error": err, "user": sender}
db_error.push(kon_erorr)
fs.writeFileSync('./database/error.json', JSON.stringify(db_error))
var errny =`❌ 𝐍𝐎𝐓𝐈𝐅𝐈𝐂𝐀𝐓𝐈𝐎𝐍 𝐄𝐑𝐑𝐎𝐑 ❌

👤 *𝙳𝚊𝚛𝚒:* @${sender.split("@")[0]}
🕝 *𝙹𝚊𝚖:* ${jam}
📆 *𝚃𝚊𝚗𝚐𝚐𝚊𝚕:* ${tanggal}
📝 *𝚃𝚎𝚛𝚌𝚊𝚝𝚊𝚝:* ${db_error.length}
🔖 *𝚃𝚢𝚙𝚎:* ${err}`
youzuf.sendMessage(`${global.ownerNumber}`, {text:errny, mentions:[sender]})
}}