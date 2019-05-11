class Appartment{
    
    constructor(Description, StreetAddress, PostalCode, City, UserId){
      console.log('in de constructor van appartment')
        this.Description = Description;
        this.StreetAddress = StreetAddress;
        this.PostalCode = this.validatePostalCode(PostalCode);
        this.City = City;
        this.UserId = UserId;
    }


    validatePostalCode(PostalCode){
        const regex = /(^[1-9][0-9]{3})([\s]?)((?!sa|sd|ss|SA|SD|SS)[A-Za-z]{2})$/
    if (regex.test(PostalCode)) {
      console.log('PostalCode checken dmv regex')
      return PostalCode;
    } else {
      throw new Error("Invalid PostalCode: " + PostalCode.substring(0, 50))
    }
    }

}

module.exports = Appartment;