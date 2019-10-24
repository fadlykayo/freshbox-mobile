import React, { Component } from 'react';
import { View, FlatList, TouchableOpacity, Image, Text, TextInput } from 'react-native';
import { actNav, navConstant } from '@navigations';
import { language, validation } from '@helpers';
import { connect } from 'react-redux';
import styles from './styles';
import images from '@assets';
import actions from '@actions';


class SearchComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			placeholder: '',
    	}
    	this.onChangeText = this.onChangeText.bind(this);
		this.onSubmitEditing = this.onSubmitEditing.bind(this);
		this.renderPlaceholder = this.renderPlaceholder.bind(this);
		this.openDrawerMenu = this.openDrawerMenu.bind(this);
		this.clearSearch = this.clearSearch.bind(this);
	}

	openDrawerMenu() {
		if(this.props.dashboard) {
			this.props.openDrawerMenu()
		} else {
			
			this.handleBackButton();
		}
		
	}

	handleBackButton = () => {
		
		let payload = {
			header: {
				apiToken: this.props.user ? this.props.user.authorization : ''
			},
			params: {
				page: 1,
				sort: "nama-az"
			}
		}

		// console.warn(this.props.params)
		this.props.get_products(payload,
			() => {
				actNav.reset(navConstant.Dashboard);
			},
			(err) => {
				console.log(err);
			}
		);
	}

  	onChangeText(value){
		this.props.onChangeText(this.props.type,value);
  	}

  	onSubmitEditing(){
  		if(this.props.onSubmitEditing) this.props.onSubmitEditing();
  	}  

	clearSearch() {
		this.props.clearSearch()
	}

	componentDidMount() {
		this.renderPlaceholder(this.props.title,this.props.language,this.props.params);
	}

	renderPlaceholder(property = 'no_props',lang = 'id',params = {}){
		language.transformText(property,lang,params)
		.then((res) => {
				this.setState({placeholder: res});
		});
	}

	render(){
		return (
      		<View style={styles.container}>
			  	<TouchableOpacity 
					onPress={this.openDrawerMenu}
					style={styles.button}
				>
  	  	  			<Image
  	  	  			  resizeMode={'contain'} 
  	  	  			  source={this.props.dashboard ? images.icon_menu : images.icon_back_white}
  	  	  			  style={styles.icon.menu}
  	  	  			/>
  	  			</TouchableOpacity>
  	  			<View style={styles.subcontainer.search}>
					<View>
	  	    			<Image
  	  	    				resizeMode={'contain'} 
  	  	    				source={images.icon_search}
  	  	    				style={styles.icon.search}
  	  					/>
					</View>
					<TextInput
						autoCorrect={false}
						autoCapitalize={'none'}
						returnKeyType={'done'}
						value={this.props.value} 
								onChangeText={this.onChangeText}
								placeholder={this.state.placeholder}
		    		  	onSubmitEditing={this.onSubmitEditing}
		    		  	style={styles.textinput}
		    		/>
					{this.props.value.length > 0
						? (<TouchableOpacity style={styles.clear.place} onPress={this.clearSearch}>
								<Image
  	  	    						resizeMode={'contain'} 
  	  	    						source={images.icon_clear_search}
  	  	    						style={styles.icon.clear}
  	  							/>
							</TouchableOpacity>) 
						: null
					}
  	    		</View>
      		</View>
		);
	}
}

const mapStateToProps = state => ({
	notif: state.notif.notification,
	user: state.user.data,
	state: state.product,
	cart_product: state.product.cart.products,
	current_page: state.product.params.page,
	params: state.product.params,
	product: state.product.products,
	on_category: state.product.on_category,
	categories: state.product.categories,
	last_page: state.product.last_page,
	total_price: state.product.total.price,
	total_count: state.product.total.count,
	productDetail: state.product.detail,
	broadcast_message: state.utility.broadcast_message,
	promoProduct: state.product.promoProduct,
	network: state.network
})

const mapDispatchToProps = dispatch => ({
	reset_params: () => dispatch(actions.product.reducer.reset_params()),
	clear_products: () => dispatch(actions.product.reducer.clear_products()),
	clear_product_lists: () => dispatch(actions.product.reducer.clear_product_lists()),
	add_favorite: (req,res,err) => dispatch(actions.product.api.add_favorite(req,res,err)),
	get_products : (req,res,err) => dispatch(actions.product.api.get_products(req,res,err)),
	detail_product : (payload) => dispatch(actions.product.reducer.detail_product(payload)),
	toggle_favorite: (payload) => dispatch(actions.product.reducer.toggle_favorite(payload)),
	get_favorites: (req,res,err) => dispatch(actions.product.api.get_favorites(req,res,err)),
	set_error_status: (payload) => dispatch(actions.network.reducer.set_error_status(payload)),
	get_categories: (req,res,err) => dispatch(actions.product.api.get_categories(req,res,err)),
	search_products: (req,res,err) => dispatch(actions.product.api.search_products(req,res,err)),
	change_categories: (payload) => dispatch(actions.product.reducer.change_categories(payload)),
	delete_favorite: (req,res,err) => dispatch(actions.product.api.delete_favorite(req,res,err)),
	change_total : (payload,type) => dispatch(actions.product.reducer.change_total(payload,type)),
	detail_transaction: (req,res,err) => dispatch(actions.transaction.api.detail_transaction(req,res,err)),
	get_broadcast_message: (req,res,err) => dispatch(actions.utility.api.broadcast_message(req,res,err)),
})

export default connect(mapStateToProps,mapDispatchToProps)(SearchComponent);