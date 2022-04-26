// Automatically generated with Reach 0.1.9 (1f9218bd)
/* eslint-disable */
export const _version = '0.1.9';
export const _versionHash = '0.1.9 (1f9218bd)';
export const _backendVersion = 11;

export function getExports(s) {
  const stdlib = s.reachStdlib;
  return {
    };
  };
export function _getEvents(s) {
  const stdlib = s.reachStdlib;
  return {
    };
  };
export function _getViews(s, viewlib) {
  const stdlib = s.reachStdlib;
  const ctc0 = stdlib.T_Address;
  const ctc1 = stdlib.T_Token;
  const ctc2 = stdlib.T_UInt;
  const ctc3 = stdlib.T_Bool;
  
  return {
    infos: {
      },
    views: {
      1: [ctc0, ctc1, ctc2, ctc2, ctc2],
      5: [ctc0, ctc1, ctc2, ctc0, ctc3, ctc2, ctc2]
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
export async function Bidder_bid(ctcTop, interact) {
  if (typeof(ctcTop) !== 'object' || ctcTop._initialize === undefined) {
    return Promise.reject(new Error(`The backend for Bidder_bid expects to receive a contract as its first argument.`));}
  if (typeof(interact) !== 'object') {
    return Promise.reject(new Error(`The backend for Bidder_bid expects to receive an interact object as its second argument.`));}
  const ctc = ctcTop._initialize();
  const stdlib = ctc.stdlib;
  const ctc0 = stdlib.T_Address;
  const ctc1 = stdlib.T_Token;
  const ctc2 = stdlib.T_UInt;
  const ctc3 = stdlib.T_Bool;
  const ctc4 = stdlib.T_Tuple([ctc2]);
  const ctc5 = stdlib.T_Tuple([ctc0, ctc2, ctc0, ctc2]);
  const ctc6 = stdlib.T_Null;
  
  
  const [v202, v203, v233, v234, v235, v236, v237] = await ctc.getState(stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, 5), [ctc0, ctc1, ctc2, ctc0, ctc3, ctc2, ctc2]);
  const v260 = stdlib.protect(ctc4, await interact.in(), {
    at: './index.rsh:1:23:application',
    fs: ['at ./index.rsh:37:13:application call to [unknown function] (defined at: ./index.rsh:37:13:function exp)', 'at ./index.rsh:37:13:application call to [unknown function] (defined at: ./index.rsh:37:13:function exp)'],
    msg: 'in',
    who: 'Bidder_bid'
    });
  const v261 = v260[stdlib.checkedBigNumberify('./index.rsh:36:13:spread', stdlib.UInt_max, 0)];
  const v263 = stdlib.gt(v261, v236);
  stdlib.assert(v263, {
    at: './index.rsh:37:31:application',
    fs: ['at ./index.rsh:37:13:application call to [unknown function] (defined at: ./index.rsh:37:20:function exp)', 'at ./index.rsh:37:13:application call to [unknown function] (defined at: ./index.rsh:37:13:function exp)', 'at ./index.rsh:37:13:application call to [unknown function] (defined at: ./index.rsh:37:13:function exp)'],
    msg: 'bid is too low',
    who: 'Bidder_bid'
    });
  
  const txn1 = await (ctc.sendrecv({
    args: [v202, v203, v233, v234, v235, v236, v237, v260],
    evt_cnt: 1,
    funcNum: 3,
    lct: stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, 0),
    onlyIf: true,
    out_tys: [ctc4],
    pay: [v261, []],
    sim_p: (async (txn1) => {
      const sim_r = { txns: [], mapRefs: [], maps: [] };
      let sim_txn_ctr = stdlib.UInt_max;
      const getSimTokCtr = () => { sim_txn_ctr = sim_txn_ctr.sub(1); return sim_txn_ctr; };
      
      
      const {data: [v267], secs: v269, time: v268, didSend: v96, from: v266 } = txn1;
      
      sim_r.txns.push({
        kind: 'api',
        who: "Bidder_bid"
        });
      const v271 = v267[stdlib.checkedBigNumberify('./index.rsh:36:13:spread', stdlib.UInt_max, 0)];
      sim_r.txns.push({
        amt: v271,
        kind: 'to',
        tok: undefined /* Nothing */
        });
      const v275 = stdlib.gt(v271, v236);
      ;
      const v276 = [v266, v271, v234, v236];
      const v277 = await txn1.getOutput('Bidder_bid', 'v276', ctc5, v276);
      
      if (v235) {
        const v472 = v266;
        const v473 = false;
        const v474 = v271;
        const v475 = v268;
        const v477 = stdlib.le(v237, v233);
        if (v477) {
          sim_r.isHalt = false;
          }
        else {
          sim_r.txns.push({
            amt: stdlib.checkedBigNumberify('./index.rsh:23:17:decimal', stdlib.UInt_max, 1),
            kind: 'from',
            to: v266,
            tok: v203
            });
          sim_r.txns.push({
            amt: v271,
            kind: 'from',
            to: v202,
            tok: undefined /* Nothing */
            });
          sim_r.txns.push({
            kind: 'halt',
            tok: v203
            })
          sim_r.txns.push({
            kind: 'halt',
            tok: undefined /* Nothing */
            })
          sim_r.isHalt = true;
          }}
      else {
        sim_r.txns.push({
          amt: v236,
          kind: 'from',
          to: v234,
          tok: undefined /* Nothing */
          });
        const v478 = v266;
        const v479 = false;
        const v480 = v271;
        const v481 = v268;
        const v483 = stdlib.le(v237, v233);
        if (v483) {
          sim_r.isHalt = false;
          }
        else {
          sim_r.txns.push({
            amt: stdlib.checkedBigNumberify('./index.rsh:23:17:decimal', stdlib.UInt_max, 1),
            kind: 'from',
            to: v266,
            tok: v203
            });
          sim_r.txns.push({
            amt: v271,
            kind: 'from',
            to: v202,
            tok: undefined /* Nothing */
            });
          sim_r.txns.push({
            kind: 'halt',
            tok: v203
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
  const {data: [v267], secs: v269, time: v268, didSend: v96, from: v266 } = txn1;
  undefined /* setApiDetails */;
  const v271 = v267[stdlib.checkedBigNumberify('./index.rsh:36:13:spread', stdlib.UInt_max, 0)];
  ;
  const v275 = stdlib.gt(v271, v236);
  stdlib.assert(v275, {
    at: './index.rsh:41:24:application',
    fs: ['at ./index.rsh:39:13:application call to [unknown function] (defined at: ./index.rsh:39:13:function exp)'],
    msg: 'bid is too low',
    who: 'Bidder_bid'
    });
  const v276 = [v266, v271, v234, v236];
  const v277 = await txn1.getOutput('Bidder_bid', 'v276', ctc5, v276);
  if (v96) {
    stdlib.protect(ctc6, await interact.out(v267, v277), {
      at: './index.rsh:36:14:application',
      fs: ['at ./index.rsh:36:14:application call to [unknown function] (defined at: ./index.rsh:36:14:function exp)', 'at ./index.rsh:42:23:application call to "notify" (defined at: ./index.rsh:39:13:function exp)', 'at ./index.rsh:39:13:application call to [unknown function] (defined at: ./index.rsh:39:13:function exp)'],
      msg: 'out',
      who: 'Bidder_bid'
      });
    }
  else {
    }
  
  if (v235) {
    const v472 = v266;
    const v473 = false;
    const v474 = v271;
    const v475 = v268;
    const v477 = stdlib.le(v237, v233);
    if (v477) {
      return;
      }
    else {
      ;
      ;
      return;
      }}
  else {
    ;
    const v478 = v266;
    const v479 = false;
    const v480 = v271;
    const v481 = v268;
    const v483 = stdlib.le(v237, v233);
    if (v483) {
      return;
      }
    else {
      ;
      ;
      return;
      }}
  
  
  };
export async function Creator(ctcTop, interact) {
  if (typeof(ctcTop) !== 'object' || ctcTop._initialize === undefined) {
    return Promise.reject(new Error(`The backend for Creator expects to receive a contract as its first argument.`));}
  if (typeof(interact) !== 'object') {
    return Promise.reject(new Error(`The backend for Creator expects to receive an interact object as its second argument.`));}
  const ctc = ctcTop._initialize();
  const stdlib = ctc.stdlib;
  const ctc0 = stdlib.T_UInt;
  const ctc1 = stdlib.T_Token;
  const ctc2 = stdlib.T_Object({
    lenInBlocks: ctc0,
    minBid: ctc0,
    nftId: ctc1
    });
  const ctc3 = stdlib.T_Null;
  const ctc4 = stdlib.T_Tuple([ctc0]);
  const ctc5 = stdlib.T_Address;
  const ctc6 = stdlib.T_Tuple([ctc5, ctc0, ctc5, ctc0]);
  const ctc7 = stdlib.T_Bool;
  
  
  const v198 = stdlib.protect(ctc2, await interact.getSale(), {
    at: './index.rsh:20:73:application',
    fs: ['at ./index.rsh:19:17:application call to [unknown function] (defined at: ./index.rsh:19:21:function exp)'],
    msg: 'getSale',
    who: 'Creator'
    });
  const v199 = v198.nftId;
  const v200 = v198.minBid;
  const v201 = v198.lenInBlocks;
  
  const txn1 = await (ctc.sendrecv({
    args: [v199, v200, v201],
    evt_cnt: 3,
    funcNum: 0,
    lct: stdlib.checkedBigNumberify('./index.rsh:22:13:dot', stdlib.UInt_max, 0),
    onlyIf: true,
    out_tys: [ctc1, ctc0, ctc0],
    pay: [stdlib.checkedBigNumberify('./index.rsh:22:13:decimal', stdlib.UInt_max, 0), []],
    sim_p: (async (txn1) => {
      const sim_r = { txns: [], mapRefs: [], maps: [] };
      let sim_txn_ctr = stdlib.UInt_max;
      const getSimTokCtr = () => { sim_txn_ctr = sim_txn_ctr.sub(1); return sim_txn_ctr; };
      
      
      const {data: [v203, v204, v205], secs: v207, time: v206, didSend: v32, from: v202 } = txn1;
      
      sim_r.txns.push({
        amt: stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, 0),
        kind: 'init',
        tok: v203
        });
      ;
      sim_r.isHalt = false;
      
      return sim_r;
      }),
    soloSend: true,
    timeoutAt: undefined /* mto */,
    tys: [ctc1, ctc0, ctc0],
    waitIfNotPresent: false
    }));
  const {data: [v203, v204, v205], secs: v207, time: v206, didSend: v32, from: v202 } = txn1;
  ;
  ;
  const txn2 = await (ctc.sendrecv({
    args: [v202, v203, v204, v205, v206],
    evt_cnt: 0,
    funcNum: 1,
    lct: v206,
    onlyIf: true,
    out_tys: [],
    pay: [stdlib.checkedBigNumberify('./index.rsh:25:13:dot', stdlib.UInt_max, 0), [[stdlib.checkedBigNumberify('./index.rsh:23:17:decimal', stdlib.UInt_max, 1), v203]]],
    sim_p: (async (txn2) => {
      const sim_r = { txns: [], mapRefs: [], maps: [] };
      let sim_txn_ctr = stdlib.UInt_max;
      const getSimTokCtr = () => { sim_txn_ctr = sim_txn_ctr.sub(1); return sim_txn_ctr; };
      
      
      const {data: [], secs: v217, time: v216, didSend: v39, from: v215 } = txn2;
      
      ;
      sim_r.txns.push({
        amt: stdlib.checkedBigNumberify('./index.rsh:23:17:decimal', stdlib.UInt_max, 1),
        kind: 'to',
        tok: v203
        });
      const v227 = stdlib.addressEq(v202, v215);
      ;
      
      const v233 = stdlib.add(v206, v205);
      const v234 = v202;
      const v235 = true;
      const v236 = v204;
      const v237 = v216;
      const v238 = v206;
      
      if (await (async () => {
        const v253 = stdlib.le(v238, v233);
        
        return v253;})()) {
        sim_r.isHalt = false;
        }
      else {
        sim_r.txns.push({
          amt: stdlib.checkedBigNumberify('./index.rsh:23:17:decimal', stdlib.UInt_max, 1),
          kind: 'from',
          to: v234,
          tok: v203
          });
        if (v235) {
          
          sim_r.txns.push({
            kind: 'halt',
            tok: v203
            })
          sim_r.txns.push({
            kind: 'halt',
            tok: undefined /* Nothing */
            })
          sim_r.isHalt = true;
          }
        else {
          sim_r.txns.push({
            amt: v236,
            kind: 'from',
            to: v202,
            tok: undefined /* Nothing */
            });
          
          sim_r.txns.push({
            kind: 'halt',
            tok: v203
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
    tys: [ctc5, ctc1, ctc0, ctc0, ctc0],
    waitIfNotPresent: false
    }));
  const {data: [], secs: v217, time: v216, didSend: v39, from: v215 } = txn2;
  ;
  ;
  const v227 = stdlib.addressEq(v202, v215);
  stdlib.assert(v227, {
    at: './index.rsh:25:13:dot',
    fs: [],
    msg: 'sender correct',
    who: 'Creator'
    });
  stdlib.protect(ctc3, await interact.auctionReady(), {
    at: './index.rsh:26:34:application',
    fs: ['at ./index.rsh:26:34:application call to [unknown function] (defined at: ./index.rsh:26:34:function exp)', 'at ./index.rsh:26:34:application call to "liftedInteract" (defined at: ./index.rsh:26:34:application)'],
    msg: 'auctionReady',
    who: 'Creator'
    });
  
  const v233 = stdlib.add(v206, v205);
  let v234 = v202;
  let v235 = true;
  let v236 = v204;
  let v237 = v216;
  let v238 = v206;
  
  while (await (async () => {
    const v253 = stdlib.le(v238, v233);
    
    return v253;})()) {
    const txn3 = await (ctc.recv({
      didSend: false,
      evt_cnt: 1,
      funcNum: 3,
      out_tys: [ctc4],
      timeoutAt: ['time', v233],
      waitIfNotPresent: false
      }));
    if (txn3.didTimeout) {
      const txn4 = await (ctc.sendrecv({
        args: [v202, v203, v233, v234, v235, v236, v237],
        evt_cnt: 0,
        funcNum: 4,
        lct: v237,
        onlyIf: true,
        out_tys: [],
        pay: [stdlib.checkedBigNumberify('./index.rsh:50:21:decimal', stdlib.UInt_max, 0), []],
        sim_p: (async (txn4) => {
          const sim_r = { txns: [], mapRefs: [], maps: [] };
          let sim_txn_ctr = stdlib.UInt_max;
          const getSimTokCtr = () => { sim_txn_ctr = sim_txn_ctr.sub(1); return sim_txn_ctr; };
          
          
          const {data: [], secs: v293, time: v292, didSend: v133, from: v291 } = txn4;
          
          ;
          const v294 = stdlib.addressEq(v202, v291);
          ;
          const cv234 = v234;
          const cv235 = v235;
          const cv236 = v236;
          const cv237 = v292;
          const cv238 = v237;
          
          await (async () => {
            const v234 = cv234;
            const v235 = cv235;
            const v236 = cv236;
            const v237 = cv237;
            const v238 = cv238;
            
            if (await (async () => {
              const v253 = stdlib.le(v238, v233);
              
              return v253;})()) {
              sim_r.isHalt = false;
              }
            else {
              sim_r.txns.push({
                amt: stdlib.checkedBigNumberify('./index.rsh:23:17:decimal', stdlib.UInt_max, 1),
                kind: 'from',
                to: v234,
                tok: v203
                });
              if (v235) {
                
                sim_r.txns.push({
                  kind: 'halt',
                  tok: v203
                  })
                sim_r.txns.push({
                  kind: 'halt',
                  tok: undefined /* Nothing */
                  })
                sim_r.isHalt = true;
                }
              else {
                sim_r.txns.push({
                  amt: v236,
                  kind: 'from',
                  to: v202,
                  tok: undefined /* Nothing */
                  });
                
                sim_r.txns.push({
                  kind: 'halt',
                  tok: v203
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
        tys: [ctc5, ctc1, ctc0, ctc5, ctc7, ctc0, ctc0],
        waitIfNotPresent: false
        }));
      const {data: [], secs: v293, time: v292, didSend: v133, from: v291 } = txn4;
      ;
      const v294 = stdlib.addressEq(v202, v291);
      stdlib.assert(v294, {
        at: './index.rsh:50:21:dot',
        fs: ['at ./index.rsh:49:41:application call to [unknown function] (defined at: ./index.rsh:49:41:function exp)'],
        msg: 'sender correct',
        who: 'Creator'
        });
      const cv234 = v234;
      const cv235 = v235;
      const cv236 = v236;
      const cv237 = v292;
      const cv238 = v237;
      
      v234 = cv234;
      v235 = cv235;
      v236 = cv236;
      v237 = cv237;
      v238 = cv238;
      
      continue;
      }
    else {
      const {data: [v267], secs: v269, time: v268, didSend: v96, from: v266 } = txn3;
      undefined /* setApiDetails */;
      const v271 = v267[stdlib.checkedBigNumberify('./index.rsh:36:13:spread', stdlib.UInt_max, 0)];
      ;
      const v275 = stdlib.gt(v271, v236);
      stdlib.assert(v275, {
        at: './index.rsh:41:24:application',
        fs: ['at ./index.rsh:39:13:application call to [unknown function] (defined at: ./index.rsh:39:13:function exp)'],
        msg: 'bid is too low',
        who: 'Creator'
        });
      const v276 = [v266, v271, v234, v236];
      await txn3.getOutput('Bidder_bid', 'v276', ctc6, v276);
      if (v235) {
        stdlib.protect(ctc3, await interact.seeBid(v266, v271), {
          at: './index.rsh:46:40:application',
          fs: ['at ./index.rsh:46:40:application call to [unknown function] (defined at: ./index.rsh:46:40:function exp)', 'at ./index.rsh:46:40:application call to "liftedInteract" (defined at: ./index.rsh:46:40:application)', 'at ./index.rsh:39:13:application call to [unknown function] (defined at: ./index.rsh:39:13:function exp)'],
          msg: 'seeBid',
          who: 'Creator'
          });
        
        const cv234 = v266;
        const cv235 = false;
        const cv236 = v271;
        const cv237 = v268;
        const cv238 = v237;
        
        v234 = cv234;
        v235 = cv235;
        v236 = cv236;
        v237 = cv237;
        v238 = cv238;
        
        continue;}
      else {
        ;
        stdlib.protect(ctc3, await interact.seeBid(v266, v271), {
          at: './index.rsh:46:40:application',
          fs: ['at ./index.rsh:46:40:application call to [unknown function] (defined at: ./index.rsh:46:40:function exp)', 'at ./index.rsh:46:40:application call to "liftedInteract" (defined at: ./index.rsh:46:40:application)', 'at ./index.rsh:39:13:application call to [unknown function] (defined at: ./index.rsh:39:13:function exp)'],
          msg: 'seeBid',
          who: 'Creator'
          });
        
        const cv234 = v266;
        const cv235 = false;
        const cv236 = v271;
        const cv237 = v268;
        const cv238 = v237;
        
        v234 = cv234;
        v235 = cv235;
        v236 = cv236;
        v237 = cv237;
        v238 = cv238;
        
        continue;}}
    
    }
  ;
  if (v235) {
    stdlib.protect(ctc3, await interact.showOutcome(v234, v236), {
      at: './index.rsh:56:37:application',
      fs: ['at ./index.rsh:56:37:application call to [unknown function] (defined at: ./index.rsh:56:37:function exp)', 'at ./index.rsh:56:37:application call to "liftedInteract" (defined at: ./index.rsh:56:37:application)'],
      msg: 'showOutcome',
      who: 'Creator'
      });
    
    return;
    }
  else {
    ;
    stdlib.protect(ctc3, await interact.showOutcome(v234, v236), {
      at: './index.rsh:56:37:application',
      fs: ['at ./index.rsh:56:37:application call to [unknown function] (defined at: ./index.rsh:56:37:function exp)', 'at ./index.rsh:56:37:application call to "liftedInteract" (defined at: ./index.rsh:56:37:application)'],
      msg: 'showOutcome',
      who: 'Creator'
      });
    
    return;
    }
  
  
  
  };
const _ALGO = {
  ABI: {
    impure: [`Bidder_bid(uint64)(address,uint64,address,uint64)`],
    pure: [],
    sigs: [`Bidder_bid(uint64)(address,uint64,address,uint64)`]
    },
  appApproval: `BiAKAAEEBSggCFFZoI0GJgIBAAAiNQAxGEEDIilkSSJbNQEhBls1AjYaABdJQQAUIjUEIzUGgejZ57QNEkQ2GgFCAHQ2GgIXNQQ2GgM2GgEXSYEDDEABIEkkDEAAWSQSRCU0ARJENARJIhJMNAISEUQoZEk1A0lXACA1/yEEWzX+gASRJzTzsDIGNP4PRDT/MQASRDT/NAMhBVs0/jQDVzAgNANXUAEXNAMhB1syBjQDIQhbQgGWSCU0ARJENARJIhJMNAISEUQoZEk1A0lKSlcAIDX/IQVbNf4hBFs1/VcwIDX8IQdbNfshCFs1+kk1BTX5gATXkLTdNPlQsDIGNP0MRDT5FzX4NPiIAjo0+DT7DUSACAAAAAAAAAEUMQA0+BZQNPxQNPsWUFCwMQA0+BZQNPxQNPsWUDUHNANXUAEXQQASNP80/jT9MQAiNPgyBjT6QgD3sSKyATT7sggjshA0/LIHszT/NP40/TEAIjT4MgY0+kIA1UkjDEAAVyMSRCM0ARJENARJIhJMNAISEUQoZEk1A0lJVwAgNf8hBVs1/oE4WzX9gASai5F0sCM0/ogBqzT/MQASRDT/NP40/TQDgTBbCDT/IzQDIQRbMgY0/UIAeEgiNAESRDQESSISTDQCEhFESTUFSUkiWzX/IQZbNf6BEFs1/YAE93ETTTT/FlA0/hZQNP0WULAhCYgBNiEJiAExsSKyASKyEiSyEDIKshQ0/7IRszEANP8WUDT+FlA0/RZQMgYWUChLAVcAQGdIIzUBMgY1AkIAvTX/Nf41/TX8Nfs1+jX5Nfg0/zT6DkEALjT4NPkWUDT6FlA0+1A0/BZRBwhQNP0WUDT+FlAoSwFXAGFnSCU1ATIGNQJCAHexIrIBI7ISJLIQNPuyFDT5shGzNPxBABqxIrIBIrISJLIQMgmyFTIKshQ0+bIRs0IAKrEisgE0/bIII7IQNPiyB7OxIrIBIrISJLIQMgmyFTIKshQ0+bIRs0IAADEZJRJEsSKyASKyCCOyEDIJsgkyCrIHs0IABTEZIhJEKTQBFjQCFlBnNAZBAAqABBUffHU0B1CwNABJIwgyBBJEMRYSRCNDMRkiEkRC/98iNQEiNQJC/8M0AElKIwg1ADgHMgoSRDgQIxJEOAgSRIk0AElKSSMINQA4FDIKEkQ4ECQSRDgRTwISRDgSEkSJ`,
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
                "name": "v203",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "v204",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "v205",
                "type": "uint256"
              }
            ],
            "internalType": "struct T1",
            "name": "msg",
            "type": "tuple"
          }
        ],
        "internalType": "struct T2",
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
                "name": "v203",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "v204",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "v205",
                "type": "uint256"
              }
            ],
            "internalType": "struct T1",
            "name": "msg",
            "type": "tuple"
          }
        ],
        "indexed": false,
        "internalType": "struct T2",
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
        "internalType": "struct T7",
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
                "internalType": "struct T10",
                "name": "v267",
                "type": "tuple"
              }
            ],
            "internalType": "struct T11",
            "name": "msg",
            "type": "tuple"
          }
        ],
        "indexed": false,
        "internalType": "struct T12",
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
        "internalType": "struct T7",
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
            "internalType": "address payable",
            "name": "elem0",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "elem1",
            "type": "uint256"
          },
          {
            "internalType": "address payable",
            "name": "elem2",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "elem3",
            "type": "uint256"
          }
        ],
        "indexed": false,
        "internalType": "struct T9",
        "name": "v0",
        "type": "tuple"
      }
    ],
    "name": "_reach_oe_v276",
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
            "internalType": "address payable",
            "name": "elem0",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "elem1",
            "type": "uint256"
          },
          {
            "internalType": "address payable",
            "name": "elem2",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "elem3",
            "type": "uint256"
          }
        ],
        "internalType": "struct T9",
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
        "internalType": "struct T7",
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
                "internalType": "struct T10",
                "name": "v267",
                "type": "tuple"
              }
            ],
            "internalType": "struct T11",
            "name": "msg",
            "type": "tuple"
          }
        ],
        "internalType": "struct T12",
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
        "internalType": "struct T7",
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
  Bytecode: `0x60806040526040516200163738038062001637833981016040819052620000269162000282565b6000805543600355604080518251815260208084015180516001600160a01b0316828401529081015182840152820151606082015290517f09dcf99bab8403f2ad96a278879a2e333122fff3ae5cb4798f3c3ab7f7b0fece9181900360800190a162000095341560076200017b565b620000da6040518060a0016040528060006001600160a01b0316815260200160006001600160a01b031681526020016000815260200160008152602001600081525090565b3380825260208381018051516001600160a01b039081168386019081528251840151604080880191825293518401516060808901918252436080808b0182815260016000819055929092558751808a019a909a5294519095168887015291519187019190915251908501525160a0808501919091528151808503909101815260c09093019052815162000172926002920190620001a5565b5050506200036b565b81620001a15760405163100960cb60e01b81526004810182905260240160405180910390fd5b5050565b828054620001b3906200032e565b90600052602060002090601f016020900481019282620001d7576000855562000222565b82601f10620001f257805160ff191683800117855562000222565b8280016001018555821562000222579182015b828111156200022257825182559160200191906001019062000205565b506200023092915062000234565b5090565b5b8082111562000230576000815560010162000235565b604051606081016001600160401b03811182821017156200027c57634e487b7160e01b600052604160045260246000fd5b60405290565b600081830360808112156200029657600080fd5b604080519081016001600160401b0381118282101715620002c757634e487b7160e01b600052604160045260246000fd5b604052835181526060601f1983011215620002e157600080fd5b620002eb6200024b565b60208501519092506001600160a01b03811681146200030957600080fd5b8252604084810151602080850191909152606090950151908301529283015250919050565b600181811c908216806200034357607f821691505b602082108114156200036557634e487b7160e01b600052602260045260246000fd5b50919050565b6112bc806200037b6000396000f3fe60806040526004361061006e5760003560e01c8063832307571161004b57806383230757146100c1578063a7661d54146100d6578063ab53f2c6146100e9578063b62792241461010c57005b80631e93b0f1146100775780632772eddc1461009b5780632c10a159146100ae57005b3661007557005b005b34801561008357600080fd5b506003545b6040519081526020015b60405180910390f35b6100756100a9366004610ec6565b61012c565b6100756100bc366004610ec6565b610150565b3480156100cd57600080fd5b50600154610088565b6100756100e4366004610ec6565b610170565b3480156100f557600080fd5b506100fe610190565b604051610092929190610f0e565b61011f61011a366004610f48565b61022d565b6040516100929190610f61565b610134610d0b565b61014c61014636849003840184611002565b8261026e565b5050565b610158610d0b565b61014c61016a36849003840184611067565b8261056d565b610178610d0b565b61014c61018a36849003840184611067565b82610747565b6000606060005460028080546101a59061109f565b80601f01602080910402602001604051908101604052809291908181526020018280546101d19061109f565b801561021e5780601f106101f35761010080835404028352916020019161021e565b820191906000526020600020905b81548152906001019060200180831161020157829003601f168201915b50505050509050915091509091565b610235610d23565b61023d610d0b565b610245610d5d565b6040805180820190915260208082018681528252820152610266818361026e565b505192915050565b61027e600560005414600f610907565b815161029990158061029257508251600154145b6010610907565b6000808055600280546102ab9061109f565b80601f01602080910402602001604051908101604052809291908181526020018280546102d79061109f565b80156103245780601f106102f957610100808354040283529160200191610324565b820191906000526020600020905b81548152906001019060200180831161030757829003601f168201915b505050505080602001905181019061033c91906110f0565b9050610346610d0b565b610357826040015143106011610907565b60408051855181526020808701515151908201527f3097a001c4c75b01a2a0df409ab34fe1576e7fa0902510c53c83db8ce4b686d2910160405180910390a1602084015151516103aa903414600d610907565b60a0820151602085015151516103c29110600e610907565b8051339052602084810151515182519091015260608281015182516001600160a01b0390911660409182015260a0840151835190920191909152815190517f662711e0f62ef113867b8591ed303a5c437dbf044e2dab41214a0a987179e4509161042b91610f61565b60405180910390a1805183526080820151156104b557610449610d8a565b825181516001600160a01b039182169052602080850151835192169181019190915260408085015183518201528183018051339052805160009084015291870151515182519091015280514360609091015260c08401519051608001526104af8161092d565b50610567565b81606001516001600160a01b03166108fc8360a001519081150290604051600060405180830381858888f193505050501580156104f6573d6000803e3d6000fd5b506104ff610d8a565b825181516001600160a01b039182169052602080850151835192169181019190915260408085015183518201528183018051339052805160009084015291870151515182519091015280514360609091015260c08401519051608001526105658161092d565b505b50505050565b61057d600160005414600b610907565b815161059890158061059157508251600154145b600c610907565b6000808055600280546105aa9061109f565b80601f01602080910402602001604051908101604052809291908181526020018280546105d69061109f565b80156106235780601f106105f857610100808354040283529160200191610623565b820191906000526020600020905b81548152906001019060200180831161060657829003601f168201915b505050505080602001905181019061063b919061119d565b60408051855181526020808701511515908201529192507f79ca1a789d797004bc78dff9632d64e202e102f2d008dcc20c5a645ef7d4a7d1910160405180910390a161068934156008610907565b6106a361069c3383602001516001610af9565b6009610907565b80516106bb906001600160a01b03163314600a610907565b6106c3610d8a565b815181516001600160a01b03918216905260208084015183519216910152606082015160808301516106f59190611227565b81516040908101919091528251602080840180516001600160a01b039093169092528151600191015283820151815190920191909152805143606090910152608080840151915101526105678161092d565b6107576005600054146014610907565b815161077290158061076b57508251600154145b6015610907565b6000808055600280546107849061109f565b80601f01602080910402602001604051908101604052809291908181526020018280546107b09061109f565b80156107fd5780601f106107d2576101008083540402835291602001916107fd565b820191906000526020600020905b8154815290600101906020018083116107e057829003601f168201915b505050505080602001905181019061081591906110f0565b905061082981604001514310156016610907565b60408051845181526020808601511515908201527fbe072b3e7ff68f92e7d9d05168a4666cd1ba2609e77c14d9feaf0d14991875d1910160405180910390a161087434156012610907565b805161088c906001600160a01b031633146013610907565b610894610d8a565b815181516001600160a01b03918216905260208084015183519083169082015260408085015184518201526060808601518386018051919095169052608080870151855190151594019390935260a086015184519092019190915282514391015260c0840151915101526105678161092d565b8161014c5760405163100960cb60e01b8152600481018290526024015b60405180910390fd5b80516040015160208201516080015111610a5c576040805160e081018252600080825260208201819052918101829052606081018290526080810182905260a0810182905260c08101919091528151516001600160a01b0390811680835283516020908101518316818501908152855160409081015181870190815283880180515187166060808a01918252825187015115156080808c01918252845187015160a0808e01918252955184015160c0808f0191825260056000554360015589519b8c019c909c5298518c16978a01979097529451918801919091529051909716918501919091529451151594830194909452925191810191909152905160e08201526101000160405160208183030381529060405260029080519060200190610a57929190610ddf565b505050565b610a788160000151602001518260200151600001516001610b11565b80602001516020015115610a9f5760008080556001819055610a9c90600290610e63565b50565b805151602082015160409081015190516001600160a01b039092169181156108fc0291906000818181858888f19350505050158015610ae2573d6000803e3d6000fd5b5060008080556001819055610a9c90600290610e63565b6000610b0783853085610b25565b90505b9392505050565b610b1c838383610bff565b610a5757600080fd5b604080516001600160a01b0385811660248301528481166044830152606480830185905283518084039091018152608490920183526020820180516001600160e01b03166323b872dd60e01b179052915160009283928392918916918391610b8c9161124d565b60006040518083038185875af1925050503d8060008114610bc9576040519150601f19603f3d011682016040523d82523d6000602084013e610bce565b606091505b5091509150610bdf82826001610cd0565b5080806020019051810190610bf49190611269565b979650505050505050565b604080516001600160a01b038481166024830152604480830185905283518084039091018152606490920183526020820180516001600160e01b031663a9059cbb60e01b179052915160009283928392918816918391610c5e9161124d565b60006040518083038185875af1925050503d8060008114610c9b576040519150601f19603f3d011682016040523d82523d6000602084013e610ca0565b606091505b5091509150610cb182826002610cd0565b5080806020019051810190610cc69190611269565b9695505050505050565b60608315610cdf575081610b0a565b825115610cef5782518084602001fd5b60405163100960cb60e01b815260048101839052602401610924565b6040518060200160405280610d1e610d23565b905290565b604051806080016040528060006001600160a01b031681526020016000815260200160006001600160a01b03168152602001600081525090565b604051806040016040528060008152602001610d1e60408051808201909152600060208201908152815290565b6040805160a081018252600091810182815260608201839052608082019290925290819081526040805160a0810182526000808252602082810182905292820181905260608201819052608082015291015290565b828054610deb9061109f565b90600052602060002090601f016020900481019282610e0d5760008555610e53565b82601f10610e2657805160ff1916838001178555610e53565b82800160010185558215610e53579182015b82811115610e53578251825591602001919060010190610e38565b50610e5f929150610e99565b5090565b508054610e6f9061109f565b6000825580601f10610e7f575050565b601f016020900490600052602060002090810190610a9c91905b5b80821115610e5f5760008155600101610e9a565b600060408284031215610ec057600080fd5b50919050565b600060408284031215610ed857600080fd5b610b0a8383610eae565b60005b83811015610efd578181015183820152602001610ee5565b838111156105675750506000910152565b8281526040602082015260008251806040840152610f33816060850160208701610ee2565b601f01601f1916919091016060019392505050565b600060208284031215610f5a57600080fd5b5035919050565b81516001600160a01b03908116825260208084015190830152604080840151909116908201526060918201519181019190915260800190565b6040805190810167ffffffffffffffff81118282101715610fcb57634e487b7160e01b600052604160045260246000fd5b60405290565b6040516020810167ffffffffffffffff81118282101715610fcb57634e487b7160e01b600052604160045260246000fd5b6000818303604081121561101557600080fd5b61101d610f9a565b833581526020601f198301121561103357600080fd5b61103b610fd1565b9150611045610fd1565b602094850135815282529283015250919050565b8015158114610a9c57600080fd5b60006040828403121561107957600080fd5b611081610f9a565b82358152602083013561109381611059565b60208201529392505050565b600181811c908216806110b357607f821691505b60208210811415610ec057634e487b7160e01b600052602260045260246000fd5b80516001600160a01b03811681146110eb57600080fd5b919050565b600060e0828403121561110257600080fd5b60405160e0810181811067ffffffffffffffff8211171561113357634e487b7160e01b600052604160045260246000fd5b60405261113f836110d4565b815261114d602084016110d4565b602082015260408301516040820152611168606084016110d4565b6060820152608083015161117b81611059565b608082015260a0838101519082015260c0928301519281019290925250919050565b600060a082840312156111af57600080fd5b60405160a0810181811067ffffffffffffffff821117156111e057634e487b7160e01b600052604160045260246000fd5b6040526111ec836110d4565b81526111fa602084016110d4565b60208201526040830151604082015260608301516060820152608083015160808201528091505092915050565b6000821982111561124857634e487b7160e01b600052601160045260246000fd5b500190565b6000825161125f818460208701610ee2565b9190910192915050565b60006020828403121561127b57600080fd5b8151610b0a8161105956fea26469706673582212201eb8d6efe666fc625c670940ff56b7ef08cc51b8e9c35020b95d14472fada84964736f6c634300080c0033`,
  BytecodeLen: 5687,
  Which: `oD`,
  version: 6,
  views: {
    }
  };
export const _stateSourceMap = {
  1: {
    at: './index.rsh:24:13:after expr stmt semicolon',
    fs: [],
    msg: null,
    who: 'Module'
    },
  3: {
    at: './index.rsh:57:13:after expr stmt semicolon',
    fs: [],
    msg: null,
    who: 'Module'
    },
  4: {
    at: './index.rsh:57:13:after expr stmt semicolon',
    fs: [],
    msg: null,
    who: 'Module'
    },
  5: {
    at: './index.rsh:33:23:after expr stmt semicolon',
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
  "Bidder_bid": Bidder_bid,
  "Creator": Creator
  };
export const _APIs = {
  Bidder: {
    bid: Bidder_bid
    }
  };
