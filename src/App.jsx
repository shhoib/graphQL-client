// import './App.css'
// import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
// import GetData from './getData';
// import {BrowserRouter as Router,Route,Routes} from 'react-dom'
// import Datas from './datas';



// const client = new ApolloClient({
//   uri: 'http://localhost:8080/graphql/',
//   cache: new InMemoryCache(),
// });

// function App() {

//   return (
//     <ApolloProvider client={client}>
//     <div className="App">
//       <Router>
//         <Routes>
//           <Route path='/' element={<GetData/>}/>
//           <Route path='/displaydata' element={<Datas/>}/>
//         </Routes>
//       </Router>
//     </div>
//       </ApolloProvider>
//   )
// }

// export default App

// import './App.css';
// import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
// import GetData from './getData';
// import Datas from './datas';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// const client = new ApolloClient({
//   uri: 'http://localhost:8080/graphql',
//   cache: new InMemoryCache(),
// });

// function App() {
  
//   return (
//     <ApolloProvider client={client}>
//       <div className="App">
//         <Router>
//           <Routes>
//             <Route path="/" element={<GetData />} />
//             <Route path="/displaydata" element={<Datas />} />
//           </Routes>
//         </Router>
//       </div>
//     </ApolloProvider>
//   );
// }

// export default App;


import './App.css';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Datas from './datas';
import Login from './login';
import Cookies from 'js-cookie';



const authLink = setContext((_, { headers }) => {
  const token = Cookies.get('accessToken')|| localStorage.getItem('accessToken');

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '', 
    }, 
  };
});

const httpLink = createHttpLink({
  uri: 'http://localhost:8080/graphql', 
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/displaydata" element={<Datas />} />
          </Routes>
        </Router>
      </div>
    </ApolloProvider>
  );
}

export default App;
