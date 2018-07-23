var Writ = artifacts.require('Writ');

const expectEvent = require('zeppelin-solidity/test/helpers/expectEvent');
const EVMRevert = require('zeppelin-solidity/test/helpers/EVMRevert');

const BigNumber = web3.BigNumber;

require('chai')
    .use(require('chai-as-promised'))
    .use(require('chai-bignumber')(BigNumber))
    .should();

contract('Writ', function([owner, _, other]) {
    const START_VERSION = 0;
    const NAME = "Writ";
    const DESCRIPTION = "Stuff written";
    const META = "<null>";
    const DATA = "<PLACEHOLDER>";

    before(async function(){
        this.writContract =
            await Writ.new(NAME, DESCRIPTION, META, DATA);
    });

    it('should start from version 0', async function() {
        (await this.writContract.version())
            .should.be.bignumber.equal(START_VERSION);
    });

    it('should return data', async function(){
        (await this.writContract.data())
            .should.be.equal(DATA);
    });

    it('should let owner update the writ', async function(){
        const UPDATED_DATA = "<UPDATED_PLACHEOLDER>";
        await this.writContract.update(UPDATED_DATA, { from: owner });
    });

    it('should emit an event on update', async function() {
        const UPDATED_DATA = "<UPDATED_PLACHEOLDER_2>";
        const receipt = await this.writContract.update(UPDATED_DATA, { from: owner });

        const event = await expectEvent.inLogs(receipt.logs, 'WritUpdated');
        // Updated twice so far:
        event.args.newVersion.should.be.bignumber.equal(START_VERSION + 2);
        event.args.data.should.be.equal(UPDATED_DATA);
    });

    it('should not let other accounts update the writ', async function(){
        await this.writContract.update(DATA, { from: other })
            .should.be.rejectedWith(EVMRevert);
    });
});