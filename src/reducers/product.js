/* eslint-disable no-undef */
import ct from '@constants';
import images from '@assets';
import action from '../actions/product/reducer';
import {hasObjectValue} from '@helpers';

const initialState = {
  last_page: 0,
  params: {
    page: 1,
    sort: 'nama-az',
    // stock: 'tersedia'
  },
  paramsPromo: {
    page: 1,
    sort: 'nama-az',
    on_promo: 1,
    last_page: 1,
  },
  promoProduct: [],
  existingCart: [],
  savedCarts: [],
  products: [],
  categories: [],
  on_category: '',
  minimumTrxFreeShippingCost: 0,
  detail: {},
  total: {
    price: 0,
    count: 0,
  },
  additional: {
    credit_card: 5000,
    VA: 5000,
  },
  discount: 0,
  coupon_code: '',
  cart: {
    products: [],
  },
  delivery_price: 0,
  wishlist: {
    products: [],
  },
  currentDetail: [
    {
      product: [],
    },
  ],
  setModalVisible: false,
  productMaxClaim: [],
};

const getProductDashboard = (state, payload) => {
  let newState = JSON.parse(JSON.stringify(state));
  let incomingProducts = payload.data.data;
  let existingProducts = newState.products.slice();

  newState.params.page = payload.data.current_page + 1;
  newState.last_page = payload.data.last_page;

  if (payload.data.current_page == 1) {
    existingProducts = incomingProducts;
  } else {
    for (x in incomingProducts) {
      let sameValue = false;
      for (y in existingProducts) {
        if (incomingProducts[x].code == existingProducts[y].code) {
          existingProducts[y] = Object.assign(
            {},
            existingProducts[y],
            incomingProducts[x],
          );
          sameValue = true;
          break;
        }
      }
      if (sameValue == false) {
        existingProducts.push(incomingProducts[x]);
      }
    }
  }

  let cartList = newState.cart.products;

  // newState.products = existingProducts.map(e => {
  //     let favoriteItem = favoriteList.filter(p => e.code == p.code);
  //     if(favoriteItem.length > 0){
  //         return favoriteItem[0];
  //     }
  //     else{
  //         if(!e.count) e.count = 0;
  //         if(!e.maxQty) e.maxQty = 1000;
  //         return e;
  //     }
  // }).filter(e => e.stock > 0);

  newState.products = existingProducts.map((e) => {
    let cartItem = cartList.filter((p) => e.code == p.code);
    if (cartItem.length > 0) {
      return cartItem[0];
    } else {
      if (!e.count) {
        e.count = 0;
      }
      if (!e.maxQty) {
        e.maxQty = 1000;
      }
      if (e.total_claim_product !== undefined) {
        e.isClaim = parseInt(e.total_claim_product) >= e.quota_claim;
      }
      return e;
    }
  });

  return newState;
};

const getProducts = (state, payload) => {
  let newState = JSON.parse(JSON.stringify(state));
  let incomingProducts = payload.data.data;
  let existingProducts = newState.products.slice();

  newState.params.page = payload.data.current_page + 1;
  newState.last_page = payload.data.last_page;

  for (x in incomingProducts) {
    let sameValue = false;
    for (y in existingProducts) {
      if (incomingProducts[x].code == existingProducts[y].code) {
        existingProducts[y] = Object.assign(
          {},
          incomingProducts[x],
          // existingProducts[y],
        );
        sameValue = true;
        break;
      }
    }
    if (sameValue == false) {
      existingProducts.push(incomingProducts[x]);
    }
  }

  let cartList = newState.cart.products;

  // newState.products = existingProducts.map(e => {
  //     let favoriteItem = favoriteList.filter(p => e.code == p.code);
  //     if(favoriteItem.length > 0){
  //         return favoriteItem[0];
  //     }
  //     else{
  //         if(!e.count) e.count = 0;
  //         if(!e.maxQty) e.maxQty = 1000;
  //         return e;
  //     }
  // }).filter(e => e.stock > 0);

  newState.products = existingProducts.map((e) => {
    let cartItem = cartList.findIndex((p) => e.code == p.code);
    if (cartItem !== -1) {
      if (!e.count) {
        e.count = cartList[cartItem].count;
      }

      if (!e.maxQty) {
        e.maxQty = 1000;
      }

      cartList[cartItem] = e;

      return e;
    } else {
      if (!e.count) {
        e.count = 0;
      }
      if (!e.maxQty) {
        e.maxQty = 1000;
      }
      return e;
    }
  });

  return newState;
};

const getFavorites = (state, payload) => {
  let newState = JSON.parse(JSON.stringify(state));
  // let incomingProducts = payload.data.data;
  // let existingProducts = newState.wishlist.products.slice();
  // let productList = newState.products.slice();

  // for (x in incomingProducts) {
  //   let sameValue = false;
  //   for (y in existingProducts) {
  //     if (incomingProducts[x].code == existingProducts[y].code) {
  //       existingProducts[y] = Object.assign(
  //         {},
  //         existingProducts[y],
  //         incomingProducts[x],
  //       );
  //       sameValue = true;
  //       break;
  //     }
  //   }
  //   if (sameValue == false) {
  //     existingProducts.push(incomingProducts[x]);
  //   }
  // }

  // newState.wishlist.products = existingProducts
  //   .sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0))
  //   .map((e) => {
  //     let productItem = productList.filter((p) => e.code == p.code);
  //     if (productItem.length > 0) {
  //       return productItem[0];
  //     } else {
  //       if (!e.count) {
  //         e.count = 0;
  //       }
  //       if (!e.maxQty) {
  //         e.maxQty = 1000;
  //       }
  //       if (e.total_claim_product !== undefined) {
  //         e.isClaim = parseInt(e.total_claim_product) >= e.quota_claim;
  //       }
  //       return e;
  //     }
  //   })
  //   .filter((e) => e.stock > 0);
  let cartList = newState.cart.products;
  newState.wishlist.products = payload.data.data;

  newState.wishlist.products = payload.data.data.map((e) => {
    let cartItem = cartList.findIndex((p) => e.code == p.code);
    if (cartItem !== -1) {
      if (!e.count) {
        e.count = cartList[cartItem].count;
      }

      if (!e.maxQty) {
        e.maxQty = 1000;
      }

      cartList[cartItem] = e;

      return e;
    } else {
      if (!e.count) {
        e.count = 0;
      }
      if (!e.maxQty) {
        e.maxQty = 1000;
      }
      return e;
    }
  });

  return newState;
};

