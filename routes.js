var messageController = require(process.cwd() + '/controllers/message.js');
var userController = require(process.cwd() + '/controllers/user.js');
var pushyController = require(process.cwd() + '/controllers/pushy.js');
var authController = require(process.cwd() + '/controllers/auth.js');
var friendsController = require(process.cwd() + '/controllers/friends.js');
var smsController = require(process.cwd() + '/controllers/sms.js');

exports.init = function(router) {
    router.route('/api/users/authenticate')
        .post(authController.getAuthenticationToken);
    router.route('/api/messages/send')
        .post(authController.isTokenAuthenticated, messageController.sendMessage);
    router.route('/api/contacts/invites/send')
        .post(authController.isTokenAuthenticated, smsController.sendInvitesToNonFriends);
    router.route('/api/users/update/pushyId')
        .post(authController.isTokenAuthenticated, userController.addOrUpdatePushyId);
    router.route('/api/users/register')
        .post(userController.addDirectUser);
    router.route('/api/users/fbSignIn')
        .post(userController.getOrAddFacebookUser);
    router.route('/api/users/gPlusSignIn')
        .post(userController.getOrAddGPlusUser);
    router.route('/api/users/fbAKSignIn')
        .post(userController.getOrAddFacebookAccountKitUser);
    router.route('/api/users/verify/sms')
        .get(authController.isTokenAuthenticated, smsController.sendVerificationCode)
        .post(authController.isTokenAuthenticated, smsController.verifyWithVerificationCode);
    router.route('/api/users/user')
        .get(authController.isTokenAuthenticated, userController.getUser);
    router.route('/api/users/search')
        .get(userController.findUsers);
    router.route('/api/users/check')
        .post(userController.areAlreadyUsers);
    router.route('/api/friends/friend')
        .get(authController.isTokenAuthenticated, friendsController.getFriendDetails);
    router.route('/api/friends/invites/send')
        .post(authController.isTokenAuthenticated, friendsController.sendFriendInvite);
    router.route('/api/friends/invites/sent')
        .get(authController.isTokenAuthenticated, friendsController.getSentInvites);
    router.route('/api/friends/invites/received')
        .get(authController.isTokenAuthenticated, friendsController.getReceivedInvites);
    router.route('/api/friends/invites/accept')
        .post(authController.isTokenAuthenticated, friendsController.acceptReceivedFriendInvite);
    router.route('/api/friends/invites/reject')
        .post(authController.isTokenAuthenticated, friendsController.sendFriendInvite);
    router.route('/api/friends/invites/withdraw')
        .post(authController.isTokenAuthenticated, friendsController.sendFriendInvite);
};
