import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import DetailedPost from './DetailedPost';
import Sidebar from './Sidebar';
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
          <Route exact path='/' render={(props) => (
            <main>
              <div className="sidebar">
                <Sidebar />
              </div>
              <section className="posts-display">
                <PostsList />
              </section>
            </main>
          )}/>
          <Route path='/notfound' component={ NotFound } />
          <Route path='/:category/:postId' render={(props) => <DetailedPost {...props} />} />
          <Route  path='/:category' render={(props) => (
            <main>
              <div className="sidebar">
                <Sidebar />
              </div>
              <section className="posts-display">
                <PostsList />
              </section>
            </main>
          )}/>
        </Switch>
      </div>
    );
  }
}


export default App;
