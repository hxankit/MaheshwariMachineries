import swaggerAutogen from "swagger-autogen"
const docs={
    info:{
        title:"API Info",
        descryption:"machineries"
    },
    host:"localhost:8000/api"
}

const outPutFiles='./Swagger.json'
const routes=["./routes/adminAuth.js","./routes/category.route.js","./routes/contact.route.js","./routes/product.route.js"]

swaggerAutogen(outPutFiles,routes,docs)