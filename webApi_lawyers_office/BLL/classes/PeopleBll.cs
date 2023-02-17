using BLL.interfaces;
using Dal.interfaces;
using EntitiesDTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.classes
{
    public class PeopleBll : IpeopleBll
    {
        private readonly Ipeople dal;
        public PeopleBll(Ipeople _dal)
        {
            dal = _dal;
        }

        public async Task<ShortPersonDTO> GetByID(int id)
        {
            return await dal.GetByID(id);
        }

        public async Task<ShortPersonDTO> PutAsync(ShortPersonDTO person)
        {
            return await dal.PutAsync(person);
        }
    }
}
