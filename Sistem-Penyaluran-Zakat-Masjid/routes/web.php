<?php

use Illuminate\Support\Facades\Route;


//Route::get('/', 'App\Http\Controllers\Frontend\HomeController@index');
Route::get('/', function () {
    return redirect('/dashboard'); // Ganti '/dashboard' dengan rute yang diinginkan
});

Route::prefix('dashboard')
    ->middleware(['auth'])
    ->group(function () {
        /* ------------------------- Halaman Dashboard Admin ------------------------ */

        Route::get('/', 'App\Http\Controllers\Backend\DashboardController@index')->name('dashboard');

        /* ---------------------------- Kelola Data Warga --------------------------- */
        Route::resource('muzakki', 'App\Http\Controllers\Backend\MuzakkiController');
        Route::resource('mustahik', 'App\Http\Controllers\Backend\MustahikController');
        Route::resource('kategori_mustahik', 'App\Http\Controllers\Backend\KategoriMustahikController');

        /* ----------------- Kelola Distribusi dan Pengumpulan Zakat ---------------- */
        Route::resource('pengumpulan_zakat', 'App\Http\Controllers\Backend\PengumpulanZakatController');
        Route::resource('distribusi_zakat', 'App\Http\Controllers\Backend\DistribusiZakatController');

        /* -------------------------- Laporan Zakat Fitrah -------------------------- */
        Route::resource('laporan_pengumpulan', 'App\Http\Controllers\Backend\LaporanPengumpulanController');
        Route::resource('laporan_distribusi', 'App\Http\Controllers\Backend\LaporanDistribusiController');

        /* --------------------------- Kelola Data Website -------------------------- */
        Route::resource('articles', 'App\Http\Controllers\Backend\ArticleController');
        Route::resource('galleries', 'App\Http\Controllers\Backend\GalleryController');
    });

require __DIR__ . '/auth.php';
