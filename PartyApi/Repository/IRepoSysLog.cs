using System.Collections.Generic;
using System.Threading.Tasks;
using PartyApi.Models;

namespace PartyApi.Repository
{
    public interface IRepoSysLog
    {
         Task<int> AddLogAsyn(Aa9log20 entity);

    }
    
}