require('./setting')
const useCODE = process.argv.includes("--code")
const useQR = !useCODE
const { default: makeWASocket, downloadContentFromMessage, jidNormalizedUser, makeWALegacySocket, BufferJSON, Browsers, initInMemoryStore, extractMessageContent, makeInMemoryStore, proto, delay, DisconnectReason, useMultiFileAuthState, fetchLatestBaileysVersion, jidDecode, areJidsSameUser, PHONENUMBER_MCC, WA_DEFAULT_EPHEMERAL, relayMessage, getContentType, generateWAMessage, generateWAMessageContent, generateForwardMessageContent, generateWAMessageFromContent } = require ("@whiskeysockets/baileys")
const fs = require("fs");
const chalk = require('chalk')
const pino = require('pino')
const logg = require('pino')
const figlet = require("figlet");
const _ = require('lodash')
const { color } = require('./lib/console.js');
const readline = require("readline")
const { serialize, fetchJson, sleep, getBuffer } = require("./lib/myfunc");
const { nocache, uncache } = require('./lib/chache.js');
const { imageToWebp, videoToWebp, writeExifImg, writeExifVid } = require('./lib/Upload_Url')
const usePairingCode = true;
let welcome = JSON.parse(fs.readFileSync('./database/welcome.json'));
const question = (text) => {
  const rl = readline.createInterface({
input: process.stdin,
output: process.stdout
  });
  return new Promise((resolve) => {
rl.question(text, resolve)
  })
};

const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) })

console.log(chalk.bold.green(figlet.textSync('YusufHost', {
      font: 'Standard',
      horizontalLayout: 'default',
      vertivalLayout: 'default',
      whitespaceBreak: false
   })))
   
   console.log(chalk.yellow(`${chalk.red('[ Made By YusufHosting ]')}\n\n${chalk.red(`ADMIN MENYEDIAKAN`)}\n${chalk.white(`-SC BOT TOPUP FULL BUTTON\n-SC BOT TOPUP NO BUTTON\n-SCRIT CREATE PANEL\n-SCRIPT MD\n-SC BOT STORE NO ENC\n\nNO WA: 085935002092 \n\n`)}`))
 
 const express = require('express')
