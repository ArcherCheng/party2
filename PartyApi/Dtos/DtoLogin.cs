namespace PartyApi.Dtos
{
    public class DtoLogin 
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }

    public class DtoLoginToReturn
    {
        public int UserId { get; set; }
        public string UserName { get; set; }
        public string UserRole { get; set; }
        public string MainPhotoUrl { get; set; }
    }

    public class DtoCheckboxItem
    {
        public int KeyId { get; set; }
        public string KeyValue { get; set; }        
        public bool IsChecked { get; set; }      
    }


}