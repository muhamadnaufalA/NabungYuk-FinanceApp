import {BrowserRouter, Switch, Route} from "react-router-dom"

import Login from "./pages/Login";
import Register from "./pages/Register";
import Income from "./pages/Income";
import EditIncome from "./pages/EditIncome";
import Outcome from "./pages/Outcome";
import Category from "./pages/Category";
import EditCategory from "./pages/EditCategory";
import Wallet from "./pages/Wallet";
import EditWallet from "./pages/EditWallet";
import EditOutcome from "./pages/EditOutcome";
import BudgetRule from "./pages/BudgetRule";
import Recap from "./pages/Recap";
import EditBudgetRule from "./pages/EditBudgetRule";

import Dashboard from "./pages/Dashboard";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() { 
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Login/>
        </Route>

        <Route exact path="/register">
          <Register/>
        </Route>

         {/* Dashboard */}
          <Route exact path="/dashboard">
          <div className="wrapper">
            <Sidebar/>
              <div className="main">
                <Navbar/>
                <main className="content">
                  <div className="container-fluid p-0">
                    <Dashboard/>
                  </div>
                </main>
                <Footer/>
              </div>
            </div>
          </Route>
        
        {/* Recap */}
        <Route exact path="/recap">
          <div className="wrapper">
            <Sidebar/>
              <div className="main">
                <Navbar/>
                <main className="content">
                  <div className="container-fluid p-0">
                    <Recap/>
                  </div>
                </main>
                <Footer/>
              </div>
            </div>
          </Route>

        {/* Income Page */}
        <Route exact path="/income">
          <div className="wrapper">
            <Sidebar/>
            <div className="main">
              <Navbar/>
              <main className="content">
                  <div className="container-fluid p-0">
                    <Income/>
                  </div>
              </main>
              <Footer/>
            </div>
          </div>
        </Route>

        {/* Edit Income Page */}
        <Route exact path="/editIncome/:id">
          <div className="wrapper">
            <Sidebar/>
              <div className="main">
                <Navbar/>
                <main className="content">
                  <div className="container-fluid p-0">
                    <EditIncome/>
                  </div>
                </main>
                <Footer/>
              </div>
          </div>
        </Route>

        {/* Outcome Page */}
        <Route exact path="/outcome">
          <div className="wrapper">
            <Sidebar/>
            <div className="main">
              <Navbar/>
              <main className="content">
                  <div className="container-fluid p-0">
                    <Outcome/>
                  </div>
              </main>
              <Footer/>
            </div>
          </div>
        </Route>

        {/* Edit Outcome Page */}
        <Route exact path="/edit-outcome/:id">
          <div className="wrapper">
            <Sidebar/>
              <div className="main">
                <Navbar/>
                <main className="content">
                  <div className="container-fluid p-0">
                    <EditOutcome/>
                  </div>
                </main>
                <Footer/>
              </div>
          </div>
        </Route>

        {/* Budget Rule Page */}
        <Route exact path="/budgetrule">
          <div className="wrapper">
            <Sidebar/>
            <div className="main">
              <Navbar/>
              <main className="content">
                  <div className="container-fluid p-0">
                    <BudgetRule/>
                  </div>
              </main>
              <Footer/>
            </div>
          </div>
        </Route>

        {/* Category Page */}
        <Route exact path="/category">
          <div className="wrapper">
            <Sidebar/>
            <div className="main">
              <Navbar/>
              <main className="content">
                  <div className="container-fluid p-0">
                    <Category/>
                  </div>
              </main>
              <Footer/>
            </div>
          </div>
        </Route>

        {/* Edit Category Page */}
        <Route exact path="/editCategory/:id">
          <div className="wrapper">
            <Sidebar/>
              <div className="main">
                <Navbar/>
                <main className="content">
                  <div className="container-fluid p-0">
                    <EditCategory/>
                  </div>
                </main>
                <Footer/>
              </div>
          </div>
        </Route>

        {/* Wallet Page */}
        <Route exact path="/wallet">
          <div className="wrapper">
            <Sidebar/>
              <div className="main">
                <Navbar/>
                <main className="content">
                  <div className="container-fluid p-0">
                  <Wallet/>
                  </div>
                </main>
                <Footer/>
              </div>
          </div>
        </Route>

        {/* Edit Wallet Page */}
        <Route exact path="/editWallet/:id">
          <div className="wrapper">
            <Sidebar/>
              <div className="main">
                <Navbar/>
                <main className="content">
                  <div className="container-fluid p-0">
                  <EditWallet/>
                  </div>
                </main>
                <Footer/>
              </div>
          </div>
        </Route>

        {/* Edit Wallet Page */}
        <Route exact path="/edit-budget-rule/:id">
          <div className="wrapper">
            <Sidebar/>
              <div className="main">
                <Navbar/>
                <main className="content">
                  <div className="container-fluid p-0">
                  <EditBudgetRule/>
                  </div>
                </main>
                <Footer/>
              </div>
          </div>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;