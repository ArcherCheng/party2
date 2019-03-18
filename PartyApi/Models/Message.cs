﻿using System;
using System.Collections.Generic;

namespace PartyApi.Models
{
    public partial class Message
    {
        public int Id { get; set; }
        public int PartyId { get; set; }
        public int SenderId { get; set; }
        public int RecipientId { get; set; }
        public string Contents { get; set; }
        public DateTime SendDate { get; set; }
        public bool IsRead { get; set; }
        public DateTime? ReadDate { get; set; }
        public bool SenderDeleted { get; set; }
        public bool RecipientDeleted { get; set; }
        public int? WriteType { get; set; }
        public DateTime? WriteTime { get; set; }
        public string WriteUser { get; set; }
        public string WriteIp { get; set; }

        public virtual Party Party { get; set; }
        public virtual Member Recipient { get; set; }
        public virtual Member Sender { get; set; }
    }
}
