using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PartyApi.Controllers;
using PartyApi.Dtos;
using PartyApi.Helpers;
using PartyApi.Models;
using PartyApi.Repository;

namespace PartyApi.Controllers
{
    [Authorize]
    [Route("api/[controller]/member/{userId}/party/{partyId}")]
    [ApiController]
    public class ActivityController : BaseController
    {
        private readonly IMapper _mapper;
        private readonly IRepoActivity _repoActivity;
        private readonly IRepoMember _repoMember;
        private readonly IRepoParty _repoParty;
        public ActivityController(IMapper mapper, IRepoActivity repoActivity, 
            IRepoMember repoMember, IRepoParty repoParty)
        {
            this._repoParty = repoParty;
            this._repoMember = repoMember;
            this._mapper = mapper;
            this._repoActivity = repoActivity;
        }

        [HttpPost("sendActivityOrder")]
        public async Task<IActionResult> sendActivityOrder(int userId, int partyId)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var member = await _repoMember.Get(userId);
            if (member == null)
                return NotFound();

            var party = await _repoParty.Get(partyId);
            if (party == null)
                return NotFound();

            var activity = await _repoActivity.GetActivityMember(userId, partyId);
            if (activity != null)
                return BadRequest("您已經有報名了,不可以重復報名");

            var today = System.DateTime.Today;
            int amt;

            if (today <= party.EarlyDate)
            {
                if (member.Sex == 1)
                {
                    amt = (int)party.EarlyManAmt;
                }
                else
                {
                    amt = (int)party.EarlyWomanAmt;
                }
            }
            else
            {
                if (member.Sex == 1)
                {
                    amt = party.ManAmt;
                }
                else
                {
                    amt = party.WomanAmt;
                }
            }

            var result = new Activity
            {
                UserId = userId,
                PartyId = partyId,
                ApplyDate = today,
                ActAmt = amt,
                CheckOver = 0,
                MyNo = 0
            };

            _repoActivity.Add<Activity>(result);

            if (_repoActivity.SaveAll() > 0)
                return Ok();

            return BadRequest("寫入資料庫失敗,請洽詢服務人員");
        }


        [HttpGet("memberList")]
        public async Task<IActionResult> GetActivityMemberList(int userId, int partyId)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            // var member = await _repoMember.Get(userId);
            // if (member == null)
            //     return NotFound();

            var activity = await _repoActivity.GetActivityMember(userId, partyId);
            if (activity == null)
                return BadRequest("您没有報名此活動,無法使用此功能");

            var activityMembers = await _repoActivity.GetActivityMemberList(userId, partyId);

            var dtoMemberList = _mapper.Map<IEnumerable<DtoMemberList>>(activityMembers);

            return Ok(dtoMemberList);
        }

        [HttpGet("member/{id}/detail")]
        public async Task<IActionResult> GetMemberDetail(int userId,int partyId,int id)
        {
            if(userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var activity = await _repoActivity.GetActivityMember(userId,partyId);
            if(activity == null)
                return BadRequest("您没有報名這場活動,無法查詢資料");
            
            var member = await _repoMember.GetDetail(id);
            if(member == null)
                return NotFound();

            var dtoMember = _mapper.Map<DtoMemberDetail>(member);
            return Ok(dtoMember);
        }

        [HttpPost("like/{likeId}")]
        public async Task<IActionResult> SendActivityLike(int userId, int partyId, int likeId)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var activity = await _repoActivity.GetActivityMember(userId, partyId);
            if (activity == null)
                return BadRequest("您没有報名這場活動,無法投票");

            if (await _repoActivity.CheckActivityLike(userId, partyId, likeId))
                return BadRequest("您已經有投票給這個人了,看來您真的喜歡,去留言板告白吧!");

            //check max 5 likees
            var count = await _repoActivity.CountActivityLikes(userId, partyId);
            if (count >= 5)
                return BadRequest("您已經投5票了,無法再投票");

            var result = new Liker
            {
                PartyId = partyId,
                UserId = userId,
                LikerId = likeId,
                AddedDate = System.DateTime.Now
            };

            _repoActivity.Add<Liker>(result);

            if (_repoActivity.SaveAll() > 0)
                return Ok();

            return BadRequest("寫入資料庫失敗,請洽詢服務人員");
        }

        [HttpGet("likeList/{isMyLike}")]
        public async Task<IActionResult> GetActivityLikeList(int userId, int partyId, int isMyLike)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            // var member = await _repoMember.Get(userId);
            // if (member == null)
            //     return NotFound();

            var activity = await _repoActivity.GetActivityMember(userId, partyId);
            if (activity == null)
                return BadRequest("您没有報名此活動,無法使用此功能");

            var isTrue = isMyLike > 0 ? true : false;

            var likeMembers = await _repoActivity.GetActivityLikeList(userId, partyId, isTrue);

            var dtoMemberList = _mapper.Map<IEnumerable<DtoMemberList>>(likeMembers);

            return Ok(dtoMemberList);
        }

        [HttpGet("MyActivityList")]
        public async Task<IActionResult> GetMyActivityList(int userId, [FromQuery]ParaActivity para)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var results = await _repoActivity.GetMyActivityList(userId,para);
            if (results == null)
                return NotFound();

            Response.AddPagination(results.CurrentPage, para.PageSize, results.TotalCount, results.TotalPages);

            // var dto4List = _mapper.Map<IEnumerable<DtoMemberList>>(repoMember);
            return Ok(results);
        }

    }
}