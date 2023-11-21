/* globals customElements, document */
import CustomElement from '@enhance/custom-element'

export default class DeleteButton extends CustomElement {
  static observedAttributes = ['key']

  keyChanged(value) {
    this.querySelector('form').setAttribute('action', `/links/${value}/delete`)
  }

  connectedCallback() {
    this.button = this.querySelector('button')
    this.button.addEventListener('click', this.#handleClick);
  }

  disconnectedCallback() {
    this.button.removeEventListener('click', this.#handleClick);
  }

  #handleClick = async event => {
    event.preventDefault()
    console.log(this.getAttribute('key'))
    let element = document.getElementById(this.getAttribute('key'))
    let display = element.style.display
    element.style.display = 'none'
    let { action, method } = event.target.closest('form')
    try {
      await fetch(action, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
      })
      element.remove()
    } catch(error) {
      console.error("Whoops!", error)
      element.style.display = display
    }
  }

  render({ html, state  }) {
    const { attrs = {} } = state
    const { key = '' } = attrs
    return html`
      <form action="/links/${key}/delete" method="POST" class="mb-1">
          <enhance-submit-button><span slot="label">Delete this link</span></enhance-submit-button>
      </form>
      `
  }
}

customElements.define('delete-button', DeleteButton)
