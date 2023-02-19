using EntitiesDTO;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Dal.interfaces
{
    public interface Ipeople
    {
        Task<int> GetByEmailAsync(string email);
        Task<ShortPersonDTO> GetByID(int id);
        Task<int> PostAsync(ShortPersonDTO participant);
        Task<ShortPersonDTO> PutAsync(ShortPersonDTO person);
        Task<List<LogInDTO>> PutListAsync(ICollection<ShortPersonDTO> participants);
    }
}
