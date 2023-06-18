import React from "react"
import Users from "./layouts/users"
import { Switch, Route, Redirect } from "react-router-dom"
import Main from "./layouts/main"
import Login from "./layouts/login"
import NavBar from "./components/ui/navBar"

const App = () => {
  return (
    <div>
      <NavBar />
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/users/:userId?/:edit?" component={Users} />
        <Route path="/login/:register?" component={Login} />
        <Redirect to="/" />
      </Switch>
    </div>
  )
}

export default App
