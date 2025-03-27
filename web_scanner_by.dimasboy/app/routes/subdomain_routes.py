from flask import Blueprint, render_template, request
from app.services.subdomain_lookup import SubdomainLookup

subdomain_bp = Blueprint('subdomain', __name__)

@subdomain_bp.route('/subdomain-lookup', methods=['GET', 'POST'])
def subdomain_lookup():
    result = None
    if request.method == 'POST':
        domain = request.form.get('domain')
        result = SubdomainLookup.get_subdomains(domain)
    return render_template('subdomain_lookup.html', result=result)
