/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createNFTSQL = /* GraphQL */ `
  mutation CreateNFTSQL(
    $input: CreateNFTSQLInput!
    $condition: ModelNFTSQLConditionInput
  ) {
    createNFTSQL(input: $input, condition: $condition) {
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
export const updateNFTSQL = /* GraphQL */ `
  mutation UpdateNFTSQL(
    $input: UpdateNFTSQLInput!
    $condition: ModelNFTSQLConditionInput
  ) {
    updateNFTSQL(input: $input, condition: $condition) {
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
export const deleteNFTSQL = /* GraphQL */ `
  mutation DeleteNFTSQL(
    $input: DeleteNFTSQLInput!
    $condition: ModelNFTSQLConditionInput
  ) {
    deleteNFTSQL(input: $input, condition: $condition) {
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
