// View documentation at: https://enhance.dev/docs/learn/starter-project/pages
/**
  * @type {import('@enhance/types').EnhanceElemFn}
  */
export default function Html ({ html, state }) {
  const { store } = state
  let links = store.links || []
  const link = store.link || {}
  const problems = store.problems || {}

  return html`<enhance-page-container>
  <main>
    <h1 class="mb1 font-semibold text3">Links page</h1>
    ${links.map(item => `<article class="mb2" id="${item?.key}">
<div class="mb0">
  <p class="pb-2"><strong class="capitalize">text: </strong>${item?.text || ''}</p>
  <p class="pb-2"><strong class="capitalize">url: </strong>${item?.url || ''}</p>
  <p class="pb-2"><strong class="capitalize">completed: </strong>${item?.completed || ''}</p>
  <p class="pb-2"><strong class="capitalize">key: </strong>${item?.key || ''}</p>
</div>
<p class="mb-1">
  <enhance-link href="/links/${item.key}">Edit this link</enhance-link>
</p>
<delete-button key="${item.key}"></delete-button></article>`).join('\n')}
<details class="mb0" ${Object.keys(problems).length ? 'open' : ''}>
    <summary>New link</summary>
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
</details>
</main>
</enhance-page-container>
<script type="module" src="/_public/browser/links.mjs"/>
  `
}
