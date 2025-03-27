from flask import Blueprint, render_template, request, jsonify
from app.services.email_leak_checker import EmailLeakChecker

email_bp = Blueprint('email', __name__)

@email_bp.route('/email-leak-check', methods=['GET', 'POST'])
def email_leak_check():
    result = None
    if request.method == 'POST':
        email = request.form.get('email')
        result_data = EmailLeakChecker.check_email(email)

        # Konversi JSON menjadi teks yang lebih terbaca
        if isinstance(result_data, dict):
            formatted_result = []
            for key, value in result_data.items():
                if isinstance(value, list):  # Jika nilai berupa list, ubah menjadi string terformat
                    formatted_result.append(f"{key}: {', '.join(map(str, value))}")
                elif isinstance(value, dict):  # Jika ada nested dict, format ulang
                    nested_result = "\n  ".join(f"{k}: {v}" for k, v in value.items())
                    formatted_result.append(f"{key}:\n  {nested_result}")
                else:
                    formatted_result.append(f"{key}: {value}")
            result = "\n".join(formatted_result)

        elif isinstance(result_data, list):
            result = "\n".join(f"- {str(item)}" for item in result_data)

        else:
            result = str(result_data)

    return render_template('email_leak.html', result=result)
