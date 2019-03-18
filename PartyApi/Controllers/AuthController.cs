using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using PartyApi.Dtos;
using PartyApi.Models;
using PartyApi.Repository;

namespace PartyApi.Controllers
{
    [Route("api/[controller]")] 
    [ApiController]
    public class AuthController : BaseController
    {
        private readonly IConfiguration _config;
        private readonly IMapper _mapper;
        private readonly IRepoAuth _repo;

        public AuthController(IConfiguration config, IMapper mapper, IRepoAuth repo)
        {
            _mapper = mapper;
            _repo = repo;
            _config = config;
        }

        /*
        {
            "firstName": "趙",
            "lastName": "金龍",
            "email": "a010@mydate.tw",
            "phone": "0970922010",
            "sex": "1",
            "birthday": "1978/12/8",
            "marry": "1",
            "education": "5",
            "password": "password"	
        }
        */
        [HttpPost("register")]
        public async Task<IActionResult> Register(DtoRegister formData)
        {
            if(await _repo.UserExists(formData.Phone,formData.Email))
                return BadRequest("此電話或電郵件已經是會員了");

            if(!ModelState.IsValid)
                return BadRequest(ModelState.ValidationState);


            //寫入註冊資料到資料庫中
            var mapMember  = _mapper.Map<Member>(formData);
            var member = await _repo.Register(mapMember,formData.password);
            return Ok(); 

            //返回簡單使用者資料
            //var user = _mapper.Map<DtoLoginToReturn>(member);
            //Ok(user);
            
            //重新導向使用者資料編輯
            //return CreatedAtRoute("GetAccountr", new {controller = "account", id = userToReturn.USERID}, userToReturn);
        }

        /*
        {
            "username" : "0970922010",
            "password" : "password"
        }
        */
        [HttpPost("login")]
        public async Task<IActionResult> Login(DtoLogin formdata)
        {
            var member = await _repo.Login(formdata.Username,formdata.Password);
            if(member == null)
                return Unauthorized();

            var userName= member.FirstName + member.LastName;
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, member.UserId.ToString()),
                new Claim(ClaimTypes.Name, userName),
                new Claim(ClaimTypes.Role, member.UserRole)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(30),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            //返回簡單使用者資料
            var user = _mapper.Map<DtoMemberList>(member);

            return Ok(new
            {
                token = tokenHandler.WriteToken(token),
                user
            });
        }
    }
}