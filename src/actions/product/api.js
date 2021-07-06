import actReducer from './reducer';
import actNetwork from '../network/reducer';
import requestHandler from '../helper';
import {path} from '../config';
import {analytics} from '@helpers';

const actions = {};

let payload2 = {};
let payload = {};

actions.get_products = (req, success, failure) => {
  payload2.path = path.getProducts;
  payload2.header = req.header;
  payload2.params = req.params;

  return (dispatch) => {
    requestHandler('get', payload2, dispatch, true)
      .then((res) => {
        if (res.code) {
          if (res.code == 200) {
            dispatch(actReducer.get_products(res.data));
            success();
          }
        }
      })
      .catch((err) => {
        if (!err.code) {
        } else {
          switch (err.code) {
            case 400:
              return failure(err);
            default:
              dispatch(
                actNetwork.set_error_status({
                  status: true,
                  data: JSON.stringify(err),
                }),
              );
          }
        }
      });
  };
};

actions.get_favorites = (req, success, failure) => {
  payload.path = path.getFavorites;
  payload.header = req.header;
  payload.params = req.params;

  return (dispatch) => {
    requestHandler('get', payload, dispatch)
      .then((res) => {
        if (res.code) {
          if (res.code == 200) {
            dispatch(actReducer.get_favorites(res.data));
            success(res);
          }
        }
      })
      .catch((err) => {
        if (!err.code) {
          dispatch(actNetwork.set_network_error_status(true));
        } else {
          switch (err.code) {
            case 400:
              return failure(err);
            default:
              dispatch(
                actNetwork.set_error_status({
                  status: true,
                  data: JSON.stringify(err),
                }),
              );
          }
        }
      });
  };
};

actions.get_categories = (req, success, failure) => {
  payload.path = path.getCategories;
  payload.header = req.header;
  payload.body = req.body;
  payload.params = req.params;

  return (dispatch) => {
    requestHandler('get', payload, dispatch)
      .then((res) => {
        if (res.code) {
          if (res.code == 200) {
            dispatch(actReducer.get_categories(res.data));
            success();
          }
        }
      })
      .catch((err) => {
        if (!err.code) {
        } else {
          switch (err.code) {
            case 400:
              return failure(err);
            default:
              dispatch(
                actNetwork.set_error_status({
                  status: true,
                  data: JSON.stringify(err),
                }),
              );
          }
        }
      });
  };
};

actions.get_cart = (req, success, failure) => {
  payload2.path = path.getCart;
  payload2.header = req.header;
  payload2.body = req.body;
  payload2.params = {
    session_cart: 1,
  };

  return (dispatch) => {
    requestHandler('get', payload2, dispatch)
      .then((res) => {
        if (res.code) {
          if (res.code === 200) {
            dispatch(actReducer.get_cart(res.data));
            success();
          }
        }
      })
      .catch((err) => {
        if (!err.code) {
        } else {
          switch (err.code) {
            case 400:
              return failure(err);
            default:
              dispatch(
                actNetwork.set_error_status({
                  status: true,
                  data: JSON.stringify(err),
                }),
              );
          }
        }
      });
  };
};

actions.post_cart = (req, success, failure) => {
  payload.path = path.getCart;
  payload.header = req.header;
  payload.body = req.body;
  payload.params = req.params;

  return (dispatch) => {
    requestHandler('post', payload, dispatch)
      .then((res) => {
        if (res.code) {
          if (res.code === 200) {
            dispatch(actReducer.post_cart(res.data));
            success(res);
          }
        }
      })
      .catch((err) => {
        if (!err.code) {
        } else {
          switch (err.code) {
            case 400:
              return failure(err);
            default:
              dispatch(
                actNetwork.set_error_status({
                  status: true,
                  data: JSON.stringify(err),
                }),
              );
          }
        }
      });
  };
};

actions.search_products = (req, success, failure) => {
  payload.path = path.getProducts;
  payload.header = req.header;
  payload.body = req.body;
  payload.params = req.params;

  return (dispatch) => {
    requestHandler('get', payload, dispatch)
      .then((res) => {
        if (res.code) {
          if (res.code == 200) {
            success(res);
            let result = [];
            let datatemp = res;
            const isArray = Array.isArray(res.data.data);
            if (res.data.data.length === undefined && !isArray) {
              for (const key in res.data.data) {
                if (res.data.data.hasOwnProperty(key)) {
                  result.push(res.data.data[key]);
                }
              }
              datatemp.data.data = result;
              dispatch(actReducer.search_products(req.params, datatemp.data));
            } else {
              dispatch(actReducer.search_products(req.params, res.data));
            }
          }
        }
      })
      .catch((err) => {
        if (!err.code) {
          dispatch(actNetwork.set_network_error_status(true));
        } else {
          switch (err.code) {
            case 400:
              return failure(err);
            default:
              dispatch(
                actNetwork.set_error_status({
                  status: true,
                  data: JSON.stringify(err),
                }),
              );
          }
        }
      });
  };
};

