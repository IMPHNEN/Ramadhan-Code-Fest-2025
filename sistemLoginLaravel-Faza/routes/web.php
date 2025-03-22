<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {
    Route::get('/', [HomeController::class, 'tampilHome'])->name('home');
    Route::post('/logout', [AuthController::class, 'submitLogout'])->name('logout');
});

Route::middleware('guest')->group(function(){
    Route::get('/register', [AuthController::class, 'tampilRegistrasi'])->name('register.tampil');
    Route::post('/register/submit', [AuthController::class, 'submitRegistrasi'])->name('register.submit');
    Route::get('/login', [AuthController::class, 'tampilLogin'])->name('login.tampil');
    Route::post('/login/submit', [AuthController::class, 'submitLogin'])->name('login.submit');
});

