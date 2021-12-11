const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors");

const models = require("./models/index.js");
const router = require("./router/index");
const e = require("express");

//import axios from "axios";

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.listen(port, () => {
  console.log("server on " + port);
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const sessionOption = {
  secret: "capstone-secret",
  name: "sessionId",
  resave: false,
    rolling:true,
    secure: true,
    httpOnly:true,
}

models.sequelize.sync().then( () => {
  console.log("DB 연결 성공");
}).catch(err => {
  console.log("연결 실패");
  console.log(err);
})


// class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       cart_num = "",
//       is_check = "",
//       user_id = "",
//       category = "",
//       food_name = "",
//       sample1List : [],
//     }
//   };
  
//   componentDidMount() {
//   }

//   _user_idUpdate(e){
//     this.setState({user_id: e.target.value})
//   }
//   _categoryUpdate(e){
//     this.setState({category: e.target.value})
//   }
//   _food_nameUpdate(e){
//     this.setState({food_name: e.target.value})
//   }  
//   _is_checkedUpdate(e){
//     this.setState({is_check: e.target.value})
//   }

//   render() {
//     const { sample1List } = this.state;

//     return(
//       <div className='App'>
//         <h3>Hello, You are testing React!</h3>

//         <h4> Sample1 List </h4>

//         <input type='text' maxLength='10' placeholder='검색키워드(user_id)' onChange={(e) => this._user_idUpdate(e)} />
//         {/* <input type='text' maxLength='20' placeholder='검색키워드(category)' onChange={(e) => this._categoryUpdate(e)}/>
//         <input type='text' maxLength='20' placeholder='검색키워드(food_name)' onChange={(e) => this._food_nameUpdate(e)} /> */}
//         <input type='text' maxLength='20' placeholder='검색키워드(is_check)' onChange={(e) => this._is_checkedUpdate(e)}/>

//         <button onClick={this._getKeywordData}>Search</button>
//         <button onClick={this._getData}>ListAll</button>

//         {sample1List.length !== 0 ? 
//         sample1List.map( (el, key) => {
//           return(
//             <div key={key}>
//               <span> user_id: {el.user_id} </span>
//               <span> category: {el.category} </span>
//               <span> food_name: {el.food_name} </span>
//               <span> is_check: {el.is_check}</span>
//             </div>
//           )
//         })
//         : <div>데이터가 없습니다.</div>}

//       </div> 
//     )
//   };

// }


app.use(router);
router.use("/api", router);
