import { createSelector } from 'reselect';

// Selector to get the user state
const selectUserState = (state) => state.user;

// Memoized selector to get user data
export const selectUserData = createSelector(
    [selectUserState],
    (userState) => userState.data
);

// Memoized selector to get user role
export const selectUserRole = createSelector(
    [selectUserState],
    (userState) => userState.role
);

// Memoized selector to check if the user has admin privileges
export const selectIsAdmin = createSelector(
    [selectUserState],
    (userState) => userState.role === 'admin'
);
