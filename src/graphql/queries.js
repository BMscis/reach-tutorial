/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getImageStore = /* GraphQL */ `
  query GetImageStore($id: ID!) {
    getImageStore(id: $id) {
      id
      owner
      description
      image
      price
      wallet
      prevOwner
      blockTime
      nonce
      likes
      ownerName
      ownerProfile
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listImageStores = /* GraphQL */ `
  query ListImageStores(
    $filter: ModelImageStoreFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listImageStores(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        owner
        description
        image
        price
        wallet
        prevOwner
        blockTime
        nonce
        likes
        ownerName
        ownerProfile
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncImageStores = /* GraphQL */ `
  query SyncImageStores(
    $filter: ModelImageStoreFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncImageStores(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        owner
        description
        image
        price
        wallet
        prevOwner
        blockTime
        nonce
        likes
        ownerName
        ownerProfile
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
