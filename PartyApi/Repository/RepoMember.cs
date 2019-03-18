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


        public async Task<PageList<Member>> GetList(ParaMember para)
        {
            var members = _db.Member
                .Include(p=>p.MemberPhoto)
                .OrderBy(p=>p.UserId)
                .AsQueryable();

            return await PageList<Member>.CreateAsync(members,para.PageNumber,para.PageSize);
        }

    
    }
} 

            // if( para.UserId > 0)
            // {
            //     members = members.Where(p => p.UserId != para.UserId);
            // }

            // if(para.Sex > 0)
            // {
            //     members = members.Where(p => p.Sex == para.Sex);
            // }

            // if (para.MinAge > 0 && para.MaxAge > 0) 
            // {
            //     var minDate= System.DateTime.Today.AddYears(-para.MaxAge - 1);
            //     var maxDate= System.DateTime.Today.AddYears(-para.MinAge);
            //     members = members.Where(p => p.Birthday >= minDate && p.Birthday <= maxDate);
            // }

            // if (para.MinHeights > 0 && para.MaxHeights > 0) 
            // {
            //     members = members.Where(p => p.Heights >= para.MinHeights && p.Heights <= para.MaxHeights);
            // }

            // if (para.MinWeights > 0 && para.MaxWeights > 0) 
            // {
            //     members = members.Where(p => p.Weights >= para.MinWeights && p.Weights <= para.MaxWeights);
            // }

            // if (para.MinEducation > 0 && para.MaxEducation > 0) 
            // {
            //     members = members.Where(p => p.Education >= para.MinEducation && p.Education <= para.MaxEducation);
            // }

            // if (para.MinSalary > 0 && para.MaxSalary > 0) 
            // {
            //     members = members.Where(p => p.Salary >= para.MinSalary && p.Salary <= para.MaxSalary);
            // }

            // if (para.Blood != null)
            // {
            //     members = members.Where(p => para.Blood.Contains(p.Blood));
            // }

            // if (para.Star != null)
            // {
            //     members = members.Where(p => para.Star.Contains(p.Star));
            // }

            // if (para.City != null)
            // {
            //     members = members.Where(p => para.City.Contains(p.City));
            // }


//    public async Task<IEnumerable<Member>> GetPartyMemberList(int userId, int partyId)
    //     {
    //         var member=await _db.Member.FirstOrDefaultAsync(p => p.UserId == userId);
    //         var sex = member.Sex;

    //         var result = await _db.Activity
    //             .Where(p=>p.PartyId == partyId && p.User.Sex != sex)
    //             .Select(p=>p.User).Include(p => p.MemberPhoto)
    //             .ToListAsync();

    //         return  result;
    //     }        



        // public async Task<IEnumerable<Member>> GetPartyLikeList(int userId, int partyId, bool isMyLike)
        // {
        //     if(isMyLike)
        //     {
        //         var result = await _db.Liker
        //             //.Include(p => p.MyLike)
        //             //.Include(p => p.ReceiveLikee)
        //             .Where(p=>p.PartyId == partyId && (p.UserId == userId))
        //             .Select(p => p.LikerMe).Include(p => p.MemberPhoto)
        //             .ToListAsync();
        //         return result;

        //     }
        //     else
        //     {
        //         var result = await _db.Liker
        //             //.Include(p => p.SendLiker)
        //             //.Include(p => p.LikeMe)
        //             .Where(p=>p.PartyId == partyId && (p.LikerId == userId))
        //             .Select(p => p.MyLiker).Include(p => p.MemberPhoto)
        //             .ToListAsync();
        //         return result;
        //     }        
        // }

        // public async Task<Activity> GetMemberParty(int userId,int partyId)
        // {
        //     var result = await _db.Activity
        //              .FirstOrDefaultAsync(p => p.UserId == userId && p.PartyId == partyId);
        //      return result;
        // }

        // public async Task<bool> CheckPartyLike(int userId, int partyId, int likeId)
        // {
        //     var result = await _db.Liker
        //              .FirstOrDefaultAsync(p => p.PartyId == partyId && p.UserId == userId && p.LikerId == likeId);
        //     return (result != null);                     
            
        // }

        // public async Task<int> CountPartyLikes(int userId,int partyId)
        // {
        //     var count = await _db.Liker
        //              .Where(p => p.PartyId == partyId && p.UserId == userId)
        //              .CountAsync();
        //     return count;
        // }
