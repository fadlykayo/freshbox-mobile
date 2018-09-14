import React, { PureComponent } from 'react';
import { Text, View, FlatList, TouchableHighlight } from 'react-native';
import { actNav, navConstant } from '@navigations';
import { validation } from '@helpers';
import Checkout from './components/Checkout';
import CartComponent from './components/CartComponent';
import Container from '@components/Container';
import NavigationBar from '@components/NavigationBar';
import styles from './styles';
import images from '@assets';


class Cart extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { 
      data: [{
        id: 1,
        image: images.icon_forgot_password,
        title: "Wortel",
        category: "Sayur Segar",
        price: 21000,
        favorite: false,
        counter: 1,
        stock: 5
      },
      {
        id: 2,
        image: images.icon_forgot_password_success,
        title: "Apel",
        category: "Buah",
        price: 21000,
        favorite: false,
        counter: 1,
        stock: 5
      },
      {
        id: 3,
        image: images.icon_forgot_password,
        title: "Belimbing",
        category: "Buah",
        price: 21000,
        favorite: false,
        counter: 1,
        stock: 5
      }
      ,{
        id: 4,
        image: images.icon_forgot_password,
        title: "Mangga",
        category: "Buah",
        price: 21000,
        favorite: false,
        counter: 1,
        stock: 5
      },
      {
        id: 5,
        image: images.icon_forgot_password,
        title: "Sawi",
        category: "Sayur Segar",
        price: 21000,
        favorite: false,
        counter: 1,
        stock: 5
      },
      {
        id: 6,
        image: images.icon_forgot_password,
        title: "Belimbing",
        category: "Buah",
        price: 21000,
        favorite: false,
        counter: 1,
        stock: 5
      }
      ,{
        id: 7,
        image: images.icon_forgot_password,
        title: "mangga",
        category: "buah",
        price: 21000,
        favorite: false,
        counter: 1,
        stock: 5
      },
      {
        id: 8,
        image: images.icon_forgot_password,
        title: "sawi",
        category: "sayur segar",
        price: 21000,
        favorite: false,
        counter: 1,
        stock: 5
      }
    ],
    totalPrice: 0,
    }
    this.onChangeText = this.onChangeText.bind(this);
    this.countTotalPrice = this.countTotalPrice.bind(this);
    this.changeTotalItem = this.changeTotalItem.bind(this);
  }

  onChangeText(index,value){
    let data = this.state.data;
    data[index].favorite = value;
    this.setState({data});
  }

  countTotalPrice () {
    let data = this.state.data;
    let total = 0;
    for(let i = 0; i < data.length; i++) {
      total += data[i].price;
    }
    this.setState({totalPrice: total})
  }

  changeTotalItem (index, type) {
    let data = this.state.data;
    if (type === "inc") {
      data[index].counter += 1;
      this.setState({data});
    }
    else {
      data[index].counter -= 1;
      this.setState({data});
    }
  }

  componentDidMount() {
    this.countTotalPrice();
  }

  render() {
    return (
      <Container>
        <NavigationBar 
          title={'cart.navigationTitle'}
          onPress={actNav.goBack}
        />
        <View
          style={styles.container}
        >
          <View
            style={styles.cartContainer}
          >
            <FlatList
              data={this.state.data}
              renderItem={({item, index}) => (
                <CartComponent 
                  data = {item}
                  index = {index} 
                  onChangeText = {(index,value) => this.onChangeText(index,value)}
                  changeTotalItem = {(index, type) =>  this.changeTotalItem(index, type)}
                />
                
              )}
              keyExtractor={(item) => String(item.id)}
            />
          </View>

          <Checkout
            totalPrice={this.state.totalPrice}
          />
             
        </View>
      </Container>
    );
  }
}

export default Cart;