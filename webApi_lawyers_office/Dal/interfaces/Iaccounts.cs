using EntitiesDTO;
using System.Threading.Tasks;

namespace Dal.interfaces
{
    public interface Iaccounts
    {
        Task<AccountDTO> LogInAsync(string email, string password);
        Task RegisterAsync(RegisterDto registerDto);
    }
}
