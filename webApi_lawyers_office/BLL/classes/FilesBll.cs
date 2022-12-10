using BLL.interfaces;
using Dal.interfaces;
using EntitiesDTO;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BLL.classes
{

    public class FilesBll : IfilesBll
    {  
        public Ifiles dal;
        public FilesBll(Ifiles _dal)
        {
            dal = _dal;
        }

        public List<FilesDto> GetAll()
        {
            return dal.GetAll();
        }

        public FilesDto GetById(int id)
        {
            return dal.GetById(id);
        }

        public async Task<List<FilesDto>> GetByBagIdAsync(int bagID, int creatorID)
        {
            return await dal.GetByBagId(bagID, creatorID);
        }

        public async Task<List<FilesDto>> GetAllByBagIdAsync(int bagID)
        {
            return await dal.GetAllByBagId(bagID);
        }

        public async Task PostAsync(FilesDto obj)
        {
            await dal.post(obj);
        }

        public async Task<FilesDto> PutAsync(FilesDto obj)
        {
            return await dal.PutAsync(obj);
        }

        public async Task deleteAsync(int fileID, int personID)
        {
            await dal.deleteAsync(fileID, personID);
        }
    }
}
