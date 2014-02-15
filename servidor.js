var express = require("express");
var dust = require("dustjs-linkedin");
var cons = require("consolidate");

var app = express();
//app.listen(8021);
//app.listen(process.env.PORT,process.env.OPENSHIFT_NODEJS_IP);
app.listen(process.env.OPENSHIFT_NODEJS_PORT,process.env.OPENSHIFT_NODEJS_IP);

//-----------------configurando las carpetas estatitas---------------------------
app.use("/css",express.static(__dirname + "/css")); //el primer "/csss" es un nombre logico y el segundo "csss" es el nombre real(fisico)(carpeta original)
app.use("/css",express.directory(__dirname + "/css"));

app.use("/imagenes",express.static(__dirname + "/imagenes"));
app.use("/videos",express.static(__dirname + "/videos"));


//---------------- para configurar el sistema de templates ------------------------

//primero le decimos que sistema de template va a usar
app.engine("dust",cons.dust); //engine nosmbre de sistema de templates para poder usarlo cons.dust tiene la configuracion
app.set("views",__dirname + "/vistas"); //le dice a node.js donde estas las vistas, html,css

//definiendo cual es la extension x default
app.set("view engine","dust");


app.use(express.urlencoded()); //

//------------- definicion de rutas -----------------------------
app.get("/index",function(req,res){
	res.send("Bienvenido a mi pagina");
});

app.get("/contacto",function(req,res){
	res.render("contacto");
});


app.get("/",function(req,res){
	var frase="Hola a todos"; //Esta informacion, puede sonsultarse una BD
	res.render("index",{
		frase:frase,
		datos:{
			nombre:"lilia",
			apellido:"cruz"
		}
	});
});


//re, request datos en envia el usuario
//res response, lo que mostramos al usuario
app.post("/suscribir",function(req,res){
	console.log("El e-mail es: " + req.body.email);
	res.send("información recibida");	
});


app.post("/contactos",function(req,res){
	console.log("Nombre : " + req.body.nombre);
	console.log("E-mail: " + req.body.email);
	console.log("Url: " + req.body.url);
	console.log("Edad: " + req.body.edad);
	console.log("Comentario: " + req.body.comentario);	
});

	
	
console.log("Hola mundo");

