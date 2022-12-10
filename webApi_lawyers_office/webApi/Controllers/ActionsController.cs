using BLL.interfaces;
using EntitiesDTO;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace webApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActionsController : ControllerBase
    {
        IactionsBll bll;
        public ActionsController(IactionsBll _bll)
        {
            bll = _bll;
        }

        [HttpGet("getAll")]
        public ActionResult<List<ActionsDto>> getAll()
        {
            try
            {
                return Ok(bll.GetAll());
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpGet("getById/{id}")]
        public ActionResult<ActionsDto> getById(int id)
        {
            try
            {
                return Ok(bll.GetById(id));
            }
            catch
            {
                return NotFound();
            }
        }

        [HttpGet("getListById/{bagID}/{userID}")]
        public async Task<ActionResult<List<ActionsDto>>> getTasksById(int bagID, int userID)
        {
            try
            {
                return Ok(await bll.GetTasksByIdAsync(bagID, userID));
            }
            catch
            {
                return NotFound();
            }
        }

        [HttpPost("post")]
        public ActionResult<ActionsDto> post([FromBody] ActionsDto obj)
        {
            try
            {
                return Ok(bll.post(obj));
            }
            catch
            {
                return BadRequest();
            }
        }


        [HttpPut("put")]
        public ActionResult<ActionsDto> put([FromBody] ActionsDto obj)
        {
            try
            {
                return Ok(bll.put(obj));
            }
            catch
            {
                return NotFound();
            }
        }

        [HttpPut("putList/{bagID}/{userType}")]
        public async Task<ActionResult<List<ActionsDto>>> putList(int bagID, string userType,[FromBody] List<ActionsDto> objs)
        {
            try
            {
                return Ok(await bll.putListAsync(bagID, userType, objs));
            }
            catch
            {
                return NotFound();
            }
        }


        [HttpDelete("delete/{id}")]
        public ActionResult<ActionsDto> delete(int id)
        {
            try
            {
                return Ok(bll.delete(id));
            }
            catch
            {
                return NotFound();
            }
        }

        [HttpPost("deleteList")]
        public async Task<ActionResult> deleteListAsync([FromBody] List<int> tasksIDs)
        {
            try
            {
                await bll.DeleteListAsync(tasksIDs);
                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }

    }
}
