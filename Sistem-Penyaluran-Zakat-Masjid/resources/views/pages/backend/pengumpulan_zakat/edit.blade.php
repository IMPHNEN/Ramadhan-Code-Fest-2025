@extends('layouts.backend.master')

@section('title', 'Update Data Pengumpulan Zakat — Masjid Nur Ilahi')
@section('content')

@push('timepicker-styles')
<link rel="stylesheet" type="text/css" href="{{ url('cuba/assets/css/vendors/timepicker.css') }}">
<link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />
<style>
    span.select2.select2-container.select2-container--classic {
        width: 100% !important;
    }

    .select2-container .select2-selection--single {
        border-color: #495057 !important;
    }
</style>
@endpush

<div class="container-fluid">

    <div class="page-title">
        <div class="card card-absolute mt-5 mt-md-4">
            <div class="card-header bg-primary">
                <h5 class="text-white">
                    Update Data Pengumpulan Zakat
                </h5>
            </div>
            <div class="card-body">
                <p>
                    Dibawah ini adalah form untuk update data penguumpulan zakat.
                    <span class="d-none d-md-inline">
                        Data dibawah pastikan anda isi dengan benar dan lengkap ya, nantinya akan masuk ke laporan
                        pengumpulan zakat.
                    </span>
                </p>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-sm-12">
            <div class="card">
                <div class="card-header">
                    <h5>Update Data Pengumpulan Zakat</h5>
                </div>
                <form method="POST" action="{{ route('pengumpulan_zakat.update', $item->id) }}"
                    enctype="multipart/form-data" class="needs-validation" id="paymentForm">
                    @csrf
                    @method('PUT')
                    <div class="card-body">
                        @if ($errors->any())
                        <div class="alert alert-danger">
                            <ul>
                                <li>
                                    <h4>Ada error nih 😓</h4>
                                </li>
                                @foreach ($errors->all() as $error)
                                <li>{{ $error }}</li>
                                @endforeach
                            </ul>
                        </div>
                        @endif
                        <div class="form-row">
                            <div class="form-group col-12 mb-2">
                                <label for="nama_matkul">Nama Lengkap Muzakki <span class="text-danger">*</span></label>
                                <div class="input-group mb-3">
                                    <input readonly id="nama_muzakki" type="text" value="{{ $item->nama_muzakki }}"
                                        class="form-control" name="nama_muzakki">
                                </div>
                            </div>
                        </div>
                        <div class="form-row mt-4">
                            <div class="form-group col-md-4 mb-2">
                                <label for="angkatan">Jumlah Tanggungan <span class="text-danger">*</span></label>
                                <div class="input-group mb-3">
                                    <input readonly required id="jumlah_tanggungan" type="text"
                                        value="{{ $item->jumlah_tanggungan }}" class="form-control"
                                        name="jumlah_tanggungan">
                                </div>
                            </div>

                            <div class="form-group col-md-4 mb-2">
                                <label for="angkatan">Jumlah Tanggungan yang Dibayar <span
                                        class="text-danger">*</span></label>
                                <div class="input-group mb-3">
                                    <input required id="jumlah_tanggungandibayar" type="text"
                                        value="{{ $item->jumlah_tanggungandibayar }}" class="form-control"
                                        name="jumlah_tanggungandibayar">
                                </div>
                            </div>

                            <div class="form-group col-md-4 mb-2">
                                <label for="gender">Jenis Bayar <span class="text-danger">*</span></label>
                                <div class="input-group mb-3">
                                    <select class="custom-select" id="inputGroupSelect01" name="jenis_bayar">
                                        <option value="" disabled selected>Pilih Jenis Bayar</option>
                                        <option value="Beras" {{ $item->jenis_bayar == 'Beras' ? 'selected' : '' }}>Beras</option>
                                        <option value="Uang" {{ $item->jenis_bayar == 'Uang' ? 'selected' : '' }}>Uang</option>
                                    </select>
                                </div>
                            </div>


                            <div class="form-group col-md-12 mb-2" id="bayar_beras_container" style="{{ $item->jenis_bayar == 'Beras' ? '' : 'display: none;' }}">
                                <label for="bayar_beras">Bayar Beras <span class="text-danger">*</span></label>
                                <div class="input-group mb-3">
                                    <input id="bayar_beras" type="number" value="{{ old('bayar_beras', $item->bayar_beras) }}"
                                        class="form-control" name="bayar_beras">
                                </div>
                            </div>

                            <div class="form-group col-md-12 mb-2" id="bayar_uang_container" style="{{ $item->jenis_bayar == 'Uang' ? '' : 'display: none;' }}">
                                <label for="bayar_uang">Bayar Uang <span class="text-danger">*</span></label>
                                <div class="input-group mb-3">
                                    <input id="bayar_uang" type="number" value="{{ old('bayar_uang', $item->bayar_uang) }}"
                                        class="form-control" name="bayar_uang">
                                </div>
                            </div>

                        </div>

                    </div>
                    <div class="card-footer">
                        <button type="submit" class="btn btn-primary m-r-15" type="submit">Update</button>
                        <button class="btn btn-light" type="reset">Reset</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

