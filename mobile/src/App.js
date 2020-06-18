import React, { useEffect, useState } from 'react';
import { StatusBar, SafeAreaView, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';

import api from './services/api';

export default function App() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        api.get('projects').then(res => (
            setProjects(res.data)
        ))
    }, []);

    async function handleAddProject() {
        const res = await api.post('projects', {
            "title": `Projeto ${Date.now()}`,
            "owner": "Ítalo Botelho"
        })

        setProjects([ ...projects, res.data ]);
    };

    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor="#7159c1" />

            <SafeAreaView style={styles.container}>
                <FlatList                     
                    data={projects}
                    keyExtractor={project =>project.id}
                    renderItem={({ item: project }) => (
                        <Text style={styles.title}>{project.title}</Text>
                    )}
                />

                <TouchableOpacity 
                    style={styles.button}
                    activeOpacity={0.6} 
                    onPress={handleAddProject}
                >
                    <Text style={styles.buttonText}>Adicionar</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#7159c1',
    },

    title: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold'
    },

    button: {
        backgroundColor: '#fff',
        margin: 20,
        height: 50,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },

    buttonText: {
        fontWeight: 'bold',
        fontSize: 16
    },
})