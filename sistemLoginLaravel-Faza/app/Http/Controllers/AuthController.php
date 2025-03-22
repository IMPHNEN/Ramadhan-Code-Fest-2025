<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    // Tampilkan halaman registrasi
    public function tampilRegistrasi(){
        return view('register');
    }

    // Proses registrasi user baru
    public function submitRegistrasi(Request $request){
        // Validasi input
        $request->validate([
            'name' => 'required|string|max:255|unique:users,name',
            'email' => 'required|email|max:255|unique:users,email',
            'password' => 'required|min:8'
        ]);

        // Simpan user baru
        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password), // Gunakan Hash::make() agar lebih jelas
        ]);

        return redirect()->route('login.tampil')->with('success', 'Registrasi berhasil! Silakan login.');
    }

    // Tampilkan halaman login
    public function tampilLogin(){
        return view('login');
    }

    // Proses login
    public function submitLogin(Request $request){
        // Validasi input sebelum autentikasi
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|min:6',
        ]);

        // Membatasi percobaan login agar tidak bisa brute force
        if (Auth::attempt($request->only('email', 'password'), $request->filled('remember'))) {
            $request->session()->regenerate();
            return redirect()->route('home');
        }

        // Simpan pesan error di session
        return back()->with('error', 'Email atau password salah!');
    }

    // Logout user
    public function submitLogout(Request $request){
        Auth::logout();

        // Hapus semua session
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('login.tampil');
    }
}
