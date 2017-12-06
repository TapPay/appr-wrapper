!function(e,t){if("object"==typeof exports&&"object"==typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var n=t();for(var i in n)("object"==typeof exports?exports:e)[i]=n[i]}}(this,function(){return function(e){function t(i){if(n[i])return n[i].exports;var s=n[i]={i:i,l:!1,exports:{}};return e[i].call(s.exports,s,s.exports,t),s.l=!0,s.exports}var n={};return t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,n,i){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:i})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=0)}([function(e,t,n){"use strict";if(Object.defineProperty(t,"__esModule",{value:!0}),window.ApplePaySession){var i="https://apple.com/apple-pay";t.PaymentRequest=function(){function e(e,t,n){this.paymentRequestID="",this.shippingAddress=null,this.shippingOption="",this.shippingType="shipping",this.paymentResolver=null,this.paymentRejector=null,this.onshippingaddresschange=null,this.onshippingoptionchange=null,this.onpaymentmethodselected=null,this.validationEndpoint="",this.merchantIdentifier="";var s=!1;this.paymentRequest={countryCode:"",currencyCode:"",lineItems:[],merchantCapabilities:["supports3DS"],supportedNetworks:[],total:null,billingContact:null,requiredBillingContactFields:[],requiredShippingContactFields:[],shippingContact:null,shippingMethods:[],shippingType:"shipping"};for(var o=0,a=e;o<a.length;o++){var p=a[o];if(p.supportedMethods.indexOf(i)>-1){this.paymentRequest.supportedNetworks=p.data.supportedNetworks,this.paymentRequest.countryCode=p.data.countryCode,p.data.billingContact?this.paymentRequest.billingContact=p.data.billingContact:delete this.paymentRequest.billingContact,p.data.shippingContact?this.paymentRequest.shippingContact=p.data.shippingContact:delete this.paymentRequest.shippingContact,p.data.merchantCapabilities&&(this.paymentRequest.merchantCapabilities=p.data.merchantCapabilities),this.validationEndpoint=p.data.validationEndpoint,this.merchantIdentifier=p.data.merchantIdentifier,s=!0;break}}if(!s)throw"Payment method not specified for Apple Pay.";t&&(n&&!0!==n.requestShipping&&delete t.shippingOptions,this.updatePaymentDetails(t),this.paymentRequest.shippingMethods&&this.paymentRequest.shippingMethods.length&&(this.shippingOption=this.convertShippingMethod(this.paymentRequest.shippingMethods[0]))),n&&(n.requestShipping&&(this.paymentRequest.requiredBillingContactFields.push("postalAddress"),this.paymentRequest.requiredShippingContactFields.push("postalAddress")),n.requestPayerName&&this.paymentRequest.requiredShippingContactFields.push("name"),n.requestPayerEmail&&this.paymentRequest.requiredShippingContactFields.push("email"),n.requestPayerPhone&&this.paymentRequest.requiredShippingContactFields.push("phone"),"pickup"===n.shippingType?this.paymentRequest.shippingType="servicePickup":this.paymentRequest.shippingType=n.shippingType||"shipping"),this.session=new ApplePaySession(1,this.paymentRequest),this.session.addEventListener("validatemerchant",this.onValidateMerchant.bind(this)),this.session.addEventListener("paymentauthorized",this.onPaymentAuthorized.bind(this)),this.session.addEventListener("paymentmethodselected",this.onPaymentMethodSelected.bind(this)),this.session.addEventListener("shippingcontactselected",this.onShippingAddressChange.bind(this)),this.session.addEventListener("shippingmethodselected",this.onShippingOptionChange.bind(this)),this.session.addEventListener("cancel",this.onPaymentCanceled.bind(this))}return e.prototype.updatePaymentDetails=function(e){if(e.displayItems){this.paymentRequest.lineItems=[];for(var t=0,n=e.displayItems;t<n.length;t++){var i=n[t],s={type:!0===i.pending?"pending":"final",label:i.label,amount:i.amount.value};this.paymentRequest.lineItems.push(s)}}if(e.shippingOptions){this.paymentRequest.shippingMethods=[];for(var o=0,a=e.shippingOptions;o<a.length;o++){var p=a[o],h={label:p.label,detail:p.detail||"",amount:p.amount.value,identifier:p.id};this.paymentRequest.shippingMethods.push(h)}}if(!e.total)throw"`total` is required parameter for `PaymentDetails`.";this.paymentRequest.currencyCode=e.total.amount.currency,this.paymentRequest.total={type:!0===e.total.pending?"pending":"final",label:e.total.label,amount:e.total.amount.value}},e.prototype.updatePaymentMethod=function(e){},e.prototype.convertPaymentAddress=function(e){return{country:e.countryCode||"",addressLine:e.addressLines||[],region:e.administrativeArea||"",city:e.locality||"",dependentLocality:"",postalCode:e.postalCode||"",sortingCode:e.country||"",languageCode:"",organization:"",recipient:e.givenName+" "+e.familyName,phone:e.phoneNumber||""}},e.prototype.convertShippingMethod=function(e){for(var t=0,n=this.paymentRequest.shippingMethods;t<n.length;t++){var i=n[t];if(e.identifier===i.identifier)return i.identifier}return""},e.prototype.convertPaymentResponse=function(e){var t=e.shippingContact?this.convertPaymentAddress(e.shippingContact):void 0,n=e.billingContact?this.convertPaymentAddress(e.billingContact):void 0,s=e.shippingContact||{},o=e.billingContact?e.billingContact.givenName+" "+e.billingContact.familyName:void 0;return{details:{billingAddress:n},methodName:i,payerEmail:s.emailAddress,payerName:o,payerPhone:s.phoneNumber,shippingAddress:t,shippingOption:this.shippingOption,applePayRaw:e,complete:this.onPaymentComplete.bind(this)}},e.prototype.show=function(){var e=this;return this.session.begin(),new Promise(function(t,n){e.paymentResolver=function(e){t(e)},e.paymentRejector=function(e){n(e)}})},e.prototype.abort=function(){this.session.abort()},e.prototype.canMakePayment=function(){if(this.merchantIdentifier)return ApplePaySession.canMakePaymentsWithActiveCard(this.merchantIdentifier);throw"`merchantIdentifier` is not specified."},e.prototype.completeMerchantValidation=function(e){this.session.completeMerchantValidation(e)},e.prototype.completePaymentMethodSelection=function(e,t){this.session.completePaymentMethodSelection(e,t)},e.prototype.addEventListener=function(e,t){if("shippingaddresschange"!==e&&"shippingoptionchange"!==e&&"paymentmethodselected"!==e&&"validatemerchant"!==e)throw'Unknown event type "'+e+'" for `addEventListener`.';this["on"+e]=t},e.prototype.onValidateMerchant=function(e){var t=this;if(e.stopPropagation(),this.onvalidatemerchant)this.onvalidatemerchant(e);else{var n=new Headers({"Content-Type":"application/json"});fetch(this.validationEndpoint,{method:"POST",headers:n,body:JSON.stringify({validationURL:e.validationURL})}).then(function(e){if(200===e.status)return e.json();throw"Merchant validation error."}).then(function(e){t.completeMerchantValidation(e)}).catch(function(e){throw e})}},e.prototype.onPaymentMethodSelected=function(e){if(e.stopPropagation(),this.onpaymentmethodselected)this.onpaymentmethodselected(e);else{var t=this.paymentRequest.total,n=this.paymentRequest.lineItems;this.session.completePaymentMethodSelection(t,n)}},e.prototype.onShippingAddressChange=function(e){var t=this;if(this.onshippingaddresschange){e.stopPropagation();var n=e.shippingContact;this.shippingAddress=this.convertPaymentAddress(n),this.onshippingaddresschange({updateWith:function(e){Promise.resolve(e).then(function(e){t.updatePaymentDetails(e),t.session.completeShippingContactSelection(ApplePaySession.STATUS_SUCCESS,t.paymentRequest.shippingMethods,t.paymentRequest.total,t.paymentRequest.lineItems)},function(e){t.updatePaymentDetails(e),t.session.completeShippingContactSelection(ApplePaySession.STATUS_FAILURE,t.paymentRequest.shippingMethods,t.paymentRequest.total,t.paymentRequest.lineItems)})}})}},e.prototype.onShippingOptionChange=function(e){var t=this;if(this.onshippingoptionchange){e.stopPropagation();var n=e.shippingMethod;this.shippingOption=this.convertShippingMethod(n),this.onshippingoptionchange({updateWith:function(e){Promise.resolve(e).then(function(e){t.updatePaymentDetails(e),t.session.completeShippingMethodSelection(ApplePaySession.STATUS_SUCCESS,t.paymentRequest.total,t.paymentRequest.lineItems)},function(e){t.updatePaymentDetails(e),t.session.completeShippingMethodSelection(ApplePaySession.STATUS_FAILURE,null,null)})}})}},e.prototype.onPaymentAuthorized=function(e){if(this.paymentResolver){var t=this.convertPaymentResponse(e.payment);this.paymentResolver(t),this.paymentResolver=null,this.paymentRejector=null}},e.prototype.onPaymentCanceled=function(){this.paymentRejector&&(this.paymentRejector(),this.paymentResolver=null,this.paymentRejector=null)},e.prototype.onPaymentComplete=function(e){if("success"!==e&&"fail"!==e&&"unknown"!==e&&""!==e)throw"Unkown status code for complete().";var t;switch(e){case"success":t=ApplePaySession.STATUS_SUCCESS;break;case"fail":t=ApplePaySession.STATUS_FAILURE;break;case"unknown":default:t=ApplePaySession.STATUS_SUCCESS}this.session.completePayment(t)},e}()}}])});