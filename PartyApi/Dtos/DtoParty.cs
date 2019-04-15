using System;

namespace PartyApi.Dtos
{
    public class DtoPartyList
    {
        public int PartyId { get; set; }
        public string PartyName { get; set; }
        public DateTime PartyDate { get; set; }
        public string BeginTime { get; set; }
        public string EndTime { get; set; }
        public int Marry { get; set; }
        public int Persons { get; set; }
        public int ManAmt { get; set; }
        public int ManEducaton { get; set; }
        public int ManOlds1 { get; set; }
        public int ManOlds2 { get; set; }
        public int WomanAmt { get; set; }
        public int WomanEducaton { get; set; }
        public int WomanOlds1 { get; set; }
        public int WomanOlds2 { get; set; }
        public string Restaurant { get; set; }
        public string PictureUrl { get; set; }
    }

    public class DtoPartyDetail : DtoPartyList
    {
        // public int manAmt { get; set; }
        // public int manEducaton { get; set; }
        // public int manOlds1 { get; set; }
        // public int manOlds2 { get; set; }

        // public int womanAmt { get; set; }
        // public int womanEducaton { get; set; }
        // public int womanOlds1 { get; set; }
        // public int womanOlds2 { get; set; }
        
        public DateTime? EarlyDate { get; set; }
        public int? EarlyManAmt { get; set; }
        public int? EarlyWomanAmt { get; set; }
        public int? WomenAmt { get; set; }

        //public string restaurant { get; set; }
        public string AddressNo { get; set; }
        public string BusNote { get; set; }
        public string Notes { get; set; }
    }   

    // public class DtoParty
    // {
    //     public string partyName { get; set; }
    //     public DateTime partyDate { get; set; }
    //     public string beginTime { get; set; }
    //     public string endTime { get; set; }
    //     public int marry { get; set; }
    //     public int persons { get; set; }
    // } 

}