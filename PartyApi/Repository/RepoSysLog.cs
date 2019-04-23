using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PartyApi.Helpers;
using PartyApi.Models;

namespace PartyApi.Repository
{
    public class RepoSysLog : BaseRepository, IRepoSysLog
    {
        public RepoSysLog(AppDbContext dbContext) : base(dbContext)
        {
        }

        public async Task<int> AddLog(Aa9log20 log)
        {
            // await _db.Aa9log20.AddAsync(log);
            _db.Aa9log20.Add(log);
            return (await _db.SaveChangesAsync());
        }
    }
}