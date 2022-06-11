// Automatically generated with Reach 0.1.10 (4e760833)
/* eslint-disable */
export const _version = '0.1.10';
export const _versionHash = '0.1.10 (4e760833)';
export const _backendVersion = 15;

export function getExports(s) {
  const stdlib = s.reachStdlib;
  return {
    };
  };
export function _getEvents(s) {
  const stdlib = s.reachStdlib;
  const ctc0 = stdlib.T_Bytes(stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '11'));
  const ctc1 = stdlib.T_UInt;
  const ctc2 = stdlib.T_Bytes(stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '13'));
  const ctc3 = stdlib.T_Bytes(stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '8'));
  const ctc4 = stdlib.T_Bytes(stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '7'));
  const ctc5 = stdlib.T_Address;
  return {
    auctionTime: [ctc0, ctc1],
    contractState: [ctc2, ctc3],
    showBid: [ctc4, ctc5, ctc1],
    showOutcome: [ctc0, ctc5, ctc1],
    timesUp: [ctc4]
    };
  };
export function _getViews(s, viewlib) {
  const stdlib = s.reachStdlib;
  const ctc0 = stdlib.T_Address;
  const ctc1 = stdlib.T_Token;
  const ctc2 = stdlib.T_UInt;
  const ctc3 = stdlib.T_Bytes(stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '13'));
  const ctc4 = stdlib.T_Bool;
  
  return {
    infos: {
      },
    views: {
      1: [ctc0, ctc1, ctc2, ctc2, ctc2, ctc3],
      5: [ctc0, ctc1, ctc2, ctc0, ctc4, ctc2, ctc2]
      }
    };
  
  };
export function _getMaps(s) {
  const stdlib = s.reachStdlib;
  const ctc0 = stdlib.T_Tuple([]);
  return {
    mapDataTy: ctc0
    };
  };