const getCategories = (state, payload) => {
  let newState = JSON.parse(JSON.stringify(state));

  let defaultData = {
    code: 'CAT-0',
    parent_id: 0,
    parent_count: 0,
    name: 'Default',
    slug: 'default',
    check: true,
    images_sizes_url: {
      original: [images.icon_all_categories, images.icon_all_categories],
    },
  };

  let compare = (a, b) => {
    const bandA = a.name.toUpperCase();
    const bandB = b.name.toUpperCase();

    let comparison = 0;
    if (bandA > bandB) {
      comparison = 1;
    } else if (bandA < bandB) {
      comparison = -1;
    }
    return comparison;
  };

  // let categoriesSorted = payload.data.sort(compare);
  let categoriesSorted = payload.data;

  for (let i = 0; i < categoriesSorted.length; i++) {
    categoriesSorted[i].check = false;
  }
  categoriesSorted.unshift(defaultData);

  for (let i = 0; i < categoriesSorted.length; i++) {
    if (categoriesSorted[i].check == true) {
      newState.on_category = categoriesSorted[i].name;
    }
  }

  newState.categories = categoriesSorted;

  let count = 1;
  let page = 1;
  let temp = [];
  let categoryRow = [];

  for (let index = 0; index < categoriesSorted.length; index++) {
    temp.push(categoriesSorted[index]);

    if (count % 8 == 0 || count == categoriesSorted.length) {
      page++;
      categoryRow.push(temp);
      temp = [];
    }
    count++;
  }

  newState.categories_pages = categoryRow;

  return newState;
};

const changeCategory = (state, payload) => {
  let newState = JSON.parse(JSON.stringify(state));
  newState.categories.map((item) => {
    if (item.name == payload?.data?.name) {
      item.check = true;
      newState.on_category = item.name;
    } else {
      item.check = false;
    }
    return item;
  });

  return newState;
};

const getDetail = (state, payload) => {
  let newState = JSON.parse(JSON.stringify(state));

  if (payload.data.product) {
    payload.data = {...payload.data, ...payload.data.product};
  }

  newState.detail = payload.data;
  return newState;
};

const searchData = (state, payload) => {
  let newState = JSON.parse(JSON.stringify(state));
  let params = payload.params;
  params.page = params.page + 1;
  newState.params = params;
  newState.last_page = payload.data.last_page;

  newState.products = [];
  let incomingProducts = payload.data.data;
  let existingProducts = newState.cart.products.slice();
  let favoriteList = newState.wishlist.products.slice();

  for (x in incomingProducts) {
    for (y in existingProducts) {
      if (incomingProducts[x].code == existingProducts[y].code) {
        incomingProducts[x] = Object.assign(
          {},
          incomingProducts[x],
          existingProducts[y],
        );
        break;
      }
    }
  }

  newState.products = incomingProducts.map((e) => {
    let favoriteItem = favoriteList.filter((p) => e.code == p.code);
    if (favoriteItem.length > 0) {
      return favoriteItem[0];
    } else {
      if (!e.count) {
        e.count = 0;
      }
      if (!e.maxQty) {
        e.maxQty = 1000;
      }
      if (e.total_claim_product !== undefined) {
        e.isClaim = parseInt(e.total_claim_product) >= e.quota_claim;
      }
      return e;
    }
  });

  return newState;
};

const getPromo = (state, payload) => {
  let newState = JSON.parse(JSON.stringify(state));

  let params = payload.params;

  if (params.page < payload.data.last_page) {
    params.page = params.page + 1;
  }

  // newState.paramsPromo.page = payload.data.current_page + 1;
  newState.paramsPromo.last_page = payload.data.last_page;

  // newState.paramsPromo = params;
  // newState.paramsPromo.last_page = payload.data.last_page;

  let promoProduct = [];
  let incomingProducts = payload.data.data;
  let currentCart = newState.cart.products.slice();
  let favoriteList = newState.wishlist.products.slice();

  for (x in incomingProducts) {
    for (y in currentCart) {
      if (incomingProducts[x].code == currentCart[y].code) {
        incomingProducts[x] = Object.assign(
          {},
          currentCart[y],
          incomingProducts[x],
        );

        currentCart[y] = Object.assign({}, incomingProducts[x]);
        break;
      }
    }
  }

  promoProduct = incomingProducts.map((e) => {
    let favoriteItem = favoriteList.filter((p) => e.code == p.code);
    if (favoriteItem.length > 0) {
      return favoriteItem[0];
    } else {
      if (!e.count) {
        e.count = 0;
      }
      if (!e.maxQty) {
        e.maxQty = 1000;
      }
      if (e.total_claim_product !== undefined) {
        e.isClaim = parseInt(e.total_claim_product) >= e.quota_claim;
      }
      return e;
    }
  });

  let filteredProduct = promoProduct.filter(
    (x) =>
      Number(x.quota_claim) === 0 ||
      (Number(x.quota_claim) - Number(x.total_claim_product || 0) > 0 && x),
  );
  newState.promoProduct = filteredProduct;

  let count = 0;
  let total = 0;

  for (i in currentCart) {
    let promoQty = 0;
    let normalQty = 0;
    let promoPrice = currentCart[i].promo_price;

    if (
      currentCart[i].banner_harga_jual &&
      currentCart[i].banner_harga_jual !== null
    ) {
      promoPrice = currentCart[i].banner_harga_jual;
    }

    if (
      (currentCart[i].total_claim_product === undefined ||
        currentCart[i].total_claim_product === null) &&
      Number(currentCart[i].on_promo) === 1
    ) {
      // if product is special deals and not logged in yet
      if (Number(currentCart[i].quota_claim) === 0) {
        promoQty = currentCart[i].count;
      } else if (
        Number(currentCart[i].quota_claim) >= 0 &&
        currentCart[i].count <= Number(currentCart[i].quota_claim)
      ) {
        promoQty = currentCart[i].count;
      } else {
        normalQty = currentCart[i].count - Number(currentCart[i].quota_claim);
        promoQty = currentCart[i].count - normalQty;
      }

      total = total + promoQty * promoPrice + normalQty * currentCart[i].price;
    } else if (
      currentCart[i].quota_claim &&
      Number(currentCart[i].on_promo) === 1
    ) {
      // if product is special deals and have claim limit
      if (
        currentCart[i].count <=
        Number(currentCart[i].quota_claim) -
          Number(currentCart[i].total_claim_product)
      ) {
        promoQty = currentCart[i].count;
      } else {
        promoQty =
          Number(currentCart[i].quota_claim) -
          Number(currentCart[i].total_claim_product);
      }

      if (
        currentCart[i].count >
        Number(currentCart[i].quota_claim) -
          Number(currentCart[i].total_claim_product)
      ) {
        normalQty =
          currentCart[i].count -
          (Number(currentCart[i].quota_claim) -
            Number(currentCart[i].total_claim_product));
      }
      total = total + promoQty * promoPrice + normalQty * currentCart[i].price;
    } else if (
      !currentCart[i].total_claim_product &&
      Number(currentCart[i].on_promo) === 1
    ) {
      // if product is special deals and have no claim limit, promoQty * promo_price
      promoQty = currentCart[i].count;
      total = total + promoQty * promoPrice;
    } else {
      // Normal qty
      normalQty = currentCart[i].count;
      total = total + normalQty * currentCart[i].price;
    }

    count = count + currentCart[i].count;
    currentCart[i].maxQty = payload.data.maxQty;
  }

  newState.total.count = count;
  newState.total.price = total;
  newState.cart.products = currentCart;

  return newState;
};

