using Dal.interfaces;
using Dal.models;
using System.Threading.Tasks;

namespace Dal.functions
{
    public class BagsToPersonFunc : IbagsToPerson
    {
        Layers_OfficeContext db;
        public BagsToPersonFunc(Layers_OfficeContext _db)
        {
            db = _db;
        }

        public async Task deleteByIdAsync(Bag bagToDelete)
        {
            db.BagsToPeople.RemoveRange(bagToDelete.BagsToPeople);
            await db.SaveChangesAsync();
        }

        public async Task<int> PostAsync(int personId, string userType, int bagId)
        {
            var newBagToPerson = new BagsToPerson()
            {
                PersonId = personId,
                BagId = bagId,
                PersonType = userType,
            };
            await db.BagsToPeople.AddAsync(newBagToPerson);
            await db.SaveChangesAsync();
            return newBagToPerson.Id;
        }
    }
}
