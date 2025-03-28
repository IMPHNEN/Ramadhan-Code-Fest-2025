<?php

namespace App\Http\Controllers\Backend;

use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Models\DistribusiZakat;
use App\Models\JumlahZakat;
use App\Models\Mustahik;
use Illuminate\Http\Request;

class DistribusiZakatController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $items = DistribusiZakat::all();

        return view('pages.backend.distribusi_zakat.index', [
            'items' => $items
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function create()
    {

        $items = Mustahik::all();

        return view('pages.backend.distribusi_zakat.create', compact('items'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // Memulai transaksi
        DB::beginTransaction();

        try {
            // Mengambil data jumlah zakat saat ini
            $jumlahZakat = JumlahZakat::first();

            // Memeriksa apakah stok beras cukup
            if ($jumlahZakat->jumlah_beras < $request->jumlah_beras) {
                return redirect()->back()->with('error', 'Stok beras tidak cukup untuk di distribusikan.');
            }

            // Memeriksa apakah stok uang cukup
            if ($jumlahZakat->jumlah_uang < $request->jumlah_uang) {
                // Mengembalikan respon atau melakukan tindakan lain (jika ada)
                return redirect()->back()->with('error', 'Uang tidak cukup untuk di distribusikan.');
            }

            // Membuat entri baru di tabel PengumpulanZakat
            $pengumpulanZakat = new DistribusiZakat();
            $pengumpulanZakat->fill($request->all());
            $pengumpulanZakat->save();

            // Mengupdate tabel JumlahZakat
            $jumlahZakat->jumlah_beras -= $request->jumlah_beras;
            $jumlahZakat->jumlah_uang -= $request->jumlah_uang;
            $jumlahZakat->total_distribusi += 1;
            $jumlahZakat->save();

            // Commit transaksi jika sukses
            DB::commit();

            // Mengembalikan respon atau melakukan tindakan lain (jika ada)
            return redirect()->route('distribusi_zakat.index')->with('success', 'Pengumpulan zakat berhasil ditambahkan dan jumlah zakat berhasil diupdate.');
        } catch (\Exception $e) {
            // Rollback transaksi jika terjadi error
            DB::rollback();

            // Mengembalikan respon atau melakukan tindakan lain (jika ada)
            return redirect()->back()->with('error', 'Gagal melakukan distribusi zakat. Silakan coba lagi.');
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id) {}

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $item = DistribusiZakat::findOrFail($id);

        return view('pages.backend.distribusi_zakat.edit', [
            'item' => $item
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

    /* old update
    public function update(Request $request, $id)
    {
        $data = $request->all();

        $item = DistribusiZakat::findOrFail($id);

        $item->update($data);

        return redirect()->route('distribusi_zakat.index');
    }
        */

    public function update(Request $request, $id)
    {
        // Ambil semua data dari request
        $data = $request->all();

        // Temukan item distribusi zakat yang akan diperbarui
        $item = DistribusiZakat::findOrFail($id);

        // Simpan nilai sebelumnya
        $previousBayarBeras = $item->jumlah_beras;
        $previousBayarUang = $item->jumlah_uang;

        // Perbarui data distribusi zakat
        $item->update($data);

        // Ambil data jumlah zakat
        $jumlahZakat = JumlahZakat::first();

        // Sesuaikan jumlah zakat berdasarkan perubahan
        if ($data['jumlah_beras'] < $previousBayarBeras) {
            // Jika nilai baru kurang dari sebelumnya
            $jumlahZakat->jumlah_beras += ($previousBayarBeras - $data['jumlah_beras']);
        } else {
            // Jika nilai baru lebih besar dari sebelumnya
            $jumlahZakat->jumlah_beras -= ($data['jumlah_beras'] - $previousBayarBeras);
        }

        if ($data['jumlah_uang'] < $previousBayarUang) {
            // Jika nilai baru kurang dari sebelumnya
            $jumlahZakat->jumlah_uang += ($previousBayarUang - $data['jumlah_uang']);
        } else {
            // Jika nilai baru lebih besar dari sebelumnya
            $jumlahZakat->jumlah_uang -= ($data['jumlah_uang'] - $previousBayarUang);
        }

        // Simpan perubahan ke tabel jumlah zakat
        $jumlahZakat->save();

        // Redirect ke halaman index distribusi zakat
        return redirect()->route('distribusi_zakat.index')->with('success', 'Data distribusi zakat berhasil diperbarui.');
    }



    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        // Temukan item distribusi zakat yang akan dihapus
        $item = DistribusiZakat::findOrFail($id);

        // Ambil data jumlah zakat
        $jumlahZakat = JumlahZakat::first();

        // Sesuaikan jumlah zakat berdasarkan nilai yang akan dihapus
        $jumlahZakat->jumlah_beras += $item->jumlah_beras; // Kembalikan jumlah beras
        $jumlahZakat->jumlah_uang += $item->jumlah_uang;   // Kembalikan jumlah uang
        $jumlahZakat->total_distribusi -= 1;               // Kurangi total distribusi

        // Simpan perubahan ke tabel jumlah zakat
        $jumlahZakat->save();

        // Hapus item distribusi zakat
        $item->delete();

        // Redirect ke halaman index distribusi zakat
        return redirect()->route('distribusi_zakat.index')->with('success', 'Data distribusi zakat berhasil dihapus dan jumlah zakat diperbarui.');
    }
}
