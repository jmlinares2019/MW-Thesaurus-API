import express from 'express';
import axios from 'axios';

const app = express();
const port = 3000;
const API_URL = 'https://www.dictionaryapi.com/api/v3/references/thesaurus/json';
const API_KEY = '4c0ee450-6bb8-4361-8622-585b4b1e598d';

app.use(express.static("public"));

app.get("/", async (req, res) => {
    try{
        const response = await axios.get(`${API_URL}/example?key=${API_KEY}`);
        const result = JSON.stringify(response.data);
        console.log(result);
        res.render("index.ejs", { content: result });
    }
    catch(error){
        console.log(error);
    }
});

app.listen(port, () =>{
    console.log(`App listening in port ${port}`);
});

