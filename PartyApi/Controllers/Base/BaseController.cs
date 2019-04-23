using Microsoft.AspNetCore.Mvc;
using PartyApi.Helpers;

namespace PartyApi.Controllers
{
    [Route("api/[controller]")] 
    [ApiController]
    [ServiceFilter(typeof(LogUserActivity))]
    public class BaseController : ControllerBase
    {

    }
}