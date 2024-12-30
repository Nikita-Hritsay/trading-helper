# Alpha Vantage Interactions

import requests
import os

class AlphaVantageInteractions:
    def __init__(self):
        self.API_KEY = os.environ.get("API_KEY")

    def get_crypto_data(self, symbol, timeSeries):
        r = requests.get(f'https://www.alphavantage.co/query?function={timeSeries}&symbol={symbol}&market=USD&apikey={self.API_KEY}')
        return r.json()