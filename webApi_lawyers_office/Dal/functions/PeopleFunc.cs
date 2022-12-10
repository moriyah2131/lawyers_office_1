using Dal.interfaces;
using Dal.models;
using EntitiesDTO;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Dal.functions
{
    public class PeopleFunc: Ipeople
    {
        public Layers_OfficeContext db;
        public PeopleFunc(Layers_OfficeContext _db)
        {
            db= _db;
        }

        public async Task<int> GetByEmailAsync(string email)
        {
            Person existingPerson = await db.People.FirstOrDefaultAsync(p => p.Email == email) ?? throw new Exception("Person doesn't exist.");
            return existingPerson.Id;
        }

        public async Task<int> PostAsync(ShortPersonDTO participant)
        {
            var newPerson = new Person()
            {
                FirstName = participant.FirstName,
                LastName = participant.LastName,
                Email = participant.Email,
                Phone = participant.Phone,
                Tz = participant.Tz,
                LivingAddress = " "
            };
            await db.People.AddAsync(newPerson);
            await db.SaveChangesAsync();
            return newPerson.Id; ;
        }

        public async Task<List<LogInDTO>> PutListAsync(ICollection<ShortPersonDTO> participants)
        {
            List<LogInDTO> list = new List<LogInDTO>();
            List<Person> peopleToUpdate = new();
            foreach (var participant in participants)
            {
                User user = await db.Users.FirstOrDefaultAsync(u => u.PersonId == participant.Id) ?? throw new Exception("User doesn't exist.");
                list.Add(new LogInDTO() { Email = participant.Email, Password = user.UserPassword });

                Person personToUpdate = await db.People.FirstOrDefaultAsync(p => p.Id == participant.Id) ?? throw new Exception("Person doesn't exist.");
                personToUpdate.Email = participant.Email;
                personToUpdate.FirstName = participant.FirstName;
                personToUpdate.LastName = participant.LastName;
                personToUpdate.Tz = participant.Tz;
                personToUpdate.Phone = participant.Phone;

                peopleToUpdate.Add(personToUpdate);
            }

            db.People.UpdateRange(peopleToUpdate) ;
            await db.SaveChangesAsync();
            return list;
        }
    }
}
