using System;
using PartyApi.Models;

namespace PartyApi.Dtos
{
    public class DtoMessageList
    {
        public int Id { get; set; }
        public int PartyId { get; set; } =0;
        public int SenderId { get; set; }
        public string SenderName { get; set; }
        public string SenderPhotoUrl { get; set; }
        public int RecipientId { get; set; }
        public string RecipientName { get; set; }
        public string RecipientPhotoUrl { get; set; }
        public string Contents { get; set; }
        public bool IsRead { get; set; } = false;
        public DateTime? ReadDate { get; set; }
        public DateTime? SendDate { get; set; }
    }

    public class DtoMessageCreate
    {
        // public DtoMessageCreate()
        // {
        //     SentDate = System.DateTime.Now;
        // }
 
        public int PartyId { get; set; }=0;
        public int SenderId { get; set; }
        public DateTime? SendDate { get; set; }
        public int RecipientId { get; set; }
        public string Contents { get; set; }

    }


}