actions.get_promo = (req, success, failure) => {
  payload.path = path.getProducts;
  payload.header = req.header;
  payload.body = req.body;
  payload.params = req.params;

  return (dispatch) => {
    requestHandler('get', payload, dispatch)
      .then((res) => {
        if (res.code) {
          if (res.code == 200) {
            success(res);
            dispatch(actReducer.get_promo(req.params, res.data));
          }
        }
      })
      .catch((err) => {
        if (!err.code) {
        } else {
          switch (err.code) {
            case 400:
              return failure(err);
            default:
              dispatch(
                actNetwork.set_error_status({
                  status: true,
                  data: JSON.stringify(err),
                }),
              );
          }
        }
      });
  };
};

actions.get_delivery_price = (req, success, failure) => {
  payload.path = path.shippingCost;
  payload.header = req.header;
  payload.params = req.params;

  return (dispatch) => {
    requestHandler('get', payload, dispatch)
      .then((res) => {
        if (res.code) {
          if (res.code == 200) {
            dispatch(actReducer.get_delivery_price(res.data));
            success(res);
          }
        }
      })
      .catch((err) => {
        if (!err.code) {
          dispatch(actNetwork.set_network_error_status(true));
        } else {
          switch (err.code) {
            case 400:
              return failure(err);
            default:
              dispatch(
                actNetwork.set_error_status({
                  status: true,
                  data: JSON.stringify(err),
                }),
              );
          }
        }
      });
  };
};

actions.add_favorite = (req, success, failure) => {
  payload.path = path.favorite;
  payload.header = req.request.header;
  payload.body = req.request.body;

  return (dispatch) => {
    requestHandler('post', payload, dispatch)
      .then((res) => {
        if (res.code) {
          if (res.code == 200) {
            dispatch(
              actReducer.toggle_favorite({
                newData: res.data,
                product: req.favorite,
              }),
            );
          }
        }
      })
      .catch((err) => {
        if (!err.code) {
          dispatch(actNetwork.set_network_error_status(true));
        } else {
          switch (err.code) {
            case 400:
              return failure(err);
            default:
              dispatch(
                actNetwork.set_error_status({
                  status: true,
                  data: JSON.stringify(err),
                }),
              );
          }
        }
      });
  };
};

actions.delete_favorite = (req, success, failure) => {
  payload.path = `${path.favorite}/${req.favorite.code}`;
  payload.header = req.request.header;

  return (dispatch) => {
    requestHandler('delete', payload, dispatch)
      .then((res) => {
        if (res.code) {
          if (res.code == 200) {
            dispatch(
              actReducer.toggle_favorite({
                newData: res.data,
                product: req.favorite,
              }),
            );
            success();
          }
        }
      })
      .catch((err) => {
        if (!err.code) {
          dispatch(actNetwork.set_network_error_status(true));
        } else {
          switch (err.code) {
            case 400:
              return failure(err);
            default:
              dispatch(
                actNetwork.set_error_status({
                  status: true,
                  data: JSON.stringify(err),
                }),
              );
          }
        }
      });
  };
};

actions.get_product_detail = (req, success, failure) => {
  payload.path = path.getProducts;
  payload.header = req.header;
  payload.params = req.params;

  return (dispatch) => {
    requestHandler('get', payload, dispatch)
      .then((res) => {
        if (res.code) {
          if (res.code == 200) {
            if (res.data.data.length > 0) {
              dispatch(actReducer.get_product_detail(res.data));
              success(res);
            } else {
              dispatch(actNetwork.set_network_error_status(true));
            }
          }
        }
      })
      .catch((err) => {
        if (!err.code) {
          dispatch(actNetwork.set_network_error_status(true));
        } else {
          switch (err.code) {
            case 400:
              return failure(err);
            default:
              dispatch(
                actNetwork.set_error_status({
                  status: true,
                  data: JSON.stringify(err),
                }),
              );
          }
        }
      });
  };
};

export default actions;
