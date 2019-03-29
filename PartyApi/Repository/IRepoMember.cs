using System.Collections.Generic;
using System.Threading.Tasks;
using PartyApi.Helpers;
using PartyApi.Models;

namespace PartyApi.Repository
{
    public interface IRepoMember : IBaseReposistiory 
    {
        Task<Member> Get(int userId);
        Task<Member> GetDetail(int userId);
        Task<Member> GetEdit(int userId);
        Task<PageList<Member>> GetMatchList(ParaMember para);
        Task<MemberCondition> GetMemberCondition(int userId);

        
        //Task<IEnumerable<Member>> GetPartyMemberList(int userId,int partyId);
        //Task<IEnumerable<Member>> GetPartyLikeList(int userId,int partyId, bool isLiker);
        //Task<IEnumerable<Like>> GetPartyLikeList(ParaLike para);
        //Task<Activity> GetMemberParty(int userId,int partyId);
        //Task<bool> CheckPartyLike(int userId, int partyId, int receiveId);
        //Task<int> CountPartyLikes(int userId, int partyId);
    }
}