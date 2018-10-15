import registration from './registration';
import auth from './auth';
import product from './product';
import user from './user';
import network from './network';
import transaction from './transaction';

const action = {
    registration: registration,
    auth: auth,
    product: product,
    user: user,
    network: network,
    transaction: transaction
}

export default action;