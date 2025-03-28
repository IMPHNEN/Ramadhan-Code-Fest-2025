<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            'name' => 'Administrator',
            'email' => 'ichsan@demo.dev',
            'password' => Hash::make('ucok')
        ]);

        DB::table('jumlah_zakat')->insert([
            'jumlah_beras' => 0,
            'jumlah_uang' => 0,
            'total_beras' => 0,
            'total_uang' => 0,
            'total_distribusi' => 0,
        ]);

        DB::table('kategori_mustahik')->insert([
            'nama_kategori' => 'Fakir',
            'jumlah_hak' => 30,
        ]);

        DB::table('kategori_mustahik')->insert([
            'nama_kategori' => 'Miskin',
            'jumlah_hak' => 25,
        ]);

        DB::table('kategori_mustahik')->insert([
            'nama_kategori' => 'Amil',
            'jumlah_hak' => 12.5,
        ]);

        DB::table('kategori_mustahik')->insert([
            'nama_kategori' => 'Muallaf',
            'jumlah_hak' => 10,
        ]);

        DB::table('kategori_mustahik')->insert([
            'nama_kategori' => 'Gharim',
            'jumlah_hak' => 10,
        ]);

        DB::table('kategori_mustahik')->insert([
            'nama_kategori' => 'Fisabilillah',
            'jumlah_hak' => 7.5,
        ]);

        DB::table('kategori_mustahik')->insert([
            'nama_kategori' => 'Ibnu Sabil',
            'jumlah_hak' => 5,
        ]);
    }
}
