/* eslint-disable react/prop-types */
const Color = ({ colors, setColor }) => {
  return (
    <ul className="ps-0 colors">
      {colors &&
        colors?.map((color, index) => (
          <li
            style={{ background: color?.title }}
            key={index}
            onClick={() => setColor(color?._id)}
          />
        ))}
    </ul>
  );
};

export default Color;
