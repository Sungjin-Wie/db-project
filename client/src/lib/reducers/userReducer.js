export const userState = {
    isLoggedIn: false,
    name: "",
};

const userReducer = (state = userState, action) => {
    const { type } = action;
    switch (type) {
        default:
            return state;
    }
}

export default userReducer;