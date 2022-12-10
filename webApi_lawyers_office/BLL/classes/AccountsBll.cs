using BLL.interfaces;
using Dal.interfaces;
using EntitiesDTO;
using System.Threading.Tasks;

namespace BLL.classes
{
    public class AccountsBll : IaccountsBll
    {  
        public Iaccounts dal;
        public AccountsBll(Iaccounts _dal)
        {
            dal = _dal;
        }

        public async Task<AccountDTO> LogInAsync(string email, string password)
        {
            return await dal.LogInAsync(email, password);
        }

        public async Task RegisterAsync(RegisterDto registerDto)
        {
            await dal.RegisterAsync(registerDto);
        }
    }
}
