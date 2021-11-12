export const TOKEN_KEY = '&app-token';
export const ID_USER = '&id-user';
export const NAME_USER = '&name-user';
export const CPF_USER = '&cpf-user';
export const USER_TYPE = '&user-type';

export const login = token => { localStorage.setItem(TOKEN_KEY, token) }
export const logout = () => { localStorage.clear() }
export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const setIdUser = id => { localStorage.setItem(ID_USER, id) }
export const getIdUser = () => { localStorage.getItem(ID_USER) }

export const setNameUser = name => { localStorage.setItem(NAME_USER, name) }
export const getNameUser = () => { localStorage.getItem(NAME_USER) }

export const setCpfUser = cpf => { localStorage.setItem(CPF_USER, cpf) }
export const getCpfUser = () => { localStorage.getItem(CPF_USER) }

export const setUserType = type => { localStorage.setItem(USER_TYPE, type) }
export const getUserType = () => { localStorage.getItem(USER_TYPE) }

