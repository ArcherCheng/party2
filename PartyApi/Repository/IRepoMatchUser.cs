using System.Collections.Generic;
using System.Threading.Tasks;
using PartyApi.Helpers;
using PartyApi.Models;

namespace PartyApi.Repository
{
    public interface IRepoMatchUser : IBaseRepository
    {
        //使用者資料
        Task<PageList<Member>> GetUserList(ParaMember para);
        Task<Member> GetUserDetail(int userId);
        Task<IEnumerable<MemberPhoto>> GetUserPhotos(int userId);   
        Task<PageList<Member>> GetUserFriends(ParaMember para);

        //配對條件資料
        Task<MemberCondition> GetUserCondition(int userId);
        Task<PageList<Member>> GetMatchList(ParaMember para);

        //留言資料
        Task<IEnumerable<Message>> GetMessageThread(int userId, int recipientId);
        Task<PageList<Message>> GetMessagesForUser(ParaMessage para);
        Task<Message> GetMessage(int id);
    }
}