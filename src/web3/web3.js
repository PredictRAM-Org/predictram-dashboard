import portfolioabi from "./portfolio.json";
import tokenabi from "./token.json";

import { ethers } from "ethers";
let contract;
export const ContractProvider = async (contractaddress, sign) => {
  console.log(sign);
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  contract = new ethers.Contract(contractaddress, portfolioabi, signer);
  console.log("contract initialized");
  console.log("value", sign[3] / 100);
  const n = await contract.buyPortfolioBuyer(sign, {
    value: ethers.utils.parseEther((sign[3] / 100).toString()),
  });
  await n.wait();
  console.log("CreatePorfolio", n);
};
export const getBalanceOfUser = async (contractaddress, owner) => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    contract = new ethers.Contract(contractaddress, tokenabi, signer);
    console.log("contract initialized");
    const n = await contract.balanceOf(owner);
    console.log("balanceOf", parseInt(n) / 1000000000000000000);
    return parseInt(n) / 1000000000000000000;
  } catch (e) {
    console.log(e.message);
  }
};
