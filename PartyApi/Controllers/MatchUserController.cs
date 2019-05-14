using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using PartyApi.Dtos;
using PartyApi.Helpers;
using PartyApi.Models;
using PartyApi.Repository;

namespace PartyApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MatchUserController : BaseController
    {
        private readonly IRepoMatchUser _repoMatchUser;
        private readonly IMapper _mapper;
        public MatchUserController(IRepoMatchUser repoMatchUser, IMapper mapper)
        {
            this._mapper = mapper;
            this._repoMatchUser = repoMatchUser;
        }

        [HttpGet("userList")]
        public async Task<IActionResult> GetUserList([FromQuery]ParaMember para) 
        {
            var repoUserList = await _repoMatchUser.GetUserList(para);

            Response.AddPagination(repoUserList.CurrentPage, repoUserList.PageSize, 
                    repoUserList.TotalCount, repoUserList.TotalPages);

            var dtoUserList = _mapper.Map<IEnumerable<DtoMemberList>>(repoUserList);

            return Ok(dtoUserList);
        }

        [HttpGet("userDetail/{userId}")]
        public async Task<IActionResult> GetUserDetail(int userId)
        {
            var member = await _repoMatchUser.GetUserDetail(userId);
            var dtoMember = _mapper.Map<DtoMemberDetail>(member);
            return Ok(dtoMember);
        }

        [HttpGet("userPhotos/{userId}")]
        public async Task<IActionResult> GetUserPhotos(int userId)
        {
            var photos = await _repoMatchUser.GetUserPhotos(userId);
            return Ok(photos);
        }

        [HttpGet("userCondition/{userId}")]
        public async Task<IActionResult> GetUserCondition(int userId)
        {
           var memberCondition = await _repoMatchUser.GetUserCondition(userId);
            if (memberCondition == null) 
            {
                memberCondition = new MemberCondition();
                memberCondition.UserId = userId;
                memberCondition.BloodInclude = "";
                memberCondition.StarInclude = "";
                memberCondition.CityInclude = "";
                memberCondition.JobTypeInclude = "";
                memberCondition.ReligionInclude = "";
                memberCondition.WeightsMin=40;
                memberCondition.WeightsMax=100;
                memberCondition.HeightsMin=140;
                memberCondition.HeightsMax=200;
                memberCondition.MarryMin=1;
                memberCondition.MarryMax=3;
                memberCondition.EducationMin=0;
                memberCondition.EducationMax=6;
                memberCondition.YearMin=1960;
                memberCondition.YearMax=2000;
                memberCondition.Sex=1;
            }
            var dtoMemberCondition = _mapper.Map<DtoMemberCondition>(memberCondition);
            return Ok(dtoMemberCondition);
        }

        [HttpPost("userMatchList")]
        public async Task<IActionResult> GetMatchList([FromBody]MemberCondition condition , [FromQuery]ParaMember param)
        {
            param.Condition = condition;
            param.UserId = 0;

            // para.UserId = userId;
            var repoMember = await _repoMatchUser.GetMatchList(param);
            Response.AddPagination(repoMember.CurrentPage, repoMember.PageSize, repoMember.TotalCount, repoMember.TotalPages);

            var dtoMemberList = _mapper.Map<IEnumerable<DtoMemberList>>(repoMember);
            return Ok(dtoMemberList);
        }        

        [HttpGet("userMatchList/{userId}")]
        public async Task<IActionResult> GetMyMatchList(int userId, [FromQuery]ParaMember param)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            param.UserId = userId;
            var repoMember = await _repoMatchUser.GetMatchList(param);
            Response.AddPagination(repoMember.CurrentPage, repoMember.PageSize, repoMember.TotalCount, repoMember.TotalPages);

            var dtoMemberList = _mapper.Map<IEnumerable<DtoMemberList>>(repoMember);
            return Ok(dtoMemberList);
        }        


        [HttpPost("userCondition/update/{userId}")]
        public async Task<IActionResult> UserConditionUpdate(int userId, [FromBody]DtoMemberCondition model)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();
            var repoMember = await _repoMatchUser.GetUserDetail(userId);
            repoMember.ActiveDate = System.DateTime.Now;
            _repoMatchUser.Update(repoMember);

            var repoMemberCondition = await _repoMatchUser.GetUserCondition(userId);
            if (repoMemberCondition == null)
            {
                repoMemberCondition = new MemberCondition();
                _mapper.Map(model, repoMemberCondition);
                _repoMatchUser.Add(repoMemberCondition);
            }
            else
            {
                _mapper.Map(model, repoMemberCondition);
                _repoMatchUser.Update(repoMemberCondition);
            }
            if (await _repoMatchUser.SaveAllAsync() > 0)
                return Ok(repoMemberCondition);

            return BadRequest("配對條件存檔失敗");
        }



    }
}