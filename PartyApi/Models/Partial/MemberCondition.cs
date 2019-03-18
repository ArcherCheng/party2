using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;


namespace PartyApi.Models
{
    [Microsoft.AspNetCore.Mvc.ModelMetadataType(typeof(MetadataClass))]
    public partial class MemberCondition : IBaseEntity
    {
        private class MetadataClass
        {
            [Key]
            int UserId { get; set; }
        }
       // public virtual Member Member { get; set; }

    }
}
