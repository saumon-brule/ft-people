/// <reference types="svelte" />
/// <reference types="vite/client" />

declare module "*.svelte" {
  import { SvelteComponentTyped } from "svelte";
  export default class Component extends SvelteComponentTyped<any> {}
}
