using Dal.models;
using EntitiesDTO;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Dal.interfaces
{
    public interface Ibags
    {
        Task<Bag> deleteByIdAsync(int bagId);
        Task deleteFilesAndActionsByIdAsync(Bag bagToRemove);
        Task<List<GetBagDTO>> GetAllAsync(int currentPage, int pageSize);
        Task<List<GetBagDTO>> GetBagsByIDsAsync(int[] IDs);
        Task<GetBagDTO> GetByIdAsync(int id);
        Task<int> PostAsync(string bagName, int assetId);
        Task<int> PutAsync(int bagId, string? bagName, int? state);
    }
}
