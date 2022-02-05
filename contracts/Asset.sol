// contracts/GameItem.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721URIStorageUpgradeable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Asset is Initializable, ERC721URIStorageUpgradeable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    event TokenEmitted(string indexed symbol, address _sender, uint256 _id);

    function initialize() public initializer {
        __ERC721_init("NextFrame", "NXF");
    }

    function mintAsset(string memory _tokenURI) public returns (uint256) {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, _tokenURI);

        emit TokenEmitted(symbol(), msg.sender, newItemId);

        return newItemId;
    }
}
