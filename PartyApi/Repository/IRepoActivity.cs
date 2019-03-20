using System.Collections.Generic;
using System.Threading.Tasks;
using PartyApi.Helpers;
using PartyApi.Models;

namespace PartyApi.Repository
{
    public interface IRepoActivity : IBaseReposistiory 
    {
        Task<Activity> GetActivityMember(int userId,int PartyId);
        Task<IEnumerable<Member>> GetActivityMemberList(int userId,int partyId);
        Task<bool> CheckActivityLike(int userId, int partyId, int likeId);
        Task<int> CountActivityLikes(int userId, int partyId);
        Task<IEnumerable<Member>> GetActivityLikeList(int userId, int partyId, bool isMyLike);
        Task<PageList<Activity>> GetMyActivityList(int userId, ParaActivity para);
    
    }
}