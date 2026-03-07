import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const Country = sequelize.define('Country', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    description: {
        type: DataTypes.TEXT,
    },
    imageUrl: {
        type: DataTypes.STRING,
    },
    institutionalPresence: {
        type: DataTypes.STRING,
    },
    universityTypes: {
        type: DataTypes.STRING,
    },
    partnerOpportunity: {
        type: DataTypes.TEXT,
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    }
});

export default Country;
