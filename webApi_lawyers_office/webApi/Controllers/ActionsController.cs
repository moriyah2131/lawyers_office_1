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
        public ActionResult<List<ActionsDTO>> getAll()
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
        public ActionResult<ActionsDTO> getById(int id)
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
        public async Task<ActionResult<List<ActionsDTO>>> getTasksById(int bagID, int userID)
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

        [HttpGet("getListByPersonId/{personId}/{userType}")]
        public async Task<ActionResult<List<ActionsDTO>>> getListByUserId(int personId, string userType)
        {
            try
            {
                return Ok(await bll.GetTasksByUserIdAsync(personId, userType));
            }
            catch
            {
                return NotFound();
            }
        }

        [HttpPost("post/{bagID}")]
        public async Task<ActionResult<int>> postAsync([FromBody] PostActionDTO obj, int bagID)
        {
            try
            {
                return Ok(await bll.postAsync(obj, bagID));
            }
            catch
            {
                return BadRequest();
            }
        }


        [HttpPut("put")]
        public async Task<ActionResult<ActionsDTO>> putAsync([FromBody] ActionsDTO obj)
        {
            try
            {
                return Ok(await bll.putAsync(obj));
            }
            catch
            {
                return NotFound();
            }
        }

        [HttpPut("putList/{bagID}/{userType}")]
        public async Task<ActionResult<List<ActionsDTO>>> putList(int bagID, string userType,[FromBody] List<ActionsDTO> objs)
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
        public ActionResult<ActionsDTO> delete(int id)
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
