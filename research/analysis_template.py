"""
BitTrade V3 - Quantitative Strategy & Cointegration Research Template
====================================================================
Script ini memfasilitasi riset pasar kuantitatif, analisis volatilitas StdDev,
uji kointegrasi pasang mata uang (StatARB), dan visualisasi data kline.
"""

import numpy as np
import pandas as pd
import statsmodels.api as sm
from statsmodels.tsa.stattools import adfuller, coint

def calculate_market_regime(df: pd.DataFrame, window: int = 20, stddev_threshold: float = 0.075):
    """
    Menghitung regime pasar berdasarkan Standar Deviasi volatilitas persentase perubahan.
    - Volatilitas < 0.075%: Sideways (Mean Reversion / Bollinger Bands)
    - Volatilitas >= 0.075%: Trending (EMA Crossover + Volume Confirmation)
    """
    df['pct_change'] = df['close'].pct_change()
    df['volatility_stddev'] = df['pct_change'].rolling(window=window).std() * 100
    df['regime'] = np.where(df['volatility_stddev'] < stddev_threshold, 'Sideways', 'Trending')
    return df

def test_cointegration(series1: pd.Series, series2: pd.Series):
    """
    Uji Kointegrasi Engle-Granger (StatARB Research) untuk dua aset kripto.
    """
    score, p_value, _ = coint(series1, series2)
    print(f"--- Uji Kointegrasi StatARB ---")
    print(f"t-statistic : {score:.4f}")
    print(f"p-value     : {p_value:.4f}")
    
    if p_value < 0.05:
        print("RESULT: Pasangan aset TERKOINTEGRASI (Signifikan pada level 5%)")
    else:
        print("RESULT: Pasangan aset TIDAK Terkointegrasi (Tolak Hipotesis)")
        
    return score, p_value

if __name__ == "__main__":
    print("BitTrade V3 Quantitative Research Sandbox Ready.")
    
    # Generate Synthetic Kline Data for Verification
    np.random.seed(42)
    dates = pd.date_range("2026-08-01", periods=100, freq="1h")
    btc_prices = 60000 + np.cumsum(np.random.normal(0, 200, 100))
    eth_prices = 3000 + btc_prices * 0.045 + np.random.normal(0, 20, 100)
    
    df_btc = pd.DataFrame({'timestamp': dates, 'close': btc_prices})
    df_eth = pd.DataFrame({'timestamp': dates, 'close': eth_prices})
    
    df_btc = calculate_market_regime(df_btc)
    print("\nSample Analysis BitTrade V3 Market Regime:")
    print(df_btc[['timestamp', 'close', 'volatility_stddev', 'regime']].tail(5))
    
    print("\nTesting ETH/BTC StatARB Cointegration:")
    test_cointegration(df_eth['close'], df_btc['close'])
