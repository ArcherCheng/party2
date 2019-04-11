using System;
using System.Collections.Generic;

namespace PartyApi.Models
{
    public partial class Member
    {
        // public Member()
        // {
        //     Activity = new HashSet<Activity>();
        //     LikerMe = new HashSet<Liker>();
        //     MyLiker = new HashSet<Liker>();
        //     MemberPhoto = new HashSet<MemberPhoto>();
        //     MessageRecipient = new HashSet<Message>();
        //     MessageSender = new HashSet<Message>();
        // }

        public int UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public int Sex { get; set; }
        public DateTime Birthday { get; set; }
        public int Marry { get; set; }
        public int Education { get; set; }
        public int Heights { get; set; }
        public int Weights { get; set; }
        public int Salary { get; set; }
        public string Blood { get; set; }
        public string Star { get; set; }
        public string City { get; set; }
        public string School { get; set; }
        public string Subjects { get; set; }
        public string JobType { get; set; }
        public string Religion { get; set; }
        public string Introduction { get; set; }
        public string LikeCondition { get; set; }
        public string NickName { get; set; }
        public string PdQuestion { get; set; }
        public string PdAnswer { get; set; }
        public bool IsCloseData { get; set; }
        public bool IsClosePhoto { get; set; }
        public string BankName { get; set; }
        public string BankNumber6 { get; set; }

        //這部份內容由程式自動產生
        public string MainPhotoUrl { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public DateTime? LastDate { get; set; }
        public DateTime? ActiveDate { get; set; }

        //備用欄位
        public string EmailCode { get; set; }
        public string PhoneCode { get; set; }
        public string IdPhoto11Url { get; set; }
        public string IdPhoto12Url { get; set; }
        public int IdCheck { get; set; }
        public string JobPhotoUrl { get; set; }
        public int JobCheck { get; set; }
        public string SchoolUrl { get; set; }
        public int SchoolCheck { get; set; }
        public int UnPayTimes { get; set; }
        public int ResetPassword { get; set; }
        
        //由admin來輸入
        public string UserRole { get; set; }
        public int IsBlackUser { get; set; }
        public int? WriteType { get; set; }
        public DateTime? WriteTime { get; set; }
        public string WriteUser { get; set; }
        public string WriteIp { get; set; }

        public virtual ICollection<MemberPhoto> MemberPhoto { get; set; }
        public virtual MemberCondition MemberCondition { get; set; }
        public virtual ICollection<Activity> Activity { get; set; }
        public virtual ICollection<Liker> LikerMe { get; set; }
        public virtual ICollection<Liker> MyLiker { get; set; }
        public virtual ICollection<Message> MessageRecipient { get; set; }
        public virtual ICollection<Message> MessageSender { get; set; }
    }
}
