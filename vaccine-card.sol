pragma solidity ^0.4.21;
// import library file
contract Vaccine {
  // enum type variable to store user gender

  // Actual user object which we will store
  struct user{
    string id_code;
    bool is_vaccinated;
  }
  // user object
  user user_obj;


  // set user public function
  // This is similar to persisting object in db.
  function setVaccine(string id_code, bool is_vaccinated) public {
    vaccine_obj = user({id_code:id_code, is_vaccinated: is_vaccinated});
  }

  // get user public function
  // This is similar to getting object from db.
  function getVaccine() public returns (string, bool) {
    return (user_obj.id_code, (user_obj.is_vaccinated));
  }
}