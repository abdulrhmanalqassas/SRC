const ConvertLib = artifacts.require("ConvertLib");
const MetaCoin = artifacts.require("MetaCoin");
const Products = artifacts.require("productRecords");
const Vaccine = artifacts.require("vaccineRecords");


module.exports = function(deployer) {
  deployer.deploy(ConvertLib);
  deployer.deploy(Products);
  deployer.deploy(Vaccine);
  deployer.link(ConvertLib, MetaCoin);
  deployer.deploy(MetaCoin);
};
