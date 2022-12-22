using Dal.models;
using EntitiesDTO;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BLL.interfaces
{
    public interface IbagsBll
    {
        Task<GetBagDTO> GetByIdAsync(int id);    
        Task<List<GetBagDTO>> GetBagsByIDsAsync(int[] IDs);
        Task<List<GetBagDTO>> GetAllAsync(int currentPage, int pageSize);        
        Task<List<LogInDTO>> GetLoginsByIDAsync(int bagID, ICollection<ShortPersonDTO> participants);
        Task<List<LogInDTO>> post(string bagName, PostBagDTO postBagDTO);
        Task DeleteAsync(int bagId);
        Task<List<LogInDTO>> PutAsync(int bagId, string bagName, PostBagDTO postBagDTO);
        Task PutBagStateAsync(int bagId, int status);
    }
}
