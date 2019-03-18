using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PartyApi.Controllers;
using PartyApi.Dtos;
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
        private readonly IRepoActivity _repo;
        private readonly IRepoMember _repoMember;
        private readonly IRepoParty _repoParty;
        public ActivityController(IMapper mapper, IRepoActivity repo, IRepoMember repoMember, IRepoParty repoParty)
        {
            this._repoParty = repoParty;
            this._repoMember = repoMember;
            this._mapper = mapper;
            this._repo = repo;
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

            var activity = await _repo.GetActivityMember(userId, partyId);
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

            _repo.Add<Activity>(result);

            if (_repo.SaveAll() > 0)
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

            var activity = await _repo.GetActivityMember(userId, partyId);
            if (activity == null)
                return BadRequest("您没有報名此活動,無法使用此功能");

            var activityMembers = await _repo.GetActivityMemberList(userId, partyId);

            var dtoMemberList = _mapper.Map<IEnumerable<DtoMemberList>>(activityMembers);

            return Ok(dtoMemberList);
        }

        [HttpPost("like/{likeId}")]
        public async Task<IActionResult> SendActivityLike(int userId, int partyId, int likeId)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var activity = await _repo.GetActivityMember(userId, partyId);
            if (activity == null)
                return BadRequest("您没有報名這場活動,無法投票");

            if (await _repo.CheckActivityLike(userId, partyId, likeId))
                return BadRequest("您已經有投票給這個人了,看來您真的喜歡,去留言板告白吧!");

            //check max 5 likees
            var count = await _repo.CountActivityLikes(userId, partyId);
            if (count >= 5)
                return BadRequest("您已經投5票了,無法再投票");

            var result = new Liker
            {
                PartyId = partyId,
                UserId = userId,
                LikerId = likeId,
                AddedDate = System.DateTime.Now
            };

            _repo.Add<Liker>(result);

            if (_repo.SaveAll() > 0)
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

            var activity = await _repo.GetActivityMember(userId, partyId);
            if (activity == null)
                return BadRequest("您没有報名此活動,無法使用此功能");

            var isTrue = isMyLike > 0 ? true : false;

            var likeMembers = await _repo.GetActivityLikeList(userId, partyId, isTrue);

            var dtoMemberList = _mapper.Map<IEnumerable<DtoMemberList>>(likeMembers);

            return Ok(dtoMemberList);
        }

        // [HttpGet("MyActivityList")]
        // public async Task<IActionResult> GetMyActivityList(int userId, int partyId, int isMyLike)
        // {
        //     if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
        //         return Unauthorized();

        //     // var member = await _repoMember.Get(userId);
        //     // if (member == null)
        //     //     return NotFound();

        //     var activity = await _repo.GetActivityMember(userId, partyId);
        //     if (activity == null)
        //         return BadRequest("您没有報名此活動,無法使用此功能");

        //     var isTrue = isMyLike > 0 ? true : false;

        //     var likeMembers = await _repo.GetActivityLikeList(userId, partyId, isTrue);

        //     var dtoMemberList = _mapper.Map<IEnumerable<DtoMemberList>>(likeMembers);

        //     return Ok(dtoMemberList);
        // }

    }
}