var WithAdjustableMetadata = artifacts.require("WithAdjustableMetadata")

const EVMRevert = require('zeppelin-solidity/test/helpers/EVMRevert');

require('chai')
    .use(require('chai-as-promised'))
    .should();

contract('WithAdjustableMetadata', function([owner, accounts]) {
    const NAME = "Adjustable Thing";
    const DESCRIPTION = "Just an adjustable thing";
    const META = "<null>";

    beforeEach(async function(){
        this.metaInstance = await WithAdjustableMetadata.new(NAME, DESCRIPTION, META);        
    });

    it('should allow owner to change the name', async function() {
        this.metaInstance.exist;
        const other = accounts[2];

        await this.metaInstance.adjustName({ from: other })
            .should.be.rejectedWith(EVMRevert);
    });

    // it('should return the correct name of the instance', async function() {
    //     this.metaInstance.should.exist;

    //     const returnedName = await this.metaInstance.name();
    //     returnedName.should.be.equal(NAME);
    // });

    // it('should return the correct description of the instance', async function() {
    //     this.metaInstance.should.exist;

    //     const returnedDescription = await this.metaInstance.description();
    //     returnedDescription.should.be.equal(DESCRIPTION);
    // });

    // it('should return the correct instance metadata', async function() {
    //     this.metaInstance.should.exist;

    //     const returnedMetadata = await this.metaInstance.metadata();
    //     returnedMetadata.should.be.equal(META);
    // });
});