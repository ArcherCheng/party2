using System;
using System.Collections.Generic;

namespace PartyApi.Models
{
    public partial class Liker
    {
        public int PartyId { get; set; }
        public int UserId { get; set; }
        public int LikerId { get; set; }
        public DateTime AddedDate { get; set; }
        public int? WriteType { get; set; }
        public DateTime? WriteTime { get; set; }
        public string WriteUser { get; set; }
        public string WriteIp { get; set; }

        public virtual Party Party { get; set; }
        public virtual Member MyLiker { get; set; }
        public virtual Member LikerMe { get; set; }
    }
}