const getCart = (state, payload) => {
  let newState = JSON.parse(JSON.stringify(state));

  let existingCart = [];

  let incomingProducts = payload.data;
  let currentCart = newState.cart.products.slice();
  let favoriteList = newState.wishlist.products.slice();

  let new_products = newState.currentDetail.new_products;
  if (
    newState.currentDetail.new_products &&
    Object.values(newState.currentDetail.new_products).length > 0
  ) {
    let temp;
    for (const items in new_products) {
      temp = new_products[items];
      for (let obj in temp) {
        if (obj !== 'info') {
          let currentCart = payload.data.filter(
            (f) => temp[obj].product.code === f.code,
          );
          if (currentCart.length > 0) {
            for (x in currentCart) {
              temp[obj].product.count = currentCart[x].qty;
            }
          }
        }
      }
    }
  }

  if (
    newState.currentDetail.products &&
    newState.currentDetail.products.length > 0
  ) {
    newState.currentDetail.products.map((e, i) => {
      let currentCart = payload.data.filter((f) => e.product.code === f.code);
      if (currentCart.length > 0) {
        for (x in currentCart) {
          e.product.count = currentCart[x].qty;
        }
      }
    });
  }

  for (x in incomingProducts) {
    for (y in currentCart) {
      if (incomingProducts[x].code == currentCart[y].code) {
        incomingProducts[x] = Object.assign(
          {},
          currentCart[y],
          incomingProducts[x],
        );

        currentCart[y] = Object.assign({}, incomingProducts[x]);
        break;
      }
    }
  }

  existingCart = incomingProducts.map((e) => {
    let favoriteItem = favoriteList.filter((p) => e.code == p.code);
    if (favoriteItem.length > 0) {
      return favoriteItem[0];
    } else {
      if (!e.count) {
        e.count = e.qty && e.qty ? e.qty : 0;
      }
      if (!e.maxQty) {
        e.maxQty = 1000;
      }
      if (e.total_claim_product !== undefined) {
        e.isClaim = parseInt(e.total_claim_product) >= e.quota_claim_original;
      }
      if (!e.quota_claim_original) {
        // e.quota_claim_original = 12
      }
      return e;
    }
  });

  let filteredProduct = existingCart.filter(
    (x) =>
      Number(x.quota_claim_original) === 0 ||
      (Number(x.quota_claim_original) - Number(x.total_claim_product || 0) >
        0 &&
        x),
  );
  newState.existingCart = filteredProduct;

  let count = 0;
  let total = 0;

  // for(i in currentCart){
  //   let promoQty = 0;
  //   let normalQty = 0;
  //   let promoPrice = currentCart[i].promo_price;

  //   if (
  //     currentCart[i].banner_harga_jual &&
  //     currentCart[i].banner_harga_jual !== null
  //   ) {
  //     promoPrice = currentCart[i].banner_harga_jual;
  //   }

  //   if ((currentCart[i].total_claim_product === undefined || currentCart[i].total_claim_product === null) && Number(currentCart[i].on_promo) === 1) { // if product is special deals and not logged in yet
  //     if (Number(currentCart[i].quota_claim_original) === 0 ) {
  //       promoQty = currentCart[i].count;
  //     } else if (Number(currentCart[i].quota_claim_original) >= 0 && currentCart[i].count <= Number(currentCart[i].quota_claim_original)) {
  //       promoQty = currentCart[i].count;
  //     } else {
  //       normalQty = currentCart[i].count - Number(currentCart[i].quota_claim_original);
  //       promoQty = currentCart[i].count - normalQty;
  //     }

  //     total = total + (promoQty * promoPrice) + (normalQty * currentCart[i].price);
  //   } else if (currentCart[i].quota_claim_original && Number(currentCart[i].on_promo) === 1) { // if product is special deals and have claim limit
  //     if (currentCart[i].count <= Number(currentCart[i].quota_claim_original) - Number(currentCart[i].total_claim_product)) {
  //       promoQty = currentCart[i].count;
  //     } else {
  //       promoQty = Number(currentCart[i].quota_claim_original) - Number(currentCart[i].total_claim_product);
  //     }

  //     if (currentCart[i].count > Number(currentCart[i].quota_claim_original) - Number(currentCart[i].total_claim_product)) {
  //       normalQty = currentCart[i].count - (Number(currentCart[i].quota_claim_original) - Number(currentCart[i].total_claim_product));
  //     }
  //     total = total + (promoQty * promoPrice) + (normalQty * currentCart[i].price);
  //   } else if (!currentCart[i].total_claim_product && Number(currentCart[i].on_promo) === 1) { // if product is special deals and have no claim limit, promoQty * promo_price
  //     promoQty = currentCart[i].count;
  //     total = total + promoQty * promoPrice;
  //   }  else { // Normal qty
  //     normalQty = currentCart[i].count;
  //     total = total + normalQty * currentCart[i].price;
  //   }
  //   count = count + currentCart[i].count;
  //   currentCart[i].maxQty = payload.data.maxQty;
  // }
  for (i in existingCart) {
    let promoQty = 0;
    let normalQty = 0;
    let promoPrice = existingCart[i].promo_price;

    if (
      existingCart[i].banner_harga_jual &&
      existingCart[i].banner_harga_jual !== null
    ) {
      promoPrice = existingCart[i].banner_harga_jual;
    }

    if (
      (existingCart[i].total_claim_product === undefined ||
        existingCart[i].total_claim_product === null) &&
      Number(existingCart[i].on_promo) === 1
    ) {
      // if product is special deals and not logged in yet
      if (Number(existingCart[i].quota_claim_original) === 0) {
        promoQty = existingCart[i].count;
      } else if (
        Number(existingCart[i].quota_claim_original) >= 0 &&
        existingCart[i].count <= Number(existingCart[i].quota_claim_original)
      ) {
        promoQty = existingCart[i].count;
      } else {
        normalQty =
          existingCart[i].count - Number(existingCart[i].quota_claim_original);
        promoQty = existingCart[i].count - normalQty;
      }

      total = total + promoQty * promoPrice + normalQty * existingCart[i].price;
    } else if (
      existingCart[i].quota_claim_original &&
      Number(existingCart[i].on_promo) === 1
    ) {
      // if product is special deals and have claim limit
      if (
        existingCart[i].count <=
        Number(existingCart[i].quota_claim_original) -
          Number(existingCart[i].total_claim_product)
      ) {
        promoQty = existingCart[i].count;
      } else {
        promoQty =
          Number(existingCart[i].quota_claim_original) -
          Number(existingCart[i].total_claim_product);
      }

      if (
        existingCart[i].count >
        Number(existingCart[i].quota_claim_original) -
          Number(existingCart[i].total_claim_product)
      ) {
        normalQty =
          existingCart[i].count -
          (Number(existingCart[i].quota_claim_original) -
            Number(existingCart[i].total_claim_product));
      }
      total = total + promoQty * promoPrice + normalQty * existingCart[i].price;
    } else if (
      !existingCart[i].total_claim_product &&
      Number(existingCart[i].on_promo) === 1
    ) {
      // if product is special deals and have no claim limit, promoQty * promo_price
      promoQty = existingCart[i].count;
      total = total + promoQty * promoPrice;
    } else {
      // Normal qty
      normalQty = existingCart[i].count;
      total = total + normalQty * existingCart[i].price;
    }
    count = count + existingCart[i].count;
    existingCart[i].maxQty = payload.data.maxQty;
  }

  newState.total.count = count;
  newState.total.price = total;
  newState.cart.products = existingCart;

  return newState;
};

