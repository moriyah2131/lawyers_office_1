using BLL.interfaces;
using EntitiesDTO;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace webApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountsController : ControllerBase
    {
        IaccountsBll bll;
        public AccountsController(IaccountsBll _bll)
        {
            bll = _bll;
        }

        [HttpPost("logIn/")]
        public async Task<ActionResult<AccountDTO>> SignInAsync([FromBody] LogInDTO logInDTO)
        {
            try
            {
                return Ok(await bll.LogInAsync(logInDTO.Email, logInDTO.Password));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPost("register/")]
        public async Task<ActionResult> RegisterAsync([FromBody] RegisterDto registerDto)
        {
            try
            {
                await bll.RegisterAsync(registerDto);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
