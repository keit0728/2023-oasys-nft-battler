// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {AccessControlEnumerableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/AccessControlEnumerableUpgradeable.sol";
import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import {UUPSUpgradeable} from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import {ERC721Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";

import {IBattle} from "./IBattle.sol";

contract Battle is
  Initializable,
  IBattle,
  AccessControlEnumerableUpgradeable,
  UUPSUpgradeable
{
  // --------------------------------------------------
  // State
  // --------------------------------------------------

  /// @custom:oz-renamed-from UPGRADER_ROLE
  bytes32 public constant UPGRADER_ROLE = keccak256("UPGRADER_ROLE");

  /// @custom:oz-renamed-from GAME_ROLE
  bytes32 public constant GAME_ROLE = keccak256("GAME_ROLE");

  /// @custom:oz-renamed-from _availableNFTs
  address[] private _availableNFTs;

  // key -> nft
  /// @custom:oz-renamed-from _availableNFTsIndexMap
  mapping(address => uint256) private _availableNFTsIndexMap;

  // key -> nft
  /// @custom:oz-renamed-from _availableNFTMap
  mapping(address => bool) private _availableNFTMap;

  /// @custom:oz-renamed-from _totalBattle
  uint256 private _totalBattle;

  // key -> battleId
  /// @custom:oz-renamed-from _titleMap
  mapping(uint256 => string) private _titleMap;

  // key -> battleId
  /// @custom:oz-renamed-from _descriptionMap
  mapping(uint256 => string) private _descriptionMap;

  // key -> battleId
  /// @custom:oz-renamed-from _availableNFTsMap
  mapping(uint256 => address[]) private _availableNFTsMap;

  // key -> battleId
  /// @custom:oz-renamed-from _maxParticipantCountMap
  mapping(uint256 => uint32) private _maxParticipantCountMap;

  // key -> battleId
  /// @custom:oz-renamed-from _participantNFTsMap
  mapping(uint256 => address[]) private _participantNFTsMap;

  // key -> battleId
  /// @custom:oz-renamed-from _participanttokenIdsMap
  mapping(uint256 => uint256[]) private _participantTokenIdsMap;

  // key -> battleId
  /// @custom:oz-renamed-from _closedMap
  mapping(uint256 => bool) private _closedMap;

  // --------------------------------------------------
  // Initialize
  // --------------------------------------------------

  /// @dev Constructor
  /// @custom:oz-upgrades-unsafe-allow constructor
  constructor() {
    _disableInitializers();
  }

  /// @dev Initialize
  function initialize() public initializer {
    __AccessControlEnumerable_init();
    __UUPSUpgradeable_init();

    _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    _grantRole(UPGRADER_ROLE, msg.sender);
    _grantRole(GAME_ROLE, msg.sender);
  }

  // --------------------------------------------------
  // Modifier
  // --------------------------------------------------

  /// @dev onlyAvailableNFT
  /// @param nft nft
  modifier onlyAvailableNFT(address nft) {
    require(_availableNFTMap[nft], "Battle: nft is not available");
    _;
  }

  /// @dev onlyAvailableNFTs
  /// @param nfts nfts
  modifier onlyAvailableNFTs(address[] memory nfts) {
    uint256 length = nfts.length;
    require(length != 0, "Battle: nfts is empty");
    for (uint256 i; i < length; ) {
      require(_availableNFTMap[nfts[i]], "Battle: nft is not available");
      unchecked {
        ++i;
      }
    }
    _;
  }

  // --------------------------------------------------
  // Getter
  // --------------------------------------------------

  /// @dev Get _availableNFTs
  /// @return returnValue _availableNFTs
  function getAvailableNFTs()
    external
    view
    returns (address[] memory returnValue)
  {
    returnValue = _availableNFTs;
  }

  /// @dev Get _totalBattle
  /// @return returnValue _totalBattle
  function getTotalBattle() external view returns (uint256 returnValue) {
    returnValue = _totalBattle;
  }

  /// @dev Get battles
  /// @param battleIds battleIds
  /// @return returnValue battles
  function getBattles(
    uint256[] memory battleIds
  ) external view returns (Battle[] memory returnValue) {
    uint256 length = battleIds.length;
    returnValue = new Battle[](length);
    for (uint256 i; i < length; ) {
      uint256 battleId = battleIds[i];
      require(battleId < _totalBattle, "Battle: battleId is out of range");
      returnValue[i] = Battle(
        _titleMap[battleId],
        _descriptionMap[battleId],
        _availableNFTsMap[battleId],
        _maxParticipantCountMap[battleId],
        _participantNFTsMap[battleId],
        _participantTokenIdsMap[battleId],
        _closedMap[battleId]
      );
      unchecked {
        ++i;
      }
    }
  }

  // --------------------------------------------------
  // Setter
  // --------------------------------------------------

  /// @dev Add availableNFT
  /// @param nft nft
  function addAvailableNFT(address nft) external onlyRole(DEFAULT_ADMIN_ROLE) {
    require(!_availableNFTMap[nft], "Battle: nft is already available");
    _availableNFTMap[nft] = true;
    _availableNFTsIndexMap[nft] = _availableNFTs.length;
    _availableNFTs.push(nft);
  }

  /// @dev Remove availableNFT
  /// @param nft nft
  function removeAvailableNFT(
    address nft
  ) external onlyRole(DEFAULT_ADMIN_ROLE) {
    require(_availableNFTMap[nft], "Battle: nft is not available");
    _availableNFTMap[nft] = false;
    uint256 targetIndex = _availableNFTsIndexMap[nft]; // ターゲットのindexを取得
    address lastNFT = _availableNFTs[_availableNFTs.length - 1]; // 最後尾のNFTを取得
    if (nft != lastNFT) {
      _availableNFTs[targetIndex] = lastNFT; // ターゲットNFTを最後尾のNFTに上書き
      _availableNFTsIndexMap[lastNFT] = targetIndex; // 最後尾のNFTのindexを更新
    }
    _availableNFTs.pop(); // 最後尾のNFTを削除
    delete _availableNFTsIndexMap[nft]; // ターゲットNFTのindexを削除
  }

  // --------------------------------------------------
  // Main Logic
  // --------------------------------------------------

  /// @dev Create battle
  /// @param title title
  /// @param description description
  /// @param availableNFTs availableNFTs
  /// @param maxParticipantCount maxParticipantCount
  function create(
    string memory title,
    string memory description,
    address[] memory availableNFTs,
    uint32 maxParticipantCount
  ) external onlyAvailableNFTs(availableNFTs) {
    _titleMap[_totalBattle] = title;
    _descriptionMap[_totalBattle] = description;
    _availableNFTsMap[_totalBattle] = availableNFTs;
    _maxParticipantCountMap[_totalBattle] = maxParticipantCount;
    _totalBattle++;
  }

  /// @dev Join battle
  /// @param battleId battleId
  /// @param participantNFT participantNFT
  /// @param participantTokenId participantTokenId
  function join(
    uint256 battleId,
    address participantNFT,
    uint256 participantTokenId
  ) external onlyAvailableNFT(participantNFT) {
    // TODO: #17 同じアドレスはバトルに参加できないようにする
    require(battleId < _totalBattle, "Battle: battleId is out of range");
    uint256 length = _participantNFTsMap[battleId].length;
    require(
      length < _maxParticipantCountMap[battleId],
      "Battle: max participant count is reached"
    );
    ERC721Upgradeable nft = ERC721Upgradeable(participantNFT);
    require(
      nft.ownerOf(participantTokenId) == msg.sender,
      "Battle: msg.sender is not owner"
    );
    for (uint256 i; i < length; ) {
      if (_participantNFTsMap[battleId][i] == participantNFT) {
        require(
          _participantTokenIdsMap[battleId][i] != participantTokenId,
          "Battle: participant is already joined"
        );
      }
      unchecked {
        ++i;
      }
    }
    _participantNFTsMap[battleId].push(participantNFT);
    _participantTokenIdsMap[battleId].push(participantTokenId);
  }

  /// @dev getBatchTokenURI
  /// @param battleId battleId
  function getBatchTokenURI(
    uint256 battleId
  )
    external
    view
    returns (
      string[] memory tokenURIs,
      address[] memory participantNFTs,
      uint256[] memory participantTokenIds
    )
  {
    participantNFTs = _participantNFTsMap[battleId];
    participantTokenIds = _participantTokenIdsMap[battleId];
    uint256 length = participantNFTs.length;
    tokenURIs = new string[](length);
    for (uint256 i; i < length; ) {
      ERC721Upgradeable nft = ERC721Upgradeable(participantNFTs[i]);
      tokenURIs[i] = nft.tokenURI(participantTokenIds[i]);
      unchecked {
        ++i;
      }
    }
  }

  // --------------------------------------------------
  // Internal
  // --------------------------------------------------

  /// @dev Authorize upgrade
  /// @param newImplementation new implementation address
  function _authorizeUpgrade(
    address newImplementation
  ) internal override onlyRole(UPGRADER_ROLE) {}
}
