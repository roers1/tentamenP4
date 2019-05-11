class appartment{
    
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
    if (regex.test(postcode)) {
      console.log('postcode checken dmv regex')
      return postcode;
    } else {
      throw new Error("Invalid postcode: " + postcode.substring(0, 50))
    }
    }

}