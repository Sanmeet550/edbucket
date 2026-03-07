import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './db.js';
import Country from './models/Country.js';
import University from './models/University.js';
import Application from './models/Application.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// --- ROUTES ---

// Public: Get all countries
app.get('/api/countries', async (req, res) => {
    try {
        const countries = await Country.findAll({ where: { isActive: true } });
        res.json(countries);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Public: Get country by slug with universities
app.get('/api/countries/:slug', async (req, res) => {
    try {
        const country = await Country.findOne({
            where: { slug: req.params.slug, isActive: true },
            include: [University]
        });
        if (!country) return res.status(404).json({ error: 'Country not found' });
        res.json(country);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Public: Submit application
app.post('/api/applications', async (req, res) => {
    try {
        const application = await Application.create(req.body);
        res.status(201).json(application);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Admin: CRUD for Countries
app.get('/api/admin/countries', async (req, res) => {
    try {
        const countries = await Country.findAll();
        res.json(countries);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/admin/countries', async (req, res) => {
    try {
        const country = await Country.create(req.body);
        res.status(201).json(country);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.put('/api/admin/countries/:id', async (req, res) => {
    try {
        const country = await Country.findByPk(req.params.id);
        if (!country) return res.status(404).json({ error: 'Country not found' });
        await country.update(req.body);
        res.json(country);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Admin: CRUD for Universities
app.post('/api/admin/universities', async (req, res) => {
    try {
        const university = await University.create(req.body);
        res.status(201).json(university);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Admin: View Applications
app.get('/api/admin/applications', async (req, res) => {
    try {
        const applications = await Application.findAll({
            include: [Country, University],
            order: [['createdAt', 'DESC']]
        });
        res.json(applications);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- SERVER START & DB SYNC ---
const PORT = process.env.PORT || 5000;

sequelize.sync({ force: false }).then(async () => {
    console.log('Database synced');

    // Seed data if empty
    const countryCount = await Country.count();
    if (countryCount === 0) {
        const uk = await Country.create({
            name: 'United Kingdom',
            slug: 'united-kingdom',
            description: 'Host to some of the world\'s oldest and most prestigious universities.',
            institutionalPresence: '200+ Institutions',
            universityTypes: 'Russell Group, Research Intensive, Modern Universities',
            partnerOpportunity: 'High-volume recruitment with streamlined compliance.',
            imageUrl: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=800'
        });

        await University.create({
            name: 'University of Oxford',
            description: 'A world-leading centre of learning, teaching and research.',
            category: 'Russell Group',
            CountryId: uk.id
        });

        console.log('Seed data created');
    }

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch(err => {
    console.error('Failed to sync database:', err);
});
