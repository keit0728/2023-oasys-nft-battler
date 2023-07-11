// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

/// @title IBattle
/// @author keit (@keitEngineer)
/// @dev This is an interface of Battle.
interface IBattle {
  // --------------------------------------------------
  // Struct
  // --------------------------------------------------

  struct Battle {
    string title;
    string description;
    address[] availableNFTs;
    uint32 maxParticipantCount;
    address[] participantNFTs;
    uint256[] participantTokenIds;
    bool closed;
  }

  // --------------------------------------------------
  // Event
  // --------------------------------------------------

  // --------------------------------------------------
  // Initialize
  // --------------------------------------------------

  /// @dev Initialize
  function initialize() external;

  // --------------------------------------------------
  // Getter
  // --------------------------------------------------

  /// @dev Get _availableNFTs
  /// @return returnValue _availableNFTs
  function getAvailableNFTs()
    external
    view
    returns (address[] memory returnValue);

  /// @dev Get _totalBattle
  /// @return returnValue _totalBattle
  function getTotalBattle() external view returns (uint256 returnValue);

  /// @dev Get battles
  /// @param battleIds battleIds
  /// @return returnValue battles
  function getBattles(
    uint256[] memory battleIds
  ) external view returns (Battle[] memory returnValue);

  // --------------------------------------------------
  // Setter
  // --------------------------------------------------

  /// @dev Add availableNFT
  /// @param nft nft
  function addAvailableNFT(address nft) external;

  /// @dev Remove availableNFT
  /// @param nft nft
  function removeAvailableNFT(address nft) external;

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
  ) external;

  /// @dev Join battle
  /// @param battleId battleId
  /// @param participantNFT participantNFT
  /// @param participantTokenId participantTokenId
  function join(
    uint256 battleId,
    address participantNFT,
    uint256 participantTokenId
  ) external;
}
