using EntitiesDTO;
using System.Threading.Tasks;

namespace BLL.interfaces
{
    public interface IaccountsBll
    {
        Task<AccountDTO> LogInAsync(string email, string password);
        Task RegisterAsync(RegisterDto registerDto);

        Task<string> PostLawyerAsync(ShortPersonDTO participant);

        Task<string> DeleteAsync(string email);

    }
}
