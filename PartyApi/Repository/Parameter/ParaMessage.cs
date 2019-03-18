namespace PartyApi.Repository
{
    public class ParaMessage : BaseParameter
    {
        public int UserId { get; set; }
        public string MessageContainer { get; set; } = "Unread";

    }
} 