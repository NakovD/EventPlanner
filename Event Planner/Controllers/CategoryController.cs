namespace EventPlanner.Controllers
{
    using Services.Contracts;

    using Microsoft.AspNetCore.Mvc;

    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : BasicController
    {
        private readonly ICategoryService categoryService;


        public CategoryController(ICategoryService categoryService)
        {
            this.categoryService = categoryService;
        }

        [HttpGet("All")]
        public async Task<IActionResult> Get() => Ok(await categoryService.GetAllAsync());
    }
}
