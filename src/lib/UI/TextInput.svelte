<script lang="ts">
  export let controlType = "";
  export let id: string;
  export let label: string;
  export let rows: number = 0;
  export let value: string;
  export let type = "text";
  export let valid = true;
  export let validityMessage = "";

  let touched = false;

  function touch() {
    touched = true;
  }
</script>

<style>
  input,
  textarea {
    display: block;
    width: 100%;
    font: inherit;
    border: none;
    border-bottom: 2px solid #ccc;
    border-radius: 3px 3px 0 0;
    background: white;
    padding: 0.15rem 0.25rem;
    transition: border-color 0.1s ease-out;
  }

  input:focus,
  textarea:focus {
    border-color: #e40763;
    outline: none;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
    width: 100%;
  }

  .form-control {
    padding: 0.5rem 0;
    width: 100%;
    margin: 0.25rem 0;
  }
  
  .invalid {
    border-color: red;
    background: #fde3e3;
  }

  .error-message {
    color: red;
    margin: 0.25rem 0;
  }
</style>

<div class="form-control">
  <label for={id}>{label}</label>
  {#if controlType === 'textarea'}
    <textarea class:invalid="{!valid && touched}" {rows} {id} bind:value on:blur="{touch}" />
  {:else}
    <input class:invalid="{!valid && touched}" {type} {id} {value} on:input 
      on:blur="{touch}"/>
  {/if}
  {#if !valid && validityMessage && touched}
    <p class="error-message">{validityMessage}</p>
  {/if}
</div>
