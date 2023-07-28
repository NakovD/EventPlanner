namespace EventPlanner.Test
{
    using AutoMapper;
    using EventPlanner.Data;
    using EventPlanner.Data.Models;
    using EventPlanner.Services.Contracts;
    using EventPlanner.Services.Implementations;
    using EventPlanner.Services.Models.Comment;
    using EventPlanner.Services.Profiles;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.DependencyInjection;

    [TestFixture]
    public class CommentServiceTest
    {
        private EventPlannerDbContext dbContext;

        private ICommentService commentService;

        [SetUp]
        public void SetUp()
        {
            var comments = SeedComments();
            var eventt = SeedEvents();
            var users = SeedUsers();

            var dbOptions = new DbContextOptionsBuilder<EventPlannerDbContext>()
                .UseInMemoryDatabase(databaseName: "EventPlannerInMemory")
                .Options;

            dbContext = new EventPlannerDbContext(dbOptions);

            var mapper = new Mapper(new MapperConfiguration(cfg => cfg.AddProfile<CommentProfile>()));

            //Prepare service
            commentService = new CommentService(dbContext, mapper);

            dbContext.Comments.AddRange(comments);
            dbContext.Events.Add(eventt);
            dbContext.Users.AddRange(users);
            dbContext.SaveChanges();
        }

        [TearDown]
        public void TearDown()
        {
            dbContext.Database.EnsureDeleted();
        }

        private IEnumerable<Comment> SeedComments() => new List<Comment>
        {
            new Comment
            {
                Content = "Some comment content",
                EventId = 1,
                UserId = "1",
                IsDeleted = false,
                LastUpdated = DateTime.Now.AddMinutes(5),
            },
            new Comment
            {
                Content = "Some comment content - number 2",
                EventId = 1,
                UserId = "2",
                IsDeleted = false,
                LastUpdated = DateTime.Now.AddMinutes(50),
            },
            new Comment
            {
                Content = "Some comment content - number 3",
                EventId = 1,
                UserId = "2",
                IsDeleted = true,
                LastUpdated = DateTime.Now.AddMinutes(15),
            },
        };

        private Event SeedEvents() => new Event
        {
            Id = 1,
            Date = DateTime.Now,
            Time = "12:30",
            CategoryId = 1,
            Description = "Desc",
            Location = "Sliven",
            OrganizerId = "1",
            Title = "Title",
            Image = "image",
        };

        private IEnumerable<User> SeedUsers() => new List<User>
        {
            new User
            {
                Id = "1",
                UserName = "Username",
            },
            new User
            {
                Id = "2",
                UserName = "Username",
            }
        };

        [Test]
        public async Task GetAllWorksCorrectly()
        {
            var eventId = 1;
            var result = await commentService.GetAllAsync(eventId);

            var actual = dbContext.Comments.Where(c => !c.IsDeleted && c.EventId == eventId).ToList();

            Assert.IsTrue(result.Count() == actual.Count);
        }

        [Test]
        public async Task CreateWorksCorrectly()
        {
            var userId = "1";

            var dto = new CommentFormDto
            {
                Content = "Some content",
                EventId = 1,
            };

            var result = await commentService.CreateAsync(userId, dto);

            Assert.IsTrue(result);

            var newComment = dbContext.Comments.Last();

            Assert.IsNotNull(newComment);

            Assert.IsTrue(newComment.EventId == dto.EventId);
            Assert.IsTrue(newComment.Content == dto.Content);
            Assert.IsTrue(newComment.UserId == userId);
        }

        [Test]
        public async Task CreateReturnsFalseWithInvalidEvent()
        {
            var userId = "1";

            var dto = new CommentFormDto
            {
                Content = "Some content",
                EventId = 123,
            };

            var result = await commentService.CreateAsync(userId, dto);

            Assert.IsFalse(result);
        }

        [Test]
        public async Task EditWorksCorrectly()
        {
            var userId = "1";
            var commentId = 1;
            var dto = new CommentFormDto
            {
                Content = "new content",
                EventId = 1,
            };

            var result = await commentService.EditAsync(commentId, userId, dto);

            Assert.IsTrue(result);

            var actual = dbContext.Comments.Find(commentId);

            Assert.IsNotNull(actual);

            Assert.IsTrue(actual.Content == dto.Content);
            Assert.IsTrue(actual.EventId == dto.EventId);
            Assert.IsTrue(actual.UserId == userId);
        }

        [Test]
        public async Task EditFailsWithInvalidCommentId()
        {
            var commentId = 123;

            var result = await commentService.EditAsync(commentId, "1", new CommentFormDto());

            Assert.IsFalse(result);
        }

        [Test]
        public async Task EditFailsIfTheUserCannotEdit()
        {
            var commentId = 1;
            var userId = "2";

            var result = await commentService.EditAsync(commentId, userId, new CommentFormDto());

            Assert.IsFalse(result);
        }

        [Test]
        public async Task DeleteWorksCorrectly()
        {
            var commentId = 1;
            var userId = "1";

            var result = await commentService.DeleteAsync(commentId, userId);

            Assert.IsTrue(result);

            var actual = dbContext.Comments.Find(commentId);

            Assert.IsNotNull(actual);
            Assert.IsTrue(actual.IsDeleted);
            Assert.IsTrue(actual.UserId == userId);
        }

        [Test]
        public async Task DeleteFailsWithInvalidCommentId()
        {
            var commentId = 123;
            var userId = "1";

            var result = await commentService.DeleteAsync(commentId, userId);

            Assert.IsFalse(result);
        }

        [Test]
        public async Task DeleteFailsIfTheUserCannotDelete()
        {
            var commentId = 1;
            var userId = "2";

            var result = await commentService.DeleteAsync(commentId, userId);

            Assert.IsFalse(result);

            var actual = dbContext.Comments.Find(commentId);

            Assert.IsNotNull(actual);

            Assert.IsFalse(actual.IsDeleted);
        }
    }
}