const getSavedCarts = (state, payload) => {
  let newState = JSON.parse(JSON.stringify(state));

  let savedCarts = [];

  let incomingProducts = payload.data;
  let currentCart = newState.cart.products.slice();
  let favoriteList = newState.wishlist.products.slice();

  for (x in incomingProducts) {
    for (y in currentCart) {
      if (incomingProducts[x].code == currentCart[y].code) {
        incomingProducts[x] = Object.assign(
          {},
          currentCart[y],
          incomingProducts[x],
        );

        currentCart[y] = Object.assign({}, incomingProducts[x]);
        break;
      }
    }
  }

  savedCarts = incomingProducts.map((e) => {
    let favoriteItem = favoriteList.filter((p) => e.code == p.code);
    if (favoriteItem.length > 0) {
      return favoriteItem[0];
    } else {
      if (!e.count) {
        e.count = 0;
      }
      if (!e.maxQty) {
        e.maxQty = 1000;
      }
      if (e.total_claim_product !== undefined) {
        e.isClaim = parseInt(e.total_claim_product) >= e.quota_claim;
      }
      return e;
    }
  });

  let filteredProduct = savedCarts.filter(
    (x) =>
      Number(x.quota_claim) === 0 ||
      (Number(x.quota_claim) - Number(x.total_claim_product || 0) > 0 && x),
  );
  newState.savedCarts = filteredProduct;

  let count = 0;
  let total = 0;

  for (i in savedCarts) {
    let promoQty = 0;
    let normalQty = 0;
    let promoPrice = savedCarts[i].promo_price;

    if (
      savedCarts[i].banner_harga_jual &&
      savedCarts[i].banner_harga_jual !== null
    ) {
      promoPrice = savedCarts[i].banner_harga_jual;
    }

    if (
      (savedCarts[i].total_claim_product === undefined ||
        savedCarts[i].total_claim_product === null) &&
      Number(savedCarts[i].on_promo) === 1
    ) {
      // if product is special deals and not logged in yet
      if (Number(savedCarts[i].quota_claim) === 0) {
        promoQty = savedCarts[i].count;
      } else if (
        Number(savedCarts[i].quota_claim) >= 0 &&
        savedCarts[i].count <= Number(savedCarts[i].quota_claim)
      ) {
        promoQty = savedCarts[i].count;
      } else {
        normalQty = savedCarts[i].count - Number(savedCarts[i].quota_claim);
        promoQty = savedCarts[i].count - normalQty;
      }

      total = total + promoQty * promoPrice + normalQty * savedCarts[i].price;
    } else if (
      savedCarts[i].quota_claim &&
      Number(savedCarts[i].on_promo) === 1
    ) {
      // if product is special deals and have claim limit
      if (
        savedCarts[i].count <=
        Number(savedCarts[i].quota_claim) -
          Number(savedCarts[i].total_claim_product)
      ) {
        promoQty = savedCarts[i].count;
      } else {
        promoQty =
          Number(savedCarts[i].quota_claim) -
          Number(savedCarts[i].total_claim_product);
      }

      if (
        savedCarts[i].count >
        Number(savedCarts[i].quota_claim) -
          Number(savedCarts[i].total_claim_product)
      ) {
        normalQty =
          savedCarts[i].count -
          (Number(savedCarts[i].quota_claim) -
            Number(savedCarts[i].total_claim_product));
      }
      total = total + promoQty * promoPrice + normalQty * savedCarts[i].price;
    } else if (
      !savedCarts[i].total_claim_product &&
      Number(savedCarts[i].on_promo) === 1
    ) {
      // if product is special deals and have no claim limit, promoQty * promo_price
      promoQty = savedCarts[i].count;
      total = total + promoQty * promoPrice;
    } else {
      // Normal qty
      normalQty = savedCarts[i].count;
      total = total + normalQty * savedCarts[i].price;
    }
    count = count + savedCarts[i].count;
    savedCarts[i].maxQty = payload.data.maxQty;
  }

  newState.total.count = count;
  newState.total.price = total;
  newState.cart.products = savedCarts;

  return newState;
};

