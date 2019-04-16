using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Http;
using PartyApi.Models;

namespace PartyApi.Dtos
{
    public class DtoMemberList
    {

        //不顯示 個人資料法
        public int UserId { get; set; }
        //public string firstName { get; set; }
        //public string lastName { get; set; }
        //public string phone { get; set; }
        //public string email { get; set; }
        //不顯示,改成顯示出生年
        //public int BirthYear { get; set; }
 	    
         //以下為個人必要的基本條件
        public int Sex { get; set; }
        public int Marry { get; set; }
        public int Education { get; set; }

	    // 以下這些資料會印在聯誼名單的個人資料上
        public int Heights { get; set; }
        public int Weights { get; set; }
        public int Salary { get; set; }
        public string Blood { get; set; }
        public string Star { get; set; }
        public string City { get; set; }
        public string JobType { get; set; }
        public string MainPhotoUrl { get; set; }

        //非原始欄位,計算出來的, 顯示用
        public string UserName { get; set; }
        // public string PhotoUrl { get; set; }
        public int Age{get; set;}
    }        
     
    public class DtoMemberDetail : DtoMemberList
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        //public string phone { get; set; }
        //public string email { get; set; }
        //public DateTime birthday { get; set; }
        public int BirthYear { get; set; }

        // 個人特別介紹資料,可在明細查詢,以加深他人印象
        public string School { get; set; }
        public string Subjects { get; set; }
        public string Introduction { get; set; }
        public string LikeCondition { get; set; }
        public string NickName { get; set; }
        public ICollection<DtoPhotoList> Photos{get;set;}
    }

    public class DtoMemberEdit 
    {
        public int UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public int BirthYear { get; set; }
        public int Sex { get; set; }
        public int Marry { get; set; }
        public int Education { get; set; }

	    // 以下這些資料會印在聯誼名單的個人資料上
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

        //以下為個人的其他未顯示欄位
        public string NickName { get; set; }
        public string PdQuestion { get; set; }
        public string PdAnswer { get; set; }
        public string BankName { get; set; }
        public string BankNumber6 { get; set; }
        public bool  IsCloseData { get; set; }
        public bool  IsClosePhoto { get; set; }
        // public MemberCondition MemberCondition{ get; set; }
        public ICollection<DtoPhotoList> Photos{get;set;}

    }

    public class DtoMemberCondition
    {
        public int UserId { get; set; }
        public int MarryMin { get; set; }
        public int MarryMax { get; set; }
        public int YearMin { get; set; }
        public int YearMax { get; set; }
        public int EducationMin { get; set; }
        public int EducationMax { get; set; }
        public int HeightsMin { get; set; }
        public int HeightsMax { get; set; }
        public int WeightsMin { get; set; }
        public int WeightsMax { get; set; }
        public int SalaryMin { get; set; }
        public string BloodInclude { get; set; }
        public string StarInclude { get; set; }
        public string CityInclude { get; set; }
        public string JobTypeInclude { get; set; }
        public string ReligionInclude { get; set; }       
    }

  
}