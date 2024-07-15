namespace EventPlanner.Controllers
{
    using Services.Contracts;

    using Microsoft.AspNetCore.Mvc;
    using EventPlanner.Services.Models.Category;
    using Microsoft.AspNetCore.Authorization;
    using EventPlanner.Common.ActionsConstants;
    using EventPlanner.Common;

    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : BasicController
    {
        private readonly ICategoryService categoryService;

        public CategoryController(ICategoryService categoryService)
        {
            this.categoryService = categoryService;
        }

        [HttpGet(CategoryActionsConstants.GetAll)]
        public async Task<IActionResult> Get() => Ok(await categoryService.GetAllAsync());

        [HttpGet(CategoryActionsConstants.GetAllForAdmin)]
        [Authorize(Roles = RoleNamesConstants.Admin)]
        public async Task<IActionResult> GetAllCategories()
        {
            return Ok(await categoryService.GetAllAsync());
        }

        [HttpPost(CategoryActionsConstants.Add)]
        [Authorize(Roles = RoleNamesConstants.Admin)]
        public async Task<IActionResult> CreateCategory([FromBody] CategoryFormDto dto)
        {
            var actionSuccess = await categoryService.CreateAsync(dto);

            if (!actionSuccess) return StatusCode(500);

            return Ok();
        }

        [HttpPost(CategoryActionsConstants.Edit)]
        [Authorize(Roles = RoleNamesConstants.Admin)]
        public async Task<IActionResult> EditCategory([FromBody] CategoryFormDto dto)
        {
            if (dto.Id <= 0) return BadRequest();

            var actionSuccess = await categoryService.UpdateAsync(dto);

            if (!actionSuccess) return BadRequest();

            return Ok();
        }

        [HttpPost(CategoryActionsConstants.Delete)]
        [Authorize(Roles = RoleNamesConstants.Admin)]
        public async Task<IActionResult> DeleteCategory([FromRoute] int id)
        {
            if (id <= 0) return BadRequest();

            var actionSuccess = await categoryService.MarkAsDeletedAsync(id);

            if (!actionSuccess) return BadRequest();

            return Ok();
        }
    }
}