const editTotal = (state, payload) => {
  let newState = JSON.parse(JSON.stringify(state));
  // const detailCode = hasObjectValue(newState.detail, 'code') && newState.detail.code
  newState.detail = payload.data;
  let total = 0;
  let count = 0;
  const indexProducts = newState.products.findIndex(
    (e) => e.code === payload.data.code,
  );
  const indexFavorite = newState.wishlist.products.findIndex(
    (e) => e.code === payload.data.code,
  );
  const indexCart = newState.cart.products.findIndex(
    (e) => e.code === payload.data.code,
  );
  const indexPromo = newState.promoProduct.findIndex(
    (e) => e.code === payload.data.code,
  );
  const indexDetail =
    indexProducts == -1 && indexFavorite == -1 && indexPromo == -1;
  // const indexDetail = indexProducts == -1 && indexFavorite == -1 && indexPromo == -1 && detailCode === payload.data.code;

  let new_products = newState.currentDetail.new_products;
  if (
    newState.currentDetail.new_products &&
    Object.values(newState.currentDetail.new_products).length > 0
  ) {
    let temp;
    for (const items in new_products) {
      temp = new_products[items];
      for (let obj in temp) {
        if (obj !== 'info') {
          if (temp[obj].product.code === payload.data.code) {
            if (payload.type === 'inc') {
              temp[obj].product.count += 1;
            } else {
              temp[obj].product.count -= 1;
            }
          }
        }
      }
    }
  }

  if (
    newState.currentDetail.products &&
    newState.currentDetail.products.length > 0
  ) {
    const productIndex = newState.currentDetail.products.findIndex(
      (e) => e.product.code === payload.data.code,
    );
    newState.currentDetail.products.map((e, i) => {
      if (e.product.code === payload.data.code) {
        if (payload.type == 'inc') {
          e.product.count += 1;
        } else {
          e.product.count -= 1;
        }
      }
    });
  }

  if (payload.type == 'inc') {
    if (indexProducts != -1) {
      newState.products[indexProducts].count += 1;
    }
    if (indexFavorite != -1) {
      newState.wishlist.products[indexFavorite].count += 1;
    }
    if (indexCart != -1) {
      newState.cart.products[indexCart].count += 1;
    }
    if (indexPromo != -1) {
      newState.promoProduct[indexPromo].count += 1;
    }
    if (indexDetail) {
      newState.detail.count += 1;
    }
  } else {
    if (indexProducts != -1) {
      newState.products[indexProducts].count -= 1;
    }
    if (indexFavorite != -1) {
      newState.wishlist.products[indexFavorite].count -= 1;
    }
    if (indexCart != -1) {
      newState.cart.products[indexCart].count -= 1;
    }
    if (indexPromo != -1) {
      newState.promoProduct[indexPromo].count -= 1;
    }
    if (indexDetail) {
      newState.detail.count -= 1;
    }
  }

  newState.detail = indexDetail
    ? newState.detail
    : indexProducts != -1
    ? newState.products[indexProducts]
    : indexFavorite != -1
    ? newState.wishlist.products[indexFavorite]
    : newState.promoProduct[indexPromo];

  let productCart = newState.products.filter((e) => e.count > 0);
  let promoCart = newState.promoProduct.filter((e) => e.count > 0);
  let favoriteCart = newState.wishlist.products.filter((e) => e.count > 0);
  let currentCart = newState.cart.products.slice();
  let newCart =
    productCart.length > 0
      ? productCart
      : favoriteCart.length > 0
      ? favoriteCart
      : promoCart;

  if (productCart.length > 0) {
    if (favoriteCart.length > 0) {
      for (x in favoriteCart) {
        let indexFav = productCart.findIndex(
          (e) => e.code == favoriteCart[x].code,
        );
        if (indexFav == -1) {
          newCart.push(favoriteCart[x]);
        }
      }
    } else if (promoCart.length > 0) {
      for (x in promoCart) {
        let indexFav = productCart.findIndex(
          (e) => e.code == promoCart[x].code,
        );
        if (indexFav == -1) {
          newCart.push(promoCart[x]);
        }
      }
    }
  }

  if (indexDetail) {
    newCart.push(newState.detail);
  }

  for (x in newCart) {
    let inputItem = currentCart.findIndex((e) => e.code === newCart[x].code);
    if (inputItem == -1) {
      currentCart.push(newCart[x]);
    }
  }

  for (i in currentCart) {
    let promoQty = 0;
    let normalQty = 0;
    let promoPrice = currentCart[i].promo_price;

    if (
      currentCart[i].banner_harga_jual &&
      currentCart[i].banner_harga_jual !== null
    ) {
      promoPrice = currentCart[i].banner_harga_jual;
    }

    if (
      (currentCart[i].total_claim_product === undefined ||
        currentCart[i].total_claim_product === null) &&
      Number(currentCart[i].on_promo) === 1
    ) {
      // if product is special deals and not logged in yet
      if (Number(currentCart[i].quota_claim) === 0) {
        promoQty = currentCart[i].count;
      } else if (
        Number(currentCart[i].quota_claim) >= 0 &&
        currentCart[i].count <= Number(currentCart[i].quota_claim)
      ) {
        promoQty = currentCart[i].count;
      } else {
        normalQty = currentCart[i].count - Number(currentCart[i].quota_claim);
        promoQty = currentCart[i].count - normalQty;
      }

      total = total + promoQty * promoPrice + normalQty * currentCart[i].price;
    } else if (
      currentCart[i].quota_claim &&
      Number(currentCart[i].on_promo) === 1
    ) {
      // if product is special deals and have claim limit
      if (
        currentCart[i].count <=
        Number(currentCart[i].quota_claim) -
          Number(currentCart[i].total_claim_product)
      ) {
        promoQty = currentCart[i].count;
      } else {
        promoQty =
          Number(currentCart[i].quota_claim) -
          Number(currentCart[i].total_claim_product);
      }

      if (
        currentCart[i].count >
        Number(currentCart[i].quota_claim) -
          Number(currentCart[i].total_claim_product)
      ) {
        normalQty =
          currentCart[i].count -
          (Number(currentCart[i].quota_claim) -
            Number(currentCart[i].total_claim_product));
      }
      total = total + promoQty * promoPrice + normalQty * currentCart[i].price;
    } else if (
      Number(currentCart[i].total_claim_product) === 0 &&
      Number(currentCart[i].on_promo) === 1
    ) {
      // if product is special deals and have no claim limit, promoQty * promo_price
      promoQty = currentCart[i].count;
      total = total + promoQty * promoPrice;
    } else {
      // Normal qty
      normalQty = currentCart[i].count;
      total = total + normalQty * currentCart[i].price;
    }

    count = count + currentCart[i].count;
    currentCart[i].maxQty = payload.data.maxQty;
  }

  newState.total.count = count;
  newState.total.price = total;
  newState.cart.products = currentCart.filter((e) => e.count > 0);

  return newState;
};

