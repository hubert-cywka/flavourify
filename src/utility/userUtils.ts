import { User } from '../types/interfaces/User';

export const filterUsers = (users: User[], filter: string) => {
  return users.filter((user) =>
    [user.email, user.username].some((text) => text.toLowerCase().includes(filter.toLowerCase()))
  );
};
