import { RouterProvider } from "react-router-dom";
import routes from "./routes/routes";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import auth from "./firebase/auth.config";
import { getUserInfo, loadUser } from "./redux/features/authentication/auth.slice";
import Loading from "./components/reusable/Loading";

function App() {
  const dispatch = useDispatch()
  const {authentiaction}  = useSelector(state => state)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => { user?.email && dispatch(getUserInfo(user?.email)); return user }
    )
    
  }, []);
  if (authentiaction._status.isLoading) {
    return <Loading></Loading>
   }
  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
