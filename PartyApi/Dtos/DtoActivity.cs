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
}