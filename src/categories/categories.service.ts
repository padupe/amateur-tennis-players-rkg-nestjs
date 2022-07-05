import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateCategoryDTO } from './dtos/createCategory.dto'
import { Category } from './interfaces/category.interface'

@Injectable()
export class CategoriesService {
    constructor(
        @InjectModel('Category') private readonly categoryModel: Model<Category>
    ) {}

    async createCategory(
        createCategoryDTO: CreateCategoryDTO
    ): Promise<Category> {
        const { category } = createCategoryDTO

        const validate = await this.categoryValidate(category)

        if (validate) {
            throw new BadRequestException(
                `Category ${category} already exists.`
            )
        }

        const newCategory = new this.categoryModel(createCategoryDTO)
        return await newCategory.save()
    }

    async getAllCategories(): Promise<Array<Category>> {
        return await this.categoryModel.find()
    }

    async getCategoryById(category: string): Promise<Category> {
        const validate = await this.categoryValidate(category)

        if (!validate) {
            throw new NotFoundException(`Category ${category} not found!`)
        }

        return await this.categoryModel.findOne({ category })
    }

    private async categoryValidate(category: string): Promise<Category> {
        return await this.categoryModel.findOne({ category }).exec()
    }
}
