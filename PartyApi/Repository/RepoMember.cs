using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PartyApi.Helpers;
using PartyApi.Models;

namespace PartyApi.Repository
{
    public class RepoMember : BaseRepository,IRepoMember
    {
        // private readonly AppDbContext _db;

        public RepoMember(AppDbContext dbContext) : base(dbContext) {}

        //顯示會員資料給參加的人查看,
        public async Task<Member> Get(int userId)
        {
            var result = await _db.Member
                .FirstOrDefaultAsync(p => p.UserId == userId);

            return result;
        }

        //顯示會員資料給參加的人查看,含相片檔
        public async Task<Member> GetDetail(int userId)
        {
            var result = await _db.Member
                .Include(p => p.MemberPhoto)
                .FirstOrDefaultAsync(p => p.UserId == userId);

            return result;
        }

        //編輯修改個人資料用,含相片及配對條件
        public async Task<Member> GetEdit(int userId)
        {
            var result = await _db.Member
                .Include(p => p.MemberCondition)
                .Include(p => p.MemberPhoto)
                .FirstOrDefaultAsync(p => p.UserId == userId);

            return result;
        }
        
        public async Task<MemberCondition> GetMemberCondition(int userId)
        {
            var result = await _db.MemberCondition
                .FirstOrDefaultAsync(p => p.UserId == userId);

            return result;
        }


        public async Task<PageList<Member>> GetMatchList(ParaMember para)
        {
            DateTime minDate,maxDate;
            
            var member = _db.Member.FirstOrDefault(x => x.UserId == para.UserId);
            
            var memberCondition = _db.MemberCondition.FirstOrDefault(x => x.UserId == para.UserId);

            minDate = System.DateTime.Now.AddYears(-memberCondition.OldsMax);
            maxDate = System.DateTime.Now.AddYears(-memberCondition.OldsMin);

            var matchList = _db.Member.Include(p => p.MemberPhoto)
                .Where(x => x.Sex != member.Sex)
                .OrderByDescending(p => p.ActiveDate).AsQueryable();
        
            matchList = matchList.Where(x =>
               (x.Marry >= memberCondition.MarryMin && x.Marry <= memberCondition.MarryMax) &&
               (x.Birthday >= minDate && x.Birthday <= maxDate) &&
               (x.Education >= memberCondition.EducationMin && x.Education <= memberCondition.EducationMax) &&
               (x.Heights >= memberCondition.HeightsMin && x.Heights <= memberCondition.HeightsMax) &&
               (x.Weights >= memberCondition.WeightsMin && x.Weights <= memberCondition.WeightsMax) 
               );

            // if(!string.IsNullOrEmpty(memberCondition.BloodInclude))
            // {
            //     matchList = matchList.Where(x => memberCondition.BloodInclude.Contains(x.Blood));
            // }

            // if(!string.IsNullOrEmpty(memberCondition.StarInclude))
            // {
            //     matchList = matchList.Where(x => memberCondition.StarInclude.Contains(x.Star));
            // }

            // if(!string.IsNullOrEmpty(memberCondition.CityInclude))
            // {
            //     matchList = matchList.Where(x => memberCondition.CityInclude.Contains(x.City));
            // }

            // if(!string.IsNullOrEmpty(memberCondition.JobTypeInclude))
            // {
            //     matchList = matchList.Where(x => memberCondition.JobTypeInclude.Contains(x.JobType));
            // }

            // if(!string.IsNullOrEmpty(memberCondition.ReligionInclude))
            // {
            //     matchList = matchList.Where(x => memberCondition.ReligionInclude.Contains(x.Religion));
            // }

            return await PageList<Member>.CreateAsync(matchList,para.PageNumber,para.PageSize);
        }
    }
} 

 