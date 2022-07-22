import { createContext, useEffect, useState } from "react";
import { authApp } from "../config/firebase";
import { firestoreApp } from "../config/firebase";

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [globalMsg, setGlobalMsg] = useState(''); 
  const register = (email,password) => {
    return authApp.createUserWithEmailAndPassword(email,password);
  };
  const login = (email,password) =>{
    return authApp.signInWithEmailAndPassword(email,password);

  };
  const logout = () => {
    return authApp.signOut();
  } 

  const bidAuction = (auctionID, price) => {

    if(!currentUser) {
      return setGlobalMsg("Please login to continue.")
    }

    let newPrice = Math.floor((price/100) *110);
    const db = firestoreApp.collection('auctions');

    return db.doc(auctionID).update({
      curPrice: newPrice,
      curWinner: currentUser.email,
    });
  };
  const endAuction = (auctionID) => {
    const db = firestoreApp.collection('auctions');

    return db.doc(auctionID).delete();
  };

  useEffect(() => {
    const subscribe = authApp.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return subscribe;
  }, []);

  useEffect(() => {
    const interval = setTimeout(() => setGlobalMsg(''), 7000);
    return () => clearTimeout(interval);
  }, [globalMsg]) ;
  return <AuthContext.Provider value = {{currentUser, register,login,logout, bidAuction, endAuction, globalMsg, setGlobalMsg}}>
     {!loading && children} 
     </AuthContext.Provider>
}