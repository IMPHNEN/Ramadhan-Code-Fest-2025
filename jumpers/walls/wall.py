from typing import Union

class Object:
    def __init__(self, x: int, y: int, size: tuple[int, int]):
        """Inisialisasi objek dengan posisi, ukuran, dan atribut lainnya."""
        self._ox = x
        self._oy = y
        self._osize = size

    @property
    def get_ox(self) -> Union[int, int]:
        """Mengambil nilai ox saat ini"""
        return self._ox
    
    @get_ox.setter
    def set_ox(self, new_ox: Union[int, float]):
        """Mengedit nilai ox saat ini"""
        self._ox = new_ox

    @property
    def get_oy(self) -> Union[int, int]:
        """Mengambil nilai oy saat ini"""
        return self._oy
    
    @get_oy.setter
    def set_oy(self, new_oy: Union[int, int]):
        """Mengedit nilai oy saat ini"""
        self._oy = new_oy

    @property
    def get_size(self) -> tuple[int, int]:
        """Mengambil nilai size saat ini"""
        return self._osize
    
    @get_size.setter
    def set_size(self, new_size: tuple[int, int]):
        """Mengedit nilai size saat ini"""
        self._osize = new_size