const clearProductList = (state) => {
  let newState = JSON.parse(JSON.stringify(state));
  newState.products = [];
  return newState;
};

const clearProducts = (state) => {
  let newState = JSON.parse(JSON.stringify(state));

  newState.params = initialState.params;
  newState.products = [];
  newState.promoProduct.map((e) => {
    e.count = 0;
  });
  newState.wishlist.products = [];
  newState.cart.products = [];
  newState.total.count = 0;
  newState.total.price = 0;
  newState.productMaxClaim = [];

  return newState;
};

const editFavorite = (state, payload) => {
  let newState = JSON.parse(JSON.stringify(state));

  // const whislistIndex = newState.wishlist.products.findIndex(
  //   (e) => e.code === payload.data.product.code,
  // );
  // const productWhislistIndex = newState.products.findIndex(
  //   (e) => e.code === payload.data.product.code,
  // );
  // const promoProductWhislistIndex = newState.promoProduct.findIndex(
  //   (e) => e.code === payload.data.product.code,
  // );
  // const promoCartWhislistIndex = newState.cart.products.findIndex(
  //   (e) => e.code === payload.data.product.code,
  // );

  // if (whislistIndex === -1) {
  //   payload.data.product.wishlisted = 1;
  //   newState.products[productWhislistIndex] &&
  //     (newState.products[productWhislistIndex].wishlisted = 1);
  //   newState.promoProduct[productWhislistIndex] &&
  //     (newState.promoProduct[promoProductWhislistIndex].wishlisted = 1);
  //   newState.cart.products[productWhislistIndex] &&
  //     (newState.cart.products[promoCartWhislistIndex].wishlisted = 1);
  //   newState.detail && (newState.detail.wishlisted = 1);

  //   newState.wishlist.products.push(payload.data.product);
  // } else {
  //   payload.data.product.wishlisted = 0;
  //   newState.products[productWhislistIndex] &&
  //     (newState.products[productWhislistIndex].wishlisted = 0);
  //   newState.promoProduct[promoProductWhislistIndex] &&
  //     (newState.promoProduct[promoProductWhislistIndex].wishlisted = 0);
  //   newState.cart.products[promoCartWhislistIndex] &&
  //     (newState.cart.products[promoCartWhislistIndex].wishlisted = 0);
  //   newState.detail && (newState.detail.wishlisted = 0);

  //   newState.wishlist.products.splice(whislistIndex, 1);
  // }

  // newState.products[productWhislistIndex].wishlisted = newState.products[productWhislistIndex]?.wishlisted == 1 ? 0 : 1;
  // newState.products[promoProductWhislistIndex].wishlisted = 1;
  // newState.products[promoCartWhislistIndex].wishlisted = 1;

  // newState.wishlist.products.push(payload.data.product);

  // // newState.products.push(payload.product);

  // //edit favorite banner product
  // if (
  //   newState.currentDetail.products &&
  //   newState.currentDetail.products.length !== 0
  // ) {
  //   const indexPromo = newState.currentDetail.products.map((e, i) => {
  //     if (e.product.code == payload.data.product.code) {
  //       e.product.wishlisted = e.product.wishlisted == 1 ? 0 : 1;
  //     }
  //   });
  // }

  // //edit favorite promo products
  // if (newState.promoProduct.length !== 0) {
  //   const productIndex = newState.promoProduct.findIndex(
  //     (e) => e.code === payload.data.product.code,
  //   );
  //   if (productIndex !== -1) {
  //     let bannerProducts = newState.promoProduct[productIndex];
  //     bannerProducts.wishlisted = bannerProducts.wishlisted == 1 ? 0 : 1;
  //   }
  // }

  // //edit favorite product list and cart
  // const index = newState.products.findIndex(
  //   (e) => e.code === payload.data.product.code,
  // );
  // const cartIndex = newState.cart.products.findIndex(
  //   (e) => e.code == payload.data.product.code,
  // );
  // if (cartIndex != -1) {
  //   let cartProducts = newState.cart.products[cartIndex];
  //   cartProducts.wishlisted = cartProducts.wishlisted == 1 ? 0 : 1;
  // }
  // let productsWishList = newState.products[index];
  // productsWishList.wishlisted = productsWishList.wishlisted == 1 ? 0 : 1;
  // newState.detail = newState.products[index];

  // let incomingProducts = payload.data.newData.data;
  // let existingProducts = newState.wishlist.products.slice();
  // let productList = newState.products.slice();

  // for (x in existingProducts) {
  //   let sameValue = false;
  //   for (y in incomingProducts) {
  //     if (existingProducts[x].code == incomingProducts[y].code) {
  //       existingProducts[x] = Object.assign(
  //         {},
  //         existingProducts[x],
  //         incomingProducts[y],
  //       );
  //       sameValue = true;
  //       break;
  //     }
  //   }
  //   if (sameValue == false) {
  //     existingProducts.splice(x, 1);
  //   }
  // }

  // newState.wishlist.products = existingProducts.map((e) => {
  //   let productItem = productList.filter((p) => e.code == p.code);
  //   if (productItem.length > 0) {
  //     return productItem[0];
  //   } else {
  //     if (!e.count) {
  //       e.count = 0;
  //     }
  //     if (!e.maxQty) {
  //       e.maxQty = 1000;
  //     }
  //     if (e.total_claim_product !== undefined) {
  //       e.isClaim = parseInt(e.total_claim_product) >= e.quota_claim;
  //     }
  //     return e;
  //   }
  // });

  return newState;
};

const getDeliveryPrice = (state, payload) => {
  let newState = JSON.parse(JSON.stringify(state));
  newState.delivery_price = payload.data.shippingcost;
  newState.minimumTrxFreeShippingCost = payload.data.minTrxFreeShippingCost;

  return newState;
};

const removeEmptyItems = (state, payload) => {
  let newState = JSON.parse(JSON.stringify(state));
  let newCart = newState.cart.products.slice();

  newCart.map((c, i) => {
    if (c.stock == 0) {
      newCart.splice(i, 1);
    }
  });

  newState.cart.products = newCart;

  return newState;
};

