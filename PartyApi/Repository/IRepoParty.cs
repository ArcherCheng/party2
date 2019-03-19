using System.Collections.Generic;
using System.Threading.Tasks;
using PartyApi.Helpers;
using PartyApi.Models;

namespace PartyApi.Repository
{
    public interface IRepoParty : IBaseReposistiory
    {
        Task<Party> Get(int partyId);
        Task<PageList<Party>> GetList(ParaParty para);
        Task<IEnumerable<Party>> GetNewList();
        Task<IEnumerable<Party>> GetActivityList();
        Task<PageList<Party>> GetHistoryList(ParaParty para);
        Task<IEnumerable<PartyPhoto>> GetPhotoList(int partyId);
        Task<ViewActivitySummary> GetPartySummary(int partyId);
    }
}