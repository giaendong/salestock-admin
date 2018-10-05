import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getDress, deleteDress } from 'actions/dress';
import { routeCodes } from 'constants/routes';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';


@connect(state => ({
  error: state.dress.get('error'),
  loading: state.dress.get('loading'),
  dress: state.dress.get('dress'),
  dressEmpty: state.dress.get('dressEmpty'),

  deleteLoading: state.dress.get('deleteLoading'),
  deleteError: state.dress.get('deleteError'),
  deleteSuccess: state.dress.get('deleteSuccess'),
}))
export default class Dress extends Component {
  static propTypes = {
    history: PropTypes.object,
    error: PropTypes.string,
    loading: PropTypes.bool,
    dress: PropTypes.object,
    dressEmpty: PropTypes.bool,
    // deleteLoading: PropTypes.bool,
    deleteError: PropTypes.bool,
    deleteSuccess: PropTypes.bool,
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
    this.delete = this.delete.bind(this);
    this.reload = this.reload.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getDress('1'));
  }

  componentDidUpdate(prevProps) {
    const { deleteSuccess, deleteError } = this.props;
    if (deleteSuccess !== prevProps.deleteSuccess && deleteSuccess) {
      this.reload();
    }
    if (deleteError !== prevProps.deleteError && deleteError) {
      /* eslint-disable no-alert */
      window.alert('Delete Item Failed');
      /* eslint-enable no-alert */
    }
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

  reload() {
    const { dispatch } = this.props;
    this.setState({
      page: 1,
      arr: {},
    });
    dispatch(getDress('1'));
  }

  delete(e) {
    const { dispatch } = this.props;
    if (e.target.id) {
      /* eslint-disable no-alert */
      const confirmation = window.confirm(`Delete Item ${ e.target.name }`);
      /* eslint-enable no-alert */
      if (confirmation) {
        dispatch(deleteDress(e.target.id));
      }
    }
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
        <TableCell>{dress[item].best_seller ? 'Best Seller' : 'Normal'}</TableCell>
        <TableCell>
          <Button variant='outlined' size='small' color='primary'>
              Edit
          </Button>
          <IconButton aria-label='Delete' id={ item } name={ dress[item].product_name } onClick={ this.delete }>
            <DeleteIcon fontSize='small' />
          </IconButton>
        </TableCell>
      </TableRow>
    );
  }

  render() {
    const {
      history,
      loading,
      error,
      dress,
      dressEmpty,
      deleteSuccess,
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
                  <Button
                    variant='fab'
                    color='primary'
                    aria-label='Add'
                    onClick={ () => { history.push(routeCodes.DRESSCREATE); } }
                  >
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
          {
            loading ? <CircularProgress className='loading-circle' color='secondary' /> : null
            }
        </Paper>
        {
          dressEmpty || loading ? null :
          <Button className='loadmore-button' variant='outlined' onClick={ this.loadMore }>More</Button>
        }
        { dressEmpty ? <Button className='loadmore-button'>Last Item Reached</Button> : null }
        <Snackbar
          anchorOrigin={ {
            vertical: 'bottom',
            horizontal: 'left',
          } }
          open={ deleteSuccess }
          autoHideDuration={ 6000 }
          message={ <span id='message-id'>Delete Successful</span> }
        />
      </div>
    );
  }
}