const validateCart = (state, payload) => {
  let newState = JSON.parse(JSON.stringify(state));
  let newCart = newState.cart.products.slice();
  let newProduct = newState.products.slice();
  let newPromo = newState.promoProduct.slice();
  let count = 0;
  let total = 0;

  for (x in newCart) {
    let result = payload.data.find(
      (item) => item.product_code == newCart[x].code,
    );
    if (result) {
      if (result.max_qty == 0) {
        newPromo.map((p, i) => {
          if (p.code == newCart[x].code) {
            p.count = result.max_qty;
            p.maxQty = result.max_qty;
            p.stock = result.max_qty;
          }
        });

        newProduct.map((p, i) => {
          if (p.code == newCart[x].code) {
            p.count = result.max_qty;
            p.maxQty = result.max_qty;
            p.stock = result.max_qty;
          }
        });
        if (newCart.length == 1) {
          newCart.splice(x, 1);
        }

        newCart[x].maxQty = result.max_qty;
        newCart[x].count = result.max_qty;
        newCart[x].stock = result.max_qty;
      } else {
        newCart[x].maxQty = result.max_qty;
        newCart[x].count = result.max_qty;
        newCart[x].stock = result.max_qty;

        if (
          newCart[x].banner_harga_jual &&
          newCart[x].banner_harga_jual !== null
        ) {
          total = total + newCart[x].banner_harga_jual * newCart[x].count;
          count = count + newCart[x].count;
        } else {
          total = total + newCart[x].promo_price * newCart[x].count;
          count = count + newCart[x].count;
        }
      }
    } else {
      if (
        newCart[x].banner_harga_jual &&
        newCart[x].banner_harga_jual !== null
      ) {
        total = total + newCart[x].banner_harga_jual * newCart[x].count;
        count = count + newCart[x].count;
      } else {
        total = total + newCart[x].promo_price * newCart[x].count;
        count = count + newCart[x].count;
      }
    }
  }

  newState.total.count = count;
  newState.total.price = total;
  newState.cart.products = newCart;
  newState.products = newProduct;
  newState.promoProduct = newPromo;

  return newState;
};

const reorderTransaction = (state, payload) => {
  let newState = JSON.parse(JSON.stringify(state));
  let currentCart = newState.cart.products.slice();
  let productList = newState.products.slice();
  let maxClaim = newState.productMaxClaim.slice();
  let total = 0;
  let count = 0;

  for (let i = 0; i < payload.data.length; i++) {
    let cartIndex = currentCart.findIndex(
      (e) => e.code == payload.data[i].product.code,
    );
    if (cartIndex == -1) {
      payload.data[i].product.count = payload.data[i].qty;
      payload.data[i].product.maxQty = 1000;
      currentCart.push(payload.data[i].product);
    } else {
      currentCart[cartIndex].count += payload.data[i].qty;
      currentCart[cartIndex].maxQty = 1000;
    }
  }

  for (x in currentCart) {
    let productIndex = productList.findIndex(
      (e) => e.code == currentCart[x].code,
    );
    if (productIndex != -1) {
      productList[productIndex].count = currentCart[x].count;
    }
  }

  for (i in currentCart) {
    let promoQty = 0;
    let normalQty = 0;
    let promoPrice = currentCart[i].promo_price;

    if (
      currentCart[i].banner_harga_jual &&
      currentCart[i].banner_harga_jual !== null
    ) {
      promoPrice = currentCart[i].banner_harga_jual;
    }

    if (
      (currentCart[i].total_claim_product === undefined ||
        currentCart[i].total_claim_product === null) &&
      Number(currentCart[i].on_promo) === 1
    ) {
      // if product is special deals and not logged in yet
      if (Number(currentCart[i].quota_claim) === 0) {
        promoQty = currentCart[i].count;
      } else if (
        Number(currentCart[i].quota_claim) >= 0 &&
        currentCart[i].count <= Number(currentCart[i].quota_claim)
      ) {
        promoQty = currentCart[i].count;
      } else {
        normalQty = currentCart[i].count - Number(currentCart[i].quota_claim);
        promoQty = currentCart[i].count - normalQty;
      }

      total = total + promoQty * promoPrice + normalQty * currentCart[i].price;
    } else if (
      currentCart[i].quota_claim &&
      Number(currentCart[i].on_promo) === 1
    ) {
      // if product is special deals and have claim limit
      if (
        currentCart[i].count <=
        Number(currentCart[i].quota_claim) -
          Number(currentCart[i].total_claim_product)
      ) {
        promoQty = currentCart[i].count;
      } else {
        promoQty =
          Number(currentCart[i].quota_claim) -
          Number(currentCart[i].total_claim_product);
      }

      if (
        currentCart[i].count >
        Number(currentCart[i].quota_claim) -
          Number(currentCart[i].total_claim_product)
      ) {
        normalQty =
          currentCart[i].count -
          (Number(currentCart[i].quota_claim) -
            Number(currentCart[i].total_claim_product));
      }
      total = total + promoQty * promoPrice + normalQty * currentCart[i].price;
    } else if (
      Number(currentCart[i].total_claim_product) === 0 &&
      Number(currentCart[i].on_promo) === 1
    ) {
      // if product is special deals and have no claim limit, promoQty * promo_price
      promoQty = currentCart[i].count;
      total = total + promoQty * promoPrice;
    } else {
      // Normal qty
      normalQty = currentCart[i].count;
      total = total + normalQty * currentCart[i].price;
    }

    count = count + currentCart[i].count;
    currentCart[i].maxQty = payload.data.maxQty;
  }

  newState.total.count = count;
  newState.total.price = total;
  newState.cart.products = currentCart.filter((e) => e.count > 0);

  newState.products = productList;
  newState.cart.products = currentCart;
  newState.total.count = count;
  newState.total.price = total;
  newState.productMaxClaim = maxClaim;

  return newState;
};

const resetParams = (state, payload) => {
  let newState = JSON.parse(JSON.stringify(state));
  newState.params = initialState.params;

  return newState;
};

const setVoucher = (state, payload) => {
  let newState = {...state};
  newState.coupon_code = payload;
  return newState;
};

