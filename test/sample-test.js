const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Signature contract", function () {
  let Signature, SigContract

  beforeEach(async () => {
    const Signature = await hre.ethers.getContractFactory('Signature');
    const SigContract = await Signature.deploy();
    await SigContract.deployed();
  });

  describe('signature')
});

