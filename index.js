import app from "./app.js";

app.listen(app.get("PORT"), () =>{
    console.log('SERVER RUNNING:' + app.get('PORT'))
})
