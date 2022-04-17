// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.9.0;

/// @title multi signature 
/// @notice signing messages offchain and verfing onChain

contract Signature {

    /// @notice Hash a message from the multisig with the following params: 
    /// @param _to the ethereum account the message is going to
    /// @param _amount the random of something
    /// @param _message the message being sent and being hash
    /// @param _nonce the number of transaction sent
    function getMessageHash(
        address _to,
        uint _amount,
        string memory _message,
        uint _nonce
    ) public pure returns (bytes32) {
        return keccak256(abi.encodePacked(_to, _amount, _message, _nonce));
    }

    /// @notice hash the message with ethereum standred prefix, this is to mimic the off chain signature
    /// @param _messageHash the message hash
    /// @dev "\x19Ethereum Signed Message:\n32" by adding this prefix it generates the ethereum specific signature
    function getEthSignedMessageHash(bytes32 _messageHash)
        public
        pure
        returns (bytes32)
    {
        return
            keccak256(
                abi.encodePacked("\x19Ethereum Signed Message:\n32", _messageHash)
            );
    }

    /// @notice to verfiy that the offchain signature is sign by the same address as the onchain signature
    /// @param _signer the signer address return by getEthSignedMessgaeHash
    /// @param _to the address of who the message is for
    /// @param _amount a random amount of something
    /// @param _message the message being to the _to
    /// @param _nonce the number of transaction
    /// @param signature the offchain signature
    function verify(
        address _signer,
        address _to,
        uint _amount,
        string memory _message,
        uint _nonce,
        bytes memory signature
    ) public pure returns (bool) {
        bytes32 messageHash = getMessageHash(_to, _amount, _message, _nonce);
        bytes32 ethSignedMessageHash = getEthSignedMessageHash(messageHash);

        return recoverSigner(ethSignedMessageHash, signature) == _signer;
    }

    /// @notice returns the address of the signer
    /// @param _ethSignedMessageHash the onchain signature 
    /// @param _signature the offchain signature signed by metamask(wallet)
    function recoverSigner(bytes32 _ethSignedMessageHash, bytes memory _signature)
        public
        pure
        returns (address)
    {
        (bytes32 r, bytes32 s, uint8 v) = splitSignature(_signature);

        return ecrecover(_ethSignedMessageHash, v, r, s);
    }


    /// @notice split signature
    /// @param sig the offchain signature
    function splitSignature(bytes memory sig)
        public
        pure
        returns (
            bytes32 r,
            bytes32 s,
            uint8 v
        )
    {
        require(sig.length == 65, "invalid signature length");

        assembly {
            r := mload(add(sig, 32))
            s := mload(add(sig, 64))
            v := byte(0, mload(add(sig, 96)))
        }
    }
}
