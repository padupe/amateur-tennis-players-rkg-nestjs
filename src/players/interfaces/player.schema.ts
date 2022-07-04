import * as mongoose from 'mongoose'

export const PlayerSchema = new mongoose.Schema(
    {
        email: { type: String, unique: true },
        phoneNumber: String,
        name: String,
        ranking: String,
        positionRanking: Number,
        urlAvatarPlayer: String,
    },
    { timestamps: true, collection: 'players' }
)
