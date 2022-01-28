"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_views_pages_Login_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/pages/Login.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/pages/Login.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'Login',
  data: function data() {
    return {
      csrf: document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
      textLogin: 'Masuk',
      form: {
        email: '',
        password: ''
      },
      errors: null
    };
  },
  methods: {
    prosesLogin: function prosesLogin(e) {
      var _this = this;

      e.preventDefault();
      var self = this;
      self.errors = null;
      self.textLogin = '<i class="fa fa-spinner fa-spin"></i>'; // window.axios.defaults.headers.common['X-CSRF-TOKEN'] = self.csrf;

      axios.post('/api/login', self.form).then(function (response) {
        var data = response.data.status.data; // console.log(data.hash_role[0].name);
        // if (data.hash_role[0].name == 'Customer Service') {
        //   self.$router.push('/customer-service');
        // } else if (data.hash_role[0].name == 'Tiket') {
        //   self.$router.push('/tiket');
        // } else if (data.hash_role[0].name == 'Antrian') {
        //   self.$router.push('/antrian');
        // } else {

        self.$router.push('/data-pegawai'); // }
        // window.location.href = '/dashboard';
      }, function (error) {
        // console.log(error.response);
        if (error.response.status == 403) {
          _this.$swal({
            title: "Warning",
            text: error.response.data.message,
            icon: "warning"
          });
        } else if (error.response.status == 422) {
          // this.message = error.response.data.message;
          self.textLogin = "Masuk";
          self.errors = error.response.data.errors;
        } else if (error.response.status == 404) {} else if (error.response.status === 401) {
          self.textLogin = "Masuk";
          self.errors = error.response.data.status;
          console.log(self.errors);
        } else {
          self.textLogin = "Masuk";
          console.error(error);

          _this.$swal({
            title: "Warning",
            text: error.response.data.message,
            icon: "warning"
          }); // this.$snotify.error(
          //   "Something went wrong try again later.",
          //   "Error"
          // );

        }
      }).catch(function (e) {
        console.log(e);
      });
    }
  }
});

/***/ }),

/***/ "./resources/js/views/pages/Login.vue":
/*!********************************************!*\
  !*** ./resources/js/views/pages/Login.vue ***!
  \********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Login_vue_vue_type_template_id_eaaf2be2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Login.vue?vue&type=template&id=eaaf2be2& */ "./resources/js/views/pages/Login.vue?vue&type=template&id=eaaf2be2&");
/* harmony import */ var _Login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Login.vue?vue&type=script&lang=js& */ "./resources/js/views/pages/Login.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Login_vue_vue_type_template_id_eaaf2be2___WEBPACK_IMPORTED_MODULE_0__.render,
  _Login_vue_vue_type_template_id_eaaf2be2___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/pages/Login.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/pages/Login.vue?vue&type=script&lang=js&":
/*!*********************************************************************!*\
  !*** ./resources/js/views/pages/Login.vue?vue&type=script&lang=js& ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Login.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/pages/Login.vue?vue&type=script&lang=js&");
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/pages/Login.vue?vue&type=template&id=eaaf2be2&":
/*!***************************************************************************!*\
  !*** ./resources/js/views/pages/Login.vue?vue&type=template&id=eaaf2be2& ***!
  \***************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": function() { return /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_template_id_eaaf2be2___WEBPACK_IMPORTED_MODULE_0__.render; },
/* harmony export */   "staticRenderFns": function() { return /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_template_id_eaaf2be2___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns; }
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_template_id_eaaf2be2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Login.vue?vue&type=template&id=eaaf2be2& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/pages/Login.vue?vue&type=template&id=eaaf2be2&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/pages/Login.vue?vue&type=template&id=eaaf2be2&":
/*!******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/pages/Login.vue?vue&type=template&id=eaaf2be2& ***!
  \******************************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": function() { return /* binding */ render; },
