using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PartyApi.Helpers;
using PartyApi.Models;

namespace PartyApi.Repository
{
    public class RepoMemberPhoto : BaseRepository, IRepoMemberPhoto
    {
        // private readonly AppDbContext _db;

        public RepoMemberPhoto(AppDbContext dbContext) : base(dbContext){}

        public async Task<MemberPhoto> Get(int id)
        {
            var result = await _db.MemberPhoto.FirstOrDefaultAsync(p => p.Id == id);
            return result;
        }

        public async Task<MemberPhoto> GetMainPhoto(int userId)
        {
            var result = await _db.MemberPhoto.FirstOrDefaultAsync(p=>p.UserId == userId && p.IsMain);
            return result;
        }

        public async Task<IEnumerable<MemberPhoto>> GetPhotos(int userId)
        {
            var result = await _db.MemberPhoto.Where(p => p.UserId == userId).ToListAsync();
            return result;
        }

        public bool hasMainPhoto(int userId)
        {
            var result = _db.MemberPhoto.FirstOrDefault(p=>p.UserId == userId && p.IsMain);
            if(result == null)
                return false;

            return true;
        }

      
    }
} 