export type TCard = {
  image: {
    url: string;
  };
  name: {
    first: string;
    last: string;
  };
  email: string;
  phone: string;
  address: {
    city: string;
    street: string;
    address: string;
    houseNumber: string;
  };
};
