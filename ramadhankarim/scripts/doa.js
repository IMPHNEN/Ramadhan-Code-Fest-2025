document
  .getElementById("doaForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const query = document
      .getElementById("doaInput")
      .value.trim()
      .toLowerCase();
    const server = document.getElementById("serverSelect").value;
    const doaOutput = document.getElementById("doaOutput");

    // Tampilkan loading
    doaOutput.style.display = "block";
    doaOutput.innerHTML = `
        <div class="result-loading">
            <div class="spinner"></div>
            <p class="loading-text">Mencari doa...</p>
        </div>
    `;

    let apiUrl;
    if (server === "server1") {
      apiUrl = `https://muslim-api-three.vercel.app/v1/doa/find?query=${encodeURIComponent(
        query
      )}`;
    } else {
      apiUrl = `https://doa-doa-api-ahmadramadhan.fly.dev/api/doa/${encodeURIComponent(
        query
      )}`;
    }

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      // Jika menggunakan server1 (muslim-api-three)
      if (server === "server1" && data.status === 200 && data.data.length > 0) {
        const doa = data.data[0];
        displayDoa(doa.judul, doa.arab, doa.indo, doa.source, server);
      }
      // Jika menggunakan server2 (doa-doa-api-ahmadramadhan)
      else if (server === "server2" && data.doa) {
        const doa = data;
        displayDoa(doa.doa, doa.ayat, doa.latin, doa.artinya, server);
      }
      // Jika tidak ada hasil
      else {
        doaOutput.innerHTML = `<p class="error-text">Doa tidak ditemukan. Coba gunakan kata kunci lain.</p>`;
      }
    } catch (error) {
      doaOutput.innerHTML = `<p class="error-text">Terjadi kesalahan. Pastikan koneksi internet stabil.</p>`;
    }
  });

document
  .getElementById("btn-random")
  .addEventListener("click", async function () {
    const doaOutput = document.getElementById("doaOutput");

    // Tampilkan loading
    doaOutput.style.display = "block";
    doaOutput.innerHTML = `
        <div class="result-loading">
            <div class="spinner"></div>
            <p class="loading-text">Mencari doa acak...</p>
        </div>
    `;

    try {
      const response = await fetch(
        "https://doa-doa-api-ahmadramadhan.fly.dev/api/doa/v1/random"
      );
      const data = await response.json();

      if (Array.isArray(data) && data.length > 0) {
        const doa = data[0]; // Get the first item from the array
        displayDoa(doa.doa, doa.ayat, doa.latin, doa.artinya, "server2");
      } else {
        doaOutput.innerHTML = `<p class="error-text">Doa acak tidak ditemukan. Coba lagi.</p>`;
      }
    } catch (error) {
      doaOutput.innerHTML = `<p class="error-text">Terjadi kesalahan. Pastikan koneksi internet stabil.</p>`;
    }
  });

// Fungsi untuk menampilkan hasil doa
function displayDoa(title, arabic, latin, source, server) {
  const doaOutput = document.getElementById("doaOutput");
  if (server === "server1") {
    doaOutput.innerHTML = `
            <div class="result-header">
                <h3 class="result-title">${title}</h3>
            </div>
            <div class="result-body">
                <div class="result-arabic">${arabic}</div>
                <div class="result-meaning">${latin}</div>
                <div class="result-meta">
                    <div class="result-source">Sumber: ${source}</div>
                    <div class="action-buttons">
                    <button class="btn-action" onclick="copyText('${arabic}')">
                        <i class="fas fa-copy"></i> Salin Doa
                    </button>
                    <button class="btn-action" onclick="shareDoa('${title}', '${arabic}', '${latin}')">
                        <i class="fas fa-share-alt"></i> Bagikan Doa
                    </button>
                </div>

                </div>
            </div>
        `;
  } else if (server === "server2") {
    doaOutput.innerHTML = `
            <div class="result-header">
                <h3 class="result-title">${title}</h3>
            </div>
            <div class="result-body">
                <div class="result-arabic">${arabic}</div>
                <div class="result-latin">${latin}</div>
                <div class="result-meaning">${source}</div>
            </div>
            <div class="result-meta">
                <div class="action-buttons">
                    <button class="btn-action" onclick="copyText('${arabic}')">
                        <i class="fas fa-copy"></i> Salin Doa
                    </button>

                    <button class="btn-action" onclick="shareDoa('${title}', '${arabic}', '${latin}')">
                        <i class="fas fa-share-alt"></i> Bagikan Doa 
                    </button>
                </div>
            </div>
        `;
  }
}

// Fungsi untuk menyalin teks doa
function copyText(text) {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      alert("Doa berhasil disalin!");
    })
    .catch((err) => {
      console.error("Gagal menyalin:", err);
    });
}

// Fungsi untuk berbagi doa
function shareDoa(title, arabic, latin) {
  const shareData = {
    title: title,
    text: `${title}\n\n${arabic}\n\n${latin}`,
  };

  if (navigator.share) {
    navigator
      .share(shareData)
      .catch((err) => console.error("Gagal berbagi:", err));
  } else {
    alert("Fitur berbagi tidak didukung di perangkat ini.");
  }
}
