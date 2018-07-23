var WithMetadata = artifacts.require("WithMetadata")

require('chai')
    .use(require('chai-as-promised'))
    .should();

contract('WithMetadata', function() {
    const NAME = "Thing";
    const DESCRIPTION = "Just a thing";
    const META = "<null>";

    before(async function(){
        this.metaInstance = await WithMetadata.new(NAME, DESCRIPTION, META);
    });

    it('should be properly initialized', function() {
        this.metaInstance.should.exist;
    });

    it('should return the correct name of the instance', async function() {
        (await this.metaInstance.name()).should.be.equal(NAME);
    });

    it('should return the correct description of the instance', async function() {
        (await this.metaInstance.description()).should.be.equal(DESCRIPTION);
    });

    it('should return the correct instance metadata', async function() {
        (await this.metaInstance.metadata()).should.be.equal(META);
    });
});