using System.Collections.Generic;
using System.Threading.Tasks;
using PartyApi.Helpers;
using PartyApi.Models;

namespace PartyApi.Repository
{
    public interface IRepoMemberPhoto : IBaseReposistiory 
    {
        Task<MemberPhoto> Get(int id);
        // Task<Photo> SetMainPhoto(int userId);
        Task<MemberPhoto> GetMainPhoto(int userId);
        Task<IEnumerable<MemberPhoto>> GetPhotos(int userId);
        bool hasMainPhoto(int userId); 
    }
    
}