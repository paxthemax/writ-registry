pragma solidity ^0.4.24;

import "./WithAdjustableMetadata.sol";

contract WritRegistry is WithAdjustableMetadata {

    address[] public writContracts;

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

}