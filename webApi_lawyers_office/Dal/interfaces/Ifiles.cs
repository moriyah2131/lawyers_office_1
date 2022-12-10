using EntitiesDTO;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Dal.interfaces
{
    public interface Ifiles
    {
        public List<FilesDto> GetAll();
        public FilesDto GetById(int id);
        Task post(FilesDto obj);
        Task<FilesDto> PutAsync(FilesDto obj);
        Task<List<FilesDto>> GetByBagId(int bagID, int creatorID);
        Task<List<FilesDto>> GetAllByBagId(int bagID);
        Task deleteAsync(int fileID, int personID);
    }
}
