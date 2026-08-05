const fs = require('fs');

let content = fs.readFileSync('work/index.html', 'utf8');

// Add modal-trigger class and href to Fixed Income
content = content.replace(
  /<a href=\"#\" class=\"card-wrp w-inline-block\">\s*<div class=\"t-text1 _50year\">2025<\/div>\s*<div class=\"t-desc fullname\"><strong>Fixed Income and Credit Risk Decision Engine<\/strong>/g,
  '<a href=\"#modal-fixed-income\" class=\"card-wrp w-inline-block modal-trigger\">\n<div class=\"t-text1 _50year\">2026<\/div>\n<div class=\"t-desc fullname\"><strong>Fixed Income and Credit Risk Decision Engine</strong>'
);

// Add modal-trigger class and href to Portfolio Optimizer
content = content.replace(
  /<a href=\"#\" class=\"card-wrp w-inline-block\">\s*<div class=\"t-text1 _50year\">2025<\/div>\s*<div class=\"t-desc fullname\"><strong>Quantitative Portfolio Optimization Engine<\/strong>/g,
  '<a href=\"#modal-portfolio-optimizer\" class=\"card-wrp w-inline-block modal-trigger\">\n<div class=\"t-text1 _50year\">2025<\/div>\n<div class=\"t-desc fullname\"><strong>Quantitative Portfolio Optimization Engine</strong>'
);

// We need to create the HTML for the two modals and insert them before the scripts.
const fixedIncomeModal = `
<div id="modal-fixed-income" class="popup__wrapper">
<div class="popup__layout">
<div class="t-h2"><strong>Project</strong></div>
<div class="divider popup"></div>
<div class="popup__title-wrp">
<div class="t-h3 popup__title extractivism">Fixed Income and Credit Risk Decision Engine</div>
<div class="t-h3 popup-close">x</div>
</div>
<div class="divider popup"></div>
<div class="popup__content">
<div class="popup__content up">
<div class="t-text2 popup"><strong>What the Agent Does</strong><br>This quantitative decision engine dynamically manages a synthetic fixed income portfolio (Investment Grade and High Yield corporate bonds) by predicting and reacting to different types of macroeconomic stress.</div>
<div class="popup__options">
<div class="divider popup"></div>
<div class="popup__options-item"><div class="t-capt2">Year</div><div class="t-capt2 popup__options-right">2026</div></div>
<div class="divider popup"></div>
<div class="popup__options-item"><div class="t-capt2">Type</div><div class="t-capt2 popup__options-right">Personal Project</div></div>
<div class="divider popup"></div>
</div>
</div>
<div class="t-text2 popup-full">
<strong>What the Agent Does</strong><br>
This quantitative decision engine dynamically manages a synthetic fixed income portfolio (Investment Grade and High Yield corporate bonds) by predicting and reacting to different types of macroeconomic stress. Unlike traditional static portfolios, the engine decomposes market risk into orthogonal rate-driven and credit-driven components. It continuously monitors Nelson-Siegel yield curve dynamics, spread velocity/acceleration, and macroeconomic indicators to classify the market regime using a Hidden Markov Model (HMM). Based on the prevailing regime and the causal drivers of stress, the engine autonomously executes risk mitigation strategies—such as reducing credit exposure, hedging duration, or shifting to a full defensive cash posture—to protect portfolio carry and minimize drawdowns.<br><br>
<strong>Cross-Window Results Table</strong><br>
<table border="1" cellpadding="5" style="border-collapse: collapse; width: 100%; border: 1px solid #ccc;">
<tr><th>Metric</th><th>Window 1 (Taper Tantrum)</th><th>Window 2 (Fed Rate Hikes)</th><th>Window 3 (SVB Collapse)</th></tr>
<tr><td>Event</td><td>Taper Tantrum</td><td>Aggressive Fed Rate Hike Cycle</td><td>SVB Collapse</td></tr>
<tr><td>Stress Type</td><td>rate-driven</td><td>compound</td><td>credit-driven</td></tr>
<tr><td>Engine Sharpe</td><td>0.111</td><td>-2.949</td><td>1.804</td></tr>
<tr><td>B&H Sharpe</td><td>0.031</td><td>-3.526</td><td>1.648</td></tr>
<tr><td>Engine Max Drawdown</td><td>-2.6%</td><td>-6.6%</td><td>-4.8%</td></tr>
<tr><td>B&H Max Drawdown</td><td>-3.0%</td><td>-9.2%</td><td>-5.1%</td></tr>
<tr><td>Rate Layer Value (bps)</td><td>-0.371</td><td>+0.554</td><td>0.000</td></tr>
<tr><td>PD Model AUC</td><td>0.692</td><td>0.692</td><td>0.692</td></tr>
</table><br>
<strong>Key Findings</strong><br>
<strong>Granger Causality Pattern:</strong> We uncovered a distinct causal relationship between Treasury yields and credit spreads depending on the market regime. In rate-driven and compound stress environments (Windows 1 & 2), Treasury yield volatility Granger-causes credit spread widening. However, during isolated credit events like the SVB collapse (Window 3), this causal link breaks down, proving that credit stress can manifest entirely independently of rate volatility.<br>
<strong>Rate Layer Value by Window:</strong> The engine's orthogonal rate hedging layer proved its worth during the 2022 Fed rate hike cycle (Window 2), generating positive excess value (+0.554 bps) by successfully dampening duration risk. Conversely, during the pure credit shock of SVB (Window 3), the rate layer correctly remained dormant (0.000 bps), preserving capital that would have otherwise been wasted on unnecessary hedges.<br>
<strong>Stress Type Differentiation:</strong> The engine successfully differentiates between elevated spread levels and spread acceleration. By requiring active spread acceleration for the REDUCE_CREDIT action, the engine avoided false positives during post-shock compression regimes (e.g., early 2023), allowing it to harvest yield while still reacting instantly to the mid-March SVB contagion.<br><br>
<strong>Walk-Forward Methodology</strong><br>
The backtesting framework employs a strict, out-of-sample walk-forward methodology to prevent data leakage and look-ahead bias:<br>
- <strong>Dynamic Calibration:</strong> For each test window, the models (HMM, ARIMA, PD/LGD) and the engine's internal thresholds (e.g., 90th/95th percentiles for risk scores) are calibrated strictly on a trailing window of historical data ending immediately before the test period begins.<br>
- <strong>Sequential Testing:</strong> The engine steps through the test period day-by-day. At day T, it only has access to data and thresholds computed up to day T-1.<br>
- <strong>No Future Knowledge:</strong> Rolling z-scores, expanding percentiles, and spread velocities are all computed purely on past data, simulating real-time trading conditions.<br><br>
<strong>Known Limitations</strong><br>
<strong>Cross-Sectional PD Model:</strong> The Probability of Default (PD) model uses static cross-sectional Freddie Mac data rather than true time-series corporate bond defaults, meaning its predictive power is structurally limited in a dynamic daily backtest.<br>
<strong>Omicron False Positive:</strong> Brief, intense market panics (like the Omicron variant flash crash) can trigger the engine's defensive mechanisms. While we introduced a 3-day persistence filter to mitigate this, extreme short-term volatility can still cause the engine to unnecessarily sacrifice carry.<br>
<strong>Synthetic Portfolio:</strong> The portfolio is constructed synthetically using index-level aggregates (IG/HY spreads and Treasury yields) rather than holding discrete CUSIPs, which ignores idiosyncratic issuer risk, transaction costs, and bid-ask friction.
</div>
<div class="footer-pc popup"><div class="footer__right"><a href="/work" class="t-capt1 footer-link"><span>Documents</span></a><a href="#" class="t-capt1 footer-link">Aritra Majumdar © 2026</a></div></div>
<div class="footer-adaptive"><div class="footer__left"><div class="t-capt1">github</div><div class="t-capt1">linkedin</div><div class="t-capt1">aritramajumdar2005@gmail.com</div></div><div class="footer__divider popup"></div><div class="footer__right"><div class="t-capt1">Documents</div><div class="t-capt1">Aritra Majumdar © 2026</div></div></div>
</div></div></div>`;

