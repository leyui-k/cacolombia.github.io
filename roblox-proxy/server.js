require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

const serverId = process.env.SERVER_ID;
const botToken = process.env.DISCORD_BOT_TOKEN;

const corsOptions = {
    origin: 'https://leyui-k.github.io/cacolombia.github.io/', 
    methods: ['GET', 'POST'],  
    allowedHeaders: ['X-Requested-With', 'Content-Type'], 
};
app.use(cors(corsOptions));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://leyui-k.github.io/cacolombia.github.io/');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader("Content-Security-Policy", "img-src 'self' http://localhost:3000 https://tr.rbxcdn.com https://dbcacolombia.discloud.app");
    next();
});

// Endpoint para obtener el avatar de Roblox
app.get('/avatar/:userId', async (req, res) => {
    const userId = req.params.userId;
    const thumbnailUrl = `https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${userId}&size=420x420&format=Png&isCircular=false&thumbnailType=HeadShot`;

    try {
        const response = await axios.get(thumbnailUrl);
        if (response.data && response.data.data && response.data.data.length > 0) {
            const imageUrl = response.data.data[0].imageUrl;
            res.redirect(imageUrl);
        } else {
            console.error(`No avatar found for user ID: ${userId}`);
            res.status(404).send('Avatar not found');
        }
    } catch (error) {
        console.error(`Error fetching avatar: ${error.message}`);
        res.status(500).send('Error fetching avatar');
    }
});

// Endpoint para obtener los miembros del servidor de Discord
app.get('/miembros', async (req, res) => {
    try {
        const response = await axios.get(`https://discord.com/api/v10/guilds/${serverId}?with_counts=true`, {
            headers: {
                Authorization: `Bot ${botToken}`
            }
        });

        if (response.data) {
            const numeroMiembros = response.data.approximate_member_count;
            res.json({ totalMembers: numeroMiembros });
        } else {
            console.error('Error al obtener los datos del servidor');
            res.status(500).json({ error: 'No se encontraron datos del servidor' });
        }
    } catch (error) {
        console.error(`Error al obtener miembros del servidor: ${error.message}`);
        res.status(500).json({ error: 'Error al obtener los miembros del servidor' });
    }
});

// Iniciar servidor en el puerto 3000
app.listen(3000, () => {
    console.log('Proxy server running on port 3000; Code made by leyui');
});
