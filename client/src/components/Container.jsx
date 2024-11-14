// eslint-disable-next-line react/prop-types
const Container = ({ className, children }) => {
  return (
    <section className={`py-5 home-wrapper-2 ${className}`}>
      <div className="container-xxl">{children}</div>
    </section>
  );
};

export default Container;
