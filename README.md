# Verifying Signature
> A simple smart contract that verify signatures

This smart contract demonstrates a how to Sign and Verify. The Signature contract allows you to hash your message with other required parameters than you uses the hash message to sign your message off chain using ether.js. To **verify** the signature you must call _getEthSignedMessageHash_, **recover** the signer from signature and hash and then Compare recovered signer to claimed signer.


 Quick Start

required: [Node](https://nodejs.org/dist/latest-v12.x/) plus [Yarn](https://classic.yarnpkg.com/en/docs/install/) and [Git](https://git-scm.com/downloads)


```bash
git clone https://github.com/ericstlouis/Signature-smartContract.git

cd Signature-smartContract

git Signature-smartContract
```

```bash

yarn install

```

```bash

yarn hardhat test

```
