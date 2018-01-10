import React, { Component } from 'react';
import CategoriesList from './CategoriesList';
import CreatePost from './CreatePost';
import PostsList from './PostsList';

class Dashboard extends Component {
    render() {
        return (
          <div className="dashboard">
            <CategoriesList />
            <div className="content">
              <CreatePost />
              <PostsList />
            </div>
          </div>
        );
    }
}

export default Dashboard;
