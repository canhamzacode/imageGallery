import { BrowserRouter, Route, Routes } from "react-router-dom"
import AppLayout from "./Layout/AppLayout"
import { Suspense, useContext } from "react"
import Loading from "./components/Loading"
import Home from "./pages/Home"
import Login from "./pages/Login"
import { AuthContext, AuthProvider } from "./providers/AuthProvider"
import SignUp from "./pages/SignUp"
import AuthLayout from "./Layout/AuthLayout"
import Error from "./pages/Error"
import PrivateRoute from "./routes/PrivateRoute"


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route
              index
              element={
                <Suspense fallback={<Loading />}>
                  <PrivateRoute element={<Home />} />
                </Suspense>
              }
            />
          </Route>
          <Route element={<AuthLayout />}>
            <Route
              path="/login"
              element={
                <Suspense fallback={<Loading />}>
                  <Login />
                </Suspense>
              }
            />
            <Route
              path="/signup"
              element={
                <Suspense fallback={<Loading />}>
                  <SignUp />
                </Suspense>
              }
            />
            <Route
              path="*"
              element={
                <Suspense fallback={<Loading />}>
                  <Error />
                </Suspense>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
