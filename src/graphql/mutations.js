/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createImageStore = /* GraphQL */ `
  mutation CreateImageStore(
    $input: CreateImageStoreInput!
    $condition: ModelImageStoreConditionInput
  ) {
    createImageStore(input: $input, condition: $condition) {
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
export const updateImageStore = /* GraphQL */ `
  mutation UpdateImageStore(
    $input: UpdateImageStoreInput!
    $condition: ModelImageStoreConditionInput
  ) {
    updateImageStore(input: $input, condition: $condition) {
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
export const deleteImageStore = /* GraphQL */ `
  mutation DeleteImageStore(
    $input: DeleteImageStoreInput!
    $condition: ModelImageStoreConditionInput
  ) {
    deleteImageStore(input: $input, condition: $condition) {
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
