// contracts/GameItem.sol
// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;
// import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Asset is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    uint256 public value;
    mapping(address => uint256[]) public ownerTokens;

    event TokenEmitted(string indexed symbol, address _sender, uint256 _id);

    constructor() ERC721("NextFrame", "NXF") {
        value = 0;
    }

    function mintAsset(string memory _tokenURI) public returns (uint256) {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, _tokenURI);
        ownerTokens[msg.sender].push(newItemId);

        emit TokenEmitted(symbol(), msg.sender, newItemId);

        return newItemId;
    }

    function getTotalAssets() public view returns (uint256) {
        return _tokenIds.current();
    }

    function getAllTokenURIs() public view returns (string[] memory) {
        string[] memory tokenURIs = new string[](getTotalAssets());
        for (uint256 i = 0; i < getTotalAssets(); i++) {
            tokenURIs[i] = tokenURI(i + 1);
        }
        return tokenURIs;
    }

    function getOwnedTokens() public view returns (uint256[] memory) {
        uint256[] memory ret = ownerTokens[msg.sender];
        return ret;
    }

    function getOwnedTokensURIs() public view returns (string[] memory) {
        uint256[] memory ret = ownerTokens[msg.sender];
        string[] memory tokenURIs = new string[](ret.length);
        for (uint256 i = 0; i < ret.length; i++) {
            tokenURIs[i] = tokenURI(ret[i]);
        }
        return tokenURIs;
    }

    // function _beforeTokenTransfer(
    //     address, /*from*/
    //     address to,
    //     uint256 /*tokenId*/
    // ) internal override {
    //     _changeReceiver(to);
    // }
}
