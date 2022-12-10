using Dal.converters;
using Dal.interfaces;
using Dal.models;
using EntitiesDTO;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Action = Dal.models.Action;

namespace Dal.functions
{
    public class BagsFunc : Ibags
    {
        Layers_OfficeContext db;
        public BagsFunc(Layers_OfficeContext _db)
        {
            db = _db;
        }

        public async Task<List<GetBagDTO>> GetBagsByIDsAsync(int[] IDs)
        {
            List<Bag> bags = new List<Bag>();
            foreach(int ID in IDs)
            {
                Bag bag = await db.Bags.Include(b => b.Asset).FirstOrDefaultAsync(item => item.Id == ID);
                if(bag != null)
                    bags.Add(bag);
            }

            return BagsConverter.toDtoList(bags);
        }

        public async Task<GetBagDTO> GetByIdAsync(int id)
        {
            Bag bag = await db.Bags.Include(b => b.BagsToPeople).Include(b => b.Asset).FirstOrDefaultAsync(item => item.Id == id);
            if (bag == null) throw new Exception("Bag doesn't exist.");
            return await fillParticipantsToBagDTO(bag);
        }

        public async Task<List<GetBagDTO>> GetAllAsync(int currentPage, int pageSize)
        {
            List<Bag> bags;
            if (currentPage == 0)
                bags = await db.Bags.Take(pageSize + 1).Include(b => b.BagsToPeople).Include(b => b.Asset).Distinct().ToListAsync();
            else bags = await db.Bags.Skip(currentPage * pageSize + 1).Take(pageSize).Include(b => b.BagsToPeople).Include(b => b.Asset).Distinct().ToListAsync();

            List<GetBagDTO> bagsDTO = new();
            foreach (Bag b in bags)
            {
                bagsDTO.Add(await fillParticipantsToBagDTO(b));
            }
            return bagsDTO;
        }

        private async Task<GetBagDTO> fillParticipantsToBagDTO(Bag bag)
        {
            GetBagDTO getBagDTO = BagsConverter.toDto(bag);
            getBagDTO.Buyers = new();
            getBagDTO.Sellers = new();

            foreach (BagsToPerson btp in bag.BagsToPeople)
            {
                Person p = await db.People.FirstOrDefaultAsync(p => p.Id == btp.PersonId);
                ShortPersonDTO personDTO = PeopleConverter.toDto(p);
                personDTO.UserType = btp.PersonType;

                switch (btp.PersonType)
                {
                    case "LAWYER" or "lawyer": getBagDTO.Agent = personDTO; break;
                    case "BUYER" or "buyer": getBagDTO.Buyers.Add(personDTO); break;
                    case "SELLER" or "seller": getBagDTO.Sellers.Add(personDTO); break;
                };
            }

            return getBagDTO;
        }

        public async Task<int> PostAsync(string bagName, int assetId)
        {
            Bag newBag = new ()
            {
                BagName = bagName,
                BagState = 0,
                AssetId = assetId,
                ModificationTime = DateTime.Now,
                LastOpen = DateTime.Now,
                open_date = DateTime.Now,
            };
            await db.Bags.AddAsync(newBag);
            await db.SaveChangesAsync();
            return newBag.Id;
        }

        public async Task<Bag> deleteByIdAsync(int bagId)
        {
            Bag bagToRemove = await db.Bags.Include(b => b.Files).Include(b => b.ActionsToBags).Include(b => b.Asset).Include(b => b.BagsToPeople).FirstOrDefaultAsync(b => b.Id == bagId);
            List<Action> actionsToRemove = new();
            foreach (var atb in bagToRemove.ActionsToBags)
            {
                actionsToRemove.Add(await db.Actions.FirstOrDefaultAsync(a => a.Id == atb.ActionId));
            }

            db.ActionsToBags.RemoveRange(bagToRemove.ActionsToBags);
            db.BagsToPeople.RemoveRange(bagToRemove.BagsToPeople);
            db.Files.RemoveRange(bagToRemove.Files);
            db.Actions.RemoveRange(actionsToRemove);
            db.Bags.Remove(bagToRemove);
            db.Assets.Remove(bagToRemove.Asset);

            await db.SaveChangesAsync();
            return bagToRemove;
        }

        public async Task deleteFilesAndActionsByIdAsync(Bag bagToRemove)
        {
            db.Files.RemoveRange(bagToRemove.Files);

            List<Action> actionsToRemove = new();
            foreach (var atb in bagToRemove.ActionsToBags)
            {
                actionsToRemove.Add(await db.Actions.FirstOrDefaultAsync(a => a.Id == atb.ActionId));
            }
            db.Actions.RemoveRange(actionsToRemove);
            db.ActionsToBags.RemoveRange(bagToRemove.ActionsToBags);

            await db.SaveChangesAsync();
        }

        public async Task<int> PutAsync(int bagId, string bagName)
        {
            Bag bagToUpdate = await db.Bags.FirstOrDefaultAsync(b => b.Id == bagId);
            bagToUpdate.BagName = bagName;

            db.Bags.Update(bagToUpdate);
            await db.SaveChangesAsync();

            return bagToUpdate.Id;
        }
    }
}
