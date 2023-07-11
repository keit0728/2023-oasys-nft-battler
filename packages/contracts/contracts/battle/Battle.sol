// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {AccessControlEnumerableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/AccessControlEnumerableUpgradeable.sol";
import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import {UUPSUpgradeable} from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

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
  mapping(uint256 => uint256[]) private _participanttokenIdsMap;

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
  modifier onlyAvailableNFT(address[] memory nfts) {
    uint256 length = nfts.length;
    require(length != 0, "Battle: nfts is empty");
    for (uint i; i < length; ) {
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
    for (uint i; i < length; ) {
      uint256 battleId = battleIds[i];
      require(battleId < _totalBattle, "Battle: battleId is out of range");
      returnValue[i] = Battle(
        _titleMap[battleId],
        _descriptionMap[battleId],
        _availableNFTsMap[battleId],
        _maxParticipantCountMap[battleId],
        _participantNFTsMap[battleId],
        _participanttokenIdsMap[battleId],
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
  ) external onlyAvailableNFT(availableNFTs) {
    _titleMap[_totalBattle] = title;
    _descriptionMap[_totalBattle] = description;
    _availableNFTsMap[_totalBattle] = availableNFTs;
    _maxParticipantCountMap[_totalBattle] = maxParticipantCount;
    _totalBattle++;
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