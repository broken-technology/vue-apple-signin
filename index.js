/* eslint-disable no-console */
function err (msg) {
  if (typeof console !== 'undefined') {
    console.error(`[vue-apple-signin] ${msg}`)
  }
}

export default {
  install (Vue, options) {
    Vue.component('vue-apple-signin', {
      name: 'VueAppleSignin',
      props: {
        color: {
          type: String,
          default: 'black',
          validator (value) {
            return [
              'white',
              'black'
            ].indexOf(value) > -1
          }
        },
        border: {
          type: Boolean,
          default: true
        },
        type: {
          type: String,
          default: 'sign in',
          validator (value) {
            return [
              'sign in',
              'sign up',
              'apple',
              'continue'
            ].indexOf(value) > -1
          }

        }
      },
      computed: {
        dataBorder () {
          return this.border.toString()
        }
      },
      mounted () {
        if (!window.AppleID) {
          err('"https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js" needs to be included as a <script>')
          return;
        }

        const {
          clientId,
          scope,
          redirectURI,
          state
        } = options

        if (!clientId) {
          err('options.clientId must be specified.')
          return;
        }

        if (!scope) {
          err('options.scope must be specified.')
          return;
        }

        if (!redirectURI) {
          err('options.redirectURI must be specified.')
          return;
        }

        if (!state) {
          err('options.state must be specified.')
          return;
        }

        window.AppleID.auth.init({
          clientId,
          scope,
          redirectURI,
          state
        })
      },
      render (createElement) {
        return createElement(
          'div', {
            attrs: {
              id: 'appleid-signin',
              'data-color': this.color,
              'data-border': this.dataBorder,
              'data-type': this.type
            }
          },
        )
      }
    })
  }
}
