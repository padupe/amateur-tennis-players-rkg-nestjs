import { BadRequestException, Injectable } from '@nestjs/common'
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

        const categoryValidate = await this.categoryModel
            .findOne({ category })
            .exec()

        if (categoryValidate) {
            throw new BadRequestException(
                `Category ${category} already exists.`
            )
        }

        const newCategory = new this.categoryModel(createCategoryDTO)
        return await newCategory.save()
    }
}
