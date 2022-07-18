import 'dotenv/config'
import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { PlayersModule } from './players/players.module'
import { CategoriesModule } from './categories/categories.module'
import { ChallengesModule } from './challenges/challenges.module'

@Module({
    imports: [
        MongooseModule.forRoot(process.env.CONNECTION_MONGODB),
        PlayersModule,
        CategoriesModule,
        ChallengesModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
