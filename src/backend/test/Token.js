const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Token contract", () => {
  let Token, token, owner, addr1, addr2;

  beforeEach(async () => {
    Token = await ethers.getContractFactory("Token");
    [owner, addr1, addr2, _] = await ethers.getSigners();
    token = await Token.deploy();
  });

  describe("Deployment", () => {
    it("should set the right owner", async () => {
      expect(await token.owner()).to.equal(owner.address);
    });

    it('should assign the total supply of tokens to the owner', async () => {
      const ownerBalance = await token.balanceOf(owner.address);
      expect(await token.totalSupply()).to.equal(ownerBalance);
    })
  });

  describe("Transactions", () => {
    it.only('should transfer token between accounts', async () => {
      await token.transfer(addr1.address, 50);
      const addr1Balance = await token.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(50);

      await token.connect(addr1).transfer(addr2.address, 10);
      const addr2Balance = await token.balanceOf(addr2.address);
      expect(addr2Balance).to.equal(10);
    });

    it('should fail if sender does not have enough tokens', async () => {
      const initialOwnerBalance = await token.balanceOf(owner.address);

      await expect(
        token
        .connect(addr1)
        .transfer(owner.address, 1)
      ).to.be.revertedWith("Cannot send more tokens than what you have");

      expect(
        await token.balanceOf(owner.address)
      ).to.equal(initialOwnerBalance);
    });

    it('should update balances after transfers has been successful', async () => {
      const initialOwnerBalance = await token.balanceOf(owner.address);
      await token.transfer(addr1.address, 100);
      await token.transfer(addr2.addr2, 50);
      
      const finalOwnerBalance = await token.balanceOf(owner.address);
      expect(finalOwnerBalance).to.equal(initialOwnerBalance - 150);

      const addr1Balance = await token.balanceOf(addr1.address);
      const addr2Balance = await token.balanceOf(addr2.address);

      expect(addr1Balance).to.equal(100);
      expect(addr2Balance).to.equal(50);
    })
  })
})