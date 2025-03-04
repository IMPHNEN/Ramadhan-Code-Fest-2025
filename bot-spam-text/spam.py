import time
# import time: Mengimpor modul time yang menyediakan berbagai fungsi terkait waktu,
# seperti sleep yang digunakan di dalam skrip.
import keyboard
# import keyboard: Mengimpor modul keyboard yang digunakan untuk memantau dan mengontrol kegiatan tombol pada keyboard.
import pyautogui
# import pyautogui: Mengimpor modul pyautogui yang menyediakan fungsi untuk mengendalikan pergerakan kursor dan tindakan pada layar.


message = "Balik jamber?"
# message = "Balik jamber?": 
# Mendefinisikan variabel message dengan nilai string "Balik jamber?". Variabel ini akan digunakan sebagai pesan yang akan dikirimkan.
n = 50
# n = 100: 
# Mendefinisikan variabel n dengan nilai 100. Variabel ini akan digunakan sebagai jumlah pengulangan pesan yang akan dikirimkan.

keyboard.wait('ctrl')
# keyboard.wait('ctrl'): 
# Program akan menunggu sampai tombol 'Ctrl' (Control) ditekan. Setelah tombol 'Ctrl' ditekan, program akan melanjutkan eksekusi ke baris berikutnya.
time.sleep(1)
# time.sleep(1): 
# Program akan berhenti selama 1 detik. Ini memberi waktu untuk mempersiapkan tempat di mana Anda ingin mengirim pesan.


# for i in range(n): 
# Ini adalah loop for yang akan berulang sebanyak n kali (nilai yang ditetapkan sebelumnya).
for i in range(n):
    pyautogui.typewrite(message + '\n')
    # pyautogui.typewrite(message + '\n'): Ini akan mengetikkan pesan yang telah ditetapkan (nilai dari variabel message) dan menambahkan karakter newline (\n) atau enter setelahnya. 
    # Sehingga setiap pesan akan dikirimkan dengan mengetikkan teks di dalam variabel message diikuti dengan karakter newline, yang ekuivalen dengan menekan tombol Enter.

    
