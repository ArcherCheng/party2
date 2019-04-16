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
        private readonly IRepoMember _repoMember;
        private readonly IMapper _mapper;
        private readonly IRepoParty _repoParty;
        private readonly IRepoMemberPhoto _repoPhoto;
        private readonly IRepoMemberCondition _repoCondition;
        private readonly IRepoActivity _repoActivity;

        public MemberController(IRepoMember repoMember, IMapper mapper, IRepoParty repoParty, 
        IRepoMemberPhoto repoPhoto, IRepoMemberCondition repoCondition, IRepoActivity repoActivity)
        {
            _repoCondition = repoCondition;
            _mapper = mapper;
            _repoParty = repoParty;
            _repoPhoto = repoPhoto;
            _repoMember = repoMember;
            _repoActivity = repoActivity;
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetUser(int userId)
        {
            var member = await _repoMember.GetDetail(userId);
            var dtoMember = _mapper.Map<DtoMemberDetail>(member);
            return Ok(dtoMember);
        }

        [HttpGet("{userId}/memberDetail")]
        public async Task<IActionResult> GetDetail(int userId)
        {
            var member = await _repoMember.GetDetail(userId);
            var dtoMember = _mapper.Map<DtoMemberDetail>(member);
            return Ok(dtoMember);
        }

        [HttpGet("{userId}/party/{partyId}/memberDetail")]
        public async Task<IActionResult> Get(int userId, int partyId)
        {
            var member = await _repoMember.Get(userId);
            var dtoMember = _mapper.Map<DtoMemberDetail>(member);
            return Ok(dtoMember);
        }

        [HttpGet("{userId}/myEdit")]
        public async Task<IActionResult> GetMyEdit(int userId)
        {
            var member = await _repoMember.GetEdit(userId);
            var dtoMember = _mapper.Map<DtoMemberEdit>(member);
            return Ok(dtoMember);
        }

        [HttpPost("{userId}/myEditUpdate")]
        public async Task<IActionResult> MyEditUpdate(int userId, [FromBody]DtoMemberEdit model)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var repoMember = await _repoMember.Get(userId);
            _mapper.Map(model, repoMember);
            repoMember.ActiveDate = System.DateTime.Now;
            _repoMember.Update(repoMember);
    
            if (await _repoMember.SaveAllAsync() > 0)
                return NoContent();

            throw new System.Exception($"更新使用者資料失敗,ID = {userId}");
        }

        [HttpGet("{userId}/Photos")]
        public async Task<IActionResult> GetPhotos(int userId)
        {
            var photos = await _repoPhoto.GetPhotos(userId);
            var dtoPhoto = _mapper.Map<IEnumerable<DtoPhotoList>>(photos);
            return Ok(dtoPhoto);
        }

        [HttpGet("{userId}/MyCondition")]
        public async Task<IActionResult> GetMyCondidtion(int userId)
        {
            var memberCondition = await _repoCondition.Get(userId);
            if (memberCondition == null) 
            {
                memberCondition = new MemberCondition();
                memberCondition.UserId = userId;
                memberCondition.BloodInclude = "";
                memberCondition.StarInclude = "";
                memberCondition.CityInclude = "";
                memberCondition.JobTypeInclude = "";
                memberCondition.ReligionInclude = "";
            }
            var dtoMemberCondition = _mapper.Map<DtoMemberCondition>(memberCondition);
            return Ok(dtoMemberCondition);
        }

        [HttpPost("{userId}/MyCondition/Update")]
        public async Task<IActionResult> MyConditionUpdate(int userId, [FromBody]DtoMemberCondition model)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();
            var repoMember = await _repoMember.Get(userId);
            repoMember.ActiveDate = System.DateTime.Now;
            _repoMember.Update(repoMember);

            var repoMemberCondition = await _repoMember.GetMemberCondition(userId);
            if (repoMemberCondition == null)
            {
                repoMemberCondition = new MemberCondition();
                _mapper.Map(model, repoMemberCondition);
                _repoCondition.Add(repoMemberCondition);
            }
            else
            {
                _mapper.Map(model, repoMemberCondition);
                _repoCondition.Update(repoMemberCondition);
            }
            if (await _repoMember.SaveAllAsync() > 0)
                return Ok(repoMemberCondition);

            return BadRequest("配對條件存檔失敗");
        }

        [HttpGet("{userId}/myMatchList")]
        public async Task<IActionResult> GetMyMatchList(int userId, [FromQuery]ParaMember para)
        {
            // int userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            return Unauthorized();

            para.UserId = userId;
            var repoMember = await _repoMember.GetMatchList(para);
            Response.AddPagination(repoMember.CurrentPage, repoMember.PageSize, repoMember.TotalCount, repoMember.TotalPages);

            var dtoMemberList = _mapper.Map<IEnumerable<DtoMemberList>>(repoMember);
            return Ok(dtoMemberList);
        }

        [HttpDelete]
        public async Task<IActionResult> delete(int userId)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var repoData = await _repoMember.Get(userId);
            // repoData.isClose = true;

            if (_repoMember.SaveAll() > 0)
                return NoContent();

            throw new System.Exception($"關閉使用者資料失敗,ID = {userId}");
        }

        [HttpGet("{userId}/myPartyList")]
        public async Task<IActionResult> GetMyPartyList(int userId, [FromQuery]ParaMember para)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            return Unauthorized();

            para.UserId = userId;

            var partyList = await _repoMember.GetMemberPartyList(para);
            Response.AddPagination(partyList.CurrentPage, partyList.PageSize, partyList.TotalCount, partyList.TotalPages);

            var dtoPartyList = _mapper.Map<IEnumerable<DtoPartyList>>(partyList);
            return Ok(dtoPartyList);
        }

        [HttpGet("{userId}/myPartyPay/{partyId}")]
        public async Task<IActionResult> GetActivity(int userId, int partyId)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            return Unauthorized();

            var repoActivity = await _repoActivity.GetActivityMember(userId, partyId);
            var dtoActivity = _mapper.Map<DtoActivity>(repoActivity);
            return Ok(dtoActivity);
        }

        [HttpPost("{userId}/myPartyPay/{partyId}")]
        public async Task<IActionResult> UpdateActivity(int userId, int partyId, [FromBody] DtoActivity dtoActivity)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            return Unauthorized();

            var repoActivity = await _repoActivity.GetActivityMember(userId, partyId);
            repoActivity.BankDate=dtoActivity.BankDate;
            repoActivity.BankName=dtoActivity.BankName;
            repoActivity.BankNumber6=dtoActivity.BankNumber6;
            repoActivity.FriendsName = dtoActivity.FriendsName;
            repoActivity.RetrunNote= dtoActivity.RetrunNote;
            //_mapper.Map(dtoActivity, repoActivity);

            _repoActivity.Update(repoActivity);
            if (await _repoActivity.SaveAllAsync() > 0)
                return NoContent();

            throw new System.Exception($"更新資料失敗");
        }

    }
}

