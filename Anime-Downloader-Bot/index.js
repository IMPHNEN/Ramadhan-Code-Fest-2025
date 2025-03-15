import 'dotenv/config';
import { Telegraf } from 'telegraf';
import fetch from 'node-fetch';
import cron from 'node-cron';
import fs from 'fs';
import os from 'os';
import sharp from 'sharp';
import axios from 'axios';

const bot = new Telegraf(process.env.BOT_TOKEN);
const OWNER_ID = process.env.OWNER_ID; // Ambil ID Owner dari .env
const OWNER_PHONE_NUMBER = process.env.OWNER_PHONE_NUMBER; // Ambil nomor telepon owner dari .env
const OWNER_USERNAME = process.env.OWNER_USERNAME; // Ambil username Telegram Owner dari .env


// Middleware untuk cek apakah pengguna adalah owner
function isOwner(ctx, next) {
    if (ctx.from.id.toString() !== OWNER_ID) {
        return ctx.reply("⚠️ Kamu tidak memiliki izin untuk menggunakan perintah ini.");
    }
    return next();
}

// Fungsi untuk mengubah ukuran memori ke format yang mudah dibaca
const formatSize = (bytes) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Bytes';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
};

// Fungsi untuk menghitung uptime dalam format jam:menit:detik
const formatUptime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secondsRemaining = seconds % 60;
    return `${hours}h ${minutes}m ${secondsRemaining}s`;
};
const chatFile = 'chats.json';
let lastPosted = new Set(); // Simpan judul yang sudah dikirim

// Cek apakah file chats.json ada, jika tidak buat file baru
if (!fs.existsSync(chatFile)) {
    fs.writeFileSync(chatFile, JSON.stringify([]));
}

// Fungsi untuk membaca daftar chat dari file
function loadChats() {
    return JSON.parse(fs.readFileSync(chatFile));
}

// Fungsi untuk menyimpan daftar chat ke file
function saveChats(chats) {
    fs.writeFileSync(chatFile, JSON.stringify(chats, null, 2));
}

// Daftar command yang akan otomatis diatur
const COMMANDS = [
    { command: 'start', description: 'Mulai bot' },
    { command: 'subscribe', description: 'Langganan update anime' },
    { command: 'unsubscribe', description: 'Berhenti berlangganan' },
    { command: 'latest', description: 'Cek update anime terbaru' },
    { command: 'search', description: 'Cari anime di Samehadaku' },
    { command: 'detail', description: 'Lihat detail anime' },
    { command: 'download', description: 'Download anime dari Samehadaku' },
    { command: 'owner', description: 'ini nomer yang membuat bot ini' },
    { command: 'pinterest', description: 'mencari dan mendownload gambar dari pinterest' }
];

// Fungsi untuk mengatur command otomatis
async function setCommands() {
    try {
        await bot.telegram.setMyCommands(COMMANDS);
        console.log('✅ Command berhasil diperbarui');
    } catch (error) {
        console.error('❌ Gagal mengatur command:', error.message);
    }
}

// Jalankan fungsi setCommands saat bot dimulai
setCommands();

// Fungsi untuk fetch anime terbaru
async function fetchAnimeUpdates() {
    try {
        const res = await fetch("https://restapi.botwaaa.web.id/samehadaku/latest?apikey=rizkiganteng");
        const data = await res.json();

        if (!Array.isArray(data)) throw new Error("Invalid data format");

        const chats = loadChats();

        for (const anime of data) {
            if (!lastPosted.has(anime.title)) {
                lastPosted.add(anime.title);

                const caption = `📺 *${anime.title}*\n👤 Author: ${anime.author}\n⏰ ${anime.date}`;

                for (const chatId of chats) {
                    try {
                        await bot.telegram.sendPhoto(chatId, anime.link, {
                            caption,
                            parse_mode: "Markdown",
                            reply_markup: {
                                inline_keyboard: [[{ text: "🔗 Lihat Episode", url: anime.link }]]
                            }
                        });
                    } catch (err) {
                        console.error(`Gagal mengirim ke ${chatId}:`, err);
                    }
                }
            }
        }
    } catch (error) {
        console.error("Error fetching anime updates:", error);
    }
}

