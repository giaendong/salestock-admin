import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';

import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { createDress } from '../actions/dress';

@connect(state => ({
  createError: state.dress.get('createError'),
  createLoading: state.dress.get('createLoading'),
  createSuccess: state.dress.get('createSuccess'),
}))
export default class DressCreate extends Component {
  static propTypes = {
    createError: PropTypes.object,
    createLoading: PropTypes.bool,
    createSuccess: PropTypes.object,
    // from react-redux connect
    dispatch: PropTypes.func,
  }
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      type: 'mini',
      price: '',
      color: ['Black', 'Red', 'White'],
      size: ['L', 'XL'],
      retrn: false,
      trying: false,
      image: 'https://firebasestorage.googleapis.com/v0/b/salestock-sample.appspot.com/o/ddcf5cb966d076d429e600f09bfb7013.jpg?alt=media&token=d5508c4d-39c7-4924-bd0b-9b185e8ee2e6',
      ingredient: '',
    };
    this.handleName = this.handleName.bind(this);
    this.handleType = this.handleType.bind(this);
    this.handlePrice = this.handlePrice.bind(this);
    this.handleColor = this.handleColor.bind(this);
    this.handleSize = this.handleSize.bind(this);
    this.handleReturn = this.handleReturn.bind(this);
    this.handleTry = this.handleTry.bind(this);
    this.handleImage = this.handleImage.bind(this);
    this.handleIngredient = this.handleIngredient.bind(this);
    this.create = this.create.bind(this);
  }

  handleName(e) {
    this.setState({ name: e.target.value });
  }
  handleType(e) {
    this.setState({ type: e.target.value });
  }
  handlePrice(e) {
    this.setState({ price: e.target.value });
  }
  handleColor(e) {
    this.setState({ color: e.target.value });
  }
  handleSize(e) {
    this.setState({ size: e.target.value });
  }
  handleReturn(e) {
    this.setState({ retrn: e.target.checked });
  }
  handleTry(e) {
    this.setState({ trying: e.target.checked });
  }
  handleImage(e) {
    this.setState({ image: e.target.value });
  }
  handleIngredient(e) {
    this.setState({ ingredient: e.target.value });
  }
  create() {
    const { dispatch } = this.props;
    const {
      name, type, price, color, retrn, trying, ingredient, image, size,
    } = this.state;
    const date = moment().format('MMMM Do YYYY, h:mm:ss a');
    const body = {
      available_color: color,
      available_size: size,
      created_date: date,
      image_url: image,
      main_ingredient: ingredient,
      price,
      product_name: name,
      product_type: type,
      return: retrn,
      try_before_purchase: trying,
    };
    dispatch(createDress(body));
  }


  render() {
    const {
      createError,
      createLoading,
      createSuccess,
    } = this.props;

    return (
      <FormControl component='fieldset' fullWidth>
        <FormLabel component='legend'>Create New Dress</FormLabel>
        <FormGroup>
          <TextField
            id='outlined-name'
            label='Product Name'
            onChange={ this.handleName }
            margin='normal'
            variant='outlined'
          />
          <TextField
            id='outlined-number'
            label='Price'
            onChange={ this.handlePrice }
            type='number'
            margin='normal'
            variant='outlined'
          />
          <FormLabel component='legend'>Type</FormLabel>
          <RadioGroup
            aria-label='Type'
            name='productType'
            value={ this.state.type }
            onChange={ this.handleType }
          >
            <FormControlLabel value='mini' control={ <Radio /> } label='Mini' />
            <FormControlLabel value='midi' control={ <Radio /> } label='Midi' />
            <FormControlLabel value='maxi' control={ <Radio /> } label='Maxi' />
          </RadioGroup>
          <FormLabel component='legend'>Return</FormLabel>
          <FormControlLabel
            control={
              <Checkbox
                checked={ this.state.retrn }
                onChange={ this.handleReturn }
              />
          }
          />
          <FormLabel component='legend'>Trying Before Purchase</FormLabel>
          <FormControlLabel
            control={
              <Checkbox
                checked={ this.state.trying }
                onChange={ this.handleTry }
              />
          }
          />
          <TextField
            id='outlined-ingredient'
            label='Main Ingredient'
            onChange={ this.handleIngredient }
            margin='normal'
            variant='outlined'
          />
        </FormGroup>
        {
          !createLoading && !createSuccess && !createError ?
            <Button variant='contained' color='primary' onClick={ this.create }>
            CREATE DRESS
            </Button> : null
        }
        { createLoading ? <CircularProgress className='loading-circle' color='secondary' /> : null }
        { createSuccess ? <Button disabled> SUCCESS </Button> : null }
        { createError ? <Button disabled> FAILED </Button> : null }
      </FormControl>
    );
  }
}
