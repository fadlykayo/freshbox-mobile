import registration from './registration';
import auth from './auth';
import product from './product';
import user from './user';
import network from './network';
import transaction from './transaction';
import region from './region';
import utility from './utility';
import cs from './cs';

const action = {
    registration: registration,
    auth: auth,
    product: product,
    user: user,
    network: network,
    transaction: transaction,
    region: region,
    utility: utility,
    cs: cs,
}

export default action;