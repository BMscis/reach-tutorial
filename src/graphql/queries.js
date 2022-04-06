/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getNFTSQL = /* GraphQL */ `
  query GetNFTSQL($id: ID!) {
    getNFTSQL(id: $id) {
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
      userPicture
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listNFTSQLS = /* GraphQL */ `
  query ListNFTSQLS(
    $filter: ModelNFTSQLFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNFTSQLS(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
        userPicture
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
export const syncNFTSQLS = /* GraphQL */ `
  query SyncNFTSQLS(
    $filter: ModelNFTSQLFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncNFTSQLS(
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
        userPicture
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
