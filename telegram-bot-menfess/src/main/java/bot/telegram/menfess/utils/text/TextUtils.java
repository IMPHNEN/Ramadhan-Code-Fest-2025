package bot.telegram.menfess.utils.text;


public class TextUtils {

    public static String welcomMessage = """
            Welcome to Menfess Bot!
             Sebuah bot untuk mengirim pesan kepada base menfess.
            
            Untuk mendafaftar sebagai pengguna, tekan tombol dibawah ini.""";

    public static String alreadyRegistered = "Anda sudah terdaftar sebagai pengguna, silahkan menggunakan bot ini.";

    public static String registerSuccess = "Anda berhasil terdaftar sebagai pengguna, silahkan menggunakan bot ini.";

    public static String errorRegistered = "Ada yang salah, silahkan hubungi Admin untuk bantuan.";

    public static String account = "Selamat datang di bot menfess, detail user anda adalah :";

    public static String help = """
            Untuk menggunakan bot ini, silahkan ikuti langkah berikut :
            1. Daftar sebagai pengguna dengan menekan tombol 'Mendaftar'.
            2. Jika sudah terdaftar, tekan tombol 'Akun Anda' untuk melihat detail akun anda.
            3. Anda bisa melakukan topup dengan mengirim command /topup {id}.
            4. Anda bisa melakukan pengiriman pesan dengan mengirim command /send {pesan}.
            5. Anda bisa melihat list pesan anda dengan mengirim command /list.
            6. Anda bisa menghapus pesan anda dengan mengirim command /delete {pesan}.
            7. Anda bisa mengirim pesan anonim dengan mengirim command /anon {pesan}.
            
             <b>Hanya berlaku jika member anda premium</b>
            8. Anda bisa upgrade dengan top up minimal Rp5.000
            9. Setiap pesan yang anda kirim akan dikenakan biaya Rp100
            10. Jika saldo anda habis, dan limit free anda habis, anda tidak bisa mengirim pesan""";

    public static String helpSendMenfess = "Gunakan command /send lalu diikuti dengan pesan yang anda kirim";

    public static String topUpSuccess = "Top up berhasil. Saldo anda sekarang adalah :";

    public static String topUpFailed = "Top up gagal. Kode transaksi tidak ditemukan, Silahkan coba lagi";

    public static String helpTopUp = "Gunakan command /topup lalu diikuti dengan kode transaksi top up anda";
}