const portfolioModal = `
<div id="modal-portfolio-optimizer" class="popup__wrapper">
<div class="popup__layout">
<div class="t-h2"><strong>Project</strong></div>
<div class="divider popup"></div>
<div class="popup__title-wrp">
<div class="t-h3 popup__title extractivism">Portfolio Optimizer</div>
<div class="t-h3 popup-close">x</div>
</div>
<div class="divider popup"></div>
<div class="popup__content">
<div class="popup__content up">
<div class="t-text2 popup">A production-grade Python pipeline for portfolio optimization, backtesting, and performance analysis. This tool evaluates 5 different portfolio allocation methods across 12 years of real market data, computing 14 performance metrics and generating publication-quality visualizations.</div>
<div class="popup__options">
<div class="divider popup"></div>
<div class="popup__options-item"><div class="t-capt2">Year</div><div class="t-capt2 popup__options-right">2025</div></div>
<div class="divider popup"></div>
<div class="popup__options-item"><div class="t-capt2">Type</div><div class="t-capt2 popup__options-right">Personal Project</div></div>
<div class="divider popup"></div>
</div>
</div>
<div class="t-text2 popup-full">
A production-grade Python pipeline for portfolio optimization, backtesting, and performance analysis. This tool evaluates 5 different portfolio allocation methods across 12 years of real market data, computing 14 performance metrics and generating publication-quality visualizations.<br><br>
<strong>🏗 Architecture</strong><br>
The project is structured into modular components orchestrated by the PortfolioOptimizer class:<br><br>
- <strong>DataPipeline:</strong> Fetches and preprocesses 12 years of daily data for 30 S&P 500 stocks (via yfinance).<br>
- <strong>Backtester:</strong> Conducts robust walk-forward backtesting for the different allocation methods to prevent look-ahead bias.<br>
- <strong>Allocation Methods:</strong><br>
&nbsp;&nbsp;&nbsp;&nbsp;- <strong>Markowitz (Mean-Variance):</strong> Traditional optimization targeting maximum Sharpe ratio.<br>
&nbsp;&nbsp;&nbsp;&nbsp;- <strong>Risk Parity:</strong> Equalizes risk contribution across all assets.<br>
&nbsp;&nbsp;&nbsp;&nbsp;- <strong>Kelly Criterion:</strong> Growth-optimal portfolio sizing.<br>
&nbsp;&nbsp;&nbsp;&nbsp;- <strong>Black-Litterman:</strong> Combines market equilibrium with custom views.<br>
&nbsp;&nbsp;&nbsp;&nbsp;- <strong>HRP (Hierarchical Risk Parity):</strong> Uses graph theory and machine learning to allocate risk.<br>
- <strong>Metrics:</strong> Computes 14 comprehensive performance metrics including Sharpe, Sortino, Calmar ratios, VaR, CVaR, and Maximum Drawdown.<br>
- <strong>RegimeAnalyzer:</strong> Analyzes portfolio performance across different market regimes and stress periods.<br>
- <strong>Visualizations:</strong> Generates 8 distinct charts (e.g., cumulative returns, drawdowns, rolling Sharpe) saved in the plots/ directory.<br><br>
<strong>📊 Key Results</strong><br>
Based on a walk-forward backtest (Initial Capital: $100,000, Benchmark: SPY), the models performed as follows:<br><br>
<table border="1" cellpadding="5" style="border-collapse: collapse; width: 100%; border: 1px solid #ccc;">
<tr><th>Method</th><th>Ann. Return</th><th>Ann. Volatility</th><th>Sharpe Ratio</th><th>Max Drawdown</th><th>Final Value ($)</th></tr>
<tr><td>Black-Litterman</td><td>20.17%</td><td>21.40%</td><td>0.732</td><td>-39.42%</td><td>$746,261</td></tr>
<tr><td>Markowitz</td><td>16.75%</td><td>17.28%</td><td>0.709</td><td>-31.42%</td><td>$540,151</td></tr>
<tr><td>Kelly Criterion</td><td>14.55%</td><td>17.44%</td><td>0.576</td><td>-32.93%</td><td>$438,914</td></tr>
<tr><td>Risk Parity</td><td>12.60%</td><td>15.78%</td><td>0.513</td><td>-36.04%</td><td>$367,337</td></tr>
<tr><td>HRP</td><td>11.73%</td><td>15.07%</td><td>0.480</td><td>-34.25%</td><td>$336,358</td></tr>
<tr><td>SPY (Benchmark)</td><td>13.20%</td><td>17.19%</td><td>0.506</td><td>-35.74%</td><td>$390,232</td></tr>
</table><br>
<strong>Highlights:</strong><br>
🏆 <strong>Best Risk-Adjusted Performance:</strong> Black-Litterman achieved the highest Sharpe Ratio (0.732) and overall highest annualized return (20.17%).<br>
🛡️ <strong>Lowest Volatility:</strong> HRP (Hierarchical Risk Parity) demonstrated the lowest annualized volatility (15.07%), prioritizing stability.<br>
📉 <strong>Lowest Drawdown:</strong> Markowitz experienced the shallowest maximum drawdown (-31.42%) compared to the benchmark and other methods.
</div>
<div class="footer-pc popup"><div class="footer__right"><a href="/work" class="t-capt1 footer-link"><span>Documents</span></a><a href="#" class="t-capt1 footer-link">Aritra Majumdar © 2026</a></div></div>
<div class="footer-adaptive"><div class="footer__left"><div class="t-capt1">github</div><div class="t-capt1">linkedin</div><div class="t-capt1">aritramajumdar2005@gmail.com</div></div><div class="footer__divider popup"></div><div class="footer__right"><div class="t-capt1">Documents</div><div class="t-capt1">Aritra Majumdar © 2026</div></div></div>
</div></div></div>`;

content = content.replace('</div><script src=\"/js/jquery-3.5.1.min.dc5e7f18c8.js\"', fixedIncomeModal + '\n' + portfolioModal + '\n</div><script src=\"/js/jquery-3.5.1.min.dc5e7f18c8.js\"');

fs.writeFileSync('work/index.html', content);

let aboutContent = fs.readFileSync('about/index.html', 'utf8');
aboutContent = aboutContent.replace('CGPA: 7.125', 'CGPA: 7.34');
aboutContent = aboutContent.replace('Current Sem (4th)', 'Current Sem (5th)');
aboutContent = aboutContent.replace('processing over 100 aggregate years of financial tick data', 'processing over 12 aggregate years of financial tick data (3 instruments x 4 years)');
fs.writeFileSync('about/index.html', aboutContent);

console.log('Script done');
