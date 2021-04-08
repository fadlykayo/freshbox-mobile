import ct from '@constants';

const initialState = {
    on_boarding: false,
    delivery_date: [],
    broadcast_message: '',
    announcement: true,
    tour_guide: true,
    listBranch: [],
    selectedBranch: undefined,
    result_branch: {}
};

const onBoarding = (state) => {
    let newState = JSON.parse(JSON.stringify(state));
    newState.on_boarding = true;
    return newState;
};

const deliveryDate = (state, payload) => {
    let newState = JSON.parse(JSON.stringify(state));
    newState.delivery_date = payload;
    return newState;
};

const broadcastMessage = (state, payload) => {
    let newState = JSON.parse(JSON.stringify(state));
    newState.broadcast_message = payload;
    return newState;
};

const announcement = (state, payload) => {
    let newState = JSON.parse(JSON.stringify(state));
    newState.announcement = payload;
    return newState;
};

const tourGuide = (state, payload) => {
    let newState = JSON.parse(JSON.stringify(state));
    newState.tour_guide = payload;
    return newState;
};

const getListBranch = (state, payload) => {
    let newState = JSON.parse(JSON.stringify(state))
    newState.listBranch = payload.data.data
    const selectedBranch = newState.selectedBranch
    let incomingBranch = newState.listBranch.map((branch, i) => {
        let selected;
        if(selectedBranch) {
            if(selectedBranch.id === branch.id) {
                selected = true
            } else {
                selected = false
            }
        } else {
            if (i === 0) {
                selected = true
            } else {
                selected = false
            }
        }
        return {
            ...branch,
            check: selected
        }
    })
    const selectedIndex = incomingBranch.findIndex(come => come.check)
    newState.selectedBranch = incomingBranch[selectedIndex]
    newState.listBranch = incomingBranch
    return newState
  }
  
  const changeBranch = (state, payload) => {
    let newState = JSON.parse(JSON.stringify(state))
    const listBranch = newState.listBranch
    const changesActiveBranch = listBranch.map((list) => {
    if((list.name === payload.name)) {
          list.check = true
        } else {
          list.check = false
        }
        return list
    })
    const selectedIndex = changesActiveBranch.findIndex(come => come.check)
    newState.selectedBranch = changesActiveBranch[selectedIndex]
    newState.listBranch = changesActiveBranch
    return newState
  }

  const checkBranch = (state, payload) => {
    let newState = JSON.parse(JSON.stringify(state))
    newState.result_branch = payload.data
    return newState
  }

const utilityReducer = (state = initialState, action) => {
    switch (action.type) {
        case ct.ON_BOARDING: return onBoarding(state);
        case ct.DELIVERY_DATE: return deliveryDate(state, action.payload);
        case ct.BROADCAST_MESSAGE: return broadcastMessage(state, action.payload);
        case ct.ANNOUNCEMENT: return announcement(state, action.payload);
        case ct.TOUR_GUIDE: return tourGuide(state, action.payload);
        case ct.GET_LIST_BRANCH: return getListBranch(state, action.payload);
        case ct.CHANGE_BRANCH: return changeBranch(state, action.payload);
        case ct.CHECK_BRANCH: return checkBranch(state, action.payload);
        default: return state;
    };
};

export default utilityReducer;