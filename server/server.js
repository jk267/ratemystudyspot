require("dotenv").config();
const express = require("express");
const db = require('./db/index'); //dont need to do db/index.js
const router = require('express-promise-router');
const app = express(); //creates instant of express
const cors = require("cors");



// middlewra 
//next give us access to the next middle ware 
// app.use((req, res, next) => {
//     console.log("yeah middle ware working");
//     next();
// });

app.use(cors());
app.use(express.json()) //stor body and the json 


//get al restaaurant
app.get("/api/v1/restaurants", async (req, res) => {
    try {
        //const results = await db.query("select * from restaurants");
        const restaurantRatingsData = await db.query(
            "select * from restaurant left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurant.id = reviews.restaurant_id;"
        );

        res.status(200).json({
            status: "success",
            results: restaurantRatingsData.rows.length,
            data: {
                restaurant: restaurantRatingsData.rows,
            },
        });
    } catch (err) {
        console.log(err);
    }
});

// try {
//     const result = await db.query("SELECT * from restaurant")

//     res.status(200).json({
//         status: "success",
//         //good habit
//         results: result.rows.length,
//         data: {
//             restaurant: result.rows
//         }
//     });

// } catch (err) {
//     console.log(err)

// }



// get one  restaurant
// app.get("/api/v1/restaurants/:id", async (req, res) => {
//     console.log(req.params.id);

//     try {

//         const results = await db.query("select * from restaurant where id = $1", [req.params.id]); //never use string interpolation
//         console.log(results);

//         res.status(200).json(
//             {
//                 status: "success",
//                 data: {
//                     restaurant: results.rows[0],
//                 }
//             }
//         )
//     } catch (err) {
//         console.log(err)
//     }


// });

//Get a Restaurant
app.get("/api/v1/restaurants/:id", async (req, res) => {
    console.log(req.params.id);

    try {
        const restaurant = await db.query(
            "select * from restaurant left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurant.id = reviews.restaurant_id where id = $1",
            [req.params.id]
        );
        // select * from restaurants wehre id = req.params.id

        const reviews = await db.query(
            "select * from reviews where restaurant_id = $1",
            [req.params.id]
        );
        console.log(reviews);

        res.status(200).json({
            status: "success",
            data: {
                restaurant: restaurant.rows[0],
                reviews: reviews.rows,
            },
        });
    } catch (err) {
        console.log(err);
    }
});

//create a restaurant route(post)
app.post("/api/v1/restaurants", async (req, res) => {
    console.log(req.body);
    try {
        const results = await db.query("INSERT INTO restaurant (name, location, price_range) values($1, $2, $3) returning *", [req.body.name, req.body.location, req.body.price_range])
        console.log(results.rows[0])
        res.status(201).json(
            {
                status: "success",
                data: {
                    restaurant: results.rows[0],
                }
            }
        )
    } catch (err) {
        console.log(err)
    }

});


// update rest 
app.put("/api/v1/restaurants/:id", async (req, res) => {

    try {
        const results = await db.query("UPDATE restaurant SET name = $1, location = $2, price_range = $3 where id = $4 returning *",
            [req.body.name, req.body.location, req.body.price_range, req.params.id]);
        console.log(results.rows);

        res.status(205).json(
            {
                status: "success",
                data: {
                    restaurant: results.rows[0],
                },
            }
        );
    } catch (err) {
        console.log(err);
    }
});

app.delete("/api/v1/restaurants/:id", async (req, res) => {
    try {
        const results = await db.query("DELETE FROM restaurant where id = $1", [req.params.id]);
        res.status(204).json(
            {
                status: "success!"
            }
        )
    } catch (err) {
        console.log(err);
    }

})


app.post("/api/v1/restaurants/:id/addReview", async (req, res) => {
    try {
        const newReview = await db.query(
            "INSERT INTO reviews(restaurant_id, name, review, rating) values ($1, $2, $3, $4) returning *;",
            [req.params.id, req.body.name, req.body.review, req.body.rating]
        );
        console.log(newReview);
        res.status(201).json({
            status: "success",
            data: {
                review: newReview.rows[0],
            },
        });
    } catch (err) {
        console.log(err);
    }
});
//https://localhost: 3000/getrestarant --> hits the route above

// use env variable instead of hard coding! 

const port = process.env.PORT || 3001; // port is set in the env file  || means that if this doesn't work, do that. 

//listen to port 
// () call back() what will it do?
app.listen(port, () => {
    console.log(`hello world!!!!!! ${port}`);
});

//use env variable to get the port value