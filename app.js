const express = require('express');
const app = express();
const userModel = require('./models/user');
const postModel = require('./models/post');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const upload = require('./config/multerconfig');

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); 
app.use(express.json());
app.use(cookieParser());


app.get('/', (req, res) => {
   res.render('index');
});

app.get('/profile/upload', (req, res) => {

    res.render('profile_update');
 });

 app.post('/upload',isLoggedIn,upload.single("image"), async (req, res) => {
    let user = await userModel.findOne({email: req.user.email});
    user.profile_picture= req.file.filename;
    await user.save();
    res.redirect('/profile');
 });

app.post('/register', async (req, res) => {
    let { email, password, username, name, age  } = req.body;
    
    let user = await userModel.findOne({email});
    if(user) {
        return res.status(400).json({ error: 'Email already exists' });
    
    }
    bcrypt.genSalt(10,(err, salt) => {
        bcrypt.hash(password, salt,async (err, hash)=>{
            let user = await userModel.create({
                username,
                name,
                email,
                password: hash,
                age
            });
            
            let token = jwt.sign({email:email, userid: user._id },'secretkey', (err, token) => {
                res.cookie('token', token);
                res.send(`
                    User registered successfully. Redirecting to login page...
                    <script>
                        setTimeout(function() {
                            window.location.href = '/login';
                        }, 2000);
                    </script>
                `);
                
            });

        })
    })
});


app.get("/profile", isLoggedIn, async (req, res) => {
    let user = await userModel.findOne({email: req.user.email}).populate("posts");
    res.render('profile', {user});
});

app.get("/like/:id", isLoggedIn, async (req, res) => {
    let post = await postModel.findOne({ _id: req.params.id }).populate("user");
     
    if(post.likes.indexOf(req.user.userid) === -1){
        post.likes.push(req.user.userid);
    }else{
        post.likes.splice(post.likes.indexOf(req.user.userid), 1);
    }
    
    await post.save();
    res.redirect('/profile');
});

app.get("/edit/:id", isLoggedIn, async (req, res) => {
    let post = await postModel.findOne({ _id: req.params.id }).populate("user");
     
    res.render("edit",{post});
});

app.post("/update/:id", isLoggedIn, async (req, res) => {
    let post = await postModel.findOneAndUpdate({ _id: req.params.id},{content:req.body.content});
     
    res.redirect("/profile");
});

app.post("/post", isLoggedIn, async (req, res) => {
    let user = await userModel.findOne({email: req.user.email});
    let { content } = req.body;

    let post = await postModel.create({
        user: user._id,
        content
    });

    user.posts.push(post._id);
    await user.save();

    res.redirect('/profile');
});

app.get('/login',(req, res) => {
    res.render('login');
 });
 
app.post('/login', async (req, res) => {
    let { email, password,} = req.body;
    
    let user = await userModel.findOne({email});
    if(!user) {
        return res.status(400).json({ error: 'Something went wrong' });
    }
    
    bcrypt.compare(password, user.password, (err, result) => {
        if(result){
            if(result){
                let token = jwt.sign({email:email, userid: user._id },'secretkey');
                res.cookie('token', token);
                res.status(200).redirect('/profile');
            }
            else{
                res.redirect('/login');
            }
        }
    })
});

app.get('/logout', (req, res) => {
    res.cookie('token', '');
    res.redirect('/login');
 });

 function isLoggedIn(req, res, next) {
    if(req.cookies.token===""){
        res.redirect('/login');
    }
    else {
        let data = jwt.verify(req.cookies.token,'secretkey');
        req.user = data;
        next();
    }
}

app.listen(3000);