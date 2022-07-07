import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Put,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common'
import { CategoriesService } from './categories.service'
import { CreateCategoryDTO } from './dtos/createCategory.dto'
import { UpdateCategoryDTO } from './dtos/updateCategory.dto'
import { Category } from './interfaces/category.interface'

@Controller('api/v1/categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}

    @Post()
    @UsePipes(ValidationPipe)
    async createCategory(
        @Body() createCategoryDTO: CreateCategoryDTO
    ): Promise<Category> {
        return await this.categoriesService.createCategory(createCategoryDTO)
    }

    @Get()
    async getAllCategories(): Promise<Array<Category>> {
        return await this.categoriesService.getAllCategories()
    }

    @Get('/:category')
    async getCategoryById(
        @Param('category') category: string
    ): Promise<Category> {
        return await this.categoriesService.getCategoryById(category)
    }

    @Put('/:category')
    @UsePipes(ValidationPipe)
    async updateCategoryById(
        @Body() updateCategoryDTO: UpdateCategoryDTO,
        @Param('category') category: string
    ): Promise<void> {
        return await this.categoriesService.updateCategoryById(
            category,
            updateCategoryDTO
        )
    }

    @Post('/:category/players/:idPlayer')
    async assignCategoryToPlayer(@Param() params: string[]): Promise<void> {
        return await this.categoriesService.assignCategoryToPlayer(params)
    }
}
