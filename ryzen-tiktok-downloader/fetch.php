<?php
// Fungsi untuk memformat ukuran file menjadi lebih mudah dibaca
function formatSize($bytes)
{
    if ($bytes >= 1073741824) {
        return number_format($bytes / 1073741824, 2) . ' GB';
    } elseif ($bytes >= 1048576) {
        return number_format($bytes / 1048576, 2) . ' MB';
    } elseif ($bytes >= 1024) {
        return number_format($bytes / 1024, 2) . ' KB';
    } else {
        return $bytes . ' bytes';
    }
}

// Fungsi proses permintaan ke backend
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $url = $_POST['tiktok_url'];

    if (filter_var($url, FILTER_VALIDATE_URL)) {
        $api_url = "https://api.ryzendesu.vip/api/downloader/ttdl?url=" . urlencode($url);

        // Fetch data dari API dengan cURL
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $api_url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Content-Type: application/json',
            'User-Agent: Ryzendesu Network Authorized App'
        ]);
        $response = curl_exec($ch);
        $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        session_start();

        if ($http_code === 200) {
            $data = json_decode($response, true);

            if ($data['success']) {
                $video_data = $data['data']['data'];

                // Format ukuran file menggunakan fungsi formatSize
                $size = formatSize($video_data['size']);
                $wm_size = formatSize($video_data['wm_size']);
                $hd_size = formatSize($video_data['hd_size']);

                // Simpan data ke session untuk digunakan di halaman depan
                $_SESSION['video_data'] = [
                    'title' => $video_data['title'],
                    'cover' => $video_data['cover'],
                    'play' => $video_data['play'],
                    'size' => $size,
                    'wmplay' => $video_data['wmplay'],
                    'wm_size' => $wm_size,
                    'hdplay' => $video_data['hdplay'],
                    'hd_size' => $hd_size,
                    'author' => $video_data['author']['nickname'],
                    'author_avatar' => $video_data['author']['avatar'],
                    'author_username' => $video_data['author']['unique_id'],
                    'play_count' => $video_data['play_count'],
                    'digg_count' => $video_data['digg_count'],
                    'comment_count' => $video_data['comment_count'],
                    'share_count' => $video_data['share_count'],
                    'download_count' => $video_data['download_count'],
                    'collect_count' => $video_data['collect_count'],
                    'create_time' => $video_data['create_time'],
                    'music' => [
                        'title' => $video_data['music_info']['title'],
                        'play_url' => $video_data['music_info']['play']
                    ]
                ];

                // Redirect ke halaman depan
                header("Location: index.php");
                exit;
            } else {
                $_SESSION['error'] = $data['data']['msg'] ?? 'Unknown error.';
                header("Location: index.php");
                exit;
            }
        } else {
            $_SESSION['error'] = 'Failed to fetch data from API.';
            header("Location: index.php");
            exit;
        }
    } else {
        session_start();
        $_SESSION['error'] = 'Invalid TikTok URL.';
        header("Location: index.php");
        exit;
    }
} else {
    session_start();
    $_SESSION['error'] = 'Invalid request method.';
    header("Location: index.php");
    exit;
}
