<body>
  <table>
    <thead>
      <tr>
        <th>Moeda</th>
        <th>Preço</th>
        <th>1h</th>
        <th>24h</th>
        <th>7d</th>
        <th>Volume em 24h</th>
        <th>Capitalização de Mercado</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
          <div>
            <img
              src="https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579"
              alt=""
            />
            BTC
          </div>
        </td>
        <td>US$ 39.002,24</td>
        <td>0.1%</td>
        <td>0.4%</td>
        <td>1.2%</td>
        <td>US$ 13.472.106.589</td>
        <td>US$ 750.092.925.509</td>
      </tr>
      <tr>
        <td>
          <div>
            <img
              src="https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579"
              alt=""
            />
            BTC
          </div>
        </td>
        <td>US$ 39.002,24</td>
        <td>0.1%</td>
        <td>0.4%</td>
        <td>1.2%</td>
        <td>US$ 13.472.106.589</td>
        <td>US$ 750.092.925.509</td>
      </tr>
    </tbody>
  </table>
</body>

<style>
  body {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
  }

  body table {
    border-collapse: collapse;
    box-shadow: var(--lm-shadow-active);
    background: white;
    text-align: center;
    overflow: hidden;

    min-width: 500px;
  }

  body table thead {
    box-shadow: var(--lm-shadow-active);
  }

  body table th {
    padding: 1rem 2rem;
    text-transform: uppercase;
    letter-spacing: 0.1rem;
    font-size: var(--font-sm);
    font-weight: 900;
  }

  body table td {
    padding: 1rem 2rem;
  }

  body table tbody tr td div {
    display: flex;
    align-items: center;
    gap: 0.2rem;
  }

  body table tbody tr td img {
    width: 1rem;
    height: 1rem;
    aspect-ratio: 4/3;
  }

  body table tbody tr:nth-child(even) {
    background: var(--clr-gray200);
  }
</style>
