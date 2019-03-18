using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PartyApi.Dtos;
using PartyApi.Helpers;
using PartyApi.Models;
using PartyApi.Repository; 

namespace PartyApi.Controllers
{
    // [ServiceFilter(typeof(LogUserActivity))]
    [Authorize]
    [Route("api/users/{userId}/[controller]")]
    [ApiController]

    public class MessageController : BaseController
    {
        private readonly IRepoMessage _repo;
        private readonly IMapper _mapper;
        private readonly IRepoMember _repoMember;
        private readonly IRepoParty _repoActivity;        
        public MessageController(IMapper mapper, IRepoMessage repo
                , IRepoMember repoMember, IRepoParty repoActivity)
        {
            _repo = repo;
            _mapper = mapper;
            _repoMember = repoMember;
            _repoActivity = repoActivity;
        }

        [HttpGet("{id}", Name="GetMessage")]
         public async Task<IActionResult> GetMessage(int userId, int id)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var repoMember = await _repoMember.Get(userId);
            if (repoMember == null)
                return NotFound(); 

            var messageRepo = await _repo.GetMessage(id);
            if(messageRepo == null)
                return NotFound();

            return Ok(messageRepo);
        }


        [HttpGet]
        public async Task<IActionResult> GetMessageForUser(int userId,[FromQuery]ParaMessage para)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var repoMember = await _repoMember.Get(userId);
            if (repoMember == null)
                return NotFound(); 

            para.UserId = userId;
            var pageMessages = await _repo.GetMessagesForUser(para);
            Response.AddPagination(pageMessages.CurrentPage, pageMessages.PageSize, 
                pageMessages.TotalCount, pageMessages.TotalPages);
    
            var dtoMessages = _mapper.Map<IEnumerable<DtoMessageList>>(pageMessages);

            return Ok(dtoMessages);
        }

        [HttpGet("thread/{recipientId}")]
        public async Task<IActionResult> GetMessageThread(int userId, int recipientId)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();
            
            var repoMessage = await _repo.GetMessageThread(userId, recipientId);
            var dotMesasage = _mapper.Map<IEnumerable<DtoMessageList>>(repoMessage);
            return Ok(dotMesasage);
        }

        [HttpPost]
        public async Task<IActionResult> CreateMessage(int userId, DtoMessageCreate dtoMessageCreate)
        {
            var sender = await _repoMember.Get(userId);
            if (sender.UserId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var recipient = await _repoMember.Get(dtoMessageCreate.RecipientId);
            if(recipient == null)
                return BadRequest("查無此會員");

            dtoMessageCreate.SenderId = userId;
            dtoMessageCreate.SendDate = System.DateTime.Now;

            var message = _mapper.Map<Message>(dtoMessageCreate);

            _repo.Add(message); 
            if(await _repo.SaveAllAsync()>0) 
            {
                var  messageToReturn = _mapper.Map<DtoMessageList>(message);
                return CreatedAtRoute("GetMessage", new {Controller="Message",userId = userId,id = message.Id}, messageToReturn);
                //return Ok(messageToReturn);
                //return NoContent();
            } 

            throw new Exception("留言存檔失敗");

        }

        [HttpPost("{id}")]
        public async Task<IActionResult> DeleteMessage(int id, int userId)
        {
          if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var repoMessage = await _repo.GetMessage(id);
            if(repoMessage.SenderId == userId)
                repoMessage.SenderDeleted = true;
            
            if(repoMessage.RecipientId == userId)
                repoMessage.RecipientDeleted = true;
            
            if(repoMessage.SenderDeleted && repoMessage.RecipientDeleted)
                _repo.Delete(repoMessage);

            if(_repo.SaveAll()>0)
                return NoContent();
            
            throw new Exception("刪除留言失敗");
        }

        [HttpPost("{id}/read")]
        public async Task<IActionResult> MarkMessageAsRead(int userId, int id)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();
            
            var repoMessage=await _repo.GetMessage(id);
            if(repoMessage.RecipientId != userId)
                return Unauthorized();
            
            repoMessage.IsRead =true;
            repoMessage.ReadDate = System.DateTime.Now;
            
            _repo.SaveAll();

            return NoContent();
        }
    }
}