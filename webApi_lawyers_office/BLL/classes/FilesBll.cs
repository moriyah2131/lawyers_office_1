using BLL.interfaces;
using Dal.interfaces;
using Dal.models;
using EntitiesDTO;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BLL.classes
{

    public class FilesBll : IfilesBll
    {  
        public Ifiles dal;
        public IbagsToPerson bagsToPersonDal;
        public FilesBll(Ifiles _dal, IbagsToPerson _bagsToPersonDal)
        {
            dal = _dal;
            bagsToPersonDal = _bagsToPersonDal; 
        }

        public List<FilesDto> GetAll()
        {
            return dal.GetAll();
        }

        public async Task<FilesDto> GetByIdAsync(int id)
        {
            return await dal.GetByIdAsync(id);
        }

        public async Task<List<FilesDto>> GetByBagIdAsync(int bagID, int personID)
        {
            string userType = await bagsToPersonDal.GetUserType(bagID, personID);
            return await dal.GetByBagId(bagID, personID, userType);
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

        public async Task SetPermissionsByIdAsync(int fileID, int accessID)
        {
            FilesDto file = await dal.GetByIdAsync(fileID);
            file.Access = accessID;
            await dal.PutAsync(file);
        }
    }
}
