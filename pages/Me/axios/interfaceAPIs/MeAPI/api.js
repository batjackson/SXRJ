var _api_root = "http://121.5.56.179:8890/";
var api = {
  get: {
    getOaFavorites: _api_root + "oa/favorites",
	removeFavorites: _api_root + "user-favorites/remove-from-favorites"
  },

  post: {
	  postLogin: _api_root + "user/login",
	  getUserAccount: _api_root + "user/account"
  },

};
export default api;