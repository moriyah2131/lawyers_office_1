using BLL.interfaces;
using EntitiesDTO;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace webApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FilesController : ControllerBase
    {
        IfilesBll bll;
        public FilesController(IfilesBll _bll)
        {
            bll = _bll;
        }

        [HttpGet("getAll")]
        public ActionResult<List<FilesDto>> getAll()
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
        public ActionResult<FilesDto> getById(int id)
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

        [HttpGet("getByBagId/{id}")]
        public async Task<ActionResult<List<FilesDto>>> getByBagIdAsync(int id, int personID)
        {
            try
            {
                return Ok(await bll.GetByBagIdAsync(id, personID));
            }
            catch
            {
                return NotFound();
            }
        }

        [HttpGet("getAllByBagId/{id}")]
        public async Task<ActionResult<List<FilesDto>>> getAllByBagIdAsync(int id)
        {
            try
            {
                //string path = "G:\\Esther\\studies\\אחר\\הפרויקט\\Credit card details.txt";
                //byte[] bytes = System.IO.File.ReadAllBytes(path);
                //string str = Encoding.Default.GetString(bytes);

                return Ok(await bll.GetAllByBagIdAsync(id));
            }
            catch
            {
                return NotFound();
            }
        }

        [HttpPost("post")]
        public async Task<ActionResult> postAsync([FromBody] FilesDto obj)
        {
            try
            {
                await bll.PostAsync(obj);
                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }


        [HttpPut("put")]
        public async Task<ActionResult<FilesDto>> put([FromBody] FilesDto obj)
        {
            try
            {
                return Ok(await bll.PutAsync(obj));
            }
            catch
            {
                return NotFound();
            }
        }


        [HttpDelete("delete")]
        public async Task<ActionResult> deleteAsync(int fileID , int personID)
        {
            try
            {
                await bll.deleteAsync(fileID, personID);
                return Ok();
            }
            catch
            {
                return NotFound();
            }
        }

    }
}
