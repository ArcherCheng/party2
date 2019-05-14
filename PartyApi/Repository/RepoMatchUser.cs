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
        public RepoMatchUser(AppDbContext dbContext) : base(dbContext) { }

        //使用者資料
        public async Task<PageList<Member>> GetUserList(ParaMember para)
        {
          var list = _db.Member
                .Where(x => !x.IsCloseData)
                .OrderByDescending(x=>x.LastDate)
                .AsQueryable();

            return await PageList<Member>.CreateAsync(list,para.PageNumber,para.PageSize);          
        }

        public async Task<Member> GetUserDetail(int userId)
        {
            var result = await _db.Member.FirstOrDefaultAsync(x => x.UserId == userId);
            return result;
        }

        public async Task<IEnumerable<MemberPhoto>> GetUserPhotos(int userId)
        {
         var result = await _db.MemberPhoto
                .Where(x => x.UserId == userId)
                .ToListAsync();

            return result;        
        }

        public async Task<PageList<Member>> GetUserFriends(ParaMember para)
        {
          var list = _db.Member
                .Where(x => !x.IsCloseData)
                .OrderByDescending(x=>x.LastDate)
                .AsQueryable();

            return await PageList<Member>.CreateAsync(list,para.PageNumber,para.PageSize);          
        }

        //配對條件資料
        public async Task<MemberCondition> GetUserCondition(int userId)
        {
            var result =await _db.MemberCondition.FirstOrDefaultAsync(x => x.UserId == userId);
    
            return result;
        }

        public async Task<PageList<Member>> GetMatchList(ParaMember param)
        {
            var memberCondition = _db.MemberCondition.FirstOrDefault(x => x.UserId == param.UserId);
            if (memberCondition == null) 
            {
                memberCondition = param.Condition;
            }
            
            var matchList = _db.Member
                .Where(x => x.Sex != memberCondition.Sex)
                .OrderByDescending(p => p.ActiveDate).AsQueryable();
        
            matchList = matchList.Where(x =>
               (x.Marry >= memberCondition.MarryMin && x.Marry <= memberCondition.MarryMax) &&
               (x.BirthYear >= memberCondition.YearMin && x.BirthYear <= memberCondition.YearMax) &&
               (x.Education >= memberCondition.EducationMin && x.Education <= memberCondition.EducationMax) &&
               (x.Heights >= memberCondition.HeightsMin && x.Heights <= memberCondition.HeightsMax) &&
               (x.Weights >= memberCondition.WeightsMin && x.Weights <= memberCondition.WeightsMax) 
               );

            if(!string.IsNullOrEmpty(memberCondition.BloodInclude))
            {
                matchList = matchList.Where(x => memberCondition.BloodInclude.Contains(x.Blood));
            }

            if(!string.IsNullOrEmpty(memberCondition.StarInclude))
            {
                matchList = matchList.Where(x => memberCondition.StarInclude.Contains(x.Star));
            }

            if(!string.IsNullOrEmpty(memberCondition.CityInclude))
            {
                matchList = matchList.Where(x => memberCondition.CityInclude.Contains(x.City));
            }

            if(!string.IsNullOrEmpty(memberCondition.JobTypeInclude))
            {
                matchList = matchList.Where(x => memberCondition.JobTypeInclude.Contains(x.JobType));
            }

            if(!string.IsNullOrEmpty(memberCondition.ReligionInclude))
            {
                matchList = matchList.Where(x => memberCondition.ReligionInclude.Contains(x.Religion));
            }

            return await PageList<Member>.CreateAsync(matchList,param.PageNumber,param.PageSize);           
        }

        //留言資料
        public Task<IEnumerable<Message>> GetMessageThread(int userId, int recipientId)
        {
            throw new System.NotImplementedException();
        }

        public Task<PageList<Message>> GetMessagesForUser(ParaMessage para)
        {
            throw new System.NotImplementedException();
        }

        public Task<Message> GetMessage(int id)
        {
            throw new System.NotImplementedException();
        }
    }
}