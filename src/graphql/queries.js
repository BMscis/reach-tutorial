/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getASKNFTEA = /* GraphQL */ `
  query GetASKNFTEA($id: ID!) {
    getASKNFTEA(id: $id) {
      id
      awsUserId
      nftDescription
      nftImage
      nftPrice
      nftAssetOwner
      nftPrevAssetOwner
      nftAuctionDuration
      nftContractAddress
      nftLikes
      nftId
      awsUserPicture
      awsName
      nftWalletName
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listASKNFTEAS = /* GraphQL */ `
  query ListASKNFTEAS(
    $filter: ModelASKNFTEAFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listASKNFTEAS(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        awsUserId
        nftDescription
        nftImage
        nftPrice
        nftAssetOwner
        nftPrevAssetOwner
        nftAuctionDuration
        nftContractAddress
        nftLikes
        nftId
        awsUserPicture
        awsName
        nftWalletName
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
export const syncASKNFTEAS = /* GraphQL */ `
  query SyncASKNFTEAS(
    $filter: ModelASKNFTEAFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncASKNFTEAS(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        awsUserId
        nftDescription
        nftImage
        nftPrice
        nftAssetOwner
        nftPrevAssetOwner
        nftAuctionDuration
        nftContractAddress
        nftLikes
        nftId
        awsUserPicture
        awsName
        nftWalletName
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
