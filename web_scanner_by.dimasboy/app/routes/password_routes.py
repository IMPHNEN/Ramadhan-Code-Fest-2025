from flask import Blueprint, render_template, request
from app.services.password_generator import PasswordGenerator

password_bp = Blueprint('password', __name__)

@password_bp.route('/password-generator', methods=['GET', 'POST'])
def password_generator():
    generated_password = None
    if request.method == 'POST':
        length = int(request.form.get('length', 12))
        use_upper = request.form.get('use_upper') == 'on'
        use_lower = request.form.get('use_lower') == 'on'
        use_digits = request.form.get('use_digits') == 'on'
        use_symbols = request.form.get('use_symbols') == 'on'
        try:
            generated_password = PasswordGenerator.generate(length, use_upper, use_lower, use_digits, use_symbols)
        except Exception as e:
            generated_password = str(e)
    return render_template('password_generator.html', password=generated_password)
