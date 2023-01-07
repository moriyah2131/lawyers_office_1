using EntitiesDTO;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Dal.interfaces
{
    public interface Ifiles
    {
        List<FilesDto> GetAll();
        Task<FilesDto> GetByIdAsync(int id);
        Task post(FilesDto obj);
        Task<FilesDto> PutAsync(FilesDto obj);
        Task<List<FilesDto>> GetByBagId(int bagID, int personID, string userType);
        Task<List<FilesDto>> GetAllByBagId(int bagID);
        Task deleteAsync(int fileID, int personID);
    }
}
