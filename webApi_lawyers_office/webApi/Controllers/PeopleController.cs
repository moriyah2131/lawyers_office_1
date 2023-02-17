using BLL.interfaces;
using EntitiesDTO;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System;

namespace webApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PeopleController : ControllerBase
    {
        IpeopleBll bll;
        public PeopleController(IpeopleBll _bll)
        {
            bll = _bll;
        }

        [HttpGet("getById/{personID}")]
        public async Task<ActionResult<ShortPersonDTO>> GetByIdAsync(int personID)
        {
            try
            {
                return Ok(await bll.GetByID(personID));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPut("put")]
        public async Task<ActionResult<ShortPersonDTO>> PutAsync([FromBody] ShortPersonDTO person)
        {
            try
            {
                return Ok(await bll.PutAsync(person));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
