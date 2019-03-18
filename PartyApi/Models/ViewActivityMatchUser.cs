using System;
using System.Collections.Generic;

namespace PartyApi.Models
{
    public partial class ViewActivityMatchUser
    {
        public int PartyId { get; set; }
        public int UserId { get; set; }
        public int LikerId { get; set; }
        public Party Party { get; set; }
        public Member User { get; set; }
    }
}
