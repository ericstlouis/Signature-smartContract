const { ethers } = require("hardhat");
const hre = require("hardhat");

async function main() {
  const Signature = await hre.ethers.getContractFactory("Signature");
  const SigContract = await Signature.deploy();
  const alice = await ethers.getSigner()

  await SigContract.deployed();

  console.log("MultiSignature deployed to:", SigContract.address);

  const messageHash = await SigContract.getMessageHash(
    alice.address,
    123,
    'hello world',
    1
  );
  console.log(messageHash);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

