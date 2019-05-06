using System.Collections.Generic;
using System.Threading.Tasks;
using PartyApi.Helpers;
using PartyApi.Models;

namespace PartyApi.Repository
{
    public interface IRepoAdmin : IBaseRepository 
    {
        Task<Party> GetParty(int partyId);
        Task<PageList<Party>> GetPartyList(BaseParameter para);
        Task<IEnumerable<Activity>> GetActivityAudit(int partyId);
        Task<Member> GetMember(int userId);
        Task<PageList<Member>> GetMemberList(BaseParameter para);
     }
}