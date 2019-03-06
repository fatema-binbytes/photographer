/*eslint-disable */
import { observable, action, set } from "mobx";
import { save } from "../utils/db";
import firebase from "react-native-firebase";

const COLL_USER = "Users";

class User {
  @observable
  uid = "";
  @observable
  displayName = "";
  @observable
  email = "";
  @observable
  accountType = "";
  @observable
  about = "";

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

  constructor() {
    this.firestore = firebase.firestore()
    this.userCollection = this.firestore.collection(COLL_USER);
  }

  @action
  async createOrUpdate(id, data) {

    await this.userCollection.doc(id).set(data);

    this.id = id;
    this.displayName = data.displayName;
    this.email = data.email;
    this.accountType = data.accountType;
    this.about = data.about;
    
    return save(data);
  }

  @action
  async getById(id) {
    const doc = await this.userCollection.doc(id).get();
    if(doc.exists)
      return doc.data();
    else
      return false;
  }

  @action
  set(value) {
    this.uid = value.uid;
    this.displayName = value.displayName;
    this.email = value.email;
    this.accountType = value.accountType
  }
}

export default User;
