const axios = require('axios');
const BodyForm = require('form-data');
const Jimp = require('jimp');
const cheerio = require('cheerio')


async function Tiktok(query) {
  return new Promise(async (resolve, reject) => {
    try {
    const encodedParams = new URLSearchParams();
encodedParams.set('url', query);
encodedParams.set('hd', '1');

      const response = await axios({
        method: 'POST',
        url: 'https://tikwm.com/api/',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'Cookie': 'current_language=en',
          'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36'
        },
        data: encodedParams
      });
      const videos = response.data.data;
        const result = {
          title: videos.title,
          watermark: videos.play,
          audio: videos.music
        };
        resolve(result);
    } catch (error) {
      reject(error);
    }
  });
}



async function remini(input) {
  const image = await Jimp.read(input);
  const buffer = await new Promise((resolve, reject) => {
    image.getBuffer(Jimp.MIME_JPEG, (err, buf) => {
      if (err) {
        reject('Terjadi error saat mengambil data.');
      } else {
        resolve(buf);
      }
    });
  });
  const form = new BodyForm();
  form.append('image', buffer, { filename: 'remini.jpg' });
  try {
    const { data } = await axios.post(`https://tools.betabotz.eu.org/ai/remini`, form, {
      headers: {
        ...form.getHeaders(),
        'accept': 'application/json',
      },
    });
    var res = {
      image_data: data.result,
      image_size: data.size
    };
    return res;
  } catch (error) {
    console.error('Identifikasi Gagal:', error);
    return 'Identifikasi Gagal';
  }
}


module.exports = { remini, Tiktok }