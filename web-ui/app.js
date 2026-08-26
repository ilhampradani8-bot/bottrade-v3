// BitTrade V3 Frontend Interactive Dashboard Controller

document.addEventListener('DOMContentLoaded', () => {
    console.log('BitTrade V3 Dashboard Client Initialized.');

    const botListContainer = document.getElementById('bot-list-container');
    const tradesTableBody = document.getElementById('trades-table-body');
    const btnRefresh = document.getElementById('btn-refresh');
    const btnRunBacktest = document.getElementById('btn-run-backtest');

    // Data Mock Dynamic Load
    const botsData = [
        { name: "Bot A - Market Regime (BTC)", regime: "Sideways BB", status: "Active", volatility: "0.042%", pnl: "+$320.50" },
        { name: "Bot B - Smart DCA (ETH/SOL)", regime: "Layer 1 Accumulation", status: "Active", volatility: "0.081%", pnl: "+$410.20" },
        { name: "Bot E - StatARB Engine (ETH/BTC)", regime: "Suspended (Fee Research)", status: "Idle", volatility: "0.015%", pnl: "$0.00" }
    ];

    const tradesData = [
        { time: "13:01:22", bot: "Bot A (Regime)", symbol: "BTCUSDT", side: "BUY", price: "$64,250.00", pnl: "+1.5% TP" },
        { time: "12:45:10", bot: "Bot B (SmartDCA)", symbol: "ETHUSDT", side: "BUY", price: "$2,750.00", pnl: "Open Layer 1" },
        { time: "11:30:00", bot: "Bot A (Regime)", symbol: "SOLUSDT", side: "SELL", price: "$145.20", pnl: "+$45.10 (+2.1%)" },
        { time: "10:15:44", bot: "Bot B (SmartDCA)", symbol: "BTCUSDT", side: "SELL", price: "$64,900.00", pnl: "+$180.00 (+1.8%)" }
    ];

    function renderBots() {
        botListContainer.innerHTML = '';
        botsData.forEach(bot => {
            const item = document.createElement('div');
            item.className = 'bot-item';
            item.innerHTML = `
                <div class="bot-info">
                    <h4>${bot.name}</h4>
                    <p>Mode: <strong>${bot.regime}</strong> | Vol: ${bot.volatility}</p>
                </div>
                <div class="bot-status">
                    <span class="badge ${bot.status === 'Active' ? 'side-buy' : ''}">${bot.status}</span>
                </div>
            `;
            botListContainer.appendChild(item);
        });
    }

    function renderTrades() {
        tradesTableBody.innerHTML = '';
        tradesData.forEach(trade => {
            const row = document.createElement('tr');
            const sideClass = trade.side === 'BUY' ? 'side-buy' : 'side-sell';
            row.innerHTML = `
                <td>${trade.time}</td>
                <td>${trade.bot}</td>
                <td><strong>${trade.symbol}</strong></td>
                <td class="${sideClass}">${trade.side}</td>
                <td>${trade.price}</td>
                <td>${trade.pnl}</td>
            `;
            tradesTableBody.appendChild(row);
        });
    }

    renderBots();
    renderTrades();

    btnRefresh.addEventListener('click', () => {
        btnRefresh.innerText = '🔄 Syncing...';
        setTimeout(() => {
            renderBots();
            renderTrades();
            btnRefresh.innerText = '🔄 Refresh Data';
        }, 500);
    });

    btnRunBacktest.addEventListener('click', () => {
        alert('Memulai simulasi backtest BitTrade V3 di background Rust Engine...');
    });
});