export async function Auctioneer(ctcTop, interact) {
  if (typeof(ctcTop) !== 'object' || ctcTop._initialize === undefined) {
    return Promise.reject(new Error(`The backend for Auctioneer expects to receive a contract as its first argument.`));}
  if (typeof(interact) !== 'object') {
    return Promise.reject(new Error(`The backend for Auctioneer expects to receive an interact object as its second argument.`));}
  const ctc = ctcTop._initialize();
  const stdlib = ctc.stdlib;
  const ctc0 = stdlib.T_Null;
  const ctc1 = stdlib.T_UInt;
  const ctc2 = stdlib.T_Token;
  const ctc3 = stdlib.T_Object({
    lenInBlocks: ctc1,
    minBid: ctc1,
    nftId: ctc2
    });
  const ctc4 = stdlib.T_Tuple([ctc1]);
  const ctc5 = stdlib.T_Address;
  const ctc6 = stdlib.T_Tuple([ctc1, ctc5, ctc1]);
  const ctc7 = stdlib.T_Bool;
  const ctc8 = stdlib.T_Bytes(stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '13'));
  
  
  stdlib.protect(ctc0, await interact.log(stdlib.checkedBigNumberify('./index.rsh:26:29:decimal', stdlib.UInt_max, '1')), {
    at: './index.rsh:26:28:application',
    fs: ['at ./index.rsh:26:28:application call to [unknown function] (defined at: ./index.rsh:26:28:function exp)', 'at ./index.rsh:26:28:application call to "liftedInteract" (defined at: ./index.rsh:26:28:application)'],
    msg: 'log',
    who: 'Auctioneer'
    });
  
  const v220 = stdlib.protect(ctc3, await interact.getSale(), {
    at: './index.rsh:29:73:application',
    fs: ['at ./index.rsh:28:20:application call to [unknown function] (defined at: ./index.rsh:28:24:function exp)'],
    msg: 'getSale',
    who: 'Auctioneer'
    });
  const v221 = v220.lenInBlocks;
  const v222 = v220.minBid;
  const v223 = v220.nftId;
  
  const txn1 = await (ctc.sendrecv({
    args: [v223, v222, v221],
    evt_cnt: 3,
    funcNum: 0,
    lct: stdlib.checkedBigNumberify('./index.rsh:32:16:dot', stdlib.UInt_max, '0'),
    onlyIf: true,
    out_tys: [ctc2, ctc1, ctc1],
    pay: [stdlib.checkedBigNumberify('./index.rsh:32:16:decimal', stdlib.UInt_max, '0'), []],
    sim_p: (async (txn1) => {
      const sim_r = { txns: [], mapRefs: [], maps: [] };
      let sim_txn_ctr = stdlib.UInt_max;
      const getSimTokCtr = () => { sim_txn_ctr = sim_txn_ctr.sub(1); return sim_txn_ctr; };
      
      
      const {data: [v228, v229, v230], secs: v232, time: v231, didSend: v39, from: v227 } = txn1;
      
      sim_r.txns.push({
        amt: stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '0'),
        kind: 'init',
        tok: v228
        });
      ;
      const v240 = 'contractState';
      const v241 = 'NFTpubli';
      null;
      sim_r.isHalt = false;
      
      return sim_r;
      }),
    soloSend: true,
    timeoutAt: undefined /* mto */,
    tys: [ctc2, ctc1, ctc1],
    waitIfNotPresent: false
    }));
  const {data: [v228, v229, v230], secs: v232, time: v231, didSend: v39, from: v227 } = txn1;
  ;
  ;
  const v240 = 'contractState';
  const v241 = 'NFTpubli';
  null;
  stdlib.protect(ctc0, await interact.log(stdlib.checkedBigNumberify('./index.rsh:42:29:decimal', stdlib.UInt_max, '2')), {
    at: './index.rsh:42:28:application',
    fs: ['at ./index.rsh:42:28:application call to [unknown function] (defined at: ./index.rsh:42:28:function exp)', 'at ./index.rsh:42:28:application call to "liftedInteract" (defined at: ./index.rsh:42:28:application)'],
    msg: 'log',
    who: 'Auctioneer'
    });
  
  const txn2 = await (ctc.sendrecv({
    args: [v227, v228, v229, v230, v231, v240],
    evt_cnt: 0,
    funcNum: 1,
    lct: v231,
    onlyIf: true,
    out_tys: [],
    pay: [stdlib.checkedBigNumberify('./index.rsh:44:16:dot', stdlib.UInt_max, '0'), [[stdlib.checkedBigNumberify('./index.rsh:37:17:decimal', stdlib.UInt_max, '1'), v228]]],
    sim_p: (async (txn2) => {
      const sim_r = { txns: [], mapRefs: [], maps: [] };
      let sim_txn_ctr = stdlib.UInt_max;
      const getSimTokCtr = () => { sim_txn_ctr = sim_txn_ctr.sub(1); return sim_txn_ctr; };
      
      
      const {data: [], secs: v245, time: v244, didSend: v52, from: v243 } = txn2;
      
      ;
      sim_r.txns.push({
        amt: stdlib.checkedBigNumberify('./index.rsh:37:17:decimal', stdlib.UInt_max, '1'),
        kind: 'to',
        tok: v228
        });
      const v257 = 'Checkbal';
      null;
      const v262 = stdlib.add(v231, v230);
      const v264 = 'auctionR';
      null;
      const v265 = v227;
      const v266 = true;
      const v267 = v229;
      const v268 = v244;
      const v269 = v231;
      
      if (await (async () => {
        const v284 = stdlib.le(v269, v262);
        
        return v284;})()) {
        sim_r.isHalt = false;
        }
      else {
        sim_r.txns.push({
          kind: 'from',
          to: v265,
          tok: v228
          });
        const v351 = 'timesUp';
        null;
        if (v266) {
          const v364 = 'showOutcome';
          null;
          
          sim_r.txns.push({
            kind: 'halt',
            tok: v228
            })
          sim_r.txns.push({
            kind: 'halt',
            tok: undefined /* Nothing */
            })
          sim_r.isHalt = true;
          }
        else {
          sim_r.txns.push({
            kind: 'from',
            to: v227,
            tok: undefined /* Nothing */
            });
          const v357 = 'showOutcome';
          null;
          
          sim_r.txns.push({
            kind: 'halt',
            tok: v228
            })
          sim_r.txns.push({
            kind: 'halt',
            tok: undefined /* Nothing */
            })
          sim_r.isHalt = true;
          }}
      return sim_r;
      }),
    soloSend: true,
    timeoutAt: undefined /* mto */,
    tys: [ctc5, ctc2, ctc1, ctc1, ctc1, ctc8],
    waitIfNotPresent: false
    }));
  const {data: [], secs: v245, time: v244, didSend: v52, from: v243 } = txn2;
  ;
  ;
  const v255 = stdlib.addressEq(v227, v243);
  stdlib.assert(v255, {
    at: './index.rsh:44:16:dot',
    fs: [],
    msg: 'sender correct',
    who: 'Auctioneer'
    });
  const v257 = 'Checkbal';
  null;
  const v262 = stdlib.add(v231, v230);
  const v264 = 'auctionR';
  null;
  let v265 = v227;
  let v266 = true;
  let v267 = v229;
  let v268 = v244;
  let v269 = v231;
  
  while (await (async () => {
    const v284 = stdlib.le(v269, v262);
    
    return v284;})()) {
    const txn3 = await (ctc.recv({
      didSend: false,
      evt_cnt: 1,
      funcNum: 3,
      out_tys: [ctc4],
      timeoutAt: ['time', v262],
      waitIfNotPresent: false
      }));
    if (txn3.didTimeout) {
      const txn4 = await (ctc.sendrecv({
        args: [v227, v228, v262, v265, v266, v267, v268],
        evt_cnt: 0,
        funcNum: 4,
        lct: v268,
        onlyIf: true,
        out_tys: [],
        pay: [stdlib.checkedBigNumberify('./index.rsh:80:22:decimal', stdlib.UInt_max, '0'), []],
        sim_p: (async (txn4) => {
          const sim_r = { txns: [], mapRefs: [], maps: [] };
          let sim_txn_ctr = stdlib.UInt_max;
          const getSimTokCtr = () => { sim_txn_ctr = sim_txn_ctr.sub(1); return sim_txn_ctr; };
          
          
          const {data: [], secs: v335, time: v334, didSend: v152, from: v333 } = txn4;
          
          ;
          const cv265 = v265;
          const cv266 = v266;
          const cv267 = v267;
          const cv268 = v334;
          const cv269 = v268;
          
          await (async () => {
            const v265 = cv265;
            const v266 = cv266;
            const v267 = cv267;
            const v268 = cv268;
            const v269 = cv269;
            
            if (await (async () => {
              const v284 = stdlib.le(v269, v262);
              
              return v284;})()) {
              sim_r.isHalt = false;
              }
            else {
              sim_r.txns.push({
                kind: 'from',
                to: v265,
                tok: v228
                });
              const v351 = 'timesUp';
              null;
              if (v266) {
                const v364 = 'showOutcome';
                null;
                
                sim_r.txns.push({
                  kind: 'halt',
                  tok: v228
                  })
                sim_r.txns.push({
                  kind: 'halt',
                  tok: undefined /* Nothing */
                  })
                sim_r.isHalt = true;
                }
              else {
                sim_r.txns.push({
                  kind: 'from',
                  to: v227,
                  tok: undefined /* Nothing */
                  });
                const v357 = 'showOutcome';
                null;
                
                sim_r.txns.push({
                  kind: 'halt',
                  tok: v228
                  })
                sim_r.txns.push({
                  kind: 'halt',
                  tok: undefined /* Nothing */
                  })
                sim_r.isHalt = true;
                }}})();
          return sim_r;
          }),
        soloSend: true,
        timeoutAt: undefined /* mto */,
        tys: [ctc5, ctc2, ctc1, ctc5, ctc7, ctc1, ctc1],
        waitIfNotPresent: false
        }));
      const {data: [], secs: v335, time: v334, didSend: v152, from: v333 } = txn4;
      ;
      const v336 = stdlib.addressEq(v227, v333);
      stdlib.assert(v336, {
        at: './index.rsh:80:22:dot',
        fs: ['at ./index.rsh:79:41:application call to [unknown function] (defined at: ./index.rsh:79:41:function exp)'],
        msg: 'sender correct',
        who: 'Auctioneer'
        });
      const cv265 = v265;
      const cv266 = v266;
      const cv267 = v267;
      const cv268 = v334;
      const cv269 = v268;
      
      v265 = cv265;
      v266 = cv266;
      v267 = cv267;
      v268 = cv268;
      v269 = cv269;
      
      continue;
      }
    else {
      const {data: [v299], secs: v301, time: v300, didSend: v111, from: v298 } = txn3;
      undefined /* setApiDetails */;
      const v303 = v299[stdlib.checkedBigNumberify('./index.rsh:64:13:spread', stdlib.UInt_max, '0')];
      ;
      const v307 = stdlib.gt(v303, v267);
      stdlib.assert(v307, {
        at: './index.rsh:68:24:application',
        fs: ['at ./index.rsh:67:13:application call to [unknown function] (defined at: ./index.rsh:67:13:function exp)'],
        msg: 'bid is too low',
        who: 'Auctioneer'
        });
      const v308 = [v303, v265, v267];
      await txn3.getOutput('Bidder_bid', 'v308', ctc6, v308);
      if (v266) {
        const v328 = 'showBid';
        null;
        const v330 = stdlib.sub(v262, v300);
        const v331 = 'auctionTime';
        null;
        const cv265 = v298;
        const cv266 = false;
        const cv267 = v303;
        const cv268 = v300;
        const cv269 = v268;
        
        v265 = cv265;
        v266 = cv266;
        v267 = cv267;
        v268 = cv268;
        v269 = cv269;
        
        continue;}
      else {
        ;
        const v323 = 'showBid';
        null;
        const v325 = stdlib.sub(v262, v300);
        const v326 = 'auctionTime';
        null;
        const cv265 = v298;
        const cv266 = false;
        const cv267 = v303;
        const cv268 = v300;
        const cv269 = v268;
        
        v265 = cv265;
        v266 = cv266;
        v267 = cv267;
        v268 = cv268;
        v269 = cv269;
        
        continue;}}
    
    }
  ;
  const v351 = 'timesUp';
  null;
  if (v266) {
    const v364 = 'showOutcome';
    null;
    stdlib.protect(ctc0, await interact.setNewOwner(v265, v267), {
      at: './index.rsh:92:40:application',
      fs: ['at ./index.rsh:92:40:application call to [unknown function] (defined at: ./index.rsh:92:40:function exp)', 'at ./index.rsh:92:40:application call to "liftedInteract" (defined at: ./index.rsh:92:40:application)'],
      msg: 'setNewOwner',
      who: 'Auctioneer'
      });
    
    return;
    }
  else {
    ;
    const v357 = 'showOutcome';
    null;
    stdlib.protect(ctc0, await interact.setNewOwner(v265, v267), {
      at: './index.rsh:92:40:application',
      fs: ['at ./index.rsh:92:40:application call to [unknown function] (defined at: ./index.rsh:92:40:function exp)', 'at ./index.rsh:92:40:application call to "liftedInteract" (defined at: ./index.rsh:92:40:application)'],
      msg: 'setNewOwner',
      who: 'Auctioneer'
      });
    
    return;
    }
  
  
  
  };
