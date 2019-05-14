using System.Collections.Generic;
using PartyApi.Models;

namespace PartyApi.Repository
{
    public class ParaMember : BaseParameter
    { 
        public int UserId { get; set; } //= 0;
        public MemberCondition Condition {get; set;} 
    }
}