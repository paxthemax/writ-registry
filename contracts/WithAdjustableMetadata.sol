pragma solidity ^0.4.24;

import "./WithMetadata.sol";

import "zeppelin-solidity/contracts/ownership/Ownable.sol";

contract WithAdjustableMetadata is Ownable, WithMetadata {

    event AdjustedName(string name);
    event AdjustedDescription(string description);
    event AdjustedMetadata(string metadata);

    constructor(
        string _name,
        string _description,
        string _metadata
    )
        public
        WithMetadata(_name, _description, _metadata)
    {

    }

    function adjustName(string _name) 
        public
        onlyOwner
    {
        name = _name;
        emit AdjustedName(_name);
    }

    function adjustDescription(string _description) 
        public
        onlyOwner
    {
        description = _description;
        emit AdjustedDescription(_description);
    }

    function adjustMetadata(string _metadata)
        public
        onlyOwner
    {
        metadata = _metadata;
        emit AdjustedMetadata(_metadata);
    }
}