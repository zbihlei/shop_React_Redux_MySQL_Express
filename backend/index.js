import express  from "express";
import mysql  from "mysql";
import cors from "cors";
const app = express();

const db =  mysql.createConnection({
    host: "localhost",
    user:  "root",
    password: "element1992",
    database: "shop_db"
});

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });

app.get("/", (req,res)=>{
    const q = "SELECT * FROM shop_db.general";
    db.query(q,(err,data)=>{
        if(err) return  res.json(err);
        return res.json(data);
    })
});

app.get("/lite", (req,res)=>{
    const q = "SELECT * FROM shop_db.lite";
    db.query(q,(err,data)=>{
        if(err) return  res.json(err);
        return res.json(data);
    })
});

app.get("/beer", (req,res)=>{
    const q = "SELECT * FROM shop_db.beer";
    db.query(q,(err,data)=>{
        if(err) return  res.json(err);
        return res.json(data);
    })
});

app.get("/beer/:id", (req,res)=>{
    const prodId = req.params.id;
    const q = "SELECT * FROM shop_db.beer WHERE id = ?";
    db.query(q, [prodId], (err,data)=>{
        if(err) return  res.json(err);
        return res.json(data);
    })
});

app.get("/energetic", (req,res)=>{
    const q = "SELECT * FROM shop_db.energetic";
    db.query(q,(err,data)=>{
        if(err) return  res.json(err);
        return res.json(data);
    })
});

app.get("/energetic/:id", (req,res)=>{
    const prodId = req.params.id;
    const q = "SELECT * FROM shop_db.energetic WHERE id = ?";
    db.query(q, [prodId], (err,data)=>{
        if(err) return  res.json(err);
        return res.json(data);
    })
});

app.get("/coctail", (req,res)=>{
    const q = "SELECT * FROM shop_db.coctail";
    db.query(q,(err,data)=>{
        if(err) return  res.json(err);
        return res.json(data);
    })
});

app.get("/coctail/:id", (req,res)=>{
    const prodId = req.params.id;
    const q = "SELECT * FROM shop_db.coctail WHERE id = ?";
    db.query(q, [prodId], (err,data)=>{
        if(err) return  res.json(err);
        return res.json(data);
    })
});

app.get("/craft", (req,res)=>{
    const q = "SELECT * FROM shop_db.craft";
    db.query(q,(err,data)=>{
        if(err) return  res.json(err);
        return res.json(data);
    })
});

app.get("/craft/:id", (req,res)=>{
    const prodId = req.params.id;
    const q = "SELECT * FROM shop_db.craft WHERE id = ?";
    db.query(q, [prodId], (err,data)=>{
        if(err) return  res.json(err);
        return res.json(data);
    })
});


app.use(express.json());
app.use(cors());

// app.post("/tasks",(req,res)=>{
//     const q  =  "INSERT INTO tasks (`name`, `title`) VALUES (?)"
//     const values = [
//         req.body.name,
//         req.body.title,
//     ];

//     db.query(q, [values], (err,data)=>{
//         if (err) return res.json(err)
//         return res.json('task has been created!');
//     });
// });

// app.delete("/tasks/:id",(req, res)=>{
//     const taskId = req.params.id;
//     const q = "DELETE FROM  tasks WHERE id = ?"

//     db.query(q,[taskId], (err,data)=>{
//         if (err)  return res.json(err);
//         return res.json("Task was deleted");
//     })
// })

// app.put("/tasks/:id",(req, res)=>{
//     const taskId = req.params.id;
//     const q = "UPDATE tasks SET `done` = ? WHERE id = ?"
//     const values = [
//         req.body.done
//     ]

//     db.query(q,[values, taskId], (err,data)=>{
//         if (err)  return res.json(err);
//         return res.json("Task was updated");
//     })
// })

app.listen(8800, ()=>{
    console.log('connected to backend!')
});

