import { Card } from 'antd';

const { Meta } = Card;

const Product = (props) => {
  return (
    <Card
      hoverable
      style={{ height: '100%', margin: '0 .5rem' }}
      cover={<img alt='Edicto' src={props?.img} />}
    >
      <Meta title={props?.title} description={props?.text} />
    </Card>
  );
};

export default Product;
