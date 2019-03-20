using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PartyApi.Helpers;
using PartyApi.Models;

namespace PartyApi.Repository
{
    public class RepoActivity : BaseRepository, IRepoActivity
    {
        public RepoActivity(AppDbContext dbContext) : base(dbContext)
        {
        }

        public async Task<Activity> GetActivityMember(int userId, int PartyId)
        {
            var result = await _db.Activity.FirstOrDefaultAsync(x => x.UserId == userId && x.PartyId == PartyId);
            return result;
        }

        //取得本場次活動的對方性別人員名單列表(男->女)(女->男)
        public async Task<IEnumerable<Member>> GetActivityMemberList(int userId, int partyId)
        {
            var member=await _db.Member.FirstOrDefaultAsync(p => p.UserId == userId);
            var sex = member.Sex;

            var result = await _db.Activity
                .Where(x=>x.PartyId == partyId && x.User.Sex != sex)
                .Select(x=>x.User)
                .Include(x => x.MemberPhoto)
                .ToListAsync();

            return  result;
        }

        //檢查是否已經有投喜歡票了
        public async Task<bool> CheckActivityLike(int userId, int partyId, int likeId)
        {
            var result = await _db.Liker
                .FirstOrDefaultAsync(p => p.PartyId == partyId && p.UserId == userId && p.LikerId == likeId);

            return (result != null);                     
        }

        public async Task<int> CountActivityLikes(int userId, int partyId)
        {
            var count = await _db.Liker
                .Where(x => x.UserId == userId && x.PartyId == partyId)
                .CountAsync();

            return count;
        }

        public async Task<IEnumerable<Member>> GetActivityLikeList(int userId, int partyId, bool isMyLike)
        {
        if(isMyLike)
            {
                var result = await _db.Liker
                    .Where(x=>x.PartyId == partyId && (x.UserId == userId))
                    .Select(x => x.LikerMe)
                    .Include(x => x.MemberPhoto)
                    .ToListAsync();
                return result;

            }
            else
            {
                var result = await _db.Liker
                    .Where(x=>x.PartyId == partyId && (x.LikerId == userId))
                    .Select(x => x.MyLiker)
                    .Include(x => x.MemberPhoto)
                    .ToListAsync();
                return result;
            }        
        }

        public async Task<PageList<Activity>> GetMyActivityList(int userId, ParaActivity para)
        {
           var results = _db.Activity
                .Where(x=>x.UserId == userId)
                .OrderByDescending(p=>p.PartyId)
                .AsQueryable();

            return await PageList<Activity>.CreateAsync(results,para.PageNumber,para.PageSize);        }
    }
}