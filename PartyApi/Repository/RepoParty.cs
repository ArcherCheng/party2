using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PartyApi.Helpers;
using PartyApi.Models;

namespace PartyApi.Repository
{
    public class RepoParty : BaseRepository,IRepoParty 
    {
        public RepoParty(AppDbContext dbContext) : base(dbContext) { }

        public async Task<Party> Get(int id)
        {
            var record = await _db.Party.FirstOrDefaultAsync(p=>p.PartyId == id);
            return record; 
        }

        public async Task<IEnumerable<Party>> GetActivityList()
        {
            var maxDate = System.DateTime.Today.AddHours(23);
            var minDate = System.DateTime.Today.AddDays(-31);

            var result = await _db.Party
                .Where(p => p.PartyDate > minDate && p.PartyDate < maxDate)
                .OrderByDescending(p => p.PartyDate).ToListAsync();

            return result;
        }
        
        public async Task<IEnumerable<Party>> GetNewList()
        {
            var today = System.DateTime.Today;
            var result = await _db.Party
                .Where(p => p.PartyDate > today)
                .OrderBy(p => p.PartyDate).ToListAsync();
            return result;
        }


        public async Task<PageList<Party>> GetList(ParaParty para)
        {
            var today = System.DateTime.Today;
            var list = _db.Party.Where(p=>p.PartyDate > today ).OrderBy(p=>p.PartyDate).AsQueryable();
            return await PageList<Party>.CreateAsync(list,para.PageNumber,para.PageSize);
        }

 
        public async Task<PageList<Party>> GetOldList(ParaParty para)
        {
            var today = System.DateTime.Today;
            var lists = _db.Party.Where(p=>p.PartyDate < today )
                        .OrderByDescending(p=>p.PartyDate).AsQueryable();
            return await PageList<Party>.CreateAsync(lists,para.PageNumber,para.PageSize);
        }
    }

} 