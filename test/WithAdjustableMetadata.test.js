var WithAdjustableMetadata = artifacts.require("WithAdjustableMetadata")

const EVMRevert = require('zeppelin-solidity/test/helpers/EVMRevert');

require('chai')
    .use(require('chai-as-promised'))
    .should();

contract('WithAdjustableMetadata', function([owner, accounts]) {

    const NAME = "Adjustable Thing";
    const NEW_NAME = "Changed name";
    const DESCRIPTION = "Just an adjustable thing";
    const NEW_DESCRIPTION = "Changed description";
    const META = "<null>";
    const NEW_META = "Changed meta";

    beforeEach(async function(){
        this.metaInstance = await WithAdjustableMetadata.new(NAME, DESCRIPTION, META);        
    });

    it('should allow the owner to change the name', async function() {
        this.metaInstance.exist;

        await this.metaInstance.adjustName(NEW_NAME, { from: owner });
        const ret = await this.metaInstance.name();
        ret.should.be.equal(NEW_NAME);
    });

    it('should not allow anyone other than owner to change the name', async function() {
        this.metaInstance.exist;
        const other = accounts[2];

        await this.metaInstance.adjustName({ from: other })
            .should.be.rejectedWith(EVMRevert);
    });

    it('should allow the owner to change the description', async function() {
        this.metaInstance.exist;

        await this.metaInstance.adjustDescription(NEW_DESCRIPTION, { from: owner });
        const ret = await this.metaInstance.description();
        ret.should.be.equal(NEW_DESCRIPTION);
    });

    it('should not allow anyone other than owner to change the description', async function() {
        this.metaInstance.exist;
        const other = accounts[2];

        await this.metaInstance.adjustDescription({ from: other })
            .should.be.rejectedWith(EVMRevert);
    });

    it('should allow the owner to change the metadata', async function() {
        this.metaInstance.exist;

        const newName =
            await this.metaInstance.adjustMetadata(NEW_META, { from: owner });

        const ret = await this.metaInstance.metadata();
        ret.should.be.equal(NEW_META);
    });

    it('should not allow anyone other than owner to change the metadata', async function() {
        this.metaInstance.exist;
        const other = accounts[2];

        await this.metaInstance.adjustMetadata({ from: other })
            .should.be.rejectedWith(EVMRevert);
    });
});