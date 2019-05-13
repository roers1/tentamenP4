class Reservation{
    
    constructor(ApartmentId, StartDate, EndDate, Status){
        this.ApartmentId = ApartmentId;
        this.StartDate = StartDate;
        this.EndDate = EndDate;
        this.Status = Status;
    }
}

module.exports = Reservation;