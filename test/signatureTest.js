const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Signature contract", function () {
  let Signature, SigContract , alice, bob; 

  beforeEach(async () => {
     const Signature = await hre.ethers.getContractFactory('Signature');
     const SigContract = await Signature.deploy();
    [alice, bob] = await ethers.getSigners();

    console.log('alice: %s \n bob: %s', alice.address, bob.address);
  });

  describe('Signature test', function () {
    it("off chain signature should match on chain signature", async () => {
      const messageHash = await .getMessageHash(
        alice.address,
        123,
        'hello world',
        1
      );
      console.log(messageHash)
    })
  })
});










