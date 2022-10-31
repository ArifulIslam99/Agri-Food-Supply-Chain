pragma solidity ^0.4.17;

contract requestFactory{
    
    address[] public deployedRequest;

    function createRequest() public{
        address newRequest = new AgriFoodContract(msg.sender);
        deployedRequest.push(newRequest);
    }

    function getDeployedRequest() public view returns (address[]){
        return deployedRequest;
    }
}


contract AgriFoodContract {

    struct Request{
        string productName;
        string description;
        uint price;
        string unit;
        bool approved;  
        bool sold;
        address buyer;
        address distributor;
        mapping(address => bool) importerRequest;
        mapping(address => bool) logisticReqest;
    }

    modifier restricted() {
    require(msg.sender == manager);
    _;
    }

    address public manager;
    Request[] public requests;
    address[] public logistics;
    address[] public importers;
    
    function AgriFoodContract(address creator) public {
        manager = creator;
    }
    
    function createInspectionRequest(string productName, string description, uint price, string unit) public restricted{

        Request memory newRequest = Request({
            productName: productName,
            description: description,
            price: price,
            unit: unit,
            approved: false,
            sold: false,
            distributor: 0x0,
            buyer: 0x0
        });

        requests.push(newRequest);
    }

    
    function approveInspectionRequest(uint index) public{
        Request storage request = requests[index];
        require(!request.approved);
        request.approved = true;
    }

    function logisticReqest(uint index) public payable{
         Request storage request = requests[index];
         require(!request.sold);
         require(!request.logisticReqest[msg.sender]);
         request.logisticReqest[msg.sender] = true;
         logistics.push(msg.sender);
    }

    function retailerRequest(uint index) public payable{
         Request storage request = requests[index];
         require(!request.sold);
         require(!request.importerRequest[msg.sender]);
         request.importerRequest[msg.sender] = true;
         importers.push(msg.sender);
         
    }

    function approveRetailerRequest(uint index,uint importerIndex, uint logisticIndex) public restricted{
         Request storage request = requests[index];
         require(!request.sold);
         request.sold = true;
         request.buyer = importers[importerIndex];
         request.distributor = logistics[logisticIndex];
    } 

    function getImporterRequestList() public view returns(address[]){
        return importers;
    }

        function getLogisticRequestList() public view returns(address[]){
        return logistics;
    }

    


}   