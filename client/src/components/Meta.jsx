import { Helmet } from "react-helmet";

// eslint-disable-next-line react/prop-types
const Meta = ({ title }) => {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{title}</title>
    </Helmet>
  );
};

export default Meta;