export async function _Bidder_bid5(ctcTop, interact) {
  if (typeof(ctcTop) !== 'object' || ctcTop._initialize === undefined) {
    return Promise.reject(new Error(`The backend for _Bidder_bid5 expects to receive a contract as its first argument.`));}
  if (typeof(interact) !== 'object') {
    return Promise.reject(new Error(`The backend for _Bidder_bid5 expects to receive an interact object as its second argument.`));}
  const ctc = ctcTop._initialize();
  const stdlib = ctc.stdlib;
  const ctc0 = stdlib.T_Address;
  const ctc1 = stdlib.T_Token;
  const ctc2 = stdlib.T_UInt;
  const ctc3 = stdlib.T_Bool;
  const ctc4 = stdlib.T_Tuple([ctc2]);
  const ctc5 = stdlib.T_Tuple([ctc2, ctc0, ctc2]);
  const ctc6 = stdlib.T_Null;
  
  
  const [v227, v228, v262, v265, v266, v267, v268] = await ctc.getState(stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '5'), [ctc0, ctc1, ctc2, ctc0, ctc3, ctc2, ctc2]);
  const v291 = stdlib.protect(ctc4, await interact.in(), {
    at: './index.rsh:1:23:application',
    fs: ['at ./index.rsh:65:13:application call to [unknown function] (defined at: ./index.rsh:65:13:function exp)', 'at ./index.rsh:65:13:application call to [unknown function] (defined at: ./index.rsh:65:13:function exp)'],
    msg: 'in',
    who: 'Bidder_bid'
    });
  const v292 = v291[stdlib.checkedBigNumberify('./index.rsh:1:23:application', stdlib.UInt_max, '0')];
  const v295 = stdlib.gt(v292, v267);
  stdlib.assert(v295, {
    at: './index.rsh:65:31:application',
    fs: ['at ./index.rsh:65:13:application call to [unknown function] (defined at: ./index.rsh:65:20:function exp)', 'at ./index.rsh:65:13:application call to [unknown function] (defined at: ./index.rsh:65:13:function exp)', 'at ./index.rsh:65:13:application call to [unknown function] (defined at: ./index.rsh:65:13:function exp)'],
    msg: 'bid is too low',
    who: 'Bidder_bid'
    });
  
  const txn1 = await (ctc.sendrecv({
    args: [v227, v228, v262, v265, v266, v267, v268, v291],
    evt_cnt: 1,
    funcNum: 3,
    lct: stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '0'),
    onlyIf: true,
    out_tys: [ctc4],
    pay: [v292, []],
    sim_p: (async (txn1) => {
      const sim_r = { txns: [], mapRefs: [], maps: [] };
      let sim_txn_ctr = stdlib.UInt_max;
      const getSimTokCtr = () => { sim_txn_ctr = sim_txn_ctr.sub(1); return sim_txn_ctr; };
      
      
      const {data: [v299], secs: v301, time: v300, didSend: v111, from: v298 } = txn1;
      
      sim_r.txns.push({
        kind: 'api',
        who: "Bidder_bid"
        });
      const v303 = v299[stdlib.checkedBigNumberify('./index.rsh:64:13:spread', stdlib.UInt_max, '0')];
      sim_r.txns.push({
        amt: v303,
        kind: 'to',
        tok: undefined /* Nothing */
        });
      const v308 = [v303, v265, v267];
      const v309 = await txn1.getOutput('Bidder_bid', 'v308', ctc5, v308);
      
      if (v266) {
        const v328 = 'showBid';
        null;
        const v330 = stdlib.sub(v262, v300);
        const v331 = 'auctionTime';
        null;
        const v517 = v298;
        const v518 = false;
        const v519 = v303;
        const v520 = v300;
        const v522 = stdlib.le(v268, v262);
        if (v522) {
          sim_r.isHalt = false;
          }
        else {
          sim_r.txns.push({
            kind: 'from',
            to: v298,
            tok: v228
            });
          const v523 = 'timesUp';
          null;
          sim_r.txns.push({
            kind: 'from',
            to: v227,
            tok: undefined /* Nothing */
            });
          const v525 = 'showOutcome';
          null;
          sim_r.txns.push({
            kind: 'halt',
            tok: v228
            })
          sim_r.txns.push({
            kind: 'halt',
            tok: undefined /* Nothing */
            })
          sim_r.isHalt = true;
          }}
      else {
        sim_r.txns.push({
          kind: 'from',
          to: v265,
          tok: undefined /* Nothing */
          });
        const v323 = 'showBid';
        null;
        const v325 = stdlib.sub(v262, v300);
        const v326 = 'auctionTime';
        null;
        const v526 = v298;
        const v527 = false;
        const v528 = v303;
        const v529 = v300;
        const v531 = stdlib.le(v268, v262);
        if (v531) {
          sim_r.isHalt = false;
          }
        else {
          sim_r.txns.push({
            kind: 'from',
            to: v298,
            tok: v228
            });
          const v532 = 'timesUp';
          null;
          sim_r.txns.push({
            kind: 'from',
            to: v227,
            tok: undefined /* Nothing */
            });
          const v534 = 'showOutcome';
          null;
          sim_r.txns.push({
            kind: 'halt',
            tok: v228
            })
          sim_r.txns.push({
            kind: 'halt',
            tok: undefined /* Nothing */
            })
          sim_r.isHalt = true;
          }}
      return sim_r;
      }),
    soloSend: false,
    timeoutAt: undefined /* mto */,
    tys: [ctc0, ctc1, ctc2, ctc0, ctc3, ctc2, ctc2, ctc4],
    waitIfNotPresent: false
    }));
  const {data: [v299], secs: v301, time: v300, didSend: v111, from: v298 } = txn1;
  undefined /* setApiDetails */;
  const v303 = v299[stdlib.checkedBigNumberify('./index.rsh:64:13:spread', stdlib.UInt_max, '0')];
  ;
  const v307 = stdlib.gt(v303, v267);
  stdlib.assert(v307, {
    at: './index.rsh:68:24:application',
    fs: ['at ./index.rsh:67:13:application call to [unknown function] (defined at: ./index.rsh:67:13:function exp)'],
    msg: 'bid is too low',
    who: 'Bidder_bid'
    });
  const v308 = [v303, v265, v267];
  const v309 = await txn1.getOutput('Bidder_bid', 'v308', ctc5, v308);
  if (v111) {
    stdlib.protect(ctc6, await interact.out(v299, v309), {
      at: './index.rsh:64:14:application',
      fs: ['at ./index.rsh:64:14:application call to [unknown function] (defined at: ./index.rsh:64:14:function exp)', 'at ./index.rsh:69:23:application call to "notify" (defined at: ./index.rsh:67:13:function exp)', 'at ./index.rsh:67:13:application call to [unknown function] (defined at: ./index.rsh:67:13:function exp)'],
      msg: 'out',
      who: 'Bidder_bid'
      });
    }
  else {
    }
  
  if (v266) {
    const v328 = 'showBid';
    null;
    const v330 = stdlib.sub(v262, v300);
    const v331 = 'auctionTime';
    null;
    const v517 = v298;
    const v518 = false;
    const v519 = v303;
    const v520 = v300;
    const v522 = stdlib.le(v268, v262);
    if (v522) {
      return;
      }
    else {
      ;
      const v523 = 'timesUp';
      null;
      ;
      const v525 = 'showOutcome';
      null;
      return;
      }}
  else {
    ;
    const v323 = 'showBid';
    null;
    const v325 = stdlib.sub(v262, v300);
    const v326 = 'auctionTime';
    null;
    const v526 = v298;
    const v527 = false;
    const v528 = v303;
    const v529 = v300;
    const v531 = stdlib.le(v268, v262);
    if (v531) {
      return;
      }
    else {
      ;
      const v532 = 'timesUp';
      null;
      ;
      const v534 = 'showOutcome';
      null;
      return;
      }}
  
  
  };
