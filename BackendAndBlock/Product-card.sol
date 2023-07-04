pragma solidity >=0.4.21;
// import library file
contract productRecords {
  // enum type variable to store user gender

  // Actual user object which we will store
  struct product{
    string id_code;
    bool is_fake;
  }
  // vaccine object
  product product_obj;



  // set user public function
  // This is similar to persisting object in db.
  function setProduct(string memory  id_code, bool is_fake) public {
    product_obj = product({id_code:id_code, is_fake: is_fake});
  }

  // get user public function
  // This is similar to getting object from db.
  function getProduct() public view  returns (string memory , bool) {
    return (product_obj.id_code, product_obj.is_fake);
  }

  function getHello() public view  returns (string memory ) {
    return ("hi form here " );
  }
}