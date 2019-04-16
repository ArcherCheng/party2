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
    [Route("api/[controller]/myId/{myId}")]
    [ApiController]

    public class MessageController : BaseController
    {
        private readonly IRepoMessage _repoMessage;
        private readonly IMapper _mapper;
        private readonly IRepoMember _repoMember;
        private readonly IRepoParty _repoActivity;        
        public MessageController(IMapper mapper, IRepoMessage repoMessage
                , IRepoMember repoMember, IRepoParty repoActivity)
        {
            _repoMessage = repoMessage;
            _mapper = mapper;
            _repoMember = repoMember;
            _repoActivity = repoActivity;
        }

        [HttpGet("{msgId}", Name="GetMessage")]
        public async Task<IActionResult> GetMessage(int myId, int msgId)
        {
            if (myId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var repoMember = await _repoMember.Get(myId);
            if (repoMember == null)
                return NotFound(); 

            var messageRepo = await _repoMessage.GetMessage(msgId);
            if(messageRepo == null)
                return NotFound();

            return Ok(messageRepo);
        }


        [HttpGet("getAllMessages")]
        public async Task<IActionResult> getAllMessages(int myId,[FromQuery]ParaMessage para)
        {
            if (myId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var repoMember = await _repoMember.Get(myId);
            if (repoMember == null)
                return NotFound(); 

            para.UserId = myId;
            var pageMessages = await _repoMessage.GetMessagesForUser(para);
            Response.AddPagination(pageMessages.CurrentPage, pageMessages.PageSize, 
                pageMessages.TotalCount, pageMessages.TotalPages);
    
            var dtoMessages = _mapper.Map<IEnumerable<DtoMessageList>>(pageMessages);

            return Ok(dtoMessages);
        }

        [HttpGet("thread/{recipientId}")]
        public async Task<IActionResult> GetMessageThread(int myId, int recipientId)
        {
            if (myId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();
            
            var repoMessage = await _repoMessage.GetMessageThread(myId, recipientId);
            var dotMesasage = _mapper.Map<IEnumerable<DtoMessageList>>(repoMessage);
            return Ok(dotMesasage);
        }

        [HttpPost]
        public async Task<IActionResult> CreateMessage(int myId, [FromBody]DtoMessageCreate dtoMessageCreate)
        {
            var sender = await _repoMember.Get(myId);
            if (sender.UserId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var recipient = await _repoMember.Get(dtoMessageCreate.RecipientId);
            if(recipient == null)
                return BadRequest("查無此會員");

            dtoMessageCreate.SenderId = myId;
            dtoMessageCreate.SendDate = System.DateTime.Now;

            var message = _mapper.Map<Message>(dtoMessageCreate);

            _repoMessage.Add(message); 
            if(await _repoMessage.SaveAllAsync()>0) 
            {
                var  messageToReturn = _mapper.Map<DtoMessageList>(message);
                return CreatedAtRoute("GetMessage", new {Controller="Message",myId = myId, msgId = message.Id}, messageToReturn);
                //return Ok(messageToReturn);
                //return NoContent();
            } 

            throw new Exception("留言存檔失敗");

        }

        [HttpPost("delete/{msgId}")]
        public async Task<IActionResult> DeleteMessage(int myId, int msgId)
        {
          if (myId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var repoMessage = await _repoMessage.GetMessage(msgId);
            if(repoMessage.SenderId == myId)
                repoMessage.SenderDeleted = true;
            
            if(repoMessage.RecipientId == myId)
                repoMessage.RecipientDeleted = true;
            
            if(repoMessage.SenderDeleted && repoMessage.RecipientDeleted)
                _repoMessage.Delete(repoMessage);

            if(_repoMessage.SaveAll()>0)
                return NoContent();
            
            throw new Exception("刪除留言失敗");
        }

        [HttpPost("markRead/{msgId}")]
        public async Task<IActionResult> MarkMessageAsRead(int myId, int msgId)
        {
            if (myId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();
            
            var repoMessage=await _repoMessage.GetMessage(msgId);
            if(repoMessage.RecipientId != myId)
                return Unauthorized();
            
            repoMessage.IsRead =true;
            repoMessage.ReadDate = System.DateTime.Now;
            
            _repoMessage.SaveAll();

            return NoContent();
        }
    }
}