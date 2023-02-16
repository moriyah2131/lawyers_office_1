using Dal.converters;
using Dal.interfaces;
using Dal.models;
using EntitiesDTO;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using static System.Net.WebRequestMethods;

namespace Dal.functions
{
    public class AccountsFunc : Iaccounts
    {
        Layers_OfficeContext db;
        public AccountsFunc(Layers_OfficeContext _db)
        {
            db = _db;
        }


        public async Task<List<ShortPersonDTO>> GetAllAsync()
        {
            List<Person> peoples11 = db.People.ToList();
            List<User> users = db.Users.ToList();
            List<ShortPersonDTO> peoples = new List<ShortPersonDTO>();
            int index;
            for (int j=0;  j<users.Count; j++)
            {
                if (users[j].UserType == "CUSTOMER"| users[j].UserType == "customer")
                {
                    index = users[j].PersonId;
                    Person p = await db.People.FirstOrDefaultAsync(p => p.Id == index);
                    peoples.Add(PeopleConverter.toDto(p));
                }

            }

            return peoples;
        }
      


        public async Task<List<ShortPersonDTO>> GetAllLawyerAsync()
        {
            List<Person> peoples11 = db.People.ToList();
            List<User> users = db.Users.ToList();
            List<ShortPersonDTO> peoples = new List<ShortPersonDTO>();
            int index;
            for (int j = 0; j < users.Count; j++)
            {
                if (users[j].UserType == "LAWYER"| users[j].UserType == "lawyer")
                {
                    index = users[j].PersonId;
                    Person p = await db.People.FirstOrDefaultAsync(p => p.Id == index);
                    peoples.Add(PeopleConverter.toDto(p));
                }

            }

            return peoples;
        }




        public async Task<AccountDTO> LogInAsync(string email, string password)
        {
            User user = await db.Users.FirstOrDefaultAsync(item => item.UserPassword == password);
            if (user == null) throw new Exception("User doesn't exist.");

            Person person = await db.People.FirstOrDefaultAsync(item => item.Id == user.PersonId && item.Email == email);
            if (person == null) throw new Exception("User doesn't exist.");

            IEnumerable<int> bagsIDs = new List<int>();
            bagsIDs = await db.BagsToPeople.Where(item => item.PersonId == person.Id).Select(bag => bag.BagId).ToListAsync();

            return new AccountDTO() { PersonId = person.Id, Name = person.FirstName + " " + person.LastName, UserType = user.UserType, BagsIDs = bagsIDs, IsFirstVisit = person.LivingAddress == " " };
        }

        public Task<int> PostAsync(ShortPersonDTO participant)
        {
            throw new NotImplementedException();
        }

        public async Task RegisterAsync(RegisterDto registerDto)
        {
            Person personToUpdate = await db.People.FirstOrDefaultAsync(p => p.Id == registerDto.PersonID) ?? throw new Exception("Person Not Found!");
            personToUpdate.LivingAddress = registerDto.LivingAddress;
            personToUpdate.SecondPhone = registerDto.SecondPhone;

            User userToUpdate = await db.Users.FirstOrDefaultAsync(item => item.PersonId == registerDto.PersonID) ?? throw new Exception("User doesn't exist.");
            userToUpdate.UserPassword = registerDto.Password;

            db.People.Update(personToUpdate);
            db.Users.Update(userToUpdate);

            await db.SaveChangesAsync();
        }

        public async Task<string> DeleteAsync( string email)
        {
            try
            {
                Person person = await db.People.FirstOrDefaultAsync(item => item.Email  == email);
                if (person == null) throw new Exception("User doesn't exist.");

                User user = await db.Users.FirstOrDefaultAsync(item => item.PersonId == person.Id);
                db.Users.Remove(user);
                await db.SaveChangesAsync();
                return person.FirstName;
            }
            catch
            {
                throw new Exception("User doesn't exist.");
            }
               
                
           

           

         
        }
    }
}
