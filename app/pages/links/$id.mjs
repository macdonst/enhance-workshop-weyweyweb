// View documentation at: https://enhance.dev/docs/learn/starter-project/pages
/**
  * @type {import('@enhance/types').EnhanceElemFn}
  */
export default function Html ({ html, state }) {
  const { store } = state
  const link = store.link || {}
  const problems = store.problems || {}

  return html`<enhance-page-container>
  <enhance-form
  action="/links/${link.key}"
  method="POST">
  <div class="${problems.form ? 'block' : 'hidden'}">
    <p>Found some problems!</p>
    <ul>${problems.form}</ul>
  </div>
  <enhance-fieldset legend="Link">
  <enhance-text-input label="Text" type="text" id="text" name="text" value="${link?.text}" errors="${problems?.text?.errors}"></enhance-text-input>
  <enhance-text-input label="Url" type="url" id="url" name="url" value="${link?.url}" errors="${problems?.url?.errors}"></enhance-text-input>
  <enhance-checkbox label="Completed" type="checkbox" id="completed" name="completed" value="${link?.completed}" errors="${problems?.completed?.errors}"></enhance-checkbox>
  <input type="hidden" id="key" name="key" value="${link?.key}" />
  <enhance-submit-button style="float: right"><span slot="label">Save</span></enhance-submit-button>
  </enhance-fieldset>
</enhance-form>
</enhance-page-container>`
}
