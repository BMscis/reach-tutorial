// Import reach stdlib
import { loadStdlib } from '@reach-sh/stdlib';

// Import contract backend
import * as backend from './build/index.main.mjs';

// Load stdlib
const stdlib = loadStdlib();

//++Add generate starting balance
const startingBalance = stdlib.parseCurrency(100);

//++Add create test account
const accCreator = await stdlib.newTestAccount(startingBalance);