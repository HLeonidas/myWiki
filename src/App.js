
import './styles/App.css';
import './styles/Responsive.css';
import './styles/ios-only.css';
import { BrowserRouter } from "react-router-dom";
import Help from './components/Utils/Help';
import MySwitch from "./components/Utils/Switch.jsx";
import Sidebar from './components/Utils/Sidebar';
import ArticleList from './components/Article/ArticleList';
import NoObjectsHere from './Helpers/NoObjectsHere';

function App() {
  let routes = [
    { to: "/", component: NoObjectsHere },
    { to: "/topic", component: Help },
    { to: "/topic/:topicId/", component: ArticleList },
    { to: "/topic/:topicId/article/:articleId", component: ArticleList },
  ];

  return (
    <div className="App">
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Roboto');
      </style>
      <BrowserRouter>
        <Sidebar></Sidebar>
        <div className='content'>
          <MySwitch
            routes={routes}
            redirect={"/topic"}
          ></MySwitch>
        </div>
      </BrowserRouter>

    </div>
  );
}

export default App;
