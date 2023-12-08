// helloworld.test.js

const { ethers } = require("ethers");
const { expect } = require("chai");

// Import the compiled artifacts of your smart contract
const HelloWorld = artifacts.require("HelloWorld");

describe("HelloWorld", function () {
  let HelloWorld;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async () => {
    [owner, addr1, addr2] = await ethers.getSigners();

    // Deploy the contract before each test
    const HelloWorldFactory = await ethers.ContractFactory("HelloWorld");
    HelloWorld = await HelloWorldFactory.connect(owner).deploy();
    await HelloWorld.deployed();
  });

  it("Should have a name and symbol", async function () {
    const name = await HelloWorld.name();
    const symbol = await HelloWorld.symbol();

    expect(name).to.equal("HelloWorld");
    expect(symbol).to.equal("MTK");
  });

  it("Should assign initial supply to the owner", async function () {
    const ownerBalance = await HelloWorld.balanceOf(owner.address);
    expect(ownerBalance).to.equal(1000000);
  });

  it("Should transfer tokens between accounts", async function () {
    await HelloWorld.transfer(addr1.address, 500);

    const addr1Balance = await HelloWorld.balanceOf(addr1.address);
    expect(addr1Balance).to.equal(500);

    const ownerBalance = await HelloWorld.balanceOf(owner.address);
    expect(ownerBalance).to.equal(999500);
  });

  // Add more tests as needed

});
