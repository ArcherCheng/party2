using System.Threading.Tasks;
using PartyApi.Models;

namespace PartyApi.Repository
{
    public interface IRepoMemberCondition : IBaseRepository 
    {
        Task<MemberCondition> Get(int userId);
         
    }
}