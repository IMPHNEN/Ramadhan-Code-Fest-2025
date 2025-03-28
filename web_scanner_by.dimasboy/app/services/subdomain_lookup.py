import cloudscraper
import json

class SubdomainLookup:
    SEARCH_URL = "https://crt.sh/"

    @staticmethod
    def get_subdomains(domain: str) -> dict:
        """
        Mengambil subdomain dari sebuah domain menggunakan crt.sh.

        Parameters:
        - domain (str): Domain yang akan dicari subdomain-nya.

        Returns:
        - dict: Berisi key 'subdomains' dengan list subdomain yang ditemukan, 
                atau key 'message' jika tidak ada subdomain, atau key 'error' jika terjadi kesalahan.
        """
        try:
            scraper = cloudscraper.create_scraper()
            params = {"q": domain, "output": "json"}
            response = scraper.get(
                SubdomainLookup.SEARCH_URL,
                params=params,
                timeout=15
            )
            response.raise_for_status()

            data = json.loads(response.text)
            subdomains = set()
            for entry in data:
                name_value = entry.get("name_value")
                if name_value:
                    subdomains.add(name_value)
            
            if subdomains:
                return {"subdomains": list(subdomains)}
            else:
                return {"message": "Tidak ditemukan subdomain."}
        except Exception as e:
            return {"error": f"Error: {str(e)}"}
