namespace EventPlanner.Controllers
{
    using Services.Contracts;

    using Microsoft.AspNetCore.Mvc;
    using EventPlanner.Services.Models.Category;
    using Microsoft.AspNetCore.Authorization;

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

        [HttpGet("Categories")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAllCategories()
        {
            return Ok(await categoryService.GetAllAsync());
        }

        [HttpPost("Add")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> CreateCategory([FromBody] CategoryFormDto dto)
        {
            var actionSuccess = await categoryService.CreateAsync(dto);

            if (!actionSuccess) return StatusCode(500);

            return Ok();
        }

        [HttpPost("Edit")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> EditCategory([FromBody] CategoryFormDto dto)
        {
            if (dto.Id <= 0) return BadRequest();

            var actionSuccess = await categoryService.UpdateAsync(dto);

            if (!actionSuccess) return BadRequest();

            return Ok();
        }

        [HttpPost("Delete/{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteCategory([FromRoute] int id)
        {
            if (id <= 0) return BadRequest();

            var actionSuccess = await categoryService.MarkAsDeletedAsync(id);

            if (!actionSuccess) return BadRequest();

            return Ok();
        }
    }
}
