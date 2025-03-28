@extends('layouts.backend.master')

@section('title', 'Laporan Distribusi Zakat — Masjid Nur Ilahi')
@section('content')

@push('datatable-styles')
<link rel="stylesheet" type="text/css" href="{{ url('cuba/assets/css/vendors/scrollbar.css') }}">
<link rel="stylesheet" type="text/css" href="{{ url('cuba/assets/css/vendors/datatables.css') }}">
<link rel="stylesheet" type="text/css" href="{{ url('cuba/assets/css/vendors/datatable-extension.css') }}">
@endpush

<!-- file wrapper for better tabs start-->
<div>
    <!-- pages title header start-->
    <div class="container-fluid">
        <div class="row text-start" style="margin-top:14vh">
            <div class="col-sm-6 col-xl-3 col-lg-6">
                <div class="card o-hidden">
                    <div class="bg-primary b-r-4 card-body">
                        <div class="media static-top-widget">
                            <div class="media-body"><span class="m-0">Total Mustahik</span>
                                <h6 class="mb-0 counter">{{ DB::table('mustahik')->count() }} Orang</h6><i class="icon-bg"
                                    data-feather="user-plus"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-sm-6 col-xl-3 col-lg-6">
                <div class="card o-hidden">
                    <div class="bg-primary b-r-4 card-body">
                        <div class="media static-top-widget">
                            <div class="media-body"><span class="m-0">Total Distribusi</span>
                                <h6 class="mb-0 counter">{{ $totalDistribusi }} Orang</h6><i class="icon-bg"
                                    data-feather="users"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-sm-6 col-xl-3 col-lg-6">
                <div class="card o-hidden">
                    <div class="bg-primary b-r-4 card-body">
                        <div class="media static-top-widget">
                            <div class="media-body"><span class="m-0">Beras Tersisa</span>
                                <h6 class="mb-0 counter">{{ $totalBeras }} KG</h6><i class="icon-bg"
                                    data-feather="shopping-bag"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-sm-6 col-xl-3 col-lg-6">
                <div class="card o-hidden">
                    <div class="bg-primary b-r-4 card-body">
                        <div class="media static-top-widget">
                            <div class="media-body"><span class="m-0">Uang Tersisa</span>
                                <h6 class="mb-0 counter">Rp {{ $totalUang }}</h6><i class="icon-bg"
                                    data-feather="dollar-sign"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- pages title header end-->
    <!-- main content start-->
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-12">
                <div class="card">
                    <div class="card-header">
                        <h5>Laporan Distribusi Zakat</h5>
                    </div>
                    <div class="card-body">
                        <div class="dt-ext table-responsive">
                            <table class="display" id="export-button">
                                <thead>
                                    <tr>

                                        <th>Nama Mustahik</th>
                                        <th class="text-center">Jenis Zakat</th>
                                        <th class="text-center">Jumlah Beras</th>
                                        <th class="text-center">Jumlah Uang</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    @forelse ($items as $item)
                                    <tr>

                                        <td>
                                            <div class="d-flex py-1 align-items-center">
                                                <div class="avatars mr-2">
                                                    <div class="avatar ratio"><img
                                                            style="object-fit: cover;
                                                        width: 40px;
                                                        height: 40px;"
                                                            class="b-r-8"
                                                            src="https://ui-avatars.com/api/?background=004040&color=fff&name={{ $item->nama_mustahik }}">
                                                    </div>
                                                </div>
                                                <div class="flex-fill">
                                                    <div class="font-weight-bold">{{ $item->nama_mustahik }}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="text-center">{{ $item->jenis_zakat }}</td>
                                        <td class="text-center">{{ $item->jumlah_beras ? $item->jumlah_beras . ' KG' : '-' }}</td>
                                        <td class="text-center">{{ $item->jumlah_uang ? 'Rp ' . $item->jumlah_uang : '-' }}</td>

                                    </tr>
                                    @empty
                                    @endforelse
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- main content end-->
</div>
<!-- file wrapper for better tabs start-->

@push('datatable-scripts')
<script src="{{ url('cuba/assets/js/datatable/datatables/jquery.dataTables.min.js') }}"></script>
<script src="{{ url('cuba/assets/js/datatable/datatable-extension/dataTables.buttons.min.js') }}"></script>
<script src="{{ url('cuba/assets/js/datatable/datatable-extension/jszip.min.js') }}"></script>
<script src="{{ url('cuba/assets/js/datatable/datatable-extension/buttons.colVis.min.js') }}"></script>
<script src="{{ url('cuba/assets/js/datatable/datatable-extension/pdfmake.min.js') }}"></script>
<script src="{{ url('cuba/assets/js/datatable/datatable-extension/vfs_fonts.js') }}"></script>
<script src="{{ url('cuba/assets/js/datatable/datatable-extension/dataTables.autoFill.min.js') }}"></script>
<script src="{{ url('cuba/assets/js/datatable/datatable-extension/dataTables.select.min.js') }}"></script>
<script src="{{ url('cuba/assets/js/datatable/datatable-extension/buttons.bootstrap4.min.js') }}"></script>
<script src="{{ url('cuba/assets/js/datatable/datatable-extension/buttons.html5.min.js') }}"></script>
<script src="{{ url('cuba/assets/js/datatable/datatable-extension/buttons.print.min.js') }}"></script>
<script src="{{ url('cuba/assets/js/datatable/datatable-extension/dataTables.bootstrap4.min.js') }}"></script>
<script src="{{ url('cuba/assets/js/datatable/datatable-extension/dataTables.responsive.min.js') }}"></script>
<script src="{{ url('cuba/assets/js/datatable/datatable-extension/responsive.bootstrap4.min.js') }}"></script>
<script src="{{ url('cuba/assets/js/datatable/datatable-extension/dataTables.keyTable.min.js') }}"></script>
<script src="{{ url('cuba/assets/js/datatable/datatable-extension/dataTables.colReorder.min.js') }}"></script>
<script src="{{ url('cuba/assets/js/datatable/datatable-extension/dataTables.fixedHeader.min.js') }}"></script>
<script src="{{ url('cuba/assets/js/datatable/datatable-extension/dataTables.rowReorder.min.js') }}"></script>
<script src="{{ url('cuba/assets/js/datatable/datatable-extension/dataTables.scroller.min.js') }}"></script>
<script src="{{ url('cuba/assets/js/datatable/datatable-extension/custom.js') }}"></script>
<script src="{{ url('cuba/assets/js/tooltip-init.js') }}"></script>
@endpush

@endsection