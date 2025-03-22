from collections import namedtuple

# Namedtuple untuk konfigurasi
Config = namedtuple("Config", ["box_size", "fps", "skor", "posisi_fon", "peluru"])

# Konstanta
BOX_SIZE = 50
FPS = 60
SKOR = 0
POS_Fon = 115
PELURU = 5

# Konfigurasi dalam namedtuple
SETTINGS = Config(box_size=BOX_SIZE, fps=FPS, skor=SKOR, posisi_fon=POS_Fon, peluru=PELURU)
