namespace PartyApi.Repository
{
    public class ParaLike : BaseParameter
    {
        public int UserId { get; set; }
        public int PartyId { get; set; }
        public bool IsLiker { get; set; }
    }
} 