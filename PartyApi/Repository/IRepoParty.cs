using System.Collections.Generic;
using System.Threading.Tasks;
using PartyApi.Helpers;
using PartyApi.Models;

namespace PartyApi.Repository
{
    public interface IRepoParty : IBaseReposistiory
    {
        Task<Party> Get(int id);
        Task<IEnumerable<Party>> GetNewList();
        Task<PageList<Party>> GetList(ParaParty para);
        Task<PageList<Party>> GetOldList(ParaParty para);
        Task<IEnumerable<Party>> GetActivityList();
       
    }
}