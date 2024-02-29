import express from 'express';
import url from 'node:url'
import axios from 'axios';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;
const API_URL = 'https://www.dictionaryapi.com/api/v3/references/thesaurus/json';
const API_KEY = '4c0ee450-6bb8-4361-8622-585b4b1e598d';

// setting static files location
app.use(express.static("public"));

// using bodyParser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Search page (home)
app.get("/", async (req, res) => {
    res.render("index.ejs");
});

// Search results
app.post("/search", async (req, res) => {

    const search = req.body.search.trim();
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

// "Re-searching" (search from results: synonyms, antonyms, etc.) 
app.get("/:word", async (req, res) => {

    const search = req.params.word;
    try{
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
            };
    } catch (error) {
        console.log(error);
    } 
});

app.listen(port, () =>{
    console.log(`App listening in port ${port}`);
});

