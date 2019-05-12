class User{

    constructor(FirstName, LastName, StreetAddress, PostalCode, City, DateOfBirth, PhoneNumber, EmailAddress, Password){
        this.FirstName = FirstName;
        this.LastName = LastName;
        this.StreetAddress = StreetAddress;
        this.PostalCode = this.validatePostalCode(PostalCode);
        this.City = City;
        this.DateOfBirth = DateOfBirth;
        this.PhoneNumber = this.validatePhoneNumber(PhoneNumber);
        this.EmailAddress = this.validateEmail(EmailAddress);
        this.Password = Password;
    }

    validatePhoneNumber(PhoneNumber){
            const regex = /(^(316|06|6)([0-9]{8}))$/
            if (regex.test(PhoneNumber)) {
                return PhoneNumber;
              } else {
                throw new Error("Invalid PhoneNumber: " + PhoneNumber.substring(0, 50))
              }
    }

    validatePostalCode(PostalCode){
        const regex = /(^[1-9][0-9]{3})([\s]?)((?!sa|sd|ss|SA|SD|SS)[A-Za-z]{2})$/
    if (regex.test(PostalCode)) {
      return PostalCode;
    } else {
      throw new Error("Invalid PostalCode: " + PostalCode.substring(0, 50))
    }
    }

    validateEmail(email) {
        const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (regex.test(email)) {
          return email;
        } else {
          throw new Error("Invalid email: " + email.substring(0, 100));
        }
    
      }
}

module.exports = User;