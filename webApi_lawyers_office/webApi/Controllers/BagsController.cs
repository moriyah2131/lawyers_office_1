using BLL.interfaces;
using EntitiesDTO;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace webApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BagsController : ControllerBase
    {
        IbagsBll bll;
        public BagsController(IbagsBll _bll)
        {
            bll = _bll;
        }

        [HttpGet("getById/{id}")]
        public async Task<ActionResult<BagInfoDto>> getById(int id)
        {
            try
            {
                return Ok(await bll.GetByIdAsync(id));
            }
            catch
            {
                return NotFound();
            }
        }

        [HttpGet("getAll/{currentPage}/{pageSize}")]
        public async Task<ActionResult<List<GetBagDTO>>> getAll(int currentPage, int pageSize)
        {
            try
            {
                return Ok(await bll.GetAllAsync(currentPage, pageSize));
            }
            catch
            {
                return NotFound();
            }
        }

        [HttpPost("getLoginsByID/{bagID}")]
        public async Task<ActionResult<List<LogInDTO>>> getLoginsByIDAsync([FromBody] ICollection<ShortPersonDTO> participants, int bagID)
        {
            try
            {
                return Ok(await bll.GetLoginsByIDAsync(bagID, participants));
            }
            catch
            {
                return NotFound();
            }
        }

        [HttpPost("getListByIDs/")]
        public async Task<ActionResult<List<GetBagDTO>>> getListByIDs([FromBody] int[] IDs)
        {
            try
            {
                return Ok(await bll.GetBagsByIDsAsync(IDs));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("post/{bagName}")]
        public async Task<ActionResult<List<LogInDTO>>> post(string bagName, [FromBody] PostBagDTO postBagDTO)
        {
            try
            {
                return Ok(await bll.post(bagName, postBagDTO));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("delete/{id}")]
        public async Task<ActionResult> delete(int id)
        {
            try
            {
                await bll.DeleteAsync(id);
                return Ok();
            }
            catch(Exception ex)
            {
                return NotFound();
            }
        }

        [HttpPut("put/{bagId}/{bagName}")]
        public async Task<ActionResult<List<LogInDTO>>> put(int bagId, string bagName, [FromBody] PostBagDTO postBagDTO)
        {
            try
            {
                return Ok(await bll.PutAsync(bagId, bagName, postBagDTO));
            }
            catch
            {
                return NotFound();
            }
        }

        [HttpPut("putBagState/{bagId}/{status}")]
        public async Task<ActionResult> putBagState(int bagId, int status, [FromBody] object obj)
        {
            try
            {
                await bll.PutBagStateAsync(bagId, status);
                return Ok();
            }
            catch
            {
                return NotFound();
            }
        }
    }
}