// Jalankan setiap jam 8
cron.schedule("0 8 * * *", () => {
    console.log("Checking for new anime updates...");
    fetchAnimeUpdates();
});
// Perkenalan Bot saat command /start
bot.command('start', (ctx) => {
    const chatId = ctx.chat.id;
    const chats = loadChats();

    // Memeriksa apakah pengguna sudah terdaftar (subscribe)
    if (!chats.includes(chatId)) {
        ctx.reply(
            `👋 Hai, saya adalah bot untuk mendapatkan informasi terbaru tentang anime! Saya bisa membantu kamu untuk:\n\n` +
            `1. 🔍 Mencari anime dengan perintah /search <judul>\n` +
            `2. 📺 Mendapatkan update terbaru dengan perintah /latest\n` +
            `3. 🎬 Melihat detail anime dengan perintah /detail <url anime>\n` +
            `4. ⬇️ Mendapatkan link download anime dengan perintah /download <url episode>\n\n` +
            `Untuk mulai menggunakan bot ini, kamu perlu melakukan perintah /subscribe terlebih dahulu!`
        );
    } else {
        ctx.reply(
            `👋 Hai, selamat datang kembali! Saya bisa membantu kamu dengan berbagai fitur terkait anime.\n\n` +
            `1. 🔍 Mencari anime dengan perintah /search <judul>\n` +
            `2. 📺 Mendapatkan update terbaru dengan perintah /latest\n` +
            `3. 🎬 Melihat detail anime dengan perintah /detail <url anime>\n` +
            `4. ⬇️ Mendapatkan link download anime dengan perintah /download <url episode>\n\n` +
            `Kamu sudah terdaftar untuk menerima update anime. Nikmati fitur-fitur yang tersedia!`
        );
    }
});

// Command untuk daftar (subscribe)
bot.command("subscribe", (ctx) => {
    const chatId = ctx.chat.id;
    let chats = loadChats();

    if (!chats.includes(chatId)) {
        chats.push(chatId);
        saveChats(chats);
        ctx.reply("✅ Kamu telah berlangganan update anime terbaru! Sekarang kamu bisa menggunakan fitur bot.");
    } else {
        ctx.reply("⚠️ Kamu sudah terdaftar.");
    }
});

// Command ping
bot.command('ping', async (ctx) => {
    const startTime = Date.now();  // Waktu mulai
    const uptime = os.uptime();  // Waktu berjalan server dalam detik
    const totalMem = os.totalmem();  // Total memori sistem
    const freeMem = os.freemem();  // Memori yang bebas
    const cpuInfo = os.cpus();  // Informasi CPU

    // Menghitung waktu response
    const ping = Date.now() - startTime;

    // Membuat pesan dengan informasi ping dan penggunaan sistem
    const responseMessage = `
\`Bot Ping Information\`
* Ping: ${ping} ms
* Uptime: ${formatUptime(uptime)}
* Total Memory: ${formatSize(totalMem)}
* Free Memory: ${formatSize(freeMem)}
* CPU: ${cpuInfo[0].model} ( ${cpuInfo.length} Cores )
`;

    // Kirim pesan ke pengguna yang mengirim perintah
    ctx.reply(responseMessage);
});
// Command untuk berhenti (unsubscribe)
bot.command("unsubscribe", (ctx) => {
    const chatId = ctx.chat.id;
    let chats = loadChats();

    if (chats.includes(chatId)) {
        chats = chats.filter(id => id !== chatId);
        saveChats(chats);
        ctx.reply("❌ Kamu telah berhenti menerima update anime.");
    } else {
        ctx.reply("⚠️ Kamu belum terdaftar.");
    }
});

// Command untuk menampilkan info fitur lainnya (misalnya /search, /download)
bot.command("help", (ctx) => {
    ctx.reply(`Berikut adalah perintah yang tersedia:\n\n` +
        `/subscribe - Untuk berlangganan update anime terbaru\n` +
        `/unsubscribe - Untuk berhenti menerima update anime\n` +
        `/search <judul> - Untuk mencari anime\n` +
        `/latest - Untuk mendapatkan update anime terbaru\n` +
        `/detail <url anime> - Untuk mendapatkan detail anime\n` +
        `/download <url episode> - Untuk mendapatkan link download anime`
    );
});
// Command untuk cek apakah pengguna adalah owner
bot.command("owner", (ctx) => {
    if (ctx.from.id.toString() === OWNER_ID) {
        ctx.reply("✅ Kamu adalah owner bot ini.");
    } else {
        // Mengirimkan informasi kontak owner
        ctx.reply(`👤 Kontak Owner Bot:\n\nTelegram: [${OWNER_USERNAME}](tg://user?id=${OWNER_ID})\n📞 Nomor Telepon: ${OWNER_PHONE_NUMBER}`, {
            parse_mode: "Markdown",
        });
    }
});


// Contoh command owner untuk kirim broadcast
bot.command("broadcast", isOwner, async (ctx) => {
    const message = ctx.message.text.split(" ").slice(1).join(" ");
    if (!message) {
        return ctx.reply("❌ Gunakan format: `/broadcast <pesan>`");
    }

    try {
        // Kirim pesan ke semua pengguna yang terdaftar (contoh dengan file `chats.json`)
        const chats = JSON.parse(fs.readFileSync("chats.json"));
        for (const chatId of chats) {
            await bot.telegram.sendMessage(chatId, `📢 Pesan dari Owner:\n\n${message}`);
        }
        ctx.reply("✅ Broadcast berhasil dikirim!");
    } catch (error) {
        console.error("Error sending broadcast:", error);
        ctx.reply("⚠️ Terjadi kesalahan saat mengirim broadcast.");
    }
});


