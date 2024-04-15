//import app from app.js
import app from "./app.js"

// naming port 
const PORT = 3000


// reduce fingerprinting
app.disable('x-powered-by')

// custom 404
app.use((req, res, next) => {
    res.status(404).send("Sorry can't find that!")
  })
  
  // custom error handler
  app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })
  
// listen request
app.listen(PORT, ()=>{
    console.log(`App listening at http://localhost:${PORT}`)
})

