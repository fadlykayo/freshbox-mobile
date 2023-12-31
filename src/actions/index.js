import registration from './registration';
import auth from './auth';
import product from './product';
import user from './user';
import network from './network';
import transaction from './transaction';
import region from './region';
import utility from './utility';
import cs from './cs';
import notif from './notification';
import voucher from './voucher';
import banner from './banner';
import cart from './carts'

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
    notif: notif,
    voucher: voucher,
    banner: banner,
    cart: cart,
}

export default action;