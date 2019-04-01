using System.Collections.Generic;
using System.Threading.Tasks;
using PartyApi.Models;

namespace PartyApi.Repository
{
    public interface IRepoAuth
    {
        Task<Member> Register(Member user,string password);
        Task<Member> Login(string userPhoneMail,string password);
        Task<bool> UserExists(string userPhone, string userMail);
        Task<IEnumerable<CheckboxItem>> GetCheckboxItemList(string keyGroup);

    }
    
}