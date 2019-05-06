using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PartyApi.Helpers;
using PartyApi.Models;

namespace PartyApi.Repository
{
    public class RepoMatchUser : BaseRepository, IRepoMatchUser
    {
        public RepoMatchUser(AppDbContext dbContext) : base(dbContext)
        {
        }

        public Task<PageList<Member>> GetMatchList(ParaMember para)
        {
            throw new System.NotImplementedException();
        }

        public Task<Message> GetMessage(int id)
        {
            throw new System.NotImplementedException();
        }

        public Task<PageList<Message>> GetMessagesForUser(ParaMessage para)
        {
            throw new System.NotImplementedException();
        }

        public Task<IEnumerable<Message>> GetMessageThread(int userId, int recipientId)
        {
            throw new System.NotImplementedException();
        }

        public async Task<MemberCondition> GetUserCondition(int userId)
        {
            var result =await _db.MemberCondition.FirstAsync(x => x.UserId == userId);
            return result;
        }

        public async Task<Member> GetUserDetail(int userId)
        {
            var result = await _db.Member.FindAsync(userId);
            return result;
        }

        public async Task<PageList<Member>> GetUserList(ParaMember para)
        {
          var list = _db.Member
                .Where(x => !x.IsCloseData)
                .OrderByDescending(x=>x.LastDate)
                .AsQueryable();

            return await PageList<Member>.CreateAsync(list,para.PageNumber,para.PageSize);          
        }

    }
}