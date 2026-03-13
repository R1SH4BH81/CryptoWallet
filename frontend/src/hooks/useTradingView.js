import { useEffect } from 'react'

const useTradingView = () => {
  useEffect(() => {
    // Inject TradingView scripts
    const scripts = [
      { src: 'https://www.livecoinwatch.com/static/lcw-widget.js' },
      { src: 'https://s3.tradingview.com/external-embedding/embed-widget-timeline.js', id: 'tv-timeline' },
      { src: 'https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js', id: 'tv-overview' },
      { src: 'https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js', id: 'tv-market' }
    ]

    scripts.forEach(s => {
      const script = document.createElement('script')
      script.src = s.src
      script.async = true
      if (s.id === 'tv-timeline') {
        script.innerHTML = JSON.stringify({
          "feedMode": "all_symbols",
          "isTransparent": true,
          "displayMode": "regular",
          "width": "100%",
          "height": "100%",
          "colorTheme": "dark",
          "locale": "en"
        })
        document.getElementById('timeline-container')?.appendChild(script)
      } else if (s.id === 'tv-overview') {
        script.innerHTML = JSON.stringify({
          "symbols": [["BITSTAMP:BTCUSD|1D"], ["CME:ETH1!|1D"], ["CRYPTOCAP:USDT|1D"], ["CRYPTOCAP:DOGE|1D"], ["CRYPTOCAP:SHIB|1D"], ["BINANCE:IOTAUSDT|1D"], ["BINANCE:ETCUSDT|1D"], ["CRYPTOCAP:ADA|1D"], ["CRYPTOCAP:MATIC|1D"], ["BINANCE:JUPUSDT|1D"], ["CRYPTOCAP:SOL|1D"]],
          "chartOnly": false, "width": "100%", "height": "100%", "locale": "en", "colorTheme": "dark", "autosize": true, "showVolume": false, "showMA": false, "hideDateRanges": false, "hideMarketStatus": false, "hideSymbolLogo": false, "scalePosition": "right", "scaleMode": "Normal", "fontFamily": "Courier New, monospace", "fontSize": "10", "noTimeScale": false, "valuesTracking": "1", "changeMode": "price-and-percent", "chartType": "area", "maLineColor": "#2962FF", "maLineWidth": 1, "maLength": 9, "fontColor": "rgba(255, 255, 255, 1)", "gridLineColor": "rgba(42, 46, 57, 0.07)", "backgroundColor": "rgba(255, 255, 255, 0)", "widgetFontColor": "rgba(255, 255, 255, 1)", "lineWidth": 2, "lineType": 0, "dateRanges": ["1d|1", "1m|30", "3m|60", "12m|1D", "60m|1W", "all|1M"]
        })
        document.getElementById('overview-container')?.appendChild(script)
      } else if (s.id === 'tv-market') {
        script.innerHTML = JSON.stringify({
          "colorTheme": "dark", "dateRange": "12M", "showChart": false, "locale": "en", "width": "100%", "height": "100%", "largeChartUrl": "", "isTransparent": true, "showSymbolLogo": true, "showFloatingTooltip": false, "tabs": [{ "title": "Crypto", "symbols": [{ "s": "CRYPTOCAP:SOL" }, { "s": "BITSTAMP:BTCUSD" }, { "s": "CRYPTOCAP:MATIC" }, { "s": "CRYPTOCAP:USDT" }, { "s": "BINANCE:ETCUSDT" }] }]
        })
        document.getElementById('market-container')?.appendChild(script)
      } else {
        document.body.appendChild(script)
      }
    })

    return () => {
      scripts.forEach(s => {
        const script = document.querySelector(`script[src="${s.src}"]`)
        if (script) script.remove()
      })
    }
  }, [])
}

export default useTradingView
