const { default: mongoose } = require("mongoose");
const conectionString =
  "mongodb+srv://notesapp:Av98jELADXC5wO8K@cluster0.tcautil.mongodb.net/";

// conexion a db
mongoose
  .connect(conectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log(err);
  });

/*
const note = new Note({
  content: "MongoDB es increible",
  date: new Date(),
  important: true,
});

note
  .save()
  .then((result) => {
    console.log(result);
    mongoose.connection.close();
  })
  .catch((err) => {
    console.log(err);
  });
*/
