using System.Collections.Generic;
using System.Threading.Tasks;
using PartyApi.Helpers;
using PartyApi.Models;

namespace PartyApi.Repository
{
    public interface IRepoAdmin : IBaseReposistiory 
    {
        Task<Party> GetParty(int partyId);
        Task<PageList<Party>> GetPartyList(BaseParameter para);
        Task<Member> GetMember(int userId);
        Task<PageList<Member>> GetMemberList(BaseParameter para);
     }
}