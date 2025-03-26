<h1 align="center">Panduan Instalasi ! 👋🏻</h1>

<h2 id="syarat">💾 Prasyarat yang Diperlukan</h2>

Berikut ini daftar layanan dan aplikasi yang perlu kamu siapkan agar aplikasi bisa berjalan lancar. Kalau belum punya, sebaiknya diinstall dulu ya:

-   GIT
-   PHP VERSI 8 & Web Server [XAMPP, LAMPP, MAMP, Laragon *(Rekomendasi)]
-   Web Browser
-   Internet
-   Composer

<p></p>

<h2 id="download">🐱‍💻 Panduan Menjalankan & Install Aplikasi</h2>

```bash
# Clone repository ini atau download di
$ git clone https://github.com/mhmmdf/Sistem-Penyaluran-Zakat-Masjid.git

# Kemudian jalankan command composer install, ini akan menginstall resources yang laravel butuhkan
$ composer install

# Duplikat file .env menggunakan command dibawah
$ cp .env.example .env

# Generate key laravel app menggunakan command dibawah
$ php artisan key:generate

# Migrate database dengan cara membuat database di phpMyAdmin
# Ganti variable DB_DATABASE di file .env yang ada di folder project . Sesuaikan sama nama database yang dibuat sebelumnya
$ php artisan migrate:fresh --seed

# Start aplikasi dengan command dibawah
$ php artisan serve
```
