import React, { useState, useEffect } from 'react';

import Header from './components/Header';
import backgroundImage from './assets/background.jpg'
import api from './services/api'
import './App.css';

function App() {
    const [projects, setProjetcs] = useState([]);

    useEffect(() => {
        api.get('projects').then(res => (
            setProjetcs(res.data)
        ))
    }, [])

    async function handleAddProject() {
        const response = await api.post('projects', {
            "title": `Projeto ${Date.now()}`,
            "owner": "Ítalo Botelho"
        })

        setProjetcs([ ...projects, response.data ]);
    };

    return (
        <>
            <Header title="Projects" />

            {/* <img width="100%" src={backgroundImage} /> */}

            <button type="button" onClick={handleAddProject}>Adicionar Projetos</button>
            
            <ul>
                {projects.map(project => <li key={project.id}>{project.title}</li>)}
            </ul>

        </>
    );
};

export default App;