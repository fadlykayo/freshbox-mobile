import registration from './registration';
import auth from './auth';
import product from './product';
import user from './user';
import transaction from './transaction';

const action = {
    registration: registration,
    auth: auth,
    product: product,
    user: user,
    transaction: transaction
}

export default action;