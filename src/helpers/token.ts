import jwt from 'jsonwebtoken';

export default (params = {}) => {
  // const payload = {
  //   id: params,
  // };

  return jwt.sign(
    params,
    `${process.env.JWT_SECRET}`,
    {
      expiresIn: 8640000000,
    },
    (err) => {
      if (err) {
        console.log(err);
        throw err;
      }
    }
  );
};
