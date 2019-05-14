using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PartyApi.Dtos;
using PartyApi.Helpers;
using PartyApi.Repository;

namespace PartyApi.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class MatchMyUserController : BaseController
    {
        private readonly IRepoMatchUser _repoMatchUser;
        private readonly IMapper _mapper;
        public MatchMyUserController(IRepoMatchUser repoMatchUser, IMapper mapper)
        {
            this._mapper = mapper;
            this._repoMatchUser = repoMatchUser;
        }

        [HttpGet("myDetail/{userId}")]
        public async Task<IActionResult> GetMyDetail(int userId)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var member = await _repoMatchUser.GetUserDetail(userId);
            var dtoMember = _mapper.Map<DtoMemberDetail>(member);
            return Ok(dtoMember);
        }

        [HttpGet("myPhotos/{userId}")]
        public async Task<IActionResult> GetMyPhotos(int userId)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var photos = await _repoMatchUser.GetUserPhotos(userId);
            return Ok(photos);
        }

        [HttpGet("myFriends/{userId}")]
        public async Task<IActionResult> GetMyFriends([FromQuery]ParaMember para) 
        {
            var repoUserList = await _repoMatchUser.GetUserFriends(para);

            Response.AddPagination(repoUserList.CurrentPage, repoUserList.PageSize, 
                    repoUserList.TotalCount, repoUserList.TotalPages);

            var dtoUserList = _mapper.Map<IEnumerable<DtoMemberList>>(repoUserList);

            return Ok(dtoUserList);
        }

        [HttpGet("myCondition/{userId}")]
        public async Task<IActionResult> GetMyCondition(int userId)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var member = await _repoMatchUser.GetUserCondition(userId);
            var dtoMember = _mapper.Map<DtoMemberDetail>(member);
            return Ok(dtoMember);
        }



    }


    
}