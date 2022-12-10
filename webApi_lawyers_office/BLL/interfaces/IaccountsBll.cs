using EntitiesDTO;
using System.Threading.Tasks;

namespace BLL.interfaces
{
    public interface IaccountsBll
    {
        Task<AccountDTO> LogInAsync(string email, string password);
        Task RegisterAsync(RegisterDto registerDto);
    }
}
