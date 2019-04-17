using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PartyApi.Dtos;
using PartyApi.Repository;
using PartyApi.Helpers;
using PartyApi.Models;

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
            if (repo == null) 
            {
                repo = new Party();
            }
            var dto = _mapper.Map<DtoPartyDetail>(repo);
            return Ok(dto);
        }

        [HttpPost("PartyAdd")]
        public async Task<IActionResult> PartyAdd(DtoPartyDetail model)
        {
            var repoParty = await _repoAdmin.GetParty(model.PartyId);
            if (repoParty == null) 
            {
                repoParty = new Party();
                _mapper.Map(model,repoParty);
                _repoAdmin.Add(repoParty);
            }
            else
            {
                _mapper.Map(model,repoParty);
                _repoAdmin.Update<Party>(repoParty);
            }
            if (await _repoAdmin.SaveAllAsync()>0)
                return Ok(repoParty);

            return BadRequest("存檔派對活動失敗");
        }

        [HttpGet("party/Activity/{partyid}/audit")]
        public async Task<IActionResult> GetActivityAudit(int partyId) 
        {
            var repoActivityList = await _repoAdmin.GetActivityAudit(partyId);
            var dotActivity = _mapper.Map<IEnumerable<DtoActivityAudit>>(repoActivityList);
            return Ok(dotActivity);
        }
        
        [HttpPost("party/Activity/{partyid}/audit")]
        public async Task<IActionResult> UpdateActivityAudit(int partyId) 
        {
            var repoActivityList = await _repoAdmin.GetActivityAudit(partyId);
            var dotActivity = _mapper.Map<IEnumerable<DtoActivityAudit>>(repoActivityList);
            return Ok(dotActivity);
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
           
            var repoMemberList = await _repoAdmin.GetMemberList(para);
            Response.AddPagination(repoMemberList.CurrentPage, repoMemberList.PageSize, 
                    repoMemberList.TotalCount, repoMemberList.TotalPages);

            var dtoList = _mapper.Map<IEnumerable<DtoMemberList>>(repoMemberList);

            return Ok(dtoList);
        }        

        [HttpGet("member/{userId}")]
        public async Task<IActionResult> getMember(int userId) 
        {
            var repoMember = await _repoAdmin.GetMember(userId);
            var dto = _mapper.Map<DtoMemberList>(repoMember);
            return Ok(dto);
        }


    }
}