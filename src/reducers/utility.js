import ct from '@constants';

const initialState = {
    on_boarding: false,
};

const onBoarding = (state) => {
    let newState = JSON.parse(JSON.stringify(state));
    newState.on_boarding = true;
    return newState;
}

const utility = (state = initialState, action) => {
    switch(action.type){
        case ct.ON_BOARDING: return onBoarding(state)
        default: return state;
    };
};

export default utility;