let app = express()
const { createServer } = require('http')
let server = createServer(app)
let _qr = 'invalid'
let PORT = 3000 || 8000 || 8080
const path = require('path')


 
async function startramz() {
const { state, saveCreds } = await useMultiFileAuthState("./sessionn")
   let { version, isLatest } = await fetchLatestBaileysVersion();
const ramz = makeWASocket({
logger: pino({ level: "silent" }),
printQRInTerminal: !usePairingCode,
auth: state,
browser: ['Chrome (Linux)', 'YusufHost', '']
});
if(usePairingCode && !ramz.authState.creds.registered) {
		const phoneNumber = await question(color('\n\n\nSilahkan masukin nomor Whatsapp Awali dengan 62:\n', 'magenta'));
		const code = await ramz.requestPairingCode(phoneNumber.trim())
		console.log(color(` Kode Pairing Bot Whatsapp kamu :`,"gold"), color(`${code}`, "red"))
   }



ramz.reply = (from, content, msg) => ramz.sendMessage(from, { text: content }, { quoted: msg })



ramz.ev.on('group-participants.update', async (update) =>{
const isWelcome = welcome.includes(update.id)
           const metadata = await ramz.groupMetadata(update.id)
for (let participant of update.participants) {
try{
let metadata = await ramz.groupMetadata(update.id)
let participants = update.participants
for (let num of participants) {
if (update.action == 'demote') {
var button = [{ buttonId: '!text_grup', buttonText: { displayText: 'Selamat🎉'}, type: 1 }]
await ramz.sendMessage(
update.id, 
{ 
text: `*@${num.split("@")[0]} Turun jabatan menjadi member biasa*`,
footer: metadata.subject,
mentions: [num] })
} else if (update.action == 'promote') {
var button = [{ buttonId: '!text_grup', buttonText: { displayText: 'Selamat🎉'}, type: 1 }]
await ramz.sendMessage(
update.id, 
{ 
text: `*@${num.split("@")[0]} Naik jabatan jadi admin grup*`,
footer: metadata.subject,
mentions: [num] })
} else if (update.action == 'add' && isWelcome) {
	console.log(update)
var button = [{ buttonId: '!text_grup', buttonText: { displayText: 'Welcome👋'}, type: 1 }]
await ramz.sendMessage(
update.id, 
{ 
text: `╭━━━━━━━━━━━━━━━┅•ิ.•ஐ\n│ *📌Welcome To ${metadata.subject}* \n└┬────────────┾•ิ.•┽\n┌┤Haii👋 @${num.split("@")[0]}\n││ \n││——[ *ɪɴᴛʀᴏ* ]——\n││ 📛ɴᴀᴍᴀ:\n││ 📅ᴜᴍᴜʀ:\n││ ⚽ʜᴏʙɪ:\n││ 🏢ᴀsᴋᴏᴛ: \n└────────────┾•ิ.•┽`,
footer: metadata.subject,
mentions: [num] })
} else if (update.action == 'remove' && isWelcome) {
console.log(update)
var button = [{ buttonId: '!text_grup', buttonText: { displayText: 'Bye👋'}, type: 1 }]
await ramz.sendMessage(
update.id, 
{
text: `╭━━━━━━━━━━━━━━━┅•ิ.•ஐ\n│ *📌Leave To ${metadata.subject}* \n└┬────────────┾•ิ.•┽\n┌┤Sayonara👋 @${num.split("@")[0]}\n││ \n└────────────┾•ิ.•┽`,
footer: metadata.subject, 
mentions: [num] })
}
}
} catch (err) {
console.log(err)
}
}
           
      })

ramz.ev.on("connection.update", ({ connection }) => {
      if (connection === "open") {
        console.log("CONNECTION" + " OPEN (" + ramz.user?.["id"]["split"](":")[0] + ")")
      }
      if (connection === "close") {
      	console.log("Connection closed, Hapus File Sesion dan Tautan ulang");
        startramz()
      }
      if (connection === "connecting") {
        if (ramz.user) {
          console.log("CONECTION" + " FOR (" + ramz.user?.["id"]["split"](":")[0] + ")")
        } else if (!useQR && !useCODE) {
          console.log("CONNECTION " + "Autentikasi Dibutuhkan\nGunakan Perintah \x1B[36mnpm start\x1B[0m untuk terhubung menggunakan nomor telepon")
        }
      }
    })
   store.bind(ramz.ev)
 
   ramz.ev.on('messages.upsert', async m => {
      var msg = m.messages[0]
      if (!m.messages) return;
      //msg.message = (Object.keys(msg.message)[0] == "ephemeralMessage") ? msg.message.ephemeralMessage.message : msg.message
      if (msg.key && msg.key.remoteJid == "status@broadcast") return
      msg = serialize(ramz, msg)
      msg.isBaileys = msg.key.id.startsWith('BAE5') || msg.key.id.startsWith('3EB0')
      require('./yusuf')(ramz, msg, m, store)
   })

ramz.ev.process(
      async (events) => {
         if (events['presence.update']) {
            await ramz.sendPresenceUpdate('available')
         }
         if (events['messages.upsert']) {
            const upsert = events['messages.upsert']
            for (let msg of upsert.messages) {
               if (msg.key.remoteJid === 'status@broadcast') {
                  if (msg.message?.protocolMessage) return
                  await delay(3000)
                  await ramz.readMessages([msg.key])
               }
            }
         }
         if (events['creds.update']) {
            await saveCreds()
         }
      }
   )
   
ramz.sendImage = async (jid, path, caption = '', quoted = '', options) => {
let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
return await ramz.sendMessage(jid, { image: buffer, caption: caption, ...options }, { quoted })
}

ramz.decodeJid = (jid) => {
if (!jid) return jid
if (/:\d+@/gi.test(jid)) {
let decode = jidDecode(jid) || {}
return decode.user && decode.server && decode.user + '@' + decode.server || jid
} else return jid
}

ramz.sendImageAsSticker = async (jid, path, quoted, options = {}) => {
let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
let buffer
if (options && (options.packname || options.author)) {
buffer = await writeExifImg(buff, options)
} else {
buffer = await imageToWebp(buff)
}
await ramz.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
.then( response => {
fs.unlinkSync(buffer)
return response
})
}

ramz.sendVideoAsSticker = async (jid, path, quoted, options = {}) => {
let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
let buffer
if (options && (options.packname || options.author)) {
buffer = await writeExifVid(buff, options)
} else {
buffer = await videoToWebp(buff)
}
await ramz.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
.then( response => {
fs.unlinkSync(buffer)
return response
})
}

return ramz
}
startramz()
.catch(err => console.log(err))
