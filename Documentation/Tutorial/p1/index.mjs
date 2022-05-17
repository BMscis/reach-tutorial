import { loadStdlib } from '@reach-sh/stdlib';
import * as backend from './build/index.main.mjs';

const stdlib = loadStdlib();
const startingBalance = stdlib.parseCurrency(100);
const accCreator = await stdlib.newTestAccount(startingBalance);
const ctcCreator = accCreator.contract(backend);

await ctcCreator.participants.Creator({
    // Specify Creator interact interface here
})