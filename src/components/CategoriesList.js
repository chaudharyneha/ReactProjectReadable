import PropTypes from 'prop-types';
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadCategories, setCategory, setSort } from '../actions'
import { Link } from 'react-router-dom'

class CategoriesList extends Component {

  static propTypes = {
    categories: PropTypes.array.isRequired
  };

  state = {
    categories: [],
    currentCategory: "all posts"
  }

  componentDidMount() {
    this.props.loadAllCategories();
  }

  setCat = (categoryName) => this.props.changeCategory(categoryName)
  setSort = (sortType) => this.props.changeSort(sortType)

  render() {

    const { categories, currentCategory } = this.props;
    const sortTypes = ['recent', 'votes', 'title' ];

    return (
      <div className="categories">
        <div>
          <h3>Select category</h3>
          <ul className="all-categories">
            { categories.map((cat, index) => (
              <li
                className={ currentCategory === cat.name ? "cat-button selected-cat" : "cat-button"}
                key={index}
                onClick={this.setCat.bind(this, cat.name)}>
                <Link to={cat.path}>
                  check {cat.name} posts
                </Link>
              </li>
            )) }
          </ul>
        </div>
        <div>
          <h3>Select Sort</h3>
          <div className="sorting">
            {sortTypes.map((sortType, index) => (
              <div key={index} className="sort-type">
                <div className="sort-type-name">{sortType}</div>
                <button className="sort up"onClick={this.setSort.bind(this, `${sortType}Up`)}> Inc </button>
                <button className="sort down"onClick={this.setSort.bind(this, `${sortType}Down`)}> Dec </button><br /><br/>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.categories,
    currentCategory: state.sortedPosts.category
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadAllCategories: () => dispatch(loadCategories()),
    changeCategory: (category) => dispatch(setCategory(category)),
    changeSort: (sortType) => dispatch(setSort(sortType))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoriesList)
