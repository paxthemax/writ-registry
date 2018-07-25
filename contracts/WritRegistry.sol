pragma solidity ^0.4.24;

import "./WithAdjustableMetadata.sol";
import "./Writ.sol";

contract WritRegistry is WithAdjustableMetadata {
    mapping(address => address[]) public ownerToWritContracts;
    uint256 public writContractCnt;

    event WritContractCreated(address _address);

    constructor(
        string _name,
        string _description,
        string _metadata
    )
        public
        WithAdjustableMetadata(_name, _description, _metadata)
    {

    }

    function createWrit(
        string _name,
        string _description,
        string _metadata,
        string _data
    )
        public
        returns (uint256 index)
    {
        address newContract = new Writ(_name, _description, _metadata, _data);
        writContractCnt++;
        return ownerToWritContracts[msg.sender].push(newContract) - 1;
    }

    function getWrits(
        address _owner
    )
        public
        view
        returns (address[])
    {
        return ownerToWritContracts[_owner];
    }

}