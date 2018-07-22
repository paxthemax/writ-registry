var WithMetadata = artifacts.require("WithMetadata")

require('chai')
    .use(require('chai-as-promised'))
    .should();

contract('WithMetadata', function() {
    const NAME = "Thing";
    const DESCRIPTION = "Just a thing";
    const META = "<null>";

    beforeEach(async function(){
        this.metaInstance = await WithMetadata.new(NAME, DESCRIPTION, META);
    })

    it('should return the correct name of the instance', async function() {
        this.metaInstance.should.exist;

        const returnedName = await this.metaInstance.name();
        returnedName.should.be.equal(NAME);
    });

    it('should return the correct description of the instance', async function() {
        this.metaInstance.should.exist;

        const returnedDescription = await this.metaInstance.description();
        returnedDescription.should.be.equal(DESCRIPTION);
    });

    it('should return the correct instance metadata', async function() {
        this.metaInstance.should.exist;

        const returnedMetadata = await this.metaInstance.metadata();
        returnedMetadata.should.be.equal(META);
    });
});