import { expect } from "chai";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { ethers } from "hardhat";
import { Reverter } from "@/test/helpers/reverter";
import { LamboLlama } from "@ethers-v5";

describe("LamboLlama", async () => {
  const reverter = new Reverter();

  let OWNER: SignerWithAddress;
  let DELEGATE: SignerWithAddress;
  let USER: SignerWithAddress;

  let lamboLlama: LamboLlama;

  before(async () => {
    [OWNER, DELEGATE, USER] = await ethers.getSigners();

    const LamboLlama = await ethers.getContractFactory("LamboLlama");
    const EndpointMock = await ethers.getContractFactory("EndpointMock");
    const lzEndpointMock = await EndpointMock.deploy();
    lamboLlama = await LamboLlama.deploy(DELEGATE.address, 100, lzEndpointMock.address);

    await reverter.snapshot();
  });

  afterEach(reverter.revert);

  describe.skip("test", async () => {
    it("check delegate address as owner", async () => {
      expect(await lamboLlama.owner()).to.equal(DELEGATE.address);
      expect(await lamboLlama.balanceOf(DELEGATE.address)).to.equal(100);
    });
  });
});
