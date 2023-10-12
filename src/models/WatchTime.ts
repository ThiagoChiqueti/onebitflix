import { DataTypes, Model } from "sequelize"
import { sequelize } from "../database"

export interface WatchTimeAttributes{
    seconds: number
    userId: number
    episodeId: number
}

export interface WatchtimeInstance extends Model<WatchTimeAttributes>, WatchTimeAttributes { }

export const WatchTime = sequelize.define<WatchtimeInstance, WatchTimeAttributes>('WatchTime', {
    seconds: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      userId: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      episodeId: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
        references: { model: 'episodes', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
})