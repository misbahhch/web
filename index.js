const express = require("express");
const app = express();
const path = require("path")
const port = 5000;
 app.set("view engine", "ejs")
const { log } = require("console");
// v4-> version , uuid4 on terminal run npm i uuid it is for random id generating
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");

// // for parsing application/x-www-form-urlencoded
// urlencoded measn to parse means to convert into objects and key:value separating and 
// extended:true means that it can deal with arrays as we use array here so we use it
// it is a Middleware: middleware is basically request response res.
app.use(express.urlencoded({extended:true}))
// override with POST having ?_method=DELETE/PATCH
app.use(methodOverride("_method"));
app.use(('/public'),express.static('public'))

  // Fake Database
// it is an array that consist of an object wuth its key:values
let blogs = [
  {
    // key:values
    id: uuidv4(),
    title: "Organic Food for health",
    description:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    image:
      "https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: uuidv4(),
    title: "Better to Eat",
    description:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    image:
      "https://images.pexels.com/photos/3669640/pexels-photo-3669640.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: uuidv4(),
    title: "Exercise is Best Cure",
    description:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    image:
      "https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: uuidv4(),
    title: "Laxury Cars",
    description:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    image:
      "https://images.pexels.com/photos/6894427/pexels-photo-6894427.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];
  
  app.get("/", (req, res) => {
    res.render("index.ejs")
})
//display all blogs
app.get("/blogs",(req,res)=>{
  res.render("blogs",{blogs})
})
//create new blog
//form to create new blog
app.get("/create",(req,res)=>{
  res.render("create")
})

//create new blog  --> POST
app.post("/blogs",(req,res)=>{
  // console.log(`Data Receieved`);
  // console.log(req.body);
  const {title, description, image} = req.body
  const newBlog = {title, description, image, id: uuidv4()}
  blogs.push(newBlog)
  res.redirect('/blogs')
})

//show detail of specific blog
app.get("/blogs/:id",(req,res) => {
  //  console.log(req.params);
   const {id} = req.params
  //  console.log("api hit");
   const foundBlog = blogs.find((blog) =>  blog.id === id)
  //  console.log(foundBlog);
   res.render("detail",{foundBlog})
})

// edit a blog
app.get("/blogs/:id/edit",(req,res)=>{
  const {id} = req.params
  const foundBlog = blogs.find((blog) =>  blog.id === id)
  res.render("edit",{foundBlog})
})
//update spacific blog
app.patch("/blogs/:id",(req,res)=>{
  // console.log(`Update API Hit!`);
  const {id} = req.params
  const {title, description, image} = req.body

  //UPDATION CODE
  const foundBlog = blogs.find((blog) =>  blog.id === id)
  if (foundBlog) {
    foundBlog.title = title;
    foundBlog.description = description;
    foundBlog.image = image;
  }
  res.redirect("/blogs")
})
//delete specific blog

app.delete("/blogs/:id", (req, res) => {
  const { id } = req.params;
 console.log(`Update API Hit!`);
  // Find the index of the blog with the matching ID in the blogs array
  const blogIndex = blogs.findIndex((blog) => blog.id === id);

  // If the blog is found (index is not -1), remove it from the array
  if (blogIndex !== -1) {
    blogs.splice(blogIndex, 1);// splice can remove the elements froom the array, 
    //1 indicates that only 1 element is removed
  }

  res.redirect("/blogs");
});

app.listen(port, () => {
  console.log(`SERVER LISTENING AT PORT ${port}`);
});
