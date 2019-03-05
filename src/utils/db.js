import { AsyncStorage } from "react-native";

export function saveKey(key) {
  return AsyncStorage.setItem("USER_KEY", key);
}

// export function loadKey() {
//   return AsyncStorage.getItem("USER_KEY");
  
  
// }

export function removeKey(){
  const USER_KEY = saveKey()
  const removeKey = AsyncStorage.removeItem(USER_KEY)
  return removeKey 
}
  
 
