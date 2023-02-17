using EntitiesDTO;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Dal.interfaces
{
    public interface Iaccounts
    {
        Task<AccountDTO> LogInAsync(string email, string password);
        Task RegisterAsync(RegisterDto registerDto);

        Task<int> PostAsync(ShortPersonDTO participant);

       
        Task<string> DeleteAsync(string email);

        Task<List<ShortPersonDTO>> GetAllAsync();
        Task<List<ShortPersonDTO>> GetAllLawyerAsync();

    }
}
