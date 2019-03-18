using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PartyApi.Models;

namespace PartyApi.Repository
{
    public class BaseRepository
    {
        protected readonly AppDbContext _db;
        public BaseRepository(AppDbContext dbContext)
        {
            _db = dbContext;
        }

        public void Add<T>(T entity) where T : class
        {
            _db.Add(entity);
            // _db.SaveChanges();
        }

        public void Update<T>(T entity) where T : class
        {
            _db.Entry(entity).State = EntityState.Modified;
            //_db.SaveChanges();
        }

        public void Delete<T>(T entity) where T : class
        {
            _db.Remove(entity);
            //_db.SaveChanges();
        }
        
        public int SaveAll()
        {
            return _db.SaveChanges();
        }

        public async Task<int> SaveAllAsync()
        {
            return await _db.SaveChangesAsync();
        }

        // public void Add(Member entity)
        // {
        //     _db.Member.Add(entity);
        //     _db.SaveChanges();
        // }

        // public void Update(Member entity)
        // {
        //     // var oriData = _db.Member.Single(x => x.UserId == entity.UserId);
        //     var oriData = _db.Member.Find(entity.UserId);
        //     if(oriData != null) 
        //     {
        //         _db.Entry(oriData).CurrentValues.SetValues(entity);
        //         _db.SaveChanges();
        //     }
        // }

        // public void Delete(int id)
        // {
        //     var oriData = _db.Member.Find(id);
        //     if(oriData != null)
        //     {
        //         _db.Member.Remove(oriData);
        //         _db.SaveChanges();
        //     }
        // }

    }
} 