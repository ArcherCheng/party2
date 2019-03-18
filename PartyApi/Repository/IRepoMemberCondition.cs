using System.Threading.Tasks;
using PartyApi.Models;

namespace PartyApi.Repository
{
    public interface IRepoMemberCondition : IBaseReposistiory 
    {
        Task<MemberCondition> Get(int userId);
         
    }
}