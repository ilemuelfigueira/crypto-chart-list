<script lang="ts">
  import { onMount } from "svelte";

  import { writable } from "svelte/store";

  import Table from "../components/Table.svelte";
  import { getCryptoData } from "../services/api";
  import type { CryptoResponse, CryptoTable } from "../types/crypto";

  const busca = writable("");
  const data = writable<CryptoTable[]>([]);
  const isLoading = writable<boolean>(false);

  const orderBy = writable<string>("Moeda");
  const ascOrDesc = writable<"asc" | "desc">("asc");

  function searializeCryptoResponseToCryptoTable(
    value: CryptoResponse[]
  ): CryptoTable[] {
    return value.map<CryptoTable>((item) => ({
      "1h": `${
        item.price_change_percentage_1h_in_currency
          ? item.price_change_percentage_1h_in_currency.toPrecision(2)
          : 0
      }%`,
      "24h": `${
        item.price_change_percentage_24h_in_currency
          ? item.price_change_percentage_24h_in_currency.toPrecision(2)
          : 0
      }%`,
      "7d": `${
        item.price_change_percentage_7d_in_currency
          ? item.price_change_percentage_7d_in_currency.toPrecision(2)
          : 0
      }%`,
      "Capitalização de Mercado": item.market_cap,
      "Volume em 24h": item.market_cap_change_24h,
      id: item.id,
      img: item.image,
      value: item.current_price,
      symbol: item.symbol,
    }));
  }

  function serializeOrderBy(orderBy: string, ascOrDesc: string) {
    switch (orderBy) {
      case "Moeda":
        return "id_" + ascOrDesc;
      case "Capitalização de Mercado":
        return "market_cap_" + ascOrDesc;
      case "Volume em 24h":
        return "volume_" + ascOrDesc;
      default:
        return "market_cap_" + ascOrDesc;
    }
  }

  async function handleSearchData(search: string = "") {
    try {
      isLoading.set(true);
      const response = await getCryptoData(
        [search],
        serializeOrderBy($orderBy, $ascOrDesc)
      );

      const serializedResponse =
        searializeCryptoResponseToCryptoTable(response);

      data.set(serializedResponse);
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    } finally {
      isLoading.set(false);
    }
  }

  onMount(() => {
    handleSearchData("");
  });

  $: $orderBy && $ascOrDesc, handleSearchData($busca);
</script>

<main>
  <div class="input">
    <input
      bind:value={$busca}
      type="text"
      placeholder="Digite o nome de alguma moeda"
    />
    <button on:click={() => handleSearchData($busca)}>Buscar</button>
  </div>
  {#if $isLoading === false && $data.length > 0}
    <Table {orderBy} {ascOrDesc} data={$data} />
  {#else }
    <span>Carregando..</span>
  {/if}
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 100%;

    gap: 1rem;

    padding: 1rem;

    background: var(--clr-light);
  }

  main .input {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    gap: 1rem;

    width: 100%;
  }

  main .input input {
    width: 100%;

    border: 1px solid #ccc;
    border-radius: 5px;

    outline: none;

    padding: 0.7rem;

    color: var(--clr-gray700);
    font-weight: 600;
    font-size: var(--font-lg);
  }

  main .input input::placeholder {
    font-weight: 600;
    font-size: var(--font-lg);
  }

  main .input button {
    border: 1px solid #ccc;
    border-radius: 5px;

    outline: none;

    text-transform: uppercase;

    padding: 0.5rem;
    width: 10rem;

    cursor: pointer;

    background: var(--clr-primary);
    color: var(--clr-font);

    font-weight: 600;
    font-size: var(--font-lg);
  }
</style>
