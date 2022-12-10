using Dal.interfaces;
using Dal.models;
using EntitiesDTO;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace Dal.functions
{
    public class UsersFunc: Iusers
    {
        Layers_OfficeContext db;
        public UsersFunc(Layers_OfficeContext _db)
        {
            db = _db;
        }

        public async Task<User> GetByIdAsync(int personId)
        {
            return await db.Users.FirstOrDefaultAsync(u => u.PersonId == personId);
        }

        public async Task<int> PostAsync(AssetDTO asset)
        {
            var newAsset = new Asset()
            {
                AssetAddress = asset.AssetAddress,
                BlockOrBook = asset.BlockOrBook,
                OtherDetails = asset.OtherDetails,
                PlotOrPage = asset.PlotOrPage,
                SubPlot = asset.SubPlot,
                TikMinhal = asset.TikMinhal,
            };
            await db.Assets.AddAsync(newAsset);
            await db.SaveChangesAsync();
            return newAsset.Id;
        }

        public async Task<int> PostAsync(User newUser)
        {
            await db.Users.AddAsync(newUser);
            await db.SaveChangesAsync();
            return newUser.Id;
        }
    }
}
