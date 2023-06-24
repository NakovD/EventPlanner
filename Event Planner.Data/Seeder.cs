namespace EventPlanner.Data
{
    using Models;

    public static class Seeder
    {
        public static IEnumerable<Event> SeedEvents()
        {
            var events = new List<Event>()
            {
                new Event {
                    Id = 1,
                    Title = "First event",
                    Description = "First event description",
                    Date = DateTime.Now,
                    Time = DateTime.Now.AddDays(1).TimeOfDay,
                    OrganizerId = 1,
                    Location = "Sliven",
                    Category = "Report",
                    Image = "https://plus.unsplash.com/premium_photo-1686975618210-fad216b0e253?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=809&q=80"
                },
                new Event {
                    Id = 2,
                    Title = "Second event",
                    Description = "Second event",
                    Date = DateTime.Now.AddMonths(2),
                    Time = DateTime.Now.AddDays(2).TimeOfDay,
                    OrganizerId = 2,
                    Location = "Kri4im",
                    Category = "Seminar",
                    Image = "https://images.unsplash.com/photo-1687380304706-b978daa78f92?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
                },
                new Event {
                    Id = 3,
                    Title = "Third event",
                    Description = "third event description",
                    Date = DateTime.Now.AddMonths(3),
                    Time = DateTime.Now.AddDays(3).TimeOfDay,
                    OrganizerId = 3,
                    Location = "Pernik",
                    Category = "Party",
                    Image = "https://plus.unsplash.com/premium_photo-1672976129906-5982aa060951?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80"
                },

            };

            return events;
        }

        public static IEnumerable<User> SeedUsers()
        {
            var users = new List<User>
            {
                new User()
                {
                    Id = 1,
                    Name = "David",
                    Email = "nakov_david@mail.bg",
                    Password = "some pass",
                },
                new User()
                {
                    Id = 2,
                    Name = "Lora",
                    Email = "lora_nakova@mail.bg",
                    Password = "kids pass",
                },
                new User()
                {
                    Id = 3,
                    Name = "Diana",
                    Email = "diana_nakova@mail.bg",
                    Password = "another hard pass",
                }
            };

            return users;
        }
    }
}
