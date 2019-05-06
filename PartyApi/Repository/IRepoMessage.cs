using System.Collections.Generic;
using System.Threading.Tasks;
using PartyApi.Helpers;
using PartyApi.Models;

namespace PartyApi.Repository
{
    public interface IRepoMessage : IBaseRepository
    {
        Task<Message> GetMessage(int id);
        Task<PageList<Message>> GetMessagesForUser(ParaMessage para);
        Task<IEnumerable<Message>> GetMessageThread(int userId, int recipientId);
    }
}