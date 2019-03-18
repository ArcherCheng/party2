using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace PartyApi.Controllers
{
    [Authorize] 
    [Route("api/party")]
    [ApiController]
    public class AdminController : BaseController
    {
        
    }
}