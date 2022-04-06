import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type NFTSQLMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class NFTSQL {
  readonly id: string;
  readonly owner: string;
  readonly description: string;
  readonly image?: string | null;
  readonly price: number;
  readonly wallet?: string | null;
  readonly prevOwner?: string | null;
  readonly blockTime?: string | null;
  readonly nonce?: string | null;
  readonly likes?: number | null;
  readonly ownerName?: string | null;
  readonly userPicture?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<NFTSQL, NFTSQLMetaData>);
  static copyOf(source: NFTSQL, mutator: (draft: MutableModel<NFTSQL, NFTSQLMetaData>) => MutableModel<NFTSQL, NFTSQLMetaData> | void): NFTSQL;
}