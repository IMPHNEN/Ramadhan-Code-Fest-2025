import random
import string
from typing import Any

class PasswordGenerator:
    @staticmethod
    def generate(length: int = 12, 
                 use_upper: bool = True, 
                 use_lower: bool = True, 
                 use_digits: bool = True, 
                 use_symbols: bool = True) -> str:
        """
        Menghasilkan password acak berdasarkan parameter yang dipilih.

        Parameters:
        - length (int): Panjang password yang dihasilkan. Default 12.
        - use_upper (bool): Sertakan huruf kapital jika True.
        - use_lower (bool): Sertakan huruf kecil jika True.
        - use_digits (bool): Sertakan angka jika True.
        - use_symbols (bool): Sertakan simbol jika True.

        Returns:
        - str: Password acak yang dihasilkan.

        Raises:
        - ValueError: Jika tidak ada karakter yang dipilih untuk pembuatan password.
        """
        chars = ""
        if use_upper:
            chars += string.ascii_uppercase
        if use_lower:
            chars += string.ascii_lowercase
        if use_digits:
            chars += string.digits
        if use_symbols:
            chars += string.punctuation

        if not chars:
            raise ValueError("Tidak ada karakter yang dipilih untuk pembuatan password.")

        return "".join(random.choice(chars) for _ in range(length))
