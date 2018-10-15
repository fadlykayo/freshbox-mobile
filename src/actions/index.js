import registration from './registration';
import auth from './auth';
import product from './product';
import user from './user';
import network from './network';

const action = {
    registration: registration,
    auth: auth,
    product: product,
    user: user,
    network: network,
}

export default action;