bot.command("latest", async (ctx) => {
    const chatId = ctx.chat.id;  // Ambil chatId pengguna yang mengirim perintah

    // Kirimkan pesan pertama ke pengguna yang mengirim perintah
    await ctx.reply("Sedang mengambil update anime terbaru...");

    try {
        // Ambil update anime terbaru
        const res = await fetch("https://restapi.botwaaa.web.id/samehadaku/latest?apikey=rizkiganteng");
        const data = await res.json();

        if (!Array.isArray(data)) throw new Error("Invalid data format");

        // Kirimkan pesan hanya ke pengguna yang mengirimkan perintah
        const animeUpdates = data.map((anime) => {
            return `📺 *${anime.title}*\n👤 Author: ${anime.author}\n⏰ ${anime.date}\n🔗 [Lihat Episode](${anime.link})`;
        }).join("\n\n");

        // Mengirimkan pembaruan anime ke pengguna yang mengirim perintah
        await ctx.reply(animeUpdates, { parse_mode: "Markdown" });

    } catch (error) {
        console.error("Error fetching anime updates:", error);
        ctx.reply("⚠️ Terjadi kesalahan saat mengambil update anime.");
    }
});




// Command /search {judul}
bot.command("search", async (ctx) => {
    const query = ctx.message.text.split(" ").slice(1).join(" ");
    if (!query) {
        return ctx.reply("❌ Gunakan format: `/search <judul>`", { parse_mode: "Markdown" });
    }

    try {
        const res = await fetch(`https://restapi.botwaaa.web.id/samehadaku/search?text=${encodeURIComponent(query)}&apikey=rizkiganteng`);
        const data = await res.json();

        if (!Array.isArray(data) || data.length === 0) {
            return ctx.reply(`❌ Tidak ditemukan anime dengan judul *${query}*`, { parse_mode: "Markdown" });
        }

        const buttons = data.map(anime => [{ text: anime.title, url: anime.link }]);

        await ctx.reply(`🔍 Hasil pencarian untuk *${query}*:`, {
            parse_mode: "Markdown",
            reply_markup: { inline_keyboard: buttons }
        });

    } catch (error) {
        console.error("Error fetching anime search:", error);
        ctx.reply("⚠️ Terjadi kesalahan saat mencari anime.");
    }
});

// Command /detail {url}
bot.command("detail", async (ctx) => {
    const url = ctx.message.text.split(" ").slice(1).join(" ");
    if (!url) {
        return ctx.reply("❌ Gunakan format: `/detail <url anime>`", { parse_mode: "Markdown" });
    }

    try {
        const res = await fetch(`https://restapi.botwaaa.web.id/samehadaku/detail?url=${encodeURIComponent(url)}&apikey=rizkiganteng`);
        const data = await res.json();

        if (!data || !data.title) {
            return ctx.reply("❌ Tidak dapat menemukan informasi anime ini.", { parse_mode: "Markdown" });
        }

        let responseText = `🎬 *${data.title}*\n`;
        responseText += `⭐ Rating: *${data.rating}*\n`;
        responseText += `📝 Deskripsi: ${data.description}\n\n`;
        responseText += `📺 *Genres*: ${data.genres.join(", ")}\n\n`;

        const episodeButtons = data.episodes.map(ep => [
            {
                text: `Episode ${ep.number}: ${ep.title}`,
                url: ep.url
            }
        ]);

        await ctx.replyWithPhoto(data.image, {
            caption: responseText,
            reply_markup: {
                inline_keyboard: episodeButtons
            }
        });

    } catch (error) {
        console.error("Error fetching anime detail:", error);
        ctx.reply("⚠️ Terjadi kesalahan saat mengambil detail anime.");
    }
});

// Command /download {url}
bot.command("download", async (ctx) => {
    const url = ctx.message.text.split(" ").slice(1).join(" ");
    if (!url) {
        return ctx.reply("❌ Gunakan format: `/download <url episode>`", { parse_mode: "Markdown" });
    }

    try {
        const res = await fetch(`https://restapi.botwaaa.web.id/samehadaku/download?url=${encodeURIComponent(url)}&apikey=rizkiganteng`);
        const data = await res.json();

        if (!data || !data.judul || !data.unduhan || data.unduhan.length === 0) {
            return ctx.reply("❌ Tidak dapat menemukan link unduhan untuk episode ini.", { parse_mode: "Markdown" });
        }

        let responseText = `🎬 *${data.judul}*\n\n`;
        data.unduhan.forEach((server, index) => {
            if (server.tautan) {
                responseText += `🌐 *Server ${index + 1}:* ${server.nama}\n`;
                responseText += `🔗 [Download Link](${server.tautan})\n\n`;
            }
        });

        await ctx.reply(responseText, { parse_mode: "Markdown" });

    } catch (error) {
        console.error("Error fetching download links:", error);
        ctx.reply("⚠️ Terjadi kesalahan saat mengambil link download.");
    }
});


// Mulai bot
bot.launch();
console.log("🤖 Bot berjalan...");

