using System;
using PartyApi.Models;

namespace PartyApi.Dtos
{
    public class DtoActivity
    {
        public int Id { get; set; }
        public int PartyId { get; set; }
        public int UserId { get; set; }
        public DateTime ApplyDate { get; set; }
        public int ActAmt { get; set; }
        public int IsWaiting { get; set; }
        public string BankName { get; set; }
        public string BankNumber6 { get; set; }
        public string BankDate { get; set; }
        public string FriendsName { get; set; }
        public int MyNo { get; set; }
        public int CheckOver { get; set; }
        public string RetrunNote { get; set; }
        public string Notes { get; set; }        
        public virtual Member User { get; set; }
        public virtual Party Party { get; set; }

    }

    public class DtoActivityAudit
    {
        public int Id { get; set; }
        public int PartyId { get; set; }
        public int UserId { get; set; }
        public DateTime ApplyDate { get; set; }
        public int ActAmt { get; set; }
        public int IsWaiting { get; set; }
        public string BankName { get; set; }
        public string BankNumber6 { get; set; }
        public string BankDate { get; set; }
        public string FriendsName { get; set; }
        public int MyNo { get; set; }
        public int CheckOver { get; set; }
        public string RetrunNote { get; set; }
        public string Notes { get; set; }  

        //以下為會員檔的資料
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int Sex { get; set; }
        public int BirthYear { get; set; }
        public int Marry { get; set; }
        public int Education { get; set; }        
        public string MainPhotoUrl { get; set; }

        //以下為活動檔的資料
        public string PartyName { get; set; }
        public DateTime PartyDate { get; set; }
    }

}