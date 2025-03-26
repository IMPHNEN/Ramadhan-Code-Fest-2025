@extends('layouts.backend.master')

@section('title', 'Tambah Data Pengumpulan Zakat — Masjid Nur Ilahi')
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
                    Tambah Data Pengumpulan Zakat
                </h5>
            </div>
            <div class="card-body">
                <p>
                    Dibawah ini adalah form untuk tambah data penguumpulan zakat.
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
                    <h5>Tambah Data Pengumpulan Zakat</h5>
                </div>
                <form method="POST" id="paymentForm" action="{{ route('pengumpulan_zakat.store') }}" enctype="multipart/form-data"
                    class="needs-validation">
                    @csrf
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
                                <div class="">
                                    <select class="js-example-basic-single" id="nama_muzakki" name="nama_muzakki">
                                        <option></option>
                                        @foreach ($items as $item)
                                        <option value="{{ $item->nama_muzakki }}" data-tanggungan="{{ $item->jumlah_tanggungan }}">
                                            {{ $item->nama_muzakki }}
                                        </option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="form-row mt-4">
                            <div class="form-group col-md-4 mb-2">
                                <label for="jumlah_tanggungan">Jumlah Tanggungan <span class="text-danger">*</span></label>
                                <div class="input-group mb-3">
                                    <input readonly required id="jumlah_tanggungan" type="text" value="{{ old('jumlah_tanggungan') }}" class="form-control" name="jumlah_tanggungan">
                                </div>
                            </div>
                            <!--div class="form-group col-md-4 mb-2">
                                <label for="angkatan">Jumlah Tanggungan <span class="text-danger">*</span></label>
                                <div class="input-group mb-3">
                                    <input required id="jumlah_tanggungan" type="text"
                                        value="{{ old('jumlah_tanggungan') }}" class="form-control"
                                        name="jumlah_tanggungan">
                                </div>
                            </div-->

                            <div class="form-group col-md-4 mb-2">
                                <label for="angkatan">Jumlah Tanggungan yang Dibayar <span
                                        class="text-danger">*</span></label>
                                <div class="input-group mb-3">
                                    <input required id="jumlah_tanggungandibayar" type="text"
                                        value="{{ old('jumlah_tanggungandibayar') }}" class="form-control"
                                        name="jumlah_tanggungandibayar">
                                </div>
                            </div>

                            <!--div class="form-group col-md-4 mb-2">
                                <label for="jenis_bayar">Jenis Bayar <span class="text-danger">*</span></label>
                                <div class="input-group mb-3">
                                    <select class="custom-select" id="jenis_bayar" name="jenis_bayar">
                                        <option value="" disabled selected>Pilih ...</option>
                                        <option value="Beras">Beras</option>
                                        <option value="Uang">Uang</option>
                                    </select>
                                </div>
                            </div>

                            <div class="form-group col-md-12">
                                <div class="alert bg-primary py-2" role="alert">
                                    Jika memilih jenis bayar menggunakan beras maka isi tanpa satuan KG dan jika uang maka isi dengan nominal angka
                                </div>
                            </div>

                            <div class="form-group col-md-12 mb-2" id="input_bayar_beras" style="display: none;">
                                <label for="bayar_beras">Bayar Beras (KG) <span class="text-danger">*</span></label>
                                <div class="input-group mb-3">
                                    <input id="bayar_beras" type="number" value="{{ old('bayar_beras') }}" class="form-control" name="bayar_beras">
                                </div>
                            </div>

                            <div class="form-group col-md-12 mb-2" id="input_bayar_uang" style="display: none;">
                                <label for="bayar_uang">Bayar Uang <span class="text-danger">*</span></label>
                                <div class="input-group mb-3">
                                    <input id="bayar_uang" type="number" value="{{ old('bayar_uang') }}" class="form-control" name="bayar_uang">
                                </div>
                            </div-->

                            <div class="form-group col-md-4 mb-2">
                                <label for="jenis_bayar">Jenis Bayar <span class="text-danger">*</span></label>
                                <div class="input-group mb-3">
                                    <select class="custom-select" id="jenis_bayar" name="jenis_bayar" required>
                                        <option value="" disabled selected>Pilih ...</option>
                                        <option value="Beras">Beras</option>
                                        <option value="Uang">Uang</option>
                                    </select>
                                </div>
                            </div>

                            <div class="form-group col-md-12">
                                <div class="alert bg-primary py-2" role="alert">
                                    Jika memilih jenis bayar menggunakan beras maka isi tanpa satuan KG dan jika uang maka isi dengan nominal angka
                                </div>
                            </div>

                            <div class="form-group col-md-12 mb-2" id="input_bayar_beras" style="display: none;">
                                <label for="bayar_beras">Bayar Beras (KG) <span class="text-danger">*</span></label>
                                <div class="input-group mb-3">
                                    <input id="bayar_beras" type="number" value="{{ old('bayar_beras') }}" class="form-control" name="bayar_beras">
                                </div>
                            </div>

                            <div class="form-group col-md-12 mb-2" id="input_bayar_uang" style="display: none;">
                                <label for="bayar_uang">Bayar Uang <span class="text-danger">*</span></label>
                                <div class="input-group mb-3">
                                    <input id="bayar_uang" type="number" value="{{ old('bayar_uang') }}" class="form-control" name="bayar_uang">
                                </div>
                            </div>

                        </div>

                    </div>
                    <div class="card-footer">
                        <button type="submit" class="btn btn-primary m-r-15" type="submit">Tambah</button>
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
</script>

