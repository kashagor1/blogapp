const express = require("express");
const bodyParser =  require("body-parser");
const _ = require('lodash');


const app = express();

let posts = [];

const homeStartingContent =  "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).";
const aboutContent =  "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.";
const contactContent = "Phasellus lorem ipsum, vehicula id enim sed, aliquam rhoncus mauris. Etiam nec lectus in urna finibus ullamcorper at eu lacus. Nulla tincidunt volutpat purus, eget consectetur tellus rutrum id. Proin nec faucibus turpis. In hac habitasse platea dictumst. Fusce faucibus commodo tellus, quis auctor lectus commodo a. Ut bibendum vestibulum urna quis laoreet. Sed dictum sem tincidunt ex accumsan scelerisque eget at risus. In dignissim odio nec ipsum ultricies, quis iaculis neque volutpat. Sed lobortis lacus vitae lorem pellentesque, eget accumsan massa vestibulum. Mauris et erat a odio dapibus feugiat. Nulla interdum massa ante. Ut mattis ut lectus non accumsan.";




app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine","ejs");

app.get("/",(req,res)=>{
	res.render("home",{content:homeStartingContent, posts : posts});
//	console.log(posts);

});

app.get("/about",(req,res)=>{
	res.render("about",{content:contactContent});
});

app.get("/contact",(req,res)=>{
	res.render("contact",{content:aboutContent});
});

app.get("/compose",(req,res)=>{
	res.render("compose");
});

app.get("/posts/:title",(req,res)=>{
	const reTitle=  _.lowerCase(req.params.title);//requested title
	posts.forEach((post)=>{
		const cTitle = _.lowerCase(post.title); //compare title
		if(cTitle === reTitle){
				res.render("post",{postTitle:post.title,
					postConetent:post.content});
		}
	})
});




app.post("/compose",(req,res)=>{
	const post = {
	title: req.body.postTitle ,
	content:req.body.postContent
};
	posts.push(post);

	res.redirect("/");

});



app.listen(3000,()=>{
	console.log("Server Stated at Port 3000");
});