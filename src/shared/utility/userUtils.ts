import { UserDetails } from 'shared/types/User';

export const filterUsers = (users: UserDetails[], filter: string) => {
  return users.filter((user) =>
    [user.email, user.username].some((text) => text.toLowerCase().includes(filter.toLowerCase()))
  );
};
