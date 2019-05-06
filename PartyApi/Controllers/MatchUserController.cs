using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using PartyApi.Dtos;
using PartyApi.Helpers;
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
        public async Task<IActionResult> UserList([FromQuery]ParaMember para) 
        {
            var repoUserList = await _repoMatchUser.GetUserList(para);

            Response.AddPagination(repoUserList.CurrentPage, repoUserList.PageSize, 
                    repoUserList.TotalCount, repoUserList.TotalPages);

            var dtoUserList = _mapper.Map<IEnumerable<DtoMemberList>>(repoUserList);

            return Ok(dtoUserList);
        }


    }
}