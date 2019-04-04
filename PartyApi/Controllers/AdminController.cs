using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PartyApi.Dtos;
using PartyApi.Repository;
using PartyApi.Helpers;

namespace PartyApi.Controllers
{
    //[Authorize]
    [Authorize(Roles = "Admin")]
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : BaseController
    {
        private readonly IRepoAdmin _repoAdmin;
        private readonly IMapper _mapper;
        public AdminController(IMapper mapper, IRepoAdmin repoAdmin)
        {
            this._mapper = mapper;
            this._repoAdmin = repoAdmin;
        }

        [HttpGet("partyList")]
        public async Task<IActionResult> getPartyList([FromQuery]BaseParameter para) 
        {
            // var role = User.FindFirst(ClaimTypes.Role).ToString();
            // bool res = User.IsInRole("Admin");
            // if ( !res ) 
            // {
            //     return Unauthorized();
            // }
           
            var repoList = await _repoAdmin.GetPartyList(para);
            Response.AddPagination(repoList.CurrentPage, repoList.PageSize, repoList.TotalCount, repoList.TotalPages);

            var dtoList = _mapper.Map<IEnumerable<DtoPartyList>>(repoList);

            return Ok(dtoList); 
        }

        [HttpGet("party/{partyId}")]
        public async Task<IActionResult> getParty(int partyId) 
        {
            var repo = await _repoAdmin.GetParty(partyId);
            var dto = _mapper.Map<DtoPartyList>(repo);
            return Ok(dto);
        }

        [HttpGet("memberList")]
        public async Task<IActionResult> getMemberList([FromQuery]BaseParameter para) 
        {
            // var role = User.FindFirst(ClaimTypes.Role).ToString();
            // bool res = User.IsInRole("Admin");
            // if ( !res ) 
            // {
            //     return Unauthorized();
            // }
           
            var repoList = await _repoAdmin.GetMemberList(para);
            Response.AddPagination(repoList.CurrentPage, repoList.PageSize, repoList.TotalCount, repoList.TotalPages);

            var dtoList = _mapper.Map<IEnumerable<DtoMemberList>>(repoList);

            return Ok(dtoList);
        }        

        [HttpGet("member/{userId}")]
        public async Task<IActionResult> getMember(int userId) 
        {
            var repo = await _repoAdmin.GetMember(userId);
            var dto = _mapper.Map<DtoMemberList>(repo);
            return Ok(dto);
        }


    }
}