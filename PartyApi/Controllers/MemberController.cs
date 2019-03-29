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
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class MemberController : BaseController
    {
        private readonly IRepoMember _repo;
        private readonly IMapper _mapper;
        private readonly IRepoParty _repoParty;
        private readonly IRepoMemberPhoto _repoPhoto;
        private readonly IRepoMemberCondition _repoCondition;

        public MemberController(IRepoMember repo, IMapper mapper, IRepoParty repoParty, IRepoMemberPhoto repoPhoto, IRepoMemberCondition repoCondition)
        {
            _repoCondition = repoCondition;
            _mapper = mapper;
            _repoParty = repoParty;
            _repoPhoto = repoPhoto;
            _repo = repo;
        }

        #region HttpGet read data from db
        [HttpGet("{userId}/matchList")]
        public async Task<IActionResult> GetMatchList(int userId, [FromQuery]ParaMember para)
        {
            // int userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            return Unauthorized();

            para.UserId = userId;
            var repoMember = await _repo.GetMatchList(para);
            Response.AddPagination(repoMember.CurrentPage, repoMember.PageSize, repoMember.TotalCount, repoMember.TotalPages);

            var dtoMemberList = _mapper.Map<IEnumerable<DtoMemberList>>(repoMember);
            return Ok(dtoMemberList);
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetUser(int userId)
        {
            var member = await _repo.GetDetail(userId);
            var dtoMember = _mapper.Map<DtoMemberDetail>(member);
            return Ok(dtoMember);
        }


         [HttpGet("{userId}/memberDetail")]
        public async Task<IActionResult> GetDetail(int userId)
        {
            var member = await _repo.GetDetail(userId);
            var dtoMember = _mapper.Map<DtoMemberDetail>(member);
            return Ok(dtoMember);
        }

        [HttpGet("{userId}/edit")]
        public async Task<IActionResult> GetEdit(int userId)
        {
            var member = await _repo.GetEdit(userId);
            var dtoMember = _mapper.Map<DtoMemberEdit>(member);
            return Ok(dtoMember);
        }

        [HttpGet("{userId}/Photos")]
        public async Task<IActionResult> GetPhotos(int userId)
        {
            var photos = await _repoPhoto.GetPhotos(userId);
            var dtoPhoto = _mapper.Map<IEnumerable<DtoPhotoList>>(photos);
            return Ok(dtoPhoto);
        }

        [HttpGet("{userId}/Condition")]
        public async Task<IActionResult> GetCondidtion(int userId)
        {
            var memberCondition = await _repoCondition.Get(userId);
            var dtoMemberCondition = _mapper.Map<DtoMemberCondition>(memberCondition);
            return Ok(dtoMemberCondition);
        }


        [HttpGet("{userId}/party/{partyId}/memberDetail")]
        public async Task<IActionResult> Get(int userId, int partyId)
        {
            var member = await _repo.Get(userId);
            var dtoMember = _mapper.Map<DtoMemberDetail>(member);
            return Ok(dtoMember);
        }

        #endregion

        #region HttpPut HttpPost 

        [HttpPut("{userId}")]
        public async Task<IActionResult> Put(int userId, [FromBody]DtoMemberEdit model)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var repoMember = await _repo.Get(userId);
            _mapper.Map(model, repoMember);

            if (await _repo.SaveAllAsync() > 0)
                return NoContent();

            throw new System.Exception($"更新使用者資料失敗,ID = {userId}");
        }

        [HttpDelete]
        public async Task<IActionResult> delete(int userId)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var repoData = await _repo.Get(userId);
            // repoData.isClose = true;

            if (_repo.SaveAll() > 0)
                return NoContent();

            throw new System.Exception($"關閉使用者資料失敗,ID = {userId}");
        }

        [HttpPost("{userId}/MemberCondition/Edit")]
        public async Task<IActionResult> MemberCondition(int userId, [FromBody]DtoMemberCondition model)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var repoMemberCondition = await _repo.GetMemberCondition(userId);
            if (repoMemberCondition == null)
            {
                _mapper.Map(model, repoMemberCondition);
                _repoCondition.Add(repoMemberCondition);
            }
            else
            {
                _mapper.Map(model, repoMemberCondition);
                _repoCondition.Update(repoMemberCondition);
            }
            if (await _repo.SaveAllAsync() > 0)
                return Ok(repoMemberCondition);

            return BadRequest("配對條件存檔失敗");

        }





    }
}



        // [HttpGet("{userId}/activity/{partyId}/memberList")]
        // public async Task<IActionResult> GetActivityMemberList(int userId, int partyId)
        // {
        //     if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
        //         return Unauthorized();

        //     var repoMember = await _repo.Get(userId);
        //     if (repoMember == null)
        //         return NotFound();

        //     var activity = await _repo.GetMemberParty(userId, partyId);
        //     if (activity == null)
        //         return BadRequest("您没有報名此活動,無法使用此功能");

        //     var activityMembers = await _repo.GetPartyMemberList(userId, partyId);

        //     var dtoMemberList = _mapper.Map<IEnumerable<DtoMemberList>>(activityMembers);

        //     return Ok(dtoMemberList);
        // }

        // [HttpGet("{userId}/activity/{partyId}/likeList/{isLiker}")]
        // public async Task<IActionResult> GetActivityMemberLikeList(int userId, int partyId, int isLiker)
        // {
        //     if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
        //         return Unauthorized();

        //     var member = await _repo.Get(userId);
        //     if (member == null)
        //         return NotFound();

        //     var activity = await _repo.GetMemberParty(userId, partyId);
        //     if (activity == null)
        //         return BadRequest("您没有報名此活動,無法使用此功能");

        //     var isTrue = isLiker > 0 ? true : false;

        //     var likeMembers = await _repo.GetPartyLikeList(userId, partyId, isTrue);

        //     var dtoMemberList = _mapper.Map<IEnumerable<DtoMemberList>>(likeMembers);

        //     return Ok(dtoMemberList);
        // }



        // [HttpPost("{userId}/party/{partyId}/sendOrder")]
        // public async Task<IActionResult> SendOrderMemberParty(int userId, int partyId)
        // {
        //     if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
        //         return Unauthorized();

        //     var repoMember = await _repo.Get(userId);
        //     if (repoMember == null)
        //         return NotFound();

        //     var activity = await _repo.GetMemberParty(userId, partyId);
        //     if (activity != null)
        //         return BadRequest("您已經有報名了,不可以重復報名");

        //     var repoParty = await _repoParty.Get(partyId);
        //     if (repoParty == null)
        //         return NotFound();

        //     var today = System.DateTime.Today;
        //     int amt;

        //     if (today <= repoParty.EarlyDate)
        //     {
        //         if (repoMember.Sex == 1)
        //         {
        //             amt = (int)repoParty.EarlyManAmt;
        //         }
        //         else
        //         {
        //             amt = (int)repoParty.EarlyWomanAmt;
        //         }
        //     }
        //     else
        //     {
        //         if (repoMember.Sex == 1)
        //         {
        //             amt = repoParty.ManAmt;
        //         }
        //         else
        //         {
        //             amt = repoParty.WomanAmt;
        //         }
        //     }

        //     var result = new Activity
        //     {
        //         UserId = userId,
        //         PartyId = partyId,
        //         ApplyDate = today,
        //         ActAmt = amt,
        //         CheckOver = 0,
        //         MyNo = 0
        //     };

        //     _repo.Add<Activity>(result);

        //     if (_repo.SaveAll() > 0)
        //         return Ok();

        //     return BadRequest("寫入資料庫失敗,請洽詢服務人員");
        // }

        // [HttpPost("{userId}/activity/{partyId}/like/{likeId}")]
        // public async Task<IActionResult> SendActivityLike(int userId, int partyId, int likeId)
        // {
        //     if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
        //         return Unauthorized();

        //     // var repoMember = await _repo.Get(likeId);
        //     // if (repoMember == null)
        //     //     return NotFound();
        //     // var repoParty = await _repoParty.Get(partyId);
        //     // if (repoParty == null)
        //     //    return NotFound();

        //     var activity = await _repo.GetMemberParty(userId, partyId);
        //     if (activity == null)
        //         return BadRequest("您没有報名這場活動,無法投票");

        //     if (await _repo.CheckPartyLike(userId, partyId, likeId))
        //         return BadRequest("您已經有投票給這個人了,看來您真的喜歡,去留言板告白吧!");

        //     //check max 5 likees
        //     var count = await _repo.CountPartyLikes(userId, partyId);
        //     if (count >= 5)
        //         return BadRequest("您已經投5票了,無法再投票");

        //     var result = new Liker
        //     {
        //         PartyId = partyId,
        //         UserId = userId,
        //         LikerId = likeId,
        //         AddedDate = System.DateTime.Now
        //     };

        //     _repo.Add<Liker>(result);

        //     if (_repo.SaveAll() > 0)
        //         return Ok();

        //     return BadRequest("寫入資料庫失敗,請洽詢服務人員");
        // }

        #endregion
