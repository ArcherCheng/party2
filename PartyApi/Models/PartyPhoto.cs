using System;
using System.Collections.Generic;

namespace PartyApi.Models
{
    public partial class PartyPhoto
    {
        public int Id { get; set; }
        public int PartyId { get; set; }
        public string Descriptions { get; set; }
        public string PhotoUrl { get; set; }
        public string PublicId { get; set; }
        public bool? IsMain { get; set; }
        public DateTime? AddedDate { get; set; }
        public int? WriteType { get; set; }
        public DateTime? WriteTime { get; set; }
        public string WriteUser { get; set; }
        public string WriteIp { get; set; }

        public virtual Party Party { get; set; }
    }
}