@push('timepicker-scripts')
<script src="{{ url('cuba/assets/js/time-picker/jquery-clockpicker.min.js') }}"></script>
<script src="{{ url('cuba/assets/js/time-picker/highlight.min.js') }}"></script>
<script src="{{ url('cuba/assets/js/time-picker/clockpicker.js') }}"></script>


<script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>
<script>
    $(document).ready(function() {
        $('.js-example-basic-single').select2({
            theme: "classic",
            width: 'resolve', // need to override the changed default
            placeholder: "Pilih Muzakki yang Terdaftar",
        });

    });

    document.addEventListener("DOMContentLoaded", function() {
        const jenisBayarSelect = document.getElementById('inputGroupSelect01');
        const bayarBerasContainer = document.getElementById('bayar_beras_container');
        const bayarUangContainer = document.getElementById('bayar_uang_container');
        const bayarBerasInput = document.getElementById('bayar_beras');
        const bayarUangInput = document.getElementById('bayar_uang');
        const paymentForm = document.getElementById('paymentForm');

        const jumlahTanggungan = document.getElementById('jumlah_tanggungan');
        const jumlahTanggunganDibayar = document.getElementById('jumlah_tanggungandibayar');

        jenisBayarSelect.addEventListener('change', function() {
            if (this.value === 'Beras') {
                bayarBerasContainer.style.display = 'block';
                bayarUangContainer.style.display = 'none';
                bayarUangInput.value = ''; // Kosongkan input bayar uang
            } else if (this.value === 'Uang') {
                bayarBerasContainer.style.display = 'none';
                bayarUangContainer.style.display = 'block';
                bayarBerasInput.value = ''; // Kosongkan input bayar beras
            }
        });

        paymentForm.addEventListener('submit', function(event) {
            let isValid = true;

            // Pengecekan jika jenis bayar Beras atau Uang
            if (jenisBayarSelect.value === 'Beras' && !bayarBerasInput.value) {
                isValid = false;
                alert("Jumlah Beras harus diisi.");
            } else if (jenisBayarSelect.value === 'Uang' && !bayarUangInput.value) {
                isValid = false;
                alert("Jumlah Uang harus diisi.");
            }

            // Pengecekan jika jumlah tanggungan yang dibayar lebih besar dari jumlah tanggungan
            if (parseFloat(jumlahTanggunganDibayar.value) > parseFloat(jumlahTanggungan.value)) {
                isValid = false;
                alert("Jumlah tanggungan yang dibayar tidak boleh lebih besar dari jumlah tanggungan.");
            }

            if (!isValid) {
                event.preventDefault(); // Hentikan pengiriman form jika ada error
            }
        });

        // Trigger change event to set the initial state
        jenisBayarSelect.dispatchEvent(new Event('change'));
    });
</script>
@endpush

@endsection