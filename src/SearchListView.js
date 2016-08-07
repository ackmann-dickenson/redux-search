import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {ListView} from './ListView'
import {CreateSearch, DeleteSearch, actions} from './actions'
import {defaultReduxSearch} from './reducers'
import _ from 'lodash';

class SearchListView extends React.Component {
  static propTypes = {
    searchId: PropTypes.string.isRequired,
    reduxSearches: PropTypes.array.isRequired,
    renderRow: PropTypes.func.isRequired,
    dataSource: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  static defaultProps = {
    reduxSearches: []
  }

  config() {
    const { searchId, dataSource } = this.props;

    return {
      searchId,
      dataSource,
      searchConfig: _.merge(
        {},
        dataSource.searchConfig,
        {resultsUpdateStyle: 'append'}
      ),
    }
  }

  componentWillMount() {
    CreateSearch(this.props.dispatch, this.config())
  }

  componentDidMount() {
    this.dispatch('reload')
  }

  componentWillUnmount() {
    DeleteSearch(this.props.dispatch, this.config())
  }

  search() {
    const search = this.props.reduxSearches.find(s => s.get('id') === this.props.searchId) || defaultReduxSearch
    return search.toJS()
  }

  dispatch(actionName, ...args) {
    const action = actions(this.config())[actionName](...args)
    this.props.dispatch(action)
  }

  handlePageChange(page) {
    this.dispatch('searchPageChanged', this.search().page + 1)
  }

  render() {
    return (
      <ListView
        {...this.props}
        search={this.search()}
        onPageChange={::this.handlePageChange}
      />
    )
  }
}

function mapStateToProps(state) {
  return {
    reduxSearches: state.reduxSearches
  }
}

const SearchListViewContainer = connect(mapStateToProps)(SearchListView)
export default SearchListViewContainer

