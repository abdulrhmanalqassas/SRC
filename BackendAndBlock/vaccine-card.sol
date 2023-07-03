pragma solidity >=0.4.21;
// import library file
contract vaccineRecords {
  // enum type variable to store user gender

  // Actual user object which we will store
  struct vaccine{
    string id_code;
    bool is_vaccinated;
  }
  // vaccine object
  vaccine vaccine_obj;



  // set user public function
  // This is similar to persisting object in db.
  function setVaccine(string memory  id_code, bool is_vaccinated) public {
    vaccine_obj = vaccine({id_code:id_code, is_vaccinated: is_vaccinated});
  }

  // get user public function
  // This is similar to getting object from db.
  function getVaccine() public returns (string memory , bool) {
    return (vaccine_obj.id_code, vaccine_obj.is_vaccinated);
  }

}