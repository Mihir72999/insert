const http = require('http')
const url = require('url')
class NewNode {
 constructor(data){
    this.data = data
    this.next = null
}   

}

class NextLink {
    constructor(){
        this.head = null
    }
  async  insertion(datas){
       
        const newNode = new NewNode(datas)
        newNode.next = this.head
       return  this.head =  newNode
       

    }
}

const server = http.createServer(async(req,res)=>{
   const paths =req.url == '/favicon.ico' || req.url == '/' ? "/users" :  url.parse(req.url).path
    
   try {
    
       const data = async() =>{
           
        const item = await fetch('https://jsonplaceholder.typicode.com'+ paths  )
        const moreData = await item.json()
        return moreData    
    }
    
    const newNextLink = new NextLink()
    const content =await newNextLink.insertion(data())
    const result = await content.data   
    res.setHeader('Content-Type', 'application/json')
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.setHeader('Access-Control-Request-Method', 'OPTIONS,GET , POST');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'http://localhost:5173');
    const totalResult = {totalResult:result.length , data:result}
    res.end(JSON.stringify(totalResult))
} catch (error) {
  console.log(error) 
}
})

server.listen(3500 ,()=>console.log("http://localhost:3500"))