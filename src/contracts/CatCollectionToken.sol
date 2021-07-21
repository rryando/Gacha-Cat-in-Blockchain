pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

contract CatCollectionToken {
    string public name;
    uint public issuedCat = 0;
    // address[] public collectionOwner;

    // mapping(address => CatCollection) public catCollection;
    mapping(string => CatCollection) public catCollection;
    mapping(address => CatCollection[]) public catCollectionByOwner;

    struct CatCollection {
        string id;
        string imgUrl;
        string description;
        string catName;
        uint tipAmount;
        // CatStatus status;
        address payable owner;
    }

    // struct CatStatus {
    //   uint adaptability;
    //   uint affectionLevel;
    //   uint rarity;
    //   uint socialNeeds;
    //   uint stangerFriendly;
    // }

    event CatIssued(
        string id,
        string imgUrl,
        string description,
        string catName,
        uint tipAmount,
        // CatStatus status,
        address payable owner
    );

    event CatTipped(
        string id,
        uint tipAmount,
        address payable owner
    );

    constructor() public {
        name = "Gacha Cat Collection";
    }

    function createCat(string memory id, string memory imgUrl, string memory description, string memory catName) public {
        // Require valid content
        require(bytes(id).length > 0);
        // Increment the post count
        issuedCat ++;
        // Create the post
        catCollection[id] = CatCollection(id, imgUrl, description, catName, 0, msg.sender);
        catCollectionByOwner[msg.sender].push(CatCollection(id, imgUrl, description, catName, 0, msg.sender));
        // collectionOwner[msg.sender].push(catCollection[id]);
        // Trigger event
        emit CatIssued(id, imgUrl, description, catName, 0, msg.sender);
    }

    function getCollectionByOwner(address _owner) public view returns(CatCollection[] memory){
      CatCollection[] memory temp = new CatCollection[](catCollectionByOwner[_owner].length);
      for (uint i = 0; i<catCollectionByOwner[_owner].length; i++) {
        // return catCollectionByOwner[_owner][i]; 
        temp[i] = catCollectionByOwner[_owner][i]; 
      }

      return (temp);
    }

    function tipCat(string memory _id) public payable {
        // Make sure the id is valid
        require(bytes(_id).length > 0);
        // Fetch the post
        CatCollection memory _catCollection = catCollection[_id];
        // Fetch the author
        address payable _owner = _catCollection.owner;
        // Pay the author by sending them Ether
        address(_owner).transfer(msg.value);
        // Incremet the tip amount
        _catCollection.tipAmount = _catCollection.tipAmount + msg.value;
        // Update the post
        catCollection[_id] = _catCollection;
        // Trigger an event
        emit CatTipped(_id, _catCollection.tipAmount, _owner);
    }
}