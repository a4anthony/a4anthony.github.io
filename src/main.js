import { createApp } from "vue";
import "./style.css";
import router from "./router/index.js";
import App from "./App.vue";
import reveal from "./directives/reveal.js";

createApp(App).use(router).directive("reveal", reveal).mount("#app");