export async function Bidder_bid(ctcTop, interact) {
  if (typeof(ctcTop) !== 'object' || ctcTop._initialize === undefined) {
    return Promise.reject(new Error(`The backend for Bidder_bid expects to receive a contract as its first argument.`));}
  if (typeof(interact) !== 'object') {
    return Promise.reject(new Error(`The backend for Bidder_bid expects to receive an interact object as its second argument.`));}
  const ctc = ctcTop._initialize();
  const stdlib = ctc.stdlib;
  const step = await ctc.getCurrentStep()
  stdlib.assert(step == 5, 'API called in the wrong state. Currently in state: ' + step + ', expected:  [5]');
  if (step == 5) {return _Bidder_bid5(ctcTop, interact);}
  };
const _ALGO = {
  ABI: {
    impure: [`Bidder_bid(uint64)(uint64,address,uint64)`],
    pure: [],
    sigs: [`Bidder_bid(uint64)(uint64,address,uint64)`]
    },
  appApproval: `BiAKAAEEBSggCFFZoI0GJgYBAASlHl3gAAuHp7Qmc2hvd0JpZA/uev8BYXVjdGlvblRpbWUPG+3AeHNob3dPdXRjb21lIjUAMRhBA60qZEkiWzUBIQZbNQI2GgAXSUEAFCI1BCM1BoGfqcXyDxJENhoBQgB0NhoCFzUENhoDNhoBF0mBAwxAAUBJJAxAAFkkEkQlNAESRDQESSISTDQCEhFEKGRJNQNJVwAgNf8hBFs1/oAEkSc087AyBjT+D0Q0/zEAEkQ0/zQDIQVbNP40A1cwIDQDV1ABFzQDIQdbMgY0AyEIW0IB/0glNAESRDQESSISTDQCEhFEKGRJNQNJSkpXACA1/yEFWzX+IQRbNf1XMCA1/CEHWzX7IQhbNfpJNQU1+YAE15C03TT5ULAyBjT9DEQ0+Rc1+DT4iALFNPg0+w1EgAgAAAAAAAABNDT4FjT8UDT7FlBQsDT4FjT8UDT7FlA1BzQDV1ABF0EAJSsxAFA0+BZQsCcENP0yBgkWULA0/zT+NP0xACI0+DIGNPpCAVOxIrIBNPuyCCOyEDT8sgezKzEAUDT4FlCwJwQ0/TIGCRZQsDT/NP40/TEAIjT4MgY0+kIBHkkjDEAAfCMSRCM0ARJENARJIhJMNAISEUQoZEk1A0lKVwAgNf8hBVs1/oE4WzX9V0ANNfyABJqLkXSwIzT+iAIRNP8xABJEKTT8UIAIQ2hlY2tiYWxQsCk0/FCACGF1Y3Rpb25SULA0/zT+NP00A4EwWwg0/yM0AyEEWzIGNP1CAJxIIQmIAbIiNAESRDQESSISTDQCEhFESTUFSUkiWzX/IQZbNf6BEFs1/YAE93ETTTT/FlA0/hZQNP0WULAhCYgBd7EisgEishIkshAyCrIUNP+yEbOADWNvbnRyYWN0U3RhdGU1/Ck0/FCACE5GVHB1YmxpULAxADT/FlA0/hZQNP0WUDIGFlA0/FAoSwFXAE1nSCM1ATIGNQJCAN81/zX+Nf01/DX7Nfo1+TX4NP80+g5BAC40+DT5FlA0+hZQNPtQNPwWUQcIUDT9FlA0/hZQKEsBVwBhZ0glNQEyBjUCQgCZsSKyASOyEiSyEDT7shQ0+bIRs4ALW5Z59XRpbWVzVXCwNPxBACQnBTT7UDT9FlCwsSKyASKyEiSyEDIJshUyCrIUNPmyEbNCADSxIrIBNP2yCCOyEDT4sgezJwU0+1A0/RZQsLEisgEishIkshAyCbIVMgqyFDT5shGzQgAAMRklEkSxIrIBIrIII7IQMgmyCTIKsgezQgAFMRkiEkQqNAEWNAIWUGc0BkEACoAEFR98dTQHULA0AEkjCDIEEkQxFhJEI0MxGSISREL/3yI1ASI1AkL/wzQASUojCDUAOAcyChJEOBAjEkQ4CBJEiTQASUpJIwg1ADgUMgoSRDgQJBJEOBFPAhJEOBISRIk=`,
  appClear: `Bg==`,
  companionInfo: null,
  extraPages: 0,
  mapDataKeys: 0,
  mapDataSize: 0,
  stateKeys: 1,
  stateSize: 97,
  unsupported: [],
  version: 10,
  warnings: []
  };
