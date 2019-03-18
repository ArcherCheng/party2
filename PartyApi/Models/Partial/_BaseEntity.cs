using System;

namespace PartyApi.Models
{
    /// <summary>
    /// 經測試用介面及擴充方法的方式比較有彈性,故不用繼承的方式開發
    /// </summary>
    public interface IBaseEntity
    {
        // [Display(Name = "寫入時間")]
        DateTime? WriteTime { get; set; }

        //1=insert,2=update,3=delete,4=批次過帳
        // [Display(Name = "寫入類別")]
        int? WriteType { get; set; }

        //[Display(Name = "寫入員工")]
        string WriteUser { get; set; }

        //[Display(Name = "寫入位置")]
        string WriteIp { get; set; }
    }

    public static class BaseEntityExtensions
    {
        public static void ToSetWriteUser(this IBaseEntity baseEntity,int writeType, string writeUser, string writeIp)
        {
            baseEntity.WriteTime = System.DateTime.Now;
            baseEntity.WriteType = writeType;
            baseEntity.WriteUser = writeUser; //HttpContext.Current.User.Identity.Name;
            baseEntity.WriteIp =  writeIp; //HttpContext.Current.Request.UserHostAddress.ToString();
        }
    }

    // [MetadataType(typeof(Metadata))]
    // public partial class AA1USR10 : IBaseEntity
    // {
    //     private class Metadata
    //     {
    //         public SexEnum 性別 { get; set; }
    //         public NationalEnum 國別 { get; set; }
    //     }
    // }

    /// <summary>
    /// 經測試用繼承方式,子類別的修正地方會比較多,故捨棄此一方式
    /// </summary>
    // public abstract class BaseEntity 
    // {
    //     public BaseEntity()
    //     {
    //     }
    //     // [Display(Name = "寫入時間")]
    //     public virtual DateTime? WriteTime { get; set; }
    //     // [Display(Name = "寫入類別")]
    //     public virtual int WriteType { get; set; }
    //     // [Display(Name = "寫入員工")]
    //     public virtual string WriteUser { get; set; }
    //     // [Display(Name = "寫入位置")]
    //     public virtual string WriteIp { get; set; }
    //     public void ToSetWriteUser(int type, string writeUser, string writeIp)
    //     {
    //         this.WriteTime = System.DateTime.Now;
    //         this.WriteType = type;
    //         this.WriteUser = writeUser; //HttpContext.Current.User.Identity.Name;
    //         this.WriteIp = writeIp; //HttpContext.Current.Request.UserHostAddress.ToString();
    //     }
    // }

}