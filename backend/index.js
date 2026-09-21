const express=require("express");
const MongoClient= require("mongodb").MongoClient;
var cors=require("cors");

const app=express();
const PORT=3000;
let db;
app.use(cors());

async function connectToDB(){
	let client=new MongoClient("mongodb://127.0.0.1:27017/ejemplo422");
	await client.connect();
	db=client.db();
	console.log("conectado a la base de datos");
}

async function getList(collection, req, res){
	let sortBy=req.query._sort;
	let sortOrder=req.query._order=="ASC"?1:-1;
	let inicio=Number(req.query._start);
	let fin=Number(req.query._end);
	let sorter={}
	sorter[sortBy]=sortOrder;
	let data=await db.collection(collection).find({}).sort(sorter).project({_id:0}).toArray();
	res.set("Access-Control-Expose-Headers", "X-Total-Count");
	res.set("X-Total-Count", data.length);
	data=await data.slice(inicio, fin);
	res.json(data);
}

async function getMany(collection, req, res){
	let data=[]
	for(let index=0;index<req.query.id.length; index++){
		let dataParcial=await db.collection(collection).find({id:Number(req.query.id[index])}).project({_id:0}).toArray();
		data=await data.concat(dataParcial);
	}
	res.json(data);
}

async function getManyReference(collection, req, res){
	let data=await db.collection("productos").find(req.query).project({_id:0}).toArray();
	res.set("Access-Control-Expose-Headers", "X-Total-Count");
	res.set("X-Total-Count", data.length);
	res.json(data);
}

app.get("/Productos", async (req,res)=>{
	if("_sort" in req.query){
		await getList("productos", req, res);
	}else if("id" in req.query){
		await getMany("productos", req, res);
	}else{
		await getManyReference("productos", req, res);
	}
});



app.listen(PORT, async ()=>{
	await connectToDB();
	console.log("Backend corriendo en puerto 3000");
});
