import "./App.css";
import logo from "./assets/images/logo.svg";
import { CurrencyConversion } from "./components/CurrencyConversion";

function App() {
  return (
    <>
      <div className="app-container">
        <section className="nav-bar">
          <img src={logo} alt="FX Checker" />
          <div className="right-actions">
            <li>55 CURRENCIES</li>
            <li>EOD</li>
            <li>ECB DATA</li>
          </div>
        </section>
        <section className="nav-bottom">
          <div className="live-market">&middot; LIVE MARKETS</div>
          <div className="live-data"></div>
        </section>

        <section className="main-container">
          <div>CHECK THE RATE</div>
          <CurrencyConversion />
        </section>
      </div>
    </>
  );
}

export default App;
