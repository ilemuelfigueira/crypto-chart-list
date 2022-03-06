<script lang="ts">
  import { Router, Route } from "svelte-navigator";
  import Home from "./routes/Home.svelte";
  import PrivateRoute from "./routes/PrivateRoute.svelte";
  import { user } from "./stores/user";

  function handleLogout() {
    $user = null;
  }
</script>

<Router>
  <header>
    <h1>Crypto</h1>
  </header>

  <main>
    <Route path="login">
      <Home />
    </Route>

    <Route path="/">
      <h3>Home</h3>
      <p>Home sweet home...</p>
    </Route>

    <Route path="about">
      <h3>About</h3>
      <p>That's what it's all about!</p>
    </Route>

    <PrivateRoute path="profile" let:location>
      <h3>Welcome {$user.username}</h3>
      <button on:click={handleLogout}>Logout</button>
    </PrivateRoute>
  </main>
</Router>

<style>
  :root {
    --clr-primary: #81d4fa;
    --clr-primary-light: #e1f5fe;
    --clr-primary-dark: #4fc3f7;
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

    /*   border radius */
    --radius: 0.2rem;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
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

    background: var(--clr-primary-dark);
  }

  main {
    margin-top: 3rem;

    background: yellow;

    min-height: calc(100vh - 4rem);
    min-width: 100%;
  }
</style>
