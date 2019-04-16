using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using PartyApi.Dtos;
using PartyApi.Helpers;
using PartyApi.Models; 
using PartyApi.Repository;

namespace PartyApi.Controllers
{
    // [Authorize]
    [AllowAnonymous]
    [Route("api/[controller]")]
    [ApiController]
    public class PartyController : BaseController
    {
        private readonly IRepoParty _repo;
        private readonly IMapper _mapper;

        public PartyController(IRepoParty repo, IMapper mapper)
        {
            this._repo = repo;
            this._mapper = mapper;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetPartyDetail(int id)
        {
            var party = await _repo.Get(id);
            var dtoPartyDetail = _mapper.Map<DtoPartyDetail>(party);
            return Ok(dtoPartyDetail);
        }

        //取得今天之前尚未到期的活動,查詢及報名用
        [HttpGet]
        public async Task<IActionResult> GetNewList()
        {
            var partys = await _repo.GetNewList();
            var dtoPartyList = _mapper.Map<IEnumerable<DtoPartyList>>(partys);
            return Ok(dtoPartyList);
        }

        //取得前一個月內的活動,讓參加的會員可以查詢及留言等
        [HttpGet("activityList")]
        public async Task<IActionResult> GetActivityList([FromQuery]ParaParty para)
        {
            // if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            //     return Unauthorized();

            var partys = await _repo.GetActivityList();
            var dtoPartyList = _mapper.Map<IEnumerable<DtoPartyList>>(partys);
            return Ok(dtoPartyList);
        }

        //取得歷史活動
        [HttpGet("historyList")]
        public async Task<IActionResult> GetHistoryList([FromQuery]ParaParty para)
        {
            var partys = await _repo.GetHistoryList(para);
            var dtoPartyList = _mapper.Map<IEnumerable<DtoPartyList>>(partys);
            Response.AddPagination(partys.CurrentPage,partys.PageSize,partys.TotalCount,partys.TotalPages);
            return Ok(dtoPartyList);
        }

        [HttpGet("{partyId}/photoList")]
        public async Task<IActionResult> GetPhotoList(int partyId)
        {
            var partyPhotos = await _repo.GetPhotoList(partyId);
            return Ok(partyPhotos);
        }

        [HttpGet("{partyId}/summary")]
        public async Task<IActionResult> GetSummary(int partyId)
        {
            var result = await _repo.GetPartySummary(partyId);
            return Ok(result);
        }


        // [Authorize]
        // [HttpPost]
        // public async Task<IActionResult> Create(DtoPartyDetail dtoPartyDetail)
        // {
        //     var party = _mapper.Map<Party>(dtoPartyDetail);
        //     _repo.Add(party);
        //     if (await _repo.SaveAllAsync()>0)
        //         return Ok(party);
        //     return BadRequest("新增活動失敗");
        // }

    }
}


/*
{
    "partyName":"026科技新貴年輕未婚男女聯誼會",
    "partyDate":"2018/10/6",
    "beginTime":"13:00",
    "endTime":"17:00",
    "marry":"1",
    "persons":"50",
    "manAmt":"600",
    "manEducaton":"4",
    "manOlds1":"23",
    "manOlds2":"35",
    "womanAmt":"500",
    "womanEducaton":"4",
    "womanOlds1":"23",
    "womanOlds2":"35",
    "earlyDate":"2018/10/1",
    "earlyManAmt":"450",
    "earlyWomanAmt":"450",
    "pictureUrl":"https://randomuser.me/api/portraits/women/3.jpg",
    "restaurant":"Mr.Brown Coffee",
    "addressNo":"台北市忠孝東路165號",
    "busNote":"捷運忠孝復興站5號出口",
    "notes":"Test"
}
*/
