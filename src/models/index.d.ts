import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type ImageStoreMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class ImageStore {
  readonly id: string;
  readonly owner?: string | null;
  readonly description?: string | null;
  readonly image?: string | null;
  readonly price?: string | null;
  readonly wallet?: string | null;
  readonly prevOwner?: string | null;
  readonly blockTime?: string | null;
  readonly nonce?: string | null;
  readonly likes?: number | null;
  readonly ownerName?: string | null;
  readonly ownerProfile?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<ImageStore, ImageStoreMetaData>);
  static copyOf(source: ImageStore, mutator: (draft: MutableModel<ImageStore, ImageStoreMetaData>) => MutableModel<ImageStore, ImageStoreMetaData> | void): ImageStore;
}