/* harmony export */   "staticRenderFns": function() { return /* binding */ staticRenderFns; }
/* harmony export */ });
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "app flex-row align-items-center" }, [
    _c(
      "div",
      { staticClass: "container" },
      [
        _c(
          "b-row",
          { staticClass: "justify-content-center" },
          [
            _c(
              "b-col",
              { attrs: { md: "8", lg: "6" } },
              [
                _c(
                  "b-card-group",
                  [
                    _c(
                      "b-card",
                      { staticClass: "p-4", attrs: { "no-body": "" } },
                      [
                        _c(
                          "b-card-body",
                          [
                            _c(
                              "b-form",
                              { on: { submit: _vm.prosesLogin } },
                              [
                                _c(
                                  "div",
                                  { staticClass: "text-center" },
                                  [
                                    _c("b-img", {
                                      attrs: {
                                        src: "/images/logo-pemko-medan.png",
                                        width: "80",
                                        fluid: "",
                                      },
                                    }),
                                    _vm._v(" "),
                                    _c("h1", [_vm._v("Login")]),
                                    _vm._v(" "),
                                    _c("p", { staticClass: "text-muted" }, [
                                      _vm._v("Sign In to your account"),
                                    ]),
                                  ],
                                  1
                                ),
                                _vm._v(" "),
                                _vm.errors != null && _vm.errors.message
                                  ? _c(
                                      "div",
                                      {
                                        staticClass:
                                          "alert alert-danger fade show",
                                      },
                                      [
                                        _c(
                                          "span",
                                          {
                                            staticClass: "close",
                                            attrs: { "data-dismiss": "alert" },
                                          },
                                          [_vm._v("×")]
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "h5",
                                          { staticClass: "font-size-18" },
                                          [_vm._v(_vm._s(_vm.errors.message))]
                                        ),
                                      ]
                                    )
                                  : _vm._e(),
                                _vm._v(" "),
                                _c(
                                  "b-input-group",
                                  { staticClass: "mb-3" },
                                  [
                                    _c(
                                      "b-input-group-prepend",
                                      [
                                        _c("b-input-group-text", [
                                          _c("i", { staticClass: "icon-user" }),
                                        ]),
                                      ],
                                      1
                                    ),
                                    _vm._v(" "),
                                    _c("b-form-input", {
                                      staticClass: "form-control",
                                      attrs: {
                                        type: "email",
                                        placeholder: "Username",
                                        autocomplete: "username email",
                                      },
                                      model: {
                                        value: _vm.form.email,
                                        callback: function ($$v) {
                                          _vm.$set(_vm.form, "email", $$v)
                                        },
                                        expression: "form.email",
                                      },
                                    }),
                                  ],
                                  1
                                ),
                                _vm._v(" "),
                                _vm.errors != null && _vm.errors.email
                                  ? _c(
                                      "div",
                                      { staticClass: "text-danger mt-1" },
                                      [
                                        _c(
                                          "ul",
                                          _vm._l(
                                            _vm.errors.email,
                                            function (item, index) {
                                              return _c("li", { key: index }, [
                                                _vm._v(
                                                  " " + _vm._s(item) + " "
                                                ),
                                              ])
                                            }
                                          ),
                                          0
                                        ),
                                      ]
                                    )
                                  : _vm._e(),
                                _vm._v(" "),
                                _c(
                                  "b-input-group",
                                  { staticClass: "mb-4" },
                                  [
                                    _c(
                                      "b-input-group-prepend",
                                      [
                                        _c("b-input-group-text", [
                                          _c("i", { staticClass: "icon-lock" }),
                                        ]),
                                      ],
                                      1
                                    ),
                                    _vm._v(" "),
                                    _c("b-form-input", {
                                      staticClass: "form-control",
                                      attrs: {
                                        type: "password",
                                        placeholder: "Password",
                                        autocomplete: "current-password",
                                      },
                                      model: {
                                        value: _vm.form.password,
                                        callback: function ($$v) {
                                          _vm.$set(_vm.form, "password", $$v)
                                        },
                                        expression: "form.password",
                                      },
                                    }),
                                  ],
                                  1
                                ),
                                _vm._v(" "),
                                _vm.errors != null && _vm.errors.password
                                  ? _c(
                                      "div",
                                      { staticClass: "text-danger mt-1" },
                                      [
                                        _c(
                                          "ul",
                                          _vm._l(
                                            _vm.errors.password,
                                            function (item, index) {
                                              return _c("li", { key: index }, [
                                                _vm._v(
                                                  " " + _vm._s(item) + " "
                                                ),
                                              ])
                                            }
                                          ),
                                          0
                                        ),
                                      ]
                                    )
                                  : _vm._e(),
                                _vm._v(" "),
                                _c(
                                  "b-row",
                                  [
                                    _c(
                                      "b-col",
                                      { attrs: { cols: "12" } },
                                      [
                                        _c("b-button", {
                                          staticClass: "px-4",
                                          attrs: {
                                            type: "submit",
                                            variant: "primary",
                                            block: "",
                                          },
                                          domProps: {
                                            innerHTML: _vm._s(_vm.textLogin),
                                          },
                                        }),
                                      ],
                                      1
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "b-col",
                                      {
                                        staticClass: "text-center mt-2",
                                        attrs: { cols: "12" },
                                      },
                                      [
                                        _c(
                                          "small",
                                          { staticClass: "text-center" },
                                          [
                                            _vm._v(
                                              "BADAN KEPEGAWAIAN DAERAH DAN PENGEMBANGAN SDM KOTA MEDAN"
                                            ),
                                          ]
                                        ),
                                      ]
                                    ),
                                  ],
                                  1
                                ),
                              ],
                              1
                            ),
                          ],
                          1
                        ),
                      ],
                      1
                    ),
                  ],
                  1
                ),
              ],
              1
            ),
          ],
          1
        ),
      ],
      1
    ),
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ })

}]);