const getIsLoggedIn = state => state.auth.isLoggedIn;

const getUserName = state => state.auth.user.name;

const getIsFetchingUser = state => state.auth.isFetchingUser;

const getToken = state => state.auth.token;

const authSelectors = {
  getIsLoggedIn,
  getUserName,
  getIsFetchingUser,
  getToken,
};

export default authSelectors;