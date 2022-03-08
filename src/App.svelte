<script lang="ts">
  import { onMount } from "svelte";

  import { Router, Route } from "svelte-navigator";
  import { writable } from "svelte/store";
  import Home from "./routes/Home.svelte";

  import "boxicons";

  const isDark = writable<string>("N");

  onMount(() => {
    const storagedIsDark = sessionStorage.getItem("isDark");

    if (storagedIsDark) {
      $isDark = storagedIsDark === "S" ? "S" : "N";
    }
  });
</script>

<body id="app" dark-theme={$isDark}>
  <header>
    <box-icon class="icon" type="logo" name="bitcoin" />
    <span>Bitcoin</span>
  </header>

  <main>
    <Router>
      <Route path="/">
        <Home />
      </Route>
    </Router>
  </main>
</body>

<style>
  header {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    padding: 1rem;
    gap: 1rem;

    width: 100vw;

    height: 4rem;

    background: var(--clr-primary);
  }

  header span {
    font-size: var(--font-lg);
    font-weight: bold;

    text-transform: uppercase;

    letter-spacing: 0.1rem;
    color: var(--clr-text);
  }

  header .icon {
    fill: var(--clr-font);
    stroke: var(--clr-font);

    transform: scale(1.8);
  }

  main {
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;

    box-shadow: var(--lm-shadow-active);
    background: var(--clr-gray100);

    margin: 1rem 2rem;
  }

  #app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    width: 100vw;

    justify-content: flex-start;
    align-items: center;

    background: var(--clr-light);
  }
</style>
