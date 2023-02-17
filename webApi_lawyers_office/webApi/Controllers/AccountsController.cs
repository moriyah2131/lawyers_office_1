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

        [HttpPost("postLawyer/")]
        public async Task<ActionResult<string>> PostLawyerAsync([FromBody] ShortPersonDTO shortPersonDto)
        {
            try
            {
                return Ok(await bll.PostLawyerAsync(shortPersonDto));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [HttpDelete("deleteUser/")]
     
        public async Task<ActionResult> delete(string email)
        {
            try
            {
                await bll.DeleteAsync(email);
                return Ok();
            }
            catch
            {
                return NotFound();
            }
        }

        [HttpGet("getAllPerson")]
        public async Task<ActionResult<List<ShortPersonDTO>>> getAllAsync()
        {
            try
            {
                return Ok(await bll.GetAllAsync());
            }
            catch
            {
                return BadRequest();
            }
        }


        [HttpGet("getAllLawyer")]
        public async Task<ActionResult<List<ShortPersonDTO>>> GetAllLawyerAsync()
        {
            try
            {
                return Ok(await bll.GetAllLawyerAsync());
            }
            catch
            {
                return BadRequest();
            }
        }

    }
}
