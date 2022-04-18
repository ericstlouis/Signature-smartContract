const { expect } = require("chai");
const { ethers } = require("hardhat");


describe("Signature contract", function () {
  let Signature, SigContract , alice, bob, messageHash, onchainETHSig, bobSig; 

  beforeEach(async () => {
      Signature = await hre.ethers.getContractFactory('Signature');
      SigContract = await Signature.deploy();
      [alice, bob] = await ethers.getSigners();

       messageHash = await SigContract.getMessageHash(
        bob.address,
        123,
        'wagmi',
        1
      );
      // console.log("messageHash:" + messageHash)

      onchainETHSig = await SigContract.getEthSignedMessageHash(messageHash);
      // console.log("on chain sig:" + onchainETHSig)

      bobSig = await bob.signMessage(ethers.utils.arrayify(messageHash));
      // console.log("off chain sig:" + bobSig)

    // console.log('alice: %s \n bob: %s', alice.address, bob.address);
  });

  describe('Recovering signer', function () {
    it("The recovered address should be equal to _to(bob) address", async () => {
      const recover = await SigContract.recoverSigner(onchainETHSig, bobSig);
      // console.log(recover);
      expect(recover).to.equal(bob.address);
    })

     it('should fail if alice sign the message instead of bob', async () => {
       const aliceSig = await alice.signMessage(ethers.utils.arrayify(messageHash));
       const recover = await SigContract.recoverSigner(onchainETHSig, aliceSig);
       // console.log(recover);
       expect(recover).to.not.equal(bob.address);
     });
  })

  describe("Verifying signer", function() {
    it('Verify function should equal true', async () => {
       const bobSig = await bob.signMessage(ethers.utils.arrayify(messageHash));
      const recover = await SigContract.recoverSigner(onchainETHSig, bobSig);
      const verify = await SigContract.verify(recover, 
        bob.address, 
        123, 
        'wagmi', 
        1, 
        bobSig)
      expect(verify).to.equal(true)
    });

    it('Verify function should equal false, if the message has been tampered with', async () => {
      const bobSig = await bob.signMessage(
        ethers.utils.arrayify(messageHash)
      );
      const recover = await SigContract.recoverSigner(onchainETHSig, bobSig);
      const verify = await SigContract.verify(
        recover,
        bob.address,
        123,
        'ngmi',
        1,
        bobSig
      );
      expect(verify).to.equal(false);
    });
  })
});
















