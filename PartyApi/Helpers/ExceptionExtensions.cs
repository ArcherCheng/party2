using System;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;

namespace PartyApi.Helpers
{
    public static class ExceptionExtensions
    {
        public static void AddApplicationError(this HttpResponse response, string message)
        {
            response.Headers.Add("Application-Error",message);
            response.Headers.Add("Access-Control-Expose-Headers","Application-Error");
            response.Headers.Add("Access-Control-Allow-Origin","*");
        }

    




    }
}