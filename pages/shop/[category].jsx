import SEO from "../../components/seo";
import Wrapper from "../../layout/wrapper";
import ShopMain from "../../components/shop";
import { useRecoilState } from "recoil";
import { categoryState } from "../../states/store";
import { useEffect } from "react";

const index = ({ c }) => {
  const [category, setCategory] = useRecoilState(categoryState);
  useEffect(() => {}, [c]);

  return (
    <Wrapper>
      <SEO pageTitle={"Shop"} />
      <ShopMain />
    </Wrapper>
  );
};

export const getServerSideProps = async (context) => {
  const { query } = context;
  const { category } = query;
  return {
    props: {
      c: category,
    },
  };
};

export default index;
