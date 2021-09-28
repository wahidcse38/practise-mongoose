//Practise Mongoose
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/my-students')
    .then(() => console.log("Connected to MongoDB Successfully"))
    .catch(err => console.error("Connection Failed"));


//Schema
const studentsSchema = new mongoose.Schema({
    firstname: String,
    lastname: { type: String },
    dob: Date,
    entryDate: { type: Date, default: Date.now },
    passed: Boolean,
    hobbies: [String],
    parents: {
        father: String,
        mother: String,
    },
    subjects: [{ name: String, marks: { type: Number, min: 0, max: 100 } }],
})


//Create Data
//Model
const Student = mongoose.model('Student', studentsSchema);
const student = new Student({
    firstname: "Nahid",
    lastname: "Islam",
    dob: new Date("05 April 1995"),
    passed: true,
    hobbies: ["Reading", "Coding"],
    parent: {
        father: "Monsur",
        mother: "Ayasha"
    },
    subjects: [{ name: "Math", marks: 80 }, { name: "English", marks: 90 }]
});




//Create data with Promise =>

// student.save()
//     .then(student => console.log(student))
//     .catch(err => console.log(err._message))

//Create data with Async Await =>

// async function createStudent() {
//     const student = new Student({
//         firstname: "Wahidul",
//         lastname: "Islam",
//         dob: new Date("05 April 1995"),
//         passed: true,
//         hobbies: ["Reading", "Coding"],
//         parent: {
//             father: "Monsur",
//             mother: "Ayasha"
//         },
//         subjects: [{ name: "Math", marks: 80 }, { name: "English", marks: 90 }]
//     });
//     try {
//         const data = await student.save();
//         console.log(data);
//     } catch (err) {
//         console.log(err._message)
//     }

// }
//createStudent();




//Read Data with Promise =>

// Student.find()
//     .then(data => console.log(data))
//     .then(err => console.log(err._message));

//Read data with Async Await =>

async function readStudent() {
    try {
        const studentData = await Student
            .find()
            // .limit(10)
            // .sort({ firstname: 1, lastname: 1 })
            .select({ firstname: 1, lastname: 1, hobbies: 1, passed: 1 })
        console.log(studentData);
    }
    catch (err) {
        console.log(err);
    }

}
readStudent();




//Update data with Promise

// const updateStudent = (id) => {
//     Student.updateOne({ _id: id }, { $set: { passed: false } })
//         .then(res => console.log(res))
// }
// updateStudent("6152e5eb1eb57b85806c7900")

//Update data with Async Await

async function updateStudent(id) {
    try {
        const student = await Student.updateOne({ _id: id }, { $set: { firstname: "Noyon" } });
        console.log(student)
    } catch (err) {
        console.log(err)
    }

}
updateStudent("6152e4e526b78e2c2cef5822")




//Delete data with Promise

// const deletStudent = (id) => {
//     Student.deleteOne({ _id: id })
//         .then(res => console.log(res))
//         .catch(err => console.log(err))
// }
//deletStudent("6152e4e526b78e2c2cef5822")

//Delete data with Async Await

async function deletStudent(id) {
    try {
        const student = await Student.deleteOne({ _id: id })
        console.log(student);
    } catch (err) {
        console.log(err)
    }

}
deletStudent("6152e5eb1eb57b85806c7900");