using System.Collections.Generic;
using System.Threading.Tasks;
using PartyApi.Helpers;
using PartyApi.Models;

namespace PartyApi.Repository
{
    public interface IRepoMatchUser : IBaseRepository
    {
        Task<Member> GetUserDetail(int userId);
        Task<MemberCondition> GetUserCondition(int userId);
        Task<PageList<Member>> GetUserList(ParaMember para);
        Task<PageList<Member>> GetMatchList(ParaMember para);
        Task<Message> GetMessage(int id);
        Task<PageList<Message>> GetMessagesForUser(ParaMessage para);
        Task<IEnumerable<Message>> GetMessageThread(int userId, int recipientId);        
    }
}