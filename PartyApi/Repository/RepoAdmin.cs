using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PartyApi.Helpers;
using PartyApi.Models;

namespace PartyApi.Repository
{
    public class RepoAdmin : BaseRepository, IRepoAdmin
    {
        public RepoAdmin(AppDbContext dbContext) : base(dbContext) { }

        public async Task<IEnumerable<Activity>> GetActivityAudit(int partyId)
        {
            var result = await _db.Activity
                .Include( x => x.User)
                // .Include( x => x.Party)
                .Where(x => x.PartyId == partyId)
                .OrderBy(x => x.User.Sex)
                .ThenBy(x => x.MyNo)
                .ToListAsync();

            return result;
        }

        public async Task<Member> GetMember(int userId)
        {
            var result = await _db.Member.FirstOrDefaultAsync(x => x.UserId == userId);
            return result;
        }

        public async Task<PageList<Member>> GetMemberList(BaseParameter para)
        {
            var list = _db.Member
                .Include(x => x.MemberPhoto)
                .OrderByDescending(x=>x.UserId)
                .AsQueryable();

            return await PageList<Member>.CreateAsync(list,para.PageNumber,para.PageSize);
        }

        public async Task<Party> GetParty(int partyId)
        {
            var result = await _db.Party.FirstOrDefaultAsync(x => x.PartyId == partyId);
            return result;
        }

        public async Task<PageList<Party>> GetPartyList(BaseParameter para)
        {
            var list = _db.Party
                 .OrderByDescending(p=>p.PartyDate)
                .AsQueryable();

            return await PageList<Party>.CreateAsync(list,para.PageNumber,para.PageSize);
        }
    }
}