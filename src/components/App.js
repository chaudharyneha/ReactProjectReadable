import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from './Dashboard';
import DetailedPost from './DetailedPost';
// import CreatePost from './CreatePost';
import CategoriesList from './CategoriesList';
import PostsList from './PostsList';
import CreatePost from './CreatePost';
import NotFound from './NotFound';

class App extends Component {

  render() {

    return (
      <div className="App">
        <header>
          <div><h1><center>Readable Project</center></h1></div>
        </header>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path='/:category/:postId' render={(props) => <DetailedPost {...props} />} />
          <Route path='/notfound' component={ NotFound } />
          <Route  path='/:category' render={(props) => (
          <div className="category-post">
            <CategoriesList />
            <div className="content">
              <CreatePost />
              <PostsList />
            </div>
          </div>
            )}/>
        </Switch>
      </div>
    );
  }
}


export default App;
