import { AsyncStorage } from "react-native";

export function saveKey(key) {
  return AsyncStorage.setItem("USER_KEY", key);
}

export function loadKey(callback) {
  const USER_KEY = AsyncStorage.getItem("USER_KEY", callback);
  return USER_KEY
}
export function removeKey(){
  const USER_KEY = saveKey()
  const removeKey = AsyncStorage.removeItem(USER_KEY)
  return removeKey
}
  
 