const setDiscountPrice = (state, payload) => {
  let newState = JSON.parse(JSON.stringify(state));
  let totalPrice = newState.total.price;
  let discount = 0;
  let coupon_code = newState.coupon_code;

  if (payload.grand_total_diskon > 0) {
    discount = payload.grand_total_diskon;
    coupon_code = payload.coupon_code;
  } else {
    payload.forEach((object) => {
      coupon_code = object.coupon_code;

      if (object.category == 'Percentage') {
        let discountedPrice;
        discountedPrice = totalPrice * (object.amount / 100);
        // totalPrice = totalPrice - discountedPrice;
        discount = discountedPrice;
      } else {
        let discountedPrice = object.amount;
        // totalPrice = totalPrice - discountedPrice;
        discount = object.amount;
      }
    });
  }

  newState.discount = discount;
  newState.total.price = totalPrice;
  newState.coupon_code = coupon_code;
  return newState;
};

const cancelVoucher = (state, payload) => {
  let newState = JSON.parse(JSON.stringify(state));

  let discount = newState.discount;
  let coupon = newState.coupon_code;

  discount = 0;
  coupon = '';
  newState.discount = discount;
  newState.coupon_code = coupon;

  return newState;
};

const getCurrentDetail = (state, payload) => {
  let newState = JSON.parse(JSON.stringify(state));

  newState.currentDetail = payload;

  let incomingProducts = payload.products;

  let existingProducts = newState.currentDetail.products.slice();

  let cartList = newState.products.slice();

  let new_products = payload.new_products;

  for (x in incomingProducts) {
    let sameValue = false;
    for (y in cartList) {
      if (incomingProducts[x].product.code == cartList[y].code) {
        incomingProducts[x].product = Object.assign(
          {},
          incomingProducts[x].product,
          cartList[y],
        );
        sameValue = true;
        break;
      }
    }
    if (sameValue == false) {
      incomingProducts[x].product.banner_harga_jual =
        incomingProducts[x].banner_harga_jual;
      cartList.push(incomingProducts[x].product);
    }
  }

  if (new_products && Object.values(new_products).length > 0) {
    let temp;
    for (const items in new_products) {
      temp = new_products[items];
      for (let obj in temp) {
        if (obj !== 'info') {
          if (!temp[obj].product.count) {
            temp[obj].product.count = 0;
          }
          if (!temp[obj].product.maxQty) {
            temp[obj].product.maxQty = 1000;
          }
          if (temp[obj].product.total_claim_product !== undefined) {
            temp[obj].product.isClaim =
              parseInt(temp[obj].product.total_claim_product) >=
              temp[obj].product.quota_claim;
          }
        }
      }
    }
  }

  incomingProducts = incomingProducts.map((e) => {
    let cartItem = cartList.filter((p) => e.code == p.code);
    if (cartItem.length > 0) {
      return cartItem[0];
    } else {
      if (!e.product.count) {
        e.product.count = 0;
      }
      if (!e.product.maxQty) {
        e.product.maxQty = 1000;
      }
      return e;
    }
  });

  newState.products = cartList;
  newState.currentDetail.products = incomingProducts;
  newState.currentDetail.new_products = new_products;

  return newState;
};

const setModalVisible = (state, payload) => {
  let newState = JSON.parse(JSON.stringify(state));
  newState.setModalVisible = payload.data;

  return newState;
};

const getProductDetail = (state, payload) => {
  let newState = JSON.parse(JSON.stringify(state));
  if (payload.data.data.length > 0) {
    payload.data.data.map((e) => {
      const findProduct = newState.cart.products.findIndex(
        (el) => el.code === e.code,
      );
      const filtering = newState.cart.products.filter(
        (res) => res.code === e.code,
      );
      if (findProduct === -1) {
        if (!e.count) {
          e.count = 0;
        }
        if (!e.maxQty) {
          e.maxQty = 1000;
        }
        if (e.total_claim_product !== undefined) {
          e.isClaim = parseInt(e.total_claim_product) >= e.quota_claim;
        }
        newState.detail = e;

        // newState.products.push(newState.detail)
      } else {
        newState.detail = filtering[0];
      }
    });
  }
  // newState.detail = payload.data.data[0];
  return newState;
};

const clearProductMaxClaim = (state, payload) => {
  let newState = JSON.parse(JSON.stringify(state));
  newState.productMaxClaim = payload;

  return newState;
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case ct.GET_PRODUCTS:
      return getProducts(state, action.payload);
    case ct.GET_CATEGORIES:
      return getCategories(state, action.payload);
    case ct.GET_FAVORITES:
      return getFavorites(state, action.payload);
    case ct.GET_PROMO:
      return getPromo(state, action.payload);
    case ct.GET_CART:
      return getCart(state, action.payload);
    case ct.GET_SAVED_CARTS:
      return getSavedCarts(state, action.payload);
    case ct.GET_DELIVERY_PRICE:
      return getDeliveryPrice(state, action.payload);
    case ct.SEARCH_PRODUCTS:
      return searchData(state, action.payload);
    case ct.CHANGE_TOTAL:
      return editTotal(state, action.payload);
    case ct.CHANGE_CATEGORIES:
      return changeCategory(state, action.payload);
    case ct.TOGGLE_FAVORITE:
      return editFavorite(state, action.payload);
    case ct.DETAIL_PRODUCT:
      return getDetail(state, action.payload);
    case ct.CLEAR_PRODUCTS:
      return clearProducts(state);
    case ct.CLEAR_PRODUCT_LISTS:
      return clearProductList(state);
    case ct.VALIDATE_CART:
      return validateCart(state, action.payload);
    case ct.REORDER_TRANSACTION:
      return reorderTransaction(state, action.payload);
    case ct.RESET_PARAMS:
      return resetParams(state, action.payload);
    case ct.SET_DISCOUNT_PRICE:
      return setDiscountPrice(state, action.payload);
    case ct.CANCEL_VOUCHER:
      return cancelVoucher(state, action.payload);
    case ct.GET_DETAIL_BANNER:
      return getCurrentDetail(state, action.payload);
    case ct.SET_VOUCHER:
      return setVoucher(state, action.payload);
    case ct.REMOVE_EMPTY:
      return removeEmptyItems(state, action.payload);
    case ct.SET_MODAL_VISIBLE:
      return setModalVisible(state, action.payload);
    case ct.GET_PRODUCT_DETAIL:
      return getProductDetail(state, action.payload);
    case ct.CLEAR_PRODUCT_MAX_CLAIM:
      return clearProductMaxClaim(state, action.payload);
    case ct.RESET_PRODUCTS:
      return initialState;
    default:
      return state;
  }
};

export default productReducer;
