(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d217357"],{c66d:function(e,t,n){"use strict";n.r(t);var s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"ion-page"},[n("ion-header",[n("ion-toolbar",[n("ion-title",[e._v("Your Profile")]),n("ion-buttons",{attrs:{slot:"end"},slot:"end"},[e.isAuthenticated?n("ion-button",{on:{click:e.onLogout}},[e._v(" Logout ")]):e._e()],1)],1)],1),n("ion-content",{staticClass:"ion-padding"},[n("ion-text",[n("h2",{staticStyle:{"padding-left":"16px"}},[e._v(e._s(e.userDetails.email))])]),n("ion-item",{attrs:{lines:"none"}},[n("ion-button",{staticStyle:{"margin-bottom":"16px"},on:{click:e.changeEmail}},[e._v("Change Email")])],1),n("ion-item",{attrs:{lines:"none"}},[n("ion-button",{staticStyle:{"margin-top":"16px","margin-bottom":"16px"},on:{click:e.editUserDetails}},[e._v("Edit Your Details")])],1),n("ion-item",{attrs:{lines:"none"}},[n("ion-button",{staticStyle:{"margin-top":"16px","margin-bottom":"16px"},on:{click:e.changePassword}},[e._v("Send Password Reset Email")])],1)],1)],1)},o=[],i=n("5530"),a=n("2f62"),r={name:"profile",computed:Object(i["a"])({},Object(a["b"])("userModule",["userId","userDetails","isAuthenticated"])),methods:{changeEmail:function(){this.$router.push({name:"change-email",params:{userId:this.userId}})},editUserDetails:function(){this.$router.push({name:"edit-user-details",params:{userId:this.userId}})},changePassword:function(){var e=this;return this.$ionic.alertController.create({cssClass:"alert-cancel-res",header:"Password Reset Request",subHeader:this.userDetails.email,message:'Clicking "Confirm" will log you out and an email will be sent to the above address',buttons:[{text:"Back",role:"cancel",handler:function(){console.log("password reset abandoned.")}},{text:"Confirm",handler:function(){console.log("password reset Confirmed"),e.$store.dispatch("userModule/sendPasswordEmailReset",e.userDetails.email)}}]}).then((function(e){return e.present()}))},onLogout:function(){this.$store.dispatch("userModule/logout")}}},l=r,u=n("2877"),c=Object(u["a"])(l,s,o,!1,null,null,null);t["default"]=c.exports}}]);
//# sourceMappingURL=chunk-2d217357.317d2979.js.map