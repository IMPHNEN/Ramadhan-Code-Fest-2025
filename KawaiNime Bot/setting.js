const chalk = require("chalk")
const fs = require("fs")

  global.ownerNumber = "6285935002092@s.whatsapp.net"
  global.kontakOwner = "6285935002092"
  global.namaStore = "YusufHosting"
  global.botName = "FFY-BOT"
  global.ownerName = "YusufHosting"
  
  
  global.linkyt = "https://youtube.com/@BangYusuf_"
  global.linkig = "https://instagram.com/@mmsuffy" 
  global.dana = "085935002092" 
  global.ovo = "Tidak ada!"
  global.gopay = "08179252005" 
  global.sawer = "Tidak ada!" 
 global.linkgc1 = "https://chat.whatsapp.com/GNhnMtWwg6ZDBNpTOOBwuM"
 global.linkgc2 = "https://whatsapp.com/channel/0029VaISkEIKWEKlpEC6Ym46"
//Jikalau dari salah satu di atas kalian tidak memiliki 
//silahkan kosongkan atau isi --

//panel
global.domain = "https://yusuf.cloudhost.store" // Isi Domain Lu
global.apikey = 'ptla_X46lJMmCBloEBZ9s5a785H4Xz5TqLfIPpO01WvPujx7' // Isi Apikey Plta Lu
global.capikey = 'ptlc_Wq3kuyyPK2MktYTvax7sibuLoVpOoRkCEcZGC045QuJ' // Isi Apikey Pltc Lu


let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update'${__filename}'`))
	delete require.cache[file]
	require(file)
})