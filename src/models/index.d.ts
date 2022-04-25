import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type ASKNFTEAMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class ASKNFTEA {
  readonly id: string;
  readonly awsUserId?: string | null;
  readonly nftDescription?: string | null;
  readonly nftImage?: string | null;
  readonly nftPrice?: number | null;
  readonly nftAssetOwner?: string | null;
  readonly nftPrevAssetOwner?: string | null;
  readonly nftAuctionDuration?: string | null;
  readonly nftContractAddress?: string | null;
  readonly nftLikes?: number | null;
  readonly nftId?: string | null;
  readonly awsUserPicture?: string | null;
  readonly awsName?: string | null;
  readonly nftWalletName?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<ASKNFTEA, ASKNFTEAMetaData>);
  static copyOf(source: ASKNFTEA, mutator: (draft: MutableModel<ASKNFTEA, ASKNFTEAMetaData>) => MutableModel<ASKNFTEA, ASKNFTEAMetaData> | void): ASKNFTEA;
}