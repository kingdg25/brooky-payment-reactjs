import React from "react"
import { Provider } from "react-redux"
import { createStore, combineReducers, compose, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

import checkout from "./app/pages/checkout/Checkout.reducers"
import CheckoutForm from "./app/pages/checkout/views/Form"
import Summary from "./app/pages/checkout/views/Summary"

// Setup Redux store with Thunks
const composeEnhancers =
    process.env.NODE_ENV === "development" ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose
// const reducers = combineReducers({ enrollment, checkout })
const store = createStore(
    checkout,
    !composeEnhancers ? compose(applyMiddleware(thunk)) : composeEnhancers(applyMiddleware(thunk)),
)

const App = () => (
    <Provider store={store}>
        <Router>
            <div>
                <Switch>
                    <Route exact path="/:id" component={CheckoutForm} />
                    <Route path="/Summary/:id" component={Summary} />
                    <Route render={() => (window.location = "https://brooky.io")} />
                </Switch>
            </div>
        </Router>
    </Provider>
)

// const App = () => (
//     <Provider store={store}>
//         <Router>
//             <div>
//                 <Switch>
//                     <Route exact path="/:id" component={CheckoutForm} />
//                     <Route exact path="/form/:id" component={EnrollmentForm} />
//                     <Route path="/Summary/:id" component={Summary} />
//                     <Route render={() => <Redirect to={{ pathname: "/:id" }} />} />
//                 </Switch>
//             </div>
//         </Router>
//     </Provider>
// )

export default App
