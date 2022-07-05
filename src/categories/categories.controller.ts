import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common'
import { CategoriesService } from './categories.service'
import { CreateCategoryDTO } from './dtos/createCategory.dto'
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
}