using EntitiesDTO;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BLL.interfaces
{
    public interface IfilesBll
    {
        public List<FilesDto> GetAll();
        Task<FilesDto> GetByIdAsync(int id);
        Task<FilesDto> PutAsync(FilesDto obj);
        Task<List<FilesDto>> GetByBagIdAsync(int bagID, int creatorID);
        Task<List<FilesDto>> GetAllByBagIdAsync(int bagID);
        Task PostAsync(FilesDto obj);
        Task deleteAsync(int fileID, int personID);
        Task SetPermissionsByIdAsync(int fileID, int accessID);
    }
}
