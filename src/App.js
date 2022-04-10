
import './styles/App.css';
import { BrowserRouter } from "react-router-dom";
import Help from './components/Utils/Help';
import MySwitch from "./components/Utils/Switch.jsx";
import Sidebar from './components/Utils/Sidebar';
import ArticleList from './components/Article/ArticleList';

function App() {

  let routes = [
    { to: "/topic", component: Help },
    { to: "/topic/:topicId/", component: ArticleList },
    { to: "/topic/:topicId/article/:articleId", component: ArticleList },
  ];

  return (
    <div className="App">
      <BrowserRouter>
        <Sidebar></Sidebar>
        <div className='content'>
          <MySwitch
            routes={routes}
            redirect={"/topics"}
          ></MySwitch>
        </div>
      </BrowserRouter>

    </div>
  );
}

export default App;
