# Main file for FastAPI

from typing import Union

from fastapi import FastAPI

from services.alpha_vantage import AlphaVantageInteractions

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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
