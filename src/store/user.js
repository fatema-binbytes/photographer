/*eslint-disable */
import { observable, action } from "mobx";
import { saveKey } from "../utils/db";
import firebase from "react-native-firebase";

class User {
  @observable
  id = "";
  @observable
  userData =[]
  @observable
  userName='Username'
  @observable
  aboutUser ="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
  @observable
  imageData=[{id:1,image:require('../../assets/NewsIcons/9.jpg'),name:'Fashion'},
  {id:2,image:require("../../assets/NewsIcons/2.jpg"),name:'SCIENCE'},
  {id:3,image:require("../../assets/NewsIcons/8.jpg"),name:'FASHION'},
  {id:4,image:require("../../assets/NewsIcons/7.jpg"),name:'SCIENCE'},
  {id:5,image:require("../../assets/NewsIcons/6.jpg"),name:'FASHION'},
  {id:6,image:require("../../assets/NewsIcons/1.jpg"),name:'SCIENCE'},
  {id:7,image:require("../../assets/NewsIcons/11.jpg"),name:'FASHION'},
  {id:8,image:require("../../assets/NewsIcons/12.jpg"),name:'SCIENCE'},
  {id:9,image:require("../../assets/NewsIcons/8.jpg"),name:'FASHION'},
  {id:10,image:require("../../assets/NewsIcons/9.jpg"),name:'SCIENCE'}
]

  constructor(){
    this.firestore = firebase.firestore()
  }

  @action
  async create(data) {
    this.id = data.uid;
    this.userData = data
    
    return saveKey(data.uid);
  }
  @action
  async saveUSerData(){
          const userData = this.userData
        console.log(userData.displayName,userData.email,userData.uid)
        const data = firebase.firestore().collection('Users')
        console.log(data,">>>>>")
       const doc = await data.doc().get()
       if(doc.exists){
           console.log(doc.data(),"ifff")
       } else {
           const defaultDoc ={
            Email:userData.email,
            Name:userData.displayName,
           }
           await data.doc().set(defaultDoc)
           console.log(doc,"else")
       }
  }
}

export default User;
