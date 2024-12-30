# Main file for FastAPI

from typing import Union

from fastapi import FastAPI

from services.alpha_vantage import AlphaVantageInteractions

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/cryptocurrencies/{symbol}")
def read_daily_cryptocurrency(symbol: str, q: Union[str, None] = None):
    alphaVantageInteractions = AlphaVantageInteractions()
    data = alphaVantageInteractions.get_crypto_data(symbol, "DIGITAL_CURRENCY_DAILY")
    return {"symbol": symbol, "data": data}

@app.get("/cryptocurrencies/{symbol}/{timeSeries}")
def read_cryptocurrency_by_time_series(symbol: str, timeSeries: str, q: Union[str, None] = None):
    alphaVantageInteractions = AlphaVantageInteractions()
    data = alphaVantageInteractions.get_crypto_data(symbol, timeSeries)
    return {"symbol": symbol, "data": data}
