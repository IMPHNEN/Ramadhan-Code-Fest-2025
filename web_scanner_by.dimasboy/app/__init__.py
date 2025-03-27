from flask import Flask, render_template

def create_app():
    app = Flask(__name__)
    app.config.from_pyfile('../config.py')

    # Registrasi blueprint
    from app.routes.email_routes import email_bp
    from app.routes.password_routes import password_bp
    from app.routes.subdomain_routes import subdomain_bp

    app.register_blueprint(email_bp)
    app.register_blueprint(password_bp)
    app.register_blueprint(subdomain_bp)

    @app.route('/')
    def index():
        return render_template('index.html')

    return app
