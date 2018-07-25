var WritRegistry = artifacts.require('WritRegistry');
var Writ = artifacts.require('Writ');

const BigNumber = web3.BigNumber;

require('chai')
    .use(require('chai-as-promised'))
    .use(require('chai-bignumber')(BigNumber))
    .should();

contract('WritRegistry', function([owner]){
    const NAME = "Writ Registry";
    const DESCRIPTION = "Registry of stuff written";
    const META = "<null>";
    const WRIT_NAME = "Writ";
    const WRIT_DESCRIPTION = "Stuff written";
    const DATA = "<data>";

    before(async function(){
        this.regContract =
            await WritRegistry.new(NAME, DESCRIPTION, META);    
    });

    it('should properly construct the registry contract', async function(){
        this.regContract.should.exist;
        (await this.regContract.writContractCnt()).should.be.bignumber.equal(0);
    });

    it('should return the right index when creating a writ', async function(){
        // NOTE: call method returns, but does not update state.
        const cnt = (await this.regContract.getWrits(owner)).length;
        (await this.regContract.createWrit.call(
            WRIT_NAME, WRIT_DESCRIPTION, META, DATA, { from: owner }))
        .should.be.bignumber.equal(cnt);
    });

    it('should create a writ contract', async function(){
        await this.regContract.createWrit(
            WRIT_NAME, WRIT_DESCRIPTION, META, DATA, { from: owner });

        const writs = await this.regContract.getWrits(owner);
        writs.length.should.be.bignumber.equal(1);
        Writ.at(writs[0]).should.be.ok;
    });

    it('should return the right number of writs', async function() {
        (await this.regContract.writContractCnt()).should.be.bignumber.equal(1);
    });
})