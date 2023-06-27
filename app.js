const express = require("express");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));


mongoose.connect("mongodb+srv://sanjeev-admin:test123@cluster0.uo8dv.mongodb.net/abcd?retryWrites=true&w=majority", {
  useNewUrlParser: true
});
// const itemsSchema ={
//   month: String,
//   no: Number
// }
// const item=mongoose.model("items",itemsSchema);
//
// const one = new item({month:"january",no:50});
//


// { "_id" : ObjectId("6240269999197540c5d77cda"), "name" : "January", "no" : 100 },
// { "_id" : ObjectId("6240269999197540c5d77cdb"), "name" : "February", "no" : 90},
// { "_id" : ObjectId("6240269999197540c5d77cdc"), "name" : "March", "no" : 80 },
// { "_id" : ObjectId("6240269999197540c5d77cdd"), "name" : "April", "no" : 70 },
// { "_id" : ObjectId("6240269999197540c5d77cde"), "name" : "May", "no" : 80 },
// { "_id" : ObjectId("6240269999197540c5d77cdf"), "name" : "June", "no" : 90},
// { "_id" : ObjectId("6240269999197540c5d77ce0"), "name" : "July", "no" : 100},
// { "_id" : ObjectId("6240269999197540c5d77ce1"), "name" : "August", "no" : 90 },
// { "_id" : ObjectId("6240269999197540c5d77ce2"), "name" : "September", "no" :80 },
// { "_id" : ObjectId("6240269999197540c5d77ce3"), "name" : "October", "no" : 90},
// { "_id" : ObjectId("6240269999197540c5d77ce4"), "name" : "November", "no" : 100},
// { "_id" : ObjectId("6240269999197540c5d77ce5"), "name" : "December", "no" : 100}



const itemsSchema = {
  name: String,
  no: Number
};

const Item = mongoose.model("Item", itemsSchema);


const item1 = new Item({
  name: "January",
  no: 50
});

const item2 = new Item({
  name: "February",
  no: 27
});

const item3 = new Item({
  name: "March",
  no: 98
});

const item4 = new Item({
  name: "April",
  no: 55
});
const item5 = new Item({
  name: "May",
  no: 44
});
const item6 = new Item({
  name: "June",
  no: 70
});
const item7 = new Item({
  name: "July",
  no: 80
});
const item8 = new Item({
  name: "August",
  no: 20
});
const item9 = new Item({
  name: "September",
  no: 10
});
const item10 = new Item({
  name: "October",
  no: 40
});
const item11 = new Item({
  name: "November",
  no: 22
});
const item12 = new Item({
  name: "December",
  no: 100
});


let defaultItems = [item1, item2, item3, item4, item5, item6, item7, item8, item9, item10, item11, item12];




app.get("/", function(req, res) {
  // itemSchema.markModified('anything');


  Item.find({}, function(err, foundItems) {
    console.log(defaultItems[0].no);
    if (foundItems.length === 0) {
      Item.insertMany(defaultItems, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log("Successfully saved default items to DB.");
        }
      });
    }
  });

  Item.find({}, function(err, result) {
    if (err) {
      console.log(err);

    } else {

      for (let i = 0; i < result.length; i++) {
        console.log(result[i].name);

        defaultItems[i].no = result[i].no;
        console.log(defaultItems[i].no);
      }
    }



    // result.forEach(element => {
    //   console.log(element.id);
    // });






    // console.log("default");
    // console.log(defaultItems);
    // console.log("*************");
    // // console.log(Item.collection.find("items"));
    // console.log("*************");



    res.render("index", {
      defaultItems: defaultItems
    });
  });
});


let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}


app.listen(port, function() {
  console.log("Server started on port 3000");
});
