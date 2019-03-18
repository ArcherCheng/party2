using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PartyApi.Models;

namespace PartyApi.Repository
{
    public class RepoMemberCondition : BaseRepository, IRepoMemberCondition
    {
        public RepoMemberCondition(AppDbContext dbContext) : base(dbContext)
        {
        }

        public async Task<MemberCondition> Get(int userId)
        {
         var result = await _db.MemberCondition
                .FirstOrDefaultAsync(p => p.UserId == userId);

            return result;                   
        }
    }
}