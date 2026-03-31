// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./RightFlowWork.sol";

/**
 * @title RightFlowFactory
 * @notice Factory contract for deploying RightFlowWork instances.
 *         Only RightFlow platform can register new works.
 *         Stores ISRC → contract address mapping for lookups.
 */
contract RightFlowFactory {

    address public owner;
    address public pendingOwner;

    // ISRC → contract address
    mapping(string => address) public workByISRC;

    // All deployed work contracts
    address[] public allWorks;

    // Authorised deployers (RightFlow backend wallets)
    mapping(address => bool) public deployers;

    // ── Events ────────────────────────────────────────────────────────────────

    event WorkRegistered(
        string  indexed isrc,
        address indexed contractAddress,
        string  title,
        address registeredBy,
        uint256 timestamp
    );

    event DeployerUpdated(address indexed deployer, bool authorized);
    event OwnershipTransferInitiated(address indexed newOwner);
    event OwnershipTransferred(address indexed newOwner);

    // ── Constructor ───────────────────────────────────────────────────────────

    constructor() {
        owner = msg.sender;
        deployers[msg.sender] = true;
    }

    // ── Modifiers ─────────────────────────────────────────────────────────────

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    modifier onlyDeployer() {
        require(deployers[msg.sender], "Not authorized deployer");
        _;
    }

    // ── Work registration ─────────────────────────────────────────────────────

    /**
     * @notice Register a new musical work on-chain.
     * @dev Deploys a new RightFlowWork contract and maps ISRC to it.
     */
    function registerWork(
        string memory title,
        string memory isrc,
        string memory iswc,
        uint8 territory,
        address[] memory wallets,
        string[] memory names,
        uint8[] memory percentages,
        RightFlowWork.RightType[] memory rightTypes
    ) external onlyDeployer returns (address) {
        require(bytes(isrc).length > 0, "ISRC required");
        require(workByISRC[isrc] == address(0), "ISRC already registered");

        RightFlowWork work = new RightFlowWork(
            title,
            isrc,
            iswc,
            territory,
            wallets,
            names,
            percentages,
            rightTypes
        );

        address workAddr = address(work);
        workByISRC[isrc] = workAddr;
        allWorks.push(workAddr);

        emit WorkRegistered(isrc, workAddr, title, msg.sender, block.timestamp);
        return workAddr;
    }

    // ── Bulk distribution ─────────────────────────────────────────────────────

    /**
     * @notice Trigger distribution for multiple works at once.
     *         Used by RightFlow backend for quarterly cycle processing.
     * @param isrcs Array of ISRCs to distribute to
     * @param amounts Array of amounts in wei for each work
     * @param sourceType Type of source (STREAMING, RADIO, etc.)
     */
    function distributeMultiple(
        string[] calldata isrcs,
        uint256[] calldata amounts,
        string calldata sourceType
    ) external payable onlyDeployer {
        require(isrcs.length == amounts.length, "Length mismatch");

        uint256 total = 0;
        for (uint i = 0; i < amounts.length; i++) total += amounts[i];
        require(msg.value >= total, "Insufficient value");

        for (uint i = 0; i < isrcs.length; i++) {
            address workAddr = workByISRC[isrcs[i]];
            if (workAddr == address(0) || amounts[i] == 0) continue;

            RightFlowWork(payable(workAddr)).distribute{value: amounts[i]}(sourceType);
        }
    }

    // ── View ──────────────────────────────────────────────────────────────────

    function getWorkCount() external view returns (uint256) {
        return allWorks.length;
    }

    function getWorksByRange(uint256 from, uint256 to) external view returns (address[] memory) {
        require(to <= allWorks.length, "Out of range");
        address[] memory result = new address[](to - from);
        for (uint i = from; i < to; i++) {
            result[i - from] = allWorks[i];
        }
        return result;
    }

    // ── Admin ─────────────────────────────────────────────────────────────────

    function setDeployer(address deployer, bool authorized) external onlyOwner {
        deployers[deployer] = authorized;
        emit DeployerUpdated(deployer, authorized);
    }

    function initiateOwnershipTransfer(address newOwner) external onlyOwner {
        pendingOwner = newOwner;
        emit OwnershipTransferInitiated(newOwner);
    }

    function acceptOwnership() external {
        require(msg.sender == pendingOwner, "Not pending owner");
        owner = pendingOwner;
        pendingOwner = address(0);
        emit OwnershipTransferred(owner);
    }
}
