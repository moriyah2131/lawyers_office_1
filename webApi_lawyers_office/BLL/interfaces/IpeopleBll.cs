using EntitiesDTO;
using System.Threading.Tasks;

namespace BLL.interfaces
{
    public interface IpeopleBll
    {
        Task<ShortPersonDTO> GetByID(int id);
        Task<ShortPersonDTO> PutAsync(ShortPersonDTO person);
    }
}
