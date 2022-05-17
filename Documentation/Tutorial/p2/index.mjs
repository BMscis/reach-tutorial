import { loadStdlib } from '@reach-sh/stdlib';
import * as backend from './build/index.main.mjs';

const stdlib = loadStdlib();
const startingBalance = stdlib.parseCurrency(100);
const accCreator = await stdlib.newTestAccount(startingBalance);
const ctcCreator = accCreator.contract(backend);

//++
const params = { 
    nftId:nftId,
    minBid:minBid,
    lenInBlocks:lenInBlocks,
 };

await ctcCreator.participants.Creator({
    // ++
    getSale: () => {
        return params;
    }
})