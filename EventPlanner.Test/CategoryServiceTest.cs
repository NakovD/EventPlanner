namespace EventPlanner.Test
{
    using AutoMapper;
    using EventPlanner.Data.Enums;
    using EventPlanner.Data.Models;
    using EventPlanner.Data;
    using EventPlanner.Services.Contracts;
    using EventPlanner.Services.Implementations;
    using EventPlanner.Services.Models.Notification;
    using Microsoft.EntityFrameworkCore;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using EventPlanner.Services.Profiles;
    using EventPlanner.Services.Models.Category;

    [TestFixture]
    public class CategoryServiceTest
    {
        private IEnumerable<Category> categories;

        private EventPlannerDbContext db;

        private IMapper mapper;

        private ICategoryService categoryService;

        [OneTimeSetUp]
        public void Setup()
        {
            SeedCategories();

            var dbOptions = new DbContextOptionsBuilder<EventPlannerDbContext>()
                .UseInMemoryDatabase(databaseName: "EventPlannerInMemory")
                .Options;

            db = new EventPlannerDbContext(dbOptions);

            var mapper = new Mapper(new MapperConfiguration(cfg => cfg.AddProfile<CategoryProfile>()));
            this.mapper = mapper;

            //Prepare service
            categoryService = new CategoryService(db, mapper);

            //Fill Db
            db.AddRange(categories);
            db.SaveChanges();
        }

        private void SeedCategories()
        {
            categories = new List<Category>()
            {
                new Category() {
                    Id = 1,
                    Name = "Some First Name"
                },
                new Category() {
                    Id = 2,
                    Name = "Some Second Name"
                },
                new Category()
                {
                    Id = 3,
                    Name = "Some Third Name"
                },
            };
        }

        [Test]
        public async Task CreateCreatesNewCategory()
        {
            var name = "Hello";

            var result = await categoryService.CreateAsync(new CategoryFormDto { Name = name });

            var expected = db.Categories.Last();

            Assert.IsTrue(result);

            Assert.IsNotNull(expected);

            Assert.IsTrue(expected.Name == name);
        }

        [Test]
        public async Task UpdateUpdatesFoundCategory()
        {
            var newName = "Hello";
            var id = 2;

            var result = await categoryService.UpdateAsync(new CategoryFormDto { Id = id, Name = newName });

            Assert.IsTrue(result);

            var expected = db.Categories.Find(id);

            Assert.IsNotNull(expected);

            Assert.IsTrue(expected.Name == newName);
        }

        [Test]
        public async Task UpdateReturnsFalseWithInvalidCategoryId()
        {
            var id = 123;

            var result = await categoryService.UpdateAsync(new CategoryFormDto { Id = id, Name = "hi" });

            Assert.IsFalse(result);
        }

        [Test]
        public async Task GetAllAsyncReturnsCorrectAmount()
        {
            var expected = await categoryService.GetAllAsync();

            var actual = db.Categories;

            Assert.IsTrue(expected.Count() == actual.Count());
        }

        [Test]
        public async Task MarkAsDeletedMarksNotificationAsDeleted()
        {
            var id = 1;

            var result = await categoryService.MarkAsDeletedAsync(id);

            Assert.IsTrue(result);

            var expected = db.Categories.Find(id);

            Assert.IsNotNull(expected);

            Assert.IsTrue(expected.IsDeleted);
        }

        [Test]
        public async Task MarkAsDeletedReturnsFalseWithInvalidId()
        {
            var id = 1313;

            var result = await categoryService.MarkAsDeletedAsync(id);

            Assert.IsFalse(result);
        }
    }
}
