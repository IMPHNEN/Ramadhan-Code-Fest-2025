<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="./public/img/favicon.ico" type="image/x-icon">
    <title>TikTok Video Downloader</title>
    <link href="./public/css/tailwind.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.1/css/all.min.css" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.1/js/all.min.js"></script>
    <link rel="stylesheet" href="https://cdn.plyr.io/3.7.8/plyr.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/plyr/3.7.8/plyr.min.js"></script>
</head>

<body class="bg-gray-900 text-white min-h-screen flex flex-col">
    <header class="bg-gray-800 text-white py-4">
        <div class="container mx-auto px-4">
            <h1
                class="text-3xl font-bold text-center bg-gradient-to-l from-red-500 to-purple-500 bg-clip-text text-transparent">
                TikTok Video Downloader</h1>
        </div>
    </header>

    <main class="flex-grow container mx-auto px-4 py-8">
        <div id="form-container" class="max-w-md mx-auto bg-gray-800 rounded-lg shadow-md p-6 mt-48">
            <form action="fetch.php" method="POST" class="space-y-4">
                <div>
                    <label for="tiktok-url" class="block text-sm font-medium text-gray-400">TikTok Video URL</label>
                    <input type="url" id="tiktok-url" name="tiktok_url" required
                        class="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-red-500 focus:ring focus:ring-red-200"
                        placeholder=" Paste TikTok URL here">
                </div>
                <button type="submit"
                    class="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition duration-150 ease-in-out">
                    <i class="fa-solid fa-download"></i> Download Video
                </button>
            </form>
        </div>

        <?php session_start(); ?>

        <?php if (isset($_SESSION['error'])): ?>
            <div class="mt-8 max-w-md mx-auto bg-red-700 rounded-lg shadow-md p-6">
                <p class="text-white font-semibold">Error: <?= htmlspecialchars($_SESSION['error']) ?></p>
            </div>
            <?php unset($_SESSION['error']); ?>
        <?php endif; ?>

        <?php if (isset($_SESSION['video_data'])): ?>
            <div id="result" class="mt-8 max-w-md mx-auto bg-gray-800 rounded-lg shadow-md p-6">
                <div class="flex items-center mb-4">
                    <!-- Gambar kecil -->
                    <img src="<?= htmlspecialchars($_SESSION['video_data']['author_avatar']) ?>" alt="Author Profile"
                        class="w-12 rounded-full mr-2">
                    <div>
                        <!-- Nama dan Username -->
                        <p class="text-sm font-medium"><?= htmlspecialchars($_SESSION['video_data']['author']) ?></p>
                        <p class="text-xs text-gray-500">
                            @<?= htmlspecialchars($_SESSION['video_data']['author_username']) ?></p>
                    </div>
                </div>

                <video id="player" playsinline controls class="mb-4 w-full">
                    <source src="<?= htmlspecialchars($_SESSION['video_data']['play']) ?>" type="video/mp4">
                    Your browser does not support the video tag.
                </video>

                <p class="text-lg font-bold mt-4"><?= htmlspecialchars($_SESSION['video_data']['title']) ?></p>
                <p class="text-sm text-gray-400">By <?= htmlspecialchars($_SESSION['video_data']['author']) ?></p>

                <div class="mt-4 space-y-2">
                    <div class="flex justify-between items-center">
                        <span>SD Video:</span>
                        <a href="<?= htmlspecialchars($_SESSION['video_data']['play']) ?>" download
                            class="bg-green-500 text-white py-1 px-4 rounded-md hover:bg-green-600"><i
                                class="fa-solid fa-download"></i>
                            <?= htmlspecialchars($_SESSION['video_data']['size']) ?>
                        </a>
                    </div>
                    <div class="flex justify-between items-center">
                        <span>HD Video:</span>
                        <a href="<?= htmlspecialchars($_SESSION['video_data']['hdplay']) ?>" download
                            class="bg-yellow-500 text-white py-1 px-4 rounded-md hover:bg-yellow-600"><i
                                class="fa-solid fa-download"></i>
                            <?= htmlspecialchars($_SESSION['video_data']['hd_size']) ?>
                        </a>
                    </div>
                    <div class="flex justify-between items-center">
                        <span>Video with WM:</span>
                        <a href="<?= htmlspecialchars($_SESSION['video_data']['wmplay']) ?>" download
                            class="bg-blue-500 text-white py-1 px-4 rounded-md hover:bg-blue-600"><i
                                class="fa-solid fa-download"></i>
                            <?= htmlspecialchars($_SESSION['video_data']['wm_size']) ?>
                        </a>
                    </div>
                </div>

                <div class="mt-6">
                    <h3 class="text-lg font-bold">Audio Info:</h3>
                    <p class="text-gray-400"><?= htmlspecialchars($_SESSION['video_data']['music']['title']) ?></p>
                    <a href="<?= htmlspecialchars($_SESSION['video_data']['music']['play_url']) ?>" download
                        class="mt-2 inline-block bg-purple-600 text-white py-1 px-4 rounded-md hover:bg-purple-700">
                        <i class="fa-solid fa-download"></i> Audio
                    </a>
                </div>

                <div class="mt-6">
                    <h3 class="text-lg font-bold">Statistics:</h3>
                    <ul class="text-sm text-gray-400 space-y-1 mt-2">
                        <li><strong>Play Count:</strong> <?= htmlspecialchars($_SESSION['video_data']['play_count']) ?></li>
                        <li><strong>Likes:</strong> <?= htmlspecialchars($_SESSION['video_data']['digg_count']) ?></li>
                        <li><strong>Comments:</strong> <?= htmlspecialchars($_SESSION['video_data']['comment_count']) ?>
                        </li>
                        <li><strong>Shares:</strong> <?= htmlspecialchars($_SESSION['video_data']['share_count']) ?></li>
                        <li><strong>Downloads:</strong> <?= htmlspecialchars($_SESSION['video_data']['download_count']) ?>
                        </li>
                        <li><strong>Favorites:</strong> <?= htmlspecialchars($_SESSION['video_data']['collect_count']) ?>
                        </li>
                        <li><strong>Created At:</strong>
                            <?= date('Y-m-d H:i:s', htmlspecialchars($_SESSION['video_data']['create_time'])) ?></li>
                    </ul>
                </div>
            </div>

            <?php
            session_unset(); // Menghapus semua data session, adios
            session_destroy(); // Menghancurkan session, duarrr
        endif; ?>
    </main>

    <footer class="bg-gray-800 py-4 mt-8">
        <div class="container mx-auto px-4 text-center text-gray-400 text-sm">
            <p>&copy; <?= date('Y') ?> TikTok Video Downloader.<a href="https://api.ryzendesu.vip" target="_blank">
                    Backend by Ryzen API</a></p>
            <p class="mt-2">Frontend build with PHP 8.4 and Tailwind CSS</p>
        </div>
    </footer>
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const result = document.getElementById('result');
            const formContainer = document.getElementById('form-container');
            if (result && formContainer) {
                formContainer.classList.remove('mt-48');
            }
        });
        document.addEventListener('DOMContentLoaded', () => {
            const player = new Plyr('#player');
        });
    </script>
</body>

</html>