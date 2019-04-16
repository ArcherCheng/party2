using System;
using System.Collections.Generic;

namespace PartyApi.Models
{
    public partial class Party
    {
        public Party()
        {
            Activity = new HashSet<Activity>();
            Liker = new HashSet<Liker>();
            Message = new HashSet<Message>();
            PartyPhoto = new HashSet<PartyPhoto>();
        }

        public int PartyId { get; set; }
        public string PartyName { get; set; }
        public DateTime PartyDate { get; set; }
        public string BeginTime { get; set; }
        public string EndTime { get; set; }
        public int Marry { get; set; }
        public int Persons { get; set; }
        public int ManAmt { get; set; }
        public int ManEducaton { get; set; }
        public int ManAge1 { get; set; }
        public int ManAge2 { get; set; }
        public int WomanAmt { get; set; }
        public int WomanEducaton { get; set; }
        public int WomanAge1 { get; set; }
        public int WomanAge2 { get; set; }
        public DateTime EarlyDate { get; set; }
        public int EarlyManAmt { get; set; }
        public int EarlyWomanAmt { get; set; }
        public int? WomenAmt { get; set; }
        public string PictureUrl { get; set; }
        public string Restaurant { get; set; }
        public string AddressNo { get; set; }
        public string BusNote { get; set; }
        public string Notes { get; set; }
        public int? WriteType { get; set; }
        public DateTime? WriteTime { get; set; }
        public string WriteUser { get; set; }
        public string WriteIp { get; set; }

        public virtual ICollection<Activity> Activity { get; set; }
        public virtual ICollection<Liker> Liker { get; set; }
        public virtual ICollection<Message> Message { get; set; }
        public virtual ICollection<PartyPhoto> PartyPhoto { get; set; }
    }
}
