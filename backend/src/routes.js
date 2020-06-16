const { Router } = require('express');
const { uuid, isUuid } = require('uuidv4')

const routes = Router();
const projects = [
    {
        "id": "4cf8b7a9-2073-4449-8bcc-e2f933192053",
        "title": "Projeto Node",
        "owner": "Alex Botelho"
    },
    {
        "id": "329ba117-eab1-4d2c-b661-ebabfed99ebf",
        "title": "Projeto React",
        "owner": "Marcel Botelho"
    },
    {
        "id": "8de8dc42-1040-4e06-907f-328668a104cf",
        "title": "Projeto React Native",
        "owner": "Luciana Botelho"
    }
];

function logRequests(req, res, next) {
    const { method, url } = req;

    const logLabel = `[${method.toUpperCase()}] ${url}`;

    console.time(logLabel);

    next();

    console.timeEnd(logLabel)
};

function validateProjectId(req, res, next) {
    const { id } = req.params;

    if (!isUuid(id)) return res.status(400).json({ error: 'Invalid project ID.' });

    return next;
};

routes.use(logRequests);

routes.get('/', (req, res) =>{
    res.json({
        'Hellow': 'World'
    });
});

routes.get('/projects', (req, res) => {
    const { title } = req.query;

    const filtered = title 
        ? projects.filter(project => project.title.includes(title))
        : projects;

    return res.status(200).json(filtered);
});

routes.post('/projects', (req, res) => {
    const { title, owner } = req.body;

    const project = { 
        id: uuid(), 
        title, 
        owner 
    }

    projects.push(project);

    return res.status(201).json(project);
});

routes.put('/projects/:id', validateProjectId, (req, res) => {
    const { id } = req.params;
    const { title, owner } = req.body;

    const projectIndex = projects.findIndex(project => project.id === id);
    if (projectIndex < 0) return res.status(404).json({ error: 'Project not fund'});

    const project = {
        id,
        title,
        owner
    };

    projects[projectIndex] = project;

    return res.status(200).json(project);
});

routes.delete('/projects/:id', validateProjectId, (req, res) => {
    const { id } = req.params;

    const projectIndex = projects.findIndex(project => project.id === id);
    if (projectIndex < 0) return res.status(404).json({ error: 'Project not fund'});

    projects.splice(projectIndex, 1);

    return res.status(204).send();
});

module.exports = routes;
