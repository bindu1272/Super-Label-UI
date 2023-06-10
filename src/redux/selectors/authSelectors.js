import { get } from "lodash";

export const getUser = (state) => {
    return get(state, 'auth.user');
}

export const getSidenavSelectedKeys = (state) => {
    return get(state, 'auth.selectedKeys')
}

export const getUserId = (state) => {
    return get(state, 'auth.user.id')
}