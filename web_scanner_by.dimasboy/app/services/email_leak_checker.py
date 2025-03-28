import requests
import json
from flask import Blueprint, render_template, request

email_bp = Blueprint('email', __name__)

class EmailLeakChecker:
    @staticmethod
    def check_email(email: str) -> dict:
        """
        Mengecek kebocoran email melalui API tanpa menyimpan cache atau melakukan logging.
        
        Parameters:
        - email (str): Email yang akan dicek.
        
        Returns:
        - dict: Hasil pengecekan dari API atau pesan error.
        """
        url = f"https://leakcheck.io/api/public?check={email}"
        response = requests.get(url)
        if response.status_code == 200:
            return response.json()
        else:
            return {"error": f"Error: {response.status_code}"}

@email_bp.route('/email-leak-check', methods=['GET', 'POST'])
def email_leak_check():
    result = None
    if request.method == 'POST':
        email_input = request.form.get('email')
        result_data = EmailLeakChecker.check_email(email_input)
        
        # Format hasil pengecekan dengan output JSON yang terformat rapi
        if isinstance(result_data, dict):
            if 'error' in result_data:
                body = f"<p class='text-red-400 font-semibold'>Terjadi kesalahan: {result_data['error']}</p>"
            else:
                formatted_json = json.dumps(result_data, indent=4, ensure_ascii=False)
                body = (
                    f"<p class='text-green-400 mb-2'>Kami berhasil mendapatkan informasi leak email Anda!</p>"
                    f"<pre class='bg-gray-800 p-4 rounded overflow-auto text-green-400'>{formatted_json}</pre>"
                )
        elif isinstance(result_data, list):
            formatted_json = json.dumps(result_data, indent=4, ensure_ascii=False)
            body = f"<pre class='bg-gray-800 p-4 rounded overflow-auto text-green-400'>{formatted_json}</pre>"
        else:
            body = "<p class='text-yellow-400'>Tidak ada data yang tersedia.</p>"
        
        result = body
        
    return render_template('email_leak.html', result=result)
