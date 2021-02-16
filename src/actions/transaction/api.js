import actReducer from './reducer';
import actNetwork from '../network/reducer';
import requestHandler from '../helper';
import {path} from '../config';
import {language, analytics} from '@helpers';

const actions = {};

let payload = {
  path: '',
  header: {
    apiToken: '',
    oneSignalToken: '',
  },
  body: {},
  params: {},
};

actions.cancel_invoice = (req, success, failure) => {
  payload.path = path.cancelCheckout;
  payload.header = req.header;
  payload.body = req.body;

  return (dispatch) => {
    requestHandler('post', payload, dispatch)
      .then((res) => {
        if (res.code) {
          if (res.code == 200) {
            dispatch(actReducer.cancel_transaction(req.body));
            dispatch(
              actNetwork.set_error_status({
                status: true,
                data: 'Pembayaran batal dilakukan',
                title: 'formError.title.paymentCanceled',
              }),
            );
            success(res);
          }
        }
      })
      .catch((err) => {
        if (!err.code) {
          dispatch(actNetwork.set_network_error_status(true));
          failure(err);
        } else {
          if (req.info == 'gopay') {
            dispatch(
              actNetwork.set_error_status({
                status: true,
                data: 'Pembayaran batal dilakukan',
                title: 'formError.title.paymentCanceled',
              }),
            );
          } else {
            dispatch(
              actNetwork.set_error_status({
                status: true,
                data: JSON.stringify(err),
              }),
            );
          }

          failure(err);
        }
      });
  };
};

const addMissingProduct = (data) => {
  let outOfStockNames = [];
  data.forEach((item, index) => {
    if (item.product_name) {
      outOfStockNames.push(' ' + item.product_name.trim() + ' ');
    }
  });
  return outOfStockNames;
};

actions.bulk_add_products = (req, success, failure) => {
  payload.path = path.bulkAddProducts;
  payload.header = req.header;
  payload.body = req.body;

  payload.body.map((p, i) => {
    if (p.qty == 0) {
      payload.body.splice(i, 1);
    }
  });

  return (dispatch) => {
    requestHandler('post', payload, dispatch)
      .then((res) => {
        if (res.code) {
          if (res.code == 200) {
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
              language
                .transformText('message.outOfStockCart')
                .then((message) => {
                  let products = addMissingProduct(err.data);
                  dispatch(
                    actNetwork.set_error_status({
                      status: true,
                      data: `${message}\n\n Out of Stock: ${products}`,
                    }),
                  );
                  dispatch(actReducer.validate_cart(err.data));
                });
              break;

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

actions.request_snap_token = (req, success, failure) => {
  payload.path = path.checkout;
  payload.header = req.header;
  payload.body = req.body;
  payload.params = req.params;
  return (dispatch) => {
    requestHandler('post', payload, dispatch)
      .then((res) => {
        if (res.code) {
          if (res.code == 200) {
            // analytics.trackEvent('Purchase Orders', {status: 'Pending'});
            success(res.data);
          }
        }
      })
      .catch((err) => {
        if (!err.code) {
          dispatch(actNetwork.set_network_error_status(true));
        } else {
          switch (err.code) {
            case 400:
              if (err.data) {
                failure(err);
                return dispatch(
                  actNetwork.set_error_status({
                    status: true,
                    data: err.code_message,
                    title: 'voucher.title',
                  }),
                );
              }
            case 403:
              if (err.data.payment_method) {
                return language
                  .transformText('message.noPaymentMethodSelected')
                  .then((message) => {
                    dispatch(
                      actNetwork.set_error_status({
                        status: true,
                        data: message,
                        title: 'formError.title.createOrder',
                      }),
                    );
                  });
              } else if (err.data.update_profile) {
                failure(err);
                return;
              } else {
                return dispatch(
                  actNetwork.set_error_status({
                    status: true,
                    data: JSON.stringify(err),
                  }),
                );
              }
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

actions.cancel_checkout = (req, success, failure) => {
  payload.path = path.cancelCheckout;
  payload.header = req.header;
  payload.body = req.body;

  return (dispatch) => {
    requestHandler('post', payload, dispatch)
      .then((res) => {
        if (res.code) {
          if (res.code == 200) {
            success(res.data);
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
            case 403:
              if (err.data.payment_method) {
                return language
                  .transformText('message.noPaymentMethodSelected')
                  .then((message) => {
                    dispatch(
                      actNetwork.set_error_status({
                        status: true,
                        data: message,
                        title: 'formError.title.createOrder',
                      }),
                    );
                  });
              } else {
                return dispatch(
                  actNetwork.set_error_status({
                    status: true,
                    data: JSON.stringify(err),
                  }),
                );
              }
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

actions.create_order = (req, success, failure) => {
  payload.path = path.checkout;
  payload.header = req.header;
  payload.body = req.body;
  payload.params = req.params;

  return (dispatch) => {
    requestHandler('post', payload, dispatch)
      .then((res) => {
        if (res.code) {
          if (res.code == 200) {
            success(res.data);
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
            case 403:
              if (err.data.payment_method) {
                return language
                  .transformText('message.noPaymentMethodSelected')
                  .then((message) => {
                    dispatch(
                      actNetwork.set_error_status({
                        status: true,
                        data: message,
                        title: 'formError.title.createOrder',
                      }),
                    );
                  });
              } else {
                return dispatch(
                  actNetwork.set_error_status({
                    status: true,
                    data: JSON.stringify(err),
                  }),
                );
              }
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

actions.get_transaction = (req, success, failure) => {
  payload.path = path.transactionHistory;
  payload.header = req.header;
  payload.params = req.params;

  return (dispatch) => {
    requestHandler('get', payload, dispatch)
      .then((res) => {
        if (res.code) {
          if (res.code == 200) {
            dispatch(actReducer.get_transaction(res.data));
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

actions.detail_transaction = (req, success, failure) => {
  payload.path = `${path.transactionHistory}/${req.invoice}`;
  payload.header = req.header;
  payload.params = {};

  return (dispatch) => {
    requestHandler('get', payload, dispatch)
      .then((res) => {
        if (res.code) {
          if (res.code == 200) {
            if (req.type) {
              if (res.data.status == 'pending_payment') {
                if (res.data.payment_method == 'gopay') {
                  dispatch(actReducer.detail_transaction(res.data));
                  failure(res);
                } else {
                  dispatch(actReducer.detail_transaction(res.data));
                  success(res);
                }
              } else {
                dispatch(actReducer.detail_transaction(res.data));
                success(res);
              }
              // success(res);
            } else {
              dispatch(actReducer.detail_transaction(res.data));
              success(res);
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
              if (req.type) {
                failure(err);
              } else {
                dispatch(
                  actNetwork.set_error_status({
                    status: true,
                    data: 'Pembayaran batal dilakukan.',
                    title: 'formError.title.paymentCanceled',
                  }),
                );
              }
          }
        }
      });
  };
};

actions.reorder_transaction = (req, success, failure) => {
  payload.path = `${path.reorder}/${req.invoice}`;
  payload.header = req.header;

  return (dispatch) => {
    requestHandler('post', payload, dispatch)
      .then((res) => {
        if (res.code) {
          if (res.code == 200) {
            dispatch(actReducer.reorder_transaction(res.data));
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

actions.add_favorite_history = (req, success, failure) => {
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

actions.delete_favorite_history = (req, success, failure) => {
  payload.path = `${path.favorite}/${req.favorite.product.code}`;
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

export default actions;
