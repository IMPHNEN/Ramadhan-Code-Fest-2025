from collections import namedtuple

# Namedtuple untuk konfigurasi warna
Config = namedtuple("Config", ["background_color", "box_color",
                               "boxs_color", "box_splits_color",
                               "box_split_color", "font_color"])

# Konstanta warna
BACKGROUND_COLOR = (30, 30, 30)
BOX_COLOR = (0, 255, 0)
BOXS_COLOR = (150, 255, 160)
BOX_SPLITS_COLOR = (158, 105, 108)
BOX_SPLIT_COLOR = (31, 171, 204)
FONT_COLOR = (214, 47, 145)

# Definisi warna
COLORS = Config(background_color=BACKGROUND_COLOR, 
               box_color=BOX_COLOR,
               boxs_color=BOXS_COLOR,
               box_splits_color=BOX_SPLITS_COLOR,
               box_split_color=BOX_SPLIT_COLOR,
               font_color=FONT_COLOR)
