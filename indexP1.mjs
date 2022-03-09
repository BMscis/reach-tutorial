import {loadStdlib} from "@reach-sh/stdlib" //import reach stdlib
import * as backend from "./build/index.main.mjs"//import backend produced by compiler
const stdlib = loadStdlib();//loads stdlib dynamically based on the REACH_CONNECTOR_MODE

const startingBalance = stdlib.parseCurrency(100) //starting network tokens
const accAlice = await stdlib.newTestAccount(startingBalance) //test accounts - only for dev testing network
const accBob = await stdlib.newTestAccount(startingBalance) 


const fmt = (x) => stdlib.formatCurrency(x, 4);//display currency up to 4 decimals
const getBalance = async (who) => fmt(await stdlib.balanceOf(who));//get balance of a participant
const beforeAlice = await getBalance(accAlice);
const beforeBob = await getBalance(accBob);//get balance before game starts
const ctcAlice = accAlice.contract(backend) //Alice deploys the application
const ctcBob = accBob.contract(backend, ctcAlice.getInfo()) //Attach to alices' contract

const HAND = ['Rock', 'Paper', 'Scissors'];
const OUTCOME = ['Bob wins', 'Draw', 'Alice wins'];
const Player = (Who) => ({
  ...stdlib.hasRandom,
  getHand: async () => {
    const hand = Math.floor(Math.random() * 3);
    console.log(`${Who} played ${HAND[hand]}`);
    if (Math.random() <= 0.01 ){
      for (let i = 0; i <10; i++){
        console.log(` ${Who} takes their sweet time sending it back...`)
        await stdlib.wait(1);
      }
    }
    return hand;
  },
  seeOutcome: (outcome) => {
    console.log(`${Who} saw outcome ${OUTCOME[outcome]}`);
  },
  informTimeout: () => {
    console.log(`${Who} observed a timeout`);
  },
});
await Promise.all([
  ctcAlice.p.Alice({
    ...Player('Alice'),
    wager: stdlib.parseCurrency(5),
    deadline: 10,
  }),
  ctcBob.p.Bob({
    ...Player('Bob'),
    acceptWager: async (amt) => {
        console.log(`Bob accepts the wager of ${fmt(amt)}.`);
    },
  }),
]);

const afterAlice = await getBalance(accAlice);
const afterBob = await getBalance(accBob);

console.log(`Alice went from ${beforeAlice} to ${afterAlice}.`);
console.log(`Bob went from ${beforeBob} to ${afterBob}.`);