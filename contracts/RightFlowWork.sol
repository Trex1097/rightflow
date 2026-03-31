// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title RightFlowWork
 * @notice Smart contract representing a musical work on RightFlow.
 *         Stores immutable split percentages and handles automatic
 *         royalty distribution in MATIC or ERC-20 stablecoins.
 * @dev Deployed on Polygon for low gas fees (~$0.001 per tx)
 */
contract RightFlowWork {

    // ── Structs ───────────────────────────────────────────────────────────────

    enum RightType { DA, DV, BOTH }

    struct Recipient {
        address wallet;
        string  name;         // e.g. "Saad Lamjarred"
        uint8   percentage;   // 0-100, sum must = 100
        RightType rightType;
    }

    struct WorkMetadata {
        string title;
        string isrc;
        string iswc;
        uint8  territory;     // 0=MA, 1=DZ, 2=TN, 255=GLOBAL
        uint256 registeredAt;
        bool   active;
    }

    // ── State ─────────────────────────────────────────────────────────────────

    address public immutable platform;   // RightFlow multisig
    WorkMetadata public metadata;
    Recipient[] public recipients;
    uint256 public totalDistributed;

    // ── Events ────────────────────────────────────────────────────────────────

    event RightsDistributed(
        address indexed trigger,
        uint256 totalAmount,
        uint256 timestamp,
        string  sourceType   // "STREAMING", "RADIO", "PUBLIC", "SYNCHRO"
    );

    event RecipientPaid(
        address indexed recipient,
        string  name,
        uint256 amount,
        RightType rightType
    );

    event WorkDeactivated(address indexed by);

    // ── Constructor ───────────────────────────────────────────────────────────

    constructor(
        string memory _title,
        string memory _isrc,
        string memory _iswc,
        uint8  _territory,
        address[] memory _wallets,
        string[] memory _names,
        uint8[]  memory _percentages,
        RightType[] memory _rightTypes
    ) {
        require(_wallets.length == _names.length, "Length mismatch");
        require(_wallets.length == _percentages.length, "Length mismatch");
        require(_wallets.length == _rightTypes.length, "Length mismatch");

        // Validate splits sum to 100
        uint256 total = 0;
        for (uint i = 0; i < _percentages.length; i++) {
            total += _percentages[i];
        }
        require(total == 100, "Splits must sum to 100");

        platform = msg.sender;

        metadata = WorkMetadata({
            title: _title,
            isrc: _isrc,
            iswc: _iswc,
            territory: _territory,
            registeredAt: block.timestamp,
            active: true
        });

        for (uint i = 0; i < _wallets.length; i++) {
            require(_wallets[i] != address(0), "Invalid wallet");
            recipients.push(Recipient({
                wallet: _wallets[i],
                name: _names[i],
                percentage: _percentages[i],
                rightType: _rightTypes[i]
            }));
        }
    }

    // ── Distribution ──────────────────────────────────────────────────────────

    /**
     * @notice Distribute incoming MATIC to all recipients according to splits.
     * @param sourceType String identifier for tracking (e.g. "RADIO")
     */
    function distribute(string calldata sourceType) external payable {
        require(metadata.active, "Work is not active");
        require(msg.value > 0, "No value sent");

        uint256 remaining = msg.value;

        for (uint i = 0; i < recipients.length; i++) {
            Recipient memory r = recipients[i];

            // Platform fee recipient (percentage = 5, rightType = BOTH) gets exact amount
            uint256 share;
            if (i == recipients.length - 1) {
                // Last recipient gets remainder to avoid dust
                share = remaining;
            } else {
                share = (msg.value * r.percentage) / 100;
                remaining -= share;
            }

            if (share > 0) {
                (bool sent, ) = r.wallet.call{ value: share }("");
                require(sent, "Transfer failed");
                emit RecipientPaid(r.wallet, r.name, share, r.rightType);
            }
        }

        totalDistributed += msg.value;
        emit RightsDistributed(msg.sender, msg.value, block.timestamp, sourceType);
    }

    // ── View functions ────────────────────────────────────────────────────────

    function getRecipients() external view returns (Recipient[] memory) {
        return recipients;
    }

    function getRecipientCount() external view returns (uint256) {
        return recipients.length;
    }

    // ── Admin ─────────────────────────────────────────────────────────────────

    function deactivate() external {
        require(msg.sender == platform, "Only platform");
        metadata.active = false;
        emit WorkDeactivated(msg.sender);
    }

    // Safety: reject direct ETH sends without sourceType
    receive() external payable {
        revert("Use distribute()");
    }
}
