using System.Collections.Generic;
using System.Threading.Tasks;
using PartyApi.Models;

namespace PartyApi.Repository
{
    public interface IRepoSysLog
    {
         Task<int> AddLog(Aa9log20 entity);

    }
    
}