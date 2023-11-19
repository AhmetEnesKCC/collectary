import { BigNumber, ethers } from "ethers";

import CCIPData from "../../ccip.json";

class EthersService {
  private abi;
  private privateKey;
  private providerURL;
  private provider;
  private wallet;
  private contractAddress;

  constructor() {
    this.abi = CCIPData.output.abi;
    this.privateKey = import.meta.env.VITE_PUBLIC_PRIVATE_KEY;
    this.providerURL = import.meta.env.VITE_PUBLIC_RPC_URL;
    this.provider = new ethers.providers.JsonRpcProvider(this.providerURL);
    this.wallet = new ethers.Wallet(this.privateKey, this.provider);
    this.contractAddress = import.meta.env.VITE_PUBLIC_CONTRACT_ADDRESS;
  }
  public createCCIPContract = async () => {
    if (!this.contractAddress) {
      const err = new Error("Pool contract is undefined");
      throw { err, statusCode: 500 };
    }
    console.log(this.contractAddress, this.abi, this.wallet);
    const ccipContract = new ethers.Contract(
      this.contractAddress,
      this.abi,
      this.wallet
    );
    console.log(ccipContract);
    return ccipContract;
  };

  public allowlistDestinationChain = async (
    destinationChainSelector: number,
    allowed: boolean,
    onError: () => void
  ) => {
    const poolContract = await this.createCCIPContract();

    try {
      const tx = await poolContract
        .connect(import.meta.env.VITE_PUBLIC_CONTRACT_OWNER_ADDRESS)
        .allowlistDestinationChain(destinationChainSelector, allowed);
      await tx.wait();
      return tx.hash;
    } catch (err) {
      if (err) {
        onError();
      }
      throw err;
    }
  };

  public transferTokensPayNative = async (
    destinationChainSelector: string,
    receiver: any,
    receiverAddres: string,
    token: string,
    amount: number,
    onError: () => void
  ) => {
    const ccipContract = await this.createCCIPContract();

    try {
      console.log(receiver, token, amount);
      const tx = await ccipContract
        .connect(receiver)
        .transferTokensPayNative(
          BigNumber.from(destinationChainSelector).toBigInt(),
          receiverAddres,
          token,
          amount
        );
      await tx.wait();
      return tx.hash;
    } catch (err) {
      if (err) {
        onError();
      }
      throw err;
    }
  };
}

export default EthersService;