const _ETH = {
  ABI: `[
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "time",
            "type": "uint256"
          },
          {
            "components": [
              {
                "internalType": "address payable",
                "name": "v228",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "v229",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "v230",
                "type": "uint256"
              }
            ],
            "internalType": "struct T3",
            "name": "msg",
            "type": "tuple"
          }
        ],
        "internalType": "struct T4",
        "name": "_a",
        "type": "tuple"
      }
    ],
    "stateMutability": "payable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "msg",
        "type": "uint256"
      }
    ],
    "name": "ReachError",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "_who",
        "type": "address"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "time",
            "type": "uint256"
          },
          {
            "components": [
              {
                "internalType": "address payable",
                "name": "v228",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "v229",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "v230",
                "type": "uint256"
              }
            ],
            "internalType": "struct T3",
            "name": "msg",
            "type": "tuple"
          }
        ],
        "indexed": false,
        "internalType": "struct T4",
        "name": "_a",
        "type": "tuple"
      }
    ],
    "name": "_reach_e0",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "_who",
        "type": "address"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "time",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "msg",
            "type": "bool"
          }
        ],
        "indexed": false,
        "internalType": "struct T9",
        "name": "_a",
        "type": "tuple"
      }
    ],
    "name": "_reach_e1",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "_who",
        "type": "address"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "time",
            "type": "uint256"
          },
          {
            "components": [
              {
                "components": [
                  {
                    "internalType": "uint256",
                    "name": "elem0",
                    "type": "uint256"
                  }
                ],
                "internalType": "struct T14",
                "name": "v299",
                "type": "tuple"
              }
            ],
            "internalType": "struct T15",
            "name": "msg",
            "type": "tuple"
          }
        ],
        "indexed": false,
        "internalType": "struct T16",
        "name": "_a",
        "type": "tuple"
      }
    ],
    "name": "_reach_e3",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "_who",
        "type": "address"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "time",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "msg",
            "type": "bool"
          }
        ],
        "indexed": false,
        "internalType": "struct T9",
        "name": "_a",
        "type": "tuple"
      }
    ],
    "name": "_reach_e4",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "elem0",
            "type": "uint256"
          },
          {
            "internalType": "address payable",
            "name": "elem1",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "elem2",
            "type": "uint256"
          }
        ],
        "indexed": false,
        "internalType": "struct T13",
        "name": "v0",
        "type": "tuple"
      }
    ],
    "name": "_reach_oe_v308",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "components": [
          {
            "internalType": "bytes11",
            "name": "elem0",
            "type": "bytes11"
          }
        ],
        "indexed": false,
        "internalType": "struct T12",
        "name": "v0",
        "type": "tuple"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "v1",
        "type": "uint256"
      }
    ],
    "name": "auctionTime",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "components": [
          {
            "internalType": "bytes13",
            "name": "elem0",
            "type": "bytes13"
          }
        ],
        "indexed": false,
        "internalType": "struct T0",
        "name": "v0",
        "type": "tuple"
      },
      {
        "components": [
          {
            "internalType": "bytes8",
            "name": "elem0",
            "type": "bytes8"
          }
        ],
        "indexed": false,
        "internalType": "struct T1",
        "name": "v1",
        "type": "tuple"
      }
    ],
    "name": "contractState",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "components": [
          {
            "internalType": "bytes7",
            "name": "elem0",
            "type": "bytes7"
          }
        ],
        "indexed": false,
        "internalType": "struct T11",
        "name": "v0",
        "type": "tuple"
      },
      {
        "indexed": false,
        "internalType": "address payable",
        "name": "v1",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "v2",
        "type": "uint256"
      }
    ],
    "name": "showBid",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "components": [
          {
            "internalType": "bytes11",
            "name": "elem0",
            "type": "bytes11"
          }
        ],
        "indexed": false,
        "internalType": "struct T12",
        "name": "v0",
        "type": "tuple"
      },
      {
        "indexed": false,
        "internalType": "address payable",
        "name": "v1",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "v2",
        "type": "uint256"
      }
    ],
    "name": "showOutcome",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "components": [
          {
            "internalType": "bytes7",
            "name": "elem0",
            "type": "bytes7"
          }
        ],
        "indexed": false,
        "internalType": "struct T11",
        "name": "v0",
        "type": "tuple"
      }
    ],
    "name": "timesUp",
    "type": "event"
  },
  {
    "stateMutability": "payable",
    "type": "fallback"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_a0",
        "type": "uint256"
      }
    ],
    "name": "Bidder_bid",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "elem0",
            "type": "uint256"
          },
          {
            "internalType": "address payable",
            "name": "elem1",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "elem2",
            "type": "uint256"
          }
        ],
        "internalType": "struct T13",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "_reachCreationTime",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "_reachCurrentState",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "",
        "type": "bytes"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "_reachCurrentTime",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "time",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "msg",
            "type": "bool"
          }
        ],
        "internalType": "struct T9",
        "name": "_a",
        "type": "tuple"
      }
    ],
    "name": "_reach_m1",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "time",
            "type": "uint256"
          },
          {
            "components": [
              {
                "components": [
                  {
                    "internalType": "uint256",
                    "name": "elem0",
                    "type": "uint256"
                  }
                ],
                "internalType": "struct T14",
                "name": "v299",
                "type": "tuple"
              }
            ],
            "internalType": "struct T15",
            "name": "msg",
            "type": "tuple"
          }
        ],
        "internalType": "struct T16",
        "name": "_a",
        "type": "tuple"
      }
    ],
    "name": "_reach_m3",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "time",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "msg",
            "type": "bool"
          }
        ],
        "internalType": "struct T9",
        "name": "_a",
        "type": "tuple"
      }
    ],
    "name": "_reach_m4",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "stateMutability": "payable",
    "type": "receive"
  }
]`,
  Bytecode: `0x608060405260405162001bdb38038062001bdb833981016040819052620000269162000356565b60008080554360035560408051606081018252808201838152815281516020808201909352928352908101919091526040805133815283516020808301919091528085015180516001600160a01b031683850152908101516060830152820151608082015290517fb77e0b7275941fdbf00765e1e98b79777de983c0eaec6159504ea2e32b7160649181900360a00190a1620000c5341560076200024f565b80516c636f6e7472616374537461746560981b9052602081018051674e46547075626c6960c01b9052815190516040517f69e50d26b2ffbb9053754443dd4716e2f79425eb8a2394d896669e4fca4dbbaf92620001409290516001600160981b0319168252516001600160c01b031916602082015260400190565b60405180910390a16200018a6040805160c081018252600080825260208083018290528284018290526060830182905260808301829052835190810190935282529060a082015290565b3380825260208481018051516001600160a01b039081168386019081528251840151604080880191825293518401516060808901918252436080808b018281528c5160a0808e01918252600160008190559490945589519a8b019b909b52955190961696880196909652915191860191909152519184019190915251908201529051516001600160981b03191660c082015260e001604051602081830303815290604052600290805190602001906200024592919062000279565b505050506200043f565b81620002755760405163100960cb60e01b81526004810182905260240160405180910390fd5b5050565b828054620002879062000402565b90600052602060002090601f016020900481019282620002ab5760008555620002f6565b82601f10620002c657805160ff1916838001178555620002f6565b82800160010185558215620002f6579182015b82811115620002f6578251825591602001919060010190620002d9565b506200030492915062000308565b5090565b5b8082111562000304576000815560010162000309565b604051606081016001600160401b03811182821017156200035057634e487b7160e01b600052604160045260246000fd5b60405290565b600081830360808112156200036a57600080fd5b604080519081016001600160401b03811182821017156200039b57634e487b7160e01b600052604160045260246000fd5b604052835181526060601f1983011215620003b557600080fd5b620003bf6200031f565b60208501519092506001600160a01b0381168114620003dd57600080fd5b8252604084810151602080850191909152606090950151908301529283015250919050565b600181811c908216806200041757607f821691505b602082108114156200043957634e487b7160e01b600052602260045260246000fd5b50919050565b61178c806200044f6000396000f3fe60806040526004361061006e5760003560e01c8063832307571161004b57806383230757146100c1578063a7661d54146100d6578063ab53f2c6146100e9578063b62792241461010c57005b80631e93b0f1146100775780632772eddc1461009b5780632c10a159146100ae57005b3661007557005b005b34801561008357600080fd5b506003545b6040519081526020015b60405180910390f35b6100756100a93660046112f3565b61014a565b6100756100bc3660046112f3565b61016e565b3480156100cd57600080fd5b50600154610088565b6100756100e43660046112f3565b61018e565b3480156100f557600080fd5b506100fe6101ae565b60405161009292919061133b565b61011f61011a366004611375565b61024b565b60408051825181526020808401516001600160a01b0316908201529181015190820152606001610092565b6101526110a3565b61016a61016436849003840184611427565b8261028c565b5050565b6101766110a3565b61016a6101883684900384018461148c565b82610736565b6101966110a3565b61016a6101a83684900384018461148c565b826109e9565b6000606060005460028080546101c3906114c4565b80601f01602080910402602001604051908101604052809291908181526020018280546101ef906114c4565b801561023c5780601f106102115761010080835404028352916020019161023c565b820191906000526020600020905b81548152906001019060200180831161021f57829003601f168201915b50505050509050915091509091565b6102536110bb565b61025b6110a3565b6102636110e5565b6040805180820190915260208082018681528252820152610284818361028c565b505192915050565b61029c600560005414600f610bb1565b81516102b79015806102b057508251600154145b6010610bb1565b6000808055600280546102c9906114c4565b80601f01602080910402602001604051908101604052809291908181526020018280546102f5906114c4565b80156103425780601f1061031757610100808354040283529160200191610342565b820191906000526020600020905b81548152906001019060200180831161032557829003601f168201915b505050505080602001905181019061035a9190611515565b9050610364611112565b610375826040015143106011610bb1565b60408051338152855160208083019190915286015151518183015290517f7d66d73ff83563156ca4ecd3b15e845da66b8d82f7da365588d378ce806c89ae9181900360600190a1602084015151516103d0903414600d610bb1565b60a0820151602085015151516103e89110600e610bb1565b6020808501515151825152606083015182516001600160a01b0390911691015260a08201518151604090810191909152815190517fe7044cace702eae7a19650aafd558dcb89a52ad94861e42d85d4c6dfa2a61a7b9161046c91815181526020808301516001600160a01b0316908201526040918201519181019190915260600190565b60405180910390a1805183526080820151156105ba57606081018051661cda1bddd09a5960ca1b905251602085015151516040517fc6120fc183ae3fc000f2457d4c15269f5608aae4644242e9c49ee12adad4b056926104d09290913391906115c2565b60405180910390a16080810180516a61756374696f6e54696d6560a81b90525160408301517fa3f0a545c6956a51290d65b5179f5301dbddad26fcf6d63e1d491df323cc48d79190610523904390611602565b6040805192516001600160a81b031916835260208301919091520160405180910390a161054e611184565b825181516001600160a01b039182169052602080850151835192169181019190915260408085015183518201528183018051339052805160009084015291870151515182519091015280514360609091015260c08401519051608001526105b481610bd7565b50610730565b81606001516001600160a01b03166108fc8360a001519081150290604051600060405180830381858888f193505050501580156105fb573d6000803e3d6000fd5b5060208082018051661cda1bddd09a5960ca1b9052519085015151516040517fc6120fc183ae3fc000f2457d4c15269f5608aae4644242e9c49ee12adad4b0569261064a9290913391906115c2565b60405180910390a1604080820180516a61756374696f6e54696d6560a81b905251908301517fa3f0a545c6956a51290d65b5179f5301dbddad26fcf6d63e1d491df323cc48d7919061069d904390611602565b6040805192516001600160a81b031916835260208301919091520160405180910390a16106c8611184565b825181516001600160a01b039182169052602080850151835192169181019190915260408085015183518201528183018051339052805160009084015291870151515182519091015280514360609091015260c084015190516080015261072e81610bd7565b505b50505050565b610746600160005414600b610bb1565b815161076190158061075a57508251600154145b600c610bb1565b600080805560028054610773906114c4565b80601f016020809104026020016040519081016040528092919081815260200182805461079f906114c4565b80156107ec5780601f106107c1576101008083540402835291602001916107ec565b820191906000526020600020905b8154815290600101906020018083116107cf57829003601f168201915b50505050508060200190518101906108049190611619565b905061083660408051606081018252600091810191825290819081526040805160208181019092526000815291015290565b60408051338152855160208083019190915286015115158183015290517f400d21ea4e4a5e28b4ae5f0f476c201fc8036473fcf7c8cd252f38698020b4f19181900360600190a161088934156008610bb1565b6108a361089c3384602001516001610e8c565b6009610bb1565b81516108bb906001600160a01b03163314600a610bb1565b80516710da1958dad8985b60c21b905260a082015181516040517f69e50d26b2ffbb9053754443dd4716e2f79425eb8a2394d896669e4fca4dbbaf926109029290916116b7565b60405180910390a16020810180516730bab1ba34b7b72960c11b905260a083015190516040517f69e50d26b2ffbb9053754443dd4716e2f79425eb8a2394d896669e4fca4dbbaf926109559290916116b7565b60405180910390a1610965611184565b825181516001600160a01b039182169052602080850151835192169101526060830151608084015161099791906116db565b81516040908101919091528351602080840180516001600160a01b0390931690925281516001910152848201518151909201919091528051436060909101526080808501519151015261072e81610bd7565b6109f96005600054146014610bb1565b8151610a14901580610a0d57508251600154145b6015610bb1565b600080805560028054610a26906114c4565b80601f0160208091040260200160405190810160405280929190818152602001828054610a52906114c4565b8015610a9f5780601f10610a7457610100808354040283529160200191610a9f565b820191906000526020600020905b815481529060010190602001808311610a8257829003601f168201915b5050505050806020019051810190610ab79190611515565b9050610acb81604001514310156016610bb1565b60408051338152845160208083019190915285015115158183015290517faa99e317c364fb804a6b7e67b51beee98735c62eb3df9d8182015e63bb1907229181900360600190a1610b1e34156012610bb1565b8051610b36906001600160a01b031633146013610bb1565b610b3e611184565b815181516001600160a01b03918216905260208084015183519083169082015260408085015184518201526060808601518386018051919095169052608080870151855190151594019390935260a086015184519092019190915282514391015260c08401519151015261073081610bd7565b8161016a5760405163100960cb60e01b8152600481018290526024015b60405180910390fd5b610bdf6111d9565b81516040015160208301516080015111610d09576040805160e081018252600080825260208201819052918101829052606081018290526080810182905260a0810182905260c08101919091528251516001600160a01b0390811680835284516020908101518316818501908152865160409081015181870190815283890180515187166060808a01918252825187015115156080808c01918252845187015160a0808e01918252955184015160c0808f0191825260056000554360015589519b8c019c909c5298518c16978a01979097529451918801919091529051909716918501919091529451151594830194909452925191810191909152905160e08201526101000160405160208183030381529060405260029080519060200190610730929190611205565b610d258260000151602001518360200151600001516001610ea4565b805166074696d657355760cc1b9052805160405190516001600160c81b03191681527f3638bbcc4d7c79415acbedac7475d7c9fa631e8a81527c67d86405957e48e2cd9060200160405180910390a181602001516020015115610df357604080820180516a73686f774f7574636f6d6560a81b905251602084015180519083015192517fe7c2e125dc2076fc4ff20abfc7a62fd142e251201afc03938e6b472dc9a0a7d293610dd59392916116f3565b60405180910390a16000808055600181905561016a90600290611289565b815151602083015160409081015190516001600160a01b039092169181156108fc0291906000818181858888f19350505050158015610e36573d6000803e3d6000fd5b50602080820180516a73686f774f7574636f6d6560a81b90525190830151805160409182015191517fe7c2e125dc2076fc4ff20abfc7a62fd142e251201afc03938e6b472dc9a0a7d293610dd5939092916116f3565b6000610e9a83853085610ebd565b90505b9392505050565b610eaf838383610f97565b610eb857600080fd5b505050565b604080516001600160a01b0385811660248301528481166044830152606480830185905283518084039091018152608490920183526020820180516001600160e01b03166323b872dd60e01b179052915160009283928392918916918391610f249161171d565b60006040518083038185875af1925050503d8060008114610f61576040519150601f19603f3d011682016040523d82523d6000602084013e610f66565b606091505b5091509150610f7782826001611068565b5080806020019051810190610f8c9190611739565b979650505050505050565b604080516001600160a01b038481166024830152604480830185905283518084039091018152606490920183526020820180516001600160e01b031663a9059cbb60e01b179052915160009283928392918816918391610ff69161171d565b60006040518083038185875af1925050503d8060008114611033576040519150601f19603f3d011682016040523d82523d6000602084013e611038565b606091505b509150915061104982826002611068565b508080602001905181019061105e9190611739565b9695505050505050565b60608315611077575081610e9d565b8251156110875782518084602001fd5b60405163100960cb60e01b815260048101839052602401610bce565b60405180602001604052806110b66110bb565b905290565b60405180606001604052806000815260200160006001600160a01b03168152602001600081525090565b6040518060400160405280600081526020016110b660408051808201909152600060208201908152815290565b6040518060a001604052806111256110bb565b815260408051602081810190925260008152910190815260200161115460408051602081019091526000815290565b8152604080516020818101909252600081529101905b81526020016110b660408051602081019091526000815290565b6040805160a081018252600091810182815260608201839052608082019290925290819081526040805160a0810182526000808252602082810182905292820181905260608201819052608082015291015290565b60408051608081018252600060608201818152825282516020818101909452908152909182019061116a565b828054611211906114c4565b90600052602060002090601f0160209004810192826112335760008555611279565b82601f1061124c57805160ff1916838001178555611279565b82800160010185558215611279579182015b8281111561127957825182559160200191906001019061125e565b506112859291506112c6565b5090565b508054611295906114c4565b6000825580601f106112a5575050565b601f0160209004906000526020600020908101906112c391906112c6565b50565b5b8082111561128557600081556001016112c7565b6000604082840312156112ed57600080fd5b50919050565b60006040828403121561130557600080fd5b610e9d83836112db565b60005b8381101561132a578181015183820152602001611312565b838111156107305750506000910152565b828152604060208201526000825180604084015261136081606085016020870161130f565b601f01601f1916919091016060019392505050565b60006020828403121561138757600080fd5b5035919050565b6040805190810167ffffffffffffffff811182821017156113bf57634e487b7160e01b600052604160045260246000fd5b60405290565b6040516020810167ffffffffffffffff811182821017156113bf57634e487b7160e01b600052604160045260246000fd5b60405160c0810167ffffffffffffffff811182821017156113bf57634e487b7160e01b600052604160045260246000fd5b6000818303604081121561143a57600080fd5b61144261138e565b833581526020601f198301121561145857600080fd5b6114606113c5565b915061146a6113c5565b602094850135815282529283015250919050565b80151581146112c357600080fd5b60006040828403121561149e57600080fd5b6114a661138e565b8235815260208301356114b88161147e565b60208201529392505050565b600181811c908216806114d857607f821691505b602082108114156112ed57634e487b7160e01b600052602260045260246000fd5b80516001600160a01b038116811461151057600080fd5b919050565b600060e0828403121561152757600080fd5b60405160e0810181811067ffffffffffffffff8211171561155857634e487b7160e01b600052604160045260246000fd5b604052611564836114f9565b8152611572602084016114f9565b60208201526040830151604082015261158d606084016114f9565b606082015260808301516115a08161147e565b608082015260a0838101519082015260c0928301519281019290925250919050565b92516001600160c81b03191683526001600160a01b03919091166020830152604082015260600190565b634e487b7160e01b600052601160045260246000fd5b600082821015611614576116146115ec565b500390565b600081830360c081121561162c57600080fd5b6116346113f6565b61163d846114f9565b815261164b602085016114f9565b60208201526040840151604082015260608401516060820152608084015160808201526020609f198301121561168057600080fd5b6116886113c5565b60a08501519092506001600160981b0319811681146116a657600080fd5b825260a08101919091529392505050565b91516001600160981b0319168252516001600160c01b031916602082015260400190565b600082198211156116ee576116ee6115ec565b500190565b92516001600160a81b03191683526001600160a01b03919091166020830152604082015260600190565b6000825161172f81846020870161130f565b9190910192915050565b60006020828403121561174b57600080fd5b8151610e9d8161147e56fea26469706673582212200f45ecb711268d5a2a5d35d7023fde7988a8568bd388c5abfd82ba0cb22bc5a264736f6c634300080c0033`,
  BytecodeLen: 7131,
  Which: `oD`,
  version: 7,
  views: {
    }
  };
export const _stateSourceMap = {
  1: {
    at: './index.rsh:39:13:after expr stmt semicolon',
    fs: [],
    msg: null,
    who: 'Module'
    },
  3: {
    at: './index.rsh:94:13:after expr stmt semicolon',
    fs: [],
    msg: null,
    who: 'Module'
    },
  4: {
    at: './index.rsh:94:13:after expr stmt semicolon',
    fs: [],
    msg: null,
    who: 'Module'
    },
  5: {
    at: './index.rsh:61:23:after expr stmt semicolon',
    fs: [],
    msg: null,
    who: 'Module'
    }
  };
export const _Connectors = {
  ALGO: _ALGO,
  ETH: _ETH
  };
export const _Participants = {
  "Auctioneer": Auctioneer,
  "Bidder_bid": Bidder_bid
  };
export const _APIs = {
  Bidder: {
    bid: Bidder_bid
    }
  };
