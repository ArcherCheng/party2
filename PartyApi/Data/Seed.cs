using System.Collections.Generic;
using Newtonsoft.Json;
using PartyApi.Models;

namespace PartyApi.Data 
{
    public class Seed
    {
        private readonly AppDbContext _context;

        public Seed(AppDbContext context)
        {
            _context = context;
        }

        public void SeedMembers()
        {
            var memberJson=System.IO.File.ReadAllText("Data/member.json");
            var members= JsonConvert.DeserializeObject<List<Member>>(memberJson);
            foreach (var member in members)
            {
                byte[] passwordHash,passwordSalt;
                createPasswordHash("password",out passwordHash, out passwordSalt);
                member.PasswordHash = passwordHash;
                member.PasswordSalt = passwordSalt;
                member.NickName = member.FirstName;
                // member.IdCheck=0;
                // member.JobCheck=0;
                // member.IsCloseData=false;
                // member.IsClosePhoto=false;
                // member.UnPayTimes=0;
                // member.SchoolCheck=0;
                // member.ResetPassword=0;
                // member.IsBlackUser=0;
                _context.Member.Add(member);
            }

            _context.SaveChanges();

        }
        private void createPasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

    }
}