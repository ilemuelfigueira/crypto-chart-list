<script lang="ts">
  import { onMount } from "svelte";

  import { Router, Route } from "svelte-navigator";
  import { writable } from "svelte/store";
  import Home from "./routes/Home.svelte";
  import PrivateRoute from "./routes/PrivateRoute.svelte";
  import { user } from "./stores/user";

  const isDark = writable<string>("N");

  function handleLogout() {
    $user = null;
  }

  onMount(() => {
    const storagedIsDark = sessionStorage.getItem("isDark");

    if (storagedIsDark) {
      $isDark = storagedIsDark === "S" ? "S" : "N";
    }
  });
</script>

<Router>
  <body id="app" dark-theme={$isDark}>
    <header>
      <h1>Crypto</h1>
    </header>

    <main>
      <Route path="/">
        <Home />
      </Route>
    </main>
  </body>
</Router>

<style>
  :root {
    --clr-primary: #81d4fa;
    --clr-light: #e1f5fe;
    --clr-gray100: #f9fbff;
    --clr-gray150: #f4f6fb;
    --clr-gray200: #eef1f6;
    --clr-gray300: #e1e5ee;
    --clr-gray400: #767b91;
    --clr-gray500: #4f546c;
    --clr-gray600: #2a324b;
    --clr-gray700: #161d34;
    --clr-pending: #fff0c2;
    --clr-pending-font: #a68b00;
    --clr-unpaid: #ffcdd2;
    --clr-unpaid-font: #c62828;
    --clr-paid: #c8e6c9;
    --clr-paid-font: #388e3c;
    --clr-link: #2962ff;

    /* // Assumes the browser default, typically `16px` */
    --font-base: 0.95rem;
    --font-lg: calc(var(--font-base) * 1.25);
    --font-sm: calc(var(--font-base) * 0.875);
    --font-xs: calc(var(--font-base));
    --font-xl: calc(var(--font-base) * 1.35);

    --lm-shadow-active: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    --lm-shadow-inactive: 0px 16px 30px -10px rgba(0, 0, 0, 0.2);

    --input-focus: #006cff;
    --input-hover: #ff8c42;
    --input-error: #b00020;
    --input-background: #f6f8ff;
    --border-inactive: #e6e6e6;

    /*   border radius */
    --radius: 0.2rem;
  }

  [dark-theme="S"] {
    --clr-light: #4fc3f7;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body,
  input,
  button,
  textarea {
    font: 400 16px "Mukta", sans-serif;
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 1rem;

    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;

    height: 3rem;

    background: var(--clr-light);
  }

  main {
    margin-top: 3rem;

    min-height: calc(100vh - 4rem);
    min-width: 100%;

    box-shadow: var(--lm-shadow-active);
    background: var(--clr-gray200);
  }
</style>
