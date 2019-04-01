using System;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using PartyApi.Models;
using System.Collections.Generic;

namespace PartyApi.Repository
{
    public class RepoAuth : BaseRepository,IRepoAuth
    {
        public RepoAuth(AppDbContext dbContext) : base(dbContext)
        {
        }

        // private readonly AppDbContext _context;
        // public RepoAuth(AppDbContext context)
        // {
        //     _context = context;
        // }

        public async Task<Member> Login(string userPhoneMail, string password)
        {
            var user = await _db.Member.Include(p=>p.MemberPhoto).FirstOrDefaultAsync(p => p.Phone == userPhoneMail || p.Email == userPhoneMail);  //.FirstOrDefaultAsync(p => p.phono == userPhoneMail || p.email == userPhoneMail);
            if (user == null)
                return null;

            if (!verifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
                return null;

            return user;
        }

        public async Task<Member> Register(Member user, string password)
        {
            byte[] passwordHash, passwordSalt;
            createPasswordHash(password, out passwordHash, out passwordSalt);
            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;

            await _db.Member.AddAsync(user);
            await _db.SaveChangesAsync();

            return user;
        } 

        public async Task<bool> UserExists(string userPhone, string userMail)
        {
            var user = await _db.Member.FirstOrDefaultAsync(p => p.Phone == userPhone || p.Email == userMail);

            if (user == null)
                return false;

            return true;
        }

        private bool verifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != passwordHash[i]) return false;
                }
                return true;
            }
        }
        private void createPasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }
        public async Task<IEnumerable<CheckboxItem>> GetCheckboxItemList(string keyGroup)
        {
            var result = await _db.CheckboxItem
                .Where(x => x.KeyGroup == keyGroup)
                .OrderBy(x =>x.KeyId)
                // .Select(x => new {
                //     KeyId = x.KeyId,
                //     KeyValue =  x.KeyValue,
                //     IsChecked = x.IsChecked
                // })
                .ToListAsync();
            return result;
        }        

    }
}
 
