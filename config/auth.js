module.exports = {
  ensureAuthenticated: function(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash('error_msg', 'Зарегистрируйтесь для просмотра');
    res.redirect('/users/login');
  },
  forwardAuthenticated: function(req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect('/home');
  }
//   check: function(req,res,next) {
//     if(!req.isAuthenticated()) {
//       return next();
//     }
// req.flash('error_msg', 'Please log in to view that resource');
//   }

};
