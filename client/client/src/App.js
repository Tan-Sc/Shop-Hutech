import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { DataProvider } from './components/GlobalState'

import Header from './components/Header/Header'
// import Footer from './components/Footer/Footer'
import Pages from './components/Pages/Pages'

function App() {
  return (
    <DataProvider>
      <Router>
        <div className="App">
          <Header />
          <Pages />
          {/* <Footer /> */}
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;
