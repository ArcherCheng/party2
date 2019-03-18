using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;

namespace PartyApi.Models
{
    
    // [Microsoft.AspNetCore.Mvc.ModelMetadataType(typeof(MetadataClass))]
    // public partial class Activitys : IBaseEntity
    // {
    //     private class MetadataClass
    //     {
    //     }
    // }

    [ModelMetadataType(typeof(MetadataClass))]
    public partial class Activity : IBaseEntity
    {
        private class MetadataClass
        {
            [Key]
            public int Id { get; set; }
        }
    }
}
