import { DataTypes } from 'sequelize';
import sequelize from '../db.js';
import University from './University.js';
import Country from './Country.js';

const Application = sequelize.define('Application', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    applicantName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true,
        }
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    consultancyName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    intendedIntake: {
        type: DataTypes.STRING,
    },
    programInterest: {
        type: DataTypes.STRING,
    },
    additionalNotes: {
        type: DataTypes.TEXT,
    },
    status: {
        type: DataTypes.ENUM('Pending', 'Reviewed', 'Accepted', 'Rejected'),
        defaultValue: 'Pending',
    }
});

Application.belongsTo(University);
Application.belongsTo(Country);
University.hasMany(Application);
Country.hasMany(Application);

export default Application;
