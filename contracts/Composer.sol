// contracts/GameItem.sol
// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

import "./Asset.sol";

contract Composer is ERC721URIStorage {
    uint256 public value;
    Asset[] public assets;

    event TokenEmitted(string indexed symbol, address _sender, uint256 _id);

    constructor(Asset[] memory assetAddresses) ERC721("NextFrame", "NXF") {
        assets = assetAddresses;
        value = 0;
    }

    function mintAsset(string memory _tokenURI) public returns (uint256) {
        _mint(msg.sender, 1);
        _setTokenURI(1, _tokenURI);

        emit TokenEmitted(symbol(), msg.sender, 1);

        return 1;
    }

    // function _beforeTokenTransfer(
    //     address, /*from*/
    //     address to,
    //     uint256 /*tokenId*/
    // ) internal override {
    //     _changeReceiver(to);
    // }
}
