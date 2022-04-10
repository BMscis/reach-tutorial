// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./@rarible/royalties/contracts/impl/RoyaltiesV2Impl.sol";
import "./@rarible/royalties/contracts/LibPart.sol";
import "./@rarible/royalties/contracts/LibRoyaltiesV2.sol";
contract MinimalErc721 is ERC721, Ownable, RoyaltiesV2Impl {

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdTracker;
    bytes4 private constant _INTERFACE_ID_ERC2981 = 0x2a55205a;
    constructor() ERC721("NFTea", "TEA") {}
    function mint(address _to) public onlyOwner{
        super._mint(_to, _tokenIdTracker.current());
        _tokenIdTracker.increment();
    }
    function setRoyalties(uint _tokenId, address payable _royaltiesRecepientAddress, uint96 _percentageBasisPoints) public onlyOwner {
        ///require(_tokenId < _tokenIdTracker.current(), "Token id is not valid");
        ///require(_percentageBasisPoints < 10000, "Token royalty > 100%");
        //_royalties[0] = new LibPart.Part(_royaltiesRecepientAddress, _percentageBasisPoints);
        //super._setRoyalties(_tokenId, _royalties);
        LibPart.Part[] memory _royalties = new LibPart.Part[](1);
        _royalties[0].value = _percentageBasisPoints;
        _royalties[0].account = _royaltiesRecepientAddress;
        _saveRoyalties(_tokenId, _royalties);
    }
    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721) returns (bool){
        if(interfaceId == LibRoyaltiesV2._INTERFACE_ID_ROYALTIES) {
            return true;
        }
        if(interfaceId == _INTERFACE_ID_ERC2981) {
            return true;
        }
        return super.supportsInterface(interfaceId);
    }
    function royaltyInfo(uint256 _tokenId, uint256 _salePrice) external view returns (address receiver,uint256 royaltyAmount){
        LibPart.Part[] memory _royalties = royalties[_tokenId];
        if(_royalties.length > 0){
            return(_royalties[0].account,(_salePrice * _royalties[0].value / 10000));
        }
        return (address(0),0);
    }
    function _baseURI() internal view virtual override returns (string memory) {
        return "https://nft.tea/metadata/";
    }
}