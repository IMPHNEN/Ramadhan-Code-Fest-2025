<?php

namespace App\Http\Controllers\Backend;

use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Models\DistribusiZakat;
use Illuminate\Http\Request;

class LaporanDistribusiController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // Ambil total zakat dari tabel jumlah_zakat
        $jumlahZakat = DB::table('jumlah_zakat')->first();
        $totalBeras = $jumlahZakat->jumlah_beras;
        $totalUang = $jumlahZakat->jumlah_uang;
        $totalDistribusi = $jumlahZakat->total_distribusi;

        // Ambil semua data distribusi zakat
        $items = DistribusiZakat::all();

        // Hitung total beras dan uang dari distribusi zakat
        $distribusiBeras = $items->sum('bayar_beras'); // Sesuaikan dengan nama kolom di model DistribusiZakat
        $distribusiUang = $items->sum('bayar_uang');   // Sesuaikan dengan nama kolom di model DistribusiZakat

        return view('pages.backend.laporan_distribusi.index', [
            'items' => $items,
            'totalBeras' => $totalBeras,
            'totalUang' => $totalUang,
            'totalDistribusi' => $totalDistribusi,
            'distribusiBeras' => $distribusiBeras,
            'distribusiUang' => $distribusiUang
        ]);
    }


    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
