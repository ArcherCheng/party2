using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using PartyApi.Helpers;
using PartyApi.Models;
using System;

namespace PartyApi.Repository
{
    public class RepoMessage : BaseRepository, IRepoMessage
    {
        //private readonly AppDbContext _db;

        //只讀取一個月內的留言
        private DateTime _lastDate = System.DateTime.Now.AddMonths(-1);

        public RepoMessage(AppDbContext dbContext) : base(dbContext) { }

        public async Task<Message> GetMessage(int id)
        {
            var result = await _db.Message.FirstOrDefaultAsync(p => p.Id == id);
            return result;
        }

        public async Task<PageList<Message>> GetMessagesForUser(ParaMessage para)
        {
            // var lastDate = System.DateTime.Now.AddMonths(-1);
            var result = _db.Message
                .Include(p => p.Sender).ThenInclude(p=>p.MemberPhoto)
                .Include(p => p.Recipient).ThenInclude(p=>p.MemberPhoto)
                .AsQueryable();
            
            switch (para.MessageContainer)
            {
                case "Inbox":
                    result = result.Where(p => p.RecipientId == para.UserId && p.RecipientDeleted == false && p.SendDate > _lastDate);
                    break;
                case "Outbox":
                    result = result.Where(p => p.SenderId == para.UserId && p.SenderDeleted == false && p.SendDate > _lastDate);
                    break;
                default:
                    result = result.Where(p => p.RecipientId == para.UserId 
                        && p.RecipientDeleted == false && p.IsRead == false && p.SendDate > _lastDate);
                    break;
            }

            result = result.OrderByDescending(p => p.SendDate);

            return await PageList<Message>.CreateAsync(result, para.PageNumber, para.PageSize);

        }

        
        public async Task<IEnumerable<Message>> GetMessageThread(int myId, int recipientId)
        {
            //var lastDate = System.DateTime.Now.AddMonths(-1);
            var result = await _db.Message
                .Include(p => p.Sender)     //.ThenInclude(p=>p.MemberPhoto)
                .Include(p => p.Recipient)  //.ThenInclude(p=>p.MemberPhoto)
                .Where(p=>p.RecipientId == myId && p.RecipientDeleted == false && p.SenderId == recipientId && p.SendDate > _lastDate
                    || p.RecipientId == recipientId && p.SenderId == myId && p.SenderDeleted == false && p.SendDate > _lastDate) 
                .OrderByDescending(p => p.SendDate)
                .ToListAsync();

            return result;
        }

    }
} 