<script>
    $(document).ready(function() {
        $('#nama_muzakki').change(function() {
            var selectedOption = $(this).find('option:selected');
            var jumlahTanggungan = selectedOption.data('tanggungan');

            $('#jumlah_tanggungan').val(jumlahTanggungan + ' Orang');
        });

        $('#jenis_bayar').change(function() {
            var jenisBayar = $(this).val();

            $('#input_bayar_beras').hide();
            $('#input_bayar_uang').hide();

            if (jenisBayar === 'Beras') {
                $('#input_bayar_beras').show();
            } else if (jenisBayar === 'Uang') {
                $('#input_bayar_uang').show();
            }
        });

        $('form').on('submit', function(event) {
            var jumlahTanggungan = parseInt($('#jumlah_tanggungan').val());
            var jumlahTanggunganDibayar = parseInt($('#jumlah_tanggungandibayar').val());

            if (jumlahTanggunganDibayar > jumlahTanggungan) {
                event.preventDefault();
                alert('Jumlah Tanggungan yang Dibayar tidak boleh lebih banyak dari Jumlah Tanggungan.');
                $('#jumlah_tanggungandibayar').focus();
            }
        });
    });

    document.addEventListener("DOMContentLoaded", function() {
        const jenisBayarSelect = document.getElementById('jenis_bayar');
        const bayarBerasContainer = document.getElementById('input_bayar_beras');
        const bayarUangContainer = document.getElementById('input_bayar_uang');
        const bayarBerasInput = document.getElementById('bayar_beras');
        const bayarUangInput = document.getElementById('bayar_uang');
        const paymentForm = document.getElementById('paymentForm');

        jenisBayarSelect.addEventListener('change', function() {
            if (this.value === 'Beras') {
                bayarBerasContainer.style.display = 'block';
                bayarUangContainer.style.display = 'none';
                bayarUangInput.value = '';
            } else if (this.value === 'Uang') {
                bayarBerasContainer.style.display = 'none';
                bayarUangContainer.style.display = 'block';
                bayarBerasInput.value = '';
            }
        });

        paymentForm.addEventListener('submit', function(event) {
            let isValid = true;

            if (jenisBayarSelect.value === 'Beras' && !bayarBerasInput.value) {
                isValid = false;
                alert("Jumlah Beras (KG) harus diisi.");
            } else if (jenisBayarSelect.value === 'Uang' && !bayarUangInput.value) {
                isValid = false;
                alert("Jumlah Uang harus diisi.");
            }

            if (!isValid) {
                event.preventDefault();
            }
        });

        jenisBayarSelect.dispatchEvent(new Event('change'));
    });
</script>
@endpush

@endsection