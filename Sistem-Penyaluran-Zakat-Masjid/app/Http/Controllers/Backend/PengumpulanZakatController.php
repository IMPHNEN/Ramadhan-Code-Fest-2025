<?php

namespace App\Http\Controllers\Backend;

use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Models\JumlahZakat;
use App\Models\Muzakki;
use Illuminate\Http\Request;
use App\Models\PengumpulanZakat;

class PengumpulanZakatController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $items = PengumpulanZakat::all();

        return view('pages.backend.pengumpulan_zakat.index', [
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

        $items = Muzakki::all();

        return view('pages.backend.pengumpulan_zakat.create', compact('items'));
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
            // Membuat entri baru di tabel PengumpulanZakat
            $pengumpulanZakat = new PengumpulanZakat();
            $pengumpulanZakat->fill($request->all());
            $pengumpulanZakat->save();

            // Mengupdate tabel JumlahZakat
            $jumlahZakat = JumlahZakat::first();
            $jumlahZakat->jumlah_beras += $request->bayar_beras;
            $jumlahZakat->jumlah_uang += $request->bayar_uang;

            $jumlahZakat->total_beras += $request->bayar_beras;
            $jumlahZakat->total_uang += $request->bayar_uang;
            $jumlahZakat->total_distribusi += 1;

            $jumlahZakat->save();

            // Commit transaksi jika sukses
            DB::commit();

            // Mengembalikan respon atau melakukan tindakan lain (jika ada)
            return redirect()->route('pengumpulan_zakat.index')->with('success', 'Pengumpulan zakat berhasil ditambahkan dan jumlah zakat berhasil diupdate.');
        } catch (\Exception $e) {
            // Rollback transaksi jika terjadi error
            DB::rollback();

            // Mengembalikan respon atau melakukan tindakan lain (jika ada)
            return redirect()->back()->with('error', 'Gagal menambahkan pengumpulan zakat dan mengupdate jumlah zakat. Silakan coba lagi.');
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
        $item = PengumpulanZakat::findOrFail($id);

        return view('pages.backend.pengumpulan_zakat.edit', [
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

    /* UPDATE OLD

    public function update(Request $request, $id)
    {
        $data = $request->all();

        $item = PengumpulanZakat::findOrFail($id);

        $item->update($data);

        return redirect()->route('pengumpulan_zakat.index');
    }
        */
    public function update(Request $request, $id)
    {
        // Ambil data lama sebelum diupdate
        $item = PengumpulanZakat::findOrFail($id);

        // Simpan nilai sebelumnya untuk perbandingan
        $previousBayarBeras = $item->bayar_beras;
        $previousBayarUang = $item->bayar_uang;

        // Update data dengan data baru
        $data = $request->all();
        $item->update($data);

        // Memulai transaksi
        DB::beginTransaction();

        try {
            // Mengupdate tabel JumlahZakat
            $jumlahZakat = JumlahZakat::first();

            // Hitung perbedaan dan perbarui jumlah zakat
            // Jika bayar beras baru lebih kecil dari sebelumnya
            if ($request->bayar_beras < $previousBayarBeras) {
                $jumlahZakat->jumlah_beras -= ($previousBayarBeras - $request->bayar_beras);
                $jumlahZakat->total_beras -= ($previousBayarBeras - $request->bayar_beras);
            } else {
                $jumlahZakat->jumlah_beras += ($request->bayar_beras - $previousBayarBeras);
                $jumlahZakat->total_beras += ($request->bayar_beras - $previousBayarBeras);
            }

            // Jika bayar uang baru lebih kecil dari sebelumnya
            if ($request->bayar_uang < $previousBayarUang) {
                $jumlahZakat->jumlah_uang -= ($previousBayarUang - $request->bayar_uang);
                $jumlahZakat->total_uang -= ($previousBayarUang - $request->bayar_uang);
            } else {
                $jumlahZakat->jumlah_uang += ($request->bayar_uang - $previousBayarUang);
                $jumlahZakat->total_uang += ($request->bayar_uang - $previousBayarUang);
            }

            // Update total distribusi (jika diperlukan)
            $jumlahZakat->total_distribusi += 0; // Tambahkan logika jika ada distribusi baru

            $jumlahZakat->save();

            // Commit transaksi jika sukses
            DB::commit();

            return redirect()->route('pengumpulan_zakat.index')->with('success', 'Pengumpulan zakat berhasil diperbarui dan jumlah zakat berhasil diupdate.');
        } catch (\Exception $e) {
            // Rollback transaksi jika terjadi error
            DB::rollback();

            return redirect()->back()->with('error', 'Gagal memperbarui pengumpulan zakat dan mengupdate jumlah zakat. Silakan coba lagi.');
        }
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    /* OLD DESTROY
    public function destroy($id)
    {
        $item = PengumpulanZakat::findOrFail($id);
        $item->delete();

        return redirect()->route('pengumpulan_zakat.index');
    }
        */

    public function destroy($id)
    {
        // Temukan entri yang akan dihapus
        $item = PengumpulanZakat::findOrFail($id);

        // Memulai transaksi
        DB::beginTransaction();

        try {
            // Ambil data jumlah zakat yang ada
            $jumlahZakat = JumlahZakat::first();

            // Kurangi jumlah zakat sesuai dengan data yang akan dihapus
            $jumlahZakat->jumlah_beras -= $item->bayar_beras;
            $jumlahZakat->jumlah_uang -= $item->bayar_uang;

            // Kurangi total zakat jika perlu (sesuaikan jika ada logika lain untuk total distribusi)
            $jumlahZakat->total_beras -= $item->bayar_beras;
            $jumlahZakat->total_uang -= $item->bayar_uang;
            $jumlahZakat->total_distribusi -= 1; // Kurangi total distribusi jika diperlukan

            // Simpan perubahan jumlah zakat
            $jumlahZakat->save();

            // Hapus item dari tabel PengumpulanZakat
            $item->delete();

            // Commit transaksi jika sukses
            DB::commit();

            return redirect()->route('pengumpulan_zakat.index')->with('success', 'Pengumpulan zakat berhasil dihapus dan jumlah zakat berhasil diupdate.');
        } catch (\Exception $e) {
            // Rollback transaksi jika terjadi error
            DB::rollback();

            return redirect()->back()->with('error', 'Gagal menghapus pengumpulan zakat dan mengupdate jumlah zakat. Silakan coba lagi.');
        }
    }
}
