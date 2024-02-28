import express from 'express';
import axios from 'axios';
import body from 'body-parser';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;
const API_URL = 'https://www.dictionaryapi.com/api/v3/references/thesaurus/json';
const API_KEY = '4c0ee450-6bb8-4361-8622-585b4b1e598d';

// setting static files location
app.use(express.static("public"));

// using bodyParser middleware
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
    res.render("index.ejs");
});

app.post("/search", async (req, res) => {
    const search = req.body.search.trim();
    console.log(`------------------------ New search: ${search} ------------------------ `);
    try {
        const response = await axios.get(`${API_URL}/${search}?key=${API_KEY}`);
        const results = response.data;
        // Checking whether we receive full result or array of suggestions (for wrong or incomplete search)
        if(results[0].meta){
            res.render("results.ejs", { 
                entry: search,
                results: results 
            });
        } else {
            res.render("suggestions.ejs", { 
                search: search,
                suggestions: results 
            });
        }
        
    } catch (error) {
        console.log(error);
    }
});

app.listen(port, () =>{
    console.log(`App listening in port ${port}`);
});

