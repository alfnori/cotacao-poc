import {observable, action, computed, decorate} from 'mobx';

import fakeData from '../data/sampleData';

class User {

    constructor(user) {
        this.id = user.id;
        this.name = user.name;
        this.token = user.token;
    }
}

/**
 * Gerencia autenticação do usuário
 */
class AuthStore {

    user;
    isLogged;
    loading = false;

    constructor() {

        // Check localStorage persistence
        if (localStorage.getItem('user')) {
            this.user = JSON.parse(localStorage.getItem('user'));
            this.isLogged = localStorage.getItem('isLogged');
        }

    }

    /**
     * Do user login and change this.user
     * @param data
     * @return {Promise.<void>}
     */
    doFakeLogin() {

        this.user = new User(this.getInfo({id: 2}));
        this.isLogged = true;
        localStorage.setItem('user', JSON.stringify(this.user));
        localStorage.setItem('isLogged', true);

    }

    /**
     * Do user login and change this.user
     * @param data
     * @return {Promise.<void>}
     */
    getInfo(data) {

        let dummyUser = {};

        if (data.id) {
            dummyUser = fakeData.users.find(x => x.id === data.id)
        } else {
            dummyUser = fakeData.users.find(x => x.name === (data.name || data))
        }

        return dummyUser;

    }

    /**
     * Do logout and clean Persistence in localStorage
     */
    doLogout() {
        localStorage.removeItem('isLogged');
        localStorage.removeItem('user');
        this.user = null;
        this.isLogged = false;
    }

    /**
     * Check if user is logged
     * @return {*}
     */
    get checkAuth() {
        return this.isLogged;
    }


}

decorate(AuthStore, {
    user : observable,
    isLogged : observable,
    loading : observable,
    doLogin : action,
    doLogout : action,
    getInfo : action,
    checkAuth : computed
});

export default new AuthStore();
