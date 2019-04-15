using System.Collections.Generic;
using System.Linq;
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
            var memberJson=System.IO.File.ReadAllText("Data/member2.json");
            var members= JsonConvert.DeserializeObject<List<Member>>(memberJson);
            foreach (var member in members) 
            {
                byte[] passwordHash,passwordSalt;
                createPasswordHash("password",out passwordHash, out passwordSalt);
                member.PasswordHash = passwordHash;
                member.PasswordSalt = passwordSalt;
                member.NickName = member.LastName;
                member.IdCheck=0;
                member.JobCheck=0;
                member.IsCloseData=false;
                member.IsClosePhoto=false;
                member.UnPayTimes=0;
                member.SchoolCheck=0;
                member.ResetPassword=0;
                member.IsBlackUser=0;
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

        public void SeedMemberPhotos()
        {
            var photoJson=System.IO.File.ReadAllText("Data/photo1.json");
            var photos= JsonConvert.DeserializeObject<List<MemberPhoto>>(photoJson);
            foreach (var item in photos) 
            {
                _context.MemberPhoto.Add(item);
            }

            _context.SaveChanges();

        }        
        public void SeedMemberCondition()
        {
            var Jsondata=System.IO.File.ReadAllText("Data/condition1.json");
            var model= JsonConvert.DeserializeObject<List<MemberCondition>>(Jsondata);
            foreach (var item in model)
            {
                _context.MemberCondition.Add(item);
            }

            _context.SaveChanges();

        }        
        public void SeedActivity()
        {
            var Jsondata=System.IO.File.ReadAllText("Data/activity.json");
            var model= JsonConvert.DeserializeObject<List<Activity>>(Jsondata);
            foreach (var item in model)
            {
                _context.Activity.Add(item);
                // item.IsWaiting=0;
                // item.MyNo=0; 
                // item.CheckOver=0;
                // var res = _context.Activity
                // .Where(x=> x.UserId == item.UserId && x.PartyId == item.PartyId);

                // if (res == null)
                // {
                //     _context.Activity.Add(item);
                //     // _context.SaveChanges();
                // }
            } 
            _context.SaveChanges(); 

        }        

        public void SeedLiker()
        {
            var today=System.DateTime.Now;
            var Jsondata=System.IO.File.ReadAllText("Data/liker.json");
            var model= JsonConvert.DeserializeObject<List<Liker>>(Jsondata);
            foreach (var item in model)
            {
                item.AddedDate = today;
                _context.Liker.Add(item);
            } 
            _context.SaveChanges();

        }        

    }
}