pragma solidity ^0.4.24;

import "./WithAdjustableMetadata.sol";

contract Writ is WithAdjustableMetadata {
    struct WritStruct {
        uint32 version;
        string data;
    }

    event WritUpdated(uint32 newVersion, string data);

    WritStruct writ;

    constructor(
        string _name,
        string _description,
        string _metadata,
        string _data
    )
        public
        WithAdjustableMetadata(_name, _description, _metadata)
    {
        // Versioning starts at 0:
        writ = WritStruct(0, _data);
    }

    function version()
        public
        view
        returns (uint32)
    {
        return writ.version;
    }

    function data()
        public
        view
        returns (string)
    {
        return writ.data;
    }

    function update(
        string _data
    )
        public
        onlyOwner
        returns (uint32)
    {
        writ.data = _data;
        writ.version++;

        emit WritUpdated(writ.version, writ.data);
        return writ.version;
    }
}