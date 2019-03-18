using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;


namespace PartyApi.Models
{
    [Microsoft.AspNetCore.Mvc.ModelMetadataType(typeof(MetadataClass))]
    // [System.ComponentModel.DataAnnotations.MetadataType(typeof(IMember))]
    public partial class Member : IBaseEntity
    {
        public Member()
        {
            Activity = new HashSet<Activity>();
            MemberPhoto = new HashSet<MemberPhoto>();
            MessageRecipient = new HashSet<Message>();
            MessageSender = new HashSet<Message>();
            LikerMe = new HashSet<Liker>();
            MyLiker = new HashSet<Liker>();
            IdCheck = 0;
            JobCheck = 0;
            UnPayTimes = 0;
            SchoolCheck = 0;
            ResetPassword = 0;
            IsBlackUser = 0;
            IsCloseData = false;
            IsClosePhoto = false;
            UserRole = "Users";  //admins
        }

        private class MetadataClass
        {
            [System.ComponentModel.DataAnnotations.Key]
            public int UserId { get; set; }

            [Required]
            [StringLength(16)]
            public string FirstName { get; set; }

            [StringLength(16)]
            [Required]
            public string LastName { get; set; }

            [Required]
            public string Phone { get; set; }

            [Required]
            public string Email { get; set; }

            [Required]
            public int Sex { get; set; }

            [Required]
            [DataType(DataType.Date)]
            public DateTime Birthday { get; set; }

            [Required]
            [Range(1, 3)]
            public int Marry { get; set; }

            [Required]
            [Range(0, 6)]
            public int Education { get; set; }

            // public int IdCheck { get; set; } = 0;
            // public int JobCheck { get; set; } = 0;
            // public int UnPayTimes { get; set; } = 0;
            // public int SchoolCheck { get; set; } = 0;
            // public int ResetPassword { get; set; } = 0;
            // public int IsBlackUser { get; set; } = 0;
            // public string UserRole { get; set; } = "users";
            // public bool IsCloseData { get; set; } = false;
            // public bool IsClosePhoto { get; set; } = false;
        }

    //     public ICollection<MemberPhoto> MemberPhoto { get; set; }
    //     public ICollection<Activity> Activity { get; set; }
    //     public ICollection<Message> MessageRecipient { get; set; }
    //     public ICollection<Message> MessageSender { get; set; }
    //     public ICollection<Liker> LikerMe { get; set; }
    //     public ICollection<Liker> MyLiker { get; set; }
    }
}
