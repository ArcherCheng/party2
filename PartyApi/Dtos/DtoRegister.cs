using System;
using System.ComponentModel.DataAnnotations;

namespace PartyApi.Dtos
{
    public class DtoRegister
    {
        [Required]
        public string FirstName { get; set; }
        
        [Required]
        public string LastName { get; set; }
        
        [Required]
        public string Phone { get; set; }
        
        [Required]
        public string Email { get; set; }
        
        [Required]
        public DateTime Birthday { get; set; }
        
        [Required]
        public int Sex { get; set; }
        
        [Required]
        public int Marry { get; set; }
        
        [Required]
        public int Education { get; set; }

        [Required]
        public int Heights { get; set; }
        
        [Required]
        public int Weights { get; set; }

        [Required]
        public int Salary { get; set; }
       

        [Required]
        public string Blood { get; set; }

        [Required]
        public string City { get; set; }

        [Required]
        public string Star { get; set; }

        [Required]
        public string JobType { get; set; }

        [Required]
        public string Religion { get; set; }

        [Required]
        [StringLength(12, MinimumLength = 4, ErrorMessage = "密碼最少要4個字,最多12個字")]
        public string password { get; set; }

        //以下由系統自動產生的登入記錄
        public string pdQuestion { get; set; }
        public string pdAnswer { get; set; }       
        public DateTime lastDate { get; set; }
        public DateTime activeDate { get; set; }
        public DtoRegister()
        {
            pdQuestion="我的電子郵牛";
            pdAnswer="台北單身派對";
            lastDate= DateTime.Now;
            activeDate=DateTime.Now;
        }
 
        
    }
}