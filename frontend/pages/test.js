import { useState } from 'react';

import Select from 'react-select';

function Page({ products }) {
  const [providers, setProviders] = useState([]);
  const [providerProduct, setProviderProduct] = useState({});
  const [editorState, setEditorState] = useState('');
  const [totalUser, setTotalUser] = useState(0);
  const API_URL = 'https://api.leposti.ml';

  const handleChangeProduct = async (e) => {
    const res = await fetch(`https://api.leposti.ml/products/${e.id}`);
    const product = await res.json();
    const _product = { _product: e.id };

    setProviderProduct({ ..._product });
    setProviders(product.providers);
  };

  const handleChangeTextArea = (e) => {
    setEditorState(e.target.value);
  };

  const handleChangeProvider = async (e) => {
    const test = { ...providerProduct, _provider: e.id };
    setProviderProduct(test);
  };

  const handleOnClick = async (e) => {
    e.preventDefault();
    const range = editorState.length;
    const res = await fetch(`https://api.leposti.ml/prices`);
    const prices = await res.json();

    const price = prices.filter(
      (price) =>
        price.product.id === providerProduct._product &&
        price.provider.id === providerProduct._provider,
    );
    const finalPrice = price.filter(
      (pric) =>
        editorState.length <= pric.range.maximo &&
        editorState.length >= pric.range.minimo,
    );

    const totalIVA =
      finalPrice[0].iva > 0
        ? (finalPrice[0].precio * finalPrice[0].iva) / 100 +
          finalPrice[0].precio
        : finalPrice[0].precio;
    console.log('####', finalPrice);
    setTotalUser(totalIVA);

    const order = {
      total: totalIVA,
      estado: 'unpaid',
      // checkout_session: '122jjd',
      contenido: editorState,
      user: {
        id: 1,
      },
      provider: {
        id: providerProduct._provider,
      },
      product: {
        id: providerProduct._notice,
      },
    };

    // const res = await fetch(`https://api.leposti.ml/orders`, {
    //   method: 'POST', // *GET, POST, PUT, DELETE, etc.
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(order), // body data type must match "Content-Type" header
    // });
    // if (!res.ok) {
    //   const message = `An error has occured: ${res.status}`;
    //   throw new Error(message);
    // } else {
    //   console.log('Posteado');
    // }
  };

  const options = products.map((product) => {
    return { value: product.nombre, label: product.nombre, id: product.id };
  });

  const optionsProviders =
    providers &&
    providers.map((provider) => {
      return {
        value: provider.nombre,
        label: provider.nombre,
        id: provider.id,
      };
    });

  const date = new Date();
  const dayWeek = date.getDay();
  var formatedDate = `${
    date.getMonth() + 1
  }-${date.getDate()}-${date.getFullYear()}`;

  const daysWeek = {
    1: 'lunes',
    2: 'martes',
    3: 'miercoles',
    4: 'jueves',
    5: 'viernes',
    6: 'sabado',
    7: 'domingo',
  };

  console.log(daysWeek[dayWeek]);

  return (
    <div>
      <Select
        options={options}
        placeholder='Seleccione un Medio'
        onChange={handleChangeProduct}
      />
      <Select
        options={optionsProviders}
        placeholder='Seleccione un producto'
        isDisabled={!providers.length > 0}
        onChange={handleChangeProvider}
      />
      <input
        type='date'
        name='publish-day'
        value={formatedDate}
        min='2018-01-01'
        max='2030-12-31'
        disabled={!providerProduct._provider}
      ></input>
      <textarea
        rows='4'
        cols='50'
        value={editorState}
        onChange={handleChangeTextArea}
        disabled={!providerProduct._provider}
      ></textarea>
      <p>Total: {totalUser}</p>

      <button onClick={handleOnClick}>Comprar</button>
    </div>
  );
}

Page.getInitialProps = async (ctx) => {
  const res = await fetch(`https://api.leposti.ml/products`);
  const products = await res.json();
  return { products };
};

export default Page;
