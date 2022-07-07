import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateCategoryDTO } from './dtos/createCategory.dto'
import { UpdateCategoryDTO } from './dtos/updateCategory.dto'
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
        return await this.categoryModel.find().exec()
    }

    async getCategoryById(category: string): Promise<Category> {
        const validate = await this.categoryValidate(category)

        if (!validate) {
            throw new NotFoundException(`Category ${category} not found!`)
        }

        return await this.categoryModel.findOne({ category }).exec()
    }

    async updateCategoryById(
        category: string,
        updateCategoryDTO: UpdateCategoryDTO
    ): Promise<void> {
        const validate = await this.categoryValidate(category)

        if (!validate) {
            throw new NotFoundException(`Category ${category} not found!`)
        }

        await this.categoryModel
            .findOneAndUpdate({ category }, { $set: updateCategoryDTO })
            .exec()
    }

    async assignCategoryToPlayer(params: string[]): Promise<void> {
        const category = params['category']
        const idPlayer = params['idPlayer']

        const validateCategory = await this.categoryValidate(category)
        // const validatePlayer

        if (!validateCategory) {
            throw new BadRequestException(
                `Category ${category} not registered!`
            )
        }

        validateCategory.players.push(idPlayer)
    }

    private async categoryValidate(category: string): Promise<Category> {
        return await this.categoryModel.findOne({ category }).exec()
    }
}
