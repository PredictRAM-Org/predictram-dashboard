import { getLivePricefromTopStock } from "../../api/services/ScrapperService";
import { PaytmMoneyLivePrice } from "../../api/services/paytmMoneyService";
import { paytmMoney_access_token_key } from "./paytmMoneyLogin";

const secretToken = localStorage.getItem("secretToken");
const mobileNumber = localStorage.getItem("mobileNumber");
const paytmMoney_access_token = localStorage.getItem(
  paytmMoney_access_token_key
);

class LivePrice {
  constructor(setLoading, symbols, userRole) {
    this.setLoading = setLoading;
    this.symbols = symbols;
    this.userRole = userRole;
  }

  getPrice() {
    if (paytmMoney_access_token) {
      return this.getPriceFromPaytm();
    } else {
      return this.getPriceFromTopStock();
    }
  }
  async getPriceFromTopStock() {
    const { data } = await getLivePricefromTopStock(
      this.setLoading,
      { symbols: this.symbols },
      { mobileNumber, secretToken },
      this.userRole
    );

    return data?.map((d) => ({ ...d, currentPrice: d.Price })) || [];
  }
  async getPriceFromPaytm() {
    const data = await PaytmMoneyLivePrice(
      this.setLoading,
      paytmMoney_access_token,
      this.symbols
    );
    return (
      data?.livePrices?.map((d) => ({
        ...d,
        currentPrice: d.last_price,
      })) || []
    );
  }
}

export default LivePrice;
