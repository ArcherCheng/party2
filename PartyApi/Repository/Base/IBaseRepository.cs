using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using PartyApi.Helpers;

namespace PartyApi.Repository
{
    public interface IBaseRepository
    {
        void Add<T>(T entity) where T : class;

        void Update<T>(T entity) where T : class;

        void Delete<T>(T entity) where T : class;
 
        int SaveAll(); 

        Task<int> SaveAllAsync(); 
    }
}