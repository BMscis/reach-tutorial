import { bidderInfo } from '../Stores/Wallet/PrincipalStore';
import { Bidder } from './pt';

export const bidNFT = async (deployContract,nftID) => {
    const bidder = new Bidder();
    const contract = await bidder.latch(deployContract,nftID);
    bidderInfo.set(bidder)
    return [false,bidder]
}
