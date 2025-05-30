async function main() {
  const Market = await ethers.getContractFactory("NftMarketplace");
  const market = await Market.deploy();
  await market.deployed();

  console.log("Marketplace deployed to:", market.address);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});async function main() {
  const Market = await ethers.getContractFactory("NftMarketplace");
  const market = await Market.deploy();
  await market.deployed();

  console.log("Marketplace deployed to:", market.address);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});