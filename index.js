//import app from app.js
import app from "./app.js"

// naming port 
const PORT = 3000


// listen request
app.listen(PORT, ()=>{
    console.log(`App listening at http://localhost:${PORT}`)
})

