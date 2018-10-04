import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getDress } from 'actions/dress';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import CircularProgress from '@material-ui/core/CircularProgress';


@connect(state => ({
  error: state.dress.get('error'),
  loading: state.dress.get('loading'),
  dress: state.dress.get('dress'),
}))
export default class Dress extends Component {
  static propTypes = {
    error: PropTypes.string,
    loading: PropTypes.bool,
    dress: PropTypes.object,
    // from react-redux connect
    dispatch: PropTypes.func,
  }
  constructor(props) {
    super(props);

    this.state = {
      page: 1,
      arr: {},
    };
    this.loadMore = this.loadMore.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getDress('1'));
  }

  loadMore() {
    const { dispatch, dress } = this.props;
    const next = this.state.page + 1;
    const newArr = { ...this.state.arr, ...dress };
    this.setState({
      page: next,
      arr: newArr,
    });
    dispatch(getDress(next.toString()));
  }

  renderDress(item, dress) {
    return (
      <TableRow key={ dress[item].product_name }>
        <TableCell><Avatar
          alt='Sale Stock Images'
          src={ dress[item].image_url }
        />
        </TableCell>
        <TableCell component='th' scope='row'>
          {dress[item].product_name}
        </TableCell>
        <TableCell>{dress[item].created_date}</TableCell>
        <TableCell>{dress[item].product_type}</TableCell>
        <TableCell>{dress[item].price}</TableCell>
        <TableCell>{dress[item].best_seller ? 'Best Seller' : null}</TableCell>
        <TableCell>
          <Button variant='outlined' size='small' color='primary'>
              Edit
          </Button>
        </TableCell>
      </TableRow>
    );
  }

  render() {
    const {
      loading,
      error,
      dress,
    } = this.props;
    const { arr } = this.state;

    return (
      <div>
        <h1>
          DRESS
        </h1>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Product Image</TableCell>
                <TableCell>Product Name</TableCell>
                <TableCell>Created Date</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>
                  <Button variant='fab' color='primary' aria-label='Add'>
                    <AddIcon />
                  </Button>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {arr ? Object.keys(arr).map((item) => {
                return this.renderDress(item, arr);
              }) : null}
              {dress ? Object.keys(dress).map((item) => {
                return this.renderDress(item, dress);
              }) : null}
              {error ? <TableRow><TableCell>Something Wrong</TableCell></TableRow> : null}
            </TableBody>
          </Table>
          {loading ? <CircularProgress className='loading-circle' color='secondary' /> : null}
        </Paper>
        {dress || !loading ?
          <Button className='loadmore-button' variant='outlined' onClick={ this.loadMore }>More</Button> : null}
      </div>
    );
  }
}
