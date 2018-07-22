pragma solidity ^0.4.24;

contract WithMetadata {
    string public name;  // Name of the instance.
    string public description;  // Description of the instance.

    // Reserved for metadata (image, documentation). May reference
    // storage location (URL, IPFS hash, etc.)
    string public metadata;

    constructor(
        string _name,
        string _description,
        string _metadata
    ) 
        public
    {
        name = _name;
        description = _description;
        metadata = _metadata;
    }
}